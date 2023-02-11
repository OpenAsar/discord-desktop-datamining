"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectFeaturesBackend = injectFeaturesBackend;
var _DiscordIPC = require("../common/DiscordIPC");
let injectedFeatures = null;
function getFeatures() {
  return injectedFeatures != null ? injectedFeatures : {
    getSupported: () => {
      return [];
    },
    supports: () => {
      return false;
    },
    declareSupported: () => {}
  };
}
function injectFeaturesBackend(features) {
  injectedFeatures = features;
}
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.FEATURES_GET_BROWSER_FEATURES, event => {
  event.returnValue = getFeatures().getSupported();
});