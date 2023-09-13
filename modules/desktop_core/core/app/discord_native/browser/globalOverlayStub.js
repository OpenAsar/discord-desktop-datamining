"use strict";

var _DiscordIPC = require("../common/DiscordIPC");
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN, () => {
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_CLOSE, () => {
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_INTERACT_TOGGLE, () => {
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_SET_CLICK_ZONES, () => {
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_RELAY_INPUT_CLICK, () => {
  return Promise.resolve();
});