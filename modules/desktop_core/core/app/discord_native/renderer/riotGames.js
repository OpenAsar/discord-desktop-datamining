"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const LIVE_CLIENT_API_HOSTNAME = 'https://127.0.0.1:2999/liveclientdata/';
let riotRootCA;
function fetchLiveClientData(endpoint, params = {}) {
    const queryString = new URLSearchParams({
        ...(params.riotId != null ? { riotId: params.riotId } : {}),
        ...(params.eventID != null ? { eventID: params.eventID.toString() } : {}),
    }).toString();
    const url = new URL(`${LIVE_CLIENT_API_HOSTNAME}${endpoint}${queryString?.length > 0 ? `?${queryString}` : ''}`);
    if (riotRootCA == null) {
        riotRootCA = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../data/riotgames.pem'));
    }
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(url.toString(), {
            ca: riotRootCA,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
            reject(e);
        });
        req.end();
    });
}
module.exports = {
    fetchLiveClientData,
};
