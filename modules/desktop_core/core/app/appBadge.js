"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasInit = void 0;
exports.init = init;
var _electron = require("electron");
var _utils = require("./utils");
var _mainScreen = require("./mainScreen");
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let hasInit = false;
exports.hasInit = hasInit;
let lastIndex;
let appIcons;
function init() {
  if (process.platform !== 'win32') return;
  if (hasInit) {
    console.warn('appBadge: Has already init! Cancelling init.');
    return;
  }
  exports.hasInit = hasInit = true;
  lastIndex = null;
  appIcons = [];
  for (let i = 1; i <= 11; i++) {
    appIcons.push((0, _utils.exposeModuleResource)(`app/images/badges`, `badge-${i}.ico`));
  }
  _ipcMain.default.on('APP_BADGE_SET', (_event, count) => setAppBadge(count));
}
function setAppBadge(count) {
  const win = _electron.BrowserWindow.fromId((0, _mainScreen.getMainWindowId)());
  const {
    index,
    description
  } = getOverlayIconData(count);
  if (lastIndex !== index) {
    if (index == null) {
      win.setOverlayIcon(null, description);
    } else {
      win.setOverlayIcon(appIcons[index], description);
    }
    lastIndex = index;
  }
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