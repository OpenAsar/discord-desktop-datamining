"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.canBootstrapNewUpdater = void 0;
exports.getUpdaterVersion = getUpdaterVersion;
exports.ensureModule = ensureModule;
exports.requireModule = requireModule;
exports.getModulePath = getModulePath;
const electron = __importStar(require("electron"));
const commonConstants = __importStar(require("../common/constants"));
const { NATIVE_MODULES_GET_PATHS, NATIVE_MODULES_INSTALL, NATIVE_MODULES_GET_HAS_NEW_UPDATER, NATIVE_MODULES_GET_MODULE_PATH, } = commonConstants.IPCEvents;
const modulePromises = {};
function getSanitizedModulePaths() {
    let sanitizedModulePaths = [];
    const { mainAppDirname, browserModulePaths } = electron.ipcRenderer.sendSync(NATIVE_MODULES_GET_PATHS);
    browserModulePaths.forEach((modulePath) => {
        if (!modulePath.includes('electron.asar')) {
            sanitizedModulePaths.push(modulePath);
        }
    });
    const rendererModulePaths = require('module')._nodeModulePaths(mainAppDirname);
    sanitizedModulePaths = sanitizedModulePaths.concat(rendererModulePaths.slice(0, 2));
    return sanitizedModulePaths;
}
function getHasNewUpdater() {
    return electron.ipcRenderer.sendSync(NATIVE_MODULES_GET_HAS_NEW_UPDATER);
}
function getUpdaterVersion() {
    return 4;
}
async function ensureModule(name) {
    if (modulePromises[name] == null) {
        modulePromises[name] = electron.ipcRenderer.invoke(NATIVE_MODULES_INSTALL, name);
    }
    const moduleInstall = modulePromises[name];
    await moduleInstall.catch((e) => {
        modulePromises[name] = null;
        return Promise.reject(e);
    });
    module.paths = getSanitizedModulePaths();
}
function requireModule(name) {
    if (!/^discord_[a-z0-9_-]+$/.test(name) && name !== 'erlpack') {
        throw new Error('"' + String(name) + '" is not a whitelisted native module');
    }
    return require(name);
}
function getModulePath(name) {
    return electron.ipcRenderer.sendSync(NATIVE_MODULES_GET_MODULE_PATH, name);
}
exports.canBootstrapNewUpdater = !getHasNewUpdater();
module.paths = getSanitizedModulePaths();
