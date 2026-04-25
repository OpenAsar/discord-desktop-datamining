"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const FeatureFlags_1 = __importDefault(require("./FeatureFlags"));
const host_1 = require("./host");
const overlay_module_1 = __importDefault(require("./overlay_module"));
process_1.default.on('uncaughtException', (e) => {
    overlay_module_1.default.logMessage(`Overlay host process exception: ${e.message}`);
    overlay_module_1.default.logMessage(e.stack ?? '');
});
global.features = new FeatureFlags_1.default();
global.mainAppDirname = __dirname;
global.features.declareSupported('overlay-hidpi');
electron_1.app.disableHardwareAcceleration();
electron_1.app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
void electron_1.app.whenReady().then(() => {
    const buildInfo = require(path_1.default.join(process_1.default.resourcesPath, 'build_info.json'));
    const overlayHost = require('./overlayHost');
    overlayHost.init(buildInfo, global.features);
    overlay_module_1.default._initializeHostProcess({ createRenderer: host_1.createRenderer, destroyRenderer: host_1.destroyRenderer });
    overlay_module_1.default._setEventHandler(host_1.eventHandler);
});
