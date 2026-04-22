"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectFeaturesBackend = injectFeaturesBackend;
const DiscordIPC_1 = require("../common/DiscordIPC");
let injectedFeatures = null;
function injectFeaturesBackend(features) {
    injectedFeatures = features;
}
DiscordIPC_1.DiscordIPC.main.on(DiscordIPC_1.IPCEvents.FEATURES_GET_BROWSER_FEATURES, (event) => {
    event.returnValue = injectedFeatures?.getSupported() ?? [];
});
