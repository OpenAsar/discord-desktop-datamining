"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crashReporterSetup = void 0;
const bootstrapModules_1 = require("./bootstrapModules");
const crashReporterSetup = bootstrapModules_1.crashReporterSetup ?? require('../../common/crashReporterSetup');
exports.crashReporterSetup = crashReporterSetup;
