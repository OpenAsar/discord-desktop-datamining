"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTempFile = isTempFile;

function isTempFile(filename) {
  return /(?:^channel\..+(?:tsi|tsd)$)|(?:^\.tmp.+)/i.test(filename);
}