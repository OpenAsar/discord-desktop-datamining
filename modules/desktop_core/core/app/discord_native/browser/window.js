"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectGetWindow = injectGetWindow;
exports.newWindowEvent = newWindowEvent;
var _electron = _interopRequireDefault(require("electron"));
var _process = _interopRequireDefault(require("process"));
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let injectedGetWindow = () => null;
let injectedGetAllWindows = () => [];
let contentProtectionEnabled = false;
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
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_FLASH_FRAME, (_, flag) => {
  const currentWindow = injectedGetWindow(null);
  if (currentWindow == null || currentWindow.flashFrame == null) return Promise.resolve();
  currentWindow.flashFrame(!currentWindow.isFocused() && flag);
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_MINIMIZE, (_, key) => {
  const win = injectedGetWindow(key);
  if (win != null) {
    win.minimize();
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_RESTORE, (_, key) => {
  const win = injectedGetWindow(key);
  if (win != null) {
    win.restore();
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_MAXIMIZE, (_, key) => {
  const win = injectedGetWindow(key);
  if (win != null) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_FOCUS, (_, key) => {
  const win = injectedGetWindow(key);
  if (win != null) {
    win.show();
    win.setSkipTaskbar(false);
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_SET_ALWAYS_ON_TOP, (_, key, enabled) => {
  const win = injectedGetWindow(key);
  if (win != null) {
    win.setAlwaysOnTop(enabled);
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_IS_ALWAYS_ON_TOP, (_, key) => {
  const win = injectedGetWindow(key);
  if (win == null) return Promise.resolve(false);
  return Promise.resolve(win.isAlwaysOnTop());
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_BLUR, (_, key) => {
  const win = injectedGetWindow(key);
  if (win != null && !win.isDestroyed()) {
    win.blur();
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_SET_PROGRESS_BAR, (_, key, progress) => {
  const win = injectedGetWindow(key);
  if (win != null) {
    win.setProgressBar(progress);
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_TOGGLE_FULLSCREEN, (_, key) => {
  const currentWindow = injectedGetWindow(key);
  if (currentWindow == null) {
    console.error(`window: Unable to find window with key ${key}`);
    return Promise.resolve();
  }
  currentWindow.setFullScreen(!currentWindow.isFullScreen());
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_CLOSE, (_, key) => {
  if (key == null && _process.default.platform === 'darwin') {
    _electron.default.Menu.sendActionToFirstResponder('hide:');
  } else {
    const win = injectedGetWindow(key);
    if (win != null) {
      win.close();
    }
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_SET_BACKGROUND_THROTTLING, (_, enabled) => {
  const win = injectedGetWindow();
  if (win != null) {
    win.webContents.setBackgroundThrottling(enabled);
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_SET_CONTENT_PROTCTION, (_, enabled) => {
  const windows = injectedGetAllWindows();
  for (const window of windows) {
    if (window != null) {
      window.setContentProtection(enabled);
      console.log(`window: WINDOW_SET_CONTENT_PROTCTION ${window.id} = ${enabled}`);
    }
  }
  contentProtectionEnabled = enabled;
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_GET_NATIVE_HANDLE, (_, key) => {
  const win = injectedGetWindow(key);
  if (win != null) {
    return Promise.resolve(win.getNativeWindowHandle().readInt32LE().toString(10));
  }
  return Promise.resolve(null);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_GET_MEDIA_SOURCE_ID, (_, key) => {
  const win = injectedGetWindow(key);
  return Promise.resolve((win === null || win === void 0 ? void 0 : win.getMediaSourceId()) ?? null);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WINDOW_SET_MINIMUM_SIZE, (_, width, height) => {
  const win = injectedGetWindow();
  if (win != null) {
    win.setMinimumSize(width, height);
  }
  return Promise.resolve();
});