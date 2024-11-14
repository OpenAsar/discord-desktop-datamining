"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _https = _interopRequireDefault(require("https"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LIVE_CLIENT_API_HOSTNAME = 'https://127.0.0.1:2999/liveclientdata/';
let riotRootCA;
function fetchLiveClientData(endpoint, riotId) {
  const queryString = riotId != null ? `?riotId=${riotId}}` : '';
  const url = new URL(`${LIVE_CLIENT_API_HOSTNAME}${endpoint}${queryString}`);
  if (riotRootCA == null) {
    riotRootCA = _fs.default.readFileSync(_path.default.join(__dirname, '../../data/riotgames.pem'));
  }
  return new Promise((resolve, reject) => {
    const req = _https.default.request(url.toString(), {
      ca: riotRootCA,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
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
      reject(e);
    });
    req.end();
  });
}
module.exports = {
  fetchLiveClientData
};