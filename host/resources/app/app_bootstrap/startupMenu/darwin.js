"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
var _default = exports.default = [{
  label: 'Discord',
  submenu: [{
    label: 'Quit',
    click: () => _electron.app.quit(),
    accelerator: 'Command+Q'
  }]
}];
module.exports = exports.default;