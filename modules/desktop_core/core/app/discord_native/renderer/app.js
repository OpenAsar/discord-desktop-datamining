"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
var _paths = require("../common/paths");
var _crashReporter = require("./crashReporter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const releaseChannel = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.APP_GET_RELEASE_CHANNEL_SYNC);
const hostVersion = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.APP_GET_HOST_VERSION_SYNC);
const buildNumber = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.APP_GET_BUILD_NUMBER);
(0, _crashReporter.updateCrashReporter)({
  nativeBuildNumber: (buildNumber === null || buildNumber === void 0 ? void 0 : buildNumber.toString()) ?? 'null'
});
let moduleVersions = {};
_DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_GET_MODULE_VERSIONS).then(versions => {
  moduleVersions = versions;
});

// TODO: Fix this .on to be part of our typing.
_electron.default.ipcRenderer.on('DISCORD_MODULE_INSTALLED', async _ => {
  moduleVersions = await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_GET_MODULE_VERSIONS);
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
function setBadgeCount(count) {
  _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_SET_BADGE_COUNT, count);
  return Promise.resolve();
}
function dockSetBadge(badge) {
  _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_DOCK_SET_BADGE, badge);
  return Promise.resolve();
}
function dockBounce(type) {
  _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_DOCK_BOUNCE, type);
  return Promise.resolve();
}
function dockCancelBounce(id) {
  _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_DOCK_CANCEL_BOUNCE, id);
  return Promise.resolve();
}
function relaunch() {
  _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_RELAUNCH);
  return Promise.resolve();
}
function getDefaultDoubleClickAction() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_GET_DEFAULT_DOUBLE_CLICK_ACTION);
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