"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const DiscordIPC_1 = require("../common/DiscordIPC");
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.ACCESSIBILITY_GET_ENABLED, (_) => {
    return Promise.resolve(electron_1.default.app.accessibilitySupportEnabled);
});
