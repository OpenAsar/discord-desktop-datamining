"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _processUtils = require("../../../common/processUtils");
var _mainScreen = require("../../mainScreen");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let interactiveWindow = null;
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
  if (interactiveWindow != null) {
    console.log('GLOBAL_OVERLAY_OPEN: Window already open.');
    return Promise.resolve();
  }
  if (!isValidUrl(url)) {
    return Promise.resolve();
  }
  const windowOptions = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    transparent: true,
    title: 'Discord_Overlay3' + Math.round(Math.random() * 1e9).toString(16),
    frame: false,
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
      interactiveWindow = null;
      console.log('GLOBAL_OVERLAY_OPEN: closed');
    });
    interactiveWindow.loadURL(url + '#global_overlay');
  } catch (e) {
    console.log(`GLOBAL_OVERLAY_OPEN: Error "${e.text}"\n${e.stack}`);
  }
  return Promise.resolve();
});