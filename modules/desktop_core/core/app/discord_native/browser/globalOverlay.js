"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindow = getWindow;
var _electron = require("electron");
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _processUtils = require("../../../common/processUtils");
var _mainScreen = require("../../mainScreen");
var _DiscordIPC = require("../common/DiscordIPC");
var _constants = require("../common/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OPEN_TIMEOUT = 5 * 60 * 1000;
let overlayWindow = null;
let overlayUrl = null;
function getWindow(key) {
  if (key === _constants.OVERLAY_WINDOW_KEY && isValidWindow(overlayWindow)) {
    return overlayWindow;
  }
  return null;
}
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
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN_WINDOW, async (_, url) => {
  if (!_processUtils.IS_WIN) {
    console.log('GLOBAL_OVERLAY_OPEN_WINDOW: Windows only.');
    return Promise.resolve();
  }
  if (!isValidUrl(url)) {
    return Promise.resolve();
  }
  if (isValidWindow(overlayWindow) && overlayUrl === url) {
    return Promise.resolve();
  }
  try {
    if (!isValidWindow(overlayWindow)) {
      console.log('openOverlay: creating window.');
      const rect = {
        x: 0,
        y: 0,
        width: 1280,
        height: 720
      };
      for (const {
        bounds
      } of _electron.screen.getAllDisplays()) {
        rect.x = Math.min(bounds.x, rect.x);
        rect.y = Math.min(bounds.y, rect.y);
      }
      const overlayWindowOptions = {
        x: rect.x - rect.width,
        y: rect.y - rect.height,
        width: rect.width,
        height: rect.height,
        show: false,
        transparent: true,
        frame: false,
        resizable: true,
        type: 'toolbar',
        alwaysOnTop: true,
        skipTaskbar: false,
        title: 'Discord Overlay',
        webPreferences: {
          preload: _path.default.join(__dirname, '..', '..', 'mainScreenPreload.js'),
          nodeIntegration: false,
          sandbox: false,
          contextIsolation: true
        }
      };
      overlayWindow = new _electron.BrowserWindow(overlayWindowOptions);
      overlayWindow.on('will-resize', event => {
        event.preventDefault();
      });
      overlayWindow.webContents.once('did-finish-load', () => {
        if (isValidWindow(overlayWindow)) {
          overlayWindow.showInactive();
        }
      });
      overlayWindow.webContents.setWindowOpenHandler(({
        url
      }) => {
        var _overlayWindow, _overlayWindow$webCon, _overlayWindow$webCon2;
        (_overlayWindow = overlayWindow) === null || _overlayWindow === void 0 ? void 0 : (_overlayWindow$webCon = _overlayWindow.webContents) === null || _overlayWindow$webCon === void 0 ? void 0 : (_overlayWindow$webCon2 = _overlayWindow$webCon.send) === null || _overlayWindow$webCon2 === void 0 ? void 0 : _overlayWindow$webCon2.call(_overlayWindow$webCon, _DiscordIPC.IPCEvents.REQUEST_OPEN_EXTERNAL_URL, url);
        return {
          action: 'deny'
        };
      });
    }
    const loadingState = new Promise((accept, reject) => {
      if (isValidWindow(overlayWindow)) {
        function failedHandler(eventName) {
          console.error(`openOverlay: ${eventName}.`);
          reject(new Error(`openOverlay failed in ${eventName}.`));
        }
        overlayWindow.webContents.once('did-finish-load', () => accept());
        overlayWindow.once('closed', () => failedHandler('closed'));
        overlayWindow.webContents.once('did-fail-load', () => failedHandler('did-fail-load'));
        overlayWindow.webContents.once('did-fail-provisional-load', () => failedHandler('did-fail-provisional-load'));
        overlayWindow.webContents.once('render-process-gone', () => failedHandler('render-process-gone'));
        overlayWindow.webContents.once('preload-error', () => failedHandler('preload-error'));
        overlayWindow.on('minimize', () => {
          console.error(`openOverlay: was minimized!.`);
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
    const loadingPromise = Promise.all([overlayWindow.loadURL(url)]);
    await Promise.any([loadingState, loadingPromise, timeoutState]);
    console.log(`openOverlay: loaded.`);
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
  } catch (e) {
    console.log(`openOverlay: Error "${e.text}"\n${e.stack}`);
    throw e;
  }
  overlayUrl = url;
  return Promise.resolve();
});