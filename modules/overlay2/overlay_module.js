"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// eslint-disable-next-line import/no-unresolved, import/extensions
var Overlay = require('./discord_overlay2.node');

// [adill] when the module was converted to use N-API we lost the ability to
// parse json into javascript objects trivially so our event handler simply
// returns event json
if (Overlay._setEventHandler == null && Overlay._setEventHandlerJson != null) {
  Overlay._setEventHandler = function (handler) {
    var wrappedHandler = function wrappedHandler(pid, eventJson) {
      var event = JSON.parse(eventJson);
      handler(pid, event);
    };
    Overlay._setEventHandlerJson(wrappedHandler);
  };
}

// [adill] when the module was converted to use N-API we lost the ability to
// stringify javascript objects into json trivially sendCommand and
// broadcastCommand were removed and replaced with {}Json variants that accept
//  command json
if (Overlay.sendCommand == null && Overlay.sendCommandJson != null) {
  Overlay.sendCommand = function (pid, command) {
    Overlay.sendCommandJson(pid, JSON.stringify(command));
  };
}
if (Overlay.broadcastCommand == null && Overlay.broadcastCommandJson != null) {
  Overlay.broadcastCommand = function (command) {
    Overlay.broadcastCommandJson(JSON.stringify(command));
  };
}
var _default = Overlay;
exports["default"] = _default;
module.exports = exports.default;
