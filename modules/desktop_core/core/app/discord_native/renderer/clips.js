"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteClip = deleteClip;
exports.getClipProtocolURLFromPath = getClipProtocolURLFromPath;
exports.loadClip = loadClip;
exports.loadClipsDirectory = loadClipsDirectory;
var _nodeUrl = require("node:url");
var _constants = require("../../../common/constants");
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
function getClipProtocolURLFromPath(string) {
  const fileURL = (0, _nodeUrl.pathToFileURL)(string);
  return fileURL.href.replace(fileURL.protocol, `${_constants.DISCORD_CLIP_PROTOCOL}:`);
}