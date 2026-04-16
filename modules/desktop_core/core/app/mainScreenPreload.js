"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!process.isMainFrame) {
    throw new Error('Preload scripts should not be running in a subframe');
}
let uncaughtExceptionHandler;
function setUncaughtExceptionHandler(handler) {
    uncaughtExceptionHandler = handler;
}
if (window.opener === null) {
    const { contextBridge, discord } = require('electron');
    discord?.install('createDiscordStream');
    const { ipcRenderer } = require('electron');
    const { IPCEvents } = require('./discord_native/common/constants');
    ipcRenderer.on(IPCEvents.APP_GET_MAIN_BUNDLE_STATS, () => {
        const PATTERN = /\/(?:assets\/)?web(?:\.\w+)?\.js$/;
        const resources = performance.getEntriesByType('resource');
        const entry = resources.find((e) => (e.initiatorType === 'script' || e.initiatorType === 'link') && PATTERN.test(e.name));
        if (entry == null) {
            ipcRenderer.send(IPCEvents.APP_MAIN_BUNDLE_STATS, {});
            return;
        }
        const stats = {
            main_window_webapp_bundle_name: entry.name.split('/').pop() ?? null,
            main_window_webapp_bundle_download_decompress_duration_ms: Math.round(entry.responseEnd - entry.responseStart),
            main_window_webapp_bundle_ttfb_ms: Math.round(entry.responseStart - entry.fetchStart),
            main_window_webapp_bundle_compressed_size_bytes: entry.encodedBodySize ?? null,
            main_window_webapp_bundle_uncompressed_size_bytes: entry.decodedBodySize ?? null,
            main_window_webapp_bundle_transfer_size_bytes: entry.transferSize ?? null,
            connection_rtt_ms: navigator.connection?.rtt ?? null,
            connection_downlink_kbps: navigator.connection?.downlink != null
                ? Math.round(navigator.connection.downlink * 1000)
                : null,
        };
        if (discord?.getScriptCompilationTimings != null) {
            const timings = discord.getScriptCompilationTimings();
            const timing = timings.find((t) => PATTERN.test(t.url));
            if (timing != null) {
                stats.main_window_webapp_bundle_compile_foreground_duration_us = timing.foregroundTimeUs;
                stats.main_window_webapp_bundle_compile_background_duration_us = timing.backgroundTimeUs;
                stats.main_window_webapp_bundle_compile_streamed = timing.streamed;
            }
        }
        stats.main_window_navigation_origin_ms = Math.round(performance.timeOrigin);
        const [fp] = performance.getEntriesByName('first-paint');
        const [fcp] = performance.getEntriesByName('first-contentful-paint');
        stats.main_window_first_paint_time_ms = fp != null ? Math.round(fp.startTime) : null;
        stats.main_window_first_contentful_paint_time_ms = fcp != null ? Math.round(fcp.startTime) : null;
        discord?.stopScriptCompilationTimings?.();
        ipcRenderer.send(IPCEvents.APP_MAIN_BUNDLE_STATS, stats);
    });
    const app = require('./discord_native/renderer/app');
    const powerMonitor = require('./discord_native/renderer/powerMonitor');
    const DiscordNative = {
        isRenderer: process.type === 'renderer',
        setUncaughtExceptionHandler,
        nativeModules: require('./discord_native/renderer/nativeModules'),
        process: require('./discord_native/renderer/process'),
        os: require('./discord_native/renderer/os'),
        app,
        clipboard: require('./discord_native/renderer/clipboard'),
        ipc: require('./discord_native/renderer/ipc'),
        gpuSettings: require('./discord_native/renderer/gpuSettings'),
        window: require('./discord_native/renderer/window'),
        powerMonitor,
        spellCheck: require('./discord_native/renderer/spellCheck'),
        crashReporter: require('./discord_native/renderer/crashReporter'),
        desktopCapture: require('./discord_native/renderer/desktopCapture'),
        fileManager: require('./discord_native/renderer/fileManager'),
        clips: require('./discord_native/renderer/clips'),
        processUtils: require('./discord_native/renderer/processUtils'),
        powerSaveBlocker: require('./discord_native/renderer/powerSaveBlocker'),
        http: require('./discord_native/renderer/http'),
        accessibility: require('./discord_native/renderer/accessibility'),
        features: require('./discord_native/renderer/features'),
        settings: require('./discord_native/renderer/settings'),
        userDataCache: require('./discord_native/renderer/userDataCache'),
        thumbar: require('./discord_native/renderer/thumbar'),
        safeStorage: require('./discord_native/renderer/safeStorage'),
        hardware: require('./discord_native/renderer/hardware'),
        riotGames: require('./discord_native/renderer/riotGames'),
        webAuthn: require('./discord_native/renderer/webauthn'),
    };
    const crashReporterSetup = require('../common/crashReporterSetup');
    const sentry = require('@sentry/electron/renderer');
    const browser = require('@sentry/browser');
    if (crashReporterSetup && !crashReporterSetup.isInitialized()) {
        const buildInfo = {
            releaseChannel: app.getReleaseChannel(),
            version: app.getVersion(),
        };
        const sentryConfig = {
            sentry,
            getTransport: (dsnFunc) => {
                return browser.makeMultiplexedTransport(browser.makeFetchTransport, dsnFunc);
            },
        };
        crashReporterSetup.init(buildInfo, sentryConfig);
    }
    contextBridge.exposeInMainWorld('DiscordNative', DiscordNative);
    process.once('loaded', () => {
        global.DiscordNative = DiscordNative;
    });
    process.on('uncaughtException', (err, origin) => {
        uncaughtExceptionHandler?.(err, origin);
    });
    window.popouts = new Map();
}
else {
    window.addEventListener('load', (_) => {
        window.opener.popouts.set(window.name, window);
    });
    window.addEventListener('beforeunload', (_) => {
        window.opener.popouts.delete(window.name);
    });
}
