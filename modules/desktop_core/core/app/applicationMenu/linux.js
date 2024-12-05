"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
var _Constants = require("../Constants");
const SEPARATOR = {
  type: 'separator'
};
const buildMenu = enableDevtools => [{
  label: '&File',
  submenu: [{
    label: '&Options',
    click: () => _electron.app.emit(_Constants.MenuEvents.OPEN_SETTINGS),
    accelerator: 'Control+,'
  }, SEPARATOR, {
    label: '&Exit',
    click: () => _electron.app.quit(),
    accelerator: 'Control+Q'
  }]
}, {
  label: '&Edit',
  submenu: [{
    role: 'undo',
    accelerator: 'Control+Z'
  }, {
    role: 'redo',
    accelerator: 'Shift+Control+Z'
  }, SEPARATOR, {
    role: 'cut',
    accelerator: 'Control+X'
  }, {
    role: 'copy',
    accelerator: 'Control+C'
  }, {
    role: 'paste',
    accelerator: 'Control+V'
  }, {
    role: 'selectAll',
    accelerator: 'Control+A'
  }]
}, {
  label: '&View',
  submenu: [{
    label: '&Reload',
    click: () => {
      var _BrowserWindow$getFoc;
      return (_BrowserWindow$getFoc = _electron.BrowserWindow.getFocusedWindow()) === null || _BrowserWindow$getFoc === void 0 ? void 0 : _BrowserWindow$getFoc.webContents.reloadIgnoringCache();
    },
    accelerator: 'Control+R'
  }, {
    label: 'Toggle &Full Screen',
    click: () => {
      const window = _electron.BrowserWindow.getFocusedWindow();
      if (window != null) {
        window.setFullScreen(!window.isFullScreen());
      }
    },
    accelerator: 'Control+Shift+F'
  }, ...(enableDevtools ? [SEPARATOR, {
    label: '&Developer',
    submenu: [{
      label: 'Toggle Developer &Tools',
      click: () => {
        var _BrowserWindow$getFoc2;
        return (_BrowserWindow$getFoc2 = _electron.BrowserWindow.getFocusedWindow()) === null || _BrowserWindow$getFoc2 === void 0 ? void 0 : _BrowserWindow$getFoc2.webContents.toggleDevTools();
      },
      accelerator: 'Control+Shift+I'
    }]
  }] : [])]
}, {
  label: '&Help',
  submenu: [{
    label: 'Check for Updates',
    click: () => _electron.app.emit(_Constants.MenuEvents.CHECK_FOR_UPDATES)
  }, SEPARATOR, {
    label: 'Discord Help',
    click: () => _electron.app.emit(_Constants.MenuEvents.OPEN_HELP)
  }]
}];
var _default = buildMenu;
exports.default = _default;
module.exports = exports.default;