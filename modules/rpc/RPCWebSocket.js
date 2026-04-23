"use strict";
const { createSafeEmitter } = require('./safeEmitter');
const http = require('http');
const ws = require('ws');
const origInstanceMap = new Map();
let nextInstanceId = 1;
function toArrayBuffer(buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}
function recastWSSocket(socket, req) {
    const emitter = createSafeEmitter();
    socket.on('error', (err) => emitter.emit('error', err));
    socket.on('close', (code, message) => emitter.emit('close', code, message));
    socket.on('message', (data) => {
        if (data instanceof Buffer) {
            data = toArrayBuffer(data);
        }
        emitter.emit('message', data);
    });
    return {
        upgradeReq: () => {
            return {
                url: req.url,
                headers: {
                    origin: req.headers.origin,
                },
            };
        },
        send: (data, opts = {}) => {
            if (opts.binary) {
                data = Buffer.from(data);
            }
            try {
                socket.send(data, opts);
            }
            catch (e) {
                if (!e.message.match(/CLOS(ED|ING)/)) {
                    throw e;
                }
            }
        },
        close: (code, message) => socket.close(code, message),
        ...emitter,
    };
}
function createWrappedWSServer(opts) {
    if (opts.instanceId != null) {
        opts.server = origInstanceMap.get(opts.instanceId);
    }
    const wss = new ws.Server(opts);
    const emitter = createSafeEmitter();
    wss.on('connection', (socket, req) => emitter.emit('connection', recastWSSocket(socket, req)));
    return {
        ...emitter,
    };
}
function recastHTTPReq(req) {
    let attached = false;
    const emitter = createSafeEmitter();
    return {
        url: () => req.url,
        method: () => req.method,
        headers: () => req.headers,
        on: (name, listener) => {
            if (name === 'data' && !attached) {
                req.on('error', (err) => emitter.emit('error', err));
                req.on('end', () => emitter.emit('end'));
                req.on('data', (data) => {
                    emitter.emit('data', '' + data);
                });
                attached = true;
            }
            emitter.on(name, listener);
        },
    };
}
function recastHTTPRes(res) {
    return {
        setHeader: (header, value) => res.setHeader(header, value),
        writeHead: (status, headers) => res.writeHead(status, headers),
        end: (body) => res.end(body),
    };
}
function createWrappedHTTPServer() {
    const server = http.createServer();
    const emitter = createSafeEmitter();
    server.on('error', (err) => emitter.emit('error', err));
    server.on('request', (req, res) => emitter.emit('request', recastHTTPReq(req), recastHTTPRes(res)));
    const recast = {
        address: () => server.address(),
        listening: () => server.listening,
        listen: (port, host, callback) => server.listen(port, host, callback),
        instanceId: nextInstanceId,
        ...emitter,
    };
    origInstanceMap.set(nextInstanceId, server);
    nextInstanceId += 1;
    return recast;
}
module.exports = {
    ws: {
        Server: createWrappedWSServer,
    },
    http: {
        createServer: createWrappedHTTPServer,
    },
};
