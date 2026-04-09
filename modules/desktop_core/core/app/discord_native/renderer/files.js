"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsInvalidFileChar = containsInvalidFileChar;
exports.isHookMinidumpFile = isHookMinidumpFile;
exports.isMinidumpFile = isMinidumpFile;
const INVALID_FILENAME_CHAR_REGEX = /[^a-zA-Z0-9-_.]/;
function isHookMinidumpFile(filename) {
  return /^.{8}-.{4}-.{4}-.{4}-.{12}.dmp$/i.test(filename);
}
function isMinidumpFile(filename) {
  return /\.dmp$/i.test(filename);
}
function containsInvalidFileChar(contents) {
  return INVALID_FILENAME_CHAR_REGEX.test(contents);
}