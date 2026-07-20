"use strict";
const addon = require("./discord_arborium.node");
function encodeHtmlFormat(format) {
    switch (format?.kind) {
        case 'custom-elements-with-prefix':
            return { format: 1, prefix: format.prefix };
        case 'class-names':
            return { format: 2 };
        case 'class-names-with-prefix':
            return { format: 3, prefix: format.prefix };
        default:
            return { format: 0 };
    }
}
function availableLanguages() {
    return addon.availableLanguages();
}
function highlightToSpans(language, text, options = {}) {
    return addon.highlightToSpans(language, text, options.maxInjectionDepth);
}
function highlightToHtml(language, text, options = {}) {
    const { format, prefix } = encodeHtmlFormat(options.format);
    return addon.highlightToHtmlString(language, text, {
        maxInjectionDepth: options.maxInjectionDepth,
        format,
        prefix,
    });
}
class Session {
    _inner;
    constructor(language) {
        this._inner = new addon.Session(language);
    }
    setText(text) {
        this._inner.setText(text);
    }
    parse() {
        return this._inner.parse();
    }
    highlightToSpans(options = {}) {
        return this._inner.highlightToSpans({ maxInjectionDepth: options.maxInjectionDepth });
    }
    highlightToHtml(options = {}) {
        const { format, prefix } = encodeHtmlFormat(options.format);
        return this._inner.highlightToHtml({
            maxInjectionDepth: options.maxInjectionDepth,
            format,
            prefix,
        });
    }
    cancel() {
        this._inner.cancel();
    }
    free() {
        this._inner.free();
    }
}
module.exports = { availableLanguages, highlightToSpans, highlightToHtml, Session };
