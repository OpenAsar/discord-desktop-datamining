"use strict";

var _electron = _interopRequireDefault(require("electron"));

var _os = _interopRequireDefault(require("os"));

var _process = _interopRequireDefault(require("process"));

var _minidump = require("./minidump");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  PROCESS_UTILS_GET_CPU_USAGE,
  PROCESS_UTILS_FLUSH_DNS_CACHE,
  PROCESS_UTILS_FLUSH_COOKIES,
  PROCESS_UTILS_FLUSH_STORAGE_DATA,
  PROCESS_UTILS_GET_MAIN_ARGV_SYNC,
  PROCESS_UTILS_GET_LAST_CRASH
} = require('../common/constants').IPCEvents; // Note: CPU interval should be kept insync with Android's DeviceResourceUsageMonitor interval.


const CPU_USAGE_GATHER_INTERVAL = 1000;
const MEMORY_USAGE_GATHER_INTERVAL = 5000;

const mainArgv = _electron.default.ipcRenderer.sendSync(PROCESS_UTILS_GET_MAIN_ARGV_SYNC);

let totalProcessorUsagePercent = 0;
let totalMemoryUsageKB = 0;

const cpuCoreCount = _os.default.cpus().length;

setInterval(() => {
  _electron.default.ipcRenderer.invoke(PROCESS_UTILS_GET_CPU_USAGE).then(usage => totalProcessorUsagePercent = usage);
}, CPU_USAGE_GATHER_INTERVAL);
let memoryUsageTimerRunning = false;

function getCurrentMemoryUsageKB() {
  // Lazy initialize because this is only needed when the native process_utils are not available/updated.
  if (memoryUsageTimerRunning) {
    return totalMemoryUsageKB;
  }

  memoryUsageTimerRunning = true;

  function computeMemoryUsage() {
    const memoryUsage = _process.default.memoryUsage();

    return (memoryUsage.heapTotal + memoryUsage.external) / 1024;
  }

  setInterval(() => {
    totalMemoryUsageKB = computeMemoryUsage();
  }, MEMORY_USAGE_GATHER_INTERVAL);
  totalMemoryUsageKB = computeMemoryUsage();
  return totalMemoryUsageKB;
}

async function flushDNSCache() {
  _electron.default.ipcRenderer.invoke(PROCESS_UTILS_FLUSH_DNS_CACHE);
}

async function getLastCrash() {
  const lastCrash = await _electron.default.ipcRenderer.invoke(PROCESS_UTILS_GET_LAST_CRASH);
  const minidumpExceptionType = lastCrash.id != null ? await (0, _minidump.findNewestCrashFileExceptionType)() : null;
  return {
    date: lastCrash.date,
    id: lastCrash.id,
    rendererCrashReason: lastCrash.rendererCrashReason,
    minidumpExceptionType: minidumpExceptionType
  };
}

async function flushCookies(callback) {
  try {
    await _electron.default.ipcRenderer.invoke(PROCESS_UTILS_FLUSH_COOKIES);
    callback();
  } catch (err) {
    callback(err);
  }
}

async function flushStorageData(callback) {
  try {
    await _electron.default.ipcRenderer.invoke(PROCESS_UTILS_FLUSH_STORAGE_DATA);
    callback();
  } catch (err) {
    callback(err);
  }
}

async function purgeMemory() {
  _electron.default.webFrame.clearCache();
}

function getCurrentCPUUsagePercent() {
  return totalProcessorUsagePercent;
}

function getCPUCoreCount() {
  return cpuCoreCount;
}

function getMainArgvSync() {
  return mainArgv;
}

module.exports = {
  flushDNSCache,
  flushCookies,
  getLastCrash,
  flushStorageData,
  purgeMemory,
  getCurrentCPUUsagePercent,
  getCurrentMemoryUsageKB,
  getCPUCoreCount,
  getMainArgvSync
};