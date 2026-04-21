"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = copy;
exports.copyImage = copyImage;
exports.copyFile = copyFile;
exports.cut = cut;
exports.paste = paste;
exports.read = read;
exports.hasMixedContent = hasMixedContent;
const assert_1 = __importDefault(require("assert"));
const electron_1 = __importDefault(require("electron"));
const { CLIPBOARD_COPY, CLIPBOARD_CUT, CLIPBOARD_PASTE } = require('../common/constants').IPCEvents;
function copy(text) {
    if (text != null && text.length > 0) {
        electron_1.default.clipboard.writeText(text);
    }
    else {
        void electron_1.default.ipcRenderer.invoke(CLIPBOARD_COPY);
    }
}
function copyImage(imageArrayBuffer, imageSrc) {
    (0, assert_1.default)(imageArrayBuffer != null, 'Image data is empty');
    const nativeImg = electron_1.default.nativeImage.createFromBuffer(imageArrayBuffer);
    electron_1.default.clipboard.write({ html: `<img src="${imageSrc}">`, image: nativeImg });
}
function copyFile(filePath) {
    (0, assert_1.default)(filePath != null, 'File path is empty');
    if (process.platform === 'darwin') {
        const fileUrl = `file://${filePath}`;
        electron_1.default.clipboard.writeBuffer('public.file-url', Buffer.from(fileUrl, 'utf8'));
    }
    else if (process.platform === 'win32') {
        const filePathWithNull = `${filePath}\0`;
        const buffer = Buffer.from(filePathWithNull, 'ucs2');
        electron_1.default.clipboard.writeBuffer('FileNameW', buffer);
    }
    else {
        electron_1.default.clipboard.writeText(`file://${filePath}`);
    }
}
function cut() {
    void electron_1.default.ipcRenderer.invoke(CLIPBOARD_CUT);
}
function paste() {
    void electron_1.default.ipcRenderer.invoke(CLIPBOARD_PASTE);
}
function read() {
    return electron_1.default.clipboard.readText();
}
function hasMixedContent() {
    const formats = electron_1.default.clipboard.availableFormats();
    const textContent = electron_1.default.clipboard.readText();
    const hasText = textContent != null && textContent.trim().length > 0;
    const hasImage = formats.some((f) => f.startsWith('image/')
        || f === 'CF_DIB'
        || f === 'CF_BITMAP'
        || f === 'CF_DIBV5'
        || f.toLowerCase().includes('image')
        || f.toLowerCase().includes('bitmap'));
    return hasText && hasImage;
}
