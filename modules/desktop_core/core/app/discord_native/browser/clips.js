"use strict";

var _buffer = _interopRequireDefault(require("buffer"));
var _path = _interopRequireDefault(require("path"));
var _DiscordIPC = require("../common/DiscordIPC");
var _fileutils = require("../common/fileutils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-console */

const MAX_LENGTH = _buffer.default.constants.MAX_LENGTH;
const DISCORD_HEADER_NAME = 'dscl';
const INVALID_FILE_ERROR = 'Invalid file';
function verifyIsMP4(buffer) {
  if (getBoxHeaderName(buffer, 0) !== 'ftyp') {
    throw new Error(INVALID_FILE_ERROR);
  }
}
function verifyHasMP4Extension(filename) {
  if (_path.default.parse(filename).ext !== '.mp4') {
    throw new Error(INVALID_FILE_ERROR);
  }
}
function getBoxSize(buffer, startIndex) {
  return buffer.readUInt32BE(startIndex);
}
function getBoxHeaderName(buffer, startIndex) {
  return buffer.toString('ascii', startIndex + 4, startIndex + 8);
}
function verifyValidClip(buffer) {
  let currIndex = 0;
  while (currIndex < buffer.byteLength) {
    const boxHeaderName = getBoxHeaderName(buffer, currIndex);
    if (boxHeaderName === DISCORD_HEADER_NAME) {
      return;
    }
    const boxSize = getBoxSize(buffer, currIndex);
    //box size must be at least 8 to account for header, so return false for malformed file
    if (boxSize < 8) {
      throw new Error(INVALID_FILE_ERROR);
    }
    currIndex += boxSize;
  }
  throw new Error(INVALID_FILE_ERROR);
}
async function loadClip(filename) {
  try {
    verifyHasMP4Extension(filename);
    const result = await (0, _fileutils.readFulfilledFiles)([filename], MAX_LENGTH, true);
    const buffer = result[0].data;
    verifyIsMP4(buffer);
    verifyValidClip(buffer);
    return result[0];
  } catch (e) {
    console.log(`Invalid clips file: ${e}`);
    throw new Error(INVALID_FILE_ERROR);
  }
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.LOAD_CLIP, (_, path) => {
  return loadClip(path);
});