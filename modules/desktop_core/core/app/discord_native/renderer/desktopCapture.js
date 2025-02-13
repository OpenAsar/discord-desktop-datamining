"use strict";

var _DiscordIPC = require("../common/DiscordIPC");
async function getDesktopCaptureSources(options) {
  const sources = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, options);
  return sources.map(source => {
    var _source$appIcon;
    return {
      id: source.id,
      name: source.name,
      url: source.thumbnail.toDataURL(),
      icon: (_source$appIcon = source.appIcon) === null || _source$appIcon === void 0 ? void 0 : _source$appIcon.toDataURL()
    };
  });
}
module.exports = {
  getDesktopCaptureSources
};