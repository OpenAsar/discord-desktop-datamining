"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_WIN = exports.IS_OSX = exports.IS_LINUX = void 0;
var _process = _interopRequireDefault(require("process"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const IS_WIN = exports.IS_WIN = _process.default.platform === 'win32';
const IS_OSX = exports.IS_OSX = _process.default.platform === 'darwin';
const IS_LINUX = exports.IS_LINUX = _process.default.platform === 'linux';