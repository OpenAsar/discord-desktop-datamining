"use strict";

var electron = _interopRequireWildcard(require("electron"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  CLIPBOARD_COPY,
  CLIPBOARD_CUT,
  CLIPBOARD_PASTE
} = require('../common/constants').IPCEvents;
electron.ipcMain.handle(CLIPBOARD_COPY, async () => {
  var _electron$webContents;
  (_electron$webContents = electron.webContents.getFocusedWebContents()) === null || _electron$webContents === void 0 ? void 0 : _electron$webContents.copy();
});
electron.ipcMain.handle(CLIPBOARD_CUT, async () => {
  var _electron$webContents2;
  (_electron$webContents2 = electron.webContents.getFocusedWebContents()) === null || _electron$webContents2 === void 0 ? void 0 : _electron$webContents2.cut();
});
electron.ipcMain.handle(CLIPBOARD_PASTE, async () => {
  var _electron$webContents3;
  (_electron$webContents3 = electron.webContents.getFocusedWebContents()) === null || _electron$webContents3 === void 0 ? void 0 : _electron$webContents3.paste();
});