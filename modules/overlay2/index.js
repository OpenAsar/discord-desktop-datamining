"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _overlay_module = _interopRequireDefault(require("./overlay_module"));
var _out_of_process = _interopRequireDefault(require("./out_of_process"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// eslint-disable-next-line import/no-unresolved, import/extensions

var isOverlayContext = typeof window !== 'undefined' && window != null && window.__OVERLAY__ || document.getElementById('__OVERLAY__SENTINEL__') != null || /overlay/.test(window.location.pathname);
var isElectronRenderer = typeof window !== 'undefined' && window != null && window.DiscordNative && window.DiscordNative.isRenderer;
var features = isElectronRenderer ? window.DiscordNative.features : global.features;
var clickZoneCallback;
var interceptInput = false;
var imeExclusiveFullscreenCallback;
var perfInfoCallback;

// [adill] indicates that the race condition between createHostProcess and connectProcess is fixed. remove ~7/2019.
features.declareSupported('create_host_on_attach');
function eventHandler(pid, event) {
  if (event.message === 'click_zone_event') {
    if (clickZoneCallback) {
      clickZoneCallback(event.name, event.x, event.y);
    }
  } else if (event.message === 'ime_exclusive_fullscreen') {
    if (imeExclusiveFullscreenCallback) {
      imeExclusiveFullscreenCallback();
    }
  } else if (event.message === 'perf_info') {
    if (perfInfoCallback) {
      perfInfoCallback(event.data);
    }
  }
}
_overlay_module["default"]._setEventHandler(eventHandler);
if (isOverlayContext) {
  var _require = require('url'),
    URL = _require.URL;
  var url = new URL(window.location);
  var pid = parseInt(url.searchParams.get('pid'));
  _overlay_module["default"].connectProcess(pid);
  _overlay_module["default"].rendererStarted = function () {
    _overlay_module["default"].sendCommand(pid, {
      message: 'notify_renderer_started'
    });
  };
}
_overlay_module["default"].setClickZoneCallback = function (callback) {
  clickZoneCallback = callback;
};
// NOTE: deprecated. Use `sendCommand` instead.
_overlay_module["default"].setInputLocked = function (locked) {
  interceptInput = !locked;
  var payload = {
    message: 'intercept_input',
    intercept: interceptInput
  };
  _overlay_module["default"].broadcastCommand(payload);
};
_overlay_module["default"].setImeExclusiveFullscreenCallback = function (callback) {
  imeExclusiveFullscreenCallback = callback;
};
_overlay_module["default"].setPerfInfoCallback = function (callback) {
  perfInfoCallback = callback;
};
_overlay_module["default"].OutOfProcess = _out_of_process["default"];
var _default = _overlay_module["default"];
exports["default"] = _default;
module.exports = exports.default;
