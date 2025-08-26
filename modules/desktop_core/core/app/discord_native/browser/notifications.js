"use strict";

var electron = _interopRequireWildcard(require("electron"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _appFeatures = require("../../appFeatures");
var _utils = require("../../utils");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function sendToAllWindows(channel, ...args) {
  electron.BrowserWindow.getAllWindows().forEach(win => {
    const contents = win.webContents;
    if (contents != null) {
      contents.send(channel, ...args);
    }
  });
}
if (_utils.isOSX) {
  let majorVersion;
  try {
    majorVersion = parseInt(_os.default.release().split('.')[0], 10);
  } catch (_e) {
    majorVersion = 0;
  }
  if (majorVersion >= 21 && moduleDataPath != null) {
    try {
      const modulePath = _path.default.join(moduleDataPath, 'discord_notifications');
      const lib = require(modulePath);
      lib.setDataPath(modulePath);
      lib.setCallbacks((action, identifier, userText, fallbackDeepLink) => {
        sendToAllWindows(_DiscordIPC.IPCEvents.NOTIFICATIONS_RECEIVED_RESPONSE, action, identifier, userText, fallbackDeepLink);
      }, () => {
        return ['badge', 'banner', 'list', 'sound'];
      }, identifier => {
        sendToAllWindows('USER_SETTINGS_OPEN', identifier, 'Notifications');
      });
      _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, async (_event, provisional) => {
        return await lib.getAuthorization(provisional);
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
      (0, _appFeatures.getFeatures)().declareSupported('notifications_provisional');
    } catch (e) {
      console.warn('discord_notifications setup failed with error: ', e);
    }
  }
} else if (_utils.isWindows && electron.Notification.isSupported()) {
  try {
    const lib = require('discord_notifications');
    if (lib == null) {
      console.warn('discord_notifications module not found.');
    } else {
      lib.setCallbacks((action, identifier, userText) => {
        sendToAllWindows(_DiscordIPC.IPCEvents.NOTIFICATIONS_RECEIVED_RESPONSE, action, identifier, userText);
      });
      _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, async () => {
        return await lib.getAuthorization();
      });
      _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_GET_SETTINGS, async () => {
        return await lib.getSettings();
      });
      _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION, async (_event, options) => {
        return await lib.showNotification(options);
      });
      _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS, async (_event, identifiers) => {
        return await lib.removeNotifications(identifiers);
      });
      _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS, async () => {
        return await lib.removeAllNotifications();
      });
      (0, _appFeatures.getFeatures)().declareSupported('notifications');
    }
  } catch (e) {
    console.warn('discord_notifications setup failed with error: ', e);
  }
}