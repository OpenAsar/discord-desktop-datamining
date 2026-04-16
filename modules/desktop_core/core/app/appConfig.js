"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInit = void 0;
exports.init = init;
const appSettings_1 = require("./bootstrapModules/appSettings");
const autoStart_1 = require("./bootstrapModules/autoStart");
const constants_1 = require("./discord_native/common/constants");
const ipcMain_1 = __importDefault(require("./ipcMain"));
const settings = appSettings_1.appSettings.getSettings();
const NOOP = () => { };
exports.hasInit = false;
function init() {
    if (exports.hasInit) {
        return;
    }
    exports.hasInit = true;
    ipcMain_1.default.on('TOGGLE_MINIMIZE_TO_TRAY', (_event, value) => setMinimizeOnClose(value));
    ipcMain_1.default.on('TOGGLE_OPEN_ON_STARTUP', (_event, value) => toggleRunOnStartup(value));
    ipcMain_1.default.on('TOGGLE_START_MINIMIZED', (_event, value) => toggleStartMinimized(value));
    ipcMain_1.default.on('UPDATE_OPEN_ON_STARTUP', (_event) => updateOpenOnStartup());
    ipcMain_1.default.handle(constants_1.IPCEvents.APP_GET_OPEN_ON_START, () => {
        return new Promise((resolve) => {
            autoStart_1.autoStart.isInstalled(resolve);
        });
    });
}
function setMinimizeOnClose(minimizeToTray) {
    if (settings == null) {
        console.warn(`Could not execute 'setMinimizeOnClose', settings was null`);
        return;
    }
    settings.set('MINIMIZE_TO_TRAY', minimizeToTray);
}
function toggleRunOnStartup(openOnStartup) {
    if (openOnStartup) {
        autoStart_1.autoStart.install(NOOP);
    }
    else {
        autoStart_1.autoStart.uninstall(NOOP);
    }
}
function toggleStartMinimized(startMinimized) {
    if (settings == null) {
        console.warn(`Could not execute 'toggleStartMinimized', settings was null`);
        return;
    }
    settings.set('START_MINIMIZED', startMinimized);
    autoStart_1.autoStart.isInstalled((installed) => {
        if (installed) {
            autoStart_1.autoStart.install(NOOP);
        }
    });
}
function updateOpenOnStartup() {
    autoStart_1.autoStart.update(NOOP);
}
