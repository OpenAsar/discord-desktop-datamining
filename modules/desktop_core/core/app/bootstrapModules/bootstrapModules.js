"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crashReporterSetup = exports.buildInfo = exports.autoStart = exports.appSettings = exports.analytics = exports.GPUSettings = exports.Constants = void 0;
exports.init = init;
exports.updater = exports.splashScreen = exports.paths = exports.moduleUpdater = exports.logger = void 0;
let hasInit = false;
let Constants = exports.Constants = null;
let GPUSettings = exports.GPUSettings = null;
let analytics = exports.analytics = null;
let appSettings = exports.appSettings = null;
let autoStart = exports.autoStart = null;
let buildInfo = exports.buildInfo = null;
let crashReporterSetup = exports.crashReporterSetup = null;
let logger = exports.logger = null;
let moduleUpdater = exports.moduleUpdater = null;
let paths = exports.paths = null;
let splashScreen = exports.splashScreen = null;
let updater = exports.updater = null;
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