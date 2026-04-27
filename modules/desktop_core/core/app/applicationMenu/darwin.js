"use strict";
const electron_1 = require("electron");
const securityUtils_1 = require("../../common/securityUtils");
const Constants_1 = require("../Constants");
const { APP_NAME_FOR_HUMANS } = require('../Constants');
const SEPARATOR = { type: 'separator' };
const developerMenuSection = [
    SEPARATOR,
    {
        label: 'Developer',
        submenu: [
            {
                role: 'toggleDevTools',
            },
        ],
    },
];
const createMenu = (enableDevtools) => [
    {
        role: 'appMenu',
        submenu: [
            {
                label: `About ${APP_NAME_FOR_HUMANS}`,
                role: 'about',
            },
            {
                label: 'Check for Updates...',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.CHECK_FOR_UPDATES),
            },
            {
                label: 'Acknowledgements',
                click: () => (0, securityUtils_1.saferShellOpenExternal)('https://discord.com/acknowledgements'),
            },
            SEPARATOR,
            {
                label: 'Preferences',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_SETTINGS),
                accelerator: 'Command+,',
            },
            SEPARATOR,
            {
                role: 'services',
            },
            SEPARATOR,
            {
                label: `Hide ${APP_NAME_FOR_HUMANS}`,
                role: 'hide',
            },
            {
                role: 'hideOthers',
            },
            {
                role: 'unhide',
            },
            SEPARATOR,
            {
                label: `Quit ${APP_NAME_FOR_HUMANS}`,
                role: 'quit',
            },
        ],
    },
    {
        role: 'editMenu',
        submenu: [
            { role: 'undo', accelerator: 'Command+Z' },
            { role: 'redo', accelerator: 'Shift+Command+Z' },
            SEPARATOR,
            { role: 'cut', accelerator: 'Command+X' },
            { role: 'copy', accelerator: 'Command+C' },
            { role: 'paste', accelerator: 'Command+V' },
            { role: 'selectAll', accelerator: 'Command+A' },
        ],
    },
    {
        role: 'viewMenu',
        submenu: [
            {
                label: 'Reload',
                role: 'forceReload',
                accelerator: 'Command+R',
            },
            {
                role: 'togglefullscreen',
            },
            ...(enableDevtools ? developerMenuSection : []),
        ],
    },
    {
        role: 'windowMenu',
        submenu: [
            {
                role: 'minimize',
            },
            {
                role: 'close',
            },
        ],
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Discord Help',
                click: () => electron_1.app.emit(Constants_1.MenuEvents.OPEN_HELP),
            },
        ],
    },
];
module.exports = createMenu;
