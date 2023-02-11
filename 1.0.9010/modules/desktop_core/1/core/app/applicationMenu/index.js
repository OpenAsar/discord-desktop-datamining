"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _electron = require("electron");

const createMenu = require('./' + process.platform);

var _default = enableDevtools => _electron.Menu.buildFromTemplate(createMenu(enableDevtools));

exports.default = _default;
module.exports = exports.default;