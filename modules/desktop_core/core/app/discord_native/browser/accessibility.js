"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.ACCESSIBILITY_GET_ENABLED, () => {
  return Promise.resolve(_electron.default.app.accessibilitySupportEnabled);
});