"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signalAllAcceptedCredentials = signalAllAcceptedCredentials;
exports.signalCurrentUserDetails = signalCurrentUserDetails;
exports.signalUnknownCredential = signalUnknownCredential;
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
function signalAllAcceptedCredentials(rpId, userId, allAcceptedCredentialIds) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WEBAUTHN_SIGNAL_ALL_ACCEPTED_CREDENTIALS, rpId, userId, allAcceptedCredentialIds);
}
function signalCurrentUserDetails(rpId, userId, name, displayName) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WEBAUTHN_SIGNAL_CURRENT_USER_DETAILS, rpId, userId, name, displayName);
}
function signalUnknownCredential(rpId, credentialId) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WEBAUTHN_SIGNAL_UNKNOWN_CREDENTIAL, rpId, credentialId);
}