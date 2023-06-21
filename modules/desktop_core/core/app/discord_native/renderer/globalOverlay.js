"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openOverlay = openOverlay;

var _DiscordIPC = require("../common/DiscordIPC");

function openOverlay(url) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN, url);
}