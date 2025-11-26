"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectBuildInfo = injectBuildInfo;
exports.injectModuleUpdater = injectModuleUpdater;
exports.injectUpdater = injectUpdater;
var _electron = _interopRequireDefault(require("electron"));
var process = _interopRequireWildcard(require("process"));
var _DiscordIPC = require("../common/DiscordIPC");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let injectedBuildInfo = null;
let injectedModuleUpdater = null;
let injectedUpdater = null;
function injectBuildInfo(buildInfo) {
  injectedBuildInfo = buildInfo;
}
function injectModuleUpdater(moduleUpdater) {
  injectedModuleUpdater = moduleUpdater;
}
function injectUpdater(updater) {
  injectedUpdater = updater;
}
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.APP_GET_RELEASE_CHANNEL_SYNC, event => {
  event.returnValue = injectedBuildInfo.releaseChannel;
});
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.APP_GET_HOST_VERSION_SYNC, event => {
  event.returnValue = _electron.default.app.getVersion();
});
async function newUpdaterGetModuleVersions(updater) {
  return (await updater.queryCurrentVersionsWithOptions({})).current_modules;
}
function newUpdaterGetBuildNumber(updater) {
  const version = updater.queryCurrentVersionsWithOptionsSync({});
  if (version.running_update != null) {
    return version.running_update.metadata_version;
  }
  return version.last_successful_update.metadata_version;
}
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.APP_GET_BUILD_NUMBER, event => {
  var _injectedUpdater;
  const newUpdater = (_injectedUpdater = injectedUpdater) === null || _injectedUpdater === void 0 ? void 0 : _injectedUpdater.getUpdater();
  if (newUpdater != null) {
    event.returnValue = newUpdaterGetBuildNumber(newUpdater);
    return;
  }
  event.returnValue = null;
});
_DiscordIPC.DiscordIPC.main.on(_DiscordIPC.IPCEvents.APP_GET_ARCH, event => {
  event.returnValue = process.arch;
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_GET_MODULE_VERSIONS, async () => {
  var _injectedUpdater2;
  const newUpdater = (_injectedUpdater2 = injectedUpdater) === null || _injectedUpdater2 === void 0 ? void 0 : _injectedUpdater2.getUpdater();
  if (newUpdater != null) {
    return newUpdaterGetModuleVersions(newUpdater);
  }
  const versions = {};
  const installed = injectedModuleUpdater != null ? injectedModuleUpdater.getInstalled() : {};
  for (const name of Object.keys(installed)) {
    versions[name] = installed[name].installedVersion;
  }
  return versions;
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_GET_PATH, async (_, path) => {
  return _electron.default.app.getPath(path);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_SET_BADGE_COUNT, async (_, count) => {
  _electron.default.app.setBadgeCount(count);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_DOCK_SET_BADGE, async (_, badge) => {
  if (_electron.default.app.dock != null) {
    _electron.default.app.dock.setBadge(badge);
  }
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_DOCK_BOUNCE, async (_, type) => {
  if (_electron.default.app.dock != null) {
    return _electron.default.app.dock.bounce(type);
  } else {
    return -1;
  }
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_DOCK_CANCEL_BOUNCE, async (_, id) => {
  if (_electron.default.app.dock != null) {
    _electron.default.app.dock.cancelBounce(id);
  }
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_RELAUNCH, async () => {
  _electron.default.app.relaunch();
  _electron.default.app.exit(0);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_GET_DEFAULT_DOUBLE_CLICK_ACTION, async () => {
  return _electron.default.systemPreferences.getUserDefault('AppleActionOnDoubleClick', 'string');
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_PAUSE_FRAME_EVICTOR, async () => {
  var _pauseFrameEvictionMa, _ref;
  return (_pauseFrameEvictionMa = (_ref = _electron.default.app).pauseFrameEvictionManager) === null || _pauseFrameEvictionMa === void 0 ? void 0 : _pauseFrameEvictionMa.call(_ref);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_UNPAUSE_FRAME_EVICTOR, async () => {
  var _unpauseFrameEviction, _ref2;
  return (_unpauseFrameEviction = (_ref2 = _electron.default.app).unpauseFrameEvictionManager) === null || _unpauseFrameEviction === void 0 ? void 0 : _unpauseFrameEviction.call(_ref2);
});
_DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.APP_GET_PREFERRED_SYSTEM_LANGUAGES, async () => {
  return _electron.default.app.getPreferredSystemLanguages();
});