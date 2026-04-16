"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const DiscordIPC_1 = require("../common/DiscordIPC");
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.HARDWARE_GET_DISPLAY_COUNT, () => {
    return Promise.resolve(electron_1.screen.getAllDisplays().length);
});
