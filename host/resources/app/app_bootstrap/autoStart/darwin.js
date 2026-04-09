"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.isInstalled = isInstalled;
exports.uninstall = uninstall;
exports.update = update;
function install(callback) {
  callback();
}
function update(callback) {
  callback();
}
function isInstalled(callback) {
  callback(false);
}
function uninstall(callback) {
  callback();
}