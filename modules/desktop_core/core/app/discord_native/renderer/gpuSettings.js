"use strict";

const electron = require('electron');
const {
  GPU_SETTINGS_SET_ENABLE_HWACCEL,
  GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC,
  GPU_SETTINGS_SET_CHROMIUM_SWITCHES
} = require('../common/constants').IPCEvents;
const hardwareAccelerationEnabled = electron.ipcRenderer.sendSync(GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC);
function getEnableHardwareAcceleration() {
  return hardwareAccelerationEnabled;
}
async function setEnableHardwareAcceleration(enable) {
  electron.ipcRenderer.invoke(GPU_SETTINGS_SET_ENABLE_HWACCEL, enable);
}
async function setChromiumSwitches(switches) {
  electron.ipcRenderer.invoke(GPU_SETTINGS_SET_CHROMIUM_SWITCHES, switches);
}
module.exports = {
  getEnableHardwareAcceleration,
  setEnableHardwareAcceleration,
  setChromiumSwitches
};