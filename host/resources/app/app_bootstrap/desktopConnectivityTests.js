"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDesktopConnectivityTests = registerDesktopConnectivityTests;
const connectivityTester = __importStar(require("./connectivityTester"));
const request_1 = __importDefault(require("./request"));
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
    const urlRegex = new RegExp(`^https?:\\/\\/(?:(?:[^\\/]*\\.)?discord(?:app)?\\.com|localhost(?::\\d+)?)\\/${pathPattern}(?:\\?.*)?$`);
    return {
        urlFilterPatterns: [
            `*://*.discord.com/${pathFilterPattern}?*`,
            `*://*.discord.com/${pathFilterPattern}`,
            `*://*.discordapp.com/${pathFilterPattern}?*`,
            `*://*.discordapp.com/${pathFilterPattern}`,
            ...(CHANNEL === 'development'
                ? [`*://localhost:*/${pathFilterPattern}?*`, `*://localhost:*/${pathFilterPattern}`]
                : []),
        ],
        urlRegex,
    };
}
function formatErrorMessage(message) {
    if (message == null || message.length === 0) {
        return 'unknown';
    }
    const match = message.match(/net::?ERR_([A-Z_]+)/);
    if (match == null) {
        return message
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .substring(0, 55);
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
        unreachable: 'unreach',
    };
    let abbreviated = errorCode;
    for (const [full, abbr] of Object.entries(abbreviations)) {
        abbreviated = abbreviated.replace(full, abbr);
    }
    return abbreviated.substring(0, 55);
}
const DESKTOP_TESTS = {
    webapp: createDesktopTest('app'),
    updaterdep: createDesktopTest('api/updates', true),
};
let trackedNetErrQuicProtocol = false;
function registerDesktopConnectivityTests(session, locale) {
    connectivityTester.init({
        reporter: new connectivityTester.DnsReporter('dc-telemetry.net', locale),
    });
    const urlFilterPatterns = [];
    const urlToTestName = [];
    for (const [testName, test] of Object.entries(DESKTOP_TESTS)) {
        urlFilterPatterns.push(...test.urlFilterPatterns);
        urlToTestName.push({ regex: test.urlRegex, testName: testName });
    }
    session.webRequest.onErrorOccurred({
        urls: urlFilterPatterns,
    }, (details) => {
        if (!trackedNetErrQuicProtocol && details.error.includes('net::ERR_QUIC_PROTOCOL_ERROR')) {
            trackedNetErrQuicProtocol = true;
            console.error(`WebRequest failed (${details.error}): '${details.method} ${details.url}'`);
            const sentry = crashReporterSetup.getGlobalSentry();
            if (sentry != null) {
                sentry.captureMessage(`WebRequest failed: ${details.error}`, 'error');
            }
        }
        const testName = urlToTestName.find((url) => url.regex.test(details.url))?.testName;
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
                    message: formatErrorMessage(details.error),
                },
            });
        });
    });
    session.webRequest.onCompleted({
        urls: urlFilterPatterns,
    }, (details) => {
        const testName = urlToTestName.find((url) => url.regex.test(details.url))?.testName;
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
                error: isSuccess
                    ? undefined
                    : {
                        message: `status-${details.statusCode}`,
                        code: details.statusCode,
                    },
            });
        });
    });
    request_1.default.registerResponseCallback((args) => {
        const testName = urlToTestName.find((url) => url.regex.test(args.url))?.testName;
        if (testName === undefined) {
            return;
        }
        connectivityTester.registerCheck(() => {
            const errMessage = args.error !== undefined
                ? formatErrorMessage(args.error.message)
                : args.response?.statusCode !== undefined
                    ? `status-${args.response.statusCode}`
                    : 'unknown';
            return Promise.resolve({
                checkId: testName,
                timestamp: Date.now(),
                success: args.error === undefined,
                durationMs: 0,
                error: args.error !== undefined
                    ? {
                        message: errMessage,
                        code: args.response?.statusCode ?? undefined,
                    }
                    : undefined,
            });
        });
    });
}
