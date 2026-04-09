"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fatal = fatal;
exports.handled = handled;
exports.init = init;
var _process = _interopRequireDefault(require("process"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const HANDLED_ERROR_INTERVAL = 3;
const HANDLED_ERROR_LIMIT = 10;
let handledErrorCounter = 0;
let totalHandledErrors = 0;
const consoleOutputOnly = undefined !== null;
function isErrorSafeToSuppress(error) {
  return /attempting to call a function in a renderer window/i.test(error.message);
}
function init() {
  _process.default.on('uncaughtException', error => {
    const stack = (error === null || error === void 0 ? void 0 : error.stack) ?? String(error);
    const message = `Uncaught exception:\n ${stack}`;
    console.warn(message);
    if (!isErrorSafeToSuppress(error)) {
      if (consoleOutputOnly) {
        console.error(`${message} error: ${error}`);
        _process.default.exit(-1);
      }
      const {
        dialog
      } = require('electron');
      dialog.showErrorBox('A JavaScript error occurred in the main process', message);
    }
  });
}
function fatal(err) {
  const options = {
    type: 'error',
    message: 'A fatal Javascript error occured',
    detail: (err === null || err === void 0 ? void 0 : err.stack) ?? String(err)
  };
  console.error(`fatal: ${err}\n${err === null || err === void 0 ? void 0 : err.stack}`);
  if (consoleOutputOnly) {
    _process.default.exit(-1);
  }
  const {
    app,
    dialog
  } = require('electron');
  dialog.showMessageBox(options).then(() => app.quit()).catch(error => {
    console.error('Error showing message box:', error);
  });
  const sentry = require('@sentry/electron/main');
  sentry.captureException(err);
}
function handled(err) {
  if (global.releaseChannel !== 'ptb' && global.releaseChannel !== 'canary' && global.releaseChannel !== 'development') {
    return;
  }
  if ((err === null || err === void 0 ? void 0 : err.message) != null) {
    if (err.message.includes('cert_chain_failed') || err.message.includes('network_error') || err.message.includes('storage_error')) {
      if (Math.floor(Math.random() * 1000) > 1) {
        console.warn(`Skipping Sentry report for client cert chain failure`);
        return;
      }
    }
  }
  if (totalHandledErrors < HANDLED_ERROR_LIMIT && handledErrorCounter++ % HANDLED_ERROR_INTERVAL === 0) {
    console.warn('Reporting non-fatal error', err);
    const sentry = require('@sentry/electron/main');
    sentry.captureException(err);
    totalHandledErrors++;
  }
}