"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplayCount = getDisplayCount;
var _DiscordIPC = require("../common/DiscordIPC");
function getDisplayCount() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.HARDWARE_GET_DISPLAY_COUNT);
}