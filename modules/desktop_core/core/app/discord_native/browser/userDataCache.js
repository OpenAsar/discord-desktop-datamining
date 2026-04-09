"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _appFeatures = require("../../appFeatures");
var _paths = require("../../bootstrapModules/paths");
var _constants = require("../common/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  USER_DATA_CACHE_SAVE,
  USER_DATA_CACHE_GET,
  USER_DATA_CACHE_DELETE
} = _constants.IPCEvents;
const features = (0, _appFeatures.getFeatures)();
function getCachePath() {
  const userData = _paths.paths.getUserData();
  if (userData === null) {
    return null;
  }
  return _path.default.join(userData, 'userDataCache.json');
}
function getMigratedPath() {
  const userData = _paths.paths.getUserData();
  if (userData === null) {
    return null;
  }
  return _path.default.join(userData, 'domainMigrated');
}
function cacheUserData(userData) {
  const cachePath = getCachePath();
  if (cachePath === null) {
    return;
  }
  _fs.default.writeFile(cachePath, userData, e => {
    if (e !== null) {
      console.warn('Failed updating user data cache with error: ', e);
    }
  });
}
function getCachedUserData() {
  const cachePath = getCachePath();
  if (cachePath === null) {
    return null;
  }
  try {
    return JSON.parse(_fs.default.readFileSync(cachePath).toString('utf-8'));
  } catch (_err) {}
  return null;
}
function deleteCachedUserData() {
  try {
    const cachePath = getCachePath();
    const migratedPath = getMigratedPath();
    if (cachePath === null || migratedPath === null) {
      return;
    }
    _fs.default.unlinkSync(cachePath);
    _fs.default.writeFile(migratedPath, '', e => {
      if (e !== null) {
        console.warn('Failed to create domainMigrated file with error: ', e);
      }
    });
  } catch (_err) {}
}
_electron.default.ipcMain.handle(USER_DATA_CACHE_GET, () => {
  return getCachedUserData();
});
_electron.default.ipcMain.on(USER_DATA_CACHE_SAVE, (_event, userData) => {
  cacheUserData(userData);
});
_electron.default.ipcMain.on(USER_DATA_CACHE_DELETE, () => {
  deleteCachedUserData();
});
features.declareSupported('user_data_cache');