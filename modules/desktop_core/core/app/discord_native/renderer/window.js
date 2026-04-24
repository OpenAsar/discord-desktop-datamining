"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USE_OSX_NATIVE_TRAFFIC_LIGHTS = void 0;
exports.flashFrame = flashFrame;
exports.minimize = minimize;
exports.restore = restore;
exports.maximize = maximize;
exports.focus = focus;
exports.setAlwaysOnTop = setAlwaysOnTop;
exports.isAlwaysOnTop = isAlwaysOnTop;
exports.showInactive = showInactive;
exports.blur = blur;
exports.setProgressBar = setProgressBar;
exports.fullscreen = fullscreen;
exports.close = close;
exports.setMinimumSize = setMinimumSize;
exports.setZoomFactor = setZoomFactor;
exports.setBackgroundThrottling = setBackgroundThrottling;
exports.setFrameRate = setFrameRate;
exports.setDevtoolsCallbacks = setDevtoolsCallbacks;
exports.supportsContentProtection = supportsContentProtection;
exports.setContentProtection = setContentProtection;
exports.setWindowContentProtection = setWindowContentProtection;
exports.getNativeHandle = getNativeHandle;
exports.getMediaSourceId = getMediaSourceId;
exports.setFocusable = setFocusable;
const electron_1 = __importDefault(require("electron"));
const processUtils_1 = require("../../../common/processUtils");
const DiscordIPC_1 = require("../common/DiscordIPC");
let devtoolsOpenedCallback = () => { };
let devtoolsClosedCallback = () => { };
DiscordIPC_1.DiscordIPC.renderer.on(DiscordIPC_1.IPCEvents.WINDOW_DEVTOOLS_OPENED, () => {
    devtoolsOpenedCallback?.();
});
DiscordIPC_1.DiscordIPC.renderer.on(DiscordIPC_1.IPCEvents.WINDOW_DEVTOOLS_CLOSED, () => {
    devtoolsClosedCallback?.();
});
function flashFrame(flag) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_FLASH_FRAME, flag);
}
function minimize(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_MINIMIZE, key);
}
function restore(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_RESTORE, key);
}
function maximize(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_MAXIMIZE, key);
}
function focus(_hack, key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_FOCUS, key);
}
function setAlwaysOnTop(key, enabled) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SET_ALWAYS_ON_TOP, key, enabled);
}
function isAlwaysOnTop(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_IS_ALWAYS_ON_TOP, key);
}
function showInactive(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SHOW_INACTIVE, key);
}
function blur(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_BLUR, key);
}
function setProgressBar(progress, key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SET_PROGRESS_BAR, key ?? null, progress);
}
function fullscreen(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_TOGGLE_FULLSCREEN, key);
}
function close(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_CLOSE, key);
}
function setMinimumSize(width, height) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SET_MINIMUM_SIZE, width, height);
}
function setZoomFactor(factor) {
    electron_1.default.webFrame.setZoomFactor(factor / 100);
}
function setBackgroundThrottling(enabled) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SET_BACKGROUND_THROTTLING, enabled);
}
function setFrameRate(key, fps) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SET_FRAME_RATE, key, fps);
}
function setDevtoolsCallbacks(onOpened, onClosed) {
    devtoolsOpenedCallback = onOpened;
    devtoolsClosedCallback = onClosed;
}
function supportsContentProtection() {
    return processUtils_1.IS_WIN;
}
function setContentProtection(enabled) {
    if (!supportsContentProtection()) {
        console.log('setContentProtection: Unsupported platform.');
        return Promise.resolve();
    }
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SET_CONTENT_PROTCTION, enabled);
}
function setWindowContentProtection(key, enabled) {
    if (!supportsContentProtection()) {
        console.log('setWindowContentProtection: Unsupported platform.');
        return Promise.resolve();
    }
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SET_WINDOW_CONTENT_PROTECTION, key, enabled);
}
function getNativeHandle(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_GET_NATIVE_HANDLE, key);
}
function getMediaSourceId(key) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_GET_MEDIA_SOURCE_ID, key);
}
function setFocusable(key, enabled) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.WINDOW_SET_FOCUSABLE, key, enabled);
}
exports.USE_OSX_NATIVE_TRAFFIC_LIGHTS = true;
