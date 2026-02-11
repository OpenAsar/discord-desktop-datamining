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
exports.checkMLModelFilesExist = checkMLModelFilesExist;
exports.checkVoiceFilterFilesExist = checkVoiceFilterFilesExist;
exports.cleanupUnusedMLModelFiles = cleanupUnusedMLModelFiles;
exports.cleanupUnusedOpenH264Files = cleanupUnusedOpenH264Files;
exports.cleanupUnusedVoiceFilterFiles = cleanupUnusedVoiceFilterFiles;
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
exports.getAssetCachePath = getAssetCachePath;
exports.getAssetCachePathSync = getAssetCachePathSync;
exports.getLogPath = getLogPath;
exports.getLogPathSync = getLogPathSync;
exports.getMLDataDir = getMLDataDir;
exports.getMLDataDirSync = getMLDataDirSync;
exports.getModuleDataPathSync = getModuleDataPathSync;
exports.getModulePath = getModulePath;
exports.getOpenH264Dir = getOpenH264Dir;
exports.getVoiceFilterDataDir = getVoiceFilterDataDir;
exports.getVoiceFilterDataDirSync = getVoiceFilterDataDirSync;
Object.defineProperty(exports, "join", {
  enumerable: true,
  get: function () {
    return _path.join;
  }
});
exports.logLevelSync = logLevelSync;
exports.maybeDownloadMLModelFile = maybeDownloadMLModelFile;
exports.maybeDownloadOpenH264 = maybeDownloadOpenH264;
exports.maybeDownloadVoiceFilterFile = maybeDownloadVoiceFilterFile;
exports.openFiles = openFiles;
exports.readLogFiles = readLogFiles;
exports.saveWithDialog = saveWithDialog;
exports.saveWithDialog2 = saveWithDialog2;
exports.showItemInFolder = showItemInFolder;
exports.showOpenDialog = showOpenDialog;
exports.stopMLModelDownloads = stopMLModelDownloads;
exports.stopVoiceFilterDownloads = stopVoiceFilterDownloads;
exports.uploadDiscordHookCrashes = uploadDiscordHookCrashes;
var _unbzip2Stream = _interopRequireDefault(require("@openpgp/unbzip2-stream"));
var _fs = _interopRequireDefault(require("fs"));
var _nodeDownloaderHelper = require("node-downloader-helper");
var _nodeCrypto = require("node:crypto");
var _promises = require("node:fs/promises");
var _nodeStream = require("node:stream");
var _promises2 = require("node:stream/promises");
var _path = _interopRequireWildcard(require("path"));
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const uploadHookCrashSequence = (0, _utils.createLock)();
const combineWebRtcLogsSequence = (0, _utils.createLock)();
async function saveWithDialog(fileContents, fileName, defaultDirectory) {
  const result = await saveWithDialog2(fileContents, fileName, defaultDirectory, true);
  return (result === null || result === void 0 ? void 0 : result.directory) ?? null;
}
async function saveWithDialog2(fileContents, fileName, defaultDirectory, throwOnCancel = false) {
  if ((0, _files.containsInvalidFileChar)(fileName)) {
    throw new Error('fileName has invalid characters');
  }
  const defaultPath = defaultDirectory != null && defaultDirectory !== '' ? defaultDirectory : await (0, _paths.getPath)('downloads');
  const options = {
    defaultPath: _path.default.join(defaultPath, fileName)
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
  if (results == null || results.filePath == null) {
    return null;
  }
  if (results.canceled || results.filePath === '') {
    if (throwOnCancel) {
      throw new Error('Save dialog was canceled by user');
    }
    return {
      canceledByUser: true,
      filePath: '',
      directory: ''
    };
  }
  _fs.default.writeFileSync(results.filePath, fileContents);
  return {
    canceledByUser: false,
    filePath: results.filePath,
    directory: _path.default.dirname(results.filePath)
  };
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
async function maybeDownloadAsset(cdnURL, fileName, category, onProgress) {
  const {
    destination,
    downloaders
  } = category;
  if ((0, _files.containsInvalidFileChar)(fileName)) {
    throw new Error(category.name + ' fileName has invalid characters');
  }
  if (!Boolean(fileName)) {
    throw new Error(category.name + ' fileName is not set');
  }
  try {
    await (0, _promises.mkdir)(destination, {
      recursive: true
    });
  } catch (cause) {
    throw new Error(category.name + ' unable create data dir', {
      cause
    });
  }
  const finishedFilePath = _path.default.join(destination, fileName);
  try {
    await _fs.default.promises.access(finishedFilePath);
    return {
      fetchedFromNetwork: false
    };
  } catch {}
  const partialFileName = `${fileName}.partial`;
  const partialFilePath = _path.default.join(destination, partialFileName);
  const dl = new _nodeDownloaderHelper.DownloaderHelper(cdnURL, destination, {
    method: 'GET',
    resumeOnIncomplete: true,
    resumeOnIncompleteMaxRetry: 5,
    resumeIfFileExists: true,
    fileName: partialFileName,
    retry: {
      maxRetries: 3,
      delay: 1000
    },
    removeOnStop: false,
    removeOnFail: false,
    progressThrottle: 200
  });
  downloaders.push(new WeakRef(dl));
  return new Promise((resolve, reject) => {
    dl.on('end', ({
      incomplete
    }) => {
      if (incomplete) {
        reject(new Error(category.name + ' download incomplete'));
      } else {
        (0, _promises.rename)(partialFilePath, finishedFilePath).then(() => resolve({
          fetchedFromNetwork: true
        })).catch(reject);
      }
    });
    dl.on('skip', () => {
      (0, _promises.rename)(partialFilePath, finishedFilePath).then(() => resolve({
        fetchedFromNetwork: false
      })).catch(reject);
    });
    dl.on('progress.throttled', ({
      downloaded: downloadedBytes,
      total: totalBytes
    }) => {
      onProgress({
        downloadedBytes,
        totalBytes
      });
    });
    dl.on('timeout', () => reject(new Error(category.name + ' timeout')));
    dl.on('error', reject);
    dl.on('stop', () => reject({
      USER_CANCELED_DOWNLOAD: true
    }));
    dl.start().catch(reject);
  });
}
async function cleanupUnusedAssets(neededFileNames, assetPath, category) {
  const deletedFiles = [];
  const errors = [];
  try {
    try {
      await _fs.default.promises.access(assetPath);
    } catch {
      return {
        deletedFiles,
        errors
      };
    }
    const existingFiles = await _fs.default.promises.readdir(assetPath);
    const neededFileSet = new Set(neededFileNames);
    const neededPartialFileSet = new Set(neededFileNames.map(fileName => `${fileName}.partial`));
    for (const fileName of existingFiles) {
      if (neededFileSet.has(fileName)) {
        continue;
      }
      if (fileName.endsWith('.partial')) {
        if (neededPartialFileSet.has(fileName)) {
          continue;
        }
      } else {
        if (fileName.startsWith('.') || !fileName.includes('.')) {
          continue;
        }
      }
      const fullPath = _path.default.join(assetPath, fileName);
      try {
        await _fs.default.promises.unlink(fullPath);
        deletedFiles.push(fileName);
        console.log(`${category} cleanup: Deleted unused file "${fileName}"`);
      } catch (error) {
        const errorMsg = `Failed to delete "${fileName}": ${error}`;
        errors.push(errorMsg);
        console.error(`${category} cleanup: ${errorMsg}`);
      }
    }
    if (deletedFiles.length > 0) {
      console.log(`${category} cleanup: Deleted ${deletedFiles.length} unused files`);
    }
  } catch (cause) {
    const errorMsg = `${category} cleanup failed: ${cause}`;
    errors.push(errorMsg);
    console.error(errorMsg);
  }
  return {
    deletedFiles,
    errors
  };
}
const voiceFilterDownloaders = [];
async function maybeDownloadVoiceFilterFile(cdnURL, fileName, onProgress) {
  if (!cdnURL.startsWith('https://cdn.discordapp.com/assets/content')) {
    throw new Error('Voice Filters invalid CDN URL');
  }
  let voiceFiltersDataPath;
  try {
    voiceFiltersDataPath = await getVoiceFilterDataDir();
  } catch (cause) {
    throw new Error('Voice Filters unable to get path of data dir', {
      cause
    });
  }
  return maybeDownloadAsset(cdnURL, fileName, {
    name: 'Voice Filters',
    destination: voiceFiltersDataPath,
    downloaders: voiceFilterDownloaders
  }, onProgress);
}
function stopVoiceFilterDownloads() {
  while (voiceFilterDownloaders.length > 0) {
    var _voiceFilterDownloade;
    const dl = (_voiceFilterDownloade = voiceFilterDownloaders.pop()) === null || _voiceFilterDownloade === void 0 ? void 0 : _voiceFilterDownloade.deref();
    void (dl === null || dl === void 0 ? void 0 : dl.stop());
  }
}
async function checkVoiceFilterFilesExist(files) {
  let voiceFiltersDataPath;
  try {
    voiceFiltersDataPath = getVoiceFilterDataDirSync();
  } catch (cause) {
    throw new Error('Voice Filters unable to get path of data dir', {
      cause
    });
  }
  const results = await Promise.all(files.map(async file => {
    const fullPath = _path.default.join(voiceFiltersDataPath, file.fileName);
    try {
      await _fs.default.promises.access(fullPath);
      return {
        ...file,
        exists: true
      };
    } catch (error) {
      return {
        ...file,
        exists: false
      };
    }
  }));
  return results;
}
async function cleanupUnusedVoiceFilterFiles(neededFileNames) {
  let voiceFiltersDataPath;
  try {
    voiceFiltersDataPath = await getVoiceFilterDataDir();
  } catch (cause) {
    const errorMsg = `Voice Filters cleanup failed: ${cause}`;
    console.error(errorMsg);
    return {
      deletedFiles: [],
      errors: [errorMsg]
    };
  }
  return cleanupUnusedAssets(neededFileNames, voiceFiltersDataPath, 'Voice Filters');
}
const mlModelDownloaders = [];
async function maybeDownloadMLModelFile(cdnURL, fileName, onProgress) {
  if (!cdnURL.startsWith('https://cdn.discordapp.com/assets/content')) {
    throw new Error('ML Models invalid CDN URL');
  }
  let mlModelsDataPath;
  try {
    mlModelsDataPath = await getMLDataDir();
  } catch (cause) {
    throw new Error('ML Models unable to get path of data dir', {
      cause
    });
  }
  return maybeDownloadAsset(cdnURL, fileName, {
    name: 'ML Models',
    destination: mlModelsDataPath,
    downloaders: mlModelDownloaders
  }, onProgress);
}
function stopMLModelDownloads() {
  while (mlModelDownloaders.length > 0) {
    var _mlModelDownloaders$p;
    const dl = (_mlModelDownloaders$p = mlModelDownloaders.pop()) === null || _mlModelDownloaders$p === void 0 ? void 0 : _mlModelDownloaders$p.deref();
    void (dl === null || dl === void 0 ? void 0 : dl.stop());
  }
}
async function checkMLModelFilesExist(files) {
  let mlModelsDataPath;
  try {
    mlModelsDataPath = getMLDataDirSync();
  } catch (cause) {
    throw new Error('ML Models unable to get path of data dir', {
      cause
    });
  }
  const results = await Promise.all(files.map(async file => {
    const fullPath = _path.default.join(mlModelsDataPath, file.fileName);
    try {
      await _fs.default.promises.access(fullPath);
      return {
        ...file,
        exists: true
      };
    } catch (error) {
      return {
        ...file,
        exists: false
      };
    }
  }));
  return results;
}
async function cleanupUnusedMLModelFiles(neededFileNames) {
  let mlModelsDataPath;
  try {
    mlModelsDataPath = await getMLDataDir();
  } catch (cause) {
    const errorMsg = `ML Models cleanup failed: ${cause}`;
    console.error(errorMsg);
    return {
      deletedFiles: [],
      errors: [errorMsg]
    };
  }
  return cleanupUnusedAssets(neededFileNames, mlModelsDataPath, 'ML Models');
}
async function maybeDownloadOpenH264(cdnURL, fileName, sha256, onProgress) {
  if (!cdnURL.startsWith('https://ciscobinary.openh264.org/')) {
    throw new Error('OpenH264 invalid CDN URL');
  }
  if (!cdnURL.endsWith('.bz2')) {
    throw new Error('OpenH264 CDN URL must point to a bzip2 archive');
  }
  let openH264Path;
  try {
    openH264Path = await getOpenH264Dir();
  } catch (cause) {
    throw new Error('Unable to get OpenH264 path', {
      cause
    });
  }
  const filePath = _path.default.join(openH264Path, fileName);
  try {
    await _fs.default.promises.access(filePath);
    return {
      fetchedFromNetwork: false
    };
  } catch {}
  const archiveName = fileName + '.bz2';
  const result = await maybeDownloadAsset(cdnURL, archiveName, {
    name: 'OpenH264',
    destination: openH264Path,
    downloaders: []
  }, onProgress);
  const archivePath = openH264Path + '/' + archiveName;
  const stream = (0, _unbzip2Stream.default)(_nodeStream.Readable.toWeb(_fs.default.createReadStream(archivePath)));
  const hash = (0, _nodeCrypto.createHash)('sha256');
  try {
    await (0, _promises2.pipeline)(stream, async function* (source) {
      for await (const chunk of source) {
        hash.update(chunk);
        yield chunk;
      }
    }, _fs.default.createWriteStream(filePath));
  } catch (cause) {
    try {
      await cleanupUnusedOpenH264Files([]);
    } catch (e) {
      console.warn('Removing bad OpenH264 download failed', e);
    }
    throw new Error('OpenH264 unbzip2 failed', {
      cause
    });
  }
  const calcSha = hash.digest('hex');
  if (calcSha !== sha256) {
    try {
      await cleanupUnusedOpenH264Files([]);
    } catch (e) {
      console.warn('Removing bad OpenH264 download failed', e);
    }
    throw new Error('OpenH264 Expected sha256 ' + sha256 + ', but got ' + calcSha);
  }
  return result;
}
async function cleanupUnusedOpenH264Files(neededFileNames) {
  let openH264Path;
  try {
    openH264Path = await getOpenH264Dir();
  } catch (cause) {
    const errorMsg = `OpenH264 cleanup failed: ${cause}`;
    console.error(errorMsg);
    return {
      deletedFiles: [],
      errors: [errorMsg]
    };
  }
  return cleanupUnusedAssets(neededFileNames, openH264Path, 'OpenH264');
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
  const filenames = await (0, _promises.readdir)(logPath);
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
  const systemServiceLogs = await (0, _paths.getSystemServiceLogs)();
  if (systemServiceLogs.length > 0) {
    filesToUpload.push(systemServiceLogs[0]);
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
async function getVoiceFilterDataDir() {
  const assetCachePath = await getAssetCachePath();
  return _path.default.join(assetCachePath, 'voice_filters');
}
function getVoiceFilterDataDirSync() {
  return _path.default.join(getAssetCachePathSync(), 'voice_filters');
}
async function getMLDataDir() {
  const assetCachePath = await getAssetCachePath();
  return _path.default.join(assetCachePath, 'ml');
}
function getMLDataDirSync() {
  return _path.default.join(getAssetCachePathSync(), 'ml');
}
async function getOpenH264Dir() {
  const assetCachePath = await getAssetCachePath();
  return _path.default.join(assetCachePath, 'openh264');
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
function getAssetCachePath() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_ASSET_CACHE_PATH);
}
function getAssetCachePathSync() {
  return _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.FILE_MANAGER_GET_ASSET_CACHE_PATH_SYNC);
}