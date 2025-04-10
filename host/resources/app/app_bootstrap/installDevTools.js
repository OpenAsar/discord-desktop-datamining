"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function installDevTools() {
  console.log(`Installing Devtron`);
  const devtron = require('devtron');
  if (devtron) {
    devtron.uninstall();
    devtron.install();
    console.log(`Installed Devtron`);
  } else {
    console.log(`Devtron module is not available`);
  }
}
var _default = exports.default = installDevTools;
module.exports = exports.default;