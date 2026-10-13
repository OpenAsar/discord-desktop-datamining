"use strict";
const Overlay = require('./discord_overlay2.node');
const discordNative = globalThis.window?.DiscordNative;
const useLegacyOverlayWorker = process.argv.includes('--legacy-overlay-worker')
    || discordNative?.settings?.getSync?.('DESKTOP_TTI_LEGACY_OVERLAY_WORKER', false) === true;
Overlay._initializeSystemAnalytics?.(useLegacyOverlayWorker);
if (Overlay._setEventHandler == null && Overlay._setEventHandlerJson != null) {
    Overlay._setEventHandler = (handler) => {
        function wrappedHandler(pid, eventJson) {
            const event = JSON.parse(eventJson);
            handler(pid, event);
        }
        Overlay._setEventHandlerJson(wrappedHandler);
    };
}
if (Overlay.sendCommand == null && Overlay.sendCommandJson != null) {
    Overlay.sendCommand = (pid, command) => {
        Overlay.sendCommandJson(pid, JSON.stringify(command));
    };
}
if (Overlay.broadcastCommand == null && Overlay.broadcastCommandJson != null) {
    Overlay.broadcastCommand = (command) => {
        Overlay.broadcastCommandJson(JSON.stringify(command));
    };
}
module.exports = Overlay;
