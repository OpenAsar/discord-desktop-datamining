"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
var _constants = require("./discord_native/common/constants");
var _default = {
  on: (event, callback) => _electron.ipcMain.on((0, _constants.getDiscordIPCEvent)(event), callback),
  removeListener: (event, callback) => _electron.ipcMain.removeListener((0, _constants.getDiscordIPCEvent)(event), callback),
  reply: (event, channel, ...args) => event.sender.send((0, _constants.getDiscordIPCEvent)(channel), ...args),
  handle: (event, callback) => _electron.ipcMain.handle((0, _constants.getDiscordIPCEvent)(event), callback)
};
exports.default = _default;
module.exports = exports.default;