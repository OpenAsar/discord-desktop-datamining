"use strict";
const electron_1 = require("electron");
const menu = [
    {
        label: 'Discord',
        submenu: [
            {
                label: 'Quit',
                click: () => electron_1.app.quit(),
                accelerator: 'Command+Q',
            },
        ],
    },
];
module.exports = menu;
