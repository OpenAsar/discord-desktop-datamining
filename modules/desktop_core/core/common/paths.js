"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanOldVersions = cleanOldVersions;
exports.getAssetCachePath = getAssetCachePath;
exports.getInstallPath = getInstallPath;
exports.getLogPath = getLogPath;
exports.getModuleDataPath = getModuleDataPath;
exports.getResources = getResources;
exports.getRootPath = getRootPath;
exports.getUserData = getUserData;
exports.getUserDataVersioned = getUserDataVersioned;
exports.init = init;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let userDataPath = null;
let userDataVersionedPath = null;
let resourcesPath = null;
let moduleDataPath = null;
let assetCachePath = null;
let logPath = null;
let installPath = null;
let rootPath = null;
function determineAppUserDataRoot() {
  const userDataPath = process.env.DISCORD_USER_DATA_DIR;
  if (userDataPath != null) {
    return userDataPath;
  }
  const {
    app
  } = require('electron');
  return app.getPath('appData');
}
function determineUserData(userDataRoot, buildInfo) {
  return _path.default.join(userDataRoot, 'discord' + (buildInfo.releaseChannel === 'stable' ? '' : buildInfo.releaseChannel));
}
function cleanOldVersions(buildInfo) {
  if (userDataPath == null) {
    return;
  }
  const entries = _fs.default.readdirSync(userDataPath);
  entries.forEach(entry => {
    if (userDataPath == null) {
      return;
    }
    const fullPath = _path.default.join(userDataPath, entry);
    let stat;
    try {
      stat = _fs.default.lstatSync(fullPath);
    } catch (e) {
      return;
    }
    if (stat.isDirectory() && entry.indexOf(buildInfo.version) === -1) {
      if (entry.match('^[0-9]+.[0-9]+.[0-9]+') != null) {
        console.log('Removing old directory ', entry);
        const rimraf = require('rimraf');
        const originalFs = require('original-fs');
        rimraf(fullPath, originalFs, error => {
          if (error != null) {
            console.warn('...failed with error: ', error);
          }
        });
      }
    }
  });
}
function init(buildInfo) {
  resourcesPath = _path.default.join(require.main.filename, '..', '..', '..');
  const userDataRoot = determineAppUserDataRoot();
  userDataPath = determineUserData(userDataRoot, buildInfo);
  const {
    app
  } = require('electron');
  app.setPath('userData', userDataPath);
  userDataVersionedPath = _path.default.join(userDataPath, buildInfo.version);
  _fs.default.mkdirSync(userDataVersionedPath, {
    recursive: true
  });
  if (buildInfo.localModulesRoot != null) {
    moduleDataPath = buildInfo.localModulesRoot;
  } else if (buildInfo.newUpdater) {
    moduleDataPath = _path.default.join(userDataPath, 'module_data');
  } else if (buildInfo.standaloneModules) {
    moduleDataPath = _path.default.join(resourcesPath, 'standalone_modules');
  } else {
    moduleDataPath = _path.default.join(userDataVersionedPath, 'modules');
  }
  assetCachePath = _path.default.join(userDataPath, 'discord_asset_cache');
  logPath = _path.default.join(userDataPath, 'logs');
  _fs.default.mkdirSync(logPath, {
    recursive: true
  });
  const exeDir = _path.default.dirname(app.getPath('exe'));
  const processUtils = require('./processUtils');
  if (/^app-[0-9]+\.[0-9]+\.[0-9]+/.test(_path.default.basename(exeDir))) {
    installPath = _path.default.join(exeDir, '..');
  } else if (processUtils.IS_OSX) {
    installPath = _path.default.join(exeDir, '..', '..', '..');
  }
  if (processUtils.IS_OSX) {
    rootPath = userDataPath;
  } else {
    rootPath = installPath;
  }
}
function getUserData() {
  return userDataPath;
}
function getUserDataVersioned() {
  return userDataVersionedPath;
}
function getResources() {
  return resourcesPath;
}
function getModuleDataPath() {
  return moduleDataPath;
}
function getAssetCachePath() {
  return assetCachePath;
}
function getLogPath() {
  return logPath;
}
function getInstallPath() {
  return installPath;
}
function getRootPath() {
  return rootPath;
}