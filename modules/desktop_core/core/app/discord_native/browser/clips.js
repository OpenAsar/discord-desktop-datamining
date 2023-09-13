"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupClipsProtocol = setupClipsProtocol;
var _buffer = _interopRequireDefault(require("buffer"));
var _electron = require("electron");
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _constants = require("../../../common/constants");
var _utils = require("../../../common/utils");
var _DiscordIPC = require("../common/DiscordIPC");
var _fileutils = require("../common/fileutils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MAX_LENGTH = _buffer.default.constants.MAX_LENGTH;
const INVALID_FILE_ERROR = 'Invalid file';
const BOX_HEADER_SIZE_BYTES = 8;
const DISCORD_UUID = 'a1c8529933464db888f083f57a75a5ef';
const UUID_BOX_NAME = 'uuid';
const UUID_SIZE_BYTES = 16;
const MP4_SIGNATURE = 'ftypisom';
const MP4_SIGNATURE_SIZE_BYTES = 8;
const MP4_SIGNATURE_OFFSET_BYTES = 4;
class InvalidFileError extends Error {}
function verifyIsMP4(buffer) {
  if (buffer.toString('ascii', MP4_SIGNATURE_OFFSET_BYTES, MP4_SIGNATURE_OFFSET_BYTES + MP4_SIGNATURE_SIZE_BYTES) !== MP4_SIGNATURE) {
    throw new InvalidFileError(INVALID_FILE_ERROR);
  }
}
function verifyHasMP4Extension(filename) {
  if (_path.default.parse(filename).ext.toLowerCase() !== '.mp4') {
    throw new InvalidFileError(INVALID_FILE_ERROR);
  }
}
function getBoxSize(buffer, startIndex) {
  return buffer.readUInt32BE(startIndex);
}
function getBoxHeaderName(buffer, startIndex) {
  return buffer.toString('ascii', startIndex + 4, startIndex + BOX_HEADER_SIZE_BYTES);
}
function getUUID(buffer, startIndex) {
  return buffer.toString('hex', startIndex + BOX_HEADER_SIZE_BYTES, startIndex + BOX_HEADER_SIZE_BYTES + UUID_SIZE_BYTES);
}
function isDiscordUUIDBox(buffer, startIndex) {
  return getBoxHeaderName(buffer, startIndex) === UUID_BOX_NAME && getUUID(buffer, startIndex) === DISCORD_UUID;
}
function setupClipsProtocol() {
  _electron.protocol.registerFileProtocol(_constants.DISCORD_CLIP_PROTOCOL, async function (request, callback) {
    const parsedURL = new URL(request.url);
    const filepath = (0, _url.fileURLToPath)(parsedURL.href.replace(parsedURL.protocol, 'file:'));
    const filename = _path.default.basename(filepath);
    const dirname = _path.default.dirname(filepath);
    try {
      const clipMetadata = await getClipMetadata(filename, dirname);
      if (clipMetadata == null) {
        throw new Error(INVALID_FILE_ERROR);
      }
      callback({
        path: filepath
      });
    } catch (e) {
      console.error('Invalid clip requested via protocol:', e);
      callback({
        error: -6,
        statusCode: 404
      });
    }
  });
}
function verifyValidClip(buffer) {
  let currIndex = 0;
  while (currIndex < buffer.byteLength) {
    if (isDiscordUUIDBox(buffer, currIndex)) {
      return;
    }
    const boxSize = getBoxSize(buffer, currIndex);
    if (boxSize < BOX_HEADER_SIZE_BYTES) {
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
  let currIndex = 0;
  const filepath = _path.default.join(dirPath, filename);
  const handle = await _promises.default.open(filepath, 'r');
  try {
    const stats = await handle.stat();
    const mp4HeaderBuffer = Buffer.alloc(BOX_HEADER_SIZE_BYTES + UUID_SIZE_BYTES);
    await (0, _fileutils.readExactly)({
      handle,
      buffer: mp4HeaderBuffer,
      position: 0
    });
    verifyIsMP4(mp4HeaderBuffer);
    currIndex += getBoxSize(mp4HeaderBuffer, currIndex);
    while (currIndex < stats.size) {
      await (0, _fileutils.readExactly)({
        handle,
        buffer: mp4HeaderBuffer,
        position: currIndex
      });
      const boxSize = getBoxSize(mp4HeaderBuffer, 0);
      if (boxSize < BOX_HEADER_SIZE_BYTES) {
        return null;
      }
      if (isDiscordUUIDBox(mp4HeaderBuffer, 0)) {
        const metadataOffset = BOX_HEADER_SIZE_BYTES + UUID_SIZE_BYTES;
        const metadataBuffer = Buffer.alloc(boxSize - metadataOffset);
        await (0, _fileutils.readExactly)({
          handle,
          buffer: metadataBuffer,
          position: currIndex + metadataOffset
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
    await (handle === null || handle === void 0 ? void 0 : handle.close());
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