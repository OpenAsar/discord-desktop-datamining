"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const constants_1 = require("./discord_native/common/constants");
exports.default = {
    on: (event, callback) => electron_1.ipcMain.on((0, constants_1.getDiscordIPCEvent)(event), callback),
    removeListener: (event, callback) => electron_1.ipcMain.removeListener((0, constants_1.getDiscordIPCEvent)(event), callback),
    reply: (event, channel, ...args) => event.sender.send((0, constants_1.getDiscordIPCEvent)(channel), ...args),
    handle: (event, callback) => electron_1.ipcMain.handle((0, constants_1.getDiscordIPCEvent)(event), callback),
};
