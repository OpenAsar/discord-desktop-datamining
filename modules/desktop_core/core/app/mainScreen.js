"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEBAPP_ENDPOINT = void 0;
exports.getMainWindowId = getMainWindowId;
exports.handleOpenUrl = handleOpenUrl;
exports.init = init;
exports.setMainWindowVisible = setMainWindowVisible;
exports.webContentsSend = webContentsSend;
var _electron = _interopRequireWildcard(require("electron"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _url = _interopRequireDefault(require("url"));
var _Backoff = _interopRequireDefault(require("../common/Backoff"));
var _securityUtils = require("../common/securityUtils");
var appBadge = _interopRequireWildcard(require("./appBadge"));
var appConfig = _interopRequireWildcard(require("./appConfig"));
var _appSettings = require("./bootstrapModules/appSettings");
var _bootstrapModules = require("./bootstrapModules/bootstrapModules");
var _crashReporterSetup = require("./bootstrapModules/crashReporterSetup");
var _logger = require("./bootstrapModules/logger");
var _moduleUpdater = require("./bootstrapModules/moduleUpdater");
var _paths = require("./bootstrapModules/paths");
var _splashScreen = require("./bootstrapModules/splashScreen");
var _updater = require("./bootstrapModules/updater");
var _processUtils = require("./discord_native/browser/processUtils");
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
var mouse = _interopRequireWildcard(require("./mouse"));
var popoutWindows = _interopRequireWildcard(require("./popoutWindows"));
var systemTray = _interopRequireWildcard(require("./systemTray"));
var thumbarButtons = _interopRequireWildcard(require("./thumbarButtons"));
var _Constants = require("./Constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  buildInfo
} = require('./bootstrapModules/buildInfo');
const BootstrapConstants = require('./Constants');
const settings = _appSettings.appSettings.getSettings();
const connectionBackoff = new _Backoff.default(1000, 20000);
const DISCORD_NAMESPACE = 'DISCORD_';
const envVariables = {
  disableRestart: process.env.DISCORD_DISABLE_RESTART,
  webappEndpoint: process.env.DISCORD_WEBAPP_ENDPOINT,
  test: undefined
};
function checkCanMigrate() {
  return _fs.default.existsSync(_path.default.join(_paths.paths.getUserData(), 'userDataCache.json'));
}
function checkAlreadyMigrated() {
  return _fs.default.existsSync(_path.default.join(_paths.paths.getUserData(), 'domainMigrated'));
}
const getWebappEndpoint = () => {
  if (envVariables.webappEndpoint != null) {
    console.log(`Using DISCORD_WEBAPP_ENDPOINT override: ${envVariables.webappEndpoint}`);
    return envVariables.webappEndpoint;
  }
  let endpoint = settings === null || settings === void 0 ? void 0 : settings.get('WEBAPP_ENDPOINT');
  if (endpoint === false || endpoint == null) {
    if (buildInfo.releaseChannel === 'stable') {
      const canMigrate = checkCanMigrate();
      const alreadyMigrated = checkAlreadyMigrated();
      if (canMigrate || alreadyMigrated) {
        endpoint = 'https://discord.com';
      } else {
        endpoint = 'https://discordapp.com';
      }
    } else if (buildInfo.releaseChannel === 'development') {
      endpoint = 'https://canary.discord.com';
    } else {
      endpoint = `https://${buildInfo.releaseChannel}.discord.com`;
    }
  }
  return endpoint;
};
const WEBAPP_ENDPOINT = getWebappEndpoint();
exports.WEBAPP_ENDPOINT = WEBAPP_ENDPOINT;
function getSanitizedPath(path) {
  return new _url.default.URL(path, WEBAPP_ENDPOINT).pathname;
}
function getSanitizedProtocolUrl(fullUrl) {
  try {
    const parsedURL = _url.default.parse(fullUrl);
    if (parsedURL.protocol === 'discord:') {
      return {
        path: getSanitizedPath(parsedURL.path ?? ''),
        query: parsedURL.query ?? ''
      };
    }
  } catch (_) {}
  return null;
}
const WEBAPP_PATH = settings === null || settings === void 0 ? void 0 : settings.get('WEBAPP_PATH', `/app?_=${Date.now()}`);
const URL_TO_LOAD = `${WEBAPP_ENDPOINT}${WEBAPP_PATH}`;
const MIN_WIDTH = settings === null || settings === void 0 ? void 0 : settings.get('MIN_WIDTH', 940);
const MIN_HEIGHT = settings === null || settings === void 0 ? void 0 : settings.get('MIN_HEIGHT', 500);
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const MIN_VISIBLE_ON_SCREEN = 32;
const ENABLE_DEVTOOLS = buildInfo.releaseChannel === 'stable' ? settings === null || settings === void 0 ? void 0 : settings.get('DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING', false) : true;
let mainWindow = null;
let mainWindowId = BootstrapConstants.DEFAULT_MAIN_WINDOW_ID;
let mainWindowInitialPath = null;
let mainWindowDidFinishLoad = false;
let mainWindowIsVisible = false;
let insideAuthFlow = false;
let lastCrashed = 0;
let lastPageLoadFailed = false;
const retryUpdateOptions = {
  skip_host_delta: false,
  skip_module_delta: {},
  skip_all_module_delta: false,
  skip_windows_arch_update: BootstrapConstants.DISABLE_WINDOWS_64BIT_TRANSITION,
  optin_windows_transition_progression: BootstrapConstants.OPTIN_WINDOWS_64BIT_TRANSITION_PROGRESSION
};
function getMainWindowId() {
  return mainWindowId;
}
function webContentsSend(...args) {
  if (mainWindow == null || mainWindow.isDestroyed()) {
    console.error('mainScreen.webContentsSend: mainWindow is null or destroyed');
    return;
  }
  if (mainWindow.webContents == null || mainWindow.webContents.isDestroyed()) {
    console.error('mainScreen.webContentsSend: mainWindow.webContents is null or destroyed.');
    return;
  }
  const [event, ...options] = args;
  mainWindow.webContents.send(`${DISCORD_NAMESPACE}${event}`, ...options);
}
function saveWindowConfig(browserWindow) {
  try {
    if (browserWindow == null || browserWindow.isDestroyed()) {
      return;
    }
    settings === null || settings === void 0 ? void 0 : settings.set('IS_MAXIMIZED', browserWindow.isMaximized());
    settings === null || settings === void 0 ? void 0 : settings.set('IS_MINIMIZED', browserWindow.isMinimized());
    if (!(settings === null || settings === void 0 ? void 0 : settings.get('IS_MAXIMIZED')) && !(settings === null || settings === void 0 ? void 0 : settings.get('IS_MINIMIZED'))) {
      settings === null || settings === void 0 ? void 0 : settings.set('WINDOW_BOUNDS', browserWindow.getBounds());
    }
    settings === null || settings === void 0 ? void 0 : settings.save();
  } catch (e) {
    console.error(e);
  }
}
function setWindowVisible(isVisible, andUnminimize) {
  if (mainWindow == null) {
    console.error('mainScreen.setWindowVisible: mainWindow is null.');
    return;
  }
  if (mainWindow.isDestroyed()) {
    console.error('mainScreen.setWindowVisible: mainWindow isDestroyed.');
    return;
  }
  if (isVisible) {
    const isMinimized = mainWindow.isMinimized();
    if (andUnminimize || !isMinimized) {
      mainWindow.show();
      webContentsSend('MAIN_WINDOW_FOCUS');
    } else {
      console.log(`mainScreen.setWindowVisible: didn't show. andUnminimize: ${andUnminimize}, isMinimized: ${isMinimized}.`);
    }
  } else {
    webContentsSend('MAIN_WINDOW_BLUR');
    mainWindow.hide();
    if (systemTray.hasInit) {
      systemTray.displayHowToCloseHint();
    }
  }
  mainWindow.setSkipTaskbar(!isVisible);
  mainWindowIsVisible = isVisible;
}
function doAABBsOverlap(a, b) {
  const ax1 = a.x + a.width;
  const bx1 = b.x + b.width;
  const ay1 = a.y + a.height;
  const by1 = b.y + b.height;
  const cx0 = a.x < b.x ? b.x : a.x;
  const cx1 = ax1 < bx1 ? ax1 : bx1;
  if (cx1 - cx0 > 0) {
    const cy0 = a.y < b.y ? b.y : a.y;
    const cy1 = ay1 < by1 ? ay1 : by1;
    if (cy1 - cy0 > 0) {
      return true;
    }
  }
  return false;
}
function getDisplayForBounds(displays, bounds) {
  return displays.find(display => {
    const displayBound = display.workArea;
    displayBound.x += MIN_VISIBLE_ON_SCREEN;
    displayBound.y += MIN_VISIBLE_ON_SCREEN;
    displayBound.width -= 2 * MIN_VISIBLE_ON_SCREEN;
    displayBound.height -= 2 * MIN_VISIBLE_ON_SCREEN;
    return doAABBsOverlap(bounds, displayBound);
  });
}
function getSavedWindowBounds() {
  if (!(settings === null || settings === void 0 ? void 0 : settings.get('WINDOW_BOUNDS'))) {
    return null;
  }
  const bounds = settings.get('WINDOW_BOUNDS');
  bounds.width = Math.max(MIN_WIDTH, bounds.width);
  bounds.height = Math.max(MIN_HEIGHT, bounds.height);
  const displays = _electron.screen.getAllDisplays();
  const display = getDisplayForBounds(displays, bounds);
  return display != null ? bounds : null;
}
function applyWindowBoundsToConfig(mainWindowOptions) {
  const bounds = getSavedWindowBounds();
  if (bounds == null) {
    mainWindowOptions.center = true;
    return;
  }
  mainWindowOptions.width = bounds.width;
  mainWindowOptions.height = bounds.height;
  mainWindowOptions.x = bounds.x;
  mainWindowOptions.y = bounds.y;
}
function restoreMainWindowBounds(mainWindow) {
  const savedWindowBounds = getSavedWindowBounds();
  const currentBounds = mainWindow.getBounds();
  if (savedWindowBounds != null && (currentBounds.height !== savedWindowBounds.height || currentBounds.width !== savedWindowBounds.width)) {
    mainWindow.setBounds(savedWindowBounds);
  }
}
function adjustWindowBounds(window) {
  const bounds = window.getBounds();
  const displays = _electron.screen.getAllDisplays();
  const display = getDisplayForBounds(displays, bounds);
  if (!display && displays.length > 0) {
    const displayBounds = displays[0].bounds;
    bounds.x = displayBounds.x;
    bounds.y = displayBounds.y;
    bounds.width = Math.min(bounds.width, displayBounds.width);
    bounds.height = Math.min(bounds.height, displayBounds.height);
    window.setBounds(bounds);
  }
}
function setupSystemTray() {
  if (!systemTray.hasInit) {
    systemTray.init({
      onCheckForUpdates: () => {
        const updater = _updater.updater === null || _updater.updater === void 0 ? void 0 : _updater.updater.getUpdater();
        if (updater != null) {
          void checkForUpdatesWithUpdater(updater);
        } else {
          _moduleUpdater.moduleUpdater.checkForUpdates();
        }
      },
      onTrayClicked: () => setWindowVisible(true, true),
      onOpenVoiceSettings: openVoiceSettings,
      onToggleMute: toggleMute,
      onToggleDeafen: toggleDeafen,
      onLaunchApplication: launchApplication
    });
  }
}
function setupAppBadge() {
  if (!appBadge.hasInit) {
    appBadge.init();
  }
}
function setupAppConfig() {
  if (!appConfig.hasInit) {
    appConfig.init();
  }
}
function setupPopouts() {
  if (!popoutWindows.hasInit) {
    popoutWindows.init();
  }
}
function openVoiceSettings() {
  setWindowVisible(true, true);
  webContentsSend('SYSTEM_TRAY_OPEN_VOICE_SETTINGS');
}
function toggleMute() {
  webContentsSend('SYSTEM_TRAY_TOGGLE_MUTE');
}
function toggleDeafen() {
  webContentsSend('SYSTEM_TRAY_TOGGLE_DEAFEN');
}
function launchApplication(applicationId) {
  webContentsSend('LAUNCH_APPLICATION', applicationId);
}
const loadMainPage = () => {
  lastPageLoadFailed = false;
  mainWindow.loadURL(URL_TO_LOAD);
};
const DEFAULT_BACKGROUND_COLOR = '#2f3136';
const BACKGROUND_COLOR_KEY = 'BACKGROUND_COLOR';
function getBackgroundColor() {
  return (settings === null || settings === void 0 ? void 0 : settings.get(BACKGROUND_COLOR_KEY, DEFAULT_BACKGROUND_COLOR)) ?? DEFAULT_BACKGROUND_COLOR;
}
function setBackgroundColor(color) {
  settings === null || settings === void 0 ? void 0 : settings.set(BACKGROUND_COLOR_KEY, color);
  mainWindow.setBackgroundColor(color);
  settings === null || settings === void 0 ? void 0 : settings.save();
}
function launchMainAppWindow(isVisible) {
  if (mainWindow) {
    mainWindow.destroy();
  }
  const mainWindowOptions = {
    title: 'Discord',
    backgroundColor: getBackgroundColor(),
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    transparent: false,
    frame: false,
    resizable: true,
    show: isVisible,
    webPreferences: {
      enableBlinkFeatures: 'EnumerateDevices,AudioOutputDevices',
      nodeIntegration: false,
      sandbox: false,
      preload: _path.default.join(__dirname, 'mainScreenPreload.js'),
      spellcheck: true,
      contextIsolation: true,
      additionalArguments: ['--enable-node-leakage-in-renderers'],
      devTools: ENABLE_DEVTOOLS
    }
  };
  if (process.platform === 'linux') {
    mainWindowOptions.icon = _path.default.join(_path.default.dirname(_electron.app.getPath('exe')), 'discord.png');
    mainWindowOptions.frame = true;
  }
  if (process.platform === 'darwin') {
    mainWindowOptions.titleBarStyle = 'hidden';
    mainWindowOptions.trafficLightPosition = {
      x: 10,
      y: 10
    };
  }
  applyWindowBoundsToConfig(mainWindowOptions);
  mainWindow = new _electron.BrowserWindow(mainWindowOptions);
  mainWindowId = mainWindow.id;
  global.mainWindowId = mainWindowId;
  includeOptionalModule('./ElectronTestRpc', module => module.initialize(mainWindow));
  restoreMainWindowBounds(mainWindow);
  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback, details) => {
    switch (permission) {
      case 'accessibility-events':
        callback(true);
        return;
      case 'notifications':
      case 'pointerLock':
        callback((0, _securityUtils.checkUrlOriginMatches)(details.requestingUrl, WEBAPP_ENDPOINT));
        return;
      case 'fullscreen':
        let result = false;
        if (details.isMainFrame) {
          result = (0, _securityUtils.checkUrlOriginMatches)(details.requestingUrl, WEBAPP_ENDPOINT);
        } else {
          result = true;
        }
        callback(result);
        return;
      case 'media':
        callback((0, _securityUtils.checkUrlOriginMatches)(details.requestingUrl, _Constants.AllowedMediaOrigins.K_ID));
        return;
    }
    callback(false);
  });
  mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    switch (permission) {
      case 'notifications':
      case 'fullscreen':
      case 'pointerLock':
        if (details.isMainFrame || details.embeddingOrigin == null) {
          return (0, _securityUtils.checkUrlOriginMatches)(requestingOrigin, WEBAPP_ENDPOINT);
        } else {
          return (0, _securityUtils.checkUrlOriginMatches)(details.embeddingOrigin, WEBAPP_ENDPOINT);
        }
      case 'media':
        return (0, _securityUtils.checkUrlOriginMatches)(details.requestingUrl, _Constants.AllowedMediaOrigins.K_ID);
    }
    return false;
  });
  mainWindow.setMenuBarVisibility(false);
  if (settings === null || settings === void 0 ? void 0 : settings.get('IS_MAXIMIZED')) {
    mainWindow.maximize();
  }
  if (settings === null || settings === void 0 ? void 0 : settings.get('IS_MINIMIZED')) {
    mainWindow.minimize();
  }
  mainWindow.webContents.setWindowOpenHandler(({
    url,
    frameName,
    features
  }) => {
    if (frameName.startsWith(DISCORD_NAMESPACE) && (0, _securityUtils.checkUrlOriginMatches)(url, WEBAPP_ENDPOINT) && getSanitizedPath(url) === '/popout') {
      return popoutWindows.openOrFocusWindow(url, frameName, features);
    } else if ((0, _securityUtils.shouldOpenExternalUrl)(url)) {
      void (0, _securityUtils.saferShellOpenExternal)(url);
    }
    return {
      action: 'deny'
    };
  });
  mainWindow.webContents.on('did-fail-load', (e, errCode, errDesc, validatedUrl) => {
    if (insideAuthFlow) {
      return;
    }
    if (validatedUrl !== URL_TO_LOAD) {
      return;
    }
    if (errCode === -3 || errCode === 0) return;
    lastPageLoadFailed = true;
    console.error('[WebContents] did-fail-load', errCode, errDesc, `retry in ${connectionBackoff.current} ms`);
    connectionBackoff.fail(() => {
      console.log('[WebContents] retrying load', URL_TO_LOAD);
      loadMainPage();
    });
  });
  mainWindow.webContents.on('did-create-window', (childWindow, {
    options,
    frameName
  }) => {
    popoutWindows.setupPopout(childWindow, frameName, options, WEBAPP_ENDPOINT);
    adjustWindowBounds(childWindow);
  });
  mainWindow.webContents.on('did-finish-load', () => {
    var _mainWindow;
    console.log(`mainScreen.on(did-finish-load) ${lastPageLoadFailed} ${mainWindowDidFinishLoad}`);
    if (insideAuthFlow && mainWindow.webContents && (0, _securityUtils.checkUrlOriginMatches)(mainWindow.webContents.getURL(), WEBAPP_ENDPOINT)) {
      insideAuthFlow = false;
    }
    mainWindowDidFinishLoad = true;
    if (mainWindowInitialPath != null) {
      webContentsSend('MAIN_WINDOW_PATH', mainWindowInitialPath.path, mainWindowInitialPath.query);
      mainWindowInitialPath = null;
    }
    webContentsSend(((_mainWindow = mainWindow) === null || _mainWindow === void 0 ? void 0 : _mainWindow.isFocused()) ? 'MAIN_WINDOW_FOCUS' : 'MAIN_WINDOW_BLUR');
    if (!lastPageLoadFailed) {
      connectionBackoff.succeed();
      _splashScreen.splashScreen.pageReady();
    }
  });
  mainWindow.webContents.on('render-process-gone', (e, details) => {
    const reason = (details === null || details === void 0 ? void 0 : details.reason) ?? 'Unknown';
    _processUtils.processUtilsSettings.rendererCrashReason = reason;
    _processUtils.processUtilsSettings.rendererCrashExitCode = (details === null || details === void 0 ? void 0 : details.exitCode) ?? null;
    _processUtils.processUtilsSettings.lastRunsStoredInformation = _processUtils.processUtilsSettings.currentStoredInformation;
    _processUtils.processUtilsSettings.currentStoredInformation = {};
    if (reason === 'killed') {
      _electron.app.quit();
      return;
    }
    const crashTime = Date.now();
    if (crashTime - lastCrashed < 5 * 1000) {
      console.error(`[WebContents] double crashed (reason: ${reason}, exitCode: ${details === null || details === void 0 ? void 0 : details.exitCode})... RIP =(`);
      _electron.app.quit();
      return;
    }
    lastCrashed = crashTime;
    console.error(`[WebContents] crashed (reason: ${reason}, exitCode: ${details === null || details === void 0 ? void 0 : details.exitCode})... reloading`);
    if (envVariables.disableRestart != null) {
      _electron.app.quit();
      return;
    }
    launchMainAppWindow(true);
  });
  mainWindow.webContents.on('will-navigate', (evt, url) => {
    if (!insideAuthFlow && !(0, _securityUtils.checkUrlOriginMatches)(url, WEBAPP_ENDPOINT)) {
      evt.preventDefault();
    }
  });
  mainWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    if ((0, _securityUtils.checkUrlOriginMatches)(oldUrl, WEBAPP_ENDPOINT) && (0, _securityUtils.checkUrlOriginMatches)(newUrl, 'https://accounts.google.com/')) {
      insideAuthFlow = true;
    }
  });
  mainWindow.webContents.on('context-menu', (_, params) => {
    webContentsSend('SPELLCHECK_RESULT', params.misspelledWord, params.dictionarySuggestions);
  });
  mainWindow.webContents.on('devtools-opened', () => {
    webContentsSend('WINDOW_DEVTOOLS_OPENED');
  });
  mainWindow.webContents.on('devtools-closed', () => {
    webContentsSend('WINDOW_DEVTOOLS_CLOSED');
  });
  mainWindow.on('focus', () => {
    webContentsSend('MAIN_WINDOW_FOCUS');
  });
  mainWindow.on('blur', () => {
    webContentsSend('MAIN_WINDOW_BLUR');
  });
  mainWindow.on('page-title-updated', (e, title) => {
    if (mainWindow == null) {
      return;
    }
    e.preventDefault();
    setMainWindowTitle(title);
  });
  mainWindow.on('leave-html-full-screen', () => {
    if (mainWindow == null) {
      return;
    }
    mainWindow.setMenuBarVisibility(false);
  });
  mainWindow.on('show', () => {
    setTimeout(() => appBadge.refreshAppBadge(), 500);
  });
  mainWindow.webContents.on('did-navigate-in-page', (_, eventUrl) => {
    var _parsedUrl;
    if (mainWindow == null) {
      return;
    }
    let parsedUrl;
    try {
      parsedUrl = _url.default.parse(eventUrl);
    } catch (_) {
      return;
    }
    if (((_parsedUrl = parsedUrl) === null || _parsedUrl === void 0 ? void 0 : _parsedUrl.pathname) === '/login') {
      mainWindow.webContents.clearHistory();
    }
    setMainWindowTitle(mainWindow.webContents.getTitle());
  });
  mainWindow.on('swipe', (_, direction) => {
    switch (direction) {
      case 'left':
        webContentsSend('NAVIGATE_BACK', 'SWIPE');
        break;
      case 'right':
        webContentsSend('NAVIGATE_FORWARD', 'SWIPE');
        break;
    }
  });
  if (_logger.logger != null) {
    mainWindow.webContents.on('console-message', _logger.logger.ipcMainRendererLogger);
  }
  if (process.platform === 'win32') {
    mainWindow.on('app-command', (_, cmd) => {
      switch (cmd) {
        case 'browser-backward':
          webContentsSend('NAVIGATE_BACK', 'BROWSER');
          break;
        case 'browser-forward':
          webContentsSend('NAVIGATE_FORWARD', 'BROWSER');
          break;
      }
    });
  }
  if (process.platform === 'darwin') {
    mainWindow.on('close', e => {
      if (mainWindow != null) {
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
        } else {
          webContentsSend('MAIN_WINDOW_HIDDEN');
          _electron.default.Menu.sendActionToFirstResponder('hide:');
        }
        e.preventDefault();
      }
      return false;
    });
  }
  setupSystemTray();
  setupAppBadge();
  setupAppConfig();
  setupPopouts();
  thumbarButtons.init();
  mouse.init();
  if (process.platform === 'linux' || process.platform === 'win32') {
    systemTray.show();
    mainWindow.on('close', e => {
      if (mainWindow == null) {
        popoutWindows.closePopouts();
        return;
      }
      webContentsSend('MAIN_WINDOW_BLUR');
      saveWindowConfig(mainWindow);
      if (!(settings === null || settings === void 0 ? void 0 : settings.get('MINIMIZE_TO_TRAY', true))) {
        _electron.app.quit();
        return;
      }
      webContentsSend('MAIN_WINDOW_HIDDEN');
      setWindowVisible(false, false);
      e.preventDefault();
    });
  }
  loadMainPage();
}
let updaterState = _Constants.UpdaterEvents.UPDATE_NOT_AVAILABLE;
function includeOptionalModule(path, cb) {
  try {
    const module = require(path);
    if (cb != null) {
      cb(module);
    }
    console.log(`Module ${path} was included.`);
    return module;
  } catch (e) {
    if ((e === null || e === void 0 ? void 0 : e.code) === 'MODULE_NOT_FOUND') {
      console.log(`Optional module ${path} was not included.`);
    } else {
      console.error(`Failed to initialize ${path}`, e);
      console.error(`e.toString() ${e.toString()}`);
    }
  }
  return undefined;
}
function handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired) {
  if (!succeeded) {
    updaterState = _Constants.UpdaterEvents.UPDATE_NOT_AVAILABLE;
    webContentsSend(_Constants.UpdaterEvents.UPDATE_ERROR);
    return;
  }
  if (updateCount === 0) {
    updaterState = _Constants.UpdaterEvents.UPDATE_NOT_AVAILABLE;
  } else if (manualRequired) {
    updaterState = _Constants.UpdaterEvents.UPDATE_MANUALLY;
  } else {
    updaterState = _Constants.UpdaterEvents.UPDATE_AVAILABLE;
  }
  webContentsSend(updaterState);
}
function handleModuleUpdateDownloadProgress(name, progress) {
  if (mainWindow) {
    mainWindow.setProgressBar(progress);
  }
  webContentsSend(_Constants.UpdaterEvents.MODULE_INSTALL_PROGRESS, name, progress);
}
function handleModuleUpdateDownloadsFinished(succeeded, failed) {
  if (mainWindow) {
    mainWindow.setProgressBar(-1);
  }
  if (updaterState === _Constants.UpdaterEvents.UPDATE_AVAILABLE) {
    if (failed > 0) {
      updaterState = _Constants.UpdaterEvents.UPDATE_NOT_AVAILABLE;
      webContentsSend(_Constants.UpdaterEvents.UPDATE_ERROR);
    } else {
      updaterState = _Constants.UpdaterEvents.UPDATE_DOWNLOADED;
      webContentsSend(updaterState);
    }
  }
}
function handleModuleUpdateInstalledModule(name, current, total, succeeded) {
  if (mainWindow) {
    mainWindow.setProgressBar(-1);
  }
  webContentsSend(_Constants.UpdaterEvents.MODULE_INSTALLED, name, succeeded);
}
function setUpdaterState(newUpdaterState) {
  updaterState = newUpdaterState;
  webContentsSend(updaterState);
}
function setMainWindowTitle(title) {
  if (!title.endsWith('Discord')) {
    title += ' - Discord';
  }
  if (mainWindow) {
    mainWindow.setTitle(title);
  }
}
async function checkForUpdatesWithUpdater(updater) {
  if (updaterState === _Constants.UpdaterEvents.UPDATE_NOT_AVAILABLE) {
    setUpdaterState(_Constants.UpdaterEvents.CHECKING_FOR_UPDATES);
    try {
      let installedAnything = false;
      const progressCallback = progress => {
        const task = progress.task.HostInstall || progress.task.ModuleInstall;
        if (task != null && progress.state === 'Complete') {
          if (!installedAnything) {
            installedAnything = true;
            setUpdaterState(_Constants.UpdaterEvents.UPDATE_AVAILABLE);
          }
        }
        if (task != null && progress.state.Failed != null) {
          if (progress.task.HostInstall != null) {
            retryUpdateOptions.skip_host_delta = true;
          } else if (progress.task.ModuleInstall != null) {
            retryUpdateOptions.skip_module_delta[task.version.module.name] = true;
          }
        }
      };
      if (updater.updateToLatestWithOptions) {
        await updater.updateToLatestWithOptions(retryUpdateOptions, progressCallback);
      } else {
        await updater.updateToLatest(progressCallback);
      }
      setUpdaterState(installedAnything ? _Constants.UpdaterEvents.UPDATE_DOWNLOADED : _Constants.UpdaterEvents.UPDATE_NOT_AVAILABLE);
    } catch (e) {
      console.error('Update to latest failed: ', e);
      updaterState = _Constants.UpdaterEvents.UPDATE_NOT_AVAILABLE;
      webContentsSend(_Constants.UpdaterEvents.UPDATE_ERROR);
    }
  } else {
    webContentsSend(updaterState);
  }
}
const analyticsState = {
  ready: false,
  cached: []
};
function setupAnalyticsEvents() {
  var _analytics$getAnalyti;
  _bootstrapModules.analytics === null || _bootstrapModules.analytics === void 0 ? void 0 : (_analytics$getAnalyti = _bootstrapModules.analytics.getAnalytics()) === null || _analytics$getAnalyti === void 0 ? void 0 : _analytics$getAnalyti.on('event', event => {
    if (analyticsState.ready) {
      webContentsSend(_Constants.AnalyticsEvents.APP_PUSH_ANALYTICS, [event]);
    } else {
      analyticsState.cached.push(event);
    }
  });
  _ipcMain.default.on(_Constants.AnalyticsEvents.APP_GET_ANALYTICS_EVENTS, () => {
    const a = _bootstrapModules.analytics === null || _bootstrapModules.analytics === void 0 ? void 0 : _bootstrapModules.analytics.getAnalytics();
    if (a == null) {
      console.log(`[app] null analytics`);
      return;
    }
    const events = a.getAndTruncateEvents();
    if (!analyticsState.ready) {
      analyticsState.ready = true;
      events.push(...analyticsState.cached);
      analyticsState.cached = [];
    }
    webContentsSend(_Constants.AnalyticsEvents.APP_PUSH_ANALYTICS, events);
  });
}
function setupUpdaterEventsWithUpdater(updater) {
  _electron.app.on(_Constants.MenuEvents.CHECK_FOR_UPDATES, () => checkForUpdatesWithUpdater(updater));
  _ipcMain.default.on(_Constants.UpdaterEvents.CHECK_FOR_UPDATES, () => {
    return checkForUpdatesWithUpdater(updater);
  });
  _ipcMain.default.on(_Constants.UpdaterEvents.QUIT_AND_INSTALL, () => {
    saveWindowConfig(mainWindow);
    mainWindow = null;
    try {
      _moduleUpdater.moduleUpdater.quitAndInstallUpdates();
    } catch (e) {
      _electron.app.relaunch();
      _electron.app.quit();
    }
  });
  _ipcMain.default.on(_Constants.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE, () => {
    if (updater.queryAndTruncateHistory != null) {
      webContentsSend(_Constants.UpdaterEvents.UPDATER_HISTORY_RESPONSE, updater.queryAndTruncateHistory());
    } else {
      webContentsSend(_Constants.UpdaterEvents.UPDATER_HISTORY_RESPONSE, []);
    }
  });
}
function setupLegacyUpdaterEvents() {
  _electron.app.on(_Constants.MenuEvents.CHECK_FOR_UPDATES, () => _moduleUpdater.moduleUpdater.checkForUpdates());
  _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.CHECKING_FOR_UPDATES, () => {
    updaterState = _Constants.UpdaterEvents.CHECKING_FOR_UPDATES;
    webContentsSend(updaterState);
  });
  if (_moduleUpdater.moduleUpdater.supportsEventObjects) {
    _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.UPDATE_CHECK_FINISHED, ({
      succeeded,
      updateCount,
      manualRequired
    }) => {
      console.log(`legacyModuleUpdater: ${_moduleUpdater.moduleUpdater.UPDATE_CHECK_FINISHED}`);
      handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired);
    });
    _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.DOWNLOADING_MODULE_PROGRESS, ({
      name,
      progress
    }) => {
      console.log(`legacyModuleUpdater: ${_moduleUpdater.moduleUpdater.DOWNLOADING_MODULE_PROGRESS} ${name} ${progress}`);
      handleModuleUpdateDownloadProgress(name, progress);
    });
    _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.DOWNLOADING_MODULES_FINISHED, ({
      succeeded,
      failed
    }) => {
      console.log(`legacyModuleUpdater: ${_moduleUpdater.moduleUpdater.DOWNLOADING_MODULES_FINISHED} ${succeeded} ${failed}`);
      handleModuleUpdateDownloadsFinished(succeeded, failed);
    });
    _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.INSTALLED_MODULE, ({
      name,
      current,
      total,
      succeeded
    }) => {
      console.log(`legacyModuleUpdater: ${_moduleUpdater.moduleUpdater.INSTALLED_MODULE} ${name} ${current} ${total} ${succeeded}`);
      handleModuleUpdateInstalledModule(name, current, total, succeeded);
    });
  } else {
    _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.UPDATE_CHECK_FINISHED, (succeeded, updateCount, manualRequired) => {
      console.log(`legacyModuleUpdater: ${_moduleUpdater.moduleUpdater.UPDATE_CHECK_FINISHED} ${succeeded} ${updateCount} ${manualRequired}`);
      handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired);
    });
    _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.DOWNLOADING_MODULE_PROGRESS, (name, progress) => {
      console.log(`legacyModuleUpdater: ${_moduleUpdater.moduleUpdater.DOWNLOADING_MODULE_PROGRESS} ${name} ${progress}`);
      handleModuleUpdateDownloadProgress(name, progress);
    });
    _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.DOWNLOADING_MODULES_FINISHED, (succeeded, failed) => {
      console.log(`legacyModuleUpdater: ${_moduleUpdater.moduleUpdater.DOWNLOADING_MODULES_FINISHED} ${succeeded} ${failed}`);
      handleModuleUpdateDownloadsFinished(succeeded, failed);
    });
    _moduleUpdater.moduleUpdater.events.on(_moduleUpdater.moduleUpdater.INSTALLED_MODULE, (name, current, total, succeeded) => {
      console.log(`legacyModuleUpdater: ${_moduleUpdater.moduleUpdater.INSTALLED_MODULE} ${name} ${current} ${total} ${succeeded}`);
      handleModuleUpdateInstalledModule(name, current, total, succeeded);
    });
  }
  _ipcMain.default.on(_Constants.UpdaterEvents.CHECK_FOR_UPDATES, () => {
    console.log(`mainScreen.UpdaterEvents: ${_Constants.UpdaterEvents.CHECK_FOR_UPDATES} ${updaterState}`);
    if (updaterState === _Constants.UpdaterEvents.UPDATE_NOT_AVAILABLE) {
      _moduleUpdater.moduleUpdater.checkForUpdates();
    } else {
      webContentsSend(updaterState);
    }
  });
  _ipcMain.default.on(_Constants.UpdaterEvents.QUIT_AND_INSTALL, () => {
    console.log(`mainScreen.UpdaterEvents: ${_Constants.UpdaterEvents.QUIT_AND_INSTALL} ${updaterState}`);
    saveWindowConfig(mainWindow);
    mainWindow = null;
    try {
      _moduleUpdater.moduleUpdater.quitAndInstallUpdates();
    } catch (e) {
      _electron.app.relaunch();
      _electron.app.quit();
    }
  });
  _ipcMain.default.on(_Constants.UpdaterEvents.MODULE_INSTALL, (_event, name) => {
    console.log(`mainScreen.UpdaterEvents: ${_Constants.UpdaterEvents.MODULE_INSTALL} ${name}`);
    _moduleUpdater.moduleUpdater.install(name, false);
  });
  _ipcMain.default.on(_Constants.UpdaterEvents.MODULE_QUERY, (_event, name) => {
    console.log(`mainScreen.UpdaterEvents: ${_Constants.UpdaterEvents.MODULE_QUERY} ${name}`);
    webContentsSend(_Constants.UpdaterEvents.MODULE_INSTALLED, name, _moduleUpdater.moduleUpdater.isInstalled(name, undefined));
  });
  _ipcMain.default.on(_Constants.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE, () => {
    console.log(`mainScreen.UpdaterEvents: ${_Constants.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE}`);
    webContentsSend(_Constants.UpdaterEvents.UPDATER_HISTORY_RESPONSE, _moduleUpdater.moduleUpdater.events.history);
    _moduleUpdater.moduleUpdater.events.history = [];
  });
}
function handleDisplayChange() {
  if (mainWindow == null) {
    return;
  }
  if (process.platform === 'win32' && !mainWindowIsVisible) {
    setWindowVisible(mainWindowIsVisible, false);
  }
}
function init() {
  _electron.screen.on('display-added', handleDisplayChange);
  _electron.screen.on('display-removed', handleDisplayChange);
  _electron.screen.on('display-metrics-changed', handleDisplayChange);
  _electron.app.on('window-all-closed', () => {
    if (envVariables.test != null) {
      _electron.app.quit();
    }
  });
  _electron.app.on('before-quit', () => {
    saveWindowConfig(mainWindow);
    mainWindow = null;
  });
  _electron.app.on('gpu-process-crashed', (_, killed) => {
    if (killed) {
      _electron.app.quit();
    }
  });
  _electron.app.on('child-process-gone', (_, details) => {
    if (details.exitCode === 0) {
      return;
    }
    const serviceDescription = `${details.type} (${details.name})`;
    console.error(`child-process-gone! child: ${serviceDescription} exitCode: ${details.exitCode}`);
    const {
      reason
    } = details;
    if (reason === 'crashed' || reason === 'oom') {
      const sentry = _crashReporterSetup.crashReporterSetup.getGlobalSentry();
      if (sentry != null) {
        const skipSentryCapture = details.type === 'Utility' && details.exitCode === -1073741205;
        if (!skipSentryCapture) {
          sentry.captureMessage(`'${details.type}' process exited with '${details.reason}' with exitcode '${details.exitCode}'`);
        }
      }
    }
  });
  _electron.app.on(_Constants.MenuEvents.OPEN_HELP, () => webContentsSend('HELP_OPEN'));
  _electron.app.on(_Constants.MenuEvents.OPEN_SETTINGS, () => webContentsSend('USER_SETTINGS_OPEN'));
  _electron.app.on('second-instance', (_event, args) => {
    var _process$argv;
    if ((args === null || args === void 0 ? void 0 : args.indexOf('--squirrel-uninstall')) > -1) {
      return;
    }
    if ((_process$argv = process.argv) === null || _process$argv === void 0 ? void 0 : _process$argv.slice(1).includes('--multi-instance')) {
      return;
    }
    if (mainWindow == null) {
      return;
    }
    setWindowVisible(true, false);
    mainWindow.focus();
  });
  _ipcMain.default.on('SETTINGS_UPDATE_BACKGROUND_COLOR', (_event, backgroundColor) => {
    if (getBackgroundColor() !== backgroundColor) {
      setBackgroundColor(backgroundColor);
    }
  });
  _ipcMain.default.on('OPEN_EXTERNAL_URL', (_event, externalUrl) => {
    (0, _securityUtils.saferShellOpenExternal)(externalUrl).catch(() => {
      console.error('Failed to open external URL', externalUrl);
    });
  });
  setupAnalyticsEvents();
  const updater = _updater.updater === null || _updater.updater === void 0 ? void 0 : _updater.updater.getUpdater();
  if (updater != null) {
    setupUpdaterEventsWithUpdater(updater);
  } else {
    setupLegacyUpdaterEvents();
  }
  launchMainAppWindow(false);
}
function handleOpenUrl(url) {
  const sanitizedUrl = getSanitizedProtocolUrl(url);
  if (sanitizedUrl != null) {
    if (!mainWindowDidFinishLoad) {
      mainWindowInitialPath = {
        path: sanitizedUrl.path,
        query: sanitizedUrl.query
      };
    }
    webContentsSend('MAIN_WINDOW_PATH', sanitizedUrl.path, sanitizedUrl.query);
  }
  if (mainWindow == null) {
    return;
  }
  setWindowVisible(true, false);
  mainWindow.focus();
}
function setMainWindowVisible(visible) {
  setWindowVisible(visible, false);
}