"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectFeaturesBackend = injectFeaturesBackend;
var _DiscordIPC = require("../common/DiscordIPC");
let injectedFeatures = null;
function injectFeaturesBackend(features) {
  injectedFeatures = features;
}
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.FEATURES_GET_BROWSER_FEATURES, event => {
  var _injectedFeatures;
  event.returnValue = ((_injectedFeatures = injectedFeatures) === null || _injectedFeatures === void 0 ? void 0 : _injectedFeatures.getSupported()) ?? [];
});