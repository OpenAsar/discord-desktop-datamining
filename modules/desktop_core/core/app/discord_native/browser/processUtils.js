"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUtilsSettings = void 0;
var _electron = _interopRequireDefault(require("electron"));
var _fs = _interopRequireDefault(require("fs"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _process = _interopRequireDefault(require("process"));
var _paths = require("../../bootstrapModules/paths");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const processUtilsSettings = exports.processUtilsSettings = {
  rendererCrashReason: null,
  rendererCrashExitCode: null,
  lastRunsStoredInformation: {},
  currentStoredInformation: {},
  lastMemoryInformation: null,
  highestMemoryInformation: null
};
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
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_LAST_CRASH, async () => {
  const lastCrashReport = _electron.default.crashReporter.getLastCrashReport();
  let pendingMinidumpPath = null;
  const moduleDataPath = _paths.paths.getModuleDataPath();
  if (moduleDataPath != null) {
    const crashlogsPath = _path.default.join(moduleDataPath, 'crashlogs');
    const sentinelPath = _path.default.join(crashlogsPath, 'pending_minidump.txt');
    try {
      const filename = (await _fs.default.promises.readFile(sentinelPath, 'utf-8')).trim();
      if (filename.length > 0) {
        pendingMinidumpPath = _path.default.join(crashlogsPath, filename);
        await _fs.default.promises.unlink(sentinelPath);
      }
    } catch {}
  }
  return {
    date: (lastCrashReport === null || lastCrashReport === void 0 ? void 0 : lastCrashReport.date) ?? null,
    id: (lastCrashReport === null || lastCrashReport === void 0 ? void 0 : lastCrashReport.id) ?? null,
    rendererCrashReason: processUtilsSettings.rendererCrashReason,
    rendererCrashExitCode: processUtilsSettings.rendererCrashExitCode,
    storedInformation: processUtilsSettings.lastRunsStoredInformation,
    lastMemoryInformation: processUtilsSettings.lastMemoryInformation,
    highestMemoryInformation: processUtilsSettings.highestMemoryInformation,
    pendingMinidumpPath
  };
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
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_SYSTEM_METRICS, () => {
  const cpus = _os.default.cpus();
  let totalIdle = 0;
  let totalTick = 0;
  for (const cpu of cpus) {
    for (const type of Object.values(cpu.times)) {
      totalTick += type;
    }
    totalIdle += cpu.times.idle;
  }
  return Promise.resolve({
    cpuTotalTick: totalTick,
    cpuTotalIdle: totalIdle,
    memoryTotal: _os.default.totalmem(),
    memoryFree: _os.default.freemem()
  });
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_GPU_PROCESS_ID, () => {
  for (const processMetric of _electron.default.app.getAppMetrics()) {
    if (processMetric.type === 'GPU') {
      return Promise.resolve(processMetric.pid);
    }
  }
  return Promise.resolve(null);
});