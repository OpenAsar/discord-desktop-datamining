"use strict";

if (process.platform === 'linux') {
  if (process.env.PULSE_LATENCY_MSEC === undefined) {
    process.env.PULSE_LATENCY_MSEC = 30;
  }
}
const {
  app,
  Menu
} = require('electron');
const sentry = require('@sentry/electron');
const buildInfo = require('./buildInfo');
app.setVersion(buildInfo.version);
global.releaseChannel = buildInfo.releaseChannel;
const errorHandler = require('./errorHandler');
errorHandler.init();
const paths = require('../common/paths');
paths.init(buildInfo);
const blackbox = require('../common/blackbox');
blackbox.initialize(paths.getModuleDataPath(), buildInfo);
const crashReporterSetup = require('../common/crashReporterSetup');
crashReporterSetup.init(buildInfo, sentry);
global.moduleDataPath = paths.getModuleDataPath();
const appSettings = require('./appSettings');
appSettings.init();
const Constants = require('./Constants');
const GPUSettings = require('./GPUSettings');
function setupHardwareAcceleration() {
  const settings = appSettings.getSettings();
  if (!settings.get('enableHardwareAcceleration', true)) {
    app.disableHardwareAcceleration();
  }
}
setupHardwareAcceleration();
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('disable-features', 'WinRetrieveSuggestionsOnlyOnDemand,HardwareMediaKeyHandling,MediaSessionService');
function hasArgvFlag(flag) {
  return (process.argv || []).slice(1).includes(flag);
}
console.log(`${Constants.APP_NAME} ${app.getVersion()}`);
let pendingAppQuit = false;
if (process.platform === 'win32') {
  app.setAppUserModelId(Constants.APP_ID);
  const {
    handleStartupEvent
  } = require('./squirrelUpdate');
  const squirrelCommand = process.argv[1];
  if (handleStartupEvent(Constants.APP_PROTOCOL, app, squirrelCommand)) {
    pendingAppQuit = true;
  }
}
const appUpdater = require('./appUpdater');
const moduleUpdater = require('../common/moduleUpdater');
const updater = require('../common/updater');
const splashScreen = require('./splashScreen');
const autoStart = require('./autoStart');
const requireNative = require('./requireNative');
const discordProtocols = require('./protocols');
let coreModule;
const allowMultipleInstances = hasArgvFlag('--multi-instance');
const isFirstInstance = allowMultipleInstances ? true : app.requestSingleInstanceLock();
function extractUrlFromArgs(args) {
  const urlArgIndex = args.indexOf('--url');
  if (urlArgIndex < 0) {
    return null;
  }
  const passThroughArgsIndex = args.indexOf('--');
  if (passThroughArgsIndex < 0 || passThroughArgsIndex < urlArgIndex) {
    return null;
  }
  const url = args[passThroughArgsIndex + 1];
  if (url == null) {
    return null;
  }
  return url;
}
let initialUrl = extractUrlFromArgs(process.argv);
if (!allowMultipleInstances) {
  app.on('second-instance', (_event, args) => {
    if (args != null && args.indexOf('--squirrel-uninstall') > -1) {
      app.quit();
      return;
    }
    const url = extractUrlFromArgs(args);
    if (coreModule) {
      coreModule.handleOpenUrl(url);
    } else if (url != null) {
      initialUrl = url;
    }
    if (!coreModule) {
      appUpdater.focusSplash();
    }
  });
}
app.on('will-finish-launching', () => {
  app.on('open-url', (event, url) => {
    event.preventDefault();
    if (coreModule) {
      coreModule.handleOpenUrl(url);
    } else {
      initialUrl = url;
    }
  });
});
function startUpdate() {
  console.log('Starting updater.');
  const startMinimized = hasArgvFlag('--start-minimized');
  appUpdater.update(startMinimized, () => {
    try {
      coreModule = requireNative('discord_desktop_core');
      coreModule.startup({
        paths,
        splashScreen,
        moduleUpdater,
        autoStart,
        buildInfo,
        appSettings,
        Constants,
        GPUSettings,
        updater,
        crashReporterSetup
      });
      if (initialUrl != null) {
        coreModule.handleOpenUrl(initialUrl);
        initialUrl = null;
      }
    } catch (err) {
      return errorHandler.fatal(err);
    }
  }, () => {
    coreModule.setMainWindowVisible(!startMinimized);
  });
}
function startApp() {
  console.log('Starting app.');
  paths.cleanOldVersions(buildInfo);
  const startupMenu = require('./startupMenu');
  Menu.setApplicationMenu(startupMenu);
  startUpdate();
}
if (pendingAppQuit) {
  console.log('Startup prevented.');
} else if (!isFirstInstance && !allowMultipleInstances) {
  console.log('Quitting secondary instance.');
  app.quit();
} else {
  discordProtocols.beforeReadyProtocolRegistration();
  app.whenReady().then(() => startApp());
}