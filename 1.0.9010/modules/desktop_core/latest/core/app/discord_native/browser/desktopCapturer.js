"use strict";

var _electron = _interopRequireDefault(require("electron"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.default.ipcMain.handle('DESKTOP_CAPTURER_GET_SOURCES', (_, opts) => _electron.default.desktopCapturer.getSources(opts));