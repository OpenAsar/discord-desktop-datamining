"use strict";

var _electron = _interopRequireDefault(require("electron"));
var _DiscordIPC = require("../common/DiscordIPC");
var _paths = require("../common/paths");
var _crashReporter = require("./crashReporter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const releaseChannel = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.APP_GET_RELEASE_CHANNEL_SYNC);
const hostVersion = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.APP_GET_HOST_VERSION_SYNC);
const buildNumber = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.APP_GET_BUILD_NUMBER);
const appArch = _DiscordIPC.DiscordIPC.renderer.sendSync(_DiscordIPC.IPCEvents.APP_GET_ARCH);
void (0, _crashReporter.updateCrashReporter)({
  nativeBuildNumber: (buildNumber === null || buildNumber === void 0 ? void 0 : buildNumber.toString()) ?? 'null'
});
let moduleVersions = {};
void _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_GET_MODULE_VERSIONS).then(versions => {
  moduleVersions = versions;
});
_electron.default.ipcRenderer.on('DISCORD_MODULE_INSTALLED', async () => {
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
function getAppArch() {
  return appArch;
}
function getModuleVersions() {
  return moduleVersions;
}
function setBadgeCount(count) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_SET_BADGE_COUNT, count);
}
function dockSetBadge(badge) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_DOCK_SET_BADGE, badge);
}
async function dockBounce(type) {
  await _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_DOCK_BOUNCE, type);
}
function dockCancelBounce(id) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_DOCK_CANCEL_BOUNCE, id);
}
function relaunch() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_RELAUNCH);
}
function getDefaultDoubleClickAction() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_GET_DEFAULT_DOUBLE_CLICK_ACTION);
}
function pauseFrameEvictor() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_PAUSE_FRAME_EVICTOR);
}
function unpauseFrameEvictor() {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.APP_UNPAUSE_FRAME_EVICTOR);
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
  getAppArch,
  getPath: _paths.getPath,
  setBadgeCount,
  dock: {
    setBadge: dockSetBadge,
    bounce: dockBounce,
    cancelBounce: dockCancelBounce
  },
  relaunch,
  getDefaultDoubleClickAction,
  pauseFrameEvictor,
  unpauseFrameEvictor,
  registerUserInteractionHandler
};