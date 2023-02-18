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
exports.readFiles = readFiles;
exports.readFulfilledFiles = readFulfilledFiles;
var _buffer = _interopRequireDefault(require("buffer"));
var _originalFs = _interopRequireDefault(require("original-fs"));
var _path = _interopRequireWildcard(require("path"));
var _util = _interopRequireDefault(require("util"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-console */

// eslint-disable-line import/no-unresolved

// Reason for original-fs being import/no-unresolved: https://github.com/discord/discord/pull/74159#discussion_r893733771

const MAX_LENGTH = _buffer.default.constants.MAX_LENGTH;
const promiseFs = {
  readdir: _util.default.promisify(_originalFs.default.readdir),
  open: _util.default.promisify(_originalFs.default.open),
  fstat: _util.default.promisify(_originalFs.default.fstat),
  stat: _util.default.promisify(_originalFs.default.stat),
  unlink: _util.default.promisify(_originalFs.default.unlink),
  read: _util.default.promisify(_originalFs.default.read),
  close: _util.default.promisify(_originalFs.default.close)
};

// Perform `readFiles` but only return `fulfilled` results.
// If [orException] is set, exception if any of the results were rejected.
async function readFulfilledFiles(filenames, maxSize, orException) {
  const files = await readFiles(filenames, maxSize);
  if (orException) {
    files.forEach(result => {
      if (result.status === 'rejected') {
        throw result.reason;
      }
    });
  }
  return files.filter(result => result.status === 'fulfilled').map(result => result.value);
}
function readFiles(filenames, maxSize) {
  maxSize = Math.min(maxSize, MAX_LENGTH);
  return Promise.allSettled(filenames.map(async filename => {
    const handle = await promiseFs.open(filename, 'r');
    try {
      const stats = await promiseFs.fstat(handle);
      if (maxSize != null && stats.size > maxSize) {
        // Used to help determine why openFiles failed.
        // Cannot use an error here because context bridge will remove the code field.
        // eslint-disable-next-line no-throw-literal
        throw {
          code: 'ETOOLARGE',
          message: 'upload too large',
          filesize: stats.size,
          maxSize
        };
      }
      const buffer = Buffer.alloc(stats.size);
      const data = await promiseFs.read(handle, buffer, 0, stats.size, 0);
      return {
        data: data.buffer.slice(0, data.bytesRead),
        filename: _path.default.basename(filename)
      };
    } finally {
      promiseFs.close(handle); // No reason to await?
    }
  }));
}

function getFilesnamesFromDirectory(path) {
  return promiseFs.readdir(path);
}
function deleteFile(filename) {
  return promiseFs.unlink(filename);
}