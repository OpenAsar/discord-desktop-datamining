"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnableHardwareAcceleration = getEnableHardwareAcceleration;
exports.setChromiumSwitches = setChromiumSwitches;
exports.setEnableHardwareAcceleration = setEnableHardwareAcceleration;
exports.setSetting = setSetting;
var _electron = require("electron");
var _appSettings = require("./bootstrapModules/appSettings");
const settings = _appSettings.appSettings.getSettings();
function getEnableHardwareAcceleration() {
  if (process.platform === 'darwin') {
    return true;
  }
  if (settings == null) {
    return false;
  }
  return settings.get('enableHardwareAcceleration', true);
}
function setEnableHardwareAcceleration(enableHardwareAcceleration) {
  if (settings == null) {
    return;
  }
  settings.set('enableHardwareAcceleration', enableHardwareAcceleration);
  settings.save();
  _electron.app.relaunch();
  _electron.app.exit(0);
}
function setChromiumSwitches(switches) {
  if (settings == null) {
    return;
  }
  settings.set('chromiumSwitches', switches);
  settings.save();
}
function setSetting(key, value) {
  if (settings == null) {
    return;
  }
  settings.set(key, value);
  settings.save();
}