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
exports.cleanupTempFiles = cleanupTempFiles;
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
exports.getModuleDataPathSync = getModuleDataPathSync;
exports.getModulePath = getModulePath;
Object.defineProperty(exports, "join", {
  enumerable: true,
  get: function () {
    return _path.join;
  }
});
exports.openFiles = openFiles;
exports.readLogFiles = readLogFiles;
exports.readTimeSeriesLogFiles = readTimeSeriesLogFiles;
exports.saveWithDialog = saveWithDialog;
exports.showItemInFolder = showItemInFolder;
exports.showOpenDialog = showOpenDialog;
var _buffer = _interopRequireDefault(require("buffer"));
var _fs = _interopRequireDefault(require("fs"));
var _originalFs = _interopRequireDefault(require("original-fs"));
var _path = _interopRequireWildcard(require("path"));
var _util = _interopRequireDefault(require("util"));
var _DiscordIPC = require("../common/DiscordIPC");
var _paths = require("../common/paths");
var _files = require("./files");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-console */

// eslint-disable-line import/no-unresolved

// Reason for original-fs being import/no-unresolved: https://github.com/discord/discord/pull/74159#discussion_r893733771

const MAX_LENGTH = _buffer.default.constants.MAX_LENGTH;
const INVALID_FILENAME_CHAR_REGEX = /[^a-zA-Z0-9-_.]/g;
const promiseFs = {
  readdir: _util.default.promisify(_originalFs.default.readdir),
  open: _util.default.promisify(_originalFs.default.open),
  fstat: _util.default.promisify(_originalFs.default.fstat),
  stat: _util.default.promisify(_originalFs.default.stat),
  unlink: _util.default.promisify(_originalFs.default.unlink),
  read: _util.default.promisify(_originalFs.default.read),
  close: _util.default.promisify(_originalFs.default.close)
};
async function saveWithDialog(fileContents, fileName) {
  if (INVALID_FILENAME_CHAR_REGEX.test(fileName)) {
    throw new Error('fileName has invalid characters');
  }
  const defaultPath = _path.default.join(await (0, _paths.getPath)('downloads'), fileName);
  const results = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_SHOW_SAVE_DIALOG, {
    defaultPath
  });
  if (results != null && results.filePath != null) {
    _fs.default.writeFileSync(results.filePath, fileContents);
  }
}
async function showOpenDialog({
  filters,
  properties
}) {
  const results = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_SHOW_OPEN_DIALOG, {
    filters,
    properties
  });
  return results.filePaths;
}
async function readLogFiles(maxSize) {
  // MAX_DEBUG_LOG_FILES may need to be increased as more files are added.
  const modulePath = await getModulePath();
  const voicePath = _path.default.join(modulePath, 'discord_voice');
  const hookPath = _path.default.join(modulePath, 'discord_hook');
  const utilsPath = _path.default.join(modulePath, 'discord_utils');
  const filesToUpload = [_path.default.join(voicePath, 'discord-webrtc_0'), _path.default.join(voicePath, 'discord-webrtc_1'), _path.default.join(voicePath, 'discord-last-webrtc_0'), _path.default.join(voicePath, 'discord-last-webrtc_1'), _path.default.join(voicePath, 'audio_state.json'), _path.default.join(hookPath, 'hook.log'), _path.default.join(utilsPath, 'live_minidump.dmp')];
  const crashFiles = await (0, _paths.getCrashFiles)();
  if (crashFiles.length > 0) {
    filesToUpload.push(crashFiles[0]);
  }
  return readFulfilledFiles(filesToUpload, maxSize, false);
}
async function readTimeSeriesLogFiles(maxSize, blindChannelId) {
  if (blindChannelId == null) {
    console.error('readTimeSeriesLogFiles: blindChannelId missing.');
    return [];
  }
  const modulePath = await getModulePath();
  const voicePath = _path.default.join(modulePath, 'discord_voice');
  // Example filename: "channel.17812072731293278934.16605628624321906260.tsi"
  const filter = new RegExp(`^channel\\.${blindChannelId}\\.\\d+\\.(?:tsi|tsd)$`, 'i');
  const filenames = [];
  for (const file of await promiseFs.readdir(voicePath)) {
    if (filter.test(file)) {
      filenames.push(_path.default.join(voicePath, file));
    }
  }
  const allLogFiles = [...filenames];
  const maxLogFiles = 10; // 10 is arbitrary but seems reasonable as each would be ~1mb.
  if (filenames.length > maxLogFiles) {
    console.warn(`readTimeSeriesLogFiles: Exceeded limit of ${maxLogFiles} files, had ${filenames.length}.`);
    filenames.splice(maxLogFiles);
  }
  const readfiles = await readFulfilledFiles(filenames, maxSize, false);
  // Delete the files after they've been read.
  await Promise.all(allLogFiles.map(filename => promiseFs.unlink(filename)));
  return readfiles;
}
async function cleanupTempFiles() {
  // Since this runs on startup, handle and report all errors as cleanly as possible.
  try {
    const modulePath = await getModulePath();
    const voicePath = _path.default.join(modulePath, 'discord_voice');
    const deleteAgeTimeSpan = 1 * 24 * 60 * 60 * 1000; // 1 day.
    const deleteAge = new Date(Date.now() - deleteAgeTimeSpan);
    for (const filename of await promiseFs.readdir(voicePath)) {
      if (!(0, _files.isTempFile)(filename)) {
        continue;
      }
      const fullpath = _path.default.join(voicePath, filename);
      const stat = await promiseFs.stat(fullpath);
      if (!stat.isFile() || stat.mtime > deleteAge) {
        continue;
      }
      console.log(`cleanupTempFiles: Deleting "${fullpath}" due to age.`);
      try {
        await promiseFs.unlink(fullpath);
      } catch (e) {
        console.error(`cleanupTempFiles: Failed to unlink ${fullpath}: ${e}`);
      }
    }
  } catch (e) {
    console.error(`cleanupTempFiles: Failed ${e}`);
  }
}
function showItemInFolder(path) {
  _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_SHOW_ITEM_IN_FOLDER, path);
  return Promise.resolve();
}
async function openFiles(dialogOptions, maxSize) {
  const filenames = await showOpenDialog(dialogOptions);
  return readFulfilledFiles(filenames, maxSize, true);
}

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

function getModulePath() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_PATH);
}
function getModuleDataPathSync() {
  return _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC);
}