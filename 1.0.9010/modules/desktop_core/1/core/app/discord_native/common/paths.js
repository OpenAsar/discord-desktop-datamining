"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCrashFiles = getCrashFiles;
exports.getPath = getPath;

var _electron = _interopRequireDefault(require("electron"));

var _fs = _interopRequireDefault(require("fs"));

var _originalFs = _interopRequireDefault(require("original-fs"));

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _processUtils = require("../../../common/processUtils");

var _constants = require("../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const allowedAppPaths = new Set(['home', 'appData', 'desktop', 'documents', 'downloads', 'crashDumps']);

const readdir = _util.default.promisify(_fs.default.readdir);

async function getPath(path) {
  if (!allowedAppPaths.has(path)) {
    throw new Error(`${path} is not an allowed app path`);
  }

  return _electron.default.ipcRenderer.invoke(_constants.IPCEvents.APP_GET_PATH, path);
}

function getTimes(filenames) {
  return Promise.allSettled(filenames.map(filename => new Promise((resolve, reject) => {
    _originalFs.default.stat(filename, (err, stats) => {
      if (err) {
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
  // Electron 9 changes crash folder location
  const crashBaseFolder = (0, _processUtils.getElectronMajorVersion)() < 9 ? _path.default.join(_os.default.tmpdir(), 'Discord Crashes') : await getPath('crashDumps');
  const crashFolder = _processUtils.IS_WIN ? _path.default.join(crashBaseFolder, 'reports') : _path.default.join(crashBaseFolder, 'completed');
  return orderedFiles(crashFolder);
}