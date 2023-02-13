"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadClip = loadClip;
var _DiscordIPC = require("../common/DiscordIPC");
function loadClip(path) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.LOAD_CLIP, path);
}