"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = exports.arch = void 0;
var _os = _interopRequireDefault(require("os"));
var _process = _interopRequireDefault(require("process"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let arch = _os.default.arch();
exports.arch = arch;
if (_process.default.platform === 'win32' && _process.default.env['PROCESSOR_ARCHITEW6432'] != null) {
  exports.arch = arch = 'x64';
}
const release = _os.default.release();
exports.release = release;