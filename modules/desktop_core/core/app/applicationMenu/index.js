"use strict";
const electron_1 = require("electron");
const createMenu = require('./' + process.platform);
const buildMenu = (enableDevtools) => {
    return electron_1.Menu.buildFromTemplate(createMenu(enableDevtools));
};
module.exports = buildMenu;
