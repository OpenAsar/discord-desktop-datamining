"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = exports.APP_SHOULD_SHOW = exports.APP_SHOULD_LAUNCH = void 0;
exports.focusWindow = focusWindow;
exports.initSplash = initSplash;
exports.pageReady = pageReady;
var _electron = require("electron");
var _events = require("events");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _url = _interopRequireDefault(require("url"));
var _Backoff = _interopRequireDefault(require("../common/Backoff"));
var analytics = _interopRequireWildcard(require("../common/analytics"));
var moduleUpdater = _interopRequireWildcard(require("../common/moduleUpdater"));
var paths = _interopRequireWildcard(require("../common/paths"));
var _securityUtils = require("../common/securityUtils");
var _updater = require("../common/updater");
var _buildOverrideUtils = require("./buildOverrideUtils");
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
var logger = _interopRequireWildcard(require("./logger"));
var _Constants = _interopRequireDefault(require("./Constants"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UPDATE_TIMEOUT_WAIT = 10000;
const RETRY_CAP_SECONDS = 60;
const LOADING_WINDOW_WIDTH = 300;
const LOADING_WINDOW_HEIGHT = process.platform === 'darwin' ? 300 : 350;
const CHECKING_FOR_UPDATES = 'checking-for-updates';
const UPDATE_CHECK_FINISHED = 'update-check-finished';
const UPDATE_FAILURE = 'update-failure';
const LAUNCHING = 'launching';
const DOWNLOADING_MODULE = 'downloading-module';
const DOWNLOADING_UPDATES = 'downloading-updates';
const DOWNLOADING_MODULES_FINISHED = 'downloading-modules-finished';
const DOWNLOADING_MODULE_PROGRESS = 'downloading-module-progress';
const DOWNLOADED_MODULE = 'downloaded-module';
const NO_PENDING_UPDATES = 'no-pending-updates';
const INSTALLING_MODULE = 'installing-module';
const INSTALLING_UPDATES = 'installing-updates';
const INSTALLED_MODULE = 'installed-module';
const INSTALLING_MODULE_PROGRESS = 'installing-module-progress';
const INSTALLING_MODULES_FINISHED = 'installing-modules-finished';
const UPDATE_MANUALLY = 'update-manually';
const APP_SHOULD_LAUNCH = exports.APP_SHOULD_LAUNCH = 'APP_SHOULD_LAUNCH';
const APP_SHOULD_SHOW = exports.APP_SHOULD_SHOW = 'APP_SHOULD_SHOW';
const events = exports.events = new _events.EventEmitter();
logger.initializeLogging(paths);
function webContentsSend(win, event, ...args) {
  console.log(`splashScreen.webContentsSend: ${event}`, event, args);
  if (win == null) {
    console.error('splashScreen.webContentsSend: Window is null.');
    return;
  }
  if (win.webContents == null) {
    console.error('splashScreen.webContentsSend: Window.webContents is null.');
    return;
  }
  win.webContents.send(`DISCORD_${event}`, ...args);
}
let splashWindow;
let modulesListeners = {};
let updateTimeout = null;
let updateAttempt;
let splashState;
let launchedMainWindow;
let quoteCachePath;
let restartRequired = false;
let newUpdater;
let lastSplashEventState = null;
let splashInstalledUpdates = false;
const updateBackoff = new _Backoff.default(1000, 30000);
(0, _buildOverrideUtils.registerBuildOverrideUtils)();
class TaskProgress {
  constructor() {
    this.inProgress = new Map();
    this.finished = new Set();
    this.allTasks = new Set();
  }
  recordProgress(progress, task) {
    this.allTasks.add(task.package_sha256);
    if (progress.state !== _updater.TASK_STATE_WAITING) {
      this.inProgress.set(task.package_sha256, progress.percent);
      if (progress.state === _updater.TASK_STATE_COMPLETE) {
        this.finished.add(task.package_sha256);
      }
    }
  }
  updateSplashState(newState) {
    if (this.inProgress.size > 0 && this.inProgress.size > this.finished.size) {
      let totalPercent = 0;
      for (const item of this.inProgress.values()) {
        totalPercent += item;
      }
      totalPercent /= this.allTasks.size;
      splashState = {
        current: this.finished.size + 1,
        total: this.allTasks.size,
        progress: totalPercent
      };
      updateSplashState(newState);
      return true;
    }
    return false;
  }
}
async function updateUntilCurrent(widevineCDM) {
  let allowOptionalUpdates = _Constants.default.ALLOW_OPTIONAL_UPDATES;
  if (allowOptionalUpdates) {
    allowOptionalUpdates = _Constants.default.OPTIN_OPTIONAL_UPDATES;
  }
  console.log(`allowOptionalUpdates: ${allowOptionalUpdates}`);
  const retryOptions = {
    skip_host_delta: false,
    skip_module_delta: {},
    skip_all_module_delta: false,
    skip_windows_arch_update: _Constants.default.DISABLE_WINDOWS_64BIT_TRANSITION,
    optin_windows_transition_progression: _Constants.default.OPTIN_WINDOWS_64BIT_TRANSITION_PROGRESSION,
    allow_optional_updates: allowOptionalUpdates
  };
  while (true) {
    updateSplashState(CHECKING_FOR_UPDATES);
    try {
      let installedAnything = false;
      const downloads = new TaskProgress();
      const installs = new TaskProgress();
      await newUpdater.updateToLatestWithOptions(retryOptions, progress => {
        const task = progress.task;
        const downloadTask = task.HostDownload || task.ModuleDownload;
        const installTask = task.HostInstall || task.ModuleInstall;
        installedAnything = true;
        splashInstalledUpdates = true;
        if (downloadTask != null) {
          downloads.recordProgress(progress, downloadTask);
        }
        if (installTask != null) {
          installs.recordProgress(progress, installTask);
          if (progress.state.Failed != null) {
            if (task.HostInstall != null) {
              retryOptions.skip_host_delta = true;
            } else if (task.ModuleInstall != null) {
              retryOptions.skip_module_delta[installTask.version.module.name] = true;
            }
          }
        }
        if (!downloads.updateSplashState(DOWNLOADING_UPDATES)) {
          installs.updateSplashState(INSTALLING_UPDATES);
        }
      });
      if (!installedAnything) {
        const queryOptions = {
          skip_windows_arch_update: _Constants.default.DISABLE_WINDOWS_64BIT_TRANSITION,
          optin_windows_transition_progression: _Constants.default.OPTIN_WINDOWS_64BIT_TRANSITION_PROGRESSION
        };
        await newUpdater.startCurrentVersion(queryOptions);
        newUpdater.setRunningInBackground();
        newUpdater.collectGarbage();
        console.log(`Checking CDM status...`);
        const componentStatus = await widevineCDM;
        console.log(`CDM completed with status: ${componentStatus}`);
        launchMainWindow();
        updateBackoff.succeed();
        updateSplashState(LAUNCHING);
        return;
      }
    } catch (e) {
      console.error('splashScreen: Update failed', e);
      await new Promise(resolve => {
        const delayMs = updateBackoff.fail(() => resolve(false));
        splashState.seconds = Math.round(delayMs / 1000);
        updateSplashState(UPDATE_FAILURE);
      });
    }
  }
}
function initOldUpdater(widevineCDM) {
  modulesListeners = {};
  addModulesListener(CHECKING_FOR_UPDATES, () => {
    console.log(`splashScreen: ${CHECKING_FOR_UPDATES}`);
    startUpdateTimeout();
    updateSplashState(CHECKING_FOR_UPDATES);
  });
  addModulesListener(UPDATE_CHECK_FINISHED, ({
    succeeded,
    updateCount,
    manualRequired
  }) => {
    console.log(`splashScreen: ${UPDATE_CHECK_FINISHED} ${succeeded} ${updateCount} ${manualRequired}`);
    stopUpdateTimeout();
    if (updateCount > 0) {
      splashInstalledUpdates = true;
    }
    const splashCompletedWork = () => {
      if (!succeeded) {
        scheduleUpdateCheck();
        updateSplashState(UPDATE_FAILURE);
      } else if (updateCount === 0) {
        moduleUpdater.setInBackground();
        launchMainWindow();
        updateSplashState(LAUNCHING);
      }
    };
    void widevineCDM.finally(() => {
      splashCompletedWork();
    });
  });
  addModulesListener(DOWNLOADING_MODULE, ({
    name,
    current,
    total
  }) => {
    console.log(`splashScreen: ${DOWNLOADING_MODULE} ${name} ${current} ${total}`);
    stopUpdateTimeout();
    splashState = {
      current,
      total
    };
    updateSplashState(DOWNLOADING_UPDATES);
  });
  addModulesListener(DOWNLOADING_MODULE_PROGRESS, ({
    name,
    progress
  }) => {
    console.log(`splashScreen: ${DOWNLOADING_MODULE_PROGRESS} ${name} ${progress}`);
    splashState.progress = progress;
    updateSplashState(DOWNLOADING_UPDATES);
  });
  addModulesListener(DOWNLOADED_MODULE, ({
    name,
    current,
    total,
    succeeded
  }) => {
    console.log(`splashScreen: ${DOWNLOADED_MODULE} ${name} ${current} ${total} ${succeeded}`);
    delete splashState.progress;
    if (name === 'host') {
      restartRequired = true;
    }
  });
  addModulesListener(DOWNLOADING_MODULES_FINISHED, ({
    succeeded,
    failed
  }) => {
    console.log(`splashScreen: ${DOWNLOADING_MODULES_FINISHED} ${succeeded} ${failed}`);
    if (failed > 0) {
      scheduleUpdateCheck();
      updateSplashState(UPDATE_FAILURE);
    } else {
      process.nextTick(() => {
        if (restartRequired) {
          moduleUpdater.quitAndInstallUpdates();
        } else {
          moduleUpdater.installPendingUpdates();
        }
      });
    }
  });
  addModulesListener(NO_PENDING_UPDATES, () => {
    console.log(`splashScreen: ${NO_PENDING_UPDATES}`);
    moduleUpdater.checkForUpdates();
  });
  addModulesListener(INSTALLING_MODULE, ({
    name,
    current,
    total
  }) => {
    console.log(`splashScreen: ${INSTALLING_MODULE} ${name} ${current} ${total}`);
    splashState = {
      current,
      total
    };
    updateSplashState(INSTALLING_UPDATES);
  });
  addModulesListener(INSTALLED_MODULE, ({
    name,
    current,
    total,
    succeeded
  }) => {
    console.log(`splashScreen: ${INSTALLED_MODULE} ${name} ${current} ${total} ${succeeded}`);
    delete splashState.progress;
  });
  addModulesListener(INSTALLING_MODULE_PROGRESS, ({
    name,
    progress
  }) => {
    console.log(`splashScreen: ${INSTALLING_MODULE_PROGRESS} ${name} ${progress}`);
    splashState.progress = progress;
    updateSplashState(INSTALLING_UPDATES);
  });
  addModulesListener(INSTALLING_MODULES_FINISHED, ({
    succeeded,
    failed
  }) => {
    console.log(`splashScreen: ${INSTALLING_MODULES_FINISHED} ${succeeded} ${failed}`);
    moduleUpdater.checkForUpdates();
  });
  addModulesListener(UPDATE_MANUALLY, ({
    newVersion
  }) => {
    console.log(`splashScreen: ${UPDATE_MANUALLY} ${newVersion}`);
    splashState.newVersion = newVersion;
    updateSplashState(UPDATE_MANUALLY);
  });
}
function initSplash(startMinimized = false) {
  console.log(`splashScreen.initSplash(${startMinimized})`);
  splashState = {};
  launchedMainWindow = false;
  updateAttempt = 0;
  let widevineCDM;
  if (_electron.components) {
    console.log('CDM component API found');
    const now = performance.now();
    const componentPromise = _electron.components.whenReady().then(result => {
      const status = 'cdm-ready-success';
      analytics.getAnalytics().pushEvent('cdm', 'cdm_ready_complete', {
        status: status,
        duration_ms: performance.now() - now,
        result: JSON.stringify(result)
      });
      return Promise.resolve(status);
    }).catch(err => {
      const status = 'cdm-ready-error';
      console.log(`CDM component API load failure: ${JSON.stringify(err)}`);
      analytics.getAnalytics().pushEvent('cdm', 'cdm_ready_complete', {
        status: status,
        duration_ms: performance.now() - now,
        result: JSON.stringify(err)
      });
      return Promise.reject(status);
    });
    const timeoutPromise = new Promise((_resolve, reject) => {
      const ms = 200;
      setTimeout(() => {
        return reject(`cdm-ready-timeout-${ms}`);
      }, ms);
    });
    widevineCDM = Promise.race([componentPromise, timeoutPromise]);
    widevineCDM = widevineCDM.then(result => {
      console.log(`CDM completed with status: ${result}`);
      analytics.getAnalytics().pushEvent('cdm', 'cdm_load_status', {
        status: result
      });
      return result;
    }).catch(e => {
      console.log(`CDM completed with err: ${e}`);
      analytics.getAnalytics().pushEvent('cdm', 'cdm_load_status', {
        status: e
      });
      return e;
    });
  } else {
    console.log('CDM component API not found, skipping');
    const result = 'api-not-found';
    widevineCDM = Promise.resolve(result);
    analytics.getAnalytics().pushEvent('cdm', 'cdm_load_status', {
      status: result
    });
  }
  newUpdater = (0, _updater.getUpdater)();
  if (newUpdater == null) {
    initOldUpdater(widevineCDM);
  }
  launchSplashWindow(startMinimized, widevineCDM);
  quoteCachePath = _path.default.join(paths.getUserData(), 'quotes.json');
  _ipcMain.default.on('UPDATED_QUOTES', (_event, quotes) => cacheLatestQuotes(quotes));
}
function destroySplash() {
  stopUpdateTimeout();
  if (splashWindow == null || splashWindow.isDestroyed()) {
    console.error('splashScreen.destroySplash: splashWindow is null or destroyed.');
    return;
  }
  splashWindow.setSkipTaskbar(true);
  setTimeout(() => {
    if (splashWindow == null || splashWindow.isDestroyed()) {
      console.error('splashScreen.destroySplash: splashWindow is null or destroyed (setTimeout).');
      return;
    }
    splashWindow.hide();
    splashWindow.close();
    splashWindow = null;
    analytics.getDesktopTTI().trackSplashWindowDuration(splashInstalledUpdates);
  }, 100);
}
function addModulesListener(event, listener) {
  if (newUpdater != null) return;
  modulesListeners[event] = listener;
  moduleUpdater.events.addListener(event, listener);
}
function removeModulesListeners() {
  if (newUpdater != null) return;
  for (const event of Object.keys(modulesListeners)) {
    moduleUpdater.events.removeListener(event, modulesListeners[event]);
  }
}
function startUpdateTimeout() {
  if (updateTimeout == null) {
    updateTimeout = setTimeout(() => scheduleUpdateCheck(), UPDATE_TIMEOUT_WAIT);
  }
}
function stopUpdateTimeout() {
  if (updateTimeout != null) {
    clearTimeout(updateTimeout);
    updateTimeout = null;
  }
}
function updateSplashState(event) {
  console.log(`splashScreen.updateSplashState ${event}`, event, splashState);
  lastSplashEventState = event;
  if (splashWindow == null) {
    console.log('splashScreen.updateSplashState: Windows is null.');
    return;
  }
  if (splashWindow.isDestroyed()) {
    console.log('splashScreen.updateSplashState: Windows isDestroyed.');
    return;
  }
  if (splashWindow.webContents.isDestroyed()) {
    console.log('splashScreen.updateSplashState: Windows webContents isDestroyed.');
    return;
  }
  if (event === UPDATE_MANUALLY) {
    splashWindow.setAlwaysOnTop(true);
  }
  webContentsSend(splashWindow, 'SPLASH_UPDATE_STATE', {
    status: event,
    ...splashState
  });
}
function resendSplashState() {
  if (lastSplashEventState == null) {
    console.error('splashScreen.resendSplashState: lastSplashEventState is null.');
    return;
  }
  updateSplashState(lastSplashEventState);
}
function launchSplashWindow(startMinimized, widevineCDM) {
  const windowConfig = {
    width: LOADING_WINDOW_WIDTH,
    height: LOADING_WINDOW_HEIGHT,
    transparent: false,
    frame: false,
    resizable: false,
    center: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      sandbox: false,
      contextIsolation: true,
      preload: _path.default.join(__dirname, 'splashScreenPreload.js')
    }
  };
  analytics.getDesktopTTI().trackSplashWindowCreated();
  splashWindow = new _electron.BrowserWindow(windowConfig);
  splashWindow.webContents.on('console-message', logger.ipcMainRendererLogger);
  splashWindow.webContents.on('will-navigate', e => e.preventDefault());
  splashWindow.webContents.setWindowOpenHandler(details => {
    void (0, _securityUtils.saferShellOpenExternal)(details.url);
    setTimeout(_electron.app.quit, 500);
    return {
      action: 'deny'
    };
  });
  splashWindow.webContents.on('did-fail-load', (_e, errCode, errDesc, validatedURL, isMainFrame) => {
    console.error(`splashScreen: did-fail-load ${errCode} "${errDesc}" "${validatedURL}" ${isMainFrame}`);
  });
  splashWindow.webContents.on('preload-error', (_event, preloadPath, error) => {
    console.error(`splashScreen: preload-error "${preloadPath}" "${error}"`);
  });
  if (process.platform !== 'darwin') {
    splashWindow.on('closed', () => {
      splashWindow = null;
      if (!launchedMainWindow) {
        _electron.app.quit();
      }
    });
  }
  _ipcMain.default.on('SPLASH_SCREEN_READY', () => {
    console.log('splashScreen: SPLASH_SCREEN_READY');
    const cachedQuote = chooseCachedQuote();
    if (cachedQuote) {
      webContentsSend(splashWindow, 'SPLASH_SCREEN_QUOTE', cachedQuote);
    }
    if (splashWindow != null && !startMinimized) {
      splashWindow.showInactive();
    }
    if (newUpdater != null) {
      void updateUntilCurrent(widevineCDM);
    } else {
      moduleUpdater.installPendingUpdates();
    }
  });
  _ipcMain.default.on('SPLASH_SCREEN_QUIT', () => {
    console.log('splashScreen: SPLASH_SCREEN_QUIT');
    _electron.app.quit();
  });
  const splashUrl = _url.default.format({
    protocol: 'file',
    slashes: true,
    pathname: _path.default.join(__dirname, 'splash', 'index.html')
  });
  void splashWindow.loadURL(splashUrl);
}
function launchMainWindow() {
  console.log(`splashScreen.launchMainWindow: ${launchedMainWindow}`);
  removeModulesListeners();
  if (launchedMainWindow) {
    console.warn('splashScreen.launchMainWindow: launchedMainWindow is true.');
    return;
  }
  if (splashWindow == null) {
    console.error('splashScreen.launchMainWindow: splashWindow is null.');
    return;
  }
  launchedMainWindow = true;
  events.emit(APP_SHOULD_LAUNCH);
}
function scheduleUpdateCheck() {
  console.log(`splashScreen.scheduleUpdateCheck: updateAttempt = ${updateAttempt}`);
  updateAttempt += 1;
  const retryInSeconds = Math.min(updateAttempt * 10, RETRY_CAP_SECONDS);
  splashState.seconds = retryInSeconds;
  setTimeout(() => moduleUpdater.checkForUpdates(), retryInSeconds * 1000);
}
function focusWindow() {
  if (splashWindow == null) {
    console.error('splashScreen.focusWindow: splashWindow is null.');
    return;
  }
  splashWindow.focus();
}
function pageReady() {
  console.log('splashScreen.pageReady');
  destroySplash();
  process.nextTick(() => events.emit(APP_SHOULD_SHOW));
}
function cacheLatestQuotes(quotes) {
  _fs.default.writeFile(quoteCachePath, JSON.stringify(quotes), e => {
    if (e != null) {
      console.warn('splashScreen: Failed updating quote cache with error: ', e);
    }
  });
}
function chooseCachedQuote() {
  let cachedQuote = null;
  try {
    const cachedQuotes = JSON.parse(_fs.default.readFileSync(quoteCachePath, {
      encoding: 'utf8'
    }));
    cachedQuote = cachedQuotes[Math.floor(Math.random() * cachedQuotes.length)];
  } catch (_) {}
  return cachedQuote;
}