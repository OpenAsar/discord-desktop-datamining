"use strict";

var _electron = _interopRequireDefault(require("electron"));

var _paths = require("../common/paths");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  APP_GET_RELEASE_CHANNEL_SYNC,
  APP_GET_HOST_VERSION_SYNC,
  APP_GET_MODULE_VERSIONS,
  APP_GET_BUILD_NUMBER,
  APP_SET_BADGE_COUNT,
  APP_DOCK_SET_BADGE,
  APP_DOCK_BOUNCE,
  APP_DOCK_CANCEL_BOUNCE,
  APP_RELAUNCH,
  APP_GET_DEFAULT_DOUBLE_CLICK_ACTION
} = require('../common/constants').IPCEvents;

const releaseChannel = _electron.default.ipcRenderer.sendSync(APP_GET_RELEASE_CHANNEL_SYNC);

const hostVersion = _electron.default.ipcRenderer.sendSync(APP_GET_HOST_VERSION_SYNC);

const buildNumber = _electron.default.ipcRenderer.sendSync(APP_GET_BUILD_NUMBER);

let moduleVersions = {};

_electron.default.ipcRenderer.invoke(APP_GET_MODULE_VERSIONS).then(versions => {
  moduleVersions = versions;
});

_electron.default.ipcRenderer.on('DISCORD_MODULE_INSTALLED', async _ => {
  moduleVersions = await _electron.default.ipcRenderer.invoke(APP_GET_MODULE_VERSIONS);
});

function getReleaseChannel() {
  return releaseChannel;
}

function getVersion() {
  return hostVersion;
}

function getBuildNumber() {
  return buildNumber;
}

function getModuleVersions() {
  return moduleVersions;
}

async function setBadgeCount(count) {
  _electron.default.ipcRenderer.invoke(APP_SET_BADGE_COUNT, count);
}

async function dockSetBadge(badge) {
  _electron.default.ipcRenderer.invoke(APP_DOCK_SET_BADGE, badge);
}

async function dockBounce(type) {
  return _electron.default.ipcRenderer.invoke(APP_DOCK_BOUNCE, type);
}

async function dockCancelBounce(id) {
  _electron.default.ipcRenderer.invoke(APP_DOCK_CANCEL_BOUNCE, id);
}

async function relaunch() {
  _electron.default.ipcRenderer.invoke(APP_RELAUNCH);
}

async function getDefaultDoubleClickAction() {
  return _electron.default.ipcRenderer.invoke(APP_GET_DEFAULT_DOUBLE_CLICK_ACTION);
}

function registerUserInteractionHandler(elementId, eventType, callback) {
  const element = document.getElementById(elementId);

  if (element == null) {
    throw new Error(`Element with id '${elementId}' was not found`);
  }

  function handleUserInteraction(ev) {
    if (!ev.isTrusted) {
      return;
    }

    callback(ev);
  }

  element.addEventListener(eventType, handleUserInteraction);
  return () => {
    element.removeEventListener(eventType, handleUserInteraction);
  };
}

module.exports = {
  getReleaseChannel,
  getVersion,
  getModuleVersions,
  getBuildNumber,
  getPath: _paths.getPath,
  // used via DiscordNative.remoteApp.getPath
  setBadgeCount,
  dock: {
    setBadge: dockSetBadge,
    bounce: dockBounce,
    cancelBounce: dockCancelBounce
  },
  relaunch,
  getDefaultDoubleClickAction,
  registerUserInteractionHandler
};