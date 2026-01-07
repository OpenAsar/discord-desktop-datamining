"use strict";

const electron = require('electron');
const {
  getDiscordIPCEvent,
  IPCEvents
} = require('../common/constants');
const ipcRenderer = electron.ipcRenderer;
const RENDERER_IPC_SEND_WHITELIST = new Set([IPCEvents.APP_ASYNC_INDEX_TSX_LOADED, IPCEvents.APP_BADGE_SET, IPCEvents.APP_FIRST_RENDER_AFTER_READY_PAYLOAD, IPCEvents.APP_GET_ANALYTICS_EVENTS, IPCEvents.APP_LOADED, IPCEvents.APP_PUSH_ANALYTICS, IPCEvents.APP_VIEWED, IPCEvents.CHECK_FOR_UPDATES, IPCEvents.NOTIFICATION_CLOSE, IPCEvents.NOTIFICATION_SHOW, IPCEvents.NOTIFICATIONS_CLEAR, IPCEvents.OPEN_EXTERNAL_URL, IPCEvents.QUIT_AND_INSTALL, IPCEvents.SETTINGS_UPDATE_BACKGROUND_COLOR, IPCEvents.SYSTEM_TRAY_SET_ICON, IPCEvents.SYSTEM_TRAY_SET_APPLICATIONS, IPCEvents.THUMBAR_BUTTONS_UPDATE, IPCEvents.TOGGLE_MINIMIZE_TO_TRAY, IPCEvents.TOGGLE_OPEN_ON_STARTUP, IPCEvents.TOGGLE_START_MINIMIZED, IPCEvents.UPDATE_OPEN_ON_STARTUP, IPCEvents.UPDATER_HISTORY_QUERY_AND_TRUNCATE, IPCEvents.UPDATED_QUOTES, IPCEvents.WINDOW_SET_TRAFFIC_LIGHT_POSITION]);
const RENDERER_IPC_INVOKE_WHITELIST = new Set([IPCEvents.APP_GET_ANALYTICS_EVENTS, IPCEvents.GET_MOUSE_COORDINATES, IPCEvents.INTENTS_SET_ACTIVITY, IPCEvents.INTENTS_RESIGN_ACTIVITY, IPCEvents.NOTIFICATIONS_GET_AUTHORIZATION, IPCEvents.NOTIFICATIONS_GET_SETTINGS, IPCEvents.NOTIFICATIONS_SEND_NOTIFICATION, IPCEvents.NOTIFICATIONS_REMOVE_NOTIFICATIONS, IPCEvents.NOTIFICATIONS_REMOVE_ALL_NOTIFICATIONS, IPCEvents.SEARCH_INDEX_DOMAINS, IPCEvents.SEARCH_CLEAR_INDEX, IPCEvents.SEARCH_DELETE_DOMAINS, IPCEvents.SEARCH_DELETE_ITEMS]);
function send(ev, ...args) {
  const prefixedEvent = getDiscordIPCEvent(ev);
  if (!RENDERER_IPC_SEND_WHITELIST.has(prefixedEvent)) {
    throw new Error('cannot send this event');
  }
  ipcRenderer.send(prefixedEvent, ...args);
}
function on(ev, callback) {
  ipcRenderer.on(getDiscordIPCEvent(ev), function () {
    callback.apply(callback, [null, ...[...arguments].slice(1)]);
  });
}
function invoke(ev, ...args) {
  const prefixedEvent = getDiscordIPCEvent(ev);
  if (!RENDERER_IPC_INVOKE_WHITELIST.has(prefixedEvent)) {
    throw new Error('cannot invoke this event');
  }
  return ipcRenderer.invoke(prefixedEvent, ...args);
}
module.exports = {
  send,
  on,
  invoke
};