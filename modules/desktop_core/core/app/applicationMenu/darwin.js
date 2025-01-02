"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
var _securityUtils = require("../../common/securityUtils");
var _Constants = require("../Constants");
const SEPARATOR = {
  type: 'separator'
};
const developerMenuSection = [SEPARATOR, {
  label: 'Developer',
  submenu: [{
    role: 'toggleDevTools'
  }]
}];
var _default = enableDevtools => [{
  role: 'appMenu',
  submenu: [{
    role: 'about'
  }, {
    label: 'Check for Updates...',
    click: () => _electron.app.emit(_Constants.MenuEvents.CHECK_FOR_UPDATES)
  }, {
    label: 'Acknowledgements',
    click: () => (0, _securityUtils.saferShellOpenExternal)('https://discord.com/acknowledgements')
  }, SEPARATOR, {
    label: 'Preferences',
    click: () => _electron.app.emit(_Constants.MenuEvents.OPEN_SETTINGS),
    accelerator: 'Command+,'
  }, SEPARATOR, {
    role: 'services'
  }, SEPARATOR, {
    role: 'hide'
  }, {
    role: 'hideOthers'
  }, {
    role: 'unhide'
  }, SEPARATOR, {
    role: 'quit'
  }]
}, {
  role: 'editMenu',
  submenu: [{
    role: 'undo',
    accelerator: 'Command+Z'
  }, {
    role: 'redo',
    accelerator: 'Shift+Command+Z'
  }, SEPARATOR, {
    role: 'cut',
    accelerator: 'Command+X'
  }, {
    role: 'copy',
    accelerator: 'Command+C'
  }, {
    role: 'paste',
    accelerator: 'Command+V'
  }, {
    role: 'selectAll',
    accelerator: 'Command+A'
  }]
}, {
  role: 'viewMenu',
  submenu: [{
    label: 'Reload',
    role: 'forceReload',
    accelerator: 'Command+R'
  }, {
    role: 'togglefullscreen'
  }, ...(enableDevtools ? developerMenuSection : [])]
}, {
  role: 'windowMenu',
  submenu: [{
    role: 'minimize'
  }, {
    role: 'close'
  }]
}, {
  role: 'help',
  submenu: [{
    label: 'Discord Help',
    click: () => _electron.app.emit(_Constants.MenuEvents.OPEN_HELP)
  }]
}];
exports.default = _default;
module.exports = exports.default;