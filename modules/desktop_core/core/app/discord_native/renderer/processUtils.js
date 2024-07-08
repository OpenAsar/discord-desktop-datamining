"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flushCookies = flushCookies;
exports.flushDNSCache = flushDNSCache;
exports.flushStorageData = flushStorageData;
exports.getCPUCoreCount = getCPUCoreCount;
exports.getCumulativeCPUUsage = getCumulativeCPUUsage;
exports.getCurrentCPUUsagePercent = getCurrentCPUUsagePercent;
exports.getLastCrash = getLastCrash;
exports.getMainArgvSync = getMainArgvSync;
exports.getProcessUptime = getProcessUptime;
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  const minidumpInformation = lastCrash.id != null ? await (0, _minidumpReader.getNewestMinidumpInformation)() : null;
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