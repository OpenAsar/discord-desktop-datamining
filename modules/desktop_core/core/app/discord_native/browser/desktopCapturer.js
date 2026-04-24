"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const DiscordIPC_1 = require("../common/DiscordIPC");
function mapDiscordDesktopCaptureSourcesToElectron(options) {
    const requiredTypes = ['screen', 'window'];
    const types = options.types
        .filter((type) => requiredTypes.includes(type.toLocaleLowerCase()))
        .map((type) => type.toLocaleLowerCase());
    return {
        types,
        thumbnailSize: options.thumbnailSize,
        fetchWindowIcons: true,
    };
}
DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.DESKTOP_CAPTURER_GET_SOURCES, async (_, opts) => {
    const electronOptions = mapDiscordDesktopCaptureSourcesToElectron(opts);
    const sources = await electron_1.default.desktopCapturer.getSources(electronOptions);
    return sources.map((source) => {
        return {
            id: source.id,
            name: source.name,
            url: source.thumbnail.toDataURL(),
            icon: source.appIcon?.toDataURL(),
        };
    });
});
