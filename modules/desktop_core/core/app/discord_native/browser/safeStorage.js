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
const processUtils_1 = require("../../../common/processUtils");
const { SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE, SAFE_STORAGE_ENCRYPT_STRING, SAFE_STORAGE_DECRYPT_STRING } = require('../common/constants').IPCEvents;
electron.ipcMain.on(SAFE_STORAGE_IS_ENCRYPTION_AVAILABLE, (event) => {
    if (process.env.DISCORD_TEST === '1') {
        if (processUtils_1.IS_OSX) {
            event.returnValue = false;
            return;
        }
    }
    event.returnValue = electron.safeStorage != null && electron.safeStorage.isEncryptionAvailable();
});
electron.ipcMain.on(SAFE_STORAGE_ENCRYPT_STRING, (event, plainText) => {
    if (plainText != null) {
        event.returnValue = electron.safeStorage.encryptString(plainText).toString('base64');
    }
    else {
        event.returnValue = null;
    }
});
electron.ipcMain.on(SAFE_STORAGE_DECRYPT_STRING, (event, encrypted) => {
    if (encrypted != null) {
        try {
            event.returnValue = electron.safeStorage.decryptString(Buffer.from(encrypted, 'base64'));
        }
        catch {
            event.returnValue = null;
        }
    }
    else {
        event.returnValue = null;
    }
});
