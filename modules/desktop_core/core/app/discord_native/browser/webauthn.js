"use strict";

var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _appFeatures = require("../../appFeatures");
var _utils = require("../../utils");
var _DiscordIPC = require("../common/DiscordIPC");
var _nativeModules = require("./nativeModules");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const features = (0, _appFeatures.getFeatures)();
let majorVersion;
try {
  majorVersion = parseInt(_os.default.release().split('.')[0], 10);
} catch (_e) {
  majorVersion = 0;
}
if (_utils.isOSX && majorVersion >= 21) {
  features.declareSupported('webauthn');
  _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WEBAUTHN_REGISTER_MAC, (_event, challenge) => {
    return callNative('webAuthnRegister', challenge);
  });
  _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WEBAUTHN_AUTHENTICATE_MAC, (_event, challenge) => {
    return callNative('webAuthnAuthenticate', challenge);
  });
  _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WEBAUTHN_SIGNAL_ALL_ACCEPTED_CREDENTIALS, (_event, rpId, userId, allAcceptedCredentialIds) => {
    return callSignalNative('signalAllAcceptedCredentials', rpId, userId, [...allAcceptedCredentialIds]);
  });
  _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WEBAUTHN_SIGNAL_CURRENT_USER_DETAILS, (_event, rpId, userId, name, displayName) => {
    return callSignalNative('signalCurrentUserDetails', rpId, userId, name, displayName);
  });
  _DiscordIPC.DiscordIPC.main.handle(_DiscordIPC.IPCEvents.WEBAUTHN_SIGNAL_UNKNOWN_CREDENTIAL, (_event, rpId, credentialId) => {
    return callSignalNative('signalUnknownCredential', rpId, credentialId);
  });
  function callNative(method, challenge) {
    if (moduleDataPath == null) {
      return Promise.reject(new Error('Module data path unset'));
    }
    const webAuthnPath = (0, _nativeModules.getModulePath)('discord_webauthn') ?? _path.default.join(moduleDataPath, 'discord_webauthn');
    return new Promise(resolve => {
      const lib = require(webAuthnPath);
      lib[method](challenge, (code, message) => resolve({
        code,
        message
      }));
    });
  }
  function callSignalNative(method, ...args) {
    if (moduleDataPath == null) {
      return Promise.resolve();
    }
    const webAuthnPath = (0, _nativeModules.getModulePath)('discord_webauthn') ?? _path.default.join(moduleDataPath, 'discord_webauthn');
    return new Promise(resolve => {
      const lib = require(webAuthnPath);
      lib[method](...args, () => resolve());
    });
  }
}