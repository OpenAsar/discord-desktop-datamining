"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crashReporterSetup = void 0;
var _bootstrapModules = require("./bootstrapModules");
const crashReporterSetup = _bootstrapModules.crashReporterSetup ?? require('../../common/crashReporterSetup');
exports.crashReporterSetup = crashReporterSetup;