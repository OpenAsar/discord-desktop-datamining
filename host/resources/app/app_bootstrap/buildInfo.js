"use strict";

var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const buildInfo = require(_path.default.join(process.resourcesPath, 'build_info.json'));
module.exports = buildInfo;