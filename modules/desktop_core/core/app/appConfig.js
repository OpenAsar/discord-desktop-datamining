"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasInit = void 0;
exports.init = init;
var _appSettings = require("./bootstrapModules/appSettings");
var _autoStart = require("./bootstrapModules/autoStart");
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const settings = _appSettings.appSettings.getSettings();
const NOOP = () => {};
let hasInit = false;
exports.hasInit = hasInit;
function init() {
  if (hasInit) {
    return;
  }
  exports.hasInit = hasInit = true;
  _ipcMain.default.on('TOGGLE_MINIMIZE_TO_TRAY', (_event, value) => setMinimizeOnClose(value));
  _ipcMain.default.on('TOGGLE_OPEN_ON_STARTUP', (_event, value) => toggleRunOnStartup(value));
  _ipcMain.default.on('TOGGLE_START_MINIMIZED', (_event, value) => toggleStartMinimized(value));
  _ipcMain.default.on('UPDATE_OPEN_ON_STARTUP', () => updateOpenOnStartup());
}
function setMinimizeOnClose(minimizeToTray) {
  if (settings == null) {
    console.warn(`Could not execute 'setMinimizeOnClose', settings was null`);
    return;
  }
  settings.set('MINIMIZE_TO_TRAY', minimizeToTray);
}
function toggleRunOnStartup(openOnStartup) {
  if (settings == null) {
    console.warn(`Could not execute 'toggleRunOnStartup', settings was null`);
    return;
  }
  settings.set('OPEN_ON_STARTUP', openOnStartup);
  if (openOnStartup) {
    _autoStart.autoStart.install(NOOP);
  } else {
    _autoStart.autoStart.uninstall(NOOP);
  }
}
function toggleStartMinimized(startMinimized) {
  if (settings == null) {
    console.warn(`Could not execute 'toggleStartMinimized', settings was null`);
    return;
  }
  settings.set('START_MINIMIZED', startMinimized);
  _autoStart.autoStart.isInstalled(installed => {
    if (installed) {
      _autoStart.autoStart.install(NOOP);
    }
  });
}
function updateOpenOnStartup() {
  _autoStart.autoStart.update(NOOP);
}