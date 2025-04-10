"use strict";

var electron = _interopRequireWildcard(require("electron"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _appFeatures = require("../../appFeatures");
var _utils = require("../../utils");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let majorVersion;
try {
  majorVersion = parseInt(_os.default.release().split('.')[0], 10);
} catch (_e) {
  majorVersion = 0;
}
function sendToAllWindows(channel, ...args) {
  electron.BrowserWindow.getAllWindows().forEach(win => {
    const contents = win.webContents;
    if (contents != null) {
      contents.send(channel, ...args);
    }
  });
}
if (_utils.isOSX && majorVersion >= 21 && moduleDataPath != null) {
  try {
    const modulePath = _path.default.join(moduleDataPath, 'discord_notifications');
    const lib = require(modulePath);
    lib.setDataPath(modulePath);
    lib.setCallbacks((action, identifier, userText) => {
      sendToAllWindows(_DiscordIPC.IPCEvents.NOTIFICATIONS_RECEIVED_RESPONSE, action, identifier, userText);
    }, () => {
      return ['badge', 'banner', 'list', 'sound'];
    }, identifier => {
      sendToAllWindows('USER_SETTINGS_OPEN', 'Notifications', identifier);
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, async () => {
      return await lib.getAuthorization();
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_GET_SETTINGS, async () => {
      return await lib.getSettings();
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION, async (_event, options) => {
      return await lib.sendNotification(options);
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS, (_event, identifiers) => {
      lib.removeNotifications(identifiers);
      return Promise.resolve();
    });
    _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS, () => {
      lib.removeAllNotifications();
      return Promise.resolve();
    });
    (0, _appFeatures.getFeatures)().declareSupported('notifications');
  } catch (e) {
    console.warn('discord_notifications setup failed with error: ', e);
  }
}