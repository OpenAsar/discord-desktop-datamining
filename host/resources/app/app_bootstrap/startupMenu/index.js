"use strict";
const electron_1 = require("electron");
const menu = require('./' + process.platform);
module.exports = electron_1.Menu.buildFromTemplate(menu);
