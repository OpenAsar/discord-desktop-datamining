"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerDesktopConnectivityTests = registerDesktopConnectivityTests;
var connectivityTester = _interopRequireWildcard(require("./connectivityTester"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const crashReporterSetup = require('../common/crashReporterSetup');
const buildInfo = require('./buildInfo');
const CHANNEL = buildInfo.releaseChannel;
function createDesktopTest(path, prefixMatch = false) {
  if (path.startsWith('/')) {
    path = path.substring(1);
  }
  if (path.endsWith('/')) {
    path = path.substring(0, path.length - 1);
  }
  const pathFilterPattern = prefixMatch ? `${path}*` : `${path}`;
  const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pathPattern = prefixMatch ? `${escapedPath}.*` : escapedPath;
  const urlRegex = new RegExp(`^https?:\\/\\/(?:[^\\/]*\\.discord(?:app)?\\.com|localhost(?::\\d+)?)\\/${pathPattern}(?:\\?.*)?$`);
  return {
    urlFilterPatterns: [`*://*.discord.com/${pathFilterPattern}?*`, `*://*.discord.com/${pathFilterPattern}`, `*://*.discordapp.com/${pathFilterPattern}?*`, `*://*.discordapp.com/${pathFilterPattern}`, ...(CHANNEL === 'development' ? [`*://localhost:*/${pathFilterPattern}?*`, `*://localhost:*/${pathFilterPattern}`] : [])],
    urlRegex
  };
}
function formatErrorMessage(message) {
  if (message == null || message.length === 0) {
    return 'unknown';
  }
  const match = message.match(/net::?ERR_([A-Z_]+)/);
  if (match == null) {
    return message.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 55);
  }
  const errorCode = match[1].toLowerCase().replace(/_/g, '-');
  const abbreviations = {
    connection: 'conn',
    certificate: 'cert',
    authentication: 'auth',
    aborted: 'abort',
    network: 'net',
    invalid: 'inv',
    response: 'resp',
    request: 'req',
    address: 'addr',
    unreachable: 'unreach'
  };
  let abbreviated = errorCode;
  for (const [full, abbr] of Object.entries(abbreviations)) {
    abbreviated = abbreviated.replace(full, abbr);
  }
  return abbreviated.substring(0, 55);
}
const DESKTOP_TESTS = {
  webapp: createDesktopTest('app')
};
let trackedNetErrQuicProtocol = false;
function registerDesktopConnectivityTests(session, locale) {
  connectivityTester.init({
    reporter: new connectivityTester.DnsReporter('dc-telemetry.net', locale)
  });
  const urlFilterPatterns = [];
  const urlToTestName = [];
  for (const [testName, test] of Object.entries(DESKTOP_TESTS)) {
    urlFilterPatterns.push(...test.urlFilterPatterns);
    urlToTestName.push({
      regex: test.urlRegex,
      testName: testName
    });
  }
  session.webRequest.onErrorOccurred({
    urls: urlFilterPatterns
  }, details => {
    var _urlToTestName$find;
    if (!trackedNetErrQuicProtocol && details.error.includes('net::ERR_QUIC_PROTOCOL_ERROR')) {
      trackedNetErrQuicProtocol = true;
      console.error(`WebRequest failed (${details.error}): '${details.method} ${details.url}'`);
      const sentry = crashReporterSetup.getGlobalSentry();
      if (sentry != null) {
        sentry.captureMessage(`WebRequest failed: ${details.error}`, 'error');
      }
    }
    const testName = (_urlToTestName$find = urlToTestName.find(url => url.regex.test(details.url))) === null || _urlToTestName$find === void 0 ? void 0 : _urlToTestName$find.testName;
    if (testName === undefined) {
      return;
    }
    connectivityTester.registerCheck(() => {
      return Promise.resolve({
        checkId: testName,
        timestamp: Date.now(),
        success: false,
        durationMs: typeof details.fromCache === 'boolean' && details.fromCache ? 0 : 0,
        error: {
          message: formatErrorMessage(details.error)
        }
      });
    });
  });
  session.webRequest.onCompleted({
    urls: urlFilterPatterns
  }, details => {
    var _urlToTestName$find2;
    const testName = (_urlToTestName$find2 = urlToTestName.find(url => url.regex.test(details.url))) === null || _urlToTestName$find2 === void 0 ? void 0 : _urlToTestName$find2.testName;
    if (testName === undefined) {
      return;
    }
    const isSuccess = details.statusCode >= 200 && details.statusCode < 400;
    connectivityTester.registerCheck(() => {
      return Promise.resolve({
        checkId: testName,
        timestamp: Date.now(),
        success: isSuccess,
        durationMs: typeof details.fromCache === 'boolean' && details.fromCache ? 0 : 0,
        error: isSuccess ? undefined : {
          message: `status-${details.statusCode}`,
          code: details.statusCode
        }
      });
    });
  });
}