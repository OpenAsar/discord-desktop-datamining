"use strict";

const electron = require('electron');
const {
  GPU_SETTINGS_SET_ENABLE_HWACCEL,
  GPU_SETTINGS_GET_ENABLE_HWACCEL_SYNC,
  GPU_SETTINGS_SET_CHROMIUM_SWITCHES,
  GPU_SETTINGS_SET_SETTING
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
async function setSetting(key, value) {
  electron.ipcRenderer.invoke(GPU_SETTINGS_SET_SETTING, key, value);
}
module.exports = {
  getEnableHardwareAcceleration,
  setEnableHardwareAcceleration,
  setChromiumSwitches,
  setSetting
};