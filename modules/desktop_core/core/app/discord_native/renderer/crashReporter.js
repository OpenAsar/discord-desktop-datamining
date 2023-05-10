"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlattenedMetadata = getFlattenedMetadata;
exports.getMetadata = getMetadata;
exports.triggerUnhandledException = triggerUnhandledException;
exports.updateCrashReporter = updateCrashReporter;
var _electron = _interopRequireDefault(require("electron"));
var _crashReporterUtils = require("../../../common/crashReporterUtils");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let metadata = {};
updateCrashReporter(metadata);
async function updateCrashReporter(additionalMetadata) {
  const result = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.CRASH_REPORTER_UPDATE_METADATA, additionalMetadata);
  metadata = result.metadata ?? {};
  (0, _crashReporterUtils.reconcileCrashReporterMetadata)(_electron.default.crashReporter, metadata);
}
function getMetadata() {
  return metadata;
}
function getFlattenedMetadata() {
  return (0, _crashReporterUtils.flatten)(metadata);
}

// Internal test for unhandled JS exception
async function triggerUnhandledException() {
  await _electron.default.ipcRenderer.invoke(_DiscordIPC.IPCEvents.UNHANDLED_JS_EXCEPTION);
}