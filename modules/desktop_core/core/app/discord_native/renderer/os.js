"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.release = exports.arch = exports.appArch = void 0;
const os_1 = __importDefault(require("os"));
const process_1 = __importDefault(require("process"));
exports.appArch = os_1.default.arch();
exports.arch = os_1.default.arch();
if (process_1.default.platform === 'win32' && process_1.default.env['PROCESSOR_ARCHITEW6432'] != null) {
    exports.arch = 'x64';
}
if (process_1.default.env['PROCESSOR_ARCHITECTURE']?.toString().toLowerCase() === 'arm64'
    || process_1.default.env['PROCESSOR_ARCHITEW6432']?.toString().toLowerCase() === 'arm64'
    || process_1.default.env['PROCESSOR_IDENTIFIER']?.toString().toLowerCase().includes('arm')) {
    exports.arch = 'arm64';
}
exports.release = os_1.default.release();
