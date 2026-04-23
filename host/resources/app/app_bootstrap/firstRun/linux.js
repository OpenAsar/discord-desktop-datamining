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
function performFirstRunTasks(_updater) {
    const firstRunCompletePath = path_1.default.join(paths.getUserDataVersioned(), '.first-run');
    if (!fs_1.default.existsSync(firstRunCompletePath)) {
        const symlinkPath = path_1.default.join(paths.getUserData(), path_1.default.basename(process.execPath));
        const symlinkTemp = symlinkPath + '-new';
        try {
            fs_1.default.rmSync(symlinkTemp, { force: true });
            fs_1.default.symlinkSync(process.execPath, symlinkTemp);
            fs_1.default.renameSync(symlinkTemp, symlinkPath);
            fs_1.default.writeFileSync(firstRunCompletePath, 'true');
        }
        catch (e) {
            (0, errorHandler_1.handled)(e);
        }
    }
}
