"use strict";

var _electron = require("electron");
const createMenu = require('./' + process.platform);
const buildMenu = enableDevtools => {
  return _electron.Menu.buildFromTemplate(createMenu(enableDevtools));
};
module.exports = buildMenu;