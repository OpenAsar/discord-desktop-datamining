"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = exports.arch = exports.appArch = void 0;
var _os = _interopRequireDefault(require("os"));
var _process = _interopRequireDefault(require("process"));
var _process$env$PROCESSO, _process$env$PROCESSO2, _process$env$PROCESSO3;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const appArch = _os.default.arch();
exports.appArch = appArch;
let arch = _os.default.arch();
exports.arch = arch;
if (_process.default.platform === 'win32' && _process.default.env['PROCESSOR_ARCHITEW6432'] != null) {
  exports.arch = arch = 'x64';
}
if (((_process$env$PROCESSO = _process.default.env['PROCESSOR_ARCHITECTURE']) === null || _process$env$PROCESSO === void 0 ? void 0 : _process$env$PROCESSO.toString().toLowerCase()) === 'arm64' || ((_process$env$PROCESSO2 = _process.default.env['PROCESSOR_ARCHITEW6432']) === null || _process$env$PROCESSO2 === void 0 ? void 0 : _process$env$PROCESSO2.toString().toLowerCase()) === 'arm64' || ((_process$env$PROCESSO3 = _process.default.env['PROCESSOR_IDENTIFIER']) === null || _process$env$PROCESSO3 === void 0 ? void 0 : _process$env$PROCESSO3.toString().toLowerCase().includes('arm'))) {
  exports.arch = arch = 'arm64';
}
const release = _os.default.release();
exports.release = release;