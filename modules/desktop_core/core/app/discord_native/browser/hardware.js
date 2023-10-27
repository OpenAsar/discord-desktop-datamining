"use strict";

var _electron = require("electron");
var _DiscordIPC = require("../common/DiscordIPC");
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.HARDWARE_GET_DISPLAY_COUNT, () => {
  return Promise.resolve(_electron.screen.getAllDisplays().length);
});