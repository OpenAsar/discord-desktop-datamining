"use strict";

var _DiscordIPC = require("../common/DiscordIPC");
function isAccessibilitySupportEnabled() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.ACCESSIBILITY_GET_ENABLED);
}
module.exports = {
  isAccessibilitySupportEnabled
};