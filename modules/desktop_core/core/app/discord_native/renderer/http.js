"use strict";

const electron = require('electron');
const http = require('http');
const https = require('https');
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
async function makeChunkedRequest(route, chunks, options) {
  const {
    method,
    chunkInterval,
    token,
    contentType
  } = options;
  let httpModule = http;
  if (route.startsWith('https')) {
    httpModule = https;
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
    let writeTimeout;
    const req = httpModule.request(url.toString(), {
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
      if (writeTimeout != null) {
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
module.exports = {
  getAPIEndpoint,
  makeChunkedRequest: function (route, chunks, options, callback) {
    makeChunkedRequest(route, chunks, options).then(body => callback(null, body)).catch(err => callback(err));
  }
};