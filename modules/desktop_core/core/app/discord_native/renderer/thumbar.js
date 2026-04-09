"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setThumbarButtons = setThumbarButtons;
var _constants = require("../common/constants");
var _ipc = require("./ipc");
function setThumbarButtons(buttons, isSystemDarkMode) {
  return (0, _ipc.send)(_constants.IPCEvents.THUMBAR_BUTTONS_UPDATE, buttons, isSystemDarkMode);
}