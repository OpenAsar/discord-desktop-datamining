"use strict";

exports.replace = function (GPUSettings) {
  for (const name of Object.keys(GPUSettings)) {
    exports[name] = GPUSettings[name];
  }
};