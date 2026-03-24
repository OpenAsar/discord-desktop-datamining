"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invoke = invoke;
exports.on = on;
exports.send = send;
var electron = _interopRequireWildcard(require("electron"));
var _constants = require("../common/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ipcRenderer = electron.ipcRenderer;
const RENDERER_IPC_SEND_WHITELIST = new Set([_constants.IPCEvents.APP_ASYNC_INDEX_TSX_LOADED, _constants.IPCEvents.APP_BADGE_SET, _constants.IPCEvents.APP_FIRST_RENDER_AFTER_READY_PAYLOAD, _constants.IPCEvents.APP_GET_ANALYTICS_EVENTS, _constants.IPCEvents.APP_LOADED, _constants.IPCEvents.APP_PUSH_ANALYTICS, _constants.IPCEvents.APP_VIEWED, _constants.IPCEvents.CHECK_FOR_UPDATES, _constants.IPCEvents.NAVIGATION_HISTORY_CLEAR, _constants.IPCEvents.NOTIFICATION_CLOSE, _constants.IPCEvents.NOTIFICATION_SHOW, _constants.IPCEvents.NOTIFICATIONS_CLEAR, _constants.IPCEvents.OPEN_EXTERNAL_URL, _constants.IPCEvents.QUIT_AND_INSTALL, _constants.IPCEvents.SETTINGS_UPDATE_BACKGROUND_COLOR, _constants.IPCEvents.SYSTEM_TRAY_SET_ICON, _constants.IPCEvents.SYSTEM_TRAY_SET_APPLICATIONS, _constants.IPCEvents.THUMBAR_BUTTONS_UPDATE, _constants.IPCEvents.TOGGLE_MINIMIZE_TO_TRAY, _constants.IPCEvents.TOGGLE_OPEN_ON_STARTUP, _constants.IPCEvents.TOGGLE_START_MINIMIZED, _constants.IPCEvents.UPDATE_OPEN_ON_STARTUP, _constants.IPCEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE, _constants.IPCEvents.UPDATED_QUOTES, _constants.IPCEvents.WINDOW_SET_TRAFFIC_LIGHT_POSITION]);
const RENDERER_IPC_INVOKE_WHITELIST = new Set([_constants.IPCEvents.APP_GET_ANALYTICS_EVENTS, _constants.IPCEvents.GET_MOUSE_COORDINATES, _constants.IPCEvents.INTENTS_SET_ACTIVITY, _constants.IPCEvents.INTENTS_RESIGN_ACTIVITY, _constants.IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, _constants.IPCEvents.NOTIFICATIONS_GET_SETTINGS, _constants.IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION, _constants.IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS, _constants.IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS, _constants.IPCEvents.SEARCH_INDEX_DOMAINS, _constants.IPCEvents.SEARCH_CLEAR_INDEX, _constants.IPCEvents.SEARCH_DELETE_DOMAINS, _constants.IPCEvents.SEARCH_DELETE_ITEMS]);
function send(ev, ...args) {
  const prefixedEvent = (0, _constants.getDiscordIPCEvent)(ev);
  if (!RENDERER_IPC_SEND_WHITELIST.has(prefixedEvent)) {
    throw new Error('cannot send this event');
  }
  ipcRenderer.send(prefixedEvent, ...args);
}
function on(ev, callback) {
  ipcRenderer.on((0, _constants.getDiscordIPCEvent)(ev), function () {
    callback.apply(callback, [null, ...[...arguments].slice(1)]);
  });
}
function invoke(ev, ...args) {
  const prefixedEvent = (0, _constants.getDiscordIPCEvent)(ev);
  if (!RENDERER_IPC_INVOKE_WHITELIST.has(prefixedEvent)) {
    throw new Error('cannot invoke this event');
  }
  return ipcRenderer.invoke(prefixedEvent, ...args);
}