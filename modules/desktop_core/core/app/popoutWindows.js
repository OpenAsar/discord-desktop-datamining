"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInit = void 0;
exports.init = init;
exports.getWindow = getWindow;
exports.getAllWindows = getAllWindows;
exports.setNewWindowEvent = setNewWindowEvent;
exports.openOrFocusWindow = openOrFocusWindow;
exports.setupPopout = setupPopout;
exports.closePopouts = closePopouts;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const securityUtils_1 = require("../common/securityUtils");
const appFeatures_1 = require("./appFeatures");
const ALLOWED_FEATURES = [
    'width',
    'height',
    'left',
    'top',
    'resizable',
    'movable',
    'alwaysOnTop',
    'frame',
    'transparent',
    'hasShadow',
    'closable',
    'skipTaskbar',
    'backgroundColor',
    'menubar',
    'toolbar',
    'location',
    'directories',
    'titleBarStyle',
    'outOfProcessOverlay',
    'focusable',
];
const MIN_POPOUT_WIDTH = 320;
const MIN_POPOUT_HEIGHT = 180;
const DEFAULT_POPOUT_OPTIONS = {
    title: 'Discord Popout',
    backgroundColor: '#2f3136',
    minWidth: MIN_POPOUT_WIDTH,
    minHeight: MIN_POPOUT_HEIGHT,
    transparent: false,
    frame: false,
    resizable: true,
    show: true,
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
    trafficLightPosition: process.platform === 'darwin' ? { x: 12, y: 5 } : undefined,
    webPreferences: {
        nodeIntegration: false,
        nativeWindowOpen: true,
        enableRemoteModule: false,
        contextIsolation: true,
    },
};
const features = (0, appFeatures_1.getFeatures)();
exports.hasInit = false;
let popoutWindows = {};
let newWindowEvent = () => { };
function init() {
    if (exports.hasInit) {
        console.warn('popoutWindows: Has already init! Cancelling init.');
        return;
    }
    exports.hasInit = true;
    features.declareSupported('popout_windows');
}
function focusWindow(window) {
    if (window == null)
        return;
    window.setAlwaysOnTop(true);
    window.focus();
    window.setAlwaysOnTop(false);
}
function getWindow(key) {
    return popoutWindows[key];
}
function getAllWindows() {
    return Object.values(popoutWindows);
}
function setNewWindowEvent(event) {
    newWindowEvent = event;
}
function parseFeatureValue(feature) {
    if (feature === 'yes') {
        return true;
    }
    else if (feature === 'no') {
        return false;
    }
    const parsedNumber = Number.parseInt(feature);
    if (!Number.isNaN(parsedNumber)) {
        return parsedNumber;
    }
    return feature;
}
function filterWindowFeatures(hasKey, getKey) {
    return ALLOWED_FEATURES.reduce((acc, curr) => {
        if (hasKey(curr)) {
            return {
                ...acc,
                [curr]: getKey(curr),
            };
        }
        return acc;
    }, {});
}
function parseWindowFeatures(features) {
    const keyValuesParsed = features.split(',');
    const parsedFeatures = {};
    for (const feature of keyValuesParsed) {
        const [key, value] = feature.split('=');
        parsedFeatures[key] = parseFeatureValue(value);
    }
    return filterWindowFeatures((key) => parsedFeatures.hasOwnProperty(key), (key) => parsedFeatures[key]);
}
function openOrFocusWindow(_windowURL, key, features) {
    const windowOptions = {
        ...DEFAULT_POPOUT_OPTIONS,
        ...parseWindowFeatures(features),
    };
    const existingWindow = popoutWindows[key];
    if (existingWindow != null) {
        if (!windowOptions.outOfProcessOverlay) {
            focusWindow(existingWindow);
        }
        return { action: 'deny' };
    }
    if (windowOptions.outOfProcessOverlay) {
        const rect = {
            x: 0,
            y: 0,
            width: 1280,
            height: 720,
        };
        for (const { bounds } of electron_1.screen.getAllDisplays()) {
            rect.x = Math.min(bounds.x, rect.x);
            rect.y = Math.min(bounds.y, rect.y);
        }
        windowOptions.x = rect.x - rect.width;
        windowOptions.y = rect.y - rect.height;
        windowOptions.width = rect.width;
        windowOptions.height = rect.height;
        windowOptions.resizable = true;
        windowOptions.title = 'Discord Overlay';
        windowOptions.show = false;
        windowOptions.backgroundColor = '#00000000';
        windowOptions.type = 'toolbar';
        windowOptions.alwaysOnTop = true;
        windowOptions.skipTaskbar = true;
        windowOptions.webPreferences = windowOptions.webPreferences ?? {};
        windowOptions.webPreferences.preload = path_1.default.join(__dirname, 'mainScreenPreload.js');
        windowOptions.frame = false;
        windowOptions.transparent = true;
        windowOptions.webPreferences.backgroundThrottling = false;
        windowOptions.paintWhenInitiallyHidden = true;
    }
    return { action: 'allow', overrideBrowserWindowOptions: windowOptions };
}
function setupPopout(popoutWindow, key, options, webappEndpoint) {
    if (options.outOfProcessOverlay) {
        popoutWindow.on('will-resize', (event, _newBounds, _details) => {
            event.preventDefault();
        });
    }
    popoutWindows[popoutWindow.windowKey] = popoutWindow;
    popoutWindow.webContents.on('will-navigate', (evt, url) => {
        if (!(0, securityUtils_1.checkUrlOriginMatches)(url, webappEndpoint)) {
            evt.preventDefault();
        }
    });
    popoutWindow.webContents.setWindowOpenHandler(({ url }) => {
        void (0, securityUtils_1.saferShellOpenExternal)(url);
        return { action: 'deny' };
    });
    popoutWindow.once('closed', () => {
        popoutWindow.removeAllListeners();
        delete popoutWindows[popoutWindow.windowKey];
    });
    newWindowEvent(popoutWindow);
}
function closePopouts() {
    Object.values(popoutWindows).forEach((popoutWindow) => popoutWindow.close());
    popoutWindows = {};
}
