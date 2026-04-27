"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInit = void 0;
exports.init = init;
exports.refreshAppBadge = refreshAppBadge;
const electron_1 = require("electron");
const ipcMain_1 = __importDefault(require("./ipcMain"));
const mainScreen_1 = require("./mainScreen");
const utils_1 = require("./utils");
exports.hasInit = false;
let lastIndex = null;
let lastCount = null;
const appIcons = [];
function isSupported() {
    return process.platform === 'win32';
}
function init() {
    if (!isSupported())
        return;
    if (exports.hasInit) {
        console.warn('appBadge: Has already init! Cancelling init.');
        return;
    }
    exports.hasInit = true;
    lastIndex = null;
    const resourcePath = `app/images/badges`;
    for (let i = 1; i <= 11; i++) {
        const image = (0, utils_1.exposeModuleResource)(resourcePath, `badge-${i}.ico`);
        appIcons.push(image);
    }
    ipcMain_1.default.on('APP_BADGE_SET', (_event, count) => setAppBadge(count, false));
}
function refreshAppBadge() {
    if (!isSupported() || lastCount == null)
        return;
    setAppBadge(lastCount, true);
}
function setAppBadge(count, force) {
    const win = electron_1.BrowserWindow.fromId((0, mainScreen_1.getMainWindowId)());
    if (win == null || win.isDestroyed()) {
        return;
    }
    const { index, description } = getOverlayIconData(count);
    if (force || lastIndex !== index) {
        if (index == null) {
            win.setOverlayIcon(null, description);
        }
        else {
            win.setOverlayIcon(appIcons[index], description);
        }
        lastIndex = index;
    }
    lastCount = count;
}
function getOverlayIconData(count) {
    if (count === -1) {
        return {
            index: 10,
            description: `Unread messages`,
        };
    }
    if (count === 0) {
        return {
            index: null,
            description: 'No Notifications',
        };
    }
    const index = Math.max(1, Math.min(count, 10)) - 1;
    return {
        index,
        description: `${index} notifications`,
    };
}
