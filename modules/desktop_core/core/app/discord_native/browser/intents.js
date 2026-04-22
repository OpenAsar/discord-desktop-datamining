"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const appFeatures_1 = require("../../appFeatures");
const utils_1 = require("../../utils");
const DiscordIPC_1 = require("../common/DiscordIPC");
const nativeModules_1 = require("./nativeModules");
if (utils_1.isOSX) {
    try {
        if (moduleDataPath == null) {
            throw new Error('no moduleDataPath');
        }
        const modulePath = (0, nativeModules_1.getModulePath)('discord_intents') ?? path_1.default.join(moduleDataPath, 'discord_intents');
        const lib = require(modulePath);
        lib.setDataPath(modulePath);
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SEARCH_INDEX_DOMAINS, (_event, domains) => {
            lib.indexDomains(domains);
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SEARCH_CLEAR_INDEX, (_event) => {
            lib.clearIndex();
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SEARCH_DELETE_DOMAINS, (_event, domains) => {
            lib.deleteDomains(domains);
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.SEARCH_DELETE_ITEMS, (_event, items) => {
            lib.deleteItems(items);
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.INTENTS_SET_ACTIVITY, (_event, activity) => {
            lib.setActivity(activity);
            return Promise.resolve();
        });
        DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.INTENTS_RESIGN_ACTIVITY, (_event) => {
            lib.resignActivity();
            return Promise.resolve();
        });
        (0, appFeatures_1.getFeatures)().declareSupported('intents');
    }
    catch (e) {
        console.warn('discord_intents setup failed with error: ', e);
    }
}
