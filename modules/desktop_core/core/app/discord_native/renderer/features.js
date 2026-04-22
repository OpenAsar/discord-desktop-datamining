"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordIPC_1 = require("../common/DiscordIPC");
const supportedFeatures = new Set(DiscordIPC_1.DiscordIPC.renderer.sendSync(DiscordIPC_1.IPCEvents.FEATURES_GET_BROWSER_FEATURES));
function supports(feature) {
    return supportedFeatures.has(feature);
}
function declareSupported(feature) {
    supportedFeatures.add(feature);
}
module.exports = {
    supports,
    declareSupported,
};
