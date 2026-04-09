"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
const menu = require('./' + process.platform);
var _default = exports.default = _electron.Menu.buildFromTemplate(menu);
module.exports = exports.default;