"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = flatten;
exports.reconcileCrashReporterMetadata = reconcileCrashReporterMetadata;
function flatten(metadata, prefix = null, root = null) {
    root = root !== null ? root : {};
    prefix = prefix !== null ? prefix : '';
    if (typeof metadata === 'object') {
        for (const key in metadata) {
            const nextPrefix = prefix === '' ? key : `${prefix}[${key}]`;
            flatten(metadata[key], nextPrefix, root);
        }
    }
    else {
        root[prefix] = String(metadata);
    }
    return root;
}
function reconcileCrashReporterMetadata(crashReporter, metadata) {
    const newMetadata = flatten(metadata);
    const oldMetadata = crashReporter.getParameters();
    for (const key in oldMetadata) {
        if (!newMetadata.hasOwnProperty(key)) {
            crashReporter.removeExtraParameter(key);
        }
    }
    for (const key in newMetadata) {
        if (!oldMetadata.hasOwnProperty(key)) {
            crashReporter.addExtraParameter(key, String(newMetadata[key]));
        }
    }
}
