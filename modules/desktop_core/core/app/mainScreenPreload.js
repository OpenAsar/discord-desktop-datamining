"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
if (!process.isMainFrame) {
  throw new Error('Preload scripts should not be running in a subframe');
}
let uncaughtExceptionHandler;
function setUncaughtExceptionHandler(handler) {
  uncaughtExceptionHandler = handler;
}
if (window.opener === null) {
  const {
    contextBridge,
    discord
  } = require('electron');
  discord === null || discord === void 0 ? void 0 : discord.install('createDiscordStream');
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
    globalOverlay: require('./discord_native/renderer/globalOverlay'),
    hardware: require('./discord_native/renderer/hardware'),
    riotGames: require('./discord_native/renderer/riotGames'),
    remoteApp: app,
    remotePowerMonitor: powerMonitor,
    webAuthn: require('./discord_native/renderer/webauthn')
  };
  const crashReporterSetup = require('../common/crashReporterSetup');
  const sentry = require('@sentry/electron');
  const browser = require('@sentry/browser');
  if (crashReporterSetup && !crashReporterSetup.isInitialized()) {
    const buildInfo = {
      releaseChannel: app.getReleaseChannel(),
      version: app.getVersion()
    };
    crashReporterSetup.init(buildInfo, {
      sentry,
      getTransport: dsnFunc => {
        return browser.makeMultiplexedTransport(browser.makeFetchTransport, dsnFunc);
      }
    });
  }
  contextBridge.exposeInMainWorld('DiscordNative', DiscordNative);
  process.once('loaded', () => {
    global.DiscordNative = DiscordNative;
  });
  process.on('uncaughtException', (err, origin) => {
    var _uncaughtExceptionHan;
    (_uncaughtExceptionHan = uncaughtExceptionHandler) === null || _uncaughtExceptionHan === void 0 ? void 0 : _uncaughtExceptionHan(err, origin);
  });
  window.popouts = new Map();
} else {
  window.addEventListener('load', () => {
    window.opener.popouts.set(window.name, window);
  });
  window.addEventListener('beforeunload', () => {
    window.opener.popouts.delete(window.name);
  });
}