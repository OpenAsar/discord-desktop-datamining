"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.APP_SHOULD_SHOW = exports.APP_SHOULD_LAUNCH = void 0;
exports.initSplash = initSplash;
exports.focusWindow = focusWindow;
exports.pageReady = pageReady;
const electron_1 = require("electron");
const events_1 = require("events");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const Backoff_1 = __importDefault(require("../common/Backoff"));
const analytics = __importStar(require("../common/analytics"));
const paths = __importStar(require("../common/paths"));
const securityUtils_1 = require("../common/securityUtils");
const updater_1 = require("../common/updater");
const buildOverrideUtils_1 = require("./buildOverrideUtils");
const ipcMain_1 = __importDefault(require("./ipcMain"));
const logger = __importStar(require("./logger"));
const moduleUpdater = __importStar(require("./moduleUpdater"));
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
const Constants_1 = __importDefault(require("./Constants"));
exports.APP_SHOULD_LAUNCH = 'APP_SHOULD_LAUNCH';
exports.APP_SHOULD_SHOW = 'APP_SHOULD_SHOW';
exports.events = new events_1.EventEmitter();
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
const updateBackoff = new Backoff_1.default(1000, 30000);
(0, buildOverrideUtils_1.registerBuildOverrideUtils)();
class TaskProgress {
    inProgress;
    finished;
    allTasks;
    constructor() {
        this.inProgress = new Map();
        this.finished = new Set();
        this.allTasks = new Set();
    }
    recordProgress(progress, task) {
        this.allTasks.add(task.package_sha256);
        if (progress.state !== updater_1.TASK_STATE_WAITING) {
            this.inProgress.set(task.package_sha256, progress.percent);
            if (progress.state === updater_1.TASK_STATE_COMPLETE) {
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
                progress: totalPercent,
            };
            updateSplashState(newState);
            return true;
        }
        return false;
    }
}
async function updateUntilCurrent() {
    const allowOptionalUpdates = Constants_1.default.ALLOW_OPTIONAL_UPDATES;
    console.log(`allowOptionalUpdates: ${allowOptionalUpdates}`);
    const retryOptions = {
        skip_host_delta: false,
        skip_module_delta: {},
        skip_all_module_delta: false,
        allow_optional_updates: allowOptionalUpdates,
    };
    while (true) {
        updateSplashState(CHECKING_FOR_UPDATES);
        try {
            let installedAnything = false;
            const downloads = new TaskProgress();
            const installs = new TaskProgress();
            await newUpdater.updateToLatestWithOptions(retryOptions, (progress) => {
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
                        }
                        else if (task.ModuleInstall != null) {
                            retryOptions.skip_module_delta[installTask.version.module.name] = true;
                        }
                    }
                }
                if (!downloads.updateSplashState(DOWNLOADING_UPDATES)) {
                    installs.updateSplashState(INSTALLING_UPDATES);
                }
            });
            if (!installedAnything) {
                performance.mark('splash-update-complete');
                const queryOptions = {};
                await newUpdater.startCurrentVersion(queryOptions);
                newUpdater.setRunningInBackground();
                newUpdater.collectGarbage();
                launchMainWindow();
                updateBackoff.succeed();
                updateSplashState(LAUNCHING);
                return;
            }
        }
        catch (e) {
            console.error('splashScreen: Update failed', e);
            await new Promise((resolve) => {
                const delayMs = updateBackoff.fail(() => resolve(false));
                splashState.seconds = Math.round(delayMs / 1000);
                updateSplashState(UPDATE_FAILURE);
            });
        }
    }
}
function initOldUpdater() {
    modulesListeners = {};
    addModulesListener(CHECKING_FOR_UPDATES, () => {
        console.log(`splashScreen: ${CHECKING_FOR_UPDATES}`);
        startUpdateTimeout();
        updateSplashState(CHECKING_FOR_UPDATES);
    });
    addModulesListener(UPDATE_CHECK_FINISHED, ({ succeeded, updateCount, manualRequired }) => {
        console.log(`splashScreen: ${UPDATE_CHECK_FINISHED} ${succeeded} ${updateCount} ${manualRequired}`);
        stopUpdateTimeout();
        if (updateCount > 0) {
            splashInstalledUpdates = true;
        }
        if (!succeeded) {
            scheduleUpdateCheck();
            updateSplashState(UPDATE_FAILURE);
        }
        else if (updateCount === 0) {
            performance.mark('splash-update-complete');
            moduleUpdater.setInBackground();
            launchMainWindow();
            updateSplashState(LAUNCHING);
        }
    });
    addModulesListener(DOWNLOADING_MODULE, ({ name, current, total }) => {
        console.log(`splashScreen: ${DOWNLOADING_MODULE} ${name} ${current} ${total}`);
        stopUpdateTimeout();
        splashState = { current, total };
        updateSplashState(DOWNLOADING_UPDATES);
    });
    addModulesListener(DOWNLOADING_MODULE_PROGRESS, ({ name, progress }) => {
        console.log(`splashScreen: ${DOWNLOADING_MODULE_PROGRESS} ${name} ${progress}`);
        splashState.progress = progress;
        updateSplashState(DOWNLOADING_UPDATES);
    });
    addModulesListener(DOWNLOADED_MODULE, ({ name, current, total, succeeded }) => {
        console.log(`splashScreen: ${DOWNLOADED_MODULE} ${name} ${current} ${total} ${succeeded}`);
        delete splashState.progress;
        if (name === 'host') {
            restartRequired = true;
        }
    });
    addModulesListener(DOWNLOADING_MODULES_FINISHED, ({ succeeded, failed }) => {
        console.log(`splashScreen: ${DOWNLOADING_MODULES_FINISHED} ${succeeded} ${failed}`);
        if (failed > 0) {
            scheduleUpdateCheck();
            updateSplashState(UPDATE_FAILURE);
        }
        else {
            process.nextTick(() => {
                if (restartRequired) {
                    moduleUpdater.quitAndInstallUpdates();
                }
                else {
                    moduleUpdater.installPendingUpdates();
                }
            });
        }
    });
    addModulesListener(NO_PENDING_UPDATES, () => {
        console.log(`splashScreen: ${NO_PENDING_UPDATES}`);
        moduleUpdater.checkForUpdates();
    });
    addModulesListener(INSTALLING_MODULE, ({ name, current, total }) => {
        console.log(`splashScreen: ${INSTALLING_MODULE} ${name} ${current} ${total}`);
        splashState = { current, total };
        updateSplashState(INSTALLING_UPDATES);
    });
    addModulesListener(INSTALLED_MODULE, ({ name, current, total, succeeded }) => {
        console.log(`splashScreen: ${INSTALLED_MODULE} ${name} ${current} ${total} ${succeeded}`);
        delete splashState.progress;
    });
    addModulesListener(INSTALLING_MODULE_PROGRESS, ({ name, progress }) => {
        console.log(`splashScreen: ${INSTALLING_MODULE_PROGRESS} ${name} ${progress}`);
        splashState.progress = progress;
        updateSplashState(INSTALLING_UPDATES);
    });
    addModulesListener(INSTALLING_MODULES_FINISHED, ({ succeeded, failed }) => {
        console.log(`splashScreen: ${INSTALLING_MODULES_FINISHED} ${succeeded} ${failed}`);
        moduleUpdater.checkForUpdates();
    });
    addModulesListener(UPDATE_MANUALLY, ({ newVersion }) => {
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
    newUpdater = (0, updater_1.getUpdater)();
    if (newUpdater == null) {
        initOldUpdater();
    }
    launchSplashWindow(startMinimized);
    quoteCachePath = path_1.default.join(paths.getUserData(), 'quotes.json');
    ipcMain_1.default.on('UPDATED_QUOTES', (_event, quotes) => cacheLatestQuotes(quotes));
}
function destroySplash() {
    performance.mark('splash-destroy-splashwindow');
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
        performance.measure('splash-window-duration', 'splash-window-launch');
        analytics.getDesktopTTI().trackSplashWindowDuration(splashInstalledUpdates);
        const entries = performance.getEntries();
        if (entries.length > 0) {
            console.log(`Main process startup timing:`);
            for (const e of entries) {
                const label = `|  ${e.name}:`.padEnd(50);
                if (e.entryType === 'mark') {
                    console.log(`${label} ${e.startTime.toFixed(2)}`);
                }
                else if (e.entryType === 'measure') {
                    console.log(`${label} ${(e.startTime + e.duration).toFixed(2)} (${e.duration.toFixed(2)})`);
                }
            }
        }
    }, 100);
}
function addModulesListener(event, listener) {
    if (newUpdater != null)
        return;
    modulesListeners[event] = listener;
    moduleUpdater.events.addListener(event, listener);
}
function removeModulesListeners() {
    if (newUpdater != null)
        return;
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
    webContentsSend(splashWindow, 'SPLASH_UPDATE_STATE', { status: event, ...splashState });
}
function resendSplashState() {
    if (lastSplashEventState == null) {
        console.error('splashScreen.resendSplashState: lastSplashEventState is null.');
        return;
    }
    updateSplashState(lastSplashEventState);
}
function launchSplashWindow(startMinimized) {
    performance.mark('splash-window-launch');
    analytics.getDesktopTTI().trackSplashWindowCreated();
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
            preload: path_1.default.join(__dirname, 'splashScreenPreload.js'),
        },
    };
    splashWindow = new electron_1.BrowserWindow(windowConfig);
    splashWindow.webContents.on('console-message', logger.ipcMainRendererLogger);
    splashWindow.webContents.on('will-navigate', (e) => e.preventDefault());
    splashWindow.webContents.setWindowOpenHandler((details) => {
        void (0, securityUtils_1.saferShellOpenExternal)(details.url);
        setTimeout(electron_1.app.quit, 500);
        return { action: 'deny' };
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
                electron_1.app.quit();
            }
        });
    }
    ipcMain_1.default.on('SPLASH_SCREEN_READY', () => {
        performance.mark('splash-screen-ready');
        console.log('splashScreen: SPLASH_SCREEN_READY');
        const cachedQuote = chooseCachedQuote();
        if (cachedQuote) {
            webContentsSend(splashWindow, 'SPLASH_SCREEN_QUOTE', cachedQuote);
        }
        if (splashWindow != null && !startMinimized) {
            splashWindow.showInactive();
            analytics.getDesktopTTI().trackSplashWindowShown();
        }
        if (newUpdater != null) {
            void updateUntilCurrent();
        }
        else {
            moduleUpdater.installPendingUpdates();
        }
    });
    ipcMain_1.default.on('SPLASH_SCREEN_QUIT', () => {
        console.log('splashScreen: SPLASH_SCREEN_QUIT');
        electron_1.app.quit();
    });
    const splashUrl = url_1.default.format({
        protocol: 'file',
        slashes: true,
        pathname: path_1.default.join(__dirname, 'splash', 'index.html'),
    });
    void splashWindow.loadURL(splashUrl);
    performance.measure('splash-window-loadurl-duration', 'splash-window-launch');
}
function launchMainWindow() {
    performance.mark('splash-launch-mainwindow');
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
    exports.events.emit(exports.APP_SHOULD_LAUNCH);
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
    process.nextTick(() => exports.events.emit(exports.APP_SHOULD_SHOW));
}
function cacheLatestQuotes(quotes) {
    fs_1.default.writeFile(quoteCachePath, JSON.stringify(quotes), (e) => {
        if (e != null) {
            console.warn('splashScreen: Failed updating quote cache with error: ', e);
        }
    });
}
function chooseCachedQuote() {
    let cachedQuote = null;
    try {
        const cachedQuotes = JSON.parse(fs_1.default.readFileSync(quoteCachePath, { encoding: 'utf8' }));
        cachedQuote = cachedQuotes[Math.floor(Math.random() * cachedQuotes.length)];
    }
    catch (_) { }
    return cachedQuote;
}
