"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_LINUX = exports.IS_OSX = exports.IS_WIN = void 0;
const process_1 = __importDefault(require("process"));
exports.IS_WIN = process_1.default.platform === 'win32';
exports.IS_OSX = process_1.default.platform === 'darwin';
exports.IS_LINUX = process_1.default.platform === 'linux';
