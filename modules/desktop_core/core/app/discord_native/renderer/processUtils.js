"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentMemoryUsageKB = getCurrentMemoryUsageKB;
exports.flushDNSCache = flushDNSCache;
exports.getLastCrash = getLastCrash;
exports.flushCookies = flushCookies;
exports.getSystemInfo = getSystemInfo;
exports.flushStorageData = flushStorageData;
exports.purgeMemory = purgeMemory;
exports.getCurrentCPUUsagePercent = getCurrentCPUUsagePercent;
exports.getCPUCoreCount = getCPUCoreCount;
exports.getMainArgvSync = getMainArgvSync;
exports.setCrashInformation = setCrashInformation;

var _electron = _interopRequireDefault(require("electron"));

var _os = _interopRequireDefault(require("os"));

var _process = _interopRequireDefault(require("process"));

var _DiscordIPC = require("../common/DiscordIPC");

var _minidumpReader = require("./minidumpReader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CPU_USAGE_GATHER_INTERVAL = 1000;
const MEMORY_USAGE_GATHER_INTERVAL = 5000;

const mainArgv = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_MAIN_ARGV_SYNC);

let totalProcessorUsagePercent = 0;
let totalMemoryUsageKB = 0;

const cpuCoreCount = _os.default.cpus().length;

setInterval(() => {
  void _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_GET_CPU_USAGE).then(usage => totalProcessorUsagePercent = usage);
}, CPU_USAGE_GATHER_INTERVAL);
let memoryUsageTimerRunning = false;

function getCurrentMemoryUsageKB() {
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
    storedInformation: lastCrash.storedInformation
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

function getCurrentCPUUsagePercent() {
  return totalProcessorUsagePercent;
}

function getCPUCoreCount() {
  return cpuCoreCount;
}

function getMainArgvSync() {
  return mainArgv;
}

function setCrashInformation(crashInformation, state) {
  void _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.PROCESS_UTILS_SET_CRASH_INFORMATION, crashInformation, state);
}