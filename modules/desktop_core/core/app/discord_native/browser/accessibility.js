"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.ACCESSIBILITY_GET_ENABLED, () => {
  return Promise.resolve(_electron.default.app.accessibilitySupportEnabled);
});