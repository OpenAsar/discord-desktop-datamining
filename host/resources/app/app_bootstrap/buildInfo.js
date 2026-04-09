"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const buildInfo = require(_path.default.join(process.resourcesPath, 'build_info.json'));
var _default = exports.default = buildInfo;
module.exports = exports.default;