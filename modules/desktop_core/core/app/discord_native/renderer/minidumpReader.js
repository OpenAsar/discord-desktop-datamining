"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewestMinidumpInformation = getNewestMinidumpInformation;
var _processUtils = require("../../../common/processUtils");
var _paths = require("../common/paths");
var _minidump = require("./minidump");
/* eslint-disable no-console */

// This is unfortunately in its own file because Jest breaks when it sees original-fs.
async function getNewestMinidumpInformation() {
  if (!_processUtils.IS_WIN) return null;
  try {
    const files = await (0, _paths.getCrashFiles)();
    if (files == null || files.length === 0) return null;
    return await (0, _minidump.readMinidump)(files[0]);
  } catch (e) {
    console.log(`getNewestMinidumpInformation exception: ${e}`);
    return null;
  }
}