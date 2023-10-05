"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallscopeLogFiles = void 0;
exports.containsInvalidFileChar = containsInvalidFileChar;
exports.isHookMinidumpFile = isHookMinidumpFile;
exports.isMinidumpFile = isMinidumpFile;
exports.isTempFile = isTempFile;
const INVALID_FILENAME_CHAR_REGEX = /[^a-zA-Z0-9-_.]/;
const IS_RTC_FILE = /^channel\.\d+\.\d+\.(?:tsi|tsd)$/i;
const IS_TEMP_FILE = /(?:^\.tmp.+)/i;
function isTempFile(filename) {
  return IS_TEMP_FILE.test(filename);
}
function isHookMinidumpFile(filename) {
  return /^.{8}-.{4}-.{4}-.{4}-.{12}.dmp$/i.test(filename);
}
function isMinidumpFile(filename) {
  return /\.dmp$/i.test(filename);
}
function containsInvalidFileChar(contents) {
  return INVALID_FILENAME_CHAR_REGEX.test(contents);
}
class CallscopeLogFiles {
  static isCallscopeLogFile(filename) {
    return IS_RTC_FILE.test(filename);
  }
  static createChannelFileFilter(blindChannelId) {
    if (blindChannelId == null) {
      console.error('createChannelFileFilter: blindChannelId missing.');
      return null;
    }
    if (!/^\d+$/.test(blindChannelId)) {
      console.error('createChannelFileFilter: blindChannelId is not numeric.');
      return null;
    }
    return new RegExp(`^channel\\.${blindChannelId}\\.\\d+\\.(?:tsi|tsd)$`, 'i');
  }
}
exports.CallscopeLogFiles = CallscopeLogFiles;