"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readMinidump = readMinidump;
var _promises = _interopRequireDefault(require("fs/promises"));
var _util = _interopRequireDefault(require("util"));
var _nativeCrashCodes = require("@discordapp/native-crash-codes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FileReader {
  utf16Decoder = new _util.default.TextDecoder('utf-16');
  constructor(path, bufferSize = 2048) {
    this.handle = _promises.default.open(path, 'r');
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
    const length = this.buffer[0] | this.buffer[1] << 8 | this.buffer[2] << 16 | this.buffer[3] << 24;
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
    } finally {
      this.handle = null;
    }
  }
}
class ReadResult {
  index = 0;
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
    const val = BigInt(this.u32[u32Index]) | BigInt(this.u32[u32Index + 1]) << BigInt(32);
    this.index += 8;
    return val;
  }
}
function isMinidumpFilename(filename) {
  return /\.dmp$/i.test(filename);
}
var MinidumpStreamType = function (MinidumpStreamType) {
  MinidumpStreamType[MinidumpStreamType["UnusedStream"] = 0] = "UnusedStream";
  MinidumpStreamType[MinidumpStreamType["ReservedStream0"] = 1] = "ReservedStream0";
  MinidumpStreamType[MinidumpStreamType["ReservedStream1"] = 2] = "ReservedStream1";
  MinidumpStreamType[MinidumpStreamType["ThreadListStream"] = 3] = "ThreadListStream";
  MinidumpStreamType[MinidumpStreamType["ModuleListStream"] = 4] = "ModuleListStream";
  MinidumpStreamType[MinidumpStreamType["MemoryListStream"] = 5] = "MemoryListStream";
  MinidumpStreamType[MinidumpStreamType["ExceptionStream"] = 6] = "ExceptionStream";
  MinidumpStreamType[MinidumpStreamType["SystemInfoStream"] = 7] = "SystemInfoStream";
  MinidumpStreamType[MinidumpStreamType["ThreadExListStream"] = 8] = "ThreadExListStream";
  MinidumpStreamType[MinidumpStreamType["Memory64ListStream"] = 9] = "Memory64ListStream";
  MinidumpStreamType[MinidumpStreamType["CommentStreamA"] = 10] = "CommentStreamA";
  MinidumpStreamType[MinidumpStreamType["CommentStreamW"] = 11] = "CommentStreamW";
  MinidumpStreamType[MinidumpStreamType["HandleDataStream"] = 12] = "HandleDataStream";
  MinidumpStreamType[MinidumpStreamType["FunctionTableStream"] = 13] = "FunctionTableStream";
  MinidumpStreamType[MinidumpStreamType["UnloadedModuleListStream"] = 14] = "UnloadedModuleListStream";
  MinidumpStreamType[MinidumpStreamType["MiscInfoStream"] = 15] = "MiscInfoStream";
  MinidumpStreamType[MinidumpStreamType["MemoryInfoListStream"] = 16] = "MemoryInfoListStream";
  MinidumpStreamType[MinidumpStreamType["ThreadInfoListStream"] = 17] = "ThreadInfoListStream";
  MinidumpStreamType[MinidumpStreamType["HandleOperationListStream"] = 18] = "HandleOperationListStream";
  MinidumpStreamType[MinidumpStreamType["TokenStream"] = 19] = "TokenStream";
  MinidumpStreamType[MinidumpStreamType["JavaScriptDataStream"] = 20] = "JavaScriptDataStream";
  MinidumpStreamType[MinidumpStreamType["SystemMemoryInfoStream"] = 21] = "SystemMemoryInfoStream";
  MinidumpStreamType[MinidumpStreamType["ProcessVmCountersStream"] = 22] = "ProcessVmCountersStream";
  MinidumpStreamType[MinidumpStreamType["IptTraceStream"] = 23] = "IptTraceStream";
  MinidumpStreamType[MinidumpStreamType["ThreadNamesStream"] = 24] = "ThreadNamesStream";
  MinidumpStreamType[MinidumpStreamType["ceStreamNull"] = 32768] = "ceStreamNull";
  MinidumpStreamType[MinidumpStreamType["ceStreamSystemInfo"] = 32769] = "ceStreamSystemInfo";
  MinidumpStreamType[MinidumpStreamType["ceStreamException"] = 32770] = "ceStreamException";
  MinidumpStreamType[MinidumpStreamType["ceStreamModuleList"] = 32771] = "ceStreamModuleList";
  MinidumpStreamType[MinidumpStreamType["ceStreamProcessList"] = 32772] = "ceStreamProcessList";
  MinidumpStreamType[MinidumpStreamType["ceStreamThreadList"] = 32773] = "ceStreamThreadList";
  MinidumpStreamType[MinidumpStreamType["ceStreamThreadContextList"] = 32774] = "ceStreamThreadContextList";
  MinidumpStreamType[MinidumpStreamType["ceStreamThreadCallStackList"] = 32775] = "ceStreamThreadCallStackList";
  MinidumpStreamType[MinidumpStreamType["ceStreamMemoryVirtualList"] = 32776] = "ceStreamMemoryVirtualList";
  MinidumpStreamType[MinidumpStreamType["ceStreamMemoryPhysicalList"] = 32777] = "ceStreamMemoryPhysicalList";
  MinidumpStreamType[MinidumpStreamType["ceStreamBucketParameters"] = 32778] = "ceStreamBucketParameters";
  MinidumpStreamType[MinidumpStreamType["ceStreamProcessModuleMap"] = 32779] = "ceStreamProcessModuleMap";
  MinidumpStreamType[MinidumpStreamType["ceStreamDiagnosisList"] = 32780] = "ceStreamDiagnosisList";
  MinidumpStreamType[MinidumpStreamType["LastReservedStream"] = 65535] = "LastReservedStream";
  return MinidumpStreamType;
}(MinidumpStreamType || {});
class MINIDUMP_HEADER {
  static U32_SIZE = 4;
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
    return (0, _nativeCrashCodes.getExceptionCode)(this.exceptionCode);
  }
}
class MINIDUMP_LOCATION_DESCRIPTOR {
  constructor(reader) {
    this.dataSize = reader.readuint32();
    this.rva = reader.readuint32();
  }
}
class MINIDUMP_MODULE_LIST {
  static U32_SIZE = 1;
  constructor(reader) {
    this.numberOfModules = reader.readuint32();
  }
  static async read(reader, position) {
    return new MINIDUMP_MODULE_LIST(await reader.read(MINIDUMP_MODULE_LIST.U32_SIZE, position));
  }
}
class MINIDUMP_MODULE {
  static U32_SIZE = 108 / 4;
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
    const first = this.dwProductVersionMS >> 16 & 0xffff;
    const second = this.dwProductVersionMS & 0xffff;
    const third = this.dwProductVersionLS >> 16 & 0xffff;
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
    return this.data1.toString(16).padStart(4, '0') + this.data2.toString(16).padStart(2, '0') + this.data3.toString(16).padStart(2, '0') + this.data4.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
class CV_INFO_PDB70 {
  static SIGNATURE = 0x53445352;
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
  constructor(cvSignature) {
    this.cvSignature = cvSignature;
  }
  getIdString() {
    return 'CV_INFO_UNKNOWN:' + this.cvSignature.toString(16).padStart(4, '0');
  }
}
async function readMinidump(file) {
  if (file == null || !isMinidumpFilename(file)) return null;
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
        case MinidumpStreamType.ExceptionStream:
        case MinidumpStreamType.ModuleListStream:
          break;
        default:
          continue;
      }
      streamLookup[entry.streamType] = entry;
    }
    const exceptionStreamEntry = streamLookup[MinidumpStreamType.ExceptionStream];
    if (exceptionStreamEntry == null) {
      console.log(`readMinidump: No ExceptionStream found.`);
      return null;
    }
    const exceptionStream = await MINIDUMP_EXCEPTION_STREAM.read(reader, exceptionStreamEntry.dataOffset);
    info.exceptionString = exceptionStream.getExceptionCodeString();
    const exceptionAddrString = exceptionStream.exceptionAddress.toString(16);
    console.log(`readMinidump exceptionCode: ${info.exceptionString}, exceptionAddress ${exceptionAddrString}`);
    const moduleStreamEntry = streamLookup[MinidumpStreamType.ModuleListStream];
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
  } catch (e) {
    console.log(`readMinidump exception: ${e} ${e === null || e === void 0 ? void 0 : e.stack}`);
    return null;
  } finally {
    var _reader;
    void ((_reader = reader) === null || _reader === void 0 ? void 0 : _reader.close());
  }
  console.log(`readMinidump result ${JSON.stringify(info)}`);
  return info;
}