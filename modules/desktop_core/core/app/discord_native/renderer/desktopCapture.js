"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordIPC_1 = require("../common/DiscordIPC");
function getDesktopCaptureSources(options) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, options);
}
module.exports = {
    getDesktopCaptureSources,
};
