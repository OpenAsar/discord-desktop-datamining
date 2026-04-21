"use strict";
const electron_1 = require("electron");
const Constants_1 = require("../Constants");
const SEPARATOR = { type: 'separator' };
const buildMenu = (enableDevtools) => [
    {
        label: 'File',
        submenu: [
            {
                label: 'Options',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_SETTINGS),
                accelerator: 'Control+,',
            },
            SEPARATOR,
            {
                label: 'Exit',
                click: () => electron_1.app.quit(),
                accelerator: 'Control+Q',
            },
        ],
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
                accelerator: 'Control+Z',
            },
            {
                role: 'redo',
                accelerator: 'Shift+Control+Z',
            },
            SEPARATOR,
            {
                role: 'cut',
                accelerator: 'Control+X',
            },
            {
                role: 'copy',
                accelerator: 'Control+C',
            },
            {
                role: 'paste',
                accelerator: 'Control+V',
            },
            {
                role: 'selectAll',
                accelerator: 'Control+A',
            },
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                click: () => electron_1.BrowserWindow.getFocusedWindow()?.webContents.reloadIgnoringCache(),
                accelerator: 'Control+R',
            },
            {
                label: 'Toggle Full Screen',
                click: () => {
                    const window = electron_1.BrowserWindow.getFocusedWindow();
                    if (window != null) {
                        window.setFullScreen(!window.isFullScreen());
                    }
                },
                accelerator: 'Control+Shift+F',
            },
            ...(enableDevtools
                ? [
                    SEPARATOR,
                    {
                        label: 'Developer',
                        submenu: [
                            {
                                label: 'Toggle Developer Tools',
                                click: () => electron_1.BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools(),
                                accelerator: 'Control+Shift+I',
                            },
                        ],
                    },
                ]
                : []),
        ],
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Check for Updates',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.CHECK_FOR_UPDATES),
            },
            SEPARATOR,
            {
                label: 'Discord Help',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_HELP),
            },
        ],
    },
];
module.exports = buildMenu;
