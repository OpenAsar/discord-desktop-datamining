"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectSettingsBackend = injectSettingsBackend;
const electron = __importStar(require("electron"));
const { SETTINGS_GET, SETTINGS_SET, SETTINGS_GET_SYNC } = require('../common/constants').IPCEvents;
let injectedSettings = null;
function getSettings() {
    return injectedSettings != null
        ? injectedSettings
        : {
            get: () => { },
            set: () => { },
            save: () => { },
        };
}
function injectSettingsBackend(settings) {
    injectedSettings = settings;
}
electron.ipcMain.handle(SETTINGS_GET, (_, name, defaultValue) => {
    const settings = getSettings();
    return settings.get(name, defaultValue);
});
electron.ipcMain.handle(SETTINGS_SET, (_, name, value) => {
    const settings = getSettings();
    settings.set(name, value);
    settings.save();
});
electron.ipcMain.on(SETTINGS_GET_SYNC, (event, name, defaultValue) => {
    const settings = getSettings();
    event.returnValue = settings.get(name, defaultValue);
});
