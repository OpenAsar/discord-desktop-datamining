"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsInvalidFileChar = containsInvalidFileChar;
exports.isHookMinidumpFile = isHookMinidumpFile;
exports.isTempFile = isTempFile;
const INVALID_FILENAME_CHAR_REGEX = /[^a-zA-Z0-9-_.]/;
function isTempFile(filename) {
  return /(?:^channel\..+(?:tsi|tsd)$)|(?:^\.tmp.+)/i.test(filename);
}
function isHookMinidumpFile(filename) {
  return /^.{8}-.{4}-.{4}-.{4}-.{12}.dmp$/i.test(filename);
}
function containsInvalidFileChar(contents) {
  return INVALID_FILENAME_CHAR_REGEX.test(contents);
}