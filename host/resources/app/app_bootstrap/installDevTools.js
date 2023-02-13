"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// used in devtools to hook in additional dev tools
// require('electron').remote.require('./installDevTools')()
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