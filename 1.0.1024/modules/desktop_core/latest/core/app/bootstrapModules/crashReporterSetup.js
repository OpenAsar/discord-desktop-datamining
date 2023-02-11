"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crashReporterSetup = void 0;
var _bootstrapModules = require("./bootstrapModules");
// Note: bootstrapCrashReporterSetup will not be set in the overlay.
const crashReporterSetup = _bootstrapModules.crashReporterSetup ?? require('../../common/crashReporterSetup');
exports.crashReporterSetup = crashReporterSetup;