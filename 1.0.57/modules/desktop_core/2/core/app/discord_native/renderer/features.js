"use strict";

var _DiscordIPC = require("../common/DiscordIPC");
const supportedFeatures = new Set(_DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.FEATURES_GET_BROWSER_FEATURES));
function supports(feature) {
  return supportedFeatures.has(feature);
}
function declareSupported(feature) {
  supportedFeatures.add(feature);
}
module.exports = {
  supports,
  declareSupported
};