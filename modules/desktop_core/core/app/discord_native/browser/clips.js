"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupClipsProtocol = setupClipsProtocol;
var _buffer = _interopRequireDefault(require("buffer"));
var _electron = require("electron");
var _nodeFs = require("node:fs");
var _promises = _interopRequireDefault(require("node:fs/promises"));
var _nodeStream = require("node:stream");
var _path = _interopRequireDefault(require("path"));
var _constants = require("../../../common/constants");
var _utils = require("../../../common/utils");
var _DiscordIPC = require("../common/DiscordIPC");
var _fileutils = require("../common/fileutils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MAX_LENGTH = _buffer.default.constants.MAX_LENGTH;
const INVALID_FILE_ERROR = 'Invalid file';
const BOX_HEADER_SIZE_BYTES = 8;
const DISCORD_UUID = 'a1c8529933464db888f083f57a75a5ef';
const UUID_BOX_NAME = 'uuid';
const UUID_SIZE_BYTES = 16;
const MP4_SIGNATURE = 'ftypisom';
const MP4_SIGNATURE_SIZE_BYTES = 8;
const MP4_SIGNATURE_OFFSET_BYTES = 4;
const RANGE_HEADER_REGEX = /bytes=(\d+)?-(\d+)?/;
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
  _electron.protocol.handle(_constants.DISCORD_CLIP_PROTOCOL, async function (request) {
    const parsedURL = new URL(request.url);
    let originalPathname = parsedURL.pathname;
    if (process.platform === 'win32') {
      originalPathname = originalPathname.slice(1);
    }
    const pathname = _path.default.normalize(decodeURIComponent(originalPathname));
    const filename = _path.default.basename(pathname);
    const dirname = _path.default.dirname(pathname);
    try {
      console.log('[Clips] protocol requested: ', filename);
      const clipMetadata = await getClipMetadata(filename, dirname);
      if (clipMetadata == null) {
        throw new Error(INVALID_FILE_ERROR);
      }
    } catch (e) {
      console.error('Invalid clip requested via protocol:', e);
      return new Response('Clip not found', {
        status: 404
      });
    }
    try {
      const stats = await _promises.default.stat(pathname);
      const rangeHeader = request.headers.get('Range');
      if (rangeHeader == null) {
        return new Response(_nodeStream.Readable.toWeb((0, _nodeFs.createReadStream)(pathname)), {
          status: 200,
          headers: {
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes',
            'Content-Length': `${stats.size}`
          }
        });
      }
      const matches = RANGE_HEADER_REGEX.exec(rangeHeader);
      if (matches == null) {
        return new Response(null, {
          status: 416,
          headers: {
            'Content-Range': `bytes */${stats.size}`
          }
        });
      }
      const start = matches[1] != null ? parseInt(matches[1], 10) : 0;
      const end = matches[2] != null ? parseInt(matches[2], 10) : stats.size - 1;
      if (Number.isNaN(start) || start > stats.size || end > stats.size) {
        return new Response(null, {
          status: 416,
          headers: {
            'Content-Range': `bytes */${stats.size}`
          }
        });
      }
      const stream = (0, _nodeFs.createReadStream)(pathname, {
        start,
        end
      });
      const resp = new Response(_nodeStream.Readable.toWeb(stream), {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${stats.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': `${end - start + 1}`,
          'Content-Type': `video/mp4`
        }
      });
      return resp;
    } catch (e) {
      console.error('Something went wrong when serving the clip:', e);
      return new Response('Clip serve failure', {
        status: 500
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
    const buffer = Buffer.from(result[0].data);
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
async function extractJpegComment(filepath) {
  const handle = await _promises.default.open(filepath, 'r');
  try {
    const headerBuffer = Buffer.alloc(2);
    await (0, _fileutils.readExactly)({
      handle,
      buffer: headerBuffer,
      position: 0
    });
    if (headerBuffer[0] !== 0xff || headerBuffer[1] !== 0xd8) {
      return null;
    }
    let position = 2;
    const markerBuffer = Buffer.alloc(4);
    while (true) {
      await (0, _fileutils.readExactly)({
        handle,
        buffer: markerBuffer,
        position
      });
      if (markerBuffer[0] !== 0xff) {
        return null;
      }
      const markerType = markerBuffer[1];
      const segmentLength = markerBuffer.readUInt16BE(2);
      if (markerType === 0xfe) {
        const commentBuffer = Buffer.alloc(segmentLength - 2);
        await (0, _fileutils.readExactly)({
          handle,
          buffer: commentBuffer,
          position: position + 4
        });
        return commentBuffer.toString('utf-8');
      }
      if (markerType === 0xda) {
        return null;
      }
      position += 2 + segmentLength;
    }
  } catch (e) {
    console.log(`Error reading JPEG comment from ${filepath}: ${e}`);
    return null;
  } finally {
    await (handle === null || handle === void 0 ? void 0 : handle.close());
  }
}
async function getScreenshotMetadata(filename, dirPath) {
  try {
    const isScreenshot = filename.endsWith('.jpeg') || filename.endsWith('.jpg');
    if (!isScreenshot) {
      return null;
    }
    const filepath = _path.default.join(dirPath, filename);
    const jpegComment = await extractJpegComment(filepath);
    if (jpegComment == null) {
      return null;
    }
    const handle = await _promises.default.open(filepath, 'r');
    let thumbnail;
    try {
      const buffer = await _promises.default.readFile(handle);
      const base64 = buffer.toString('base64');
      thumbnail = `data:image/jpeg;base64,${base64}`;
    } catch (e) {
      console.log(`Failed to create thumbnail for ${filename}: ${e}`);
    } finally {
      await handle.close();
    }
    try {
      const metadata = JSON.parse(jpegComment);
      return {
        filepath: filepath,
        metadata: {
          ...metadata,
          thumbnail
        }
      };
    } catch (e) {
      console.log(`Failed to parse JPEG comment as JSON for ${filename}: ${e}`);
      return null;
    }
  } catch (e) {
    console.log(`Error loading screenshot metadata for ${filename}: ${e}`);
    return null;
  }
}
async function deleteClip(filepath) {
  try {
    const isScreenshot = filepath.endsWith('.jpeg') || filepath.endsWith('.jpg');
    if (isScreenshot) {
      await (0, _fileutils.deleteFile)(filepath);
    } else {
      await loadClip(filepath);
      await (0, _fileutils.deleteFile)(filepath);
    }
  } catch (e) {
    console.log(`Invalid clips file to delete: ${e}`);
    throw new Error(INVALID_FILE_ERROR);
  }
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.LOAD_CLIP, (_, path) => {
  return loadClip(path);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.LOAD_CLIPS_DIRECTORY, async (_, dirPath) => {
  await (0, _fileutils.ensureDirectoryExists)(dirPath);
  const filenames = await (0, _fileutils.getFilesnamesFromDirectory)(dirPath);
  const loadedFiles = await Promise.all(filenames.map(async filename => {
    const clipMetadata = await getClipMetadata(filename, dirPath);
    if (clipMetadata != null) {
      return clipMetadata;
    }
    const screenshotMetadata = await getScreenshotMetadata(filename, dirPath);
    if (screenshotMetadata != null) {
      return screenshotMetadata;
    }
    return null;
  }));
  const filteredFiles = loadedFiles.filter(_utils.isNotNullish);
  return filteredFiles;
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.DELETE_CLIP, (_, path) => {
  return deleteClip(path);
});