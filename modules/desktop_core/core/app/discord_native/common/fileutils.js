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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MAX_LENGTH = _buffer.default.constants.MAX_LENGTH;
const promiseFs = {
  readdir: _util.default.promisify(_originalFs.default.readdir),
  open: _util.default.promisify(_originalFs.default.open),
  fstat: _util.default.promisify(_originalFs.default.fstat),
  stat: _util.default.promisify(_originalFs.default.stat),
  unlink: _util.default.promisify(_originalFs.default.unlink),
  read: _util.default.promisify(_originalFs.default.read),
  readFile: _util.default.promisify(_originalFs.default.readFile),
  close: _util.default.promisify(_originalFs.default.close)
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
      const buffer = Buffer.alloc(stats.size);
      const data = await promiseFs.read(handle, buffer, 0, stats.size, 0);
      let finalData = data.buffer.slice(0, data.bytesRead);
      if (willGzip) {
        try {
          finalData = await promiseZlib.gzip(finalData);
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