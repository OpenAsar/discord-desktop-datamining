"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadClip = loadClip;
exports.loadClipsDirectory = loadClipsDirectory;
exports.deleteClip = deleteClip;
exports.getClipProtocolURLFromPath = getClipProtocolURLFromPath;
const node_url_1 = require("node:url");
const constants_1 = require("../../../common/constants");
const DiscordIPC_1 = require("../common/DiscordIPC");
function loadClip(path) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.LOAD_CLIP, path);
}
function loadClipsDirectory(path) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.LOAD_CLIPS_DIRECTORY, path);
}
function deleteClip(path) {
    return DiscordIPC_1.DiscordIPC.renderer.invoke(DiscordIPC_1.IPCEvents.DELETE_CLIP, path);
}
function getClipProtocolURLFromPath(filepath) {
    const fileURL = (0, node_url_1.pathToFileURL)(filepath).toString();
    const clipURL = new URL(fileURL);
    clipURL.hostname = constants_1.DISCORD_CLIP_PROTOCOL;
    return clipURL.toString().replace(clipURL.protocol, `${constants_1.DISCORD_CLIP_PROTOCOL}:`);
}
