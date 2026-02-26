"use strict";

var _assert = _interopRequireDefault(require("assert"));
var _electron = _interopRequireDefault(require("electron"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  CLIPBOARD_COPY,
  CLIPBOARD_CUT,
  CLIPBOARD_PASTE
} = require('../common/constants').IPCEvents;
function copy(text) {
  if (text) {
    _electron.default.clipboard.writeText(text);
  } else {
    _electron.default.ipcRenderer.invoke(CLIPBOARD_COPY);
  }
}
function copyImage(imageArrayBuffer, imageSrc) {
  (0, _assert.default)(imageArrayBuffer != null, 'Image data is empty');
  const nativeImg = _electron.default.nativeImage.createFromBuffer(imageArrayBuffer);
  _electron.default.clipboard.write({
    html: `<img src="${imageSrc}">`,
    image: nativeImg
  });
}
function copyFile(filePath) {
  (0, _assert.default)(filePath != null, 'File path is empty');
  if (process.platform === 'darwin') {
    _electron.default.clipboard.writeBuffer('public.file-url', Buffer.from(`file://${filePath}`, 'utf8'));
  } else if (process.platform === 'win32') {
    const buffer = Buffer.from(`${filePath}\0`, 'ucs2');
    _electron.default.clipboard.writeBuffer('FileNameW', buffer);
  } else {
    _electron.default.clipboard.writeText(`file://${filePath}`);
  }
}
function cut() {
  _electron.default.ipcRenderer.invoke(CLIPBOARD_CUT);
}
function paste() {
  _electron.default.ipcRenderer.invoke(CLIPBOARD_PASTE);
}
function read() {
  return _electron.default.clipboard.readText();
}
function hasMixedContent() {
  const formats = _electron.default.clipboard.availableFormats();
  const textContent = _electron.default.clipboard.readText();
  const hasText = textContent != null && textContent.trim().length > 0;
  const hasImage = formats.some(f => f.startsWith('image/') || f === 'CF_DIB' || f === 'CF_BITMAP' || f === 'CF_DIBV5' || f.toLowerCase().includes('image') || f.toLowerCase().includes('bitmap'));
  return hasText && hasImage;
}
module.exports = {
  copy,
  copyImage,
  copyFile,
  cut,
  paste,
  read,
  hasMixedContent
};