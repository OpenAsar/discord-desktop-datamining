"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeatures = getFeatures;
exports.init = init;
var _FeatureFlags = _interopRequireDefault(require("../common/FeatureFlags"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let features;
function init() {
  features = new _FeatureFlags.default();
}
function getFeatures() {
  return features;
}