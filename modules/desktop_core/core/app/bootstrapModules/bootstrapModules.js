"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crashReporterSetup = exports.buildInfo = exports.autoStart = exports.appSettings = exports.Constants = void 0;
exports.init = init;
exports.updater = exports.splashScreen = exports.requireNative = exports.paths = exports.moduleUpdater = void 0;
let hasInit = false;
let paths = null;
exports.paths = paths;
let splashScreen = null;
exports.splashScreen = splashScreen;
let autoStart = null;
exports.autoStart = autoStart;
let requireNative = null;
exports.requireNative = requireNative;
let appSettings = null;
exports.appSettings = appSettings;
let Constants = null;
exports.Constants = Constants;
let buildInfo = null;
exports.buildInfo = buildInfo;
let moduleUpdater = null;
exports.moduleUpdater = moduleUpdater;
let updater = null;
exports.updater = updater;
let crashReporterSetup = null;
exports.crashReporterSetup = crashReporterSetup;
function init(bootstrapModules) {
  if (hasInit) {
    throw new Error(`bootstrapModules has already init`);
  }
  exports.paths = paths = bootstrapModules.paths;
  exports.splashScreen = splashScreen = bootstrapModules.splashScreen;
  exports.autoStart = autoStart = bootstrapModules.autoStart;
  exports.requireNative = requireNative = bootstrapModules.requireNative;
  exports.appSettings = appSettings = bootstrapModules.appSettings;
  exports.Constants = Constants = bootstrapModules.Constants;
  exports.buildInfo = buildInfo = bootstrapModules.buildInfo;
  exports.moduleUpdater = moduleUpdater = bootstrapModules.moduleUpdater;
  exports.updater = updater = bootstrapModules.updater;
  exports.crashReporterSetup = crashReporterSetup = bootstrapModules.crashReporterSetup;
  hasInit = true;
}