"use strict";
const process = require('process');
const path = require('path');
const fs = require('fs');
const net = require('net');
const { createSafeEmitter } = require('./safeEmitter');
const IS_WINDOWS = process.platform === 'win32';
let socketBasePath;
if (IS_WINDOWS) {
    socketBasePath = '\\\\?\\pipe\\discord-ipc';
}
else {
    const temp = process.env.XDG_RUNTIME_DIR || process.env.TMPDIR || process.env.TMP || process.env.TEMP || '/tmp';
    socketBasePath = path.join(temp, 'discord-ipc');
}
function toArrayBuffer(buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}
function getAvailableSocket(testSocketPathFn, tries = 0, lastErr) {
    if (tries > 9) {
        return Promise.reject(new Error(`Max tries exceeded, last error: ${lastErr}`));
    }
    const socketPath = `${socketBasePath}-${tries}`;
    const socket = recastNetSocket(net.createConnection(socketPath));
    return testSocketPathFn(socket).then(() => {
        if (!IS_WINDOWS) {
            try {
                fs.unlinkSync(socketPath);
            }
            catch (err) { }
        }
        return socketPath;
    }, (err) => getAvailableSocket(testSocketPathFn, tries + 1, err));
}
function recastNetSocket(socket) {
    let didHandshake = false;
    const emitter = createSafeEmitter();
    socket.on('error', (err) => emitter.emit('error', err));
    socket.on('close', () => emitter.emit('close'));
    socket.on('data', (data) => emitter.emit('data', data));
    socket.on('pong', () => emitter.emit('pong'));
    socket.on('request', (data) => emitter.emit('request', data));
    socket.once('handshake', (data) => emitter.emit('handshake', data));
    return {
        setHandshakeComplete: (complete) => (didHandshake = complete),
        getHandshakeComplete: () => didHandshake,
        destroy: () => {
            emitter.removeAllListeners();
            socket.destroy();
        },
        write: (buffer) => socket.write(Buffer.from(buffer)),
        end: (buffer) => socket.end(Buffer.from(buffer)),
        read: (len) => {
            const buf = socket.read(len);
            if (!buf)
                return buf;
            return toArrayBuffer(buf);
        },
        ...emitter,
    };
}
function recastNetServer(server) {
    const emitter = createSafeEmitter();
    server.on('error', (err) => emitter.emit('error', err));
    return {
        listening: () => !!server.listening,
        address: () => server.address(),
        listen: (socketPath, onListening) => {
            server.listen(socketPath, () => {
                onListening();
            });
        },
        ...emitter,
    };
}
const proxiedNet = {
    createServer: function (onConnection) {
        const server = net.createServer((socket) => {
            onConnection(recastNetSocket(socket));
        });
        return recastNetServer(server);
    },
};
module.exports = {
    getAvailableSocket,
    net: proxiedNet,
};
