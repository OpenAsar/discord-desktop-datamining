"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeReadyProtocolRegistration = beforeReadyProtocolRegistration;
var _electron = require("electron");
var _constants = require("../common/constants");
function beforeReadyProtocolRegistration() {
  _electron.protocol.registerSchemesAsPrivileged([{
    scheme: _constants.DISCORD_CLIP_PROTOCOL,
    privileges: {
      standard: false,
      secure: true,
      supportFetchAPI: true
    }
  }]);
}