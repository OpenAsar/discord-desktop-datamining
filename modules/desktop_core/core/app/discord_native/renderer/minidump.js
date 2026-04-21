"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMinidump = readMinidump;
const promises_1 = __importDefault(require("fs/promises"));
const util_1 = __importDefault(require("util"));
const native_crash_codes_1 = require("@discordapp/native-crash-codes");
class FileReader {
    handle;
    buffer;
    utf16Decoder = new util_1.default.TextDecoder('utf-16');
    constructor(path, bufferSize = 2048) {
        this.handle = promises_1.default.open(path, 'r');
        this.buffer = new Uint8Array(bufferSize);
    }
    async read(u32toReadCount, position) {
        const byteSize = u32toReadCount * 4;
        await this.readCore(byteSize, position);
        return new ReadResult(this.buffer.buffer.slice(0, byteSize));
    }
    async readMinidumpString(rva) {
        if (rva === 0) {
            return '';
        }
        await this.readCore(4, rva);
        const length = this.buffer[0] | (this.buffer[1] << 8) | (this.buffer[2] << 16) | (this.buffer[3] << 24);
        await this.readCore(Math.min(length, this.buffer.byteLength), rva + 4);
        return this.utf16Decoder.decode(this.buffer.slice(0, length));
    }
    async readCore(byteLength, position) {
        if (byteLength > this.buffer.byteLength) {
            throw new Error(`Requested nuber of bytes ${byteLength} exceeds buffer size ${this.buffer.byteLength}.`);
        }
        if (this.handle == null) {
            throw new Error('Cannot use FileReader once closed.');
        }
        const handle = await this.handle;
        let bytesRead = 0;
        while (bytesRead < byteLength) {
            const readResult = await handle.read(this.buffer, bytesRead, byteLength - bytesRead, position + bytesRead);
            if (readResult.bytesRead === 0) {
                throw new Error('Unexpected end of file');
            }
            bytesRead += readResult.bytesRead;
        }
    }
    async close() {
        if (this.handle == null) {
            return;
        }
        try {
            const handle = await this.handle;
            await handle.close();
        }
        finally {
            this.handle = null;
        }
    }
}
class ReadResult {
    index = 0;
    u8;
    u16;
    u32;
    constructor(buffer) {
        this.u8 = new Uint8Array(buffer);
        this.u16 = new Uint16Array(buffer);
        this.u32 = new Uint32Array(buffer);
    }
    seek(index) {
        this.index = index;
    }
    readuint32() {
        const val = this.u32[this.index / 4];
        this.index += 4;
        return val;
    }
    readuint16() {
        const val = this.u16[this.index / 2];
        this.index += 2;
        return val;
    }
    readByteArray(count) {
        const val = Array.from(this.u8.slice(this.index, this.index + count));
        this.index += count;
        return val;
    }
    readuint64() {
        const u32Index = this.index / 4;
        const val = BigInt(this.u32[u32Index]) | (BigInt(this.u32[u32Index + 1]) << BigInt(32));
        this.index += 8;
        return val;
    }
}
function isMinidumpFilename(filename) {
    return /\.dmp$/i.test(filename);
}
class MINIDUMP_HEADER {
    static U32_SIZE = 4;
    signature;
    version;
    numberOfStreams;
    streamDirectoryOffset;
    constructor(reader) {
        this.signature = reader.readuint32();
        this.version = reader.readuint32();
        this.numberOfStreams = reader.readuint32();
        this.streamDirectoryOffset = reader.readuint32();
    }
    static async read(reader, position) {
        return new MINIDUMP_HEADER(await reader.read(MINIDUMP_HEADER.U32_SIZE, position));
    }
}
class MINIDUMP_DIRECTORY {
    static U32_SIZE = 3;
    streamType;
    dataSize;
    dataOffset;
    constructor(reader) {
        this.streamType = reader.readuint32();
        this.dataSize = reader.readuint32();
        this.dataOffset = reader.readuint32();
    }
    static async read(reader, position) {
        return new MINIDUMP_DIRECTORY(await reader.read(MINIDUMP_DIRECTORY.U32_SIZE, position));
    }
}
class MINIDUMP_EXCEPTION_STREAM {
    static U32_SIZE = 8;
    threadId;
    alignment;
    exceptionCode;
    exceptionFlags;
    exceptionRecord;
    exceptionAddress;
    constructor(reader) {
        this.threadId = reader.readuint32();
        this.alignment = reader.readuint32();
        this.exceptionCode = reader.readuint32();
        this.exceptionFlags = reader.readuint32();
        this.exceptionRecord = reader.readuint64();
        this.exceptionAddress = reader.readuint64();
    }
    static async read(reader, position) {
        return new MINIDUMP_EXCEPTION_STREAM(await reader.read(MINIDUMP_EXCEPTION_STREAM.U32_SIZE, position));
    }
    getExceptionCodeString() {
        return (0, native_crash_codes_1.getExceptionCode)(this.exceptionCode);
    }
}
class MINIDUMP_LOCATION_DESCRIPTOR {
    dataSize;
    rva;
    constructor(reader) {
        this.dataSize = reader.readuint32();
        this.rva = reader.readuint32();
    }
}
class MINIDUMP_THREAD_NAME_LIST {
    static U32_SIZE = 1;
    numberOfThreadNames;
    constructor(reader) {
        this.numberOfThreadNames = reader.readuint32();
    }
    static async read(reader, position) {
        return new MINIDUMP_THREAD_NAME_LIST(await reader.read(MINIDUMP_THREAD_NAME_LIST.U32_SIZE, position));
    }
}
class MINIDUMP_THREAD_NAME {
    static U32_SIZE = 3;
    threadId;
    threadNameRva;
    constructor(reader) {
        this.threadId = reader.readuint32();
        this.threadNameRva = reader.readuint64();
    }
    static async read(reader, position) {
        return new MINIDUMP_THREAD_NAME(await reader.read(MINIDUMP_THREAD_NAME.U32_SIZE, position));
    }
}
class MINIDUMP_MODULE_LIST {
    static U32_SIZE = 1;
    numberOfModules;
    constructor(reader) {
        this.numberOfModules = reader.readuint32();
    }
    static async read(reader, position) {
        return new MINIDUMP_MODULE_LIST(await reader.read(MINIDUMP_MODULE_LIST.U32_SIZE, position));
    }
}
class MINIDUMP_MODULE {
    static U32_SIZE = 108 / 4;
    baseOfImage;
    sizeOfImage;
    checkSum;
    timeDateStamp;
    moduleNameRva;
    versionInfo;
    cvRecord;
    miscRecord;
    reserved0;
    reserved1;
    constructor(reader) {
        this.baseOfImage = reader.readuint64();
        this.sizeOfImage = reader.readuint32();
        this.checkSum = reader.readuint32();
        this.timeDateStamp = reader.readuint32();
        this.moduleNameRva = reader.readuint32();
        this.versionInfo = new VS_FIXEDFILEINFO(reader);
        this.cvRecord = new MINIDUMP_LOCATION_DESCRIPTOR(reader);
        this.miscRecord = new MINIDUMP_LOCATION_DESCRIPTOR(reader);
        this.reserved0 = reader.readuint64();
        this.reserved1 = reader.readuint64();
    }
    static async read(reader, position) {
        return new MINIDUMP_MODULE(await reader.read(MINIDUMP_MODULE.U32_SIZE, position));
    }
    containsAddress(address) {
        const endAddress = this.baseOfImage + BigInt(this.sizeOfImage);
        return this.baseOfImage <= address && endAddress > address;
    }
    async getModuleFileName(reader) {
        const moduleName = await reader.readMinidumpString(this.moduleNameRva);
        let dirPos = moduleName.lastIndexOf('\\');
        if (dirPos === -1) {
            dirPos = moduleName.lastIndexOf('/');
        }
        dirPos = dirPos === -1 ? 0 : dirPos + 1;
        return moduleName.slice(dirPos);
    }
    async getCVInfoIdString(reader) {
        return (await CV_INFO.read(reader, this.cvRecord.rva)).getIdString();
    }
    getCodeIdString() {
        return (this.timeDateStamp.toString(16).padStart(8, '0') + this.sizeOfImage.toString(16)).toUpperCase();
    }
}
class VS_FIXEDFILEINFO {
    dwSignature;
    dwStrucVersion;
    dwFileVersionMS;
    dwFileVersionLS;
    dwProductVersionMS;
    dwProductVersionLS;
    dwFileFlagsMask;
    dwFileFlags;
    dwFileOS;
    dwFileType;
    dwFileSubtype;
    dwFileDateMS;
    dwFileDateLS;
    constructor(reader) {
        this.dwSignature = reader.readuint32();
        this.dwStrucVersion = reader.readuint32();
        this.dwFileVersionMS = reader.readuint32();
        this.dwFileVersionLS = reader.readuint32();
        this.dwProductVersionMS = reader.readuint32();
        this.dwProductVersionLS = reader.readuint32();
        this.dwFileFlagsMask = reader.readuint32();
        this.dwFileFlags = reader.readuint32();
        this.dwFileOS = reader.readuint32();
        this.dwFileType = reader.readuint32();
        this.dwFileSubtype = reader.readuint32();
        this.dwFileDateMS = reader.readuint32();
        this.dwFileDateLS = reader.readuint32();
    }
    getVersionString() {
        const first = (this.dwProductVersionMS >> 16) & 0xffff;
        const second = this.dwProductVersionMS & 0xffff;
        const third = (this.dwProductVersionLS >> 16) & 0xffff;
        const fourth = this.dwProductVersionLS & 0xffff;
        return `${first}.${second}.${third}.${fourth}`;
    }
}
class CV_INFO {
    static async read(reader, position) {
        if (position === 0) {
            return new CV_INFO_UNKNOWN(0);
        }
        const readResult = await reader.read(6, position);
        const cvSignature = readResult.readuint32();
        switch (cvSignature) {
            case CV_INFO_PDB20.SIGNATURE:
                return new CV_INFO_PDB20(readResult);
            case CV_INFO_PDB70.SIGNATURE:
                return new CV_INFO_PDB70(readResult);
            case CV_INFO_ELF.SIGNATURE:
                return new CV_INFO_ELF();
            default:
                return new CV_INFO_UNKNOWN(cvSignature);
        }
    }
}
class CV_INFO_PDB20 {
    static SIGNATURE = 0x3031424e;
    cvOffset;
    signature;
    age;
    constructor(reader) {
        this.cvOffset = reader.readuint32();
        this.signature = reader.readuint32();
        this.age = reader.readuint32();
    }
    getIdString() {
        return 'CV_INFO_PDB20';
    }
}
class GUID {
    data1;
    data2;
    data3;
    data4;
    constructor(reader) {
        this.data1 = reader.readuint32();
        this.data2 = reader.readuint16();
        this.data3 = reader.readuint16();
        this.data4 = reader.readByteArray(8);
    }
    toString() {
        if (this.data4.length !== 8) {
            return 'Invalid';
        }
        return (this.data1.toString(16).padStart(4, '0')
            + this.data2.toString(16).padStart(2, '0')
            + this.data3.toString(16).padStart(2, '0')
            + this.data4.map((b) => b.toString(16).padStart(2, '0')).join(''));
    }
}
class CV_INFO_PDB70 {
    static SIGNATURE = 0x53445352;
    signature;
    age;
    constructor(reader) {
        this.signature = new GUID(reader);
        this.age = reader.readuint32();
    }
    getIdString() {
        return (this.signature.toString() + this.age.toString(16)).toUpperCase();
    }
}
class CV_INFO_ELF {
    static SIGNATURE = 0x4270454c;
    getIdString() {
        return 'CV_INFO_ELF';
    }
}
class CV_INFO_UNKNOWN {
    cvSignature;
    constructor(cvSignature) {
        this.cvSignature = cvSignature;
    }
    getIdString() {
        return 'CV_INFO_UNKNOWN:' + this.cvSignature.toString(16).padStart(4, '0');
    }
}
async function readMinidump(file) {
    if (file == null || !isMinidumpFilename(file))
        return null;
    let reader = null;
    const info = {};
    try {
        reader = new FileReader(file);
        const header = await MINIDUMP_HEADER.read(reader, 0);
        if (header.signature !== 0x504d444d) {
            console.log(`readMinidump Bad signature: 0x${header.signature.toString(16)}`);
            return null;
        }
        if (header.numberOfStreams > 0x100) {
            console.log(`readMinidump Bad numberOfStreams: 0x${header.numberOfStreams.toString(16)}`);
            return null;
        }
        const streamLookup = {};
        for (let i = 0; i < header.numberOfStreams; ++i) {
            const streamOffset = header.streamDirectoryOffset + i * 12;
            const entry = await MINIDUMP_DIRECTORY.read(reader, streamOffset);
            switch (entry.streamType) {
                case 6:
                case 4:
                case 24:
                    break;
                default:
                    continue;
            }
            streamLookup[entry.streamType] = entry;
        }
        const exceptionStreamEntry = streamLookup[6];
        if (exceptionStreamEntry == null) {
            console.log(`readMinidump: No ExceptionStream found.`);
            return null;
        }
        const exceptionStream = await MINIDUMP_EXCEPTION_STREAM.read(reader, exceptionStreamEntry.dataOffset);
        info.exceptionString = exceptionStream.getExceptionCodeString();
        const exceptionAddrString = exceptionStream.exceptionAddress.toString(16);
        console.log(`readMinidump exceptionCode: ${info.exceptionString}, exceptionAddress ${exceptionAddrString}`);
        const threadNamesStreamEntry = streamLookup[24];
        if (threadNamesStreamEntry != null) {
            try {
                const threadNamesList = await MINIDUMP_THREAD_NAME_LIST.read(reader, threadNamesStreamEntry.dataOffset);
                if (threadNamesList.numberOfThreadNames > 0 && threadNamesList.numberOfThreadNames <= 0x400) {
                    let threadNameOffset = threadNamesStreamEntry.dataOffset + 4;
                    for (let i = 0; i < threadNamesList.numberOfThreadNames; ++i) {
                        const threadName = await MINIDUMP_THREAD_NAME.read(reader, threadNameOffset);
                        threadNameOffset += MINIDUMP_THREAD_NAME.U32_SIZE * 4;
                        if (threadName.threadId === exceptionStream.threadId) {
                            const nameRva = Number(threadName.threadNameRva);
                            if (nameRva !== 0) {
                                info.exceptionThreadName = await reader.readMinidumpString(nameRva);
                            }
                            break;
                        }
                    }
                }
            }
            catch (e) {
                console.log(`readMinidump: Error reading thread names: ${e}`);
            }
        }
        const moduleStreamEntry = streamLookup[4];
        if (moduleStreamEntry == null) {
            return info;
        }
        const moduleList = await MINIDUMP_MODULE_LIST.read(reader, moduleStreamEntry.dataOffset);
        if (moduleList.numberOfModules > 0x200) {
            console.log(`readMinidump ModuleListstream Bad numberOfModules: 0x${moduleList.numberOfModules.toString(16)}`);
            return info;
        }
        let moduleEntryOffset = moduleStreamEntry.dataOffset + 4;
        const firstModule = await MINIDUMP_MODULE.read(reader, moduleEntryOffset);
        info.processName = await firstModule.getModuleFileName(reader);
        if (exceptionStream.exceptionAddress !== BigInt(0)) {
            for (let i = 0; i < moduleList.numberOfModules; ++i) {
                const module = await MINIDUMP_MODULE.read(reader, moduleEntryOffset);
                moduleEntryOffset += MINIDUMP_MODULE.U32_SIZE * 4;
                if (module.containsAddress(exceptionStream.exceptionAddress)) {
                    info.exceptionModuleName = await module.getModuleFileName(reader);
                    info.exceptionModuleVersion = module.versionInfo.getVersionString();
                    info.relativeCrashAddress = (exceptionStream.exceptionAddress - module.baseOfImage).toString(16);
                    info.exceptionModuleCodeId = module.getCodeIdString();
                    break;
                }
            }
        }
    }
    catch (e) {
        console.log(`readMinidump exception: ${e} ${e?.stack}`);
        return null;
    }
    finally {
        void reader?.close();
    }
    console.log(`readMinidump result ${JSON.stringify(info)}`);
    return info;
}
