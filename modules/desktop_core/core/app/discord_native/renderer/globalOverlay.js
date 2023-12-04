"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WINDOW_KEY", {
  enumerable: true,
  get: function () {
    return _constants.OVERLAY_WINDOW_KEY;
  }
});
exports.openWindow = openWindow;
var _DiscordIPC = require("../common/DiscordIPC");
var _constants = require("../common/constants");
function openWindow(url) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN_WINDOW, url);
}