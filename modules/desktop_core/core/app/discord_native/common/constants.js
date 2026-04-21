"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCEvents = void 0;
exports.getDiscordIPCEvent = getDiscordIPCEvent;
var IPCEvents_1 = require("@discordapp/discord-native-types/IPCEvents");
Object.defineProperty(exports, "IPCEvents", { enumerable: true, get: function () { return IPCEvents_1.IPCEvents; } });
const discordPrefixRegex = /^DISCORD_/;
function getDiscordIPCEvent(ev) {
    return discordPrefixRegex.test(ev) ? ev : `DISCORD_${ev}`;
}
