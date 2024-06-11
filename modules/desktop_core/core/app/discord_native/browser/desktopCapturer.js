"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function mapDiscordDesktopCaptureSourcesToElectron(options) {
  const requiredTypes = ['screen', 'window'];
  const types = options.types.filter(type => requiredTypes.includes(type.toLocaleLowerCase())).map(type => type.toLocaleLowerCase());
  return {
    types,
    thumbnailSize: options.thumbnailSize
  };
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, (_, opts) => {
  const electronOptions = mapDiscordDesktopCaptureSourcesToElectron(opts);
  return _electron.default.desktopCapturer.getSources(electronOptions);
});