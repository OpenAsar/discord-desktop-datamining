"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUtilsSettings = void 0;
var _electron = _interopRequireDefault(require("electron"));
var _os = _interopRequireDefault(require("os"));
var _process = _interopRequireDefault(require("process"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const processUtilsSettings = {
  rendererCrashReason: null,
  rendererCrashExitCode: null,
  lastRunsStoredInformation: {},
  currentStoredInformation: {},
  lastMemoryInformation: null,
  highestMemoryInformation: null
};
exports.processUtilsSettings = processUtilsSettings;
let usageOffset = 0;
let lastUsage = 0;
const cpuCoreCount = _os.default.cpus().length;
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_CPU_USAGE, () => {
  let totalProcessorUsagePercent = 0.0;
  let totalCumulativeUsage = undefined;
  const sampleTime = performance.now();
  for (const processMetric of _electron.default.app.getAppMetrics()) {
    totalProcessorUsagePercent += processMetric.cpu.percentCPUUsage;
    const cpu = processMetric.cpu;
    if (cpu.cumulativeCPUUsage !== undefined) {
      if (totalCumulativeUsage === undefined) {
        totalCumulativeUsage = {
          usage: 0,
          sampleTime
        };
      }
      totalCumulativeUsage.usage += cpu.cumulativeCPUUsage / cpuCoreCount;
    }
  }
  if (totalCumulativeUsage != null) {
    if (totalCumulativeUsage.usage < lastUsage) {
      usageOffset = totalCumulativeUsage.usage - lastUsage;
    }
    lastUsage = totalCumulativeUsage.usage;
    totalCumulativeUsage.usage += usageOffset;
  }
  return Promise.resolve({
    totalProcessorUsagePercent,
    totalCumulativeUsage
  });
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_LAST_CRASH, () => {
  return Promise.resolve({
    ..._electron.default.crashReporter.getLastCrashReport(),
    rendererCrashReason: processUtilsSettings.rendererCrashReason,
    rendererCrashExitCode: processUtilsSettings.rendererCrashExitCode,
    storedInformation: processUtilsSettings.lastRunsStoredInformation,
    lastMemoryInformation: processUtilsSettings.lastMemoryInformation,
    highestMemoryInformation: processUtilsSettings.highestMemoryInformation
  });
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_SYSTEM_INFO, async () => {
  return {
    cpus: _os.default.cpus().map(cpu => ({
      model: cpu.model,
      speed: cpu.speed
    })),
    gpus: [],
    electronGPUInfo: await _electron.default.app.getGPUInfo('complete'),
    total_memory: _os.default.totalmem()
  };
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_DNS_CACHE, () => {
  const defaultSession = _electron.default.session.defaultSession;
  if (defaultSession != null && defaultSession.clearHostResolverCache != null) {
    return defaultSession.clearHostResolverCache();
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_COOKIES, () => {
  return _electron.default.session.defaultSession.cookies.flushStore();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_STORAGE_DATA, () => {
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
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_SET_MEMORY_INFORMATION, (_, memoryInformation) => {
  processUtilsSettings.lastMemoryInformation = memoryInformation;
  const highest = processUtilsSettings.highestMemoryInformation;
  if (highest == null || highest.memoryUsageKB < memoryInformation.memoryUsageKB) {
    processUtilsSettings.highestMemoryInformation = memoryInformation;
  }
  return Promise.resolve();
});