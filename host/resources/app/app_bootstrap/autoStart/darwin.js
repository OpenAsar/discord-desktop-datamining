"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.isInstalled = isInstalled;
exports.uninstall = uninstall;
exports.update = update;
function install(callback) {
  return callback();
}
function update(callback) {
  return callback();
}
function isInstalled(callback) {
  return callback(false);
}
function uninstall(callback) {
  return callback();
}