"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const electron_1 = __importDefault(require("electron"));
const lodash_1 = __importDefault(require("lodash"));
const crashReporterUtils_1 = require("../../../common/crashReporterUtils");
const crashReporterSetup_1 = require("../../bootstrapModules/crashReporterSetup");
const DiscordIPC_1 = require("../common/DiscordIPC");
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.CRASH_REPORTER_UPDATE_METADATA, (_, additionalMetadata) => {
    const metadata = crashReporterSetup_1.crashReporterSetup.metadata;
    (0, assert_1.default)(metadata != null, 'Metadata imported improperly.');
    const finalMetadata = lodash_1.default.defaultsDeep(metadata, additionalMetadata ?? {});
    (0, crashReporterUtils_1.reconcileCrashReporterMetadata)(electron_1.default.crashReporter, finalMetadata);
    const sentry = crashReporterSetup_1.crashReporterSetup.getGlobalSentry();
    if (sentry != null) {
        const user = additionalMetadata.sentry?.user;
        if (user != null) {
            sentry.setUser(user);
        }
        const nativeBuildNumber = additionalMetadata.nativeBuildNumber;
        if (nativeBuildNumber != null) {
            sentry.setTag('nativeBuildNumber', nativeBuildNumber);
        }
        const staff = additionalMetadata.staff;
        if (staff != null) {
            sentry.setTag('isStaff', staff.toString());
        }
    }
    return Promise.resolve({ metadata: finalMetadata });
});
electron_1.default.ipcMain.handle(DiscordIPC_1.IPCEvents.UNHANDLED_JS_EXCEPTION, (_) => {
    setTimeout(() => {
        throw new Error('UNHANDLED_EXCEPTION ' + process.type);
    }, 50);
});
