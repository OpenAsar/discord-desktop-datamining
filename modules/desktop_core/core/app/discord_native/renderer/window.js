"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USE_OSX_NATIVE_TRAFFIC_LIGHTS = void 0;
exports.blur = blur;
exports.close = close;
exports.flashFrame = flashFrame;
exports.focus = focus;
exports.fullscreen = fullscreen;
exports.getMediaSourceId = getMediaSourceId;
exports.getNativeHandle = getNativeHandle;
exports.isAlwaysOnTop = isAlwaysOnTop;
exports.maximize = maximize;
exports.minimize = minimize;
exports.restore = restore;
exports.setAlwaysOnTop = setAlwaysOnTop;
exports.setBackgroundThrottling = setBackgroundThrottling;
exports.setContentProtection = setContentProtection;
exports.setDevtoolsCallbacks = setDevtoolsCallbacks;
exports.setMinimumSize = setMinimumSize;
exports.setProgressBar = setProgressBar;
exports.setZoomFactor = setZoomFactor;
exports.supportsContentProtection = supportsContentProtection;
var _electron = _interopRequireDefault(require("electron"));
var _processUtils = require("../../../common/processUtils");
var _DiscordIPC = require("../common/DiscordIPC");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let devtoolsOpenedCallback = () => {};
let devtoolsClosedCallback = () => {};
_DiscordIPC.DiscordIPC.renderer.on(_DiscordIPC.IPCEvents.WINDOW_DEVTOOLS_OPENED, () => {
  var _devtoolsOpenedCallba;
  (_devtoolsOpenedCallba = devtoolsOpenedCallback) === null || _devtoolsOpenedCallba === void 0 ? void 0 : _devtoolsOpenedCallba();
});
_DiscordIPC.DiscordIPC.renderer.on(_DiscordIPC.IPCEvents.WINDOW_DEVTOOLS_CLOSED, () => {
  var _devtoolsClosedCallba;
  (_devtoolsClosedCallba = devtoolsClosedCallback) === null || _devtoolsClosedCallba === void 0 ? void 0 : _devtoolsClosedCallba();
});
function flashFrame(flag) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_FLASH_FRAME, flag);
}
function minimize(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_MINIMIZE, key);
}
function restore(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_RESTORE, key);
}
function maximize(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_MAXIMIZE, key);
}
function focus(_hack, key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_FOCUS, key);
}
function setAlwaysOnTop(key, enabled) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_SET_ALWAYS_ON_TOP, key, enabled);
}
function isAlwaysOnTop(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_IS_ALWAYS_ON_TOP, key);
}
function blur(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_BLUR, key);
}
function setProgressBar(progress, key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_SET_PROGRESS_BAR, key ?? null, progress);
}
function fullscreen(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_TOGGLE_FULLSCREEN, key);
}
function close(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_CLOSE, key);
}
function setMinimumSize(width, height) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_SET_MINIMUM_SIZE, width, height);
}
function setZoomFactor(factor) {
  _electron.default.webFrame.setZoomFactor(factor / 100);
}
function setBackgroundThrottling(enabled) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_SET_BACKGROUND_THROTTLING, enabled);
}
function setDevtoolsCallbacks(onOpened, onClosed) {
  devtoolsOpenedCallback = onOpened;
  devtoolsClosedCallback = onClosed;
}
function supportsContentProtection() {
  return _processUtils.IS_WIN;
}
function setContentProtection(enabled) {
  if (!supportsContentProtection()) {
    console.log('setContentProtection: Unsupported platform.');
    return Promise.resolve();
  }
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_SET_CONTENT_PROTCTION, enabled);
}
function getNativeHandle(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_GET_NATIVE_HANDLE, key);
}
function getMediaSourceId(key) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WINDOW_GET_MEDIA_SOURCE_ID, key);
}
const USE_OSX_NATIVE_TRAFFIC_LIGHTS = true;
exports.USE_OSX_NATIVE_TRAFFIC_LIGHTS = USE_OSX_NATIVE_TRAFFIC_LIGHTS;