"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DnsReporter = exports.ConsoleReporter = void 0;
exports.init = init;
exports.registerCheck = registerCheck;
const {
  net
} = require('electron');
class ConsoleReporter {
  async report(sessionNonce, result) {
    console.log(`[ConnectivityTester ${sessionNonce}]`, result);
  }
}
exports.ConsoleReporter = ConsoleReporter;
class DnsLabel {
  constructor(value) {
    this.value = value;
  }
  static create(value) {
    if (value.length === 0) {
      return null;
    }
    const normalized = value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (normalized.length > 63) {
      return null;
    }
    if (normalized.startsWith('-') || normalized.endsWith('-')) {
      return null;
    }
    const collapsed = normalized.replace(/-+/g, '-');
    return new DnsLabel(collapsed);
  }
  toString() {
    return this.value;
  }
  get length() {
    return this.value.length;
  }
}
class DnsQueryBuilder {
  labels = [];
  constructor(baseDomain, version = DNS_ENCODING_VERSION) {
    this.baseDomain = baseDomain;
    this.version = version;
  }
  addLabel(key, primaryValue, secondaryValue) {
    const combined = `${key}-${primaryValue}${secondaryValue != null ? `-${secondaryValue}` : ''}`;
    const label = DnsLabel.create(combined);
    if (label === null) {
      return this;
    }
    this.labels.push(label);
    return this;
  }
  addLabelIf(condition, key, primaryValue, secondaryValue) {
    if (condition && primaryValue !== undefined) {
      return this.addLabel(key, primaryValue, secondaryValue);
    }
    return this;
  }
  suffix() {
    return `${this.version}.${this.baseDomain}`;
  }
  build() {
    if (this.labels.length === 0) {
      return this.baseDomain;
    }
    let currentLength = this.suffix().length;
    let labelCount = 0;
    for (let i = this.labels.length - 1; i >= 0; i--) {
      const labelLength = this.labels[i].length;
      const newLength = currentLength + 1 + labelLength;
      if (newLength > 253) {
        break;
      }
      currentLength = newLength;
      labelCount++;
    }
    const labelsStr = this.labels.slice(0, labelCount).map(l => l.toString()).join('.');
    return `${labelsStr}.${this.suffix()}`;
  }
}
function encodeTimestamp(timestamp) {
  return timestamp.toString(36);
}
function encodeDuration(durationMs) {
  const capped = Math.min(Math.max(0, durationMs), 99999);
  return Math.round(capped).toString(36);
}
function encodeError(error) {
  return `${error.code !== undefined ? `${error.code}-` : ''}${error.message}`;
}
function generateNonce() {
  return Math.random().toString(36).substring(2, 8);
}
const DNS_ENCODING_VERSION = 'v1';
const DEFAULT_BASE_DOMAIN = 'dc-telemetry.net';
class DnsReporter {
  reportedChecks = new Set();
  constructor(baseDomain, clientLocale) {
    this.baseDomain = baseDomain ?? DEFAULT_BASE_DOMAIN;
    this.clientLocale = clientLocale;
  }
  encode(sessionNonce, result) {
    const builder = new DnsQueryBuilder(this.baseDomain);
    builder.addLabel('idt', sessionNonce, encodeTimestamp(result.timestamp)).addLabelIf(this.clientLocale !== undefined, 'loc', this.clientLocale ?? 'unknown').addLabel('chk', result.checkId).addLabel('res', result.success ? 'ok' : 'err').addLabelIf(!result.success, 'err', result.error !== undefined ? encodeError(result.error) : 'unknown').addLabel('dur', encodeDuration(result.durationMs));
    return builder.build();
  }
  async report(sessionNonce, result) {
    if (this.reportedChecks.has(result.checkId)) {
      return;
    }
    this.reportedChecks.add(result.checkId);
    const dnsQuery = this.encode(sessionNonce, result);
    console.log(`[ConnectivityTester ${sessionNonce}] Sending DNS query:`, dnsQuery);
    try {
      await net.fetch(`https://${dnsQuery}`);
    } catch (err) {}
  }
}
exports.DnsReporter = DnsReporter;
class ConnectivityTester {
  checkQueue = [];
  isProcessing = false;
  constructor(config) {
    this.reporter = (config === null || config === void 0 ? void 0 : config.reporter) ?? new ConsoleReporter();
    this.sessionNonce = (config === null || config === void 0 ? void 0 : config.sessionNonce) ?? generateNonce();
    this.processDelayMs = (config === null || config === void 0 ? void 0 : config.processDelayMs) ?? 25;
  }
  registerCheck(check) {
    this.checkQueue.push(check);
    if (!this.isProcessing) {
      void this.processQueue();
    }
  }
  async processQueue() {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    while (this.checkQueue.length > 0) {
      const check = this.checkQueue.shift();
      if (check == null) {
        continue;
      }
      try {
        const result = await check();
        await this.reporter.report(this.sessionNonce, result);
      } catch (err) {
        console.error(`[ConnectivityTester ${this.sessionNonce}] Check execution failed:`, err);
      }
      if (this.checkQueue.length > 0 && this.processDelayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, this.processDelayMs));
      }
    }
    this.isProcessing = false;
  }
}
let connectivityTester = null;
function init(config) {
  if (connectivityTester !== null) {
    return connectivityTester;
  }
  connectivityTester = new ConnectivityTester(config);
  return connectivityTester;
}
function registerCheck(check) {
  init().registerCheck(check);
}