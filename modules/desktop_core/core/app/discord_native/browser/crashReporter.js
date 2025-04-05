"use strict";

var _assert = _interopRequireDefault(require("assert"));
var _electron = _interopRequireDefault(require("electron"));
var _lodash = _interopRequireDefault(require("lodash"));
var _crashReporterUtils = require("../../../common/crashReporterUtils");
var _crashReporterSetup = require("../../bootstrapModules/crashReporterSetup");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.CRASH_REPORTER_UPDATE_METADATA, (_, additionalMetadata) => {
  const metadata = _crashReporterSetup.crashReporterSetup.metadata;
  (0, _assert.default)(metadata != null, 'Metadata imported improperly.');
  const finalMetadata = _lodash.default.defaultsDeep(metadata, additionalMetadata ?? {});
  (0, _crashReporterUtils.reconcileCrashReporterMetadata)(_electron.default.crashReporter, finalMetadata);
  const sentry = _crashReporterSetup.crashReporterSetup.getGlobalSentry();
  if (sentry != null) {
    var _additionalMetadata$s;
    const user = (_additionalMetadata$s = additionalMetadata.sentry) === null || _additionalMetadata$s === void 0 ? void 0 : _additionalMetadata$s.user;
    if (user != null) {
      sentry.setUser(user);
    }
    const nativeBuildNumber = additionalMetadata.nativeBuildNumber;
    if (nativeBuildNumber != null) {
      sentry.setTag('nativeBuildNumber', nativeBuildNumber);
    }
    const staff = additionalMetadata.staff;
    if (staff != null) {
      sentry.setTag('isStaff', staff.toString());
    }
  }
  return Promise.resolve({
    metadata: finalMetadata
  });
});
_electron.default.ipcMain.handle(_DiscordIPC.IPCEvents.UNHANDLED_JS_EXCEPTION, () => {
  setTimeout(() => {
    throw new Error('UNHANDLED_EXCEPTION ' + process.type);
  }, 50);
});