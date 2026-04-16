"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const appFeatures_1 = require("../../appFeatures");
const utils_1 = require("../../utils");
const DiscordIPC_1 = require("../common/DiscordIPC");
const nativeModules_1 = require("./nativeModules");
const features = (0, appFeatures_1.getFeatures)();
let majorVersion;
try {
    majorVersion = parseInt(os_1.default.release().split('.')[0], 10);
}
catch (_e) {
    majorVersion = 0;
}
if (utils_1.isOSX && majorVersion >= 21) {
    features.declareSupported('webauthn');
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_REGISTER_MAC, (_event, challenge) => {
        return callNative('webAuthnRegister', challenge);
    });
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_AUTHENTICATE_MAC, (_event, challenge) => {
        return callNative('webAuthnAuthenticate', challenge);
    });
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_SIGNAL_ALL_ACCEPTED_CREDENTIALS, (_event, rpId, userId, allAcceptedCredentialIds) => {
        return callSignalNative('signalAllAcceptedCredentials', rpId, userId, [...allAcceptedCredentialIds]);
    });
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_SIGNAL_CURRENT_USER_DETAILS, (_event, rpId, userId, name, displayName) => {
        return callSignalNative('signalCurrentUserDetails', rpId, userId, name, displayName);
    });
    DiscordIPC_1.DiscordIPC.main.handle(DiscordIPC_1.IPCEvents.WEBAUTHN_SIGNAL_UNKNOWN_CREDENTIAL, (_event, rpId, credentialId) => {
        return callSignalNative('signalUnknownCredential', rpId, credentialId);
    });
    function callNative(method, challenge) {
        if (moduleDataPath == null) {
            return Promise.reject(new Error('Module data path unset'));
        }
        const webAuthnPath = (0, nativeModules_1.getModulePath)('discord_webauthn') ?? path_1.default.join(moduleDataPath, 'discord_webauthn');
        return new Promise((resolve, _reject) => {
            const lib = require(webAuthnPath);
            const callback = (code, message) => resolve({ code, message });
            lib[method](challenge, callback);
        });
    }
    function callSignalNative(method, ...args) {
        if (moduleDataPath == null) {
            return Promise.resolve();
        }
        const webAuthnPath = (0, nativeModules_1.getModulePath)('discord_webauthn') ?? path_1.default.join(moduleDataPath, 'discord_webauthn');
        return new Promise((resolve) => {
            const lib = require(webAuthnPath);
            lib[method](...args, () => resolve());
        });
    }
}
