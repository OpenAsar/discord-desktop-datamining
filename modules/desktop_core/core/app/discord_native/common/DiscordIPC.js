"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscordIPC = void 0;
Object.defineProperty(exports, "IPCEvents", {
  enumerable: true,
  get: function () {
    return _constants.IPCEvents;
  }
});
var _electron = _interopRequireDefault(require("electron"));
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DiscordMainIPC {
  static on(channel, listener) {
    _electron.default.ipcMain.on(channel, (...args) => {
      return listener.apply(this, args);
    });
  }
  static handle(channel, listener) {
    return _electron.default.ipcMain.handle(channel, (...args) => {
      return listener.apply(this, args);
    });
  }
}
class DiscordRendererIPC {
  static sendSync(...args) {
    return _electron.default.ipcRenderer.sendSync.apply(_electron.default.ipcRenderer, args);
  }
  static invoke(...args) {
    return _electron.default.ipcRenderer.invoke.apply(_electron.default.ipcRenderer, args);
  }
  static on(channel, listener) {
    _electron.default.ipcRenderer.on(channel, (...args) => {
      return listener.apply(this, args);
    });
  }
}
const DiscordIPC = {
  main: DiscordMainIPC,
  renderer: DiscordRendererIPC
};
exports.DiscordIPC = DiscordIPC;