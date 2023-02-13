"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("../common/constants");
var _ipc = require("./ipc");
function setThumbarButtons(buttons, isSystemDarkMode) {
  return (0, _ipc.send)(_constants.IPCEvents.THUMBAR_BUTTONS_UPDATE, buttons, isSystemDarkMode);
}
var _default = {
  setThumbarButtons
};
exports.default = _default;
module.exports = exports.default;