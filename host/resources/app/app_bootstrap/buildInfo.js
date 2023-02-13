"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const buildInfo = require(_path.default.join(process.resourcesPath, 'build_info.json'));
var _default = buildInfo;
exports.default = _default;
module.exports = exports.default;