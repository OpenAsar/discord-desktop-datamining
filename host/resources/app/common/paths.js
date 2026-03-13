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
var _mkdirp = _interopRequireDefault(require("mkdirp"));
var _originalFs = _interopRequireDefault(require("original-fs"));
var _path = _interopRequireDefault(require("path"));
var _rimraf = _interopRequireDefault(require("rimraf"));
var processUtils = _interopRequireWildcard(require("./processUtils"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
        (0, _rimraf.default)(fullPath, _originalFs.default, error => {
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
  _mkdirp.default.sync(userDataVersionedPath);
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
  _mkdirp.default.sync(logPath);
  const exeDir = _path.default.dirname(app.getPath('exe'));
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