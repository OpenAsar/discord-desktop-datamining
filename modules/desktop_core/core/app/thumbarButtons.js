"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const electron_1 = require("electron");
const constants_1 = require("./discord_native/common/constants");
const ipcMain_1 = __importDefault(require("./ipcMain"));
const mainScreen_1 = require("./mainScreen");
const utils_1 = require("./utils");
let hasInit = false;
const ThumbarButtonName = {
    VIDEO: 'VIDEO',
    MUTE: 'MUTE',
    DEAFEN: 'DEAFEN',
    DISCONNECT: 'DISCONNECT',
};
function init() {
    if (hasInit)
        return;
    hasInit = true;
    ipcMain_1.default.on(constants_1.IPCEvents.THUMBAR_BUTTONS_UPDATE, (event, buttons, isSystemDarkMode) => {
        if (utils_1.isWindows) {
            setThumbarButtons(event, buttons, isSystemDarkMode);
        }
        else if (utils_1.isOSX) {
            setTouchbarButtons(event, buttons);
        }
        else {
            console.log(`thumbarButtons.init: Unknown operating system "${utils_1.platform}".`);
        }
    });
}
function getButtonIcon(name, active, isSystemDarkMode) {
    const root = ThumbarButtonName[name].toLowerCase();
    const postfix = active ? '' : '-off';
    const theme = isSystemDarkMode ? '' : '-light';
    return (0, utils_1.exposeModuleResource)(`app/images/thumbar/${utils_1.platform}`, `${root}${postfix}${theme}.png`);
}
function createButtons(event, buttons, isSystemDarkMode) {
    for (const button of buttons) {
        if (typeof button.name !== 'string') {
            console.error('setThumbarButtons: button.icon missing.');
            return [];
        }
        if (!(button.name in ThumbarButtonName)) {
            console.error(`setThumbarButtons: button.icon for unknown icon "${button.icon}.`);
            return [];
        }
        const buttonName = button.name;
        button.click = () => ipcMain_1.default.reply(event, 'THUMBAR_BUTTONS_CLICKED', { buttonName });
        button.icon = getButtonIcon(button.name, button.active ?? false, isSystemDarkMode);
    }
    return buttons;
}
function setTouchbarButtons(event, buttons) {
    buttons = createButtons(event, buttons, true);
    const touchbarButtons = buttons.map((button) => new electron_1.TouchBar.TouchBarButton({
        accessibilityLabel: button.tooltip,
        click: button.click,
        icon: button.icon,
        enabled: button.flags?.includes('disabled') ? false : true,
    }));
    const win = electron_1.BrowserWindow.fromId((0, mainScreen_1.getMainWindowId)());
    const touchbar = new electron_1.TouchBar({
        items: touchbarButtons.length === 0 ? [] : touchbarButtons,
    });
    win?.setTouchBar(touchbar);
}
function setThumbarButtons(event, buttons, isSystemDarkMode) {
    const thumbarButtons = createButtons(event, buttons, isSystemDarkMode);
    const win = electron_1.BrowserWindow.fromId((0, mainScreen_1.getMainWindowId)());
    if (!win?.setThumbarButtons(thumbarButtons)) {
        console.error('setThumbarButtons: setThumbarButtons failed', buttons);
    }
}
