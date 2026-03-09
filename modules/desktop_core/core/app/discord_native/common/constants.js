"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IPCEvents", {
  enumerable: true,
  get: function () {
    return _IPCEvents.IPCEvents;
  }
});
exports.getDiscordIPCEvent = getDiscordIPCEvent;
var _IPCEvents = require("@discordapp/discord-native-types/IPCEvents");
const discordPrefixRegex = /^DISCORD_/;
function getDiscordIPCEvent(ev) {
  return discordPrefixRegex.test(ev) ? ev : `DISCORD_${ev}`;
}