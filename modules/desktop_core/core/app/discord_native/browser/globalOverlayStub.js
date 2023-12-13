"use strict";

var _DiscordIPC = require("../common/DiscordIPC");
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN_WINDOW, () => {
  return Promise.resolve();
});