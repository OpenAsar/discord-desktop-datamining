"use strict";

var _buffer = _interopRequireDefault(require("buffer"));
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
var _DiscordIPC = require("../common/DiscordIPC");
var _fileutils = require("../common/fileutils");
var _utils = require("../common/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MAX_LENGTH = _buffer.default.constants.MAX_LENGTH;
const DISCORD_HEADER_NAME = 'dscl';
const INVALID_FILE_ERROR = 'Invalid file';
class InvalidFileError extends Error {}
function verifyIsMP4(buffer) {
  if (getBoxHeaderName(buffer, 0) !== 'ftyp') {
    throw new InvalidFileError(INVALID_FILE_ERROR);
  }
}
function verifyHasMP4Extension(filename) {
  if (_path.default.parse(filename).ext !== '.mp4') {
    throw new InvalidFileError(INVALID_FILE_ERROR);
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
    if (boxSize < 8) {
      throw new InvalidFileError(INVALID_FILE_ERROR);
    }
    currIndex += boxSize;
  }
  throw new InvalidFileError(INVALID_FILE_ERROR);
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
    if (e instanceof InvalidFileError) {
      console.log(`Invalid clips file: ${e}`);
    } else {
      console.error(`Invalid clips file: ${e}`);
    }
    throw new Error(INVALID_FILE_ERROR);
  }
}
async function getClipMetadata(filename, dirPath) {
  try {
    verifyHasMP4Extension(filename);
  } catch (e) {
    return null;
  }
  const filepath = _path.default.join(dirPath, filename);
  const handle = await _promises.default.open(filepath, 'r');
  const stats = await handle.stat();
  let currIndex = 0;
  const mp4HeaderBuffer = Buffer.alloc(8);
  try {
    await handle.read({
      buffer: mp4HeaderBuffer,
      position: 0
    });
    verifyIsMP4(mp4HeaderBuffer);
    currIndex += getBoxSize(mp4HeaderBuffer, currIndex);
    while (currIndex < stats.size) {
      await handle.read({
        buffer: mp4HeaderBuffer,
        position: currIndex
      });
      const boxSize = getBoxSize(mp4HeaderBuffer, 0);
      if (boxSize < 8) {
        return null;
      }
      const header = getBoxHeaderName(mp4HeaderBuffer, 0);
      if (header === DISCORD_HEADER_NAME) {
        const metadataBuffer = Buffer.alloc(boxSize - 8);
        await handle.read({
          buffer: metadataBuffer,
          position: currIndex + 8
        });
        const metadata = JSON.parse(metadataBuffer.toString('utf-8'));
        return {
          filepath: filepath,
          metadata: metadata
        };
      }
      currIndex += boxSize;
    }
    return null;
  } catch (e) {
    console.log(`error: ${e}`);
    return null;
  } finally {
    await handle.close();
  }
}
async function deleteClip(path) {
  try {
    await loadClip(path);
    await (0, _fileutils.deleteFile)(path);
  } catch (e) {
    console.log(`Invalid clips file to delete: ${e}`);
    throw new Error(INVALID_FILE_ERROR);
  }
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.LOAD_CLIP, (_, path) => {
  return loadClip(path);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.LOAD_CLIPS_DIRECTORY, async (_, dirPath) => {
  const filenames = await (0, _fileutils.getFilesnamesFromDirectory)(dirPath);
  const filteredFiles = (await Promise.all(filenames.map(filename => getClipMetadata(filename, dirPath)))).filter(_utils.isNotNullish);
  return filteredFiles;
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.DELETE_CLIP, (_, path) => {
  return deleteClip(path);
});