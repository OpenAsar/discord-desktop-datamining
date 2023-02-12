"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldOpenExternalUrl = shouldOpenExternalUrl;
exports.saferShellOpenExternal = saferShellOpenExternal;
exports.checkUrlOriginMatches = checkUrlOriginMatches;

var _electron = require("electron");

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BLOCKED_URL_PROTOCOLS = ['file:', 'javascript:', 'vbscript:', 'data:', 'about:', 'chrome:', 'ms-cxh:', 'ms-cxh-full:', 'ms-word:'];

function shouldOpenExternalUrl(externalUrl) {
  var parsedUrl;

  try {
    parsedUrl = _url["default"].parse(externalUrl);
  } catch (_) {
    return false;
  }

  if (parsedUrl.protocol == null || BLOCKED_URL_PROTOCOLS.includes(parsedUrl.protocol.toLowerCase())) {
    return false;
  }

  return true;
}

function saferShellOpenExternal(externalUrl) {
  if (shouldOpenExternalUrl(externalUrl)) {
    return _electron.shell.openExternal(externalUrl);
  } else {
    return Promise.reject(new Error('External url open request blocked'));
  }
}

function checkUrlOriginMatches(urlA, urlB) {
  var parsedUrlA;
  var parsedUrlB;

  try {
    parsedUrlA = _url["default"].parse(urlA);
    parsedUrlB = _url["default"].parse(urlB);
  } catch (_) {
    return false;
  }

  return parsedUrlA.protocol === parsedUrlB.protocol && parsedUrlA.slashes === parsedUrlB.slashes && parsedUrlA.host === parsedUrlB.host;
}
