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
exports.injectModuleUpdater = injectModuleUpdater;
exports.injectUpdater = injectUpdater;
exports.getModulePath = getModulePath;
const childProcess = __importStar(require("child_process"));
const electron = __importStar(require("electron"));
const path = __importStar(require("path"));
const process = __importStar(require("process"));
const nodeGlobalPaths_1 = require("../../../common/nodeGlobalPaths");
const { NATIVE_MODULES_GET_PATHS, NATIVE_MODULES_INSTALL, NATIVE_MODULES_FINISH_UPDATER_BOOTSTRAP, NATIVE_MODULES_GET_HAS_NEW_UPDATER, NATIVE_MODULES_GET_MODULE_PATH, } = require('../common/constants').IPCEvents;
let injectedModuleUpdater = null;
let injectedUpdater = null;
function injectModuleUpdater(moduleUpdater) {
    injectedModuleUpdater = moduleUpdater;
}
function injectUpdater(updater) {
    injectedUpdater = updater;
}
electron.ipcMain.on(NATIVE_MODULES_GET_PATHS, (event) => {
    event.returnValue = {
        mainAppDirname: global.mainAppDirname,
        browserModulePaths: (0, nodeGlobalPaths_1.getGlobalPaths)(),
    };
});
async function newUpdaterInstall(updater, moduleName) {
    try {
        await updater.installModule(moduleName);
        const queryOptions = {};
        await updater.commitModules(queryOptions);
    }
    catch (e) {
        throw new Error(`Failed to install ${moduleName}: ${e}`);
    }
}
electron.ipcMain.handle(NATIVE_MODULES_INSTALL, async (_, moduleName) => {
    const newUpdater = injectedUpdater?.getUpdater();
    if (newUpdater != null) {
        return newUpdaterInstall(newUpdater, moduleName);
    }
    const updater = injectedModuleUpdater;
    if (updater === null) {
        throw new Error('Module updater is not available!');
    }
    const waitForInstall = new Promise((resolve, reject) => {
        const installedHandler = (installedModuleEvent) => {
            if (installedModuleEvent.name === moduleName) {
                updater.events.removeListener(updater.INSTALLED_MODULE, installedHandler);
                if (installedModuleEvent.succeeded) {
                    resolve();
                }
                else {
                    reject(new Error(`Failed to install ${moduleName}`));
                }
            }
        };
        updater.events.on(updater.INSTALLED_MODULE, installedHandler);
    });
    updater.install(moduleName, false);
    return await waitForInstall;
});
electron.ipcMain.on(NATIVE_MODULES_GET_HAS_NEW_UPDATER, (event) => {
    event.returnValue = injectedUpdater?.getUpdater() != null;
});
electron.ipcMain.on(NATIVE_MODULES_FINISH_UPDATER_BOOTSTRAP, (_, [major, minor, revision]) => {
    if (typeof major !== 'number' || typeof minor !== 'number' || typeof revision !== 'number') {
        throw new Error('You tried.');
    }
    const hostVersionStr = `${major}.${minor}.${revision}`;
    const hostExePath = path.join(path.dirname(process.execPath), '..', `app-${hostVersionStr}`, path.basename(process.execPath));
    electron.app.once('will-quit', () => {
        childProcess.spawn(hostExePath, [], { detached: true, stdio: 'inherit' });
    });
    console.log(`Restarting from ${path.resolve(process.execPath)} to ${path.resolve(hostExePath)}`);
    electron.app.quit();
});
function getModulePath(name) {
    const newUpdater = injectedUpdater?.getUpdater();
    if (newUpdater != null) {
        return newUpdater.committedModulePaths.get(name) ?? null;
    }
    return null;
}
electron.ipcMain.on(NATIVE_MODULES_GET_MODULE_PATH, (event, name) => {
    event.returnValue = getModulePath(name) ?? null;
});
