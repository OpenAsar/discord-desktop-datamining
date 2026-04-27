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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = install;
exports.isInstalled = isInstalled;
exports.update = update;
exports.uninstall = uninstall;
const path_1 = __importDefault(require("path"));
const appSettings_1 = require("../appSettings");
const windowsUtils = __importStar(require("../windowsUtils"));
const settings = (0, appSettings_1.getSettings)();
const appName = path_1.default.basename(process.execPath, '.exe');
const fullExeName = path_1.default.basename(process.execPath);
const updatePath = path_1.default.join(path_1.default.dirname(process.execPath), '..', 'Update.exe');
function install(callback) {
    uninstallStartupApproval(() => {
        const startMinimized = settings?.get('START_MINIMIZED', false);
        let execPath = `"${updatePath}" --processStart ${fullExeName}`;
        if (startMinimized) {
            execPath = `${execPath} --process-start-args --start-minimized`;
        }
        const queue = [['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName, '/d', execPath]];
        windowsUtils.addToRegistry(queue, callback);
    });
}
function isInstalled(callback) {
    isStartupInstalled((installed) => {
        if (!installed) {
            callback(false);
        }
        else {
            isStartupApproved(callback);
        }
    });
}
function update(callback) {
    isInstalled((installed) => {
        if (installed) {
            install(callback);
        }
        else {
            callback();
        }
    });
}
function uninstall(callback) {
    uninstallStartupEntry(() => {
        uninstallStartupApproval(callback);
    });
}
function uninstallStartupEntry(callback) {
    const queryValue = ['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName, '/f'];
    queryValue.unshift('delete');
    windowsUtils.spawnReg(queryValue, (_error, _stdout) => callback());
}
function uninstallStartupApproval(callback) {
    const queryValue = [
        'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run',
        '/v',
        appName,
        '/f',
    ];
    queryValue.unshift('delete');
    windowsUtils.spawnReg(queryValue, (_error, _stdout) => callback());
}
function isStartupInstalled(callback) {
    const queryValue = ['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', '/v', appName];
    queryValue.unshift('query');
    windowsUtils.spawnReg(queryValue, (_error, stdout) => {
        const doesOldKeyExist = stdout.indexOf(appName) >= 0;
        callback(doesOldKeyExist);
    });
}
function isStartupApproved(callback) {
    const queryValue = [
        'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run',
        '/v',
        appName,
    ];
    queryValue.unshift('query');
    windowsUtils.spawnReg(queryValue, (_error, stdout) => {
        const match = stdout.match(/REG_BINARY\s+([0-9A-Fa-f]+)/);
        if (match !== null) {
            const hexValue = match[1];
            const enabled = hexValue.substring(0, 2) === '00';
            callback(enabled);
        }
        else {
            callback(true);
        }
    });
}
