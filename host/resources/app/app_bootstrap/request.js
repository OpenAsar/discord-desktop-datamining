"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _electron = require("electron");
var _querystring = _interopRequireDefault(require("querystring"));
var _request = _interopRequireDefault(require("request"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  Buffer
} = require('node:buffer');
const DEFAULT_REQUEST_TIMEOUT = 30000;
const responseCallbacks = [];
function registerResponseCallback(cb) {
  responseCallbacks.push(cb);
}
function makeHTTPResponse({
  method,
  url,
  headers,
  statusCode,
  statusMessage
}, body) {
  return {
    method,
    url,
    headers,
    statusCode,
    statusMessage,
    body
  };
}
function makeHTTPStatusError(response) {
  return Error(`HTTP Error: Status Code ${response.statusCode}`);
}
function handleCallbacks(args) {
  responseCallbacks.forEach(cb => cb(args));
}
function handleHTTPResponse(resolve, reject, response, stream) {
  const totalBytes = parseInt(response.headers['content-length'] || '1', 10);
  let receivedBytes = 0;
  const chunks = [];
  if (response.statusCode >= 300) {
    stream = null;
  }
  response.on('data', chunk => {
    if (stream != null) {
      receivedBytes += chunk.length;
      stream.write(chunk);
      stream.emit('progress', {
        totalBytes,
        receivedBytes
      });
      return;
    }
    chunks.push(chunk);
  });
  response.on('end', () => {
    if (stream != null) {
      stream.on('finish', () => resolve(makeHTTPResponse(response, null)));
      stream.end();
      return;
    }
    const res = makeHTTPResponse(response, Buffer.concat(chunks));
    if (res.statusCode >= 300) {
      reject(makeHTTPStatusError(res));
      return;
    }
    resolve(res);
  });
}
function wrapPromiseHandlers(url, netInterface, resolve, reject) {
  return {
    wrappedResolve: response => {
      handleCallbacks({
        url,
        netInterface,
        response
      });
      resolve(response);
    },
    wrappedReject: error => {
      handleCallbacks({
        url,
        netInterface,
        error
      });
      reject(error);
    }
  };
}
function nodeRequest({
  method,
  url,
  headers,
  qs,
  timeout,
  body,
  stream
}) {
  return new Promise((resolve, reject) => {
    const {
      wrappedResolve,
      wrappedReject
    } = wrapPromiseHandlers(url, 'node', resolve, reject);
    const req = (0, _request.default)({
      method,
      url,
      qs,
      headers,
      followAllRedirects: true,
      encoding: null,
      timeout: timeout != null ? timeout : DEFAULT_REQUEST_TIMEOUT,
      body
    });
    req.on('response', response => handleHTTPResponse(wrappedResolve, wrappedReject, response, stream));
    req.on('error', err => wrappedReject(err));
  });
}
async function electronRequest({
  method,
  url,
  headers,
  qs,
  timeout,
  body,
  stream
}) {
  await _electron.app.whenReady();
  const {
    net,
    session
  } = require('electron');
  const req = net.request({
    method,
    url: `${url}${qs != null ? `?${_querystring.default.stringify(qs)}` : ''}`,
    redirect: 'follow',
    session: session.defaultSession
  });
  if (headers != null) {
    for (const headerKey of Object.keys(headers)) {
      req.setHeader(headerKey, headers[headerKey]);
    }
  }
  if (body != null) {
    req.write(body, 'utf-8');
  }
  return new Promise((resolve, reject) => {
    const {
      wrappedResolve,
      wrappedReject
    } = wrapPromiseHandlers(url, 'electron', resolve, reject);
    const reqTimeout = setTimeout(() => {
      req.abort();
      wrappedReject(new Error('network timeout'));
    }, timeout != null ? timeout : DEFAULT_REQUEST_TIMEOUT);
    req.on('login', (authInfo, callback) => callback());
    req.on('response', response => {
      clearTimeout(reqTimeout);
      handleHTTPResponse(wrappedResolve, wrappedReject, response, stream);
    });
    req.on('error', err => {
      clearTimeout(reqTimeout);
      wrappedReject(err);
    });
    req.end();
  });
}
async function requestWithMethod(method, opts) {
  let options;
  if (typeof opts === 'string') {
    options = {
      url: opts,
      method
    };
  } else {
    options = {
      ...opts,
      method
    };
  }
  try {
    return await electronRequest(options);
  } catch (err) {
    console.log(`Error downloading with electron net: ${options.url} ${err.message}`);
    console.log('Falling back to node net library..');
  }
  return nodeRequest(options);
}
var _default = exports.default = {
  get: requestWithMethod.bind(null, 'GET'),
  registerResponseCallback: registerResponseCallback.bind(null)
};
module.exports = exports.default;