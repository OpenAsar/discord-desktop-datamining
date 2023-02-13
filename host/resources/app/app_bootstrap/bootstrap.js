"use strict";

// bootstrap, or what runs before the rest of desktop does
// responsible for handling updates and updating modules before continuing startup
if (process.platform === 'linux') {
  // Some people are reporting audio problems on Linux that are fixed by setting
  // an environment variable PULSE_LATENCY_MSEC=30 -- the "real" fix is to see
  // what conditions require this and set this then (also to set it directly in
  // our webrtc setup code rather than here) but this should fix the bug for now.
  if (process.env.PULSE_LATENCY_MSEC === undefined) {
    process.env.PULSE_LATENCY_MSEC = 30;
  }
}

const {
  app,
  Menu
} = require('electron');

const sentry = require('@sentry/node');

const buildInfo = require('./buildInfo');

app.setVersion(buildInfo.version); // expose releaseChannel to a global, since it's used by splash screen

global.releaseChannel = buildInfo.releaseChannel;

const errorHandler = require('./errorHandler');

errorHandler.init();

const crashReporterSetup = require('../common/crashReporterSetup');

crashReporterSetup.init(buildInfo, sentry);

const paths = require('../common/paths');

paths.init(buildInfo);
global.moduleDataPath = paths.getModuleDataPath();

const appSettings = require('./appSettings');

appSettings.init();

const Constants = require('./Constants');

const GPUSettings = require('./GPUSettings');

function setupHardwareAcceleration() {
  const settings = appSettings.getSettings(); // TODO: this is a copy of gpuSettings.getEnableHardwareAcceleration

  if (!settings.get('enableHardwareAcceleration', true)) {
    app.disableHardwareAcceleration();
  }
}

setupHardwareAcceleration(); // [adill] work around chrome 66 disabling autoplay by default

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required'); // WinRetrieveSuggestionsOnlyOnDemand: Work around electron 13 bug w/ async spellchecking on Windows.
// HardwareMediaKeyHandling,MediaSessionService: Prevent Discord from registering as a media service.

app.commandLine.appendSwitch('disable-features', 'WinRetrieveSuggestionsOnlyOnDemand,HardwareMediaKeyHandling,MediaSessionService');

function hasArgvFlag(flag) {
  return (process.argv || []).slice(1).includes(flag);
}

console.log(`${Constants.APP_NAME} ${app.getVersion()}`);
let pendingAppQuit = false;

if (process.platform === 'win32') {
  // this tells Windows (in particular Windows 10) which icon to associate your app with, important for correctly
  // pinning app to task bar.
  app.setAppUserModelId(Constants.APP_ID);

  const {
    handleStartupEvent
  } = require('./squirrelUpdate'); // TODO: Isn't using argv[1] fragile?


  const squirrelCommand = process.argv[1]; // TODO: Is protocol case sensitive?

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

let coreModule;
const isFirstInstance = app.requestSingleInstanceLock();
const allowMultipleInstances = hasArgvFlag('--multi-instance');

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
  app.on('second-instance', (_event, args, _workingDirectory) => {
    if (args != null && args.indexOf('--squirrel-uninstall') > -1) {
      app.quit();
      return;
    }

    const url = extractUrlFromArgs(args);

    if (coreModule) {
      // url can be null, as a user opening the executable again will focus the app from background
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
  // on macos protocol links are handled entirely through this event
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
  if (app.isReady()) {
    startApp();
  } else {
    app.once('ready', startApp);
  }
}