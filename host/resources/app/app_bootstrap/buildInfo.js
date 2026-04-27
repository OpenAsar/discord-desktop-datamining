"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const buildInfo = require(path_1.default.join(process.resourcesPath, 'build_info.json'));
module.exports = buildInfo;
