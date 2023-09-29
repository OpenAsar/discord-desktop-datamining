"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webAuthnAuthenticate = webAuthnAuthenticate;
exports.webAuthnRegister = webAuthnRegister;
var _DiscordIPC = require("../common/DiscordIPC");
function webAuthnRegister(challenge) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WEBAUTHN_REGISTER_MAC, challenge);
}
function webAuthnAuthenticate(challenge) {
  return _DiscordIPC.DiscordIPC.renderer.invoke(_DiscordIPC.IPCEvents.WEBAUTHN_AUTHENTICATE_MAC, challenge);
}