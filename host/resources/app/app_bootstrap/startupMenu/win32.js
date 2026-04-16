"use strict";

var _electron = require("electron");
const menu = [{
  label: '&File',
  submenu: [{
    label: '&Exit',
    click: () => _electron.app.quit(),
    accelerator: 'Alt+F4'
  }]
}];
module.exports = menu;