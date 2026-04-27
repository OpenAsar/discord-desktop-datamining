"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const electron_1 = require("electron");
const constants_1 = require("./discord_native/common/constants");
const ipcMain_1 = __importDefault(require("./ipcMain"));
let hasInit = false;
function init() {
    if (hasInit) {
        return;
    }
    ipcMain_1.default.handle(constants_1.IPCEvents.GET_MOUSE_COORDINATES, () => electron_1.screen.getCursorScreenPoint());
    hasInit = true;
}
