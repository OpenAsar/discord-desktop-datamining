"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function installDevTools() {
  console.log(`Installing Devtron`);
  const devtron = require('devtron');
  devtron.uninstall();
  devtron.install();
  console.log(`Installed Devtron`);
}
var _default = installDevTools;
exports.default = _default;
module.exports = exports.default;