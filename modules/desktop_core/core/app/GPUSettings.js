"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnableHardwareAcceleration = getEnableHardwareAcceleration;
exports.setEnableHardwareAcceleration = setEnableHardwareAcceleration;
exports.setChromiumSwitches = setChromiumSwitches;
exports.setSetting = setSetting;
const electron_1 = require("electron");
const appSettings_1 = require("./bootstrapModules/appSettings");
const settings = appSettings_1.appSettings.getSettings();
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
    electron_1.app.relaunch();
    electron_1.app.exit(0);
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
