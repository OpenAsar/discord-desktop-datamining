"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewestMinidumpInformation = getNewestMinidumpInformation;
var _processUtils = require("../../../common/processUtils");
var _minidump = require("./minidump");
async function getNewestMinidumpInformation(minidumpPath) {
  if (!_processUtils.IS_WIN) return null;
  try {
    return await (0, _minidump.readMinidump)(minidumpPath);
  } catch (e) {
    console.log(`getNewestMinidumpInformation exception: ${e}`);
    return null;
  }
}