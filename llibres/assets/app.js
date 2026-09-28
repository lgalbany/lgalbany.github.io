//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, D());
		else {
			var t = n(l);
			t !== null && k(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function ee() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && k(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? D() : S = !1;
			}
		}
	}
	var D;
	if (typeof y == "function") D = function() {
		y(ee);
	};
	else if (typeof MessageChannel < "u") {
		var O = new MessageChannel(), te = O.port2;
		O.port1.onmessage = ee, D = function() {
			te.postMessage(null);
		};
	} else D = function() {
		_(ee, 0);
	};
	function k(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, k(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, D()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function E(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ee(e, t) {
		return E(e.type, t, e.props);
	}
	function D(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function O(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var te = /\/+/g;
	function k(e, t) {
		return typeof e == "object" && e && e.key != null ? O("" + e.key) : t.toString(36);
	}
	function A(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function j(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, j(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + k(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(te, "$&/") + "/"), j(o, r, i, "", function(e) {
			return e;
		})) : o != null && (D(o) && (o = ee(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(te, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + k(a, u), c += j(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + k(a, u++), c += j(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return j(A(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function M(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return j(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ne(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var N = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, P = {
		map: M,
		forEach: function(e, t, n) {
			M(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return M(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return M(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!D(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = P, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return E(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return E(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = D, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ne
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, N);
		} catch (e) {
			N(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.6";
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = f();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.6";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = u(), n = f(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), te = Symbol.for("react.memo_cache_sentinel"), k = Symbol.iterator;
	function A(e) {
		return typeof e != "object" || !e ? null : (e = k && e[k] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var j = Symbol.for("react.client.reference");
	function M(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === j ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case T: return "Suspense";
			case E: return "SuspenseList";
			case O: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ee: return t = e.displayName || null, t === null ? M(e.type) || "Memo" : t;
			case D:
				t = e._payload, e = e._init;
				try {
					return M(e(t));
				} catch {}
		}
		return null;
	}
	var ne = Array.isArray, N = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ie = [], F = -1;
	function I(e) {
		return { current: e };
	}
	function L(e) {
		0 > F || (e.current = ie[F], ie[F] = null, F--);
	}
	function R(e, t) {
		F++, ie[F] = e.current, e.current = t;
	}
	var ae = I(null), oe = I(null), se = I(null), ce = I(null);
	function le(e, t) {
		switch (R(se, t), R(oe, e), R(ae, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		L(ae), R(ae, e);
	}
	function ue() {
		L(ae), L(oe), L(se);
	}
	function de(e) {
		e.memoizedState !== null && R(ce, e);
		var t = ae.current, n = Hd(t, e.type);
		t !== n && (R(oe, e), R(ae, n));
	}
	function fe(e) {
		oe.current === e && (L(ae), L(oe)), ce.current === e && (L(ce), Qf._currentValue = re);
	}
	var pe, me;
	function he(e) {
		if (pe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			pe = t && t[1] || "", me = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + pe + e + me;
	}
	var ge = !1;
	function _e(e, t) {
		if (!e || ge) return "";
		ge = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			ge = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? he(n) : "";
	}
	function ve(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return he(e.type);
			case 16: return he("Lazy");
			case 13: return e.child !== t && t !== null ? he("Suspense Fallback") : he("Suspense");
			case 19: return he("SuspenseList");
			case 0:
			case 15: return _e(e.type, !1);
			case 11: return _e(e.type.render, !1);
			case 1: return _e(e.type, !0);
			case 31: return he("Activity");
			default: return "";
		}
	}
	function ye(e) {
		try {
			var t = "", n = null;
			do
				t += ve(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var be = Object.prototype.hasOwnProperty, xe = t.unstable_scheduleCallback, Se = t.unstable_cancelCallback, Ce = t.unstable_shouldYield, we = t.unstable_requestPaint, Te = t.unstable_now, Ee = t.unstable_getCurrentPriorityLevel, De = t.unstable_ImmediatePriority, Oe = t.unstable_UserBlockingPriority, ke = t.unstable_NormalPriority, Ae = t.unstable_LowPriority, je = t.unstable_IdlePriority, Me = t.log, Ne = t.unstable_setDisableYieldValue, Pe = null, Fe = null;
	function Ie(e) {
		if (typeof Me == "function" && Ne(e), Fe && typeof Fe.setStrictMode == "function") try {
			Fe.setStrictMode(Pe, e);
		} catch {}
	}
	var Le = Math.clz32 ? Math.clz32 : Be, Re = Math.log, ze = Math.LN2;
	function Be(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Re(e) / ze | 0) | 0;
	}
	var Ve = 256, He = 262144, Ue = 4194304;
	function We(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ge(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = We(n))) : i = We(o) : i = We(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = We(n))) : i = We(o)) : i = We(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Ke(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function qe(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Je() {
		var e = Ue;
		return Ue <<= 1, !(Ue & 62914560) && (Ue = 4194304), e;
	}
	function Ye(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Xe(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Ze(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Le(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && Qe(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function Qe(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Le(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function $e(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Le(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function et(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : tt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function tt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function nt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function rt() {
		var e = P.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function z(e, t) {
		var n = P.p;
		try {
			return P.p = e, t();
		} finally {
			P.p = n;
		}
	}
	var it = Math.random().toString(36).slice(2), at = "__reactFiber$" + it, B = "__reactProps$" + it, ot = "__reactContainer$" + it, st = "__reactEvents$" + it, ct = "__reactListeners$" + it, lt = "__reactHandles$" + it, ut = "__reactResources$" + it, dt = "__reactMarker$" + it;
	function ft(e) {
		delete e[at], delete e[B], delete e[st], delete e[ct], delete e[lt];
	}
	function pt(e) {
		var t = e[at];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ot] || n[at]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[at]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function mt(e) {
		if (e = e[at] || e[ot]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ht(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function gt(e) {
		var t = e[ut];
		return t ||= e[ut] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function _t(e) {
		e[dt] = !0;
	}
	var vt = /* @__PURE__ */ new Set(), yt = {};
	function bt(e, t) {
		xt(e, t), xt(e + "Capture", t);
	}
	function xt(e, t) {
		for (yt[e] = t, e = 0; e < t.length; e++) vt.add(t[e]);
	}
	var St = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ct = {}, wt = {};
	function Tt(e) {
		return be.call(wt, e) ? !0 : be.call(Ct, e) ? !1 : St.test(e) ? wt[e] = !0 : (Ct[e] = !0, !1);
	}
	function Et(e, t, n) {
		if (Tt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Dt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Ot(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function V(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function kt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function At(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function jt(e) {
		if (!e._valueTracker) {
			var t = kt(e) ? "checked" : "value";
			e._valueTracker = At(e, t, "" + e[t]);
		}
	}
	function Mt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = kt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Nt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Pt = /[\n"\\]/g;
	function Ft(e) {
		return e.replace(Pt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function It(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + V(t)) : e.value !== "" + V(t) && (e.value = "" + V(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Rt(e, o, V(n)) : Rt(e, o, V(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + V(s) : e.removeAttribute("name");
	}
	function Lt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				jt(e);
				return;
			}
			n = n == null ? "" : "" + V(n), t = t == null ? n : "" + V(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), jt(e);
	}
	function Rt(e, t, n) {
		t === "number" && Nt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function zt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + V(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Bt(e, t, n) {
		if (t != null && (t = "" + V(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + V(n);
	}
	function Vt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ne(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = V(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), jt(e);
	}
	function Ht(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Ut = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Wt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Ut.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Gt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Wt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Wt(e, o, t[o]);
	}
	function Kt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var qt = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Jt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Yt(e) {
		return Jt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Xt() {}
	var Zt = null;
	function Qt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var $t = null, en = null;
	function tn(e) {
		var t = mt(e);
		if (t && (e = t.stateNode)) {
			var n = e[B] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (It(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Ft("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[B] || null;
								if (!a) throw Error(i(90));
								It(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Mt(r);
					}
					break a;
				case "textarea":
					Bt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && zt(e, !!n.multiple, t, !1);
			}
		}
	}
	var nn = !1;
	function rn(e, t, n) {
		if (nn) return e(t, n);
		nn = !0;
		try {
			return e(t);
		} finally {
			if (nn = !1, ($t !== null || en !== null) && (xu(), $t && (t = $t, e = en, en = $t = null, tn(t), e))) for (t = 0; t < e.length; t++) tn(e[t]);
		}
	}
	function an(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[B] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var on = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), sn = !1;
	if (on) try {
		var cn = {};
		Object.defineProperty(cn, "passive", { get: function() {
			sn = !0;
		} }), window.addEventListener("test", cn, cn), window.removeEventListener("test", cn, cn);
	} catch {
		sn = !1;
	}
	var ln = null, un = null, dn = null;
	function fn() {
		if (dn) return dn;
		var e, t = un, n = t.length, r, i = "value" in ln ? ln.value : ln.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return dn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function pn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function mn() {
		return !0;
	}
	function hn() {
		return !1;
	}
	function H(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? mn : hn, this.isPropagationStopped = hn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = mn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = mn);
			},
			persist: function() {},
			isPersistent: mn
		}), t;
	}
	var gn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, _n = H(gn), vn = h({}, gn, {
		view: 0,
		detail: 0
	}), yn = H(vn), bn, xn, Sn, Cn = h({}, vn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Pn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Sn && (Sn && e.type === "mousemove" ? (bn = e.screenX - Sn.screenX, xn = e.screenY - Sn.screenY) : xn = bn = 0, Sn = e), bn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : xn;
		}
	}), wn = H(Cn), Tn = H(h({}, Cn, { dataTransfer: 0 })), En = H(h({}, vn, { relatedTarget: 0 })), Dn = H(h({}, gn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), On = H(h({}, gn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), kn = H(h({}, gn, { data: 0 })), An = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, jn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Mn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Nn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Mn[e]) ? !!t[e] : !1;
	}
	function Pn() {
		return Nn;
	}
	var Fn = H(h({}, vn, {
		key: function(e) {
			if (e.key) {
				var t = An[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = pn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? jn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Pn,
		charCode: function(e) {
			return e.type === "keypress" ? pn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? pn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), In = H(h({}, Cn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Ln = H(h({}, vn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Pn
	})), Rn = H(h({}, gn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), zn = H(h({}, Cn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Bn = H(h({}, gn, {
		newState: 0,
		oldState: 0
	})), Vn = [
		9,
		13,
		27,
		32
	], Hn = on && "CompositionEvent" in window, Un = null;
	on && "documentMode" in document && (Un = document.documentMode);
	var Wn = on && "TextEvent" in window && !Un, Gn = on && (!Hn || Un && 8 < Un && 11 >= Un), Kn = " ", qn = !1;
	function Jn(e, t) {
		switch (e) {
			case "keyup": return Vn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Yn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Xn = !1;
	function Zn(e, t) {
		switch (e) {
			case "compositionend": return Yn(t);
			case "keypress": return t.which === 32 ? (qn = !0, Kn) : null;
			case "textInput": return e = t.data, e === Kn && qn ? null : e;
			default: return null;
		}
	}
	function Qn(e, t) {
		if (Xn) return e === "compositionend" || !Hn && Jn(e, t) ? (e = fn(), dn = un = ln = null, Xn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Gn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var $n = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function er(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!$n[e.type] : t === "textarea";
	}
	function tr(e, t, n, r) {
		$t ? en ? en.push(r) : en = [r] : $t = r, t = Td(t, "onChange"), 0 < t.length && (n = new _n("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var nr = null, rr = null;
	function ir(e) {
		vd(e, 0);
	}
	function ar(e) {
		if (Mt(ht(e))) return e;
	}
	function or(e, t) {
		if (e === "change") return t;
	}
	var sr = !1;
	if (on) {
		var cr;
		if (on) {
			var lr = "oninput" in document;
			if (!lr) {
				var ur = document.createElement("div");
				ur.setAttribute("oninput", "return;"), lr = typeof ur.oninput == "function";
			}
			cr = lr;
		} else cr = !1;
		sr = cr && (!document.documentMode || 9 < document.documentMode);
	}
	function dr() {
		nr && (nr.detachEvent("onpropertychange", fr), rr = nr = null);
	}
	function fr(e) {
		if (e.propertyName === "value" && ar(rr)) {
			var t = [];
			tr(t, rr, e, Qt(e)), rn(ir, t);
		}
	}
	function pr(e, t, n) {
		e === "focusin" ? (dr(), nr = t, rr = n, nr.attachEvent("onpropertychange", fr)) : e === "focusout" && dr();
	}
	function mr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return ar(rr);
	}
	function hr(e, t) {
		if (e === "click") return ar(t);
	}
	function gr(e, t) {
		if (e === "input" || e === "change") return ar(t);
	}
	function _r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var vr = typeof Object.is == "function" ? Object.is : _r;
	function yr(e, t) {
		if (vr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!be.call(t, i) || !vr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function br(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function xr(e, t) {
		var n = br(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = br(n);
		}
	}
	function Sr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Sr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Cr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Nt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Nt(e.document);
		}
		return t;
	}
	function wr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Tr = on && "documentMode" in document && 11 >= document.documentMode, Er = null, Dr = null, Or = null, kr = !1;
	function Ar(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		kr || Er == null || Er !== Nt(r) || (r = Er, "selectionStart" in r && wr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Or && yr(Or, r) || (Or = r, r = Td(Dr, "onSelect"), 0 < r.length && (t = new _n("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Er)));
	}
	function jr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Mr = {
		animationend: jr("Animation", "AnimationEnd"),
		animationiteration: jr("Animation", "AnimationIteration"),
		animationstart: jr("Animation", "AnimationStart"),
		transitionrun: jr("Transition", "TransitionRun"),
		transitionstart: jr("Transition", "TransitionStart"),
		transitioncancel: jr("Transition", "TransitionCancel"),
		transitionend: jr("Transition", "TransitionEnd")
	}, Nr = {}, Pr = {};
	on && (Pr = document.createElement("div").style, "AnimationEvent" in window || (delete Mr.animationend.animation, delete Mr.animationiteration.animation, delete Mr.animationstart.animation), "TransitionEvent" in window || delete Mr.transitionend.transition);
	function Fr(e) {
		if (Nr[e]) return Nr[e];
		if (!Mr[e]) return e;
		var t = Mr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Pr) return Nr[e] = t[n];
		return e;
	}
	var Ir = Fr("animationend"), Lr = Fr("animationiteration"), Rr = Fr("animationstart"), zr = Fr("transitionrun"), Br = Fr("transitionstart"), Vr = Fr("transitioncancel"), Hr = Fr("transitionend"), Ur = /* @__PURE__ */ new Map(), Wr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Wr.push("scrollEnd");
	function Gr(e, t) {
		Ur.set(e, t), bt(t, [e]);
	}
	var Kr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, qr = [], Jr = 0, Yr = 0;
	function Xr() {
		for (var e = Jr, t = Yr = Jr = 0; t < e;) {
			var n = qr[t];
			qr[t++] = null;
			var r = qr[t];
			qr[t++] = null;
			var i = qr[t];
			qr[t++] = null;
			var a = qr[t];
			if (qr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ei(n, i, a);
		}
	}
	function Zr(e, t, n, r) {
		qr[Jr++] = e, qr[Jr++] = t, qr[Jr++] = n, qr[Jr++] = r, Yr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Qr(e, t, n, r) {
		return Zr(e, t, n, r), ti(e);
	}
	function $r(e, t) {
		return Zr(e, null, null, t), ti(e);
	}
	function ei(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Le(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ti(e) {
		if (50 < fu) throw fu = 0, pu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ni = {};
	function ri(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ii(e, t, n, r) {
		return new ri(e, t, n, r);
	}
	function ai(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function oi(e, t) {
		var n = e.alternate;
		return n === null ? (n = ii(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function si(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ci(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ai(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, ae.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case O: return e = ii(31, n, t, a), e.elementType = O, e.lanes = o, e;
			case y: return li(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = ii(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = ii(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = ii(19, n, t, a), e.elementType = E, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case ee:
						s = 14;
						break a;
					case D:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = ii(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function li(e, t, n, r) {
		return e = ii(7, e, r, t), e.lanes = n, e;
	}
	function ui(e, t, n) {
		return e = ii(6, e, null, t), e.lanes = n, e;
	}
	function di(e) {
		var t = ii(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function fi(e, t, n) {
		return t = ii(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var pi = /* @__PURE__ */ new WeakMap();
	function mi(e, t) {
		if (typeof e == "object" && e) {
			var n = pi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: ye(t)
			}, pi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: ye(t)
		};
	}
	var hi = [], gi = 0, _i = null, vi = 0, yi = [], bi = 0, xi = null, Si = 1, Ci = "";
	function wi(e, t) {
		hi[gi++] = vi, hi[gi++] = _i, _i = e, vi = t;
	}
	function Ti(e, t, n) {
		yi[bi++] = Si, yi[bi++] = Ci, yi[bi++] = xi, xi = e;
		var r = Si;
		e = Ci;
		var i = 32 - Le(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Le(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Si = 1 << 32 - Le(t) + i | n << i | r, Ci = a + e;
		} else Si = 1 << a | n << i | r, Ci = e;
	}
	function Ei(e) {
		e.return !== null && (wi(e, 1), Ti(e, 1, 0));
	}
	function Di(e) {
		for (; e === _i;) _i = hi[--gi], hi[gi] = null, vi = hi[--gi], hi[gi] = null;
		for (; e === xi;) xi = yi[--bi], yi[bi] = null, Ci = yi[--bi], yi[bi] = null, Si = yi[--bi], yi[bi] = null;
	}
	function Oi(e, t) {
		yi[bi++] = Si, yi[bi++] = Ci, yi[bi++] = xi, Si = t.id, Ci = t.overflow, xi = e;
	}
	var ki = null, Ai = null, U = !1, ji = null, Mi = !1, Ni = Error(i(519));
	function Pi(e) {
		throw Bi(mi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ni;
	}
	function Fi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[at] = e, t[B] = r, n) {
			case "dialog":
				$("cancel", t), $("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				$("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < gd.length; n++) $(gd[n], t);
				break;
			case "source":
				$("error", t);
				break;
			case "img":
			case "image":
			case "link":
				$("error", t), $("load", t);
				break;
			case "details":
				$("toggle", t);
				break;
			case "input":
				$("invalid", t), Lt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), Vt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = Xt), t = !0) : t = !1, t || Pi(e, !0);
	}
	function Ii(e) {
		for (ki = e.return; ki;) switch (ki.tag) {
			case 5:
			case 31:
			case 13:
				Mi = !1;
				return;
			case 27:
			case 3:
				Mi = !0;
				return;
			default: ki = ki.return;
		}
	}
	function Li(e) {
		if (e !== ki) return !1;
		if (!U) return Ii(e), U = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && Ai && Pi(e), Ii(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ai = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ai = uf(e);
		} else t === 27 ? (t = Ai, Zd(e.type) ? (e = lf, lf = null, Ai = e) : Ai = t) : Ai = ki ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ri() {
		Ai = ki = null, U = !1;
	}
	function zi() {
		var e = ji;
		return e !== null && (Ql === null ? Ql = e : Ql.push.apply(Ql, e), ji = null), e;
	}
	function Bi(e) {
		ji === null ? ji = [e] : ji.push(e);
	}
	var Vi = I(null), Hi = null, Ui = null;
	function Wi(e, t, n) {
		R(Vi, t._currentValue), t._currentValue = n;
	}
	function Gi(e) {
		e._currentValue = Vi.current, L(Vi);
	}
	function Ki(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function qi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ki(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ki(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Ji(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					vr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ce.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && qi(t, e, n, r), t.flags |= 262144;
	}
	function Yi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!vr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Xi(e) {
		Hi = e, Ui = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Zi(e) {
		return $i(Hi, e);
	}
	function Qi(e, t) {
		return Hi === null && Xi(e), $i(e, t);
	}
	function $i(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Ui === null) {
			if (e === null) throw Error(i(308));
			Ui = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Ui = Ui.next = t;
		return n;
	}
	var ea = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ta = t.unstable_scheduleCallback, na = t.unstable_NormalPriority, ra = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ia() {
		return {
			controller: new ea(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function aa(e) {
		e.refCount--, e.refCount === 0 && ta(na, function() {
			e.controller.abort();
		});
	}
	var oa = null, sa = 0, ca = 0, la = null;
	function ua(e, t) {
		if (oa === null) {
			var n = oa = [];
			sa = 0, ca = ud(), la = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return sa++, t.then(da, da), t;
	}
	function da() {
		if (--sa === 0 && oa !== null) {
			la !== null && (la.status = "fulfilled");
			var e = oa;
			oa = null, ca = 0, la = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function fa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var pa = N.S;
	N.S = function(e, t) {
		tu = Te(), typeof t == "object" && t && typeof t.then == "function" && ua(e, t), pa !== null && pa(e, t);
	};
	var ma = I(null);
	function ha() {
		var e = ma.current;
		return e === null ? Rl.pooledCache : e;
	}
	function ga(e, t) {
		t === null ? R(ma, ma.current) : R(ma, t.pool);
	}
	function _a() {
		var e = ha();
		return e === null ? null : {
			parent: ra._currentValue,
			pool: e
		};
	}
	var va = Error(i(460)), ya = Error(i(474)), ba = Error(i(542)), xa = { then: function() {} };
	function Sa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ca(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Xt, Xt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Da(e), e;
			default:
				if (typeof t.status == "string") t.then(Xt, Xt);
				else {
					if (e = Rl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Da(e), e;
				}
				throw Ta = t, va;
		}
	}
	function wa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ta = e, va) : e;
		}
	}
	var Ta = null;
	function Ea() {
		if (Ta === null) throw Error(i(459));
		var e = Ta;
		return Ta = null, e;
	}
	function Da(e) {
		if (e === va || e === ba) throw Error(i(483));
	}
	var Oa = null, ka = 0;
	function Aa(e) {
		var t = ka;
		return ka += 1, Oa === null && (Oa = []), Ca(Oa, e, t);
	}
	function ja(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ma(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Na(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = oi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ui(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === D && wa(i) === t.type) ? (t = a(t, n.props), ja(t, n), t.return = e, t) : (t = ci(n.type, n.key, n.props, null, e.mode, r), ja(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = fi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = li(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ui("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = ci(t.type, t.key, t.props, null, e.mode, n), ja(n, t), n.return = e, n;
					case v: return t = fi(t, e.mode, n), t.return = e, t;
					case D: return t = wa(t), f(e, t, n);
				}
				if (ne(t) || A(t)) return t = li(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Aa(t), n);
				if (t.$$typeof === C) return f(e, Qi(e, t), n);
				Ma(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case D: return n = wa(n), p(e, t, n, r);
				}
				if (ne(n) || A(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Aa(n), r);
				if (n.$$typeof === C) return p(e, t, Qi(e, n), r);
				Ma(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case D: return r = wa(r), m(e, t, n, r, i);
				}
				if (ne(r) || A(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Aa(r), i);
				if (r.$$typeof === C) return m(e, t, n, Qi(t, r), i);
				Ma(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), U && wi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return U && wi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), U && wi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), U && wi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return U && wi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), U && wi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === D && wa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), ja(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = li(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ci(o.type, o.key, o.props, null, e.mode, c), ja(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = fi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case D: return o = wa(o), b(e, r, o, c);
				}
				if (ne(o)) return h(e, r, o, c);
				if (A(o)) {
					if (l = A(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Aa(o), c);
				if (o.$$typeof === C) return b(e, r, Qi(e, o), c);
				Ma(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ui(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				ka = 0;
				var i = b(e, t, n, r);
				return Oa = null, i;
			} catch (t) {
				if (t === va || t === ba) throw t;
				var a = ii(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Pa = Na(!0), Fa = Na(!1), Ia = !1;
	function La(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ra(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function za(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ba(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, q & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ti(e), ei(e, null, n), t;
		}
		return Zr(e, r, t, n), ti(e);
	}
	function Va(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, $e(e, n);
		}
	}
	function Ha(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ua = !1;
	function Wa() {
		if (Ua) {
			var e = la;
			if (e !== null) throw e;
		}
	}
	function Ga(e, t, n, r) {
		Ua = !1;
		var i = e.updateQueue;
		Ia = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === ca && (Ua = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ia = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Kl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ka(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function qa(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ka(n[e], t);
	}
	var Ja = I(null), Ya = I(0);
	function Xa(e, t) {
		e = Wl, R(Ya, e), R(Ja, t), Wl = e | t.baseLanes;
	}
	function Za() {
		R(Ya, Wl), R(Ja, Ja.current);
	}
	function Qa() {
		Wl = Ya.current, L(Ja), L(Ya);
	}
	var $a = I(null), eo = null;
	function to(e) {
		var t = e.alternate;
		R(W, W.current & 1), R($a, e), eo === null && (t === null || Ja.current !== null || t.memoizedState !== null) && (eo = e);
	}
	function no(e) {
		R(W, W.current), R($a, e), eo === null && (eo = e);
	}
	function ro(e) {
		e.tag === 22 ? (R(W, W.current), R($a, e), eo === null && (eo = e)) : io(e);
	}
	function io() {
		R(W, W.current), R($a, $a.current);
	}
	function ao(e) {
		L($a), eo === e && (eo = null), L(W);
	}
	var W = I(0);
	function oo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var so = 0, G = null, co = null, lo = null, uo = !1, fo = !1, po = !1, mo = 0, ho = 0, go = null, _o = 0;
	function vo() {
		throw Error(i(321));
	}
	function yo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!vr(e[n], t[n])) return !1;
		return !0;
	}
	function bo(e, t, n, r, i, a) {
		return so = a, G = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, N.H = e === null || e.memoizedState === null ? Ls : Rs, po = !1, a = n(r, i), po = !1, fo && (a = So(t, n, r, i)), xo(e), a;
	}
	function xo(e) {
		N.H = Is;
		var t = co !== null && co.next !== null;
		if (so = 0, lo = co = G = null, uo = !1, ho = 0, go = null, t) throw Error(i(300));
		e === null || tc || (e = e.dependencies, e !== null && Yi(e) && (tc = !0));
	}
	function So(e, t, n, r) {
		G = e;
		var a = 0;
		do {
			if (fo && (go = null), ho = 0, fo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, lo = co = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			N.H = zs, o = t(n, r);
		} while (fo);
		return o;
	}
	function Co() {
		var e = N.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Ao(t) : t, e = e.useState()[0], (co === null ? null : co.memoizedState) !== e && (G.flags |= 1024), t;
	}
	function wo() {
		var e = mo !== 0;
		return mo = 0, e;
	}
	function To(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Eo(e) {
		if (uo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			uo = !1;
		}
		so = 0, lo = co = G = null, fo = !1, ho = mo = 0, go = null;
	}
	function Do() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return lo === null ? G.memoizedState = lo = e : lo = lo.next = e, lo;
	}
	function Oo() {
		if (co === null) {
			var e = G.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = co.next;
		var t = lo === null ? G.memoizedState : lo.next;
		if (t !== null) lo = t, co = e;
		else {
			if (e === null) throw G.alternate === null ? Error(i(467)) : Error(i(310));
			co = e, e = {
				memoizedState: co.memoizedState,
				baseState: co.baseState,
				baseQueue: co.baseQueue,
				queue: co.queue,
				next: null
			}, lo === null ? G.memoizedState = lo = e : lo = lo.next = e;
		}
		return lo;
	}
	function ko() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Ao(e) {
		var t = ho;
		return ho += 1, go === null && (go = []), e = Ca(go, e, t), t = G, (lo === null ? t.memoizedState : lo.next) === null && (t = t.alternate, N.H = t === null || t.memoizedState === null ? Ls : Rs), e;
	}
	function jo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Ao(e);
			if (e.$$typeof === C) return Zi(e);
		}
		throw Error(i(438, String(e)));
	}
	function Mo(e) {
		var t = null, n = G.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = G.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = ko(), G.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = te;
		return t.index++, n;
	}
	function No(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Po(e) {
		return Fo(Oo(), co, e);
	}
	function Fo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (so & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ca && (d = !0);
					else if ((so & p) === p) {
						u = u.next, p === ca && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, G.lanes |= p, Kl |= p;
					f = u.action, po && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, G.lanes |= f, Kl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !vr(o, e.memoizedState) && (tc = !0, d && (n = la, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Io(e) {
		var t = Oo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			vr(o, t.memoizedState) || (tc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Lo(e, t, n) {
		var r = G, a = Oo(), o = U;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !vr((co || a).memoizedState, n);
		if (s && (a.memoizedState = n, tc = !0), a = a.queue, cs(Bo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || lo !== null && lo.memoizedState.tag & 1) {
			if (r.flags |= 2048, rs(9, { destroy: void 0 }, zo.bind(null, r, a, n, t), null), Rl === null) throw Error(i(349));
			o || so & 127 || Ro(r, t, n);
		}
		return n;
	}
	function Ro(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = G.updateQueue, t === null ? (t = ko(), G.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function zo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Vo(t) && Ho(e);
	}
	function Bo(e, t, n) {
		return n(function() {
			Vo(t) && Ho(e);
		});
	}
	function Vo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !vr(e, n);
		} catch {
			return !0;
		}
	}
	function Ho(e) {
		var t = $r(e, 2);
		t !== null && gu(t, e, 2);
	}
	function Uo(e) {
		var t = Do();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), po) {
				Ie(!0);
				try {
					n();
				} finally {
					Ie(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: No,
			lastRenderedState: e
		}, t;
	}
	function Wo(e, t, n, r) {
		return e.baseState = n, Fo(e, co, typeof r == "function" ? r : No);
	}
	function Go(e, t, n, r, a) {
		if (Ns(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			N.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ko(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ko(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = N.T, o = {};
			N.T = o;
			try {
				var s = n(i, r), c = N.S;
				c !== null && c(o, s), qo(e, t, s);
			} catch (n) {
				Yo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), N.T = a;
			}
		} else try {
			a = n(i, r), qo(e, t, a);
		} catch (n) {
			Yo(e, t, n);
		}
	}
	function qo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Jo(e, t, n);
		}, function(n) {
			return Yo(e, t, n);
		}) : Jo(e, t, n);
	}
	function Jo(e, t, n) {
		t.status = "fulfilled", t.value = n, Xo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ko(e, n)));
	}
	function Yo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Xo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Xo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Zo(e, t) {
		return t;
	}
	function Qo(e, t) {
		if (U) {
			var n = Rl.formState;
			if (n !== null) {
				a: {
					var r = G;
					if (U) {
						if (Ai) {
							b: {
								for (var i = Ai, a = Mi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Ai = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Pi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Do(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Zo,
			lastRenderedState: t
		}, n.queue = r, n = As.bind(null, G, r), r.dispatch = n, r = Uo(!1), a = Ms.bind(null, G, !1, r.queue), r = Do(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Go.bind(null, G, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function $o(e) {
		return es(Oo(), co, e);
	}
	function es(e, t, n) {
		if (t = Fo(e, t, Zo)[0], e = Po(No)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Ao(t);
		} catch (e) {
			throw e === va ? ba : e;
		}
		else r = t;
		t = Oo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (G.flags |= 2048, rs(9, { destroy: void 0 }, ts.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ts(e, t) {
		e.action = t;
	}
	function ns(e) {
		var t = Oo(), n = co;
		if (n !== null) return es(t, n, e);
		Oo(), t = t.memoizedState, n = Oo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function rs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = G.updateQueue, t === null && (t = ko(), G.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function is() {
		return Oo().memoizedState;
	}
	function as(e, t, n, r) {
		var i = Do();
		G.flags |= e, i.memoizedState = rs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function os(e, t, n, r) {
		var i = Oo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		co !== null && r !== null && yo(r, co.memoizedState.deps) ? i.memoizedState = rs(t, a, n, r) : (G.flags |= e, i.memoizedState = rs(1 | t, a, n, r));
	}
	function ss(e, t) {
		as(8390656, 8, e, t);
	}
	function cs(e, t) {
		os(2048, 8, e, t);
	}
	function ls(e) {
		G.flags |= 4;
		var t = G.updateQueue;
		if (t === null) t = ko(), G.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function us(e) {
		var t = Oo().memoizedState;
		return ls({
			ref: t,
			nextImpl: e
		}), function() {
			if (q & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ds(e, t) {
		return os(4, 2, e, t);
	}
	function fs(e, t) {
		return os(4, 4, e, t);
	}
	function ps(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function ms(e, t, n) {
		n = n == null ? null : n.concat([e]), os(4, 4, ps.bind(null, t, e), n);
	}
	function hs() {}
	function gs(e, t) {
		var n = Oo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && yo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function _s(e, t) {
		var n = Oo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && yo(t, r[1])) return r[0];
		if (r = e(), po) {
			Ie(!0);
			try {
				e();
			} finally {
				Ie(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function vs(e, t, n) {
		return n === void 0 || so & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = hu(), G.lanes |= e, Kl |= e, n);
	}
	function ys(e, t, n, r) {
		return vr(n, t) ? n : Ja.current === null ? !(so & 42) || so & 1073741824 && !(Y & 261930) ? (tc = !0, e.memoizedState = n) : (e = hu(), G.lanes |= e, Kl |= e, t) : (e = vs(e, n, r), vr(e, t) || (tc = !0), e);
	}
	function bs(e, t, n, r, i) {
		var a = P.p;
		P.p = a !== 0 && 8 > a ? a : 8;
		var o = N.T, s = {};
		N.T = s, Ms(e, !1, t, n);
		try {
			var c = i(), l = N.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? js(e, t, fa(c, r), mu(e)) : js(e, t, r, mu(e));
		} catch (n) {
			js(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, mu());
		} finally {
			P.p = a, o !== null && s.types !== null && (o.types = s.types), N.T = o;
		}
	}
	function xs() {}
	function Ss(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Cs(e).queue;
		bs(e, a, t, re, n === null ? xs : function() {
			return ws(e), n(r);
		});
	}
	function Cs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: re,
			baseState: re,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: No,
				lastRenderedState: re
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: No,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ws(e) {
		var t = Cs(e);
		t.next === null && (t = e.alternate.memoizedState), js(e, t.next.queue, {}, mu());
	}
	function Ts() {
		return Zi(Qf);
	}
	function Es() {
		return Oo().memoizedState;
	}
	function Ds() {
		return Oo().memoizedState;
	}
	function Os(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = mu();
					e = za(n);
					var r = Ba(t, e, n);
					r !== null && (gu(r, t, n), Va(r, t, n)), t = { cache: ia() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ks(e, t, n) {
		var r = mu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ns(e) ? Ps(t, n) : (n = Qr(e, t, n, r), n !== null && (gu(n, e, r), Fs(n, t, r)));
	}
	function As(e, t, n) {
		js(e, t, n, mu());
	}
	function js(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ns(e)) Ps(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, vr(s, o)) return Zr(e, t, i, 0), Rl === null && Xr(), !1;
			} catch {}
			if (n = Qr(e, t, i, r), n !== null) return gu(n, e, r), Fs(n, t, r), !0;
		}
		return !1;
	}
	function Ms(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ns(e)) {
			if (t) throw Error(i(479));
		} else t = Qr(e, n, r, 2), t !== null && gu(t, e, 2);
	}
	function Ns(e) {
		var t = e.alternate;
		return e === G || t !== null && t === G;
	}
	function Ps(e, t) {
		fo = uo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Fs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, $e(e, n);
		}
	}
	var Is = {
		readContext: Zi,
		use: jo,
		useCallback: vo,
		useContext: vo,
		useEffect: vo,
		useImperativeHandle: vo,
		useLayoutEffect: vo,
		useInsertionEffect: vo,
		useMemo: vo,
		useReducer: vo,
		useRef: vo,
		useState: vo,
		useDebugValue: vo,
		useDeferredValue: vo,
		useTransition: vo,
		useSyncExternalStore: vo,
		useId: vo,
		useHostTransitionStatus: vo,
		useFormState: vo,
		useActionState: vo,
		useOptimistic: vo,
		useMemoCache: vo,
		useCacheRefresh: vo
	};
	Is.useEffectEvent = vo;
	var Ls = {
		readContext: Zi,
		use: jo,
		useCallback: function(e, t) {
			return Do().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Zi,
		useEffect: ss,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), as(4194308, 4, ps.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return as(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			as(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Do();
			t = t === void 0 ? null : t;
			var r = e();
			if (po) {
				Ie(!0);
				try {
					e();
				} finally {
					Ie(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Do();
			if (n !== void 0) {
				var i = n(t);
				if (po) {
					Ie(!0);
					try {
						n(t);
					} finally {
						Ie(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ks.bind(null, G, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Do();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Uo(e);
			var t = e.queue, n = As.bind(null, G, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			return vs(Do(), e, t);
		},
		useTransition: function() {
			var e = Uo(!1);
			return e = bs.bind(null, G, e.queue, !0, !1), Do().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = G, a = Do();
			if (U) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Rl === null) throw Error(i(349));
				Y & 127 || Ro(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ss(Bo.bind(null, r, o, e), [e]), r.flags |= 2048, rs(9, { destroy: void 0 }, zo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Do(), t = Rl.identifierPrefix;
			if (U) {
				var n = Ci, r = Si;
				n = (r & ~(1 << 32 - Le(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = mo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = _o++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ts,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e) {
			var t = Do();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ms.bind(null, G, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Mo,
		useCacheRefresh: function() {
			return Do().memoizedState = Os.bind(null, G);
		},
		useEffectEvent: function(e) {
			var t = Do(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (q & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Rs = {
		readContext: Zi,
		use: jo,
		useCallback: gs,
		useContext: Zi,
		useEffect: cs,
		useImperativeHandle: ms,
		useInsertionEffect: ds,
		useLayoutEffect: fs,
		useMemo: _s,
		useReducer: Po,
		useRef: is,
		useState: function() {
			return Po(No);
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			return ys(Oo(), co.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Po(No)[0], t = Oo().memoizedState;
			return [typeof e == "boolean" ? e : Ao(e), t];
		},
		useSyncExternalStore: Lo,
		useId: Es,
		useHostTransitionStatus: Ts,
		useFormState: $o,
		useActionState: $o,
		useOptimistic: function(e, t) {
			return Wo(Oo(), co, e, t);
		},
		useMemoCache: Mo,
		useCacheRefresh: Ds
	};
	Rs.useEffectEvent = us;
	var zs = {
		readContext: Zi,
		use: jo,
		useCallback: gs,
		useContext: Zi,
		useEffect: cs,
		useImperativeHandle: ms,
		useInsertionEffect: ds,
		useLayoutEffect: fs,
		useMemo: _s,
		useReducer: Io,
		useRef: is,
		useState: function() {
			return Io(No);
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			var n = Oo();
			return co === null ? vs(n, e, t) : ys(n, co.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Io(No)[0], t = Oo().memoizedState;
			return [typeof e == "boolean" ? e : Ao(e), t];
		},
		useSyncExternalStore: Lo,
		useId: Es,
		useHostTransitionStatus: Ts,
		useFormState: ns,
		useActionState: ns,
		useOptimistic: function(e, t) {
			var n = Oo();
			return co === null ? (n.baseState = e, [e, n.queue.dispatch]) : Wo(n, co, e, t);
		},
		useMemoCache: Mo,
		useCacheRefresh: Ds
	};
	zs.useEffectEvent = us;
	function Bs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Vs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = za(r);
			i.payload = t, n != null && (i.callback = n), t = Ba(e, i, r), t !== null && (gu(t, e, r), Va(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = za(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ba(e, i, r), t !== null && (gu(t, e, r), Va(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = mu(), r = za(n);
			r.tag = 2, t != null && (r.callback = t), t = Ba(e, r, n), t !== null && (gu(t, e, n), Va(t, e, n));
		}
	};
	function Hs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !yr(n, r) || !yr(i, a) : !0;
	}
	function Us(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Vs.enqueueReplaceState(t, t.state, null);
	}
	function Ws(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Gs(e) {
		Kr(e);
	}
	function Ks(e) {
		console.error(e);
	}
	function qs(e) {
		Kr(e);
	}
	function Js(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ys(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Xs(e, t, n) {
		return n = za(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Js(e, t);
		}, n;
	}
	function Zs(e) {
		return e = za(e), e.tag = 3, e;
	}
	function Qs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ys(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ys(t, n, r), typeof i != "function" && (iu === null ? iu = new Set([this]) : iu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function $s(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Ji(t, n, a, !0), n = $a.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return eo === null ? Ou() : n.alternate === null && Gl === 0 && (Gl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === xa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Ku(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === xa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Ku(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Ku(e, r, a), Ou(), !1;
		}
		if (U) return t = $a.current, t === null ? (r !== Ni && (t = Error(i(423), { cause: r }), Bi(mi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = mi(r, n), a = Xs(e.stateNode, r, a), Ha(e, a), Gl !== 4 && (Gl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ni && (e = Error(i(422), { cause: r }), Bi(mi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = mi(o, n), Zl === null ? Zl = [o] : Zl.push(o), Gl !== 4 && (Gl = 2), t === null) return !0;
		r = mi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Xs(n.stateNode, r, e), Ha(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (iu === null || !iu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Zs(a), Qs(a, e, n, r), Ha(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ec = Error(i(461)), tc = !1;
	function nc(e, t, n, r) {
		t.child = e === null ? Fa(t, null, n, r) : Pa(t, e.child, n, r);
	}
	function rc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Xi(t), r = bo(e, t, n, o, a, i), s = wo(), e !== null && !tc ? (To(e, t, i), Ec(e, t, i)) : (U && s && Ei(t), t.flags |= 1, nc(e, t, r, i), t.child);
	}
	function ic(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ai(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ac(e, t, a, r, i)) : (e = ci(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Dc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? yr : n, n(o, r) && e.ref === t.ref) return Ec(e, t, i);
		}
		return t.flags |= 1, e = oi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ac(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (yr(a, r) && e.ref === t.ref) if (tc = !1, t.pendingProps = r = a, Dc(e, i)) e.flags & 131072 && (tc = !0);
			else return t.lanes = e.lanes, Ec(e, t, i);
		}
		return pc(e, t, n, r, i);
	}
	function oc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return cc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ga(t, a === null ? null : a.cachePool), a === null ? Za() : Xa(t, a), ro(t);
			else return r = t.lanes = 536870912, cc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ga(t, null), Za(), io(t)) : (ga(t, a.cachePool), Xa(t, a), io(t), t.memoizedState = null);
		return nc(e, t, i, n), t.child;
	}
	function sc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function cc(e, t, n, r, i) {
		var a = ha();
		return a = a === null ? null : {
			parent: ra._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ga(t, null), Za(), ro(t), e !== null && Ji(e, t, r, !0), t.childLanes = i, null;
	}
	function lc(e, t) {
		return t = Sc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function uc(e, t, n) {
		return Pa(t, e.child, null, n), e = lc(t, t.pendingProps), e.flags |= 2, ao(t), t.memoizedState = null, e;
	}
	function dc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (U) {
				if (r.mode === "hidden") return e = lc(t, r), t.lanes = 536870912, sc(null, e);
				if (no(t), (e = Ai) ? (e = rf(e, Mi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: xi === null ? null : {
						id: Si,
						overflow: Ci
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = di(e), n.return = t, t.child = n, ki = t, Ai = null)) : e = null, e === null) throw Pi(t);
				return t.lanes = 536870912, null;
			}
			return lc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (no(t), a) if (t.flags & 256) t.flags &= -257, t = uc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (tc || Ji(e, t, n, !1), a = (n & e.childLanes) !== 0, tc || a) {
				if (r = Rl, r !== null && (s = et(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, $r(e, s), gu(r, e, s), ec;
				Ou(), t = uc(e, t, n);
			} else e = o.treeContext, Ai = cf(s.nextSibling), ki = t, U = !0, ji = null, Mi = !1, e !== null && Oi(t, e), t = lc(t, r), t.flags |= 4096;
			return t;
		}
		return e = oi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function fc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function pc(e, t, n, r, i) {
		return Xi(t), n = bo(e, t, n, r, void 0, i), r = wo(), e !== null && !tc ? (To(e, t, i), Ec(e, t, i)) : (U && r && Ei(t), t.flags |= 1, nc(e, t, n, i), t.child);
	}
	function mc(e, t, n, r, i, a) {
		return Xi(t), t.updateQueue = null, n = So(t, r, n, i), xo(e), r = wo(), e !== null && !tc ? (To(e, t, a), Ec(e, t, a)) : (U && r && Ei(t), t.flags |= 1, nc(e, t, n, a), t.child);
	}
	function hc(e, t, n, r, i) {
		if (Xi(t), t.stateNode === null) {
			var a = ni, o = n.contextType;
			typeof o == "object" && o && (a = Zi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Vs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, La(t), o = n.contextType, a.context = typeof o == "object" && o ? Zi(o) : ni, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Bs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Vs.enqueueReplaceState(a, a.state, null), Ga(t, r, a, i), Wa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ws(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ni, typeof u == "object" && u && (o = Zi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Us(t, a, r, o), Ia = !1;
			var f = t.memoizedState;
			a.state = f, Ga(t, r, a, i), Wa(), l = t.memoizedState, s || f !== l || Ia ? (typeof d == "function" && (Bs(t, n, d, r), l = t.memoizedState), (c = Ia || Hs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ra(e, t), o = t.memoizedProps, u = Ws(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ni, typeof l == "object" && l && (c = Zi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Us(t, a, r, c), Ia = !1, f = t.memoizedState, a.state = f, Ga(t, r, a, i), Wa();
			var p = t.memoizedState;
			o !== d || f !== p || Ia || e !== null && e.dependencies !== null && Yi(e.dependencies) ? (typeof s == "function" && (Bs(t, n, s, r), p = t.memoizedState), (u = Ia || Hs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Yi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, fc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Pa(t, e.child, null, i), t.child = Pa(t, null, n, i)) : nc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ec(e, t, i), e;
	}
	function gc(e, t, n, r) {
		return Ri(), t.flags |= 256, nc(e, t, n, r), t.child;
	}
	var _c = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function vc(e) {
		return {
			baseLanes: e,
			cachePool: _a()
		};
	}
	function yc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Yl), e;
	}
	function bc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (W.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (U) {
				if (a ? to(t) : io(t), (e = Ai) ? (e = rf(e, Mi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: xi === null ? null : {
						id: Si,
						overflow: Ci
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = di(e), n.return = t, t.child = n, ki = t, Ai = null)) : e = null, e === null) throw Pi(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (io(t), a = t.mode, c = Sc({
				mode: "hidden",
				children: c
			}, a), r = li(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = vc(n), r.childLanes = yc(e, s, n), t.memoizedState = _c, sc(null, r)) : (to(t), xc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (to(t), t.flags &= -257, t = Cc(e, t, n)) : t.memoizedState === null ? (io(t), c = r.fallback, a = t.mode, r = Sc({
				mode: "visible",
				children: r.children
			}, a), c = li(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Pa(t, e.child, null, n), r = t.child, r.memoizedState = vc(n), r.childLanes = yc(e, s, n), t.memoizedState = _c, t = sc(null, r)) : (io(t), t.child = e.child, t.flags |= 128, t = null);
			else if (to(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Bi({
					value: r,
					source: null,
					stack: null
				}), t = Cc(e, t, n);
			} else if (tc || Ji(e, t, n, !1), s = (n & e.childLanes) !== 0, tc || s) {
				if (s = Rl, s !== null && (r = et(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, $r(e, r), gu(s, e, r), ec;
				af(c) || Ou(), t = Cc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Ai = cf(c.nextSibling), ki = t, U = !0, ji = null, Mi = !1, e !== null && Oi(t, e), t = xc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (io(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = oi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = li(c, a, n, null), c.flags |= 2) : c = oi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, sc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = vc(n) : (a = c.cachePool, a === null ? a = _a() : (l = ra._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = yc(e, s, n), t.memoizedState = _c, sc(e.child, r)) : (to(t), n = e.child, e = n.sibling, n = oi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function xc(e, t) {
		return t = Sc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Sc(e, t) {
		return e = ii(22, e, null, t), e.lanes = 0, e;
	}
	function Cc(e, t, n) {
		return Pa(t, e.child, null, n), e = xc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function wc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ki(e.return, t, n);
	}
	function Tc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function K(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = W.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, R(W, o), nc(e, t, r, n), r = U ? vi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && wc(e, n, t);
			else if (e.tag === 19) wc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && oo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Tc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && oo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Tc(t, !0, n, null, a, r);
				break;
			case "together":
				Tc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ec(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Kl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Ji(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = oi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = oi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Dc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Yi(e))) : !0;
	}
	function Oc(e, t, n) {
		switch (t.tag) {
			case 3:
				le(t, t.stateNode.containerInfo), Wi(t, ra, e.memoizedState.cache), Ri();
				break;
			case 27:
			case 5:
				de(t);
				break;
			case 4:
				le(t, t.stateNode.containerInfo);
				break;
			case 10:
				Wi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, no(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (to(t), e = Ec(e, t, n), e === null ? null : e.sibling) : bc(e, t, n) : (to(t), t.flags |= 128, null);
				to(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Ji(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return K(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), R(W, W.current), r) break;
				return null;
			case 22: return t.lanes = 0, oc(e, t, n, t.pendingProps);
			case 24: Wi(t, ra, e.memoizedState.cache);
		}
		return Ec(e, t, n);
	}
	function kc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) tc = !0;
		else {
			if (!Dc(e, n) && !(t.flags & 128)) return tc = !1, Oc(e, t, n);
			tc = !!(e.flags & 131072);
		}
		else tc = !1, U && t.flags & 1048576 && Ti(t, vi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = wa(t.elementType), t.type = e, typeof e == "function") ai(e) ? (r = Ws(e, r), t.tag = 1, t = hc(null, t, e, r, n)) : (t.tag = 0, t = pc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = rc(null, t, e, r, n);
								break a;
							} else if (a === ee) {
								t.tag = 14, t = ic(null, t, e, r, n);
								break a;
							}
						}
						throw t = M(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return pc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ws(r, t.pendingProps), hc(e, t, r, a, n);
			case 3:
				a: {
					if (le(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ra(e, t), Ga(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Wi(t, ra, r), r !== o.cache && qi(t, [ra], n, !0), Wa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = gc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = mi(Error(i(424)), t), Bi(a), t = gc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ai = cf(e.firstChild), ki = t, U = !0, ji = null, Mi = !0, n = Fa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ri(), r === a) {
							t = Ec(e, t, n);
							break a;
						}
						nc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return fc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : U || (n = t.type, e = t.pendingProps, r = Bd(se.current).createElement(n), r[at] = t, r[B] = e, Pd(r, n, e), _t(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return de(t), e === null && U && (r = t.stateNode = ff(t.type, t.pendingProps, se.current), ki = t, Mi = !0, a = Ai, Zd(t.type) ? (lf = a, Ai = cf(r.firstChild)) : Ai = a), nc(e, t, t.pendingProps.children, n), fc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && U && ((a = r = Ai) && (r = tf(r, t.type, t.pendingProps, Mi), r === null ? a = !1 : (t.stateNode = r, ki = t, Ai = cf(r.firstChild), Mi = !1, a = !0)), a || Pi(t)), de(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = bo(e, t, Co, null, null, n), Qf._currentValue = a), fc(e, t), nc(e, t, r, n), t.child;
			case 6: return e === null && U && ((e = n = Ai) && (n = nf(n, t.pendingProps, Mi), n === null ? e = !1 : (t.stateNode = n, ki = t, Ai = null, e = !0)), e || Pi(t)), null;
			case 13: return bc(e, t, n);
			case 4: return le(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Pa(t, null, r, n) : nc(e, t, r, n), t.child;
			case 11: return rc(e, t, t.type, t.pendingProps, n);
			case 7: return nc(e, t, t.pendingProps, n), t.child;
			case 8: return nc(e, t, t.pendingProps.children, n), t.child;
			case 12: return nc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Wi(t, t.type, r.value), nc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Xi(t), a = Zi(a), r = r(a), t.flags |= 1, nc(e, t, r, n), t.child;
			case 14: return ic(e, t, t.type, t.pendingProps, n);
			case 15: return ac(e, t, t.type, t.pendingProps, n);
			case 19: return K(e, t, n);
			case 31: return dc(e, t, n);
			case 22: return oc(e, t, n, t.pendingProps);
			case 24: return Xi(t), r = Zi(ra), e === null ? (a = ha(), a === null && (a = Rl, o = ia(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, La(t), Wi(t, ra, a)) : ((e.lanes & n) !== 0 && (Ra(e, t), Ga(t, null, null, n), Wa()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Wi(t, ra, r), r !== a.cache && qi(t, [ra], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Wi(t, ra, r))), nc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Ac(e) {
		e.flags |= 4;
	}
	function jc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Tu()) e.flags |= 8192;
			else throw Ta = xa, ya;
		} else e.flags &= -16777217;
	}
	function Mc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (Tu()) e.flags |= 8192;
		else throw Ta = xa, ya;
	}
	function Nc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Je(), e.lanes |= t, Xl |= t);
	}
	function Pc(e, t) {
		if (!U) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Fc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Ic(e, t, n) {
		var r = t.pendingProps;
		switch (Di(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Fc(t), null;
			case 1: return Fc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Gi(ra), ue(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Li(t) ? Ac(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, zi())), Fc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Ac(t), o === null ? (Fc(t), jc(t, a, null, r, n)) : (Fc(t), Mc(t, o))) : o ? o === e.memoizedState ? (Fc(t), t.flags &= -16777217) : (Ac(t), Fc(t), Mc(t, o)) : (e = e.memoizedProps, e !== r && Ac(t), Fc(t), jc(t, a, e, r, n)), null;
			case 27:
				if (fe(t), n = se.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Fc(t), null;
					}
					e = ae.current, Li(t) ? Fi(t, e) : (e = ff(a, r, n), t.stateNode = e, Ac(t));
				}
				return Fc(t), null;
			case 5:
				if (fe(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Fc(t), null;
					}
					if (o = ae.current, Li(t)) Fi(t, o);
					else {
						var s = Bd(se.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[at] = t, o[B] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Ac(t);
					}
				}
				return Fc(t), jc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = se.current, Li(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = ki, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[at] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || Pi(t, !0);
					} else e = Bd(e).createTextNode(r), e[at] = t, t.stateNode = e;
				}
				return Fc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Li(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[at] = t;
						} else Ri(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Fc(t), e = !1;
					} else n = zi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (ao(t), t) : (ao(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Fc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Li(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[at] = t;
						} else Ri(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Fc(t), a = !1;
					} else a = zi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (ao(t), t) : (ao(t), null);
				}
				return ao(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Nc(t, t.updateQueue), Fc(t), null);
			case 4: return ue(), e === null && xd(t.stateNode.containerInfo), Fc(t), null;
			case 10: return Gi(t.type), Fc(t), null;
			case 19:
				if (L(W), r = t.memoizedState, r === null) return Fc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Pc(r, !1);
				else {
					if (Gl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = oo(e), o !== null) {
							for (t.flags |= 128, Pc(r, !1), e = o.updateQueue, t.updateQueue = e, Nc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) si(n, e), n = n.sibling;
							return R(W, W.current & 1 | 2), U && wi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Te() > nu && (t.flags |= 128, a = !0, Pc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = oo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Nc(t, e), Pc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !U) return Fc(t), null;
					} else 2 * Te() - r.renderingStartTime > nu && n !== 536870912 && (t.flags |= 128, a = !0, Pc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Fc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Te(), e.sibling = null, n = W.current, R(W, a ? n & 1 | 2 : n & 1), U && wi(t, r.treeForkCount), e);
			case 22:
			case 23: return ao(t), Qa(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Fc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Fc(t), n = t.updateQueue, n !== null && Nc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && L(ma), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Gi(ra), Fc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Lc(e, t) {
		switch (Di(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Gi(ra), ue(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return fe(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (ao(t), t.alternate === null) throw Error(i(340));
					Ri();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (ao(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ri();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return L(W), null;
			case 4: return ue(), null;
			case 10: return Gi(t.type), null;
			case 22:
			case 23: return ao(t), Qa(), e !== null && L(ma), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Gi(ra), null;
			case 25: return null;
			default: return null;
		}
	}
	function Rc(e, t) {
		switch (Di(t), t.tag) {
			case 3:
				Gi(ra), ue();
				break;
			case 26:
			case 27:
			case 5:
				fe(t);
				break;
			case 4:
				ue();
				break;
			case 31:
				t.memoizedState !== null && ao(t);
				break;
			case 13:
				ao(t);
				break;
			case 19:
				L(W);
				break;
			case 10:
				Gi(t.type);
				break;
			case 22:
			case 23:
				ao(t), Qa(), e !== null && L(ma);
				break;
			case 24: Gi(ra);
		}
	}
	function zc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Gu(t, t.return, e);
		}
	}
	function Bc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Gu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Gu(t, t.return, e);
		}
	}
	function Vc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				qa(t, n);
			} catch (t) {
				Gu(e, e.return, t);
			}
		}
	}
	function Hc(e, t, n) {
		n.props = Ws(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Gu(e, t, n);
		}
	}
	function Uc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Gu(e, t, n);
		}
	}
	function Wc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Gu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Gu(e, t, n);
		}
		else n.current = null;
	}
	function Gc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Gu(e, e.return, t);
		}
	}
	function Kc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[B] = t;
		} catch (t) {
			Gu(e, e.return, t);
		}
	}
	function qc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Jc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || qc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Yc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Xt));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Yc(e, t, n), e = e.sibling; e !== null;) Yc(e, t, n), e = e.sibling;
	}
	function Xc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Xc(e, t, n), e = e.sibling; e !== null;) Xc(e, t, n), e = e.sibling;
	}
	function Zc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[at] = e, t[B] = n;
		} catch (t) {
			Gu(e, e.return, t);
		}
	}
	var Qc = !1, $c = !1, el = !1, tl = typeof WeakSet == "function" ? WeakSet : Set, nl = null;
	function rl(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Cr(e), wr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, nl = t; nl !== null;) if (t = nl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, nl = e;
		else for (; nl !== null;) {
			switch (t = nl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ws(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Gu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, nl = e;
				break;
			}
			nl = t.return;
		}
	}
	function il(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				yl(e, n), r & 4 && zc(5, n);
				break;
			case 1:
				if (yl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Gu(n, n.return, e);
				}
				else {
					var i = Ws(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Gu(n, n.return, e);
					}
				}
				r & 64 && Vc(n), r & 512 && Uc(n, n.return);
				break;
			case 3:
				if (yl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						qa(e, t);
					} catch (e) {
						Gu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Zc(n);
			case 26:
			case 5:
				yl(e, n), t === null && r & 4 && Gc(n), r & 512 && Uc(n, n.return);
				break;
			case 12:
				yl(e, n);
				break;
			case 31:
				yl(e, n), r & 4 && ul(e, n);
				break;
			case 13:
				yl(e, n), r & 4 && dl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Z.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Qc, !r) {
					t = t !== null && t.memoizedState !== null || $c, i = Qc;
					var a = $c;
					Qc = r, ($c = t) && !a ? xl(e, n, (n.subtreeFlags & 8772) != 0) : yl(e, n), Qc = i, $c = a;
				}
				break;
			case 30: break;
			default: yl(e, n);
		}
	}
	function al(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, al(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ft(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var ol = null, sl = !1;
	function cl(e, t, n) {
		for (n = n.child; n !== null;) ll(e, t, n), n = n.sibling;
	}
	function ll(e, t, n) {
		if (Fe && typeof Fe.onCommitFiberUnmount == "function") try {
			Fe.onCommitFiberUnmount(Pe, n);
		} catch {}
		switch (n.tag) {
			case 26:
				$c || Wc(n, t), cl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				$c || Wc(n, t);
				var r = ol, i = sl;
				Zd(n.type) && (ol = n.stateNode, sl = !1), cl(e, t, n), pf(n.stateNode), ol = r, sl = i;
				break;
			case 5: $c || Wc(n, t);
			case 6:
				if (r = ol, i = sl, ol = null, cl(e, t, n), ol = r, sl = i, ol !== null) if (sl) try {
					(ol.nodeType === 9 ? ol.body : ol.nodeName === "HTML" ? ol.ownerDocument.body : ol).removeChild(n.stateNode);
				} catch (e) {
					Gu(n, t, e);
				}
				else try {
					ol.removeChild(n.stateNode);
				} catch (e) {
					Gu(n, t, e);
				}
				break;
			case 18:
				ol !== null && (sl ? (e = ol, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(ol, n.stateNode));
				break;
			case 4:
				r = ol, i = sl, ol = n.stateNode.containerInfo, sl = !0, cl(e, t, n), ol = r, sl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Bc(2, n, t), $c || Bc(4, n, t), cl(e, t, n);
				break;
			case 1:
				$c || (Wc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Hc(n, t, r)), cl(e, t, n);
				break;
			case 21:
				cl(e, t, n);
				break;
			case 22:
				$c = (r = $c) || n.memoizedState !== null, cl(e, t, n), $c = r;
				break;
			default: cl(e, t, n);
		}
	}
	function ul(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Gu(t, t.return, e);
			}
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Gu(t, t.return, e);
		}
	}
	function fl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new tl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new tl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function pl(e, t) {
		var n = fl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ml(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							ol = c.stateNode, sl = !1;
							break a;
						}
						break;
					case 5:
						ol = c.stateNode, sl = !1;
						break a;
					case 3:
					case 4:
						ol = c.stateNode.containerInfo, sl = !0;
						break a;
				}
				c = c.return;
			}
			if (ol === null) throw Error(i(160));
			ll(o, s, a), ol = null, sl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) gl(t, e), t = t.sibling;
	}
	var hl = null;
	function gl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ml(t, e), _l(e), r & 4 && (Bc(3, e, e.return), zc(3, e), Bc(5, e, e.return));
				break;
			case 1:
				ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), r & 64 && Qc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = hl;
				if (ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[dt] || o[at] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[at] = e, _t(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[at] = e, _t(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Kc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), n !== null && r & 4 && Kc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Ht(a, "");
					} catch (t) {
						Gu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Kc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (el = !0);
				break;
			case 6:
				if (ml(t, e), _l(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Gu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = hl, hl = gf(t.containerInfo), ml(t, e), hl = a, _l(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Gu(e, e.return, t);
				}
				el && (el = !1, vl(e));
				break;
			case 4:
				r = hl, hl = gf(e.stateNode.containerInfo), ml(t, e), _l(e), hl = r;
				break;
			case 12:
				ml(t, e), _l(e);
				break;
			case 31:
				ml(t, e), _l(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 13:
				ml(t, e), _l(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (eu = Te()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Qc, d = $c;
				if (Qc = u || a, $c = d || l, ml(t, e), $c = d, Qc = u, _l(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Qc || $c || bl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Gu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Gu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Gu(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, pl(e, n))));
				break;
			case 19:
				ml(t, e), _l(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ml(t, e), _l(e);
		}
	}
	function _l(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (qc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Xc(e, Jc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Ht(o, ""), n.flags &= -33), Xc(e, Jc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Yc(e, Jc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Gu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function vl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			vl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function yl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) il(e, t.alternate, t), t = t.sibling;
	}
	function bl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Bc(4, t, t.return), bl(t);
					break;
				case 1:
					Wc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Hc(t, t.return, n), bl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Wc(t, t.return), bl(t);
					break;
				case 22:
					t.memoizedState === null && bl(t);
					break;
				case 30:
					bl(t);
					break;
				default: bl(t);
			}
			e = e.sibling;
		}
	}
	function xl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					xl(i, a, n), zc(4, a);
					break;
				case 1:
					if (xl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Gu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ka(c[i], s);
						} catch (e) {
							Gu(r, r.return, e);
						}
					}
					n && o & 64 && Vc(a), Uc(a, a.return);
					break;
				case 27: Zc(a);
				case 26:
				case 5:
					xl(i, a, n), n && r === null && o & 4 && Gc(a), Uc(a, a.return);
					break;
				case 12:
					xl(i, a, n);
					break;
				case 31:
					xl(i, a, n), n && o & 4 && ul(i, a);
					break;
				case 13:
					xl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 22:
					a.memoizedState === null && xl(i, a, n), Uc(a, a.return);
					break;
				case 30: break;
				default: xl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Sl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && aa(n));
	}
	function Cl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && aa(e));
	}
	function wl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Tl(e, t, n, r), t = t.sibling;
	}
	function Tl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				wl(e, t, n, r), i & 2048 && zc(9, t);
				break;
			case 1:
				wl(e, t, n, r);
				break;
			case 3:
				wl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && aa(e)));
				break;
			case 12:
				if (i & 2048) {
					wl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Gu(t, t.return, e);
					}
				} else wl(e, t, n, r);
				break;
			case 31:
				wl(e, t, n, r);
				break;
			case 13:
				wl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? wl(e, t, n, r) : (a._visibility |= 2, El(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? wl(e, t, n, r) : Dl(e, t), i & 2048 && Sl(o, t);
				break;
			case 24:
				wl(e, t, n, r), i & 2048 && Cl(t.alternate, t);
				break;
			default: wl(e, t, n, r);
		}
	}
	function El(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					El(a, o, s, c, i), zc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, El(a, o, s, c, i)) : u._visibility & 2 ? El(a, o, s, c, i) : Dl(a, o), i && l & 2048 && Sl(o.alternate, o);
					break;
				case 24:
					El(a, o, s, c, i), i && l & 2048 && Cl(o.alternate, o);
					break;
				default: El(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Dl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Dl(n, r), i & 2048 && Sl(r.alternate, r);
					break;
				case 24:
					Dl(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				default: Dl(n, r);
			}
			t = t.sibling;
		}
	}
	var Ol = 8192;
	function kl(e, t, n) {
		if (e.subtreeFlags & Ol) for (e = e.child; e !== null;) Al(e, t, n), e = e.sibling;
	}
	function Al(e, t, n) {
		switch (e.tag) {
			case 26:
				kl(e, t, n), e.flags & Ol && e.memoizedState !== null && Gf(n, hl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				kl(e, t, n);
				break;
			case 3:
			case 4:
				var r = hl;
				hl = gf(e.stateNode.containerInfo), kl(e, t, n), hl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ol, Ol = 16777216, kl(e, t, n), Ol = r) : kl(e, t, n));
				break;
			default: kl(e, t, n);
		}
	}
	function jl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ml(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nl = r, Fl(r, e);
			}
			jl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Nl(e), e = e.sibling;
	}
	function Nl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ml(e), e.flags & 2048 && Bc(9, e, e.return);
				break;
			case 3:
				Ml(e);
				break;
			case 12:
				Ml(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Pl(e)) : Ml(e);
				break;
			default: Ml(e);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nl = r, Fl(r, e);
			}
			jl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Bc(8, t, t.return), Pl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Pl(t));
					break;
				default: Pl(t);
			}
			e = e.sibling;
		}
	}
	function Fl(e, t) {
		for (; nl !== null;) {
			var n = nl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Bc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: aa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, nl = r;
			else a: for (n = e; nl !== null;) {
				r = nl;
				var i = r.sibling, a = r.return;
				if (al(r), r === n) {
					nl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, nl = i;
					break a;
				}
				nl = a;
			}
		}
	}
	var Il = {
		getCacheForType: function(e) {
			var t = Zi(ra), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Zi(ra).controller.signal;
		}
	}, Ll = typeof WeakMap == "function" ? WeakMap : Map, q = 0, Rl = null, J = null, Y = 0, zl = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = 0, Zl = null, Ql = null, $l = !1, eu = 0, tu = 0, nu = Infinity, ru = null, iu = null, au = 0, ou = null, su = null, cu = 0, lu = 0, uu = null, du = null, fu = 0, pu = null;
	function mu() {
		return q & 2 && Y !== 0 ? Y & -Y : N.T === null ? rt() : ud();
	}
	function hu() {
		if (Yl === 0) if (!(Y & 536870912) || U) {
			var e = He;
			He <<= 1, !(He & 3932160) && (He = 262144), Yl = e;
		} else Yl = 536870912;
		return e = $a.current, e !== null && (e.flags |= 32), Yl;
	}
	function gu(e, t, n) {
		(e === Rl && (zl === 2 || zl === 9) || e.cancelPendingCommit !== null) && (Cu(e, 0), bu(e, Y, Yl, !1)), Xe(e, n), (!(q & 2) || e !== Rl) && (e === Rl && (!(q & 2) && (ql |= n), Gl === 4 && bu(e, Y, Yl, !1)), nd(e));
	}
	function _u(e, t, n) {
		if (q & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Ke(e, t), a = r ? ju(e, t) : ku(e, t, !0), o = r;
		do {
			if (a === 0) {
				Hl && !r && bu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !yu(n)) {
					a = ku(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Zl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Cu(c, s).flags |= 256), s = ku(c, s, !1), s !== 2) {
								if (Ul && !l) {
									c.errorRecoveryDisabledLanes |= o, ql |= o, a = 4;
									break a;
								}
								o = Ql, Ql = a, o !== null && (Ql === null ? Ql = o : Ql.push.apply(Ql, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Cu(e, 0), bu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							bu(r, t, Yl, !Vl);
							break a;
						case 2:
							Ql = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = eu + 300 - Te(), 10 < a)) {
						if (bu(r, t, Yl, !Vl), Ge(r, 0, !0) !== 0) break a;
						cu = t, r.timeoutHandle = Kd(vu.bind(null, r, n, Ql, ru, $l, t, Yl, ql, Xl, Vl, o, "Throttled", -0, 0), a);
						break a;
					}
					vu(r, n, Ql, ru, $l, t, Yl, ql, Xl, Vl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		nd(e);
	}
	function vu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Xt
			}, Al(t, a, d);
			var m = (a & 62914560) === a ? eu - Te() : (a & 4194048) === a ? tu - Te() : 0;
			if (m = qf(d, m), m !== null) {
				cu = a, e.cancelPendingCommit = m(X.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), bu(e, a, o, !l);
				return;
			}
		}
		X(e, t, a, n, r, i, o, s, c);
	}
	function yu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!vr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function bu(e, t, n, r) {
		t &= ~Jl, t &= ~ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Le(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && Qe(e, n, t);
	}
	function xu() {
		return q & 6 ? !0 : (rd(0, !1), !1);
	}
	function Su() {
		if (J !== null) {
			if (zl === 0) var e = J.return;
			else e = J, Ui = Hi = null, Eo(e), Oa = null, ka = 0, e = J;
			for (; e !== null;) Rc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Cu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), cu = 0, Su(), Rl = e, J = n = oi(e.current, null), Y = t, zl = 0, Bl = null, Vl = !1, Hl = Ke(e, t), Ul = !1, Xl = Yl = Jl = ql = Kl = Gl = 0, Ql = Zl = null, $l = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Le(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, Xr(), n;
	}
	function wu(e, t) {
		G = null, N.H = Is, t === va || t === ba ? (t = Ea(), zl = 3) : t === ya ? (t = Ea(), zl = 4) : zl = t === ec ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, J === null && (Gl = 1, Js(e, mi(t, e.current)));
	}
	function Tu() {
		var e = $a.current;
		return e === null ? !0 : (Y & 4194048) === Y ? eo === null : (Y & 62914560) === Y || Y & 536870912 ? e === eo : !1;
	}
	function Eu() {
		var e = N.H;
		return N.H = Is, e === null ? Is : e;
	}
	function Du() {
		var e = N.A;
		return N.A = Il, e;
	}
	function Ou() {
		Gl = 4, Vl || (Y & 4194048) !== Y && $a.current !== null || (Hl = !0), !(Kl & 134217727) && !(ql & 134217727) || Rl === null || bu(Rl, Y, Yl, !1);
	}
	function ku(e, t, n) {
		var r = q;
		q |= 2;
		var i = Eu(), a = Du();
		(Rl !== e || Y !== t) && (ru = null, Cu(e, t)), t = !1;
		var o = Gl;
		a: do
			try {
				if (zl !== 0 && J !== null) {
					var s = J, c = Bl;
					switch (zl) {
						case 8:
							Su(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							$a.current === null && (t = !0);
							var l = zl;
							if (zl = 0, Bl = null, Fu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = zl, zl = 0, Bl = null, Fu(e, s, c, l);
					}
				}
				Au(), o = Gl;
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Ui = Hi = null, q = r, N.H = i, N.A = a, J === null && (Rl = null, Y = 0, Xr()), o;
	}
	function Au() {
		for (; J !== null;) Nu(J);
	}
	function ju(e, t) {
		var n = q;
		q |= 2;
		var r = Eu(), a = Du();
		Rl !== e || Y !== t ? (ru = null, nu = Te() + 500, Cu(e, t)) : Hl = Ke(e, t);
		a: do
			try {
				if (zl !== 0 && J !== null) {
					t = J;
					var o = Bl;
					b: switch (zl) {
						case 1:
							zl = 0, Bl = null, Fu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Sa(o)) {
								zl = 0, Bl = null, Pu(t);
								break;
							}
							t = function() {
								zl !== 2 && zl !== 9 || Rl !== e || (zl = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							zl = 7;
							break a;
						case 4:
							zl = 5;
							break a;
						case 7:
							Sa(o) ? (zl = 0, Bl = null, Pu(t)) : (zl = 0, Bl = null, Fu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Wf(s) : c.stateNode.complete) {
										zl = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Iu(u));
										}
										break b;
									}
							}
							zl = 0, Bl = null, Fu(e, t, o, 5);
							break;
						case 6:
							zl = 0, Bl = null, Fu(e, t, o, 6);
							break;
						case 8:
							Su(), Gl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Mu();
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return Ui = Hi = null, N.H = r, N.A = a, q = n, J === null ? (Rl = null, Y = 0, Xr(), Gl) : 0;
	}
	function Mu() {
		for (; J !== null && !Ce();) Nu(J);
	}
	function Nu(e) {
		var t = kc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : J = t;
	}
	function Pu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = mc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = mc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: Eo(t);
			default: Rc(n, t), t = J = si(t, Wl), t = kc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : J = t;
	}
	function Fu(e, t, n, r) {
		Ui = Hi = null, Eo(t), Oa = null, ka = 0;
		var i = t.return;
		try {
			if ($s(e, i, t, n, Y)) {
				Gl = 1, Js(e, mi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Gl = 1, Js(e, mi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (U || r === 1 ? e = !0 : Hl || Y & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = $a.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Lu(t, e)) : Iu(t);
	}
	function Iu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Lu(t, Vl);
				return;
			}
			e = t.return;
			var n = Ic(t.alternate, t, Wl);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Gl === 0 && (Gl = 5);
	}
	function Lu(e, t) {
		do {
			var n = Lc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Gl = 6, J = null;
	}
	function X(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (au !== 0);
		if (q & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Yr, Ze(e, n, o, s, c, l), e === Rl && (J = Rl = null, Y = 0), su = t, ou = e, cu = n, lu = o, uu = a, du = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(ke, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = N.T, N.T = null, a = P.p, P.p = 2, s = q, q |= 4;
				try {
					rl(e, t, n);
				} finally {
					q = s, P.p = a, N.T = r;
				}
			}
			au = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (au === 1) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = q;
				q |= 4;
				try {
					gl(t, e);
					var a = zd, o = Cr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Sr(s.ownerDocument.documentElement, s)) {
						if (c !== null && wr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = xr(s, h), v = xr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					q = i, P.p = r, N.T = n;
				}
			}
			e.current = t, au = 2;
		}
	}
	function zu() {
		if (au === 2) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = q;
				q |= 4;
				try {
					il(e, t.alternate, t);
				} finally {
					q = i, P.p = r, N.T = n;
				}
			}
			au = 3;
		}
	}
	function Bu() {
		if (au === 4 || au === 3) {
			au = 0, we();
			var e = ou, t = su, n = cu, r = du;
			t.subtreeFlags & 10256 || t.flags & 10256 ? au = 5 : (au = 0, su = ou = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (iu = null), nt(n), t = t.stateNode, Fe && typeof Fe.onCommitFiberRoot == "function") try {
				Fe.onCommitFiberRoot(Pe, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = N.T, i = P.p, P.p = 2, N.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					N.T = t, P.p = i;
				}
			}
			cu & 3 && Hu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === pu ? fu++ : (fu = 0, pu = e) : fu = 0, rd(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, aa(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (au !== 5) return !1;
		var e = ou, t = lu;
		lu = 0;
		var n = nt(cu), r = N.T, a = P.p;
		try {
			P.p = 32 > n ? 32 : n, N.T = null, n = uu, uu = null;
			var o = ou, s = cu;
			if (au = 0, su = ou = null, cu = 0, q & 6) throw Error(i(331));
			var c = q;
			if (q |= 4, Nl(o.current), Tl(o, o.current, s, n), q = c, rd(0, !1), Fe && typeof Fe.onPostCommitFiberRoot == "function") try {
				Fe.onPostCommitFiberRoot(Pe, o);
			} catch {}
			return !0;
		} finally {
			P.p = a, N.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = mi(n, t), t = Xs(e.stateNode, t, 2), e = Ba(e, t, 2), e !== null && (Xe(e, 2), nd(e));
	}
	function Gu(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (iu === null || !iu.has(r))) {
					e = mi(n, e), n = Zs(2), r = Ba(t, n, 2), r !== null && (Qs(n, r, t, e), Xe(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ll();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = qu.bind(null, e, t, n), t.then(e, e));
	}
	function qu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Rl === e && (Y & n) === n && (Gl === 4 || Gl === 3 && (Y & 62914560) === Y && 300 > Te() - eu ? !(q & 2) && Cu(e, 0) : Jl |= n, Xl === Y && (Xl = 0)), nd(e);
	}
	function Ju(e, t) {
		t === 0 && (t = Je()), e = $r(e, t), e !== null && (Xe(e, t), nd(e));
	}
	function Z(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ju(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Ju(e, n);
	}
	function Xu(e, t) {
		return xe(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, Q = 0;
	function nd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ld());
	}
	function rd(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Le(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = Y, a = Ge(r, r === Rl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Ke(r, a) || (n = !0, cd(r, a));
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function id() {
		ad();
	}
	function ad() {
		ed = $u = !1;
		var e = 0;
		Q !== 0 && Gd() && (e = Q);
		for (var t = Te(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		au !== 0 && au !== 5 || rd(e, !1), Q !== 0 && (Q = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Le(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = qe(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Rl, n = Y, n = Ge(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (zl === 2 || zl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Se(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Ke(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Se(r), nt(n)) {
				case 2:
				case 8:
					n = Oe;
					break;
				case 32:
					n = ke;
					break;
				case 268435456:
					n = je;
					break;
				default: n = ke;
			}
			return r = sd.bind(null, e), n = xe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Se(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (au !== 0 && au !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = Ge(e, e === Rl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (_u(e, r, t), od(e, Te()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Hu()) return null;
		_u(e, t, !0);
	}
	function ld() {
		Yd(function() {
			q & 6 ? xe(De, id) : ad();
		});
	}
	function ud() {
		if (Q === 0) {
			var e = ca;
			e === 0 && (e = Ve, Ve <<= 1, !(Ve & 261888) && (Ve = 256)), Q = e;
		}
		return Q;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Yt("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[B] || null).action), o = r.submitter;
			o && (t = (t = o[B] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new _n("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Q !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								Ss(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), Ss(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var md = 0; md < Wr.length; md++) {
		var hd = Wr[md];
		Gr(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Gr(Ir, "onAnimationEnd"), Gr(Lr, "onAnimationIteration"), Gr(Rr, "onAnimationStart"), Gr("dblclick", "onDoubleClick"), Gr("focusin", "onFocus"), Gr("focusout", "onBlur"), Gr(zr, "onTransitionRun"), Gr(Br, "onTransitionStart"), Gr(Vr, "onTransitionCancel"), Gr(Hr, "onTransitionEnd"), xt("onMouseEnter", ["mouseout", "mouseover"]), xt("onMouseLeave", ["mouseout", "mouseover"]), xt("onPointerEnter", ["pointerout", "pointerover"]), xt("onPointerLeave", ["pointerout", "pointerover"]), bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), bt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var gd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _d = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gd));
	function vd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Kr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Kr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[st];
		n === void 0 && (n = t[st] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Sd(t, e, 2, !1), n.add(r));
	}
	function yd(e, t, n) {
		var r = 0;
		t && (r |= 4), Sd(n, e, r, t);
	}
	var bd = "_reactListening" + Math.random().toString(36).slice(2);
	function xd(e) {
		if (!e[bd]) {
			e[bd] = !0, vt.forEach(function(t) {
				t !== "selectionchange" && (_d.has(t) || yd(t, !1, e), yd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[bd] || (t[bd] = !0, yd("selectionchange", !1, t));
		}
	}
	function Sd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !sn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Cd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = pt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		rn(function() {
			var r = a, i = Qt(n), s = [];
			a: {
				var c = Ur.get(e);
				if (c !== void 0) {
					var l = _n, u = e;
					switch (e) {
						case "keypress": if (pn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Fn;
							break;
						case "focusin":
							u = "focus", l = En;
							break;
						case "focusout":
							u = "blur", l = En;
							break;
						case "beforeblur":
						case "afterblur":
							l = En;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = wn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Tn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Ln;
							break;
						case Ir:
						case Lr:
						case Rr:
							l = Dn;
							break;
						case Hr:
							l = Rn;
							break;
						case "scroll":
						case "scrollend":
							l = yn;
							break;
						case "wheel":
							l = zn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = On;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = In;
							break;
						case "toggle":
						case "beforetoggle": l = Bn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = an(m, p), g != null && d.push(wd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Zt && (u = n.relatedTarget || n.fromElement) && (pt(u) || u[ot])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? pt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = wn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = In, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ht(l), h = u == null ? c : ht(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, pt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ed, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Dd(s, c, l, d, !1), u !== null && f !== null && Dd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? ht(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = or;
					else if (er(c)) if (sr) v = gr;
					else {
						v = mr;
						var y = pr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Kt(r.elementType) && (v = or) : v = hr;
					if (v &&= v(e, r)) {
						tr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Rt(c, "number", c.value);
				}
				switch (y = r ? ht(r) : window, e) {
					case "focusin":
						(er(y) || y.contentEditable === "true") && (Er = y, Dr = r, Or = null);
						break;
					case "focusout":
						Or = Dr = Er = null;
						break;
					case "mousedown":
						kr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						kr = !1, Ar(s, n, i);
						break;
					case "selectionchange": if (Tr) break;
					case "keydown":
					case "keyup": Ar(s, n, i);
				}
				var b;
				if (Hn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else Xn ? Jn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Gn && n.locale !== "ko" && (Xn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Xn && (b = fn()) : (ln = i, un = "value" in ln ? ln.value : ln.textContent, Xn = !0)), y = Td(r, x), 0 < y.length && (x = new kn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Yn(n), b !== null && (x.data = b)))), (b = Wn ? Zn(e, n) : Qn(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new kn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), pd(s, e, r, n, i);
			}
			vd(s, t);
		});
	}
	function wd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Td(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = an(e, n), i != null && r.unshift(wd(e, i, a)), i = an(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ed(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Dd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = an(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = an(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Od = /\r\n?/g, kd = /\u0000|\uFFFD/g;
	function Ad(e) {
		return (typeof e == "string" ? e : "" + e).replace(Od, "\n").replace(kd, "");
	}
	function jd(e, t) {
		return t = Ad(t), Ad(e) === t;
	}
	function Md(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Ht(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Ht(e, "" + r);
				break;
			case "className":
				Dt(e, "class", r);
				break;
			case "tabIndex":
				Dt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Dt(e, n, r);
				break;
			case "style":
				Gt(e, r, o);
				break;
			case "data": if (t !== "object") {
				Dt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Yt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Md(e, t, "name", a.name, a, null), Md(e, t, "formEncType", a.formEncType, a, null), Md(e, t, "formMethod", a.formMethod, a, null), Md(e, t, "formTarget", a.formTarget, a, null)) : (Md(e, t, "encType", a.encType, a, null), Md(e, t, "method", a.method, a, null), Md(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Yt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Xt);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Yt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				$("beforetoggle", e), $("toggle", e), Et(e, "popover", r);
				break;
			case "xlinkActuate":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Et(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = qt.get(n) || n, Et(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Gt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Ht(e, r) : (typeof r == "number" || typeof r == "bigint") && Ht(e, "" + r);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Xt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!yt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[B] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Et(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				$("error", e), $("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Md(e, t, o, s, n, null);
					}
				}
				a && Md(e, t, "srcSet", n.srcSet, n, null), r && Md(e, t, "src", n.src, n, null);
				return;
			case "input":
				$("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Md(e, t, r, d, n, null);
					}
				}
				Lt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in $("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Md(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && zt(e, !!r, n, !0) : zt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in $("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Md(e, t, s, c, n, null);
				}
				Vt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Md(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				$("beforetoggle", e), $("toggle", e), $("cancel", e), $("close", e);
				break;
			case "iframe":
			case "object":
				$("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < gd.length; r++) $(gd[r], e);
				break;
			case "image":
				$("error", e), $("load", e);
				break;
			case "details":
				$("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": $("error", e), $("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Md(e, t, u, r, n, null);
				}
				return;
			default: if (Kt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Md(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Md(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Md(e, t, p, m, r, f);
					}
				}
				It(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Md(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Md(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? zt(e, !!n, n ? [] : "", !1) : zt(e, !!n, t, !0)) : zt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Md(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Md(e, t, s, a, r, o);
				}
				Bt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Md(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Md(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Md(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Md(e, t, u, p, r, m);
				}
				return;
			default: if (Kt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Md(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Md(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Wd ? !1 : (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[dt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), ft(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[dt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		ft(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = P.d;
	P.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = xu();
		return e || t;
	}
	function yf(e) {
		var t = mt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ws(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Ft(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), _t(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Ft(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Ft(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Ft(n.imageSizes) + "\"]")) : i += "[href=\"" + Ft(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), _t(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Ft(r) + "\"][href=\"" + Ft(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), _t(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = gt(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					_t(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = gt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), _t(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = gt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), _t(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = se.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = gt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = gt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = gt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + Ft(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), _t(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Ft(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Ft(n.href) + "\"]");
				if (r) return t.instance = r, _t(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), _t(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, _t(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), _t(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, _t(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), _t(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[dt] || a[at] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, _t(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), _t(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: re,
		_currentValue2: re,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ye(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ye(0), this.hiddenUpdates = Ye(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ii(3, null, null, t), e.current = a, a.stateNode = e, t = ia(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, La(a), e;
	}
	function tp(e) {
		return e ? (e = ni, e) : ni;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = za(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ba(e, r, t), n !== null && (gu(n, e, t), Va(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = $r(e, 67108864);
			t !== null && gu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = mu();
			t = tt(t);
			var n = $r(e, t);
			n !== null && gu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 2, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 8, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = mt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = We(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Le(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(q & 6) && (nu = Te() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = $r(a, 2), s !== null && gu(s, a, 2), xu(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Qt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = pt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Ee()) {
				case De: return 2;
				case Oe: return 8;
				case ke:
				case Ae: return 32;
				case je: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = mt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = pt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, z(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, z(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Zt = r, n.target.dispatchEvent(r), Zt = null;
			} else return t = mt(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = mt(n);
				a !== null && (e.splice(t, 3), t -= 3, Ss(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[B] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[B] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, mu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), xu(), t[ot] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = rt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.6") throw Error(i(527, Lp, "19.2.6"));
	P.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: N,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Pe = zp.inject(Rp), Fe = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Gs, s = Ks, c = qs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[ot] = t.current, xd(e), new Fp(t);
	};
})), g = (/* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})))(), _ = ["localhost", "127.0.0.1"].includes(location.hostname);
_ && new URLSearchParams(location.search).get("api") === "local" && sessionStorage.setItem("quadern-local-api", "1");
var v = _ && sessionStorage.getItem("quadern-local-api") === "1" ? "http://127.0.0.1:5173" : "https://quadern-de-lectures.lluisgalbany.chatgpt.site", y = "quadern-editor-session", b = "quadern-login-state";
function x() {
	try {
		let e = JSON.parse(sessionStorage.getItem(y) || "null");
		if (e && /^[a-f0-9]{64}$/.test(e.token) && e.expires > Date.now()) return e;
		sessionStorage.removeItem(y);
	} catch {}
	return null;
}
var S = new URLSearchParams(location.hash.slice(1));
if (S.has("session")) {
	let e = sessionStorage.getItem(b), t = S.get("state"), n = S.get("session") || "", r = Number(S.get("expires"));
	history.replaceState(null, "", location.pathname + location.search), e && e === t && /^[a-f0-9]{64}$/.test(n) && r > Date.now() && sessionStorage.setItem(y, JSON.stringify({
		token: n,
		expires: r
	})), sessionStorage.removeItem(b);
}
async function C(e, t = {}) {
	let n = x(), r = new Headers(t.headers);
	n && r.set("Authorization", "Bearer " + n.token);
	let i;
	try {
		i = await fetch(v + e, {
			...t,
			headers: r,
			credentials: "omit",
			cache: "no-store"
		});
	} catch {
		throw Error("No s’ha pogut connectar amb el quadern. Comprova la connexió i torna-ho a provar.");
	}
	if (!i.headers.get("Content-Type")?.includes("application/json")) throw Error("El registre encara requereix accés privat. Pots obrir-lo des de l’enllaç del servei.");
	return i;
}
function w() {
	let e = Array.from(crypto.getRandomValues(new Uint8Array(32))).map((e) => e.toString(16).padStart(2, "0")).join("");
	sessionStorage.setItem(b, e);
	let t = new URL("/connect", v);
	t.searchParams.set("return_to", location.origin + location.pathname), t.searchParams.set("state", e), location.assign(t);
}
async function T() {
	if (!(await C("/api/session", { method: "DELETE" })).ok) throw Error("No s’ha pogut tancar la sessió. Torna-ho a provar.");
	sessionStorage.removeItem(y), location.reload();
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var E = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function ee(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: E(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var D = (e) => {
	let t = "", n = !1;
	for (let r of e) {
		if (r === "-" || r === "_" || r <= " ") {
			n = t.length > 0;
			continue;
		}
		t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1;
	}
	return t;
}, O = (e) => {
	let t = D(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, te = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), k = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function A(e) {
	return e != null;
}
function j(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? k.width, a = e.size ?? e.height ?? k.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? te(...c) : te("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? k["stroke-width"]) * Number(e.size ?? e.width ?? k.width) / Number(t.size ?? t.width ?? k.width) : t.strokeWidth ?? k["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(k).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && A(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && A(t.width) && { [r("width")]: t.width },
			..."height" in t && A(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function M(e, t = {}) {
	return j(e, {
		...t,
		attributeNames: {
			...t.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var ne = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, N = /* @__PURE__ */ c(f(), 1), P = (0, N.createContext)({}), re = () => (0, N.useContext)(P), ie = (0, N.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = re() ?? {}, y = !!c || ne(d), [b, x, S = []] = M(u, {
		color: e ?? _,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? h,
		nonScalingStroke: o ?? g,
		className: te(v, s),
		hasA11yProp: y,
		attributes: d
	});
	return (0, N.createElement)(b, {
		ref: f,
		...x
	}, [...S.map(([e, t]) => (0, N.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function F(e, t = [], n = []) {
	let r = typeof e == "string" ? ee(e, t, n) : e, i = (0, N.forwardRef)(({ className: e, ...t }, n) => (0, N.createElement)(ie, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = O(r.name)), i;
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs
var I = {
	name: "arrow-up-right",
	size: 24,
	node: [["path", {
		d: "M7 7h10v10",
		key: "1tivn9"
	}], ["path", {
		d: "M7 17 17 7",
		key: "1vkiza"
	}]]
};
I.node;
var L = F(I), R = {
	name: "book-open",
	size: 24,
	node: [["path", {
		d: "M12 5v16",
		key: "1f6ucr"
	}], ["path", {
		d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
		key: "1fyvmf"
	}]]
};
R.node;
var ae = F(R), oe = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
oe.node;
var se = F(oe), ce = {
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
};
ce.node;
var le = F(ce), ue = {
	name: "chevron-up",
	size: 24,
	node: [["path", {
		d: "m18 15-6-6-6 6",
		key: "153udz"
	}]]
};
ue.node;
var de = F(ue), fe = {
	name: "download",
	size: 24,
	node: [
		["path", {
			d: "M12 15V3",
			key: "m9g1x1"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}],
		["path", {
			d: "m7 10 5 5 5-5",
			key: "brsn70"
		}]
	]
};
fe.node;
var pe = F(fe), me = {
	name: "grid-2x2",
	size: 24,
	node: [
		["path", {
			d: "M12 3v18",
			key: "108xh3"
		}],
		["path", {
			d: "M3 12h18",
			key: "1i2n21"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}]
	],
	aliases: ["grid-2-x-2"]
};
me.node;
var he = F(me), ge = {
	name: "log-in",
	size: 24,
	node: [
		["path", {
			d: "m10 17 5-5-5-5",
			key: "1bsop3"
		}],
		["path", {
			d: "M15 12H3",
			key: "6jk70r"
		}],
		["path", {
			d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
			key: "u53s6r"
		}]
	]
};
ge.node;
var _e = F(ge), ve = {
	name: "map-pin",
	size: 24,
	node: [["path", {
		d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
		key: "1r0f0z"
	}], ["circle", {
		cx: "12",
		cy: "10",
		r: "3",
		key: "ilqhr7"
	}]]
};
ve.node;
var ye = F(ve), be = {
	name: "pencil",
	size: 24,
	node: [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]]
};
be.node;
var xe = F(be), Se = {
	name: "plus",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "M12 5v14",
		key: "s699le"
	}]]
};
Se.node;
var Ce = F(Se), we = {
	name: "refresh-cw",
	size: 24,
	node: [
		["path", {
			d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
			key: "v9h5vc"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
			key: "3uifl3"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}]
	]
};
we.node;
var Te = F(we), Ee = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
Ee.node;
var De = F(Ee), Oe = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
Oe.node;
var ke = F(Oe);
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function Ae(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = Ae(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function je() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Ae(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var Me = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ne = je, Pe = (e, t) => (n) => {
	if (t?.variants == null) return Ne(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = Me(t) || Me(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return Ne(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, Fe = Object.defineProperty, Ie = (e, t) => Fe(e, "name", {
	value: t,
	configurable: !0
});
function Le(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Ie(Le, "setRef");
function Re(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Le(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Le(e[t], null);
			}
		};
	};
}
Ie(Re, "composeRefs");
function ze(...e) {
	return N.useCallback(Re(...e), e);
}
Ie(ze, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
var Be = Object.defineProperty, Ve = (e, t) => Be(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function He(e) {
	let t = N.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		Xe(r) && typeof et == "function" && (r = et(r._payload)), N.Children.forEach(r, (e) => {
			if (Je(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				Xe(n) && typeof et == "function" && (n = et(n._payload)), a = Ge(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = N.cloneElement(a, void 0, s) : !o && N.Children.count(r) === 1 && N.isValidElement(r) && (a = r);
		let c = a ? qe(a) : void 0, l = ze(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? $e(e) : Qe(e));
			return r;
		}
		let u = Ke(i, a.props ?? {});
		return a.type !== N.Fragment && (u.ref = n ? l : c), N.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
Ve(He, "createSlot");
var Ue = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function We(e) {
	let t = /* @__PURE__ */ Ve((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = Ue, t;
}
Ve(We, "createSlottable");
var Ge = /* @__PURE__ */ Ve((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return N.isValidElement(t) ? N.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return N.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function Ke(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
Ve(Ke, "mergeProps");
function qe(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Ve(qe, "getElementRef");
function Je(e) {
	return N.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ue;
}
Ve(Je, "isSlottable");
var Ye = Symbol.for("react.lazy");
function Xe(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === Ye && "_payload" in e && Ze(e._payload);
}
Ve(Xe, "isLazyComponent");
function Ze(e) {
	return typeof e == "object" && !!e && "then" in e;
}
Ve(Ze, "isPromiseLike");
var Qe = /* @__PURE__ */ Ve((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), $e = /* @__PURE__ */ Ve((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), et = N.use, tt = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), nt = /* @__PURE__ */ o(((e, t) => {
	t.exports = tt();
})), rt = /* @__PURE__ */ c(m(), 1), z = nt(), it = Object.defineProperty, at = (e, t) => it(e, "name", {
	value: t,
	configurable: !0
}), B = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ He(`Primitive.${t}`), r = N.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, z.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
function ot(e, t) {
	e && rt.flushSync(() => e.dispatchEvent(t));
}
at(ot, "dispatchDiscreteCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var st = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), ct = Object.defineProperty, lt = (e, t) => ct(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function ut(e, t) {
	let n = N.createContext(t);
	n.displayName = e + "Context";
	let r = /* @__PURE__ */ lt((e) => {
		let { children: t, ...r } = e, i = N.useMemo(() => r, Object.values(r));
		return /* @__PURE__ */ (0, z.jsx)(n.Provider, {
			value: i,
			children: t
		});
	}, "Provider");
	r.displayName = e + "Provider";
	function i(r, i = {}) {
		let { optional: a = !1 } = i, o = N.useContext(n);
		if (o) return o;
		if (t !== void 0) return t;
		if (!a) throw Error(`\`${r}\` must be used within \`${e}\``);
	}
	return lt(i, "useContext"), [r, i];
}
lt(ut, "createContext");
/* @__NO_SIDE_EFFECTS__ */
function dt(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = N.createContext(r);
		i.displayName = t + "Context";
		let a = n.length;
		n = [...n, r];
		let o = /* @__PURE__ */ lt((t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = N.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, z.jsx)(s.Provider, {
				value: c,
				children: r
			});
		}, "Provider");
		o.displayName = t + "Provider";
		function s(n, o, s = {}) {
			let { optional: c = !1 } = s, l = o?.[e]?.[a] || i, u = N.useContext(l);
			if (u) return u;
			if (r !== void 0) return r;
			if (!c) throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return lt(s, "useContext"), [o, s];
	}
	lt(r, "createContext");
	let i = /* @__PURE__ */ lt(() => {
		let t = n.map((e) => N.createContext(e));
		return /* @__PURE__ */ lt(function(n) {
			let r = n?.[e] || t;
			return N.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		}, "useScope");
	}, "createScope");
	return i.scopeName = e, [r, ft(i, ...t)];
}
lt(dt, "createContextScope");
function ft(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = /* @__PURE__ */ lt(() => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return /* @__PURE__ */ lt(function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return N.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		}, "useComposedScopes");
	}, "createScope");
	return n.scopeName = t.scopeName, n;
}
lt(ft, "composeContextScopes");
//#endregion
//#region node_modules/@radix-ui/react-collection/dist/index.mjs
var pt = Object.defineProperty, mt = (e, t) => pt(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function ht(e) {
	let t = e + "CollectionProvider", [n, r] = /* @__PURE__ */ dt(t), [i, a] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), o = /* @__PURE__ */ mt((e) => {
		let { scope: t, children: n } = e, r = N.useRef(null), a = N.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, z.jsx)(i, {
			scope: t,
			itemMap: a,
			collectionRef: r,
			children: n
		});
	}, "CollectionProvider");
	o.displayName = t;
	let s = e + "CollectionSlot", c = /* @__PURE__ */ He(s), l = N.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, z.jsx)(c, {
			ref: ze(t, a(s, n).collectionRef),
			children: r
		});
	});
	l.displayName = s;
	let u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ He(u), p = N.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = N.useRef(null), s = ze(t, o), c = a(u, n);
		return N.useEffect(() => (c.itemMap.set(o, {
			ref: o,
			...i
		}), () => void c.itemMap.delete(o))), /* @__PURE__ */ (0, z.jsx)(f, {
			[d]: "",
			ref: s,
			children: r
		});
	});
	p.displayName = u;
	function m(t) {
		let n = a(e + "CollectionConsumer", t);
		return N.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${d}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return mt(m, "useCollection"), [
		{
			Provider: o,
			Slot: l,
			ItemSlot: p
		},
		m,
		r
	];
}
mt(ht, "createCollection");
var gt = /* @__PURE__ */ new WeakMap(), _t = class e extends Map {
	static {
		mt(this, "OrderedDict");
	}
	#e;
	constructor(e) {
		super(e), this.#e = [...super.keys()], gt.set(this, !0);
	}
	set(e, t) {
		return gt.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this;
	}
	insert(e, t, n) {
		let r = this.has(t), i = this.#e.length, a = bt(e), o = a >= 0 ? a : i + a, s = o < 0 || o >= i ? -1 : o;
		if (s === this.size || r && s === this.size - 1 || s === -1) return this.set(t, n), this;
		let c = this.size + +!r;
		a < 0 && o++;
		let l = [...this.#e], u, d = !1;
		for (let e = o; e < c; e++) if (o === e) {
			let i = l[e];
			l[e] === t && (i = l[e + 1]), r && this.delete(t), u = this.get(i), this.set(t, n);
		} else {
			!d && l[e - 1] === t && (d = !0);
			let n = l[d ? e : e - 1], r = u;
			u = this.get(n), this.delete(n), this.set(n, r);
		}
		return this;
	}
	with(t, n, r) {
		let i = new e(this);
		return i.insert(t, n, r), i;
	}
	before(e) {
		let t = this.#e.indexOf(e) - 1;
		if (!(t < 0)) return this.entryAt(t);
	}
	setBefore(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r, t, n);
	}
	after(e) {
		let t = this.#e.indexOf(e);
		if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1) return this.entryAt(t);
	}
	setAfter(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r + 1, t, n);
	}
	first() {
		return this.entryAt(0);
	}
	last() {
		return this.entryAt(-1);
	}
	clear() {
		return this.#e = [], super.clear();
	}
	delete(e) {
		let t = super.delete(e);
		return t && this.#e.splice(this.#e.indexOf(e), 1), t;
	}
	deleteAt(e) {
		let t = this.keyAt(e);
		return t === void 0 ? !1 : this.delete(t);
	}
	at(e) {
		let t = vt(this.#e, e);
		if (t !== void 0) return this.get(t);
	}
	entryAt(e) {
		let t = vt(this.#e, e);
		if (t !== void 0) return [t, this.get(t)];
	}
	indexOf(e) {
		return this.#e.indexOf(e);
	}
	keyAt(e) {
		return vt(this.#e, e);
	}
	from(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r);
	}
	keyFrom(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r);
	}
	find(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return r;
			n++;
		}
	}
	findIndex(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return n;
			n++;
		}
		return -1;
	}
	filter(t, n) {
		let r = [], i = 0;
		for (let e of this) Reflect.apply(t, n, [
			e,
			i,
			this
		]) && r.push(e), i++;
		return new e(r);
	}
	map(t, n) {
		let r = [], i = 0;
		for (let e of this) r.push([e[0], Reflect.apply(t, n, [
			e,
			i,
			this
		])]), i++;
		return new e(r);
	}
	reduce(...e) {
		let [t, n] = e, r = 0, i = n ?? this.at(0);
		for (let n of this) i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [
			i,
			n,
			r,
			this
		]), r++;
		return i;
	}
	reduceRight(...e) {
		let [t, n] = e, r = n ?? this.at(-1);
		for (let n = this.size - 1; n >= 0; n--) {
			let i = this.at(n);
			r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [
				r,
				i,
				n,
				this
			]);
		}
		return r;
	}
	toSorted(t) {
		return new e([...this.entries()].sort(t));
	}
	toReversed() {
		let t = new e();
		for (let e = this.size - 1; e >= 0; e--) {
			let n = this.keyAt(e), r = this.get(n);
			t.set(n, r);
		}
		return t;
	}
	toSpliced(...t) {
		let n = [...this.entries()];
		return n.splice(...t), new e(n);
	}
	slice(t, n) {
		let r = new e(), i = this.size - 1;
		if (t === void 0) return r;
		t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1);
		for (let e = t; e <= i; e++) {
			let t = this.keyAt(e), n = this.get(t);
			r.set(t, n);
		}
		return r;
	}
	every(e, t) {
		let n = 0;
		for (let r of this) {
			if (!Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !1;
			n++;
		}
		return !0;
	}
	some(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !0;
			n++;
		}
		return !1;
	}
};
function vt(e, t) {
	if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
	let n = yt(e, t);
	return n === -1 ? void 0 : e[n];
}
mt(vt, "at");
function yt(e, t) {
	let n = e.length, r = bt(t), i = r >= 0 ? r : n + r;
	return i < 0 || i >= n ? -1 : i;
}
mt(yt, "toSafeIndex");
function bt(e) {
	return e !== e || e === 0 ? 0 : Math.trunc(e);
}
mt(bt, "toSafeInteger");
/* @__NO_SIDE_EFFECTS__ */
function xt(e) {
	let t = e + "CollectionProvider", [n, r] = /* @__PURE__ */ dt(t), [i, a] = n(t, {
		collectionElement: null,
		collectionRef: { current: null },
		collectionRefObject: { current: null },
		itemMap: new _t(),
		setItemMap: /* @__PURE__ */ mt(() => void 0, "setItemMap")
	}), o = /* @__PURE__ */ mt(({ state: e, ...t }) => e ? /* @__PURE__ */ (0, z.jsx)(c, {
		...t,
		state: e
	}) : /* @__PURE__ */ (0, z.jsx)(s, { ...t }), "CollectionProvider");
	o.displayName = t;
	let s = /* @__PURE__ */ mt((e) => {
		let t = h();
		return /* @__PURE__ */ (0, z.jsx)(c, {
			...e,
			state: t
		});
	}, "CollectionInit");
	s.displayName = t + "Init";
	let c = /* @__PURE__ */ mt((e) => {
		let { scope: t, children: n, state: r } = e, a = N.useRef(null), [o, s] = N.useState(null), c = ze(a, s), [l, u] = r;
		return N.useEffect(() => {
			if (!o) return;
			let e = Tt(() => {});
			return e.observe(o, {
				childList: !0,
				subtree: !0
			}), () => {
				e.disconnect();
			};
		}, [o]), /* @__PURE__ */ (0, z.jsx)(i, {
			scope: t,
			itemMap: l,
			setItemMap: u,
			collectionRef: c,
			collectionRefObject: a,
			collectionElement: o,
			children: n
		});
	}, "CollectionProviderImpl");
	c.displayName = t + "Impl";
	let l = e + "CollectionSlot", u = /* @__PURE__ */ He(l), d = N.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, z.jsx)(u, {
			ref: ze(t, a(l, n).collectionRef),
			children: r
		});
	});
	d.displayName = l;
	let f = e + "CollectionItemSlot", p = /* @__PURE__ */ He(f), m = N.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = N.useRef(null), [s, c] = N.useState(null), l = ze(t, o, c), { setItemMap: u } = a(f, n), d = N.useRef(i);
		St(d.current, i) || (d.current = i);
		let m = d.current;
		return N.useEffect(() => {
			let e = m;
			return u((t) => s ? t.has(s) ? t.set(s, {
				...e,
				element: s
			}).toSorted(wt) : (t.set(s, {
				...e,
				element: s
			}), t.toSorted(wt)) : t), () => {
				u((e) => !s || !e.has(s) ? e : (e.delete(s), new _t(e)));
			};
		}, [
			s,
			m,
			u
		]), /* @__PURE__ */ (0, z.jsx)(p, {
			"data-radix-collection-item": "",
			ref: l,
			children: r
		});
	});
	m.displayName = f;
	function h() {
		return N.useState(new _t());
	}
	mt(h, "useInitCollection");
	function g(t) {
		let { itemMap: n } = a(e + "CollectionConsumer", t);
		return n;
	}
	return mt(g, "useCollection"), [{
		Provider: o,
		Slot: d,
		ItemSlot: m
	}, {
		createCollectionScope: r,
		useCollection: g,
		useInitCollection: h
	}];
}
mt(xt, "createCollection");
function St(e, t) {
	if (e === t) return !0;
	if (typeof e != "object" || typeof t != "object" || e == null || t == null) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
	return !0;
}
mt(St, "shallowEqual");
function Ct(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
mt(Ct, "isElementPreceding");
function wt(e, t) {
	return !e[1].element || !t[1].element ? 0 : Ct(e[1].element, t[1].element) ? -1 : 1;
}
mt(wt, "sortByDocumentPosition");
function Tt(e) {
	return new MutationObserver((t) => {
		for (let n of t) if (n.type === "childList") {
			e();
			return;
		}
	});
}
mt(Tt, "getChildListObserver");
//#endregion
//#region node_modules/@radix-ui/primitive/dist/index.mjs
var Et = Object.defineProperty, Dt = (e, t) => Et(e, "name", {
	value: t,
	configurable: !0
}), Ot = !!(typeof window < "u" && window.document && window.document.createElement);
function V(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return /* @__PURE__ */ Dt(function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	}, "handleEvent");
}
Dt(V, "composeEventHandlers");
function kt(e) {
	if (!Ot) throw Error("Cannot access window outside of the DOM");
	return e?.ownerDocument?.defaultView ?? window;
}
Dt(kt, "getOwnerWindow");
function At(e) {
	if (!Ot) throw Error("Cannot access document outside of the DOM");
	return e?.ownerDocument ?? document;
}
Dt(At, "getOwnerDocument");
function jt(e, t = !1) {
	let { activeElement: n } = At(e);
	if (!n?.nodeName) return null;
	if (Mt(n) && n.contentDocument) return jt(n.contentDocument.body, t);
	if (t) {
		let e = n.getAttribute("aria-activedescendant");
		if (e) {
			let t = At(n).getElementById(e);
			if (t) return t;
		}
	}
	return n;
}
Dt(jt, "getActiveElement");
function Mt(e) {
	return e.tagName === "IFRAME";
}
Dt(Mt, "isFrame");
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var Nt = globalThis?.document ? N.useLayoutEffect : () => {}, Pt = Object.defineProperty, Ft = (e, t) => Pt(e, "name", {
	value: t,
	configurable: !0
}), It = N.useEffectEvent, Lt = N.useInsertionEffect;
function Rt(e) {
	if (typeof It == "function") return It(e);
	let t = N.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof Lt == "function" ? Lt(() => {
		t.current = e;
	}) : Nt(() => {
		t.current = e;
	}), N.useMemo(() => ((...e) => t.current?.(...e)), []);
}
Ft(Rt, "useEffectEvent");
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var zt = Object.defineProperty, Bt = (e, t) => zt(e, "name", {
	value: t,
	configurable: !0
}), Vt = N.useInsertionEffect || Nt;
function Ht({ prop: e, defaultProp: t, onChange: n = /* @__PURE__ */ Bt(() => {}, "onChange"), caller: r }) {
	let [i, a, o] = Ut({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0;
	return [s ? e : i, N.useCallback((t) => {
		if (s) {
			let n = Wt(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
Bt(Ht, "useControllableState");
function Ut({ defaultProp: e, onChange: t }) {
	let [n, r] = N.useState(e), i = N.useRef(n), a = N.useRef(t);
	return Vt(() => {
		a.current = t;
	}, [t]), N.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
Bt(Ut, "useUncontrolledState");
function Wt(e) {
	return typeof e == "function";
}
Bt(Wt, "isFunction");
var Gt = Symbol("RADIX:SYNC_STATE");
function Kt(e, t, n, r) {
	let { prop: i, defaultProp: a, onChange: o, caller: s } = t, c = i !== void 0, l = Rt(o), u = [{
		...n,
		state: a
	}];
	r && u.push(r);
	let [d, f] = N.useReducer((t, n) => {
		if (n.type === Gt) return {
			...t,
			state: n.state
		};
		let r = e(t, n);
		return c && !Object.is(r.state, t.state) && l(r.state), r;
	}, ...u), p = d.state, m = N.useRef(p);
	N.useEffect(() => {
		m.current !== p && (m.current = p, c || l(p));
	}, [
		p,
		m,
		c
	]);
	let h = N.useMemo(() => i === void 0 ? d : {
		...d,
		state: i
	}, [d, i]);
	return N.useEffect(() => {
		c && !Object.is(i, d.state) && f({
			type: Gt,
			state: i
		});
	}, [
		i,
		d.state,
		c
	]), [h, f];
}
Bt(Kt, "useControllableStateReducer");
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
var qt = Object.defineProperty, Jt = (e, t) => qt(e, "name", {
	value: t,
	configurable: !0
});
function Yt(e, t) {
	return N.useReducer((e, n) => t[e][n] ?? e, e);
}
Jt(Yt, "useStateMachine");
var Xt = /* @__PURE__ */ Jt((e) => {
	let { present: t, children: n } = e, r = Zt(t), i = typeof n == "function" ? n({ present: r.isPresent }) : N.Children.only(n), a = $t(r.ref, tn(i));
	return typeof n == "function" || r.isPresent ? N.cloneElement(i, { ref: a }) : null;
}, "Presence");
function Zt(e) {
	let [t, n] = N.useState(), r = N.useRef(null), i = N.useRef(e), a = N.useRef("none"), o = N.useRef(void 0), [s, c] = Yt(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return N.useEffect(() => {
		s === "mounted" ? (a.current = o.current ?? en(r.current), o.current = void 0) : a.current = "none";
	}, [s]), Nt(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, s = en(t);
			e ? (o.current = s, c("MOUNT")) : s === "none" || t?.display === "none" ? c("UNMOUNT") : c(n && r !== s ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, c]), Nt(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = /* @__PURE__ */ Jt((a) => {
				let o = en(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (c("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, "handleAnimationEnd"), s = /* @__PURE__ */ Jt((e) => {
				e.target === t && (a.current = en(r.current));
			}, "handleAnimationStart");
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		} else c("ANIMATION_END");
	}, [t, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: N.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				r.current = t, o.current = en(t);
			} else r.current = null;
			n(e);
		}, [])
	};
}
Jt(Zt, "usePresence");
function Qt(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Jt(Qt, "setRef");
function $t(...e) {
	let t = N.useRef(e);
	return t.current = e, N.useCallback((e) => {
		let n = t.current, r = !1, i = n.map((t) => {
			let n = Qt(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "function" ? t() : Qt(n[e], null);
			}
		};
	}, []);
}
Jt($t, "useStableComposedRefs");
function en(e) {
	return e?.animationName || "none";
}
Jt(en, "getAnimationName");
function tn(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Jt(tn, "getElementRef");
//#endregion
//#region node_modules/@radix-ui/react-id/dist/index.mjs
var nn = Object.defineProperty, rn = (e, t) => nn(e, "name", {
	value: t,
	configurable: !0
}), an = N.useId || (() => void 0), on = 0;
function sn(e) {
	let [t, n] = N.useState(an());
	return Nt(() => {
		e || n((e) => e ?? String(on++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
rn(sn, "useId");
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var cn = Object.defineProperty, ln = (e, t) => cn(e, "name", {
	value: t,
	configurable: !0
}), un = N.createContext(void 0);
function dn(e) {
	let t = N.useContext(un);
	return e || t || "ltr";
}
ln(dn, "useDirection");
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var fn = Object.defineProperty, pn = (e, t) => fn(e, "name", {
	value: t,
	configurable: !0
});
function mn(e) {
	let t = N.useRef(e);
	return N.useEffect(() => {
		t.current = e;
	}), N.useMemo(() => ((...e) => t.current?.(...e)), []);
}
pn(mn, "useCallbackRef");
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var hn = Object.defineProperty, H = (e, t) => hn(e, "name", {
	value: t,
	configurable: !0
}), gn = "dismissableLayer.update", _n = "dismissableLayer.pointerDownOutside", vn = "dismissableLayer.focusOutside", yn, bn = N.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), xn = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ H(function(e, t) {
	let { disableOutsidePointerEvents: n = !1, deferPointerDownOutside: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = e, u = N.useContext(bn), [d, f] = N.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, m] = N.useState({}), h = ze(t, f), g = Array.from(u.layers), [_] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = _ ? g.indexOf(_) : -1, y = d ? g.indexOf(d) : -1, b = u.layersWithOutsidePointerEventsDisabled.size > 0, x = y >= v, S = N.useRef(!1), C = wn((e) => {
		a?.(e), s?.(e), e.defaultPrevented || c?.();
	}, {
		ownerDocument: p,
		deferPointerDownOutside: r,
		isDeferredPointerDownOutsideRef: S,
		dismissableSurfaces: u.dismissableSurfaces,
		shouldHandlePointerDownOutside: N.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...u.branches].some((t) => t.contains(e));
			return x && !t;
		}, [u.branches, x])
	}), w = Tn((e) => {
		if (r && S.current) return;
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p), T = d ? y === g.length - 1 : !1, E = mn((e) => {
		e.key === "Escape" && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	});
	return N.useEffect(() => {
		if (T) return p.addEventListener("keydown", E, { capture: !0 }), () => p.removeEventListener("keydown", E, { capture: !0 });
	}, [
		p,
		T,
		E
	]), N.useEffect(() => {
		if (d) return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (yn = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), En(), () => {
			n && (u.layersWithOutsidePointerEventsDisabled.delete(d), u.layersWithOutsidePointerEventsDisabled.size === 0 && (p.body.style.pointerEvents = yn));
		};
	}, [
		d,
		p,
		n,
		u
	]), N.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), En());
	}, [d, u]), N.useEffect(() => {
		let e = /* @__PURE__ */ H(() => m({}), "handleUpdate");
		return document.addEventListener(gn, e), () => document.removeEventListener(gn, e);
	}, []), /* @__PURE__ */ (0, z.jsx)(B.div, {
		...l,
		ref: h,
		style: {
			pointerEvents: b ? x ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: V(e.onFocusCapture, w.onFocusCapture),
		onBlurCapture: V(e.onBlurCapture, w.onBlurCapture),
		onPointerDownCapture: V(e.onPointerDownCapture, C.onPointerDownCapture)
	});
}, "DismissableLayer"));
function Sn() {
	let e = N.useContext(bn), [t, n] = N.useState(null);
	return N.useEffect(() => {
		if (t) return e.dismissableSurfaces.add(t), () => {
			e.dismissableSurfaces.delete(t);
		};
	}, [t, e.dismissableSurfaces]), n;
}
H(Sn, "useDismissableLayerSurface");
var Cn = /* @__PURE__ */ H(() => !0, "IS_TRUE");
function wn(e, t) {
	let { ownerDocument: n = globalThis?.document, deferPointerDownOutside: r = !1, isDeferredPointerDownOutsideRef: i, dismissableSurfaces: a, shouldHandlePointerDownOutside: o = Cn } = t, s = mn(e), c = N.useRef(!1), l = N.useRef(!1), u = N.useRef(/* @__PURE__ */ new Map()), d = N.useRef(() => {});
	return N.useEffect(() => {
		function e() {
			l.current = !1, i.current = !1, u.current.clear();
		}
		H(e, "resetOutsideInteraction");
		function t() {
			return Array.from(u.current.values()).some(Boolean);
		}
		H(t, "isOutsideInteractionIntercepted");
		function f(e) {
			if (!l.current) return;
			let t = e.target;
			t instanceof Node && [...a].some((e) => e.contains(t)) || u.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				l.current && d.current();
			}, 0);
		}
		H(f, "handleInteractionCapture");
		function p(e) {
			l.current && u.current.set(e.type, !1);
		}
		H(p, "handleInteractionBubble");
		let m = /* @__PURE__ */ H((a) => {
			if (a.target && !c.current) {
				let f = function() {
					n.removeEventListener("click", d.current);
					let r = t();
					e(), r || Dn(_n, s, p, { discrete: !0 });
				};
				if (H(f, "handleAndDispatchPointerDownOutsideEvent"), !o(a.target)) {
					n.removeEventListener("click", d.current), e(), c.current = !1;
					return;
				}
				let p = { originalEvent: a };
				l.current = !0, i.current = r && a.button === 0, u.current.clear(), !r || a.button !== 0 ? f() : (n.removeEventListener("click", d.current), d.current = f, n.addEventListener("click", d.current, { once: !0 }));
			} else n.removeEventListener("click", d.current), e();
			c.current = !1;
		}, "handlePointerDown"), h = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (let e of h) n.addEventListener(e, f, !0), n.addEventListener(e, p);
		let g = window.setTimeout(() => {
			n.addEventListener("pointerdown", m);
		}, 0);
		return () => {
			window.clearTimeout(g), n.removeEventListener("pointerdown", m), n.removeEventListener("click", d.current);
			for (let e of h) n.removeEventListener(e, f, !0), n.removeEventListener(e, p);
		};
	}, [
		n,
		s,
		r,
		i,
		a,
		o
	]), { onPointerDownCapture: /* @__PURE__ */ H(() => c.current = !0, "onPointerDownCapture") };
}
H(wn, "usePointerDownOutside");
function Tn(e, t = globalThis?.document) {
	let n = mn(e), r = N.useRef(!1);
	return N.useEffect(() => {
		let e = /* @__PURE__ */ H((e) => {
			e.target && !r.current && Dn(vn, n, { originalEvent: e }, { discrete: !1 });
		}, "handleFocus");
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: /* @__PURE__ */ H(() => r.current = !0, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ H(() => r.current = !1, "onBlurCapture")
	};
}
H(Tn, "useFocusOutside");
function En() {
	let e = new CustomEvent(gn);
	document.dispatchEvent(e);
}
H(En, "dispatchUpdate");
function Dn(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? ot(i, a) : i.dispatchEvent(a);
}
H(Dn, "handleAndDispatchCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var On = Object.defineProperty, kn = (e, t) => On(e, "name", {
	value: t,
	configurable: !0
}), An = "focusScope.autoFocusOnMount", jn = "focusScope.autoFocusOnUnmount", Mn = {
	bubbles: !1,
	cancelable: !0
}, Nn = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ kn(function(e, t) {
	let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e, [s, c] = N.useState(null), l = mn(i), u = mn(a), d = N.useRef(null), f = ze(t, c), p = N.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	N.useEffect(() => {
		if (r) {
			let e = function(e) {
				if (p.paused || !s) return;
				let t = e.target;
				s.contains(t) ? d.current = t : Bn(d.current, { select: !0 });
			}, t = function(e) {
				if (p.paused || !s) return;
				let t = e.relatedTarget;
				t !== null && (s.contains(t) || Bn(d.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && Bn(s);
			};
			kn(e, "handleFocusIn"), kn(t, "handleFocusOut"), kn(n, "handleMutations"), document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return s && r.observe(s, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		r,
		s,
		p.paused
	]), N.useEffect(() => {
		if (s) {
			Vn.add(p);
			let e = document.activeElement;
			if (!s.contains(e)) {
				let t = new CustomEvent(An, Mn);
				s.addEventListener(An, l), s.dispatchEvent(t), t.defaultPrevented || (Pn(Wn(In(s)), { select: !0 }), document.activeElement === e && Bn(s));
			}
			return () => {
				s.removeEventListener(An, l), setTimeout(() => {
					let t = new CustomEvent(jn, Mn);
					s.addEventListener(jn, u), s.dispatchEvent(t), t.defaultPrevented || Bn(e ?? document.body, { select: !0 }), s.removeEventListener(jn, u), Vn.remove(p);
				}, 0);
			};
		}
	}, [
		s,
		l,
		u,
		p
	]);
	let m = N.useCallback((e) => {
		if (!n && !r || p.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, i = document.activeElement;
		if (t && i) {
			let t = e.currentTarget, [r, a] = Fn(t);
			r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && Bn(r, { select: !0 })) : e.shiftKey && i === r && (e.preventDefault(), n && Bn(a, { select: !0 })) : i === t && e.preventDefault();
		}
	}, [
		n,
		r,
		p.paused
	]);
	return /* @__PURE__ */ (0, z.jsx)(B.div, {
		tabIndex: -1,
		...o,
		ref: f,
		onKeyDown: m
	});
}, "FocusScope"));
function Pn(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (Bn(r, { select: t }), document.activeElement !== n) return;
}
kn(Pn, "focusFirst");
function Fn(e) {
	let t = In(e);
	return [Ln(t, e), Ln(t.reverse(), e)];
}
kn(Fn, "getTabbableEdges");
function In(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ kn((e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
kn(In, "getTabbableCandidates");
function Ln(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Rn(r, { upTo: t }))) return r;
}
kn(Ln, "findVisible");
function Rn(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
kn(Rn, "isHidden");
function zn(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
kn(zn, "isSelectableInput");
function Bn(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && zn(e) && t && e.select();
	}
}
kn(Bn, "focus");
var Vn = Hn();
function Hn() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = Un(e, t), e.unshift(t);
		},
		remove(t) {
			e = Un(e, t), e[0]?.resume();
		}
	};
}
kn(Hn, "createFocusScopesStack");
function Un(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
kn(Un, "arrayRemove");
function Wn(e) {
	return e.filter((e) => e.tagName !== "A");
}
kn(Wn, "removeLinks");
//#endregion
//#region node_modules/@radix-ui/react-portal/dist/index.mjs
var Gn = Object.defineProperty, Kn = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ ((e, t) => Gn(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	let { container: n, ...r } = e, [i, a] = N.useState(!1);
	Nt(() => a(!0), []);
	let o = n || i && globalThis?.document?.body;
	return o ? rt.createPortal(/* @__PURE__ */ (0, z.jsx)(B.div, {
		...r,
		ref: t
	}), o) : null;
}, "Portal")), qn = Object.defineProperty, Jn = (e, t) => qn(e, "name", {
	value: t,
	configurable: !0
}), Yn = 0, Xn = null;
function Zn(e) {
	return Qn(), e.children;
}
Jn(Zn, "FocusGuards");
function Qn() {
	N.useEffect(() => {
		Xn ||= {
			start: $n(),
			end: $n()
		};
		let { start: e, end: t } = Xn;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Yn++, () => {
			Yn === 1 && (Xn?.start.remove(), Xn?.end.remove(), Xn = null), Yn = Math.max(0, Yn - 1);
		};
	}, []);
}
Jn(Qn, "useFocusGuards");
function $n() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
Jn($n, "createFocusGuard");
//#endregion
//#region node_modules/tslib/tslib.es6.mjs
var er = function() {
	return er = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, er.apply(this, arguments);
};
function tr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function nr(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var rr = "right-scroll-bar-position", ir = "width-before-scroll-bar", ar = "with-scroll-bars-hidden", or = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function sr(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function cr(e, t) {
	var n = (0, N.useState)(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var lr = typeof window < "u" ? N.useLayoutEffect : N.useEffect, ur = /* @__PURE__ */ new WeakMap();
function dr(e, t) {
	var n = cr(t || null, function(t) {
		return e.forEach(function(e) {
			return sr(e, t);
		});
	});
	return lr(function() {
		var t = ur.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || sr(e, null);
			}), i.forEach(function(e) {
				r.has(e) || sr(e, a);
			});
		}
		ur.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function fr(e) {
	return e;
}
function pr(e, t) {
	t === void 0 && (t = fr);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function mr(e) {
	e === void 0 && (e = {});
	var t = pr(null);
	return t.options = er({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var hr = function(e) {
	var t = e.sideCar, n = tr(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return N.createElement(r, er({}, n));
};
hr.isSideCarExport = !0;
function gr(e, t) {
	return e.useMedium(t), hr;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var _r = mr(), vr = function() {}, yr = N.forwardRef(function(e, t) {
	var n = N.useRef(null), r = N.useState({
		onScrollCapture: vr,
		onWheelCapture: vr,
		onTouchMoveCapture: vr
	}), i = r[0], a = r[1], o = e.forwardProps, s = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, m = e.noIsolation, h = e.inert, g = e.allowPinchZoom, _ = e.as, v = _ === void 0 ? "div" : _, y = e.gapMode, b = tr(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), x = f, S = dr([n, t]), C = er(er({}, b), i);
	return N.createElement(N.Fragment, null, u && N.createElement(x, {
		sideCar: _r,
		removeScrollBar: l,
		shards: d,
		noRelative: p,
		noIsolation: m,
		inert: h,
		setCallbacks: a,
		allowPinchZoom: !!g,
		lockRef: n,
		gapMode: y
	}), o ? N.cloneElement(N.Children.only(s), er(er({}, C), { ref: S })) : N.createElement(v, er({}, C, {
		className: c,
		ref: S
	}), s));
});
yr.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, yr.classNames = {
	fullWidth: ir,
	zeroRight: rr
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var br, xr = function() {
	if (br) return br;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function Sr() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = xr();
	return t && e.setAttribute("nonce", t), e;
}
function Cr(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function wr(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Tr = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Sr()) && (Cr(t, n), wr(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Er = function() {
	var e = Tr();
	return function(t, n) {
		N.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, Dr = function() {
	var e = Er();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Or = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, kr = function(e) {
	return parseInt(e || "", 10) || 0;
}, Ar = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		kr(n),
		kr(r),
		kr(i)
	];
}, jr = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Or;
	var t = Ar(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Mr = Dr(), Nr = "data-scroll-locked", Pr = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${ar} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Nr}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${rr} {
    right: ${s}px ${r};
  }
  
  .${ir} {
    margin-right: ${s}px ${r};
  }
  
  .${rr} .${rr} {
    right: 0 ${r};
  }
  
  .${ir} .${ir} {
    margin-right: 0 ${r};
  }
  
  body[${Nr}] {
    ${or}: ${s}px;
  }
`;
}, Fr = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Ir = function() {
	N.useEffect(function() {
		return document.body.setAttribute(Nr, (Fr() + 1).toString()), function() {
			var e = Fr() - 1;
			e <= 0 ? document.body.removeAttribute(Nr) : document.body.setAttribute(Nr, e.toString());
		};
	}, []);
}, Lr = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	Ir();
	var a = N.useMemo(function() {
		return jr(i);
	}, [i]);
	return N.createElement(Mr, { styles: Pr(a, !t, i, n ? "" : "!important") });
}, Rr = !1;
if (typeof window < "u") try {
	var zr = Object.defineProperty({}, "passive", { get: function() {
		return Rr = !0, !0;
	} });
	window.addEventListener("test", zr, zr), window.removeEventListener("test", zr, zr);
} catch {
	Rr = !1;
}
var Br = Rr ? { passive: !1 } : !1, Vr = function(e) {
	return e.tagName === "TEXTAREA";
}, Hr = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Vr(e) && n[t] === "visible");
}, Ur = function(e) {
	return Hr(e, "overflowY");
}, Wr = function(e) {
	return Hr(e, "overflowX");
}, Gr = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), Jr(e, r)) {
			var i = Yr(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, Kr = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, qr = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, Jr = function(e, t) {
	return e === "v" ? Ur(t) : Wr(t);
}, Yr = function(e, t) {
	return e === "v" ? Kr(t) : qr(t);
}, Xr = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Zr = function(e, t, n, r, i) {
	var a = Xr(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Yr(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && Jr(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Qr = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, $r = function(e) {
	return [e.deltaX, e.deltaY];
}, ei = function(e) {
	return e && "current" in e ? e.current : e;
}, ti = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, ni = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, ri = 0, ii = [];
function ai(e) {
	var t = N.useRef([]), n = N.useRef([0, 0]), r = N.useRef(), i = N.useState(ri++)[0], a = N.useState(Dr)[0], o = N.useRef(e);
	N.useEffect(function() {
		o.current = e;
	}, [e]), N.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = nr([e.lockRef.current], (e.shards || []).map(ei), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var s = N.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !o.current.allowPinchZoom;
		var i = Qr(e), a = n.current, s = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(s) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = Gr(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = Gr(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (s || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return Zr(h, t, e, h === "h" ? s : c, !0);
	}, []), c = N.useCallback(function(e) {
		var n = e;
		if (!(!ii.length || ii[ii.length - 1] !== a)) {
			var r = "deltaY" in n ? $r(n) : Qr(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && ti(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var c = (o.current.shards || []).map(ei).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), l = N.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: oi(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), u = N.useCallback(function(e) {
		n.current = Qr(e), r.current = void 0;
	}, []), d = N.useCallback(function(t) {
		l(t.type, $r(t), t.target, s(t, e.lockRef.current));
	}, []), f = N.useCallback(function(t) {
		l(t.type, Qr(t), t.target, s(t, e.lockRef.current));
	}, []);
	N.useEffect(function() {
		return ii.push(a), e.setCallbacks({
			onScrollCapture: d,
			onWheelCapture: d,
			onTouchMoveCapture: f
		}), document.addEventListener("wheel", c, Br), document.addEventListener("touchmove", c, Br), document.addEventListener("touchstart", u, Br), function() {
			ii = ii.filter(function(e) {
				return e !== a;
			}), document.removeEventListener("wheel", c, Br), document.removeEventListener("touchmove", c, Br), document.removeEventListener("touchstart", u, Br);
		};
	}, []);
	var p = e.removeScrollBar, m = e.inert;
	return N.createElement(N.Fragment, null, m ? N.createElement(a, { styles: ni(i) }) : null, p ? N.createElement(Lr, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function oi(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var si = gr(_r, ai), ci = N.forwardRef(function(e, t) {
	return N.createElement(yr, er({}, e, {
		ref: t,
		sideCar: si
	}));
});
ci.classNames = yr.classNames;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var li = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, ui = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), fi = {}, pi = 0, mi = function(e) {
	return e && (e.host || mi(e.parentNode));
}, hi = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = mi(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, gi = function(e, t, n, r) {
	var i = hi(t, Array.isArray(e) ? e : [e]);
	fi[n] || (fi[n] = /* @__PURE__ */ new WeakMap());
	var a = fi[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (ui.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				ui.set(e, c), a.set(e, l), o.push(e), c === 1 && i && di.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), pi++, function() {
		o.forEach(function(e) {
			var t = ui.get(e) - 1, i = a.get(e) - 1;
			ui.set(e, t), a.set(e, i), t || (di.has(e) || e.removeAttribute(r), di.delete(e)), i || e.removeAttribute(n);
		}), pi--, pi || (ui = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), fi = {});
	};
}, _i = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || li(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), gi(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, vi = Object.defineProperty, yi = (e, t) => vi(e, "name", {
	value: t,
	configurable: !0
}), bi = "Dialog", [xi, Si] = /* @__PURE__ */ dt(bi), [Ci, wi] = xi(bi), Ti = /* @__PURE__ */ yi((e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !0 } = e, s = N.useRef(null), c = N.useRef(null), [l, u] = Ht({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: bi
	}), [d, f] = N.useState(0), [p, m] = N.useState(0);
	return /* @__PURE__ */ (0, z.jsx)(Ci, {
		scope: t,
		triggerRef: s,
		contentRef: c,
		contentId: sn(),
		titleId: sn(),
		descriptionId: sn(),
		titlePresent: d > 0,
		descriptionPresent: p > 0,
		setTitleCount: f,
		setDescriptionCount: m,
		open: l,
		onOpenChange: u,
		onOpenToggle: N.useCallback(() => u((e) => !e), [u]),
		modal: o,
		children: n
	});
}, "Dialog"), Ei = "DialogPortal", [Di, Oi] = xi(Ei, { forceMount: void 0 }), ki = /* @__PURE__ */ yi((e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, a = wi(Ei, t);
	return /* @__PURE__ */ (0, z.jsx)(Di, {
		scope: t,
		forceMount: n,
		children: N.Children.map(r, (e) => /* @__PURE__ */ (0, z.jsx)(Xt, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, z.jsx)(Kn, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
}, "DialogPortal"), Ai = "DialogOverlay", U = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let n = Oi(Ai, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = wi(Ai, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ (0, z.jsx)(Xt, {
		present: r || a.open,
		children: /* @__PURE__ */ (0, z.jsx)(Mi, {
			...i,
			ref: t
		})
	}) : null;
}, "DialogOverlay")), ji = /* @__PURE__ */ He("DialogOverlay.RemoveScroll"), Mi = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = wi(Ai, n), a = ze(t, Sn());
	return /* @__PURE__ */ (0, z.jsx)(ci, {
		as: ji,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ (0, z.jsx)(B.div, {
			"data-state": Wi(i.open),
			...r,
			ref: a,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}, "DialogOverlayImpl")), Ni = "DialogContent", Pi = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let n = Oi(Ni, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = wi(Ni, e.__scopeDialog);
	return /* @__PURE__ */ (0, z.jsx)(Xt, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ (0, z.jsx)(Fi, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, z.jsx)(Ii, {
			...i,
			ref: t
		})
	});
}, "DialogContent")), Fi = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let n = wi(Ni, e.__scopeDialog), r = N.useRef(null), i = ze(t, n.contentRef, r);
	return N.useEffect(() => {
		let e = r.current;
		if (e) return _i(e);
	}, []), /* @__PURE__ */ (0, z.jsx)(Li, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		onCloseAutoFocus: V(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), n.triggerRef.current?.focus();
		}),
		onPointerDownOutside: V(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: V(e.onFocusOutside, (e) => e.preventDefault())
	});
}, "DialogContentModal")), Ii = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let n = wi(Ni, e.__scopeDialog), r = N.useRef(!1), i = N.useRef(!1);
	return /* @__PURE__ */ (0, z.jsx)(Li, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}, "DialogContentNonModal")), Li = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e, s = wi(Ni, n);
	return Qn(), /* @__PURE__ */ (0, z.jsx)(z.Fragment, { children: /* @__PURE__ */ (0, z.jsx)(Nn, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ (0, z.jsx)(xn, {
			role: "dialog",
			id: s.contentId,
			"aria-describedby": s.descriptionPresent ? s.descriptionId : void 0,
			"aria-labelledby": s.titlePresent ? s.titleId : void 0,
			"data-state": Wi(s.open),
			...o,
			ref: t,
			deferPointerDownOutside: !0,
			onDismiss: () => s.onOpenChange(!1)
		})
	}) });
}, "DialogContentImpl")), Ri = "DialogTitle", zi = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = wi(Ri, n), { setTitleCount: a } = i;
	return Nt(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, z.jsx)(B.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
}, "DialogTitle")), Bi = "DialogDescription", Vi = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = wi(Bi, n), { setDescriptionCount: a } = i;
	return Nt(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, z.jsx)(B.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
}, "DialogDescription")), Hi = "DialogClose", Ui = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ yi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = wi(Hi, n);
	return /* @__PURE__ */ (0, z.jsx)(B.button, {
		type: "button",
		...r,
		ref: t,
		onClick: V(e.onClick, () => i.onOpenChange(!1))
	});
}, "DialogClose"));
function Wi(e) {
	return e ? "open" : "closed";
}
yi(Wi, "getState");
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
var Gi = Object.defineProperty, Ki = (e, t) => Gi(e, "name", {
	value: t,
	configurable: !0
});
function qi(e) {
	let [t, n] = N.useState(void 0);
	return Nt(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		} else n(void 0);
	}, [e]), t;
}
Ki(qi, "useSize");
//#endregion
//#region node_modules/@radix-ui/react-checkbox/dist/index.mjs
var Ji = Object.defineProperty, Yi = (e, t) => Ji(e, "name", {
	value: t,
	configurable: !0
}), Xi = "Checkbox", [Zi, Qi] = /* @__PURE__ */ dt(Xi), [$i, ea] = Zi(Xi);
function ta(e) {
	let { __scopeCheckbox: t, checked: n, children: r, defaultChecked: i, disabled: a, form: o, name: s, onCheckedChange: c, required: l, value: u = "on", internal_do_not_use_render: d } = e, [f, p] = Ht({
		prop: n,
		defaultProp: i ?? !1,
		onChange: c,
		caller: Xi
	}), [m, h] = N.useState(null), [g, _] = N.useState(null), v = N.useRef(!1), [y, b] = N.useReducer((e) => e + 1, 0), x = m ? !!o || !!m.closest("form") : !0, S = {
		checked: f,
		disabled: a,
		setChecked: p,
		control: m,
		setControl: h,
		name: s,
		form: o,
		value: u,
		hasConsumerStoppedPropagationRef: v,
		userInteractionCount: y,
		onUserInteraction: b,
		required: l,
		defaultChecked: ua(i) ? !1 : i,
		isFormControl: x,
		bubbleInput: g,
		setBubbleInput: _
	};
	return /* @__PURE__ */ (0, z.jsx)($i, {
		scope: t,
		...S,
		children: la(d) ? d(S) : r
	});
}
Yi(ta, "CheckboxProvider");
var na = "CheckboxTrigger", ra = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Yi(function({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, i) {
	let { control: a, value: o, disabled: s, checked: c, required: l, setControl: u, setChecked: d, hasConsumerStoppedPropagationRef: f, onUserInteraction: p, isFormControl: m, bubbleInput: h } = ea(na, e), g = ze(i, u), _ = N.useRef(c);
	return N.useEffect(() => {
		let e = a?.form;
		if (e) {
			let t = /* @__PURE__ */ Yi(() => d(_.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [a, d]), /* @__PURE__ */ (0, z.jsx)(B.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": ua(c) ? "mixed" : c,
		"aria-required": l,
		"data-state": da(c),
		"data-disabled": s ? "" : void 0,
		disabled: s,
		value: o,
		...r,
		ref: g,
		onKeyDown: V(t, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: V(n, (e) => {
			p(), d((e) => ua(e) ? !0 : !e), h && m && (f.current = e.isPropagationStopped(), f.current || e.stopPropagation());
		})
	});
}, "CheckboxTrigger")), ia = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Yi(function(e, t) {
	let { __scopeCheckbox: n, name: r, checked: i, defaultChecked: a, required: o, disabled: s, value: c, onCheckedChange: l, form: u, ...d } = e;
	return /* @__PURE__ */ (0, z.jsx)(ta, {
		__scopeCheckbox: n,
		checked: i,
		defaultChecked: a,
		disabled: s,
		required: o,
		onCheckedChange: l,
		name: r,
		form: u,
		value: c,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(ra, {
			...d,
			ref: t,
			__scopeCheckbox: n
		}), e && /* @__PURE__ */ (0, z.jsx)(ca, { __scopeCheckbox: n })] })
	});
}, "Checkbox")), aa = "CheckboxIndicator", oa = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Yi(function(e, t) {
	let { __scopeCheckbox: n, forceMount: r, ...i } = e, a = ea(aa, n);
	return /* @__PURE__ */ (0, z.jsx)(Xt, {
		present: r || ua(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ (0, z.jsx)(B.span, {
			"data-state": da(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t,
			style: {
				pointerEvents: "none",
				...e.style
			}
		})
	});
}, "CheckboxIndicator")), sa = "CheckboxBubbleInput", ca = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Yi(function({ __scopeCheckbox: e, onClick: t, ...n }, r) {
	let { control: i, hasConsumerStoppedPropagationRef: a, userInteractionCount: o, checked: s, defaultChecked: c, required: l, disabled: u, name: d, value: f, form: p, bubbleInput: m, setBubbleInput: h } = ea(sa, e), g = ze(r, h), _ = qi(i), v = N.useRef(!1), y = N.useRef(s), b = N.useRef(o);
	N.useEffect(() => {
		let e = m;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = o !== b.current;
		b.current = o;
		let i = y.current !== s;
		y.current = s;
		let c = !(r && a.current);
		if (i && n) {
			v.current = !r;
			let t = new Event("click", { bubbles: c });
			e.indeterminate = ua(s), n.call(e, ua(s) ? !1 : s), e.dispatchEvent(t), v.current = !1;
		}
	}, [
		m,
		s,
		a,
		o
	]);
	let x = N.useRef(ua(s) ? !1 : s);
	return /* @__PURE__ */ (0, z.jsx)(B.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: c ?? x.current,
		required: l,
		disabled: u,
		name: d,
		value: f,
		form: p,
		...n,
		tabIndex: -1,
		ref: g,
		onClick: V(t, (e) => {
			v.current && e.stopPropagation();
		}),
		style: {
			...n.style,
			..._,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
}, "CheckboxBubbleInput"));
function la(e) {
	return typeof e == "function";
}
Yi(la, "isFunction");
function ua(e) {
	return e === "indeterminate";
}
Yi(ua, "isIndeterminate");
function da(e) {
	return ua(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
Yi(da, "getState");
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var fa = [
	"top",
	"right",
	"bottom",
	"left"
], pa = Math.min, ma = Math.max, ha = Math.round, ga = Math.floor, _a = (e) => ({
	x: e,
	y: e
}), va = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function ya(e, t, n) {
	return ma(e, pa(t, n));
}
function ba(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function xa(e) {
	return e.split("-")[0];
}
function Sa(e) {
	return e.split("-")[1];
}
function Ca(e) {
	return e === "x" ? "y" : "x";
}
function wa(e) {
	return e === "y" ? "height" : "width";
}
function Ta(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Ea(e) {
	return Ca(Ta(e));
}
function Da(e, t, n) {
	n === void 0 && (n = !1);
	let r = Sa(e), i = Ea(e), a = wa(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Ia(o)), [o, Ia(o)];
}
function Oa(e) {
	let t = Ia(e);
	return [
		ka(e),
		t,
		ka(t)
	];
}
function ka(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Aa = ["left", "right"], ja = ["right", "left"], Ma = ["top", "bottom"], Na = ["bottom", "top"];
function Pa(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? ja : Aa : t ? Aa : ja;
		case "left":
		case "right": return t ? Ma : Na;
		default: return [];
	}
}
function Fa(e, t, n, r) {
	let i = Sa(e), a = Pa(xa(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(ka)))), a;
}
function Ia(e) {
	let t = xa(e);
	return va[t] + e.slice(t.length);
}
function La(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Ra(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : La(e);
}
function za(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Ba(e, t, n) {
	let { reference: r, floating: i } = e, a = Ta(t), o = Ea(t), s = wa(o), c = xa(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Sa(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Va(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = ba(t, e), p = Ra(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = za(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = za(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Ha = 50, Ua = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Va
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Ba(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Ha && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Ba(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Wa = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = ba(e, t) || {};
		if (l == null) return {};
		let d = Ra(u), f = {
			x: n,
			y: r
		}, p = Ea(i), m = wa(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = pa(d[_], T), ee = pa(d[v], T), D = C - h[m] - ee, O = C / 2 - h[m] / 2 + w, te = ya(E, O, D), k = !c.arrow && Sa(i) != null && O !== te && a.reference[m] / 2 - (O < E ? E : ee) - h[m] / 2 < 0, A = k ? O < E ? O - E : O - D : 0;
		return {
			[p]: f[p] + A,
			data: {
				[p]: te,
				centerOffset: O - te - A,
				...k && { alignmentOffset: A }
			},
			reset: k
		};
	}
}), Ga = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = ba(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = xa(r), _ = Ta(o), v = xa(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Ia(o)] : Oa(o)), x = p !== "none";
			!d && x && b.push(...Fa(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Da(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== Ta(t)) || T.every((e) => Ta(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = Ta(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Ka(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function qa(e) {
	return fa.some((t) => e[t] >= 0);
}
var Ja = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = ba(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Ka(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: qa(e)
					} };
				}
				case "escaped": {
					let e = Ka(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: qa(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Ya = /* @__PURE__ */ new Set(["left", "top"]);
async function Xa(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = xa(n), s = Sa(n), c = Ta(n) === "y", l = Ya.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = ba(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Za = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Xa(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Qa = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = ba(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Ta(i), p = Ca(f), m = u[p], h = u[f], g = (e, t) => ya(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, $a = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = ba(e, t), u = {
				x: n,
				y: r
			}, d = Ta(i), f = Ca(d), p = u[f], m = u[d], h = ba(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Ya.has(xa(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, eo = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = ba(e, t), c = await i.detectOverflow(t, s), l = xa(n), u = Sa(n), d = Ta(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = pa(p - c[m], g), y = pa(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * ma(c.left, c.right) : S = p - 2 * ma(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function to() {
	return typeof window < "u";
}
function no(e) {
	return ao(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ro(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function io(e) {
	return ((ao(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ao(e) {
	return to() ? e instanceof Node || e instanceof ro(e).Node : !1;
}
function W(e) {
	return to() ? e instanceof Element || e instanceof ro(e).Element : !1;
}
function oo(e) {
	return to() ? e instanceof HTMLElement || e instanceof ro(e).HTMLElement : !1;
}
function so(e) {
	return !to() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ro(e).ShadowRoot;
}
function G(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = yo(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function co(e) {
	return /^(table|td|th)$/.test(no(e));
}
function lo(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var uo = /transform|translate|scale|rotate|perspective|filter/, fo = /paint|layout|strict|content/, po = (e) => !!e && e !== "none", mo;
function ho(e) {
	let t = W(e) ? yo(e) : e;
	return po(t.transform) || po(t.translate) || po(t.scale) || po(t.rotate) || po(t.perspective) || !_o() && (po(t.backdropFilter) || po(t.filter)) || uo.test(t.willChange || "") || fo.test(t.contain || "");
}
function go(e) {
	let t = xo(e);
	for (; oo(t) && !vo(t);) {
		if (ho(t)) return t;
		if (lo(t)) return null;
		t = xo(t);
	}
	return null;
}
function _o() {
	return mo ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), mo;
}
function vo(e) {
	return /^(html|body|#document)$/.test(no(e));
}
function yo(e) {
	return ro(e).getComputedStyle(e);
}
function bo(e) {
	return W(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function xo(e) {
	if (no(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || so(e) && e.host || io(e);
	return so(t) ? t.host : t;
}
function So(e) {
	let t = xo(e);
	return vo(t) ? (e.ownerDocument || e).body : oo(t) && G(t) ? t : So(t);
}
function Co(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = So(e), i = r === e.ownerDocument?.body, a = ro(r);
	if (i) {
		let e = wo(a);
		return t.concat(a, a.visualViewport || [], G(r) ? r : [], e && n ? Co(e) : []);
	} else return t.concat(r, Co(r, [], n));
}
function wo(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function To(e) {
	let t = yo(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = oo(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = ha(n) !== a || ha(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Eo(e) {
	return W(e) ? e : e.contextElement;
}
function Do(e) {
	let t = Eo(e);
	if (!oo(t)) return _a(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = To(t), o = (a ? ha(n.width) : n.width) / r, s = (a ? ha(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Oo = /* @__PURE__ */ _a(0);
function ko(e) {
	let t = ro(e);
	return !_o() || !t.visualViewport ? Oo : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Ao(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === ro(e);
}
function jo(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Eo(e), o = _a(1);
	t && (r ? W(r) && (o = Do(r)) : o = Do(e));
	let s = Ao(a, n, r) ? ko(a) : _a(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = ro(a), t = W(r) ? ro(r) : r, n = e, i = wo(n);
		for (; i && t !== n;) {
			let e = Do(i), t = i.getBoundingClientRect(), r = yo(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = ro(i), i = wo(n);
		}
	}
	return za({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Mo(e, t) {
	let n = bo(e).scrollLeft;
	return t ? t.left + n : jo(io(e)).left + n;
}
function No(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Mo(e, n),
		y: n.top + t.scrollTop
	};
}
function Po(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = io(r), s = t ? lo(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = _a(1), u = _a(0), d = oo(r);
	if ((d || !a) && ((no(r) !== "body" || G(o)) && (c = bo(r)), d)) {
		let e = jo(r);
		l = Do(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? No(o, c) : _a(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Fo(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Io(e) {
	let t = bo(e), n = e.ownerDocument.body, r = ma(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = ma(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Mo(e), o = -t.scrollTop;
	return yo(n).direction === "rtl" && (a += ma(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Lo = 25;
function Ro(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = ro(e), a = io(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !_o() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Mo(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Lo && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function zo(e, t) {
	let n = jo(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Do(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Bo(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Ro(e, n, t);
	else if (t === "document") r = Io(io(e));
	else if (W(t)) r = zo(t, n);
	else {
		let n = ko(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return za(r);
}
function Vo(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Co(e, [], !1).filter((e) => W(e) && no(e) !== "body"), i = null, a = yo(e).position === "fixed", o = a ? xo(e) : e;
	for (; W(o) && !vo(o);) {
		let e = yo(o), t = ho(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = xo(o);
	}
	return t.set(e, r), r;
}
function Ho(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? lo(t) ? [] : Vo(t, this._c) : [].concat(n), r], o = Bo(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Bo(t, a[e], i);
		s = ma(n.top, s), c = pa(n.right, c), l = pa(n.bottom, l), u = ma(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Uo(e) {
	let { width: t, height: n } = To(e);
	return {
		width: t,
		height: n
	};
}
function Wo(e, t, n) {
	let r = oo(t), i = io(t), a = n === "fixed", o = jo(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = _a(0);
	if ((r || !a) && ((no(t) !== "body" || G(i)) && (s = bo(t)), r)) {
		let e = jo(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Mo(i));
	let l = i && !r && !a ? No(i, s) : _a(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Go(e) {
	return yo(e).position === "static";
}
function Ko(e, t) {
	if (!oo(e) || yo(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return io(e) === n && (n = n.ownerDocument.body), n;
}
function qo(e, t) {
	let n = ro(e);
	if (lo(e)) return n;
	if (!oo(e)) {
		let t = xo(e);
		for (; t && !vo(t);) {
			if (W(t) && !Go(t)) return t;
			t = xo(t);
		}
		return n;
	}
	let r = Ko(e, t);
	for (; r && co(r) && Go(r);) r = Ko(r, t);
	return r && vo(r) && Go(r) && !ho(r) ? n : r || go(e) || n;
}
var Jo = async function(e) {
	let t = this.getOffsetParent || qo, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Wo(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Yo(e) {
	return yo(e).direction === "rtl";
}
var Xo = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Po,
	getDocumentElement: io,
	getClippingRect: Ho,
	getOffsetParent: qo,
	getElementRects: Jo,
	getClientRects: Fo,
	getDimensions: Uo,
	getScale: Do,
	isElement: W,
	isRTL: Yo
};
function Zo(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Qo(e, t, n) {
	let r = null, i, a = io(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = ga(d), h = ga(a.clientWidth - (u + f)), g = ga(a.clientHeight - (d + p)), _ = ga(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: ma(0, pa(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Zo(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = ro(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function $o(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Eo(e), u = i || a ? [...l ? Co(l) : [], ...t ? Co(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Qo(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? jo(e) : null;
	c && g();
	function g() {
		let t = jo(e);
		h && !Zo(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var es = Za, ts = Qa, ns = Ga, rs = eo, is = Ja, as = Wa, os = $a, ss = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Xo,
		...i.platform,
		_c: r
	};
	return Ua(e, t, {
		...i,
		platform: a
	});
}, cs = typeof document < "u" ? N.useLayoutEffect : function() {};
function ls(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!ls(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !ls(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function us(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ds(e, t) {
	let n = us(e);
	return Math.round(t * n) / n;
}
function fs(e) {
	let t = N.useRef(e);
	return cs(() => {
		t.current = e;
	}), t;
}
function ps(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = N.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = N.useState(r);
	ls(f, r) || p(r);
	let [m, h] = N.useState(null), [g, _] = N.useState(null), v = N.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = N.useCallback((e) => {
		e !== C.current && (C.current = e, _(e));
	}, []), b = a || m, x = o || g, S = N.useRef(null), C = N.useRef(null), w = N.useRef(u), T = c != null, E = fs(c), ee = fs(i), D = fs(l), O = N.useCallback(() => {
		if (!S.current || !C.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		ee.current && (e.platform = ee.current), ss(S.current, C.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: D.current !== !1
			};
			te.current && !ls(w.current, t) && (w.current = t, rt.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		ee,
		D
	]);
	cs(() => {
		l === !1 && w.current.isPositioned && (w.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let te = N.useRef(!1);
	cs(() => (te.current = !0, () => {
		te.current = !1;
	}), []), cs(() => {
		if (b && (S.current = b), x && (C.current = x), b && x) {
			if (E.current) return E.current(b, x, O);
			O();
		}
	}, [
		b,
		x,
		O,
		E,
		T
	]);
	let k = N.useMemo(() => ({
		reference: S,
		floating: C,
		setReference: v,
		setFloating: y
	}), [v, y]), A = N.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), j = N.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!A.floating) return e;
		let t = ds(A.floating, u.x), r = ds(A.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...us(A.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		A.floating,
		u.x,
		u.y
	]);
	return N.useMemo(() => ({
		...u,
		update: O,
		refs: k,
		elements: A,
		floatingStyles: j
	}), [
		u,
		O,
		k,
		A,
		j
	]);
}
var ms = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : as({
				element: r.current,
				padding: i
			}).fn(n) : r ? as({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, hs = (e, t) => {
	let n = es(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, gs = (e, t) => {
	let n = ts(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, _s = (e, t) => ({
	fn: os(e).fn,
	options: [e, t]
}), vs = (e, t) => {
	let n = ns(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ys = (e, t) => {
	let n = rs(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, bs = (e, t) => {
	let n = is(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, xs = (e, t) => {
	let n = ms(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ss = Object.defineProperty, Cs = (e, t) => Ss(e, "name", {
	value: t,
	configurable: !0
}), ws = "Popper", [Ts, Es] = /* @__PURE__ */ dt(ws), [Ds, Os] = Ts(ws), ks = /* @__PURE__ */ Cs((e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = N.useState(null), [a, o] = N.useState(void 0);
	return /* @__PURE__ */ (0, z.jsx)(Ds, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		placementState: a,
		setPlacementState: o,
		children: n
	});
}, "Popper"), As = "PopperAnchor", js = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Cs(function(e, t) {
	let { __scopePopper: n, virtualRef: r, ...i } = e, a = Os(As, n), o = N.useRef(null), s = a.onAnchorChange, c = ze(t, N.useCallback((e) => {
		o.current = e, e && s(e);
	}, [s])), l = N.useRef(null);
	N.useEffect(() => {
		if (!r) return;
		let e = l.current;
		l.current = r.current, e !== l.current && s(l.current);
	});
	let u = a.placementState && Rs(a.placementState), d = u?.[0], f = u?.[1];
	return r ? null : /* @__PURE__ */ (0, z.jsx)(B.div, {
		"data-radix-popper-side": d,
		"data-radix-popper-align": f,
		...i,
		ref: c
	});
}, "PopperAnchor")), Ms = "PopperContent", [Ns, Ps] = Ts(Ms), Fs = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Cs(function(e, t) {
	let { __scopePopper: n, side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, arrowPadding: s = 0, avoidCollisions: c = !0, collisionBoundary: l = [], collisionPadding: u = 0, sticky: d = "partial", hideWhenDetached: f = !1, updatePositionStrategy: p = "optimized", onPlaced: m, ...h } = e, g = Os(Ms, n), [_, v] = N.useState(null), y = ze(t, v), [b, x] = N.useState(null), S = qi(b), C = S?.width ?? 0, w = S?.height ?? 0, T = r + (a === "center" ? "" : "-" + a), E = typeof u == "number" ? u : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...u
	}, ee = Array.isArray(l) ? l : [l], D = ee.length > 0, O = {
		padding: E,
		boundary: ee.filter(Is),
		altBoundary: D
	}, { refs: te, floatingStyles: k, placement: A, isPositioned: j, middlewareData: M } = ps({
		strategy: "fixed",
		placement: T,
		whileElementsMounted: /* @__PURE__ */ Cs((...e) => $o(...e, { animationFrame: p === "always" }), "whileElementsMounted"),
		elements: { reference: g.anchor },
		middleware: [
			hs({
				mainAxis: i + w,
				alignmentAxis: o
			}),
			c && gs({
				mainAxis: !0,
				crossAxis: !1,
				limiter: d === "partial" ? _s() : void 0,
				...O
			}),
			c && vs({ ...O }),
			ys({
				...O,
				apply: /* @__PURE__ */ Cs(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}, "apply")
			}),
			b && xs({
				element: b,
				padding: s
			}),
			Ls({
				arrowWidth: C,
				arrowHeight: w
			}),
			f && bs({
				strategy: "referenceHidden",
				...O,
				boundary: D ? O.boundary : void 0
			})
		]
	}), ne = g.setPlacementState;
	Nt(() => (ne(A), () => {
		ne(void 0);
	}), [A, ne]);
	let [P, re] = Rs(A), ie = mn(m);
	Nt(() => {
		j && ie?.();
	}, [j, ie]);
	let F = M.arrow?.x, I = M.arrow?.y, L = M.arrow?.centerOffset !== 0, [R, ae] = N.useState();
	return Nt(() => {
		_ && ae(window.getComputedStyle(_).zIndex);
	}, [_]), /* @__PURE__ */ (0, z.jsx)("div", {
		ref: te.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...k,
			transform: j ? k.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: R,
			"--radix-popper-transform-origin": [M.transformOrigin?.x, M.transformOrigin?.y].join(" "),
			...M.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ (0, z.jsx)(Ns, {
			scope: n,
			placedSide: P,
			placedAlign: re,
			onArrowChange: x,
			arrowX: F,
			arrowY: I,
			shouldHideArrow: L,
			children: /* @__PURE__ */ (0, z.jsx)(B.div, {
				"data-side": P,
				"data-align": re,
				...h,
				ref: y,
				style: {
					...h.style,
					animation: j ? h.style?.animation : "none"
				}
			})
		})
	});
}, "PopperContent"));
function Is(e) {
	return e !== null;
}
Cs(Is, "isNotNull");
var Ls = /* @__PURE__ */ Cs((e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Rs(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
}), "transformOrigin");
function Rs(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
Cs(Rs, "getSideAndAlignFromPlacement");
var zs = ks, Bs = js, Vs = Fs, Hs = Object.defineProperty, Us = (e, t) => Hs(e, "name", {
	value: t,
	configurable: !0
}), Ws = !1;
function Gs() {
	let [e, t] = N.useState(Ws);
	return N.useEffect(() => {
		Ws || (Ws = !0, t(!0));
	}, []), e;
}
Us(Gs, "useIsHydrated");
var Ks = N.useSyncExternalStore;
function qs() {
	return () => {};
}
Us(qs, "subscribe");
function Js() {
	return Ks(qs, () => !0, () => !1);
}
Us(Js, "useIsHydratedModern");
var Ys = typeof Ks == "function" ? Js : Gs, Xs = Object.defineProperty, Zs = (e, t) => Xs(e, "name", {
	value: t,
	configurable: !0
}), Qs = "rovingFocusGroup.onEntryFocus", $s = {
	bubbles: !1,
	cancelable: !0
}, ec = "RovingFocusGroup", [tc, nc, rc] = /* @__PURE__ */ ht(ec), [ic, ac] = /* @__PURE__ */ dt(ec, [rc]), [oc, sc] = ic(ec), cc = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Zs(function(e, t) {
	return /* @__PURE__ */ (0, z.jsx)(tc.Provider, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, z.jsx)(tc.Slot, {
			scope: e.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, z.jsx)(lc, {
				...e,
				ref: t
			})
		})
	});
}, "RovingFocusGroup")), lc = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Zs(function(e, t) {
	let { __scopeRovingFocusGroup: n, orientation: r, loop: i = !1, dir: a, currentTabStopId: o, defaultCurrentTabStopId: s, onCurrentTabStopIdChange: c, onEntryFocus: l, preventScrollOnEntryFocus: u = !1, ...d } = e, f = N.useRef(null), p = ze(t, f), m = dn(a), [h, g] = Ht({
		prop: o,
		defaultProp: s ?? null,
		onChange: c,
		caller: ec
	}), [_, v] = N.useState(!1), y = mn(l), b = nc(n), x = N.useRef(!1), [S, C] = N.useState(0);
	return N.useEffect(() => {
		let e = f.current;
		if (e) return e.addEventListener(Qs, y), () => e.removeEventListener(Qs, y);
	}, [y]), /* @__PURE__ */ (0, z.jsx)(oc, {
		scope: n,
		orientation: r,
		dir: m,
		loop: i,
		currentTabStopId: h,
		onItemFocus: N.useCallback((e) => g(e), [g]),
		onItemShiftTab: N.useCallback(() => v(!0), []),
		onFocusableItemAdd: N.useCallback(() => C((e) => e + 1), []),
		onFocusableItemRemove: N.useCallback(() => C((e) => e - 1), []),
		children: /* @__PURE__ */ (0, z.jsx)(B.div, {
			tabIndex: _ || S === 0 ? -1 : 0,
			"data-orientation": r,
			...d,
			ref: p,
			style: {
				outline: "none",
				...e.style
			},
			onMouseDown: V(e.onMouseDown, () => {
				x.current = !0;
			}),
			onFocus: V(e.onFocus, (e) => {
				let t = !x.current;
				if (e.target === e.currentTarget && t && !_) {
					let t = new CustomEvent(Qs, $s);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = b().filter((e) => e.focusable);
						hc([
							e.find((e) => e.active),
							e.find((e) => e.id === h),
							...e
						].filter(Boolean).map((e) => e.ref.current), u);
					}
				}
				x.current = !1;
			}),
			onBlur: V(e.onBlur, () => v(!1))
		})
	});
}, "RovingFocusGroupImpl")), uc = "RovingFocusGroupItem", dc = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Zs(function(e, t) {
	let { __scopeRovingFocusGroup: n, focusable: r = !0, active: i = !1, tabStopId: a, children: o, ...s } = e, c = sn(), l = a || c, u = sc(uc, n), d = u.currentTabStopId === l, f = nc(n), { onFocusableItemAdd: p, onFocusableItemRemove: m, currentTabStopId: h } = u, g = Ys();
	return Nt(() => {
		if (!(!g || !r)) return p(), () => m();
	}, [
		g,
		r,
		p,
		m
	]), N.useEffect(() => {
		if (!(g || !r)) return p(), () => m();
	}, [
		g,
		r,
		p,
		m
	]), /* @__PURE__ */ (0, z.jsx)(tc.ItemSlot, {
		scope: n,
		id: l,
		focusable: r,
		active: i,
		children: /* @__PURE__ */ (0, z.jsx)(B.span, {
			tabIndex: d ? 0 : -1,
			"data-orientation": u.orientation,
			...s,
			ref: t,
			onMouseDown: V(e.onMouseDown, (e) => {
				r ? u.onItemFocus(l) : e.preventDefault();
			}),
			onFocus: V(e.onFocus, () => u.onItemFocus(l)),
			onKeyDown: V(e.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					u.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = mc(e, u.orientation, u.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = f().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = u.loop ? gc(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => hc(n));
				}
			}),
			children: typeof o == "function" ? o({
				isCurrentTabStop: d,
				hasTabStop: h != null
			}) : o
		})
	});
}, "RovingFocusGroupItem")), fc = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function pc(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
Zs(pc, "getDirectionAwareKey");
function mc(e, t, n) {
	let r = pc(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return fc[r];
}
Zs(mc, "getFocusIntent");
function hc(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
Zs(hc, "focusFirst");
function gc(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
Zs(gc, "wrapArray");
var _c = cc, vc = dc, yc = Object.defineProperty, bc = (e, t) => yc(e, "name", {
	value: t,
	configurable: !0
});
function xc(e) {
	let t = N.useRef({
		value: e,
		previous: e
	});
	return N.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
bc(xc, "usePrevious");
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
var Sc = Object.defineProperty, Cc = (e, t) => Sc(e, "name", {
	value: t,
	configurable: !0
});
function wc(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
Cc(wc, "clamp");
//#endregion
//#region node_modules/@radix-ui/react-select/dist/index.mjs
var Tc = Object.defineProperty, K = (e, t) => Tc(e, "name", {
	value: t,
	configurable: !0
}), Ec = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], Dc = [" ", "Enter"], Oc = "Select", [kc, Ac, jc] = /* @__PURE__ */ ht(Oc), [Mc, Nc] = /* @__PURE__ */ dt(Oc, [jc, Es]), Pc = Es(), [Fc, Ic] = Mc(Oc), [Lc, Rc] = Mc(Oc);
function zc(e) {
	let { __scopeSelect: t, children: n, open: r, defaultOpen: i, onOpenChange: a, value: o, defaultValue: s, onValueChange: c, dir: l, name: u, autoComplete: d, disabled: f, required: p, form: m, internal_do_not_use_render: h } = e, g = Pc(t), [_, v] = N.useState(null), [y, b] = N.useState(null), [x, S] = N.useState(!1), C = dn(l), [w, T] = Ht({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: Oc
	}), [E, ee] = Ht({
		prop: o,
		defaultProp: s,
		onChange: c,
		caller: Oc
	}), D = N.useRef(null), O = N.useRef(E);
	N.useEffect(() => {
		let e = m ? _?.ownerDocument.getElementById(m) : _?.form;
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ K(() => ee(O.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		m,
		_,
		ee
	]);
	let te = _ ? !!m || !!_.closest("form") : !0, [k, A] = N.useState(/* @__PURE__ */ new Set()), j = sn(), M = Array.from(k).map((e) => e.props.value).join(";"), ne = N.useCallback((e) => {
		A((t) => new Set(t).add(e));
	}, []), P = N.useCallback((e) => {
		A((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		});
	}, []), re = {
		required: p,
		trigger: _,
		onTriggerChange: v,
		valueNode: y,
		onValueNodeChange: b,
		valueNodeHasChildren: x,
		onValueNodeHasChildrenChange: S,
		contentId: j,
		value: E,
		onValueChange: ee,
		open: w,
		onOpenChange: T,
		dir: C,
		triggerPointerDownPosRef: D,
		disabled: f,
		name: u,
		autoComplete: d,
		form: m,
		nativeOptions: k,
		nativeSelectKey: M,
		isFormControl: te
	};
	return /* @__PURE__ */ (0, z.jsx)(zs, {
		...g,
		children: /* @__PURE__ */ (0, z.jsx)(Fc, {
			scope: t,
			...re,
			children: /* @__PURE__ */ (0, z.jsx)(kc.Provider, {
				scope: t,
				children: /* @__PURE__ */ (0, z.jsx)(Lc, {
					scope: t,
					onNativeOptionAdd: ne,
					onNativeOptionRemove: P,
					children: El(h) ? h(re) : n
				})
			})
		})
	});
}
K(zc, "SelectProvider");
var Bc = /* @__PURE__ */ K((e) => {
	let { __scopeSelect: t, children: n, ...r } = e;
	return /* @__PURE__ */ (0, z.jsx)(zc, {
		__scopeSelect: t,
		...r,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [n, e ? /* @__PURE__ */ (0, z.jsx)(Tl, { __scopeSelect: t }) : null] })
	});
}, "Select"), Vc = "SelectTrigger", Hc = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, disabled: r = !1, ...i } = e, a = Pc(n), o = Ic(Vc, n), s = o.disabled || r, c = ze(t, o.onTriggerChange), l = Ac(n), u = N.useRef("touch"), [d, f, p] = Ol((e) => {
		let t = l().filter((e) => !e.disabled), n = kl(t, e, t.find((e) => e.value === o.value));
		n !== void 0 && o.onValueChange(n.value);
	}), m = /* @__PURE__ */ K((e) => {
		s || (o.onOpenChange(!0), p()), e && (o.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	}, "handleOpen");
	return /* @__PURE__ */ (0, z.jsx)(Bs, {
		asChild: !0,
		...a,
		children: /* @__PURE__ */ (0, z.jsx)(B.button, {
			type: "button",
			role: "combobox",
			"aria-controls": o.open ? o.contentId : void 0,
			"aria-expanded": o.open,
			"aria-required": o.required,
			"aria-autocomplete": "none",
			dir: o.dir,
			"data-state": o.open ? "open" : "closed",
			disabled: s,
			"data-disabled": s ? "" : void 0,
			"data-placeholder": Dl(o.value) ? "" : void 0,
			...i,
			ref: c,
			onClick: V(i.onClick, (e) => {
				e.currentTarget.focus(), u.current !== "mouse" && m(e);
			}),
			onPointerDown: V(i.onPointerDown, (e) => {
				u.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (m(e), e.preventDefault());
			}),
			onKeyDown: V(i.onKeyDown, (e) => {
				let t = d.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && f(e.key), !(t && e.key === " ") && Ec.includes(e.key) && (m(), e.preventDefault());
			})
		})
	});
}, "SelectTrigger")), Uc = "SelectValue", Wc = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = Ic(Uc, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = ze(t, c.onValueNodeChange);
	Nt(() => {
		l(u);
	}, [l, u]);
	let f = Dl(c.value);
	return /* @__PURE__ */ (0, z.jsx)(B.span, {
		...s,
		asChild: f ? !1 : s.asChild,
		ref: d,
		style: { pointerEvents: "none" },
		children: /* @__PURE__ */ (0, z.jsx)(N.Fragment, { children: f ? o : a }, f ? "placeholder" : "value")
	});
}, "SelectValue")), Gc = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ (0, z.jsx)(B.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
}, "SelectIcon")), [Kc, qc] = Mc("SelectPortal", { forceMount: void 0 }), Jc = /* @__PURE__ */ K((e) => {
	let { __scopeSelect: t, forceMount: n, ...r } = e;
	return /* @__PURE__ */ (0, z.jsx)(Kc, {
		scope: e.__scopeSelect,
		forceMount: n,
		children: /* @__PURE__ */ (0, z.jsx)(Kn, {
			asChild: !0,
			...r
		})
	});
}, "SelectPortal"), Yc = "SelectContent", Xc = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let n = qc(Yc, e.__scopeSelect), { forceMount: r = n.forceMount, ...i } = e, a = Ic(Yc, e.__scopeSelect), [o, s] = N.useState();
	return Nt(() => {
		s(new DocumentFragment());
	}, []), /* @__PURE__ */ (0, z.jsx)(Xt, {
		present: r || a.open,
		children: ({ present: e }) => e ? /* @__PURE__ */ (0, z.jsx)(nl, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, z.jsx)(Zc, {
			...i,
			fragment: o
		})
	});
}, "SelectContent")), Zc = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, children: r, fragment: i } = e;
	return i ? rt.createPortal(/* @__PURE__ */ (0, z.jsx)($c, {
		scope: n,
		children: /* @__PURE__ */ (0, z.jsx)(kc.Slot, {
			scope: n,
			children: /* @__PURE__ */ (0, z.jsx)("div", {
				ref: t,
				children: r
			})
		})
	}), i) : null;
}, "SelectContentFragment")), Qc = 10, [$c, el] = Mc(Yc), tl = /* @__PURE__ */ He("SelectContent.RemoveScroll"), nl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n } = e, { position: r = "item-aligned", onCloseAutoFocus: i, onEscapeKeyDown: a, onPointerDownOutside: o, side: s, sideOffset: c, align: l, alignOffset: u, arrowPadding: d, collisionBoundary: f, collisionPadding: p, sticky: m, hideWhenDetached: h, avoidCollisions: g, ..._ } = e, v = Ic(Yc, n), [y, b] = N.useState(null), [x, S] = N.useState(null), C = ze(t, b), [w, T] = N.useState(null), [E, ee] = N.useState(null), D = Ac(n), [O, te] = N.useState(!1), k = N.useRef(!1);
	N.useEffect(() => {
		if (y) return _i(y);
	}, [y]), Qn();
	let A = N.useCallback((e) => {
		let [t, ...n] = D().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && x && (x.scrollTop = 0), n === r && x && (x.scrollTop = x.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [D, x]), j = N.useCallback(() => A([w, y]), [
		A,
		w,
		y
	]);
	N.useEffect(() => {
		O && j();
	}, [O, j]);
	let { onOpenChange: M, triggerPointerDownPosRef: ne } = v;
	N.useEffect(() => {
		if (y) {
			let e = {
				x: 0,
				y: 0
			}, t = /* @__PURE__ */ K((t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (ne.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (ne.current?.y ?? 0))
				};
			}, "handlePointerMove"), n = /* @__PURE__ */ K((n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : n.composedPath().includes(y) || M(!1), document.removeEventListener("pointermove", t), ne.current = null;
			}, "handlePointerUp");
			return ne.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		y,
		M,
		ne
	]), N.useEffect(() => {
		let e = /* @__PURE__ */ K(() => M(!1), "close");
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [M]);
	let [P, re] = Ol((e) => {
		let t = D().filter((e) => !e.disabled), n = kl(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current?.focus());
	}), ie = N.useCallback((e, t, n) => {
		let r = !k.current && !n;
		(v.value !== void 0 && v.value === t || r) && (T(e), r && (k.current = !0));
	}, [v.value]), F = N.useCallback(() => y?.focus(), [y]), I = N.useCallback((e, t, n) => {
		let r = !k.current && !n;
		(v.value !== void 0 && v.value === t || r) && ee(e);
	}, [v.value]), L = r === "popper" ? il : rl, R = L === il ? {
		side: s,
		sideOffset: c,
		align: l,
		alignOffset: u,
		arrowPadding: d,
		collisionBoundary: f,
		collisionPadding: p,
		sticky: m,
		hideWhenDetached: h,
		avoidCollisions: g
	} : {};
	return /* @__PURE__ */ (0, z.jsx)($c, {
		scope: n,
		content: y,
		viewport: x,
		onViewportChange: S,
		itemRefCallback: ie,
		selectedItem: w,
		onItemLeave: F,
		itemTextRefCallback: I,
		focusSelectedItem: j,
		selectedItemText: E,
		position: r,
		isPositioned: O,
		searchRef: P,
		children: /* @__PURE__ */ (0, z.jsx)(ci, {
			as: tl,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ (0, z.jsx)(Nn, {
				asChild: !0,
				trapped: v.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: V(i, (e) => {
					v.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ (0, z.jsx)(xn, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: a,
					onPointerDownOutside: o,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => v.onOpenChange(!1),
					children: /* @__PURE__ */ (0, z.jsx)(L, {
						role: "listbox",
						id: v.contentId,
						"data-state": v.open ? "open" : "closed",
						dir: v.dir,
						onContextMenu: (e) => e.preventDefault(),
						..._,
						...R,
						onPlaced: () => te(!0),
						ref: C,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							..._.style
						},
						onKeyDown: V(_.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && re(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = D().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => A(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
}, "SelectContentImpl")), rl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, onPlaced: r, ...i } = e, a = Ic(Yc, n), o = el(Yc, n), [s, c] = N.useState(null), [l, u] = N.useState(null), d = ze(t, u), f = Ac(n), p = N.useRef(!1), m = N.useRef(!0), { viewport: h, selectedItem: g, selectedItemText: _, focusSelectedItem: v } = o, y = N.useCallback(() => {
		if (a.trigger && a.valueNode && s && l && h && g && _) {
			let e = a.trigger.getBoundingClientRect(), t = l.getBoundingClientRect(), n = a.valueNode.getBoundingClientRect(), i = _.getBoundingClientRect();
			if (a.dir !== "rtl") {
				let r = i.left - t.left, a = n.left - r, o = e.left - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - Qc, d = wc(a, [Qc, Math.max(Qc, u - l)]);
				s.style.minWidth = c + "px", s.style.left = d + "px";
			} else {
				let r = t.right - i.right, a = window.innerWidth - n.right - r, o = window.innerWidth - e.right - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - Qc, d = wc(a, [Qc, Math.max(Qc, u - l)]);
				s.style.minWidth = c + "px", s.style.right = d + "px";
			}
			let o = f(), c = window.innerHeight - Qc * 2, u = h.scrollHeight, d = window.getComputedStyle(l), m = parseInt(d.borderTopWidth, 10), v = parseInt(d.paddingTop, 10), y = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = m + v + u + b + y, S = Math.min(g.offsetHeight * 5, x), C = window.getComputedStyle(h), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - Qc, ee = c - E, D = g.offsetHeight / 2, O = g.offsetTop + D, te = m + v + O, k = x - te;
			if (te <= E) {
				let e = o.length > 0 && g === o[o.length - 1].ref.current;
				s.style.bottom = "0px";
				let t = l.clientHeight - h.offsetTop - h.offsetHeight, n = te + Math.max(ee, D + (e ? T : 0) + t + y);
				s.style.height = n + "px";
			} else {
				let e = o.length > 0 && g === o[0].ref.current;
				s.style.top = "0px";
				let t = Math.max(E, m + h.offsetTop + (e ? w : 0) + D) + k;
				s.style.height = t + "px", h.scrollTop = te - E + h.offsetTop;
			}
			s.style.margin = `${Qc}px 0`, s.style.minHeight = S + "px", s.style.maxHeight = c + "px", r?.(), requestAnimationFrame(() => p.current = !0);
		}
	}, [
		f,
		a.trigger,
		a.valueNode,
		s,
		l,
		h,
		g,
		_,
		a.dir,
		r
	]);
	Nt(() => y(), [y]);
	let [b, x] = N.useState();
	return Nt(() => {
		l && x(window.getComputedStyle(l).zIndex);
	}, [l]), /* @__PURE__ */ (0, z.jsx)(al, {
		scope: n,
		contentWrapper: s,
		shouldExpandOnScrollRef: p,
		onScrollButtonChange: N.useCallback((e) => {
			e && m.current === !0 && (y(), v?.(), m.current = !1);
		}, [y, v]),
		children: /* @__PURE__ */ (0, z.jsx)("div", {
			ref: c,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: b
			},
			children: /* @__PURE__ */ (0, z.jsx)(B.div, {
				...i,
				ref: d,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...i.style
				}
			})
		})
	});
}, "SelectItemAlignedPosition")), il = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = Qc, ...a } = e, o = Pc(n);
	return /* @__PURE__ */ (0, z.jsx)(Vs, {
		...o,
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
}, "SelectPopperPosition")), [al, ol] = Mc(Yc, {}), sl = "SelectViewport", cl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, nonce: r, ...i } = e, a = el(sl, n), o = ol(sl, n), s = ze(t, a.onViewportChange), c = N.useRef(0);
	return /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: r
	}), /* @__PURE__ */ (0, z.jsx)(kc.Slot, {
		scope: n,
		children: /* @__PURE__ */ (0, z.jsx)(B.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...i,
			ref: s,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...i.style
			},
			onScroll: V(i.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = o;
				if (r?.current && n) {
					let e = Math.abs(c.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - Qc * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				c.current = t.scrollTop;
			})
		})
	})] });
}, "SelectViewport")), [ll, ul] = Mc("SelectGroup"), dl = "SelectItem", [fl, pl] = Mc(dl), ml = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, value: r, disabled: i = !1, textValue: a, ...o } = e, s = Ic(dl, n), c = el(dl, n), l = s.value === r, [u, d] = N.useState(a ?? ""), [f, p] = N.useState(!1), m = ze(t, mn((e) => c.itemRefCallback?.(e, r, i))), h = sn(), g = N.useRef("touch"), _ = /* @__PURE__ */ K(() => {
		i || (s.onValueChange(r), s.onOpenChange(!1));
	}, "handleSelect");
	return /* @__PURE__ */ (0, z.jsx)(fl, {
		scope: n,
		value: r,
		disabled: i,
		textId: h,
		isSelected: l,
		onItemTextChange: N.useCallback((e) => {
			d((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ (0, z.jsx)(kc.ItemSlot, {
			scope: n,
			value: r,
			disabled: i,
			textValue: u,
			children: /* @__PURE__ */ (0, z.jsx)(B.div, {
				role: "option",
				"aria-labelledby": h,
				"data-highlighted": f ? "" : void 0,
				"aria-selected": l && f,
				"data-state": l ? "checked" : "unchecked",
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				tabIndex: i ? void 0 : -1,
				...o,
				ref: m,
				onFocus: V(o.onFocus, () => p(!0)),
				onBlur: V(o.onBlur, () => p(!1)),
				onClick: V(o.onClick, () => {
					g.current !== "mouse" && _();
				}),
				onPointerUp: V(o.onPointerUp, () => {
					g.current === "mouse" && _();
				}),
				onPointerDown: V(o.onPointerDown, (e) => {
					g.current = e.pointerType;
				}),
				onPointerMove: V(o.onPointerMove, (e) => {
					g.current = e.pointerType, i ? c.onItemLeave?.() : g.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: V(o.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && c.onItemLeave?.();
				}),
				onKeyDown: V(o.onKeyDown, (e) => {
					i || e.target !== e.currentTarget || c.searchRef?.current !== "" && e.key === " " || (Dc.includes(e.key) && _(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
}, "SelectItem")), hl = "SelectItemText", gl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, className: r, style: i, ...a } = e, o = Ic(hl, n), s = el(hl, n), c = pl(hl, n), l = Rc(hl, n), [u, d] = N.useState(null), f = mn((e) => s.itemTextRefCallback?.(e, c.value, c.disabled)), p = ze(t, d, c.onItemTextChange, f), m = u?.textContent, h = N.useMemo(() => /* @__PURE__ */ (0, z.jsx)("option", {
		value: c.value,
		disabled: c.disabled,
		children: m
	}, c.value), [
		c.disabled,
		c.value,
		m
	]), { onNativeOptionAdd: g, onNativeOptionRemove: _ } = l;
	return Nt(() => (g(h), () => _(h)), [
		g,
		_,
		h
	]), /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(B.span, {
		id: c.textId,
		...a,
		ref: p
	}), c.isSelected && o.valueNode && !o.valueNodeHasChildren && !Dl(o.value) ? rt.createPortal(a.children, o.valueNode) : null] });
}, "SelectItemText")), _l = "SelectItemIndicator", vl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, ...r } = e;
	return pl(_l, n).isSelected ? /* @__PURE__ */ (0, z.jsx)(B.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
}, "SelectItemIndicator")), yl = "SelectScrollUpButton", bl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let n = el(yl, e.__scopeSelect), r = ol(yl, e.__scopeSelect), [i, a] = N.useState(!1), o = ze(t, r.onScrollButtonChange);
	return Nt(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				a(t.scrollTop > 0);
			};
			K(e, "handleScroll");
			let t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, z.jsx)(Cl, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
}, "SelectScrollUpButton")), xl = "SelectScrollDownButton", Sl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let n = el(xl, e.__scopeSelect), r = ol(xl, e.__scopeSelect), [i, a] = N.useState(!1), o = ze(t, r.onScrollButtonChange);
	return Nt(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				a(Math.ceil(t.scrollTop) < e);
			};
			K(e, "handleScroll");
			let t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, z.jsx)(Cl, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
}, "SelectScrollDownButton")), Cl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function(e, t) {
	let { __scopeSelect: n, onAutoScroll: r, ...i } = e, a = el("SelectScrollButton", n), o = N.useRef(null), s = Ac(n), c = N.useCallback(() => {
		o.current !== null && (window.clearInterval(o.current), o.current = null);
	}, []);
	return N.useEffect(() => () => c(), [c]), Nt(() => {
		s().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [s]), /* @__PURE__ */ (0, z.jsx)(B.div, {
		"aria-hidden": !0,
		...i,
		ref: t,
		style: {
			flexShrink: 0,
			...i.style
		},
		onPointerDown: V(i.onPointerDown, () => {
			o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerMove: V(i.onPointerMove, () => {
			a.onItemLeave?.(), o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerLeave: V(i.onPointerLeave, () => {
			c();
		})
	});
}, "SelectScrollButtonImpl")), wl = "SelectBubbleInput", Tl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ K(function({ __scopeSelect: e, ...t }, n) {
	let r = Ic(wl, e), { value: i, onValueChange: a, required: o, disabled: s, name: c, autoComplete: l, form: u } = r, { nativeOptions: d, nativeSelectKey: f } = r, p = N.useRef(null), m = ze(n, p), h = i ?? "", g = xc(h), _ = Array.from(d).some((e) => (e.props.value ?? "") === "");
	return N.useEffect(() => {
		let e = p.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, n = Object.getOwnPropertyDescriptor(t, "value").set;
		if (g !== h && n) {
			let t = new Event("change", { bubbles: !0 });
			n.call(e, h), e.dispatchEvent(t);
		}
	}, [g, h]), /* @__PURE__ */ (0, z.jsxs)(B.select, {
		"aria-hidden": !0,
		required: o,
		tabIndex: -1,
		name: c,
		autoComplete: l,
		disabled: s,
		form: u,
		onChange: (e) => a(e.target.value),
		...t,
		style: {
			...st,
			...t.style
		},
		ref: m,
		defaultValue: h,
		children: [Dl(i) && !_ ? /* @__PURE__ */ (0, z.jsx)("option", { value: "" }) : null, Array.from(d)]
	}, f);
}, "SelectBubbleInput"));
function El(e) {
	return typeof e == "function";
}
K(El, "isFunction");
function Dl(e) {
	return e === "" || e === void 0;
}
K(Dl, "shouldShowPlaceholder");
function Ol(e) {
	let t = mn(e), n = N.useRef(""), r = N.useRef(0), i = N.useCallback((e) => {
		let i = n.current + e;
		t(i), (/* @__PURE__ */ K((function e(t) {
			n.current = t, window.clearTimeout(r.current), t !== "" && (r.current = window.setTimeout(() => e(""), 1e3));
		}), "updateSearch"))(i);
	}, [t]), a = N.useCallback(() => {
		n.current = "", window.clearTimeout(r.current);
	}, []);
	return N.useEffect(() => () => window.clearTimeout(r.current), []), [
		n,
		i,
		a
	];
}
K(Ol, "useTypeaheadSearch");
function kl(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Al(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
K(kl, "findNextItem");
function Al(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
K(Al, "wrapArray");
//#endregion
//#region node_modules/@radix-ui/react-tabs/dist/index.mjs
var jl = Object.defineProperty, Ml = (e, t) => jl(e, "name", {
	value: t,
	configurable: !0
}), Nl = "Tabs", [Pl, Fl] = /* @__PURE__ */ dt(Nl, [ac]), Il = ac(), [Ll, q] = Pl(Nl), Rl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Ml(function(e, t) {
	let { __scopeTabs: n, value: r, onValueChange: i, defaultValue: a, orientation: o = "horizontal", dir: s, activationMode: c = "automatic", ...l } = e, u = dn(s), [d, f] = Ht({
		prop: r,
		onChange: i,
		defaultProp: a ?? "",
		caller: Nl
	});
	return /* @__PURE__ */ (0, z.jsx)(Ll, {
		scope: n,
		baseId: sn(),
		value: d,
		onValueChange: f,
		orientation: o,
		dir: u,
		activationMode: c,
		children: /* @__PURE__ */ (0, z.jsx)(B.div, {
			dir: u,
			"data-orientation": o,
			...l,
			ref: t
		})
	});
}, "Tabs")), J = "TabsList", Y = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Ml(function(e, t) {
	let { __scopeTabs: n, loop: r = !0, ...i } = e, a = q(J, n), o = Il(n);
	return /* @__PURE__ */ (0, z.jsx)(_c, {
		asChild: !0,
		...o,
		orientation: a.orientation,
		dir: a.dir,
		loop: r,
		children: /* @__PURE__ */ (0, z.jsx)(B.div, {
			role: "tablist",
			"aria-orientation": a.orientation,
			...i,
			ref: t
		})
	});
}, "TabsList")), zl = "TabsTrigger", Bl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Ml(function(e, t) {
	let { __scopeTabs: n, value: r, disabled: i = !1, ...a } = e, o = q(zl, n), s = Il(n), c = Ul(o.baseId, r), l = Wl(o.baseId, r), u = r === o.value;
	return /* @__PURE__ */ (0, z.jsx)(vc, {
		asChild: !0,
		...s,
		focusable: !i,
		active: u,
		children: /* @__PURE__ */ (0, z.jsx)(B.button, {
			type: "button",
			role: "tab",
			"aria-selected": u,
			"aria-controls": l,
			"data-state": u ? "active" : "inactive",
			"data-disabled": i ? "" : void 0,
			disabled: i,
			id: c,
			...a,
			ref: t,
			onMouseDown: V(e.onMouseDown, (e) => {
				!i && e.button === 0 && e.ctrlKey === !1 ? o.onValueChange(r) : e.preventDefault();
			}),
			onKeyDown: V(e.onKeyDown, (e) => {
				i || e.target !== e.currentTarget || [" ", "Enter"].includes(e.key) && o.onValueChange(r);
			}),
			onFocus: V(e.onFocus, () => {
				let e = o.activationMode !== "manual";
				!u && !i && e && o.onValueChange(r);
			})
		})
	});
}, "TabsTrigger")), Vl = "TabsContent", Hl = /* @__PURE__ */ N.forwardRef(/* @__PURE__ */ Ml(function(e, t) {
	let { __scopeTabs: n, value: r, forceMount: i, children: a, ...o } = e, s = q(Vl, n), c = Ul(s.baseId, r), l = Wl(s.baseId, r), u = r === s.value, d = N.useRef(u);
	return N.useEffect(() => {
		let e = requestAnimationFrame(() => d.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), /* @__PURE__ */ (0, z.jsx)(Xt, {
		present: i || u,
		children: ({ present: n }) => /* @__PURE__ */ (0, z.jsx)(B.div, {
			"data-state": u ? "active" : "inactive",
			"data-orientation": s.orientation,
			role: "tabpanel",
			"aria-labelledby": c,
			hidden: !n,
			id: l,
			tabIndex: 0,
			...o,
			ref: t,
			style: {
				...e.style,
				animationDuration: d.current ? "0s" : void 0
			},
			children: n && a
		})
	});
}, "TabsContent"));
function Ul(e, t) {
	return `${e}-trigger-${t}`;
}
Ml(Ul, "makeTriggerId");
function Wl(e, t) {
	return `${e}-content-${t}`;
}
Ml(Wl, "makeContentId");
var Gl = Rl, Kl = Y, ql = Bl, Jl = Hl, Yl = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Xl = (e, t) => ({
	classGroupId: e,
	validator: t
}), Zl = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Ql = "-", $l = [], eu = "arbitrary..", tu = (e) => {
	let t = iu(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return ru(e);
			let n = e.split(Ql);
			return nu(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Yl(i, t) : t : i || $l;
			}
			return n[e] || $l;
		}
	};
}, nu = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = nu(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Ql) : e.slice(t).join(Ql), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, ru = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? eu + r : void 0;
})(), iu = (e) => {
	let { theme: t, classGroups: n } = e;
	return au(n, t);
}, au = (e, t) => {
	let n = Zl();
	for (let r in e) {
		let i = e[r];
		ou(i, n, r, t);
	}
	return n;
}, ou = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		su(i, t, n, r);
	}
}, su = (e, t, n, r) => {
	if (typeof e == "string") {
		cu(e, t, n);
		return;
	}
	if (typeof e == "function") {
		lu(e, t, n, r);
		return;
	}
	uu(e, t, n, r);
}, cu = (e, t, n) => {
	let r = e === "" ? t : du(t, e);
	r.classGroupId = n;
}, lu = (e, t, n, r) => {
	if (fu(e)) {
		ou(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(Xl(n, e));
}, uu = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		ou(o, du(t, a), n, r);
	}
}, du = (e, t) => {
	let n = e, r = t.split(Ql), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Zl(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, fu = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, pu = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, mu = "!", hu = ":", gu = [], _u = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), vu = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === hu) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(mu) ? (c = s.slice(0, -1), l = !0) : s.startsWith(mu) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return _u(t, l, c, u);
	};
	if (t) {
		let e = t + hu, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : _u(gu, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, yu = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, bu = (e) => ({
	cache: pu(e.cacheSize),
	parseClassName: vu(e),
	sortModifiers: yu(e),
	postfixLookupClassGroupIds: xu(e),
	...tu(e)
}), xu = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Su = /\s+/, Cu = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Su), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + mu : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, wu = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = Tu(n)) && (i && (i += " "), i += r);
	return i;
}, Tu = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = Tu(e[r])) && (n && (n += " "), n += t);
	return n;
}, Eu = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = bu(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = Cu(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(wu(...e));
}, Du = [], Ou = (e) => {
	let t = (t) => t[e] || Du;
	return t.isThemeGetter = !0, t;
}, ku = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Au = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ju = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Mu = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Nu = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Pu = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Fu = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Iu = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Lu = (e) => ju.test(e), X = (e) => !!e && !Number.isNaN(Number(e)), Ru = (e) => !!e && Number.isInteger(Number(e)), zu = (e) => e.endsWith("%") && X(e.slice(0, -1)), Bu = (e) => Mu.test(e), Vu = () => !0, Hu = (e) => Nu.test(e) && !Pu.test(e), Uu = () => !1, Wu = (e) => Fu.test(e), Gu = (e) => Iu.test(e), Ku = (e) => !Z(e) && !Q(e), qu = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Ju = (e) => ld(e, pd, Uu), Z = (e) => ku.test(e), Yu = (e) => ld(e, md, Hu), Xu = (e) => ld(e, hd, X), Zu = (e) => ld(e, _d, Vu), Qu = (e) => ld(e, gd, Uu), $u = (e) => ld(e, dd, Uu), ed = (e) => ld(e, fd, Gu), td = (e) => ld(e, vd, Wu), Q = (e) => Au.test(e), nd = (e) => ud(e, md), rd = (e) => ud(e, gd), id = (e) => ud(e, dd), ad = (e) => ud(e, pd), od = (e) => ud(e, fd), sd = (e) => ud(e, vd, !0), cd = (e) => ud(e, _d, !0), ld = (e, t, n) => {
	let r = ku.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, ud = (e, t, n = !1) => {
	let r = Au.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, dd = (e) => e === "position" || e === "percentage", fd = (e) => e === "image" || e === "url", pd = (e) => e === "length" || e === "size" || e === "bg-size", md = (e) => e === "length", hd = (e) => e === "number", gd = (e) => e === "family-name", _d = (e) => e === "number" || e === "weight", vd = (e) => e === "shadow", $ = /* @__PURE__ */ Eu(() => {
	let e = Ou("color"), t = Ou("font"), n = Ou("text"), r = Ou("font-weight"), i = Ou("tracking"), a = Ou("leading"), o = Ou("breakpoint"), s = Ou("container"), c = Ou("spacing"), l = Ou("radius"), u = Ou("shadow"), d = Ou("inset-shadow"), f = Ou("text-shadow"), p = Ou("drop-shadow"), m = Ou("blur"), h = Ou("perspective"), g = Ou("aspect"), _ = Ou("ease"), v = Ou("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		Q,
		Z
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		Q,
		Z,
		c
	], T = () => [
		Lu,
		"full",
		"auto",
		...w()
	], E = () => [
		Ru,
		"none",
		"subgrid",
		Q,
		Z
	], ee = () => [
		"auto",
		{ span: [
			"full",
			Ru,
			Q,
			Z
		] },
		Ru,
		Q,
		Z
	], D = () => [
		Ru,
		"auto",
		Q,
		Z
	], O = () => [
		"auto",
		"min",
		"max",
		"fr",
		Q,
		Z
	], te = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], k = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], A = () => ["auto", ...w()], j = () => [
		Lu,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], M = () => [
		Lu,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], ne = () => [
		Lu,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], N = () => [
		e,
		Q,
		Z
	], P = () => [
		...b(),
		id,
		$u,
		{ position: [Q, Z] }
	], re = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ie = () => [
		"auto",
		"cover",
		"contain",
		ad,
		Ju,
		{ size: [Q, Z] }
	], F = () => [
		zu,
		nd,
		Yu
	], I = () => [
		"",
		"none",
		"full",
		l,
		Q,
		Z
	], L = () => [
		"",
		X,
		nd,
		Yu
	], R = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ae = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], oe = () => [
		X,
		zu,
		id,
		$u
	], se = () => [
		"",
		"none",
		m,
		Q,
		Z
	], ce = () => [
		"none",
		X,
		Q,
		Z
	], le = () => [
		"none",
		X,
		Q,
		Z
	], ue = () => [
		X,
		Q,
		Z
	], de = () => [
		Lu,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Bu],
			breakpoint: [Bu],
			color: [Vu],
			container: [Bu],
			"drop-shadow": [Bu],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Ku],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Bu],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Bu],
			shadow: [Bu],
			spacing: ["px", X],
			text: [Bu],
			"text-shadow": [Bu],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Lu,
				Z,
				Q,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				Q,
				Z
			] }],
			"container-named": [qu],
			columns: [{ columns: [
				X,
				Z,
				Q,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Ru,
				"auto",
				Q,
				Z
			] }],
			basis: [{ basis: [
				Lu,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				X,
				Lu,
				"auto",
				"initial",
				"none",
				Z
			] }],
			grow: [{ grow: [
				"",
				X,
				Q,
				Z
			] }],
			shrink: [{ shrink: [
				"",
				X,
				Q,
				Z
			] }],
			order: [{ order: [
				Ru,
				"first",
				"last",
				"none",
				Q,
				Z
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: ee() }],
			"col-start": [{ "col-start": D() }],
			"col-end": [{ "col-end": D() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: ee() }],
			"row-start": [{ "row-start": D() }],
			"row-end": [{ "row-end": D() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": O() }],
			"auto-rows": [{ "auto-rows": O() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...te(), "normal"] }],
			"justify-items": [{ "justify-items": [...k(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...k()] }],
			"align-content": [{ content: ["normal", ...te()] }],
			"align-items": [{ items: [...k(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...k(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": te() }],
			"place-items": [{ "place-items": [...k(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...k()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: A() }],
			mx: [{ mx: A() }],
			my: [{ my: A() }],
			ms: [{ ms: A() }],
			me: [{ me: A() }],
			mbs: [{ mbs: A() }],
			mbe: [{ mbe: A() }],
			mt: [{ mt: A() }],
			mr: [{ mr: A() }],
			mb: [{ mb: A() }],
			ml: [{ ml: A() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: j() }],
			"inline-size": [{ inline: ["auto", ...M()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...M()] }],
			"max-inline-size": [{ "max-inline": ["none", ...M()] }],
			"block-size": [{ block: ["auto", ...ne()] }],
			"min-block-size": [{ "min-block": ["auto", ...ne()] }],
			"max-block-size": [{ "max-block": ["none", ...ne()] }],
			w: [{ w: [
				s,
				"screen",
				...j()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...j()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...j()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...j()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...j()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...j()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				nd,
				Yu
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				cd,
				Zu
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				zu,
				Z
			] }],
			"font-family": [{ font: [
				rd,
				Qu,
				t
			] }],
			"font-features": [{ "font-features": [Z] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				Q,
				Z
			] }],
			"line-clamp": [{ "line-clamp": [
				X,
				"none",
				Q,
				Xu
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				Q,
				Z
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				Q,
				Z
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: N() }],
			"text-color": [{ text: N() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...R(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				X,
				"from-font",
				"auto",
				Q,
				Yu
			] }],
			"text-decoration-color": [{ decoration: N() }],
			"underline-offset": [{ "underline-offset": [
				X,
				"auto",
				Q,
				Z
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				Ru,
				Q,
				Z
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				Q,
				Z
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				Q,
				Z
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: P() }],
			"bg-repeat": [{ bg: re() }],
			"bg-size": [{ bg: ie() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Ru,
						Q,
						Z
					],
					radial: [
						"",
						Q,
						Z
					],
					conic: [
						Ru,
						Q,
						Z
					]
				},
				od,
				ed
			] }],
			"bg-color": [{ bg: N() }],
			"gradient-from-pos": [{ from: F() }],
			"gradient-via-pos": [{ via: F() }],
			"gradient-to-pos": [{ to: F() }],
			"gradient-from": [{ from: N() }],
			"gradient-via": [{ via: N() }],
			"gradient-to": [{ to: N() }],
			rounded: [{ rounded: I() }],
			"rounded-s": [{ "rounded-s": I() }],
			"rounded-e": [{ "rounded-e": I() }],
			"rounded-t": [{ "rounded-t": I() }],
			"rounded-r": [{ "rounded-r": I() }],
			"rounded-b": [{ "rounded-b": I() }],
			"rounded-l": [{ "rounded-l": I() }],
			"rounded-ss": [{ "rounded-ss": I() }],
			"rounded-se": [{ "rounded-se": I() }],
			"rounded-ee": [{ "rounded-ee": I() }],
			"rounded-es": [{ "rounded-es": I() }],
			"rounded-tl": [{ "rounded-tl": I() }],
			"rounded-tr": [{ "rounded-tr": I() }],
			"rounded-br": [{ "rounded-br": I() }],
			"rounded-bl": [{ "rounded-bl": I() }],
			"border-w": [{ border: L() }],
			"border-w-x": [{ "border-x": L() }],
			"border-w-y": [{ "border-y": L() }],
			"border-w-s": [{ "border-s": L() }],
			"border-w-e": [{ "border-e": L() }],
			"border-w-bs": [{ "border-bs": L() }],
			"border-w-be": [{ "border-be": L() }],
			"border-w-t": [{ "border-t": L() }],
			"border-w-r": [{ "border-r": L() }],
			"border-w-b": [{ "border-b": L() }],
			"border-w-l": [{ "border-l": L() }],
			"divide-x": [{ "divide-x": L() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": L() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...R(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...R(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: N() }],
			"border-color-x": [{ "border-x": N() }],
			"border-color-y": [{ "border-y": N() }],
			"border-color-s": [{ "border-s": N() }],
			"border-color-e": [{ "border-e": N() }],
			"border-color-bs": [{ "border-bs": N() }],
			"border-color-be": [{ "border-be": N() }],
			"border-color-t": [{ "border-t": N() }],
			"border-color-r": [{ "border-r": N() }],
			"border-color-b": [{ "border-b": N() }],
			"border-color-l": [{ "border-l": N() }],
			"divide-color": [{ divide: N() }],
			"outline-style": [{ outline: [
				...R(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				X,
				Q,
				Z
			] }],
			"outline-w": [{ outline: [
				"",
				X,
				nd,
				Yu
			] }],
			"outline-color": [{ outline: N() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				sd,
				td
			] }],
			"shadow-color": [{ shadow: N() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				sd,
				td
			] }],
			"inset-shadow-color": [{ "inset-shadow": N() }],
			"ring-w": [{ ring: L() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: N() }],
			"ring-offset-w": [{ "ring-offset": [X, Yu] }],
			"ring-offset-color": [{ "ring-offset": N() }],
			"inset-ring-w": [{ "inset-ring": L() }],
			"inset-ring-color": [{ "inset-ring": N() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				sd,
				td
			] }],
			"text-shadow-color": [{ "text-shadow": N() }],
			opacity: [{ opacity: [
				X,
				Q,
				Z
			] }],
			"mix-blend": [{ "mix-blend": [
				...ae(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ae() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [X] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": oe() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": oe() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": N() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": N() }],
			"mask-image-t-from-pos": [{ "mask-t-from": oe() }],
			"mask-image-t-to-pos": [{ "mask-t-to": oe() }],
			"mask-image-t-from-color": [{ "mask-t-from": N() }],
			"mask-image-t-to-color": [{ "mask-t-to": N() }],
			"mask-image-r-from-pos": [{ "mask-r-from": oe() }],
			"mask-image-r-to-pos": [{ "mask-r-to": oe() }],
			"mask-image-r-from-color": [{ "mask-r-from": N() }],
			"mask-image-r-to-color": [{ "mask-r-to": N() }],
			"mask-image-b-from-pos": [{ "mask-b-from": oe() }],
			"mask-image-b-to-pos": [{ "mask-b-to": oe() }],
			"mask-image-b-from-color": [{ "mask-b-from": N() }],
			"mask-image-b-to-color": [{ "mask-b-to": N() }],
			"mask-image-l-from-pos": [{ "mask-l-from": oe() }],
			"mask-image-l-to-pos": [{ "mask-l-to": oe() }],
			"mask-image-l-from-color": [{ "mask-l-from": N() }],
			"mask-image-l-to-color": [{ "mask-l-to": N() }],
			"mask-image-x-from-pos": [{ "mask-x-from": oe() }],
			"mask-image-x-to-pos": [{ "mask-x-to": oe() }],
			"mask-image-x-from-color": [{ "mask-x-from": N() }],
			"mask-image-x-to-color": [{ "mask-x-to": N() }],
			"mask-image-y-from-pos": [{ "mask-y-from": oe() }],
			"mask-image-y-to-pos": [{ "mask-y-to": oe() }],
			"mask-image-y-from-color": [{ "mask-y-from": N() }],
			"mask-image-y-to-color": [{ "mask-y-to": N() }],
			"mask-image-radial": [{ "mask-radial": [Q, Z] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": oe() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": oe() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": N() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": N() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [X] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": oe() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": oe() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": N() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": N() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: P() }],
			"mask-repeat": [{ mask: re() }],
			"mask-size": [{ mask: ie() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				Q,
				Z
			] }],
			filter: [{ filter: [
				"",
				"none",
				Q,
				Z
			] }],
			blur: [{ blur: se() }],
			brightness: [{ brightness: [
				X,
				Q,
				Z
			] }],
			contrast: [{ contrast: [
				X,
				Q,
				Z
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				sd,
				td
			] }],
			"drop-shadow-color": [{ "drop-shadow": N() }],
			grayscale: [{ grayscale: [
				"",
				X,
				Q,
				Z
			] }],
			"hue-rotate": [{ "hue-rotate": [
				X,
				Q,
				Z
			] }],
			invert: [{ invert: [
				"",
				X,
				Q,
				Z
			] }],
			saturate: [{ saturate: [
				X,
				Q,
				Z
			] }],
			sepia: [{ sepia: [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				Q,
				Z
			] }],
			"backdrop-blur": [{ "backdrop-blur": se() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				X,
				Q,
				Z
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				X,
				Q,
				Z
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				X,
				Q,
				Z
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				X,
				Q,
				Z
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				X,
				Q,
				Z
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				X,
				Q,
				Z
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				Q,
				Z
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				X,
				"initial",
				Q,
				Z
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				Q,
				Z
			] }],
			delay: [{ delay: [
				X,
				Q,
				Z
			] }],
			animate: [{ animate: [
				"none",
				v,
				Q,
				Z
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				Q,
				Z
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ce() }],
			"rotate-x": [{ "rotate-x": ce() }],
			"rotate-y": [{ "rotate-y": ce() }],
			"rotate-z": [{ "rotate-z": ce() }],
			scale: [{ scale: le() }],
			"scale-x": [{ "scale-x": le() }],
			"scale-y": [{ "scale-y": le() }],
			"scale-z": [{ "scale-z": le() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ue() }],
			"skew-x": [{ "skew-x": ue() }],
			"skew-y": [{ "skew-y": ue() }],
			transform: [{ transform: [
				Q,
				Z,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: de() }],
			"translate-x": [{ "translate-x": de() }],
			"translate-y": [{ "translate-y": de() }],
			"translate-z": [{ "translate-z": de() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Ru,
				Q,
				Z
			] }],
			accent: [{ accent: N() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: N() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				Q,
				Z
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": N() }],
			"scrollbar-track-color": [{ "scrollbar-track": N() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				Q,
				Z
			] }],
			fill: [{ fill: ["none", ...N()] }],
			"stroke-w": [{ stroke: [
				X,
				nd,
				Yu,
				Xu
			] }],
			stroke: [{ stroke: ["none", ...N()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region src/lib/utils.ts
function yd(...e) {
	return $(je(e));
}
//#endregion
//#region src/components/ui/tabs.tsx
function bd({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, z.jsx)(Gl, {
		"data-slot": "tabs",
		"data-orientation": t,
		orientation: t,
		className: yd("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", e),
		...n
	});
}
var xd = Pe("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function Sd({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, z.jsx)(Kl, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: yd(xd({ variant: t }), e),
		...n
	});
}
function Cd({ className: e, ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(ql, {
		"data-slot": "tabs-trigger",
		className: yd("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent", "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100", e),
		...t
	});
}
function wd({ className: e, ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(Jl, {
		"data-slot": "tabs-content",
		className: yd("flex-1 outline-none", e),
		...t
	});
}
//#endregion
//#region src/components/ui/dialog.tsx
function Td({ ...e }) {
	return /* @__PURE__ */ (0, z.jsx)(Ti, {
		"data-slot": "dialog",
		...e
	});
}
function Ed({ ...e }) {
	return /* @__PURE__ */ (0, z.jsx)(ki, {
		"data-slot": "dialog-portal",
		...e
	});
}
function Dd({ className: e, ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(U, {
		"data-slot": "dialog-overlay",
		className: yd("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", e),
		...t
	});
}
function Od({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, z.jsxs)(Ed, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, z.jsx)(Dd, {}), /* @__PURE__ */ (0, z.jsxs)(Pi, {
			"data-slot": "dialog-content",
			className: yd("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg", e),
			...r,
			children: [t, n && /* @__PURE__ */ (0, z.jsxs)(Ui, {
				"data-slot": "dialog-close",
				className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ (0, z.jsx)(ke, {}), /* @__PURE__ */ (0, z.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function kd({ className: e, ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(zi, {
		"data-slot": "dialog-title",
		className: yd("text-lg leading-none font-semibold", e),
		...t
	});
}
function Ad({ className: e, ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(Vi, {
		"data-slot": "dialog-description",
		className: yd("text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region src/components/ui/select.tsx
function jd({ ...e }) {
	return /* @__PURE__ */ (0, z.jsx)(Bc, {
		"data-slot": "select",
		...e
	});
}
function Md({ ...e }) {
	return /* @__PURE__ */ (0, z.jsx)(Wc, {
		"data-slot": "select-value",
		...e
	});
}
function Nd({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, z.jsxs)(Hc, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: yd("flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", e),
		...r,
		children: [n, /* @__PURE__ */ (0, z.jsx)(Gc, {
			asChild: !0,
			children: /* @__PURE__ */ (0, z.jsx)(le, { className: "size-4 opacity-50" })
		})]
	});
}
function Pd({ className: e, children: t, position: n = "item-aligned", align: r = "center", ...i }) {
	return /* @__PURE__ */ (0, z.jsx)(Jc, { children: /* @__PURE__ */ (0, z.jsxs)(Xc, {
		"data-slot": "select-content",
		className: yd("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
		position: n,
		align: r,
		...i,
		children: [
			/* @__PURE__ */ (0, z.jsx)(Id, {}),
			/* @__PURE__ */ (0, z.jsx)(cl, {
				className: yd("p-1", n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
				children: t
			}),
			/* @__PURE__ */ (0, z.jsx)(Ld, {})
		]
	}) });
}
function Fd({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, z.jsxs)(ml, {
		"data-slot": "select-item",
		className: yd("relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, z.jsx)("span", {
			"data-slot": "select-item-indicator",
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, z.jsx)(vl, { children: /* @__PURE__ */ (0, z.jsx)(se, { className: "size-4" }) })
		}), /* @__PURE__ */ (0, z.jsx)(gl, { children: t })]
	});
}
function Id({ className: e, ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(bl, {
		"data-slot": "select-scroll-up-button",
		className: yd("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, z.jsx)(de, { className: "size-4" })
	});
}
function Ld({ className: e, ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(Sl, {
		"data-slot": "select-scroll-down-button",
		className: yd("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, z.jsx)(le, { className: "size-4" })
	});
}
//#endregion
//#region src/components/cover-picker.tsx
function Rd({ value: e, onPick: t }) {
	let [n, r] = (0, N.useState)(""), [i, a] = (0, N.useState)([]), [o, s] = (0, N.useState)(""), [c, l] = (0, N.useState)(!1), [u, d] = (0, N.useState)(""), f = (0, N.useRef)(0);
	async function p() {
		let e = ++f.current;
		l(!0), d(""), a([]);
		try {
			let t = await C("/api/cover-images", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url: n })
			}), r = await t.json();
			if (!t.ok) throw Error(r.error || "No s’han pogut llegir les imatges.");
			if (e !== f.current) return;
			a(r.images), s(r.pageUrl), r.images.length || d("No hi hem trobat cap imatge. Prova una altra pàgina o enganxa l’enllaç directe a la imatge.");
		} catch (t) {
			e === f.current && d(t.message);
		} finally {
			e === f.current && l(!1);
		}
	}
	return /* @__PURE__ */ (0, z.jsxs)("section", {
		className: "cover-picker",
		"aria-label": "Portada personalitzada",
		children: [
			/* @__PURE__ */ (0, z.jsx)("h3", {
				className: "form-section",
				children: "Portada"
			}),
			/* @__PURE__ */ (0, z.jsx)("p", {
				className: "muted",
				children: "Enganxa la pàgina on es veu la portada i tria la imatge correcta."
			}),
			/* @__PURE__ */ (0, z.jsxs)("div", {
				className: "cover-page-input",
				children: [/* @__PURE__ */ (0, z.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, z.jsx)("span", { children: "Pàgina amb la portada" }), /* @__PURE__ */ (0, z.jsx)("input", {
						type: "url",
						value: n,
						maxLength: 2048,
						placeholder: "https://editorial.cat/llibre",
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), !c && n.trim() && p());
						},
						onChange: (e) => {
							f.current++, r(e.target.value), a([]), d(""), l(!1);
						}
					})]
				}), /* @__PURE__ */ (0, z.jsx)("button", {
					type: "button",
					className: "secondary",
					onClick: () => void p(),
					disabled: c || !n.trim(),
					children: c ? "Cercant imatges…" : "Cerca imatges"
				})]
			}),
			u && /* @__PURE__ */ (0, z.jsx)("p", {
				className: "notice error",
				role: "alert",
				children: u
			}),
			i.length > 0 && /* @__PURE__ */ (0, z.jsx)("div", {
				className: "cover-options",
				children: i.map((n, r) => /* @__PURE__ */ (0, z.jsxs)("button", {
					type: "button",
					className: "cover-option",
					"aria-pressed": e === n.url,
					onClick: () => t(n.url, o),
					children: [/* @__PURE__ */ (0, z.jsx)("img", {
						src: n.url,
						alt: n.label || `Imatge ${r + 1}`,
						loading: "lazy",
						referrerPolicy: "no-referrer",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}), /* @__PURE__ */ (0, z.jsx)("span", { children: e === n.url ? "Portada seleccionada" : `Tria la imatge ${r + 1}` })]
				}, n.url))
			}),
			/* @__PURE__ */ (0, z.jsxs)("label", {
				className: "field",
				children: [/* @__PURE__ */ (0, z.jsx)("span", { children: "O enganxa l’enllaç directe a la imatge (HTTPS)" }), /* @__PURE__ */ (0, z.jsx)("input", {
					type: "url",
					value: e,
					maxLength: 2048,
					onChange: (e) => t(e.target.value, "")
				})]
			}),
			e && /* @__PURE__ */ (0, z.jsxs)("div", {
				className: "cover-current",
				children: [/* @__PURE__ */ (0, z.jsx)("img", {
					src: e,
					alt: "Previsualització de la portada seleccionada",
					referrerPolicy: "no-referrer"
				}), /* @__PURE__ */ (0, z.jsx)("p", {
					className: "small-note",
					children: "Aquesta portada es guardarà quan premis «Desa la lectura». Canviar-la no confirma ni modifica l’edició."
				})]
			})
		]
	});
}
//#endregion
//#region src/components/ui/checkbox.tsx
function zd({ className: e, ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(ia, {
		"data-slot": "checkbox",
		className: yd("peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, z.jsx)(oa, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none",
			children: /* @__PURE__ */ (0, z.jsx)(se, { className: "size-3.5" })
		})
	});
}
//#endregion
//#region src/data/catalog-supplement.json
var Bd = /* @__PURE__ */ JSON.parse("[{\"id\":\"publisher:9788412363357\",\"source\":\"https://www.maimes.cat/dune-duna/\",\"title\":\"Dune / Duna (tapa dura)\",\"author\":\"Frank Herbert\",\"publisher\":\"Mai Més / Raig Verd (Duna Llibres)\",\"year\":\"2021\",\"isbn\":\"9788412363357\",\"language\":\"ca\",\"pages\":\"768\",\"translator\":\"Manuel de Seabra\",\"coverUrl\":\"https://www.maimes.cat/wp-content/uploads/2021/12/dune-tapa-dura-frank-herbert.jpg\",\"originalYear\":\"1965\",\"originalTitle\":\"\",\"workSource\":\"https://www.maimes.cat/dune-duna/\",\"score\":0,\"matchTitles\":[\"Dune\",\"Duna\"]},{\"id\":\"publisher:9788412614404\",\"source\":\"https://www.maimes.cat/el-messies-de-dune/\",\"title\":\"El messies de Dune (tapa dura)\",\"author\":\"Frank Herbert\",\"publisher\":\"Duna Llibres / Mai Més / Raig Verd\",\"year\":\"2023\",\"isbn\":\"9788412614404\",\"language\":\"ca\",\"pages\":\"320\",\"translator\":\"Lluís Delgado\",\"coverUrl\":\"https://www.maimes.cat/wp-content/uploads/2023/01/el-messies-de-dune-limitada-frank-herbert.jpg\",\"originalYear\":\"1969\",\"originalTitle\":\"\",\"workSource\":\"https://www.maimes.cat/el-messies-de-dune/\",\"score\":0,\"matchTitles\":[\"El messies de Dune\"]},{\"id\":\"publisher:9788412838527\",\"source\":\"https://www.udllibros.com/libro-ELS_FILLS_DE_DUNE_(TAPA_DURA)__CAT-S270010011\",\"title\":\"Els fills de Dune (tapa dura)\",\"author\":\"Frank Herbert\",\"publisher\":\"Duna Llibres\",\"year\":\"2024\",\"isbn\":\"9788412838527\",\"language\":\"ca\",\"pages\":\"600\",\"translator\":\"Lluís Delgado\",\"coverUrl\":\"https://www.udllibros.com/imagenes/9788412/978841283852.JPG\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Els fills de Dune\"]},{\"id\":\"publisher:9788412838534\",\"source\":\"https://www.agapea.com/Frank-Herbert/Els-fills-de-Dune-rustica--9788412838534-i.htm\",\"title\":\"Els fills de Dune (rústica)\",\"author\":\"Frank Herbert\",\"publisher\":\"Duna Llibres\",\"year\":\"2024\",\"isbn\":\"9788412838534\",\"language\":\"ca\",\"pages\":\"600\",\"translator\":\"\",\"coverUrl\":\"\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Els fills de Dune\"]},{\"id\":\"publisher:9788412848403\",\"source\":\"https://www.documenta-bcn.com/la-policia-ira-de-bolit\",\"title\":\"La policia irà de bòlit\",\"author\":\"Enric Casasses\",\"publisher\":\"Documents Documenta\",\"year\":\"2025\",\"isbn\":\"9788412848403\",\"language\":\"ca\",\"pages\":\"232\",\"translator\":\"\",\"coverUrl\":\"https://www.documenta-bcn.com/media/products/361318/361318-0-med.jpg\",\"originalYear\":\"2025\",\"originalTitle\":\"\",\"workSource\":\"https://www.documenta-bcn.com/la-policia-ira-de-bolit\",\"score\":0,\"matchTitles\":[\"La policia irà de bòlid\",\"La policia irà de bòlit\"]},{\"id\":\"publisher:9788419721655\",\"source\":\"https://universeditorial.com/llibres/manual-de-defensa-del-catala/\",\"title\":\"Manual de defensa del català\",\"author\":\"Òscar Andreu\",\"publisher\":\"Univers\",\"year\":\"2026\",\"isbn\":\"9788419721655\",\"language\":\"ca\",\"pages\":\"80\",\"translator\":\"\",\"coverUrl\":\"https://universeditorial.com/wp-content/uploads/2026/04/AAFF-Manual-Sobrecoberta-Fase10.jpg\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Manual de defensa del català\"]},{\"id\":\"malesherbes:jo-nomes-illumino-la-catalana-terra\",\"source\":\"https://editorialmalesherbes.com/cataleg/jo-nomes-illumino-la-catalana-terra\",\"title\":\"Jo només il·lumino la catalana terra\",\"author\":\"Valero Sanmartí\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788412316506\",\"language\":\"ca\",\"pages\":\"205\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/valero_portada_taronja\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Jo només il.lumino la catalana terra\"]},{\"id\":\"malesherbes:pistola-amb-musica-de-fons\",\"source\":\"https://editorialmalesherbes.com/cataleg/pistola-amb-musica-de-fons\",\"title\":\"Pistola, amb música de fons\",\"author\":\"Jonathan Lethem\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788494051470\",\"language\":\"ca\",\"pages\":\"304\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/portadaweb_lethem_gran\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Pistola amb música de fons\"]},{\"id\":\"malesherbes:los-del-sud-us-matarem-a-tots\",\"source\":\"https://editorialmalesherbes.com/cataleg/los-del-sud-us-matarem-a-tots\",\"title\":\"Los del sud us matarem a tots\",\"author\":\"Valero Sanmartí\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788494469930\",\"language\":\"ca\",\"pages\":\"245\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/losdelsud_portada_web\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Los del sud ud matarem a tots\"]},{\"id\":\"malesherbes:satellits\",\"source\":\"https://editorialmalesherbes.com/cataleg/satellits\",\"title\":\"Satèl·lits\",\"author\":\"Elisenda Solsona\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788494917073\",\"language\":\"ca\",\"pages\":\"221\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/portadaweb_satelits\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Satèl.lits\"]},{\"id\":\"malesherbes:història-de-lunivers\",\"source\":\"https://editorialmalesherbes.com/cataleg/hist%C3%B2ria-de-lunivers\",\"title\":\"Història de l'univers\",\"author\":\"Pau Riba\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788412216776\",\"language\":\"ca\",\"pages\":\"180\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/univers_portada\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Història de l'Univers\"]},{\"id\":\"malesherbes:història-de-la-música-del-s-xx-lelectrònica\",\"source\":\"https://editorialmalesherbes.com/cataleg/hist%C3%B2ria-de-la-m%C3%BAsica-del-s-xx-lelectr%C3%B2nica\",\"title\":\"Història de la música del s. XX (L'electrònica)\",\"author\":\"Pau Riba\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788412316599\",\"language\":\"ca\",\"pages\":\"427\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/musica_portada\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Hstòria de la música del segle XX (l'electrònica)\"]},{\"id\":\"malesherbes:opera-acid\",\"source\":\"https://editorialmalesherbes.com/cataleg/opera-acid\",\"title\":\"Òpera Àcid\",\"author\":\"Miquel Creus\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788494917097\",\"language\":\"ca\",\"pages\":\"144\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/oa_portada\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Òpera àcid\"]},{\"id\":\"malesherbes:lhivern-a-corfu\",\"source\":\"https://editorialmalesherbes.com/cataleg/lhivern-a-corfu\",\"title\":\"L'hivern a Corfú\",\"author\":\"Jordi Masó Rahola\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788494917035\",\"language\":\"ca\",\"pages\":\"186\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/portadaweb_hivern\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"L'hivern a Corfú\"]},{\"id\":\"malesherbes:alteracions\",\"source\":\"https://editorialmalesherbes.com/cataleg/alteracions\",\"title\":\"Alteracions\",\"author\":\"Adrià Pujol\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788494051487\",\"language\":\"ca\",\"pages\":\"150\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/alteracions_portada\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Alteracions\"]},{\"id\":\"malesherbes:la-cremallera\",\"source\":\"https://editorialmalesherbes.com/cataleg/la-cremallera\",\"title\":\"La cremallera\",\"author\":\"Martí Sales\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788494587726\",\"language\":\"ca\",\"pages\":\"117\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/lacremallera\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"La cremallera\"]},{\"id\":\"malesherbes:la-barca-disis\",\"source\":\"https://editorialmalesherbes.com/cataleg/la-barca-disis\",\"title\":\"La barca d'Isis (2a edició)\",\"author\":\"Joan Oller i Rabassa\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788494188817\",\"language\":\"ca\",\"pages\":\"220\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/barca_portada\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"La barca d'Isis\"]},{\"id\":\"malesherbes:nosaltres\",\"source\":\"https://editorialmalesherbes.com/cataleg/nosaltres\",\"title\":\"Nosaltres\",\"author\":\"Ievgueni Zamiatin\",\"publisher\":\"Males Herbes\",\"year\":\"\",\"isbn\":\"9788412070521\",\"language\":\"ca\",\"pages\":\"255\",\"translator\":\"\",\"coverUrl\":\"https://res.cloudinary.com/dtmleo1sz/image/upload/w_400,f_auto/malesherbes/cataleg/portadaweb_nosaltres2\",\"originalYear\":\"\",\"originalTitle\":\"\",\"workSource\":\"\",\"score\":0,\"matchTitles\":[\"Nosaltres\"]}]"), Vd = (e) => e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(), Hd = () => ({
	id: crypto.randomUUID(),
	title: "",
	author: "",
	publisher: "",
	recordedYear: "",
	originalYear: "",
	originalTitle: "",
	editionYear: "",
	isbn: "",
	language: "",
	translator: "",
	pages: "",
	coverUrl: "",
	coverStatus: "missing",
	read: !0,
	finishedOn: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"),
	place: "",
	summary: "",
	editionStatus: "pending",
	editionSource: "",
	editionId: "",
	workSource: "",
	version: 0
}), Ud = (e) => e ? new Intl.DateTimeFormat("ca", {
	day: "numeric",
	month: "long",
	year: "numeric"
}).format(/* @__PURE__ */ new Date(e + "T12:00:00")) : "Sense data", Wd = /* @__PURE__ */ new Map();
function Gd(e, t = !1) {
	let n = [
		e.title,
		e.author,
		e.publisher,
		e.isbn
	].join("|");
	return t && Wd.delete(n), Wd.has(n) || Wd.set(n, C("/api/editions?" + new URLSearchParams({
		title: e.title,
		author: e.author,
		publisher: e.publisher,
		isbn: e.isbn,
		...t ? { refresh: "1" } : {}
	})).then(async (e) => {
		let t = await e.json();
		if (!e.ok) throw Error(t.error);
		return t;
	}).catch((e) => {
		throw Wd.delete(n), e;
	})), Wd.get(n);
}
function Kd({ book: e, suggested: t }) {
	let [n, r] = (0, N.useState)(!1), i = e.coverUrl || t?.coverUrl || "";
	return (0, N.useEffect)(() => r(!1), [i]), /* @__PURE__ */ (0, z.jsxs)("div", {
		className: "cover-wrap",
		children: [i && !n ? /* @__PURE__ */ (0, z.jsx)("img", {
			src: i,
			alt: "Portada de " + e.title,
			loading: "lazy",
			referrerPolicy: "no-referrer",
			onError: () => r(!0)
		}) : /* @__PURE__ */ (0, z.jsxs)("div", {
			className: "cover-placeholder",
			children: [
				/* @__PURE__ */ (0, z.jsx)(ae, { "aria-hidden": "true" }),
				/* @__PURE__ */ (0, z.jsx)("span", { children: e.title }),
				/* @__PURE__ */ (0, z.jsx)("small", { children: e.author })
			]
		}), !i || n ? /* @__PURE__ */ (0, z.jsx)("span", {
			className: "cover-label",
			children: "Portada no disponible"
		}) : e.coverStatus !== "confirmed" && /* @__PURE__ */ (0, z.jsx)("span", {
			className: "cover-label",
			children: "Portada orientativa"
		})]
	});
}
function qd({ label: e, value: t, onChange: n, options: r }) {
	return /* @__PURE__ */ (0, z.jsxs)(jd, {
		value: t,
		onValueChange: n,
		children: [/* @__PURE__ */ (0, z.jsx)(Nd, {
			className: "filter",
			"aria-label": e,
			children: /* @__PURE__ */ (0, z.jsx)(Md, {})
		}), /* @__PURE__ */ (0, z.jsx)(Pd, { children: r.map(([e, t]) => /* @__PURE__ */ (0, z.jsx)(Fd, {
			value: e,
			children: t
		}, e)) })]
	});
}
function Jd({ label: e, value: t, onChange: n, type: r = "text", wide: i = !1 }) {
	return /* @__PURE__ */ (0, z.jsxs)("label", {
		className: "field" + (i ? " wide" : ""),
		children: [/* @__PURE__ */ (0, z.jsx)("span", { children: e }), /* @__PURE__ */ (0, z.jsx)("input", {
			type: r,
			value: t,
			onChange: (e) => n(e.target.value),
			maxLength: r === "url" ? 2048 : 500
		})]
	});
}
function Yd({ initial: e, canEdit: t, onSaved: n, onClose: r, suggested: i, startEditing: a }) {
	let [o, s] = (0, N.useState)({ ...e }), [c, l] = (0, N.useState)(a), [u, d] = (0, N.useState)(null), [f, p] = (0, N.useState)(!1), [m, h] = (0, N.useState)(""), [g, _] = (0, N.useState)(""), [v, y] = (0, N.useState)(!1), [b, x] = (0, N.useState)(!1), [S, w] = (0, N.useState)(""), [T, E] = (0, N.useState)(!1), [ee, D] = (0, N.useState)(e.editionStatus === "pending"), [O, te] = (0, N.useState)(e.editionStatus === "none"), [k, A] = (0, N.useState)(!1), j = (0, N.useRef)(0), M = (e) => {
		s((t) => ({
			...t,
			...e
		})), x(!0);
	}, ne = (e, t) => {
		M({
			[e]: t,
			editionStatus: "pending",
			editionId: "",
			editionSource: "",
			coverUrl: "",
			coverSource: "",
			coverStatus: "missing",
			isbn: "",
			editionYear: "",
			language: "",
			translator: "",
			pages: "",
			originalYear: "",
			workSource: ""
		}), D(!0), te(!1);
	};
	async function P(e = !1) {
		if (o.title.trim().length < 2 && !o.isbn) return;
		let t = ++j.current;
		p(!0), h(""), d(null);
		try {
			let n = await Gd(o, e);
			if (t !== j.current) return;
			d(n), w(o.publisher), E(!1);
		} catch (e) {
			t === j.current && h(e.message);
		} finally {
			t === j.current && p(!1);
		}
	}
	(0, N.useEffect)(() => {
		if (!ee) return;
		let e = setTimeout(() => {
			P();
		}, 700);
		return () => {
			clearTimeout(e), j.current++;
		};
	}, [
		o.title,
		o.author,
		o.publisher,
		o.isbn,
		ee
	]), (0, N.useEffect)(() => {
		if (!b) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [b]);
	let re = () => {
		b ? A(!0) : r();
	}, ie = (e) => {
		M({
			author: e.author || o.author,
			publisher: e.publisher || o.publisher,
			isbn: e.isbn,
			editionYear: e.year,
			language: e.language,
			pages: e.pages,
			translator: e.translator,
			coverUrl: e.coverUrl,
			coverSource: "",
			coverStatus: e.coverUrl ? "confirmed" : "missing",
			editionStatus: "confirmed",
			editionId: e.id,
			editionSource: e.source,
			originalYear: e.originalYear,
			originalTitle: e.originalTitle,
			workSource: e.workSource
		}), D(!1), te(!1), l(!0);
	};
	async function F() {
		if (!o.title.trim()) {
			_("Escriu el títol del llibre.");
			return;
		}
		y(!0), _("");
		try {
			let e = await C("/api/books", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(o)
			}), t = await e.json();
			if (!e.ok) throw Error(t.error);
			x(!1), n(t.book);
		} catch (e) {
			_(e.message);
		} finally {
			y(!1);
		}
	}
	let I = (u?.candidates ?? []).filter((e) => {
		let t = Vd(S), n = Vd(e.publisher);
		return t && n && (n.includes(t) || t.includes(n));
	}), L = T || I.length === 0 ? u?.candidates ?? [] : I;
	return /* @__PURE__ */ (0, z.jsx)(Td, {
		open: !0,
		onOpenChange: (e) => {
			!e && !v && re();
		},
		children: /* @__PURE__ */ (0, z.jsxs)(Od, {
			className: "book-dialog",
			showCloseButton: !1,
			onEscapeKeyDown: (e) => {
				e.preventDefault(), v || re();
			},
			onPointerDownOutside: (e) => {
				e.preventDefault(), v || re();
			},
			children: [
				/* @__PURE__ */ (0, z.jsx)("button", {
					"aria-label": "Tanca la fitxa",
					className: "close-dialog",
					onClick: re,
					disabled: v,
					children: /* @__PURE__ */ (0, z.jsx)(ke, { size: 20 })
				}),
				/* @__PURE__ */ (0, z.jsxs)("div", {
					className: "dialog-intro",
					children: [
						/* @__PURE__ */ (0, z.jsx)("p", {
							className: "eyebrow",
							children: e.version === 0 ? "NOVA LECTURA" : "EL MEU QUADERN"
						}),
						/* @__PURE__ */ (0, z.jsx)(kd, {
							className: "dialog-title",
							children: c ? e.version === 0 ? "Afegir un llibre" : "Editar la lectura" : o.title
						}),
						/* @__PURE__ */ (0, z.jsx)(Ad, {
							className: "muted",
							children: c ? "Les dades i els records es desaran quan premis «Desa la lectura»." : o.author || "Autor pendent"
						})
					]
				}),
				k ? /* @__PURE__ */ (0, z.jsxs)("div", {
					className: "notice",
					children: [/* @__PURE__ */ (0, z.jsx)("p", { children: "Tens canvis sense desar. Vols continuar editant o descartar-los?" }), /* @__PURE__ */ (0, z.jsxs)("div", {
						className: "actions",
						style: { marginTop: 12 },
						children: [/* @__PURE__ */ (0, z.jsx)("button", {
							className: "primary",
							onClick: () => A(!1),
							children: "Continua editant"
						}), /* @__PURE__ */ (0, z.jsx)("button", {
							className: "secondary",
							onClick: r,
							children: "Descarta els canvis"
						})]
					})]
				}) : null,
				c ? /* @__PURE__ */ (0, z.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault(), F();
					},
					children: [
						/* @__PURE__ */ (0, z.jsxs)("div", {
							className: "field-grid editor-top",
							children: [
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Títol *",
									value: o.title,
									onChange: (e) => ne("title", e),
									wide: !0
								}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Autor",
									value: o.author,
									onChange: (e) => ne("author", e)
								}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Editorial que vas llegir",
									value: o.publisher,
									onChange: (e) => ne("publisher", e)
								})
							]
						}),
						/* @__PURE__ */ (0, z.jsx)("h3", {
							className: "form-section",
							children: "La meva lectura"
						}),
						/* @__PURE__ */ (0, z.jsxs)("div", {
							className: "field-grid",
							children: [
								/* @__PURE__ */ (0, z.jsxs)("label", {
									className: "checkbox-field",
									children: [/* @__PURE__ */ (0, z.jsx)(zd, {
										checked: o.read,
										onCheckedChange: (e) => M({ read: e === !0 })
									}), "Ja l’he llegit"]
								}),
								/* @__PURE__ */ (0, z.jsx)("div", {}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Dia que el vaig acabar",
									type: "date",
									value: o.finishedOn,
									onChange: (e) => M({ finishedOn: e })
								}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Lloc",
									value: o.place,
									onChange: (e) => M({ place: e })
								}),
								/* @__PURE__ */ (0, z.jsxs)("label", {
									className: "field wide",
									children: ["El meu resum o record", /* @__PURE__ */ (0, z.jsx)("textarea", {
										value: o.summary,
										maxLength: 4e4,
										onChange: (e) => M({ summary: e.target.value }),
										placeholder: "Què en vols recordar?"
									})]
								})
							]
						}),
						o.editionStatus === "confirmed" && /* @__PURE__ */ (0, z.jsxs)("div", {
							className: "notice",
							style: { marginTop: 20 },
							children: [
								/* @__PURE__ */ (0, z.jsx)(se, {
									size: 16,
									style: {
										display: "inline",
										marginRight: 6
									}
								}),
								"Edició seleccionada: ",
								o.publisher,
								" · ",
								o.editionYear || "any no disponible",
								" · ISBN ",
								o.isbn || "no disponible al catàleg",
								/* @__PURE__ */ (0, z.jsx)("button", {
									type: "button",
									className: "text-button",
									onClick: () => D(!0),
									children: "Canvia l’edició"
								})
							]
						}),
						(o.editionStatus === "confirmed" || O) && /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)("h3", {
							className: "form-section",
							children: "Dades de l’obra i l’edició"
						}), /* @__PURE__ */ (0, z.jsxs)("div", {
							className: "field-grid",
							children: [
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "ISBN de l’edició",
									value: o.isbn,
									onChange: (e) => M({ isbn: e })
								}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Any de l’edició",
									value: o.editionYear,
									onChange: (e) => M({ editionYear: e })
								}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Primera publicació de l’obra",
									value: o.originalYear,
									onChange: (e) => M({ originalYear: e })
								}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Idioma",
									value: o.language,
									onChange: (e) => M({ language: e })
								}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Traductor/a",
									value: o.translator,
									onChange: (e) => M({ translator: e })
								}),
								/* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Pàgines",
									value: o.pages,
									onChange: (e) => M({ pages: e })
								}),
								O && /* @__PURE__ */ (0, z.jsx)(Jd, {
									label: "Font de les dades de l’edició (HTTPS)",
									type: "url",
									value: o.editionSource,
									onChange: (e) => M({ editionSource: e }),
									wide: !0
								})
							]
						})] }),
						/* @__PURE__ */ (0, z.jsx)(Rd, {
							value: o.coverUrl,
							onPick: (e, t) => M({
								coverUrl: e,
								coverSource: t,
								coverStatus: e ? "confirmed" : "missing"
							})
						})
					]
				}) : /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [
					/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "detail-grid",
						children: [/* @__PURE__ */ (0, z.jsxs)("div", {
							className: "detail-cover",
							children: [/* @__PURE__ */ (0, z.jsx)(Kd, {
								book: o,
								suggested: i
							}), o.editionStatus === "confirmed" ? /* @__PURE__ */ (0, z.jsxs)("span", {
								className: "tag",
								children: [/* @__PURE__ */ (0, z.jsx)(se, { size: 13 }), " Edició confirmada"]
							}) : /* @__PURE__ */ (0, z.jsx)("span", {
								className: "tag",
								children: o.editionStatus === "none" ? "Edició no trobada" : "Edició per confirmar"
							})]
						}), /* @__PURE__ */ (0, z.jsx)("div", { children: /* @__PURE__ */ (0, z.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Lectura" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.read ? Ud(o.finishedOn) : "Encara no marcat com a llegit" })] }),
							/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Lloc" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.place || "—" })] }),
							/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Editorial" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.publisher || "—" })] }),
							/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Any de l’edició" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.editionYear || "Pendent de confirmar" })] }),
							/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Primera publicació de l’obra" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.originalYear || "Pendent de documentar" })] }),
							/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "ISBN de l’edició" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.isbn || "Pendent" })] }),
							o.language && /* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Idioma" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.language })] }),
							o.pages && /* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Pàgines" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.pages })] }),
							o.translator && /* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Traducció" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.translator })] }),
							o.recordedYear && /* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("dt", { children: "Any anotat a l’Excel" }), /* @__PURE__ */ (0, z.jsx)("dd", { children: o.recordedYear })] }),
							o.editionSource && /* @__PURE__ */ (0, z.jsx)("div", {
								className: "full",
								children: /* @__PURE__ */ (0, z.jsx)("a", {
									className: "link",
									href: o.editionSource,
									target: "_blank",
									rel: "noreferrer",
									children: "Fitxa de l’edició al catàleg ↗"
								})
							}),
							o.coverSource && /* @__PURE__ */ (0, z.jsx)("div", {
								className: "full",
								children: /* @__PURE__ */ (0, z.jsx)("a", {
									className: "link",
									href: o.coverSource,
									target: "_blank",
									rel: "noreferrer",
									children: "Font de la portada ↗"
								})
							}),
							o.workSource && /* @__PURE__ */ (0, z.jsx)("div", {
								className: "full",
								children: /* @__PURE__ */ (0, z.jsx)("a", {
									className: "link",
									href: o.workSource,
									target: "_blank",
									rel: "noreferrer",
									children: "Font de la primera publicació ↗"
								})
							})
						] }) })]
					}),
					/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "personal-note",
						children: [/* @__PURE__ */ (0, z.jsx)("h3", { children: "El meu record" }), /* @__PURE__ */ (0, z.jsx)("p", { children: o.summary || "Encara no hi ha cap record escrit." })]
					}),
					t && /* @__PURE__ */ (0, z.jsxs)("div", {
						className: "actions",
						style: { marginTop: 15 },
						children: [/* @__PURE__ */ (0, z.jsxs)("button", {
							className: "primary",
							onClick: () => l(!0),
							children: [/* @__PURE__ */ (0, z.jsx)(xe, { size: 16 }), "Edita la lectura"]
						}), !ee && /* @__PURE__ */ (0, z.jsx)("button", {
							className: "secondary",
							onClick: () => D(!0),
							children: "Cerca una altra edició"
						})]
					})
				] }),
				ee && /* @__PURE__ */ (0, z.jsxs)("section", {
					className: "edition-area",
					children: [
						/* @__PURE__ */ (0, z.jsxs)("div", {
							className: "actions",
							style: { justifyContent: "space-between" },
							children: [/* @__PURE__ */ (0, z.jsx)("h3", {
								className: "form-section",
								children: "Quina edició vas llegir?"
							}), /* @__PURE__ */ (0, z.jsxs)("button", {
								className: "text-button",
								onClick: () => void P(!0),
								disabled: f || o.title.trim().length < 2,
								children: [/* @__PURE__ */ (0, z.jsx)(Te, { size: 15 }), "Torna a cercar"]
							})]
						}),
						/* @__PURE__ */ (0, z.jsx)("p", {
							className: "muted",
							children: "La cerca és automàtica. Compara l’editorial, l’any i la portada abans de triar."
						}),
						f && /* @__PURE__ */ (0, z.jsx)("p", {
							className: "notice",
							role: "status",
							style: { marginTop: 15 },
							children: "Cercant edicions als catàlegs i a les editorials…"
						}),
						m && /* @__PURE__ */ (0, z.jsx)("p", {
							className: "notice error",
							role: "alert",
							style: { marginTop: 15 },
							children: m
						}),
						u?.warnings.map((e) => /* @__PURE__ */ (0, z.jsx)("p", {
							className: "small-note",
							children: e
						}, e)),
						u && !f && /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [
							/* @__PURE__ */ (0, z.jsxs)("div", {
								className: "statusline",
								children: [/* @__PURE__ */ (0, z.jsx)("span", { children: I.length && !T ? I.length + " opcions de l’editorial indicada" : L.length + " possibles edicions" }), I.length > 0 && !T && /* @__PURE__ */ (0, z.jsx)("button", {
									className: "text-button",
									onClick: () => E(!0),
									children: "Mostra també altres editorials"
								})]
							}),
							!I.length && S && L.length > 0 && /* @__PURE__ */ (0, z.jsxs)("p", {
								className: "small-note",
								children: [
									"No hem trobat una coincidència amb «",
									S,
									"». Aquestes són alternatives per revisar."
								]
							}),
							/* @__PURE__ */ (0, z.jsx)("div", {
								className: "edition-grid",
								children: L.map((e) => /* @__PURE__ */ (0, z.jsxs)("article", {
									className: "edition-card",
									children: [
										e.coverUrl ? /* @__PURE__ */ (0, z.jsx)("img", {
											src: e.coverUrl,
											alt: "Portada: " + e.title,
											loading: "lazy",
											referrerPolicy: "no-referrer",
											onError: (e) => {
												e.currentTarget.style.visibility = "hidden";
											}
										}) : /* @__PURE__ */ (0, z.jsx)(ae, {
											size: 40,
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, z.jsxs)("div", { children: [
											/* @__PURE__ */ (0, z.jsx)("h3", { children: e.title }),
											/* @__PURE__ */ (0, z.jsx)("p", { children: e.author }),
											/* @__PURE__ */ (0, z.jsxs)("p", { children: [
												/* @__PURE__ */ (0, z.jsx)("strong", { children: e.publisher || "Editorial no indicada" }),
												" · ",
												e.year || "Any no indicat"
											] }),
											/* @__PURE__ */ (0, z.jsxs)("p", { children: [e.language || "Idioma no indicat", e.pages ? " · " + e.pages + " pàgines" : ""] }),
											/* @__PURE__ */ (0, z.jsxs)("p", { children: ["ISBN: ", e.isbn || "No disponible"] }),
											/* @__PURE__ */ (0, z.jsx)("a", {
												className: "catalog-link link",
												href: e.source,
												target: "_blank",
												rel: "noreferrer",
												children: "Consulta la fitxa ↗"
											})
										] }),
										t && /* @__PURE__ */ (0, z.jsxs)("button", {
											className: "secondary",
											onClick: () => ie(e),
											children: [/* @__PURE__ */ (0, z.jsx)(se, { size: 15 }), "És aquesta edició"]
										})
									]
								}, e.id))
							}),
							!L.length && /* @__PURE__ */ (0, z.jsx)("p", {
								className: "notice",
								children: "No s’han trobat edicions. Pots ajustar el títol o l’editorial, reintentar-ho o completar les dades manualment."
							})
						] }),
						t && /* @__PURE__ */ (0, z.jsx)("button", {
							className: "secondary",
							onClick: () => {
								M({
									editionStatus: "none",
									editionId: "",
									editionSource: "",
									isbn: "",
									editionYear: "",
									language: "",
									translator: "",
									pages: "",
									coverUrl: "",
									coverSource: "",
									coverStatus: "missing"
								}), te(!0), D(!1), l(!0);
							},
							children: "Cap d’aquestes · completar manualment"
						})
					]
				}),
				g && /* @__PURE__ */ (0, z.jsx)("p", {
					className: "notice error",
					role: "alert",
					children: g
				}),
				/* @__PURE__ */ (0, z.jsx)("div", {
					className: "dialog-bottom",
					children: c && t ? /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)("button", {
						className: "secondary",
						disabled: v,
						onClick: re,
						children: "Cancel·la"
					}), /* @__PURE__ */ (0, z.jsx)("button", {
						className: "primary",
						disabled: v || !o.title.trim(),
						onClick: () => void F(),
						children: v ? "Desant…" : "Desa la lectura"
					})] }) : /* @__PURE__ */ (0, z.jsx)("button", {
						className: "secondary",
						onClick: re,
						children: "Tanca"
					})
				})
			]
		})
	});
}
function Xd({ initialBooks: e }) {
	let [t, n] = (0, N.useState)(e), [r, i] = (0, N.useState)(!1), [a, o] = (0, N.useState)(!1), [s, c] = (0, N.useState)(!1), [l, u] = (0, N.useState)("library"), [d, f] = (0, N.useState)(""), [p, m] = (0, N.useState)("read"), [h, g] = (0, N.useState)("all"), [_, y] = (0, N.useState)("recent"), [b, x] = (0, N.useState)(24), [S, E] = (0, N.useState)(null), [ee, D] = (0, N.useState)(!1), [O, te] = (0, N.useState)(""), [k, A] = (0, N.useState)(""), [j, M] = (0, N.useState)(() => Object.fromEntries(e.flatMap((e) => {
		let t = Bd.find((t) => t.coverUrl && t.matchTitles?.some((t) => Vd(t) === Vd(e.title)));
		return t ? [[e.id, t]] : [];
	}))), [ne, P] = (0, N.useState)(!1), re = (0, N.useRef)(/* @__PURE__ */ new Set()), ie = (0, N.useRef)(S);
	ie.current = S;
	let F = (0, N.useCallback)(async () => {
		try {
			let e = await C("/api/books"), t = await e.json();
			if (!e.ok) throw Error(t.error);
			n(t.books), M((e) => ({
				...Object.fromEntries(t.books.flatMap((e) => {
					let t = Bd.find((t) => t.coverUrl && t.matchTitles?.some((t) => Vd(t) === Vd(e.title)));
					return t ? [[e.id, t]] : [];
				})),
				...e
			})), o(t.canEdit), c(t.signedIn), i(!0), te("");
		} catch (e) {
			te(e.message);
		}
	}, []);
	(0, N.useEffect)(() => {
		F();
		let e = () => {
			ie.current || F();
		};
		window.addEventListener("focus", e);
		let t = setInterval(() => {
			document.visibilityState === "visible" && e();
		}, 3e4);
		return () => {
			window.removeEventListener("focus", e), clearInterval(t);
		};
	}, [F]), (0, N.useEffect)(() => {
		x(24);
	}, [
		d,
		h,
		p,
		_
	]);
	let I = (0, N.useMemo)(() => Array.from(new Set(t.map((e) => e.finishedOn.slice(0, 4)).filter(Boolean))).sort().reverse(), [t]), R = (0, N.useMemo)(() => t.filter((e) => (p === "all" || p === "read" && e.read || p === "unread" && !e.read || p === "pending" && e.editionStatus !== "confirmed") && (h === "all" || e.finishedOn.startsWith(h)) && Vd([
		e.title,
		e.author,
		e.publisher,
		e.summary,
		e.place,
		e.isbn
	].join(" ")).includes(Vd(d))).sort((e, t) => _ === "title" ? e.title.localeCompare(t.title, "ca") : _ === "oldest" ? e.finishedOn.localeCompare(t.finishedOn) : t.finishedOn.localeCompare(e.finishedOn)), [
		t,
		p,
		h,
		d,
		_
	]), oe = R.slice(0, b);
	(0, N.useEffect)(() => {
		if (!r) return;
		let e = !1;
		async function t() {
			P(!0);
			for (let t of oe) {
				if (e) break;
				let n = [
					t.id,
					t.title,
					t.author,
					t.publisher
				].join("|");
				if (!(t.coverUrl || t.editionStatus === "none" || re.current.has(n))) {
					re.current.add(n);
					try {
						let n = (await Gd(t)).candidates.find((e) => e.coverUrl && e.score >= 35);
						n && !e && M((e) => ({
							...e,
							[t.id]: n
						}));
					} catch {}
					await new Promise((e) => setTimeout(e, 1100));
				}
			}
			e || P(!1);
		}
		return t(), () => {
			e = !0;
		};
	}, [
		r,
		R,
		b
	]), (0, N.useEffect)(() => {
		let e = document.modelContext;
		if (!e?.registerTool) return;
		let n = new AbortController(), r = (t) => {
			try {
				Promise.resolve(e.registerTool(t, { signal: n.signal })).catch(() => {});
			} catch {}
		};
		return r({
			name: "search_reading_log",
			description: "Search the saved reading log and show matching books.",
			inputSchema: {
				type: "object",
				properties: { query: { type: "string" } },
				required: ["query"],
				additionalProperties: !1
			},
			annotations: {
				readOnlyHint: !0,
				untrustedContentHint: !0
			},
			execute: (e) => {
				let n = e?.query;
				if (typeof n != "string" || n.length > 500) throw Error("Cal una cerca de text de fins a 500 caràcters.");
				return m("all"), g("all"), f(n), t.filter((e) => Vd([
					e.title,
					e.author,
					e.summary,
					e.place
				].join(" ")).includes(Vd(n))).map((e) => ({
					id: e.id,
					title: e.title,
					author: e.author,
					finishedOn: e.finishedOn
				}));
			}
		}), r({
			name: "open_book_details",
			description: "Open a saved book to read its details or begin editing. Does not save changes.",
			inputSchema: {
				type: "object",
				properties: { id: { type: "string" } },
				required: ["id"],
				additionalProperties: !1
			},
			annotations: {
				readOnlyHint: !0,
				untrustedContentHint: !0
			},
			execute: (e) => {
				let n = t.find((t) => t.id === e?.id);
				if (!n) throw Error("Llibre no trobat.");
				return D(!1), E(n), {
					opened: n.id,
					title: n.title
				};
			}
		}), () => n.abort();
	}, [t]);
	let se = (e, t = !1) => {
		D(t), E(e);
	};
	function ce(e) {
		n((t) => t.some((t) => t.id === e.id) ? t.map((t) => t.id === e.id ? e : t) : [...t, e]), E(null), A("Lectura desada."), setTimeout(() => A(""), 5e3);
	}
	function le() {
		let e = new Blob([JSON.stringify({
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			books: t
		}, null, 2)], { type: "application/json" }), n = URL.createObjectURL(e), r = document.createElement("a");
		r.href = n, r.download = "quadern-de-lectures-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".json", r.click(), setTimeout(() => URL.revokeObjectURL(n), 1e3);
	}
	let ue = t.filter((e) => e.read).length;
	return /* @__PURE__ */ (0, z.jsxs)("main", {
		className: "app",
		children: [
			/* @__PURE__ */ (0, z.jsxs)(bd, {
				value: l,
				onValueChange: u,
				children: [
					/* @__PURE__ */ (0, z.jsxs)("header", {
						className: "topbar",
						children: [
							/* @__PURE__ */ (0, z.jsxs)("a", {
								className: "brand",
								href: "./llibres.html",
								children: [/* @__PURE__ */ (0, z.jsx)(ae, {
									size: 25,
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, z.jsx)("span", { children: "Quadern de lectures" })]
							}),
							/* @__PURE__ */ (0, z.jsxs)(Sd, {
								className: "view-switch",
								"aria-label": "Visualització",
								children: [/* @__PURE__ */ (0, z.jsxs)(Cd, {
									value: "library",
									children: [/* @__PURE__ */ (0, z.jsx)(he, {}), "Biblioteca"]
								}), /* @__PURE__ */ (0, z.jsxs)(Cd, {
									value: "diary",
									children: [/* @__PURE__ */ (0, z.jsx)(ae, {}), "Diari"]
								})]
							}),
							a ? /* @__PURE__ */ (0, z.jsxs)("button", {
								className: "primary",
								onClick: () => se(Hd(), !0),
								children: [/* @__PURE__ */ (0, z.jsx)(Ce, { size: 18 }), "Afegir llibre"]
							}) : /* @__PURE__ */ (0, z.jsxs)("button", {
								className: "primary",
								onClick: w,
								children: [/* @__PURE__ */ (0, z.jsx)(_e, { size: 17 }), s ? "Compte del propietari" : "Entra per editar"]
							})
						]
					}),
					/* @__PURE__ */ (0, z.jsxs)("section", {
						className: "collection-heading",
						children: [/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)("p", {
							className: "eyebrow",
							children: "BIBLIOTECA PERSONAL"
						}), /* @__PURE__ */ (0, z.jsx)("h1", { children: l === "library" ? "Llibres llegits" : "Diari de lectures" })] }), /* @__PURE__ */ (0, z.jsxs)("p", {
							className: "collection-count",
							children: [/* @__PURE__ */ (0, z.jsx)("strong", { children: r ? ue : "—" }), " lectures acabades"]
						})]
					}),
					/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "tools",
						children: [
							/* @__PURE__ */ (0, z.jsxs)("label", {
								className: "search",
								children: [/* @__PURE__ */ (0, z.jsx)(De, {
									size: 19,
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, z.jsx)("input", {
									"aria-label": "Cerca a la biblioteca",
									type: "search",
									placeholder: "Un títol, un autor, un record…",
									value: d,
									onChange: (e) => f(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, z.jsx)(qd, {
								label: "Filtra per estat",
								value: p,
								onChange: m,
								options: [
									["read", "Llegits"],
									["all", "Tots els llibres"],
									["unread", "Sense marcar com a llegits"],
									["pending", "Edició per confirmar"]
								]
							}),
							/* @__PURE__ */ (0, z.jsx)(qd, {
								label: "Any de lectura",
								value: h,
								onChange: g,
								options: [["all", "Tots els anys"], ...I.map((e) => [e, e])]
							}),
							/* @__PURE__ */ (0, z.jsx)(qd, {
								label: "Ordena els llibres",
								value: _,
								onChange: y,
								options: [
									["recent", "Més recents"],
									["oldest", "Més antics"],
									["title", "Títol A–Z"]
								]
							})
						]
					}),
					O && /* @__PURE__ */ (0, z.jsxs)("div", {
						className: "notice error",
						role: "alert",
						children: [
							O,
							" ",
							/* @__PURE__ */ (0, z.jsx)("button", {
								className: "text-button",
								onClick: () => void F(),
								children: "Torna a carregar"
							}),
							/* @__PURE__ */ (0, z.jsxs)("p", {
								className: "small-note",
								children: ["Les lectures es carreguen del registre compartit. ", /* @__PURE__ */ (0, z.jsx)("a", {
									href: v,
									target: "_blank",
									rel: "noreferrer",
									children: "Obre el servei de dades ↗"
								})]
							})
						]
					}),
					k && /* @__PURE__ */ (0, z.jsx)("p", {
						className: "notice",
						role: "status",
						children: k
					}),
					/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "statusline",
						style: {
							marginTop: -12,
							marginBottom: 24
						},
						children: [/* @__PURE__ */ (0, z.jsxs)("span", { children: [
							R.length,
							" ",
							R.length === 1 ? "llibre" : "llibres",
							p === "read" ? " llegits" : "",
							h === "all" ? "" : " · " + h
						] }), /* @__PURE__ */ (0, z.jsx)("span", {
							className: "results-count",
							role: "status",
							children: O ? "Sense connexió" : r ? ne ? "Cercant portades…" : "Canvis sincronitzats" : "Connectant amb el quadern…"
						})]
					}),
					/* @__PURE__ */ (0, z.jsx)(wd, {
						value: "library",
						children: /* @__PURE__ */ (0, z.jsx)("div", {
							className: "book-grid",
							children: oe.map((e) => /* @__PURE__ */ (0, z.jsxs)("button", {
								className: "book-card",
								onClick: () => se(e),
								"aria-label": "Obre " + e.title,
								children: [
									/* @__PURE__ */ (0, z.jsx)(Kd, {
										book: e,
										suggested: j[e.id]
									}),
									/* @__PURE__ */ (0, z.jsx)("h2", { children: e.title }),
									/* @__PURE__ */ (0, z.jsx)("p", { children: e.author || "Autor pendent" }),
									/* @__PURE__ */ (0, z.jsxs)("span", {
										className: "book-date",
										children: [e.read ? Ud(e.finishedOn) : "Lectura pendent", /* @__PURE__ */ (0, z.jsx)(L, {
											size: 15,
											"aria-hidden": "true"
										})]
									})
								]
							}, e.id))
						})
					}),
					/* @__PURE__ */ (0, z.jsx)(wd, {
						value: "diary",
						children: /* @__PURE__ */ (0, z.jsx)("div", {
							className: "diary",
							children: oe.map((e, t) => {
								let n = e.finishedOn.slice(0, 4) || "Sense data";
								return /* @__PURE__ */ (0, z.jsxs)(N.Fragment, { children: [(t === 0 || oe[t - 1].finishedOn.slice(0, 4) !== e.finishedOn.slice(0, 4)) && /* @__PURE__ */ (0, z.jsx)("h2", {
									className: "diary-year",
									children: n
								}), /* @__PURE__ */ (0, z.jsxs)("article", {
									className: "diary-entry",
									children: [/* @__PURE__ */ (0, z.jsxs)("time", { children: [e.read ? Ud(e.finishedOn) : "Lectura pendent", /* @__PURE__ */ (0, z.jsx)("span", { children: e.place && /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [
										/* @__PURE__ */ (0, z.jsx)(ye, {
											size: 12,
											style: { display: "inline" }
										}),
										" ",
										e.place
									] }) })] }), /* @__PURE__ */ (0, z.jsxs)("div", {
										className: "diary-book",
										children: [/* @__PURE__ */ (0, z.jsx)("button", {
											className: "diary-title diary-thumb",
											"aria-label": "Obre " + e.title,
											onClick: () => se(e),
											children: /* @__PURE__ */ (0, z.jsx)(Kd, {
												book: e,
												suggested: j[e.id]
											})
										}), /* @__PURE__ */ (0, z.jsxs)("div", { children: [
											/* @__PURE__ */ (0, z.jsx)("button", {
												className: "diary-title",
												onClick: () => se(e),
												children: /* @__PURE__ */ (0, z.jsx)("h2", { children: e.title })
											}),
											/* @__PURE__ */ (0, z.jsxs)("p", {
												className: "muted",
												children: [e.author, e.publisher ? " · " + e.publisher : ""]
											}),
											/* @__PURE__ */ (0, z.jsx)("p", {
												style: {
													whiteSpace: "pre-wrap",
													marginTop: 12
												},
												children: e.summary || "Encara no hi ha cap record escrit."
											})
										] })]
									})]
								})] }, e.id);
							})
						})
					}),
					r && !R.length && /* @__PURE__ */ (0, z.jsxs)("div", {
						className: "empty",
						children: [
							/* @__PURE__ */ (0, z.jsx)(ae, {
								size: 32,
								style: { margin: "0 auto 12px" }
							}),
							/* @__PURE__ */ (0, z.jsx)("p", { children: "No hi ha llibres amb aquests filtres." }),
							/* @__PURE__ */ (0, z.jsx)("button", {
								className: "text-button",
								onClick: () => {
									f(""), g("all"), m("all");
								},
								children: "Mostra tots els llibres"
							})
						]
					}),
					b < R.length && /* @__PURE__ */ (0, z.jsx)("div", {
						style: {
							textAlign: "center",
							marginTop: 35
						},
						children: /* @__PURE__ */ (0, z.jsxs)("button", {
							className: "secondary",
							onClick: () => x((e) => e + 24),
							children: [
								"Mostra’n més · ",
								oe.length,
								" de ",
								R.length
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, z.jsxs)("footer", { children: [/* @__PURE__ */ (0, z.jsxs)("span", { children: [
				t.length,
				" títols · ",
				t.filter((e) => e.summary).length,
				" records escrits · ",
				/* @__PURE__ */ (0, z.jsx)("a", {
					href: "https://openlibrary.org",
					target: "_blank",
					rel: "noreferrer",
					children: "Open Library"
				}),
				" i ",
				/* @__PURE__ */ (0, z.jsx)("a", {
					href: "https://books.google.com",
					target: "_blank",
					rel: "noreferrer",
					children: "Google Books"
				})
			] }), /* @__PURE__ */ (0, z.jsxs)("div", {
				className: "actions",
				children: [/* @__PURE__ */ (0, z.jsxs)("button", {
					className: "text-button",
					onClick: le,
					disabled: !r,
					children: [/* @__PURE__ */ (0, z.jsx)(pe, { size: 14 }), "Exporta una còpia"]
				}), s && /* @__PURE__ */ (0, z.jsx)("button", {
					className: "text-button",
					onClick: () => void T().catch((e) => te(e.message)),
					children: "Surt"
				})]
			})] }),
			S && /* @__PURE__ */ (0, z.jsx)(Yd, {
				initial: S,
				canEdit: a,
				onSaved: ce,
				onClose: () => E(null),
				suggested: j[S.id],
				startEditing: ee
			}, S.id)
		]
	});
}
//#endregion
//#region src/main.tsx
(0, g.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, z.jsx)(Xd, { initialBooks: [] }));
//#endregion
