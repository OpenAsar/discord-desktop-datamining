"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalPaths = getGlobalPaths;
exports.addGlobalPath = addGlobalPath;
exports.globalPathExists = globalPathExists;
const module_1 = __importDefault(require("module"));
const resolveLookupPaths = module_1.default._resolveLookupPaths;
module_1.default._resolveLookupPaths = (request, parent) => {
    const length = parent?.paths?.length;
    if (length != null && length !== 0) {
        parent.paths = parent.paths.concat(module_1.default.globalPaths);
    }
    else {
        parent.paths = module_1.default.globalPaths;
    }
    return resolveLookupPaths(request, parent);
};
function getGlobalPaths() {
    return module_1.default.globalPaths;
}
function addGlobalPath(path) {
    if (module_1.default.globalPaths.indexOf(path) === -1) {
        module_1.default.globalPaths.push(path);
    }
}
function globalPathExists(path) {
    return module_1.default.globalPaths.indexOf(path) !== -1;
}
