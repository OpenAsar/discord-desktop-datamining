"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUtilsSettings = void 0;
var _electron = _interopRequireDefault(require("electron"));
var _os = _interopRequireDefault(require("os"));
var _process = _interopRequireDefault(require("process"));
var _systeminformation = _interopRequireDefault(require("systeminformation"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Since crashes normally happen inside of the renderer process, we can store crash information inside of the
// browser/main process, and report it back after the next startup.
// lastRunsStoredInformation is set from currentStoredInformation, and currentStoredInformation is cleared on startup.
const processUtilsSettings = {
  rendererCrashReason: null,
  rendererCrashExitCode: null,
  lastRunsStoredInformation: {},
  currentStoredInformation: {}
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
    rendererCrashExitCode: processUtilsSettings.rendererCrashExitCode,
    storedInformation: processUtilsSettings.lastRunsStoredInformation
  });
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_MEMORY_INFO, _ => {
  return _process.default.getProcessMemoryInfo();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_SYSTEM_INFO, async _ => {
  const gpuInfo = await _systeminformation.default.graphics();
  return {
    cpus: _os.default.cpus().map(cpu => ({
      model: cpu.model,
      speed: cpu.speed
    })),
    gpus: gpuInfo.controllers.map(({
      model,
      vendor,
      vram
    }) => ({
      model,
      vendor,
      memory: vram ?? -1
    })),
    total_memory: _os.default.totalmem()
  };
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
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_SET_CRASH_INFORMATION, (_, crashInformation, state) => {
  processUtilsSettings.currentStoredInformation[crashInformation] = state;
  return Promise.resolve();
});