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
exports.WEBAPP_ENDPOINT = void 0;
exports.getMainWindowId = getMainWindowId;
exports.webContentsSend = webContentsSend;
exports.init = init;
exports.handleOpenUrl = handleOpenUrl;
exports.setMainWindowVisible = setMainWindowVisible;
const electron_1 = __importStar(require("electron"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const Backoff_1 = __importDefault(require("../common/Backoff"));
const securityUtils_1 = require("../common/securityUtils");
const appBadge = __importStar(require("./appBadge"));
const appConfig = __importStar(require("./appConfig"));
const appSettings_1 = require("./bootstrapModules/appSettings");
const bootstrapModules_1 = require("./bootstrapModules/bootstrapModules");
const crashReporterSetup_1 = require("./bootstrapModules/crashReporterSetup");
const logger_1 = require("./bootstrapModules/logger");
const moduleUpdater_1 = require("./bootstrapModules/moduleUpdater");
const paths_1 = require("./bootstrapModules/paths");
const splashScreen_1 = require("./bootstrapModules/splashScreen");
const updater_1 = require("./bootstrapModules/updater");
const processUtils_1 = require("./discord_native/browser/processUtils");
const constants_1 = require("./discord_native/common/constants");
const ipcMain_1 = __importDefault(require("./ipcMain"));
const mouse = __importStar(require("./mouse"));
const networkDebugUtils_1 = require("./networkDebugUtils");
const popoutWindows = __importStar(require("./popoutWindows"));
const staffDevTools_1 = require("./staffDevTools");
const systemTray = __importStar(require("./systemTray"));
const thumbarButtons = __importStar(require("./thumbarButtons"));
const { buildInfo } = require('./bootstrapModules/buildInfo');
const Constants_1 = require("./Constants");
const BootstrapConstants = require('./Constants');
const settings = appSettings_1.appSettings.getSettings();
const connectionBackoff = new Backoff_1.default(1000, 20000);
const DISCORD_NAMESPACE = 'DISCORD_';
const envVariables = {
    disableRestart: process.env.DISCORD_DISABLE_RESTART,
    webappEndpoint: process.env.DISCORD_WEBAPP_ENDPOINT,
    test: process.env.DISCORD_TEST,
    networkDebugLog: process.env.DISCORD_NETWORK_DEBUG_LOG,
};
let webAppLoaded = false;
function checkCanMigrate() {
    return fs_1.default.existsSync(path_1.default.join(paths_1.paths.getUserData(), 'userDataCache.json'));
}
function checkAlreadyMigrated() {
    return fs_1.default.existsSync(path_1.default.join(paths_1.paths.getUserData(), 'domainMigrated'));
}
const getWebappEndpoint = () => {
    if (envVariables.webappEndpoint != null) {
        console.log(`Using DISCORD_WEBAPP_ENDPOINT override: ${envVariables.webappEndpoint}`);
        return envVariables.webappEndpoint;
    }
    let endpoint = settings?.get('WEBAPP_ENDPOINT');
    if (endpoint === false || endpoint == null) {
        if (buildInfo.releaseChannel === 'stable') {
            const canMigrate = checkCanMigrate();
            const alreadyMigrated = checkAlreadyMigrated();
            if (canMigrate || alreadyMigrated) {
                endpoint = 'https://discord.com';
            }
            else {
                endpoint = 'https://discordapp.com';
            }
        }
        else if (buildInfo.releaseChannel === 'development') {
            endpoint = 'https://canary.discord.com';
        }
        else {
            endpoint = `https://${buildInfo.releaseChannel}.discord.com`;
        }
    }
    return endpoint;
};
function getWebappLaunchPath() {
    const explicitSetting = settings?.get('WEBAPP_PATH', null);
    if (explicitSetting != null) {
        return explicitSetting;
    }
    const isConferenceModeEnabled = settings?.get('enableConferenceMode', false);
    return `${isConferenceModeEnabled ? Constants_1.WEBAPP_PATHS.CONFERENCE_MODE : Constants_1.WEBAPP_PATHS.APP}?_=${Date.now()}`;
}
exports.WEBAPP_ENDPOINT = getWebappEndpoint();
function getSanitizedPath(path) {
    return new url_1.default.URL(path, exports.WEBAPP_ENDPOINT).pathname;
}
function getSanitizedProtocolUrl(fullUrl) {
    try {
        const parsedURL = url_1.default.parse(fullUrl);
        if (parsedURL.protocol === 'discord:') {
            return {
                path: getSanitizedPath(parsedURL.path ?? ''),
                query: parsedURL.query ?? '',
            };
        }
    }
    catch (_) { }
    return null;
}
const WEBAPP_PATH = getWebappLaunchPath();
const URL_TO_LOAD = `${exports.WEBAPP_ENDPOINT}${WEBAPP_PATH}`;
const MIN_WIDTH = settings?.get('MIN_WIDTH', 940);
const MIN_HEIGHT = settings?.get('MIN_HEIGHT', 500);
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const MIN_VISIBLE_ON_SCREEN = 32;
const ENABLE_DEVTOOLS = buildInfo.releaseChannel === 'stable'
    ? settings?.get('DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING', false)
    : true;
const ENABLE_NET_DEBUG = envVariables.networkDebugLog?.toLowerCase() === 'true';
let mainWindow = null;
let mainWindowId = BootstrapConstants.DEFAULT_MAIN_WINDOW_ID;
let mainWindowInitialPath = null;
let mainWindowDidFinishLoad = false;
let mainWindowIsVisible = false;
let insideAuthFlow = false;
let lastCrashed = 0;
let lastCrashedNonRenderer = 0;
let lastPageLoadFailed = false;
const retryUpdateOptions = {
    skip_host_delta: false,
    skip_module_delta: {},
    skip_all_module_delta: false,
    allow_optional_updates: false,
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
        settings?.set('IS_MAXIMIZED', browserWindow.isMaximized());
        settings?.set('IS_MINIMIZED', browserWindow.isMinimized());
        if (!settings?.get('IS_MAXIMIZED') && !settings?.get('IS_MINIMIZED')) {
            settings?.set('WINDOW_BOUNDS', browserWindow.getBounds());
        }
        settings?.save();
    }
    catch (e) {
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
        }
        else {
            console.log(`mainScreen.setWindowVisible: didn't show. andUnminimize: ${andUnminimize}, isMinimized: ${isMinimized}.`);
        }
    }
    else {
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
    return displays.find((display) => {
        const displayBound = display.workArea;
        displayBound.x += MIN_VISIBLE_ON_SCREEN;
        displayBound.y += MIN_VISIBLE_ON_SCREEN;
        displayBound.width -= 2 * MIN_VISIBLE_ON_SCREEN;
        displayBound.height -= 2 * MIN_VISIBLE_ON_SCREEN;
        return doAABBsOverlap(bounds, displayBound);
    });
}
function getSavedWindowBounds() {
    if (!settings?.get('WINDOW_BOUNDS')) {
        return null;
    }
    const bounds = settings.get('WINDOW_BOUNDS');
    bounds.width = Math.max(MIN_WIDTH, bounds.width);
    bounds.height = Math.max(MIN_HEIGHT, bounds.height);
    const displays = electron_1.screen.getAllDisplays();
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
    if (savedWindowBounds != null
        && (currentBounds.height !== savedWindowBounds.height || currentBounds.width !== savedWindowBounds.width)) {
        mainWindow.setBounds(savedWindowBounds);
    }
}
function adjustWindowBounds(window) {
    const bounds = window.getBounds();
    const displays = electron_1.screen.getAllDisplays();
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
                const updater = updater_1.updater?.getUpdater();
                if (updater != null) {
                    void checkForUpdatesWithUpdater(updater);
                }
                else {
                    moduleUpdater_1.moduleUpdater.checkForUpdates();
                }
            },
            onTrayClicked: () => setWindowVisible(true, true),
            onOpenVoiceSettings: openVoiceSettings,
            onToggleMute: toggleMute,
            onToggleDeafen: toggleDeafen,
            onLaunchApplication: launchApplication,
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
    performance.mark('mainscreen-loadmainpage');
    bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowLoadStart();
    lastPageLoadFailed = false;
    mainWindow.loadURL(URL_TO_LOAD);
    setTimeout(() => {
        if (!webAppLoaded && Math.random() < 0.05) {
            const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
            if (sentry != null) {
                sentry.captureMessage('WebApp timed out loading (timeout=60s)');
            }
        }
    }, 60000);
};
const DEFAULT_BACKGROUND_COLOR = '#2f3136';
const BACKGROUND_COLOR_KEY = 'BACKGROUND_COLOR';
function getBackgroundColor() {
    return settings?.get(BACKGROUND_COLOR_KEY, DEFAULT_BACKGROUND_COLOR) ?? DEFAULT_BACKGROUND_COLOR;
}
function setBackgroundColor(color) {
    settings?.set(BACKGROUND_COLOR_KEY, color);
    mainWindow?.setBackgroundColor(color);
    settings?.save();
}
async function launchMainAppWindow(isVisible) {
    performance.mark('mainscreen-launch-window');
    if (mainWindow) {
        mainWindow.destroy();
    }
    const additionalArguments = ['--enable-node-leakage-in-renderers'];
    if (exports.WEBAPP_ENDPOINT.startsWith('http://') && !exports.WEBAPP_ENDPOINT.startsWith('http://localhost')) {
        console.log('Allowing insecure origin for development');
        additionalArguments.push(`--unsafely-treat-insecure-origin-as-secure=${exports.WEBAPP_ENDPOINT}`);
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
            preload: path_1.default.join(__dirname, 'mainScreenPreload.js'),
            spellcheck: true,
            contextIsolation: true,
            additionalArguments,
            devTools: ENABLE_DEVTOOLS,
        },
    };
    if (process.platform === 'linux') {
        mainWindowOptions.icon = path_1.default.join(path_1.default.dirname(electron_1.app.getPath('exe')), 'discord.png');
    }
    if (process.platform === 'darwin') {
        mainWindowOptions.titleBarStyle = 'hidden';
        mainWindowOptions.trafficLightPosition = { x: 9, y: 9 };
    }
    applyWindowBoundsToConfig(mainWindowOptions);
    bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowCreated();
    mainWindow = new electron_1.BrowserWindow(mainWindowOptions);
    mainWindowId = mainWindow.id;
    global.mainWindowId = mainWindowId;
    includeOptionalModule('./ElectronTestRpc', (module) => module.initialize(mainWindow));
    console.log(`Clearing GPU cache...`);
    try {
        await mainWindow.webContents.session.clearStorageData({
            storages: ['shadercache'],
        });
        console.log(`Clearing code cache...`);
        await mainWindow.webContents.session.clearCodeCaches({});
    }
    catch (error) {
        console.error('Failed to clear caches:', error);
    }
    restoreMainWindowBounds(mainWindow);
    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback, details) => {
        switch (permission) {
            case 'accessibility-events':
                callback(true);
                return;
            case 'notifications':
            case 'pointerLock':
                callback((0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, exports.WEBAPP_ENDPOINT));
                return;
            case 'fullscreen':
            case 'clipboard-sanitized-write':
                let result = false;
                if (details.isMainFrame) {
                    result = (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, exports.WEBAPP_ENDPOINT);
                }
                else {
                    result = true;
                }
                callback(result);
                return;
            case 'media':
                callback((0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID)
                    || (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID_V2)
                    || (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID_FACE_SCAN));
                return;
        }
        callback(false);
    });
    mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
        switch (permission) {
            case 'notifications':
            case 'fullscreen':
            case 'pointerLock':
            case 'clipboard-sanitized-write':
                if (details.isMainFrame || details.embeddingOrigin == null) {
                    return (0, securityUtils_1.checkUrlOriginMatches)(requestingOrigin, exports.WEBAPP_ENDPOINT);
                }
                else {
                    return (0, securityUtils_1.checkUrlOriginMatches)(details.embeddingOrigin, exports.WEBAPP_ENDPOINT);
                }
            case 'media':
                return ((0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID)
                    || (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID_V2)
                    || (0, securityUtils_1.checkUrlOriginMatches)(details.requestingUrl, Constants_1.AllowedMediaOrigins.K_ID_FACE_SCAN)
                    || (0, securityUtils_1.checkUrlOriginMatches)(requestingOrigin, exports.WEBAPP_ENDPOINT));
        }
        return false;
    });
    mainWindow.setMenuBarVisibility(false);
    if (settings?.get('IS_MAXIMIZED')) {
        mainWindow.maximize();
    }
    if (settings?.get('IS_MINIMIZED')) {
        mainWindow.minimize();
    }
    mainWindow.webContents.setWindowOpenHandler(({ url, frameName, features }) => {
        if (frameName.startsWith(DISCORD_NAMESPACE)
            && (0, securityUtils_1.checkUrlOriginMatches)(url, exports.WEBAPP_ENDPOINT)
            && getSanitizedPath(url) === '/popout') {
            return popoutWindows.openOrFocusWindow(url, frameName, features);
        }
        else if ((0, securityUtils_1.shouldOpenExternalUrl)(url)) {
            void (0, securityUtils_1.saferShellOpenExternal)(url);
        }
        return { action: 'deny' };
    });
    mainWindow.webContents.on('did-fail-load', (e, errCode, errDesc, validatedUrl) => {
        if (insideAuthFlow) {
            return;
        }
        if (validatedUrl !== URL_TO_LOAD) {
            return;
        }
        if (errCode === -3 || errCode === 0)
            return;
        lastPageLoadFailed = true;
        console.error('[WebContents] did-fail-load', errCode, errDesc, `retry in ${connectionBackoff.current} ms`);
        connectionBackoff.fail(() => {
            console.log('[WebContents] retrying load', URL_TO_LOAD);
            loadMainPage();
        });
    });
    mainWindow.webContents.on('did-create-window', (childWindow, { options, frameName }) => {
        const extendedWindow = childWindow;
        extendedWindow.setMenuBarVisibility(false);
        extendedWindow.windowKey = frameName;
        popoutWindows.setupPopout(extendedWindow, frameName, options, exports.WEBAPP_ENDPOINT);
        adjustWindowBounds(childWindow);
    });
    mainWindow.webContents.once('did-finish-load', () => {
        bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowDocumentLoad();
    });
    ipcMain_1.default.on(constants_1.IPCEvents.APP_ASYNC_INDEX_TSX_LOADED, () => {
        if (!mainWindowDidFinishLoad) {
            bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowLoadDuration();
        }
        console.log(`ipcMain.on(IPCEvents.APP_ASYNC_INDEX_TSX_LOADED) ${lastPageLoadFailed} ${mainWindowDidFinishLoad}`);
        if (insideAuthFlow
            && mainWindow.webContents
            && (0, securityUtils_1.checkUrlOriginMatches)(mainWindow.webContents.getURL(), exports.WEBAPP_ENDPOINT)) {
            insideAuthFlow = false;
        }
        mainWindowDidFinishLoad = true;
        if (ENABLE_NET_DEBUG) {
            const netLogger = logger_1.logger.networkDebugLogger();
            if (netLogger != null) {
                (0, networkDebugUtils_1.setupNetworkLogging)(mainWindow, netLogger);
            }
        }
        if (mainWindowInitialPath != null) {
            webContentsSend('MAIN_WINDOW_PATH', mainWindowInitialPath.path, mainWindowInitialPath.query);
            mainWindowInitialPath = null;
        }
        webContentsSend(mainWindow?.isFocused() ? 'MAIN_WINDOW_FOCUS' : 'MAIN_WINDOW_BLUR');
        if (!lastPageLoadFailed) {
            connectionBackoff.succeed();
            splashScreen_1.splashScreen.pageReady();
            if (settings?.get(staffDevTools_1._STAFF_DEV_TOOLS_KEY, false)) {
                (0, staffDevTools_1.tryLoadStaffDevToolsModule)(mainWindow, exports.WEBAPP_ENDPOINT).catch((e) => {
                    const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
                    sentry?.captureMessage(`[STAFF_DEV_TOOLS] Unexpected error: ${e instanceof Error ? e.message : e}`);
                });
            }
        }
    });
    mainWindow.webContents.on('render-process-gone', (e, details) => {
        const reason = details?.reason ?? 'Unknown';
        const killed = reason === 'killed';
        processUtils_1.processUtilsSettings.rendererCrashReason = reason;
        processUtils_1.processUtilsSettings.rendererCrashExitCode = details?.exitCode ?? null;
        processUtils_1.processUtilsSettings.lastRunsStoredInformation = processUtils_1.processUtilsSettings.currentStoredInformation;
        processUtils_1.processUtilsSettings.currentStoredInformation = {};
        if (killed) {
            electron_1.app.quit();
            return;
        }
        const crashTime = Date.now();
        if (crashTime - lastCrashed < 5 * 1000) {
            console.error(`[WebContents] double crashed (reason: ${reason}, exitCode: ${details?.exitCode})... RIP =(`);
            electron_1.app.quit();
            return;
        }
        lastCrashed = crashTime;
        console.error(`[WebContents] crashed (reason: ${reason}, exitCode: ${details?.exitCode})... reloading`);
        if (envVariables.disableRestart != null) {
            electron_1.app.quit();
            return;
        }
        mainWindow.webContents.reload();
    });
    mainWindow.webContents.on('will-navigate', (evt, url) => {
        if (!insideAuthFlow && !(0, securityUtils_1.checkUrlOriginMatches)(url, exports.WEBAPP_ENDPOINT)) {
            evt.preventDefault();
        }
    });
    mainWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        if ((0, securityUtils_1.checkUrlOriginMatches)(oldUrl, exports.WEBAPP_ENDPOINT)
            && (0, securityUtils_1.checkUrlOriginMatches)(newUrl, 'https://accounts.google.com/')) {
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
        if (mainWindow == null) {
            return;
        }
        let parsedUrl;
        try {
            parsedUrl = url_1.default.parse(eventUrl);
        }
        catch (_) {
            return;
        }
        if (parsedUrl?.pathname === '/login') {
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
    if (logger_1.logger != null) {
        mainWindow.webContents.on('console-message', logger_1.logger.ipcMainRendererLogger);
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
        mainWindow.on('close', (e) => {
            if (mainWindow != null) {
                if (mainWindow.isFullScreen()) {
                    mainWindow.setFullScreen(false);
                }
                else {
                    webContentsSend('MAIN_WINDOW_HIDDEN');
                    electron_1.default.Menu.sendActionToFirstResponder('hide:');
                }
                e.preventDefault();
            }
            return false;
        });
    }
    performance.mark('mainscreen-launch-window-misc-setup');
    setupSystemTray();
    setupAppBadge();
    setupAppConfig();
    setupPopouts();
    thumbarButtons.init();
    mouse.init();
    performance.measure('mainscreen-launch-window-misc-setup-duration', 'mainscreen-launch-window-misc-setup');
    if (process.platform === 'linux' || process.platform === 'win32') {
        systemTray.show();
        mainWindow.on('close', (e) => {
            if (mainWindow == null) {
                popoutWindows.closePopouts();
                return;
            }
            webContentsSend('MAIN_WINDOW_BLUR');
            saveWindowConfig(mainWindow);
            if (!settings?.get('MINIMIZE_TO_TRAY', true)) {
                electron_1.app.quit();
                return;
            }
            webContentsSend('MAIN_WINDOW_HIDDEN');
            setWindowVisible(false, false);
            e.preventDefault();
        });
    }
    loadMainPage();
    performance.measure('mainscreen-launch-window-duration', 'mainscreen-launch-window');
}
let updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
function includeOptionalModule(path, cb) {
    try {
        const module = require(path);
        if (cb != null) {
            cb(module);
        }
        console.log(`Module ${path} was included.`);
        return module;
    }
    catch (e) {
        if (e?.code === 'MODULE_NOT_FOUND') {
            console.log(`Optional module ${path} was not included.`);
        }
        else {
            console.error(`Failed to initialize ${path}`, e);
            console.error(`e.toString() ${e.toString()}`);
        }
    }
    return undefined;
}
function handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired) {
    if (!succeeded) {
        updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
        webContentsSend(Constants_1.UpdaterEvents.UPDATE_ERROR);
        return;
    }
    if (updateCount === 0) {
        updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
    }
    else if (manualRequired) {
        updaterState = Constants_1.UpdaterEvents.UPDATE_MANUALLY;
    }
    else {
        updaterState = Constants_1.UpdaterEvents.UPDATE_AVAILABLE;
    }
    webContentsSend(updaterState);
}
function handleModuleUpdateDownloadProgress(name, progress) {
    if (mainWindow) {
        mainWindow.setProgressBar(progress);
    }
    webContentsSend(Constants_1.UpdaterEvents.MODULE_INSTALL_PROGRESS, name, progress);
}
function handleModuleUpdateDownloadsFinished(succeeded, failed) {
    if (mainWindow) {
        mainWindow.setProgressBar(-1);
    }
    if (updaterState === Constants_1.UpdaterEvents.UPDATE_AVAILABLE) {
        if (failed > 0) {
            updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
            webContentsSend(Constants_1.UpdaterEvents.UPDATE_ERROR);
        }
        else {
            updaterState = Constants_1.UpdaterEvents.UPDATE_DOWNLOADED;
            webContentsSend(updaterState);
        }
    }
}
function handleModuleUpdateInstalledModule(name, current, total, succeeded) {
    if (mainWindow) {
        mainWindow.setProgressBar(-1);
    }
    webContentsSend(Constants_1.UpdaterEvents.MODULE_INSTALLED, name, succeeded);
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
async function checkForUpdatesWithUpdater(updater, options) {
    const allowMultipleUpdates = options?.allowMultipleUpdates ?? false;
    if (updaterState === Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE || allowMultipleUpdates) {
        setUpdaterState(Constants_1.UpdaterEvents.CHECKING_FOR_UPDATES);
        try {
            let installedAnything = false;
            const progressCallback = (progress) => {
                const task = progress.task.HostInstall || progress.task.ModuleInstall;
                if (task != null && progress.state === 'Complete') {
                    if (!installedAnything) {
                        installedAnything = true;
                        setUpdaterState(Constants_1.UpdaterEvents.UPDATE_AVAILABLE);
                    }
                }
                if (task != null && progress.state.Failed != null) {
                    if (progress.task.HostInstall != null) {
                        retryUpdateOptions.skip_host_delta = true;
                    }
                    else if (progress.task.ModuleInstall != null) {
                        retryUpdateOptions.skip_module_delta[task.version.module.name] = true;
                    }
                }
            };
            if (updater.updateToLatestWithOptions) {
                await updater.updateToLatestWithOptions(retryUpdateOptions, progressCallback);
            }
            else {
                await updater.updateToLatest(progressCallback);
            }
            setUpdaterState(installedAnything ? Constants_1.UpdaterEvents.UPDATE_DOWNLOADED : Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE);
        }
        catch (e) {
            console.error('Update to latest failed: ', e);
            updaterState = Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE;
            webContentsSend(Constants_1.UpdaterEvents.UPDATE_ERROR);
        }
    }
    else {
        webContentsSend(updaterState);
    }
}
const analyticsState = {
    ready: false,
    cached: [],
};
function setupAnalyticsEvents() {
    bootstrapModules_1.analytics?.getAnalytics()?.on('event', (event) => {
        if (analyticsState.ready) {
            webContentsSend(Constants_1.AnalyticsEvents.APP_PUSH_ANALYTICS, [event]);
        }
        else {
            analyticsState.cached.push(event);
        }
    });
    ipcMain_1.default.on(Constants_1.AnalyticsEvents.APP_GET_ANALYTICS_EVENTS, (_event) => {
        const a = bootstrapModules_1.analytics?.getAnalytics();
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
        webContentsSend(Constants_1.AnalyticsEvents.APP_PUSH_ANALYTICS, events);
    });
    ipcMain_1.default.on(Constants_1.AnalyticsEvents.APP_VIEWED, (_event) => {
        const a = bootstrapModules_1.analytics?.getDesktopTTI?.();
        if (a == null) {
            return;
        }
        a.trackMainWindowJSAppLoadDuration();
        a.trackFullTTI();
    });
    ipcMain_1.default.on(Constants_1.AnalyticsEvents.APP_LOADED, (_event) => {
        performance.measure('mainscreen-loadmainpage-duration', 'mainscreen-loadmainpage');
        webAppLoaded = true;
    });
    let fullInteractiveTTIMs = null;
    ipcMain_1.default.on(Constants_1.AnalyticsEvents.APP_FIRST_RENDER_AFTER_READY_PAYLOAD, (_event) => {
        fullInteractiveTTIMs = Math.ceil(process.uptime() * 1_000);
        const a = bootstrapModules_1.analytics?.getDesktopTTI?.();
        if (a == null) {
            return;
        }
        if (process.platform !== 'linux') {
            a.trackMainWindowJSAppInteractiveDuration();
            a.trackFullInteractiveTTI();
        }
        webContentsSend('APP_GET_MAIN_BUNDLE_STATS');
    });
    ipcMain_1.default.on(constants_1.IPCEvents.APP_MAIN_BUNDLE_STATS, (_event, bundleStats) => {
        bootstrapModules_1.analytics?.getDesktopTTI?.().trackDetailedTTI(bundleStats, fullInteractiveTTIMs);
    });
}
function setupUpdaterEventsWithUpdater(updater) {
    electron_1.app.on(Constants_1.MenuEvents.CHECK_FOR_UPDATES, () => checkForUpdatesWithUpdater(updater));
    ipcMain_1.default.on(Constants_1.UpdaterEvents.CHECK_FOR_UPDATES, (_evt, options) => {
        return checkForUpdatesWithUpdater(updater, options);
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.QUIT_AND_INSTALL, () => {
        saveWindowConfig(mainWindow);
        mainWindow = null;
        try {
            moduleUpdater_1.moduleUpdater.quitAndInstallUpdates();
        }
        catch (e) {
            electron_1.app.relaunch();
            electron_1.app.quit();
        }
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE, () => {
        if (updater.queryAndTruncateHistory != null) {
            webContentsSend(Constants_1.UpdaterEvents.UPDATER_HISTORY_RESPONSE, updater.queryAndTruncateHistory());
        }
        else {
            webContentsSend(Constants_1.UpdaterEvents.UPDATER_HISTORY_RESPONSE, []);
        }
    });
}
function setupLegacyUpdaterEvents() {
    electron_1.app.on(Constants_1.MenuEvents.CHECK_FOR_UPDATES, () => moduleUpdater_1.moduleUpdater.checkForUpdates());
    moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.CHECKING_FOR_UPDATES, () => {
        updaterState = Constants_1.UpdaterEvents.CHECKING_FOR_UPDATES;
        webContentsSend(updaterState);
    });
    if (moduleUpdater_1.moduleUpdater.supportsEventObjects) {
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.UPDATE_CHECK_FINISHED, ({ succeeded, updateCount, manualRequired, }) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.UPDATE_CHECK_FINISHED}`);
            handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULE_PROGRESS, ({ name, progress }) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULE_PROGRESS} ${name} ${progress}`);
            handleModuleUpdateDownloadProgress(name, progress);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULES_FINISHED, ({ succeeded, failed }) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULES_FINISHED} ${succeeded} ${failed}`);
            handleModuleUpdateDownloadsFinished(succeeded, failed);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.INSTALLED_MODULE, ({ name, current, total, succeeded }) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.INSTALLED_MODULE} ${name} ${current} ${total} ${succeeded}`);
            handleModuleUpdateInstalledModule(name, current, total, succeeded);
        });
    }
    else {
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.UPDATE_CHECK_FINISHED, (succeeded, updateCount, manualRequired) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.UPDATE_CHECK_FINISHED} ${succeeded} ${updateCount} ${manualRequired}`);
            handleModuleUpdateCheckFinished(succeeded, updateCount, manualRequired);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULE_PROGRESS, (name, progress) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULE_PROGRESS} ${name} ${progress}`);
            handleModuleUpdateDownloadProgress(name, progress);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULES_FINISHED, (succeeded, failed) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.DOWNLOADING_MODULES_FINISHED} ${succeeded} ${failed}`);
            handleModuleUpdateDownloadsFinished(succeeded, failed);
        });
        moduleUpdater_1.moduleUpdater.events.on(moduleUpdater_1.moduleUpdater.INSTALLED_MODULE, (name, current, total, succeeded) => {
            console.log(`legacyModuleUpdater: ${moduleUpdater_1.moduleUpdater.INSTALLED_MODULE} ${name} ${current} ${total} ${succeeded}`);
            handleModuleUpdateInstalledModule(name, current, total, succeeded);
        });
    }
    ipcMain_1.default.on(Constants_1.UpdaterEvents.CHECK_FOR_UPDATES, () => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.CHECK_FOR_UPDATES} ${updaterState}`);
        if (updaterState === Constants_1.UpdaterEvents.UPDATE_NOT_AVAILABLE) {
            moduleUpdater_1.moduleUpdater.checkForUpdates();
        }
        else {
            webContentsSend(updaterState);
        }
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.QUIT_AND_INSTALL, () => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.QUIT_AND_INSTALL} ${updaterState}`);
        saveWindowConfig(mainWindow);
        mainWindow = null;
        try {
            moduleUpdater_1.moduleUpdater.quitAndInstallUpdates();
        }
        catch (e) {
            electron_1.app.relaunch();
            electron_1.app.quit();
        }
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.MODULE_INSTALL, (_event, name) => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.MODULE_INSTALL} ${name}`);
        moduleUpdater_1.moduleUpdater.install(name, false);
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.MODULE_QUERY, (_event, name) => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.MODULE_QUERY} ${name}`);
        webContentsSend(Constants_1.UpdaterEvents.MODULE_INSTALLED, name, moduleUpdater_1.moduleUpdater.isInstalled(name, undefined));
    });
    ipcMain_1.default.on(Constants_1.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE, () => {
        console.log(`mainScreen.UpdaterEvents: ${Constants_1.UpdaterEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE}`);
        webContentsSend(Constants_1.UpdaterEvents.UPDATER_HISTORY_RESPONSE, moduleUpdater_1.moduleUpdater.events.history);
        moduleUpdater_1.moduleUpdater.events.history = [];
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
    electron_1.screen.on('display-added', handleDisplayChange);
    electron_1.screen.on('display-removed', handleDisplayChange);
    electron_1.screen.on('display-metrics-changed', handleDisplayChange);
    electron_1.app.on('window-all-closed', () => {
        if (envVariables.test != null) {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('before-quit', () => {
        saveWindowConfig(mainWindow);
        mainWindow = null;
    });
    electron_1.app.on('child-process-gone', (_event, details) => {
        if (details.exitCode === 0) {
            return;
        }
        const serviceDescription = `${details.type} (${details.name})`;
        console.error(`child-process-gone! child: ${serviceDescription} exitCode: ${details.exitCode}`);
        if (details.type === 'GPU' || details.type === 'Utility') {
            const crashTime = performance.now();
            if (crashTime - lastCrashedNonRenderer > 30_000) {
                webContentsSend('CRASH_REPORTER_NEW_CRASH', details);
            }
            else {
                console.error(`Detected frequent crash for non-renderer process`);
            }
            lastCrashedNonRenderer = crashTime;
        }
        const { reason } = details;
        if (reason === 'crashed' || reason === 'oom') {
            const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
            if (sentry != null) {
                const skipSentryCapture = details.type === 'Utility' && details.exitCode === -1073741205;
                if (!skipSentryCapture) {
                    sentry.captureMessage(`'${details.type}' process exited with '${details.reason}' with exitcode '${details.exitCode}'`);
                }
            }
        }
    });
    electron_1.app.on(Constants_1.MenuEvents.OPEN_HELP, () => webContentsSend('HELP_OPEN'));
    electron_1.app.on(Constants_1.MenuEvents.OPEN_SETTINGS, () => webContentsSend('USER_SETTINGS_OPEN'));
    electron_1.app.on('second-instance', (_event, args) => {
        if (args?.indexOf('--squirrel-uninstall') > -1) {
            return;
        }
        if (process.argv?.slice(1).includes('--multi-instance')) {
            return;
        }
        if (mainWindow == null || mainWindow.isDestroyed()) {
            return;
        }
        setWindowVisible(true, false);
        mainWindow.focus();
    });
    ipcMain_1.default.on('SETTINGS_UPDATE_BACKGROUND_COLOR', (_event, backgroundColor) => {
        if (getBackgroundColor() !== backgroundColor) {
            setBackgroundColor(backgroundColor);
        }
    });
    ipcMain_1.default.on(constants_1.IPCEvents.WINDOW_SET_TRAFFIC_LIGHT_POSITION, (_event, position) => {
        if (process.platform !== 'darwin')
            return;
        if (mainWindow == null || mainWindow.isDestroyed())
            return;
        try {
            mainWindow.setWindowButtonPosition(position);
        }
        catch (e) {
            console.error('Failed to set traffic light position', e);
        }
    });
    ipcMain_1.default.on(constants_1.IPCEvents.NAVIGATION_HISTORY_CLEAR, () => {
        if (mainWindow != null && !mainWindow.isDestroyed()) {
            mainWindow.webContents.navigationHistory?.clear();
        }
    });
    ipcMain_1.default.on('OPEN_EXTERNAL_URL', (_event, externalUrl) => {
        (0, securityUtils_1.saferShellOpenExternal)(externalUrl).catch((_) => {
            console.error('Failed to open external URL', externalUrl);
        });
    });
    setupAnalyticsEvents();
    const updater = updater_1.updater?.getUpdater();
    if (updater != null) {
        setupUpdaterEventsWithUpdater(updater);
    }
    else {
        setupLegacyUpdaterEvents();
    }
    void launchMainAppWindow(false);
}
function handleOpenUrl(url) {
    const sanitizedUrl = getSanitizedProtocolUrl(url);
    if (sanitizedUrl != null) {
        if (!mainWindowDidFinishLoad) {
            mainWindowInitialPath = {
                path: sanitizedUrl.path,
                query: sanitizedUrl.query,
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
    if (visible) {
        bootstrapModules_1.analytics?.getDesktopTTI?.().trackMainWindowShown();
    }
    setWindowVisible(visible, false);
}
