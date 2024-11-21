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
function getWindow() {
  let window = _electron.BrowserWindow.getFocusedWindow();
  if (window == null) {
    const windowList = _electron.BrowserWindow.getAllWindows();
    if (windowList != null && windowList.length > 0) {
      window = windowList[0];
      window.show();
      window.focus();
    }
  }
  return window;
}
var _default = enableDevtools => [{
  label: 'Discord',
  submenu: [{
    label: 'About Discord',
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
    label: 'Services',
    submenu: []
  }, SEPARATOR, {
    label: 'Hide Discord',
    role: 'hide',
    accelerator: 'Command+H'
  }, {
    label: 'Hide Others',
    role: 'hideOthers',
    accelerator: 'Command+Alt+H'
  }, {
    label: 'Show All',
    role: 'unhide'
  }, SEPARATOR, {
    label: 'Quit',
    click: () => _electron.app.quit(),
    accelerator: 'Command+Q'
  }]
}, {
  label: 'Edit',
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
  label: 'View',
  submenu: [{
    label: 'Reload',
    click: () => {
      const window = getWindow();
      if (window != null) {
        window.webContents.reloadIgnoringCache();
      }
    },
    accelerator: 'Command+R'
  }, {
    label: 'Toggle Full Screen',
    click: () => {
      const window = getWindow();
      if (window != null) {
        window.setFullScreen(!window.isFullScreen());
      }
    },
    accelerator: 'Command+Control+F'
  }, ...(enableDevtools ? [SEPARATOR, {
    label: 'Developer',
    submenu: [{
      label: 'Toggle Developer Tools',
      click: () => {
        const window = getWindow();
        if (window != null) {
          window.webContents.toggleDevTools();
        }
      },
      accelerator: 'Alt+Command+I'
    }]
  }] : [])]
}, {
  label: 'Window',
  submenu: [{
    label: 'Minimize',
    role: 'minimize',
    accelerator: 'Command+M'
  }, {
    label: 'Close',
    accelerator: 'Command+W',
    click: (_, window) => {
      if (window == null) {
        _electron.Menu.sendActionToFirstResponder('hide');
      } else {
        window.close();
      }
    }
  }]
}, {
  label: 'Help',
  submenu: [{
    label: 'Discord Help',
    click: () => _electron.app.emit(_Constants.MenuEvents.OPEN_HELP)
  }]
}];
exports.default = _default;
module.exports = exports.default;