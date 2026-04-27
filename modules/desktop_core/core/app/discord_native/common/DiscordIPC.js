"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordIPC = exports.IPCEvents = void 0;
const electron_1 = __importDefault(require("electron"));
const constants_1 = require("./constants");
var constants_2 = require("./constants");
Object.defineProperty(exports, "IPCEvents", { enumerable: true, get: function () { return constants_2.IPCEvents; } });
class DiscordMainIPC {
    static on(channel, listener) {
        electron_1.default.ipcMain.on(channel, (...args) => {
            return listener.apply(this, args);
        });
    }
    static handle(channel, listener) {
        return electron_1.default.ipcMain.handle(channel, (...args) => {
            return listener.apply(this, args);
        });
    }
}
class DiscordRendererIPC {
    static sendSync(...args) {
        return electron_1.default.ipcRenderer.sendSync.apply(electron_1.default.ipcRenderer, args);
    }
    static invoke(...args) {
        return electron_1.default.ipcRenderer.invoke.apply(electron_1.default.ipcRenderer, args);
    }
    static on(channel, listener) {
        electron_1.default.ipcRenderer.on(channel, (...args) => {
            return listener.apply(this, args);
        });
    }
}
exports.DiscordIPC = {
    main: DiscordMainIPC,
    renderer: DiscordRendererIPC,
};
