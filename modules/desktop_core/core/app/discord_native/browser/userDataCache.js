"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _appFeatures = require("../../appFeatures");
var _paths = require("../../bootstrapModules/paths");
var _constants = require("../common/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  USER_DATA_CACHE_SAVE,
  USER_DATA_CACHE_GET,
  USER_DATA_CACHE_DELETE
} = _constants.IPCEvents;
const features = (0, _appFeatures.getFeatures)();
function getCachePath() {
  return _path.default.join(_paths.paths.getUserData(), 'userDataCache.json');
}
function getMigratedPath() {
  return _path.default.join(_paths.paths.getUserData(), 'domainMigrated');
}
function cacheUserData(userData) {
  _fs.default.writeFile(getCachePath(), userData, e => {
    if (e) {
      console.warn('Failed updating user data cache with error: ', e);
    }
  });
}
function getCachedUserData() {
  try {
    return JSON.parse(_fs.default.readFileSync(getCachePath()));
  } catch (_err) {}
  return null;
}
function deleteCachedUserData() {
  try {
    _fs.default.unlinkSync(getCachePath());
    _fs.default.writeFile(getMigratedPath(), '', e => {
      if (e) {
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