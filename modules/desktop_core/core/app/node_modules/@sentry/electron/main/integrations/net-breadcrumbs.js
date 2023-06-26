Object.defineProperty(exports, "__esModule", { value: true });
exports.Net = exports.normalizeOptions = void 0;
const tslib_1 = require("tslib");
/* eslint-disable deprecation/deprecation */
const core_1 = require("@sentry/core");
const utils_1 = require("@sentry/utils");
const electron_1 = require("electron");
const urlModule = tslib_1.__importStar(require("url"));
const DEFAULT_OPTIONS = {
    breadcrumbs: true,
    tracing: (_method, _url) => true,
    tracingOrigins: (_method, _url) => true,
};
/** Converts all user supplied options to T | false */
function normalizeOptions(options) {
    return Object.keys(options).reduce((obj, k) => {
        if (typeof options[k] === 'function' || options[k] === false) {
            obj[k] = options[k];
        }
        return obj;
    }, {});
}
exports.normalizeOptions = normalizeOptions;
/** http module integration */
class Net {
    /** @inheritDoc */
    constructor(options = {}) {
        /** @inheritDoc */
        this.name = Net.id;
        this._options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), normalizeOptions(options));
    }
    /** @inheritDoc */
    setupOnce() {
        // No need to instrument if we don't want to track anything
        if (this._options.breadcrumbs || this._options.tracing) {
            (0, utils_1.fill)(electron_1.net, 'request', createWrappedRequestFactory(this._options));
        }
    }
}
exports.Net = Net;
/** @inheritDoc */
Net.id = 'Net';
/**
 * Trimmed down version of the code from Electron here:
 * https://github.com/electron/electron/blob/f3df76dbdc58cb704637b89357e1400791c92cfe/lib/browser/api/net.ts#L209-L269
 *
 * We want to match the final URL that Electron uses
 */
function parseOptions(optionsIn) {
    const { method, options } = typeof optionsIn === 'string'
        ? { method: 'GET', options: urlModule.parse(optionsIn) }
        : { method: (optionsIn.method || 'GET').toUpperCase(), options: optionsIn };
    let url = 'url' in options ? options.url : undefined;
    if (!url) {
        const urlObj = {};
        urlObj.protocol = options.protocol || 'http:';
        if (options.host) {
            urlObj.host = options.host;
        }
        else {
            if (options.hostname) {
                urlObj.hostname = options.hostname;
            }
            else {
                urlObj.hostname = 'localhost';
            }
            if (options.port) {
                urlObj.port = options.port;
            }
        }
        const pathObj = urlModule.parse(options.path || '/');
        urlObj.pathname = pathObj.pathname;
        urlObj.search = pathObj.search;
        urlObj.hash = pathObj.hash;
        url = urlModule.format(urlObj);
    }
    return {
        method,
        url,
    };
}
/** */
function createWrappedRequestFactory(options) {
    return function wrappedRequestMethodFactory(originalRequestMethod) {
        return function requestMethod(reqOptions) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const netModule = this;
            const { url, method } = parseOptions(reqOptions);
            const request = originalRequestMethod.apply(netModule, [reqOptions]);
            if (url.match(/sentry_key/) || request.getHeader('x-sentry-auth')) {
                return request;
            }
            let span;
            const scope = (0, core_1.getCurrentHub)().getScope();
            if (scope && options.tracing && options.tracing(method, url)) {
                const parentSpan = scope.getSpan();
                if (parentSpan) {
                    span = parentSpan.startChild({
                        description: `${method} ${url}`,
                        op: 'http.client',
                    });
                    if (options.tracingOrigins && options.tracingOrigins(method, url)) {
                        request.setHeader('sentry-trace', span.toTraceparent());
                    }
                }
            }
            return request
                .once('response', function (res) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const req = this;
                if (options.breadcrumbs) {
                    addRequestBreadcrumb('response', method, url, req, res);
                }
                if (span) {
                    if (res.statusCode) {
                        span.setHttpStatus(res.statusCode);
                    }
                    span.finish();
                }
            })
                .once('error', function (_error) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const req = this;
                if (options.breadcrumbs) {
                    addRequestBreadcrumb('error', method, url, req, undefined);
                }
                if (span) {
                    span.setHttpStatus(500);
                    span.finish();
                }
            });
        };
    };
}
/**
 * Captures Breadcrumb based on provided request/response pair
 */
function addRequestBreadcrumb(event, method, url, req, res) {
    (0, core_1.getCurrentHub)().addBreadcrumb({
        type: 'http',
        category: 'electron.net',
        data: {
            url,
            method: method,
            status_code: res && res.statusCode,
        },
    }, {
        event,
        request: req,
        response: res,
    });
}
//# sourceMappingURL=net-breadcrumbs.js.map