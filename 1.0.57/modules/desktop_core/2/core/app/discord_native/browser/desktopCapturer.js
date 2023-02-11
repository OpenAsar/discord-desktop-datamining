"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, (_, opts) => {
  return _electron.default.desktopCapturer.getSources(opts);
});