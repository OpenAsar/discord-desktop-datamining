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
/* eslint-disable prefer-spread */

// Save people from needing two imports.

class DiscordMainIPC {
  /**
   * For handling sync events.
   */

  static on(channel, listener) {
    _electron.default.ipcMain.on(channel, (...args) => {
      return listener.apply(this, args);
    });
  }

  /**
   * For handling async events.
   */

  static handle(channel, listener) {
    return _electron.default.ipcMain.handle(channel, (...args) => {
      return listener.apply(this, args);
    });
  }
}
class DiscordRendererIPC {
  /**
   * For sending sync events.
   */

  static sendSync(...args) {
    return _electron.default.ipcRenderer.sendSync.apply(_electron.default.ipcRenderer, args);
  }

  /**
   * For sending async events.
   */

  static invoke(...args) {
    return _electron.default.ipcRenderer.invoke.apply(_electron.default.ipcRenderer, args);
  }
}
const DiscordIPC = {
  main: DiscordMainIPC,
  renderer: DiscordRendererIPC
};
exports.DiscordIPC = DiscordIPC;