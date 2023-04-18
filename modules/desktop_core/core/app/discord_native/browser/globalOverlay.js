"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _processUtils = require("../../../common/processUtils");
var _mainScreen = require("../../mainScreen");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-console */

let interactiveWindow = null;
// let transparentWindow: electron.BrowserWindow | null = null;

// We need to be restrictive about what url's are accepted.
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
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN, (_, url) => {
  if (!_processUtils.IS_WIN) {
    console.log('GLOBAL_OVERLAY_OPEN: Windows only.');
    return Promise.resolve();
  }

  // TODO: Check if the url has changed...?
  if (interactiveWindow != null) {
    console.log('GLOBAL_OVERLAY_OPEN: Window already open.');
    return Promise.resolve();
  }
  if (!isValidUrl(url)) {
    return Promise.resolve();
  }

  // The title is randomized to prevent multiple instances from having conflicting titles.
  // We may want a global lock on there being a single global overlay tho.
  // TODO: The titlebar is blanked out by the javascript code, which is fine'ish for now because the mixture
  // of window class and window title are unique for the time being.
  const windowOptions = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    transparent: true,
    title: 'Discord_Overlay3' + Math.round(Math.random() * 1e9).toString(16),
    // TODO: I'd really rather a guid.
    // TODO: For some reason, it does not workout if the window starts hidden. Perhaps it's not loading and the native
    // code isn't firing?
    // show: false, // It's shown when initialized by the native code.
    frame: false,
    focusable: false,
    // Sets WS_EX_NOACTIVATE, which keeps it out of the taskbar prior to our initialization running.
    webPreferences: {
      preload: _path.default.join(__dirname, '..', '..', 'mainScreenPreload.js'),
      nodeIntegration: false,
      sandbox: false,
      contextIsolation: true
    }
  };
  try {
    interactiveWindow = new _electron.default.BrowserWindow(windowOptions);
    interactiveWindow.once('closed', () => {
      // Untested code path.
      interactiveWindow = null;
      console.log('GLOBAL_OVERLAY_OPEN: closed');
    });

    // Enable when finally working on the non-interactive layer.
    // transparentWindow = new electron.BrowserWindow(windowOptions);

    interactiveWindow.loadURL(url + '#global_overlay');
  } catch (e) {
    console.log(`GLOBAL_OVERLAY_OPEN: Error "${e.text}"\n${e.stack}`);
  }
  return Promise.resolve();
});