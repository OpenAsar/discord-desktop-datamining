"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readMinidump = readMinidump;
var _fs = _interopRequireDefault(require("fs"));
var _util = _interopRequireDefault(require("util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */

const exceptionTypes = {
  C0000005: 'EXCEPTION_ACCESS_VIOLATION',
  '80000002': 'EXCEPTION_DATATYPE_MISALIGNMENT',
  '80000003': 'EXCEPTION_BREAKPOINT',
  '80000004': 'EXCEPTION_SINGLE_STEP',
  C000008C: 'EXCEPTION_ARRAY_BOUNDS_EXCEEDED',
  C000008D: 'EXCEPTION_FLT_DENORMAL_OPERAND',
  C000008E: 'EXCEPTION_FLT_DIVIDE_BY_ZERO',
  C000008F: 'EXCEPTION_FLT_INEXACT_RESULT',
  C0000090: 'EXCEPTION_FLT_INVALID_OPERATION',
  C0000091: 'EXCEPTION_FLT_OVERFLOW',
  C0000092: 'EXCEPTION_FLT_STACK_CHECK',
  C0000093: 'EXCEPTION_FLT_UNDERFLOW',
  C0000094: 'EXCEPTION_INT_DIVIDE_BY_ZERO',
  C0000095: 'EXCEPTION_INT_OVERFLOW',
  C0000096: 'EXCEPTION_PRIV_INSTRUCTION',
  C0000006: 'EXCEPTION_IN_PAGE_ERROR',
  C000001D: 'EXCEPTION_ILLEGAL_INSTRUCTION',
  C0000025: 'EXCEPTION_NONCONTINUABLE_EXCEPTION',
  C00000FD: 'EXCEPTION_STACK_OVERFLOW',
  C0000026: 'EXCEPTION_INVALID_DISPOSITION',
  '80000001': 'EXCEPTION_GUARD_PAGE',
  C0000008: 'EXCEPTION_INVALID_HANDLE'
};
class FileReader {
  utf16Decoder = new _util.default.TextDecoder('utf-16');
  static promiseFs = Object.freeze({
    open: _util.default.promisify(_fs.default.open),
    read: _util.default.promisify(_fs.default.read),
    close: _util.default.promisify(_fs.default.close)
  });
  constructor(path, bufferSize = 2048) {
    this.handle = FileReader.promiseFs.open(path, 'r');
    this.buffer = new Uint8Array(bufferSize);
  }
  async read(u32toReadCount, position = null) {
    await this.readCore(u32toReadCount * 4, position);
    return new ReadResult(new Uint32Array(this.buffer.buffer, 0, u32toReadCount));
  }
  async readMinidumpString(rva) {
    // https://learn.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_string
    await this.readCore(4, rva);
    const length = this.buffer[0] | this.buffer[1] << 8 | this.buffer[2] << 16 | this.buffer[3] << 24;
    await this.readCore(Math.min(length, this.buffer.byteLength), rva + 4);
    return this.utf16Decoder.decode(this.buffer.slice(0, length));
  }
  async readCore(byteLength, position = null) {
    if (byteLength > this.buffer.byteLength) {
      throw new Error(`Requested nuber of bytes ${byteLength} exceeds buffer size ${this.buffer.byteLength}.`);
    }
    if (this.handle == null) {
      throw new Error('Cannot use FileReader once closed.');
    }
    const handle = await this.handle;
    const readResult = await FileReader.promiseFs.read(handle, this.buffer, 0, byteLength, position);
    if (readResult.bytesRead < byteLength) {
      throw new Error(`FileReader failed to read enough bytes: 0x${readResult.bytesRead}`);
    }
  }
  async close() {
    if (this.handle == null) {
      return;
    }
    const handle = await this.handle;
    this.handle = null;
    await FileReader.promiseFs.close(handle);
  }
}
class ReadResult {
  index = 0;

  // irl, this should likely take the uint8 and work from there, but this is fine for us.
  // Maybe just steal my other impl here https://github.com/jlennox/WebWad/blob/main/wad.ts#L8
  // but we likely don't want to load the entire file at once. But who knows, maybe the system
  // call reduction is better and/or it irl doesn't matter either way.
  constructor(buffer) {
    this.buffer = buffer;
  }
  seek(index) {
    this.index = index;
  }
  readuint32() {
    return this.buffer[this.index++];
  }
  readuint64() {
    const val = BigInt(this.buffer[this.index]) | BigInt(this.buffer[this.index + 1]) << BigInt(32);
    this.index += 2;
    return val;
  }
}
function isMinidumpFilename(filename) {
  return /\.dmp$/i.test(filename);
}
var MinidumpStreamType;
(function (MinidumpStreamType) {
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
})(MinidumpStreamType || (MinidumpStreamType = {}));
function getVersionString(ms, ls) {
  const first = ms >> 16 & 0xffff;
  const second = ms & 0xffff;
  const third = ls >> 16 & 0xffff;
  const fourth = ls & 0xffff;
  return `${first}.${second}.${third}.${fourth}`;
}
async function readMinidump(file) {
  if (file == null || !isMinidumpFilename(file)) return null;
  let reader = null;
  const info = {};
  try {
    reader = new FileReader(file);
    const headerResult = await reader.read(4, 0);

    // https://docs.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_header
    const header = {
      signature: headerResult.readuint32(),
      version: headerResult.readuint32(),
      numberOfStreams: headerResult.readuint32(),
      streamDirectoryOffset: headerResult.readuint32()
    };
    if (header.signature !== 0x504d444d) {
      console.log(`readMinidump Bad signature: 0x${header.signature.toString(16)}`);
      return null;
    }

    // Arbitrary number. Just a sanity check.
    if (header.numberOfStreams > 0x100) {
      console.log(`readMinidump Bad numberOfStreams: 0x${header.numberOfStreams.toString(16)}`);
      return null;
    }
    const streamLookup = {};
    for (let i = 0; i < header.numberOfStreams; ++i) {
      const streamOffset = header.streamDirectoryOffset + i * 12;
      const streamResult = await reader.read(3, streamOffset);
      const streamType = streamResult.readuint32();

      // We only care about a limited amount of stream types, so lets avoid some of the overhead.
      switch (streamType) {
        case MinidumpStreamType.ExceptionStream:
        case MinidumpStreamType.ModuleListStream:
          break;
        default:
          continue;
      }

      // https://docs.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_directory
      const entry = {
        streamType: streamType,
        dataSize: streamResult.readuint32(),
        dataOffset: streamResult.readuint32()
      };
      let entryLookup = streamLookup[entry.streamType];
      if (entryLookup == null) {
        entryLookup = [];
        streamLookup[entry.streamType] = entryLookup;
      }
      entryLookup.push(entry);
    }
    const exceptionStreams = streamLookup[MinidumpStreamType.ExceptionStream];
    if (exceptionStreams == null || exceptionStreams.length === 0) {
      console.log(`readMinidump: No ExceptionStream found.`);
      return null;
    }
    const exceptionStreamEntry = exceptionStreams[0];
    const exceptionReadResult = await reader.read(8, exceptionStreamEntry.dataOffset);

    // https://docs.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_exception_stream
    const exceptionStream = {
      threadId: exceptionReadResult.readuint32(),
      alignment: exceptionReadResult.readuint32(),
      exceptionCode: exceptionReadResult.readuint32(),
      exceptionFlags: exceptionReadResult.readuint32(),
      exceptionRecord: exceptionReadResult.readuint64(),
      exceptionAddress: exceptionReadResult.readuint64()
    };
    const exceptionCode = exceptionStream.exceptionCode.toString(16).toUpperCase();
    const exceptionString = exceptionTypes[exceptionCode] ?? exceptionCode;
    const exceptionAddrString = exceptionStream.exceptionAddress.toString(16);
    console.log(`readMinidump exceptionCode: ${exceptionString}, exceptionAddress ${exceptionAddrString}`);
    info.exceptionString = exceptionString;
    const exceptionAddress = exceptionStream.exceptionAddress;
    const moduleStreams = streamLookup[MinidumpStreamType.ModuleListStream];
    // Skip if `exceptionAddress` is 0 since there will be no crashing module.
    if (moduleStreams != null && moduleStreams.length > 0 && exceptionAddress !== BigInt(0)) {
      const moduleStreamEntry = moduleStreams[0];
      // https://learn.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_module_list

      const countReadResult = await reader.read(1, moduleStreamEntry.dataOffset);
      const numberOfModules = countReadResult.readuint32();

      // Sanity check, this number is arbitrary.
      if (numberOfModules > 0x200) {
        console.log(`readMinidump ModuleListstream Bad numberOfModules: 0x${numberOfModules.toString(16)}`);
      }
      let moduleEntryOffset = moduleStreamEntry.dataOffset + 4;
      moduleStreamsLoop: for (let i = 0; i < numberOfModules; ++i) {
        const moduleReadResult = await reader.read(108 / 4, moduleEntryOffset);
        moduleEntryOffset += 108;

        // sizeof(MINIDUMP_MODULE)              108
        // sizeof(VS_FIXEDFILEINFO)              52
        // sizeof(MINIDUMP_LOCATION_DESCRIPTOR)   8
        // sizeof(RVA)                            4

        // https://learn.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_module
        // Commented out valid but unused values.
        const module = {
          baseOfImage: moduleReadResult.readuint64(),
          sizeOfImage: moduleReadResult.readuint32(),
          checkSum: moduleReadResult.readuint32(),
          timeDateStamp: moduleReadResult.readuint32(),
          moduleNameRva: moduleReadResult.readuint32(),
          versionInfo: {
            dwSignature: moduleReadResult.readuint32(),
            dwStrucVersion: moduleReadResult.readuint32(),
            dwFileVersionMS: moduleReadResult.readuint32(),
            dwFileVersionLS: moduleReadResult.readuint32(),
            dwProductVersionMS: moduleReadResult.readuint32(),
            dwProductVersionLS: moduleReadResult.readuint32()
            // dwFileFlagsMask: moduleReadResult.readuint32(),
            // dwFileFlags: moduleReadResult.readuint32(),
            // dwFileOS: moduleReadResult.readuint32(),
            // dwFileType: moduleReadResult.readuint32(),
            // dwFileSubtype: moduleReadResult.readuint32(),
            // dwFileDateMS: moduleReadResult.readuint32(),
            // dwFileDateLS: moduleReadResult.readuint32(),
          }
          // cvRecord: moduleReadResult.readuint64(),
          // miscRecord: moduleReadResult.readuint64(),
          // reserved0: moduleReadResult.readuint64(),
          // reserved1: moduleReadResult.readuint64(),
        };

        const endAddress = module.baseOfImage + BigInt(module.sizeOfImage);
        if (module.baseOfImage <= exceptionAddress && endAddress > exceptionAddress) {
          const moduleName = await reader.readMinidumpString(module.moduleNameRva);
          let dirPos = moduleName.lastIndexOf('\\');
          if (dirPos === -1) {
            dirPos = moduleName.lastIndexOf('/');
          }
          dirPos = dirPos === -1 ? 0 : dirPos + 1;
          const moduleFilename = moduleName.slice(dirPos);
          console.log(`readMinidump ModuleListstream crashing module ${moduleName} (${moduleFilename})`);
          info.exceptionModuleName = moduleFilename;
          info.exceptionModuleVersion = getVersionString(module.versionInfo.dwProductVersionMS, module.versionInfo.dwProductVersionLS);
          info.relativeCrashAddress = (exceptionAddress - module.baseOfImage).toString(16);
          break moduleStreamsLoop;
        }
      }
    }
  } catch (e) {
    console.log(`readMinidump exception: ${e}`);
    return null;
  } finally {
    var _reader;
    (_reader = reader) === null || _reader === void 0 ? void 0 : _reader.close();
  }
  console.log(`readMinidump result ${JSON.stringify(info)}`);
  return info;
}