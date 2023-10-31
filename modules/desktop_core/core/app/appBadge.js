"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasInit = void 0;
exports.init = init;
exports.refreshAppBadge = refreshAppBadge;
var _electron = require("electron");
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
var _mainScreen = require("./mainScreen");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let hasInit = false;
exports.hasInit = hasInit;
let lastIndex = null;
let lastCount = null;
const appIcons = [];
function isSupported() {
  return process.platform === 'win32';
}
function init() {
  if (!isSupported()) return;
  if (hasInit) {
    console.warn('appBadge: Has already init! Cancelling init.');
    return;
  }
  exports.hasInit = hasInit = true;
  lastIndex = null;
  for (let i = 1; i <= 11; i++) {
    const fullPath = (0, _utils.exposeModuleResource)(`app/images/badges`, `badge-${i}.ico`);
    const appIcon = fullPath !== null ? _electron.nativeImage.createFromPath(fullPath) : null;
    appIcons.push(appIcon);
  }
  _ipcMain.default.on('APP_BADGE_SET', (_event, count) => setAppBadge(count, false));
}
function refreshAppBadge() {
  if (!isSupported() || lastCount == null) return;
  setAppBadge(lastCount, true);
}
function setAppBadge(count, force) {
  const win = _electron.BrowserWindow.fromId((0, _mainScreen.getMainWindowId)());
  if (win == null || win.isDestroyed()) {
    return;
  }
  const {
    index,
    description
  } = getOverlayIconData(count);
  if (force || lastIndex !== index) {
    if (index == null) {
      win.setOverlayIcon(null, description);
    } else {
      win.setOverlayIcon(appIcons[index], description);
    }
    lastIndex = index;
  }
  lastCount = count;
}
function getOverlayIconData(count) {
  if (count === -1) {
    return {
      index: 10,
      description: `Unread messages`
    };
  }
  if (count === 0) {
    return {
      index: null,
      description: 'No Notifications'
    };
  }
  const index = Math.max(1, Math.min(count, 10)) - 1;
  return {
    index,
    description: `${index} notifications`
  };
}