"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLock = createLock;
exports.isNotNullish = isNotNullish;
/**
 * This function is primarly useful to type-erase the `null | undefined` in
 * filter statements, allowing you to write more ergonomic code down-the-line.
 *
 * Usage:
 *
 *  values.filter(isNotNullish).map(v => v.toFoo());
 */
function isNotNullish(value) {
  return value != null;
}

// This is a clone of @discordapp/common/utils/MutexUtils.

function createLock() {
  let p = Promise.resolve(null);
  return criticalSection => new Promise((resolve, reject) => {
    p = p.then(criticalSection).then(resolve, reject);
  });
}