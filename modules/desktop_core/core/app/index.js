"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleOpenUrl = handleOpenUrl;
exports.setMainWindowVisible = setMainWindowVisible;
exports.startup = startup;
var _electron = require("electron");
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
  app.injectSkipWindowsArchUpdate(Constants.DISABLE_WINDOWS_64BIT_TRANSITION);
  app.injectOptinWindowsTransitionProgression(Constants.OPTIN_WINDOWS_64BIT_TRANSITION_PROGRESSION);
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
  const globalOverlay = require('./discord_native/browser/globalOverlay');
  require('./discord_native/browser/hardware');
  const {
    setupClipsProtocol
  } = require('./discord_native/browser/clips');
  setupClipsProtocol();
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
  require('./discord_native/browser/webauthn');
  global.crashReporterMetadata = crashReporterSetup.metadata;
  global.mainAppDirname = Constants.MAIN_APP_DIRNAME;
  global.features = appFeatures.getFeatures();
  global.appSettings = appSettings.getSettings();
  global.mainWindowId = Constants.DEFAULT_MAIN_WINDOW_ID;
  global.moduleUpdater = moduleUpdater;
  const enableDevtoolsSetting = global.appSettings.get('DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING', false);
  const enableDevtools = buildInfo.releaseChannel === 'stable' ? enableDevtoolsSetting : true;
  const createApplicationMenu = require('./applicationMenu');
  _electron.Menu.setApplicationMenu(createApplicationMenu(enableDevtools));
  if (process.platform === 'darwin' && (buildInfo.releaseChannel === 'development' || buildInfo.releaseChannel === 'canary')) {
    _electron.systemPreferences.setUserDefault('SquirrelMacEnableDirectContentsWrite', 'boolean', true);
  }
  mainScreen = require('./mainScreen');
  mainScreen.init();
  const {
    getWindow: getPopoutWindowByKey,
    getAllWindows: getAllPopoutWindows,
    setNewWindowEvent
  } = require('./popoutWindows');
  windowNative.injectGetWindow(key => {
    if (key == null) {
      return _electron.BrowserWindow.fromId(mainScreen.getMainWindowId());
    }
    return getPopoutWindowByKey(key) || globalOverlay.getWindow(key);
  }, () => [...getAllPopoutWindows(), _electron.BrowserWindow.fromId(mainScreen.getMainWindowId())]);
  setNewWindowEvent(window => windowNative.newWindowEvent(window));
}
function handleOpenUrl(url) {
  if (mainScreen === null) {
    return;
  }
  mainScreen.handleOpenUrl(url);
}
function setMainWindowVisible(visible) {
  mainScreen.setMainWindowVisible(visible);
}