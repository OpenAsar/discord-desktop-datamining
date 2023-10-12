"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
var _electron = require("electron");
const {
  GPU_SETTINGS_SET_ENABLE_HWACCEL,
  GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC
} = require('../common/constants').IPCEvents;
function init(settings) {
  _electron.ipcMain.handle(GPU_SETTINGS_SET_ENABLE_HWACCEL, async (_, enable) => {
    settings.set('enableHardwareAcceleration', enable);
    settings.save();
    _electron.app.relaunch();
    _electron.app.exit(0);
  });
  _electron.ipcMain.on(GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC, event => {
    const hardwareAccelerationEnabled = settings.get('enableHardwareAcceleration', true);
    event.returnValue = hardwareAccelerationEnabled;
  });
}