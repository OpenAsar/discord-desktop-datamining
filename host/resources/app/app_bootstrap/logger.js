"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeLogging = initializeLogging;
exports.ipcMainRendererLog = ipcMainRendererLog;
exports.ipcMainRendererLogger = ipcMainRendererLogger;
exports.networkDebugLogger = networkDebugLogger;
var _main = _interopRequireDefault(require("electron-log/main"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _appSettings = require("./appSettings");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let logDir = null;
function getAndCreateLogDirectory(paths) {
  try {
    logDir = paths.getLogPath();
  } catch (e) {
    console.error('Failed to get log directory: ', e);
  }
  if (logDir == null) {
    return null;
  }
  try {
    _fs.default.mkdirSync(logDir, {
      recursive: true
    });
  } catch (e) {
    console.warn('Could not create log directory ', logDir, ':', e);
  }
  return logDir;
}
function getLogLevel(level) {
  switch (level) {
    case 'error':
    case 'warn':
    case 'info':
    case 'verbose':
    case 'debug':
      return level;
  }
  return 'info';
}
function initializeLogging(paths) {
  const logDir = getAndCreateLogDirectory(paths);
  if (logDir == null) {
    return;
  }
  const settings = (0, _appSettings.getSettings)();
  const LOG_LEVEL = settings === null || settings === void 0 ? void 0 : settings.get('LOG_LEVEL', 'info');
  const rendererLogFile = _path.default.join(logDir, 'renderer_js.log');
  _main.default.transports.file.resolvePathFn = () => rendererLogFile;
  _main.default.transports.file.maxSize = 10 * 1024 * 1024;
  _main.default.transports.file.level = getLogLevel(LOG_LEVEL);
}
function levelToLogFn(level) {
  switch (level) {
    case 0:
      return _main.default.verbose;
    case 1:
      return _main.default.info;
    case 2:
      return _main.default.warn;
    case 3:
      return _main.default.error;
    default:
      return _main.default.info;
  }
}
function ipcMainRendererLogger(_event, level, message) {
  let logMsg = message.replace('\nfont-weight: bold;\ncolor: purple;\n ', '');
  if (logMsg.startsWith('%c')) {
    logMsg = logMsg.slice(2);
  }
  const logFn = levelToLogFn(level);
  logFn(logMsg);
}
function ipcMainRendererLog(message, level = 1) {
  const logFn = levelToLogFn(level);
  logFn(message);
}
function networkDebugLogger() {
  if (logDir == null) {
    return null;
  }
  const myLogger = _main.default.create({
    logId: 'net_capture'
  });
  const filePath = _path.default.join(logDir, `net_capture.log`);
  myLogger.transports.file.resolvePathFn = () => filePath;
  myLogger.transports.file.maxSize = 10 * 1024 * 1024;
  myLogger.transports.file.level = getLogLevel('info');
  myLogger.transports.file.format = '{text}';
  return myLogger;
}