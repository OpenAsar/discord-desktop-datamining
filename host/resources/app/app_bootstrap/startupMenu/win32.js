"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
var _default = exports.default = [{
  label: '&File',
  submenu: [{
    label: '&Exit',
    click: () => _electron.app.quit(),
    accelerator: 'Alt+F4'
  }]
}];
module.exports = exports.default;