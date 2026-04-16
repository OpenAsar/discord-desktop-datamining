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
exports.send = send;
exports.on = on;
exports.invoke = invoke;
const electron = __importStar(require("electron"));
const constants_1 = require("../common/constants");
const ipcRenderer = electron.ipcRenderer;
const RENDERER_IPC_SEND_WHITELIST = new Set([
    constants_1.IPCEvents.APP_ASYNC_INDEX_TSX_LOADED,
    constants_1.IPCEvents.APP_BADGE_SET,
    constants_1.IPCEvents.APP_FIRST_RENDER_AFTER_READY_PAYLOAD,
    constants_1.IPCEvents.APP_GET_ANALYTICS_EVENTS,
    constants_1.IPCEvents.APP_MAIN_BUNDLE_STATS,
    constants_1.IPCEvents.APP_LOADED,
    constants_1.IPCEvents.APP_PUSH_ANALYTICS,
    constants_1.IPCEvents.APP_VIEWED,
    constants_1.IPCEvents.CHECK_FOR_UPDATES,
    constants_1.IPCEvents.NAVIGATION_HISTORY_CLEAR,
    constants_1.IPCEvents.NOTIFICATION_CLOSE,
    constants_1.IPCEvents.NOTIFICATION_SHOW,
    constants_1.IPCEvents.NOTIFICATIONS_CLEAR,
    constants_1.IPCEvents.OPEN_EXTERNAL_URL,
    constants_1.IPCEvents.QUIT_AND_INSTALL,
    constants_1.IPCEvents.SETTINGS_UPDATE_BACKGROUND_COLOR,
    constants_1.IPCEvents.SYSTEM_TRAY_SET_ICON,
    constants_1.IPCEvents.SYSTEM_TRAY_SET_APPLICATIONS,
    constants_1.IPCEvents.THUMBAR_BUTTONS_UPDATE,
    constants_1.IPCEvents.TOGGLE_MINIMIZE_TO_TRAY,
    constants_1.IPCEvents.TOGGLE_OPEN_ON_STARTUP,
    constants_1.IPCEvents.TOGGLE_START_MINIMIZED,
    constants_1.IPCEvents.UPDATE_OPEN_ON_STARTUP,
    constants_1.IPCEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE,
    constants_1.IPCEvents.UPDATED_QUOTES,
    constants_1.IPCEvents.WINDOW_SET_TRAFFIC_LIGHT_POSITION,
]);
const RENDERER_IPC_INVOKE_WHITELIST = new Set([
    constants_1.IPCEvents.APP_GET_ANALYTICS_EVENTS,
    constants_1.IPCEvents.GET_MOUSE_COORDINATES,
    constants_1.IPCEvents.INTENTS_SET_ACTIVITY,
    constants_1.IPCEvents.INTENTS_RESIGN_ACTIVITY,
    constants_1.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION,
    constants_1.IPCEvents.NOTIFICATIONS_GET_SETTINGS,
    constants_1.IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION,
    constants_1.IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS,
    constants_1.IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS,
    constants_1.IPCEvents.SEARCH_INDEX_DOMAINS,
    constants_1.IPCEvents.SEARCH_CLEAR_INDEX,
    constants_1.IPCEvents.SEARCH_DELETE_DOMAINS,
    constants_1.IPCEvents.SEARCH_DELETE_ITEMS,
]);
function send(ev, ...args) {
    const prefixedEvent = (0, constants_1.getDiscordIPCEvent)(ev);
    if (!RENDERER_IPC_SEND_WHITELIST.has(prefixedEvent)) {
        throw new Error('cannot send this event');
    }
    ipcRenderer.send(prefixedEvent, ...args);
}
function on(ev, callback) {
    ipcRenderer.on((0, constants_1.getDiscordIPCEvent)(ev), function () {
        callback.apply(callback, [null, ...[...arguments].slice(1)]);
    });
}
function invoke(ev, ...args) {
    const prefixedEvent = (0, constants_1.getDiscordIPCEvent)(ev);
    if (!RENDERER_IPC_INVOKE_WHITELIST.has(prefixedEvent)) {
        throw new Error('cannot invoke this event');
    }
    return ipcRenderer.invoke(prefixedEvent, ...args);
}
