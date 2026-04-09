"use strict";

var _DiscordIPC = require("../common/DiscordIPC");
function getDesktopCaptureSources(options) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, options);
}
module.exports = {
  getDesktopCaptureSources
};