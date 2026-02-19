"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webAuthnAuthenticate = webAuthnAuthenticate;
exports.webAuthnRegister = webAuthnRegister;
var _DiscordIPC = require("../common/DiscordIPC");
const ConvertibleErrorCodes = ['EncodingError', 'UnknownError', 'NotAllowedError', 'InvalidStateError', 'NotSupportedError', 'SecurityError', 'SyntaxError', 'NetworkError'];
function handleResponse(response) {
  if (response.code === '') {
    return response.message;
  }
  const err = JSON.parse(response.message);
  if (ConvertibleErrorCodes.includes(err.code)) {
    throw new DOMException(err.message, err.code);
  }
  throw new Error(err.message, {
    cause: {
      code: err.code
    }
  });
}
function webAuthnRegister(challenge) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WEBAUTHN_REGISTER_MAC, challenge).then(handleResponse);
}
function webAuthnAuthenticate(challenge) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WEBAUTHN_AUTHENTICATE_MAC, challenge).then(handleResponse);
}