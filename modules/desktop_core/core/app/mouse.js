"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
var _electron = require("electron");
var _constants = require("./discord_native/common/constants");
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let hasInit = false;
function init() {
  if (hasInit) {
    return;
  }
  _ipcMain.default.handle(_constants.IPCEvents.GET_MOUSE_COORDINATES, () => _electron.screen.getCursorScreenPoint());
  hasInit = true;
}