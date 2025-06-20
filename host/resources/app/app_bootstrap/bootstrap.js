"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
if (process.platform === 'linux') {
  if (process.env.PULSE_LATENCY_MSEC === undefined) {
    process.env.PULSE_LATENCY_MSEC = '30';
  }
}
const analytics = require('../common/analytics');
analytics.getDesktopTTI().trackMainAppTimeToInit();
const {
  app,
  session,
  Menu
} = require('electron');
const url = require('url');
const buildInfo = require('./buildInfo');
const sentry = require('@sentry/electron');
const logger = require('./logger');
app.setVersion(buildInfo.version);
global.releaseChannel = buildInfo.releaseChannel;
const errorHandler = require('./errorHandler');
errorHandler.init();
const paths = require('../common/paths');
paths.init(buildInfo);
const blackbox = require('../common/blackbox');
blackbox.initialize(paths.getModuleDataPath(), buildInfo);
const crashReporterSetup = require('../common/crashReporterSetup');
const browser = require('@sentry/browser');
const {
  makeElectronOfflineTransport
} = require('@sentry/electron/main');
const sentryConfig = {
  sentry,
  getTransport: dsnFunc => browser.makeMultiplexedTransport(makeElectronOfflineTransport, dsnFunc)
};
crashReporterSetup.init(buildInfo, sentryConfig);
global.moduleDataPath = paths.getModuleDataPath();
global.logPath = paths.getLogPath();
global.assetCachePath = paths.getAssetCachePath();
const appSettings = require('./appSettings');
appSettings.init();
const Constants = require('./Constants');
const GPUSettings = require('./GPUSettings');
function setupHardwareAcceleration() {
  const settings = appSettings.getSettings();
  if (!(settings === null || settings === void 0 ? void 0 : settings.get('enableHardwareAcceleration', true))) {
    app.disableHardwareAcceleration();
  }
}
setupHardwareAcceleration();
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
const disabledFeatures = ['WinRetrieveSuggestionsOnlyOnDemand', 'HardwareMediaKeyHandling', 'MediaSessionService', 'UseEcoQoSForBackgroundProcess', 'IntensiveWakeUpThrottling', 'AllowAggressiveThrottlingWithWebSocket'];
if (process.platform === 'darwin' && parseInt(require('os').release().split('.')[0]) < 24) {
  disabledFeatures.push('ScreenCaptureKitMac');
  disabledFeatures.push('ScreenCaptureKitMacWindow');
  disabledFeatures.push('ScreenCaptureKitMacScreen');
  disabledFeatures.push('ScreenCaptureKitPickerScreen');
  disabledFeatures.push('ScreenCaptureKitStreamPickerSonoma');
  disabledFeatures.push('WarmScreenCaptureSonoma');
  disabledFeatures.push('UseSCContentSharingPicker');
}
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('disable-background-timer-throttling');
  app.commandLine.appendSwitch('disable-renderer-backgrounding');
}
app.commandLine.appendSwitch('disable-features', disabledFeatures.join(','));
function setupSettingsFlags() {
  const settings = appSettings.getSettings();
  const validSwitches = {
    disable_accelerated_h264_decode: 1,
    disable_accelerated_h264_encode: 1,
    disable_accelerated_hevc_decode: 1,
    disable_d3d11: 1,
    disable_d3d11_video_decoder: 1,
    disable_decode_swap_chain: 1,
    disable_dxgi_zero_copy_video: 1,
    disable_dynamic_video_encode_framerate_update: 1,
    disable_media_foundation_clear_playback: 1,
    disable_media_foundation_frame_size_change: 1,
    disable_metal: 1,
    disable_nv12_dxgi_video: 1,
    force_high_performance_gpu: 1,
    force_low_power_gpu: 1
  };
  const rawSwitches = settings === null || settings === void 0 ? void 0 : settings.get('chromiumSwitches', []);
  let switches = [];
  if (Array.isArray(rawSwitches)) {
    switches = rawSwitches;
  } else if (typeof rawSwitches === 'object' && rawSwitches !== null) {
    switches = Object.keys(rawSwitches);
  }
  for (const s of switches) {
    if (validSwitches[s] !== 0) {
      app.commandLine.appendSwitch(s, s);
    }
  }
}
setupSettingsFlags();
function NVIDIA(dev) {
  return [0x10de, dev];
}
const workarounds = [{
  gpus: [NVIDIA(0x1340), NVIDIA(0x1341), NVIDIA(0x1344), NVIDIA(0x1346), NVIDIA(0x1347), NVIDIA(0x1348), NVIDIA(0x1349), NVIDIA(0x134b), NVIDIA(0x134d), NVIDIA(0x134e), NVIDIA(0x134f), NVIDIA(0x137a), NVIDIA(0x137b), NVIDIA(0x1380), NVIDIA(0x1381), NVIDIA(0x1382), NVIDIA(0x1390), NVIDIA(0x1391), NVIDIA(0x1392), NVIDIA(0x1393), NVIDIA(0x1398), NVIDIA(0x1399), NVIDIA(0x139a), NVIDIA(0x139b), NVIDIA(0x139c), NVIDIA(0x139d), NVIDIA(0x13b0), NVIDIA(0x13b1), NVIDIA(0x13b2), NVIDIA(0x13b3), NVIDIA(0x13b4), NVIDIA(0x13b6), NVIDIA(0x13b9), NVIDIA(0x13ba), NVIDIA(0x13bb), NVIDIA(0x13bc), NVIDIA(0x13c0), NVIDIA(0x13c2), NVIDIA(0x13d7), NVIDIA(0x13d8), NVIDIA(0x13d9), NVIDIA(0x13da), NVIDIA(0x13f0), NVIDIA(0x13f1), NVIDIA(0x13f2), NVIDIA(0x13f3), NVIDIA(0x13f8), NVIDIA(0x13f9), NVIDIA(0x13fa), NVIDIA(0x13fb), NVIDIA(0x1401), NVIDIA(0x1406), NVIDIA(0x1407), NVIDIA(0x1427), NVIDIA(0x1617), NVIDIA(0x1618), NVIDIA(0x1619), NVIDIA(0x161a), NVIDIA(0x1667), NVIDIA(0x174d), NVIDIA(0x174e), NVIDIA(0x179c), NVIDIA(0x17c2), NVIDIA(0x17c8), NVIDIA(0x17f0), NVIDIA(0x17f1), NVIDIA(0x17fd)],
  switches: ['disable_accelerated_hevc_decode'],
  predicate: () => process.platform === 'win32'
}];
async function setGPUFlags() {
  const info = await app.getGPUInfo('basic');
  for (const gpu of info.gpuDevice) {
    for (const workaround of workarounds) {
      if (workaround.predicate()) {
        for (const g of workaround.gpus) {
          if (g[0] === gpu.vendorId && g[1] === gpu.deviceId) {
            for (const s of workaround.switches) {
              app.commandLine.appendSwitch(s, '1');
            }
          }
        }
      }
    }
  }
}
function hasArgvFlag(flag) {
  return process.argv.slice(1).includes(flag);
}
console.log(`${Constants.APP_NAME} ${app.getVersion()}`);
let pendingAppQuit = false;
if (process.platform === 'win32') {
  if (hasArgvFlag('--localdev')) {
    app.setAppUserModelId(process.execPath);
  } else {
    app.setAppUserModelId(Constants.APP_ID);
  }
  const {
    handleStartupEvent
  } = require('./squirrelUpdate');
  const squirrelCommand = process.argv[1];
  if (handleStartupEvent(Constants.APP_PROTOCOL, app, squirrelCommand)) {
    pendingAppQuit = true;
  }
}
const appUpdater = require('./appUpdater');
const autoStart = require('./autoStart');
const discordProtocols = require('./protocols');
const moduleUpdater = require('../common/moduleUpdater');
const requireNative = require('./requireNative');
const splashScreen = require('./splashScreen');
const updater = require('../common/updater');
let coreModule;
const allowMultipleInstances = hasArgvFlag('--multi-instance');
const isFirstInstance = allowMultipleInstances ? true : app.requestSingleInstanceLock();
const exitImmediately = hasArgvFlag('--exit-immediately');
if (exitImmediately) {
  console.log('--exit-immediately flag found.  Exiting immediately.');
  app.exit(0);
}
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
app.on('ready', () => {
  let trackedNetErrQuicProtocol = false;
  session.defaultSession.webRequest.onErrorOccurred(details => {
    if (!trackedNetErrQuicProtocol && details.error.includes('net::ERR_QUIC_PROTOCOL_ERROR')) {
      trackedNetErrQuicProtocol = true;
      console.error(`WebRequest failed (${details.error}): '${details.method} ${details.url}'`);
      const sentry = crashReporterSetup.getGlobalSentry();
      if (sentry != null) {
        sentry.captureMessage(`WebRequest failed: ${details.error}`, 'error');
      }
    }
  });
});
app.on('will-finish-launching', () => {
  app.on('open-url', (event, url) => {
    event.preventDefault();
    if (coreModule) {
      coreModule.handleOpenUrl(url);
    } else {
      initialUrl = url;
    }
  });
  app.on('continue-activity', (event, type, userInfo, details) => {
    if (type === 'com.apple.corespotlightitem') {
      event.preventDefault();
      const url = 'discord:' + userInfo.kCSSearchableItemActivityIdentifier;
      if (coreModule) {
        coreModule.handleOpenUrl(url);
      } else {
        initialUrl = url;
      }
    } else if (type === 'com.discord.view-channel') {
      event.preventDefault();
      const u = 'discord:' + url.parse(details.webpageURL).path;
      if (coreModule) {
        coreModule.handleOpenUrl(u);
      } else {
        initialUrl = u;
      }
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
        Constants,
        GPUSettings,
        analytics,
        appSettings,
        autoStart,
        buildInfo,
        crashReporterSetup,
        logger,
        moduleUpdater,
        paths,
        splashScreen,
        updater
      });
      if (initialUrl != null) {
        coreModule.handleOpenUrl(initialUrl);
        initialUrl = null;
      }
    } catch (err) {
      errorHandler.fatal(err);
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
  setGPUFlags().then(app.whenReady).then(() => startApp()).catch(error => {
    console.error('Error bootstrapping: ', error);
  });
}