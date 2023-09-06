"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeOverlay = closeOverlay;
exports.openOverlay = openOverlay;
exports.relayInputClick = relayInputClick;
exports.setClickZoneCallback = setClickZoneCallback;
exports.setClickZones = setClickZones;
exports.setInteractionEnabled = setInteractionEnabled;
var _DiscordIPC = require("../common/DiscordIPC");
let clickZoneCallback = null;
_DiscordIPC.DiscordIPC.renderer.on(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_CLICK_ZONE_CLICKED, (_, name) => {
  if (clickZoneCallback != null) {
    clickZoneCallback(name);
  }
});
function openOverlay(url) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN, url);
}
function closeOverlay() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_CLOSE);
}
function setInteractionEnabled(enabled) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_INTERACT_TOGGLE, enabled);
}
function setClickZones(zones) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_SET_CLICK_ZONES, zones);
}
function setClickZoneCallback(callback) {
  clickZoneCallback = callback;
  return Promise.resolve();
}
function relayInputClick(button, x, y) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_RELAY_INPUT_CLICK, button, x, y);
}