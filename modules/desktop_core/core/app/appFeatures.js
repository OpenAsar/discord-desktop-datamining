"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeatures = getFeatures;
exports.init = init;
var _FeatureFlags = _interopRequireDefault(require("../common/FeatureFlags"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let features;
function init() {
  features = new _FeatureFlags.default();
}
function getFeatures() {
  return features;
}