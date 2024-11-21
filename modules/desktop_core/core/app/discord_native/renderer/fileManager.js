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
exports.combineWebRtcLogs = combineWebRtcLogs;
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
exports.getAndCreateLogDirectorySync = getAndCreateLogDirectorySync;
exports.getLogPath = getLogPath;
exports.getLogPathSync = getLogPathSync;
exports.getModuleDataPathSync = getModuleDataPathSync;
exports.getModulePath = getModulePath;
Object.defineProperty(exports, "join", {
  enumerable: true,
  get: function () {
    return _path.join;
  }
});
exports.logLevelSync = logLevelSync;
exports.openFiles = openFiles;
exports.readLogFiles = readLogFiles;
exports.saveWithDialog = saveWithDialog;
exports.showItemInFolder = showItemInFolder;
exports.showOpenDialog = showOpenDialog;
exports.uploadDiscordHookCrashes = uploadDiscordHookCrashes;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireWildcard(require("path"));
var _util = _interopRequireDefault(require("util"));
var blackbox = _interopRequireWildcard(require("../../../common/blackbox"));
var _utils = require("../../../common/utils");
var _DiscordIPC = require("../common/DiscordIPC");
var _fileutils = require("../common/fileutils");
var _paths = require("../common/paths");
var _crashReporter = require("./crashReporter");
var _endpoints = _interopRequireDefault(require("./endpoints"));
var _files = require("./files");
var _minidump = require("./minidump");
var _settings = _interopRequireDefault(require("./settings"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const readdir = _util.default.promisify(_fs.default.readdir);
const uploadHookCrashSequence = (0, _utils.createLock)();
const combineWebRtcLogsSequence = (0, _utils.createLock)();
async function saveWithDialog(fileContents, fileName) {
  if ((0, _files.containsInvalidFileChar)(fileName)) {
    throw new Error('fileName has invalid characters');
  }
  const options = {
    defaultPath: _path.default.join(await (0, _paths.getPath)('downloads'), fileName)
  };
  const extension = _path.default.extname(fileName);
  if (extension != null && extension !== '' && extension !== '.') {
    const trimmedExtension = extension.slice(1);
    options.filters = [{
      name: trimmedExtension,
      extensions: [trimmedExtension]
    }, {
      name: 'All',
      extensions: ['*']
    }];
  }
  const results = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_SHOW_SAVE_DIALOG, options);
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
function getAndCreateLogDirectorySync() {
  let logDir = null;
  try {
    logDir = getLogPathSync();
  } catch (e) {
    console.error('Failed to get log directory: ', e);
  }
  if (logDir != null) {
    try {
      _fs.default.mkdirSync(logDir, {
        recursive: true
      });
    } catch (e) {
      console.warn('Could not create module log directory ', logDir, ':', e);
    }
  }
  return logDir;
}
function logLevelSync() {
  return _settings.default.getSync('LOG_LEVEL', 'info');
}
async function readLogFiles(maxSize) {
  await combineWebRtcLogs('discord-webrtc_0', 'discord-webrtc_1', 'discord-webrtc');
  await combineWebRtcLogs('discord-last-webrtc_0', 'discord-last-webrtc_1', 'discord-last-webrtc');
  const modulePath = await getModulePath();
  const voicePath = _path.default.join(modulePath, 'discord_voice');
  const utilsPath = _path.default.join(modulePath, 'discord_utils');
  const filesToUpload = [_path.default.join(voicePath, 'audio_state.json'), _path.default.join(utilsPath, 'live_minidump.dmp')];
  const logPath = await getLogPath();
  const filenames = await readdir(logPath);
  const validLogFiles = filenames.filter(filename => filename.endsWith('.log')).map(filename => _path.default.join(logPath, filename));
  filesToUpload.push(...validLogFiles);
  const voiceLogFiles = ['discord-webrtc', 'discord-last-webrtc'].map(filename => _path.default.join(logPath, filename)).filter(filename => _fs.default.existsSync(filename));
  filesToUpload.push(...voiceLogFiles);
  blackbox.initializeRenderer(modulePath);
  const minidump = await blackbox.minidumpFiles.getNewestFile();
  if (minidump != null) {
    filesToUpload.push(minidump);
  }
  const blackboxLog = await blackbox.logFiles.getNewestFile();
  if (blackboxLog != null) {
    filesToUpload.push(blackboxLog);
  }
  const updaterLogs = await (0, _paths.getUpdaterLogs)();
  if (updaterLogs.length > 0) {
    filesToUpload.push(updaterLogs[0]);
  }
  const squirrelLogs = await (0, _paths.getSquirrelLogs)();
  if (squirrelLogs.length > 0) {
    filesToUpload.push(...squirrelLogs);
  }
  const crashFiles = await (0, _paths.getCrashFiles)();
  if (crashFiles.length > 0) {
    filesToUpload.push(crashFiles[0]);
  }
  return (0, _fileutils.readFulfilledFiles)(filesToUpload, maxSize, false, filename => (0, _files.isMinidumpFile)(filename));
}
async function combineWebRtcLogs(path1, path2, destinationPath) {
  const logPath = await getLogPath();
  const webRtcFile1 = _path.default.join(logPath, path1);
  const webRtcFile2 = _path.default.join(logPath, path2);
  const combinedFilePath = _path.default.join(logPath, destinationPath);
  await combineWebRtcLogsSequence(async () => {
    try {
      const [file1Data, file2Data] = await Promise.all([_fs.default.promises.readFile(webRtcFile1).catch(() => null), _fs.default.promises.readFile(webRtcFile2).catch(() => null)]);
      if (file1Data !== null && file2Data === null) {
        await _fs.default.promises.writeFile(combinedFilePath, file1Data);
      } else if (file1Data === null && file2Data !== null) {
        await _fs.default.promises.writeFile(combinedFilePath, file2Data);
      } else if (file1Data !== null && file2Data !== null) {
        const webRtcFile1Stats = await _fs.default.promises.stat(webRtcFile1);
        const webRtcFile2Stats = await _fs.default.promises.stat(webRtcFile2);
        if (webRtcFile1Stats.mtimeMs > webRtcFile2Stats.mtimeMs) {
          await _fs.default.promises.writeFile(combinedFilePath, Buffer.concat([file2Data, file1Data]));
        } else {
          await _fs.default.promises.writeFile(combinedFilePath, Buffer.concat([file1Data, file2Data]));
        }
      }
    } catch (e) {
      console.error(`combineWebRtcLogs: Failed ${e === null || e === void 0 ? void 0 : e.message}`, e);
    }
  });
}
async function uploadHookMinidumpFile(filename, fullpath, metadata) {
  const file = (await (0, _fileutils.readFulfilledFiles)([fullpath], 10 * 1024 * 1024, true))[0];
  const blob = new Blob([file.data], {
    type: 'text/plain'
  });
  const minidump = await (0, _minidump.readMinidump)(fullpath);
  const formData = new FormData();
  for (const key of Object.keys(metadata)) {
    formData.append(key, String(metadata[key]));
  }
  formData.append('sentry[tags][game]', (minidump === null || minidump === void 0 ? void 0 : minidump.processName) ?? 'Unknown');
  formData.append('game', (minidump === null || minidump === void 0 ? void 0 : minidump.processName) ?? 'Unknown');
  formData.append('upload_file_minidump', blob, filename);
  const response = await fetch(_endpoints.default.HOOK_MINIDUMP_SENTRY, {
    method: 'POST',
    body: formData
  });
  return {
    response,
    minidump
  };
}
async function uploadDiscordHookCrashes() {
  const metadata = (0, _crashReporter.getFlattenedMetadata)();
  let crashCount = 0;
  const minidumps = [];
  await uploadHookCrashSequence(async () => {
    try {
      const modulePath = await getModulePath();
      const hookPath = _path.default.join(modulePath, 'discord_hook');
      for (const filename of await _fs.default.promises.readdir(hookPath)) {
        if (!(0, _files.isHookMinidumpFile)(filename)) {
          continue;
        }
        ++crashCount;
        const fullpath = _path.default.join(hookPath, filename);
        try {
          var _uploadResult$respons;
          console.log(`uploadDiscordHookCrashes: Uploading "${fullpath}".`);
          const uploadResult = await uploadHookMinidumpFile(filename, fullpath, metadata);
          console.log(`uploadDiscordHookCrashes: Uploaded "${(_uploadResult$respons = uploadResult.response) === null || _uploadResult$respons === void 0 ? void 0 : _uploadResult$respons.status}".`);
          if (uploadResult.minidump != null) {
            minidumps.push(uploadResult.minidump);
          }
        } catch (e) {
          console.error(`uploadDiscordHookCrashes: uploadHookMinidumpFile failed ${fullpath}: ${e}`);
        }
        console.log(`uploadDiscordHookCrashes: Deleting.`);
        try {
          await _fs.default.promises.unlink(fullpath);
        } catch (e) {
          console.error(`uploadDiscordHookCrashes: unlink failed ${fullpath}: ${e}`);
        }
      }
    } catch (e) {
      console.error(`uploadDiscordHookCrashes: Failed ${e}`);
    }
    if (crashCount === 0) {
      console.log(`uploadDiscordHookCrashes: No crash reports found.`);
    }
  });
  return minidumps;
}
function showItemInFolder(path) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_SHOW_ITEM_IN_FOLDER, path);
}
async function openFiles(dialogOptions, maxSize) {
  const filenames = await showOpenDialog(dialogOptions);
  return (0, _fileutils.readFulfilledFiles)(filenames, maxSize, true);
}
function getModulePath() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_PATH);
}
function getModuleDataPathSync() {
  return _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_DATA_PATH_SYNC);
}
function getLogPath() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH);
}
function getLogPathSync() {
  return _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_MODULE_LOG_PATH_SYNC);
}