"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "basename", {
  enumerable: true,
  get: function () {
    return _path.basename;
  }
});
exports.deleteFile = deleteFile;
Object.defineProperty(exports, "dirname", {
  enumerable: true,
  get: function () {
    return _path.dirname;
  }
});
exports.ensureDirectoryExists = ensureDirectoryExists;
Object.defineProperty(exports, "extname", {
  enumerable: true,
  get: function () {
    return _path.extname;
  }
});
exports.getFilesnamesFromDirectory = getFilesnamesFromDirectory;
Object.defineProperty(exports, "join", {
  enumerable: true,
  get: function () {
    return _path.join;
  }
});
exports.readExactly = readExactly;
exports.readFiles = readFiles;
exports.readFulfilledFiles = readFulfilledFiles;
var _buffer = _interopRequireDefault(require("buffer"));
var _originalFs = _interopRequireDefault(require("original-fs"));
var _path = _interopRequireWildcard(require("path"));
var _util = _interopRequireDefault(require("util"));
var _zlib = require("zlib");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MAX_LENGTH = _buffer.default.constants.MAX_LENGTH;
const promiseFs = {
  readdir: _util.default.promisify(_originalFs.default.readdir),
  open: _util.default.promisify(_originalFs.default.open),
  fstat: _util.default.promisify(_originalFs.default.fstat),
  stat: _util.default.promisify(_originalFs.default.stat),
  unlink: _util.default.promisify(_originalFs.default.unlink),
  read: _util.default.promisify(_originalFs.default.read),
  readFile: _util.default.promisify(_originalFs.default.readFile),
  close: _util.default.promisify(_originalFs.default.close),
  mkdir: _util.default.promisify(_originalFs.default.mkdir)
};
const promiseZlib = {
  gzip: _util.default.promisify(_zlib.gzip)
};
async function readFulfilledFiles(filepaths, maxSize, orException, shouldGzip) {
  const files = await readFiles(filepaths, maxSize, shouldGzip);
  if (orException) {
    files.forEach(result => {
      if (result.status === 'rejected') {
        throw result.reason;
      }
    });
  }
  return files.filter(result => result.status === 'fulfilled').map(result => result.value);
}
function readFiles(filepaths, dataMaxSize, shouldGzip) {
  dataMaxSize = Math.min(dataMaxSize, MAX_LENGTH);
  return Promise.allSettled(filepaths.map(async filepath => {
    const handle = await promiseFs.open(filepath, 'r');
    try {
      let finalFilename = _path.default.basename(filepath);
      const willGzip = shouldGzip != null && shouldGzip(finalFilename);
      const fileMaxSize = willGzip ? dataMaxSize * 10 : dataMaxSize;
      const stats = await promiseFs.fstat(handle);
      const resultError = {
        code: 'ETOOLARGE',
        message: 'upload too large',
        filesize: stats.size,
        maxSize: dataMaxSize
      };
      if (stats.size > fileMaxSize) {
        throw resultError;
      }
      const buffer = new Uint8Array(stats.size);
      const data = await promiseFs.read(handle, buffer, 0, stats.size, 0);
      let finalData = new Uint8Array(data.buffer.slice(0, data.bytesRead));
      if (willGzip) {
        try {
          finalData = new Uint8Array(await promiseZlib.gzip(finalData));
          finalFilename = finalFilename + '.gz';
          if (finalData.byteLength > dataMaxSize) {
            throw resultError;
          }
        } catch (e) {
          console.error(`Failed to gzip ${finalFilename}`, e);
        }
      }
      return {
        data: finalData,
        filename: finalFilename
      };
    } finally {
      void promiseFs.close(handle);
    }
  }));
}
function ensureDirectoryExists(path) {
  return promiseFs.mkdir(path, {
    recursive: true
  });
}
function getFilesnamesFromDirectory(path) {
  return promiseFs.readdir(path);
}
function deleteFile(filename) {
  return promiseFs.unlink(filename);
}
async function readExactly({
  handle,
  buffer,
  position,
  length
}) {
  let bytesRead = 0;
  if (length == null) length = buffer.byteLength;
  while (bytesRead < length) {
    const result = await handle.read(buffer, bytesRead, length - bytesRead, position + bytesRead);
    if (result.bytesRead === 0) {
      throw new Error('Unexpected end of file');
    }
    bytesRead += result.bytesRead;
  }
}