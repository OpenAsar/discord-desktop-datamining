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
exports.env = exports.arch = exports.platform = exports.pid = void 0;
const process = __importStar(require("process"));
const _env = process.env;
exports.pid = process.pid;
const _platform = process.platform;
exports.platform = _platform === 'darwin' || _platform === 'linux' || _platform === 'win32' ? _platform : 'unknown';
const _arch = process.arch;
exports.arch = _arch === 'x64' || _arch === 'arm64' ? _arch : '';
exports.env = {
    DISCORD_TEST: _env['DISCORD_TEST'],
    DISCORD_GATEWAY_PLAINTEXT: _env['DISCORD_GATEWAY_PLAINTEXT'],
    DISCORD_DISALLOW_POPUPS: _env['DISCORD_DISALLOW_POPUPS'],
    LOCALAPPDATA: _env['LOCALAPPDATA'],
    'PROGRAMFILES(X86)': _env['PROGRAMFILES(X86)'],
    PROGRAMFILES: _env['PROGRAMFILES'],
    PROGRAMW6432: _env['PROGRAMW6432'],
    PROGRAMDATA: _env['PROGRAMDATA'],
};
