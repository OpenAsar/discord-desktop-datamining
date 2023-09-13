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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  return (await updater.queryCurrentVersions()).current_modules;
}
function newUpdaterGetBuildNumber(updater) {
  const version = updater.queryCurrentVersionsSync();
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
  if (process.arch === 'ia32') {
    event.returnValue = 'x86';
    return;
  }
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