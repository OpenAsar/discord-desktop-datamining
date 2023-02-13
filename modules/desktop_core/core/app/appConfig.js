"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasInit = void 0;
exports.init = init;

var autoStart = _interopRequireWildcard(require("./autoStart"));

var _appSettings = require("./appSettings");

var _ipcMain = _interopRequireDefault(require("./ipcMain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const settings = (0, _appSettings.getSettings)();

const NOOP = () => {};

let hasInit = false;
exports.hasInit = hasInit;

function init() {
  if (hasInit) {
    console.warn('appConfig: Has already init! Cancelling init.');
    return;
  }

  exports.hasInit = hasInit = true;

  _ipcMain.default.on('TOGGLE_MINIMIZE_TO_TRAY', (_event, value) => setMinimizeOnClose(value));

  _ipcMain.default.on('TOGGLE_OPEN_ON_STARTUP', (_event, value) => toggleRunOnStartup(value));

  _ipcMain.default.on('TOGGLE_START_MINIMIZED', (_event, value) => toggleStartMinimized(value));

  _ipcMain.default.on('UPDATE_OPEN_ON_STARTUP', _event => updateOpenOnStartup());
}

function setMinimizeOnClose(minimizeToTray) {
  settings.set('MINIMIZE_TO_TRAY', minimizeToTray);
}

function toggleRunOnStartup(openOnStartup) {
  settings.set('OPEN_ON_STARTUP', openOnStartup);

  if (openOnStartup) {
    autoStart.install(NOOP);
  } else {
    autoStart.uninstall(NOOP);
  }
}

function toggleStartMinimized(startMinimized) {
  settings.set('START_MINIMIZED', startMinimized);
  autoStart.isInstalled(installed => {
    // Only update the registry for this toggle if the app was already set to autorun
    if (installed) {
      autoStart.install(NOOP);
    }
  });
}

function updateOpenOnStartup() {
  autoStart.update(NOOP);
}