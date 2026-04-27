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
const electron = __importStar(require("electron"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const appFeatures_1 = require("../../appFeatures");
const utils_1 = require("../../utils");
const DiscordIPC_1 = require("../common/DiscordIPC");
const nativeModules_1 = require("./nativeModules");
function sendToAllWindows(channel, ...args) {
    electron.BrowserWindow.getAllWindows().forEach((win) => {
        const contents = win.webContents;
        if (contents != null) {
            contents.send(channel, ...args);
        }
    });
}
if (utils_1.isOSX) {
    let majorVersion;
    try {
        majorVersion = parseInt(os_1.default.release().split('.')[0], 10);
    }
    catch (_e) {
        majorVersion = 0;
    }
    if (majorVersion >= 21 && moduleDataPath != null) {
        try {
            const modulePath = (0, nativeModules_1.getModulePath)('discord_notifications') ?? path_1.default.join(moduleDataPath, 'discord_notifications');
            const lib = require(modulePath);
            lib.setDataPath(modulePath);
            lib.setCallbacks((action, identifier, userText, fallbackDeepLink) => {
                sendToAllWindows(DiscordIPC_1.IPCEvents.NOTIFICATIONS_RECEIVED_RESPONSE, action, identifier, userText, fallbackDeepLink);
            }, (_identifier) => {
                return ['badge', 'banner', 'list', 'sound'];
            }, (identifier) => {
                sendToAllWindows('USER_SETTINGS_OPEN', identifier, 'Notifications');
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, async (_event, provisional) => {
                return await lib.getAuthorization(provisional);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_GET_SETTINGS, async (_event) => {
                return await lib.getSettings();
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION, async (_event, options) => {
                return await lib.sendNotification(options);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS, (_event, identifiers) => {
                lib.removeNotifications(identifiers);
                return Promise.resolve();
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS, (_event) => {
                lib.removeAllNotifications();
                return Promise.resolve();
            });
            (0, appFeatures_1.getFeatures)().declareSupported('notifications');
            (0, appFeatures_1.getFeatures)().declareSupported('notifications_provisional');
        }
        catch (e) {
            console.warn('discord_notifications setup failed with error: ', e);
        }
    }
}
else if (utils_1.isWindows && electron.Notification.isSupported()) {
    try {
        const lib = require('discord_notifications');
        if (lib == null) {
            console.warn('discord_notifications module not found.');
        }
        else {
            lib.setCallbacks((action, identifier, userText) => {
                sendToAllWindows(DiscordIPC_1.IPCEvents.NOTIFICATIONS_RECEIVED_RESPONSE, action, identifier, userText);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, async (_event) => {
                return await lib.getAuthorization();
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_GET_SETTINGS, async (_event) => {
                return await lib.getSettings();
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION, async (_event, options) => {
                return await lib.showNotification(options);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS, async (_event, identifiers) => {
                return await lib.removeNotifications(identifiers);
            });
            DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS, async (_event) => {
                return await lib.removeAllNotifications();
            });
            (0, appFeatures_1.getFeatures)().declareSupported('notifications');
        }
    }
    catch (e) {
        console.warn('discord_notifications setup failed with error: ', e);
    }
}
