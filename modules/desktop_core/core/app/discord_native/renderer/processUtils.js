"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disablePAMemoryProfiler = disablePAMemoryProfiler;
exports.disableProfilingV8Heap = disableProfilingV8Heap;
exports.enablePAMemoryProfiler = enablePAMemoryProfiler;
exports.enableProfilingV8Heap = enableProfilingV8Heap;
exports.flushCookies = flushCookies;
exports.flushDNSCache = flushDNSCache;
exports.flushStorageData = flushStorageData;
exports.getBlinkMemoryInfo = getBlinkMemoryInfo;
exports.getCPUCoreCount = getCPUCoreCount;
exports.getCumulativeCPUUsage = getCumulativeCPUUsage;
exports.getCurrentCPUUsagePercent = getCurrentCPUUsagePercent;
exports.getGpuProcessId = getGpuProcessId;
exports.getHeapStats = getHeapStats;
exports.getLastCrash = getLastCrash;
exports.getMainArgvSync = getMainArgvSync;
exports.getPartitionAllocatorStats = getPartitionAllocatorStats;
exports.getPerfAttributedPAMemory = getPerfAttributedPAMemory;
exports.getPerfAttributedPAMemoryCallstacks = getPerfAttributedPAMemoryCallstacks;
exports.getProcessUptime = getProcessUptime;
exports.getProfilerV8MemoryCallstacks = getProfilerV8MemoryCallstacks;
exports.getSystemInfo = getSystemInfo;
exports.getUsedHeapSize = getUsedHeapSize;
exports.purgeMemory = purgeMemory;
exports.setCrashInformation = setCrashInformation;
exports.setMemoryInformation = setMemoryInformation;
var _electron = _interopRequireDefault(require("electron"));
var _os = _interopRequireDefault(require("os"));
var _process = _interopRequireDefault(require("process"));
var _DiscordIPC = require("../common/DiscordIPC");
var _minidumpReader = require("./minidumpReader");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CPU_USAGE_GATHER_INTERVAL = 1000;
const mainArgv = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_MAIN_ARGV_SYNC);
let totalProcessorUsagePercent = 0;
let cumulativeCpuUsage;
const cpuCoreCount = _os.default.cpus().length;
setInterval(() => {
  void _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_CPU_USAGE).then(usage => {
    ({
      totalProcessorUsagePercent
    } = usage);
    if (usage.totalCumulativeUsage != null) cumulativeCpuUsage = usage.totalCumulativeUsage;
  });
}, CPU_USAGE_GATHER_INTERVAL);
function flushDNSCache() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_DNS_CACHE);
}
async function getLastCrash() {
  const lastCrash = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_LAST_CRASH);
  const minidumpInformation = (lastCrash === null || lastCrash === void 0 ? void 0 : lastCrash.id) != null ? await (0, _minidumpReader.getNewestMinidumpInformation)() : null;
  return {
    date: lastCrash.date,
    id: lastCrash.id,
    rendererCrashReason: lastCrash.rendererCrashReason,
    rendererCrashExitCode: lastCrash.rendererCrashExitCode,
    minidumpInformation,
    storedInformation: lastCrash.storedInformation,
    lastMemoryInformation: lastCrash.lastMemoryInformation,
    highestMemoryInformation: lastCrash.highestMemoryInformation
  };
}
async function flushCookies(callback) {
  try {
    await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_COOKIES);
    callback();
  } catch (err) {
    callback(err);
  }
}
function getSystemInfo() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_SYSTEM_INFO);
}
async function flushStorageData(callback) {
  try {
    await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_FLUSH_STORAGE_DATA);
    callback();
  } catch (err) {
    callback(err);
  }
}
function purgeMemory() {
  _electron.default.webFrame.clearCache();
}
function getProcessUptime() {
  return _process.default.uptime();
}
function getCurrentCPUUsagePercent() {
  return totalProcessorUsagePercent;
}
function getCumulativeCPUUsage() {
  return cumulativeCpuUsage;
}
function getCPUCoreCount() {
  return cpuCoreCount;
}
function getMainArgvSync() {
  return mainArgv;
}
function getUsedHeapSize() {
  const heapStats = _process.default.getHeapStatistics();
  return heapStats.usedHeapSize;
}
function getHeapStats() {
  return _process.default.getHeapStatistics();
}
function getBlinkMemoryInfo() {
  return _process.default.getBlinkMemoryInfo();
}
function getPartitionAllocatorStats() {
  var _ref, _ref$discordMemoryPro, _ref$discordMemoryPro2;
  return (_ref = _electron.default) === null || _ref === void 0 ? void 0 : (_ref$discordMemoryPro = _ref.discordMemoryProfiler) === null || _ref$discordMemoryPro === void 0 ? void 0 : (_ref$discordMemoryPro2 = _ref$discordMemoryPro.getPartitionAllocatorStats) === null || _ref$discordMemoryPro2 === void 0 ? void 0 : _ref$discordMemoryPro2.call(_ref$discordMemoryPro);
}
function enablePAMemoryProfiler(config) {
  var _ref2, _ref2$discordMemoryPr, _ref2$discordMemoryPr2;
  (_ref2 = _electron.default) === null || _ref2 === void 0 ? void 0 : (_ref2$discordMemoryPr = _ref2.discordMemoryProfiler) === null || _ref2$discordMemoryPr === void 0 ? void 0 : (_ref2$discordMemoryPr2 = _ref2$discordMemoryPr.enableProfiling) === null || _ref2$discordMemoryPr2 === void 0 ? void 0 : _ref2$discordMemoryPr2.call(_ref2$discordMemoryPr, config);
}
function disablePAMemoryProfiler() {
  var _ref3, _ref3$discordMemoryPr, _ref3$discordMemoryPr2;
  (_ref3 = _electron.default) === null || _ref3 === void 0 ? void 0 : (_ref3$discordMemoryPr = _ref3.discordMemoryProfiler) === null || _ref3$discordMemoryPr === void 0 ? void 0 : (_ref3$discordMemoryPr2 = _ref3$discordMemoryPr.disableProfiling) === null || _ref3$discordMemoryPr2 === void 0 ? void 0 : _ref3$discordMemoryPr2.call(_ref3$discordMemoryPr);
}
function getPerfAttributedPAMemory() {
  var _ref4, _ref4$discordMemoryPr, _ref4$discordMemoryPr2;
  return (_ref4 = _electron.default) === null || _ref4 === void 0 ? void 0 : (_ref4$discordMemoryPr = _ref4.discordMemoryProfiler) === null || _ref4$discordMemoryPr === void 0 ? void 0 : (_ref4$discordMemoryPr2 = _ref4$discordMemoryPr.getTypeNameMemoryAllocated) === null || _ref4$discordMemoryPr2 === void 0 ? void 0 : _ref4$discordMemoryPr2.call(_ref4$discordMemoryPr);
}
function getPerfAttributedPAMemoryCallstacks(options) {
  var _ref5, _ref5$discordMemoryPr, _ref5$discordMemoryPr2;
  return (_ref5 = _electron.default) === null || _ref5 === void 0 ? void 0 : (_ref5$discordMemoryPr = _ref5.discordMemoryProfiler) === null || _ref5$discordMemoryPr === void 0 ? void 0 : (_ref5$discordMemoryPr2 = _ref5$discordMemoryPr.getTypeNameMemoryCallstacks) === null || _ref5$discordMemoryPr2 === void 0 ? void 0 : _ref5$discordMemoryPr2.call(_ref5$discordMemoryPr, options);
}
function enableProfilingV8Heap(options) {
  var _ref6, _ref6$discordMemoryPr, _ref6$discordMemoryPr2;
  return (_ref6 = _electron.default) === null || _ref6 === void 0 ? void 0 : (_ref6$discordMemoryPr = _ref6.discordMemoryProfiler) === null || _ref6$discordMemoryPr === void 0 ? void 0 : (_ref6$discordMemoryPr2 = _ref6$discordMemoryPr.enableProfilingV8Heap) === null || _ref6$discordMemoryPr2 === void 0 ? void 0 : _ref6$discordMemoryPr2.call(_ref6$discordMemoryPr, options);
}
function disableProfilingV8Heap() {
  var _ref7, _ref7$discordMemoryPr, _ref7$discordMemoryPr2;
  return (_ref7 = _electron.default) === null || _ref7 === void 0 ? void 0 : (_ref7$discordMemoryPr = _ref7.discordMemoryProfiler) === null || _ref7$discordMemoryPr === void 0 ? void 0 : (_ref7$discordMemoryPr2 = _ref7$discordMemoryPr.disableProfilingV8Heap) === null || _ref7$discordMemoryPr2 === void 0 ? void 0 : _ref7$discordMemoryPr2.call(_ref7$discordMemoryPr);
}
function getProfilerV8MemoryCallstacks() {
  var _ref8, _ref8$discordMemoryPr, _ref8$discordMemoryPr2;
  return (_ref8 = _electron.default) === null || _ref8 === void 0 ? void 0 : (_ref8$discordMemoryPr = _ref8.discordMemoryProfiler) === null || _ref8$discordMemoryPr === void 0 ? void 0 : (_ref8$discordMemoryPr2 = _ref8$discordMemoryPr.getProfilerV8MemoryCallstacks) === null || _ref8$discordMemoryPr2 === void 0 ? void 0 : _ref8$discordMemoryPr2.call(_ref8$discordMemoryPr);
}
function setCrashInformation(crashInformation, state) {
  void _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_SET_CRASH_INFORMATION, crashInformation, state);
}
function setMemoryInformation(memoryInformation) {
  void _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_SET_MEMORY_INFORMATION, {
    uptimeSeconds: Math.floor(_process.default.uptime()),
    memoryUsageKB: memoryInformation.memoryUsageKB,
    usedJSHeapSizeKB: memoryInformation.usedJSHeapSizeKB
  });
}
function getGpuProcessId() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_GPU_PROCESS_ID);
}