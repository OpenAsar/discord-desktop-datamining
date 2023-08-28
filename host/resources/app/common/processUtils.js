"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_WIN = exports.IS_OSX = exports.IS_LINUX = void 0;
exports.supportsTls13 = supportsTls13;
var _os = _interopRequireDefault(require("os"));
var _process = _interopRequireDefault(require("process"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IS_WIN = _process.default.platform === 'win32';
exports.IS_WIN = IS_WIN;
const IS_OSX = _process.default.platform === 'darwin';
exports.IS_OSX = IS_OSX;
const IS_LINUX = _process.default.platform === 'linux';
exports.IS_LINUX = IS_LINUX;
function isWindowsVersionOrEarlier(major, minor) {
  if (!IS_WIN) {
    return false;
  }
  const osRelease = _os.default.release();
  if (osRelease == null || typeof osRelease !== 'string') {
    return false;
  }
  const [actualMajor, actualMinor] = osRelease.split('.').map(v => parseInt(v, 10));
  if (actualMajor < major) {
    return true;
  }
  if (actualMajor === major && actualMinor <= minor) {
    return true;
  }
  return false;
}
function supportsTls13() {
  try {
    return !isWindowsVersionOrEarlier(6, 1);
  } catch {
    return true;
  }
}