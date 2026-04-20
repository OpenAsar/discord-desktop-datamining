"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const overlay_module_1 = __importDefault(require("./overlay_module"));
const isOverlayContext = (typeof window !== 'undefined' && window != null && window.__OVERLAY__)
    || document.getElementById('__OVERLAY__SENTINEL__') != null
    || /overlay/.test(window.location.pathname);
const isElectronRenderer = typeof window !== 'undefined'
    && window != null
    && window.DiscordNative != null
    && Boolean(window.DiscordNative.isRenderer);
const features = isElectronRenderer ? window.DiscordNative.features : global.features;
let clickZoneCallback;
let interceptInput = false;
let imeExclusiveFullscreenCallback;
let perfInfoCallback;
features.declareSupported('create_host_on_attach');
function eventHandler(pid, event) {
    if (event.message === 'click_zone_event') {
        if (clickZoneCallback) {
            clickZoneCallback(event.name, event.x, event.y);
        }
    }
    else if (event.message === 'ime_exclusive_fullscreen') {
        if (imeExclusiveFullscreenCallback) {
            imeExclusiveFullscreenCallback();
        }
    }
    else if (event.message === 'perf_info') {
        if (perfInfoCallback) {
            perfInfoCallback(event.data);
        }
    }
}
overlay_module_1.default._setEventHandler(eventHandler);
if (isOverlayContext) {
    const { URL } = require('url');
    const url = new URL(window.location);
    const pid = parseInt(url.searchParams.get('pid'));
    overlay_module_1.default.connectProcess(pid);
    overlay_module_1.default.rendererStarted = () => {
        overlay_module_1.default.sendCommand(pid, { message: 'notify_renderer_started' });
    };
}
overlay_module_1.default.setClickZoneCallback = (callback) => {
    clickZoneCallback = callback;
};
overlay_module_1.default.setInputLocked = (locked) => {
    interceptInput = !locked;
    const payload = { message: 'intercept_input', intercept: interceptInput };
    overlay_module_1.default.broadcastCommand(payload);
};
overlay_module_1.default.setImeExclusiveFullscreenCallback = (callback) => {
    imeExclusiveFullscreenCallback = callback;
};
overlay_module_1.default.setPerfInfoCallback = (callback) => {
    perfInfoCallback = callback;
};
module.exports = overlay_module_1.default;
