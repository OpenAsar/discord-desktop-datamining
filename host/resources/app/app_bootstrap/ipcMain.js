"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getDiscordIPCEvent = getDiscordIPCEvent;
var _electron = require("electron");
const discordPrefixRegex = /^DISCORD_/;
function getDiscordIPCEvent(ev) {
  return discordPrefixRegex.test(ev) ? ev : `DISCORD_${ev}`;
}
var _default = exports.default = {
  on: (event, callback) => {
    _electron.ipcMain.on(getDiscordIPCEvent(event), callback);
  },
  removeListener: (event, callback) => {
    _electron.ipcMain.removeListener(getDiscordIPCEvent(event), callback);
  },
  handle: (event, callback) => _electron.ipcMain.handle(getDiscordIPCEvent(event), callback)
};