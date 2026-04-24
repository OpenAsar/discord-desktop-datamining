"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectGetWindow = injectGetWindow;
exports.newWindowEvent = newWindowEvent;
const electron_1 = __importDefault(require("electron"));
const process_1 = __importDefault(require("process"));
const DiscordIPC_1 = require("../common/DiscordIPC");
let injectedGetWindow = (_key) => null;
let injectedGetAllWindows = () => [];
let contentProtectionEnabled = false;
const windowContentProtectionOverride = new Set();
function injectGetWindow(getWindow, getAllWindows) {
    injectedGetWindow = getWindow;
    injectedGetAllWindows = getAllWindows;
}
function newWindowEvent(window) {
    if (contentProtectionEnabled) {
        window.setContentProtection(true);
        console.log(`window: WINDOW_SET_CONTENT_PROTCTION ${window.id} = true`);
    }
}
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_FLASH_FRAME, (_, flag) => {
    const currentWindow = injectedGetWindow(null);
    if (currentWindow == null || currentWindow.flashFrame == null)
        return Promise.resolve();
    currentWindow.flashFrame(!currentWindow.isFocused() && flag);
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_MINIMIZE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.minimize();
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_RESTORE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.restore();
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_MAXIMIZE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        if (win.isMaximized()) {
            win.unmaximize();
        }
        else {
            win.maximize();
        }
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_FOCUS, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.show();
        win.setSkipTaskbar(false);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_ALWAYS_ON_TOP, (_, key, enabled) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.setAlwaysOnTop(enabled);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_IS_ALWAYS_ON_TOP, (_, key) => {
    const win = injectedGetWindow(key);
    if (win == null)
        return Promise.resolve(false);
    return Promise.resolve(win.isAlwaysOnTop());
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_BLUR, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null && !win.isDestroyed()) {
        win.blur();
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_PROGRESS_BAR, (_, key, progress) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.setProgressBar(progress);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_TOGGLE_FULLSCREEN, (_, key) => {
    const currentWindow = injectedGetWindow(key);
    if (currentWindow == null) {
        console.error(`window: Unable to find window with key ${key}`);
        return Promise.resolve();
    }
    currentWindow.setFullScreen(!currentWindow.isFullScreen());
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_CLOSE, (_, key) => {
    if (key == null && process_1.default.platform === 'darwin') {
        electron_1.default.Menu.sendActionToFirstResponder('hide:');
    }
    else {
        const win = injectedGetWindow(key);
        if (win != null) {
            win.close();
        }
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_BACKGROUND_THROTTLING, (_, enabled) => {
    const win = injectedGetWindow();
    if (win != null) {
        win.webContents.setBackgroundThrottling(enabled);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_FRAME_RATE, (_, key, fps) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.webContents?.setMaxFPS?.(fps);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_CONTENT_PROTCTION, (_, enabled) => {
    const windows = injectedGetAllWindows();
    for (const window of windows) {
        if (window != null) {
            if (!windowContentProtectionOverride.has(window.id)) {
                window.setContentProtection(enabled);
                console.log(`window: WINDOW_SET_CONTENT_PROTCTION ${window.id} = ${enabled}`);
            }
        }
    }
    contentProtectionEnabled = enabled;
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_WINDOW_CONTENT_PROTECTION, (_, key, enabled) => {
    const window = injectedGetWindow(key);
    if (window != null) {
        if (enabled) {
            windowContentProtectionOverride.add(window.id);
        }
        else {
            windowContentProtectionOverride.delete(window.id);
        }
        const combinedEnabled = enabled || contentProtectionEnabled;
        window.setContentProtection(combinedEnabled);
        console.log(`window: WINDOW_SET_WINDOW_CONTENT_PROTECTION ${key} ${window.id} = ${combinedEnabled}`);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_GET_NATIVE_HANDLE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        return Promise.resolve(win.getNativeWindowHandle().readInt32LE().toString(10));
    }
    return Promise.resolve(null);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_GET_MEDIA_SOURCE_ID, (_, key) => {
    const win = injectedGetWindow(key);
    return Promise.resolve(win?.getMediaSourceId() ?? null);
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_MINIMUM_SIZE, (_, width, height) => {
    const win = injectedGetWindow();
    if (win != null) {
        win.setMinimumSize(width, height);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SET_FOCUSABLE, (_, key, enabled) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.setFocusable(enabled);
    }
    return Promise.resolve();
});
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WINDOW_SHOW_INACTIVE, (_, key) => {
    const win = injectedGetWindow(key);
    if (win != null) {
        win.showInactive();
    }
    return Promise.resolve();
});
