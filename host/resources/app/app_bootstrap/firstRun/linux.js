"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performFirstRunTasks = performFirstRunTasks;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var paths = _interopRequireWildcard(require("../../common/paths"));
var _errorHandler = require("../errorHandler");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function performFirstRunTasks() {
  const firstRunCompletePath = _path.default.join(paths.getUserDataVersioned(), '.first-run');
  if (!_fs.default.existsSync(firstRunCompletePath)) {
    const symlinkPath = _path.default.join(paths.getUserData(), _path.default.basename(process.execPath));
    const symlinkTemp = symlinkPath + '-new';
    try {
      _fs.default.rmSync(symlinkTemp, {
        force: true
      });
      _fs.default.symlinkSync(process.execPath, symlinkTemp);
      _fs.default.renameSync(symlinkTemp, symlinkPath);
      _fs.default.writeFileSync(firstRunCompletePath, 'true');
    } catch (e) {
      (0, _errorHandler.handled)(e);
    }
  }
}