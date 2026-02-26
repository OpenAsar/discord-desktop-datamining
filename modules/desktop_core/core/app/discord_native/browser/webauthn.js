"use strict";

var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _appFeatures = require("../../appFeatures");
var _utils = require("../../utils");
var _DiscordIPC = require("../common/DiscordIPC");
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
  function callNative(method, challenge) {
    if (moduleDataPath == null) {
      return Promise.reject(new Error('Module data path unset'));
    }
    const webAuthnPath = _path.default.join(moduleDataPath, 'discord_webauthn');
    return new Promise(resolve => {
      const lib = require(webAuthnPath);
      lib[method](challenge, (code, message) => resolve({
        code,
        message
      }));
    });
  }
}