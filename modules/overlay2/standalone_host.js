"use strict";

var _electron = require("electron");
var _path = _interopRequireDefault(require("path"));
var _process = _interopRequireDefault(require("process"));
var _FeatureFlags = _interopRequireDefault(require("./FeatureFlags"));
var _host = require("./host");
var _overlay_module = _interopRequireDefault(require("./overlay_module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_process["default"].on('uncaughtException', function (e) {
  var _e$stack;
  _overlay_module["default"].logMessage("Overlay host process exception: ".concat(e.message));
  _overlay_module["default"].logMessage((_e$stack = e.stack) !== null && _e$stack !== void 0 ? _e$stack : '');
});
global.features = new _FeatureFlags["default"]();
global.mainAppDirname = __dirname;
global.features.declareSupported('overlay-hidpi');
_electron.app.disableHardwareAcceleration();
_electron.app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
_electron.app.whenReady().then(function () {
  var buildInfo = require(_path["default"].join(_process["default"].resourcesPath, 'build_info.json'));

  // eslint-disable import/no-unresolved
  require('discord_desktop_core/core.asar/app/discord_native/browser/accessibility');
  var app = require('discord_desktop_core/core.asar/app/discord_native/browser/app');
  app.injectBuildInfo(buildInfo);
  require('discord_desktop_core/core.asar/app/discord_native/browser/clipboard');
  require('discord_desktop_core/core.asar/app/discord_native/browser/constants');
  var _require = require('discord_desktop_core/core.asar/app/bootstrapModules/crashReporterSetup'),
    crashReporterSetup = _require.crashReporterSetup;
  crashReporterSetup.init(buildInfo);
  require('discord_desktop_core/core.asar/app/discord_native/browser/crashReporter');
  var features = require('discord_desktop_core/core.asar/app/discord_native/browser/features');
  features.injectFeaturesBackend(global.features);
  require('discord_desktop_core/core.asar/app/discord_native/browser/fileManager');
  require('discord_desktop_core/core.asar/app/discord_native/browser/gpuSettings');
  require('discord_desktop_core/core.asar/app/discord_native/browser/nativeModules');
  require('discord_desktop_core/core.asar/app/discord_native/browser/powerMonitor');
  require('discord_desktop_core/core.asar/app/discord_native/browser/powerSaveBlocker');
  require('discord_desktop_core/core.asar/app/discord_native/browser/processUtils');
  require('discord_desktop_core/core.asar/app/discord_native/browser/settings');
  require('discord_desktop_core/core.asar/app/discord_native/browser/spellCheck');
  require('discord_desktop_core/core.asar/app/discord_native/browser/window');
  require('discord_desktop_core/core.asar/app/discord_native/browser/globalOverlay');
  _overlay_module["default"]._initializeHostProcess({
    createRenderer: _host.createRenderer,
    destroyRenderer: _host.destroyRenderer
  });
  _overlay_module["default"]._setEventHandler(_host.eventHandler);
});
