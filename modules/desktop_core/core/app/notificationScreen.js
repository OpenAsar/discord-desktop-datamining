"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NOTIFICATION_CLICK = void 0;
exports.close = close;
exports.hasInit = exports.events = void 0;
exports.init = init;
exports.setMainWindow = setMainWindow;
var _electron = require("electron");
var _events = require("events");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _url = _interopRequireDefault(require("url"));
var _ipcMain = _interopRequireDefault(require("./ipcMain"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IPC_NOTIFICATIONS_CLEAR = 'NOTIFICATIONS_CLEAR';
const IPC_NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';
const IPC_NOTIFICATION_CLICK = 'NOTIFICATION_CLICK';
const IPC_NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE';
const events = new _events.EventEmitter();
exports.events = events;
const NOTIFICATION_CLICK = 'notification-click';
exports.NOTIFICATION_CLICK = NOTIFICATION_CLICK;
let hasInit = false;
exports.hasInit = hasInit;
const variablesFilePath = _path.default.join(__dirname, 'notifications', 'variables.json');
let mainWindow;
let title;
let maxVisible;
let screenPosition;
let notifications;
let hideTimeout;
let notificationWindow;
let VARIABLES;
function isDestroyed(win) {
  if (win == null || win.isDestroyed()) {
    console.error(`notificationScreen.webContentsSend: win is invalid ${win.isDestroyed()}.`);
    return true;
  }
  if (win.webContents == null || win.webContents.isDestroyed()) {
    console.error(`notificationScreen.webContentsSend: webContents is invalid ${win.webContents.isDestroyed()}.`);
    return true;
  }
  return false;
}
function webContentsSend(win, event, ...args) {
  if (!isDestroyed(win)) {
    win.webContents.send(`DISCORD_${event}`, ...args);
  }
}
function init({
  mainWindow: _mainWindow,
  title: _title,
  maxVisible: _maxVisible,
  screenPosition: _screenPosition
}) {
  if (hasInit) {
    console.warn('notificationScreen: Has already init! Cancelling init.');
    return;
  }
  exports.hasInit = hasInit = true;
  VARIABLES = JSON.parse(_fs.default.readFileSync(variablesFilePath));
  mainWindow = _mainWindow;
  title = _title;
  maxVisible = _maxVisible;
  screenPosition = _screenPosition;
  notifications = [];
  hideTimeout = null;
  _ipcMain.default.on(IPC_NOTIFICATIONS_CLEAR, handleNotificationsClear);
  _ipcMain.default.on(IPC_NOTIFICATION_SHOW, handleNotificationShow);
  _ipcMain.default.on(IPC_NOTIFICATION_CLICK, handleNotificationClick);
  _ipcMain.default.on(IPC_NOTIFICATION_CLOSE, handleNotificationClose);
}
function destroyWindow() {
  if (notificationWindow == null) return;
  notificationWindow.hide();
  notificationWindow.close();
  notificationWindow = null;
}
function close() {
  mainWindow = null;
  destroyWindow();
  _ipcMain.default.removeListener(IPC_NOTIFICATIONS_CLEAR, handleNotificationsClear);
  _ipcMain.default.removeListener(IPC_NOTIFICATION_SHOW, handleNotificationShow);
  _ipcMain.default.removeListener(IPC_NOTIFICATION_CLICK, handleNotificationClick);
  _ipcMain.default.removeListener(IPC_NOTIFICATION_CLOSE, handleNotificationClose);
}
function setMainWindow(_mainWindow) {
  mainWindow = _mainWindow;
}
function handleNotificationsClear() {
  notifications = [];
  updateNotifications();
}
function handleNotificationShow(e, notification) {
  notifications.push(notification);
  updateNotifications();
}
function handleNotificationClick(e, notificationId) {
  webContentsSend(mainWindow, IPC_NOTIFICATION_CLICK, notificationId);
  events.emit(NOTIFICATION_CLICK);
}
function handleNotificationClose(e, notificationId) {
  if (notificationWindow) {
    webContentsSend(notificationWindow, 'FADE_OUT', notificationId);
  }
  setTimeout(() => {
    notifications = notifications.filter(notification => notification.id !== notificationId);
    updateNotifications();
  }, VARIABLES.outDuration);
}
function updateNotifications() {
  if (notifications.length > 0) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
    if (notificationWindow == null) {
      createWindow();
      return;
    }
    if (isDestroyed(notificationWindow)) {
      return;
    }
    const boundingBox = calculateBoundingBox();
    if (boundingBox == null) {
      return;
    }
    const {
      width,
      height,
      x,
      y
    } = boundingBox;
    notificationWindow.setSize(width, height);
    notificationWindow.setPosition(x, y);
    notificationWindow.showInactive();
  } else if (hideTimeout == null) {
    hideTimeout = setTimeout(() => destroyWindow(), VARIABLES.outDuration * 1.1);
  }
  if (notificationWindow != null) {
    webContentsSend(notificationWindow, 'UPDATE', notifications.slice(0, maxVisible));
  }
}
function calculateBoundingBox() {
  if (mainWindow == null || mainWindow.isDestroyed()) {
    return null;
  }
  const [positionX, positionY] = mainWindow.getPosition();
  const [windowWidth, windowHeight] = mainWindow.getSize();
  const centerPoint = {
    x: Math.round(positionX + windowWidth / 2),
    y: Math.round(positionY + windowHeight / 2)
  };
  const activeDisplay = _electron.screen.getDisplayNearestPoint(centerPoint) || _electron.screen.getPrimaryDisplay();
  const workArea = activeDisplay.workArea;
  const width = VARIABLES.width;
  const height = maxVisible * VARIABLES.height;
  const x = workArea.x + workArea.width - width;
  let y;
  switch (screenPosition) {
    case 'top':
      y = workArea.y;
      break;
    case 'bottom':
      y = workArea.y + workArea.height - height;
      break;
  }
  return {
    x,
    y,
    width,
    height
  };
}
function createWindow() {
  if (notificationWindow != null) {
    return;
  }
  notificationWindow = new _electron.BrowserWindow({
    title: title,
    frame: false,
    resizable: false,
    show: false,
    acceptFirstMouse: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      preload: _path.default.join(__dirname, 'notificationScreenPreload.js'),
      enableRemoteModule: false,
      contextIsolation: true
    }
  });
  const notificationUrl = _url.default.format({
    protocol: 'file',
    slashes: true,
    pathname: _path.default.join(__dirname, 'notifications', 'index.html')
  });
  notificationWindow.loadURL(notificationUrl);
  notificationWindow.webContents.on('did-finish-load', () => updateNotifications());
}