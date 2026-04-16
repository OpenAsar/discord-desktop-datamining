"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewestMinidumpInformation = getNewestMinidumpInformation;
const processUtils_1 = require("../../../common/processUtils");
const minidump_1 = require("./minidump");
async function getNewestMinidumpInformation(minidumpPath) {
    if (!processUtils_1.IS_WIN)
        return null;
    try {
        return await (0, minidump_1.readMinidump)(minidumpPath);
    }
    catch (e) {
        console.log(`getNewestMinidumpInformation exception: ${e}`);
        return null;
    }
}
