"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fatal = fatal;
exports.handled = handled;
exports.init = init;

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _electron = require("electron");

var _process = _interopRequireDefault(require("process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const HANDLED_ERROR_INTERVAL = 3;
const HANDLED_ERROR_LIMIT = 10;
let handledErrorCounter = 0;
let totalHandledErrors = 0;
const consoleOutputOnly = _process.default.env.DISCORD_TEST != null;

function isErrorSafeToSuppress(error) {
  return /attempting to call a function in a renderer window/i.test(error.message);
}

function init() {
  _process.default.on('uncaughtException', error => {
    const stack = error.stack ? error.stack : String(error);
    const message = `Uncaught exception:\n ${stack}`;
    console.warn(message);

    if (!isErrorSafeToSuppress(error)) {
      if (consoleOutputOnly) {
        console.error(`${message} error: ${error}`);

        _process.default.exit(-1);
      }

      _electron.dialog.showErrorBox('A JavaScript error occurred in the main process', message);
    }
  });
} // show a similar error message to the error handler, except exit out the app
// after the error message has been closed


function fatal(err) {
  const options = {
    type: 'error',
    message: 'A fatal Javascript error occured',
    detail: err && err.stack ? err.stack : String(err)
  };

  if (consoleOutputOnly) {
    console.error(`fatal: ${err}`);

    _process.default.exit(-1);
  }

  const callback = _ => _electron.app.quit();

  const electronMajor = parseInt(_process.default.versions.electron.split('.')[0]);

  if (electronMajor >= 6) {
    _electron.dialog.showMessageBox(null, options).then(callback);
  } else {
    _electron.dialog.showMessageBox(options, callback);
  }

  Sentry.captureException(err);
} // capture a handled error for telemetry purposes, e.g. finding update loops.


function handled(err) {
  if (global.releaseChannel !== 'ptb' && global.releaseChannel !== 'canary' && global.releaseChannel !== 'development') {
    return;
  }

  if (totalHandledErrors < HANDLED_ERROR_LIMIT && handledErrorCounter++ % HANDLED_ERROR_INTERVAL == 0) {
    console.warn('Reporting non-fatal error', err);
    Sentry.captureException(err);
    totalHandledErrors++;
  }
}