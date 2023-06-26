"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnableHardwareAcceleration = getEnableHardwareAcceleration;
exports.setEnableHardwareAcceleration = setEnableHardwareAcceleration;

var _electron = require("electron");

var _appSettings = require("./bootstrapModules/appSettings");

const settings = _appSettings.appSettings.getSettings();

function getEnableHardwareAcceleration() {
  return settings.get('enableHardwareAcceleration', true);
}

function setEnableHardwareAcceleration(enableHardwareAcceleration) {
  settings.set('enableHardwareAcceleration', enableHardwareAcceleration);
  settings.save();

  _electron.app.relaunch();

  _electron.app.exit(0);
}