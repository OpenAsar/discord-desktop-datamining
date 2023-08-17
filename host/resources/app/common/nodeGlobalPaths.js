"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGlobalPath = addGlobalPath;
exports.getGlobalPaths = getGlobalPaths;
exports.globalPathExists = globalPathExists;
var _module = _interopRequireDefault(require("module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const resolveLookupPaths = _module.default._resolveLookupPaths;
_module.default._resolveLookupPaths = (request, parent) => {
  var _parent$paths;
  const length = parent === null || parent === void 0 ? void 0 : (_parent$paths = parent.paths) === null || _parent$paths === void 0 ? void 0 : _parent$paths.length;
  if (length != null && length !== 0) {
    parent.paths = parent.paths.concat(_module.default.globalPaths);
  } else {
    parent.paths = _module.default.globalPaths;
  }
  return resolveLookupPaths(request, parent);
};
function getGlobalPaths() {
  return _module.default.globalPaths;
}
function addGlobalPath(path) {
  if (_module.default.globalPaths.indexOf(path) === -1) {
    _module.default.globalPaths.push(path);
  }
}
function globalPathExists(path) {
  return _module.default.globalPaths.indexOf(path) !== -1;
}