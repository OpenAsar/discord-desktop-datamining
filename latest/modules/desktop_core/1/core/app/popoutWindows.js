"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closePopouts = closePopouts;
exports.getWindow = getWindow;
exports.hasInit = void 0;
exports.init = init;
exports.openOrFocusWindow = openOrFocusWindow;
exports.setupPopout = setupPopout;

var _electron = require("electron");

var _securityUtils = require("../common/securityUtils");

var _appFeatures = require("./appFeatures");

const ALLOWED_FEATURES = ['width', 'height', 'left', 'top', 'resizable', 'movable', 'alwaysOnTop', 'frame', 'transparent', 'hasShadow', 'closable', 'skipTaskbar', 'backgroundColor', 'menubar', 'toolbar', 'location', 'directories', 'titleBarStyle'];
const MIN_POPOUT_WIDTH = 320;
const MIN_POPOUT_HEIGHT = 180;
const DEFAULT_POPOUT_OPTIONS = {
  title: 'Discord Popout',
  backgroundColor: '#2f3136',
  minWidth: MIN_POPOUT_WIDTH,
  minHeight: MIN_POPOUT_HEIGHT,
  transparent: false,
  frame: process.platform === 'linux',
  resizable: true,
  show: true,
  titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
  trafficLightPosition: process.platform === 'darwin' ? {
    x: 10,
    y: 3
  } : undefined,
  webPreferences: {
    nodeIntegration: false,
    nativeWindowOpen: true,
    enableRemoteModule: false,
    contextIsolation: true
  }
};
const features = (0, _appFeatures.getFeatures)();
let hasInit = false;
exports.hasInit = hasInit;
let popoutWindows = {};

function init() {
  if (hasInit) {
    console.warn('popoutWindows: Has already init! Cancelling init.');
    return;
  }

  exports.hasInit = hasInit = true;
  features.declareSupported('popout_windows');
}

function focusWindow(window) {
  if (window == null) return; // The focus call is not always respected.
  // This uses a hack defined in https://github.com/electron/electron/issues/2867

  window.setAlwaysOnTop(true);
  window.focus();
  window.setAlwaysOnTop(false);
}

function getWindow(key) {
  return popoutWindows[key];
}

function parseFeatureValue(feature) {
  if (feature === 'yes') {
    return true;
  } else if (feature === 'no') {
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
      return { ...acc,
        [curr]: getKey(curr)
      };
    }

    return acc;
  }, {});
}

function parseWindowFeatures(features) {
  const keyValuesParsed = features.split(',');
  const parsedFeatures = keyValuesParsed.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    return { ...acc,
      [key]: parseFeatureValue(value)
    };
  }, {});
  return filterWindowFeatures(key => parsedFeatures.hasOwnProperty(key), key => parsedFeatures[key]);
}

function openOrFocusWindow(windowURL, key, features) {
  const existingWindow = popoutWindows[key];

  if (existingWindow != null) {
    focusWindow(existingWindow);
    return {
      action: 'deny'
    };
  }

  return {
    action: 'allow',
    overrideBrowserWindowOptions: { ...DEFAULT_POPOUT_OPTIONS,
      ...parseWindowFeatures(features)
    }
  };
}

function setupPopout(popoutWindow, key, options, webappEndpoint) {
  popoutWindow.windowKey = key;
  popoutWindows[popoutWindow.windowKey] = popoutWindow;
  /**
   * Do not allow navigation to arbitrary domains.
   */

  popoutWindow.webContents.on('will-navigate', (evt, url) => {
    if (!(0, _securityUtils.checkUrlOriginMatches)(url, webappEndpoint)) {
      evt.preventDefault();
    }
  });
  /**
   * Any window.open or links within the popout window should just open externally.
   */

  popoutWindow.webContents.setWindowOpenHandler(({
    url
  }) => {
    (0, _securityUtils.saferShellOpenExternal)(url); // Even if this opens the url, we still want to deny since we want to open in the user's browser,
    // not the electron app

    return {
      action: 'deny'
    };
  });
  /**
   * Handle events for our new window
   *
   * NOTE: Wanted to handle 'always-on-top-changed' and send to client but currently
   * the event seems to not fire.
   * */

  popoutWindow.once('closed', () => {
    popoutWindow.removeAllListeners();
    delete popoutWindows[popoutWindow.windowKey];
  });
}

function closePopouts() {
  Object.values(popoutWindows).forEach(popoutWindow => popoutWindow.close());
  popoutWindows = {};
}