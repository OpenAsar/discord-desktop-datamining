"use strict";
const electron_1 = require("electron");
const menu = [
    {
        label: '&File',
        submenu: [
            {
                label: '&Exit',
                click: () => electron_1.app.quit(),
                accelerator: 'Alt+F4',
            },
        ],
    },
];
module.exports = menu;
