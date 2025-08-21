"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthorization = getAuthorization;
exports.getSettings = getSettings;
exports.removeAllNotifications = removeAllNotifications;
exports.removeNotifications = removeNotifications;
exports.setCallbacks = setCallbacks;
exports.showNotification = showNotification;
var electron = _interopRequireWildcard(require("electron"));
var _fs = _interopRequireDefault(require("fs"));
var _os = _interopRequireDefault(require("os"));
var _stream = require("stream");
var _uuid = require("uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /* eslint-disable-next-line import/no-unresolved */
var notifications = new Map();
// TODO: This is a temporary fix for the icon cache. We should use a better cache system in the future.
// Of concern - data uris are large
var assetMap = new Map();
var handlerOnNotificationAction = function handlerOnNotificationAction() {};
function handleNotificationAction(action, identifier, args) {
  handlerOnNotificationAction(action, identifier, args);
}
function setCallbacks(onNotificationAction) {
  handlerOnNotificationAction = onNotificationAction;
}
function getAuthorization() {
  return Promise.resolve(true);
}
function getSettings() {
  return Promise.resolve({
    authorizationStatus: 'authorized'
  });
}
function getAssetUrl(_x) {
  return _getAssetUrl.apply(this, arguments);
}
function _getAssetUrl() {
  _getAssetUrl = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(assetUrl) {
    var path, filePath;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (assetUrl) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", Promise.resolve(undefined));
        case 2:
          if (!assetMap.has(assetUrl)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", Promise.resolve(assetMap.get(assetUrl)));
        case 4:
          path = _os["default"].tmpdir() + '/' + (0, _uuid.v4)() + '.png';
          _context.next = 7;
          return new Promise(function (resolve, _reject) {
            fetch(assetUrl).then(function (response) {
              if (response.body == null) {
                resolve(undefined);
                return;
              }
              var readable = _stream.Readable.fromWeb(response.body);
              var stream = _fs["default"].createWriteStream(path);
              stream.on('finish', function () {
                resolve(path);
              });
              stream.on('error', function (err) {
                _fs["default"].unlink(path, function () {});
                /* eslint-disable-next-line no-console */
                console.warn('Failed to write notification icon:', err);
                resolve(undefined);
              });
              readable.pipe(stream);
            })["catch"](function (err) {
              /* eslint-disable-next-line no-console */
              console.warn('Failed to fetch notification icon:', err);
              resolve(undefined);
            });
          });
        case 7:
          filePath = _context.sent;
          if (filePath != null) {
            assetMap.set(assetUrl, filePath);
          }
          return _context.abrupt("return", Promise.resolve(filePath));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getAssetUrl.apply(this, arguments);
}
function escapeXml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
var ToastBuilder = /*#__PURE__*/function () {
  function ToastBuilder(content) {
    _classCallCheck(this, ToastBuilder);
    this.title = content.title;
    this.body = content.body;
    this.icon = content.icon;
    this.actions = content.actions;
    this._identifier = content.identifier;
    this.threadIdentifier = content.threadIdentifier;
    this.groupName = content.groupName;
    this._senderIdentifier = content.senderIdentifier;
    this._senderDisplayName = content.senderDisplayName;
    this.fallbackDeepLink = content.fallbackDeepLink;
  }
  return _createClass(ToastBuilder, [{
    key: "setIcon",
    value: function setIcon(icon) {
      this.icon = icon;
      return this;
    }
  }, {
    key: "supportsHeaders",
    value: function supportsHeaders() {
      // TODO This is Creators Update+ only
      // TODO Sort out display style
      // Text Channels show only the channel name, no '#', no server name
      // DMs show the sender name as the group name, plus the sender name as the title.
      // Also, notifications are condensed by default, we see groups only if the user clicks the '+1 more notification' button
      return false;
    }
  }, {
    key: "build",
    value: function build() {
      var xml = this.fallbackDeepLink != null ? "<toast launch=\"".concat(escapeXml(this.fallbackDeepLink), "\" activationType=\"protocol\">") : "<toast>";
      xml += "<visual><binding template=\"ToastGeneric\">";
      if (this.title) {
        xml += "<text>".concat(escapeXml(this.title), "</text>");
      }
      if (this.body) {
        xml += "<text>".concat(escapeXml(this.body), "</text>");
      }
      if (this.icon) {
        xml += "<image placement='appLogoOverride' src='".concat(this.icon, "' />");
      }
      xml += "</binding></visual>";
      // We play the sound from the javascript layer
      xml += "<audio silent='true' />";
      if (this.supportsHeaders() && this.threadIdentifier && this.groupName) {
        xml += "<header id='".concat(escapeXml(this.threadIdentifier), "' title='").concat(escapeXml(this.groupName), "' arguments='").concat(escapeXml(this.threadIdentifier), "' />");
      }
      if (Array.isArray(this.actions)) {
        xml += "<actions>";
        var _iterator = _createForOfIteratorHelper(this.actions),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var action = _step.value;
            var actionXml = "<action content=\"".concat(escapeXml(action.content), "\" arguments=\"").concat(escapeXml(action.args), "\" ");
            if (action.hintTooltip) {
              actionXml += "hint-toolTip=\"".concat(escapeXml(action.hintTooltip), "\" ");
            }
            if (action.hintButtonStyle) {
              actionXml += "hint-buttonStyle=\"".concat(escapeXml(action.hintButtonStyle), "\" ");
            }
            actionXml += "/>";
            xml += actionXml;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        xml += "</actions>";
      }
      xml += "</toast>";
      return xml;
    }
  }]);
}();
function showNotification(_x2) {
  return _showNotification.apply(this, arguments);
}
function _showNotification() {
  _showNotification = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(options) {
    var toast, uuid, notification;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          toast = new ToastBuilder(options);
          if (!(options.icon != null)) {
            _context2.next = 7;
            break;
          }
          _context2.t0 = toast;
          _context2.next = 5;
          return getAssetUrl(options.icon);
        case 5:
          _context2.t1 = _context2.sent;
          _context2.t0.setIcon.call(_context2.t0, _context2.t1);
        case 7:
          uuid = (0, _uuid.v4)();
          notification = new electron.Notification({
            toastXml: toast.build()
          });
          notification.on('click', function (_event) {
            var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            handleNotificationAction('clicked', uuid, action);
          });
          notification.on('close', function (_event) {
            var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            handleNotificationAction('dismiss', uuid, action);
          });
          notifications.set(uuid, notification);
          notification.show();
          return _context2.abrupt("return", Promise.resolve(uuid));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _showNotification.apply(this, arguments);
}
function removeNotifications(identifiers) {
  var _iterator2 = _createForOfIteratorHelper(identifiers),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var identifier = _step2.value;
      var notification = notifications.get(identifier);
      if (notification != null) {
        notification.close();
        notifications["delete"](identifier);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return Promise.resolve();
}
function removeAllNotifications() {
  var _iterator3 = _createForOfIteratorHelper(notifications.values()),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var notification = _step3.value;
      notification.close();
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  notifications.clear();
  return Promise.resolve();
}
