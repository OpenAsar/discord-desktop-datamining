"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAPIEndpoint = getAPIEndpoint;
exports.makeChunkedRequest = makeChunkedRequest;
var electron = _interopRequireWildcard(require("electron"));
var http = _interopRequireWildcard(require("http"));
var https = _interopRequireWildcard(require("https"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  CONSTANTS_GET
} = require('../common/constants').IPCEvents;
async function getAPIEndpoint() {
  const apiEndpoint = await electron.ipcRenderer.invoke(CONSTANTS_GET, 'API_ENDPOINT');
  if (apiEndpoint == null || apiEndpoint === '') {
    return null;
  }
  return apiEndpoint;
}
function makeChunkedRequest(route, chunks, options, callback) {
  return _makeChunkedRequest(route, chunks, options).then(body => callback(null, body)).catch(err => callback(err));
}
async function _makeChunkedRequest(route, chunks, options) {
  const {
    method,
    chunkInterval,
    token,
    contentType
  } = options;
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
        'Content-Length': Buffer.byteLength(chunks.join(''))
      }
    }, res => {
      let responseData = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: responseData
        });
      });
    });
    req.on('error', e => {
      if (writeTimeout !== null) {
        clearTimeout(writeTimeout);
      }
      reject(e);
    });
    for (let i = 0; i < chunks.length; i++) {
      await new Promise(resolve => {
        req.write(chunks[i], () => {
          writeTimeout = setTimeout(resolve, chunkInterval);
        });
      });
    }
    req.end();
  });
}