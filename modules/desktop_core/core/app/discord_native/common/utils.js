"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotNullish = isNotNullish;
exports.createLock = createLock;
function isNotNullish(value) {
  return value != null;
}
function createLock() {
  let p = Promise.resolve(null);
  return criticalSection => new Promise((resolve, reject) => {
    p = p.then(criticalSection).then(resolve, reject);
  });
}