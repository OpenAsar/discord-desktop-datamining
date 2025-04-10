"use strict";

var _discord_media = _interopRequireDefault(require("./discord_media.node"));
var _ref, _ref$DiscordNative; // eslint-disable-next-line import/no-unresolved, import/extensions
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Init logging
var isFileManagerAvailable = (_ref = window) === null || _ref === void 0 ? void 0 : (_ref$DiscordNative = _ref.DiscordNative) === null || _ref$DiscordNative === void 0 ? void 0 : _ref$DiscordNative.fileManager;
var isLogDirAvailable = isFileManagerAvailable === null || isFileManagerAvailable === void 0 ? void 0 : isFileManagerAvailable.getAndCreateLogDirectorySync;
var initializeArgs = {};
var nativeData = {
  nativeReleaseChannel: 'unknown',
  nativeVersion: 'unknown',
  nativeBuildNumber: 0,
  nativeAppArch: 'unknown'
};
if (isLogDirAvailable) {
  var _ref2, _ref2$DiscordNative, _ref2$DiscordNative$a, _ref2$DiscordNative$a2, _ref3, _ref3$DiscordNative, _ref3$DiscordNative$a, _ref3$DiscordNative$a2, _ref4, _ref4$DiscordNative, _ref4$DiscordNative$a, _ref4$DiscordNative$a2, _ref5, _ref5$DiscordNative, _ref5$DiscordNative$a, _ref5$DiscordNative$a2;
  var logDirectory = window.DiscordNative.fileManager.getAndCreateLogDirectorySync();
  var logLevel = window.DiscordNative.fileManager.logLevelSync();
  var nativeReleaseChannel = (_ref2 = window) === null || _ref2 === void 0 ? void 0 : (_ref2$DiscordNative = _ref2.DiscordNative) === null || _ref2$DiscordNative === void 0 ? void 0 : (_ref2$DiscordNative$a = (_ref2$DiscordNative$a2 = _ref2$DiscordNative.app).getReleaseChannel) === null || _ref2$DiscordNative$a === void 0 ? void 0 : _ref2$DiscordNative$a.call(_ref2$DiscordNative$a2);
  var nativeVersion = (_ref3 = window) === null || _ref3 === void 0 ? void 0 : (_ref3$DiscordNative = _ref3.DiscordNative) === null || _ref3$DiscordNative === void 0 ? void 0 : (_ref3$DiscordNative$a = (_ref3$DiscordNative$a2 = _ref3$DiscordNative.app).getVersion) === null || _ref3$DiscordNative$a === void 0 ? void 0 : _ref3$DiscordNative$a.call(_ref3$DiscordNative$a2);
  var nativeBuildNumber = (_ref4 = window) === null || _ref4 === void 0 ? void 0 : (_ref4$DiscordNative = _ref4.DiscordNative) === null || _ref4$DiscordNative === void 0 ? void 0 : (_ref4$DiscordNative$a = (_ref4$DiscordNative$a2 = _ref4$DiscordNative.app).getBuildNumber) === null || _ref4$DiscordNative$a === void 0 ? void 0 : _ref4$DiscordNative$a.call(_ref4$DiscordNative$a2);
  var nativeAppArch = (_ref5 = window) === null || _ref5 === void 0 ? void 0 : (_ref5$DiscordNative = _ref5.DiscordNative) === null || _ref5$DiscordNative === void 0 ? void 0 : (_ref5$DiscordNative$a = (_ref5$DiscordNative$a2 = _ref5$DiscordNative.app).getAppArch) === null || _ref5$DiscordNative$a === void 0 ? void 0 : _ref5$DiscordNative$a.call(_ref5$DiscordNative$a2);
  initializeArgs = {
    logDirectory: logDirectory,
    logLevel: logLevel,
    logNumFiles: 1,
    logFileSize: 3 * 1024 * 1024
  };
  nativeData = {
    nativeReleaseChannel: nativeReleaseChannel !== null && nativeReleaseChannel !== void 0 ? nativeReleaseChannel : 'unknown',
    nativeVersion: nativeVersion !== null && nativeVersion !== void 0 ? nativeVersion : 'unknown',
    nativeBuildNumber: nativeBuildNumber !== null && nativeBuildNumber !== void 0 ? nativeBuildNumber : 0,
    nativeAppArch: nativeAppArch !== null && nativeAppArch !== void 0 ? nativeAppArch : 'unknown'
  };
}
_discord_media["default"].initializeLogging(initializeArgs, nativeData);
module.exports = {
  getSystemAnalyticsBlob: function getSystemAnalyticsBlob() {
    return new Promise(function (resolve) {
      return _discord_media["default"].getSystemAnalyticsBlob(resolve);
    });
  }
};
