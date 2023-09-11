"use strict";

var _electron = require("electron");
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _processUtils = require("../../../common/processUtils");
var _mainScreen = require("../../mainScreen");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let overlayWindow = null;
let inputWindow = null;
let isInteractionEnabled = false;
let clickZones = [];
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
function resizeOverlayWindow(bounds) {
  if (isValidWindow(overlayWindow)) {
    var _overlayWindow;
    (_overlayWindow = overlayWindow) === null || _overlayWindow === void 0 ? void 0 : _overlayWindow.setBounds(bounds);
  }
  if (isValidWindow(inputWindow)) {
    var _inputWindow;
    (_inputWindow = inputWindow) === null || _inputWindow === void 0 ? void 0 : _inputWindow.setBounds(bounds);
  }
}
function handleDisplayAdded() {
  resizeOverlayWindow(_electron.screen.getPrimaryDisplay().bounds);
}
function handleDisplayRemoved() {
  resizeOverlayWindow(_electron.screen.getPrimaryDisplay().bounds);
}
function handleDisplayMetricsChanged(_event, display) {
  if (display.id === _electron.screen.getPrimaryDisplay().id) {
    resizeOverlayWindow(display.bounds);
  }
}
function openOverlay(url) {
  if (!_processUtils.IS_WIN) {
    console.log('GLOBAL_OVERLAY_OPEN: Windows only.');
    return;
  }
  if (isValidWindow(overlayWindow)) {
    console.log('GLOBAL_OVERLAY_OPEN: Window already open.');
    return;
  }
  if (!isValidUrl(url)) {
    return;
  }
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
      resizable: false,
      type: 'toolbar',
      alwaysOnTop: true,
      skipTaskbar: false,
      webPreferences: {
        preload: _path.default.join(__dirname, '..', '..', 'mainScreenPreload.js'),
        nodeIntegration: false,
        sandbox: false,
        contextIsolation: true
      }
    };
    overlayWindow = new _electron.BrowserWindow(overlayWindowOptions);
    overlayWindow.webContents.once('did-finish-load', () => {
      if (isValidWindow(overlayWindow)) {
        var _overlayWindow2;
        (_overlayWindow2 = overlayWindow) === null || _overlayWindow2 === void 0 ? void 0 : _overlayWindow2.show();
      }
    });
    overlayWindow.once('closed', () => {
      overlayWindow = null;
      closeOverlay();
    });
    const inputWindowOptions = {
      ...overlayWindowOptions
    };
    inputWindow = new _electron.BrowserWindow(inputWindowOptions);
    inputWindow.once('closed', () => {
      inputWindow = null;
      closeOverlay();
    });
    void inputWindow.loadURL(_path.default.join(__dirname, '..', '..', 'global_overlay', 'input.html'));
    setInteractionEnabled(isInteractionEnabled);
    overlayWindow.setAlwaysOnTop(true, 'screen-saver');
    void overlayWindow.loadURL(url);
  } catch (e) {
    console.log(`GLOBAL_OVERLAY_OPEN: Error "${e.text}"\n${e.stack}`);
  }
  _electron.screen.on('display-added', handleDisplayAdded);
  _electron.screen.on('display-removed', handleDisplayRemoved);
  _electron.screen.on('display-metrics-changed', handleDisplayMetricsChanged);
}
function closeOverlay() {
  _electron.screen.removeListener('display-added', handleDisplayAdded);
  _electron.screen.removeListener('display-removed', handleDisplayRemoved);
  _electron.screen.removeListener('display-metrics-changed', handleDisplayMetricsChanged);
  if (isValidWindow(inputWindow)) {
    var _inputWindow2, _inputWindow3;
    (_inputWindow2 = inputWindow) === null || _inputWindow2 === void 0 ? void 0 : _inputWindow2.hide();
    (_inputWindow3 = inputWindow) === null || _inputWindow3 === void 0 ? void 0 : _inputWindow3.close();
    inputWindow = null;
  } else {
    console.log('GLOBAL_OVERLAY_CLOSE: Input window not open.');
  }
  if (isValidWindow(overlayWindow)) {
    var _overlayWindow3, _overlayWindow4;
    (_overlayWindow3 = overlayWindow) === null || _overlayWindow3 === void 0 ? void 0 : _overlayWindow3.hide();
    (_overlayWindow4 = overlayWindow) === null || _overlayWindow4 === void 0 ? void 0 : _overlayWindow4.close();
    overlayWindow = null;
  } else {
    console.log('GLOBAL_OVERLAY_CLOSE: Overlay window not open.');
  }
}
function setInteractionEnabled(enabled) {
  isInteractionEnabled = enabled;
  if (overlayWindow == null || !isValidWindow(overlayWindow) || inputWindow == null || !isValidWindow(inputWindow)) {
    return;
  }
  overlayWindow.setIgnoreMouseEvents(!isInteractionEnabled, {
    forward: true
  });
  if (isInteractionEnabled) {
    overlayWindow.focus();
    inputWindow.setIgnoreMouseEvents(true);
    inputWindow.hide();
  } else {
    if (overlayWindow.isFocused()) {
      overlayWindow.blur();
    }
    setClickZones(clickZones);
  }
}
function setClickZones(zones) {
  if (!isValidWindow(overlayWindow) || inputWindow == null || !isValidWindow(inputWindow)) {
    return;
  }
  clickZones = zones;
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
    inputWindow.show();
    inputWindow.setAlwaysOnTop(true, 'screen-saver');
  } else {
    inputWindow.setIgnoreMouseEvents(true);
    inputWindow.hide();
  }
}
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_OPEN, (_, url) => {
  openOverlay(url);
  return Promise.resolve();
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
      var _overlayWindow5;
      (_overlayWindow5 = overlayWindow) === null || _overlayWindow5 === void 0 ? void 0 : _overlayWindow5.webContents.send(_DiscordIPC.IPCEvents.GLOBAL_OVERLAY_CLICK_ZONE_CLICKED, zone.name);
    }
  }
  return Promise.resolve();
});