"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function convertDesktopSourceOptions(opts) {
  const mappedType = opts.types.filter(type => type === 'screen' || type === 'window').map(type => type.toLowerCase());
  return {
    types: mappedType
  };
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, (_, opts) => {
  const electronOpts = convertDesktopSourceOptions(opts);
  return _electron.default.desktopCapturer.getSources(electronOpts);
});