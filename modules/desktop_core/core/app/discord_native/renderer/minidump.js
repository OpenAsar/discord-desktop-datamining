"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findNewestCrashFileExceptionType = findNewestCrashFileExceptionType;

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

var _processUtils = require("../../../common/processUtils");

var _paths = require("../common/paths");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
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

const open = _util.default.promisify(_fs.default.open);

const read = _util.default.promisify(_fs.default.read);

const close = _util.default.promisify(_fs.default.close);

function isMinidumpFilename(filename) {
  return /\.dmp$/i.test(filename);
}

async function findNewestCrashFileExceptionType() {
  if (!_processUtils.IS_WIN) return null;

  try {
    const files = await (0, _paths.getCrashFiles)();
    if (files == null || files.length === 0) return null;
    return await readMinidumpExceptionType(files[0]);
  } catch (e) {
    console.log(`findNewestCrashFileExceptionType exception: ${e}`);
    return null;
  }
}

async function readMinidumpExceptionType(file) {
  if (file == null || !isMinidumpFilename(file)) return null;
  let fileHandle = null;

  try {
    fileHandle = await open(file, 'r');
    const buffer = new Uint32Array(512);
    const headerResult = await read(fileHandle, buffer, 0, 20, 0);

    if (headerResult.bytesRead < 20) {
      console.log(`readMinidumpExceptionType Bad headerResult.bytesRead: 0x${headerResult.bytesRead}`);
      return null;
    } // https://docs.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_header


    const header = {
      signature: buffer[0],
      version: buffer[1],
      numberOfStreams: buffer[2],
      streamDirectoryOffset: buffer[3]
    };

    if (header.signature !== 0x504d444d) {
      console.log(`readMinidumpExceptionType Bad signature: 0x${header.signature.toString(16)}`);
      return null;
    } // Arbitrary number. Just a sanity check.


    if (header.numberOfStreams > 0x100) {
      console.log(`readMinidumpExceptionType Bad numberOfStreams: 0x${header.numberOfStreams.toString(16)}`);
      return null;
    }

    for (let i = 0; i < header.numberOfStreams; ++i) {
      const streamOffset = header.streamDirectoryOffset + i * 12;
      const streamResult = await read(fileHandle, buffer, 0, 20, streamOffset);

      if (streamResult.bytesRead < 20) {
        console.log(`readMinidumpExceptionType Bad streamResult.bytesRead: 0x${streamResult.bytesRead}`);
        return null;
      } // https://docs.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_directory


      const entry = {
        streamType: buffer[0],
        dataSize: buffer[1],
        dataOffset: buffer[2]
      }; // Check for ExceptionStream.

      if (entry.streamType === 6) {
        const readResult = await read(fileHandle, buffer, 0, 20, entry.dataOffset);

        if (streamResult.bytesRead < 20) {
          console.log(`readMinidumpExceptionType Bad readResult.bytesRead: 0x${readResult.bytesRead}`);
          return null;
        } // https://docs.microsoft.com/en-us/windows/win32/api/minidumpapiset/ns-minidumpapiset-minidump_exception_stream


        const stream = {
          threadId: buffer[0],
          alignment: buffer[1],
          exceptionCode: buffer[2]
        };
        const exceptionCode = stream.exceptionCode.toString(16).toUpperCase();
        const exceptionString = exceptionTypes[exceptionCode] ?? exceptionCode;
        console.log(`readMinidumpExceptionType exceptionCode: ${exceptionString}`);
        return exceptionString;
      }
    }
  } catch (e) {
    console.log(`readMinidumpExceptionType exception: ${e}`);
    return null;
  } finally {
    if (fileHandle != null) {
      close(fileHandle);
    }
  }

  console.log(`readMinidumpExceptionType: No stream entry found.`);
  return null;
}