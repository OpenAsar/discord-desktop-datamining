"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
exports.getRequestCA = getRequestCA;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let requestCA;
function init() {
    let rootCertificateAuthorities;
    try {
        rootCertificateAuthorities = fs_1.default.readFileSync(path_1.default.join(__dirname, 'data', 'cacert.pem'));
    }
    catch (err) {
        console.error('Unable to load root certificate authorities.');
        console.error(err);
    }
    requestCA = rootCertificateAuthorities ? { ca: rootCertificateAuthorities } : {};
}
function getRequestCA() {
    return requestCA;
}
