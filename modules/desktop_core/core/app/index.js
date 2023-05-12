"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleOpenUrl = handleOpenUrl;
exports.setMainWindowVisible = setMainWindowVisible;
exports.startup = startup;
const {
  Menu,
  BrowserWindow
} = require('electron');
let mainScreen;
function startup(bootstrapModules) {
  require('./bootstrapModules/bootstrapModules').init(bootstrapModules);
  require('./bootstrapModules/paths');
  require('./bootstrapModules/splashScreen');
  const {
    moduleUpdater
  } = require('./bootstrapModules/moduleUpdater');
  const {
    updater
  } = require('./bootstrapModules/updater');
  require('./bootstrapModules/autoStart');
  const {
    buildInfo
  } = require('./bootstrapModules/buildInfo');
  const {
    appSettings
  } = require('./bootstrapModules/appSettings');
  const Constants = require('./Constants');
  Constants.init(bootstrapModules.Constants);
  const appFeatures = require('./appFeatures');
  appFeatures.init();
  const GPUSettings = require('./GPUSettings');
  bootstrapModules.GPUSettings.replace(GPUSettings);
  const rootCertificates = require('./rootCertificates');
  rootCertificates.init();
  require('./discord_native/browser/accessibility');
  const app = require('./discord_native/browser/app');
  app.injectBuildInfo(buildInfo);
  app.injectModuleUpdater(moduleUpdater);
  app.injectUpdater(updater);
  require('./discord_native/browser/clipboard');
  require('./discord_native/browser/constants');
  const {
    crashReporterSetup
  } = require('./bootstrapModules/crashReporterSetup');
  if (!crashReporterSetup.isInitialized()) {
    crashReporterSetup.init(buildInfo);
  }
  require('./discord_native/browser/crashReporter');
  require('./discord_native/browser/desktopCapturer');
  const features = require('./discord_native/browser/features');
  features.injectFeaturesBackend(appFeatures.getFeatures());
  require('./discord_native/browser/fileManager');
  require('./discord_native/browser/globalOverlay');
  require('./discord_native/browser/clips');
  require('./discord_native/browser/userDataCache');
  const gpuSettings = require('./discord_native/browser/gpuSettings');
  gpuSettings.injectGpuSettingsBackend(GPUSettings);
  const nativeModules = require('./discord_native/browser/nativeModules');
  nativeModules.injectModuleUpdater(moduleUpdater);
  nativeModules.injectUpdater(updater);
  require('./discord_native/browser/powerMonitor');
  require('./discord_native/browser/powerSaveBlocker');
  require('./discord_native/browser/processUtils');
  require('./discord_native/browser/safeStorage');
  const settings = require('./discord_native/browser/settings');
  settings.injectSettingsBackend(appSettings.getSettings());
  require('./discord_native/browser/spellCheck');
  const windowNative = require('./discord_native/browser/window');
  global.crashReporterMetadata = crashReporterSetup.metadata;
  global.mainAppDirname = Constants.MAIN_APP_DIRNAME;
  global.features = appFeatures.getFeatures();
  global.appSettings = appSettings.getSettings();
  global.mainWindowId = Constants.DEFAULT_MAIN_WINDOW_ID;
  global.moduleUpdater = moduleUpdater;
  const enableDevtoolsSetting = global.appSettings.get('DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING', false);
  const enableDevtools = buildInfo.releaseChannel === 'stable' ? enableDevtoolsSetting : true;
  const createApplicationMenu = require('./applicationMenu');
  Menu.setApplicationMenu(createApplicationMenu(enableDevtools));
  mainScreen = require('./mainScreen');
  mainScreen.init();
  const {
    getWindow: getPopoutWindowByKey
  } = require('./popoutWindows');
  windowNative.injectGetWindow(key => {
    return getPopoutWindowByKey(key) || BrowserWindow.fromId(mainScreen.getMainWindowId());
  });
}
function handleOpenUrl(url) {
  mainScreen.handleOpenUrl(url);
}
function setMainWindowVisible(visible) {
  mainScreen.setMainWindowVisible(visible);
}