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
exports.performFirstRunTasks = performFirstRunTasks;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const paths = __importStar(require("../../common/paths"));
const errorHandler_1 = require("../errorHandler");
const squirrelUpdate_1 = require("../squirrelUpdate");
const Constants_1 = __importDefault(require("../Constants"));
const appFolder = path_1.default.resolve(process.execPath, '..');
const rootFolder = path_1.default.resolve(appFolder, '..');
const exeName = path_1.default.basename(process.execPath);
const updateExe = path_1.default.join(rootFolder, 'Update.exe');
function copyIconToRoot() {
    const icoSrc = path_1.default.join(appFolder, 'app.ico');
    const icoDest = path_1.default.join(rootFolder, 'app.ico');
    try {
        const ico = fs_1.default.readFileSync(icoSrc);
        fs_1.default.writeFileSync(icoDest, new Uint8Array(ico));
        return icoDest;
    }
    catch (e) {
        return icoSrc;
    }
}
function updateShortcuts(updater) {
    const shortcutFileName = `${Constants_1.default.APP_NAME_FOR_HUMANS}.lnk`;
    const shortcutPaths = [
        path_1.default.join(updater.getKnownFolder('desktop'), shortcutFileName),
        path_1.default.join(updater.getKnownFolder('programs'), Constants_1.default.APP_COMPANY, shortcutFileName),
    ];
    const iconPath = copyIconToRoot();
    for (const shortcutPath of shortcutPaths) {
        if (!fs_1.default.existsSync(shortcutPath)) {
            continue;
        }
        updater.createShortcut({
            target_path: updateExe,
            shortcut_path: shortcutPath,
            arguments: `--processStart ${exeName}`,
            icon_path: iconPath,
            icon_index: 0,
            description: Constants_1.default.APP_DESCRIPTION,
            app_user_model_id: Constants_1.default.APP_ID,
            working_directory: appFolder,
        });
    }
}
function performFirstRunTasks(updater) {
    const firstRunCompletePath = path_1.default.join(paths.getUserDataVersioned(), '.first-run');
    if (!fs_1.default.existsSync(firstRunCompletePath)) {
        let updatedShortcuts = false;
        try {
            if (updater != null) {
                updateShortcuts(updater);
                updatedShortcuts = true;
            }
        }
        catch (e) {
            (0, errorHandler_1.handled)(e);
        }
        (0, squirrelUpdate_1.installProtocol)(Constants_1.default.APP_PROTOCOL, () => {
            try {
                if (updatedShortcuts) {
                    fs_1.default.writeFileSync(firstRunCompletePath, 'true');
                }
            }
            catch (e) {
                (0, errorHandler_1.handled)(e);
            }
        });
    }
}
