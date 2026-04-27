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
const electron = __importStar(require("electron"));
const { POWER_MONITOR_RESUME, POWER_MONITOR_SUSPEND, POWER_MONITOR_LOCK_SCREEN, POWER_MONITOR_UNLOCK_SCREEN, POWER_MONITOR_GET_SYSTEM_IDLE_TIME, } = require('../common/constants').IPCEvents;
electron.ipcMain.handle(POWER_MONITOR_GET_SYSTEM_IDLE_TIME, (_) => {
    if (process.platform === 'linux'
        && process.env.XDG_SESSION_TYPE?.startsWith('wayland')
        && process.env.WAYLAND_DISPLAY != null) {
        try {
            const discordUtils = require('discord_utils');
            if (discordUtils.isWaylandIdleAvailable?.()) {
                return Number(discordUtils.getWaylandSystemIdleTimeMs());
            }
        }
        catch (error) {
            console.error('Wayland idle time query failed:', error);
        }
    }
    return electron.powerMonitor.getSystemIdleTime() * 1000;
});
function sendToAllWindows(channel) {
    electron.BrowserWindow.getAllWindows().forEach((win) => {
        const contents = win.webContents;
        if (contents != null) {
            contents.send(channel);
        }
    });
}
electron.powerMonitor.on('resume', () => {
    sendToAllWindows(POWER_MONITOR_RESUME);
});
electron.powerMonitor.on('suspend', () => {
    sendToAllWindows(POWER_MONITOR_SUSPEND);
});
electron.powerMonitor.on('lock-screen', () => {
    sendToAllWindows(POWER_MONITOR_LOCK_SCREEN);
});
electron.powerMonitor.on('unlock-screen', () => {
    sendToAllWindows(POWER_MONITOR_UNLOCK_SCREEN);
});
