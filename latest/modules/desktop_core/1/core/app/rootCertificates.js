"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestCA = getRequestCA;
exports.init = init;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-console */

let requestCA;
function init() {
  let rootCertificateAuthorities;
  try {
    rootCertificateAuthorities = _fs.default.readFileSync(_path.default.join(__dirname, 'data', 'cacert.pem'));
  } catch (err) {
    console.error('Unable to load root certificate authorities.');
    console.error(err);
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  requestCA = rootCertificateAuthorities ? {
    ca: rootCertificateAuthorities
  } : {};
}

// TODO: do we use this export?
function getRequestCA() {
  return requestCA;
}