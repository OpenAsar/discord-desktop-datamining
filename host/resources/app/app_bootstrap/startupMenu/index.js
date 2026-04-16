"use strict";

var _electron = require("electron");
const menu = require('./' + process.platform);
module.exports = _electron.Menu.buildFromTemplate(menu);