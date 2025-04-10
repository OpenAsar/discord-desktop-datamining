"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
const menu = require('./' + process.platform);
var _default = _electron.Menu.buildFromTemplate(menu);
exports.default = _default;
module.exports = exports.default;