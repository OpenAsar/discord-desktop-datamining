"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCrashReporter = updateCrashReporter;
exports.getMetadata = getMetadata;
exports.getFlattenedMetadata = getFlattenedMetadata;
exports.triggerJSException = triggerJSException;
const electron_1 = __importDefault(require("electron"));
const crashReporterUtils_1 = require("../../../common/crashReporterUtils");
const DiscordIPC_1 = require("../common/DiscordIPC");
let metadata = {};
void updateCrashReporter(metadata);
async function updateCrashReporter(additionalMetadata) {
    const result = await DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.CRASH_REPORTER_UPDATE_METADATA, additionalMetadata);
    metadata = result.metadata ?? {};
    (0, crashReporterUtils_1.reconcileCrashReporterMetadata)(electron_1.default.crashReporter, metadata);
}
function getMetadata() {
    return metadata;
}
function getFlattenedMetadata() {
    return (0, crashReporterUtils_1.flatten)(metadata);
}
async function triggerJSException(exceptionLocation) {
    switch (exceptionLocation) {
        case 0:
            setTimeout(() => {
                throw new Error('Delayed UNHANDLED_EXCEPTION ' + process.type);
            }, 50);
            break;
        case 1:
            throw new Error('UNHANDLED_EXCEPTION ' + process.type);
        case 2:
            await electron_1.default.ipcRenderer.invoke(DiscordIPC_1.IPCEvents.UNHANDLED_JS_EXCEPTION);
            break;
    }
}
