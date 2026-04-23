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
exports.get = get;
exports.set = set;
exports.getSync = getSync;
const electron = __importStar(require("electron"));
const { SETTINGS_GET, SETTINGS_SET, SETTINGS_GET_SYNC } = require('../common/constants').IPCEvents;
const RENDERER_SET_WHITELIST = [
    'audioSubsystem',
    'offloadAdmControls',
    'debugLogging',
    'asyncVideoInputDeviceInit',
    'ALWAYS_ALLOW_UPDATES',
    'ALLOW_OPTIONAL_UPDATES',
    'openH264Enabled',
    'USE_NEW_UPDATER',
    'USE_RUST_BSPATCH',
];
function get(name, defaultValue) {
    return electron.ipcRenderer.invoke(SETTINGS_GET, name, defaultValue);
}
async function set(name, value) {
    if (!RENDERER_SET_WHITELIST.includes(name)) {
        throw new Error('cannot set this setting key');
    }
    return electron.ipcRenderer.invoke(SETTINGS_SET, name, value);
}
function getSync(name, defaultValue) {
    return electron.ipcRenderer.sendSync(SETTINGS_GET_SYNC, name, defaultValue);
}
