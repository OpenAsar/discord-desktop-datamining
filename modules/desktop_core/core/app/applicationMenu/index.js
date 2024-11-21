"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
const createMenu = require('./' + process.platform);
const buildMenu = enableDevtools => {
  return _electron.Menu.buildFromTemplate(createMenu(enableDevtools));
};
var _default = buildMenu;
exports.default = _default;
module.exports = exports.default;