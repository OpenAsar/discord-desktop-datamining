"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisplayCount = getDisplayCount;
const DiscordIPC_1 = require("../common/DiscordIPC");
function getDisplayCount() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.HARDWARE_GET_DISPLAY_COUNT);
}
