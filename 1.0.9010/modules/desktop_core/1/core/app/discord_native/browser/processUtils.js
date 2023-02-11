"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUtilsSettings = void 0;

var _electron = _interopRequireDefault(require("electron"));

var _process = _interopRequireDefault(require("process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  PROCESS_UTILS_GET_CPU_USAGE,
  PROCESS_UTILS_GET_MEMORY_INFO,
  PROCESS_UTILS_FLUSH_DNS_CACHE,
  PROCESS_UTILS_FLUSH_COOKIES,
  PROCESS_UTILS_FLUSH_STORAGE_DATA,
  PROCESS_UTILS_GET_MAIN_ARGV_SYNC,
  PROCESS_UTILS_GET_LAST_CRASH
} = require('../common/constants').IPCEvents;

const processUtilsSettings = {
  rendererCrashReason: null
};
exports.processUtilsSettings = processUtilsSettings;

_electron.default.ipcMain.handle(PROCESS_UTILS_GET_CPU_USAGE, async _ => {
  let totalProcessorUsagePercent = 0.0;

  for (const processMetric of _electron.default.app.getAppMetrics()) {
    totalProcessorUsagePercent += processMetric.cpu.percentCPUUsage;
  }

  return totalProcessorUsagePercent;
});

_electron.default.ipcMain.handle(PROCESS_UTILS_GET_LAST_CRASH, _ => {
  return { ..._electron.default.crashReporter.getLastCrashReport(),
    rendererCrashReason: processUtilsSettings.rendererCrashReason
  };
});

_electron.default.ipcMain.handle(PROCESS_UTILS_GET_MEMORY_INFO, async _ => {
  return _process.default.getProcessMemoryInfo();
});

_electron.default.ipcMain.handle(PROCESS_UTILS_FLUSH_DNS_CACHE, async _ => {
  const defaultSession = _electron.default.session.defaultSession;
  if (!defaultSession || !defaultSession.clearHostResolverCache) return;
  defaultSession.clearHostResolverCache();
});

_electron.default.ipcMain.handle(PROCESS_UTILS_FLUSH_COOKIES, async _ => {
  return _electron.default.session.defaultSession.cookies.flushStore();
});

_electron.default.ipcMain.handle(PROCESS_UTILS_FLUSH_STORAGE_DATA, async _ => {
  _electron.default.session.defaultSession.flushStorageData();
});

_electron.default.ipcMain.on(PROCESS_UTILS_GET_MAIN_ARGV_SYNC, event => {
  event.returnValue = _process.default.argv;
});