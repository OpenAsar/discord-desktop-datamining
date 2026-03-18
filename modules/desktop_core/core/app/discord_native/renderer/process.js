"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.platform = exports.pid = exports.env = exports.arch = void 0;
var process = _interopRequireWildcard(require("process"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const _env = process.env;
const pid = exports.pid = process.pid;
const _platform = process.platform;
const platform = exports.platform = _platform === 'darwin' || _platform === 'linux' || _platform === 'win32' ? _platform : 'unknown';
const _arch = process.arch;
const arch = exports.arch = _arch === 'x64' || _arch === 'arm64' ? _arch : '';
const env = exports.env = {
  DISCORD_TEST: _env['DISCORD_TEST'],
  DISCORD_GATEWAY_PLAINTEXT: _env['DISCORD_GATEWAY_PLAINTEXT'],
  DISCORD_DISALLOW_POPUPS: _env['DISCORD_DISALLOW_POPUPS'],
  LOCALAPPDATA: _env['LOCALAPPDATA'],
  'PROGRAMFILES(X86)': _env['PROGRAMFILES(X86)'],
  PROGRAMFILES: _env['PROGRAMFILES'],
  PROGRAMW6432: _env['PROGRAMW6432'],
  PROGRAMDATA: _env['PROGRAMDATA']
};