"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscordIPCEvent = getDiscordIPCEvent;
const electron_1 = require("electron");
const discordPrefixRegex = /^DISCORD_/;
function getDiscordIPCEvent(ev) {
    return discordPrefixRegex.test(ev) ? ev : `DISCORD_${ev}`;
}
exports.default = {
    on: (event, callback) => {
        electron_1.ipcMain.on(getDiscordIPCEvent(event), callback);
    },
    removeListener: (event, callback) => {
        electron_1.ipcMain.removeListener(getDiscordIPCEvent(event), callback);
    },
    handle: (event, callback) => electron_1.ipcMain.handle(getDiscordIPCEvent(event), callback),
};
