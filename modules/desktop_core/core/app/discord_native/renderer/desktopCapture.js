"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function getDesktopCaptureSources(options) {
  let sources = null;
  if (_electron.default.desktopCapturer != null) {
    sources = await _electron.default.desktopCapturer.getSources(options);
  } else {
    sources = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, options);
  }
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