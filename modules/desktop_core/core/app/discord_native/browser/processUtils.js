"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUtilsSettings = void 0;
var _electron = _interopRequireDefault(require("electron"));
var _process = _interopRequireDefault(require("process"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const processUtilsSettings = {
  rendererCrashReason: null,
  rendererCrashExitCode: null
};
exports.processUtilsSettings = processUtilsSettings;
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_CPU_USAGE, _ => {
  let totalProcessorUsagePercent = 0.0;
  for (const processMetric of _electron.default.app.getAppMetrics()) {
    totalProcessorUsagePercent += processMetric.cpu.percentCPUUsage;
  }
  return Promise.resolve(totalProcessorUsagePercent);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_LAST_CRASH, _ => {
  return Promise.resolve({
    ..._electron.default.crashReporter.getLastCrashReport(),
    rendererCrashReason: processUtilsSettings.rendererCrashReason,
    rendererCrashExitCode: processUtilsSettings.rendererCrashExitCode
  });
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_MEMORY_INFO, _ => {
  return _process.default.getProcessMemoryInfo();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_DNS_CACHE, _ => {
  const defaultSession = _electron.default.session.defaultSession;
  if (defaultSession != null && defaultSession.clearHostResolverCache != null) {
    defaultSession.clearHostResolverCache();
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_COOKIES, _ => {
  return _electron.default.session.defaultSession.cookies.flushStore();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_STORAGE_DATA, _ => {
  _electron.default.session.defaultSession.flushStorageData();
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_MAIN_ARGV_SYNC, event => {
  event.returnValue = _process.default.argv;
});