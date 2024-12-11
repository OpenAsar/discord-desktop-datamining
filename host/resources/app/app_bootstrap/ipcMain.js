"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
var _default = {
  on: (event, callback) => _electron.ipcMain.on(`DISCORD_${event}`, callback),
  removeListener: (event, callback) => _electron.ipcMain.removeListener(`DISCORD_${event}`, callback)
};
exports.default = _default;
module.exports = exports.default;