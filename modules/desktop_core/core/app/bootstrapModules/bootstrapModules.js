"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crashReporterSetup = exports.buildInfo = exports.autoStart = exports.appSettings = exports.analytics = exports.GPUSettings = exports.Constants = void 0;
exports.init = init;
exports.updater = exports.splashScreen = exports.paths = exports.moduleUpdater = exports.logger = void 0;
let hasInit = false;
let Constants = null;
exports.Constants = Constants;
let GPUSettings = null;
exports.GPUSettings = GPUSettings;
let analytics = null;
exports.analytics = analytics;
let appSettings = null;
exports.appSettings = appSettings;
let autoStart = null;
exports.autoStart = autoStart;
let buildInfo = null;
exports.buildInfo = buildInfo;
let crashReporterSetup = null;
exports.crashReporterSetup = crashReporterSetup;
let logger = null;
exports.logger = logger;
let moduleUpdater = null;
exports.moduleUpdater = moduleUpdater;
let paths = null;
exports.paths = paths;
let splashScreen = null;
exports.splashScreen = splashScreen;
let updater = null;
exports.updater = updater;
function init(bootstrapModules) {
  if (hasInit) {
    throw new Error(`bootstrapModules has already init`);
  }
  exports.Constants = Constants = bootstrapModules.Constants;
  exports.GPUSettings = GPUSettings = bootstrapModules.GPUSettings;
  exports.analytics = analytics = bootstrapModules.analytics;
  exports.appSettings = appSettings = bootstrapModules.appSettings;
  exports.autoStart = autoStart = bootstrapModules.autoStart;
  exports.buildInfo = buildInfo = bootstrapModules.buildInfo;
  exports.crashReporterSetup = crashReporterSetup = bootstrapModules.crashReporterSetup;
  exports.logger = logger = bootstrapModules.logger;
  exports.moduleUpdater = moduleUpdater = bootstrapModules.moduleUpdater;
  exports.paths = paths = bootstrapModules.paths;
  exports.splashScreen = splashScreen = bootstrapModules.splashScreen;
  exports.updater = updater = bootstrapModules.updater;
  hasInit = true;
}