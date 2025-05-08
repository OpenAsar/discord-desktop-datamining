"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Provides native APIs for RPCIPC transport.
//
// Because we're passing through some native APIs, e.g. net, we recast its API
// to something more browser-safe, so don't assume the APIs are 1:1 or behave
// exactly like the native APIs.

var process = require('process');
var path = require('path');
var fs = require('fs');
var net = require('net');
var _require = require('./safeEmitter'),
  createSafeEmitter = _require.createSafeEmitter;
var IS_WINDOWS = process.platform === 'win32';
var SOCKET_PATH;
if (IS_WINDOWS) {
  SOCKET_PATH = '\\\\?\\pipe\\discord-ipc';
} else {
  var temp = process.env.XDG_RUNTIME_DIR || process.env.TMPDIR || process.env.TMP || process.env.TEMP || '/tmp';
  SOCKET_PATH = path.join(temp, 'discord-ipc');
}

// converts Node.js Buffer to ArrayBuffer
function toArrayBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}
function getAvailableSocket(testSocketPathFn) {
  var tries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var lastErr = arguments.length > 2 ? arguments[2] : undefined;
  if (tries > 9) {
    return Promise.reject(new Error("Max tries exceeded, last error: ".concat(lastErr)));
  }
  var socketPath = "".concat(SOCKET_PATH, "-").concat(tries);
  var socket = recastNetSocket(net.createConnection(socketPath));
  return testSocketPathFn(socket).then(function () {
    if (!IS_WINDOWS) {
      try {
        fs.unlinkSync(socketPath);
      } catch (err) {}
    }
    return socketPath;
  }, function (err) {
    return getAvailableSocket(testSocketPathFn, tries + 1, err);
  });
}
function recastNetSocket(socket) {
  var didHandshake = false;
  var emitter = createSafeEmitter();
  socket.on('error', function (err) {
    return emitter.emit('error', err);
  });
  socket.on('close', function () {
    return emitter.emit('close');
  });
  socket.on('data', function (data) {
    return emitter.emit('data', data);
  });
  socket.on('pong', function () {
    return emitter.emit('pong');
  });
  socket.on('request', function (data) {
    return emitter.emit('request', data);
  });
  socket.once('handshake', function (data) {
    return emitter.emit('handshake', data);
  });
  return _objectSpread({
    setHandshakeComplete: function setHandshakeComplete(complete) {
      return didHandshake = complete;
    },
    getHandshakeComplete: function getHandshakeComplete() {
      return didHandshake;
    },
    destroy: function destroy() {
      return socket.destroy();
    },
    write: function write(buffer) {
      return socket.write(Buffer.from(buffer));
    },
    end: function end(buffer) {
      return socket.end(Buffer.from(buffer));
    },
    read: function read(len) {
      var buf = socket.read(len);
      if (!buf) return buf;
      return toArrayBuffer(buf);
    }
  }, emitter);
}
function recastNetServer(server) {
  var emitter = createSafeEmitter();
  server.on('error', function (err) {
    return emitter.emit('error', err);
  });
  return _objectSpread({
    listening: function listening() {
      return !!server.listening;
    },
    address: function address() {
      return server.address();
    },
    listen: function listen(socketPath, onListening) {
      server.listen(socketPath, function () {
        onListening();
      });
    }
  }, emitter);
}
var proxiedNet = {
  createServer: function createServer(onConnection) {
    var server = net.createServer(function (socket) {
      onConnection(recastNetSocket(socket));
    });
    return recastNetServer(server);
  }
};
module.exports = {
  getAvailableSocket: getAvailableSocket,
  net: proxiedNet
};
