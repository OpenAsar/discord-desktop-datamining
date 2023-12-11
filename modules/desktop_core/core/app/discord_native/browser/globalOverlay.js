"use strict";

var _electron = require("electron");
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _processUtils = require("../../../common/processUtils");
var _mainScreen = require("../../mainScreen");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OPEN_TIMEOUT = 5 * 60 * 1000;
let overlayWindow = null;
let inputWindow = null;
let isInteractionEnabled = false;
let clickZones = [];
let shouldBeVisible = false;
function isValidWindow(win) {
  var _win$webContents;
  return (win === null || win === void 0 ? void 0 : win.isDestroyed()) === false && (win === null || win === void 0 ? void 0 : (_win$webContents = win.webContents) === null || _win$webContents === void 0 ? void 0 : _win$webContents.isDestroyed()) === false;
}
function isValidUrl(url) {
  try {
    const parsedUrl = new _url.URL(url);
    if (parsedUrl.origin !== _mainScreen.WEBAPP_ENDPOINT) {
      console.error(`isValidUrl: "${parsedUrl.origin}" !== "${_mainScreen.WEBAPP_ENDPOINT}" (${url})`);
      return false;
    }
    if (parsedUrl.pathname !== '/overlay') {
      console.error(`isValidUrl: Invalid pathname "${parsedUrl.pathname}" (${url})`);
      return false;
    }
    return true;
  } catch (e) {
    console.error(`isValidUrl: Error "${e}" (${url})`);
    return false;
  }
}
function getActiveWindowList() {
  const windows = [];
  if (isValidWindow(overlayWindow)) {
    windows.push({
      type: 'overlay',
      window: overlayWindow
    });
  }
  if (isValidWindow(inputWindow)) {
    windows.push({
      type: 'input',
      window: inputWindow
    });
  }
  return windows;
}
async function openOverlay(url) {
  if (!_processUtils.IS_WIN) {
    console.log('GLOBAL_OVERLAY_OPEN: Windows only.');
    return;
  }
  if (isValidWindow(overlayWindow) && isValidWindow(inputWindow)) {
    console.log('openOverlay: Window already open.');
    return;
  }
  if (!isValidUrl(url)) {
    return;
  }
  closeOverlay();
  isInteractionEnabled = false;
  shouldBeVisible = false;
  try {
    const {
      x,
      y,
      width,
      height
    } = _electron.screen.getPrimaryDisplay().bounds;
    const overlayWindowOptions = {
      x,
      y,
      width,
      height,
      show: false,
      transparent: true,
      frame: false,
      resizable: true,
      type: 'toolbar',
      alwaysOnTop: true,
      skipTaskbar: false,
      title: 'Discord Global Overlay',
      webPreferences: {
        preload: _path.default.join(__dirname, '..', '..', 'mainScreenPreload.js'),
        nodeIntegration: false,
        sandbox: false,
        contextIsolation: true
      }
    };
    overlayWindow = new _electron.BrowserWindow(overlayWindowOptions);
    overlayWindow.webContents.once('did-finish-load', () => {
      if (isValidWindow(overlayWindow) && shouldBeVisible) {
        overlayWindow.showInactive();
      }
    });
    inputWindow = new _electron.BrowserWindow({
      ...overlayWindowOptions,
      title: 'Discord Global Overlay Input'
    });
    const loadingState = new Promise((accept, reject) => {
      for (const {
        type,
        window
      } of getActiveWindowList()) {
        function failedHandler(eventName) {
          console.error(`openOverlay: "${type}" ${eventName}.`);
          closeOverlay();
          reject(new Error(`openOverlay failed in ${eventName}.`));
        }
        window.webContents.once('did-finish-load', () => accept());
        window.once('closed', () => failedHandler('closed'));
        window.webContents.once('did-fail-load', () => failedHandler('did-fail-load'));
        window.webContents.once('did-fail-provisional-load', () => failedHandler('did-fail-provisional-load'));
        window.webContents.once('render-process-gone', () => failedHandler('render-process-gone'));
        window.webContents.once('preload-error', () => failedHandler('preload-error'));
        window.on('minimize', () => {
          console.error(`openOverlay: "${type}" was minimized!.`);
        });
      }
    });
    let timeoutId = null;
    const timeoutState = new Promise((_accept, reject) => {
      timeoutId = setTimeout(() => {
        console.error(`openOverlay: Timeout reached.`);
        reject(new Error('Timeout reached'));
      }, OPEN_TIMEOUT);
    });
    console.log(`openOverlay: loading...`);
    const loadingPromise = Promise.all([overlayWindow.loadURL(url), inputWindow.loadURL(_path.default.join(__dirname, '..', '..', 'global_overlay', 'input.html'))]);
    await Promise.any([loadingState, loadingPromise, timeoutState]);
    console.log(`openOverlay: loaded.`);
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    setInteractionEnabled(isInteractionEnabled);
    overlayWindow.setAlwaysOnTop(true, 'screen-saver');
  } catch (e) {
    console.log(`openOverlay: Error "${e.text}"\n${e.stack}`);
    throw e;
  }
}
function closeOverlay() {
  const windows = getActiveWindowList();
  console.log(`closeOverlay: Closing ${windows.length} windows...`);
  for (const {
    type,
    window
  } of windows) {
    try {
      window.hide();
      window.close();
    } catch (e) {
      console.error(`closeOverlay: "${type}" Error "${e}"`);
    }
  }
  overlayWindow = null;
  inputWindow = null;
}
function setInteractionEnabled(enabled) {
  isInteractionEnabled = enabled;
  if (!isValidWindow(overlayWindow) || !isValidWindow(inputWindow) || !shouldBeVisible) {
    return;
  }
  overlayWindow.setIgnoreMouseEvents(!isInteractionEnabled, {
    forward: false
  });
  if (isInteractionEnabled) {
    inputWindow.setIgnoreMouseEvents(true);
    inputWindow.hide();
  } else {
    setClickZones(clickZones);
  }
}
function setClickZones(zones) {
  clickZones = zones;
  if (!isValidWindow(overlayWindow) || !isValidWindow(inputWindow) || !shouldBeVisible) {
    return;
  }
  if (!isInteractionEnabled && zones.length > 0) {
    inputWindow.setIgnoreMouseEvents(false);
    inputWindow.setShape(zones.map(zone => {
      const rect = {
        x: Math.ceil(zone.x),
        y: Math.ceil(zone.y),
        width: Math.ceil(zone.width),
        height: Math.ceil(zone.height)
      };
      return rect;
    }));
    inputWindow.showInactive();
    inputWindow.setAlwaysOnTop(true, 'screen-saver');
  } else {
    inputWindow.setIgnoreMouseEvents(true);
    inputWindow.hide();
  }
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN, (_, url) => {
  return openOverlay(url);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_CLOSE, () => {
  closeOverlay();
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_INTERACT_TOGGLE, (_, enabled) => {
  setInteractionEnabled(enabled);
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_SET_CLICK_ZONES, (_, zones) => {
  setClickZones(zones);
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_RELAY_INPUT_CLICK, (_, button, x, y) => {
  if (button !== 0) {
    return Promise.resolve();
  }
  if (!isValidWindow(overlayWindow)) {
    return Promise.resolve();
  }
  for (const zone of clickZones) {
    if (x >= zone.x && x <= zone.x + zone.width && y >= zone.y && y <= zone.y + zone.height) {
      var _overlayWindow;
      (_overlayWindow = overlayWindow) === null || _overlayWindow === void 0 ? void 0 : _overlayWindow.webContents.send(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_CLICK_ZONE_CLICKED, zone.name, x, y);
    }
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_SET_VISIBILITY, (_, visible) => {
  if (visible !== shouldBeVisible) {
    shouldBeVisible = visible;
    if (isValidWindow(overlayWindow)) {
      if (shouldBeVisible) {
        overlayWindow.showInactive();
      } else {
        overlayWindow.hide();
      }
    }
    if (isValidWindow(inputWindow) && !shouldBeVisible) {
      inputWindow.hide();
    }
    setInteractionEnabled(isInteractionEnabled);
  }
  return Promise.resolve();
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_GET_WINDOW_HANDLES, () => {
  const windowHandles = [];
  if (isValidWindow(overlayWindow)) {
    windowHandles.push(overlayWindow.getNativeWindowHandle().readInt32LE().toString(10));
  }
  if (isValidWindow(inputWindow)) {
    windowHandles.push(inputWindow.getNativeWindowHandle().readInt32LE().toString(10));
  }
  return Promise.resolve(windowHandles);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN_DEV_CONSOLE, (_, modifier) => {
  if (modifier === 1) {
    if (isValidWindow(inputWindow)) {
      inputWindow.webContents.openDevTools({
        mode: 'detach'
      });
    }
  } else {
    if (isValidWindow(overlayWindow)) {
      overlayWindow.webContents.openDevTools({
        mode: 'detach'
      });
    }
  }
  return Promise.resolve();
});