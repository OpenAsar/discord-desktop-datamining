Object.defineProperty(exports, "__esModule", { value: true });
exports.createElectronNetRequestExecutor = exports.makeElectronTransport = void 0;
const core_1 = require("@sentry/core");
const utils_1 = require("@sentry/utils");
const electron_1 = require("electron");
const stream_1 = require("stream");
const url_1 = require("url");
const zlib_1 = require("zlib");
const electron_normalize_1 = require("../electron-normalize");
// Estimated maximum size for reasonable standalone event
const GZIP_THRESHOLD = 1024 * 32;
/**
 * Gets a stream from a Buffer or string
 * We don't have Readable.from in earlier versions of node
 */
function streamFromBody(body) {
    return new stream_1.Readable({
        read() {
            this.push(body);
            this.push(null);
        },
    });
}
function getRequestOptions(url) {
    const { hostname, pathname, port, protocol, search } = new url_1.URL(url);
    return {
        method: 'POST',
        hostname,
        path: `${pathname}${search}`,
        port: parseInt(port, 10),
        protocol,
    };
}
/**
 * Creates a Transport that uses Electrons net module to send events to Sentry.
 */
function makeElectronTransport(options) {
    return (0, core_1.createTransport)(options, createElectronNetRequestExecutor(options.url, options.headers || {}));
}
exports.makeElectronTransport = makeElectronTransport;
/**
 * Creates a RequestExecutor to be used with `createTransport`.
 */
function createElectronNetRequestExecutor(url, baseHeaders) {
    baseHeaders['Content-Type'] = 'application/x-sentry-envelope';
    return function makeRequest(request) {
        return electron_normalize_1.whenAppReady.then(() => new Promise((resolve, reject) => {
            let bodyStream = streamFromBody(request.body);
            const headers = Object.assign({}, baseHeaders);
            if (request.body.length > GZIP_THRESHOLD) {
                headers['content-encoding'] = 'gzip';
                bodyStream = bodyStream.pipe((0, zlib_1.createGzip)());
            }
            const req = electron_1.net.request(getRequestOptions(url));
            for (const header of Object.keys(headers)) {
                req.setHeader(header, headers[header]);
            }
            req.on('response', (res) => {
                var _a, _b;
                res.on('error', reject);
                res.on('data', () => {
                    // Drain socket
                });
                res.on('end', () => {
                    // Drain socket
                });
                // "Key-value pairs of header names and values. Header names are lower-cased."
                // https://nodejs.org/api/http.html#http_message_headers
                const retryAfterHeader = (_a = res.headers['retry-after']) !== null && _a !== void 0 ? _a : undefined;
                const rateLimitsHeader = (_b = res.headers['x-sentry-rate-limits']) !== null && _b !== void 0 ? _b : undefined;
                resolve({
                    headers: (0, utils_1.dropUndefinedKeys)({
                        'retry-after': Array.isArray(retryAfterHeader) ? retryAfterHeader[0] : retryAfterHeader,
                        'x-sentry-rate-limits': Array.isArray(rateLimitsHeader) ? rateLimitsHeader[0] : rateLimitsHeader,
                    }),
                });
            });
            req.on('error', reject);
            // The docs say that ClientRequest is Writable but the types don't match exactly
            bodyStream.pipe(req);
        }));
    };
}
exports.createElectronNetRequestExecutor = createElectronNetRequestExecutor;
//# sourceMappingURL=electron-net.js.map