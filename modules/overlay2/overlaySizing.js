"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeScaleFactor = normalizeScaleFactor;
exports.physicalToDipSize = physicalToDipSize;
exports.hasPointerCoordinates = hasPointerCoordinates;
exports.physicalToDipPoint = physicalToDipPoint;
exports.dipToPhysicalPoint = dipToPhysicalPoint;
exports.dipToPhysicalRect = dipToPhysicalRect;
exports.dipToPhysicalRects = dipToPhysicalRects;
function normalizeScaleFactor(scaleFactor) {
    if (typeof scaleFactor !== 'number' || !Number.isFinite(scaleFactor) || scaleFactor <= 0) {
        return 1;
    }
    return scaleFactor;
}
function physicalToDipSize(physical, scaleFactor) {
    const factor = normalizeScaleFactor(scaleFactor);
    return {
        width: Math.max(1, Math.floor(physical.width / factor)),
        height: Math.max(1, Math.floor(physical.height / factor)),
    };
}
function hasPointerCoordinates(event) {
    return (typeof event.x === 'number' && Number.isFinite(event.x) && typeof event.y === 'number' && Number.isFinite(event.y));
}
function physicalToDipPoint(physical, scaleFactor) {
    const factor = normalizeScaleFactor(scaleFactor);
    return {
        x: Math.round(physical.x / factor),
        y: Math.round(physical.y / factor),
    };
}
function dipToPhysicalPoint(dip, scaleFactor) {
    const factor = normalizeScaleFactor(scaleFactor);
    return {
        x: Math.round(dip.x * factor),
        y: Math.round(dip.y * factor),
    };
}
function isConvertibleRect(rect) {
    if (rect == null || typeof rect !== 'object') {
        return false;
    }
    const { x, y, width, height } = rect;
    return [x, y, width, height].every((value) => typeof value === 'number' && Number.isFinite(value));
}
function dipToPhysicalRect(dip, scaleFactor) {
    if (!isConvertibleRect(dip)) {
        return dip;
    }
    const factor = normalizeScaleFactor(scaleFactor);
    const left = Math.floor(dip.x * factor);
    const top = Math.floor(dip.y * factor);
    const right = Math.ceil((dip.x + dip.width) * factor);
    const bottom = Math.ceil((dip.y + dip.height) * factor);
    return { x: left, y: top, width: right - left, height: bottom - top };
}
function dipToPhysicalRects(dips, scaleFactor) {
    if (!Array.isArray(dips)) {
        return dips;
    }
    return dips.map((dip) => dipToPhysicalRect(dip, scaleFactor));
}
