"use strict";

var _electron = require("electron");
const menu = [{
  label: 'Discord',
  submenu: [{
    label: 'Quit',
    click: () => _electron.app.quit(),
    accelerator: 'Command+Q'
  }]
}];
module.exports = menu;