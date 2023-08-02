"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadClip = loadClip;
exports.loadClipsDirectory = loadClipsDirectory;
exports.deleteClip = deleteClip;
var _DiscordIPC = require("../common/DiscordIPC");
function loadClip(path) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.LOAD_CLIP, path);
}
function loadClipsDirectory(path) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.LOAD_CLIPS_DIRECTORY, path);
}
function deleteClip(path) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.DELETE_CLIP, path);
}