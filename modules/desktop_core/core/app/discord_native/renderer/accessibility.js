"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordIPC_1 = require("../common/DiscordIPC");
function isAccessibilitySupportEnabled() {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.ACCESSIBILITY_GET_ENABLED);
}
module.exports = {
    isAccessibilitySupportEnabled,
};
