"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replace = replace;
function replace(GPUSettings) {
  for (const name of Object.keys(GPUSettings)) {
    exports[name] = GPUSettings[name];
  }
}