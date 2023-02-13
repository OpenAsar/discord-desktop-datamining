"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_WIN = exports.IS_OSX = exports.IS_LINUX = void 0;
exports.getElectronMajorVersion = getElectronMajorVersion;
exports.supportsTls13 = supportsTls13;
var _os = _interopRequireDefault(require("os"));
var _process = _interopRequireDefault(require("process"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getElectronMajorVersion() {
  return _process.default.versions.electron != null ? parseInt(_process.default.versions.electron.split('.')[0]) : 0;
}
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

  // Keep it resilient.
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
  // The nodejs `tls` module does not appear to provide a proper way to sniff tls1.2+ support. Sentry has depricated
  // tls < 1.2, and since this TLS fissure is between OS versions, we instead detect Windows 7 and handle it
  // accordingly. Windows 7 is version 6.1, so detect 6.1 or lower.
  try {
    return !isWindowsVersionOrEarlier(6, 1);
  } catch {
    // Who knows what wacky stuff random hacked up operating systems are reporting.
    // Lets presume no one is using this old of an OS if we hit random exceptional cases.
    return true;
  }
}