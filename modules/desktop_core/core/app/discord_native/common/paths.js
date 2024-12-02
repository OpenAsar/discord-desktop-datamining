"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCrashFiles = getCrashFiles;
exports.getPath = getPath;
exports.getSquirrelLogs = getSquirrelLogs;
exports.getUpdaterLogs = getUpdaterLogs;
var _electron = _interopRequireDefault(require("electron"));
var _fs = _interopRequireDefault(require("fs"));
var _originalFs = _interopRequireDefault(require("original-fs"));
var _path = _interopRequireDefault(require("path"));
var _util = _interopRequireDefault(require("util"));
var _processUtils = require("../../../common/processUtils");
var _constants = require("../common/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const allowedAppPaths = new Set(['home', 'appData', 'desktop', 'documents', 'downloads', 'crashDumps', 'exe']);
const readdir = _util.default.promisify(_fs.default.readdir);
async function getPath(path) {
  if (!allowedAppPaths.has(path)) {
    throw new Error(`${path} is not an allowed app path`);
  }
  return await _electron.default.ipcRenderer.invoke(_constants.IPCEvents.APP_GET_PATH, path);
}
function getTimes(filenames) {
  return Promise.allSettled(filenames.map(filename => new Promise((resolve, reject) => {
    _originalFs.default.stat(filename, (err, stats) => {
      if (err != null) {
        return reject(err);
      }
      if (!stats.isFile()) {
        return reject(new Error('Not a file'));
      }
      return resolve({
        filename,
        mtime: stats.mtime
      });
    });
  })));
}
async function orderedFiles(folder) {
  try {
    const filenames = await readdir(folder);
    const times = await getTimes(filenames.map(filename => _path.default.join(folder, filename)));
    return times.filter(result => result.status === 'fulfilled').map(result => result.value).sort((a, b) => b.mtime.getTime() - a.mtime.getTime()).map(a => a.filename);
  } catch (err) {
    return [];
  }
}
async function getCrashFiles() {
  const crashBaseFolder = await getPath('crashDumps');
  const crashFolder = _processUtils.IS_WIN ? _path.default.join(crashBaseFolder, 'reports') : _path.default.join(crashBaseFolder, 'completed');
  return orderedFiles(crashFolder);
}
async function getUpdaterLogs() {
  if (_processUtils.IS_WIN) {
    const exeFile = await getPath('exe');
    const exeBaseFolder = _path.default.resolve(exeFile, '..');
    const updaterLogFolder = _path.default.resolve(exeBaseFolder, '..');
    const files = await orderedFiles(updaterLogFolder);
    const logFiles = files.filter(f => f.endsWith('updater_rCURRENT.log'));
    return logFiles;
  } else {
    return [];
  }
}
async function getSquirrelLogs() {
  if (_processUtils.IS_WIN) {
    const filesToUpload = [];
    const exeFile = await getPath('exe');
    const exeBaseFolder = _path.default.resolve(exeFile, '..');
    const updaterLogFolder = _path.default.resolve(exeBaseFolder, '..');
    const discordChannelLog = _path.default.join(updaterLogFolder, 'SquirrelSetup.log');
    if (_fs.default.existsSync(discordChannelLog)) {
      filesToUpload.push(discordChannelLog);
    }
    const appData = await getPath('appData');
    const squirrelTempLog = _path.default.join(appData, 'Local', 'SquirrelTemp', 'SquirrelSetup.log');
    if (_fs.default.existsSync(squirrelTempLog)) {
      filesToUpload.push(squirrelTempLog);
    }
    return filesToUpload;
  } else {
    return [];
  }
}