"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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