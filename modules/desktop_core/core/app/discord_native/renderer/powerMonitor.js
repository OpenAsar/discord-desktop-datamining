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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.on = on;
exports.removeAllListeners = removeAllListeners;
exports.getSystemIdleTimeMs = getSystemIdleTimeMs;
const electron = __importStar(require("electron"));
const events_1 = __importDefault(require("events"));
const { POWER_MONITOR_RESUME, POWER_MONITOR_SUSPEND, POWER_MONITOR_LOCK_SCREEN, POWER_MONITOR_UNLOCK_SCREEN, POWER_MONITOR_GET_SYSTEM_IDLE_TIME, } = require('../common/constants').IPCEvents;
const events = new events_1.default();
electron.ipcRenderer.on(POWER_MONITOR_RESUME, () => {
    events.emit('resume');
});
electron.ipcRenderer.on(POWER_MONITOR_SUSPEND, () => {
    events.emit('suspend');
});
electron.ipcRenderer.on(POWER_MONITOR_LOCK_SCREEN, () => {
    events.emit('lock-screen');
});
electron.ipcRenderer.on(POWER_MONITOR_UNLOCK_SCREEN, () => {
    events.emit('unlock-screen');
});
function on(eventName, listener) {
    events.on(eventName, listener);
    return () => events.removeListener(eventName, listener);
}
function removeAllListeners(eventName) {
    events.removeAllListeners(eventName);
}
function getSystemIdleTimeMs() {
    return electron.ipcRenderer.invoke(POWER_MONITOR_GET_SYSTEM_IDLE_TIME);
}
