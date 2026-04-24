"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
exports.getFeatures = getFeatures;
const FeatureFlags_1 = __importDefault(require("../common/FeatureFlags"));
let features;
function init() {
    features = new FeatureFlags_1.default();
}
function getFeatures() {
    return features;
}
