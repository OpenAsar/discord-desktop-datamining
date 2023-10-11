"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeOverlay = closeOverlay;
exports.getWindowHandles = getWindowHandles;
exports.hideOverlay = hideOverlay;
exports.openDevConsole = openDevConsole;
exports.openOverlay = openOverlay;
exports.relayInputClick = relayInputClick;
exports.setClickZoneCallback = setClickZoneCallback;
exports.setClickZones = setClickZones;
exports.setInteractionEnabled = setInteractionEnabled;
exports.showOverlay = showOverlay;
var _DiscordIPC = require("../common/DiscordIPC");
let clickZoneCallback = null;
_DiscordIPC.DiscordIPC.renderer.on(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_CLICK_ZONE_CLICKED, (_, name, x, y) => {
  if (clickZoneCallback != null) {
    clickZoneCallback(name, x, y);
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
function showOverlay() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_SET_VISIBILITY, true);
}
function hideOverlay() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_SET_VISIBILITY, false);
}
function getWindowHandles() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_GET_WINDOW_HANDLES);
}
function openDevConsole(modifier) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN_DEV_CONSOLE, modifier);
}