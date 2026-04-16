"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAPIEndpoint = getAPIEndpoint;
exports.makeChunkedRequest = makeChunkedRequest;
const electron = __importStar(require("electron"));
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const { CONSTANTS_GET } = require('../common/constants').IPCEvents;
async function getAPIEndpoint() {
    const apiEndpoint = await electron.ipcRenderer.invoke(CONSTANTS_GET, 'API_ENDPOINT');
    if (apiEndpoint == null || apiEndpoint === '') {
        return null;
    }
    return apiEndpoint;
}
function makeChunkedRequest(route, chunks, options, callback) {
    return _makeChunkedRequest(route, chunks, options)
        .then((body) => callback(null, body))
        .catch((err) => callback(err));
}
async function _makeChunkedRequest(route, chunks, options) {
    const { method, chunkInterval, token, contentType } = options;
    let httpRequest = http.request;
    if (route.startsWith('https')) {
        httpRequest = https.request;
    }
    const apiEndpoint = await getAPIEndpoint();
    if (apiEndpoint == null) {
        throw new Error('missing api endpoint setting');
    }
    const apiEndpointUrl = new URL(apiEndpoint);
    const url = new URL(route, apiEndpoint);
    url.protocol = apiEndpointUrl.protocol;
    url.host = apiEndpointUrl.host;
    if (!url.pathname.startsWith(apiEndpointUrl.pathname)) {
        url.pathname = `${apiEndpointUrl.pathname}${url.pathname}`;
    }
    return new Promise(async (resolve, reject) => {
        let writeTimeout = null;
        const req = httpRequest(url.toString(), {
            method,
            headers: {
                authorization: token,
                'Content-Type': contentType,
                'Content-Length': Buffer.byteLength(chunks.join('')),
            },
        }, (res) => {
            let responseData = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                resolve({ status: res.statusCode, body: responseData });
            });
        });
        req.on('error', (e) => {
            if (writeTimeout !== null) {
                clearTimeout(writeTimeout);
            }
            reject(e);
        });
        for (let i = 0; i < chunks.length; i++) {
            await new Promise((resolve) => {
                req.write(chunks[i], () => {
                    writeTimeout = setTimeout(resolve, chunkInterval);
                });
            });
        }
        req.end();
    });
}
