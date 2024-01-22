"use strict";

var _DiscordIPC = require("../common/DiscordIPC");
async function getDesktopCaptureSources(options) {
  const sources = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, options);
  return sources.map(source => {
    return {
      id: source.id,
      name: source.name,
      url: source.thumbnail.toDataURL()
    };
  });
}
module.exports = {
  getDesktopCaptureSources
};