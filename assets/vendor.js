!(function (t, e, i) {
  var s = window.matchMedia;
  "undefined" != typeof module && module.exports
    ? (module.exports = i(s))
    : "function" == typeof define && define.amd
    ? define(function () {
        return (e[t] = i(s));
      })
    : (e[t] = i(s));
})("enquire", this, function (t) {
  "use strict";
  function e(t, e) {
    for (var i, s = 0, n = t.length; n > s && !1 !== (i = e(t[s], s)); s++);
  }
  function i(t) {
    return "function" == typeof t;
  }
  function s(t) {
    (this.options = t), t.deferSetup || this.setup();
  }
  function n(e, i) {
    (this.query = e),
      (this.isUnconditional = i),
      (this.handlers = []),
      (this.mql = t(e));
    var s = this;
    (this.listener = function (t) {
      (s.mql = t), s.assess();
    }),
      this.mql.addListener(this.listener);
  }
  function o() {
    if (!t)
      throw Error("matchMedia not present, legacy browsers require a polyfill");
    (this.queries = {}), (this.browserIsIncapable = !t("only all").matches);
  }
  return (
    (s.prototype = {
      setup: function () {
        this.options.setup && this.options.setup(), (this.initialised = !0);
      },
      on: function () {
        this.initialised || this.setup(),
          this.options.match && this.options.match();
      },
      off: function () {
        this.options.unmatch && this.options.unmatch();
      },
      destroy: function () {
        this.options.destroy ? this.options.destroy() : this.off();
      },
      equals: function (t) {
        return this.options === t || this.options.match === t;
      },
    }),
    (n.prototype = {
      addHandler: function (t) {
        var e = new s(t);
        this.handlers.push(e), this.matches() && e.on();
      },
      removeHandler: function (t) {
        var i = this.handlers;
        e(i, function (e, s) {
          return e.equals(t) ? (e.destroy(), !i.splice(s, 1)) : void 0;
        });
      },
      matches: function () {
        return this.mql.matches || this.isUnconditional;
      },
      clear: function () {
        e(this.handlers, function (t) {
          t.destroy();
        }),
          this.mql.removeListener(this.listener),
          (this.handlers.length = 0);
      },
      assess: function () {
        var t = this.matches() ? "on" : "off";
        e(this.handlers, function (e) {
          e[t]();
        });
      },
    }),
    (o.prototype = {
      register: function (t, s, o) {
        var r,
          a = this.queries,
          l = o && this.browserIsIncapable;
        return (
          a[t] || (a[t] = new n(t, l)),
          i(s) && (s = { match: s }),
          (r = s),
          "[object Array]" === Object.prototype.toString.apply(r) || (s = [s]),
          e(s, function (e) {
            i(e) && (e = { match: e }), a[t].addHandler(e);
          }),
          this
        );
      },
      unregister: function (t, e) {
        var i = this.queries[t];
        return (
          i && (e ? i.removeHandler(e) : (i.clear(), delete this.queries[t])),
          this
        );
      },
    }),
    new o()
  );
}),
  (function (t) {
    var e = {
      url: !1,
      callback: !1,
      target: !1,
      duration: 120,
      on: "mouseover",
      touch: !0,
      onZoomIn: !1,
      onZoomOut: !1,
      magnify: 1,
    };
    (t.zoom = function (e, i, s, n) {
      var o,
        r,
        a,
        l,
        h,
        c,
        u,
        d = t(e),
        p = d.css("position"),
        f = t(i);
      return (
        d.css("position", /(absolute|fixed)/.test(p) ? p : "relative"),
        d.css("overflow", "hidden"),
        (s.style.width = s.style.height = ""),
        t(s)
          .addClass("zoomImg")
          .css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: s.width * n,
            height: s.height * n,
            border: "none",
            maxWidth: "none",
            maxHeight: "none",
          })
          .appendTo(e),
        {
          init: function () {
            (r = d.outerWidth()),
              (o = d.outerHeight()),
              i === d[0]
                ? ((l = r), (a = o))
                : ((l = f.outerWidth()), (a = f.outerHeight())),
              (h = (s.width - r) / l),
              (c = (s.height - o) / a),
              (u = f.offset());
          },
          move: function (t) {
            var e = t.pageX - u.left,
              i = t.pageY - u.top;
            (i = Math.max(Math.min(i, a), 0)),
              (e = Math.max(Math.min(e, l), 0)),
              (s.style.left = -(e * h) + "px"),
              (s.style.top = -(i * c) + "px");
          },
        }
      );
    }),
      (t.fn.zoom = function (i) {
        return this.each(function () {
          var s,
            n,
            o,
            r = t.extend({}, e, i || {}),
            a = r.target || this,
            l = this,
            h = t(l),
            c = t(a),
            u = document.createElement("img"),
            d = t(u),
            p = "mousemove.zoom",
            f = !1,
            g = !1;
          (r.url ||
            ((s = h.find("img"))[0] && (r.url = s.data("src") || s.attr("src")),
            r.url)) &&
            ((n = c.css("position")),
            (o = c.css("overflow")),
            h.one("zoom.destroy", function () {
              h.off(".zoom"),
                c.css("position", n),
                c.css("overflow", o),
                d.remove();
            }),
            (u.onload = function () {
              function e(e) {
                s.init(),
                  s.move(e),
                  d
                    .stop()
                    .fadeTo(
                      t.support.opacity ? r.duration : 0,
                      1,
                      !!t.isFunction(r.onZoomIn) && r.onZoomIn.call(u)
                    );
              }
              function i() {
                d.stop().fadeTo(
                  r.duration,
                  0,
                  !!t.isFunction(r.onZoomOut) && r.onZoomOut.call(u)
                );
              }
              var s = t.zoom(a, l, u, r.magnify);
              "grab" === r.on
                ? h.on("mousedown.zoom", function (n) {
                    1 === n.which &&
                      (t(document).one("mouseup.zoom", function () {
                        i(), t(document).off(p, s.move);
                      }),
                      e(n),
                      t(document).on(p, s.move),
                      n.preventDefault());
                  })
                : "click" === r.on
                ? h.on("click.zoom", function (n) {
                    return f
                      ? void 0
                      : ((f = !0),
                        e(n),
                        t(document).on(p, s.move),
                        t(document).one("click.zoom", function () {
                          i(), (f = !1), t(document).off(p, s.move);
                        }),
                        !1);
                  })
                : "toggle" === r.on
                ? h.on("click.zoom", function (t) {
                    f ? i() : e(t), (f = !f);
                  })
                : "mouseover" === r.on &&
                  (s.init(),
                  h
                    .on("mouseenter.zoom", e)
                    .on("mouseleave.zoom", i)
                    .on(p, s.move)),
                r.touch &&
                  h
                    .on("touchstart.zoom", function (t) {
                      t.preventDefault(),
                        g
                          ? ((g = !1), i())
                          : ((g = !0),
                            e(
                              t.originalEvent.touches[0] ||
                                t.originalEvent.changedTouches[0]
                            ));
                    })
                    .on("touchmove.zoom", function (t) {
                      t.preventDefault(),
                        s.move(
                          t.originalEvent.touches[0] ||
                            t.originalEvent.changedTouches[0]
                        );
                    })
                    .on("touchend.zoom", function (t) {
                      t.preventDefault(), g && ((g = !1), i());
                    }),
                t.isFunction(r.callback) && r.callback.call(u);
            }),
            (u.src = r.url));
        });
      }),
      (t.fn.zoom.defaults = e);
  })(window.jQuery),
  function () {
    function t(t, e) {
      for (var i = -1, s = e.length, n = t.length; ++i < s; ) t[n + i] = e[i];
      return t;
    }
    function e(t, e, i) {
      for (var s = -1, n = t.length; ++s < n; ) {
        var o = t[s],
          r = e(o);
        if (null != r && (a === tt ? r == r : i(r, a)))
          var a = r,
            l = o;
      }
      return l;
    }
    function i(t) {
      return t && t.Object === Object ? t : null;
    }
    function s(t) {
      return to[t];
    }
    function n(t) {
      var e = !1;
      if (null != t && "function" != typeof t.toString)
        try {
          e = !!(t + "");
        } catch (i) {}
      return e;
    }
    function o(t, e) {
      return (
        (t = "number" == typeof t || tn.test(t) ? +t : -1) > -1 &&
        0 == t % 1 &&
        (null == e ? 9007199254740991 : e) > t
      );
    }
    function r(t) {
      if (F(t) && !tN(t)) {
        if (t instanceof a) return t;
        if (tm.call(t, "__wrapped__")) {
          var e = new a(t.__wrapped__, t.__chain__);
          return (e.__actions__ = _(t.__actions__)), e;
        }
      }
      return new a(t);
    }
    function a(t, e) {
      (this.__wrapped__ = t), (this.__actions__ = []), (this.__chain__ = !!e);
    }
    function l(t, e, i, s) {
      var n;
      return (
        (n = t === tt) ||
          (n = (t === (n = tg[i]) || (t != t && n != n)) && !tm.call(s, i)),
        n ? e : t
      );
    }
    function h(t) {
      return j(t) ? tw(t) : {};
    }
    function c(t, e, i) {
      if ("function" != typeof t) throw TypeError("Expected a function");
      return setTimeout(function () {
        t.apply(tt, i);
      }, e);
    }
    function u(t, e) {
      var i = [];
      return (
        tT(t, function (t, s, n) {
          e(t, s, n) && i.push(t);
        }),
        i
      );
    }
    function d(e, i, s, n) {
      n || (n = []);
      for (var o = -1, r = e.length; ++o < r; ) {
        var a = e[o];
        i > 0 && F(a) && L(a) && (s || tN(a) || M(a))
          ? i > 1
            ? d(a, i - 1, s, n)
            : t(n, a)
          : s || (n[n.length] = a);
      }
      return n;
    }
    function p(t, e) {
      return t && tS(t, e, K);
    }
    function f(t, e) {
      return u(e, function (e) {
        return W(t[e]);
      });
    }
    function g(t, e, i, s, o) {
      var r, a, l, h, c, u, d, p, f, m, v;
      return (
        t === e ||
        (null != t && null != e && (j(t) || F(e))
          ? ((r = t),
            (a = e),
            (l = g),
            (h = i),
            (c = s),
            (u = o),
            (d = tN(r)),
            (p = tN(a)),
            (f = "[object Array]"),
            (m = "[object Array]"),
            d ||
              ("[object Arguments]" == (f = t8.call(r)) &&
                (f = "[object Object]")),
            p ||
              ("[object Arguments]" == (m = t8.call(a)) &&
                (m = "[object Object]")),
            (v = "[object Object]" == f && !n(r)),
            (p = "[object Object]" == m && !n(a)),
            (m = f == m) && !d && !v
              ? (function t(e, i, s) {
                  switch (s) {
                    case "[object Boolean]":
                    case "[object Date]":
                      return +e == +i;
                    case "[object Error]":
                      return e.name == i.name && e.message == i.message;
                    case "[object Number]":
                      return e != +e ? i != +i : e == +i;
                    case "[object RegExp]":
                    case "[object String]":
                      return e == i + "";
                  }
                  return !1;
                })(r, a, f)
              : !(2 & c) &&
                ((f = v && tm.call(r, "__wrapped__")),
                (p = p && tm.call(a, "__wrapped__")),
                f || p)
              ? l(f ? r.value() : r, p ? a.value() : a, h, c, u)
              : !!m &&
                (u || (u = []),
                (f = A(u, function (t) {
                  return t[0] === r;
                })) && f[1]
                  ? f[1] == a
                  : (u.push([r, a]),
                    (a = (d ? T : S)(r, a, l, h, c, u)),
                    u.pop(),
                    a)))
          : t != t && e != e)
      );
    }
    function m(t) {
      var e = typeof t;
      return "function" == e ? t : null == t ? G : ("object" == e ? $ : y)(t);
    }
    function v(t) {
      t = null == t ? t : Object(t);
      var e,
        i = [];
      for (e in t) i.push(e);
      return i;
    }
    function b(t, e) {
      var i = -1,
        s = L(t) ? Array(t.length) : [];
      return (
        tT(t, function (t, n, o) {
          s[++i] = e(t, n, o);
        }),
        s
      );
    }
    function $(t) {
      var e = K(t);
      return function (i) {
        var s = e.length;
        if (null == i) return !s;
        for (i = Object(i); s--; ) {
          var n = e[s];
          if (!(n in i && g(t[n], i[n], tt, 3))) return !1;
        }
        return !0;
      };
    }
    function y(t) {
      return function (e) {
        return null == e ? tt : e[t];
      };
    }
    function w(t, e, i) {
      var s = -1,
        n = t.length;
      for (
        0 > e && (e = -e > n ? 0 : n + e),
          0 > (i = i > n ? n : i) && (i += n),
          n = e > i ? 0 : (i - e) >>> 0,
          e >>>= 0,
          i = Array(n);
        ++s < n;

      )
        i[s] = t[s + e];
      return i;
    }
    function _(t) {
      return w(t, 0, t.length);
    }
    function k(t, e) {
      var i;
      return (
        tT(t, function (t, s, n) {
          return !(i = e(t, s, n));
        }),
        !!i
      );
    }
    function C(t, e, i, s) {
      i || (i = {});
      for (var n = -1, o = e.length; ++n < o; ) {
        var r = e[n],
          a = s ? s(i[r], t[r], r, i, t) : t[r],
          l = i,
          h = l[r];
        (tm.call(l, r) &&
          (h === a || (h != h && a != a)) &&
          (a !== tt || r in l)) ||
          (l[r] = a);
      }
      return i;
    }
    function x(t) {
      return H(function (e, i) {
        var s = -1,
          n = i.length,
          o = n > 1 ? i[n - 1] : tt,
          o = "function" == typeof o ? (n--, o) : tt;
        for (e = Object(e); ++s < n; ) {
          var r = i[s];
          r && t(e, r, s, o);
        }
        return e;
      });
    }
    function T(t, e, i, s, n, o) {
      var r = -1,
        a = 1 & n,
        l = t.length,
        h = e.length;
      if (l != h && !(2 & n && h > l)) return !1;
      for (h = !0; ++r < l; ) {
        var c = t[r],
          u = e[r];
        if (void 0 !== tt) {
          h = !1;
          break;
        }
        if (a) {
          if (
            !k(e, function (t) {
              return c === t || i(c, t, s, n, o);
            })
          ) {
            h = !1;
            break;
          }
        } else if (c !== u && !i(c, u, s, n, o)) {
          h = !1;
          break;
        }
      }
      return h;
    }
    function S(t, e, i, s, n, o) {
      var r = 2 & n,
        a = K(t),
        l = a.length,
        h = K(e).length;
      if (l != h && !r) return !1;
      for (var c = l; c--; ) {
        var u = a[c];
        if (!(r ? u in e : tm.call(e, u))) return !1;
      }
      for (h = !0; ++c < l; ) {
        var u = a[c],
          d = t[u],
          p = e[u];
        if (void 0 !== tt || (d !== p && !i(d, p, s, n, o))) {
          h = !1;
          break;
        }
        r || (r = "constructor" == u);
      }
      return (
        h &&
          !r &&
          (i = t.constructor) != (s = e.constructor) &&
          "constructor" in t &&
          "constructor" in e &&
          !(
            "function" == typeof i &&
            i instanceof i &&
            "function" == typeof s &&
            s instanceof s
          ) &&
          (h = !1),
        h
      );
    }
    function D(t) {
      var e = t ? t.length : tt;
      if (R(e) && (tN(t) || Y(t) || M(t))) {
        t = String;
        for (var i = -1, s = Array(e); ++i < e; ) s[i] = t(i);
        e = s;
      } else e = null;
      return e;
    }
    function E(t) {
      var e = t && t.constructor,
        e = (W(e) && e.prototype) || tg;
      return t === e;
    }
    function I(t) {
      return t ? t[0] : tt;
    }
    function A(t, e) {
      var i, s, n, o;
      return (
        (i = t),
        (s = m(e)),
        (n = tT)(i, function (t, e, i) {
          return s(t, e, i) ? ((o = t), !1) : void 0;
        }),
        o
      );
    }
    function P(t, e) {
      return tT(t, "function" == typeof e ? e : G);
    }
    function O(t, e, i) {
      var s, n, o, r, a;
      return (
        (s = t),
        (n = m(e)),
        (o = i),
        (r = 3 > arguments.length),
        (a = tT)(s, function (t, e, i) {
          o = r ? ((r = !1), t) : n(o, t, e, i);
        }),
        o
      );
    }
    function N(t, e) {
      var i;
      if ("function" != typeof e) throw TypeError("Expected a function");
      return (
        (t = tH(t)),
        function () {
          return (
            0 < --t && (i = e.apply(this, arguments)), 1 >= t && (e = tt), i
          );
        }
      );
    }
    function H(t) {
      var e;
      if ("function" != typeof t) throw TypeError("Expected a function");
      return (
        (e = tx(e === tt ? t.length - 1 : tH(e), 0)),
        function () {
          for (
            var i = arguments, s = -1, n = tx(i.length - e, 0), o = Array(n);
            ++s < n;

          )
            o[s] = i[e + s];
          for (n = Array(e + 1), s = -1; ++s < e; ) n[s] = i[s];
          return (n[e] = o), t.apply(this, n);
        }
      );
    }
    function z(t, e) {
      return t > e;
    }
    function M(t) {
      return (
        F(t) &&
        L(t) &&
        tm.call(t, "callee") &&
        (!t_.call(t, "callee") || "[object Arguments]" == t8.call(t))
      );
    }
    function L(t) {
      return null != t && !("function" == typeof t && W(t)) && R(tE(t));
    }
    function W(t) {
      return (
        "[object Function]" == (t = j(t) ? t8.call(t) : "") ||
        "[object GeneratorFunction]" == t
      );
    }
    function R(t) {
      return (
        "number" == typeof t && t > -1 && 0 == t % 1 && 9007199254740991 >= t
      );
    }
    function j(t) {
      var e = typeof t;
      return !!t && ("object" == e || "function" == e);
    }
    function F(t) {
      return !!t && "object" == typeof t;
    }
    function B(t) {
      return "number" == typeof t || (F(t) && "[object Number]" == t8.call(t));
    }
    function Y(t) {
      return (
        "string" == typeof t ||
        (!tN(t) && F(t) && "[object String]" == t8.call(t))
      );
    }
    function U(t, e) {
      return e > t;
    }
    function q(t) {
      return "string" == typeof t ? t : null == t ? "" : t + "";
    }
    function K(t) {
      var e = E(t);
      if (!e && !L(t)) return tC(Object(t));
      var i,
        s = D(t),
        n = !!s,
        s = s || [],
        r = s.length;
      for (i in t)
        !tm.call(t, i) ||
          (n && ("length" == i || o(i, r))) ||
          (e && "constructor" == i) ||
          s.push(i);
      return s;
    }
    function V(t) {
      for (
        var e = -1,
          i = E(t),
          s = v(t),
          n = s.length,
          r = D(t),
          a = !!r,
          r = r || [],
          l = r.length;
        ++e < n;

      ) {
        var h = s[e];
        (a && ("length" == h || o(h, l))) ||
          ("constructor" == h && (i || !tm.call(t, h))) ||
          r.push(h);
      }
      return r;
    }
    function X(t) {
      var e, i;
      return t
        ? ((e = t),
          (i = K(t)),
          b(i, function (t) {
            return e[t];
          }))
        : [];
    }
    function G(t) {
      return t;
    }
    function Q(e, i, s) {
      var n = K(i),
        o = f(i, n);
      null != s ||
        (j(i) && (o.length || !n.length)) ||
        ((s = i), (i = e), (e = this), (o = f(i, K(i))));
      var r = !(j(s) && "chain" in s) || s.chain,
        a = W(e);
      return (
        tT(o, function (s) {
          var n = i[s];
          (e[s] = n),
            a &&
              (e.prototype[s] = function () {
                var i = this.__chain__;
                if (r || i) {
                  var s = e(this.__wrapped__);
                  return (
                    (s.__actions__ = _(this.__actions__)).push({
                      func: n,
                      args: arguments,
                      thisArg: e,
                    }),
                    (s.__chain__ = i),
                    s
                  );
                }
                return n.apply(e, t([this.value()], arguments));
              });
        }),
        e
      );
    }
    var Z,
      J,
      tt,
      te = 1 / 0,
      ti = /[&<>"'`]/g,
      ts = RegExp(ti.source),
      tn = /^(?:0|[1-9]\d*)$/,
      to = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#96;",
      },
      tr = { function: !0, object: !0 },
      ta = tr[typeof exports] && exports && !exports.nodeType ? exports : tt,
      tl = tr[typeof module] && module && !module.nodeType ? module : tt,
      th = tl && tl.exports === ta ? ta : tt,
      tc = i(tr[typeof self] && self),
      tu = i(tr[typeof window] && window),
      td = i(tr[typeof this] && this),
      tp =
        i(ta && tl && "object" == typeof global && global) ||
        (tu !== (td && td.window) && tu) ||
        tc ||
        td ||
        Function("return this")(),
      tf = Array.prototype,
      tg = Object.prototype,
      tm = tg.hasOwnProperty,
      tv = 0,
      t8 = tg.toString,
      tb = tp._,
      t$ = tp.Reflect,
      ty = t$ ? t$.f : tt,
      tw = Object.create,
      t_ = tg.propertyIsEnumerable,
      tk = tp.isFinite,
      tC = Object.keys,
      tx = Math.max,
      tT =
        ((Z = p),
        function (t, e) {
          if (null == t) return t;
          if (!L(t)) return Z(t, e);
          for (
            var i = t.length, s = J ? i : -1, n = Object(t);
            (J ? s-- : ++s < i) && !1 !== e(n[s], s, n);

          );
          return t;
        }),
      tS = function (t, e, i) {
        var s = -1,
          n = Object(t);
        i = i(t);
        for (var o = i.length; o--; ) {
          var r = i[++s];
          if (!1 === e(n[r], r, n)) break;
        }
        return t;
      };
    ty &&
      !t_.call({ valueOf: 1 }, "valueOf") &&
      (v = function (t) {
        t = ty(t);
        for (var e, i = []; !(e = t.next()).done; ) i.push(e.value);
        return i;
      });
    var tD,
      tE = y("length"),
      tI = H(function (e, i) {
        return tN(e) || (e = null == e ? [] : [Object(e)]), d(i, 1), t(_(e), X);
      }),
      tA = H(function (t, e, i) {
        return (function t(e, i, s) {
          if ("function" != typeof e) throw TypeError("Expected a function");
          var n,
            o =
              ((n = e),
              function () {
                var t = arguments,
                  e = h(n.prototype),
                  t = n.apply(e, t);
                return j(t) ? t : e;
              });
          return function t() {
            for (
              var n = -1,
                r = arguments.length,
                a = -1,
                l = s.length,
                h = Array(l + r),
                c = this && this !== tp && this instanceof t ? o : e;
              ++a < l;

            )
              h[a] = s[a];
            for (; r--; ) h[a++] = arguments[++n];
            return c.apply(i, h);
          };
        })(t, e, i);
      }),
      tP = H(function (t, e) {
        return c(t, 1, e);
      }),
      tO = H(function (t, e, i) {
        return c(t, tz(e) || 0, i);
      }),
      tN = Array.isArray,
      tH = Number,
      tz = Number,
      tM = x(function (t, e) {
        C(e, K(e), t);
      }),
      tL = x(function (t, e) {
        C(e, V(e), t);
      }),
      tW = x(function (t, e, i, s) {
        C(e, V(e), t, s);
      }),
      t9 = H(function (t) {
        return t.push(tt, l), tW.apply(tt, t);
      }),
      tR = H(function (t, e) {
        var i, s;
        return null == t
          ? {}
          : ((i = t),
            (s = d(e, 1)),
            (i = Object(i)),
            O(
              s,
              function (t, e) {
                return e in i && (t[e] = i[e]), t;
              },
              {}
            ));
      });
    (a.prototype = h(r.prototype)),
      (a.prototype.constructor = a),
      (r.assignIn = tL),
      (r.before = N),
      (r.bind = tA),
      (r.chain = function (t) {
        return ((t = r(t)).__chain__ = !0), t;
      }),
      (r.compact = function (t) {
        return u(t, Boolean);
      }),
      (r.concat = tI),
      (r.create = function (t, e) {
        var i = h(t);
        return e ? tM(i, e) : i;
      }),
      (r.defaults = t9),
      (r.defer = tP),
      (r.delay = tO),
      (r.filter = function (t, e) {
        return u(t, m(e));
      }),
      (r.flatten = function (t) {
        return t && t.length ? d(t, 1) : [];
      }),
      (r.flattenDeep = function (t) {
        return t && t.length ? d(t, te) : [];
      }),
      (r.iteratee = m),
      (r.keys = K),
      (r.map = function (t, e) {
        return b(t, m(e));
      }),
      (r.matches = function (t) {
        return $(tM({}, t));
      }),
      (r.mixin = Q),
      (r.negate = function (t) {
        if ("function" != typeof t) throw TypeError("Expected a function");
        return function () {
          return !t.apply(this, arguments);
        };
      }),
      (r.once = function (t) {
        return N(2, t);
      }),
      (r.pick = tR),
      (r.slice = function (t, e, i) {
        var s = t ? t.length : 0;
        return (i = i === tt ? s : +i), s ? w(t, null == e ? 0 : +e, i) : [];
      }),
      (r.sortBy = function (t, e) {
        var i = 0;
        return (
          (e = m(e)),
          b(
            b(t, function (t, s, n) {
              return { c: t, b: i++, a: e(t, s, n) };
            }).sort(function (t, e) {
              var i;
              e: {
                i = t.a;
                var s = e.a;
                if (i !== s) {
                  var n = null === i,
                    o = i === tt,
                    r = i == i,
                    a = null === s,
                    l = s === tt,
                    h = s == s;
                  if ((i > s && !a) || !r || (n && !l && h) || (o && h)) {
                    i = 1;
                    break e;
                  }
                  if ((s > i && !n) || !h || (a && !o && r) || (l && r)) {
                    i = -1;
                    break e;
                  }
                }
                i = 0;
              }
              return i || t.b - e.b;
            }),
            y("c")
          )
        );
      }),
      (r.tap = function (t, e) {
        return e(t), t;
      }),
      (r.thru = function (t, e) {
        return e(t);
      }),
      (r.toArray = function (t) {
        return L(t) ? (t.length ? _(t) : []) : X(t);
      }),
      (r.values = X),
      (r.extend = tL),
      Q(r, r),
      (r.clone = function (t) {
        return j(t) ? (tN(t) ? _(t) : C(t, K(t))) : t;
      }),
      (r.escape = function (t) {
        return (t = q(t)) && ts.test(t) ? t.replace(ti, s) : t;
      }),
      (r.every = function (t, e, i) {
        var s, n, o;
        return (
          (e = i ? tt : e),
          (s = t),
          (n = m(e)),
          (o = !0),
          tT(s, function (t, e, i) {
            return (o = !!n(t, e, i));
          }),
          o
        );
      }),
      (r.find = A),
      (r.forEach = P),
      (r.has = function (t, e) {
        return null != t && tm.call(t, e);
      }),
      (r.head = I),
      (r.identity = G),
      (r.indexOf = function (t, e, i) {
        var s = t ? t.length : 0;
        i =
          ((i = "number" == typeof i ? (0 > i ? tx(s + i, 0) : i) : 0) || 0) -
          1;
        for (var n = e == e; ++i < s; ) {
          var o = t[i];
          if (n ? o === e : o != o) return i;
        }
        return -1;
      }),
      (r.isArguments = M),
      (r.isArray = tN),
      (r.isBoolean = function (t) {
        return (
          !0 === t || !1 === t || (F(t) && "[object Boolean]" == t8.call(t))
        );
      }),
      (r.isDate = function (t) {
        return F(t) && "[object Date]" == t8.call(t);
      }),
      (r.isEmpty = function (t) {
        if (L(t) && (tN(t) || Y(t) || W(t.splice) || M(t))) return !t.length;
        for (var e in t) if (tm.call(t, e)) return !1;
        return !0;
      }),
      (r.isEqual = function (t, e) {
        return g(t, e);
      }),
      (r.isFinite = function (t) {
        return "number" == typeof t && tk(t);
      }),
      (r.isFunction = W),
      (r.isNaN = function (t) {
        return B(t) && t != +t;
      }),
      (r.isNull = function (t) {
        return null === t;
      }),
      (r.isNumber = B),
      (r.isObject = j),
      (r.isRegExp = function (t) {
        return j(t) && "[object RegExp]" == t8.call(t);
      }),
      (r.isString = Y),
      (r.isUndefined = function (t) {
        return t === tt;
      }),
      (r.last = function (t) {
        var e = t ? t.length : 0;
        return e ? t[e - 1] : tt;
      }),
      (r.max = function (t) {
        return t && t.length ? e(t, G, z) : tt;
      }),
      (r.min = function (t) {
        return t && t.length ? e(t, G, U) : tt;
      }),
      (r.noConflict = function () {
        return tp._ === this && (tp._ = tb), this;
      }),
      (r.noop = function () {}),
      (r.reduce = O),
      (r.result = function (t, e, i) {
        return (
          (e = null == t ? tt : t[e]) === tt && (e = i), W(e) ? e.call(t) : e
        );
      }),
      (r.size = function (t) {
        return null == t ? 0 : (t = L(t) ? t : K(t)).length;
      }),
      (r.some = function (t, e, i) {
        return (e = i ? tt : e), k(t, m(e));
      }),
      (r.uniqueId = function (t) {
        var e = ++tv;
        return q(t) + e;
      }),
      (r.each = P),
      (r.first = I),
      Q(
        r,
        ((tD = {}),
        p(r, function (t, e) {
          tm.call(r.prototype, e) || (tD[e] = t);
        }),
        tD),
        { chain: !1 }
      ),
      (r.VERSION = "4.5.1"),
      tT(
        "pop join replace reverse split push shift sort splice unshift".split(
          " "
        ),
        function (t) {
          var e = (/^(?:replace|split)$/.test(t) ? String.prototype : tf)[t],
            i = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
            s = /^(?:pop|join|replace|shift)$/.test(t);
          r.prototype[t] = function () {
            var t = arguments;
            return s && !this.__chain__
              ? e.apply(this.value(), t)
              : this[i](function (i) {
                  return e.apply(i, t);
                });
          };
        }
      ),
      (r.prototype.toJSON =
        r.prototype.valueOf =
        r.prototype.value =
          function () {
            var e, i;
            return (
              (e = this.__wrapped__),
              O(
                (i = this.__actions__),
                function (e, i) {
                  return i.func.apply(i.thisArg, t([e], i.args));
                },
                e
              )
            );
          }),
      ((tu || tc || {})._ = r),
      "function" == typeof define && "object" == typeof define.amd && define.amd
        ? define(function () {
            return r;
          })
        : ta && tl
        ? (th && ((tl.exports = r)._ = r), (ta._ = r))
        : (tp._ = r);
  }.call(this),
  (window.mobileCheck = function () {
    var t,
      e = !1;
    return (
      (t = navigator.userAgent || navigator.vendor || window.opera),
      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        t
      ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          t.substr(0, 4)
        )) &&
        (e = !0),
      e
    );
  }),
  (function (t, e, i) {
    function s(t, e) {
      return typeof t === e;
    }
    function n(t, e) {
      return !!~("" + t).indexOf(e);
    }
    function o() {
      return "function" != typeof e.createElement
        ? e.createElement(arguments[0])
        : m
        ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0])
        : e.createElement.apply(e, arguments);
    }
    function r(t) {
      return t
        .replace(/([a-z])-([a-z])/g, function (t, e, i) {
          return e + i.toUpperCase();
        })
        .replace(/^-/, "");
    }
    function a(t, e) {
      return function () {
        return t.apply(e, arguments);
      };
    }
    function l(t) {
      return t
        .replace(/([A-Z])/g, function (t, e) {
          return "-" + e.toLowerCase();
        })
        .replace(/^ms-/, "-ms-");
    }
    function h(h, c, u, d, p) {
      var f = h.charAt(0).toUpperCase() + h.slice(1),
        v = (h + " " + b.join(f + " ") + f).split(" ");
      return s(c, "string") || s(c, "undefined")
        ? (function a(h, c, u, d) {
            function p() {
              v && (delete w.style, delete w.modElem);
            }
            if (((d = !s(d, "undefined") && d), !s(u, "undefined"))) {
              var f = (function s(n, r) {
                var a = n.length;
                if ("CSS" in t && "supports" in t.CSS) {
                  for (; a--; ) if (t.CSS.supports(l(n[a]), r)) return !0;
                  return !1;
                }
                if ("CSSSupportsRule" in t) {
                  for (var h = []; a--; ) h.push("(" + l(n[a]) + ":" + r + ")");
                  return (function t(i, s, n, r) {
                    var a,
                      l,
                      h,
                      c,
                      u,
                      d = "modernizr",
                      p = o("div"),
                      f =
                        ((a = e.body) ||
                          ((a = o(m ? "svg" : "body")).fake = !0),
                        a);
                    if (parseInt(n, 10))
                      for (; n--; )
                        ((c = o("div")).id = r ? r[n] : d + (n + 1)),
                          p.appendChild(c);
                    return (
                      ((l = o("style")).type = "text/css"),
                      (l.id = "s" + d),
                      (f.fake ? f : p).appendChild(l),
                      f.appendChild(p),
                      l.styleSheet
                        ? (l.styleSheet.cssText = i)
                        : l.appendChild(e.createTextNode(i)),
                      (p.id = d),
                      f.fake &&
                        ((f.style.background = ""),
                        (f.style.overflow = "hidden"),
                        (u = g.style.overflow),
                        (g.style.overflow = "hidden"),
                        g.appendChild(f)),
                      (h = s(p, i)),
                      f.fake
                        ? (f.parentNode.removeChild(f),
                          (g.style.overflow = u),
                          g.offsetHeight)
                        : p.parentNode.removeChild(p),
                      !!h
                    );
                  })(
                    "@supports (" +
                      (h = h.join(" or ")) +
                      ") { #modernizr { position: absolute; } }",
                    function (t) {
                      return "absolute" == getComputedStyle(t, null).position;
                    }
                  );
                }
                return i;
              })(h, u);
              if (!s(f, "undefined")) return f;
            }
            for (
              var v, b, $, y, _, k = ["modernizr", "tspan", "samp"];
              !w.style && k.length;

            )
              (v = !0), (w.modElem = o(k.shift())), (w.style = w.modElem.style);
            for ($ = h.length, b = 0; $ > b; b++)
              if (
                ((y = h[b]),
                (_ = w.style[y]),
                n(y, "-") && (y = r(y)),
                w.style[y] !== i)
              ) {
                if (d || s(u, "undefined")) return p(), "pfx" != c || y;
                try {
                  w.style[y] = u;
                } catch (C) {}
                if (w.style[y] != _) return p(), "pfx" != c || y;
              }
            return p(), !1;
          })(v, c, d, p)
        : (function t(e, i, n) {
            var o;
            for (var r in e)
              if (e[r] in i)
                return !1 === n
                  ? e[r]
                  : s((o = i[e[r]]), "function")
                  ? a(o, n || i)
                  : o;
            return !1;
          })((v = (h + " " + $.join(f + " ") + f).split(" ")), c, u);
    }
    function c(t, e, s) {
      return h(t, i, i, e, s);
    }
    var u = [],
      d = [],
      p = {
        _version: "3.3.1",
        _config: {
          classPrefix: "",
          enableClasses: !0,
          enableJSClass: !0,
          usePrefixes: !0,
        },
        _q: [],
        on: function (t, e) {
          var i = this;
          setTimeout(function () {
            e(i[t]);
          }, 0);
        },
        addTest: function (t, e, i) {
          d.push({ name: t, fn: e, options: i });
        },
        addAsyncTest: function (t) {
          d.push({ name: null, fn: t });
        },
      },
      f = function () {};
    (f.prototype = p),
      (f = new f()).addTest(
        "svg",
        !!e.createElementNS &&
          !!e.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
      );
    var g = e.documentElement,
      m = "svg" === g.nodeName.toLowerCase(),
      v = "Moz O ms Webkit",
      b = p._config.usePrefixes ? v.split(" ") : [];
    p._cssomPrefixes = b;
    var $ = p._config.usePrefixes ? v.toLowerCase().split(" ") : [];
    p._domPrefixes = $;
    var y = { elem: o("modernizr") };
    f._q.push(function () {
      delete y.elem;
    });
    var w = { style: y.elem.style };
    f._q.unshift(function () {
      delete w.style;
    }),
      (p.testAllProps = h),
      (p.testAllProps = c),
      f.addTest("flexbox", c("flexBasis", "1px", !0)),
      f.addTest("csstransforms", function () {
        return (
          -1 === navigator.userAgent.indexOf("Android 2.") &&
          c("transform", "scale(1)", !0)
        );
      }),
      (function t() {
        var e, i, n, o, r, a, l;
        for (var h in d)
          if (d.hasOwnProperty(h)) {
            if (
              ((e = []),
              (i = d[h]).name &&
                (e.push(i.name.toLowerCase()),
                i.options && i.options.aliases && i.options.aliases.length))
            )
              for (n = 0; n < i.options.aliases.length; n++)
                e.push(i.options.aliases[n].toLowerCase());
            for (
              o = s(i.fn, "function") ? i.fn() : i.fn, r = 0;
              r < e.length;
              r++
            )
              1 === (l = (a = e[r]).split(".")).length
                ? (f[l[0]] = o)
                : (!f[l[0]] ||
                    f[l[0]] instanceof Boolean ||
                    (f[l[0]] = new Boolean(f[l[0]])),
                  (f[l[0]][l[1]] = o)),
                u.push((o ? "" : "no-") + l.join("-"));
          }
      })(),
      (function t(e) {
        var i = g.className,
          s = f._config.classPrefix || "";
        if ((m && (i = i.baseVal), f._config.enableJSClass)) {
          var n = RegExp("(^|\\s)" + s + "no-js(\\s|$)");
          i = i.replace(n, "$1" + s + "js$2");
        }
        f._config.enableClasses &&
          ((i += " " + s + e.join(" " + s)),
          m ? (g.className.baseVal = i) : (g.className = i));
      })(u),
      delete p.addTest,
      delete p.addAsyncTest;
    for (var _ = 0; _ < f._q.length; _++) f._q[_]();
    t.Modernizr = f;
  })(window, document),
  (function (t) {
    t.fn.prepareTransition = function () {
      return this.each(function () {
        var e = t(this);
        e.one(
          "TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",
          function () {
            e.removeClass("is-transitioning");
          }
        );
        var i = 0;
        t.each(
          [
            "transition-duration",
            "-moz-transition-duration",
            "-webkit-transition-duration",
            "-o-transition-duration",
          ],
          function (t, s) {
            i || (i = parseFloat(e.css(s)));
          }
        ),
          0 != i && (e.addClass("is-transitioning"), e[0].offsetWidth);
      });
    };
  })(jQuery),
  (function (t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : "undefined" != typeof exports
      ? (module.exports = t(require("jquery")))
      : t(jQuery);
  })(function (t) {
    "use strict";
    var e,
      i = window.Slick || {};
    ((i =
      ((e = 0),
      function (i, s) {
        var n,
          o = this;
        (o.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: t(i),
          appendDots: t(i),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (e, i) {
            return t('<button type="button" />').text(i + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (o.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          t.extend(o, o.initials),
          (o.activeBreakpoint = null),
          (o.animType = null),
          (o.animProp = null),
          (o.breakpoints = []),
          (o.breakpointSettings = []),
          (o.cssTransitions = !1),
          (o.focussed = !1),
          (o.interrupted = !1),
          (o.hidden = "hidden"),
          (o.paused = !0),
          (o.positionProp = null),
          (o.respondTo = null),
          (o.rowCount = 1),
          (o.shouldClick = !0),
          (o.$slider = t(i)),
          (o.$slidesCache = null),
          (o.transformType = null),
          (o.transitionType = null),
          (o.visibilityChange = "visibilitychange"),
          (o.windowWidth = 0),
          (o.windowTimer = null),
          (n = t(i).data("slick") || {}),
          (o.options = t.extend({}, o.defaults, s, n)),
          (o.currentSlide = o.options.initialSlide),
          (o.originalSettings = o.options),
          void 0 !== document.mozHidden
            ? ((o.hidden = "mozHidden"),
              (o.visibilityChange = "mozvisibilitychange"))
            : void 0 !== document.webkitHidden &&
              ((o.hidden = "webkitHidden"),
              (o.visibilityChange = "webkitvisibilitychange")),
          (o.autoPlay = t.proxy(o.autoPlay, o)),
          (o.autoPlayClear = t.proxy(o.autoPlayClear, o)),
          (o.autoPlayIterator = t.proxy(o.autoPlayIterator, o)),
          (o.changeSlide = t.proxy(o.changeSlide, o)),
          (o.clickHandler = t.proxy(o.clickHandler, o)),
          (o.selectHandler = t.proxy(o.selectHandler, o)),
          (o.setPosition = t.proxy(o.setPosition, o)),
          (o.swipeHandler = t.proxy(o.swipeHandler, o)),
          (o.dragHandler = t.proxy(o.dragHandler, o)),
          (o.keyHandler = t.proxy(o.keyHandler, o)),
          (o.instanceUid = e++),
          (o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          o.registerBreakpoints(),
          o.init(!0);
      })).prototype.activateADA = function () {
      this.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
      (i.prototype.addSlide = i.prototype.slickAdd =
        function (e, i, s) {
          var n = this;
          if ("boolean" == typeof i) (s = i), (i = null);
          else if (i < 0 || i >= n.slideCount) return !1;
          n.unload(),
            "number" == typeof i
              ? 0 === i && 0 === n.$slides.length
                ? t(e).appendTo(n.$slideTrack)
                : s
                ? t(e).insertBefore(n.$slides.eq(i))
                : t(e).insertAfter(n.$slides.eq(i))
              : !0 === s
              ? t(e).prependTo(n.$slideTrack)
              : t(e).appendTo(n.$slideTrack),
            (n.$slides = n.$slideTrack.children(this.options.slide)),
            n.$slideTrack.children(this.options.slide).detach(),
            n.$slideTrack.append(n.$slides),
            n.$slides.each(function (e, i) {
              t(i).attr("data-slick-index", e);
            }),
            (n.$slidesCache = n.$slides),
            n.reinit();
        }),
      (i.prototype.animateHeight = function () {
        if (
          1 === this.options.slidesToShow &&
          !0 === this.options.adaptiveHeight &&
          !1 === this.options.vertical
        ) {
          var t = this.$slides.eq(this.currentSlide).outerHeight(!0);
          this.$list.animate({ height: t }, this.options.speed);
        }
      }),
      (i.prototype.animateSlide = function (e, i) {
        var s = {},
          n = this;
        n.animateHeight(),
          !0 === n.options.rtl && !1 === n.options.vertical && (e = -e),
          !1 === n.transformsEnabled
            ? !1 === n.options.vertical
              ? n.$slideTrack.animate(
                  { left: e },
                  n.options.speed,
                  n.options.easing,
                  i
                )
              : n.$slideTrack.animate(
                  { top: e },
                  n.options.speed,
                  n.options.easing,
                  i
                )
            : !1 === n.cssTransitions
            ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft),
              t({ animStart: n.currentLeft }).animate(
                { animStart: e },
                {
                  duration: n.options.speed,
                  easing: n.options.easing,
                  step: function (t) {
                    (t = Math.ceil(t)),
                      !1 === n.options.vertical
                        ? ((s[n.animType] = "translate(" + t + "px, 0px)"),
                          n.$slideTrack.css(s))
                        : ((s[n.animType] = "translate(0px," + t + "px)"),
                          n.$slideTrack.css(s));
                  },
                  complete: function () {
                    i && i.call();
                  },
                }
              ))
            : (n.applyTransition(),
              (e = Math.ceil(e)),
              !1 === n.options.vertical
                ? (s[n.animType] = "translate3d(" + e + "px, 0px, 0px)")
                : (s[n.animType] = "translate3d(0px," + e + "px, 0px)"),
              n.$slideTrack.css(s),
              i &&
                setTimeout(function () {
                  n.disableTransition(), i.call();
                }, n.options.speed));
      }),
      (i.prototype.getNavTarget = function () {
        var e = this.options.asNavFor;
        return e && null !== e && (e = t(e).not(this.$slider)), e;
      }),
      (i.prototype.asNavFor = function (e) {
        var i = this.getNavTarget();
        null !== i &&
          "object" == typeof i &&
          i.each(function () {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0);
          });
      }),
      (i.prototype.applyTransition = function (t) {
        var e = this,
          i = {};
        !1 === e.options.fade
          ? (i[e.transitionType] =
              e.transformType +
              " " +
              e.options.speed +
              "ms " +
              e.options.cssEase)
          : (i[e.transitionType] =
              "opacity " + e.options.speed + "ms " + e.options.cssEase),
          !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
      }),
      (i.prototype.autoPlay = function () {
        var t = this;
        t.autoPlayClear(),
          t.slideCount > t.options.slidesToShow &&
            (t.autoPlayTimer = setInterval(
              t.autoPlayIterator,
              t.options.autoplaySpeed
            ));
      }),
      (i.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
      }),
      (i.prototype.autoPlayIterator = function () {
        var t = this,
          e = t.currentSlide + t.options.slidesToScroll;
        t.paused ||
          t.interrupted ||
          t.focussed ||
          (!1 === t.options.infinite &&
            (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1
              ? (t.direction = 0)
              : 0 === t.direction &&
                ((e = t.currentSlide - t.options.slidesToScroll),
                t.currentSlide - 1 == 0 && (t.direction = 1))),
          t.slideHandler(e));
      }),
      (i.prototype.buildArrows = function () {
        var e = this;
        !0 === e.options.arrows &&
          ((e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow")),
          (e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow")),
          e.slideCount > e.options.slidesToShow
            ? (e.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.htmlExpr.test(e.options.prevArrow) &&
                e.$prevArrow.prependTo(e.options.appendArrows),
              e.htmlExpr.test(e.options.nextArrow) &&
                e.$nextArrow.appendTo(e.options.appendArrows),
              !0 !== e.options.infinite &&
                e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : e.$prevArrow
                .add(e.$nextArrow)
                .addClass("slick-hidden")
                .attr({ "aria-disabled": "true", tabindex: "-1" }));
      }),
      (i.prototype.buildDots = function () {
        var e,
          i,
          s = this;
        if (!0 === s.options.dots) {
          for (
            s.$slider.addClass("slick-dotted"),
              i = t("<ul />").addClass(s.options.dotsClass),
              e = 0;
            e <= s.getDotCount();
            e += 1
          )
            i.append(
              t("<li />").append(s.options.customPaging.call(this, s, e))
            );
          (s.$dots = i.appendTo(s.options.appendDots)),
            s.$dots.find("li").first().addClass("slick-active");
        }
      }),
      (i.prototype.buildOut = function () {
        var e = this;
        (e.$slides = e.$slider
          .children(e.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.$slides.each(function (e, i) {
            t(i)
              .attr("data-slick-index", e)
              .data("originalStyling", t(i).attr("style") || "");
          }),
          e.$slider.addClass("slick-slider"),
          (e.$slideTrack =
            0 === e.slideCount
              ? t('<div class="slick-track"/>').appendTo(e.$slider)
              : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          e.$slideTrack.css("opacity", 0),
          (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
            (e.options.slidesToScroll = 1),
          t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
          e.setupInfinite(),
          e.buildArrows(),
          e.buildDots(),
          e.updateDots(),
          e.setSlideClasses(
            "number" == typeof e.currentSlide ? e.currentSlide : 0
          ),
          !0 === e.options.draggable && e.$list.addClass("draggable");
      }),
      (i.prototype.buildRows = function () {
        var t, e, i, s, n, o, r;
        if (
          ((s = document.createDocumentFragment()),
          (o = this.$slider.children()),
          this.options.rows > 1)
        ) {
          for (
            r = this.options.slidesPerRow * this.options.rows,
              n = Math.ceil(o.length / r),
              t = 0;
            t < n;
            t++
          ) {
            var a = document.createElement("div");
            for (e = 0; e < this.options.rows; e++) {
              var l = document.createElement("div");
              for (i = 0; i < this.options.slidesPerRow; i++) {
                var h = t * r + (e * this.options.slidesPerRow + i);
                o.get(h) && l.appendChild(o.get(h));
              }
              a.appendChild(l);
            }
            s.appendChild(a);
          }
          this.$slider.empty().append(s),
            this.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / this.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (i.prototype.checkResponsive = function (e, i) {
        var s,
          n,
          o,
          r = this,
          a = !1,
          l = r.$slider.width(),
          h = window.innerWidth || t(window).width();
        if (
          ("window" === r.respondTo
            ? (o = h)
            : "slider" === r.respondTo
            ? (o = l)
            : "min" === r.respondTo && (o = Math.min(h, l)),
          r.options.responsive &&
            r.options.responsive.length &&
            null !== r.options.responsive)
        ) {
          for (s in ((n = null), r.breakpoints))
            r.breakpoints.hasOwnProperty(s) &&
              (!1 === r.originalSettings.mobileFirst
                ? o < r.breakpoints[s] && (n = r.breakpoints[s])
                : o > r.breakpoints[s] && (n = r.breakpoints[s]));
          null !== n
            ? null !== r.activeBreakpoint
              ? (n !== r.activeBreakpoint || i) &&
                ((r.activeBreakpoint = n),
                "unslick" === r.breakpointSettings[n]
                  ? r.unslick(n)
                  : ((r.options = t.extend(
                      {},
                      r.originalSettings,
                      r.breakpointSettings[n]
                    )),
                    !0 === e && (r.currentSlide = r.options.initialSlide),
                    r.refresh(e)),
                (a = n))
              : ((r.activeBreakpoint = n),
                "unslick" === r.breakpointSettings[n]
                  ? r.unslick(n)
                  : ((r.options = t.extend(
                      {},
                      r.originalSettings,
                      r.breakpointSettings[n]
                    )),
                    !0 === e && (r.currentSlide = r.options.initialSlide),
                    r.refresh(e)),
                (a = n))
            : null !== r.activeBreakpoint &&
              ((r.activeBreakpoint = null),
              (r.options = r.originalSettings),
              !0 === e && (r.currentSlide = r.options.initialSlide),
              r.refresh(e),
              (a = n)),
            e || !1 === a || r.$slider.trigger("breakpoint", [r, a]);
        }
      }),
      (i.prototype.changeSlide = function (e, i) {
        var s,
          n,
          o,
          r = t(e.currentTarget);
        switch (
          (r.is("a") && e.preventDefault(),
          r.is("li") || (r = r.closest("li")),
          (s = (o = this.slideCount % this.options.slidesToScroll != 0)
            ? 0
            : (this.slideCount - this.currentSlide) %
              this.options.slidesToScroll),
          e.data.message)
        ) {
          case "previous":
            (n =
              0 === s
                ? this.options.slidesToScroll
                : this.options.slidesToShow - s),
              this.slideCount > this.options.slidesToShow &&
                this.slideHandler(this.currentSlide - n, !1, i);
            break;
          case "next":
            (n = 0 === s ? this.options.slidesToScroll : s),
              this.slideCount > this.options.slidesToShow &&
                this.slideHandler(this.currentSlide + n, !1, i);
            break;
          case "index":
            var a =
              0 === e.data.index
                ? 0
                : e.data.index || r.index() * this.options.slidesToScroll;
            this.slideHandler(this.checkNavigable(a), !1, i),
              r.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (i.prototype.checkNavigable = function (t) {
        var e, i;
        if (((e = this.getNavigableIndexes()), (i = 0), t > e[e.length - 1]))
          t = e[e.length - 1];
        else
          for (var s in e) {
            if (t < e[s]) {
              t = i;
              break;
            }
            i = e[s];
          }
        return t;
      }),
      (i.prototype.cleanUpEvents = function () {
        this.options.dots &&
          null !== this.$dots &&
          (t("li", this.$dots)
            .off("click.slick", this.changeSlide)
            .off("mouseenter.slick", t.proxy(this.interrupt, this, !0))
            .off("mouseleave.slick", t.proxy(this.interrupt, this, !1)),
          !0 === this.options.accessibility &&
            this.$dots.off("keydown.slick", this.keyHandler)),
          this.$slider.off("focus.slick blur.slick"),
          !0 === this.options.arrows &&
            this.slideCount > this.options.slidesToShow &&
            (this.$prevArrow &&
              this.$prevArrow.off("click.slick", this.changeSlide),
            this.$nextArrow &&
              this.$nextArrow.off("click.slick", this.changeSlide),
            !0 === this.options.accessibility &&
              (this.$prevArrow &&
                this.$prevArrow.off("keydown.slick", this.keyHandler),
              this.$nextArrow &&
                this.$nextArrow.off("keydown.slick", this.keyHandler))),
          this.$list.off("touchstart.slick mousedown.slick", this.swipeHandler),
          this.$list.off("touchmove.slick mousemove.slick", this.swipeHandler),
          this.$list.off("touchend.slick mouseup.slick", this.swipeHandler),
          this.$list.off(
            "touchcancel.slick mouseleave.slick",
            this.swipeHandler
          ),
          this.$list.off("click.slick", this.clickHandler),
          t(document).off(this.visibilityChange, this.visibility),
          this.cleanUpSlideEvents(),
          !0 === this.options.accessibility &&
            this.$list.off("keydown.slick", this.keyHandler),
          !0 === this.options.focusOnSelect &&
            t(this.$slideTrack)
              .children()
              .off("click.slick", this.selectHandler),
          t(window).off(
            "orientationchange.slick.slick-" + this.instanceUid,
            this.orientationChange
          ),
          t(window).off("resize.slick.slick-" + this.instanceUid, this.resize),
          t("[draggable!=true]", this.$slideTrack).off(
            "dragstart",
            this.preventDefault
          ),
          t(window).off(
            "load.slick.slick-" + this.instanceUid,
            this.setPosition
          );
      }),
      (i.prototype.cleanUpSlideEvents = function () {
        this.$list.off("mouseenter.slick", t.proxy(this.interrupt, this, !0)),
          this.$list.off("mouseleave.slick", t.proxy(this.interrupt, this, !1));
      }),
      (i.prototype.cleanUpRows = function () {
        var t;
        this.options.rows > 1 &&
          ((t = this.$slides.children().children()).removeAttr("style"),
          this.$slider.empty().append(t));
      }),
      (i.prototype.clickHandler = function (t) {
        !1 === this.shouldClick &&
          (t.stopImmediatePropagation(),
          t.stopPropagation(),
          t.preventDefault());
      }),
      (i.prototype.destroy = function (e) {
        var i = this;
        i.autoPlayClear(),
          (i.touchObject = {}),
          i.cleanUpEvents(),
          t(".slick-cloned", i.$slider).detach(),
          i.$dots && i.$dots.remove(),
          i.$prevArrow &&
            i.$prevArrow.length &&
            (i.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
          i.$nextArrow &&
            i.$nextArrow.length &&
            (i.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
          i.$slides &&
            (i.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                t(this).attr("style", t(this).data("originalStyling"));
              }),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slideTrack.detach(),
            i.$list.detach(),
            i.$slider.append(i.$slides)),
          i.cleanUpRows(),
          i.$slider.removeClass("slick-slider"),
          i.$slider.removeClass("slick-initialized"),
          i.$slider.removeClass("slick-dotted"),
          (i.unslicked = !0),
          e || i.$slider.trigger("destroy", [i]);
      }),
      (i.prototype.disableTransition = function (t) {
        var e = this,
          i = {};
        (i[e.transitionType] = ""),
          !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
      }),
      (i.prototype.fadeSlide = function (t, e) {
        var i = this;
        !1 === i.cssTransitions
          ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }),
            i.$slides
              .eq(t)
              .animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
          : (i.applyTransition(t),
            i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
            e &&
              setTimeout(function () {
                i.disableTransition(t), e.call();
              }, i.options.speed));
      }),
      (i.prototype.fadeSlideOut = function (t) {
        !1 === this.cssTransitions
          ? this.$slides
              .eq(t)
              .animate(
                { opacity: 0, zIndex: this.options.zIndex - 2 },
                this.options.speed,
                this.options.easing
              )
          : (this.applyTransition(t),
            this.$slides
              .eq(t)
              .css({ opacity: 0, zIndex: this.options.zIndex - 2 }));
      }),
      (i.prototype.filterSlides = i.prototype.slickFilter =
        function (t) {
          var e = this;
          null !== t &&
            ((e.$slidesCache = e.$slides),
            e.unload(),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slidesCache.filter(t).appendTo(e.$slideTrack),
            e.reinit());
        }),
      (i.prototype.focusHandler = function () {
        var e = this;
        e.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*", function (i) {
            i.stopImmediatePropagation();
            var s = t(this);
            setTimeout(function () {
              e.options.pauseOnFocus &&
                ((e.focussed = s.is(":focus")), e.autoPlay());
            }, 0);
          });
      }),
      (i.prototype.getCurrent = i.prototype.slickCurrentSlide =
        function () {
          return this.currentSlide;
        }),
      (i.prototype.getDotCount = function () {
        var t = 0,
          e = 0,
          i = 0;
        if (!0 === this.options.infinite) {
          if (this.slideCount <= this.options.slidesToShow) ++i;
          else
            for (; t < this.slideCount; )
              ++i,
                (t = e + this.options.slidesToScroll),
                (e +=
                  this.options.slidesToScroll <= this.options.slidesToShow
                    ? this.options.slidesToScroll
                    : this.options.slidesToShow);
        } else if (!0 === this.options.centerMode) i = this.slideCount;
        else if (this.options.asNavFor)
          for (; t < this.slideCount; )
            ++i,
              (t = e + this.options.slidesToScroll),
              (e +=
                this.options.slidesToScroll <= this.options.slidesToShow
                  ? this.options.slidesToScroll
                  : this.options.slidesToShow);
        else
          i =
            1 +
            Math.ceil(
              (this.slideCount - this.options.slidesToShow) /
                this.options.slidesToScroll
            );
        return i - 1;
      }),
      (i.prototype.getLeft = function (t) {
        var e,
          i,
          s,
          n,
          o = this,
          r = 0;
        return (
          (o.slideOffset = 0),
          (i = o.$slides.first().outerHeight(!0)),
          !0 === o.options.infinite
            ? (o.slideCount > o.options.slidesToShow &&
                ((o.slideOffset = -(o.slideWidth * o.options.slidesToShow * 1)),
                (n = -1),
                !0 === o.options.vertical &&
                  !0 === o.options.centerMode &&
                  (2 === o.options.slidesToShow
                    ? (n = -1.5)
                    : 1 === o.options.slidesToShow && (n = -2)),
                (r = i * o.options.slidesToShow * n)),
              o.slideCount % o.options.slidesToScroll != 0 &&
                t + o.options.slidesToScroll > o.slideCount &&
                o.slideCount > o.options.slidesToShow &&
                (t > o.slideCount
                  ? ((o.slideOffset = -(
                      (o.options.slidesToShow - (t - o.slideCount)) *
                      o.slideWidth *
                      1
                    )),
                    (r = -(
                      (o.options.slidesToShow - (t - o.slideCount)) *
                      i *
                      1
                    )))
                  : ((o.slideOffset = -(
                      (o.slideCount % o.options.slidesToScroll) *
                      o.slideWidth *
                      1
                    )),
                    (r = -(
                      (o.slideCount % o.options.slidesToScroll) *
                      i *
                      1
                    )))))
            : t + o.options.slidesToShow > o.slideCount &&
              ((o.slideOffset =
                (t + o.options.slidesToShow - o.slideCount) * o.slideWidth),
              (r = (t + o.options.slidesToShow - o.slideCount) * i)),
          o.slideCount <= o.options.slidesToShow &&
            ((o.slideOffset = 0), (r = 0)),
          !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow
            ? (o.slideOffset =
                (o.slideWidth * Math.floor(o.options.slidesToShow)) / 2 -
                (o.slideWidth * o.slideCount) / 2)
            : !0 === o.options.centerMode && !0 === o.options.infinite
            ? (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2) -
                o.slideWidth)
            : !0 === o.options.centerMode &&
              ((o.slideOffset = 0),
              (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2))),
          (e =
            !1 === o.options.vertical
              ? -(t * o.slideWidth * 1) + o.slideOffset
              : -(t * i * 1) + r),
          !0 === o.options.variableWidth &&
            ((s =
              o.slideCount <= o.options.slidesToShow ||
              !1 === o.options.infinite
                ? o.$slideTrack.children(".slick-slide").eq(t)
                : o.$slideTrack
                    .children(".slick-slide")
                    .eq(t + o.options.slidesToShow)),
            (e =
              !0 === o.options.rtl
                ? s[0]
                  ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                  : 0
                : s[0]
                ? -1 * s[0].offsetLeft
                : 0),
            !0 === o.options.centerMode &&
              ((s =
                o.slideCount <= o.options.slidesToShow ||
                !1 === o.options.infinite
                  ? o.$slideTrack.children(".slick-slide").eq(t)
                  : o.$slideTrack
                      .children(".slick-slide")
                      .eq(t + o.options.slidesToShow + 1)),
              (e =
                !0 === o.options.rtl
                  ? s[0]
                    ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                    : 0
                  : s[0]
                  ? -1 * s[0].offsetLeft
                  : 0),
              (e += (o.$list.width() - s.outerWidth()) / 2))),
          e
        );
      }),
      (i.prototype.getOption = i.prototype.slickGetOption =
        function (t) {
          return this.options[t];
        }),
      (i.prototype.getNavigableIndexes = function () {
        var t,
          e = 0,
          i = 0,
          s = [];
        for (
          !1 === this.options.infinite
            ? (t = this.slideCount)
            : ((e = -1 * this.options.slidesToScroll),
              (i = -1 * this.options.slidesToScroll),
              (t = 2 * this.slideCount));
          e < t;

        )
          s.push(e),
            (e = i + this.options.slidesToScroll),
            (i +=
              this.options.slidesToScroll <= this.options.slidesToShow
                ? this.options.slidesToScroll
                : this.options.slidesToShow);
        return s;
      }),
      (i.prototype.getSlick = function () {
        return this;
      }),
      (i.prototype.getSlideCount = function () {
        var e,
          i,
          s = this;
        return (
          (i =
            !0 === s.options.centerMode
              ? s.slideWidth * Math.floor(s.options.slidesToShow / 2)
              : 0),
          !0 === s.options.swipeToSlide
            ? (s.$slideTrack.find(".slick-slide").each(function (n, o) {
                if (o.offsetLeft - i + t(o).outerWidth() / 2 > -1 * s.swipeLeft)
                  return (e = o), !1;
              }),
              Math.abs(t(e).attr("data-slick-index") - s.currentSlide) || 1)
            : s.options.slidesToScroll
        );
      }),
      (i.prototype.goTo = i.prototype.slickGoTo =
        function (t, e) {
          this.changeSlide(
            { data: { message: "index", index: parseInt(t) } },
            e
          );
        }),
      (i.prototype.init = function (e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") ||
          (t(i.$slider).addClass("slick-initialized"),
          i.buildRows(),
          i.buildOut(),
          i.setProps(),
          i.startLoad(),
          i.loadSlider(),
          i.initializeEvents(),
          i.updateArrows(),
          i.updateDots(),
          i.checkResponsive(!0),
          i.focusHandler()),
          e && i.$slider.trigger("init", [i]),
          !0 === i.options.accessibility && i.initADA(),
          i.options.autoplay && ((i.paused = !1), i.autoPlay());
      }),
      (i.prototype.initADA = function () {
        var e = this,
          i = Math.ceil(e.slideCount / e.options.slidesToShow),
          s = e.getNavigableIndexes().filter(function (t) {
            return t >= 0 && t < e.slideCount;
          });
        e.$slides
          .add(e.$slideTrack.find(".slick-cloned"))
          .attr({ "aria-hidden": "true", tabindex: "-1" })
          .find("a, input, button, select")
          .attr({ tabindex: "-1" }),
          null !== e.$dots &&
            (e.$slides
              .not(e.$slideTrack.find(".slick-cloned"))
              .each(function (i) {
                var n = s.indexOf(i);
                t(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + e.instanceUid + i,
                  tabindex: -1,
                }),
                  -1 !== n &&
                    t(this).attr({
                      "aria-describedby":
                        "slick-slide-control" + e.instanceUid + n,
                    });
              }),
            e.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (n) {
                var o = s[n];
                t(this).attr({ role: "presentation" }),
                  t(this)
                    .find("button")
                    .first()
                    .attr({
                      role: "tab",
                      id: "slick-slide-control" + e.instanceUid + n,
                      "aria-controls": "slick-slide" + e.instanceUid + o,
                      "aria-label": n + 1 + " of " + i,
                      "aria-selected": null,
                      tabindex: "-1",
                    });
              })
              .eq(e.currentSlide)
              .find("button")
              .attr({ "aria-selected": "true", tabindex: "0" })
              .end());
        for (var n = e.currentSlide, o = n + e.options.slidesToShow; n < o; n++)
          e.$slides.eq(n).attr("tabindex", 0);
        e.activateADA();
      }),
      (i.prototype.initArrowEvents = function () {
        !0 === this.options.arrows &&
          this.slideCount > this.options.slidesToShow &&
          (this.$prevArrow
            .off("click.slick")
            .on("click.slick", { message: "previous" }, this.changeSlide),
          this.$nextArrow
            .off("click.slick")
            .on("click.slick", { message: "next" }, this.changeSlide),
          !0 === this.options.accessibility &&
            (this.$prevArrow.on("keydown.slick", this.keyHandler),
            this.$nextArrow.on("keydown.slick", this.keyHandler)));
      }),
      (i.prototype.initDotEvents = function () {
        !0 === this.options.dots &&
          (t("li", this.$dots).on(
            "click.slick",
            { message: "index" },
            this.changeSlide
          ),
          !0 === this.options.accessibility &&
            this.$dots.on("keydown.slick", this.keyHandler)),
          !0 === this.options.dots &&
            !0 === this.options.pauseOnDotsHover &&
            t("li", this.$dots)
              .on("mouseenter.slick", t.proxy(this.interrupt, this, !0))
              .on("mouseleave.slick", t.proxy(this.interrupt, this, !1));
      }),
      (i.prototype.initSlideEvents = function () {
        this.options.pauseOnHover &&
          (this.$list.on("mouseenter.slick", t.proxy(this.interrupt, this, !0)),
          this.$list.on("mouseleave.slick", t.proxy(this.interrupt, this, !1)));
      }),
      (i.prototype.initializeEvents = function () {
        this.initArrowEvents(),
          this.initDotEvents(),
          this.initSlideEvents(),
          this.$list.on(
            "touchstart.slick mousedown.slick",
            { action: "start" },
            this.swipeHandler
          ),
          this.$list.on(
            "touchmove.slick mousemove.slick",
            { action: "move" },
            this.swipeHandler
          ),
          this.$list.on(
            "touchend.slick mouseup.slick",
            { action: "end" },
            this.swipeHandler
          ),
          this.$list.on(
            "touchcancel.slick mouseleave.slick",
            { action: "end" },
            this.swipeHandler
          ),
          this.$list.on("click.slick", this.clickHandler),
          t(document).on(this.visibilityChange, t.proxy(this.visibility, this)),
          !0 === this.options.accessibility &&
            this.$list.on("keydown.slick", this.keyHandler),
          !0 === this.options.focusOnSelect &&
            t(this.$slideTrack)
              .children()
              .on("click.slick", this.selectHandler),
          t(window).on(
            "orientationchange.slick.slick-" + this.instanceUid,
            t.proxy(this.orientationChange, this)
          ),
          t(window).on(
            "resize.slick.slick-" + this.instanceUid,
            t.proxy(this.resize, this)
          ),
          t("[draggable!=true]", this.$slideTrack).on(
            "dragstart",
            this.preventDefault
          ),
          t(window).on(
            "load.slick.slick-" + this.instanceUid,
            this.setPosition
          ),
          t(this.setPosition);
      }),
      (i.prototype.initUI = function () {
        !0 === this.options.arrows &&
          this.slideCount > this.options.slidesToShow &&
          (this.$prevArrow.show(), this.$nextArrow.show()),
          !0 === this.options.dots &&
            this.slideCount > this.options.slidesToShow &&
            this.$dots.show();
      }),
      (i.prototype.keyHandler = function (t) {
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === t.keyCode && !0 === this.options.accessibility
            ? this.changeSlide({
                data: {
                  message: !0 === this.options.rtl ? "next" : "previous",
                },
              })
            : 39 === t.keyCode &&
              !0 === this.options.accessibility &&
              this.changeSlide({
                data: {
                  message: !0 === this.options.rtl ? "previous" : "next",
                },
              }));
      }),
      (i.prototype.lazyLoad = function () {
        function e(e) {
          t("img[data-lazy]", e).each(function () {
            var e = t(this),
              i = t(this).attr("data-lazy"),
              s = t(this).attr("data-srcset"),
              n = t(this).attr("data-sizes") || o.$slider.attr("data-sizes"),
              r = document.createElement("img");
            (r.onload = function () {
              e.animate({ opacity: 0 }, 100, function () {
                s && (e.attr("srcset", s), n && e.attr("sizes", n)),
                  e.attr("src", i).animate({ opacity: 1 }, 200, function () {
                    e.removeAttr(
                      "data-lazy data-srcset data-sizes"
                    ).removeClass("slick-loading");
                  }),
                  o.$slider.trigger("lazyLoaded", [o, e, i]);
              });
            }),
              (r.onerror = function () {
                e
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  o.$slider.trigger("lazyLoadError", [o, e, i]);
              }),
              (r.src = i);
          });
        }
        var i,
          s,
          n,
          o = this;
        if (
          (!0 === o.options.centerMode
            ? !0 === o.options.infinite
              ? (n =
                  (s = o.currentSlide + (o.options.slidesToShow / 2 + 1)) +
                  o.options.slidesToShow +
                  2)
              : ((s = Math.max(
                  0,
                  o.currentSlide - (o.options.slidesToShow / 2 + 1)
                )),
                (n = o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide))
            : ((n = Math.ceil(
                (s = o.options.infinite
                  ? o.options.slidesToShow + o.currentSlide
                  : o.currentSlide) + o.options.slidesToShow
              )),
              !0 === o.options.fade &&
                (s > 0 && s--, n <= o.slideCount && n++)),
          (i = o.$slider.find(".slick-slide").slice(s, n)),
          "anticipated" === o.options.lazyLoad)
        )
          for (
            var r = s - 1, a = n, l = o.$slider.find(".slick-slide"), h = 0;
            h < o.options.slidesToScroll;
            h++
          )
            r < 0 && (r = o.slideCount - 1),
              (i = (i = i.add(l.eq(r))).add(l.eq(a))),
              r--,
              a++;
        e(i),
          o.slideCount <= o.options.slidesToShow
            ? e(o.$slider.find(".slick-slide"))
            : o.currentSlide >= o.slideCount - o.options.slidesToShow
            ? e(
                o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)
              )
            : 0 === o.currentSlide &&
              e(
                o.$slider
                  .find(".slick-cloned")
                  .slice(-1 * o.options.slidesToShow)
              );
      }),
      (i.prototype.loadSlider = function () {
        this.setPosition(),
          this.$slideTrack.css({ opacity: 1 }),
          this.$slider.removeClass("slick-loading"),
          this.initUI(),
          "progressive" === this.options.lazyLoad && this.progressiveLazyLoad();
      }),
      (i.prototype.next = i.prototype.slickNext =
        function () {
          this.changeSlide({ data: { message: "next" } });
        }),
      (i.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition();
      }),
      (i.prototype.pause = i.prototype.slickPause =
        function () {
          var t = this;
          t.autoPlayClear(), (t.paused = !0);
        }),
      (i.prototype.play = i.prototype.slickPlay =
        function () {
          var t = this;
          t.autoPlay(),
            (t.options.autoplay = !0),
            (t.paused = !1),
            (t.focussed = !1),
            (t.interrupted = !1);
        }),
      (i.prototype.postSlide = function (e) {
        var i = this;
        i.unslicked ||
          (i.$slider.trigger("afterChange", [i, e]),
          (i.animating = !1),
          i.slideCount > i.options.slidesToShow && i.setPosition(),
          (i.swipeLeft = null),
          i.options.autoplay && i.autoPlay(),
          !0 === i.options.accessibility &&
            (i.initADA(),
            i.options.focusOnChange &&
              t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()));
      }),
      (i.prototype.prev = i.prototype.slickPrev =
        function () {
          this.changeSlide({ data: { message: "previous" } });
        }),
      (i.prototype.preventDefault = function (t) {
        t.preventDefault();
      }),
      (i.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var i,
          s,
          n,
          o,
          r,
          a = this,
          l = t("img[data-lazy]", a.$slider);
        l.length
          ? ((s = (i = l.first()).attr("data-lazy")),
            (n = i.attr("data-srcset")),
            (o = i.attr("data-sizes") || a.$slider.attr("data-sizes")),
            ((r = document.createElement("img")).onload = function () {
              n && (i.attr("srcset", n), o && i.attr("sizes", o)),
                i
                  .attr("src", s)
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading"),
                !0 === a.options.adaptiveHeight && a.setPosition(),
                a.$slider.trigger("lazyLoaded", [a, i, s]),
                a.progressiveLazyLoad();
            }),
            (r.onerror = function () {
              e < 3
                ? setTimeout(function () {
                    a.progressiveLazyLoad(e + 1);
                  }, 500)
                : (i
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  a.$slider.trigger("lazyLoadError", [a, i, s]),
                  a.progressiveLazyLoad());
            }),
            (r.src = s))
          : a.$slider.trigger("allImagesLoaded", [a]);
      }),
      (i.prototype.refresh = function (e) {
        var i,
          s,
          n = this;
        (s = n.slideCount - n.options.slidesToShow),
          !n.options.infinite && n.currentSlide > s && (n.currentSlide = s),
          n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0),
          (i = n.currentSlide),
          n.destroy(!0),
          t.extend(n, n.initials, { currentSlide: i }),
          n.init(),
          e || n.changeSlide({ data: { message: "index", index: i } }, !1);
      }),
      (i.prototype.registerBreakpoints = function () {
        var e,
          i,
          s,
          n = this,
          o = n.options.responsive || null;
        if ("array" === t.type(o) && o.length) {
          for (e in ((n.respondTo = n.options.respondTo || "window"), o))
            if (((s = n.breakpoints.length - 1), o.hasOwnProperty(e))) {
              for (i = o[e].breakpoint; s >= 0; )
                n.breakpoints[s] &&
                  n.breakpoints[s] === i &&
                  n.breakpoints.splice(s, 1),
                  s--;
              n.breakpoints.push(i), (n.breakpointSettings[i] = o[e].settings);
            }
          n.breakpoints.sort(function (t, e) {
            return n.options.mobileFirst ? t - e : e - t;
          });
        }
      }),
      (i.prototype.reinit = function () {
        var e = this;
        (e.$slides = e.$slideTrack
          .children(e.options.slide)
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.currentSlide >= e.slideCount &&
            0 !== e.currentSlide &&
            (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          e.registerBreakpoints(),
          e.setProps(),
          e.setupInfinite(),
          e.buildArrows(),
          e.updateArrows(),
          e.initArrowEvents(),
          e.buildDots(),
          e.updateDots(),
          e.initDotEvents(),
          e.cleanUpSlideEvents(),
          e.initSlideEvents(),
          e.checkResponsive(!1, !0),
          !0 === e.options.focusOnSelect &&
            t(e.$slideTrack).children().on("click.slick", e.selectHandler),
          e.setSlideClasses(
            "number" == typeof e.currentSlide ? e.currentSlide : 0
          ),
          e.setPosition(),
          e.focusHandler(),
          (e.paused = !e.options.autoplay),
          e.autoPlay(),
          e.$slider.trigger("reInit", [e]);
      }),
      (i.prototype.resize = function () {
        var e = this;
        t(window).width() !== e.windowWidth &&
          (clearTimeout(e.windowDelay),
          (e.windowDelay = window.setTimeout(function () {
            (e.windowWidth = t(window).width()),
              e.checkResponsive(),
              e.unslicked || e.setPosition();
          }, 50)));
      }),
      (i.prototype.removeSlide = i.prototype.slickRemove =
        function (t, e, i) {
          var s = this;
          if (
            ((t =
              "boolean" == typeof t
                ? !0 === (e = t)
                  ? 0
                  : s.slideCount - 1
                : !0 === e
                ? --t
                : t),
            s.slideCount < 1 || t < 0 || t > s.slideCount - 1)
          )
            return !1;
          s.unload(),
            !0 === i
              ? s.$slideTrack.children().remove()
              : s.$slideTrack.children(this.options.slide).eq(t).remove(),
            (s.$slides = s.$slideTrack.children(this.options.slide)),
            s.$slideTrack.children(this.options.slide).detach(),
            s.$slideTrack.append(s.$slides),
            (s.$slidesCache = s.$slides),
            s.reinit();
        }),
      (i.prototype.setCSS = function (t) {
        var e,
          i,
          s = this,
          n = {};
        !0 === s.options.rtl && (t = -t),
          (e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px"),
          (i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px"),
          (n[s.positionProp] = t),
          !1 === s.transformsEnabled
            ? s.$slideTrack.css(n)
            : ((n = {}),
              !1 === s.cssTransitions
                ? ((n[s.animType] = "translate(" + e + ", " + i + ")"),
                  s.$slideTrack.css(n))
                : ((n[s.animType] = "translate3d(" + e + ", " + i + ", 0px)"),
                  s.$slideTrack.css(n)));
      }),
      (i.prototype.setDimensions = function () {
        var t = this;
        !1 === t.options.vertical
          ? !0 === t.options.centerMode &&
            t.$list.css({ padding: "0px " + t.options.centerPadding })
          : (t.$list.height(
              t.$slides.first().outerHeight(!0) * t.options.slidesToShow
            ),
            !0 === t.options.centerMode &&
              t.$list.css({ padding: t.options.centerPadding + " 0px" })),
          (t.listWidth = t.$list.width()),
          (t.listHeight = t.$list.height()),
          !1 === t.options.vertical && !1 === t.options.variableWidth
            ? ((t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow)),
              t.$slideTrack.width(
                Math.ceil(
                  t.slideWidth * t.$slideTrack.children(".slick-slide").length
                )
              ))
            : !0 === t.options.variableWidth
            ? t.$slideTrack.width(5e3 * t.slideCount)
            : ((t.slideWidth = Math.ceil(t.listWidth)),
              t.$slideTrack.height(
                Math.ceil(
                  t.$slides.first().outerHeight(!0) *
                    t.$slideTrack.children(".slick-slide").length
                )
              ));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth &&
          t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
      }),
      (i.prototype.setFade = function () {
        var e,
          i = this;
        i.$slides.each(function (s, n) {
          (e = -(i.slideWidth * s * 1)),
            !0 === i.options.rtl
              ? t(n).css({
                  position: "relative",
                  right: e,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0,
                })
              : t(n).css({
                  position: "relative",
                  left: e,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          i.$slides
            .eq(i.currentSlide)
            .css({ zIndex: i.options.zIndex - 1, opacity: 1 });
      }),
      (i.prototype.setHeight = function () {
        if (
          1 === this.options.slidesToShow &&
          !0 === this.options.adaptiveHeight &&
          !1 === this.options.vertical
        ) {
          var t = this.$slides.eq(this.currentSlide).outerHeight(!0);
          this.$list.css("height", t);
        }
      }),
      (i.prototype.setOption = i.prototype.slickSetOption =
        function () {
          var e,
            i,
            s,
            n,
            o,
            r = this,
            a = !1;
          if (
            ("object" === t.type(arguments[0])
              ? ((s = arguments[0]), (a = arguments[1]), (o = "multiple"))
              : "string" === t.type(arguments[0]) &&
                ((s = arguments[0]),
                (n = arguments[1]),
                (a = arguments[2]),
                "responsive" === arguments[0] &&
                "array" === t.type(arguments[1])
                  ? (o = "responsive")
                  : void 0 !== arguments[1] && (o = "single")),
            "single" === o)
          )
            r.options[s] = n;
          else if ("multiple" === o)
            t.each(s, function (t, e) {
              r.options[t] = e;
            });
          else if ("responsive" === o)
            for (i in n)
              if ("array" !== t.type(r.options.responsive))
                r.options.responsive = [n[i]];
              else {
                for (e = r.options.responsive.length - 1; e >= 0; )
                  r.options.responsive[e].breakpoint === n[i].breakpoint &&
                    r.options.responsive.splice(e, 1),
                    e--;
                r.options.responsive.push(n[i]);
              }
          a && (r.unload(), r.reinit());
        }),
      (i.prototype.setPosition = function () {
        this.setDimensions(),
          this.setHeight(),
          !1 === this.options.fade
            ? this.setCSS(this.getLeft(this.currentSlide))
            : this.setFade(),
          this.$slider.trigger("setPosition", [this]);
      }),
      (i.prototype.setProps = function () {
        var t = this,
          e = document.body.style;
        (t.positionProp = !0 === t.options.vertical ? "top" : "left"),
          "top" === t.positionProp
            ? t.$slider.addClass("slick-vertical")
            : t.$slider.removeClass("slick-vertical"),
          (void 0 === e.WebkitTransition &&
            void 0 === e.MozTransition &&
            void 0 === e.msTransition) ||
            (!0 === t.options.useCSS && (t.cssTransitions = !0)),
          t.options.fade &&
            ("number" == typeof t.options.zIndex
              ? t.options.zIndex < 3 && (t.options.zIndex = 3)
              : (t.options.zIndex = t.defaults.zIndex)),
          void 0 !== e.OTransform &&
            ((t.animType = "OTransform"),
            (t.transformType = "-o-transform"),
            (t.transitionType = "OTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.webkitPerspective &&
              (t.animType = !1)),
          void 0 !== e.MozTransform &&
            ((t.animType = "MozTransform"),
            (t.transformType = "-moz-transform"),
            (t.transitionType = "MozTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.MozPerspective &&
              (t.animType = !1)),
          void 0 !== e.webkitTransform &&
            ((t.animType = "webkitTransform"),
            (t.transformType = "-webkit-transform"),
            (t.transitionType = "webkitTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.webkitPerspective &&
              (t.animType = !1)),
          void 0 !== e.msTransform &&
            ((t.animType = "msTransform"),
            (t.transformType = "-ms-transform"),
            (t.transitionType = "msTransition"),
            void 0 === e.msTransform && (t.animType = !1)),
          void 0 !== e.transform &&
            !1 !== t.animType &&
            ((t.animType = "transform"),
            (t.transformType = "transform"),
            (t.transitionType = "transition")),
          (t.transformsEnabled =
            t.options.useTransform && null !== t.animType && !1 !== t.animType);
      }),
      (i.prototype.setSlideClasses = function (t) {
        var e, i, s, n;
        if (
          ((i = this.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true")),
          this.$slides.eq(t).addClass("slick-current"),
          !0 === this.options.centerMode)
        ) {
          var o = this.options.slidesToShow % 2 == 0 ? 1 : 0;
          (e = Math.floor(this.options.slidesToShow / 2)),
            !0 === this.options.infinite &&
              (t >= e && t <= this.slideCount - 1 - e
                ? this.$slides
                    .slice(t - e + o, t + e + 1)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : ((s = this.options.slidesToShow + t),
                  i
                    .slice(s - e + 1 + o, s + e + 2)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
              0 === t
                ? i
                    .eq(i.length - 1 - this.options.slidesToShow)
                    .addClass("slick-center")
                : t === this.slideCount - 1 &&
                  i.eq(this.options.slidesToShow).addClass("slick-center")),
            this.$slides.eq(t).addClass("slick-center");
        } else
          t >= 0 && t <= this.slideCount - this.options.slidesToShow
            ? this.$slides
                .slice(t, t + this.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : i.length <= this.options.slidesToShow
            ? i.addClass("slick-active").attr("aria-hidden", "false")
            : ((n = this.slideCount % this.options.slidesToShow),
              (s =
                !0 === this.options.infinite
                  ? this.options.slidesToShow + t
                  : t),
              this.options.slidesToShow == this.options.slidesToScroll &&
              this.slideCount - t < this.options.slidesToShow
                ? i
                    .slice(s - (this.options.slidesToShow - n), s + n)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : i
                    .slice(s, s + this.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false"));
        ("ondemand" !== this.options.lazyLoad &&
          "anticipated" !== this.options.lazyLoad) ||
          this.lazyLoad();
      }),
      (i.prototype.setupInfinite = function () {
        var e,
          i,
          s,
          n = this;
        if (
          (!0 === n.options.fade && (n.options.centerMode = !1),
          !0 === n.options.infinite &&
            !1 === n.options.fade &&
            ((i = null), n.slideCount > n.options.slidesToShow))
        ) {
          for (
            s =
              !0 === n.options.centerMode
                ? n.options.slidesToShow + 1
                : n.options.slidesToShow,
              e = n.slideCount;
            e > n.slideCount - s;
            e -= 1
          )
            (i = e - 1),
              t(n.$slides[i])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", i - n.slideCount)
                .prependTo(n.$slideTrack)
                .addClass("slick-cloned");
          for (e = 0; e < s + n.slideCount; e += 1)
            (i = e),
              t(n.$slides[i])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", i + n.slideCount)
                .appendTo(n.$slideTrack)
                .addClass("slick-cloned");
          n.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              t(this).attr("id", "");
            });
        }
      }),
      (i.prototype.interrupt = function (t) {
        var e = this;
        t || e.autoPlay(), (e.interrupted = t);
      }),
      (i.prototype.selectHandler = function (e) {
        var i = t(e.target).is(".slick-slide")
            ? t(e.target)
            : t(e.target).parents(".slick-slide"),
          s = parseInt(i.attr("data-slick-index"));
        s || (s = 0),
          this.slideCount <= this.options.slidesToShow
            ? this.slideHandler(s, !1, !0)
            : this.slideHandler(s);
      }),
      (i.prototype.slideHandler = function (t, e, i) {
        var s,
          n,
          o,
          r,
          a,
          l = null,
          h = this;
        if (
          ((e = e || !1),
          !(
            (!0 === h.animating && !0 === h.options.waitForAnimate) ||
            (!0 === h.options.fade && h.currentSlide === t)
          ))
        ) {
          if (
            (!1 === e && h.asNavFor(t),
            (s = t),
            (l = h.getLeft(s)),
            (r = h.getLeft(h.currentSlide)),
            (h.currentLeft = null === h.swipeLeft ? r : h.swipeLeft),
            !1 === h.options.infinite &&
              !1 === h.options.centerMode &&
              (t < 0 || t > h.getDotCount() * h.options.slidesToScroll))
          )
            !1 === h.options.fade &&
              ((s = h.currentSlide),
              !0 !== i
                ? h.animateSlide(r, function () {
                    h.postSlide(s);
                  })
                : h.postSlide(s));
          else if (
            !1 === h.options.infinite &&
            !0 === h.options.centerMode &&
            (t < 0 || t > h.slideCount - h.options.slidesToScroll)
          )
            !1 === h.options.fade &&
              ((s = h.currentSlide),
              !0 !== i
                ? h.animateSlide(r, function () {
                    h.postSlide(s);
                  })
                : h.postSlide(s));
          else {
            if (
              (h.options.autoplay && clearInterval(h.autoPlayTimer),
              (n =
                s < 0
                  ? h.slideCount % h.options.slidesToScroll != 0
                    ? h.slideCount - (h.slideCount % h.options.slidesToScroll)
                    : h.slideCount + s
                  : s >= h.slideCount
                  ? h.slideCount % h.options.slidesToScroll != 0
                    ? 0
                    : s - h.slideCount
                  : s),
              (h.animating = !0),
              h.$slider.trigger("beforeChange", [h, h.currentSlide, n]),
              (o = h.currentSlide),
              (h.currentSlide = n),
              h.setSlideClasses(h.currentSlide),
              h.options.asNavFor &&
                (a = (a = h.getNavTarget()).slick("getSlick")).slideCount <=
                  a.options.slidesToShow &&
                a.setSlideClasses(h.currentSlide),
              h.updateDots(),
              h.updateArrows(),
              !0 === h.options.fade)
            )
              return (
                !0 !== i
                  ? (h.fadeSlideOut(o),
                    h.fadeSlide(n, function () {
                      h.postSlide(n);
                    }))
                  : h.postSlide(n),
                void h.animateHeight()
              );
            !0 !== i
              ? h.animateSlide(l, function () {
                  h.postSlide(n);
                })
              : h.postSlide(n);
          }
        }
      }),
      (i.prototype.startLoad = function () {
        !0 === this.options.arrows &&
          this.slideCount > this.options.slidesToShow &&
          (this.$prevArrow.hide(), this.$nextArrow.hide()),
          !0 === this.options.dots &&
            this.slideCount > this.options.slidesToShow &&
            this.$dots.hide(),
          this.$slider.addClass("slick-loading");
      }),
      (i.prototype.swipeDirection = function () {
        var t, e, i, s;
        return (
          (t = this.touchObject.startX - this.touchObject.curX),
          (s = Math.round(
            (180 *
              (i = Math.atan2(
                (e = this.touchObject.startY - this.touchObject.curY),
                t
              ))) /
              Math.PI
          )) < 0 && (s = 360 - Math.abs(s)),
          s <= 45 && s >= 0
            ? !1 === this.options.rtl
              ? "left"
              : "right"
            : s <= 360 && s >= 315
            ? !1 === this.options.rtl
              ? "left"
              : "right"
            : s >= 135 && s <= 225
            ? !1 === this.options.rtl
              ? "right"
              : "left"
            : !0 === this.options.verticalSwiping
            ? s >= 35 && s <= 135
              ? "down"
              : "up"
            : "vertical"
        );
      }),
      (i.prototype.swipeEnd = function (t) {
        var e,
          i,
          s = this;
        if (((s.dragging = !1), (s.swiping = !1), s.scrolling))
          return (s.scrolling = !1), !1;
        if (
          ((s.interrupted = !1),
          (s.shouldClick = !(s.touchObject.swipeLength > 10)),
          void 0 === s.touchObject.curX)
        )
          return !1;
        if (
          (!0 === s.touchObject.edgeHit &&
            s.$slider.trigger("edge", [s, s.swipeDirection()]),
          s.touchObject.swipeLength >= s.touchObject.minSwipe)
        ) {
          switch ((i = s.swipeDirection())) {
            case "left":
            case "down":
              (e = s.options.swipeToSlide
                ? s.checkNavigable(s.currentSlide + s.getSlideCount())
                : s.currentSlide + s.getSlideCount()),
                (s.currentDirection = 0);
              break;
            case "right":
            case "up":
              (e = s.options.swipeToSlide
                ? s.checkNavigable(s.currentSlide - s.getSlideCount())
                : s.currentSlide - s.getSlideCount()),
                (s.currentDirection = 1);
          }
          "vertical" != i &&
            (s.slideHandler(e),
            (s.touchObject = {}),
            s.$slider.trigger("swipe", [s, i]));
        } else
          s.touchObject.startX !== s.touchObject.curX &&
            (s.slideHandler(s.currentSlide), (s.touchObject = {}));
      }),
      (i.prototype.swipeHandler = function (t) {
        var e = this;
        if (
          !(
            !1 === e.options.swipe ||
            ("ontouchend" in document && !1 === e.options.swipe) ||
            (!1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))
          )
        )
          switch (
            ((e.touchObject.fingerCount =
              t.originalEvent && void 0 !== t.originalEvent.touches
                ? t.originalEvent.touches.length
                : 1),
            (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
            !0 === e.options.verticalSwiping &&
              (e.touchObject.minSwipe =
                e.listHeight / e.options.touchThreshold),
            t.data.action)
          ) {
            case "start":
              e.swipeStart(t);
              break;
            case "move":
              e.swipeMove(t);
              break;
            case "end":
              e.swipeEnd(t);
          }
      }),
      (i.prototype.swipeMove = function (t) {
        var e,
          i,
          s,
          n,
          o,
          r,
          a = this;
        return (
          (o = void 0 !== t.originalEvent ? t.originalEvent.touches : null),
          !(!a.dragging || a.scrolling || (o && 1 !== o.length)) &&
            ((e = a.getLeft(a.currentSlide)),
            (a.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX),
            (a.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY),
            (a.touchObject.swipeLength = Math.round(
              Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))
            )),
            (r = Math.round(
              Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))
            )),
            a.options.verticalSwiping || a.swiping || !(r > 4)
              ? (!0 === a.options.verticalSwiping &&
                  (a.touchObject.swipeLength = r),
                (i = a.swipeDirection()),
                void 0 !== t.originalEvent &&
                  a.touchObject.swipeLength > 4 &&
                  ((a.swiping = !0), t.preventDefault()),
                (n =
                  (!1 === a.options.rtl ? 1 : -1) *
                  (a.touchObject.curX > a.touchObject.startX ? 1 : -1)),
                !0 === a.options.verticalSwiping &&
                  (n = a.touchObject.curY > a.touchObject.startY ? 1 : -1),
                (s = a.touchObject.swipeLength),
                (a.touchObject.edgeHit = !1),
                !1 === a.options.infinite &&
                  ((0 === a.currentSlide && "right" === i) ||
                    (a.currentSlide >= a.getDotCount() && "left" === i)) &&
                  ((s = a.touchObject.swipeLength * a.options.edgeFriction),
                  (a.touchObject.edgeHit = !0)),
                !1 === a.options.vertical
                  ? (a.swipeLeft = e + s * n)
                  : (a.swipeLeft =
                      e + s * (a.$list.height() / a.listWidth) * n),
                !0 === a.options.verticalSwiping && (a.swipeLeft = e + s * n),
                !0 !== a.options.fade &&
                  !1 !== a.options.touchMove &&
                  (!0 === a.animating
                    ? ((a.swipeLeft = null), !1)
                    : void a.setCSS(a.swipeLeft)))
              : ((a.scrolling = !0), !1))
        );
      }),
      (i.prototype.swipeStart = function (t) {
        var e,
          i = this;
        if (
          ((i.interrupted = !0),
          1 !== i.touchObject.fingerCount ||
            i.slideCount <= i.options.slidesToShow)
        )
          return (i.touchObject = {}), !1;
        void 0 !== t.originalEvent &&
          void 0 !== t.originalEvent.touches &&
          (e = t.originalEvent.touches[0]),
          (i.touchObject.startX = i.touchObject.curX =
            void 0 !== e ? e.pageX : t.clientX),
          (i.touchObject.startY = i.touchObject.curY =
            void 0 !== e ? e.pageY : t.clientY),
          (i.dragging = !0);
      }),
      (i.prototype.unfilterSlides = i.prototype.slickUnfilter =
        function () {
          null !== this.$slidesCache &&
            (this.unload(),
            this.$slideTrack.children(this.options.slide).detach(),
            this.$slidesCache.appendTo(this.$slideTrack),
            this.reinit());
        }),
      (i.prototype.unload = function () {
        t(".slick-cloned", this.$slider).remove(),
          this.$dots && this.$dots.remove(),
          this.$prevArrow &&
            this.htmlExpr.test(this.options.prevArrow) &&
            this.$prevArrow.remove(),
          this.$nextArrow &&
            this.htmlExpr.test(this.options.nextArrow) &&
            this.$nextArrow.remove(),
          this.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (i.prototype.unslick = function (t) {
        this.$slider.trigger("unslick", [this, t]), this.destroy();
      }),
      (i.prototype.updateArrows = function () {
        this.options.slidesToShow,
          !0 === this.options.arrows &&
            this.slideCount > this.options.slidesToShow &&
            !this.options.infinite &&
            (this.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            this.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            0 === this.currentSlide
              ? (this.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                this.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : this.currentSlide >=
                  this.slideCount - this.options.slidesToShow &&
                !1 === this.options.centerMode
              ? (this.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                this.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : this.currentSlide >= this.slideCount - 1 &&
                !0 === this.options.centerMode &&
                (this.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                this.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (i.prototype.updateDots = function () {
        null !== this.$dots &&
          (this.$dots.find("li").removeClass("slick-active").end(),
          this.$dots
            .find("li")
            .eq(Math.floor(this.currentSlide / this.options.slidesToScroll))
            .addClass("slick-active"));
      }),
      (i.prototype.visibility = function () {
        var t = this;
        t.options.autoplay &&
          (document[t.hidden] ? (t.interrupted = !0) : (t.interrupted = !1));
      }),
      (t.fn.slick = function () {
        var t,
          e,
          s = this,
          n = arguments[0],
          o = Array.prototype.slice.call(arguments, 1),
          r = s.length;
        for (t = 0; t < r; t++)
          if (
            ("object" == typeof n || void 0 === n
              ? (s[t].slick = new i(s[t], n))
              : (e = s[t].slick[n].apply(s[t].slick, o)),
            void 0 !== e)
          )
            return e;
        return s;
      });
  }),
  (function (t, e) {
    var i,
      s = t.jQuery || t.Cowboy || (t.Cowboy = {});
    (s.throttle = i =
      function (t, i, n, o) {
        function r() {
          function s() {
            (l = +new Date()), n.apply(r, c);
          }
          var r = this,
            h = +new Date() - l,
            c = arguments;
          o && !a && s(),
            a && clearTimeout(a),
            o === e && h > t
              ? s()
              : !0 !== i &&
                (a = setTimeout(
                  o
                    ? function t() {
                        a = e;
                      }
                    : s,
                  o === e ? t - h : t
                ));
        }
        var a,
          l = 0;
        return (
          "boolean" != typeof i && ((o = n), (n = i), (i = e)),
          s.guid && (r.guid = n.guid = n.guid || s.guid++),
          r
        );
      }),
      (s.debounce = function (t, s, n) {
        return n === e ? i(t, s, !1) : i(t, n, !1 !== s);
      });
  })(this),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(e)
      : "object" == typeof exports
      ? (module.exports = e(require, exports, module))
      : (t.Tether = e());
  })(this, function (t, e, i) {
    "use strict";
    function s(t, e) {
      if (!(t instanceof e))
        throw TypeError("Cannot call a class as a function");
    }
    function n(t) {
      var e = t.getBoundingClientRect(),
        i = {};
      for (var s in e) i[s] = e[s];
      if (t.ownerDocument !== document) {
        var o = t.ownerDocument.defaultView.frameElement;
        if (o) {
          var r = n(o);
          (i.top += r.top),
            (i.bottom += r.top),
            (i.left += r.left),
            (i.right += r.left);
        }
      }
      return i;
    }
    function o(t) {
      var e = (getComputedStyle(t) || {}).position,
        i = [];
      if ("fixed" === e) return [t];
      for (var s = t; (s = s.parentNode) && s && 1 === s.nodeType; ) {
        var n = void 0;
        try {
          n = getComputedStyle(s);
        } catch (o) {}
        if (null == n) return i.push(s), i;
        var r = n,
          a = r.overflow,
          l = r.overflowX,
          h = r.overflowY;
        /(auto|scroll)/.test(a + h + l) &&
          ("absolute" !== e ||
            ["relative", "absolute", "fixed"].indexOf(n.position) >= 0) &&
          i.push(s);
      }
      return (
        i.push(t.ownerDocument.body),
        t.ownerDocument !== document && i.push(t.ownerDocument.defaultView),
        i
      );
    }
    function r() {
      C && document.body.removeChild(C), (C = null);
    }
    function a(t) {
      var e = void 0;
      t === document
        ? ((e = document), (t = document.documentElement))
        : (e = t.ownerDocument);
      var i = e.documentElement,
        s = n(t),
        o = S();
      return (
        (s.top -= o.top),
        (s.left -= o.left),
        void 0 === s.width &&
          (s.width = document.body.scrollWidth - s.left - s.right),
        void 0 === s.height &&
          (s.height = document.body.scrollHeight - s.top - s.bottom),
        (s.top = s.top - i.clientTop),
        (s.left = s.left - i.clientLeft),
        (s.right = e.body.clientWidth - s.width - s.left),
        (s.bottom = e.body.clientHeight - s.height - s.top),
        s
      );
    }
    function l(t) {
      return t.offsetParent || document.documentElement;
    }
    function h() {
      var t = document.createElement("div");
      (t.style.width = "100%"), (t.style.height = "200px");
      var e = document.createElement("div");
      c(e.style, {
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        visibility: "hidden",
        width: "200px",
        height: "150px",
        overflow: "hidden",
      }),
        e.appendChild(t),
        document.body.appendChild(e);
      var i = t.offsetWidth;
      e.style.overflow = "scroll";
      var s = t.offsetWidth;
      i === s && (s = e.clientWidth), document.body.removeChild(e);
      var n = i - s;
      return { width: n, height: n };
    }
    function c() {
      var t =
          arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        e = [];
      return (
        Array.prototype.push.apply(e, arguments),
        e.slice(1).forEach(function (e) {
          if (e)
            for (var i in e) ({}).hasOwnProperty.call(e, i) && (t[i] = e[i]);
        }),
        t
      );
    }
    function u(t, e) {
      if (void 0 !== t.classList)
        e.split(" ").forEach(function (e) {
          e.trim() && t.classList.remove(e);
        });
      else {
        var i = RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
          s = f(t).replace(i, " ");
        g(t, s);
      }
    }
    function d(t, e) {
      if (void 0 !== t.classList)
        e.split(" ").forEach(function (e) {
          e.trim() && t.classList.add(e);
        });
      else {
        u(t, e);
        var i = f(t) + " " + e;
        g(t, i);
      }
    }
    function p(t, e) {
      if (void 0 !== t.classList) return t.classList.contains(e);
      var i = f(t);
      return RegExp("(^| )" + e + "( |$)", "gi").test(i);
    }
    function f(t) {
      return t.className instanceof
        t.ownerDocument.defaultView.SVGAnimatedString
        ? t.className.baseVal
        : t.className;
    }
    function g(t, e) {
      t.setAttribute("class", e);
    }
    function m(t, e, i) {
      i.forEach(function (i) {
        -1 === e.indexOf(i) && p(t, i) && u(t, i);
      }),
        e.forEach(function (e) {
          p(t, e) || d(t, e);
        });
    }
    function s(t, e) {
      if (!(t instanceof e))
        throw TypeError("Cannot call a class as a function");
    }
    function v(t, e) {
      var i =
        arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
      return t + i >= e && e >= t - i;
    }
    function b() {
      return "undefined" != typeof performance && void 0 !== performance.now
        ? performance.now()
        : +new Date();
    }
    function $() {
      for (
        var t = { top: 0, left: 0 }, e = arguments.length, i = Array(e), s = 0;
        e > s;
        s++
      )
        i[s] = arguments[s];
      return (
        i.forEach(function (e) {
          var i = e.top,
            s = e.left;
          "string" == typeof i && (i = parseFloat(i, 10)),
            "string" == typeof s && (s = parseFloat(s, 10)),
            (t.top += i),
            (t.left += s);
        }),
        t
      );
    }
    function y(t, e) {
      return (
        "string" == typeof t.left &&
          -1 !== t.left.indexOf("%") &&
          (t.left = (parseFloat(t.left, 10) / 100) * e.width),
        "string" == typeof t.top &&
          -1 !== t.top.indexOf("%") &&
          (t.top = (parseFloat(t.top, 10) / 100) * e.height),
        t
      );
    }
    var w,
      _ = (function () {
        function t(t, e) {
          for (var i = 0; i < e.length; i++) {
            var s = e[i];
            (s.enumerable = s.enumerable || !1),
              (s.configurable = !0),
              "value" in s && (s.writable = !0),
              Object.defineProperty(t, s.key, s);
          }
        }
        return function (e, i, s) {
          return i && t(e.prototype, i), s && t(e, s), e;
        };
      })(),
      k = void 0;
    void 0 === k && (k = { modules: [] });
    var C = null,
      x =
        ((w = 0),
        function () {
          return ++w;
        }),
      T = {},
      S = function () {
        var t = C;
        t ||
          ((t = document.createElement("div")).setAttribute(
            "data-tether-id",
            x()
          ),
          c(t.style, { top: 0, left: 0, position: "absolute" }),
          document.body.appendChild(t),
          (C = t));
        var e = t.getAttribute("data-tether-id");
        return (
          void 0 === T[e] &&
            ((T[e] = n(t)),
            E(function () {
              delete T[e];
            })),
          T[e]
        );
      },
      D = [],
      E = function (t) {
        D.push(t);
      },
      I = function () {
        for (var t = void 0; (t = D.pop()); ) t();
      },
      A = (function () {
        function t() {
          s(this, t);
        }
        return (
          _(t, [
            {
              key: "on",
              value: function (t, e, i) {
                var s =
                  !(arguments.length <= 3) &&
                  void 0 !== arguments[3] &&
                  arguments[3];
                void 0 === this.bindings && (this.bindings = {}),
                  void 0 === this.bindings[t] && (this.bindings[t] = []),
                  this.bindings[t].push({ handler: e, ctx: i, once: s });
              },
            },
            {
              key: "once",
              value: function (t, e, i) {
                this.on(t, e, i, !0);
              },
            },
            {
              key: "off",
              value: function (t, e) {
                if (void 0 !== this.bindings && void 0 !== this.bindings[t]) {
                  if (void 0 === e) delete this.bindings[t];
                  else
                    for (var i = 0; i < this.bindings[t].length; )
                      this.bindings[t][i].handler === e
                        ? this.bindings[t].splice(i, 1)
                        : ++i;
                }
              },
            },
            {
              key: "trigger",
              value: function (t) {
                if (void 0 !== this.bindings && this.bindings[t]) {
                  for (
                    var e = 0,
                      i = arguments.length,
                      s = Array(i > 1 ? i - 1 : 0),
                      n = 1;
                    i > n;
                    n++
                  )
                    s[n - 1] = arguments[n];
                  for (; e < this.bindings[t].length; ) {
                    var o = this.bindings[t][e],
                      r = o.handler,
                      a = o.ctx,
                      l = o.once,
                      h = a;
                    void 0 === h && (h = this),
                      r.apply(h, s),
                      l ? this.bindings[t].splice(e, 1) : ++e;
                  }
                }
              },
            },
          ]),
          t
        );
      })();
    k.Utils = {
      getActualBoundingClientRect: n,
      getScrollParents: o,
      getBounds: a,
      getOffsetParent: l,
      extend: c,
      addClass: d,
      removeClass: u,
      hasClass: p,
      updateClasses: m,
      defer: E,
      flush: I,
      uniqueId: x,
      Evented: A,
      getScrollBarSize: h,
      removeUtilElements: r,
    };
    var P = function (t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t))
          return (function t(e, i) {
            var s = [],
              n = !0,
              o = !1,
              r = void 0;
            try {
              for (
                var a, l = e[Symbol.iterator]();
                !(n = (a = l.next()).done) &&
                (s.push(a.value), !i || s.length !== i);
                n = !0
              );
            } catch (h) {
              (o = !0), (r = h);
            } finally {
              try {
                !n && l.return && l.return();
              } finally {
                if (o) throw r;
              }
            }
            return s;
          })(t, e);
        throw TypeError("Invalid attempt to destructure non-iterable instance");
      },
      _ = (function () {
        function t(t, e) {
          for (var i = 0; i < e.length; i++) {
            var s = e[i];
            (s.enumerable = s.enumerable || !1),
              (s.configurable = !0),
              "value" in s && (s.writable = !0),
              Object.defineProperty(t, s.key, s);
          }
        }
        return function (e, i, s) {
          return i && t(e.prototype, i), s && t(e, s), e;
        };
      })(),
      O = function (t, e, i) {
        for (var s = !0; s; ) {
          var n = t,
            o = e,
            r = i;
          (s = !1), null === n && (n = Function.prototype);
          var a = Object.getOwnPropertyDescriptor(n, o);
          if (void 0 !== a) {
            if ("value" in a) return a.value;
            var l = a.get;
            if (void 0 === l) return;
            return l.call(r);
          }
          var h = Object.getPrototypeOf(n);
          if (null === h) return;
          (t = h), (e = o), (i = r), (s = !0), (a = h = void 0);
        }
      };
    if (void 0 === k)
      throw Error("You must include the utils.js file before tether.js");
    var N,
      H,
      z,
      M,
      L = k.Utils,
      o = L.getScrollParents,
      a = L.getBounds,
      l = L.getOffsetParent,
      c = L.extend,
      d = L.addClass,
      u = L.removeClass,
      m = L.updateClasses,
      E = L.defer,
      I = L.flush,
      h = L.getScrollBarSize,
      r = L.removeUtilElements,
      W = (function () {
        if ("undefined" == typeof document) return "";
        for (
          var t = document.createElement("div"),
            e = [
              "transform",
              "WebkitTransform",
              "OTransform",
              "MozTransform",
              "msTransform",
            ],
            i = 0;
          i < e.length;
          ++i
        ) {
          var s = e[i];
          if (void 0 !== t.style[s]) return s;
        }
      })(),
      R = [],
      j = function () {
        R.forEach(function (t) {
          t.position(!1);
        }),
          I();
      };
    (N = null),
      (H = null),
      (z = null),
      (M = function t() {
        return void 0 !== H && H > 16
          ? ((H = Math.min(H - 16, 250)), void (z = setTimeout(t, 250)))
          : void (
              (void 0 !== N && b() - N < 10) ||
              (null != z && (clearTimeout(z), (z = null)),
              (N = b()),
              j(),
              (H = b() - N))
            );
      }),
      "undefined" != typeof window &&
        void 0 !== window.addEventListener &&
        ["resize", "scroll", "touchmove"].forEach(function (t) {
          window.addEventListener(t, M);
        });
    var F = { center: "center", left: "right", right: "left" },
      B = { middle: "middle", top: "bottom", bottom: "top" },
      Y = {
        top: 0,
        left: 0,
        middle: "50%",
        center: "50%",
        bottom: "100%",
        right: "100%",
      },
      U = function (t, e) {
        var i = t.left,
          s = t.top;
        return (
          "auto" === i && (i = F[e.left]),
          "auto" === s && (s = B[e.top]),
          { left: i, top: s }
        );
      },
      q = function (t) {
        var e = t.left,
          i = t.top;
        return (
          void 0 !== Y[t.left] && (e = Y[t.left]),
          void 0 !== Y[t.top] && (i = Y[t.top]),
          { left: e, top: i }
        );
      },
      K = function (t) {
        var e,
          i = P(t.split(" "), 2);
        return { top: i[0], left: i[1] };
      },
      V = K,
      X = (function (t) {
        function e(t) {
          var i = this;
          s(this, e),
            O(Object.getPrototypeOf(e.prototype), "constructor", this).call(
              this
            ),
            (this.position = this.position.bind(this)),
            R.push(this),
            (this.history = []),
            this.setOptions(t, !1),
            k.modules.forEach(function (t) {
              void 0 !== t.initialize && t.initialize.call(i);
            }),
            this.position();
        }
        return (
          (function t(e, i) {
            if ("function" != typeof i && null !== i)
              throw TypeError(
                "Super expression must either be null or a function, not " +
                  typeof i
              );
            (e.prototype = Object.create(i && i.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              i &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, i)
                  : (e.__proto__ = i));
          })(e, t),
          _(e, [
            {
              key: "getClass",
              value: function () {
                var t =
                    arguments.length <= 0 || void 0 === arguments[0]
                      ? ""
                      : arguments[0],
                  e = this.options.classes;
                return void 0 !== e && e[t]
                  ? this.options.classes[t]
                  : this.options.classPrefix
                  ? this.options.classPrefix + "-" + t
                  : t;
              },
            },
            {
              key: "setOptions",
              value: function (t) {
                var e = this,
                  i =
                    arguments.length <= 1 ||
                    void 0 === arguments[1] ||
                    arguments[1];
                this.options = c(
                  {
                    offset: "0 0",
                    targetOffset: "0 0",
                    targetAttachment: "auto auto",
                    classPrefix: "tether",
                  },
                  t
                );
                var s = this.options,
                  n = s.element,
                  r = s.target,
                  a = s.targetModifier;
                if (
                  ((this.element = n),
                  (this.target = r),
                  (this.targetModifier = a),
                  "viewport" === this.target
                    ? ((this.target = document.body),
                      (this.targetModifier = "visible"))
                    : "scroll-handle" === this.target &&
                      ((this.target = document.body),
                      (this.targetModifier = "scroll-handle")),
                  ["element", "target"].forEach(function (t) {
                    if (void 0 === e[t])
                      throw Error(
                        "Tether Error: Both element and target must be defined"
                      );
                    void 0 !== e[t].jquery
                      ? (e[t] = e[t][0])
                      : "string" == typeof e[t] &&
                        (e[t] = document.querySelector(e[t]));
                  }),
                  d(this.element, this.getClass("element")),
                  !1 !== this.options.addTargetClasses &&
                    d(this.target, this.getClass("target")),
                  !this.options.attachment)
                )
                  throw Error("Tether Error: You must provide an attachment");
                (this.targetAttachment = V(this.options.targetAttachment)),
                  (this.attachment = V(this.options.attachment)),
                  (this.offset = K(this.options.offset)),
                  (this.targetOffset = K(this.options.targetOffset)),
                  void 0 !== this.scrollParents && this.disable(),
                  "scroll-handle" === this.targetModifier
                    ? (this.scrollParents = [this.target])
                    : (this.scrollParents = o(this.target)),
                  !1 !== this.options.enabled && this.enable(i);
              },
            },
            {
              key: "getTargetBounds",
              value: function () {
                if (void 0 === this.targetModifier) return a(this.target);
                if ("visible" === this.targetModifier) {
                  if (this.target === document.body)
                    return {
                      top: pageYOffset,
                      left: pageXOffset,
                      height: innerHeight,
                      width: innerWidth,
                    };
                  var t = a(this.target),
                    e = {
                      height: t.height,
                      width: t.width,
                      top: t.top,
                      left: t.left,
                    };
                  return (
                    (e.height = Math.min(
                      e.height,
                      t.height - (pageYOffset - t.top)
                    )),
                    (e.height = Math.min(
                      e.height,
                      t.height -
                        (t.top + t.height - (pageYOffset + innerHeight))
                    )),
                    (e.height = Math.min(innerHeight, e.height)),
                    (e.height -= 2),
                    (e.width = Math.min(
                      e.width,
                      t.width - (pageXOffset - t.left)
                    )),
                    (e.width = Math.min(
                      e.width,
                      t.width - (t.left + t.width - (pageXOffset + innerWidth))
                    )),
                    (e.width = Math.min(innerWidth, e.width)),
                    (e.width -= 2),
                    e.top < pageYOffset && (e.top = pageYOffset),
                    e.left < pageXOffset && (e.left = pageXOffset),
                    e
                  );
                }
                if ("scroll-handle" === this.targetModifier) {
                  var t = void 0,
                    i = this.target;
                  i === document.body
                    ? ((i = document.documentElement),
                      (t = {
                        left: pageXOffset,
                        top: pageYOffset,
                        height: innerHeight,
                        width: innerWidth,
                      }))
                    : (t = a(i));
                  var s = getComputedStyle(i),
                    n =
                      i.scrollWidth > i.clientWidth ||
                      [s.overflow, s.overflowX].indexOf("scroll") >= 0 ||
                      this.target !== document.body,
                    o = 0;
                  n && (o = 15);
                  var r =
                      t.height -
                      parseFloat(s.borderTopWidth) -
                      parseFloat(s.borderBottomWidth) -
                      o,
                    e = {
                      width: 15,
                      height: 0.975 * r * (r / i.scrollHeight),
                      left:
                        t.left + t.width - parseFloat(s.borderLeftWidth) - 15,
                    },
                    l = 0;
                  408 > r &&
                    this.target === document.body &&
                    (l = -0.00011 * Math.pow(r, 2) - 0.00727 * r + 22.58),
                    this.target !== document.body &&
                      (e.height = Math.max(e.height, 24));
                  var h = this.target.scrollTop / (i.scrollHeight - r);
                  return (
                    (e.top =
                      h * (r - e.height - l) +
                      t.top +
                      parseFloat(s.borderTopWidth)),
                    this.target === document.body &&
                      (e.height = Math.max(e.height, 24)),
                    e
                  );
                }
              },
            },
            {
              key: "clearCache",
              value: function () {
                this._cache = {};
              },
            },
            {
              key: "cache",
              value: function (t, e) {
                return (
                  void 0 === this._cache && (this._cache = {}),
                  void 0 === this._cache[t] && (this._cache[t] = e.call(this)),
                  this._cache[t]
                );
              },
            },
            {
              key: "enable",
              value: function () {
                var t = this,
                  e =
                    arguments.length <= 0 ||
                    void 0 === arguments[0] ||
                    arguments[0];
                !1 !== this.options.addTargetClasses &&
                  d(this.target, this.getClass("enabled")),
                  d(this.element, this.getClass("enabled")),
                  (this.enabled = !0),
                  this.scrollParents.forEach(function (e) {
                    e !== t.target.ownerDocument &&
                      e.addEventListener("scroll", t.position);
                  }),
                  e && this.position();
              },
            },
            {
              key: "disable",
              value: function () {
                var t = this;
                u(this.target, this.getClass("enabled")),
                  u(this.element, this.getClass("enabled")),
                  (this.enabled = !1),
                  void 0 !== this.scrollParents &&
                    this.scrollParents.forEach(function (e) {
                      e.removeEventListener("scroll", t.position);
                    });
              },
            },
            {
              key: "destroy",
              value: function () {
                var t = this;
                this.disable(),
                  R.forEach(function (e, i) {
                    e === t && R.splice(i, 1);
                  }),
                  0 === R.length && r();
              },
            },
            {
              key: "updateAttachClasses",
              value: function (t, e) {
                var i = this;
                (t = t || this.attachment),
                  (e = e || this.targetAttachment),
                  void 0 !== this._addAttachClasses &&
                    this._addAttachClasses.length &&
                    this._addAttachClasses.splice(
                      0,
                      this._addAttachClasses.length
                    ),
                  void 0 === this._addAttachClasses &&
                    (this._addAttachClasses = []);
                var s = this._addAttachClasses;
                t.top &&
                  s.push(this.getClass("element-attached") + "-" + t.top),
                  t.left &&
                    s.push(this.getClass("element-attached") + "-" + t.left),
                  e.top &&
                    s.push(this.getClass("target-attached") + "-" + e.top),
                  e.left &&
                    s.push(this.getClass("target-attached") + "-" + e.left);
                var n = [];
                ["left", "top", "bottom", "right", "middle", "center"].forEach(
                  function (t) {
                    n.push(i.getClass("element-attached") + "-" + t),
                      n.push(i.getClass("target-attached") + "-" + t);
                  }
                ),
                  E(function () {
                    void 0 !== i._addAttachClasses &&
                      (m(i.element, i._addAttachClasses, n),
                      !1 !== i.options.addTargetClasses &&
                        m(i.target, i._addAttachClasses, n),
                      delete i._addAttachClasses);
                  });
              },
            },
            {
              key: "position",
              value: function () {
                var t = this,
                  e =
                    arguments.length <= 0 ||
                    void 0 === arguments[0] ||
                    arguments[0];
                if (this.enabled) {
                  this.clearCache();
                  var i = U(this.targetAttachment, this.attachment);
                  this.updateAttachClasses(this.attachment, i);
                  var s = this.cache("element-bounds", function () {
                      return a(t.element);
                    }),
                    n = s.width,
                    o = s.height;
                  if (0 === n && 0 === o && void 0 !== this.lastSize) {
                    var r = this.lastSize;
                    (n = r.width), (o = r.height);
                  } else this.lastSize = { width: n, height: o };
                  var c = this.cache("target-bounds", function () {
                      return t.getTargetBounds();
                    }),
                    u = c,
                    d = y(q(this.attachment), { width: n, height: o }),
                    p = y(q(i), u),
                    f = y(this.offset, { width: n, height: o }),
                    g = y(this.targetOffset, u);
                  (d = $(d, f)), (p = $(p, g));
                  for (
                    var m = c.left + p.left - d.left,
                      v = c.top + p.top - d.top,
                      b = 0;
                    b < k.modules.length;
                    ++b
                  ) {
                    var w = k.modules[b].position.call(this, {
                      left: m,
                      top: v,
                      targetAttachment: i,
                      targetPos: c,
                      elementPos: s,
                      offset: d,
                      targetOffset: p,
                      manualOffset: f,
                      manualTargetOffset: g,
                      scrollbarSize: T,
                      attachment: this.attachment,
                    });
                    if (!1 === w) return !1;
                    void 0 !== w &&
                      "object" == typeof w &&
                      ((v = w.top), (m = w.left));
                  }
                  var _ = {
                      page: { top: v, left: m },
                      viewport: {
                        top: v - pageYOffset,
                        bottom: pageYOffset - v - o + innerHeight,
                        left: m - pageXOffset,
                        right: pageXOffset - m - n + innerWidth,
                      },
                    },
                    C = this.target.ownerDocument,
                    x = C.defaultView,
                    T = void 0;
                  return (
                    C.body.scrollWidth > x.innerWidth &&
                      ((T = this.cache("scrollbar-size", h)),
                      (_.viewport.bottom -= T.height)),
                    C.body.scrollHeight > x.innerHeight &&
                      ((T = this.cache("scrollbar-size", h)),
                      (_.viewport.right -= T.width)),
                    (-1 === ["", "static"].indexOf(C.body.style.position) ||
                      -1 ===
                        ["", "static"].indexOf(
                          C.body.parentElement.style.position
                        )) &&
                      ((_.page.bottom = C.body.scrollHeight - v - o),
                      (_.page.right = C.body.scrollWidth - m - n)),
                    void 0 !== this.options.optimizations &&
                      !1 !== this.options.optimizations.moveElement &&
                      void 0 === this.targetModifier &&
                      (function () {
                        var e = t.cache("target-offsetparent", function () {
                            return l(t.target);
                          }),
                          i = t.cache(
                            "target-offsetparent-bounds",
                            function () {
                              return a(e);
                            }
                          ),
                          s = getComputedStyle(e),
                          n = i,
                          o = {};
                        if (
                          (["Top", "Left", "Bottom", "Right"].forEach(function (
                            t
                          ) {
                            o[t.toLowerCase()] = parseFloat(
                              s["border" + t + "Width"]
                            );
                          }),
                          (i.right =
                            C.body.scrollWidth - i.left - n.width + o.right),
                          (i.bottom =
                            C.body.scrollHeight - i.top - n.height + o.bottom),
                          _.page.top >= i.top + o.top &&
                            _.page.bottom >= i.bottom &&
                            _.page.left >= i.left + o.left &&
                            _.page.right >= i.right)
                        ) {
                          var r = e.scrollTop,
                            h = e.scrollLeft;
                          _.offset = {
                            top: _.page.top - i.top + r - o.top,
                            left: _.page.left - i.left + h - o.left,
                          };
                        }
                      })(),
                    this.move(_),
                    this.history.unshift(_),
                    this.history.length > 3 && this.history.pop(),
                    e && I(),
                    !0
                  );
                }
              },
            },
            {
              key: "move",
              value: function (t) {
                var e = this;
                if (void 0 !== this.element.parentNode) {
                  var i = {};
                  for (var s in t)
                    for (var n in ((i[s] = {}), t[s])) {
                      for (var o = !1, r = 0; r < this.history.length; ++r) {
                        var a = this.history[r];
                        if (void 0 !== a[s] && !v(a[s][n], t[s][n])) {
                          o = !0;
                          break;
                        }
                      }
                      o || (i[s][n] = !0);
                    }
                  var h,
                    u = { top: "", left: "", right: "", bottom: "" },
                    d = function (t, i) {
                      if (
                        !1 !==
                        (void 0 !== e.options.optimizations
                          ? e.options.optimizations.gpu
                          : null)
                      ) {
                        var s = void 0,
                          n = void 0;
                        t.top
                          ? ((u.top = 0), (s = i.top))
                          : ((u.bottom = 0), (s = -i.bottom)),
                          t.left
                            ? ((u.left = 0), (n = i.left))
                            : ((u.right = 0), (n = -i.right)),
                          (u[W] =
                            "translateX(" +
                            Math.round(n) +
                            "px) translateY(" +
                            Math.round(s) +
                            "px)"),
                          "msTransform" !== W && (u[W] += " translateZ(0)");
                      } else
                        t.top
                          ? (u.top = i.top + "px")
                          : (u.bottom = i.bottom + "px"),
                          t.left
                            ? (u.left = i.left + "px")
                            : (u.right = i.right + "px");
                    },
                    p = !1;
                  if (
                    ((i.page.top || i.page.bottom) &&
                    (i.page.left || i.page.right)
                      ? ((u.position = "absolute"), d(i.page, t.page))
                      : (i.viewport.top || i.viewport.bottom) &&
                        (i.viewport.left || i.viewport.right)
                      ? ((u.position = "fixed"), d(i.viewport, t.viewport))
                      : void 0 !== i.offset && i.offset.top && i.offset.left
                      ? ((u.position = "absolute"),
                        (h = e.cache("target-offsetparent", function () {
                          return l(e.target);
                        })),
                        l(e.element) !== h &&
                          E(function () {
                            e.element.parentNode.removeChild(e.element),
                              h.appendChild(e.element);
                          }),
                        d(i.offset, t.offset),
                        (p = !0))
                      : ((u.position = "absolute"),
                        d({ top: !0, left: !0 }, t.page)),
                    !p)
                  ) {
                    for (
                      var f = !0, g = this.element.parentNode;
                      g && 1 === g.nodeType && "BODY" !== g.tagName;

                    ) {
                      if ("static" !== getComputedStyle(g).position) {
                        f = !1;
                        break;
                      }
                      g = g.parentNode;
                    }
                    f ||
                      (this.element.parentNode.removeChild(this.element),
                      this.element.ownerDocument.body.appendChild(
                        this.element
                      ));
                  }
                  var m = {},
                    b = !1;
                  for (var n in u) {
                    var $ = u[n];
                    this.element.style[n] !== $ && ((b = !0), (m[n] = $));
                  }
                  b &&
                    E(function () {
                      c(e.element.style, m);
                    });
                }
              },
            },
          ]),
          e
        );
      })(A);
    (X.modules = []), (k.position = j);
    var G = c(X, k),
      P = function (t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t))
          return (function t(e, i) {
            var s = [],
              n = !0,
              o = !1,
              r = void 0;
            try {
              for (
                var a, l = e[Symbol.iterator]();
                !(n = (a = l.next()).done) &&
                (s.push(a.value), !i || s.length !== i);
                n = !0
              );
            } catch (h) {
              (o = !0), (r = h);
            } finally {
              try {
                !n && l.return && l.return();
              } finally {
                if (o) throw r;
              }
            }
            return s;
          })(t, e);
        throw TypeError("Invalid attempt to destructure non-iterable instance");
      },
      L = k.Utils,
      a = L.getBounds,
      c = L.extend,
      m = L.updateClasses,
      E = L.defer,
      Q = ["left", "top", "right", "bottom"];
    k.modules.push({
      position: function (t) {
        var e = this,
          i = t.top,
          s = t.left,
          n = t.targetAttachment;
        if (!this.options.constraints) return !0;
        var o = this.cache("element-bounds", function () {
            return a(e.element);
          }),
          r = o.height,
          l = o.width;
        if (0 === l && 0 === r && void 0 !== this.lastSize) {
          var h = this.lastSize;
          (l = h.width), (r = h.height);
        }
        var u = this.cache("target-bounds", function () {
            return e.getTargetBounds();
          }),
          d = u.height,
          p = u.width,
          f = [this.getClass("pinned"), this.getClass("out-of-bounds")];
        this.options.constraints.forEach(function (t) {
          var e = t.outOfBoundsClass,
            i = t.pinnedClass;
          e && f.push(e), i && f.push(i);
        }),
          f.forEach(function (t) {
            ["left", "top", "right", "bottom"].forEach(function (e) {
              f.push(t + "-" + e);
            });
          });
        var g = [],
          v = c({}, n),
          b = c({}, this.attachment);
        return (
          this.options.constraints.forEach(function (t) {
            var o = t.to,
              h = t.attachment,
              c = t.pin;
            void 0 === h && (h = "");
            var u = void 0,
              f = void 0;
            if (h.indexOf(" ") >= 0) {
              var m = P(h.split(" "), 2);
              (f = m[0]), (u = m[1]);
            } else u = f = h;
            var $,
              y,
              w =
                (($ = e),
                "scrollParent" === (y = o)
                  ? (y = $.scrollParents[0])
                  : "window" === y &&
                    (y = [
                      pageXOffset,
                      pageYOffset,
                      innerWidth + pageXOffset,
                      innerHeight + pageYOffset,
                    ]),
                y === document && (y = y.documentElement),
                void 0 !== y.nodeType &&
                  (function () {
                    var t = y,
                      e = a(y),
                      i = e,
                      s = getComputedStyle(y);
                    if (
                      ((y = [
                        i.left,
                        i.top,
                        e.width + i.left,
                        e.height + i.top,
                      ]),
                      t.ownerDocument !== document)
                    ) {
                      var n = t.ownerDocument.defaultView;
                      (y[0] += n.pageXOffset),
                        (y[1] += n.pageYOffset),
                        (y[2] += n.pageXOffset),
                        (y[3] += n.pageYOffset);
                    }
                    Q.forEach(function (t, e) {
                      "Top" === (t = t[0].toUpperCase() + t.substr(1)) ||
                      "Left" === t
                        ? (y[e] += parseFloat(s["border" + t + "Width"]))
                        : (y[e] -= parseFloat(s["border" + t + "Width"]));
                    });
                  })(),
                y);
            ("target" === f || "both" === f) &&
              (i < w[1] && "top" === v.top && ((i += d), (v.top = "bottom")),
              i + r > w[3] &&
                "bottom" === v.top &&
                ((i -= d), (v.top = "top"))),
              "together" === f &&
                ("top" === v.top &&
                  ("bottom" === b.top && i < w[1]
                    ? ((i += d), (v.top = "bottom"), (i += r), (b.top = "top"))
                    : "top" === b.top &&
                      i + r > w[3] &&
                      i - (r - d) >= w[1] &&
                      ((i -= r - d), (v.top = "bottom"), (b.top = "bottom"))),
                "bottom" === v.top &&
                  ("top" === b.top && i + r > w[3]
                    ? ((i -= d), (v.top = "top"), (i -= r), (b.top = "bottom"))
                    : "bottom" === b.top &&
                      i < w[1] &&
                      i + (2 * r - d) <= w[3] &&
                      ((i += r - d), (v.top = "top"), (b.top = "top"))),
                "middle" === v.top &&
                  (i + r > w[3] && "top" === b.top
                    ? ((i -= r), (b.top = "bottom"))
                    : i < w[1] &&
                      "bottom" === b.top &&
                      ((i += r), (b.top = "top")))),
              ("target" === u || "both" === u) &&
                (s < w[0] &&
                  "left" === v.left &&
                  ((s += p), (v.left = "right")),
                s + l > w[2] &&
                  "right" === v.left &&
                  ((s -= p), (v.left = "left"))),
              "together" === u &&
                (s < w[0] && "left" === v.left
                  ? "right" === b.left
                    ? ((s += p),
                      (v.left = "right"),
                      (s += l),
                      (b.left = "left"))
                    : "left" === b.left &&
                      ((s += p),
                      (v.left = "right"),
                      (s -= l),
                      (b.left = "right"))
                  : s + l > w[2] && "right" === v.left
                  ? "left" === b.left
                    ? ((s -= p),
                      (v.left = "left"),
                      (s -= l),
                      (b.left = "right"))
                    : "right" === b.left &&
                      ((s -= p), (v.left = "left"), (s += l), (b.left = "left"))
                  : "center" === v.left &&
                    (s + l > w[2] && "left" === b.left
                      ? ((s -= l), (b.left = "right"))
                      : s < w[0] &&
                        "right" === b.left &&
                        ((s += l), (b.left = "left")))),
              ("element" === f || "both" === f) &&
                (i < w[1] && "bottom" === b.top && ((i += r), (b.top = "top")),
                i + r > w[3] &&
                  "top" === b.top &&
                  ((i -= r), (b.top = "bottom"))),
              ("element" === u || "both" === u) &&
                (s < w[0] &&
                  ("right" === b.left
                    ? ((s += l), (b.left = "left"))
                    : "center" === b.left && ((s += l / 2), (b.left = "left"))),
                s + l > w[2] &&
                  ("left" === b.left
                    ? ((s -= l), (b.left = "right"))
                    : "center" === b.left &&
                      ((s -= l / 2), (b.left = "right")))),
              "string" == typeof c
                ? (c = c.split(",").map(function (t) {
                    return t.trim();
                  }))
                : !0 === c && (c = ["top", "left", "right", "bottom"]),
              (c = c || []);
            var _,
              k,
              C = [],
              x = [];
            i < w[1] &&
              (c.indexOf("top") >= 0
                ? ((i = w[1]), C.push("top"))
                : x.push("top")),
              i + r > w[3] &&
                (c.indexOf("bottom") >= 0
                  ? ((i = w[3] - r), C.push("bottom"))
                  : x.push("bottom")),
              s < w[0] &&
                (c.indexOf("left") >= 0
                  ? ((s = w[0]), C.push("left"))
                  : x.push("left")),
              s + l > w[2] &&
                (c.indexOf("right") >= 0
                  ? ((s = w[2] - l), C.push("right"))
                  : x.push("right")),
              C.length &&
                ((_ = void 0),
                (_ =
                  void 0 !== e.options.pinnedClass
                    ? e.options.pinnedClass
                    : e.getClass("pinned")),
                g.push(_),
                C.forEach(function (t) {
                  g.push(_ + "-" + t);
                })),
              x.length &&
                ((k = void 0),
                (k =
                  void 0 !== e.options.outOfBoundsClass
                    ? e.options.outOfBoundsClass
                    : e.getClass("out-of-bounds")),
                g.push(k),
                x.forEach(function (t) {
                  g.push(k + "-" + t);
                })),
              (C.indexOf("left") >= 0 || C.indexOf("right") >= 0) &&
                (b.left = v.left = !1),
              (C.indexOf("top") >= 0 || C.indexOf("bottom") >= 0) &&
                (b.top = v.top = !1),
              (v.top !== n.top ||
                v.left !== n.left ||
                b.top !== e.attachment.top ||
                b.left !== e.attachment.left) &&
                (e.updateAttachClasses(b, v),
                e.trigger("update", { attachment: b, targetAttachment: v }));
          }),
          E(function () {
            !1 !== e.options.addTargetClasses && m(e.target, g, f),
              m(e.element, g, f);
          }),
          { top: i, left: s }
        );
      },
    });
    var L = k.Utils,
      a = L.getBounds,
      m = L.updateClasses,
      E = L.defer;
    k.modules.push({
      position: function (t) {
        var e = this,
          i = t.top,
          s = t.left,
          n = this.cache("element-bounds", function () {
            return a(e.element);
          }),
          o = n.height,
          r = n.width,
          l = this.getTargetBounds(),
          h = i + o,
          c = s + r,
          u = [];
        i <= l.bottom &&
          h >= l.top &&
          ["left", "right"].forEach(function (t) {
            var e = l[t];
            (e === s || e === c) && u.push(t);
          }),
          s <= l.right &&
            c >= l.left &&
            ["top", "bottom"].forEach(function (t) {
              var e = l[t];
              (e === i || e === h) && u.push(t);
            });
        var d = [],
          p = [];
        return (
          d.push(this.getClass("abutted")),
          ["left", "top", "right", "bottom"].forEach(function (t) {
            d.push(e.getClass("abutted") + "-" + t);
          }),
          u.length && p.push(this.getClass("abutted")),
          u.forEach(function (t) {
            p.push(e.getClass("abutted") + "-" + t);
          }),
          E(function () {
            !1 !== e.options.addTargetClasses && m(e.target, p, d),
              m(e.element, p, d);
          }),
          !0
        );
      },
    });
    var P = function (t, e) {
      if (Array.isArray(t)) return t;
      if (Symbol.iterator in Object(t))
        return (function t(e, i) {
          var s = [],
            n = !0,
            o = !1,
            r = void 0;
          try {
            for (
              var a, l = e[Symbol.iterator]();
              !(n = (a = l.next()).done) &&
              (s.push(a.value), !i || s.length !== i);
              n = !0
            );
          } catch (h) {
            (o = !0), (r = h);
          } finally {
            try {
              !n && l.return && l.return();
            } finally {
              if (o) throw r;
            }
          }
          return s;
        })(t, e);
      throw TypeError("Invalid attempt to destructure non-iterable instance");
    };
    return (
      k.modules.push({
        position: function (t) {
          var e = t.top,
            i = t.left;
          if (this.options.shift) {
            var s = this.options.shift;
            "function" == typeof this.options.shift &&
              (s = this.options.shift.call(this, { top: e, left: i }));
            var n = void 0,
              o = void 0;
            if ("string" == typeof s) {
              (s = s.split(" "))[1] = s[1] || s[0];
              var r = s,
                a = P(r, 2);
              (n = a[0]),
                (o = a[1]),
                (n = parseFloat(n, 10)),
                (o = parseFloat(o, 10));
            } else (n = s.top), (o = s.left);
            return { top: (e += n), left: (i += o) };
          }
        },
      }),
      G
    );
  }),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : (t.Popper = e());
  })(this, function () {
    "use strict";
    function t(t) {
      return t && "[object Function]" === {}.toString.call(t);
    }
    function e(t, e) {
      if (1 !== t.nodeType) return [];
      var i = getComputedStyle(t, null);
      return e ? i[e] : i;
    }
    function i(t) {
      return "HTML" === t.nodeName ? t : t.parentNode || t.host;
    }
    function s(t) {
      if (!t) return document.body;
      switch (t.nodeName) {
        case "HTML":
        case "BODY":
          return t.ownerDocument.body;
        case "#document":
          return t.body;
      }
      var n = e(t),
        o = n.overflow,
        r = n.overflowX,
        a = n.overflowY;
      return /(auto|scroll|overlay)/.test(o + a + r) ? t : s(i(t));
    }
    function n(t) {
      return 11 === t ? Y : 10 === t ? U : Y || U;
    }
    function o(t) {
      if (!t) return document.documentElement;
      for (
        var i = n(10) ? document.body : null, s = t.offsetParent;
        s === i && t.nextElementSibling;

      )
        s = (t = t.nextElementSibling).offsetParent;
      var r = s && s.nodeName;
      return r && "BODY" !== r && "HTML" !== r
        ? -1 !== ["TD", "TABLE"].indexOf(s.nodeName) &&
          "static" === e(s, "position")
          ? o(s)
          : s
        : t
        ? t.ownerDocument.documentElement
        : document.documentElement;
    }
    function r(t) {
      return null === t.parentNode ? t : r(t.parentNode);
    }
    function a(t, e) {
      if (!t || !t.nodeType || !e || !e.nodeType)
        return document.documentElement;
      var i,
        s,
        n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
        l = n ? t : e,
        h = n ? e : t,
        c = document.createRange();
      c.setStart(l, 0), c.setEnd(h, 0);
      var u = c.commonAncestorContainer;
      if ((t !== u && e !== u) || l.contains(h))
        return "BODY" !== (s = (i = u).nodeName) &&
          ("HTML" === s || o(i.firstElementChild) === i)
          ? u
          : o(u);
      var d = r(t);
      return d.host ? a(d.host, e) : a(t, r(e).host);
    }
    function l(t) {
      var e =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : "top",
        i = "top" === e ? "scrollTop" : "scrollLeft",
        s = t.nodeName;
      if ("BODY" === s || "HTML" === s) {
        var n = t.ownerDocument.documentElement;
        return (t.ownerDocument.scrollingElement || n)[i];
      }
      return t[i];
    }
    function h(t, e) {
      var i = "x" === e ? "Left" : "Top";
      return (
        parseFloat(t["border" + i + "Width"], 10) +
        parseFloat(
          t["border" + ("Left" == i ? "Right" : "Bottom") + "Width"],
          10
        )
      );
    }
    function c(t, e, i, s) {
      return L(
        e["offset" + t],
        e["scroll" + t],
        i["client" + t],
        i["offset" + t],
        i["scroll" + t],
        n(10)
          ? i["offset" + t] +
              s["margin" + ("Height" === t ? "Top" : "Left")] +
              s["margin" + ("Height" === t ? "Bottom" : "Right")]
          : 0
      );
    }
    function u() {
      var t = document.body,
        e = document.documentElement,
        i = n(10) && getComputedStyle(e);
      return { height: c("Height", t, e, i), width: c("Width", t, e, i) };
    }
    function d(t) {
      return X({}, t, { right: t.left + t.width, bottom: t.top + t.height });
    }
    function p(t) {
      var i = {};
      try {
        if (n(10)) {
          i = t.getBoundingClientRect();
          var s = l(t, "top"),
            o = l(t, "left");
          (i.top += s), (i.left += o), (i.bottom += s), (i.right += o);
        } else i = t.getBoundingClientRect();
      } catch (r) {}
      var a = {
          left: i.left,
          top: i.top,
          width: i.right - i.left,
          height: i.bottom - i.top,
        },
        c = "HTML" === t.nodeName ? u() : {},
        p = c.width || t.clientWidth || a.right - a.left,
        f = c.height || t.clientHeight || a.bottom - a.top,
        g = t.offsetWidth - p,
        m = t.offsetHeight - f;
      if (g || m) {
        var v = e(t);
        (g -= h(v, "x")), (m -= h(v, "y")), (a.width -= g), (a.height -= m);
      }
      return d(a);
    }
    function f(t, i) {
      var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        r = n(10),
        a = "HTML" === i.nodeName,
        h = p(t),
        c = p(i),
        u = s(t),
        f = e(i),
        g = parseFloat(f.borderTopWidth, 10),
        m = parseFloat(f.borderLeftWidth, 10);
      o &&
        "HTML" === i.nodeName &&
        ((c.top = L(c.top, 0)), (c.left = L(c.left, 0)));
      var v = d({
        top: h.top - c.top - g,
        left: h.left - c.left - m,
        width: h.width,
        height: h.height,
      });
      if (((v.marginTop = 0), (v.marginLeft = 0), !r && a)) {
        var b = parseFloat(f.marginTop, 10),
          $ = parseFloat(f.marginLeft, 10);
        (v.top -= g - b),
          (v.bottom -= g - b),
          (v.left -= m - $),
          (v.right -= m - $),
          (v.marginTop = b),
          (v.marginLeft = $);
      }
      return (
        (r && !o ? i.contains(u) : i === u && "BODY" !== u.nodeName) &&
          (v = (function t(e, i) {
            var s =
                2 < arguments.length && void 0 !== arguments[2] && arguments[2],
              n = l(i, "top"),
              o = l(i, "left"),
              r = s ? -1 : 1;
            return (
              (e.top += n * r),
              (e.bottom += n * r),
              (e.left += o * r),
              (e.right += o * r),
              e
            );
          })(v, i)),
        v
      );
    }
    function g(t) {
      if (!t || !t.parentElement || n()) return document.documentElement;
      for (var i = t.parentElement; i && "none" === e(i, "transform"); )
        i = i.parentElement;
      return i || document.documentElement;
    }
    function m(t, n, o, r) {
      var h = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
        c = { top: 0, left: 0 },
        p = h ? g(t) : a(t, n);
      if ("viewport" === r)
        c = (function t(e) {
          var i =
              1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            s = e.ownerDocument.documentElement,
            n = f(e, s),
            o = L(s.clientWidth, window.innerWidth || 0),
            r = L(s.clientHeight, window.innerHeight || 0),
            a = i ? 0 : l(s),
            h = i ? 0 : l(s, "left");
          return d({
            top: a - n.top + n.marginTop,
            left: h - n.left + n.marginLeft,
            width: o,
            height: r,
          });
        })(p, h);
      else {
        "scrollParent" === r
          ? "BODY" === (m = s(i(n))).nodeName &&
            (m = t.ownerDocument.documentElement)
          : (m = "window" === r ? t.ownerDocument.documentElement : r);
        var m,
          v = f(m, p, h);
        if (
          "HTML" === m.nodeName &&
          !(function t(s) {
            var n = s.nodeName;
            return (
              "BODY" !== n &&
              "HTML" !== n &&
              ("fixed" === e(s, "position") || t(i(s)))
            );
          })(p)
        ) {
          var b = u(),
            $ = b.height,
            y = b.width;
          (c.top += v.top - v.marginTop),
            (c.bottom = $ + v.top),
            (c.left += v.left - v.marginLeft),
            (c.right = y + v.left);
        } else c = v;
      }
      return (c.left += o), (c.top += o), (c.right -= o), (c.bottom -= o), c;
    }
    function v(t, e, i, s, n) {
      var o =
        5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
      if (-1 === t.indexOf("auto")) return t;
      var r = m(i, s, o, n),
        a = {
          top: { width: r.width, height: e.top - r.top },
          right: { width: r.right - e.right, height: r.height },
          bottom: { width: r.width, height: r.bottom - e.bottom },
          left: { width: e.left - r.left, height: r.height },
        },
        l = Object.keys(a)
          .map(function (t) {
            var e, i;
            return X({ key: t }, a[t], {
              area: (i = (e = a[t]).width) * e.height,
            });
          })
          .sort(function (t, e) {
            return e.area - t.area;
          }),
        h = l.filter(function (t) {
          var e = t.width,
            s = t.height;
          return e >= i.clientWidth && s >= i.clientHeight;
        }),
        c = 0 < h.length ? h[0].key : l[0].key,
        u = t.split("-")[1];
      return c + (u ? "-" + u : "");
    }
    function b(t, e, i) {
      var s =
          3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
        n = s ? g(e) : a(e, i);
      return f(i, n, s);
    }
    function $(t) {
      var e = getComputedStyle(t),
        i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
        s = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
      return { width: t.offsetWidth + s, height: t.offsetHeight + i };
    }
    function y(t) {
      var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
      return t.replace(/left|right|bottom|top/g, function (t) {
        return e[t];
      });
    }
    function w(t, e, i) {
      i = i.split("-")[0];
      var s = $(t),
        n = { width: s.width, height: s.height },
        o = -1 !== ["right", "left"].indexOf(i),
        r = o ? "top" : "left",
        a = o ? "left" : "top",
        l = o ? "height" : "width";
      return (
        (n[r] = e[r] + e[l] / 2 - s[l] / 2),
        (n[a] = i === a ? e[a] - s[o ? "width" : "height"] : e[y(a)]),
        n
      );
    }
    function _(t, e) {
      return Array.prototype.find ? t.find(e) : t.filter(e)[0];
    }
    function k(e, i, s) {
      return (
        (void 0 === s
          ? e
          : e.slice(
              0,
              (function t(e, i, s) {
                if (Array.prototype.findIndex)
                  return e.findIndex(function (t) {
                    return t[i] === s;
                  });
                var n = _(e, function (t) {
                  return t[i] === s;
                });
                return e.indexOf(n);
              })(e, "name", s)
            )
        ).forEach(function (e) {
          e.function &&
            console.warn(
              "`modifier.function` is deprecated, use `modifier.fn`!"
            );
          var s = e.function || e.fn;
          e.enabled &&
            t(s) &&
            ((i.offsets.popper = d(i.offsets.popper)),
            (i.offsets.reference = d(i.offsets.reference)),
            (i = s(i, e)));
        }),
        i
      );
    }
    function C() {
      if (!this.state.isDestroyed) {
        var t = {
          instance: this,
          styles: {},
          arrowStyles: {},
          attributes: {},
          flipped: !1,
          offsets: {},
        };
        (t.offsets.reference = b(
          this.state,
          this.popper,
          this.reference,
          this.options.positionFixed
        )),
          (t.placement = v(
            this.options.placement,
            t.offsets.reference,
            this.popper,
            this.reference,
            this.options.modifiers.flip.boundariesElement,
            this.options.modifiers.flip.padding
          )),
          (t.originalPlacement = t.placement),
          (t.positionFixed = this.options.positionFixed),
          (t.offsets.popper = w(this.popper, t.offsets.reference, t.placement)),
          (t.offsets.popper.position = this.options.positionFixed
            ? "fixed"
            : "absolute"),
          (t = k(this.modifiers, t)),
          this.state.isCreated
            ? this.options.onUpdate(t)
            : ((this.state.isCreated = !0), this.options.onCreate(t));
      }
    }
    function x(t, e) {
      return t.some(function (t) {
        var i = t.name;
        return t.enabled && i === e;
      });
    }
    function T(t) {
      for (
        var e = [!1, "ms", "Webkit", "Moz", "O"],
          i = t.charAt(0).toUpperCase() + t.slice(1),
          s = 0;
        s < e.length;
        s++
      ) {
        var n = e[s],
          o = n ? "" + n + i : t;
        if (void 0 !== document.body.style[o]) return o;
      }
      return null;
    }
    function S() {
      return (
        (this.state.isDestroyed = !0),
        x(this.modifiers, "applyStyle") &&
          (this.popper.removeAttribute("x-placement"),
          (this.popper.style.position = ""),
          (this.popper.style.top = ""),
          (this.popper.style.left = ""),
          (this.popper.style.right = ""),
          (this.popper.style.bottom = ""),
          (this.popper.style.willChange = ""),
          (this.popper.style[T("transform")] = "")),
        this.disableEventListeners(),
        this.options.removeOnDestroy &&
          this.popper.parentNode.removeChild(this.popper),
        this
      );
    }
    function D(t) {
      var e = t.ownerDocument;
      return e ? e.defaultView : window;
    }
    function E() {
      var t, e, i, n, o;
      this.state.eventsEnabled ||
        (this.state =
          ((t = this.reference),
          this.options,
          (i = this.state),
          (n = this.scheduleUpdate),
          (i.updateBound = n),
          D(t).addEventListener("resize", i.updateBound, { passive: !0 }),
          (function t(e, i, n, o) {
            var r = "BODY" === e.nodeName,
              a = r ? e.ownerDocument.defaultView : e;
            a.addEventListener(i, n, { passive: !0 }),
              r || t(s(a.parentNode), i, n, o),
              o.push(a);
          })((o = s(t)), "scroll", i.updateBound, i.scrollParents),
          (i.scrollElement = o),
          (i.eventsEnabled = !0),
          i));
    }
    function I() {
      var t, e;
      this.state.eventsEnabled &&
        (cancelAnimationFrame(this.scheduleUpdate),
        (this.state =
          ((t = this.reference),
          (e = this.state),
          D(t).removeEventListener("resize", e.updateBound),
          e.scrollParents.forEach(function (t) {
            t.removeEventListener("scroll", e.updateBound);
          }),
          (e.updateBound = null),
          (e.scrollParents = []),
          (e.scrollElement = null),
          (e.eventsEnabled = !1),
          e)));
    }
    function A(t) {
      return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
    }
    function P(t, e) {
      Object.keys(e).forEach(function (i) {
        var s = "";
        -1 !==
          ["width", "height", "top", "right", "bottom", "left"].indexOf(i) &&
          A(e[i]) &&
          (s = "px"),
          (t.style[i] = e[i] + s);
      });
    }
    function O(t, e, i) {
      var s = _(t, function (t) {
          return t.name === e;
        }),
        n =
          !!s &&
          t.some(function (t) {
            return t.name === i && t.enabled && t.order < s.order;
          });
      if (!n) {
        var o = "`" + e + "`";
        console.warn(
          "`" +
            i +
            "` modifier is required by " +
            o +
            " modifier in order to work, be sure to include it before " +
            o +
            "!"
        );
      }
      return n;
    }
    function N(t) {
      var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        i = Q.indexOf(t),
        s = Q.slice(i + 1).concat(Q.slice(0, i));
      return e ? s.reverse() : s;
    }
    for (
      var H = Math.min,
        z = Math.round,
        M = Math.floor,
        L = Math.max,
        W = "undefined" != typeof window && "undefined" != typeof document,
        R = ["Edge", "Trident", "Firefox"],
        j = 0,
        F = 0;
      F < R.length;
      F += 1
    )
      if (W && 0 <= navigator.userAgent.indexOf(R[F])) {
        j = 1;
        break;
      }
    var B =
        W && window.Promise
          ? function (t) {
              var e = !1;
              return function () {
                e ||
                  ((e = !0),
                  window.Promise.resolve().then(function () {
                    (e = !1), t();
                  }));
              };
            }
          : function (t) {
              var e = !1;
              return function () {
                e ||
                  ((e = !0),
                  setTimeout(function () {
                    (e = !1), t();
                  }, j));
              };
            },
      Y = W && !!(window.MSInputMethodContext && document.documentMode),
      U = W && /MSIE 10/.test(navigator.userAgent),
      q = function (t, e) {
        if (!(t instanceof e))
          throw TypeError("Cannot call a class as a function");
      },
      K = (function () {
        function t(t, e) {
          for (var i, s = 0; s < e.length; s++)
            ((i = e[s]).enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
        }
        return function (e, i, s) {
          return i && t(e.prototype, i), s && t(e, s), e;
        };
      })(),
      V = function (t, e, i) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = i),
          t
        );
      },
      X =
        Object.assign ||
        function (t) {
          for (var e, i = 1; i < arguments.length; i++)
            for (var s in (e = arguments[i]))
              Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
          return t;
        },
      G = [
        "auto-start",
        "auto",
        "auto-end",
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-end",
        "bottom",
        "bottom-start",
        "left-end",
        "left",
        "left-start",
      ],
      Q = G.slice(3),
      Z = {
        FLIP: "flip",
        CLOCKWISE: "clockwise",
        COUNTERCLOCKWISE: "counterclockwise",
      },
      J = (function () {
        function e(i, s) {
          var n = this,
            o =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : {};
          q(this, e),
            (this.scheduleUpdate = function () {
              return requestAnimationFrame(n.update);
            }),
            (this.update = B(this.update.bind(this))),
            (this.options = X({}, e.Defaults, o)),
            (this.state = {
              isDestroyed: !1,
              isCreated: !1,
              scrollParents: [],
            }),
            (this.reference = i && i.jquery ? i[0] : i),
            (this.popper = s && s.jquery ? s[0] : s),
            (this.options.modifiers = {}),
            Object.keys(X({}, e.Defaults.modifiers, o.modifiers)).forEach(
              function (t) {
                n.options.modifiers[t] = X(
                  {},
                  e.Defaults.modifiers[t] || {},
                  o.modifiers ? o.modifiers[t] : {}
                );
              }
            ),
            (this.modifiers = Object.keys(this.options.modifiers)
              .map(function (t) {
                return X({ name: t }, n.options.modifiers[t]);
              })
              .sort(function (t, e) {
                return t.order - e.order;
              })),
            this.modifiers.forEach(function (e) {
              e.enabled &&
                t(e.onLoad) &&
                e.onLoad(n.reference, n.popper, n.options, e, n.state);
            }),
            this.update();
          var r = this.options.eventsEnabled;
          r && this.enableEventListeners(), (this.state.eventsEnabled = r);
        }
        return (
          K(e, [
            {
              key: "update",
              value: function () {
                return C.call(this);
              },
            },
            {
              key: "destroy",
              value: function () {
                return S.call(this);
              },
            },
            {
              key: "enableEventListeners",
              value: function () {
                return E.call(this);
              },
            },
            {
              key: "disableEventListeners",
              value: function () {
                return I.call(this);
              },
            },
          ]),
          e
        );
      })();
    return (
      (J.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
      (J.placements = G),
      (J.Defaults = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: {
          shift: {
            order: 100,
            enabled: !0,
            fn: function (t) {
              var e = t.placement,
                i = e.split("-")[0],
                s = e.split("-")[1];
              if (s) {
                var n = t.offsets,
                  o = n.reference,
                  r = n.popper,
                  a = -1 !== ["bottom", "top"].indexOf(i),
                  l = a ? "left" : "top",
                  h = a ? "width" : "height",
                  c = {
                    start: V({}, l, o[l]),
                    end: V({}, l, o[l] + o[h] - r[h]),
                  };
                t.offsets.popper = X({}, r, c[s]);
              }
              return t;
            },
          },
          offset: {
            order: 200,
            enabled: !0,
            fn: function t(e, i) {
              var s,
                n,
                o,
                r,
                a,
                l,
                h,
                c,
                u,
                p,
                f,
                g = i.offset,
                m = e.placement,
                v = e.offsets,
                b = v.popper,
                $ = v.reference,
                y = m.split("-")[0];
              return (
                (s = A(+g)
                  ? [+g, 0]
                  : ((n = g),
                    (o = b),
                    (r = $),
                    (l = [0, 0]),
                    (h = -1 !== ["right", "left"].indexOf((a = y))),
                    c[
                      (u = (c = n.split(/(\+|\-)/).map(function (t) {
                        return t.trim();
                      })).indexOf(
                        _(c, function (t) {
                          return -1 !== t.search(/,|\s/);
                        })
                      ))
                    ] &&
                      -1 === c[u].indexOf(",") &&
                      console.warn(
                        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
                      ),
                    (p = /\s*,\s*|\s+/),
                    (f = (f =
                      -1 === u
                        ? [c]
                        : [
                            c.slice(0, u).concat([c[u].split(p)[0]]),
                            [c[u].split(p)[1]].concat(c.slice(u + 1)),
                          ]).map(function (t, e) {
                      var i = (1 === e ? !h : h) ? "height" : "width",
                        s = !1;
                      return t
                        .reduce(function (t, e) {
                          return "" === t[t.length - 1] &&
                            -1 !== ["+", "-"].indexOf(e)
                            ? ((t[t.length - 1] = e), (s = !0), t)
                            : s
                            ? ((t[t.length - 1] += e), (s = !1), t)
                            : t.concat(e);
                        }, [])
                        .map(function (t) {
                          var e, s, n, a, l, h, c, u, p;
                          return (
                            (e = t),
                            (s = i),
                            (n = o),
                            (a = r),
                            (c = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/)),
                            (u = +c[1]),
                            (p = c[2]),
                            u
                              ? 0 === p.indexOf("%")
                                ? (d((l = "%p" === p ? n : a))[s] / 100) * u
                                : "vh" === p || "vw" === p
                                ? ((h =
                                    "vh" === p
                                      ? L(
                                          document.documentElement.clientHeight,
                                          window.innerHeight || 0
                                        )
                                      : L(
                                          document.documentElement.clientWidth,
                                          window.innerWidth || 0
                                        )) /
                                    100) *
                                  u
                                : u
                              : e
                          );
                        });
                    })).forEach(function (t, e) {
                      t.forEach(function (i, s) {
                        A(i) && (l[e] += i * ("-" === t[s - 1] ? -1 : 1));
                      });
                    }),
                    l)),
                "left" === y
                  ? ((b.top += s[0]), (b.left -= s[1]))
                  : "right" === y
                  ? ((b.top += s[0]), (b.left += s[1]))
                  : "top" === y
                  ? ((b.left += s[0]), (b.top -= s[1]))
                  : "bottom" === y && ((b.left += s[0]), (b.top += s[1])),
                (e.popper = b),
                e
              );
            },
            offset: 0,
          },
          preventOverflow: {
            order: 300,
            enabled: !0,
            fn: function (t, e) {
              var i = e.boundariesElement || o(t.instance.popper);
              t.instance.reference === i && (i = o(i));
              var s = T("transform"),
                n = t.instance.popper.style,
                r = n.top,
                a = n.left,
                l = n[s];
              (n.top = ""), (n.left = ""), (n[s] = "");
              var h = m(
                t.instance.popper,
                t.instance.reference,
                e.padding,
                i,
                t.positionFixed
              );
              (n.top = r), (n.left = a), (n[s] = l), (e.boundaries = h);
              var c = e.priority,
                u = t.offsets.popper,
                d = {
                  primary: function (t) {
                    var i = u[t];
                    return (
                      u[t] < h[t] &&
                        !e.escapeWithReference &&
                        (i = L(u[t], h[t])),
                      V({}, t, i)
                    );
                  },
                  secondary: function (t) {
                    var i = "right" === t ? "left" : "top",
                      s = u[i];
                    return (
                      u[t] > h[t] &&
                        !e.escapeWithReference &&
                        (s = H(
                          u[i],
                          h[t] - ("right" === t ? u.width : u.height)
                        )),
                      V({}, i, s)
                    );
                  },
                };
              return (
                c.forEach(function (t) {
                  u = X(
                    {},
                    u,
                    d[
                      -1 === ["left", "top"].indexOf(t)
                        ? "secondary"
                        : "primary"
                    ](t)
                  );
                }),
                (t.offsets.popper = u),
                t
              );
            },
            priority: ["left", "right", "top", "bottom"],
            padding: 5,
            boundariesElement: "scrollParent",
          },
          keepTogether: {
            order: 400,
            enabled: !0,
            fn: function (t) {
              var e = t.offsets,
                i = e.popper,
                s = e.reference,
                n = t.placement.split("-")[0],
                o = M,
                r = -1 !== ["top", "bottom"].indexOf(n),
                a = r ? "right" : "bottom",
                l = r ? "left" : "top";
              return (
                i[a] < o(s[l]) &&
                  (t.offsets.popper[l] = o(s[l]) - i[r ? "width" : "height"]),
                i[l] > o(s[a]) && (t.offsets.popper[l] = o(s[a])),
                t
              );
            },
          },
          arrow: {
            order: 500,
            enabled: !0,
            fn: function (t, i) {
              if (!O(t.instance.modifiers, "arrow", "keepTogether")) return t;
              var s,
                n = i.element;
              if ("string" == typeof n) {
                if (!(n = t.instance.popper.querySelector(n))) return t;
              } else if (!t.instance.popper.contains(n))
                return (
                  console.warn(
                    "WARNING: `arrow.element` must be child of its popper element!"
                  ),
                  t
                );
              var o = t.placement.split("-")[0],
                r = t.offsets,
                a = r.popper,
                l = r.reference,
                h = -1 !== ["left", "right"].indexOf(o),
                c = h ? "height" : "width",
                u = h ? "Top" : "Left",
                p = u.toLowerCase(),
                f = h ? "bottom" : "right",
                g = $(n)[c];
              l[f] - g < a[p] && (t.offsets.popper[p] -= a[p] - (l[f] - g)),
                l[p] + g > a[f] && (t.offsets.popper[p] += l[p] + g - a[f]),
                (t.offsets.popper = d(t.offsets.popper));
              var m = l[p] + l[c] / 2 - g / 2,
                v = e(t.instance.popper),
                b = parseFloat(v["margin" + u], 10),
                y = parseFloat(v["border" + u + "Width"], 10),
                w = m - t.offsets.popper[p] - b - y;
              return (
                (w = L(H(a[c] - g, w), 0)),
                (t.arrowElement = n),
                (t.offsets.arrow =
                  (V((s = {}), p, z(w)), V(s, h ? "left" : "top", ""), s)),
                t
              );
            },
            element: "[x-arrow]",
          },
          flip: {
            order: 600,
            enabled: !0,
            fn: function (t, e) {
              if (
                x(t.instance.modifiers, "inner") ||
                (t.flipped && t.placement === t.originalPlacement)
              )
                return t;
              var i = m(
                  t.instance.popper,
                  t.instance.reference,
                  e.padding,
                  e.boundariesElement,
                  t.positionFixed
                ),
                s = t.placement.split("-")[0],
                n = y(s),
                o = t.placement.split("-")[1] || "",
                r = [];
              switch (e.behavior) {
                case Z.FLIP:
                  r = [s, n];
                  break;
                case Z.CLOCKWISE:
                  r = N(s);
                  break;
                case Z.COUNTERCLOCKWISE:
                  r = N(s, !0);
                  break;
                default:
                  r = e.behavior;
              }
              return (
                r.forEach(function (a, l) {
                  if (s !== a || r.length === l + 1) return t;
                  n = y((s = t.placement.split("-")[0]));
                  var h,
                    c = t.offsets.popper,
                    u = t.offsets.reference,
                    d = M,
                    p =
                      ("left" === s && d(c.right) > d(u.left)) ||
                      ("right" === s && d(c.left) < d(u.right)) ||
                      ("top" === s && d(c.bottom) > d(u.top)) ||
                      ("bottom" === s && d(c.top) < d(u.bottom)),
                    f = d(c.left) < d(i.left),
                    g = d(c.right) > d(i.right),
                    m = d(c.top) < d(i.top),
                    v = d(c.bottom) > d(i.bottom),
                    b =
                      ("left" === s && f) ||
                      ("right" === s && g) ||
                      ("top" === s && m) ||
                      ("bottom" === s && v),
                    $ = -1 !== ["top", "bottom"].indexOf(s),
                    _ =
                      !!e.flipVariations &&
                      (($ && "start" === o && f) ||
                        ($ && "end" === o && g) ||
                        (!$ && "start" === o && m) ||
                        (!$ && "end" === o && v));
                  (p || b || _) &&
                    ((t.flipped = !0),
                    (p || b) && (s = r[l + 1]),
                    _ &&
                      (o =
                        "end" === (h = o)
                          ? "start"
                          : "start" === h
                          ? "end"
                          : h),
                    (t.placement = s + (o ? "-" + o : "")),
                    (t.offsets.popper = X(
                      {},
                      t.offsets.popper,
                      w(t.instance.popper, t.offsets.reference, t.placement)
                    )),
                    (t = k(t.instance.modifiers, t, "flip")));
                }),
                t
              );
            },
            behavior: "flip",
            padding: 5,
            boundariesElement: "viewport",
          },
          inner: {
            order: 700,
            enabled: !1,
            fn: function (t) {
              var e = t.placement,
                i = e.split("-")[0],
                s = t.offsets,
                n = s.popper,
                o = s.reference,
                r = -1 !== ["left", "right"].indexOf(i),
                a = -1 === ["top", "left"].indexOf(i);
              return (
                (n[r ? "left" : "top"] =
                  o[i] - (a ? n[r ? "width" : "height"] : 0)),
                (t.placement = y(e)),
                (t.offsets.popper = d(n)),
                t
              );
            },
          },
          hide: {
            order: 800,
            enabled: !0,
            fn: function (t) {
              if (!O(t.instance.modifiers, "hide", "preventOverflow")) return t;
              var e = t.offsets.reference,
                i = _(t.instance.modifiers, function (t) {
                  return "preventOverflow" === t.name;
                }).boundaries;
              if (
                e.bottom < i.top ||
                e.left > i.right ||
                e.top > i.bottom ||
                e.right < i.left
              ) {
                if (!0 === t.hide) return t;
                (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
              } else {
                if (!1 === t.hide) return t;
                (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
              }
              return t;
            },
          },
          computeStyle: {
            order: 850,
            enabled: !0,
            fn: function (t, e) {
              var i = e.x,
                s = e.y,
                n = t.offsets.popper,
                r = _(t.instance.modifiers, function (t) {
                  return "applyStyle" === t.name;
                }).gpuAcceleration;
              void 0 !== r &&
                console.warn(
                  "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                );
              var a,
                l,
                h = void 0 === r ? e.gpuAcceleration : r,
                c = o(t.instance.popper),
                u = p(c),
                d = { position: n.position },
                f = {
                  left: M(n.left),
                  top: z(n.top),
                  bottom: z(n.bottom),
                  right: M(n.right),
                },
                g = "bottom" === i ? "top" : "bottom",
                m = "right" === s ? "left" : "right",
                v = T("transform");
              ((l = "bottom" == g ? -u.height + f.bottom : f.top),
              (a = "right" == m ? -u.width + f.right : f.left),
              h && v)
                ? ((d[v] = "translate3d(" + a + "px, " + l + "px, 0)"),
                  (d[g] = 0),
                  (d[m] = 0),
                  (d.willChange = "transform"))
                : ((d[g] = l * ("bottom" == g ? -1 : 1)),
                  (d[m] = a * ("right" == m ? -1 : 1)),
                  (d.willChange = g + ", " + m));
              var b = { "x-placement": t.placement };
              return (
                (t.attributes = X({}, b, t.attributes)),
                (t.styles = X({}, d, t.styles)),
                (t.arrowStyles = X({}, t.offsets.arrow, t.arrowStyles)),
                t
              );
            },
            gpuAcceleration: !0,
            x: "bottom",
            y: "right",
          },
          applyStyle: {
            order: 900,
            enabled: !0,
            fn: function (t) {
              return (
                P(t.instance.popper, t.styles),
                (function t(e, i) {
                  Object.keys(i).forEach(function (t) {
                    !1 === i[t]
                      ? e.removeAttribute(t)
                      : e.setAttribute(t, i[t]);
                  });
                })(t.instance.popper, t.attributes),
                t.arrowElement &&
                  Object.keys(t.arrowStyles).length &&
                  P(t.arrowElement, t.arrowStyles),
                t
              );
            },
            onLoad: function (t, e, i, s, n) {
              var o = b(n, e, t, i.positionFixed),
                r = v(
                  i.placement,
                  o,
                  e,
                  t,
                  i.modifiers.flip.boundariesElement,
                  i.modifiers.flip.padding
                );
              return (
                e.setAttribute("x-placement", r),
                P(e, { position: i.positionFixed ? "fixed" : "absolute" }),
                i
              );
            },
            gpuAcceleration: void 0,
          },
        },
      }),
      J
    );
  }),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(exports, require("jquery"))
      : "function" == typeof define && define.amd
      ? define(["exports", "jquery"], e)
      : e((t.bootstrap = {}), t.jQuery);
  })(this, function (t, e) {
    "use strict";
    function i(t, e) {
      for (var i = 0; i < e.length; i++) {
        var s = e[i];
        (s.enumerable = s.enumerable || !1),
          (s.configurable = !0),
          "value" in s && (s.writable = !0),
          Object.defineProperty(t, s.key, s);
      }
    }
    function s(t, e, s) {
      return e && i(t.prototype, e), s && i(t, s), t;
    }
    function n() {
      return (n =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var s in i)
              Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
          }
          return t;
        }).apply(this, arguments);
    }
    for (
      var o,
        r,
        a,
        l,
        h,
        c,
        u,
        d,
        p,
        f,
        g,
        m,
        v,
        b,
        $,
        y,
        w,
        _,
        k,
        C,
        x,
        T,
        S,
        D,
        E,
        I,
        A,
        P,
        O,
        N,
        H,
        z,
        M,
        L,
        W,
        R,
        j,
        F,
        B,
        Y,
        U,
        q,
        K,
        V,
        X,
        G,
        Q,
        Z,
        J,
        tt,
        te,
        ti,
        ts,
        tn,
        to,
        tr,
        ta,
        tl =
          ((o = e = e && e.hasOwnProperty("default") ? e.default : e),
          (r = !1),
          (a = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function (t) {
              do t += ~~(1e6 * Math.random());
              while (document.getElementById(t));
              return t;
            },
            getSelectorFromElement: function (t) {
              var e,
                i = t.getAttribute("data-target");
              (i && "#" !== i) || (i = t.getAttribute("href") || ""),
                "#" === i.charAt(0) &&
                  ((e = i),
                  (i = e =
                    "function" == typeof o.escapeSelector
                      ? o.escapeSelector(e).substr(1)
                      : e.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")));
              try {
                return o(document).find(i).length > 0 ? i : null;
              } catch (s) {
                return null;
              }
            },
            reflow: function (t) {
              return t.offsetHeight;
            },
            triggerTransitionEnd: function (t) {
              o(t).trigger(r.end);
            },
            supportsTransitionEnd: function () {
              return Boolean(r);
            },
            isElement: function (t) {
              return (t[0] || t).nodeType;
            },
            typeCheckConfig: function (t, e, i) {
              for (var s in i)
                if (Object.prototype.hasOwnProperty.call(i, s)) {
                  var n,
                    o = i[s],
                    r = e[s],
                    l =
                      r && a.isElement(r)
                        ? "element"
                        : ((n = r),
                          {}.toString
                            .call(n)
                            .match(/\s([a-zA-Z]+)/)[1]
                            .toLowerCase());
                  if (!RegExp(o).test(l))
                    throw Error(
                      t.toUpperCase() +
                        ': Option "' +
                        s +
                        '" provided type "' +
                        l +
                        '" but expected type "' +
                        o +
                        '".'
                    );
                }
            },
          }),
          (r = ("undefined" == typeof window || !window.QUnit) && {
            end: "transitionend",
          }),
          (o.fn.emulateTransitionEnd = function t(e) {
            var i = this,
              s = !1;
            return (
              o(this).one(a.TRANSITION_END, function () {
                s = !0;
              }),
              setTimeout(function () {
                s || a.triggerTransitionEnd(i);
              }, e),
              this
            );
          }),
          a.supportsTransitionEnd() &&
            (o.event.special[a.TRANSITION_END] = {
              bindType: r.end,
              delegateType: r.end,
              handle: function (t) {
                if (o(t.target).is(this))
                  return t.handleObj.handler.apply(this, arguments);
              },
            }),
          a),
        th =
          ((M = "alert"),
          (W = "." + (L = "bs.alert")),
          (R = (z = e).fn[M]),
          (j = {
            CLOSE: "close" + W,
            CLOSED: "closed" + W,
            CLICK_DATA_API: "click" + W + ".data-api",
          }),
          (F = "alert"),
          (B = "fade"),
          (Y = "show"),
          (U = (function () {
            function t(t) {
              this._element = t;
            }
            var e = t.prototype;
            return (
              (e.close = function (t) {
                t = t || this._element;
                var e = this._getRootElement(t);
                this._triggerCloseEvent(e).isDefaultPrevented() ||
                  this._removeElement(e);
              }),
              (e.dispose = function () {
                z.removeData(this._element, L), (this._element = null);
              }),
              (e._getRootElement = function (t) {
                var e = tl.getSelectorFromElement(t),
                  i = !1;
                return (
                  e && (i = z(e)[0]), i || (i = z(t).closest("." + F)[0]), i
                );
              }),
              (e._triggerCloseEvent = function (t) {
                var e = z.Event(j.CLOSE);
                return z(t).trigger(e), e;
              }),
              (e._removeElement = function (t) {
                var e = this;
                z(t).removeClass(Y),
                  tl.supportsTransitionEnd() && z(t).hasClass(B)
                    ? z(t)
                        .one(tl.TRANSITION_END, function (i) {
                          return e._destroyElement(t, i);
                        })
                        .emulateTransitionEnd(150)
                    : this._destroyElement(t);
              }),
              (e._destroyElement = function (t) {
                z(t).detach().trigger(j.CLOSED).remove();
              }),
              (t._jQueryInterface = function (e) {
                return this.each(function () {
                  var i = z(this),
                    s = i.data(L);
                  s || ((s = new t(this)), i.data(L, s)),
                    "close" === e && s[e](this);
                });
              }),
              (t._handleDismiss = function (t) {
                return function (e) {
                  e && e.preventDefault(), t.close(this);
                };
              }),
              s(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.0.0";
                  },
                },
              ]),
              t
            );
          })()),
          z(document).on(
            j.CLICK_DATA_API,
            '[data-dismiss="alert"]',
            U._handleDismiss(new U())
          ),
          (z.fn[M] = U._jQueryInterface),
          (z.fn[M].Constructor = U),
          (z.fn[M].noConflict = function () {
            return (z.fn[M] = R), U._jQueryInterface;
          }),
          U),
        tc =
          ((K = "button"),
          (X = "." + (V = "bs.button")),
          (G = ".data-api"),
          (Q = (q = e).fn[K]),
          (Z = "active"),
          (J = "btn"),
          (tt = "focus"),
          (te = '[data-toggle^="button"]'),
          (ti = '[data-toggle="buttons"]'),
          (ts = "input"),
          (tn = ".active"),
          (to = ".btn"),
          (tr = {
            CLICK_DATA_API: "click" + X + G,
            FOCUS_BLUR_DATA_API: "focus" + X + G + " blur" + X + G,
          }),
          (ta = (function () {
            function t(t) {
              this._element = t;
            }
            var e = t.prototype;
            return (
              (e.toggle = function () {
                var t = !0,
                  e = !0,
                  i = q(this._element).closest(ti)[0];
                if (i) {
                  var s = q(this._element).find(ts)[0];
                  if (s) {
                    if ("radio" === s.type) {
                      if (s.checked && q(this._element).hasClass(Z)) t = !1;
                      else {
                        var n = q(i).find(tn)[0];
                        n && q(n).removeClass(Z);
                      }
                    }
                    if (t) {
                      if (
                        s.hasAttribute("disabled") ||
                        i.hasAttribute("disabled") ||
                        s.classList.contains("disabled") ||
                        i.classList.contains("disabled")
                      )
                        return;
                      (s.checked = !q(this._element).hasClass(Z)),
                        q(s).trigger("change");
                    }
                    s.focus(), (e = !1);
                  }
                }
                e &&
                  this._element.setAttribute(
                    "aria-pressed",
                    !q(this._element).hasClass(Z)
                  ),
                  t && q(this._element).toggleClass(Z);
              }),
              (e.dispose = function () {
                q.removeData(this._element, V), (this._element = null);
              }),
              (t._jQueryInterface = function (e) {
                return this.each(function () {
                  var i = q(this).data(V);
                  i || ((i = new t(this)), q(this).data(V, i)),
                    "toggle" === e && i[e]();
                });
              }),
              s(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.0.0";
                  },
                },
              ]),
              t
            );
          })()),
          q(document)
            .on(tr.CLICK_DATA_API, te, function (t) {
              t.preventDefault();
              var e = t.target;
              q(e).hasClass(J) || (e = q(e).closest(to)),
                ta._jQueryInterface.call(q(e), "toggle");
            })
            .on(tr.FOCUS_BLUR_DATA_API, te, function (t) {
              var e = q(t.target).closest(to)[0];
              q(e).toggleClass(tt, /^focus(in)?$/.test(t.type));
            }),
          (q.fn[K] = ta._jQueryInterface),
          (q.fn[K].Constructor = ta),
          (q.fn[K].noConflict = function () {
            return (q.fn[K] = Q), ta._jQueryInterface;
          }),
          ta),
        tu =
          ((l = e),
          (h = "carousel"),
          (u = "." + (c = "bs.carousel")),
          (d = l.fn[h]),
          (p = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
          }),
          (f = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
          }),
          (g = "next"),
          (m = "prev"),
          (v = {
            SLIDE: "slide" + u,
            SLID: "slid" + u,
            KEYDOWN: "keydown" + u,
            MOUSEENTER: "mouseenter" + u,
            MOUSELEAVE: "mouseleave" + u,
            TOUCHEND: "touchend" + u,
            LOAD_DATA_API: "load" + u + ".data-api",
            CLICK_DATA_API: "click" + u + ".data-api",
          }),
          (b = "active"),
          ($ = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]',
          }),
          (y = (function () {
            function t(t, e) {
              (this._items = null),
                (this._interval = null),
                (this._activeElement = null),
                (this._isPaused = !1),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this._config = this._getConfig(e)),
                (this._element = l(t)[0]),
                (this._indicatorsElement = l(this._element).find(
                  $.INDICATORS
                )[0]),
                this._addEventListeners();
            }
            var e = t.prototype;
            return (
              (e.next = function () {
                this._isSliding || this._slide(g);
              }),
              (e.nextWhenVisible = function () {
                !document.hidden &&
                  l(this._element).is(":visible") &&
                  "hidden" !== l(this._element).css("visibility") &&
                  this.next();
              }),
              (e.prev = function () {
                this._isSliding || this._slide(m);
              }),
              (e.pause = function (t) {
                t || (this._isPaused = !0),
                  l(this._element).find($.NEXT_PREV)[0] &&
                    tl.supportsTransitionEnd() &&
                    (tl.triggerTransitionEnd(this._element), this.cycle(!0)),
                  clearInterval(this._interval),
                  (this._interval = null);
              }),
              (e.cycle = function (t) {
                t || (this._isPaused = !1),
                  this._interval &&
                    (clearInterval(this._interval), (this._interval = null)),
                  this._config.interval &&
                    !this._isPaused &&
                    (this._interval = setInterval(
                      (document.visibilityState
                        ? this.nextWhenVisible
                        : this.next
                      ).bind(this),
                      this._config.interval
                    ));
              }),
              (e.to = function (t) {
                var e = this;
                this._activeElement = l(this._element).find($.ACTIVE_ITEM)[0];
                var i = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0)) {
                  if (this._isSliding)
                    l(this._element).one(v.SLID, function () {
                      return e.to(t);
                    });
                  else {
                    if (i === t) return this.pause(), void this.cycle();
                    this._slide(t > i ? g : m, this._items[t]);
                  }
                }
              }),
              (e.dispose = function () {
                l(this._element).off(u),
                  l.removeData(this._element, c),
                  (this._items = null),
                  (this._config = null),
                  (this._element = null),
                  (this._interval = null),
                  (this._isPaused = null),
                  (this._isSliding = null),
                  (this._activeElement = null),
                  (this._indicatorsElement = null);
              }),
              (e._getConfig = function (t) {
                return (t = n({}, p, t)), tl.typeCheckConfig(h, t, f), t;
              }),
              (e._addEventListeners = function () {
                var t = this;
                this._config.keyboard &&
                  l(this._element).on(v.KEYDOWN, function (e) {
                    return t._keydown(e);
                  }),
                  "hover" === this._config.pause &&
                    (l(this._element)
                      .on(v.MOUSEENTER, function (e) {
                        return t.pause(e);
                      })
                      .on(v.MOUSELEAVE, function (e) {
                        return t.cycle(e);
                      }),
                    ("ontouchstart" in document.documentElement) &&
                      l(this._element).on(v.TOUCHEND, function () {
                        t.pause(),
                          t.touchTimeout && clearTimeout(t.touchTimeout),
                          (t.touchTimeout = setTimeout(function (e) {
                            return t.cycle(e);
                          }, 500 + t._config.interval));
                      }));
              }),
              (e._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName))
                  switch (t.which) {
                    case 37:
                      t.preventDefault(), this.prev();
                      break;
                    case 39:
                      t.preventDefault(), this.next();
                  }
              }),
              (e._getItemIndex = function (t) {
                return (
                  (this._items = l.makeArray(l(t).parent().find($.ITEM))),
                  this._items.indexOf(t)
                );
              }),
              (e._getItemByDirection = function (t, e) {
                var i = this._getItemIndex(e),
                  s = this._items.length - 1;
                if (
                  ((t === m && 0 === i) || (t === g && i === s)) &&
                  !this._config.wrap
                )
                  return e;
                var n = (i + (t === m ? -1 : 1)) % this._items.length;
                return -1 === n
                  ? this._items[this._items.length - 1]
                  : this._items[n];
              }),
              (e._triggerSlideEvent = function (t, e) {
                var i = this._getItemIndex(t),
                  s = this._getItemIndex(
                    l(this._element).find($.ACTIVE_ITEM)[0]
                  ),
                  n = l.Event(v.SLIDE, {
                    relatedTarget: t,
                    direction: e,
                    from: s,
                    to: i,
                  });
                return l(this._element).trigger(n), n;
              }),
              (e._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) {
                  l(this._indicatorsElement).find($.ACTIVE).removeClass(b);
                  var e =
                    this._indicatorsElement.children[this._getItemIndex(t)];
                  e && l(e).addClass(b);
                }
              }),
              (e._slide = function (t, e) {
                var i,
                  s,
                  n,
                  o = this,
                  r = l(this._element).find($.ACTIVE_ITEM)[0],
                  a = this._getItemIndex(r),
                  h = e || (r && this._getItemByDirection(t, r)),
                  c = this._getItemIndex(h),
                  u = Boolean(this._interval);
                if (
                  (t === g
                    ? ((i = "carousel-item-left"),
                      (s = "carousel-item-next"),
                      (n = "left"))
                    : ((i = "carousel-item-right"),
                      (s = "carousel-item-prev"),
                      (n = "right")),
                  h && l(h).hasClass(b))
                )
                  this._isSliding = !1;
                else if (
                  !this._triggerSlideEvent(h, n).isDefaultPrevented() &&
                  r &&
                  h
                ) {
                  (this._isSliding = !0),
                    u && this.pause(),
                    this._setActiveIndicatorElement(h);
                  var d = l.Event(v.SLID, {
                    relatedTarget: h,
                    direction: n,
                    from: a,
                    to: c,
                  });
                  tl.supportsTransitionEnd() &&
                  l(this._element).hasClass("slide")
                    ? (l(h).addClass(s),
                      tl.reflow(h),
                      l(r).addClass(i),
                      l(h).addClass(i),
                      l(r)
                        .one(tl.TRANSITION_END, function () {
                          l(h)
                            .removeClass(i + " " + s)
                            .addClass(b),
                            l(r).removeClass(b + " " + s + " " + i),
                            (o._isSliding = !1),
                            setTimeout(function () {
                              return l(o._element).trigger(d);
                            }, 0);
                        })
                        .emulateTransitionEnd(600))
                    : (l(r).removeClass(b),
                      l(h).addClass(b),
                      (this._isSliding = !1),
                      l(this._element).trigger(d)),
                    u && this.cycle();
                }
              }),
              (t._jQueryInterface = function (e) {
                return this.each(function () {
                  var i = l(this).data(c),
                    s = n({}, p, l(this).data());
                  "object" == typeof e && (s = n({}, s, e));
                  var o = "string" == typeof e ? e : s.slide;
                  if (
                    (i || ((i = new t(this, s)), l(this).data(c, i)),
                    "number" == typeof e)
                  )
                    i.to(e);
                  else if ("string" == typeof o) {
                    if (void 0 === i[o])
                      throw TypeError('No method named "' + o + '"');
                    i[o]();
                  } else s.interval && (i.pause(), i.cycle());
                });
              }),
              (t._dataApiClickHandler = function (e) {
                var i = tl.getSelectorFromElement(this);
                if (i) {
                  var s = l(i)[0];
                  if (s && l(s).hasClass("carousel")) {
                    var o = n({}, l(s).data(), l(this).data()),
                      r = this.getAttribute("data-slide-to");
                    r && (o.interval = !1),
                      t._jQueryInterface.call(l(s), o),
                      r && l(s).data(c).to(r),
                      e.preventDefault();
                  }
                }
              }),
              s(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.0.0";
                  },
                },
                {
                  key: "Default",
                  get: function () {
                    return p;
                  },
                },
              ]),
              t
            );
          })()),
          l(document).on(
            v.CLICK_DATA_API,
            $.DATA_SLIDE,
            y._dataApiClickHandler
          ),
          l(window).on(v.LOAD_DATA_API, function () {
            l($.DATA_RIDE).each(function () {
              var t = l(this);
              y._jQueryInterface.call(t, t.data());
            });
          }),
          (l.fn[h] = y._jQueryInterface),
          (l.fn[h].Constructor = y),
          (l.fn[h].noConflict = function () {
            return (l.fn[h] = d), y._jQueryInterface;
          }),
          y),
        td =
          ((w = e),
          (_ = "collapse"),
          (C = "." + (k = "bs.collapse")),
          (x = w.fn[_]),
          (T = { toggle: !0, parent: "" }),
          (S = { toggle: "boolean", parent: "(string|element)" }),
          (D = {
            SHOW: "show" + C,
            SHOWN: "shown" + C,
            HIDE: "hide" + C,
            HIDDEN: "hidden" + C,
            CLICK_DATA_API: "click" + C + ".data-api",
          }),
          (E = "show"),
          (I = "collapse"),
          (A = "collapsing"),
          (P = "collapsed"),
          (O = "width"),
          (N = {
            ACTIVES: ".show, .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]',
          }),
          (H = (function () {
            function t(t, e) {
              (this._isTransitioning = !1),
                (this._element = t),
                (this._config = this._getConfig(e)),
                (this._triggerArray = w.makeArray(
                  w(
                    '[data-toggle="collapse"][href="#' +
                      t.id +
                      '"],[data-toggle="collapse"][data-target="#' +
                      t.id +
                      '"]'
                  )
                ));
              for (var i = w(N.DATA_TOGGLE), s = 0; s < i.length; s++) {
                var n = i[s],
                  o = tl.getSelectorFromElement(n);
                null !== o &&
                  w(o).filter(t).length > 0 &&
                  ((this._selector = o), this._triggerArray.push(n));
              }
              (this._parent = this._config.parent ? this._getParent() : null),
                this._config.parent ||
                  this._addAriaAndCollapsedClass(
                    this._element,
                    this._triggerArray
                  ),
                this._config.toggle && this.toggle();
            }
            var e = t.prototype;
            return (
              (e.toggle = function () {
                w(this._element).hasClass(E) ? this.hide() : this.show();
              }),
              (e.show = function () {
                var e,
                  i,
                  s = this;
                if (
                  !this._isTransitioning &&
                  !w(this._element).hasClass(E) &&
                  (this._parent &&
                    0 ===
                      (e = w.makeArray(
                        w(this._parent)
                          .find(N.ACTIVES)
                          .filter('[data-parent="' + this._config.parent + '"]')
                      )).length &&
                    (e = null),
                  !(
                    e &&
                    (i = w(e).not(this._selector).data(k)) &&
                    i._isTransitioning
                  ))
                ) {
                  var n = w.Event(D.SHOW);
                  if ((w(this._element).trigger(n), !n.isDefaultPrevented())) {
                    e &&
                      (t._jQueryInterface.call(
                        w(e).not(this._selector),
                        "hide"
                      ),
                      i || w(e).data(k, null));
                    var o = this._getDimension();
                    w(this._element).removeClass(I).addClass(A),
                      (this._element.style[o] = 0),
                      this._triggerArray.length > 0 &&
                        w(this._triggerArray)
                          .removeClass(P)
                          .attr("aria-expanded", !0),
                      this.setTransitioning(!0);
                    var r = function () {
                      w(s._element).removeClass(A).addClass(I).addClass(E),
                        (s._element.style[o] = ""),
                        s.setTransitioning(!1),
                        w(s._element).trigger(D.SHOWN);
                    };
                    if (tl.supportsTransitionEnd()) {
                      var a = "scroll" + (o[0].toUpperCase() + o.slice(1));
                      w(this._element)
                        .one(tl.TRANSITION_END, r)
                        .emulateTransitionEnd(600),
                        (this._element.style[o] = this._element[a] + "px");
                    } else r();
                  }
                }
              }),
              (e.hide = function () {
                var t = this;
                if (!this._isTransitioning && w(this._element).hasClass(E)) {
                  var e = w.Event(D.HIDE);
                  if ((w(this._element).trigger(e), !e.isDefaultPrevented())) {
                    var i = this._getDimension();
                    if (
                      ((this._element.style[i] =
                        this._element.getBoundingClientRect()[i] + "px"),
                      tl.reflow(this._element),
                      w(this._element)
                        .addClass(A)
                        .removeClass(I)
                        .removeClass(E),
                      this._triggerArray.length > 0)
                    )
                      for (var s = 0; s < this._triggerArray.length; s++) {
                        var n = this._triggerArray[s],
                          o = tl.getSelectorFromElement(n);
                        null !== o &&
                          (w(o).hasClass(E) ||
                            w(n).addClass(P).attr("aria-expanded", !1));
                      }
                    this.setTransitioning(!0);
                    var r = function () {
                      t.setTransitioning(!1),
                        w(t._element)
                          .removeClass(A)
                          .addClass(I)
                          .trigger(D.HIDDEN);
                    };
                    (this._element.style[i] = ""),
                      tl.supportsTransitionEnd()
                        ? w(this._element)
                            .one(tl.TRANSITION_END, r)
                            .emulateTransitionEnd(600)
                        : r();
                  }
                }
              }),
              (e.setTransitioning = function (t) {
                this._isTransitioning = t;
              }),
              (e.dispose = function () {
                w.removeData(this._element, k),
                  (this._config = null),
                  (this._parent = null),
                  (this._element = null),
                  (this._triggerArray = null),
                  (this._isTransitioning = null);
              }),
              (e._getConfig = function (t) {
                return (
                  ((t = n({}, T, t)).toggle = Boolean(t.toggle)),
                  tl.typeCheckConfig(_, t, S),
                  t
                );
              }),
              (e._getDimension = function () {
                return w(this._element).hasClass(O) ? O : "height";
              }),
              (e._getParent = function () {
                var e = this,
                  i = null;
                tl.isElement(this._config.parent)
                  ? ((i = this._config.parent),
                    void 0 !== this._config.parent.jquery &&
                      (i = this._config.parent[0]))
                  : (i = w(this._config.parent)[0]);
                var s =
                  '[data-toggle="collapse"][data-parent="' +
                  this._config.parent +
                  '"]';
                return (
                  w(i)
                    .find(s)
                    .each(function (i, s) {
                      e._addAriaAndCollapsedClass(t._getTargetFromElement(s), [
                        s,
                      ]);
                    }),
                  i
                );
              }),
              (e._addAriaAndCollapsedClass = function (t, e) {
                if (t) {
                  var i = w(t).hasClass(E);
                  e.length > 0 &&
                    w(e).toggleClass(P, !i).attr("aria-expanded", i);
                }
              }),
              (t._getTargetFromElement = function (t) {
                var e = tl.getSelectorFromElement(t);
                return e ? w(e)[0] : null;
              }),
              (t._jQueryInterface = function (e) {
                return this.each(function () {
                  var i = w(this),
                    s = i.data(k),
                    o = n({}, T, i.data(), "object" == typeof e && e);
                  if (
                    (!s && o.toggle && /show|hide/.test(e) && (o.toggle = !1),
                    s || ((s = new t(this, o)), i.data(k, s)),
                    "string" == typeof e)
                  ) {
                    if (void 0 === s[e])
                      throw TypeError('No method named "' + e + '"');
                    s[e]();
                  }
                });
              }),
              s(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.0.0";
                  },
                },
                {
                  key: "Default",
                  get: function () {
                    return T;
                  },
                },
              ]),
              t
            );
          })()),
          w(document).on(D.CLICK_DATA_API, N.DATA_TOGGLE, function (t) {
            "A" === t.currentTarget.tagName && t.preventDefault();
            var e = w(this);
            w(tl.getSelectorFromElement(this)).each(function () {
              var t = w(this),
                i = t.data(k) ? "toggle" : e.data();
              H._jQueryInterface.call(t, i);
            });
          }),
          (w.fn[_] = H._jQueryInterface),
          (w.fn[_].Constructor = H),
          (w.fn[_].noConflict = function () {
            return (w.fn[_] = x), H._jQueryInterface;
          }),
          H),
        tp = "undefined" != typeof window && "undefined" != typeof document,
        tf = ["Edge", "Trident", "Firefox"],
        tg = 0,
        tm = 0;
      tm < tf.length;
      tm += 1
    )
      if (tp && navigator.userAgent.indexOf(tf[tm]) >= 0) {
        tg = 1;
        break;
      }
    var tv =
      tp && window.Promise
        ? function (t) {
            var e = !1;
            return function () {
              e ||
                ((e = !0),
                window.Promise.resolve().then(function () {
                  (e = !1), t();
                }));
            };
          }
        : function (t) {
            var e = !1;
            return function () {
              e ||
                ((e = !0),
                setTimeout(function () {
                  (e = !1), t();
                }, tg));
            };
          };
    function t8(t) {
      return t && "[object Function]" === {}.toString.call(t);
    }
    function tb(t, e) {
      if (1 !== t.nodeType) return [];
      var i = getComputedStyle(t, null);
      return e ? i[e] : i;
    }
    function t$(t) {
      return "HTML" === t.nodeName ? t : t.parentNode || t.host;
    }
    function ty(t) {
      if (!t) return document.body;
      switch (t.nodeName) {
        case "HTML":
        case "BODY":
          return t.ownerDocument.body;
        case "#document":
          return t.body;
      }
      var e = tb(t),
        i = e.overflow,
        s = e.overflowX,
        n = e.overflowY;
      return /(auto|scroll)/.test(i + n + s) ? t : ty(t$(t));
    }
    function tw(t) {
      var e = t && t.offsetParent,
        i = e && e.nodeName;
      return i && "BODY" !== i && "HTML" !== i
        ? -1 !== ["TD", "TABLE"].indexOf(e.nodeName) &&
          "static" === tb(e, "position")
          ? tw(e)
          : e
        : t
        ? t.ownerDocument.documentElement
        : document.documentElement;
    }
    function t_(t) {
      return null !== t.parentNode ? t_(t.parentNode) : t;
    }
    function tk(t, e) {
      if (!(t && t.nodeType && e && e.nodeType))
        return document.documentElement;
      var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
        s = i ? t : e,
        n = i ? e : t,
        o = document.createRange();
      o.setStart(s, 0), o.setEnd(n, 0);
      var r,
        a,
        l = o.commonAncestorContainer;
      if ((t !== l && e !== l) || s.contains(n))
        return "BODY" === (a = (r = l).nodeName) ||
          ("HTML" !== a && tw(r.firstElementChild) !== r)
          ? tw(l)
          : l;
      var h = t_(t);
      return h.host ? tk(h.host, e) : tk(t, t_(e).host);
    }
    function tC(t) {
      var e =
          "top" ===
          (arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "top")
            ? "scrollTop"
            : "scrollLeft",
        i = t.nodeName;
      if ("BODY" === i || "HTML" === i) {
        var s = t.ownerDocument.documentElement;
        return (t.ownerDocument.scrollingElement || s)[e];
      }
      return t[e];
    }
    function tx(t, e) {
      var i = "x" === e ? "Left" : "Top";
      return (
        parseFloat(t["border" + i + "Width"], 10) +
        parseFloat(
          t["border" + ("Left" === i ? "Right" : "Bottom") + "Width"],
          10
        )
      );
    }
    var tT = void 0,
      tS = function () {
        return (
          void 0 === tT &&
            (tT = -1 !== navigator.appVersion.indexOf("MSIE 10")),
          tT
        );
      };
    function tD(t, e, i, s) {
      return Math.max(
        e["offset" + t],
        e["scroll" + t],
        i["client" + t],
        i["offset" + t],
        i["scroll" + t],
        tS()
          ? i["offset" + t] +
              s["margin" + ("Height" === t ? "Top" : "Left")] +
              s["margin" + ("Height" === t ? "Bottom" : "Right")]
          : 0
      );
    }
    function tE() {
      var t = document.body,
        e = document.documentElement,
        i = tS() && getComputedStyle(e);
      return { height: tD("Height", t, e, i), width: tD("Width", t, e, i) };
    }
    var tI = function (t, e) {
        if (!(t instanceof e))
          throw TypeError("Cannot call a class as a function");
      },
      tA = (function () {
        function t(t, e) {
          for (var i = 0; i < e.length; i++) {
            var s = e[i];
            (s.enumerable = s.enumerable || !1),
              (s.configurable = !0),
              "value" in s && (s.writable = !0),
              Object.defineProperty(t, s.key, s);
          }
        }
        return function (e, i, s) {
          return i && t(e.prototype, i), s && t(e, s), e;
        };
      })(),
      tP = function (t, e, i) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = i),
          t
        );
      },
      tO =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var s in i)
              Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
          }
          return t;
        };
    function tN(t) {
      return tO({}, t, { right: t.left + t.width, bottom: t.top + t.height });
    }
    function tH(t) {
      var e = {};
      if (tS())
        try {
          e = t.getBoundingClientRect();
          var i = tC(t, "top"),
            s = tC(t, "left");
          (e.top += i), (e.left += s), (e.bottom += i), (e.right += s);
        } catch (n) {}
      else e = t.getBoundingClientRect();
      var o = {
          left: e.left,
          top: e.top,
          width: e.right - e.left,
          height: e.bottom - e.top,
        },
        r = "HTML" === t.nodeName ? tE() : {},
        a = r.width || t.clientWidth || o.right - o.left,
        l = r.height || t.clientHeight || o.bottom - o.top,
        h = t.offsetWidth - a,
        c = t.offsetHeight - l;
      if (h || c) {
        var u = tb(t);
        (h -= tx(u, "x")), (c -= tx(u, "y")), (o.width -= h), (o.height -= c);
      }
      return tN(o);
    }
    function tz(t, e) {
      var i = tS(),
        s = "HTML" === e.nodeName,
        n = tH(t),
        o = tH(e),
        r = ty(t),
        a = tb(e),
        l = parseFloat(a.borderTopWidth, 10),
        h = parseFloat(a.borderLeftWidth, 10),
        c = tN({
          top: n.top - o.top - l,
          left: n.left - o.left - h,
          width: n.width,
          height: n.height,
        });
      if (((c.marginTop = 0), (c.marginLeft = 0), !i && s)) {
        var u = parseFloat(a.marginTop, 10),
          d = parseFloat(a.marginLeft, 10);
        (c.top -= l - u),
          (c.bottom -= l - u),
          (c.left -= h - d),
          (c.right -= h - d),
          (c.marginTop = u),
          (c.marginLeft = d);
      }
      return (
        (i ? e.contains(r) : e === r && "BODY" !== r.nodeName) &&
          (c = (function (t, e) {
            var i =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              s = tC(e, "top"),
              n = tC(e, "left"),
              o = i ? -1 : 1;
            return (
              (t.top += s * o),
              (t.bottom += s * o),
              (t.left += n * o),
              (t.right += n * o),
              t
            );
          })(c, e)),
        c
      );
    }
    function tM(t, e, i, s) {
      var n,
        o,
        r,
        a,
        l,
        h,
        c,
        u = { top: 0, left: 0 },
        d = tk(t, e);
      if ("viewport" === s)
        (o = (n = d).ownerDocument.documentElement),
          (r = tz(n, o)),
          (a = Math.max(o.clientWidth, window.innerWidth || 0)),
          (l = Math.max(o.clientHeight, window.innerHeight || 0)),
          (h = tC(o)),
          (c = tC(o, "left")),
          (u = tN({
            top: h - r.top + r.marginTop,
            left: c - r.left + r.marginLeft,
            width: a,
            height: l,
          }));
      else {
        var p = void 0;
        "scrollParent" === s
          ? "BODY" === (p = ty(t$(e))).nodeName &&
            (p = t.ownerDocument.documentElement)
          : (p = "window" === s ? t.ownerDocument.documentElement : s);
        var f = tz(p, d);
        if (
          "HTML" !== p.nodeName ||
          (function t(e) {
            var i = e.nodeName;
            return (
              "BODY" !== i &&
              "HTML" !== i &&
              ("fixed" === tb(e, "position") || t(t$(e)))
            );
          })(d)
        )
          u = f;
        else {
          var g = tE(),
            m = g.height,
            v = g.width;
          (u.top += f.top - f.marginTop),
            (u.bottom = m + f.top),
            (u.left += f.left - f.marginLeft),
            (u.right = v + f.left);
        }
      }
      return (u.left += i), (u.top += i), (u.right -= i), (u.bottom -= i), u;
    }
    function tL(t, e, i, s, n) {
      var o =
        arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
      if (-1 === t.indexOf("auto")) return t;
      var r = tM(i, s, o, n),
        a = {
          top: { width: r.width, height: e.top - r.top },
          right: { width: r.right - e.right, height: r.height },
          bottom: { width: r.width, height: r.bottom - e.bottom },
          left: { width: e.left - r.left, height: r.height },
        },
        l = Object.keys(a)
          .map(function (t) {
            var e;
            return tO({ key: t }, a[t], { area: (e = a[t]).width * e.height });
          })
          .sort(function (t, e) {
            return e.area - t.area;
          }),
        h = l.filter(function (t) {
          var e = t.width,
            s = t.height;
          return e >= i.clientWidth && s >= i.clientHeight;
        }),
        c = h.length > 0 ? h[0].key : l[0].key,
        u = t.split("-")[1];
      return c + (u ? "-" + u : "");
    }
    function tW(t, e, i) {
      return tz(i, tk(e, i));
    }
    function t9(t) {
      var e = getComputedStyle(t),
        i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
        s = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
      return { width: t.offsetWidth + s, height: t.offsetHeight + i };
    }
    function tR(t) {
      var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
      return t.replace(/left|right|bottom|top/g, function (t) {
        return e[t];
      });
    }
    function t0(t, e, i) {
      i = i.split("-")[0];
      var s = t9(t),
        n = { width: s.width, height: s.height },
        o = -1 !== ["right", "left"].indexOf(i),
        r = o ? "top" : "left",
        a = o ? "left" : "top",
        l = o ? "height" : "width";
      return (
        (n[r] = e[r] + e[l] / 2 - s[l] / 2),
        (n[a] = i === a ? e[a] - s[o ? "width" : "height"] : e[tR(a)]),
        n
      );
    }
    function tj(t, e) {
      return Array.prototype.find ? t.find(e) : t.filter(e)[0];
    }
    function tF(t, e, i) {
      return (
        (void 0 === i
          ? t
          : t.slice(
              0,
              (function (t, e, i) {
                if (Array.prototype.findIndex)
                  return t.findIndex(function (t) {
                    return t[e] === i;
                  });
                var s = tj(t, function (t) {
                  return t[e] === i;
                });
                return t.indexOf(s);
              })(t, "name", i)
            )
        ).forEach(function (t) {
          t.function &&
            console.warn(
              "`modifier.function` is deprecated, use `modifier.fn`!"
            );
          var i = t.function || t.fn;
          t.enabled &&
            t8(i) &&
            ((e.offsets.popper = tN(e.offsets.popper)),
            (e.offsets.reference = tN(e.offsets.reference)),
            (e = i(e, t)));
        }),
        e
      );
    }
    function tB(t, e) {
      return t.some(function (t) {
        var i = t.name;
        return t.enabled && i === e;
      });
    }
    function tY(t) {
      for (
        var e = [!1, "ms", "Webkit", "Moz", "O"],
          i = t.charAt(0).toUpperCase() + t.slice(1),
          s = 0;
        s < e.length - 1;
        s++
      ) {
        var n = e[s],
          o = n ? "" + n + i : t;
        if (void 0 !== document.body.style[o]) return o;
      }
      return null;
    }
    function tU(t) {
      var e = t.ownerDocument;
      return e ? e.defaultView : window;
    }
    function tq() {
      var t, e;
      this.state.eventsEnabled &&
        (cancelAnimationFrame(this.scheduleUpdate),
        (this.state =
          ((t = this.reference),
          (e = this.state),
          tU(t).removeEventListener("resize", e.updateBound),
          e.scrollParents.forEach(function (t) {
            t.removeEventListener("scroll", e.updateBound);
          }),
          (e.updateBound = null),
          (e.scrollParents = []),
          (e.scrollElement = null),
          (e.eventsEnabled = !1),
          e)));
    }
    function t1(t) {
      return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
    }
    function tK(t, e) {
      Object.keys(e).forEach(function (i) {
        var s = "";
        -1 !==
          ["width", "height", "top", "right", "bottom", "left"].indexOf(i) &&
          t1(e[i]) &&
          (s = "px"),
          (t.style[i] = e[i] + s);
      });
    }
    function t3(t, e, i) {
      var s = tj(t, function (t) {
          return t.name === e;
        }),
        n =
          !!s &&
          t.some(function (t) {
            return t.name === i && t.enabled && t.order < s.order;
          });
      if (!n) {
        var o = "`" + e + "`";
        console.warn(
          "`" +
            i +
            "` modifier is required by " +
            o +
            " modifier in order to work, be sure to include it before " +
            o +
            "!"
        );
      }
      return n;
    }
    var tV = [
        "auto-start",
        "auto",
        "auto-end",
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-end",
        "bottom",
        "bottom-start",
        "left-end",
        "left",
        "left-start",
      ],
      t2 = tV.slice(3);
    function tX(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        i = t2.indexOf(t),
        s = t2.slice(i + 1).concat(t2.slice(0, i));
      return e ? s.reverse() : s;
    }
    var tG,
      t7,
      t4,
      t5,
      t6,
      tQ,
      tZ,
      tJ,
      et,
      ee,
      ei,
      es,
      en,
      eo,
      er,
      ea,
      el,
      eh,
      ec,
      eu,
      ed,
      ep,
      ef,
      eg,
      em,
      ev,
      e8,
      eb,
      e$,
      ey,
      ew,
      e_,
      ek,
      eC,
      ex,
      eT,
      eS,
      eD,
      eE,
      eI,
      eA,
      eP,
      eO,
      eN,
      eH,
      ez,
      eM,
      eL,
      eW,
      e9,
      eR,
      e0,
      ej,
      eF,
      eB,
      eY,
      eU,
      eq,
      e1,
      eK,
      e3,
      eV,
      e2,
      eX,
      eG,
      e7,
      e4,
      e5,
      e6,
      eQ,
      eZ,
      eJ,
      it,
      ie,
      ii,
      is,
      io = {
        FLIP: "flip",
        CLOCKWISE: "clockwise",
        COUNTERCLOCKWISE: "counterclockwise",
      },
      ir = (function () {
        function t(e, i) {
          var s = this,
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
          tI(this, t),
            (this.scheduleUpdate = function () {
              return requestAnimationFrame(s.update);
            }),
            (this.update = tv(this.update.bind(this))),
            (this.options = tO({}, t.Defaults, n)),
            (this.state = {
              isDestroyed: !1,
              isCreated: !1,
              scrollParents: [],
            }),
            (this.reference = e && e.jquery ? e[0] : e),
            (this.popper = i && i.jquery ? i[0] : i),
            (this.options.modifiers = {}),
            Object.keys(tO({}, t.Defaults.modifiers, n.modifiers)).forEach(
              function (e) {
                s.options.modifiers[e] = tO(
                  {},
                  t.Defaults.modifiers[e] || {},
                  n.modifiers ? n.modifiers[e] : {}
                );
              }
            ),
            (this.modifiers = Object.keys(this.options.modifiers)
              .map(function (t) {
                return tO({ name: t }, s.options.modifiers[t]);
              })
              .sort(function (t, e) {
                return t.order - e.order;
              })),
            this.modifiers.forEach(function (t) {
              t.enabled &&
                t8(t.onLoad) &&
                t.onLoad(s.reference, s.popper, s.options, t, s.state);
            }),
            this.update();
          var o = this.options.eventsEnabled;
          o && this.enableEventListeners(), (this.state.eventsEnabled = o);
        }
        return (
          tA(t, [
            {
              key: "update",
              value: function () {
                return function () {
                  if (!this.state.isDestroyed) {
                    var t = {
                      instance: this,
                      styles: {},
                      arrowStyles: {},
                      attributes: {},
                      flipped: !1,
                      offsets: {},
                    };
                    (t.offsets.reference = tW(
                      this.state,
                      this.popper,
                      this.reference
                    )),
                      (t.placement = tL(
                        this.options.placement,
                        t.offsets.reference,
                        this.popper,
                        this.reference,
                        this.options.modifiers.flip.boundariesElement,
                        this.options.modifiers.flip.padding
                      )),
                      (t.originalPlacement = t.placement),
                      (t.offsets.popper = t0(
                        this.popper,
                        t.offsets.reference,
                        t.placement
                      )),
                      (t.offsets.popper.position = "absolute"),
                      (t = tF(this.modifiers, t)),
                      this.state.isCreated
                        ? this.options.onUpdate(t)
                        : ((this.state.isCreated = !0),
                          this.options.onCreate(t));
                  }
                }.call(this);
              },
            },
            {
              key: "destroy",
              value: function () {
                return function () {
                  return (
                    (this.state.isDestroyed = !0),
                    tB(this.modifiers, "applyStyle") &&
                      (this.popper.removeAttribute("x-placement"),
                      (this.popper.style.left = ""),
                      (this.popper.style.position = ""),
                      (this.popper.style.top = ""),
                      (this.popper.style[tY("transform")] = "")),
                    this.disableEventListeners(),
                    this.options.removeOnDestroy &&
                      this.popper.parentNode.removeChild(this.popper),
                    this
                  );
                }.call(this);
              },
            },
            {
              key: "enableEventListeners",
              value: function () {
                return function () {
                  var t, e, i, s, n;
                  this.state.eventsEnabled ||
                    (this.state =
                      ((t = this.reference),
                      this.options,
                      (i = this.state),
                      (s = this.scheduleUpdate),
                      (i.updateBound = s),
                      tU(t).addEventListener("resize", i.updateBound, {
                        passive: !0,
                      }),
                      (function t(e, i, s, n) {
                        var o = "BODY" === e.nodeName,
                          r = o ? e.ownerDocument.defaultView : e;
                        r.addEventListener(i, s, { passive: !0 }),
                          o || t(ty(r.parentNode), i, s, n),
                          n.push(r);
                      })((n = ty(t)), "scroll", i.updateBound, i.scrollParents),
                      (i.scrollElement = n),
                      (i.eventsEnabled = !0),
                      i));
                }.call(this);
              },
            },
            {
              key: "disableEventListeners",
              value: function () {
                return tq.call(this);
              },
            },
          ]),
          t
        );
      })();
    (ir.Utils = ("undefined" != typeof window ? window : global).PopperUtils),
      (ir.placements = tV),
      (ir.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: {
          shift: {
            order: 100,
            enabled: !0,
            fn: function (t) {
              var e = t.placement,
                i = e.split("-")[0],
                s = e.split("-")[1];
              if (s) {
                var n = t.offsets,
                  o = n.reference,
                  r = n.popper,
                  a = -1 !== ["bottom", "top"].indexOf(i),
                  l = a ? "left" : "top",
                  h = a ? "width" : "height",
                  c = {
                    start: tP({}, l, o[l]),
                    end: tP({}, l, o[l] + o[h] - r[h]),
                  };
                t.offsets.popper = tO({}, r, c[s]);
              }
              return t;
            },
          },
          offset: {
            order: 200,
            enabled: !0,
            fn: function (t, e) {
              var i,
                s,
                n,
                o,
                r,
                a,
                l,
                h,
                c,
                u,
                d = e.offset,
                p = t.placement,
                f = t.offsets,
                g = f.popper,
                m = f.reference,
                v = p.split("-")[0],
                b = void 0;
              return (
                (b = t1(+d)
                  ? [+d, 0]
                  : ((i = d),
                    (s = g),
                    (n = m),
                    (r = [0, 0]),
                    (a = -1 !== ["right", "left"].indexOf((o = v))),
                    l[
                      (h = (l = i.split(/(\+|\-)/).map(function (t) {
                        return t.trim();
                      })).indexOf(
                        tj(l, function (t) {
                          return -1 !== t.search(/,|\s/);
                        })
                      ))
                    ] &&
                      -1 === l[h].indexOf(",") &&
                      console.warn(
                        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
                      ),
                    (c = /\s*,\s*|\s+/),
                    (u = (u =
                      -1 !== h
                        ? [
                            l.slice(0, h).concat([l[h].split(c)[0]]),
                            [l[h].split(c)[1]].concat(l.slice(h + 1)),
                          ]
                        : [l]).map(function (t, e) {
                      var i = (1 === e ? !a : a) ? "height" : "width",
                        o = !1;
                      return t
                        .reduce(function (t, e) {
                          return "" === t[t.length - 1] &&
                            -1 !== ["+", "-"].indexOf(e)
                            ? ((t[t.length - 1] = e), (o = !0), t)
                            : o
                            ? ((t[t.length - 1] += e), (o = !1), t)
                            : t.concat(e);
                        }, [])
                        .map(function (t) {
                          return (function (t, e, i, s) {
                            var n = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                              o = +n[1],
                              r = n[2];
                            if (!o) return t;
                            if (0 === r.indexOf("%")) {
                              var a = void 0;
                              return (
                                (tN((a = "%p" === r ? i : s))[e] / 100) * o
                              );
                            }
                            return "vh" === r || "vw" === r
                              ? (("vh" === r
                                  ? Math.max(
                                      document.documentElement.clientHeight,
                                      window.innerHeight || 0
                                    )
                                  : Math.max(
                                      document.documentElement.clientWidth,
                                      window.innerWidth || 0
                                    )) /
                                  100) *
                                  o
                              : o;
                          })(t, i, s, n);
                        });
                    })).forEach(function (t, e) {
                      t.forEach(function (i, s) {
                        t1(i) && (r[e] += i * ("-" === t[s - 1] ? -1 : 1));
                      });
                    }),
                    r)),
                "left" === v
                  ? ((g.top += b[0]), (g.left -= b[1]))
                  : "right" === v
                  ? ((g.top += b[0]), (g.left += b[1]))
                  : "top" === v
                  ? ((g.left += b[0]), (g.top -= b[1]))
                  : "bottom" === v && ((g.left += b[0]), (g.top += b[1])),
                (t.popper = g),
                t
              );
            },
            offset: 0,
          },
          preventOverflow: {
            order: 300,
            enabled: !0,
            fn: function (t, e) {
              var i = e.boundariesElement || tw(t.instance.popper);
              t.instance.reference === i && (i = tw(i));
              var s = tM(t.instance.popper, t.instance.reference, e.padding, i);
              e.boundaries = s;
              var n = e.priority,
                o = t.offsets.popper,
                r = {
                  primary: function (t) {
                    var i = o[t];
                    return (
                      o[t] < s[t] &&
                        !e.escapeWithReference &&
                        (i = Math.max(o[t], s[t])),
                      tP({}, t, i)
                    );
                  },
                  secondary: function (t) {
                    var i = "right" === t ? "left" : "top",
                      n = o[i];
                    return (
                      o[t] > s[t] &&
                        !e.escapeWithReference &&
                        (n = Math.min(
                          o[i],
                          s[t] - ("right" === t ? o.width : o.height)
                        )),
                      tP({}, i, n)
                    );
                  },
                };
              return (
                n.forEach(function (t) {
                  o = tO(
                    {},
                    o,
                    r[
                      -1 !== ["left", "top"].indexOf(t)
                        ? "primary"
                        : "secondary"
                    ](t)
                  );
                }),
                (t.offsets.popper = o),
                t
              );
            },
            priority: ["left", "right", "top", "bottom"],
            padding: 5,
            boundariesElement: "scrollParent",
          },
          keepTogether: {
            order: 400,
            enabled: !0,
            fn: function (t) {
              var e = t.offsets,
                i = e.popper,
                s = e.reference,
                n = t.placement.split("-")[0],
                o = Math.floor,
                r = -1 !== ["top", "bottom"].indexOf(n),
                a = r ? "right" : "bottom",
                l = r ? "left" : "top";
              return (
                i[a] < o(s[l]) &&
                  (t.offsets.popper[l] = o(s[l]) - i[r ? "width" : "height"]),
                i[l] > o(s[a]) && (t.offsets.popper[l] = o(s[a])),
                t
              );
            },
          },
          arrow: {
            order: 500,
            enabled: !0,
            fn: function (t, e) {
              if (!t3(t.instance.modifiers, "arrow", "keepTogether")) return t;
              var i,
                s = e.element;
              if ("string" == typeof s) {
                if (!(s = t.instance.popper.querySelector(s))) return t;
              } else if (!t.instance.popper.contains(s))
                return (
                  console.warn(
                    "WARNING: `arrow.element` must be child of its popper element!"
                  ),
                  t
                );
              var n = t.placement.split("-")[0],
                o = t.offsets,
                r = o.popper,
                a = o.reference,
                l = -1 !== ["left", "right"].indexOf(n),
                h = l ? "height" : "width",
                c = l ? "Top" : "Left",
                u = c.toLowerCase(),
                d = l ? "bottom" : "right",
                p = t9(s)[h];
              a[d] - p < r[u] && (t.offsets.popper[u] -= r[u] - (a[d] - p)),
                a[u] + p > r[d] && (t.offsets.popper[u] += a[u] + p - r[d]),
                (t.offsets.popper = tN(t.offsets.popper));
              var f = a[u] + a[h] / 2 - p / 2,
                g = tb(t.instance.popper),
                m = parseFloat(g["margin" + c], 10),
                v = parseFloat(g["border" + c + "Width"], 10),
                b = f - t.offsets.popper[u] - m - v;
              return (
                (b = Math.max(Math.min(r[h] - p, b), 0)),
                (t.arrowElement = s),
                (t.offsets.arrow =
                  (tP((i = {}), u, Math.round(b)),
                  tP(i, l ? "left" : "top", ""),
                  i)),
                t
              );
            },
            element: "[x-arrow]",
          },
          flip: {
            order: 600,
            enabled: !0,
            fn: function (t, e) {
              if (
                tB(t.instance.modifiers, "inner") ||
                (t.flipped && t.placement === t.originalPlacement)
              )
                return t;
              var i = tM(
                  t.instance.popper,
                  t.instance.reference,
                  e.padding,
                  e.boundariesElement
                ),
                s = t.placement.split("-")[0],
                n = tR(s),
                o = t.placement.split("-")[1] || "",
                r = [];
              switch (e.behavior) {
                case io.FLIP:
                  r = [s, n];
                  break;
                case io.CLOCKWISE:
                  r = tX(s);
                  break;
                case io.COUNTERCLOCKWISE:
                  r = tX(s, !0);
                  break;
                default:
                  r = e.behavior;
              }
              return (
                r.forEach(function (a, l) {
                  if (s !== a || r.length === l + 1) return t;
                  n = tR((s = t.placement.split("-")[0]));
                  var h,
                    c = t.offsets.popper,
                    u = t.offsets.reference,
                    d = Math.floor,
                    p =
                      ("left" === s && d(c.right) > d(u.left)) ||
                      ("right" === s && d(c.left) < d(u.right)) ||
                      ("top" === s && d(c.bottom) > d(u.top)) ||
                      ("bottom" === s && d(c.top) < d(u.bottom)),
                    f = d(c.left) < d(i.left),
                    g = d(c.right) > d(i.right),
                    m = d(c.top) < d(i.top),
                    v = d(c.bottom) > d(i.bottom),
                    b =
                      ("left" === s && f) ||
                      ("right" === s && g) ||
                      ("top" === s && m) ||
                      ("bottom" === s && v),
                    $ = -1 !== ["top", "bottom"].indexOf(s),
                    y =
                      !!e.flipVariations &&
                      (($ && "start" === o && f) ||
                        ($ && "end" === o && g) ||
                        (!$ && "start" === o && m) ||
                        (!$ && "end" === o && v));
                  (p || b || y) &&
                    ((t.flipped = !0),
                    (p || b) && (s = r[l + 1]),
                    y &&
                      (o =
                        "end" === (h = o)
                          ? "start"
                          : "start" === h
                          ? "end"
                          : h),
                    (t.placement = s + (o ? "-" + o : "")),
                    (t.offsets.popper = tO(
                      {},
                      t.offsets.popper,
                      t0(t.instance.popper, t.offsets.reference, t.placement)
                    )),
                    (t = tF(t.instance.modifiers, t, "flip")));
                }),
                t
              );
            },
            behavior: "flip",
            padding: 5,
            boundariesElement: "viewport",
          },
          inner: {
            order: 700,
            enabled: !1,
            fn: function (t) {
              var e = t.placement,
                i = e.split("-")[0],
                s = t.offsets,
                n = s.popper,
                o = s.reference,
                r = -1 !== ["left", "right"].indexOf(i),
                a = -1 === ["top", "left"].indexOf(i);
              return (
                (n[r ? "left" : "top"] =
                  o[i] - (a ? n[r ? "width" : "height"] : 0)),
                (t.placement = tR(e)),
                (t.offsets.popper = tN(n)),
                t
              );
            },
          },
          hide: {
            order: 800,
            enabled: !0,
            fn: function (t) {
              if (!t3(t.instance.modifiers, "hide", "preventOverflow"))
                return t;
              var e = t.offsets.reference,
                i = tj(t.instance.modifiers, function (t) {
                  return "preventOverflow" === t.name;
                }).boundaries;
              if (
                e.bottom < i.top ||
                e.left > i.right ||
                e.top > i.bottom ||
                e.right < i.left
              ) {
                if (!0 === t.hide) return t;
                (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
              } else {
                if (!1 === t.hide) return t;
                (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
              }
              return t;
            },
          },
          computeStyle: {
            order: 850,
            enabled: !0,
            fn: function (t, e) {
              var i = e.x,
                s = e.y,
                n = t.offsets.popper,
                o = tj(t.instance.modifiers, function (t) {
                  return "applyStyle" === t.name;
                }).gpuAcceleration;
              void 0 !== o &&
                console.warn(
                  "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                );
              var r = void 0 !== o ? o : e.gpuAcceleration,
                a = tH(tw(t.instance.popper)),
                l = { position: n.position },
                h = {
                  left: Math.floor(n.left),
                  top: Math.floor(n.top),
                  bottom: Math.floor(n.bottom),
                  right: Math.floor(n.right),
                },
                c = "bottom" === i ? "top" : "bottom",
                u = "right" === s ? "left" : "right",
                d = tY("transform"),
                p = void 0,
                f = void 0;
              ((f = "bottom" === c ? -a.height + h.bottom : h.top),
              (p = "right" === u ? -a.width + h.right : h.left),
              r && d)
                ? ((l[d] = "translate3d(" + p + "px, " + f + "px, 0)"),
                  (l[c] = 0),
                  (l[u] = 0),
                  (l.willChange = "transform"))
                : ((l[c] = f * ("bottom" === c ? -1 : 1)),
                  (l[u] = p * ("right" === u ? -1 : 1)),
                  (l.willChange = c + ", " + u));
              var g = { "x-placement": t.placement };
              return (
                (t.attributes = tO({}, g, t.attributes)),
                (t.styles = tO({}, l, t.styles)),
                (t.arrowStyles = tO({}, t.offsets.arrow, t.arrowStyles)),
                t
              );
            },
            gpuAcceleration: !0,
            x: "bottom",
            y: "right",
          },
          applyStyle: {
            order: 900,
            enabled: !0,
            fn: function (t) {
              var e, i;
              return (
                tK(t.instance.popper, t.styles),
                (e = t.instance.popper),
                Object.keys((i = t.attributes)).forEach(function (t) {
                  !1 !== i[t] ? e.setAttribute(t, i[t]) : e.removeAttribute(t);
                }),
                t.arrowElement &&
                  Object.keys(t.arrowStyles).length &&
                  tK(t.arrowElement, t.arrowStyles),
                t
              );
            },
            onLoad: function (t, e, i, s, n) {
              var o = tW(0, e, t),
                r = tL(
                  i.placement,
                  o,
                  e,
                  t,
                  i.modifiers.flip.boundariesElement,
                  i.modifiers.flip.padding
                );
              return (
                e.setAttribute("x-placement", r),
                tK(e, { position: "absolute" }),
                i
              );
            },
            gpuAcceleration: void 0,
          },
        },
      });
    var ia =
        ((tG = e),
        (t7 = "dropdown"),
        (t5 = "." + (t4 = "bs.dropdown")),
        (t6 = tG.fn[t7]),
        (tQ = RegExp("38|40|27")),
        (tZ = {
          HIDE: "hide" + t5,
          HIDDEN: "hidden" + t5,
          SHOW: "show" + t5,
          SHOWN: "shown" + t5,
          CLICK: "click" + t5,
          CLICK_DATA_API: "click" + t5 + ".data-api",
          KEYDOWN_DATA_API: "keydown" + t5 + ".data-api",
          KEYUP_DATA_API: "keyup" + t5 + ".data-api",
        }),
        (tJ = "disabled"),
        (et = "show"),
        (ee = "dropup"),
        (ei = "dropdown-menu-right"),
        (es = '[data-toggle="dropdown"]'),
        (en = ".dropdown-menu"),
        (eo = "bottom-start"),
        (er = { offset: 0, flip: !0, boundary: "scrollParent" }),
        (ea = {
          offset: "(number|string|function)",
          flip: "boolean",
          boundary: "(string|element)",
        }),
        (el = (function () {
          function t(t, e) {
            (this._element = t),
              (this._popper = null),
              (this._config = this._getConfig(e)),
              (this._menu = this._getMenuElement()),
              (this._inNavbar = this._detectNavbar()),
              this._addEventListeners();
          }
          var e = t.prototype;
          return (
            (e.toggle = function () {
              if (!this._element.disabled && !tG(this._element).hasClass(tJ)) {
                var e = t._getParentFromElement(this._element),
                  i = tG(this._menu).hasClass(et);
                if ((t._clearMenus(), !i)) {
                  var s = { relatedTarget: this._element },
                    n = tG.Event(tZ.SHOW, s);
                  if ((tG(e).trigger(n), !n.isDefaultPrevented())) {
                    if (!this._inNavbar) {
                      if (void 0 === ir)
                        throw TypeError(
                          "Bootstrap dropdown require Popper.js (https://popper.js.org)"
                        );
                      var o = this._element;
                      tG(e).hasClass(ee) &&
                        (tG(this._menu).hasClass("dropdown-menu-left") ||
                          tG(this._menu).hasClass(ei)) &&
                        (o = e),
                        "scrollParent" !== this._config.boundary &&
                          tG(e).addClass("position-static"),
                        (this._popper = new ir(
                          o,
                          this._menu,
                          this._getPopperConfig()
                        ));
                    }
                    "ontouchstart" in document.documentElement &&
                      0 === tG(e).closest(".navbar-nav").length &&
                      tG("body").children().on("mouseover", null, tG.noop),
                      this._element.focus(),
                      this._element.setAttribute("aria-expanded", !0),
                      tG(this._menu).toggleClass(et),
                      tG(e).toggleClass(et).trigger(tG.Event(tZ.SHOWN, s));
                  }
                }
              }
            }),
            (e.dispose = function () {
              tG.removeData(this._element, t4),
                tG(this._element).off(t5),
                (this._element = null),
                (this._menu = null),
                null !== this._popper &&
                  (this._popper.destroy(), (this._popper = null));
            }),
            (e.update = function () {
              (this._inNavbar = this._detectNavbar()),
                null !== this._popper && this._popper.scheduleUpdate();
            }),
            (e._addEventListeners = function () {
              var t = this;
              tG(this._element).on(tZ.CLICK, function (e) {
                e.preventDefault(), e.stopPropagation(), t.toggle();
              });
            }),
            (e._getConfig = function (t) {
              return (
                (t = n(
                  {},
                  this.constructor.Default,
                  tG(this._element).data(),
                  t
                )),
                tl.typeCheckConfig(t7, t, this.constructor.DefaultType),
                t
              );
            }),
            (e._getMenuElement = function () {
              if (!this._menu) {
                var e = t._getParentFromElement(this._element);
                this._menu = tG(e).find(en)[0];
              }
              return this._menu;
            }),
            (e._getPlacement = function () {
              var t = tG(this._element).parent(),
                e = eo;
              return (
                t.hasClass(ee)
                  ? ((e = "top-start"),
                    tG(this._menu).hasClass(ei) && (e = "top-end"))
                  : t.hasClass("dropright")
                  ? (e = "right-start")
                  : t.hasClass("dropleft")
                  ? (e = "left-start")
                  : tG(this._menu).hasClass(ei) && (e = "bottom-end"),
                e
              );
            }),
            (e._detectNavbar = function () {
              return tG(this._element).closest(".navbar").length > 0;
            }),
            (e._getPopperConfig = function () {
              var t = this,
                e = {};
              return (
                "function" == typeof this._config.offset
                  ? (e.fn = function (e) {
                      return (
                        (e.offsets = n(
                          {},
                          e.offsets,
                          t._config.offset(e.offsets) || {}
                        )),
                        e
                      );
                    })
                  : (e.offset = this._config.offset),
                {
                  placement: this._getPlacement(),
                  modifiers: {
                    offset: e,
                    flip: { enabled: this._config.flip },
                    preventOverflow: {
                      boundariesElement: this._config.boundary,
                    },
                  },
                }
              );
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var i = tG(this).data(t4);
                if (
                  (i ||
                    ((i = new t(this, "object" == typeof e ? e : null)),
                    tG(this).data(t4, i)),
                  "string" == typeof e)
                ) {
                  if (void 0 === i[e])
                    throw TypeError('No method named "' + e + '"');
                  i[e]();
                }
              });
            }),
            (t._clearMenus = function (e) {
              if (
                !e ||
                (3 !== e.which && ("keyup" !== e.type || 9 === e.which))
              )
                for (var i = tG.makeArray(tG(es)), s = 0; s < i.length; s++) {
                  var n = t._getParentFromElement(i[s]),
                    o = tG(i[s]).data(t4),
                    r = { relatedTarget: i[s] };
                  if (o) {
                    var a = o._menu;
                    if (
                      tG(n).hasClass(et) &&
                      !(
                        e &&
                        (("click" === e.type &&
                          /input|textarea/i.test(e.target.tagName)) ||
                          ("keyup" === e.type && 9 === e.which)) &&
                        tG.contains(n, e.target)
                      )
                    ) {
                      var l = tG.Event(tZ.HIDE, r);
                      tG(n).trigger(l),
                        l.isDefaultPrevented() ||
                          ("ontouchstart" in document.documentElement &&
                            tG("body")
                              .children()
                              .off("mouseover", null, tG.noop),
                          i[s].setAttribute("aria-expanded", "false"),
                          tG(a).removeClass(et),
                          tG(n)
                            .removeClass(et)
                            .trigger(tG.Event(tZ.HIDDEN, r)));
                    }
                  }
                }
            }),
            (t._getParentFromElement = function (t) {
              var e,
                i = tl.getSelectorFromElement(t);
              return i && (e = tG(i)[0]), e || t.parentNode;
            }),
            (t._dataApiKeydownHandler = function (e) {
              if (
                (/input|textarea/i.test(e.target.tagName)
                  ? !(
                      32 === e.which ||
                      (27 !== e.which &&
                        ((40 !== e.which && 38 !== e.which) ||
                          tG(e.target).closest(en).length))
                    )
                  : tQ.test(e.which)) &&
                (e.preventDefault(),
                e.stopPropagation(),
                !this.disabled && !tG(this).hasClass(tJ))
              ) {
                var i = t._getParentFromElement(this),
                  s = tG(i).hasClass(et);
                if (
                  (s || (27 === e.which && 32 === e.which)) &&
                  (!s || (27 !== e.which && 32 !== e.which))
                ) {
                  var n = tG(i)
                    .find(".dropdown-menu .dropdown-item:not(.disabled)")
                    .get();
                  if (0 !== n.length) {
                    var o = n.indexOf(e.target);
                    38 === e.which && o > 0 && o--,
                      40 === e.which && o < n.length - 1 && o++,
                      o < 0 && (o = 0),
                      n[o].focus();
                  }
                } else {
                  if (27 === e.which) {
                    var r = tG(i).find(es)[0];
                    tG(r).trigger("focus");
                  }
                  tG(this).trigger("click");
                }
              }
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return er;
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return ea;
                },
              },
            ]),
            t
          );
        })()),
        tG(document)
          .on(tZ.KEYDOWN_DATA_API, es, el._dataApiKeydownHandler)
          .on(tZ.KEYDOWN_DATA_API, en, el._dataApiKeydownHandler)
          .on(tZ.CLICK_DATA_API + " " + tZ.KEYUP_DATA_API, el._clearMenus)
          .on(tZ.CLICK_DATA_API, es, function (t) {
            t.preventDefault(),
              t.stopPropagation(),
              el._jQueryInterface.call(tG(this), "toggle");
          })
          .on(tZ.CLICK_DATA_API, ".dropdown form", function (t) {
            t.stopPropagation();
          }),
        (tG.fn[t7] = el._jQueryInterface),
        (tG.fn[t7].Constructor = el),
        (tG.fn[t7].noConflict = function () {
          return (tG.fn[t7] = t6), el._jQueryInterface;
        }),
        el),
      il =
        ((eh = e),
        (eu = "." + (ec = "bs.modal")),
        (ed = eh.fn.modal),
        (ep = { backdrop: !0, keyboard: !0, focus: !0, show: !0 }),
        (ef = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          focus: "boolean",
          show: "boolean",
        }),
        (eg = {
          HIDE: "hide" + eu,
          HIDDEN: "hidden" + eu,
          SHOW: "show" + eu,
          SHOWN: "shown" + eu,
          FOCUSIN: "focusin" + eu,
          RESIZE: "resize" + eu,
          CLICK_DISMISS: "click.dismiss" + eu,
          KEYDOWN_DISMISS: "keydown.dismiss" + eu,
          MOUSEUP_DISMISS: "mouseup.dismiss" + eu,
          MOUSEDOWN_DISMISS: "mousedown.dismiss" + eu,
          CLICK_DATA_API: "click.bs.modal.data-api",
        }),
        (em = "modal-open"),
        (ev = "fade"),
        (e8 = "show"),
        (eb = {
          DIALOG: ".modal-dialog",
          DATA_TOGGLE: '[data-toggle="modal"]',
          DATA_DISMISS: '[data-dismiss="modal"]',
          FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          STICKY_CONTENT: ".sticky-top",
          NAVBAR_TOGGLER: ".navbar-toggler",
        }),
        (e$ = (function () {
          function t(t, e) {
            (this._config = this._getConfig(e)),
              (this._element = t),
              (this._dialog = eh(t).find(eb.DIALOG)[0]),
              (this._backdrop = null),
              (this._isShown = !1),
              (this._isBodyOverflowing = !1),
              (this._ignoreBackdropClick = !1),
              (this._originalBodyPadding = 0),
              (this._scrollbarWidth = 0);
          }
          var e = t.prototype;
          return (
            (e.toggle = function (t) {
              return this._isShown ? this.hide() : this.show(t);
            }),
            (e.show = function (t) {
              var e = this;
              if (!this._isTransitioning && !this._isShown) {
                tl.supportsTransitionEnd() &&
                  eh(this._element).hasClass(ev) &&
                  (this._isTransitioning = !0);
                var i = eh.Event(eg.SHOW, { relatedTarget: t });
                eh(this._element).trigger(i),
                  this._isShown ||
                    i.isDefaultPrevented() ||
                    ((this._isShown = !0),
                    this._checkScrollbar(),
                    this._setScrollbar(),
                    this._adjustDialog(),
                    eh(document.body).addClass(em),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    eh(this._element).on(
                      eg.CLICK_DISMISS,
                      eb.DATA_DISMISS,
                      function (t) {
                        return e.hide(t);
                      }
                    ),
                    eh(this._dialog).on(eg.MOUSEDOWN_DISMISS, function () {
                      eh(e._element).one(eg.MOUSEUP_DISMISS, function (t) {
                        eh(t.target).is(e._element) &&
                          (e._ignoreBackdropClick = !0);
                      });
                    }),
                    this._showBackdrop(function () {
                      return e._showElement(t);
                    }));
              }
            }),
            (e.hide = function (t) {
              var e = this;
              if (
                (t && t.preventDefault(),
                !this._isTransitioning && this._isShown)
              ) {
                var i = eh.Event(eg.HIDE);
                if (
                  (eh(this._element).trigger(i),
                  this._isShown && !i.isDefaultPrevented())
                ) {
                  this._isShown = !1;
                  var s =
                    tl.supportsTransitionEnd() &&
                    eh(this._element).hasClass(ev);
                  s && (this._isTransitioning = !0),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    eh(document).off(eg.FOCUSIN),
                    eh(this._element).removeClass(e8),
                    eh(this._element).off(eg.CLICK_DISMISS),
                    eh(this._dialog).off(eg.MOUSEDOWN_DISMISS),
                    s
                      ? eh(this._element)
                          .one(tl.TRANSITION_END, function (t) {
                            return e._hideModal(t);
                          })
                          .emulateTransitionEnd(300)
                      : this._hideModal();
                }
              }
            }),
            (e.dispose = function () {
              eh.removeData(this._element, ec),
                eh(window, document, this._element, this._backdrop).off(eu),
                (this._config = null),
                (this._element = null),
                (this._dialog = null),
                (this._backdrop = null),
                (this._isShown = null),
                (this._isBodyOverflowing = null),
                (this._ignoreBackdropClick = null),
                (this._scrollbarWidth = null);
            }),
            (e.handleUpdate = function () {
              this._adjustDialog();
            }),
            (e._getConfig = function (t) {
              return (t = n({}, ep, t)), tl.typeCheckConfig("modal", t, ef), t;
            }),
            (e._showElement = function (t) {
              var e = this,
                i =
                  tl.supportsTransitionEnd() && eh(this._element).hasClass(ev);
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
                document.body.appendChild(this._element),
                (this._element.style.display = "block"),
                this._element.removeAttribute("aria-hidden"),
                (this._element.scrollTop = 0),
                i && tl.reflow(this._element),
                eh(this._element).addClass(e8),
                this._config.focus && this._enforceFocus();
              var s = eh.Event(eg.SHOWN, { relatedTarget: t }),
                n = function () {
                  e._config.focus && e._element.focus(),
                    (e._isTransitioning = !1),
                    eh(e._element).trigger(s);
                };
              i
                ? eh(this._dialog)
                    .one(tl.TRANSITION_END, n)
                    .emulateTransitionEnd(300)
                : n();
            }),
            (e._enforceFocus = function () {
              var t = this;
              eh(document)
                .off(eg.FOCUSIN)
                .on(eg.FOCUSIN, function (e) {
                  document !== e.target &&
                    t._element !== e.target &&
                    0 === eh(t._element).has(e.target).length &&
                    t._element.focus();
                });
            }),
            (e._setEscapeEvent = function () {
              var t = this;
              this._isShown && this._config.keyboard
                ? eh(this._element).on(eg.KEYDOWN_DISMISS, function (e) {
                    27 === e.which && (e.preventDefault(), t.hide());
                  })
                : this._isShown || eh(this._element).off(eg.KEYDOWN_DISMISS);
            }),
            (e._setResizeEvent = function () {
              var t = this;
              this._isShown
                ? eh(window).on(eg.RESIZE, function (e) {
                    return t.handleUpdate(e);
                  })
                : eh(window).off(eg.RESIZE);
            }),
            (e._hideModal = function () {
              var t = this;
              (this._element.style.display = "none"),
                this._element.setAttribute("aria-hidden", !0),
                (this._isTransitioning = !1),
                this._showBackdrop(function () {
                  eh(document.body).removeClass(em),
                    t._resetAdjustments(),
                    t._resetScrollbar(),
                    eh(t._element).trigger(eg.HIDDEN);
                });
            }),
            (e._removeBackdrop = function () {
              this._backdrop &&
                (eh(this._backdrop).remove(), (this._backdrop = null));
            }),
            (e._showBackdrop = function (t) {
              var e = this,
                i = eh(this._element).hasClass(ev) ? ev : "";
              if (this._isShown && this._config.backdrop) {
                var s = tl.supportsTransitionEnd() && i;
                if (
                  ((this._backdrop = document.createElement("div")),
                  (this._backdrop.className = "modal-backdrop"),
                  i && eh(this._backdrop).addClass(i),
                  eh(this._backdrop).appendTo(document.body),
                  eh(this._element).on(eg.CLICK_DISMISS, function (t) {
                    e._ignoreBackdropClick
                      ? (e._ignoreBackdropClick = !1)
                      : t.target === t.currentTarget &&
                        ("static" === e._config.backdrop
                          ? e._element.focus()
                          : e.hide());
                  }),
                  s && tl.reflow(this._backdrop),
                  eh(this._backdrop).addClass(e8),
                  !t)
                )
                  return;
                if (!s) return void t();
                eh(this._backdrop)
                  .one(tl.TRANSITION_END, t)
                  .emulateTransitionEnd(150);
              } else if (!this._isShown && this._backdrop) {
                eh(this._backdrop).removeClass(e8);
                var n = function () {
                  e._removeBackdrop(), t && t();
                };
                tl.supportsTransitionEnd() && eh(this._element).hasClass(ev)
                  ? eh(this._backdrop)
                      .one(tl.TRANSITION_END, n)
                      .emulateTransitionEnd(150)
                  : n();
              } else t && t();
            }),
            (e._adjustDialog = function () {
              var t =
                this._element.scrollHeight >
                document.documentElement.clientHeight;
              !this._isBodyOverflowing &&
                t &&
                (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
                this._isBodyOverflowing &&
                  !t &&
                  (this._element.style.paddingRight =
                    this._scrollbarWidth + "px");
            }),
            (e._resetAdjustments = function () {
              (this._element.style.paddingLeft = ""),
                (this._element.style.paddingRight = "");
            }),
            (e._checkScrollbar = function () {
              var t = document.body.getBoundingClientRect();
              (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
                (this._scrollbarWidth = this._getScrollbarWidth());
            }),
            (e._setScrollbar = function () {
              var t = this;
              if (this._isBodyOverflowing) {
                eh(eb.FIXED_CONTENT).each(function (e, i) {
                  var s = eh(i)[0].style.paddingRight,
                    n = eh(i).css("padding-right");
                  eh(i)
                    .data("padding-right", s)
                    .css(
                      "padding-right",
                      parseFloat(n) + t._scrollbarWidth + "px"
                    );
                }),
                  eh(eb.STICKY_CONTENT).each(function (e, i) {
                    var s = eh(i)[0].style.marginRight,
                      n = eh(i).css("margin-right");
                    eh(i)
                      .data("margin-right", s)
                      .css(
                        "margin-right",
                        parseFloat(n) - t._scrollbarWidth + "px"
                      );
                  }),
                  eh(eb.NAVBAR_TOGGLER).each(function (e, i) {
                    var s = eh(i)[0].style.marginRight,
                      n = eh(i).css("margin-right");
                    eh(i)
                      .data("margin-right", s)
                      .css(
                        "margin-right",
                        parseFloat(n) + t._scrollbarWidth + "px"
                      );
                  });
                var e = document.body.style.paddingRight,
                  i = eh("body").css("padding-right");
                eh("body")
                  .data("padding-right", e)
                  .css(
                    "padding-right",
                    parseFloat(i) + this._scrollbarWidth + "px"
                  );
              }
            }),
            (e._resetScrollbar = function () {
              eh(eb.FIXED_CONTENT).each(function (t, e) {
                var i = eh(e).data("padding-right");
                void 0 !== i &&
                  eh(e).css("padding-right", i).removeData("padding-right");
              }),
                eh(eb.STICKY_CONTENT + ", " + eb.NAVBAR_TOGGLER).each(function (
                  t,
                  e
                ) {
                  var i = eh(e).data("margin-right");
                  void 0 !== i &&
                    eh(e).css("margin-right", i).removeData("margin-right");
                });
              var t = eh("body").data("padding-right");
              void 0 !== t &&
                eh("body").css("padding-right", t).removeData("padding-right");
            }),
            (e._getScrollbarWidth = function () {
              var t = document.createElement("div");
              (t.className = "modal-scrollbar-measure"),
                document.body.appendChild(t);
              var e = t.getBoundingClientRect().width - t.clientWidth;
              return document.body.removeChild(t), e;
            }),
            (t._jQueryInterface = function (e, i) {
              return this.each(function () {
                var s = eh(this).data(ec),
                  o = n(
                    {},
                    t.Default,
                    eh(this).data(),
                    "object" == typeof e && e
                  );
                if (
                  (s || ((s = new t(this, o)), eh(this).data(ec, s)),
                  "string" == typeof e)
                ) {
                  if (void 0 === s[e])
                    throw TypeError('No method named "' + e + '"');
                  s[e](i);
                } else o.show && s.show(i);
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return ep;
                },
              },
            ]),
            t
          );
        })()),
        eh(document).on(eg.CLICK_DATA_API, eb.DATA_TOGGLE, function (t) {
          var e,
            i = this,
            s = tl.getSelectorFromElement(this);
          s && (e = eh(s)[0]);
          var o = eh(e).data(ec)
            ? "toggle"
            : n({}, eh(e).data(), eh(this).data());
          ("A" !== this.tagName && "AREA" !== this.tagName) ||
            t.preventDefault();
          var r = eh(e).one(eg.SHOW, function (t) {
            t.isDefaultPrevented() ||
              r.one(eg.HIDDEN, function () {
                eh(i).is(":visible") && i.focus();
              });
          });
          e$._jQueryInterface.call(eh(e), o, this);
        }),
        (eh.fn.modal = e$._jQueryInterface),
        (eh.fn.modal.Constructor = e$),
        (eh.fn.modal.noConflict = function () {
          return (eh.fn.modal = ed), e$._jQueryInterface;
        }),
        e$),
      ih =
        ((ey = e),
        (ew = "tooltip"),
        (ek = "." + (e_ = "bs.tooltip")),
        (eC = ey.fn[ew]),
        (ex = RegExp("(^|\\s)bs-tooltip\\S+", "g")),
        (eT = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(number|string)",
          container: "(string|element|boolean)",
          fallbackPlacement: "(string|array)",
          boundary: "(string|element)",
        }),
        (eS = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: "right",
          BOTTOM: "bottom",
          LEFT: "left",
        }),
        (eD = {
          animation: !0,
          template:
            '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: "hover focus",
          title: "",
          delay: 0,
          html: !1,
          selector: !1,
          placement: "top",
          offset: 0,
          container: !1,
          fallbackPlacement: "flip",
          boundary: "scrollParent",
        }),
        (eE = "show"),
        (eI = {
          HIDE: "hide" + ek,
          HIDDEN: "hidden" + ek,
          SHOW: "show" + ek,
          SHOWN: "shown" + ek,
          INSERTED: "inserted" + ek,
          CLICK: "click" + ek,
          FOCUSIN: "focusin" + ek,
          FOCUSOUT: "focusout" + ek,
          MOUSEENTER: "mouseenter" + ek,
          MOUSELEAVE: "mouseleave" + ek,
        }),
        (eA = "fade"),
        (eP = "show"),
        (eO = "hover"),
        (eN = "focus"),
        (eH = (function () {
          function t(t, e) {
            if (void 0 === ir)
              throw TypeError(
                "Bootstrap tooltips require Popper.js (https://popper.js.org)"
              );
            (this._isEnabled = !0),
              (this._timeout = 0),
              (this._hoverState = ""),
              (this._activeTrigger = {}),
              (this._popper = null),
              (this.element = t),
              (this.config = this._getConfig(e)),
              (this.tip = null),
              this._setListeners();
          }
          var e = t.prototype;
          return (
            (e.enable = function () {
              this._isEnabled = !0;
            }),
            (e.disable = function () {
              this._isEnabled = !1;
            }),
            (e.toggleEnabled = function () {
              this._isEnabled = !this._isEnabled;
            }),
            (e.toggle = function (t) {
              if (this._isEnabled) {
                if (t) {
                  var e = this.constructor.DATA_KEY,
                    i = ey(t.currentTarget).data(e);
                  i ||
                    ((i = new this.constructor(
                      t.currentTarget,
                      this._getDelegateConfig()
                    )),
                    ey(t.currentTarget).data(e, i)),
                    (i._activeTrigger.click = !i._activeTrigger.click),
                    i._isWithActiveTrigger()
                      ? i._enter(null, i)
                      : i._leave(null, i);
                } else {
                  if (ey(this.getTipElement()).hasClass(eP))
                    return void this._leave(null, this);
                  this._enter(null, this);
                }
              }
            }),
            (e.dispose = function () {
              clearTimeout(this._timeout),
                ey.removeData(this.element, this.constructor.DATA_KEY),
                ey(this.element).off(this.constructor.EVENT_KEY),
                ey(this.element).closest(".modal").off("hide.bs.modal"),
                this.tip && ey(this.tip).remove(),
                (this._isEnabled = null),
                (this._timeout = null),
                (this._hoverState = null),
                (this._activeTrigger = null),
                null !== this._popper && this._popper.destroy(),
                (this._popper = null),
                (this.element = null),
                (this.config = null),
                (this.tip = null);
            }),
            (e.show = function () {
              var e = this;
              if ("none" === ey(this.element).css("display"))
                throw Error("Please use show on visible elements");
              var i = ey.Event(this.constructor.Event.SHOW);
              if (this.isWithContent() && this._isEnabled) {
                ey(this.element).trigger(i);
                var s = ey.contains(
                  this.element.ownerDocument.documentElement,
                  this.element
                );
                if (i.isDefaultPrevented() || !s) return;
                var n = this.getTipElement(),
                  o = tl.getUID(this.constructor.NAME);
                n.setAttribute("id", o),
                  this.element.setAttribute("aria-describedby", o),
                  this.setContent(),
                  this.config.animation && ey(n).addClass(eA);
                var r =
                    "function" == typeof this.config.placement
                      ? this.config.placement.call(this, n, this.element)
                      : this.config.placement,
                  a = this._getAttachment(r);
                this.addAttachmentClass(a);
                var l =
                  !1 === this.config.container
                    ? document.body
                    : ey(this.config.container);
                ey(n).data(this.constructor.DATA_KEY, this),
                  ey.contains(
                    this.element.ownerDocument.documentElement,
                    this.tip
                  ) || ey(n).appendTo(l),
                  ey(this.element).trigger(this.constructor.Event.INSERTED),
                  (this._popper = new ir(this.element, n, {
                    placement: a,
                    modifiers: {
                      offset: { offset: this.config.offset },
                      flip: { behavior: this.config.fallbackPlacement },
                      arrow: { element: ".arrow" },
                      preventOverflow: {
                        boundariesElement: this.config.boundary,
                      },
                    },
                    onCreate: function (t) {
                      t.originalPlacement !== t.placement &&
                        e._handlePopperPlacementChange(t);
                    },
                    onUpdate: function (t) {
                      e._handlePopperPlacementChange(t);
                    },
                  })),
                  ey(n).addClass(eP),
                  "ontouchstart" in document.documentElement &&
                    ey("body").children().on("mouseover", null, ey.noop);
                var h = function () {
                  e.config.animation && e._fixTransition();
                  var t = e._hoverState;
                  (e._hoverState = null),
                    ey(e.element).trigger(e.constructor.Event.SHOWN),
                    "out" === t && e._leave(null, e);
                };
                tl.supportsTransitionEnd() && ey(this.tip).hasClass(eA)
                  ? ey(this.tip)
                      .one(tl.TRANSITION_END, h)
                      .emulateTransitionEnd(t._TRANSITION_DURATION)
                  : h();
              }
            }),
            (e.hide = function (t) {
              var e = this,
                i = this.getTipElement(),
                s = ey.Event(this.constructor.Event.HIDE),
                n = function () {
                  e._hoverState !== eE &&
                    i.parentNode &&
                    i.parentNode.removeChild(i),
                    e._cleanTipClass(),
                    e.element.removeAttribute("aria-describedby"),
                    ey(e.element).trigger(e.constructor.Event.HIDDEN),
                    null !== e._popper && e._popper.destroy(),
                    t && t();
                };
              ey(this.element).trigger(s),
                s.isDefaultPrevented() ||
                  (ey(i).removeClass(eP),
                  "ontouchstart" in document.documentElement &&
                    ey("body").children().off("mouseover", null, ey.noop),
                  (this._activeTrigger.click = !1),
                  (this._activeTrigger[eN] = !1),
                  (this._activeTrigger[eO] = !1),
                  tl.supportsTransitionEnd() && ey(this.tip).hasClass(eA)
                    ? ey(i).one(tl.TRANSITION_END, n).emulateTransitionEnd(150)
                    : n(),
                  (this._hoverState = ""));
            }),
            (e.update = function () {
              null !== this._popper && this._popper.scheduleUpdate();
            }),
            (e.isWithContent = function () {
              return Boolean(this.getTitle());
            }),
            (e.addAttachmentClass = function (t) {
              ey(this.getTipElement()).addClass("bs-tooltip-" + t);
            }),
            (e.getTipElement = function () {
              return (
                (this.tip = this.tip || ey(this.config.template)[0]), this.tip
              );
            }),
            (e.setContent = function () {
              var t = ey(this.getTipElement());
              this.setElementContent(t.find(".tooltip-inner"), this.getTitle()),
                t.removeClass(eA + " " + eP);
            }),
            (e.setElementContent = function (t, e) {
              var i = this.config.html;
              "object" == typeof e && (e.nodeType || e.jquery)
                ? i
                  ? ey(e).parent().is(t) || t.empty().append(e)
                  : t.text(ey(e).text())
                : t[i ? "html" : "text"](e);
            }),
            (e.getTitle = function () {
              var t = this.element.getAttribute("data-original-title");
              return (
                t ||
                  (t =
                    "function" == typeof this.config.title
                      ? this.config.title.call(this.element)
                      : this.config.title),
                t
              );
            }),
            (e._getAttachment = function (t) {
              return eS[t.toUpperCase()];
            }),
            (e._setListeners = function () {
              var t = this;
              this.config.trigger.split(" ").forEach(function (e) {
                if ("click" === e)
                  ey(t.element).on(
                    t.constructor.Event.CLICK,
                    t.config.selector,
                    function (e) {
                      return t.toggle(e);
                    }
                  );
                else if ("manual" !== e) {
                  var i =
                      e === eO
                        ? t.constructor.Event.MOUSEENTER
                        : t.constructor.Event.FOCUSIN,
                    s =
                      e === eO
                        ? t.constructor.Event.MOUSELEAVE
                        : t.constructor.Event.FOCUSOUT;
                  ey(t.element)
                    .on(i, t.config.selector, function (e) {
                      return t._enter(e);
                    })
                    .on(s, t.config.selector, function (e) {
                      return t._leave(e);
                    });
                }
                ey(t.element)
                  .closest(".modal")
                  .on("hide.bs.modal", function () {
                    return t.hide();
                  });
              }),
                this.config.selector
                  ? (this.config = n({}, this.config, {
                      trigger: "manual",
                      selector: "",
                    }))
                  : this._fixTitle();
            }),
            (e._fixTitle = function () {
              var t = typeof this.element.getAttribute("data-original-title");
              (this.element.getAttribute("title") || "string" !== t) &&
                (this.element.setAttribute(
                  "data-original-title",
                  this.element.getAttribute("title") || ""
                ),
                this.element.setAttribute("title", ""));
            }),
            (e._enter = function (t, e) {
              var i = this.constructor.DATA_KEY;
              (e = e || ey(t.currentTarget).data(i)) ||
                ((e = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                ey(t.currentTarget).data(i, e)),
                t && (e._activeTrigger["focusin" === t.type ? eN : eO] = !0),
                ey(e.getTipElement()).hasClass(eP) || e._hoverState === eE
                  ? (e._hoverState = eE)
                  : (clearTimeout(e._timeout),
                    (e._hoverState = eE),
                    e.config.delay && e.config.delay.show
                      ? (e._timeout = setTimeout(function () {
                          e._hoverState === eE && e.show();
                        }, e.config.delay.show))
                      : e.show());
            }),
            (e._leave = function (t, e) {
              var i = this.constructor.DATA_KEY;
              (e = e || ey(t.currentTarget).data(i)) ||
                ((e = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                ey(t.currentTarget).data(i, e)),
                t && (e._activeTrigger["focusout" === t.type ? eN : eO] = !1),
                e._isWithActiveTrigger() ||
                  (clearTimeout(e._timeout),
                  (e._hoverState = "out"),
                  e.config.delay && e.config.delay.hide
                    ? (e._timeout = setTimeout(function () {
                        "out" === e._hoverState && e.hide();
                      }, e.config.delay.hide))
                    : e.hide());
            }),
            (e._isWithActiveTrigger = function () {
              for (var t in this._activeTrigger)
                if (this._activeTrigger[t]) return !0;
              return !1;
            }),
            (e._getConfig = function (t) {
              return (
                "number" ==
                  typeof (t = n(
                    {},
                    this.constructor.Default,
                    ey(this.element).data(),
                    t
                  )).delay && (t.delay = { show: t.delay, hide: t.delay }),
                "number" == typeof t.title && (t.title = t.title.toString()),
                "number" == typeof t.content &&
                  (t.content = t.content.toString()),
                tl.typeCheckConfig(ew, t, this.constructor.DefaultType),
                t
              );
            }),
            (e._getDelegateConfig = function () {
              var t = {};
              if (this.config)
                for (var e in this.config)
                  this.constructor.Default[e] !== this.config[e] &&
                    (t[e] = this.config[e]);
              return t;
            }),
            (e._cleanTipClass = function () {
              var t = ey(this.getTipElement()),
                e = t.attr("class").match(ex);
              null !== e && e.length > 0 && t.removeClass(e.join(""));
            }),
            (e._handlePopperPlacementChange = function (t) {
              this._cleanTipClass(),
                this.addAttachmentClass(this._getAttachment(t.placement));
            }),
            (e._fixTransition = function () {
              var t = this.getTipElement(),
                e = this.config.animation;
              null === t.getAttribute("x-placement") &&
                (ey(t).removeClass(eA),
                (this.config.animation = !1),
                this.hide(),
                this.show(),
                (this.config.animation = e));
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var i = ey(this).data(e_);
                if (
                  (i || !/dispose|hide/.test(e)) &&
                  (i ||
                    ((i = new t(this, "object" == typeof e && e)),
                    ey(this).data(e_, i)),
                  "string" == typeof e)
                ) {
                  if (void 0 === i[e])
                    throw TypeError('No method named "' + e + '"');
                  i[e]();
                }
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return eD;
                },
              },
              {
                key: "NAME",
                get: function () {
                  return ew;
                },
              },
              {
                key: "DATA_KEY",
                get: function () {
                  return e_;
                },
              },
              {
                key: "Event",
                get: function () {
                  return eI;
                },
              },
              {
                key: "EVENT_KEY",
                get: function () {
                  return ek;
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return eT;
                },
              },
            ]),
            t
          );
        })()),
        (ey.fn[ew] = eH._jQueryInterface),
        (ey.fn[ew].Constructor = eH),
        (ey.fn[ew].noConflict = function () {
          return (ey.fn[ew] = eC), eH._jQueryInterface;
        }),
        eH),
      ic =
        ((ez = e),
        (eM = "popover"),
        (eW = "." + (eL = "bs.popover")),
        (e9 = ez.fn[eM]),
        (eR = RegExp("(^|\\s)bs-popover\\S+", "g")),
        (e0 = n({}, ih.Default, {
          placement: "right",
          trigger: "click",
          content: "",
          template:
            '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        })),
        (ej = n({}, ih.DefaultType, { content: "(string|element|function)" })),
        (eF = {
          HIDE: "hide" + eW,
          HIDDEN: "hidden" + eW,
          SHOW: "show" + eW,
          SHOWN: "shown" + eW,
          INSERTED: "inserted" + eW,
          CLICK: "click" + eW,
          FOCUSIN: "focusin" + eW,
          FOCUSOUT: "focusout" + eW,
          MOUSEENTER: "mouseenter" + eW,
          MOUSELEAVE: "mouseleave" + eW,
        }),
        (eB = (function (t) {
          function e() {
            return t.apply(this, arguments) || this;
          }
          (n = t),
            ((i = e).prototype = Object.create(n.prototype)),
            (i.prototype.constructor = i),
            (i.__proto__ = n);
          var i,
            n,
            o = e.prototype;
          return (
            (o.isWithContent = function () {
              return this.getTitle() || this._getContent();
            }),
            (o.addAttachmentClass = function (t) {
              ez(this.getTipElement()).addClass("bs-popover-" + t);
            }),
            (o.getTipElement = function () {
              return (
                (this.tip = this.tip || ez(this.config.template)[0]), this.tip
              );
            }),
            (o.setContent = function () {
              var t = ez(this.getTipElement());
              this.setElementContent(
                t.find(".popover-header"),
                this.getTitle()
              );
              var e = this._getContent();
              "function" == typeof e && (e = e.call(this.element)),
                this.setElementContent(t.find(".popover-body"), e),
                t.removeClass("fade show");
            }),
            (o._getContent = function () {
              return (
                this.element.getAttribute("data-content") || this.config.content
              );
            }),
            (o._cleanTipClass = function () {
              var t = ez(this.getTipElement()),
                e = t.attr("class").match(eR);
              null !== e && e.length > 0 && t.removeClass(e.join(""));
            }),
            (e._jQueryInterface = function (t) {
              return this.each(function () {
                var i = ez(this).data(eL);
                if (
                  (i || !/destroy|hide/.test(t)) &&
                  (i ||
                    ((i = new e(this, "object" == typeof t ? t : null)),
                    ez(this).data(eL, i)),
                  "string" == typeof t)
                ) {
                  if (void 0 === i[t])
                    throw TypeError('No method named "' + t + '"');
                  i[t]();
                }
              });
            }),
            s(e, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return e0;
                },
              },
              {
                key: "NAME",
                get: function () {
                  return eM;
                },
              },
              {
                key: "DATA_KEY",
                get: function () {
                  return eL;
                },
              },
              {
                key: "Event",
                get: function () {
                  return eF;
                },
              },
              {
                key: "EVENT_KEY",
                get: function () {
                  return eW;
                },
              },
              {
                key: "DefaultType",
                get: function () {
                  return ej;
                },
              },
            ]),
            e
          );
        })(ih)),
        (ez.fn[eM] = eB._jQueryInterface),
        (ez.fn[eM].Constructor = eB),
        (ez.fn[eM].noConflict = function () {
          return (ez.fn[eM] = e9), eB._jQueryInterface;
        }),
        eB),
      iu =
        ((eY = e),
        (eU = "scrollspy"),
        (e1 = "." + (eq = "bs.scrollspy")),
        (eK = eY.fn[eU]),
        (e3 = { offset: 10, method: "auto", target: "" }),
        (eV = {
          offset: "number",
          method: "string",
          target: "(string|element)",
        }),
        (e2 = {
          ACTIVATE: "activate" + e1,
          SCROLL: "scroll" + e1,
          LOAD_DATA_API: "load" + e1 + ".data-api",
        }),
        (eX = "active"),
        (eG = {
          DATA_SPY: '[data-spy="scroll"]',
          ACTIVE: ".active",
          NAV_LIST_GROUP: ".nav, .list-group",
          NAV_LINKS: ".nav-link",
          NAV_ITEMS: ".nav-item",
          LIST_ITEMS: ".list-group-item",
          DROPDOWN: ".dropdown",
          DROPDOWN_ITEMS: ".dropdown-item",
          DROPDOWN_TOGGLE: ".dropdown-toggle",
        }),
        (e7 = "position"),
        (e4 = (function () {
          function t(t, e) {
            var i = this;
            (this._element = t),
              (this._scrollElement = "BODY" === t.tagName ? window : t),
              (this._config = this._getConfig(e)),
              (this._selector =
                this._config.target +
                " " +
                eG.NAV_LINKS +
                "," +
                this._config.target +
                " " +
                eG.LIST_ITEMS +
                "," +
                this._config.target +
                " " +
                eG.DROPDOWN_ITEMS),
              (this._offsets = []),
              (this._targets = []),
              (this._activeTarget = null),
              (this._scrollHeight = 0),
              eY(this._scrollElement).on(e2.SCROLL, function (t) {
                return i._process(t);
              }),
              this.refresh(),
              this._process();
          }
          var e = t.prototype;
          return (
            (e.refresh = function () {
              var t = this,
                e =
                  this._scrollElement === this._scrollElement.window
                    ? "offset"
                    : e7,
                i = "auto" === this._config.method ? e : this._config.method,
                s = i === e7 ? this._getScrollTop() : 0;
              (this._offsets = []),
                (this._targets = []),
                (this._scrollHeight = this._getScrollHeight()),
                eY
                  .makeArray(eY(this._selector))
                  .map(function (t) {
                    var e,
                      n = tl.getSelectorFromElement(t);
                    if ((n && (e = eY(n)[0]), e)) {
                      var o = e.getBoundingClientRect();
                      if (o.width || o.height) return [eY(e)[i]().top + s, n];
                    }
                    return null;
                  })
                  .filter(function (t) {
                    return t;
                  })
                  .sort(function (t, e) {
                    return t[0] - e[0];
                  })
                  .forEach(function (e) {
                    t._offsets.push(e[0]), t._targets.push(e[1]);
                  });
            }),
            (e.dispose = function () {
              eY.removeData(this._element, eq),
                eY(this._scrollElement).off(e1),
                (this._element = null),
                (this._scrollElement = null),
                (this._config = null),
                (this._selector = null),
                (this._offsets = null),
                (this._targets = null),
                (this._activeTarget = null),
                (this._scrollHeight = null);
            }),
            (e._getConfig = function (t) {
              if ("string" != typeof (t = n({}, e3, t)).target) {
                var e = eY(t.target).attr("id");
                e || ((e = tl.getUID(eU)), eY(t.target).attr("id", e)),
                  (t.target = "#" + e);
              }
              return tl.typeCheckConfig(eU, t, eV), t;
            }),
            (e._getScrollTop = function () {
              return this._scrollElement === window
                ? this._scrollElement.pageYOffset
                : this._scrollElement.scrollTop;
            }),
            (e._getScrollHeight = function () {
              return (
                this._scrollElement.scrollHeight ||
                Math.max(
                  document.body.scrollHeight,
                  document.documentElement.scrollHeight
                )
              );
            }),
            (e._getOffsetHeight = function () {
              return this._scrollElement === window
                ? window.innerHeight
                : this._scrollElement.getBoundingClientRect().height;
            }),
            (e._process = function () {
              var t = this._getScrollTop() + this._config.offset,
                e = this._getScrollHeight(),
                i = this._config.offset + e - this._getOffsetHeight();
              if ((this._scrollHeight !== e && this.refresh(), t >= i)) {
                var s = this._targets[this._targets.length - 1];
                this._activeTarget !== s && this._activate(s);
              } else {
                if (
                  this._activeTarget &&
                  t < this._offsets[0] &&
                  this._offsets[0] > 0
                )
                  return (this._activeTarget = null), void this._clear();
                for (var n = this._offsets.length; n--; )
                  this._activeTarget !== this._targets[n] &&
                    t >= this._offsets[n] &&
                    (void 0 === this._offsets[n + 1] ||
                      t < this._offsets[n + 1]) &&
                    this._activate(this._targets[n]);
              }
            }),
            (e._activate = function (t) {
              (this._activeTarget = t), this._clear();
              var e = this._selector.split(","),
                i = eY(
                  (e = e.map(function (e) {
                    return (
                      e +
                      '[data-target="' +
                      t +
                      '"],' +
                      e +
                      '[href="' +
                      t +
                      '"]'
                    );
                  })).join(",")
                );
              i.hasClass("dropdown-item")
                ? (i.closest(eG.DROPDOWN).find(eG.DROPDOWN_TOGGLE).addClass(eX),
                  i.addClass(eX))
                : (i.addClass(eX),
                  i
                    .parents(eG.NAV_LIST_GROUP)
                    .prev(eG.NAV_LINKS + ", " + eG.LIST_ITEMS)
                    .addClass(eX),
                  i
                    .parents(eG.NAV_LIST_GROUP)
                    .prev(eG.NAV_ITEMS)
                    .children(eG.NAV_LINKS)
                    .addClass(eX)),
                eY(this._scrollElement).trigger(e2.ACTIVATE, {
                  relatedTarget: t,
                });
            }),
            (e._clear = function () {
              eY(this._selector).filter(eG.ACTIVE).removeClass(eX);
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var i = eY(this).data(eq);
                if (
                  (i ||
                    ((i = new t(this, "object" == typeof e && e)),
                    eY(this).data(eq, i)),
                  "string" == typeof e)
                ) {
                  if (void 0 === i[e])
                    throw TypeError('No method named "' + e + '"');
                  i[e]();
                }
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
              {
                key: "Default",
                get: function () {
                  return e3;
                },
              },
            ]),
            t
          );
        })()),
        eY(window).on(e2.LOAD_DATA_API, function () {
          for (var t = eY.makeArray(eY(eG.DATA_SPY)), e = t.length; e--; ) {
            var i = eY(t[e]);
            e4._jQueryInterface.call(i, i.data());
          }
        }),
        (eY.fn[eU] = e4._jQueryInterface),
        (eY.fn[eU].Constructor = e4),
        (eY.fn[eU].noConflict = function () {
          return (eY.fn[eU] = eK), e4._jQueryInterface;
        }),
        e4),
      id =
        ((e5 = e),
        (e6 = ".bs.tab"),
        (eQ = e5.fn.tab),
        (eZ = {
          HIDE: "hide" + e6,
          HIDDEN: "hidden" + e6,
          SHOW: "show" + e6,
          SHOWN: "shown" + e6,
          CLICK_DATA_API: "click.bs.tab.data-api",
        }),
        (eJ = "active"),
        (it = "show"),
        (ie = ".active"),
        (ii = "> li > .active"),
        (is = (function () {
          function t(t) {
            this._element = t;
          }
          var e = t.prototype;
          return (
            (e.show = function () {
              var t = this;
              if (
                !(
                  (this._element.parentNode &&
                    this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                    e5(this._element).hasClass(eJ)) ||
                  e5(this._element).hasClass("disabled")
                )
              ) {
                var e,
                  i,
                  s = e5(this._element).closest(".nav, .list-group")[0],
                  n = tl.getSelectorFromElement(this._element);
                if (s) {
                  var o = "UL" === s.nodeName ? ii : ie;
                  i = (i = e5.makeArray(e5(s).find(o)))[i.length - 1];
                }
                var r = e5.Event(eZ.HIDE, { relatedTarget: this._element }),
                  a = e5.Event(eZ.SHOW, { relatedTarget: i });
                if (
                  (i && e5(i).trigger(r),
                  e5(this._element).trigger(a),
                  !a.isDefaultPrevented() && !r.isDefaultPrevented())
                ) {
                  n && (e = e5(n)[0]), this._activate(this._element, s);
                  var l = function () {
                    var e = e5.Event(eZ.HIDDEN, { relatedTarget: t._element }),
                      s = e5.Event(eZ.SHOWN, { relatedTarget: i });
                    e5(i).trigger(e), e5(t._element).trigger(s);
                  };
                  e ? this._activate(e, e.parentNode, l) : l();
                }
              }
            }),
            (e.dispose = function () {
              e5.removeData(this._element, "bs.tab"), (this._element = null);
            }),
            (e._activate = function (t, e, i) {
              var s = this,
                n = (
                  "UL" === e.nodeName ? e5(e).find(ii) : e5(e).children(ie)
                )[0],
                o =
                  i &&
                  tl.supportsTransitionEnd() &&
                  n &&
                  e5(n).hasClass("fade"),
                r = function () {
                  return s._transitionComplete(t, n, i);
                };
              n && o
                ? e5(n).one(tl.TRANSITION_END, r).emulateTransitionEnd(150)
                : r();
            }),
            (e._transitionComplete = function (t, e, i) {
              if (e) {
                e5(e).removeClass(it + " " + eJ);
                var s = e5(e.parentNode).find("> .dropdown-menu .active")[0];
                s && e5(s).removeClass(eJ),
                  "tab" === e.getAttribute("role") &&
                    e.setAttribute("aria-selected", !1);
              }
              if (
                (e5(t).addClass(eJ),
                "tab" === t.getAttribute("role") &&
                  t.setAttribute("aria-selected", !0),
                tl.reflow(t),
                e5(t).addClass(it),
                t.parentNode && e5(t.parentNode).hasClass("dropdown-menu"))
              ) {
                var n = e5(t).closest(".dropdown")[0];
                n && e5(n).find(".dropdown-toggle").addClass(eJ),
                  t.setAttribute("aria-expanded", !0);
              }
              i && i();
            }),
            (t._jQueryInterface = function (e) {
              return this.each(function () {
                var i = e5(this),
                  s = i.data("bs.tab");
                if (
                  (s || ((s = new t(this)), i.data("bs.tab", s)),
                  "string" == typeof e)
                ) {
                  if (void 0 === s[e])
                    throw TypeError('No method named "' + e + '"');
                  s[e]();
                }
              });
            }),
            s(t, null, [
              {
                key: "VERSION",
                get: function () {
                  return "4.0.0";
                },
              },
            ]),
            t
          );
        })()),
        e5(document).on(
          eZ.CLICK_DATA_API,
          '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
          function (t) {
            t.preventDefault(), is._jQueryInterface.call(e5(this), "show");
          }
        ),
        (e5.fn.tab = is._jQueryInterface),
        (e5.fn.tab.Constructor = is),
        (e5.fn.tab.noConflict = function () {
          return (e5.fn.tab = eQ), is._jQueryInterface;
        }),
        is);
    (function (t) {
      if (void 0 === t)
        throw TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var e = t.fn.jquery.split(" ")[0].split(".");
      if (
        (e[0] < 2 && e[1] < 9) ||
        (1 === e[0] && 9 === e[1] && e[2] < 1) ||
        e[0] >= 4
      )
        throw Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    })(e),
      (t.Util = tl),
      (t.Alert = th),
      (t.Button = tc),
      (t.Carousel = tu),
      (t.Collapse = td),
      (t.Dropdown = ia),
      (t.Modal = il),
      (t.Popover = ic),
      (t.Scrollspy = iu),
      (t.Tab = id),
      (t.Tooltip = ih),
      Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : t(jQuery);
  })(function (t) {
    function e() {
      (this._curInst = null),
        (this._keyEvent = !1),
        (this._disabledInputs = []),
        (this._datepickerShowing = !1),
        (this._inDialog = !1),
        (this._mainDivId = "ui-datepicker-div"),
        (this._inlineClass = "ui-datepicker-inline"),
        (this._appendClass = "ui-datepicker-append"),
        (this._triggerClass = "ui-datepicker-trigger"),
        (this._dialogClass = "ui-datepicker-dialog"),
        (this._disableClass = "ui-datepicker-disabled"),
        (this._unselectableClass = "ui-datepicker-unselectable"),
        (this._currentClass = "ui-datepicker-current-day"),
        (this._dayOverClass = "ui-datepicker-days-cell-over"),
        (this.regional = []),
        (this.regional[""] = {
          closeText: "Done",
          prevText: "Prev",
          nextText: "Next",
          currentText: "Today",
          monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          monthNamesShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          dayNames: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          weekHeader: "Wk",
          dateFormat: "mm/dd/yy",
          firstDay: 0,
          isRTL: !1,
          showMonthAfterYear: !1,
          yearSuffix: "",
        }),
        (this._defaults = {
          showOn: "focus",
          showAnim: "fadeIn",
          showOptions: {},
          defaultDate: null,
          appendText: "",
          buttonText: "...",
          buttonImage: "",
          buttonImageOnly: !1,
          hideIfNoPrevNext: !1,
          navigationAsDateFormat: !1,
          gotoCurrent: !1,
          changeMonth: !1,
          changeYear: !1,
          yearRange: "c-10:c+10",
          showOtherMonths: !1,
          selectOtherMonths: !1,
          showWeek: !1,
          calculateWeek: this.iso8601Week,
          shortYearCutoff: "+10",
          minDate: null,
          maxDate: null,
          duration: "fast",
          beforeShowDay: null,
          beforeShow: null,
          onSelect: null,
          onChangeMonthYear: null,
          onClose: null,
          numberOfMonths: 1,
          showCurrentAtPos: 0,
          stepMonths: 1,
          stepBigMonths: 12,
          altField: "",
          altFormat: "",
          constrainInput: !0,
          showButtonPanel: !1,
          autoSize: !1,
          disabled: !1,
        }),
        t.extend(this._defaults, this.regional[""]),
        (this.regional.en = t.extend(!0, {}, this.regional[""])),
        (this.regional["en-US"] = t.extend(!0, {}, this.regional.en)),
        (this.dpDiv = i(
          t(
            "<div id='" +
              this._mainDivId +
              "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
          )
        ));
    }
    function i(e) {
      var i =
        "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
      return e
        .on("mouseout", i, function () {
          t(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") &&
              t(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") &&
              t(this).removeClass("ui-datepicker-next-hover");
        })
        .on("mouseover", i, s);
    }
    function s() {
      t.datepicker._isDisabledDatepicker(
        r.inline ? r.dpDiv.parent()[0] : r.input[0]
      ) ||
        (t(this)
          .parents(".ui-datepicker-calendar")
          .find("a")
          .removeClass("ui-state-hover"),
        t(this).addClass("ui-state-hover"),
        -1 !== this.className.indexOf("ui-datepicker-prev") &&
          t(this).addClass("ui-datepicker-prev-hover"),
        -1 !== this.className.indexOf("ui-datepicker-next") &&
          t(this).addClass("ui-datepicker-next-hover"));
    }
    function n(e, i) {
      for (var s in (t.extend(e, i), i)) null == i[s] && (e[s] = i[s]);
      return e;
    }
    function o(t) {
      return function () {
        var e = this.element.val();
        t.apply(this, arguments),
          this._refresh(),
          e !== this.element.val() && this._trigger("change");
      };
    }
    (t.ui = t.ui || {}), (t.ui.version = "1.12.1");
    var r,
      a,
      l,
      h,
      c,
      u,
      d = 0,
      p = Array.prototype.slice;
    (t.cleanData =
      ((l = t.cleanData),
      function (e) {
        var i, s, n;
        for (n = 0; null != (s = e[n]); n++)
          try {
            (i = t._data(s, "events")) &&
              i.remove &&
              t(s).triggerHandler("remove");
          } catch (o) {}
        l(e);
      })),
      (t.widget = function (e, i, s) {
        var n,
          o,
          r,
          a = {},
          l = e.split(".")[0],
          h = l + "-" + (e = e.split(".")[1]);
        return (
          s || ((s = i), (i = t.Widget)),
          t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))),
          (t.expr[":"][h.toLowerCase()] = function (e) {
            return !!t.data(e, h);
          }),
          (t[l] = t[l] || {}),
          (n = t[l][e]),
          (o = t[l][e] =
            function (t, e) {
              return this._createWidget
                ? void (arguments.length && this._createWidget(t, e))
                : new o(t, e);
            }),
          t.extend(o, n, {
            version: s.version,
            _proto: t.extend({}, s),
            _childConstructors: [],
          }),
          ((r = new i()).options = t.widget.extend({}, r.options)),
          t.each(s, function (e, s) {
            return t.isFunction(s)
              ? void (a[e] = (function () {
                  function t() {
                    return i.prototype[e].apply(this, arguments);
                  }
                  function n(t) {
                    return i.prototype[e].apply(this, t);
                  }
                  return function () {
                    var e,
                      i = this._super,
                      o = this._superApply;
                    return (
                      (this._super = t),
                      (this._superApply = n),
                      (e = s.apply(this, arguments)),
                      (this._super = i),
                      (this._superApply = o),
                      e
                    );
                  };
                })())
              : void (a[e] = s);
          }),
          (o.prototype = t.widget.extend(
            r,
            { widgetEventPrefix: (n && r.widgetEventPrefix) || e },
            a,
            { constructor: o, namespace: l, widgetName: e, widgetFullName: h }
          )),
          n
            ? (t.each(n._childConstructors, function (e, i) {
                var s = i.prototype;
                t.widget(s.namespace + "." + s.widgetName, o, i._proto);
              }),
              delete n._childConstructors)
            : i._childConstructors.push(o),
          t.widget.bridge(e, o),
          o
        );
      }),
      (t.widget.extend = function (e) {
        for (
          var i, s, n = p.call(arguments, 1), o = 0, r = n.length;
          r > o;
          o++
        )
          for (i in n[o])
            (s = n[o][i]),
              n[o].hasOwnProperty(i) &&
                void 0 !== s &&
                (e[i] = t.isPlainObject(s)
                  ? t.isPlainObject(e[i])
                    ? t.widget.extend({}, e[i], s)
                    : t.widget.extend({}, s)
                  : s);
        return e;
      }),
      (t.widget.bridge = function (e, i) {
        var s = i.prototype.widgetFullName || e;
        t.fn[e] = function (n) {
          var o = "string" == typeof n,
            r = p.call(arguments, 1),
            a = this;
          return (
            o
              ? this.length || "instance" !== n
                ? this.each(function () {
                    var i,
                      o = t.data(this, s);
                    return "instance" === n
                      ? ((a = o), !1)
                      : o
                      ? t.isFunction(o[n]) && "_" !== n.charAt(0)
                        ? (i = o[n].apply(o, r)) !== o && void 0 !== i
                          ? ((a = i && i.jquery ? a.pushStack(i.get()) : i), !1)
                          : void 0
                        : t.error(
                            "no such method '" +
                              n +
                              "' for " +
                              e +
                              " widget instance"
                          )
                      : t.error(
                          "cannot call methods on " +
                            e +
                            " prior to initialization; attempted to call method '" +
                            n +
                            "'"
                        );
                  })
                : (a = void 0)
              : (r.length && (n = t.widget.extend.apply(null, [n].concat(r))),
                this.each(function () {
                  var e = t.data(this, s);
                  e
                    ? (e.option(n || {}), e._init && e._init())
                    : t.data(this, s, new i(n, this));
                })),
            a
          );
        };
      }),
      (t.Widget = function () {}),
      (t.Widget._childConstructors = []),
      (t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function (e, i) {
          (i = t(i || this.defaultElement || this)[0]),
            (this.element = t(i)),
            (this.uuid = d++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = t()),
            (this.hoverable = t()),
            (this.focusable = t()),
            (this.classesElementLookup = {}),
            i !== this &&
              (t.data(i, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (t) {
                  t.target === i && this.destroy();
                },
              }),
              (this.document = t(i.style ? i.ownerDocument : i.document || i)),
              (this.window = t(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = t.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              e
            )),
            this._create(),
            this.options.disabled &&
              this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: function () {
          return {};
        },
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
          var e = this;
          this._destroy(),
            t.each(this.classesElementLookup, function (t, i) {
              e._removeClass(i, t);
            }),
            this.element
              .off(this.eventNamespace)
              .removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace);
        },
        _destroy: t.noop,
        widget: function () {
          return this.element;
        },
        option: function (e, i) {
          var s,
            n,
            o,
            r = e;
          if (0 === arguments.length) return t.widget.extend({}, this.options);
          if ("string" == typeof e) {
            if (((r = {}), (e = (s = e.split(".")).shift()), s.length)) {
              for (
                n = r[e] = t.widget.extend({}, this.options[e]), o = 0;
                s.length - 1 > o;
                o++
              )
                (n[s[o]] = n[s[o]] || {}), (n = n[s[o]]);
              if (((e = s.pop()), 1 === arguments.length))
                return void 0 === n[e] ? null : n[e];
              n[e] = i;
            } else {
              if (1 === arguments.length)
                return void 0 === this.options[e] ? null : this.options[e];
              r[e] = i;
            }
          }
          return this._setOptions(r), this;
        },
        _setOptions: function (t) {
          var e;
          for (e in t) this._setOption(e, t[e]);
          return this;
        },
        _setOption: function (t, e) {
          return (
            "classes" === t && this._setOptionClasses(e),
            (this.options[t] = e),
            "disabled" === t && this._setOptionDisabled(e),
            this
          );
        },
        _setOptionClasses: function (e) {
          var i, s, n;
          for (i in e)
            (n = this.classesElementLookup[i]),
              e[i] !== this.options.classes[i] &&
                n &&
                n.length &&
                ((s = t(n.get())),
                this._removeClass(n, i),
                s.addClass(
                  this._classes({ element: s, keys: i, classes: e, add: !0 })
                ));
        },
        _setOptionDisabled: function (t) {
          this._toggleClass(
            this.widget(),
            this.widgetFullName + "-disabled",
            null,
            !!t
          ),
            t &&
              (this._removeClass(this.hoverable, null, "ui-state-hover"),
              this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _classes: function (e) {
          function i(i, o) {
            var r, a;
            for (a = 0; i.length > a; a++)
              (r = n.classesElementLookup[i[a]] || t()),
                (r = e.add
                  ? t(t.unique(r.get().concat(e.element.get())))
                  : t(r.not(e.element).get())),
                (n.classesElementLookup[i[a]] = r),
                s.push(i[a]),
                o && e.classes[i[a]] && s.push(e.classes[i[a]]);
          }
          var s = [],
            n = this;
          return (
            (e = t.extend(
              { element: this.element, classes: this.options.classes || {} },
              e
            )),
            this._on(e.element, { remove: "_untrackClassesElement" }),
            e.keys && i(e.keys.match(/\S+/g) || [], !0),
            e.extra && i(e.extra.match(/\S+/g) || []),
            s.join(" ")
          );
        },
        _untrackClassesElement: function (e) {
          var i = this;
          t.each(i.classesElementLookup, function (s, n) {
            -1 !== t.inArray(e.target, n) &&
              (i.classesElementLookup[s] = t(n.not(e.target).get()));
          });
        },
        _removeClass: function (t, e, i) {
          return this._toggleClass(t, e, i, !1);
        },
        _addClass: function (t, e, i) {
          return this._toggleClass(t, e, i, !0);
        },
        _toggleClass: function (t, e, i, s) {
          s = "boolean" == typeof s ? s : i;
          var n = "string" == typeof t || null === t,
            o = {
              extra: n ? e : i,
              keys: n ? t : e,
              element: n ? this.element : t,
              add: s,
            };
          return o.element.toggleClass(this._classes(o), s), this;
        },
        _on: function (e, i, s) {
          var n,
            o = this;
          "boolean" != typeof e && ((s = i), (i = e), (e = !1)),
            s
              ? ((i = n = t(i)), (this.bindings = this.bindings.add(i)))
              : ((s = i), (i = this.element), (n = this.widget())),
            t.each(s, function (s, r) {
              function a() {
                return e ||
                  (!0 !== o.options.disabled &&
                    !t(this).hasClass("ui-state-disabled"))
                  ? ("string" == typeof r ? o[r] : r).apply(o, arguments)
                  : void 0;
              }
              "string" != typeof r &&
                (a.guid = r.guid = r.guid || a.guid || t.guid++);
              var l = s.match(/^([\w:-]*)\s*(.*)$/),
                h = l[1] + o.eventNamespace,
                c = l[2];
              c ? n.on(h, c, a) : i.on(h, a);
            });
        },
        _off: function (e, i) {
          (i =
            (i || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            e.off(i).off(i),
            (this.bindings = t(this.bindings.not(e).get())),
            (this.focusable = t(this.focusable.not(e).get())),
            (this.hoverable = t(this.hoverable.not(e).get()));
        },
        _delay: function (t, e) {
          var i = this;
          return setTimeout(function e() {
            return ("string" == typeof t ? i[t] : t).apply(i, arguments);
          }, e || 0);
        },
        _hoverable: function (e) {
          (this.hoverable = this.hoverable.add(e)),
            this._on(e, {
              mouseenter: function (e) {
                this._addClass(t(e.currentTarget), null, "ui-state-hover");
              },
              mouseleave: function (e) {
                this._removeClass(t(e.currentTarget), null, "ui-state-hover");
              },
            });
        },
        _focusable: function (e) {
          (this.focusable = this.focusable.add(e)),
            this._on(e, {
              focusin: function (e) {
                this._addClass(t(e.currentTarget), null, "ui-state-focus");
              },
              focusout: function (e) {
                this._removeClass(t(e.currentTarget), null, "ui-state-focus");
              },
            });
        },
        _trigger: function (e, i, s) {
          var n,
            o,
            r = this.options[e];
          if (
            ((s = s || {}),
            ((i = t.Event(i)).type = (
              e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e
            ).toLowerCase()),
            (i.target = this.element[0]),
            (o = i.originalEvent))
          )
            for (n in o) n in i || (i[n] = o[n]);
          return (
            this.element.trigger(i, s),
            !(
              (t.isFunction(r) &&
                !1 === r.apply(this.element[0], [i].concat(s))) ||
              i.isDefaultPrevented()
            )
          );
        },
      }),
      t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
        t.Widget.prototype["_" + e] = function (s, n, o) {
          "string" == typeof n && (n = { effect: n });
          var r,
            a = n ? (!0 === n || "number" == typeof n ? i : n.effect || i) : e;
          "number" == typeof (n = n || {}) && (n = { duration: n }),
            (r = !t.isEmptyObject(n)),
            (n.complete = o),
            n.delay && s.delay(n.delay),
            r && t.effects && t.effects.effect[a]
              ? s[e](n)
              : a !== e && s[a]
              ? s[a](n.duration, n.easing, o)
              : s.queue(function (i) {
                  t(this)[e](), o && o.call(s[0]), i();
                });
        };
      }),
      t.widget,
      (function () {
        function e(t, e, i) {
          return [
            parseFloat(t[0]) * (c.test(t[0]) ? e / 100 : 1),
            parseFloat(t[1]) * (c.test(t[1]) ? i / 100 : 1),
          ];
        }
        function i(e, i) {
          return parseInt(t.css(e, i), 10) || 0;
        }
        var s,
          n = Math.max,
          o = Math.abs,
          r = /left|center|right/,
          a = /top|center|bottom/,
          l = /[\+\-]\d+(\.[\d]+)?%?/,
          h = /^\w+/,
          c = /%$/,
          u = t.fn.position;
        (t.position = {
          scrollbarWidth: function () {
            if (void 0 !== s) return s;
            var e,
              i,
              n = t(
                "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
              ),
              o = n.children()[0];
            return (
              t("body").append(n),
              (e = o.offsetWidth),
              n.css("overflow", "scroll"),
              e === (i = o.offsetWidth) && (i = n[0].clientWidth),
              n.remove(),
              (s = e - i)
            );
          },
          getScrollInfo: function (e) {
            var i =
                e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
              s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
              n =
                "scroll" === i ||
                ("auto" === i && e.width < e.element[0].scrollWidth);
            return {
              width:
                "scroll" === s ||
                ("auto" === s && e.height < e.element[0].scrollHeight)
                  ? t.position.scrollbarWidth()
                  : 0,
              height: n ? t.position.scrollbarWidth() : 0,
            };
          },
          getWithinInfo: function (e) {
            var i = t(e || window),
              s = t.isWindow(i[0]),
              n = !!i[0] && 9 === i[0].nodeType;
            return {
              element: i,
              isWindow: s,
              isDocument: n,
              offset: s || n ? { left: 0, top: 0 } : t(e).offset(),
              scrollLeft: i.scrollLeft(),
              scrollTop: i.scrollTop(),
              width: i.outerWidth(),
              height: i.outerHeight(),
            };
          },
        }),
          (t.fn.position = function (s) {
            if (!s || !s.of) return u.apply(this, arguments);
            s = t.extend({}, s);
            var c,
              d,
              p,
              f,
              g,
              m,
              v,
              b,
              $ = t(s.of),
              y = t.position.getWithinInfo(s.within),
              w = t.position.getScrollInfo(y),
              _ = (s.collision || "flip").split(" "),
              k = {};
            return (
              (m =
                9 === (b = (v = $)[0]).nodeType
                  ? {
                      width: v.width(),
                      height: v.height(),
                      offset: { top: 0, left: 0 },
                    }
                  : t.isWindow(b)
                  ? {
                      width: v.width(),
                      height: v.height(),
                      offset: { top: v.scrollTop(), left: v.scrollLeft() },
                    }
                  : b.preventDefault
                  ? {
                      width: 0,
                      height: 0,
                      offset: { top: b.pageY, left: b.pageX },
                    }
                  : {
                      width: v.outerWidth(),
                      height: v.outerHeight(),
                      offset: v.offset(),
                    }),
              $[0].preventDefault && (s.at = "left top"),
              (d = m.width),
              (p = m.height),
              (f = m.offset),
              (g = t.extend({}, f)),
              t.each(["my", "at"], function () {
                var t,
                  e,
                  i = (s[this] || "").split(" ");
                1 === i.length &&
                  (i = r.test(i[0])
                    ? i.concat(["center"])
                    : a.test(i[0])
                    ? ["center"].concat(i)
                    : ["center", "center"]),
                  (i[0] = r.test(i[0]) ? i[0] : "center"),
                  (i[1] = a.test(i[1]) ? i[1] : "center"),
                  (t = l.exec(i[0])),
                  (e = l.exec(i[1])),
                  (k[this] = [t ? t[0] : 0, e ? e[0] : 0]),
                  (s[this] = [h.exec(i[0])[0], h.exec(i[1])[0]]);
              }),
              1 === _.length && (_[1] = _[0]),
              "right" === s.at[0]
                ? (g.left += d)
                : "center" === s.at[0] && (g.left += d / 2),
              "bottom" === s.at[1]
                ? (g.top += p)
                : "center" === s.at[1] && (g.top += p / 2),
              (c = e(k.at, d, p)),
              (g.left += c[0]),
              (g.top += c[1]),
              this.each(function () {
                var r,
                  a,
                  l = t(this),
                  h = l.outerWidth(),
                  u = l.outerHeight(),
                  m = i(this, "marginLeft"),
                  v = i(this, "marginTop"),
                  b = h + m + i(this, "marginRight") + w.width,
                  C = u + v + i(this, "marginBottom") + w.height,
                  x = t.extend({}, g),
                  T = e(k.my, l.outerWidth(), l.outerHeight());
                "right" === s.my[0]
                  ? (x.left -= h)
                  : "center" === s.my[0] && (x.left -= h / 2),
                  "bottom" === s.my[1]
                    ? (x.top -= u)
                    : "center" === s.my[1] && (x.top -= u / 2),
                  (x.left += T[0]),
                  (x.top += T[1]),
                  (r = { marginLeft: m, marginTop: v }),
                  t.each(["left", "top"], function (e, i) {
                    t.ui.position[_[e]] &&
                      t.ui.position[_[e]][i](x, {
                        targetWidth: d,
                        targetHeight: p,
                        elemWidth: h,
                        elemHeight: u,
                        collisionPosition: r,
                        collisionWidth: b,
                        collisionHeight: C,
                        offset: [c[0] + T[0], c[1] + T[1]],
                        my: s.my,
                        at: s.at,
                        within: y,
                        elem: l,
                      });
                  }),
                  s.using &&
                    (a = function (t) {
                      var e = f.left - x.left,
                        i = e + d - h,
                        r = f.top - x.top,
                        a = r + p - u,
                        c = {
                          target: {
                            element: $,
                            left: f.left,
                            top: f.top,
                            width: d,
                            height: p,
                          },
                          element: {
                            element: l,
                            left: x.left,
                            top: x.top,
                            width: h,
                            height: u,
                          },
                          horizontal:
                            0 > i ? "left" : e > 0 ? "right" : "center",
                          vertical: 0 > a ? "top" : r > 0 ? "bottom" : "middle",
                        };
                      h > d && d > o(e + i) && (c.horizontal = "center"),
                        u > p && p > o(r + a) && (c.vertical = "middle"),
                        (c.important =
                          n(o(e), o(i)) > n(o(r), o(a))
                            ? "horizontal"
                            : "vertical"),
                        s.using.call(this, t, c);
                    }),
                  l.offset(t.extend(x, { using: a }));
              })
            );
          }),
          (t.ui.position = {
            fit: {
              left: function (t, e) {
                var i,
                  s = e.within,
                  o = s.isWindow ? s.scrollLeft : s.offset.left,
                  r = s.width,
                  a = t.left - e.collisionPosition.marginLeft,
                  l = o - a,
                  h = a + e.collisionWidth - r - o;
                e.collisionWidth > r
                  ? l > 0 && 0 >= h
                    ? ((i = t.left + l + e.collisionWidth - r - o),
                      (t.left += l - i))
                    : (t.left =
                        h > 0 && 0 >= l
                          ? o
                          : l > h
                          ? o + r - e.collisionWidth
                          : o)
                  : l > 0
                  ? (t.left += l)
                  : h > 0
                  ? (t.left -= h)
                  : (t.left = n(t.left - a, t.left));
              },
              top: function (t, e) {
                var i,
                  s = e.within,
                  o = s.isWindow ? s.scrollTop : s.offset.top,
                  r = e.within.height,
                  a = t.top - e.collisionPosition.marginTop,
                  l = o - a,
                  h = a + e.collisionHeight - r - o;
                e.collisionHeight > r
                  ? l > 0 && 0 >= h
                    ? ((i = t.top + l + e.collisionHeight - r - o),
                      (t.top += l - i))
                    : (t.top =
                        h > 0 && 0 >= l
                          ? o
                          : l > h
                          ? o + r - e.collisionHeight
                          : o)
                  : l > 0
                  ? (t.top += l)
                  : h > 0
                  ? (t.top -= h)
                  : (t.top = n(t.top - a, t.top));
              },
            },
            flip: {
              left: function (t, e) {
                var i,
                  s,
                  n = e.within,
                  r = n.offset.left + n.scrollLeft,
                  a = n.width,
                  l = n.isWindow ? n.scrollLeft : n.offset.left,
                  h = t.left - e.collisionPosition.marginLeft,
                  c = h - l,
                  u = h + e.collisionWidth - a - l,
                  d =
                    "left" === e.my[0]
                      ? -e.elemWidth
                      : "right" === e.my[0]
                      ? e.elemWidth
                      : 0,
                  p =
                    "left" === e.at[0]
                      ? e.targetWidth
                      : "right" === e.at[0]
                      ? -e.targetWidth
                      : 0,
                  f = -2 * e.offset[0];
                0 > c
                  ? (0 > (i = t.left + d + p + f + e.collisionWidth - a - r) ||
                      o(c) > i) &&
                    (t.left += d + p + f)
                  : u > 0 &&
                    ((s =
                      t.left - e.collisionPosition.marginLeft + d + p + f - l) >
                      0 ||
                      u > o(s)) &&
                    (t.left += d + p + f);
              },
              top: function (t, e) {
                var i,
                  s,
                  n = e.within,
                  r = n.offset.top + n.scrollTop,
                  a = n.height,
                  l = n.isWindow ? n.scrollTop : n.offset.top,
                  h = t.top - e.collisionPosition.marginTop,
                  c = h - l,
                  u = h + e.collisionHeight - a - l,
                  d =
                    "top" === e.my[1]
                      ? -e.elemHeight
                      : "bottom" === e.my[1]
                      ? e.elemHeight
                      : 0,
                  p =
                    "top" === e.at[1]
                      ? e.targetHeight
                      : "bottom" === e.at[1]
                      ? -e.targetHeight
                      : 0,
                  f = -2 * e.offset[1];
                0 > c
                  ? (0 > (s = t.top + d + p + f + e.collisionHeight - a - r) ||
                      o(c) > s) &&
                    (t.top += d + p + f)
                  : u > 0 &&
                    ((i =
                      t.top - e.collisionPosition.marginTop + d + p + f - l) >
                      0 ||
                      u > o(i)) &&
                    (t.top += d + p + f);
              },
            },
            flipfit: {
              left: function () {
                t.ui.position.flip.left.apply(this, arguments),
                  t.ui.position.fit.left.apply(this, arguments);
              },
              top: function () {
                t.ui.position.flip.top.apply(this, arguments),
                  t.ui.position.fit.top.apply(this, arguments);
              },
            },
          });
      })(),
      t.ui.position,
      t.extend(t.expr[":"], {
        data: t.expr.createPseudo
          ? t.expr.createPseudo(function (e) {
              return function (i) {
                return !!t.data(i, e);
              };
            })
          : function (e, i, s) {
              return !!t.data(e, s[3]);
            },
      }),
      t.fn.extend({
        disableSelection:
          ((h =
            "onselectstart" in document.createElement("div")
              ? "selectstart"
              : "mousedown"),
          function () {
            return this.on(h + ".ui-disableSelection", function (t) {
              t.preventDefault();
            });
          }),
        enableSelection: function () {
          return this.off(".ui-disableSelection");
        },
      }),
      (t.ui.focusable = function (e, i) {
        var s,
          n,
          o,
          r,
          a,
          l = e.nodeName.toLowerCase();
        return "area" === l
          ? ((n = (s = e.parentNode).name),
            !!e.href &&
              !!n &&
              "map" === s.nodeName.toLowerCase() &&
              (o = t("img[usemap='#" + n + "']")).length > 0 &&
              o.is(":visible"))
          : (/^(input|select|textarea|button|object)$/.test(l)
              ? (r = !e.disabled) &&
                (a = t(e).closest("fieldset")[0]) &&
                (r = !a.disabled)
              : (r = ("a" === l && e.href) || i),
            r &&
              t(e).is(":visible") &&
              (function t(e) {
                for (var i = e.css("visibility"); "inherit" === i; )
                  i = (e = e.parent()).css("visibility");
                return "hidden" !== i;
              })(t(e)));
      }),
      t.extend(t.expr[":"], {
        focusable: function (e) {
          return t.ui.focusable(e, null != t.attr(e, "tabindex"));
        },
      }),
      t.ui.focusable,
      (t.fn.form = function () {
        return "string" == typeof this[0].form
          ? this.closest("form")
          : t(this[0].form);
      }),
      (t.ui.formResetMixin = {
        _formResetHandler: function () {
          var e = t(this);
          setTimeout(function () {
            var i = e.data("ui-form-reset-instances");
            t.each(i, function () {
              this.refresh();
            });
          });
        },
        _bindFormResetHandler: function () {
          if (((this.form = this.element.form()), this.form.length)) {
            var t = this.form.data("ui-form-reset-instances") || [];
            t.length ||
              this.form.on("reset.ui-form-reset", this._formResetHandler),
              t.push(this),
              this.form.data("ui-form-reset-instances", t);
          }
        },
        _unbindFormResetHandler: function () {
          if (this.form.length) {
            var e = this.form.data("ui-form-reset-instances");
            e.splice(t.inArray(this, e), 1),
              e.length
                ? this.form.data("ui-form-reset-instances", e)
                : this.form
                    .removeData("ui-form-reset-instances")
                    .off("reset.ui-form-reset");
          }
        },
      }),
      "1.7" === t.fn.jquery.substring(0, 3) &&
        (t.each(["Width", "Height"], function (e, i) {
          function s(e, i, s, o) {
            return (
              t.each(n, function () {
                (i -= parseFloat(t.css(e, "padding" + this)) || 0),
                  s &&
                    (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0),
                  o && (i -= parseFloat(t.css(e, "margin" + this)) || 0);
              }),
              i
            );
          }
          var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            o = i.toLowerCase(),
            r = {
              innerWidth: t.fn.innerWidth,
              innerHeight: t.fn.innerHeight,
              outerWidth: t.fn.outerWidth,
              outerHeight: t.fn.outerHeight,
            };
          (t.fn["inner" + i] = function (e) {
            return void 0 === e
              ? r["inner" + i].call(this)
              : this.each(function () {
                  t(this).css(o, s(this, e) + "px");
                });
          }),
            (t.fn["outer" + i] = function (e, n) {
              return "number" != typeof e
                ? r["outer" + i].call(this, e)
                : this.each(function () {
                    t(this).css(o, s(this, e, !0, n) + "px");
                  });
            });
        }),
        (t.fn.addBack = function (t) {
          return this.add(
            null == t ? this.prevObject : this.prevObject.filter(t)
          );
        })),
      (t.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      }),
      (t.ui.escapeSelector =
        ((c = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g),
        function (t) {
          return t.replace(c, "\\$1");
        })),
      (t.fn.labels = function () {
        var e, i, s, n, o;
        return this[0].labels && this[0].labels.length
          ? this.pushStack(this[0].labels)
          : ((n = this.eq(0).parents("label")),
            (s = this.attr("id")) &&
              ((o = (e = this.eq(0).parents().last()).add(
                e.length ? e.siblings() : this.siblings()
              )),
              (i = "label[for='" + t.ui.escapeSelector(s) + "']"),
              (n = n.add(o.find(i).addBack(i)))),
            this.pushStack(n));
      }),
      (t.fn.scrollParent = function (e) {
        var i = this.css("position"),
          s = "absolute" === i,
          n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          o = this.parents()
            .filter(function () {
              var e = t(this);
              return (
                (!s || "static" !== e.css("position")) &&
                n.test(
                  e.css("overflow") + e.css("overflow-y") + e.css("overflow-x")
                )
              );
            })
            .eq(0);
        return "fixed" !== i && o.length
          ? o
          : t(this[0].ownerDocument || document);
      }),
      t.extend(t.expr[":"], {
        tabbable: function (e) {
          var i = t.attr(e, "tabindex"),
            s = null != i;
          return (!s || i >= 0) && t.ui.focusable(e, s);
        },
      }),
      t.fn.extend({
        uniqueId:
          ((u = 0),
          function () {
            return this.each(function () {
              this.id || (this.id = "ui-id-" + ++u);
            });
          }),
        removeUniqueId: function () {
          return this.each(function () {
            /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id");
          });
        },
      }),
      (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
    var f = !1;
    t(document).on("mouseup", function () {
      f = !1;
    }),
      t.widget("ui.mouse", {
        version: "1.12.1",
        options: {
          cancel: "input, textarea, button, select, option",
          distance: 1,
          delay: 0,
        },
        _mouseInit: function () {
          var e = this;
          this.element
            .on("mousedown." + this.widgetName, function (t) {
              return e._mouseDown(t);
            })
            .on("click." + this.widgetName, function (i) {
              return !0 ===
                t.data(i.target, e.widgetName + ".preventClickEvent")
                ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"),
                  i.stopImmediatePropagation(),
                  !1)
                : void 0;
            }),
            (this.started = !1);
        },
        _mouseDestroy: function () {
          this.element.off("." + this.widgetName),
            this._mouseMoveDelegate &&
              this.document
                .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
                .off("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function (e) {
          if (!f) {
            (this._mouseMoved = !1),
              this._mouseStarted && this._mouseUp(e),
              (this._mouseDownEvent = e);
            var i = this,
              s = 1 === e.which,
              n =
                "string" == typeof this.options.cancel &&
                !!e.target.nodeName &&
                t(e.target).closest(this.options.cancel).length;
            return (
              !(s && !n && this._mouseCapture(e)) ||
              ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  i.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(e) &&
              this._mouseDelayMet(e) &&
              ((this._mouseStarted = !1 !== this._mouseStart(e)),
              !this._mouseStarted)
                ? (e.preventDefault(), !0)
                : (!0 ===
                    t.data(e.target, this.widgetName + ".preventClickEvent") &&
                    t.removeData(
                      e.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (t) {
                    return i._mouseMove(t);
                  }),
                  (this._mouseUpDelegate = function (t) {
                    return i._mouseUp(t);
                  }),
                  this.document
                    .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                    .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                  e.preventDefault(),
                  (f = !0),
                  !0))
            );
          }
        },
        _mouseMove: function (e) {
          if (this._mouseMoved) {
            if (
              t.ui.ie &&
              (!document.documentMode || 9 > document.documentMode) &&
              !e.button
            )
              return this._mouseUp(e);
            if (!e.which) {
              if (
                e.originalEvent.altKey ||
                e.originalEvent.ctrlKey ||
                e.originalEvent.metaKey ||
                e.originalEvent.shiftKey
              )
                this.ignoreMissingWhich = !0;
              else if (!this.ignoreMissingWhich) return this._mouseUp(e);
            }
          }
          return (
            (e.which || e.button) && (this._mouseMoved = !0),
            this._mouseStarted
              ? (this._mouseDrag(e), e.preventDefault())
              : (this._mouseDistanceMet(e) &&
                  this._mouseDelayMet(e) &&
                  ((this._mouseStarted =
                    !1 !== this._mouseStart(this._mouseDownEvent, e)),
                  this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
                !this._mouseStarted)
          );
        },
        _mouseUp: function (e) {
          this.document
            .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .off("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted &&
              ((this._mouseStarted = !1),
              e.target === this._mouseDownEvent.target &&
                t.data(e.target, this.widgetName + ".preventClickEvent", !0),
              this._mouseStop(e)),
            this._mouseDelayTimer &&
              (clearTimeout(this._mouseDelayTimer),
              delete this._mouseDelayTimer),
            (this.ignoreMissingWhich = !1),
            (f = !1),
            e.preventDefault();
        },
        _mouseDistanceMet: function (t) {
          return (
            Math.max(
              Math.abs(this._mouseDownEvent.pageX - t.pageX),
              Math.abs(this._mouseDownEvent.pageY - t.pageY)
            ) >= this.options.distance
          );
        },
        _mouseDelayMet: function () {
          return this.mouseDelayMet;
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
          return !0;
        },
      }),
      (t.ui.plugin = {
        add: function (e, i, s) {
          var n,
            o = t.ui[e].prototype;
          for (n in s)
            (o.plugins[n] = o.plugins[n] || []), o.plugins[n].push([i, s[n]]);
        },
        call: function (t, e, i, s) {
          var n,
            o = t.plugins[e];
          if (
            o &&
            (s ||
              (t.element[0].parentNode &&
                11 !== t.element[0].parentNode.nodeType))
          )
            for (n = 0; o.length > n; n++)
              t.options[o[n][0]] && o[n][1].apply(t.element, i);
        },
      }),
      (t.ui.safeActiveElement = function (t) {
        var e;
        try {
          e = t.activeElement;
        } catch (i) {
          e = t.body;
        }
        return e || (e = t.body), e.nodeName || (e = t.body), e;
      }),
      (t.ui.safeBlur = function (e) {
        e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur");
      }),
      t.widget("ui.draggable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
          addClasses: !0,
          appendTo: "parent",
          axis: !1,
          connectToSortable: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          iframeFix: !1,
          opacity: !1,
          refreshPositions: !1,
          revert: !1,
          revertDuration: 500,
          scope: "default",
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          snap: !1,
          snapMode: "both",
          snapTolerance: 20,
          stack: !1,
          zIndex: !1,
          drag: null,
          start: null,
          stop: null,
        },
        _create: function () {
          "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this._addClass("ui-draggable"),
            this._setHandleClassName(),
            this._mouseInit();
        },
        _setOption: function (t, e) {
          this._super(t, e),
            "handle" === t &&
              (this._removeHandleClassName(), this._setHandleClassName());
        },
        _destroy: function () {
          return (this.helper || this.element).is(".ui-draggable-dragging")
            ? void (this.destroyOnClear = !0)
            : (this._removeHandleClassName(), void this._mouseDestroy());
        },
        _mouseCapture: function (e) {
          var i = this.options;
          return (
            !this.helper &&
            !i.disabled &&
            !(t(e.target).closest(".ui-resizable-handle").length > 0) &&
            ((this.handle = this._getHandle(e)),
            !!this.handle &&
              (this._blurActiveElement(e),
              this._blockFrames(!0 === i.iframeFix ? "iframe" : i.iframeFix),
              !0))
          );
        },
        _blockFrames: function (e) {
          this.iframeBlocks = this.document.find(e).map(function () {
            var e = t(this);
            return t("<div>")
              .css("position", "absolute")
              .appendTo(e.parent())
              .outerWidth(e.outerWidth())
              .outerHeight(e.outerHeight())
              .offset(e.offset())[0];
          });
        },
        _unblockFrames: function () {
          this.iframeBlocks &&
            (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _blurActiveElement: function (e) {
          var i = t.ui.safeActiveElement(this.document[0]);
          t(e.target).closest(i).length || t.ui.safeBlur(i);
        },
        _mouseStart: function (e) {
          var i = this.options;
          return (
            (this.helper = this._createHelper(e)),
            this._addClass(this.helper, "ui-draggable-dragging"),
            this._cacheHelperProportions(),
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            this._cacheMargins(),
            (this.cssPosition = this.helper.css("position")),
            (this.scrollParent = this.helper.scrollParent(!0)),
            (this.offsetParent = this.helper.offsetParent()),
            (this.hasFixedAncestor =
              this.helper.parents().filter(function () {
                return "fixed" === t(this).css("position");
              }).length > 0),
            (this.positionAbs = this.element.offset()),
            this._refreshOffsets(e),
            (this.originalPosition = this.position =
              this._generatePosition(e, !1)),
            (this.originalPageX = e.pageX),
            (this.originalPageY = e.pageY),
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            this._setContainment(),
            !1 === this._trigger("start", e)
              ? (this._clear(), !1)
              : (this._cacheHelperProportions(),
                t.ui.ddmanager &&
                  !i.dropBehaviour &&
                  t.ui.ddmanager.prepareOffsets(this, e),
                this._mouseDrag(e, !0),
                t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e),
                !0)
          );
        },
        _refreshOffsets: function (t) {
          (this.offset = {
            top: this.positionAbs.top - this.margins.top,
            left: this.positionAbs.left - this.margins.left,
            scroll: !1,
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
            (this.offset.click = {
              left: t.pageX - this.offset.left,
              top: t.pageY - this.offset.top,
            });
        },
        _mouseDrag: function (e, i) {
          if (
            (this.hasFixedAncestor &&
              (this.offset.parent = this._getParentOffset()),
            (this.position = this._generatePosition(e, !0)),
            (this.positionAbs = this._convertPositionTo("absolute")),
            !i)
          ) {
            var s = this._uiHash();
            if (!1 === this._trigger("drag", e, s))
              return this._mouseUp(new t.Event("mouseup", e)), !1;
            this.position = s.position;
          }
          return (
            (this.helper[0].style.left = this.position.left + "px"),
            (this.helper[0].style.top = this.position.top + "px"),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            !1
          );
        },
        _mouseStop: function (e) {
          var i = this,
            s = !1;
          return (
            t.ui.ddmanager &&
              !this.options.dropBehaviour &&
              (s = t.ui.ddmanager.drop(this, e)),
            this.dropped && ((s = this.dropped), (this.dropped = !1)),
            ("invalid" === this.options.revert && !s) ||
            ("valid" === this.options.revert && s) ||
            !0 === this.options.revert ||
            (t.isFunction(this.options.revert) &&
              this.options.revert.call(this.element, s))
              ? t(this.helper).animate(
                  this.originalPosition,
                  parseInt(this.options.revertDuration, 10),
                  function () {
                    !1 !== i._trigger("stop", e) && i._clear();
                  }
                )
              : !1 !== this._trigger("stop", e) && this._clear(),
            !1
          );
        },
        _mouseUp: function (e) {
          return (
            this._unblockFrames(),
            t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
            this.handleElement.is(e.target) && this.element.trigger("focus"),
            t.ui.mouse.prototype._mouseUp.call(this, e)
          );
        },
        cancel: function () {
          return (
            this.helper.is(".ui-draggable-dragging")
              ? this._mouseUp(
                  new t.Event("mouseup", { target: this.element[0] })
                )
              : this._clear(),
            this
          );
        },
        _getHandle: function (e) {
          return (
            !this.options.handle ||
            !!t(e.target).closest(this.element.find(this.options.handle)).length
          );
        },
        _setHandleClassName: function () {
          (this.handleElement = this.options.handle
            ? this.element.find(this.options.handle)
            : this.element),
            this._addClass(this.handleElement, "ui-draggable-handle");
        },
        _removeHandleClassName: function () {
          this._removeClass(this.handleElement, "ui-draggable-handle");
        },
        _createHelper: function (e) {
          var i = this.options,
            s = t.isFunction(i.helper),
            n = s
              ? t(i.helper.apply(this.element[0], [e]))
              : "clone" === i.helper
              ? this.element.clone().removeAttr("id")
              : this.element;
          return (
            n.parents("body").length ||
              n.appendTo(
                "parent" === i.appendTo
                  ? this.element[0].parentNode
                  : i.appendTo
              ),
            s && n[0] === this.element[0] && this._setPositionRelative(),
            n[0] === this.element[0] ||
              /(fixed|absolute)/.test(n.css("position")) ||
              n.css("position", "absolute"),
            n
          );
        },
        _setPositionRelative: function () {
          /^(?:r|a|f)/.test(this.element.css("position")) ||
            (this.element[0].style.position = "relative");
        },
        _adjustOffsetFromHelper: function (e) {
          "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
            "left" in e &&
              (this.offset.click.left = e.left + this.margins.left),
            "right" in e &&
              (this.offset.click.left =
                this.helperProportions.width - e.right + this.margins.left),
            "top" in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom" in e &&
              (this.offset.click.top =
                this.helperProportions.height - e.bottom + this.margins.top);
        },
        _isRootNode: function (t) {
          return /(html|body)/i.test(t.tagName) || t === this.document[0];
        },
        _getParentOffset: function () {
          var e = this.offsetParent.offset(),
            i = this.document[0];
          return (
            "absolute" === this.cssPosition &&
              this.scrollParent[0] !== i &&
              t.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((e.left += this.scrollParent.scrollLeft()),
              (e.top += this.scrollParent.scrollTop())),
            this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }),
            {
              top:
                e.top +
                (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left:
                e.left +
                (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
          var t = this.element.position(),
            e = this._isRootNode(this.scrollParent[0]);
          return {
            top:
              t.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              (e ? 0 : this.scrollParent.scrollTop()),
            left:
              t.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              (e ? 0 : this.scrollParent.scrollLeft()),
          };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.element.css("marginLeft"), 10) || 0,
            top: parseInt(this.element.css("marginTop"), 10) || 0,
            right: parseInt(this.element.css("marginRight"), 10) || 0,
            bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var e,
            i,
            s,
            n = this.options,
            o = this.document[0];
          return (
            (this.relativeContainer = null),
            n.containment
              ? "window" === n.containment
                ? void (this.containment = [
                    t(window).scrollLeft() -
                      this.offset.relative.left -
                      this.offset.parent.left,
                    t(window).scrollTop() -
                      this.offset.relative.top -
                      this.offset.parent.top,
                    t(window).scrollLeft() +
                      t(window).width() -
                      this.helperProportions.width -
                      this.margins.left,
                    t(window).scrollTop() +
                      (t(window).height() || o.body.parentNode.scrollHeight) -
                      this.helperProportions.height -
                      this.margins.top,
                  ])
                : "document" === n.containment
                ? void (this.containment = [
                    0,
                    0,
                    t(o).width() -
                      this.helperProportions.width -
                      this.margins.left,
                    (t(o).height() || o.body.parentNode.scrollHeight) -
                      this.helperProportions.height -
                      this.margins.top,
                  ])
                : n.containment.constructor === Array
                ? void (this.containment = n.containment)
                : ("parent" === n.containment &&
                    (n.containment = this.helper[0].parentNode),
                  void (
                    (s = (i = t(n.containment))[0]) &&
                    ((e = /(scroll|auto)/.test(i.css("overflow"))),
                    (this.containment = [
                      (parseInt(i.css("borderLeftWidth"), 10) || 0) +
                        (parseInt(i.css("paddingLeft"), 10) || 0),
                      (parseInt(i.css("borderTopWidth"), 10) || 0) +
                        (parseInt(i.css("paddingTop"), 10) || 0),
                      (e
                        ? Math.max(s.scrollWidth, s.offsetWidth)
                        : s.offsetWidth) -
                        (parseInt(i.css("borderRightWidth"), 10) || 0) -
                        (parseInt(i.css("paddingRight"), 10) || 0) -
                        this.helperProportions.width -
                        this.margins.left -
                        this.margins.right,
                      (e
                        ? Math.max(s.scrollHeight, s.offsetHeight)
                        : s.offsetHeight) -
                        (parseInt(i.css("borderBottomWidth"), 10) || 0) -
                        (parseInt(i.css("paddingBottom"), 10) || 0) -
                        this.helperProportions.height -
                        this.margins.top -
                        this.margins.bottom,
                    ]),
                    (this.relativeContainer = i))
                  ))
              : void (this.containment = null)
          );
        },
        _convertPositionTo: function (t, e) {
          e || (e = this.position);
          var i = "absolute" === t ? 1 : -1,
            s = this._isRootNode(this.scrollParent[0]);
          return {
            top:
              e.top +
              this.offset.relative.top * i +
              this.offset.parent.top * i -
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : s
                ? 0
                : this.offset.scroll.top) *
                i,
            left:
              e.left +
              this.offset.relative.left * i +
              this.offset.parent.left * i -
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : s
                ? 0
                : this.offset.scroll.left) *
                i,
          };
        },
        _generatePosition: function (t, e) {
          var i,
            s,
            n,
            o,
            r = this.options,
            a = this._isRootNode(this.scrollParent[0]),
            l = t.pageX,
            h = t.pageY;
          return (
            (a && this.offset.scroll) ||
              (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft(),
              }),
            e &&
              (this.containment &&
                (this.relativeContainer
                  ? ((s = this.relativeContainer.offset()),
                    (i = [
                      this.containment[0] + s.left,
                      this.containment[1] + s.top,
                      this.containment[2] + s.left,
                      this.containment[3] + s.top,
                    ]))
                  : (i = this.containment),
                t.pageX - this.offset.click.left < i[0] &&
                  (l = i[0] + this.offset.click.left),
                t.pageY - this.offset.click.top < i[1] &&
                  (h = i[1] + this.offset.click.top),
                t.pageX - this.offset.click.left > i[2] &&
                  (l = i[2] + this.offset.click.left),
                t.pageY - this.offset.click.top > i[3] &&
                  (h = i[3] + this.offset.click.top)),
              r.grid &&
                ((n = r.grid[1]
                  ? this.originalPageY +
                    Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1]
                  : this.originalPageY),
                (h = i
                  ? n - this.offset.click.top >= i[1] ||
                    n - this.offset.click.top > i[3]
                    ? n
                    : n - this.offset.click.top >= i[1]
                    ? n - r.grid[1]
                    : n + r.grid[1]
                  : n),
                (o = r.grid[0]
                  ? this.originalPageX +
                    Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0]
                  : this.originalPageX),
                (l = i
                  ? o - this.offset.click.left >= i[0] ||
                    o - this.offset.click.left > i[2]
                    ? o
                    : o - this.offset.click.left >= i[0]
                    ? o - r.grid[0]
                    : o + r.grid[0]
                  : o)),
              "y" === r.axis && (l = this.originalPageX),
              "x" === r.axis && (h = this.originalPageY)),
            {
              top:
                h -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                ("fixed" === this.cssPosition
                  ? -this.offset.scroll.top
                  : a
                  ? 0
                  : this.offset.scroll.top),
              left:
                l -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                ("fixed" === this.cssPosition
                  ? -this.offset.scroll.left
                  : a
                  ? 0
                  : this.offset.scroll.left),
            }
          );
        },
        _clear: function () {
          this._removeClass(this.helper, "ui-draggable-dragging"),
            this.helper[0] === this.element[0] ||
              this.cancelHelperRemoval ||
              this.helper.remove(),
            (this.helper = null),
            (this.cancelHelperRemoval = !1),
            this.destroyOnClear && this.destroy();
        },
        _trigger: function (e, i, s) {
          return (
            (s = s || this._uiHash()),
            t.ui.plugin.call(this, e, [i, s, this], !0),
            /^(drag|start|stop)/.test(e) &&
              ((this.positionAbs = this._convertPositionTo("absolute")),
              (s.offset = this.positionAbs)),
            t.Widget.prototype._trigger.call(this, e, i, s)
          );
        },
        plugins: {},
        _uiHash: function () {
          return {
            helper: this.helper,
            position: this.position,
            originalPosition: this.originalPosition,
            offset: this.positionAbs,
          };
        },
      }),
      t.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, i, s) {
          var n = t.extend({}, i, { item: s.element });
          (s.sortables = []),
            t(s.options.connectToSortable).each(function () {
              var i = t(this).sortable("instance");
              i &&
                !i.options.disabled &&
                (s.sortables.push(i),
                i.refreshPositions(),
                i._trigger("activate", e, n));
            });
        },
        stop: function (e, i, s) {
          var n = t.extend({}, i, { item: s.element });
          (s.cancelHelperRemoval = !1),
            t.each(s.sortables, function () {
              var t = this;
              t.isOver
                ? ((t.isOver = 0),
                  (s.cancelHelperRemoval = !0),
                  (t.cancelHelperRemoval = !1),
                  (t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left"),
                  }),
                  t._mouseStop(e),
                  (t.options.helper = t.options._helper))
                : ((t.cancelHelperRemoval = !0),
                  t._trigger("deactivate", e, n));
            });
        },
        drag: function (e, i, s) {
          t.each(s.sortables, function () {
            var n = !1,
              o = this;
            (o.positionAbs = s.positionAbs),
              (o.helperProportions = s.helperProportions),
              (o.offset.click = s.offset.click),
              o._intersectsWith(o.containerCache) &&
                ((n = !0),
                t.each(s.sortables, function () {
                  return (
                    (this.positionAbs = s.positionAbs),
                    (this.helperProportions = s.helperProportions),
                    (this.offset.click = s.offset.click),
                    this !== o &&
                      this._intersectsWith(this.containerCache) &&
                      t.contains(o.element[0], this.element[0]) &&
                      (n = !1),
                    n
                  );
                })),
              n
                ? (o.isOver ||
                    ((o.isOver = 1),
                    (s._parent = i.helper.parent()),
                    (o.currentItem = i.helper
                      .appendTo(o.element)
                      .data("ui-sortable-item", !0)),
                    (o.options._helper = o.options.helper),
                    (o.options.helper = function () {
                      return i.helper[0];
                    }),
                    (e.target = o.currentItem[0]),
                    o._mouseCapture(e, !0),
                    o._mouseStart(e, !0, !0),
                    (o.offset.click.top = s.offset.click.top),
                    (o.offset.click.left = s.offset.click.left),
                    (o.offset.parent.left -=
                      s.offset.parent.left - o.offset.parent.left),
                    (o.offset.parent.top -=
                      s.offset.parent.top - o.offset.parent.top),
                    s._trigger("toSortable", e),
                    (s.dropped = o.element),
                    t.each(s.sortables, function () {
                      this.refreshPositions();
                    }),
                    (s.currentItem = s.element),
                    (o.fromOutside = s)),
                  o.currentItem && (o._mouseDrag(e), (i.position = o.position)))
                : o.isOver &&
                  ((o.isOver = 0),
                  (o.cancelHelperRemoval = !0),
                  (o.options._revert = o.options.revert),
                  (o.options.revert = !1),
                  o._trigger("out", e, o._uiHash(o)),
                  o._mouseStop(e, !0),
                  (o.options.revert = o.options._revert),
                  (o.options.helper = o.options._helper),
                  o.placeholder && o.placeholder.remove(),
                  i.helper.appendTo(s._parent),
                  s._refreshOffsets(e),
                  (i.position = s._generatePosition(e, !0)),
                  s._trigger("fromSortable", e),
                  (s.dropped = !1),
                  t.each(s.sortables, function () {
                    this.refreshPositions();
                  }));
          });
        },
      }),
      t.ui.plugin.add("draggable", "cursor", {
        start: function (e, i, s) {
          var n = t("body"),
            o = s.options;
          n.css("cursor") && (o._cursor = n.css("cursor")),
            n.css("cursor", o.cursor);
        },
        stop: function (e, i, s) {
          var n = s.options;
          n._cursor && t("body").css("cursor", n._cursor);
        },
      }),
      t.ui.plugin.add("draggable", "opacity", {
        start: function (e, i, s) {
          var n = t(i.helper),
            o = s.options;
          n.css("opacity") && (o._opacity = n.css("opacity")),
            n.css("opacity", o.opacity);
        },
        stop: function (e, i, s) {
          var n = s.options;
          n._opacity && t(i.helper).css("opacity", n._opacity);
        },
      }),
      t.ui.plugin.add("draggable", "scroll", {
        start: function (t, e, i) {
          i.scrollParentNotHidden ||
            (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
            i.scrollParentNotHidden[0] !== i.document[0] &&
              "HTML" !== i.scrollParentNotHidden[0].tagName &&
              (i.overflowOffset = i.scrollParentNotHidden.offset());
        },
        drag: function (e, i, s) {
          var n = s.options,
            o = !1,
            r = s.scrollParentNotHidden[0],
            a = s.document[0];
          r !== a && "HTML" !== r.tagName
            ? ((n.axis && "x" === n.axis) ||
                (s.overflowOffset.top + r.offsetHeight - e.pageY <
                n.scrollSensitivity
                  ? (r.scrollTop = o = r.scrollTop + n.scrollSpeed)
                  : e.pageY - s.overflowOffset.top < n.scrollSensitivity &&
                    (r.scrollTop = o = r.scrollTop - n.scrollSpeed)),
              (n.axis && "y" === n.axis) ||
                (s.overflowOffset.left + r.offsetWidth - e.pageX <
                n.scrollSensitivity
                  ? (r.scrollLeft = o = r.scrollLeft + n.scrollSpeed)
                  : e.pageX - s.overflowOffset.left < n.scrollSensitivity &&
                    (r.scrollLeft = o = r.scrollLeft - n.scrollSpeed)))
            : ((n.axis && "x" === n.axis) ||
                (e.pageY - t(a).scrollTop() < n.scrollSensitivity
                  ? (o = t(a).scrollTop(t(a).scrollTop() - n.scrollSpeed))
                  : t(window).height() - (e.pageY - t(a).scrollTop()) <
                      n.scrollSensitivity &&
                    (o = t(a).scrollTop(t(a).scrollTop() + n.scrollSpeed))),
              (n.axis && "y" === n.axis) ||
                (e.pageX - t(a).scrollLeft() < n.scrollSensitivity
                  ? (o = t(a).scrollLeft(t(a).scrollLeft() - n.scrollSpeed))
                  : t(window).width() - (e.pageX - t(a).scrollLeft()) <
                      n.scrollSensitivity &&
                    (o = t(a).scrollLeft(t(a).scrollLeft() + n.scrollSpeed)))),
            !1 !== o &&
              t.ui.ddmanager &&
              !n.dropBehaviour &&
              t.ui.ddmanager.prepareOffsets(s, e);
        },
      }),
      t.ui.plugin.add("draggable", "snap", {
        start: function (e, i, s) {
          var n = s.options;
          (s.snapElements = []),
            t(
              n.snap.constructor !== String
                ? n.snap.items || ":data(ui-draggable)"
                : n.snap
            ).each(function () {
              var e = t(this),
                i = e.offset();
              this !== s.element[0] &&
                s.snapElements.push({
                  item: this,
                  width: e.outerWidth(),
                  height: e.outerHeight(),
                  top: i.top,
                  left: i.left,
                });
            });
        },
        drag: function (e, i, s) {
          var n,
            o,
            r,
            a,
            l,
            h,
            c,
            u,
            d,
            p,
            f = s.options,
            g = f.snapTolerance,
            m = i.offset.left,
            v = m + s.helperProportions.width,
            b = i.offset.top,
            $ = b + s.helperProportions.height;
          for (d = s.snapElements.length - 1; d >= 0; d--)
            (h =
              (l = s.snapElements[d].left - s.margins.left) +
              s.snapElements[d].width),
              (u =
                (c = s.snapElements[d].top - s.margins.top) +
                s.snapElements[d].height),
              l - g > v ||
              m > h + g ||
              c - g > $ ||
              b > u + g ||
              !t.contains(
                s.snapElements[d].item.ownerDocument,
                s.snapElements[d].item
              )
                ? (s.snapElements[d].snapping &&
                    s.options.snap.release &&
                    s.options.snap.release.call(
                      s.element,
                      e,
                      t.extend(s._uiHash(), {
                        snapItem: s.snapElements[d].item,
                      })
                    ),
                  (s.snapElements[d].snapping = !1))
                : ("inner" !== f.snapMode &&
                    ((n = g >= Math.abs(c - $)),
                    (o = g >= Math.abs(u - b)),
                    (r = g >= Math.abs(l - v)),
                    (a = g >= Math.abs(h - m)),
                    n &&
                      (i.position.top = s._convertPositionTo("relative", {
                        top: c - s.helperProportions.height,
                        left: 0,
                      }).top),
                    o &&
                      (i.position.top = s._convertPositionTo("relative", {
                        top: u,
                        left: 0,
                      }).top),
                    r &&
                      (i.position.left = s._convertPositionTo("relative", {
                        top: 0,
                        left: l - s.helperProportions.width,
                      }).left),
                    a &&
                      (i.position.left = s._convertPositionTo("relative", {
                        top: 0,
                        left: h,
                      }).left)),
                  (p = n || o || r || a),
                  "outer" !== f.snapMode &&
                    ((n = g >= Math.abs(c - b)),
                    (o = g >= Math.abs(u - $)),
                    (r = g >= Math.abs(l - m)),
                    (a = g >= Math.abs(h - v)),
                    n &&
                      (i.position.top = s._convertPositionTo("relative", {
                        top: c,
                        left: 0,
                      }).top),
                    o &&
                      (i.position.top = s._convertPositionTo("relative", {
                        top: u - s.helperProportions.height,
                        left: 0,
                      }).top),
                    r &&
                      (i.position.left = s._convertPositionTo("relative", {
                        top: 0,
                        left: l,
                      }).left),
                    a &&
                      (i.position.left = s._convertPositionTo("relative", {
                        top: 0,
                        left: h - s.helperProportions.width,
                      }).left)),
                  !s.snapElements[d].snapping &&
                    (n || o || r || a || p) &&
                    s.options.snap.snap &&
                    s.options.snap.snap.call(
                      s.element,
                      e,
                      t.extend(s._uiHash(), {
                        snapItem: s.snapElements[d].item,
                      })
                    ),
                  (s.snapElements[d].snapping = n || o || r || a || p));
        },
      }),
      t.ui.plugin.add("draggable", "stack", {
        start: function (e, i, s) {
          var n,
            o = s.options,
            r = t.makeArray(t(o.stack)).sort(function (e, i) {
              return (
                (parseInt(t(e).css("zIndex"), 10) || 0) -
                (parseInt(t(i).css("zIndex"), 10) || 0)
              );
            });
          r.length &&
            ((n = parseInt(t(r[0]).css("zIndex"), 10) || 0),
            t(r).each(function (e) {
              t(this).css("zIndex", n + e);
            }),
            this.css("zIndex", n + r.length));
        },
      }),
      t.ui.plugin.add("draggable", "zIndex", {
        start: function (e, i, s) {
          var n = t(i.helper),
            o = s.options;
          n.css("zIndex") && (o._zIndex = n.css("zIndex")),
            n.css("zIndex", o.zIndex);
        },
        stop: function (e, i, s) {
          var n = s.options;
          n._zIndex && t(i.helper).css("zIndex", n._zIndex);
        },
      }),
      t.ui.draggable,
      t.widget("ui.droppable", {
        version: "1.12.1",
        widgetEventPrefix: "drop",
        options: {
          accept: "*",
          addClasses: !0,
          greedy: !1,
          scope: "default",
          tolerance: "intersect",
          activate: null,
          deactivate: null,
          drop: null,
          out: null,
          over: null,
        },
        _create: function () {
          var e,
            i = this.options,
            s = i.accept;
          (this.isover = !1),
            (this.isout = !0),
            (this.accept = t.isFunction(s)
              ? s
              : function (t) {
                  return t.is(s);
                }),
            (this.proportions = function () {
              return arguments.length
                ? void (e = arguments[0])
                : e ||
                    (e = {
                      width: this.element[0].offsetWidth,
                      height: this.element[0].offsetHeight,
                    });
            }),
            this._addToManager(i.scope),
            i.addClasses && this._addClass("ui-droppable");
        },
        _addToManager: function (e) {
          (t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || []),
            t.ui.ddmanager.droppables[e].push(this);
        },
        _splice: function (t) {
          for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1);
        },
        _destroy: function () {
          var e = t.ui.ddmanager.droppables[this.options.scope];
          this._splice(e);
        },
        _setOption: function (e, i) {
          if ("accept" === e)
            this.accept = t.isFunction(i)
              ? i
              : function (t) {
                  return t.is(i);
                };
          else if ("scope" === e) {
            var s = t.ui.ddmanager.droppables[this.options.scope];
            this._splice(s), this._addToManager(i);
          }
          this._super(e, i);
        },
        _activate: function (e) {
          var i = t.ui.ddmanager.current;
          this._addActiveClass(), i && this._trigger("activate", e, this.ui(i));
        },
        _deactivate: function (e) {
          var i = t.ui.ddmanager.current;
          this._removeActiveClass(),
            i && this._trigger("deactivate", e, this.ui(i));
        },
        _over: function (e) {
          var i = t.ui.ddmanager.current;
          i &&
            (i.currentItem || i.element)[0] !== this.element[0] &&
            this.accept.call(this.element[0], i.currentItem || i.element) &&
            (this._addHoverClass(), this._trigger("over", e, this.ui(i)));
        },
        _out: function (e) {
          var i = t.ui.ddmanager.current;
          i &&
            (i.currentItem || i.element)[0] !== this.element[0] &&
            this.accept.call(this.element[0], i.currentItem || i.element) &&
            (this._removeHoverClass(), this._trigger("out", e, this.ui(i)));
        },
        _drop: function (e, i) {
          var s = i || t.ui.ddmanager.current,
            n = !1;
          return (
            !!s &&
            (s.currentItem || s.element)[0] !== this.element[0] &&
            (this.element
              .find(":data(ui-droppable)")
              .not(".ui-draggable-dragging")
              .each(function () {
                var i = t(this).droppable("instance");
                return i.options.greedy &&
                  !i.options.disabled &&
                  i.options.scope === s.options.scope &&
                  i.accept.call(i.element[0], s.currentItem || s.element) &&
                  g(
                    s,
                    t.extend(i, { offset: i.element.offset() }),
                    i.options.tolerance,
                    e
                  )
                  ? ((n = !0), !1)
                  : void 0;
              }),
            !n &&
              !!this.accept.call(this.element[0], s.currentItem || s.element) &&
              (this._removeActiveClass(),
              this._removeHoverClass(),
              this._trigger("drop", e, this.ui(s)),
              this.element))
          );
        },
        ui: function (t) {
          return {
            draggable: t.currentItem || t.element,
            helper: t.helper,
            position: t.position,
            offset: t.positionAbs,
          };
        },
        _addHoverClass: function () {
          this._addClass("ui-droppable-hover");
        },
        _removeHoverClass: function () {
          this._removeClass("ui-droppable-hover");
        },
        _addActiveClass: function () {
          this._addClass("ui-droppable-active");
        },
        _removeActiveClass: function () {
          this._removeClass("ui-droppable-active");
        },
      });
    var g = (t.ui.intersect = (function () {
      function t(t, e, i) {
        return t >= e && e + i > t;
      }
      return function (e, i, s, n) {
        if (!i.offset) return !1;
        var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
          r = (e.positionAbs || e.position.absolute).top + e.margins.top,
          a = o + e.helperProportions.width,
          l = r + e.helperProportions.height,
          h = i.offset.left,
          c = i.offset.top,
          u = h + i.proportions().width,
          d = c + i.proportions().height;
        switch (s) {
          case "fit":
            return o >= h && u >= a && r >= c && d >= l;
          case "intersect":
            return (
              o + e.helperProportions.width / 2 > h &&
              u > a - e.helperProportions.width / 2 &&
              r + e.helperProportions.height / 2 > c &&
              d > l - e.helperProportions.height / 2
            );
          case "pointer":
            return (
              t(n.pageY, c, i.proportions().height) &&
              t(n.pageX, h, i.proportions().width)
            );
          case "touch":
            return (
              ((r >= c && d >= r) || (l >= c && d >= l) || (c > r && l > d)) &&
              ((o >= h && u >= o) || (a >= h && u >= a) || (h > o && a > u))
            );
          default:
            return !1;
        }
      };
    })());
    (t.ui.ddmanager = {
      current: null,
      droppables: { default: [] },
      prepareOffsets: function (e, i) {
        var s,
          n,
          o = t.ui.ddmanager.droppables[e.options.scope] || [],
          r = i ? i.type : null,
          a = (e.currentItem || e.element)
            .find(":data(ui-droppable)")
            .addBack();
        t: for (s = 0; o.length > s; s++)
          if (
            !(
              o[s].options.disabled ||
              (e &&
                !o[s].accept.call(o[s].element[0], e.currentItem || e.element))
            )
          ) {
            for (n = 0; a.length > n; n++)
              if (a[n] === o[s].element[0]) {
                o[s].proportions().height = 0;
                continue t;
              }
            (o[s].visible = "none" !== o[s].element.css("display")),
              o[s].visible &&
                ("mousedown" === r && o[s]._activate.call(o[s], i),
                (o[s].offset = o[s].element.offset()),
                o[s].proportions({
                  width: o[s].element[0].offsetWidth,
                  height: o[s].element[0].offsetHeight,
                }));
          }
      },
      drop: function (e, i) {
        var s = !1;
        return (
          t.each(
            (t.ui.ddmanager.droppables[e.options.scope] || []).slice(),
            function () {
              this.options &&
                (!this.options.disabled &&
                  this.visible &&
                  g(e, this, this.options.tolerance, i) &&
                  (s = this._drop.call(this, i) || s),
                !this.options.disabled &&
                  this.visible &&
                  this.accept.call(
                    this.element[0],
                    e.currentItem || e.element
                  ) &&
                  ((this.isout = !0),
                  (this.isover = !1),
                  this._deactivate.call(this, i)));
            }
          ),
          s
        );
      },
      dragStart: function (e, i) {
        e.element.parentsUntil("body").on("scroll.droppable", function () {
          e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
        });
      },
      drag: function (e, i) {
        e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
          t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
            if (!this.options.disabled && !this.greedyChild && this.visible) {
              var s,
                n,
                o,
                r = g(e, this, this.options.tolerance, i),
                a =
                  !r && this.isover
                    ? "isout"
                    : r && !this.isover
                    ? "isover"
                    : null;
              a &&
                (this.options.greedy &&
                  ((n = this.options.scope),
                  (o = this.element
                    .parents(":data(ui-droppable)")
                    .filter(function () {
                      return t(this).droppable("instance").options.scope === n;
                    })).length &&
                    ((s = t(o[0]).droppable("instance")).greedyChild =
                      "isover" === a)),
                s &&
                  "isover" === a &&
                  ((s.isover = !1), (s.isout = !0), s._out.call(s, i)),
                (this[a] = !0),
                (this["isout" === a ? "isover" : "isout"] = !1),
                this["isover" === a ? "_over" : "_out"].call(this, i),
                s &&
                  "isout" === a &&
                  ((s.isout = !1), (s.isover = !0), s._over.call(s, i)));
            }
          });
      },
      dragStop: function (e, i) {
        e.element.parentsUntil("body").off("scroll.droppable"),
          e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
      },
    }),
      !1 !== t.uiBackCompat &&
        t.widget("ui.droppable", t.ui.droppable, {
          options: { hoverClass: !1, activeClass: !1 },
          _addActiveClass: function () {
            this._super(),
              this.options.activeClass &&
                this.element.addClass(this.options.activeClass);
          },
          _removeActiveClass: function () {
            this._super(),
              this.options.activeClass &&
                this.element.removeClass(this.options.activeClass);
          },
          _addHoverClass: function () {
            this._super(),
              this.options.hoverClass &&
                this.element.addClass(this.options.hoverClass);
          },
          _removeHoverClass: function () {
            this._super(),
              this.options.hoverClass &&
                this.element.removeClass(this.options.hoverClass);
          },
        }),
      t.ui.droppable,
      t.widget("ui.resizable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "resize",
        options: {
          alsoResize: !1,
          animate: !1,
          animateDuration: "slow",
          animateEasing: "swing",
          aspectRatio: !1,
          autoHide: !1,
          classes: {
            "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se",
          },
          containment: !1,
          ghost: !1,
          grid: !1,
          handles: "e,s,se",
          helper: !1,
          maxHeight: null,
          maxWidth: null,
          minHeight: 10,
          minWidth: 10,
          zIndex: 90,
          resize: null,
          start: null,
          stop: null,
        },
        _num: function (t) {
          return parseFloat(t) || 0;
        },
        _isNumber: function (t) {
          return !isNaN(parseFloat(t));
        },
        _hasScroll: function (e, i) {
          if ("hidden" === t(e).css("overflow")) return !1;
          var s = i && "left" === i ? "scrollLeft" : "scrollTop",
            n = !1;
          return e[s] > 0 || ((e[s] = 1), (n = e[s] > 0), (e[s] = 0), n);
        },
        _create: function () {
          var e,
            i = this.options,
            s = this;
          this._addClass("ui-resizable"),
            t.extend(this, {
              _aspectRatio: !!i.aspectRatio,
              aspectRatio: i.aspectRatio,
              originalElement: this.element,
              _proportionallyResizeElements: [],
              _helper:
                i.helper || i.ghost || i.animate
                  ? i.helper || "ui-resizable-helper"
                  : null,
            }),
            this.element[0].nodeName.match(
              /^(canvas|textarea|input|select|button|img)$/i
            ) &&
              (this.element.wrap(
                t(
                  "<div class='ui-wrapper' style='overflow: hidden;'></div>"
                ).css({
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left"),
                })
              ),
              (this.element = this.element
                .parent()
                .data("ui-resizable", this.element.resizable("instance"))),
              (this.elementIsWrapper = !0),
              (e = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft"),
              }),
              this.element.css(e),
              this.originalElement.css("margin", 0),
              (this.originalResizeStyle = this.originalElement.css("resize")),
              this.originalElement.css("resize", "none"),
              this._proportionallyResizeElements.push(
                this.originalElement.css({
                  position: "static",
                  zoom: 1,
                  display: "block",
                })
              ),
              this.originalElement.css(e),
              this._proportionallyResize()),
            this._setupHandles(),
            i.autoHide &&
              t(this.element)
                .on("mouseenter", function () {
                  i.disabled ||
                    (s._removeClass("ui-resizable-autohide"),
                    s._handles.show());
                })
                .on("mouseleave", function () {
                  i.disabled ||
                    s.resizing ||
                    (s._addClass("ui-resizable-autohide"), s._handles.hide());
                }),
            this._mouseInit();
        },
        _destroy: function () {
          this._mouseDestroy();
          var e,
            i = function (e) {
              t(e)
                .removeData("resizable")
                .removeData("ui-resizable")
                .off(".resizable")
                .find(".ui-resizable-handle")
                .remove();
            };
          return (
            this.elementIsWrapper &&
              (i(this.element),
              (e = this.element),
              this.originalElement
                .css({
                  position: e.css("position"),
                  width: e.outerWidth(),
                  height: e.outerHeight(),
                  top: e.css("top"),
                  left: e.css("left"),
                })
                .insertAfter(e),
              e.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            i(this.originalElement),
            this
          );
        },
        _setOption: function (t, e) {
          this._super(t, e),
            "handles" === t && (this._removeHandles(), this._setupHandles());
        },
        _setupHandles: function () {
          var e,
            i,
            s,
            n,
            o,
            r = this.options,
            a = this;
          if (
            ((this.handles =
              r.handles ||
              (t(".ui-resizable-handle", this.element).length
                ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw",
                  }
                : "e,s,se")),
            (this._handles = t()),
            this.handles.constructor === String)
          )
            for (
              "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                s = this.handles.split(","),
                this.handles = {},
                i = 0;
              s.length > i;
              i++
            )
              (n = "ui-resizable-" + (e = t.trim(s[i]))),
                (o = t("<div>")),
                this._addClass(o, "ui-resizable-handle " + n),
                o.css({ zIndex: r.zIndex }),
                (this.handles[e] = ".ui-resizable-" + e),
                this.element.append(o);
          (this._renderAxis = function (e) {
            var i, s, n, o;
            for (i in ((e = e || this.element), this.handles))
              this.handles[i].constructor === String
                ? (this.handles[i] = this.element
                    .children(this.handles[i])
                    .first()
                    .show())
                : (this.handles[i].jquery || this.handles[i].nodeType) &&
                  ((this.handles[i] = t(this.handles[i])),
                  this._on(this.handles[i], { mousedown: a._mouseDown })),
                this.elementIsWrapper &&
                  this.originalElement[0].nodeName.match(
                    /^(textarea|input|select|button)$/i
                  ) &&
                  ((s = t(this.handles[i], this.element)),
                  (o = /sw|ne|nw|se|n|s/.test(i)
                    ? s.outerHeight()
                    : s.outerWidth()),
                  (n = [
                    "padding",
                    /ne|nw|n/.test(i)
                      ? "Top"
                      : /se|sw|s/.test(i)
                      ? "Bottom"
                      : /^e$/.test(i)
                      ? "Right"
                      : "Left",
                  ].join("")),
                  e.css(n, o),
                  this._proportionallyResize()),
                (this._handles = this._handles.add(this.handles[i]));
          }),
            this._renderAxis(this.element),
            (this._handles = this._handles.add(
              this.element.find(".ui-resizable-handle")
            )),
            this._handles.disableSelection(),
            this._handles.on("mouseover", function () {
              a.resizing ||
                (this.className &&
                  (o = this.className.match(
                    /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                  )),
                (a.axis = o && o[1] ? o[1] : "se"));
            }),
            r.autoHide &&
              (this._handles.hide(), this._addClass("ui-resizable-autohide"));
        },
        _removeHandles: function () {
          this._handles.remove();
        },
        _mouseCapture: function (e) {
          var i,
            s,
            n = !1;
          for (i in this.handles)
            ((s = t(this.handles[i])[0]) === e.target ||
              t.contains(s, e.target)) &&
              (n = !0);
          return !this.options.disabled && n;
        },
        _mouseStart: function (e) {
          var i,
            s,
            n,
            o = this.options,
            r = this.element;
          return (
            (this.resizing = !0),
            this._renderProxy(),
            (i = this._num(this.helper.css("left"))),
            (s = this._num(this.helper.css("top"))),
            o.containment &&
              ((i += t(o.containment).scrollLeft() || 0),
              (s += t(o.containment).scrollTop() || 0)),
            (this.offset = this.helper.offset()),
            (this.position = { left: i, top: s }),
            (this.size = this._helper
              ? { width: this.helper.width(), height: this.helper.height() }
              : { width: r.width(), height: r.height() }),
            (this.originalSize = this._helper
              ? { width: r.outerWidth(), height: r.outerHeight() }
              : { width: r.width(), height: r.height() }),
            (this.sizeDiff = {
              width: r.outerWidth() - r.width(),
              height: r.outerHeight() - r.height(),
            }),
            (this.originalPosition = { left: i, top: s }),
            (this.originalMousePosition = { left: e.pageX, top: e.pageY }),
            (this.aspectRatio =
              "number" == typeof o.aspectRatio
                ? o.aspectRatio
                : this.originalSize.width / this.originalSize.height || 1),
            (n = t(".ui-resizable-" + this.axis).css("cursor")),
            t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n),
            this._addClass("ui-resizable-resizing"),
            this._propagate("start", e),
            !0
          );
        },
        _mouseDrag: function (e) {
          var i,
            s,
            n = this.originalMousePosition,
            o = this.axis,
            r = e.pageX - n.left || 0,
            a = e.pageY - n.top || 0,
            l = this._change[o];
          return (
            this._updatePrevProperties(),
            !!l &&
              ((i = l.apply(this, [e, r, a])),
              this._updateVirtualBoundaries(e.shiftKey),
              (this._aspectRatio || e.shiftKey) &&
                (i = this._updateRatio(i, e)),
              (i = this._respectSize(i, e)),
              this._updateCache(i),
              this._propagate("resize", e),
              (s = this._applyChanges()),
              !this._helper &&
                this._proportionallyResizeElements.length &&
                this._proportionallyResize(),
              t.isEmptyObject(s) ||
                (this._updatePrevProperties(),
                this._trigger("resize", e, this.ui()),
                this._applyChanges()),
              !1)
          );
        },
        _mouseStop: function (e) {
          this.resizing = !1;
          var i,
            s,
            n,
            o,
            r,
            a,
            l,
            h = this.options;
          return (
            this._helper &&
              ((n =
                (s =
                  (i = this._proportionallyResizeElements).length &&
                  /textarea/i.test(i[0].nodeName)) &&
                this._hasScroll(i[0], "left")
                  ? 0
                  : this.sizeDiff.height),
              (o = s ? 0 : this.sizeDiff.width),
              (r = {
                width: this.helper.width() - o,
                height: this.helper.height() - n,
              }),
              (a =
                parseFloat(this.element.css("left")) +
                  (this.position.left - this.originalPosition.left) || null),
              (l =
                parseFloat(this.element.css("top")) +
                  (this.position.top - this.originalPosition.top) || null),
              h.animate || this.element.css(t.extend(r, { top: l, left: a })),
              this.helper.height(this.size.height),
              this.helper.width(this.size.width),
              this._helper && !h.animate && this._proportionallyResize()),
            t("body").css("cursor", "auto"),
            this._removeClass("ui-resizable-resizing"),
            this._propagate("stop", e),
            this._helper && this.helper.remove(),
            !1
          );
        },
        _updatePrevProperties: function () {
          (this.prevPosition = {
            top: this.position.top,
            left: this.position.left,
          }),
            (this.prevSize = {
              width: this.size.width,
              height: this.size.height,
            });
        },
        _applyChanges: function () {
          var t = {};
          return (
            this.position.top !== this.prevPosition.top &&
              (t.top = this.position.top + "px"),
            this.position.left !== this.prevPosition.left &&
              (t.left = this.position.left + "px"),
            this.size.width !== this.prevSize.width &&
              (t.width = this.size.width + "px"),
            this.size.height !== this.prevSize.height &&
              (t.height = this.size.height + "px"),
            this.helper.css(t),
            t
          );
        },
        _updateVirtualBoundaries: function (t) {
          var e,
            i,
            s,
            n,
            o,
            r = this.options;
          (o = {
            minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
            maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0,
            minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
            maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0,
          }),
            (this._aspectRatio || t) &&
              ((e = o.minHeight * this.aspectRatio),
              (s = o.minWidth / this.aspectRatio),
              (i = o.maxHeight * this.aspectRatio),
              (n = o.maxWidth / this.aspectRatio),
              e > o.minWidth && (o.minWidth = e),
              s > o.minHeight && (o.minHeight = s),
              o.maxWidth > i && (o.maxWidth = i),
              o.maxHeight > n && (o.maxHeight = n)),
            (this._vBoundaries = o);
        },
        _updateCache: function (t) {
          (this.offset = this.helper.offset()),
            this._isNumber(t.left) && (this.position.left = t.left),
            this._isNumber(t.top) && (this.position.top = t.top),
            this._isNumber(t.height) && (this.size.height = t.height),
            this._isNumber(t.width) && (this.size.width = t.width);
        },
        _updateRatio: function (t) {
          var e = this.position,
            i = this.size,
            s = this.axis;
          return (
            this._isNumber(t.height)
              ? (t.width = t.height * this.aspectRatio)
              : this._isNumber(t.width) &&
                (t.height = t.width / this.aspectRatio),
            "sw" === s &&
              ((t.left = e.left + (i.width - t.width)), (t.top = null)),
            "nw" === s &&
              ((t.top = e.top + (i.height - t.height)),
              (t.left = e.left + (i.width - t.width))),
            t
          );
        },
        _respectSize: function (t) {
          var e = this._vBoundaries,
            i = this.axis,
            s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
            n =
              this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
            o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
            r =
              this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
            a = this.originalPosition.left + this.originalSize.width,
            l = this.originalPosition.top + this.originalSize.height,
            h = /sw|nw|w/.test(i),
            c = /nw|ne|n/.test(i);
          return (
            o && (t.width = e.minWidth),
            r && (t.height = e.minHeight),
            s && (t.width = e.maxWidth),
            n && (t.height = e.maxHeight),
            o && h && (t.left = a - e.minWidth),
            s && h && (t.left = a - e.maxWidth),
            r && c && (t.top = l - e.minHeight),
            n && c && (t.top = l - e.maxHeight),
            t.width || t.height || t.left || !t.top
              ? t.width || t.height || t.top || !t.left || (t.left = null)
              : (t.top = null),
            t
          );
        },
        _getPaddingPlusBorderDimensions: function (t) {
          for (
            var e = 0,
              i = [],
              s = [
                t.css("borderTopWidth"),
                t.css("borderRightWidth"),
                t.css("borderBottomWidth"),
                t.css("borderLeftWidth"),
              ],
              n = [
                t.css("paddingTop"),
                t.css("paddingRight"),
                t.css("paddingBottom"),
                t.css("paddingLeft"),
              ];
            4 > e;
            e++
          )
            (i[e] = parseFloat(s[e]) || 0), (i[e] += parseFloat(n[e]) || 0);
          return { height: i[0] + i[2], width: i[1] + i[3] };
        },
        _proportionallyResize: function () {
          if (this._proportionallyResizeElements.length)
            for (
              var t, e = 0, i = this.helper || this.element;
              this._proportionallyResizeElements.length > e;
              e++
            )
              (t = this._proportionallyResizeElements[e]),
                this.outerDimensions ||
                  (this.outerDimensions =
                    this._getPaddingPlusBorderDimensions(t)),
                t.css({
                  height: i.height() - this.outerDimensions.height || 0,
                  width: i.width() - this.outerDimensions.width || 0,
                });
        },
        _renderProxy: function () {
          var e = this.element,
            i = this.options;
          (this.elementOffset = e.offset()),
            this._helper
              ? ((this.helper =
                  this.helper || t("<div style='overflow:hidden;'></div>")),
                this._addClass(this.helper, this._helper),
                this.helper.css({
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  position: "absolute",
                  left: this.elementOffset.left + "px",
                  top: this.elementOffset.top + "px",
                  zIndex: ++i.zIndex,
                }),
                this.helper.appendTo("body").disableSelection())
              : (this.helper = this.element);
        },
        _change: {
          e: function (t, e) {
            return { width: this.originalSize.width + e };
          },
          w: function (t, e) {
            var i = this.originalSize;
            return { left: this.originalPosition.left + e, width: i.width - e };
          },
          n: function (t, e, i) {
            var s = this.originalSize;
            return { top: this.originalPosition.top + i, height: s.height - i };
          },
          s: function (t, e, i) {
            return { height: this.originalSize.height + i };
          },
          se: function (e, i, s) {
            return t.extend(
              this._change.s.apply(this, arguments),
              this._change.e.apply(this, [e, i, s])
            );
          },
          sw: function (e, i, s) {
            return t.extend(
              this._change.s.apply(this, arguments),
              this._change.w.apply(this, [e, i, s])
            );
          },
          ne: function (e, i, s) {
            return t.extend(
              this._change.n.apply(this, arguments),
              this._change.e.apply(this, [e, i, s])
            );
          },
          nw: function (e, i, s) {
            return t.extend(
              this._change.n.apply(this, arguments),
              this._change.w.apply(this, [e, i, s])
            );
          },
        },
        _propagate: function (e, i) {
          t.ui.plugin.call(this, e, [i, this.ui()]),
            "resize" !== e && this._trigger(e, i, this.ui());
        },
        plugins: {},
        ui: function () {
          return {
            originalElement: this.originalElement,
            element: this.element,
            helper: this.helper,
            position: this.position,
            size: this.size,
            originalSize: this.originalSize,
            originalPosition: this.originalPosition,
          };
        },
      }),
      t.ui.plugin.add("resizable", "animate", {
        stop: function (e) {
          var i = t(this).resizable("instance"),
            s = i.options,
            n = i._proportionallyResizeElements,
            o = n.length && /textarea/i.test(n[0].nodeName),
            r = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
            a = o ? 0 : i.sizeDiff.width,
            l = { width: i.size.width - a, height: i.size.height - r },
            h =
              parseFloat(i.element.css("left")) +
                (i.position.left - i.originalPosition.left) || null,
            c =
              parseFloat(i.element.css("top")) +
                (i.position.top - i.originalPosition.top) || null;
          i.element.animate(t.extend(l, c && h ? { top: c, left: h } : {}), {
            duration: s.animateDuration,
            easing: s.animateEasing,
            step: function () {
              var s = {
                width: parseFloat(i.element.css("width")),
                height: parseFloat(i.element.css("height")),
                top: parseFloat(i.element.css("top")),
                left: parseFloat(i.element.css("left")),
              };
              n &&
                n.length &&
                t(n[0]).css({ width: s.width, height: s.height }),
                i._updateCache(s),
                i._propagate("resize", e);
            },
          });
        },
      }),
      t.ui.plugin.add("resizable", "containment", {
        start: function () {
          var e,
            i,
            s,
            n,
            o,
            r,
            a,
            l = t(this).resizable("instance"),
            h = l.options,
            c = l.element,
            u = h.containment,
            d =
              u instanceof t
                ? u.get(0)
                : /parent/.test(u)
                ? c.parent().get(0)
                : u;
          d &&
            ((l.containerElement = t(d)),
            /document/.test(u) || u === document
              ? ((l.containerOffset = { left: 0, top: 0 }),
                (l.containerPosition = { left: 0, top: 0 }),
                (l.parentData = {
                  element: t(document),
                  left: 0,
                  top: 0,
                  width: t(document).width(),
                  height:
                    t(document).height() ||
                    document.body.parentNode.scrollHeight,
                }))
              : ((e = t(d)),
                (i = []),
                t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
                  i[t] = l._num(e.css("padding" + s));
                }),
                (l.containerOffset = e.offset()),
                (l.containerPosition = e.position()),
                (l.containerSize = {
                  height: e.innerHeight() - i[3],
                  width: e.innerWidth() - i[1],
                }),
                (s = l.containerOffset),
                (n = l.containerSize.height),
                (o = l.containerSize.width),
                (r = l._hasScroll(d, "left") ? d.scrollWidth : o),
                (a = l._hasScroll(d) ? d.scrollHeight : n),
                (l.parentData = {
                  element: d,
                  left: s.left,
                  top: s.top,
                  width: r,
                  height: a,
                })));
        },
        resize: function (e) {
          var i,
            s,
            n,
            o,
            r = t(this).resizable("instance"),
            a = r.options,
            l = r.containerOffset,
            h = r.position,
            c = r._aspectRatio || e.shiftKey,
            u = { top: 0, left: 0 },
            d = r.containerElement,
            p = !0;
          d[0] !== document && /static/.test(d.css("position")) && (u = l),
            h.left < (r._helper ? l.left : 0) &&
              ((r.size.width =
                r.size.width +
                (r._helper
                  ? r.position.left - l.left
                  : r.position.left - u.left)),
              c && ((r.size.height = r.size.width / r.aspectRatio), (p = !1)),
              (r.position.left = a.helper ? l.left : 0)),
            h.top < (r._helper ? l.top : 0) &&
              ((r.size.height =
                r.size.height +
                (r._helper ? r.position.top - l.top : r.position.top)),
              c && ((r.size.width = r.size.height * r.aspectRatio), (p = !1)),
              (r.position.top = r._helper ? l.top : 0)),
            (n = r.containerElement.get(0) === r.element.parent().get(0)),
            (o = /relative|absolute/.test(r.containerElement.css("position"))),
            n && o
              ? ((r.offset.left = r.parentData.left + r.position.left),
                (r.offset.top = r.parentData.top + r.position.top))
              : ((r.offset.left = r.element.offset().left),
                (r.offset.top = r.element.offset().top)),
            (i = Math.abs(
              r.sizeDiff.width +
                (r._helper ? r.offset.left - u.left : r.offset.left - l.left)
            )),
            (s = Math.abs(
              r.sizeDiff.height +
                (r._helper ? r.offset.top - u.top : r.offset.top - l.top)
            )),
            i + r.size.width >= r.parentData.width &&
              ((r.size.width = r.parentData.width - i),
              c && ((r.size.height = r.size.width / r.aspectRatio), (p = !1))),
            s + r.size.height >= r.parentData.height &&
              ((r.size.height = r.parentData.height - s),
              c && ((r.size.width = r.size.height * r.aspectRatio), (p = !1))),
            p ||
              ((r.position.left = r.prevPosition.left),
              (r.position.top = r.prevPosition.top),
              (r.size.width = r.prevSize.width),
              (r.size.height = r.prevSize.height));
        },
        stop: function () {
          var e = t(this).resizable("instance"),
            i = e.options,
            s = e.containerOffset,
            n = e.containerPosition,
            o = e.containerElement,
            r = t(e.helper),
            a = r.offset(),
            l = r.outerWidth() - e.sizeDiff.width,
            h = r.outerHeight() - e.sizeDiff.height;
          e._helper &&
            !i.animate &&
            /relative/.test(o.css("position")) &&
            t(this).css({
              left: a.left - n.left - s.left,
              width: l,
              height: h,
            }),
            e._helper &&
              !i.animate &&
              /static/.test(o.css("position")) &&
              t(this).css({
                left: a.left - n.left - s.left,
                width: l,
                height: h,
              });
        },
      }),
      t.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
          var e = t(this).resizable("instance").options;
          t(e.alsoResize).each(function () {
            var e = t(this);
            e.data("ui-resizable-alsoresize", {
              width: parseFloat(e.width()),
              height: parseFloat(e.height()),
              left: parseFloat(e.css("left")),
              top: parseFloat(e.css("top")),
            });
          });
        },
        resize: function (e, i) {
          var s = t(this).resizable("instance"),
            n = s.options,
            o = s.originalSize,
            r = s.originalPosition,
            a = {
              height: s.size.height - o.height || 0,
              width: s.size.width - o.width || 0,
              top: s.position.top - r.top || 0,
              left: s.position.left - r.left || 0,
            };
          t(n.alsoResize).each(function () {
            var e = t(this),
              s = t(this).data("ui-resizable-alsoresize"),
              n = {},
              o = e.parents(i.originalElement[0]).length
                ? ["width", "height"]
                : ["width", "height", "top", "left"];
            t.each(o, function (t, e) {
              var i = (s[e] || 0) + (a[e] || 0);
              i && i >= 0 && (n[e] = i || null);
            }),
              e.css(n);
          });
        },
        stop: function () {
          t(this).removeData("ui-resizable-alsoresize");
        },
      }),
      t.ui.plugin.add("resizable", "ghost", {
        start: function () {
          var e = t(this).resizable("instance"),
            i = e.size;
          (e.ghost = e.originalElement.clone()),
            e.ghost.css({
              opacity: 0.25,
              display: "block",
              position: "relative",
              height: i.height,
              width: i.width,
              margin: 0,
              left: 0,
              top: 0,
            }),
            e._addClass(e.ghost, "ui-resizable-ghost"),
            !1 !== t.uiBackCompat &&
              "string" == typeof e.options.ghost &&
              e.ghost.addClass(this.options.ghost),
            e.ghost.appendTo(e.helper);
        },
        resize: function () {
          var e = t(this).resizable("instance");
          e.ghost &&
            e.ghost.css({
              position: "relative",
              height: e.size.height,
              width: e.size.width,
            });
        },
        stop: function () {
          var e = t(this).resizable("instance");
          e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
        },
      }),
      t.ui.plugin.add("resizable", "grid", {
        resize: function () {
          var e,
            i = t(this).resizable("instance"),
            s = i.options,
            n = i.size,
            o = i.originalSize,
            r = i.originalPosition,
            a = i.axis,
            l = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
            h = l[0] || 1,
            c = l[1] || 1,
            u = Math.round((n.width - o.width) / h) * h,
            d = Math.round((n.height - o.height) / c) * c,
            p = o.width + u,
            f = o.height + d,
            g = s.maxWidth && p > s.maxWidth,
            m = s.maxHeight && f > s.maxHeight,
            v = s.minWidth && s.minWidth > p,
            b = s.minHeight && s.minHeight > f;
          (s.grid = l),
            v && (p += h),
            b && (f += c),
            g && (p -= h),
            m && (f -= c),
            /^(se|s|e)$/.test(a)
              ? ((i.size.width = p), (i.size.height = f))
              : /^(ne)$/.test(a)
              ? ((i.size.width = p),
                (i.size.height = f),
                (i.position.top = r.top - d))
              : /^(sw)$/.test(a)
              ? ((i.size.width = p),
                (i.size.height = f),
                (i.position.left = r.left - u))
              : ((0 >= f - c || 0 >= p - h) &&
                  (e = i._getPaddingPlusBorderDimensions(this)),
                f - c > 0
                  ? ((i.size.height = f), (i.position.top = r.top - d))
                  : ((f = c - e.height),
                    (i.size.height = f),
                    (i.position.top = r.top + o.height - f)),
                p - h > 0
                  ? ((i.size.width = p), (i.position.left = r.left - u))
                  : ((p = h - e.width),
                    (i.size.width = p),
                    (i.position.left = r.left + o.width - p)));
        },
      }),
      t.ui.resizable,
      t.widget("ui.selectable", t.ui.mouse, {
        version: "1.12.1",
        options: {
          appendTo: "body",
          autoRefresh: !0,
          distance: 0,
          filter: "*",
          tolerance: "touch",
          selected: null,
          selecting: null,
          start: null,
          stop: null,
          unselected: null,
          unselecting: null,
        },
        _create: function () {
          var e = this;
          this._addClass("ui-selectable"),
            (this.dragged = !1),
            (this.refresh = function () {
              (e.elementPos = t(e.element[0]).offset()),
                (e.selectees = t(e.options.filter, e.element[0])),
                e._addClass(e.selectees, "ui-selectee"),
                e.selectees.each(function () {
                  var i = t(this),
                    s = i.offset(),
                    n = {
                      left: s.left - e.elementPos.left,
                      top: s.top - e.elementPos.top,
                    };
                  t.data(this, "selectable-item", {
                    element: this,
                    $element: i,
                    left: n.left,
                    top: n.top,
                    right: n.left + i.outerWidth(),
                    bottom: n.top + i.outerHeight(),
                    startselected: !1,
                    selected: i.hasClass("ui-selected"),
                    selecting: i.hasClass("ui-selecting"),
                    unselecting: i.hasClass("ui-unselecting"),
                  });
                });
            }),
            this.refresh(),
            this._mouseInit(),
            (this.helper = t("<div>")),
            this._addClass(this.helper, "ui-selectable-helper");
        },
        _destroy: function () {
          this.selectees.removeData("selectable-item"), this._mouseDestroy();
        },
        _mouseStart: function (e) {
          var i = this,
            s = this.options;
          (this.opos = [e.pageX, e.pageY]),
            (this.elementPos = t(this.element[0]).offset()),
            this.options.disabled ||
              ((this.selectees = t(s.filter, this.element[0])),
              this._trigger("start", e),
              t(s.appendTo).append(this.helper),
              this.helper.css({
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0,
              }),
              s.autoRefresh && this.refresh(),
              this.selectees.filter(".ui-selected").each(function () {
                var s = t.data(this, "selectable-item");
                (s.startselected = !0),
                  e.metaKey ||
                    e.ctrlKey ||
                    (i._removeClass(s.$element, "ui-selected"),
                    (s.selected = !1),
                    i._addClass(s.$element, "ui-unselecting"),
                    (s.unselecting = !0),
                    i._trigger("unselecting", e, { unselecting: s.element }));
              }),
              t(e.target)
                .parents()
                .addBack()
                .each(function () {
                  var s,
                    n = t.data(this, "selectable-item");
                  return n
                    ? ((s =
                        (!e.metaKey && !e.ctrlKey) ||
                        !n.$element.hasClass("ui-selected")),
                      i
                        ._removeClass(
                          n.$element,
                          s ? "ui-unselecting" : "ui-selected"
                        )
                        ._addClass(
                          n.$element,
                          s ? "ui-selecting" : "ui-unselecting"
                        ),
                      (n.unselecting = !s),
                      (n.selecting = s),
                      (n.selected = s),
                      s
                        ? i._trigger("selecting", e, { selecting: n.element })
                        : i._trigger("unselecting", e, {
                            unselecting: n.element,
                          }),
                      !1)
                    : void 0;
                }));
        },
        _mouseDrag: function (e) {
          if (((this.dragged = !0), !this.options.disabled)) {
            var i,
              s = this,
              n = this.options,
              o = this.opos[0],
              r = this.opos[1],
              a = e.pageX,
              l = e.pageY;
            return (
              o > a && ((i = a), (a = o), (o = i)),
              r > l && ((i = l), (l = r), (r = i)),
              this.helper.css({ left: o, top: r, width: a - o, height: l - r }),
              this.selectees.each(function () {
                var i = t.data(this, "selectable-item"),
                  h = !1,
                  c = {};
                i &&
                  i.element !== s.element[0] &&
                  ((c.left = i.left + s.elementPos.left),
                  (c.right = i.right + s.elementPos.left),
                  (c.top = i.top + s.elementPos.top),
                  (c.bottom = i.bottom + s.elementPos.top),
                  "touch" === n.tolerance
                    ? (h = !(
                        c.left > a ||
                        o > c.right ||
                        c.top > l ||
                        r > c.bottom
                      ))
                    : "fit" === n.tolerance &&
                      (h =
                        c.left > o && a > c.right && c.top > r && l > c.bottom),
                  h
                    ? (i.selected &&
                        (s._removeClass(i.$element, "ui-selected"),
                        (i.selected = !1)),
                      i.unselecting &&
                        (s._removeClass(i.$element, "ui-unselecting"),
                        (i.unselecting = !1)),
                      i.selecting ||
                        (s._addClass(i.$element, "ui-selecting"),
                        (i.selecting = !0),
                        s._trigger("selecting", e, { selecting: i.element })))
                    : (i.selecting &&
                        ((e.metaKey || e.ctrlKey) && i.startselected
                          ? (s._removeClass(i.$element, "ui-selecting"),
                            (i.selecting = !1),
                            s._addClass(i.$element, "ui-selected"),
                            (i.selected = !0))
                          : (s._removeClass(i.$element, "ui-selecting"),
                            (i.selecting = !1),
                            i.startselected &&
                              (s._addClass(i.$element, "ui-unselecting"),
                              (i.unselecting = !0)),
                            s._trigger("unselecting", e, {
                              unselecting: i.element,
                            }))),
                      i.selected &&
                        (e.metaKey ||
                          e.ctrlKey ||
                          i.startselected ||
                          (s._removeClass(i.$element, "ui-selected"),
                          (i.selected = !1),
                          s._addClass(i.$element, "ui-unselecting"),
                          (i.unselecting = !0),
                          s._trigger("unselecting", e, {
                            unselecting: i.element,
                          })))));
              }),
              !1
            );
          }
        },
        _mouseStop: function (e) {
          var i = this;
          return (
            (this.dragged = !1),
            t(".ui-unselecting", this.element[0]).each(function () {
              var s = t.data(this, "selectable-item");
              i._removeClass(s.$element, "ui-unselecting"),
                (s.unselecting = !1),
                (s.startselected = !1),
                i._trigger("unselected", e, { unselected: s.element });
            }),
            t(".ui-selecting", this.element[0]).each(function () {
              var s = t.data(this, "selectable-item");
              i
                ._removeClass(s.$element, "ui-selecting")
                ._addClass(s.$element, "ui-selected"),
                (s.selecting = !1),
                (s.selected = !0),
                (s.startselected = !0),
                i._trigger("selected", e, { selected: s.element });
            }),
            this._trigger("stop", e),
            this.helper.remove(),
            !1
          );
        },
      }),
      t.widget("ui.sortable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
          appendTo: "parent",
          axis: !1,
          connectWith: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          dropOnEmpty: !0,
          forcePlaceholderSize: !1,
          forceHelperSize: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          items: "> *",
          opacity: !1,
          placeholder: !1,
          revert: !1,
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          scope: "default",
          tolerance: "intersect",
          zIndex: 1e3,
          activate: null,
          beforeStop: null,
          change: null,
          deactivate: null,
          out: null,
          over: null,
          receive: null,
          remove: null,
          sort: null,
          start: null,
          stop: null,
          update: null,
        },
        _isOverAxis: function (t, e, i) {
          return t >= e && e + i > t;
        },
        _isFloating: function (t) {
          return (
            /left|right/.test(t.css("float")) ||
            /inline|table-cell/.test(t.css("display"))
          );
        },
        _create: function () {
          (this.containerCache = {}),
            this._addClass("ui-sortable"),
            this.refresh(),
            (this.offset = this.element.offset()),
            this._mouseInit(),
            this._setHandleClassName(),
            (this.ready = !0);
        },
        _setOption: function (t, e) {
          this._super(t, e), "handle" === t && this._setHandleClassName();
        },
        _setHandleClassName: function () {
          var e = this;
          this._removeClass(
            this.element.find(".ui-sortable-handle"),
            "ui-sortable-handle"
          ),
            t.each(this.items, function () {
              e._addClass(
                this.instance.options.handle
                  ? this.item.find(this.instance.options.handle)
                  : this.item,
                "ui-sortable-handle"
              );
            });
        },
        _destroy: function () {
          this._mouseDestroy();
          for (var t = this.items.length - 1; t >= 0; t--)
            this.items[t].item.removeData(this.widgetName + "-item");
          return this;
        },
        _mouseCapture: function (e, i) {
          var s = null,
            n = !1,
            o = this;
          return (
            !this.reverting &&
            !this.options.disabled &&
            "static" !== this.options.type &&
            (this._refreshItems(e),
            t(e.target)
              .parents()
              .each(function () {
                return t.data(this, o.widgetName + "-item") === o
                  ? ((s = t(this)), !1)
                  : void 0;
              }),
            t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)),
            !!s &&
              (!this.options.handle ||
                !!i ||
                (t(this.options.handle, s)
                  .find("*")
                  .addBack()
                  .each(function () {
                    this === e.target && (n = !0);
                  }),
                !!n)) &&
              ((this.currentItem = s), this._removeCurrentsFromItems(), !0))
          );
        },
        _mouseStart: function (e, i, s) {
          var n,
            o,
            r = this.options;
          if (
            ((this.currentContainer = this),
            this.refreshPositions(),
            (this.helper = this._createHelper(e)),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            (this.scrollParent = this.helper.scrollParent()),
            (this.offset = this.currentItem.offset()),
            (this.offset = {
              top: this.offset.top - this.margins.top,
              left: this.offset.left - this.margins.left,
            }),
            t.extend(this.offset, {
              click: {
                left: e.pageX - this.offset.left,
                top: e.pageY - this.offset.top,
              },
              parent: this._getParentOffset(),
              relative: this._getRelativeOffset(),
            }),
            this.helper.css("position", "absolute"),
            (this.cssPosition = this.helper.css("position")),
            (this.originalPosition = this._generatePosition(e)),
            (this.originalPageX = e.pageX),
            (this.originalPageY = e.pageY),
            r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt),
            (this.domPosition = {
              prev: this.currentItem.prev()[0],
              parent: this.currentItem.parent()[0],
            }),
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            r.containment && this._setContainment(),
            r.cursor &&
              "auto" !== r.cursor &&
              ((o = this.document.find("body")),
              (this.storedCursor = o.css("cursor")),
              o.css("cursor", r.cursor),
              (this.storedStylesheet = t(
                "<style>*{ cursor: " + r.cursor + " !important; }</style>"
              ).appendTo(o))),
            r.opacity &&
              (this.helper.css("opacity") &&
                (this._storedOpacity = this.helper.css("opacity")),
              this.helper.css("opacity", r.opacity)),
            r.zIndex &&
              (this.helper.css("zIndex") &&
                (this._storedZIndex = this.helper.css("zIndex")),
              this.helper.css("zIndex", r.zIndex)),
            this.scrollParent[0] !== this.document[0] &&
              "HTML" !== this.scrollParent[0].tagName &&
              (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", e, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !s)
          )
            for (n = this.containers.length - 1; n >= 0; n--)
              this.containers[n]._trigger("activate", e, this._uiHash(this));
          return (
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            t.ui.ddmanager &&
              !r.dropBehaviour &&
              t.ui.ddmanager.prepareOffsets(this, e),
            (this.dragging = !0),
            this._addClass(this.helper, "ui-sortable-helper"),
            this._mouseDrag(e),
            !0
          );
        },
        _mouseDrag: function (e) {
          var i,
            s,
            n,
            o,
            r = this.options,
            a = !1;
          for (
            this.position = this._generatePosition(e),
              this.positionAbs = this._convertPositionTo("absolute"),
              this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
              this.options.scroll &&
                (this.scrollParent[0] !== this.document[0] &&
                "HTML" !== this.scrollParent[0].tagName
                  ? (this.overflowOffset.top +
                      this.scrollParent[0].offsetHeight -
                      e.pageY <
                    r.scrollSensitivity
                      ? (this.scrollParent[0].scrollTop = a =
                          this.scrollParent[0].scrollTop + r.scrollSpeed)
                      : e.pageY - this.overflowOffset.top <
                          r.scrollSensitivity &&
                        (this.scrollParent[0].scrollTop = a =
                          this.scrollParent[0].scrollTop - r.scrollSpeed),
                    this.overflowOffset.left +
                      this.scrollParent[0].offsetWidth -
                      e.pageX <
                    r.scrollSensitivity
                      ? (this.scrollParent[0].scrollLeft = a =
                          this.scrollParent[0].scrollLeft + r.scrollSpeed)
                      : e.pageX - this.overflowOffset.left <
                          r.scrollSensitivity &&
                        (this.scrollParent[0].scrollLeft = a =
                          this.scrollParent[0].scrollLeft - r.scrollSpeed))
                  : (e.pageY - this.document.scrollTop() < r.scrollSensitivity
                      ? (a = this.document.scrollTop(
                          this.document.scrollTop() - r.scrollSpeed
                        ))
                      : this.window.height() -
                          (e.pageY - this.document.scrollTop()) <
                          r.scrollSensitivity &&
                        (a = this.document.scrollTop(
                          this.document.scrollTop() + r.scrollSpeed
                        )),
                    e.pageX - this.document.scrollLeft() < r.scrollSensitivity
                      ? (a = this.document.scrollLeft(
                          this.document.scrollLeft() - r.scrollSpeed
                        ))
                      : this.window.width() -
                          (e.pageX - this.document.scrollLeft()) <
                          r.scrollSensitivity &&
                        (a = this.document.scrollLeft(
                          this.document.scrollLeft() + r.scrollSpeed
                        ))),
                !1 !== a &&
                  t.ui.ddmanager &&
                  !r.dropBehaviour &&
                  t.ui.ddmanager.prepareOffsets(this, e)),
              this.positionAbs = this._convertPositionTo("absolute"),
              (this.options.axis && "y" === this.options.axis) ||
                (this.helper[0].style.left = this.position.left + "px"),
              (this.options.axis && "x" === this.options.axis) ||
                (this.helper[0].style.top = this.position.top + "px"),
              i = this.items.length - 1;
            i >= 0;
            i--
          )
            if (
              ((n = (s = this.items[i]).item[0]),
              (o = this._intersectsWithPointer(s)) &&
                s.instance === this.currentContainer &&
                n !== this.currentItem[0] &&
                this.placeholder[1 === o ? "next" : "prev"]()[0] !== n &&
                !t.contains(this.placeholder[0], n) &&
                ("semi-dynamic" !== this.options.type ||
                  !t.contains(this.element[0], n)))
            ) {
              if (
                ((this.direction = 1 === o ? "down" : "up"),
                "pointer" !== this.options.tolerance &&
                  !this._intersectsWithSides(s))
              )
                break;
              this._rearrange(e, s), this._trigger("change", e, this._uiHash());
              break;
            }
          return (
            this._contactContainers(e),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            this._trigger("sort", e, this._uiHash()),
            (this.lastPositionAbs = this.positionAbs),
            !1
          );
        },
        _mouseStop: function (e, i) {
          if (e) {
            if (
              (t.ui.ddmanager &&
                !this.options.dropBehaviour &&
                t.ui.ddmanager.drop(this, e),
              this.options.revert)
            ) {
              var s = this,
                n = this.placeholder.offset(),
                o = this.options.axis,
                r = {};
              (o && "x" !== o) ||
                (r.left =
                  n.left -
                  this.offset.parent.left -
                  this.margins.left +
                  (this.offsetParent[0] === this.document[0].body
                    ? 0
                    : this.offsetParent[0].scrollLeft)),
                (o && "y" !== o) ||
                  (r.top =
                    n.top -
                    this.offset.parent.top -
                    this.margins.top +
                    (this.offsetParent[0] === this.document[0].body
                      ? 0
                      : this.offsetParent[0].scrollTop)),
                (this.reverting = !0),
                t(this.helper).animate(
                  r,
                  parseInt(this.options.revert, 10) || 500,
                  function () {
                    s._clear(e);
                  }
                );
            } else this._clear(e, i);
            return !1;
          }
        },
        cancel: function () {
          if (this.dragging) {
            this._mouseUp(new t.Event("mouseup", { target: null })),
              "original" === this.options.helper
                ? (this.currentItem.css(this._storedCSS),
                  this._removeClass(this.currentItem, "ui-sortable-helper"))
                : this.currentItem.show();
            for (var e = this.containers.length - 1; e >= 0; e--)
              this.containers[e]._trigger(
                "deactivate",
                null,
                this._uiHash(this)
              ),
                this.containers[e].containerCache.over &&
                  (this.containers[e]._trigger("out", null, this._uiHash(this)),
                  (this.containers[e].containerCache.over = 0));
          }
          return (
            this.placeholder &&
              (this.placeholder[0].parentNode &&
                this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
              "original" !== this.options.helper &&
                this.helper &&
                this.helper[0].parentNode &&
                this.helper.remove(),
              t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null,
              }),
              this.domPosition.prev
                ? t(this.domPosition.prev).after(this.currentItem)
                : t(this.domPosition.parent).prepend(this.currentItem)),
            this
          );
        },
        serialize: function (e) {
          var i = this._getItemsAsjQuery(e && e.connected),
            s = [];
          return (
            (e = e || {}),
            t(i).each(function () {
              var i = (t(e.item || this).attr(e.attribute || "id") || "").match(
                e.expression || /(.+)[\-=_](.+)/
              );
              i &&
                s.push(
                  (e.key || i[1] + "[]") +
                    "=" +
                    (e.key && e.expression ? i[1] : i[2])
                );
            }),
            !s.length && e.key && s.push(e.key + "="),
            s.join("&")
          );
        },
        toArray: function (e) {
          var i = this._getItemsAsjQuery(e && e.connected),
            s = [];
          return (
            (e = e || {}),
            i.each(function () {
              s.push(t(e.item || this).attr(e.attribute || "id") || "");
            }),
            s
          );
        },
        _intersectsWith: function (t) {
          var e = this.positionAbs.left,
            i = e + this.helperProportions.width,
            s = this.positionAbs.top,
            n = s + this.helperProportions.height,
            o = t.left,
            r = o + t.width,
            a = t.top,
            l = a + t.height,
            h = this.offset.click.top,
            c = this.offset.click.left,
            u = "x" === this.options.axis || (s + h > a && l > s + h),
            d = "y" === this.options.axis || (e + c > o && r > e + c);
          return "pointer" === this.options.tolerance ||
            this.options.forcePointerForContainers ||
            ("pointer" !== this.options.tolerance &&
              this.helperProportions[this.floating ? "width" : "height"] >
                t[this.floating ? "width" : "height"])
            ? u && d
            : e + this.helperProportions.width / 2 > o &&
                r > i - this.helperProportions.width / 2 &&
                s + this.helperProportions.height / 2 > a &&
                l > n - this.helperProportions.height / 2;
        },
        _intersectsWithPointer: function (t) {
          var e,
            i,
            s =
              "x" === this.options.axis ||
              this._isOverAxis(
                this.positionAbs.top + this.offset.click.top,
                t.top,
                t.height
              ),
            n =
              "y" === this.options.axis ||
              this._isOverAxis(
                this.positionAbs.left + this.offset.click.left,
                t.left,
                t.width
              );
          return (
            !!(s && n) &&
            ((e = this._getDragVerticalDirection()),
            (i = this._getDragHorizontalDirection()),
            this.floating
              ? "right" === i || "down" === e
                ? 2
                : 1
              : e && ("down" === e ? 2 : 1))
          );
        },
        _intersectsWithSides: function (t) {
          var e = this._isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              t.top + t.height / 2,
              t.height
            ),
            i = this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left + t.width / 2,
              t.width
            ),
            s = this._getDragVerticalDirection(),
            n = this._getDragHorizontalDirection();
          return this.floating && n
            ? ("right" === n && i) || ("left" === n && !i)
            : s && (("down" === s && e) || ("up" === s && !e));
        },
        _getDragVerticalDirection: function () {
          var t = this.positionAbs.top - this.lastPositionAbs.top;
          return 0 !== t && (t > 0 ? "down" : "up");
        },
        _getDragHorizontalDirection: function () {
          var t = this.positionAbs.left - this.lastPositionAbs.left;
          return 0 !== t && (t > 0 ? "right" : "left");
        },
        refresh: function (t) {
          return (
            this._refreshItems(t),
            this._setHandleClassName(),
            this.refreshPositions(),
            this
          );
        },
        _connectWith: function () {
          var t = this.options;
          return t.connectWith.constructor === String
            ? [t.connectWith]
            : t.connectWith;
        },
        _getItemsAsjQuery: function (e) {
          function i() {
            a.push(this);
          }
          var s,
            n,
            o,
            r,
            a = [],
            l = [],
            h = this._connectWith();
          if (h && e)
            for (s = h.length - 1; s >= 0; s--)
              for (n = (o = t(h[s], this.document[0])).length - 1; n >= 0; n--)
                (r = t.data(o[n], this.widgetFullName)) &&
                  r !== this &&
                  !r.options.disabled &&
                  l.push([
                    t.isFunction(r.options.items)
                      ? r.options.items.call(r.element)
                      : t(r.options.items, r.element)
                          .not(".ui-sortable-helper")
                          .not(".ui-sortable-placeholder"),
                    r,
                  ]);
          for (
            l.push([
              t.isFunction(this.options.items)
                ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem,
                  })
                : t(this.options.items, this.element)
                    .not(".ui-sortable-helper")
                    .not(".ui-sortable-placeholder"),
              this,
            ]),
              s = l.length - 1;
            s >= 0;
            s--
          )
            l[s][0].each(i);
          return t(a);
        },
        _removeCurrentsFromItems: function () {
          var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
          this.items = t.grep(this.items, function (t) {
            for (var i = 0; e.length > i; i++)
              if (e[i] === t.item[0]) return !1;
            return !0;
          });
        },
        _refreshItems: function (e) {
          (this.items = []), (this.containers = [this]);
          var i,
            s,
            n,
            o,
            r,
            a,
            l,
            h,
            c = this.items,
            u = [
              [
                t.isFunction(this.options.items)
                  ? this.options.items.call(this.element[0], e, {
                      item: this.currentItem,
                    })
                  : t(this.options.items, this.element),
                this,
              ],
            ],
            d = this._connectWith();
          if (d && this.ready)
            for (i = d.length - 1; i >= 0; i--)
              for (s = (n = t(d[i], this.document[0])).length - 1; s >= 0; s--)
                (o = t.data(n[s], this.widgetFullName)) &&
                  o !== this &&
                  !o.options.disabled &&
                  (u.push([
                    t.isFunction(o.options.items)
                      ? o.options.items.call(o.element[0], e, {
                          item: this.currentItem,
                        })
                      : t(o.options.items, o.element),
                    o,
                  ]),
                  this.containers.push(o));
          for (i = u.length - 1; i >= 0; i--)
            for (r = u[i][1], a = u[i][0], s = 0, h = a.length; h > s; s++)
              (l = t(a[s])).data(this.widgetName + "-item", r),
                c.push({
                  item: l,
                  instance: r,
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                });
        },
        refreshPositions: function (e) {
          var i, s, n, o;
          for (
            this.floating =
              !!this.items.length &&
              ("x" === this.options.axis ||
                this._isFloating(this.items[0].item)),
              this.offsetParent &&
                this.helper &&
                (this.offset.parent = this._getParentOffset()),
              i = this.items.length - 1;
            i >= 0;
            i--
          )
            ((s = this.items[i]).instance !== this.currentContainer &&
              this.currentContainer &&
              s.item[0] !== this.currentItem[0]) ||
              ((n = this.options.toleranceElement
                ? t(this.options.toleranceElement, s.item)
                : s.item),
              e || ((s.width = n.outerWidth()), (s.height = n.outerHeight())),
              (o = n.offset()),
              (s.left = o.left),
              (s.top = o.top));
          if (this.options.custom && this.options.custom.refreshContainers)
            this.options.custom.refreshContainers.call(this);
          else
            for (i = this.containers.length - 1; i >= 0; i--)
              (o = this.containers[i].element.offset()),
                (this.containers[i].containerCache.left = o.left),
                (this.containers[i].containerCache.top = o.top),
                (this.containers[i].containerCache.width =
                  this.containers[i].element.outerWidth()),
                (this.containers[i].containerCache.height =
                  this.containers[i].element.outerHeight());
          return this;
        },
        _createPlaceholder: function (e) {
          var i,
            s = (e = e || this).options;
          (s.placeholder && s.placeholder.constructor !== String) ||
            ((i = s.placeholder),
            (s.placeholder = {
              element: function () {
                var s = e.currentItem[0].nodeName.toLowerCase(),
                  n = t("<" + s + ">", e.document[0]);
                return (
                  e
                    ._addClass(
                      n,
                      "ui-sortable-placeholder",
                      i || e.currentItem[0].className
                    )
                    ._removeClass(n, "ui-sortable-helper"),
                  "tbody" === s
                    ? e._createTrPlaceholder(
                        e.currentItem.find("tr").eq(0),
                        t("<tr>", e.document[0]).appendTo(n)
                      )
                    : "tr" === s
                    ? e._createTrPlaceholder(e.currentItem, n)
                    : "img" === s && n.attr("src", e.currentItem.attr("src")),
                  i || n.css("visibility", "hidden"),
                  n
                );
              },
              update: function (t, n) {
                (!i || s.forcePlaceholderSize) &&
                  (n.height() ||
                    n.height(
                      e.currentItem.innerHeight() -
                        parseInt(e.currentItem.css("paddingTop") || 0, 10) -
                        parseInt(e.currentItem.css("paddingBottom") || 0, 10)
                    ),
                  n.width() ||
                    n.width(
                      e.currentItem.innerWidth() -
                        parseInt(e.currentItem.css("paddingLeft") || 0, 10) -
                        parseInt(e.currentItem.css("paddingRight") || 0, 10)
                    ));
              },
            })),
            (e.placeholder = t(
              s.placeholder.element.call(e.element, e.currentItem)
            )),
            e.currentItem.after(e.placeholder),
            s.placeholder.update(e, e.placeholder);
        },
        _createTrPlaceholder: function (e, i) {
          var s = this;
          e.children().each(function () {
            t("<td>&#160;</td>", s.document[0])
              .attr("colspan", t(this).attr("colspan") || 1)
              .appendTo(i);
          });
        },
        _contactContainers: function (e) {
          var i,
            s,
            n,
            o,
            r,
            a,
            l,
            h,
            c,
            u,
            d = null,
            p = null;
          for (i = this.containers.length - 1; i >= 0; i--)
            if (
              !t.contains(this.currentItem[0], this.containers[i].element[0])
            ) {
              if (this._intersectsWith(this.containers[i].containerCache)) {
                if (
                  d &&
                  t.contains(this.containers[i].element[0], d.element[0])
                )
                  continue;
                (d = this.containers[i]), (p = i);
              } else
                this.containers[i].containerCache.over &&
                  (this.containers[i]._trigger("out", e, this._uiHash(this)),
                  (this.containers[i].containerCache.over = 0));
            }
          if (d) {
            if (1 === this.containers.length)
              this.containers[p].containerCache.over ||
                (this.containers[p]._trigger("over", e, this._uiHash(this)),
                (this.containers[p].containerCache.over = 1));
            else {
              for (
                n = 1e4,
                  o = null,
                  r = (c = d.floating || this._isFloating(this.currentItem))
                    ? "left"
                    : "top",
                  a = c ? "width" : "height",
                  u = c ? "pageX" : "pageY",
                  s = this.items.length - 1;
                s >= 0;
                s--
              )
                t.contains(
                  this.containers[p].element[0],
                  this.items[s].item[0]
                ) &&
                  this.items[s].item[0] !== this.currentItem[0] &&
                  ((l = this.items[s].item.offset()[r]),
                  (h = !1),
                  e[u] - l > this.items[s][a] / 2 && (h = !0),
                  n > Math.abs(e[u] - l) &&
                    ((n = Math.abs(e[u] - l)),
                    (o = this.items[s]),
                    (this.direction = h ? "up" : "down")));
              if (!o && !this.options.dropOnEmpty) return;
              if (this.currentContainer === this.containers[p])
                return void (
                  this.currentContainer.containerCache.over ||
                  (this.containers[p]._trigger("over", e, this._uiHash()),
                  (this.currentContainer.containerCache.over = 1))
                );
              o
                ? this._rearrange(e, o, null, !0)
                : this._rearrange(e, null, this.containers[p].element, !0),
                this._trigger("change", e, this._uiHash()),
                this.containers[p]._trigger("change", e, this._uiHash(this)),
                (this.currentContainer = this.containers[p]),
                this.options.placeholder.update(
                  this.currentContainer,
                  this.placeholder
                ),
                this.containers[p]._trigger("over", e, this._uiHash(this)),
                (this.containers[p].containerCache.over = 1);
            }
          }
        },
        _createHelper: function (e) {
          var i = this.options,
            s = t.isFunction(i.helper)
              ? t(i.helper.apply(this.element[0], [e, this.currentItem]))
              : "clone" === i.helper
              ? this.currentItem.clone()
              : this.currentItem;
          return (
            s.parents("body").length ||
              t(
                "parent" !== i.appendTo
                  ? i.appendTo
                  : this.currentItem[0].parentNode
              )[0].appendChild(s[0]),
            s[0] === this.currentItem[0] &&
              (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left"),
              }),
            (!s[0].style.width || i.forceHelperSize) &&
              s.width(this.currentItem.width()),
            (!s[0].style.height || i.forceHelperSize) &&
              s.height(this.currentItem.height()),
            s
          );
        },
        _adjustOffsetFromHelper: function (e) {
          "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
            "left" in e &&
              (this.offset.click.left = e.left + this.margins.left),
            "right" in e &&
              (this.offset.click.left =
                this.helperProportions.width - e.right + this.margins.left),
            "top" in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom" in e &&
              (this.offset.click.top =
                this.helperProportions.height - e.bottom + this.margins.top);
        },
        _getParentOffset: function () {
          this.offsetParent = this.helper.offsetParent();
          var e = this.offsetParent.offset();
          return (
            "absolute" === this.cssPosition &&
              this.scrollParent[0] !== this.document[0] &&
              t.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((e.left += this.scrollParent.scrollLeft()),
              (e.top += this.scrollParent.scrollTop())),
            (this.offsetParent[0] === this.document[0].body ||
              (this.offsetParent[0].tagName &&
                "html" === this.offsetParent[0].tagName.toLowerCase() &&
                t.ui.ie)) &&
              (e = { top: 0, left: 0 }),
            {
              top:
                e.top +
                (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left:
                e.left +
                (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if ("relative" === this.cssPosition) {
            var t = this.currentItem.position();
            return {
              top:
                t.top -
                (parseInt(this.helper.css("top"), 10) || 0) +
                this.scrollParent.scrollTop(),
              left:
                t.left -
                (parseInt(this.helper.css("left"), 10) || 0) +
                this.scrollParent.scrollLeft(),
            };
          }
          return { top: 0, left: 0 };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
            top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var e,
            i,
            s,
            n = this.options;
          "parent" === n.containment &&
            (n.containment = this.helper[0].parentNode),
            ("document" === n.containment || "window" === n.containment) &&
              (this.containment = [
                0 - this.offset.relative.left - this.offset.parent.left,
                0 - this.offset.relative.top - this.offset.parent.top,
                "document" === n.containment
                  ? this.document.width()
                  : this.window.width() -
                    this.helperProportions.width -
                    this.margins.left,
                ("document" === n.containment
                  ? this.document.height() ||
                    document.body.parentNode.scrollHeight
                  : this.window.height() ||
                    this.document[0].body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
              ]),
            /^(document|window|parent)$/.test(n.containment) ||
              ((e = t(n.containment)[0]),
              (i = t(n.containment).offset()),
              (s = "hidden" !== t(e).css("overflow")),
              (this.containment = [
                i.left +
                  (parseInt(t(e).css("borderLeftWidth"), 10) || 0) +
                  (parseInt(t(e).css("paddingLeft"), 10) || 0) -
                  this.margins.left,
                i.top +
                  (parseInt(t(e).css("borderTopWidth"), 10) || 0) +
                  (parseInt(t(e).css("paddingTop"), 10) || 0) -
                  this.margins.top,
                i.left +
                  (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) -
                  (parseInt(t(e).css("borderLeftWidth"), 10) || 0) -
                  (parseInt(t(e).css("paddingRight"), 10) || 0) -
                  this.helperProportions.width -
                  this.margins.left,
                i.top +
                  (s
                    ? Math.max(e.scrollHeight, e.offsetHeight)
                    : e.offsetHeight) -
                  (parseInt(t(e).css("borderTopWidth"), 10) || 0) -
                  (parseInt(t(e).css("paddingBottom"), 10) || 0) -
                  this.helperProportions.height -
                  this.margins.top,
              ]));
        },
        _convertPositionTo: function (e, i) {
          i || (i = this.position);
          var s = "absolute" === e ? 1 : -1,
            n =
              "absolute" !== this.cssPosition ||
              (this.scrollParent[0] !== this.document[0] &&
                t.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent,
            o = /(html|body)/i.test(n[0].tagName);
          return {
            top:
              i.top +
              this.offset.relative.top * s +
              this.offset.parent.top * s -
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : o
                ? 0
                : n.scrollTop()) *
                s,
            left:
              i.left +
              this.offset.relative.left * s +
              this.offset.parent.left * s -
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : o
                ? 0
                : n.scrollLeft()) *
                s,
          };
        },
        _generatePosition: function (e) {
          var i,
            s,
            n = this.options,
            o = e.pageX,
            r = e.pageY,
            a =
              "absolute" !== this.cssPosition ||
              (this.scrollParent[0] !== this.document[0] &&
                t.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent,
            l = /(html|body)/i.test(a[0].tagName);
          return (
            "relative" !== this.cssPosition ||
              (this.scrollParent[0] !== this.document[0] &&
                this.scrollParent[0] !== this.offsetParent[0]) ||
              (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition &&
              (this.containment &&
                (e.pageX - this.offset.click.left < this.containment[0] &&
                  (o = this.containment[0] + this.offset.click.left),
                e.pageY - this.offset.click.top < this.containment[1] &&
                  (r = this.containment[1] + this.offset.click.top),
                e.pageX - this.offset.click.left > this.containment[2] &&
                  (o = this.containment[2] + this.offset.click.left),
                e.pageY - this.offset.click.top > this.containment[3] &&
                  (r = this.containment[3] + this.offset.click.top)),
              n.grid &&
                ((i =
                  this.originalPageY +
                  Math.round((r - this.originalPageY) / n.grid[1]) * n.grid[1]),
                (r = this.containment
                  ? i - this.offset.click.top >= this.containment[1] &&
                    i - this.offset.click.top <= this.containment[3]
                    ? i
                    : i - this.offset.click.top >= this.containment[1]
                    ? i - n.grid[1]
                    : i + n.grid[1]
                  : i),
                (s =
                  this.originalPageX +
                  Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0]),
                (o = this.containment
                  ? s - this.offset.click.left >= this.containment[0] &&
                    s - this.offset.click.left <= this.containment[2]
                    ? s
                    : s - this.offset.click.left >= this.containment[0]
                    ? s - n.grid[0]
                    : s + n.grid[0]
                  : s))),
            {
              top:
                r -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                ("fixed" === this.cssPosition
                  ? -this.scrollParent.scrollTop()
                  : l
                  ? 0
                  : a.scrollTop()),
              left:
                o -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                ("fixed" === this.cssPosition
                  ? -this.scrollParent.scrollLeft()
                  : l
                  ? 0
                  : a.scrollLeft()),
            }
          );
        },
        _rearrange: function (t, e, i, s) {
          i
            ? i[0].appendChild(this.placeholder[0])
            : e.item[0].parentNode.insertBefore(
                this.placeholder[0],
                "down" === this.direction ? e.item[0] : e.item[0].nextSibling
              ),
            (this.counter = this.counter ? ++this.counter : 1);
          var n = this.counter;
          this._delay(function () {
            n === this.counter && this.refreshPositions(!s);
          });
        },
        _clear: function (t, e) {
          function i(t, e, i) {
            return function (s) {
              i._trigger(t, s, e._uiHash(e));
            };
          }
          this.reverting = !1;
          var s,
            n = [];
          if (
            (!this._noFinalSort &&
              this.currentItem.parent().length &&
              this.placeholder.before(this.currentItem),
            (this._noFinalSort = null),
            this.helper[0] === this.currentItem[0])
          ) {
            for (s in this._storedCSS)
              ("auto" === this._storedCSS[s] ||
                "static" === this._storedCSS[s]) &&
                (this._storedCSS[s] = "");
            this.currentItem.css(this._storedCSS),
              this._removeClass(this.currentItem, "ui-sortable-helper");
          } else this.currentItem.show();
          for (
            this.fromOutside &&
              !e &&
              n.push(function (t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside));
              }),
              (!this.fromOutside &&
                this.domPosition.prev ===
                  this.currentItem.prev().not(".ui-sortable-helper")[0] &&
                this.domPosition.parent === this.currentItem.parent()[0]) ||
                e ||
                n.push(function (t) {
                  this._trigger("update", t, this._uiHash());
                }),
              this !== this.currentContainer &&
                (e ||
                  (n.push(function (t) {
                    this._trigger("remove", t, this._uiHash());
                  }),
                  n.push(
                    function (t) {
                      return function (e) {
                        t._trigger("receive", e, this._uiHash(this));
                      };
                    }.call(this, this.currentContainer)
                  ),
                  n.push(
                    function (t) {
                      return function (e) {
                        t._trigger("update", e, this._uiHash(this));
                      };
                    }.call(this, this.currentContainer)
                  ))),
              s = this.containers.length - 1;
            s >= 0;
            s--
          )
            e || n.push(i("deactivate", this, this.containers[s])),
              this.containers[s].containerCache.over &&
                (n.push(i("out", this, this.containers[s])),
                (this.containers[s].containerCache.over = 0));
          if (
            (this.storedCursor &&
              (this.document.find("body").css("cursor", this.storedCursor),
              this.storedStylesheet.remove()),
            this._storedOpacity &&
              this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex &&
              this.helper.css(
                "zIndex",
                "auto" === this._storedZIndex ? "" : this._storedZIndex
              ),
            (this.dragging = !1),
            e || this._trigger("beforeStop", t, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.cancelHelperRemoval ||
              (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
              (this.helper = null)),
            !e)
          ) {
            for (s = 0; n.length > s; s++) n[s].call(this, t);
            this._trigger("stop", t, this._uiHash());
          }
          return (this.fromOutside = !1), !this.cancelHelperRemoval;
        },
        _trigger: function () {
          !1 === t.Widget.prototype._trigger.apply(this, arguments) &&
            this.cancel();
        },
        _uiHash: function (e) {
          var i = e || this;
          return {
            helper: i.helper,
            placeholder: i.placeholder || t([]),
            position: i.position,
            originalPosition: i.originalPosition,
            offset: i.positionAbs,
            item: i.currentItem,
            sender: e ? e.element : null,
          };
        },
      }),
      t.widget("ui.accordion", {
        version: "1.12.1",
        options: {
          active: 0,
          animate: {},
          classes: {
            "ui-accordion-header": "ui-corner-top",
            "ui-accordion-header-collapsed": "ui-corner-all",
            "ui-accordion-content": "ui-corner-bottom",
          },
          collapsible: !1,
          event: "click",
          header: "> li > :first-child, > :not(li):even",
          heightStyle: "auto",
          icons: {
            activeHeader: "ui-icon-triangle-1-s",
            header: "ui-icon-triangle-1-e",
          },
          activate: null,
          beforeActivate: null,
        },
        hideProps: {
          borderTopWidth: "hide",
          borderBottomWidth: "hide",
          paddingTop: "hide",
          paddingBottom: "hide",
          height: "hide",
        },
        showProps: {
          borderTopWidth: "show",
          borderBottomWidth: "show",
          paddingTop: "show",
          paddingBottom: "show",
          height: "show",
        },
        _create: function () {
          var e = this.options;
          (this.prevShow = this.prevHide = t()),
            this._addClass("ui-accordion", "ui-widget ui-helper-reset"),
            this.element.attr("role", "tablist"),
            e.collapsible ||
              (!1 !== e.active && null != e.active) ||
              (e.active = 0),
            this._processPanels(),
            0 > e.active && (e.active += this.headers.length),
            this._refresh();
        },
        _getCreateEventData: function () {
          return {
            header: this.active,
            panel: this.active.length ? this.active.next() : t(),
          };
        },
        _createIcons: function () {
          var e,
            i,
            s = this.options.icons;
          s &&
            ((e = t("<span>")),
            this._addClass(
              e,
              "ui-accordion-header-icon",
              "ui-icon " + s.header
            ),
            e.prependTo(this.headers),
            (i = this.active.children(".ui-accordion-header-icon")),
            this._removeClass(i, s.header)
              ._addClass(i, null, s.activeHeader)
              ._addClass(this.headers, "ui-accordion-icons"));
        },
        _destroyIcons: function () {
          this._removeClass(this.headers, "ui-accordion-icons"),
            this.headers.children(".ui-accordion-header-icon").remove();
        },
        _destroy: function () {
          var t;
          this.element.removeAttr("role"),
            this.headers
              .removeAttr(
                "role aria-expanded aria-selected aria-controls tabIndex"
              )
              .removeUniqueId(),
            this._destroyIcons(),
            (t = this.headers
              .next()
              .css("display", "")
              .removeAttr("role aria-hidden aria-labelledby")
              .removeUniqueId()),
            "content" !== this.options.heightStyle && t.css("height", "");
        },
        _setOption: function (t, e) {
          return "active" === t
            ? void this._activate(e)
            : ("event" === t &&
                (this.options.event &&
                  this._off(this.headers, this.options.event),
                this._setupEvents(e)),
              this._super(t, e),
              "collapsible" !== t ||
                e ||
                !1 !== this.options.active ||
                this._activate(0),
              void (
                "icons" === t &&
                (this._destroyIcons(), e && this._createIcons())
              ));
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this.element.attr("aria-disabled", t),
            this._toggleClass(null, "ui-state-disabled", !!t),
            this._toggleClass(
              this.headers.add(this.headers.next()),
              null,
              "ui-state-disabled",
              !!t
            );
        },
        _keydown: function (e) {
          if (!e.altKey && !e.ctrlKey) {
            var i = t.ui.keyCode,
              s = this.headers.length,
              n = this.headers.index(e.target),
              o = !1;
            switch (e.keyCode) {
              case i.RIGHT:
              case i.DOWN:
                o = this.headers[(n + 1) % s];
                break;
              case i.LEFT:
              case i.UP:
                o = this.headers[(n - 1 + s) % s];
                break;
              case i.SPACE:
              case i.ENTER:
                this._eventHandler(e);
                break;
              case i.HOME:
                o = this.headers[0];
                break;
              case i.END:
                o = this.headers[s - 1];
            }
            o &&
              (t(e.target).attr("tabIndex", -1),
              t(o).attr("tabIndex", 0),
              t(o).trigger("focus"),
              e.preventDefault());
          }
        },
        _panelKeyDown: function (e) {
          e.keyCode === t.ui.keyCode.UP &&
            e.ctrlKey &&
            t(e.currentTarget).prev().trigger("focus");
        },
        refresh: function () {
          var e = this.options;
          this._processPanels(),
            (!1 !== e.active || !0 !== e.collapsible) && this.headers.length
              ? !1 === e.active
                ? this._activate(0)
                : this.active.length &&
                  !t.contains(this.element[0], this.active[0])
                ? this.headers.length ===
                  this.headers.find(".ui-state-disabled").length
                  ? ((e.active = !1), (this.active = t()))
                  : this._activate(Math.max(0, e.active - 1))
                : (e.active = this.headers.index(this.active))
              : ((e.active = !1), (this.active = t())),
            this._destroyIcons(),
            this._refresh();
        },
        _processPanels: function () {
          var t = this.headers,
            e = this.panels;
          (this.headers = this.element.find(this.options.header)),
            this._addClass(
              this.headers,
              "ui-accordion-header ui-accordion-header-collapsed",
              "ui-state-default"
            ),
            (this.panels = this.headers
              .next()
              .filter(":not(.ui-accordion-content-active)")
              .hide()),
            this._addClass(
              this.panels,
              "ui-accordion-content",
              "ui-helper-reset ui-widget-content"
            ),
            e &&
              (this._off(t.not(this.headers)), this._off(e.not(this.panels)));
        },
        _refresh: function () {
          var e,
            i = this.options,
            s = i.heightStyle,
            n = this.element.parent();
          (this.active = this._findActive(i.active)),
            this._addClass(
              this.active,
              "ui-accordion-header-active",
              "ui-state-active"
            )._removeClass(this.active, "ui-accordion-header-collapsed"),
            this._addClass(this.active.next(), "ui-accordion-content-active"),
            this.active.next().show(),
            this.headers
              .attr("role", "tab")
              .each(function () {
                var e = t(this),
                  i = e.uniqueId().attr("id"),
                  s = e.next(),
                  n = s.uniqueId().attr("id");
                e.attr("aria-controls", n), s.attr("aria-labelledby", i);
              })
              .next()
              .attr("role", "tabpanel"),
            this.headers
              .not(this.active)
              .attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1,
              })
              .next()
              .attr({ "aria-hidden": "true" })
              .hide(),
            this.active.length
              ? this.active
                  .attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0,
                  })
                  .next()
                  .attr({ "aria-hidden": "false" })
              : this.headers.eq(0).attr("tabIndex", 0),
            this._createIcons(),
            this._setupEvents(i.event),
            "fill" === s
              ? ((e = n.height()),
                this.element.siblings(":visible").each(function () {
                  var i = t(this),
                    s = i.css("position");
                  "absolute" !== s && "fixed" !== s && (e -= i.outerHeight(!0));
                }),
                this.headers.each(function () {
                  e -= t(this).outerHeight(!0);
                }),
                this.headers
                  .next()
                  .each(function () {
                    t(this).height(
                      Math.max(0, e - t(this).innerHeight() + t(this).height())
                    );
                  })
                  .css("overflow", "auto"))
              : "auto" === s &&
                ((e = 0),
                this.headers
                  .next()
                  .each(function () {
                    var i = t(this).is(":visible");
                    i || t(this).show(),
                      (e = Math.max(e, t(this).css("height", "").height())),
                      i || t(this).hide();
                  })
                  .height(e));
        },
        _activate: function (e) {
          var i = this._findActive(e)[0];
          i !== this.active[0] &&
            ((i = i || this.active[0]),
            this._eventHandler({
              target: i,
              currentTarget: i,
              preventDefault: t.noop,
            }));
        },
        _findActive: function (e) {
          return "number" == typeof e ? this.headers.eq(e) : t();
        },
        _setupEvents: function (e) {
          var i = { keydown: "_keydown" };
          e &&
            t.each(e.split(" "), function (t, e) {
              i[e] = "_eventHandler";
            }),
            this._off(this.headers.add(this.headers.next())),
            this._on(this.headers, i),
            this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
            this._hoverable(this.headers),
            this._focusable(this.headers);
        },
        _eventHandler: function (e) {
          var i,
            s,
            n = this.options,
            o = this.active,
            r = t(e.currentTarget),
            a = r[0] === o[0],
            l = a && n.collapsible,
            h = l ? t() : r.next(),
            c = o.next(),
            u = {
              oldHeader: o,
              oldPanel: c,
              newHeader: l ? t() : r,
              newPanel: h,
            };
          e.preventDefault(),
            (a && !n.collapsible) ||
              !1 === this._trigger("beforeActivate", e, u) ||
              ((n.active = !l && this.headers.index(r)),
              (this.active = a ? t() : r),
              this._toggle(u),
              this._removeClass(
                o,
                "ui-accordion-header-active",
                "ui-state-active"
              ),
              n.icons &&
                ((i = o.children(".ui-accordion-header-icon")),
                this._removeClass(i, null, n.icons.activeHeader)._addClass(
                  i,
                  null,
                  n.icons.header
                )),
              a ||
                (this._removeClass(
                  r,
                  "ui-accordion-header-collapsed"
                )._addClass(r, "ui-accordion-header-active", "ui-state-active"),
                n.icons &&
                  ((s = r.children(".ui-accordion-header-icon")),
                  this._removeClass(s, null, n.icons.header)._addClass(
                    s,
                    null,
                    n.icons.activeHeader
                  )),
                this._addClass(r.next(), "ui-accordion-content-active")));
        },
        _toggle: function (e) {
          var i = e.newPanel,
            s = this.prevShow.length ? this.prevShow : e.oldPanel;
          this.prevShow.add(this.prevHide).stop(!0, !0),
            (this.prevShow = i),
            (this.prevHide = s),
            this.options.animate
              ? this._animate(i, s, e)
              : (s.hide(), i.show(), this._toggleComplete(e)),
            s.attr({ "aria-hidden": "true" }),
            s
              .prev()
              .attr({ "aria-selected": "false", "aria-expanded": "false" }),
            i.length && s.length
              ? s.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
              : i.length &&
                this.headers
                  .filter(function () {
                    return 0 === parseInt(t(this).attr("tabIndex"), 10);
                  })
                  .attr("tabIndex", -1),
            i
              .attr("aria-hidden", "false")
              .prev()
              .attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              });
        },
        _animate: function (t, e, i) {
          var s,
            n,
            o,
            r = this,
            a = 0,
            l = t.css("box-sizing"),
            h = t.length && (!e.length || t.index() < e.index()),
            c = this.options.animate || {},
            u = (h && c.down) || c,
            d = function () {
              r._toggleComplete(i);
            };
          return (
            "number" == typeof u && (o = u),
            "string" == typeof u && (n = u),
            (n = n || u.easing || c.easing),
            (o = o || u.duration || c.duration),
            e.length
              ? t.length
                ? ((s = t.show().outerHeight()),
                  e.animate(this.hideProps, {
                    duration: o,
                    easing: n,
                    step: function (t, e) {
                      e.now = Math.round(t);
                    },
                  }),
                  void t.hide().animate(this.showProps, {
                    duration: o,
                    easing: n,
                    complete: d,
                    step: function (t, i) {
                      (i.now = Math.round(t)),
                        "height" !== i.prop
                          ? "content-box" === l && (a += i.now)
                          : "content" !== r.options.heightStyle &&
                            ((i.now = Math.round(s - e.outerHeight() - a)),
                            (a = 0));
                    },
                  }))
                : e.animate(this.hideProps, o, n, d)
              : t.animate(this.showProps, o, n, d)
          );
        },
        _toggleComplete: function (t) {
          var e = t.oldPanel,
            i = e.prev();
          this._removeClass(e, "ui-accordion-content-active"),
            this._removeClass(i, "ui-accordion-header-active")._addClass(
              i,
              "ui-accordion-header-collapsed"
            ),
            e.length && (e.parent()[0].className = e.parent()[0].className),
            this._trigger("activate", null, t);
        },
      }),
      t.widget("ui.menu", {
        version: "1.12.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
          icons: { submenu: "ui-icon-caret-1-e" },
          items: "> *",
          menus: "ul",
          position: { my: "left top", at: "right top" },
          role: "menu",
          blur: null,
          focus: null,
          select: null,
        },
        _create: function () {
          (this.activeMenu = this.element),
            (this.mouseHandled = !1),
            this.element
              .uniqueId()
              .attr({ role: this.options.role, tabIndex: 0 }),
            this._addClass("ui-menu", "ui-widget ui-widget-content"),
            this._on({
              "mousedown .ui-menu-item": function (t) {
                t.preventDefault();
              },
              "click .ui-menu-item": function (e) {
                var i = t(e.target),
                  s = t(t.ui.safeActiveElement(this.document[0]));
                !this.mouseHandled &&
                  i.not(".ui-state-disabled").length &&
                  (this.select(e),
                  e.isPropagationStopped() || (this.mouseHandled = !0),
                  i.has(".ui-menu").length
                    ? this.expand(e)
                    : !this.element.is(":focus") &&
                      s.closest(".ui-menu").length &&
                      (this.element.trigger("focus", [!0]),
                      this.active &&
                        1 === this.active.parents(".ui-menu").length &&
                        clearTimeout(this.timer)));
              },
              "mouseenter .ui-menu-item": function (e) {
                if (!this.previousFilter) {
                  var i = t(e.target).closest(".ui-menu-item"),
                    s = t(e.currentTarget);
                  i[0] === s[0] &&
                    (this._removeClass(
                      s.siblings().children(".ui-state-active"),
                      null,
                      "ui-state-active"
                    ),
                    this.focus(e, s));
                }
              },
              mouseleave: "collapseAll",
              "mouseleave .ui-menu": "collapseAll",
              focus: function (t, e) {
                var i =
                  this.active || this.element.find(this.options.items).eq(0);
                e || this.focus(t, i);
              },
              blur: function (e) {
                this._delay(function () {
                  t.contains(
                    this.element[0],
                    t.ui.safeActiveElement(this.document[0])
                  ) || this.collapseAll(e);
                });
              },
              keydown: "_keydown",
            }),
            this.refresh(),
            this._on(this.document, {
              click: function (t) {
                this._closeOnDocumentClick(t) && this.collapseAll(t),
                  (this.mouseHandled = !1);
              },
            });
        },
        _destroy: function () {
          var e = this.element
            .find(".ui-menu-item")
            .removeAttr("role aria-disabled")
            .children(".ui-menu-item-wrapper")
            .removeUniqueId()
            .removeAttr("tabIndex role aria-haspopup");
          this.element
            .removeAttr("aria-activedescendant")
            .find(".ui-menu")
            .addBack()
            .removeAttr(
              "role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex"
            )
            .removeUniqueId()
            .show(),
            e.children().each(function () {
              var e = t(this);
              e.data("ui-menu-submenu-caret") && e.remove();
            });
        },
        _keydown: function (e) {
          var i,
            s,
            n,
            o,
            r = !0;
          switch (e.keyCode) {
            case t.ui.keyCode.PAGE_UP:
              this.previousPage(e);
              break;
            case t.ui.keyCode.PAGE_DOWN:
              this.nextPage(e);
              break;
            case t.ui.keyCode.HOME:
              this._move("first", "first", e);
              break;
            case t.ui.keyCode.END:
              this._move("last", "last", e);
              break;
            case t.ui.keyCode.UP:
              this.previous(e);
              break;
            case t.ui.keyCode.DOWN:
              this.next(e);
              break;
            case t.ui.keyCode.LEFT:
              this.collapse(e);
              break;
            case t.ui.keyCode.RIGHT:
              this.active &&
                !this.active.is(".ui-state-disabled") &&
                this.expand(e);
              break;
            case t.ui.keyCode.ENTER:
            case t.ui.keyCode.SPACE:
              this._activate(e);
              break;
            case t.ui.keyCode.ESCAPE:
              this.collapse(e);
              break;
            default:
              (r = !1),
                (s = this.previousFilter || ""),
                (o = !1),
                (n =
                  e.keyCode >= 96 && 105 >= e.keyCode
                    ? "" + (e.keyCode - 96)
                    : String.fromCharCode(e.keyCode)),
                clearTimeout(this.filterTimer),
                n === s ? (o = !0) : (n = s + n),
                (i = this._filterMenuItems(n)),
                (i =
                  o && -1 !== i.index(this.active.next())
                    ? this.active.nextAll(".ui-menu-item")
                    : i).length ||
                  ((n = String.fromCharCode(e.keyCode)),
                  (i = this._filterMenuItems(n))),
                i.length
                  ? (this.focus(e, i),
                    (this.previousFilter = n),
                    (this.filterTimer = this._delay(function () {
                      delete this.previousFilter;
                    }, 1e3)))
                  : delete this.previousFilter;
          }
          r && e.preventDefault();
        },
        _activate: function (t) {
          this.active &&
            !this.active.is(".ui-state-disabled") &&
            (this.active.children("[aria-haspopup='true']").length
              ? this.expand(t)
              : this.select(t));
        },
        refresh: function () {
          var e,
            i,
            s,
            n,
            o,
            r = this,
            a = this.options.icons.submenu,
            l = this.element.find(this.options.menus);
          this._toggleClass(
            "ui-menu-icons",
            null,
            !!this.element.find(".ui-icon").length
          ),
            (s = l
              .filter(":not(.ui-menu)")
              .hide()
              .attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false",
              })
              .each(function () {
                var e = t(this),
                  i = e.prev(),
                  s = t("<span>").data("ui-menu-submenu-caret", !0);
                r._addClass(s, "ui-menu-icon", "ui-icon " + a),
                  i.attr("aria-haspopup", "true").prepend(s),
                  e.attr("aria-labelledby", i.attr("id"));
              })),
            this._addClass(
              s,
              "ui-menu",
              "ui-widget ui-widget-content ui-front"
            ),
            (i = (e = l.add(this.element)).find(this.options.items))
              .not(".ui-menu-item")
              .each(function () {
                var e = t(this);
                r._isDivider(e) &&
                  r._addClass(e, "ui-menu-divider", "ui-widget-content");
              }),
            (o = (n = i.not(".ui-menu-item, .ui-menu-divider"))
              .children()
              .not(".ui-menu")
              .uniqueId()
              .attr({ tabIndex: -1, role: this._itemRole() })),
            this._addClass(n, "ui-menu-item")._addClass(
              o,
              "ui-menu-item-wrapper"
            ),
            i.filter(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active &&
              !t.contains(this.element[0], this.active[0]) &&
              this.blur();
        },
        _itemRole: function () {
          return { menu: "menuitem", listbox: "option" }[this.options.role];
        },
        _setOption: function (t, e) {
          if ("icons" === t) {
            var i = this.element.find(".ui-menu-icon");
            this._removeClass(i, null, this.options.icons.submenu)._addClass(
              i,
              null,
              e.submenu
            );
          }
          this._super(t, e);
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this.element.attr("aria-disabled", t + ""),
            this._toggleClass(null, "ui-state-disabled", !!t);
        },
        focus: function (t, e) {
          var i, s, n;
          this.blur(t, t && "focus" === t.type),
            this._scrollIntoView(e),
            (this.active = e.first()),
            (s = this.active.children(".ui-menu-item-wrapper")),
            this._addClass(s, null, "ui-state-active"),
            this.options.role &&
              this.element.attr("aria-activedescendant", s.attr("id")),
            (n = this.active
              .parent()
              .closest(".ui-menu-item")
              .children(".ui-menu-item-wrapper")),
            this._addClass(n, null, "ui-state-active"),
            t && "keydown" === t.type
              ? this._close()
              : (this.timer = this._delay(function () {
                  this._close();
                }, this.delay)),
            (i = e.children(".ui-menu")).length &&
              t &&
              /^mouse/.test(t.type) &&
              this._startOpening(i),
            (this.activeMenu = e.parent()),
            this._trigger("focus", t, { item: e });
        },
        _scrollIntoView: function (e) {
          var i, s, n, o, r, a;
          this._hasScroll() &&
            ((i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0),
            (s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0),
            (n = e.offset().top - this.activeMenu.offset().top - i - s),
            (o = this.activeMenu.scrollTop()),
            (r = this.activeMenu.height()),
            (a = e.outerHeight()),
            0 > n
              ? this.activeMenu.scrollTop(o + n)
              : n + a > r && this.activeMenu.scrollTop(o + n - r + a));
        },
        blur: function (t, e) {
          e || clearTimeout(this.timer),
            this.active &&
              (this._removeClass(
                this.active.children(".ui-menu-item-wrapper"),
                null,
                "ui-state-active"
              ),
              this._trigger("blur", t, { item: this.active }),
              (this.active = null));
        },
        _startOpening: function (t) {
          clearTimeout(this.timer),
            "true" === t.attr("aria-hidden") &&
              (this.timer = this._delay(function () {
                this._close(), this._open(t);
              }, this.delay));
        },
        _open: function (e) {
          var i = t.extend({ of: this.active }, this.options.position);
          clearTimeout(this.timer),
            this.element
              .find(".ui-menu")
              .not(e.parents(".ui-menu"))
              .hide()
              .attr("aria-hidden", "true"),
            e
              .show()
              .removeAttr("aria-hidden")
              .attr("aria-expanded", "true")
              .position(i);
        },
        collapseAll: function (e, i) {
          clearTimeout(this.timer),
            (this.timer = this._delay(function () {
              var s = i
                ? this.element
                : t(e && e.target).closest(this.element.find(".ui-menu"));
              s.length || (s = this.element),
                this._close(s),
                this.blur(e),
                this._removeClass(
                  s.find(".ui-state-active"),
                  null,
                  "ui-state-active"
                ),
                (this.activeMenu = s);
            }, this.delay));
        },
        _close: function (t) {
          t || (t = this.active ? this.active.parent() : this.element),
            t
              .find(".ui-menu")
              .hide()
              .attr("aria-hidden", "true")
              .attr("aria-expanded", "false");
        },
        _closeOnDocumentClick: function (e) {
          return !t(e.target).closest(".ui-menu").length;
        },
        _isDivider: function (t) {
          return !/[^\-\u2014\u2013\s]/.test(t.text());
        },
        collapse: function (t) {
          var e =
            this.active &&
            this.active.parent().closest(".ui-menu-item", this.element);
          e && e.length && (this._close(), this.focus(t, e));
        },
        expand: function (t) {
          var e =
            this.active &&
            this.active.children(".ui-menu ").find(this.options.items).first();
          e &&
            e.length &&
            (this._open(e.parent()),
            this._delay(function () {
              this.focus(t, e);
            }));
        },
        next: function (t) {
          this._move("next", "first", t);
        },
        previous: function (t) {
          this._move("prev", "last", t);
        },
        isFirstItem: function () {
          return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function () {
          return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function (t, e, i) {
          var s;
          this.active &&
            (s =
              "first" === t || "last" === t
                ? this.active["first" === t ? "prevAll" : "nextAll"](
                    ".ui-menu-item"
                  ).eq(-1)
                : this.active[t + "All"](".ui-menu-item").eq(0)),
            (s && s.length && this.active) ||
              (s = this.activeMenu.find(this.options.items)[e]()),
            this.focus(i, s);
        },
        nextPage: function (e) {
          var i, s, n;
          return this.active
            ? void (
                this.isLastItem() ||
                (this._hasScroll()
                  ? ((s = this.active.offset().top),
                    (n = this.element.height()),
                    this.active.nextAll(".ui-menu-item").each(function () {
                      return 0 > (i = t(this)).offset().top - s - n;
                    }),
                    this.focus(e, i))
                  : this.focus(
                      e,
                      this.activeMenu
                        .find(this.options.items)
                        [this.active ? "last" : "first"]()
                    ))
              )
            : void this.next(e);
        },
        previousPage: function (e) {
          var i, s, n;
          return this.active
            ? void (
                this.isFirstItem() ||
                (this._hasScroll()
                  ? ((s = this.active.offset().top),
                    (n = this.element.height()),
                    this.active.prevAll(".ui-menu-item").each(function () {
                      return (i = t(this)).offset().top - s + n > 0;
                    }),
                    this.focus(e, i))
                  : this.focus(
                      e,
                      this.activeMenu.find(this.options.items).first()
                    ))
              )
            : void this.next(e);
        },
        _hasScroll: function () {
          return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function (e) {
          this.active = this.active || t(e.target).closest(".ui-menu-item");
          var i = { item: this.active };
          this.active.has(".ui-menu").length || this.collapseAll(e, !0),
            this._trigger("select", e, i);
        },
        _filterMenuItems: function (e) {
          var i = RegExp(
            "^" + e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
            "i"
          );
          return this.activeMenu
            .find(this.options.items)
            .filter(".ui-menu-item")
            .filter(function () {
              return i.test(
                t.trim(t(this).children(".ui-menu-item-wrapper").text())
              );
            });
        },
      }),
      t.widget("ui.autocomplete", {
        version: "1.12.1",
        defaultElement: "<input>",
        options: {
          appendTo: null,
          autoFocus: !1,
          delay: 300,
          minLength: 1,
          position: { my: "left top", at: "left bottom", collision: "none" },
          source: null,
          change: null,
          close: null,
          focus: null,
          open: null,
          response: null,
          search: null,
          select: null,
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
          var e,
            i,
            s,
            n = this.element[0].nodeName.toLowerCase(),
            o = "textarea" === n,
            r = "input" === n;
          (this.isMultiLine =
            o || (!r && this._isContentEditable(this.element))),
            (this.valueMethod = this.element[o || r ? "val" : "text"]),
            (this.isNewMenu = !0),
            this._addClass("ui-autocomplete-input"),
            this.element.attr("autocomplete", "off"),
            this._on(this.element, {
              keydown: function (n) {
                if (this.element.prop("readOnly"))
                  return (e = !0), (s = !0), void (i = !0);
                (e = !1), (s = !1), (i = !1);
                var o = t.ui.keyCode;
                switch (n.keyCode) {
                  case o.PAGE_UP:
                    (e = !0), this._move("previousPage", n);
                    break;
                  case o.PAGE_DOWN:
                    (e = !0), this._move("nextPage", n);
                    break;
                  case o.UP:
                    (e = !0), this._keyEvent("previous", n);
                    break;
                  case o.DOWN:
                    (e = !0), this._keyEvent("next", n);
                    break;
                  case o.ENTER:
                    this.menu.active &&
                      ((e = !0), n.preventDefault(), this.menu.select(n));
                    break;
                  case o.TAB:
                    this.menu.active && this.menu.select(n);
                    break;
                  case o.ESCAPE:
                    this.menu.element.is(":visible") &&
                      (this.isMultiLine || this._value(this.term),
                      this.close(n),
                      n.preventDefault());
                    break;
                  default:
                    (i = !0), this._searchTimeout(n);
                }
              },
              keypress: function (s) {
                if (e)
                  return (
                    (e = !1),
                    void (
                      (!this.isMultiLine || this.menu.element.is(":visible")) &&
                      s.preventDefault()
                    )
                  );
                if (!i) {
                  var n = t.ui.keyCode;
                  switch (s.keyCode) {
                    case n.PAGE_UP:
                      this._move("previousPage", s);
                      break;
                    case n.PAGE_DOWN:
                      this._move("nextPage", s);
                      break;
                    case n.UP:
                      this._keyEvent("previous", s);
                      break;
                    case n.DOWN:
                      this._keyEvent("next", s);
                  }
                }
              },
              input: function (t) {
                return s
                  ? ((s = !1), void t.preventDefault())
                  : void this._searchTimeout(t);
              },
              focus: function () {
                (this.selectedItem = null), (this.previous = this._value());
              },
              blur: function (t) {
                return this.cancelBlur
                  ? void delete this.cancelBlur
                  : (clearTimeout(this.searching),
                    this.close(t),
                    void this._change(t));
              },
            }),
            this._initSource(),
            (this.menu = t("<ul>")
              .appendTo(this._appendTo())
              .menu({ role: null })
              .hide()
              .menu("instance")),
            this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
            this._on(this.menu.element, {
              mousedown: function (e) {
                e.preventDefault(),
                  (this.cancelBlur = !0),
                  this._delay(function () {
                    delete this.cancelBlur,
                      this.element[0] !==
                        t.ui.safeActiveElement(this.document[0]) &&
                        this.element.trigger("focus");
                  });
              },
              menufocus: function (e, i) {
                var s, n;
                return this.isNewMenu &&
                  ((this.isNewMenu = !1),
                  e.originalEvent && /^mouse/.test(e.originalEvent.type))
                  ? (this.menu.blur(),
                    void this.document.one("mousemove", function () {
                      t(e.target).trigger(e.originalEvent);
                    }))
                  : ((n = i.item.data("ui-autocomplete-item")),
                    !1 !== this._trigger("focus", e, { item: n }) &&
                      e.originalEvent &&
                      /^key/.test(e.originalEvent.type) &&
                      this._value(n.value),
                    void (
                      (s = i.item.attr("aria-label") || n.value) &&
                      t.trim(s).length &&
                      (this.liveRegion.children().hide(),
                      t("<div>").text(s).appendTo(this.liveRegion))
                    ));
              },
              menuselect: function (e, i) {
                var s = i.item.data("ui-autocomplete-item"),
                  n = this.previous;
                this.element[0] !== t.ui.safeActiveElement(this.document[0]) &&
                  (this.element.trigger("focus"),
                  (this.previous = n),
                  this._delay(function () {
                    (this.previous = n), (this.selectedItem = s);
                  })),
                  !1 !== this._trigger("select", e, { item: s }) &&
                    this._value(s.value),
                  (this.term = this._value()),
                  this.close(e),
                  (this.selectedItem = s);
              },
            }),
            (this.liveRegion = t("<div>", {
              role: "status",
              "aria-live": "assertive",
              "aria-relevant": "additions",
            }).appendTo(this.document[0].body)),
            this._addClass(
              this.liveRegion,
              null,
              "ui-helper-hidden-accessible"
            ),
            this._on(this.window, {
              beforeunload: function () {
                this.element.removeAttr("autocomplete");
              },
            });
        },
        _destroy: function () {
          clearTimeout(this.searching),
            this.element.removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove();
        },
        _setOption: function (t, e) {
          this._super(t, e),
            "source" === t && this._initSource(),
            "appendTo" === t && this.menu.element.appendTo(this._appendTo()),
            "disabled" === t && e && this.xhr && this.xhr.abort();
        },
        _isEventTargetInWidget: function (e) {
          var i = this.menu.element[0];
          return (
            e.target === this.element[0] ||
            e.target === i ||
            t.contains(i, e.target)
          );
        },
        _closeOnClickOutside: function (t) {
          this._isEventTargetInWidget(t) || this.close();
        },
        _appendTo: function () {
          var e = this.options.appendTo;
          return (
            e &&
              (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)),
            (e && e[0]) || (e = this.element.closest(".ui-front, dialog")),
            e.length || (e = this.document[0].body),
            e
          );
        },
        _initSource: function () {
          var e,
            i,
            s = this;
          t.isArray(this.options.source)
            ? ((e = this.options.source),
              (this.source = function (i, s) {
                s(t.ui.autocomplete.filter(e, i.term));
              }))
            : "string" == typeof this.options.source
            ? ((i = this.options.source),
              (this.source = function (e, n) {
                s.xhr && s.xhr.abort(),
                  (s.xhr = t.ajax({
                    url: i,
                    data: e,
                    dataType: "json",
                    success: function (t) {
                      n(t);
                    },
                    error: function () {
                      n([]);
                    },
                  }));
              }))
            : (this.source = this.options.source);
        },
        _searchTimeout: function (t) {
          clearTimeout(this.searching),
            (this.searching = this._delay(function () {
              var e = this.term === this._value(),
                i = this.menu.element.is(":visible"),
                s = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
              (e && (!e || i || s)) ||
                ((this.selectedItem = null), this.search(null, t));
            }, this.options.delay));
        },
        search: function (t, e) {
          return (
            (t = null != t ? t : this._value()),
            (this.term = this._value()),
            t.length < this.options.minLength
              ? this.close(e)
              : !1 !== this._trigger("search", e)
              ? this._search(t)
              : void 0
          );
        },
        _search: function (t) {
          this.pending++,
            this._addClass("ui-autocomplete-loading"),
            (this.cancelSearch = !1),
            this.source({ term: t }, this._response());
        },
        _response: function () {
          var e = ++this.requestIndex;
          return t.proxy(function (t) {
            e === this.requestIndex && this.__response(t),
              this.pending--,
              this.pending || this._removeClass("ui-autocomplete-loading");
          }, this);
        },
        __response: function (t) {
          t && (t = this._normalize(t)),
            this._trigger("response", null, { content: t }),
            !this.options.disabled && t && t.length && !this.cancelSearch
              ? (this._suggest(t), this._trigger("open"))
              : this._close();
        },
        close: function (t) {
          (this.cancelSearch = !0), this._close(t);
        },
        _close: function (t) {
          this._off(this.document, "mousedown"),
            this.menu.element.is(":visible") &&
              (this.menu.element.hide(),
              this.menu.blur(),
              (this.isNewMenu = !0),
              this._trigger("close", t));
        },
        _change: function (t) {
          this.previous !== this._value() &&
            this._trigger("change", t, { item: this.selectedItem });
        },
        _normalize: function (e) {
          return e.length && e[0].label && e[0].value
            ? e
            : t.map(e, function (e) {
                return "string" == typeof e
                  ? { label: e, value: e }
                  : t.extend({}, e, {
                      label: e.label || e.value,
                      value: e.value || e.label,
                    });
              });
        },
        _suggest: function (e) {
          var i = this.menu.element.empty();
          this._renderMenu(i, e),
            (this.isNewMenu = !0),
            this.menu.refresh(),
            i.show(),
            this._resizeMenu(),
            i.position(t.extend({ of: this.element }, this.options.position)),
            this.options.autoFocus && this.menu.next(),
            this._on(this.document, { mousedown: "_closeOnClickOutside" });
        },
        _resizeMenu: function () {
          var t = this.menu.element;
          t.outerWidth(
            Math.max(t.width("").outerWidth() + 1, this.element.outerWidth())
          );
        },
        _renderMenu: function (e, i) {
          var s = this;
          t.each(i, function (t, i) {
            s._renderItemData(e, i);
          });
        },
        _renderItemData: function (t, e) {
          return this._renderItem(t, e).data("ui-autocomplete-item", e);
        },
        _renderItem: function (e, i) {
          return t("<li>").append(t("<div>").text(i.label)).appendTo(e);
        },
        _move: function (t, e) {
          return this.menu.element.is(":visible")
            ? (this.menu.isFirstItem() && /^previous/.test(t)) ||
              (this.menu.isLastItem() && /^next/.test(t))
              ? (this.isMultiLine || this._value(this.term),
                void this.menu.blur())
              : void this.menu[t](e)
            : void this.search(null, e);
        },
        widget: function () {
          return this.menu.element;
        },
        _value: function () {
          return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function (t, e) {
          (!this.isMultiLine || this.menu.element.is(":visible")) &&
            (this._move(t, e), e.preventDefault());
        },
        _isContentEditable: function (t) {
          if (!t.length) return !1;
          var e = t.prop("contentEditable");
          return "inherit" === e
            ? this._isContentEditable(t.parent())
            : "true" === e;
        },
      }),
      t.extend(t.ui.autocomplete, {
        escapeRegex: function (t) {
          return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function (e, i) {
          var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
          return t.grep(e, function (t) {
            return s.test(t.label || t.value || t);
          });
        },
      }),
      t.widget("ui.autocomplete", t.ui.autocomplete, {
        options: {
          messages: {
            noResults: "No search results.",
            results: function (t) {
              return (
                t +
                (t > 1 ? " results are" : " result is") +
                " available, use up and down arrow keys to navigate."
              );
            },
          },
        },
        __response: function (e) {
          var i;
          this._superApply(arguments),
            this.options.disabled ||
              this.cancelSearch ||
              ((i =
                e && e.length
                  ? this.options.messages.results(e.length)
                  : this.options.messages.noResults),
              this.liveRegion.children().hide(),
              t("<div>").text(i).appendTo(this.liveRegion));
        },
      }),
      t.ui.autocomplete;
    var m,
      v,
      b = /ui-corner-([a-z]){2,6}/g;
    t.widget("ui.controlgroup", {
      version: "1.12.1",
      defaultElement: "<div>",
      options: {
        direction: "horizontal",
        disabled: null,
        onlyVisible: !0,
        items: {
          button:
            "input[type=button], input[type=submit], input[type=reset], button, a",
          controlgroupLabel: ".ui-controlgroup-label",
          checkboxradio: "input[type='checkbox'], input[type='radio']",
          selectmenu: "select",
          spinner: ".ui-spinner-input",
        },
      },
      _create: function () {
        this._enhance();
      },
      _enhance: function () {
        this.element.attr("role", "toolbar"), this.refresh();
      },
      _destroy: function () {
        this._callChildMethod("destroy"),
          this.childWidgets.removeData("ui-controlgroup-data"),
          this.element.removeAttr("role"),
          this.options.items.controlgroupLabel &&
            this.element
              .find(this.options.items.controlgroupLabel)
              .find(".ui-controlgroup-label-contents")
              .contents()
              .unwrap();
      },
      _initWidgets: function () {
        var e = this,
          i = [];
        t.each(this.options.items, function (s, n) {
          var o,
            r = {};
          return n
            ? "controlgroupLabel" === s
              ? ((o = e.element.find(n)).each(function () {
                  var e = t(this);
                  e.children(".ui-controlgroup-label-contents").length ||
                    e
                      .contents()
                      .wrapAll(
                        "<span class='ui-controlgroup-label-contents'></span>"
                      );
                }),
                e._addClass(
                  o,
                  null,
                  "ui-widget ui-widget-content ui-state-default"
                ),
                void (i = i.concat(o.get())))
              : void (
                  t.fn[s] &&
                  ((r = e["_" + s + "Options"]
                    ? e["_" + s + "Options"]("middle")
                    : { classes: {} }),
                  e.element.find(n).each(function () {
                    var n = t(this),
                      o = n[s]("instance"),
                      a = t.widget.extend({}, r);
                    if ("button" !== s || !n.parent(".ui-spinner").length) {
                      o || (o = n[s]()[s]("instance")),
                        o &&
                          (a.classes = e._resolveClassesValues(a.classes, o)),
                        n[s](a);
                      var l = n[s]("widget");
                      t.data(
                        l[0],
                        "ui-controlgroup-data",
                        o || n[s]("instance")
                      ),
                        i.push(l[0]);
                    }
                  }))
                )
            : void 0;
        }),
          (this.childWidgets = t(t.unique(i))),
          this._addClass(this.childWidgets, "ui-controlgroup-item");
      },
      _callChildMethod: function (e) {
        this.childWidgets.each(function () {
          var i = t(this).data("ui-controlgroup-data");
          i && i[e] && i[e]();
        });
      },
      _updateCornerClass: function (t, e) {
        var i = this._buildSimpleOptions(e, "label").classes.label;
        this._removeClass(
          t,
          null,
          "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"
        ),
          this._addClass(t, null, i);
      },
      _buildSimpleOptions: function (t, e) {
        var i = "vertical" === this.options.direction,
          s = { classes: {} };
        return (
          (s.classes[e] = {
            middle: "",
            first: "ui-corner-" + (i ? "top" : "left"),
            last: "ui-corner-" + (i ? "bottom" : "right"),
            only: "ui-corner-all",
          }[t]),
          s
        );
      },
      _spinnerOptions: function (t) {
        var e = this._buildSimpleOptions(t, "ui-spinner");
        return (
          (e.classes["ui-spinner-up"] = ""),
          (e.classes["ui-spinner-down"] = ""),
          e
        );
      },
      _buttonOptions: function (t) {
        return this._buildSimpleOptions(t, "ui-button");
      },
      _checkboxradioOptions: function (t) {
        return this._buildSimpleOptions(t, "ui-checkboxradio-label");
      },
      _selectmenuOptions: function (t) {
        var e = "vertical" === this.options.direction;
        return {
          width: !!e && "auto",
          classes: {
            middle: {
              "ui-selectmenu-button-open": "",
              "ui-selectmenu-button-closed": "",
            },
            first: {
              "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
              "ui-selectmenu-button-closed":
                "ui-corner-" + (e ? "top" : "left"),
            },
            last: {
              "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
              "ui-selectmenu-button-closed":
                "ui-corner-" + (e ? "bottom" : "right"),
            },
            only: {
              "ui-selectmenu-button-open": "ui-corner-top",
              "ui-selectmenu-button-closed": "ui-corner-all",
            },
          }[t],
        };
      },
      _resolveClassesValues: function (e, i) {
        var s = {};
        return (
          t.each(e, function (n) {
            var o = i.options.classes[n] || "";
            (o = t.trim(o.replace(b, ""))),
              (s[n] = (o + " " + e[n]).replace(/\s+/g, " "));
          }),
          s
        );
      },
      _setOption: function (t, e) {
        return (
          "direction" === t &&
            this._removeClass("ui-controlgroup-" + this.options.direction),
          this._super(t, e),
          "disabled" === t
            ? void this._callChildMethod(e ? "disable" : "enable")
            : void this.refresh()
        );
      },
      refresh: function () {
        var e,
          i = this;
        this._addClass(
          "ui-controlgroup ui-controlgroup-" + this.options.direction
        ),
          "horizontal" === this.options.direction &&
            this._addClass(null, "ui-helper-clearfix"),
          this._initWidgets(),
          (e = this.childWidgets),
          this.options.onlyVisible && (e = e.filter(":visible")),
          e.length &&
            (t.each(["first", "last"], function (t, s) {
              var n = e[s]().data("ui-controlgroup-data");
              if (n && i["_" + n.widgetName + "Options"]) {
                var o = i["_" + n.widgetName + "Options"](
                  1 === e.length ? "only" : s
                );
                (o.classes = i._resolveClassesValues(o.classes, n)),
                  n.element[n.widgetName](o);
              } else i._updateCornerClass(e[s](), s);
            }),
            this._callChildMethod("refresh"));
      },
    }),
      t.widget("ui.checkboxradio", [
        t.ui.formResetMixin,
        {
          version: "1.12.1",
          options: {
            disabled: null,
            label: null,
            icon: !0,
            classes: {
              "ui-checkboxradio-label": "ui-corner-all",
              "ui-checkboxradio-icon": "ui-corner-all",
            },
          },
          _getCreateOptions: function () {
            var e,
              i,
              s = this,
              n = this._super() || {};
            return (
              this._readType(),
              (i = this.element.labels()),
              (this.label = t(i[i.length - 1])),
              this.label.length ||
                t.error("No label found for checkboxradio widget"),
              (this.originalLabel = ""),
              this.label
                .contents()
                .not(this.element[0])
                .each(function () {
                  s.originalLabel +=
                    3 === this.nodeType ? t(this).text() : this.outerHTML;
                }),
              this.originalLabel && (n.label = this.originalLabel),
              null != (e = this.element[0].disabled) && (n.disabled = e),
              n
            );
          },
          _create: function () {
            var t = this.element[0].checked;
            this._bindFormResetHandler(),
              null == this.options.disabled &&
                (this.options.disabled = this.element[0].disabled),
              this._setOption("disabled", this.options.disabled),
              this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
              this._addClass(
                this.label,
                "ui-checkboxradio-label",
                "ui-button ui-widget"
              ),
              "radio" === this.type &&
                this._addClass(this.label, "ui-checkboxradio-radio-label"),
              this.options.label && this.options.label !== this.originalLabel
                ? this._updateLabel()
                : this.originalLabel &&
                  (this.options.label = this.originalLabel),
              this._enhance(),
              t &&
                (this._addClass(
                  this.label,
                  "ui-checkboxradio-checked",
                  "ui-state-active"
                ),
                this.icon && this._addClass(this.icon, null, "ui-state-hover")),
              this._on({
                change: "_toggleClasses",
                focus: function () {
                  this._addClass(
                    this.label,
                    null,
                    "ui-state-focus ui-visual-focus"
                  );
                },
                blur: function () {
                  this._removeClass(
                    this.label,
                    null,
                    "ui-state-focus ui-visual-focus"
                  );
                },
              });
          },
          _readType: function () {
            var e = this.element[0].nodeName.toLowerCase();
            (this.type = this.element[0].type),
              ("input" === e && /radio|checkbox/.test(this.type)) ||
                t.error(
                  "Can't create checkboxradio on element.nodeName=" +
                    e +
                    " and element.type=" +
                    this.type
                );
          },
          _enhance: function () {
            this._updateIcon(this.element[0].checked);
          },
          widget: function () {
            return this.label;
          },
          _getRadioGroup: function () {
            var e,
              i = this.element[0].name,
              s = "input[name='" + t.ui.escapeSelector(i) + "']";
            return i
              ? (e = this.form.length
                  ? t(this.form[0].elements).filter(s)
                  : t(s).filter(function () {
                      return 0 === t(this).form().length;
                    })).not(this.element)
              : t([]);
          },
          _toggleClasses: function () {
            var e = this.element[0].checked;
            this._toggleClass(
              this.label,
              "ui-checkboxradio-checked",
              "ui-state-active",
              e
            ),
              this.options.icon &&
                "checkbox" === this.type &&
                this._toggleClass(
                  this.icon,
                  null,
                  "ui-icon-check ui-state-checked",
                  e
                )._toggleClass(this.icon, null, "ui-icon-blank", !e),
              "radio" === this.type &&
                this._getRadioGroup().each(function () {
                  var e = t(this).checkboxradio("instance");
                  e &&
                    e._removeClass(
                      e.label,
                      "ui-checkboxradio-checked",
                      "ui-state-active"
                    );
                });
          },
          _destroy: function () {
            this._unbindFormResetHandler(),
              this.icon && (this.icon.remove(), this.iconSpace.remove());
          },
          _setOption: function (t, e) {
            return "label" !== t || e
              ? (this._super(t, e),
                "disabled" === t
                  ? (this._toggleClass(
                      this.label,
                      null,
                      "ui-state-disabled",
                      e
                    ),
                    void (this.element[0].disabled = e))
                  : void this.refresh())
              : void 0;
          },
          _updateIcon: function (e) {
            var i = "ui-icon ui-icon-background ";
            this.options.icon
              ? (this.icon ||
                  ((this.icon = t("<span>")),
                  (this.iconSpace = t("<span> </span>")),
                  this._addClass(
                    this.iconSpace,
                    "ui-checkboxradio-icon-space"
                  )),
                "checkbox" === this.type
                  ? ((i += e
                      ? "ui-icon-check ui-state-checked"
                      : "ui-icon-blank"),
                    this._removeClass(
                      this.icon,
                      null,
                      e ? "ui-icon-blank" : "ui-icon-check"
                    ))
                  : (i += "ui-icon-blank"),
                this._addClass(this.icon, "ui-checkboxradio-icon", i),
                e ||
                  this._removeClass(
                    this.icon,
                    null,
                    "ui-icon-check ui-state-checked"
                  ),
                this.icon.prependTo(this.label).after(this.iconSpace))
              : void 0 !== this.icon &&
                (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
          },
          _updateLabel: function () {
            var t = this.label.contents().not(this.element[0]);
            this.icon && (t = t.not(this.icon[0])),
              this.iconSpace && (t = t.not(this.iconSpace[0])),
              t.remove(),
              this.label.append(this.options.label);
          },
          refresh: function () {
            var t = this.element[0].checked,
              e = this.element[0].disabled;
            this._updateIcon(t),
              this._toggleClass(
                this.label,
                "ui-checkboxradio-checked",
                "ui-state-active",
                t
              ),
              null !== this.options.label && this._updateLabel(),
              e !== this.options.disabled && this._setOptions({ disabled: e });
          },
        },
      ]),
      t.ui.checkboxradio,
      t.widget("ui.button", {
        version: "1.12.1",
        defaultElement: "<button>",
        options: {
          classes: { "ui-button": "ui-corner-all" },
          disabled: null,
          icon: null,
          iconPosition: "beginning",
          label: null,
          showLabel: !0,
        },
        _getCreateOptions: function () {
          var t,
            e = this._super() || {};
          return (
            (this.isInput = this.element.is("input")),
            null != (t = this.element[0].disabled) && (e.disabled = t),
            (this.originalLabel = this.isInput
              ? this.element.val()
              : this.element.html()),
            this.originalLabel && (e.label = this.originalLabel),
            e
          );
        },
        _create: function () {
          !this.option.showLabel & !this.options.icon &&
            (this.options.showLabel = !0),
            null == this.options.disabled &&
              (this.options.disabled = this.element[0].disabled || !1),
            (this.hasTitle = !!this.element.attr("title")),
            this.options.label &&
              this.options.label !== this.originalLabel &&
              (this.isInput
                ? this.element.val(this.options.label)
                : this.element.html(this.options.label)),
            this._addClass("ui-button", "ui-widget"),
            this._setOption("disabled", this.options.disabled),
            this._enhance(),
            this.element.is("a") &&
              this._on({
                keyup: function (e) {
                  e.keyCode === t.ui.keyCode.SPACE &&
                    (e.preventDefault(),
                    this.element[0].click
                      ? this.element[0].click()
                      : this.element.trigger("click"));
                },
              });
        },
        _enhance: function () {
          this.element.is("button") || this.element.attr("role", "button"),
            this.options.icon &&
              (this._updateIcon("icon", this.options.icon),
              this._updateTooltip());
        },
        _updateTooltip: function () {
          (this.title = this.element.attr("title")),
            this.options.showLabel ||
              this.title ||
              this.element.attr("title", this.options.label);
        },
        _updateIcon: function (e, i) {
          var s = "iconPosition" !== e,
            n = s ? this.options.iconPosition : i;
          this.icon
            ? s && this._removeClass(this.icon, null, this.options.icon)
            : ((this.icon = t("<span>")),
              this._addClass(this.icon, "ui-button-icon", "ui-icon"),
              this.options.showLabel || this._addClass("ui-button-icon-only")),
            s && this._addClass(this.icon, null, i),
            this._attachIcon(n),
            "top" === n || "bottom" === n
              ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
                this.iconSpace && this.iconSpace.remove())
              : (this.iconSpace ||
                  ((this.iconSpace = t("<span> </span>")),
                  this._addClass(this.iconSpace, "ui-button-icon-space")),
                this._removeClass(this.icon, null, "ui-wiget-icon-block"),
                this._attachIconSpace(n));
        },
        _destroy: function () {
          this.element.removeAttr("role"),
            this.icon && this.icon.remove(),
            this.iconSpace && this.iconSpace.remove(),
            this.hasTitle || this.element.removeAttr("title");
        },
        _attachIconSpace: function (t) {
          this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](
            this.iconSpace
          );
        },
        _attachIcon: function (t) {
          this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](
            this.icon
          );
        },
        _setOptions: function (t) {
          var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
            i = void 0 === t.icon ? this.options.icon : t.icon;
          e || i || (t.showLabel = !0), this._super(t);
        },
        _setOption: function (t, e) {
          "icon" === t &&
            (e
              ? this._updateIcon(t, e)
              : this.icon &&
                (this.icon.remove(),
                this.iconSpace && this.iconSpace.remove())),
            "iconPosition" === t && this._updateIcon(t, e),
            "showLabel" === t &&
              (this._toggleClass("ui-button-icon-only", null, !e),
              this._updateTooltip()),
            "label" === t &&
              (this.isInput
                ? this.element.val(e)
                : (this.element.html(e),
                  this.icon &&
                    (this._attachIcon(this.options.iconPosition),
                    this._attachIconSpace(this.options.iconPosition)))),
            this._super(t, e),
            "disabled" === t &&
              (this._toggleClass(null, "ui-state-disabled", e),
              (this.element[0].disabled = e),
              e && this.element.blur());
        },
        refresh: function () {
          var t = this.element.is("input, button")
            ? this.element[0].disabled
            : this.element.hasClass("ui-button-disabled");
          t !== this.options.disabled && this._setOptions({ disabled: t }),
            this._updateTooltip();
        },
      }),
      !1 !== t.uiBackCompat &&
        (t.widget("ui.button", t.ui.button, {
          options: { text: !0, icons: { primary: null, secondary: null } },
          _create: function () {
            this.options.showLabel &&
              !this.options.text &&
              (this.options.showLabel = this.options.text),
              !this.options.showLabel &&
                this.options.text &&
                (this.options.text = this.options.showLabel),
              !this.options.icon &&
              (this.options.icons.primary || this.options.icons.secondary)
                ? this.options.icons.primary
                  ? (this.options.icon = this.options.icons.primary)
                  : ((this.options.icon = this.options.icons.secondary),
                    (this.options.iconPosition = "end"))
                : this.options.icon &&
                  (this.options.icons.primary = this.options.icon),
              this._super();
          },
          _setOption: function (t, e) {
            return "text" === t
              ? void this._super("showLabel", e)
              : ("showLabel" === t && (this.options.text = e),
                "icon" === t && (this.options.icons.primary = e),
                "icons" === t &&
                  (e.primary
                    ? (this._super("icon", e.primary),
                      this._super("iconPosition", "beginning"))
                    : e.secondary &&
                      (this._super("icon", e.secondary),
                      this._super("iconPosition", "end"))),
                void this._superApply(arguments));
          },
        }),
        (t.fn.button =
          ((m = t.fn.button),
          function () {
            return !this.length ||
              (this.length && "INPUT" !== this[0].tagName) ||
              (this.length &&
                "INPUT" === this[0].tagName &&
                "checkbox" !== this.attr("type") &&
                "radio" !== this.attr("type"))
              ? m.apply(this, arguments)
              : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"),
                0 === arguments.length
                  ? this.checkboxradio({ icon: !1 })
                  : this.checkboxradio.apply(this, arguments));
          })),
        (t.fn.buttonset = function () {
          return (
            t.ui.controlgroup || t.error("Controlgroup widget missing"),
            "option" === arguments[0] &&
            "items" === arguments[1] &&
            arguments[2]
              ? this.controlgroup.apply(this, [
                  arguments[0],
                  "items.button",
                  arguments[2],
                ])
              : "option" === arguments[0] && "items" === arguments[1]
              ? this.controlgroup.apply(this, [arguments[0], "items.button"])
              : ("object" == typeof arguments[0] &&
                  arguments[0].items &&
                  (arguments[0].items = { button: arguments[0].items }),
                this.controlgroup.apply(this, arguments))
          );
        })),
      t.ui.button,
      t.extend(t.ui, { datepicker: { version: "1.12.1" } }),
      t.extend(e.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
          return this.dpDiv;
        },
        setDefaults: function (t) {
          return n(this._defaults, t || {}), this;
        },
        _attachDatepicker: function (e, i) {
          var s, n, o;
          (n = "div" === (s = e.nodeName.toLowerCase()) || "span" === s),
            e.id || ((this.uuid += 1), (e.id = "dp" + this.uuid)),
            ((o = this._newInst(t(e), n)).settings = t.extend({}, i || {})),
            "input" === s
              ? this._connectDatepicker(e, o)
              : n && this._inlineDatepicker(e, o);
        },
        _newInst: function (e, s) {
          return {
            id: e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
            input: e,
            selectedDay: 0,
            selectedMonth: 0,
            selectedYear: 0,
            drawMonth: 0,
            drawYear: 0,
            inline: s,
            dpDiv: s
              ? i(
                  t(
                    "<div class='" +
                      this._inlineClass +
                      " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
                  )
                )
              : this.dpDiv,
          };
        },
        _connectDatepicker: function (e, i) {
          var s = t(e);
          (i.append = t([])),
            (i.trigger = t([])),
            s.hasClass(this.markerClassName) ||
              (this._attachments(s, i),
              s
                .addClass(this.markerClassName)
                .on("keydown", this._doKeyDown)
                .on("keypress", this._doKeyPress)
                .on("keyup", this._doKeyUp),
              this._autoSize(i),
              t.data(e, "datepicker", i),
              i.settings.disabled && this._disableDatepicker(e));
        },
        _attachments: function (e, i) {
          var s,
            n,
            o,
            r = this._get(i, "appendText"),
            a = this._get(i, "isRTL");
          i.append && i.append.remove(),
            r &&
              ((i.append = t(
                "<span class='" + this._appendClass + "'>" + r + "</span>"
              )),
              e[a ? "before" : "after"](i.append)),
            e.off("focus", this._showDatepicker),
            i.trigger && i.trigger.remove(),
            ("focus" === (s = this._get(i, "showOn")) || "both" === s) &&
              e.on("focus", this._showDatepicker),
            ("button" === s || "both" === s) &&
              ((n = this._get(i, "buttonText")),
              (o = this._get(i, "buttonImage")),
              (i.trigger = t(
                this._get(i, "buttonImageOnly")
                  ? t("<img/>")
                      .addClass(this._triggerClass)
                      .attr({ src: o, alt: n, title: n })
                  : t("<button type='button'></button>")
                      .addClass(this._triggerClass)
                      .html(
                        o ? t("<img/>").attr({ src: o, alt: n, title: n }) : n
                      )
              )),
              e[a ? "before" : "after"](i.trigger),
              i.trigger.on("click", function () {
                return (
                  t.datepicker._datepickerShowing &&
                  t.datepicker._lastInput === e[0]
                    ? t.datepicker._hideDatepicker()
                    : (t.datepicker._datepickerShowing &&
                        t.datepicker._lastInput !== e[0] &&
                        t.datepicker._hideDatepicker(),
                      t.datepicker._showDatepicker(e[0])),
                  !1
                );
              }));
        },
        _autoSize: function (t) {
          if (this._get(t, "autoSize") && !t.inline) {
            var e,
              i,
              s,
              n,
              o = new Date(2009, 11, 20),
              r = this._get(t, "dateFormat");
            r.match(/[DM]/) &&
              ((e = function (t) {
                for (i = 0, s = 0, n = 0; t.length > n; n++)
                  t[n].length > i && ((i = t[n].length), (s = n));
                return s;
              }),
              o.setMonth(
                e(
                  this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort")
                )
              ),
              o.setDate(
                e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) +
                  20 -
                  o.getDay()
              )),
              t.input.attr("size", this._formatDate(t, o).length);
          }
        },
        _inlineDatepicker: function (e, i) {
          var s = t(e);
          s.hasClass(this.markerClassName) ||
            (s.addClass(this.markerClassName).append(i.dpDiv),
            t.data(e, "datepicker", i),
            this._setDate(i, this._getDefaultDate(i), !0),
            this._updateDatepicker(i),
            this._updateAlternate(i),
            i.settings.disabled && this._disableDatepicker(e),
            i.dpDiv.css("display", "block"));
        },
        _dialogDatepicker: function (e, i, s, o, r) {
          var a,
            l,
            h,
            c,
            u,
            d = this._dialogInst;
          return (
            d ||
              ((this.uuid += 1),
              (a = "dp" + this.uuid),
              (this._dialogInput = t(
                "<input type='text' id='" +
                  a +
                  "' style='position: absolute; top: -100px; width: 0px;'/>"
              )),
              this._dialogInput.on("keydown", this._doKeyDown),
              t("body").append(this._dialogInput),
              ((d = this._dialogInst =
                this._newInst(this._dialogInput, !1)).settings = {}),
              t.data(this._dialogInput[0], "datepicker", d)),
            n(d.settings, o || {}),
            (i = i && i.constructor === Date ? this._formatDate(d, i) : i),
            this._dialogInput.val(i),
            (this._pos = r ? (r.length ? r : [r.pageX, r.pageY]) : null),
            this._pos ||
              ((l = document.documentElement.clientWidth),
              (h = document.documentElement.clientHeight),
              (c =
                document.documentElement.scrollLeft ||
                document.body.scrollLeft),
              (u =
                document.documentElement.scrollTop || document.body.scrollTop),
              (this._pos = [l / 2 - 100 + c, h / 2 - 150 + u])),
            this._dialogInput
              .css("left", this._pos[0] + 20 + "px")
              .css("top", this._pos[1] + "px"),
            (d.settings.onSelect = s),
            (this._inDialog = !0),
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            t.blockUI && t.blockUI(this.dpDiv),
            t.data(this._dialogInput[0], "datepicker", d),
            this
          );
        },
        _destroyDatepicker: function (e) {
          var i,
            s = t(e),
            n = t.data(e, "datepicker");
          s.hasClass(this.markerClassName) &&
            ((i = e.nodeName.toLowerCase()),
            t.removeData(e, "datepicker"),
            "input" === i
              ? (n.append.remove(),
                n.trigger.remove(),
                s
                  .removeClass(this.markerClassName)
                  .off("focus", this._showDatepicker)
                  .off("keydown", this._doKeyDown)
                  .off("keypress", this._doKeyPress)
                  .off("keyup", this._doKeyUp))
              : ("div" === i || "span" === i) &&
                s.removeClass(this.markerClassName).empty(),
            r === n && (r = null));
        },
        _enableDatepicker: function (e) {
          var i,
            s,
            n = t(e),
            o = t.data(e, "datepicker");
          n.hasClass(this.markerClassName) &&
            ("input" === (i = e.nodeName.toLowerCase())
              ? ((e.disabled = !1),
                o.trigger
                  .filter("button")
                  .each(function () {
                    this.disabled = !1;
                  })
                  .end()
                  .filter("img")
                  .css({ opacity: "1.0", cursor: "" }))
              : ("div" === i || "span" === i) &&
                ((s = n.children("." + this._inlineClass))
                  .children()
                  .removeClass("ui-state-disabled"),
                s
                  .find("select.ui-datepicker-month, select.ui-datepicker-year")
                  .prop("disabled", !1)),
            (this._disabledInputs = t.map(this._disabledInputs, function (t) {
              return t === e ? null : t;
            })));
        },
        _disableDatepicker: function (e) {
          var i,
            s,
            n = t(e),
            o = t.data(e, "datepicker");
          n.hasClass(this.markerClassName) &&
            ("input" === (i = e.nodeName.toLowerCase())
              ? ((e.disabled = !0),
                o.trigger
                  .filter("button")
                  .each(function () {
                    this.disabled = !0;
                  })
                  .end()
                  .filter("img")
                  .css({ opacity: "0.5", cursor: "default" }))
              : ("div" === i || "span" === i) &&
                ((s = n.children("." + this._inlineClass))
                  .children()
                  .addClass("ui-state-disabled"),
                s
                  .find("select.ui-datepicker-month, select.ui-datepicker-year")
                  .prop("disabled", !0)),
            (this._disabledInputs = t.map(this._disabledInputs, function (t) {
              return t === e ? null : t;
            })),
            (this._disabledInputs[this._disabledInputs.length] = e));
        },
        _isDisabledDatepicker: function (t) {
          if (!t) return !1;
          for (var e = 0; this._disabledInputs.length > e; e++)
            if (this._disabledInputs[e] === t) return !0;
          return !1;
        },
        _getInst: function (e) {
          try {
            return t.data(e, "datepicker");
          } catch (i) {
            throw "Missing instance data for this datepicker";
          }
        },
        _optionDatepicker: function (e, i, s) {
          var o,
            r,
            a,
            l,
            h = this._getInst(e);
          return 2 === arguments.length && "string" == typeof i
            ? "defaults" === i
              ? t.extend({}, t.datepicker._defaults)
              : h
              ? "all" === i
                ? t.extend({}, h.settings)
                : this._get(h, i)
              : null
            : ((o = i || {}),
              "string" == typeof i && ((o = {})[i] = s),
              void (
                h &&
                (this._curInst === h && this._hideDatepicker(),
                (r = this._getDateDatepicker(e, !0)),
                (a = this._getMinMaxDate(h, "min")),
                (l = this._getMinMaxDate(h, "max")),
                n(h.settings, o),
                null !== a &&
                  void 0 !== o.dateFormat &&
                  void 0 === o.minDate &&
                  (h.settings.minDate = this._formatDate(h, a)),
                null !== l &&
                  void 0 !== o.dateFormat &&
                  void 0 === o.maxDate &&
                  (h.settings.maxDate = this._formatDate(h, l)),
                "disabled" in o &&
                  (o.disabled
                    ? this._disableDatepicker(e)
                    : this._enableDatepicker(e)),
                this._attachments(t(e), h),
                this._autoSize(h),
                this._setDate(h, r),
                this._updateAlternate(h),
                this._updateDatepicker(h))
              ));
        },
        _changeDatepicker: function (t, e, i) {
          this._optionDatepicker(t, e, i);
        },
        _refreshDatepicker: function (t) {
          var e = this._getInst(t);
          e && this._updateDatepicker(e);
        },
        _setDateDatepicker: function (t, e) {
          var i = this._getInst(t);
          i &&
            (this._setDate(i, e),
            this._updateDatepicker(i),
            this._updateAlternate(i));
        },
        _getDateDatepicker: function (t, e) {
          var i = this._getInst(t);
          return (
            i && !i.inline && this._setDateFromField(i, e),
            i ? this._getDate(i) : null
          );
        },
        _doKeyDown: function (e) {
          var i,
            s,
            n,
            o = t.datepicker._getInst(e.target),
            r = !0,
            a = o.dpDiv.is(".ui-datepicker-rtl");
          if (((o._keyEvent = !0), t.datepicker._datepickerShowing))
            switch (e.keyCode) {
              case 9:
                t.datepicker._hideDatepicker(), (r = !1);
                break;
              case 13:
                return (
                  (n = t(
                    "td." +
                      t.datepicker._dayOverClass +
                      ":not(." +
                      t.datepicker._currentClass +
                      ")",
                    o.dpDiv
                  ))[0] &&
                    t.datepicker._selectDay(
                      e.target,
                      o.selectedMonth,
                      o.selectedYear,
                      n[0]
                    ),
                  (i = t.datepicker._get(o, "onSelect"))
                    ? ((s = t.datepicker._formatDate(o)),
                      i.apply(o.input ? o.input[0] : null, [s, o]))
                    : t.datepicker._hideDatepicker(),
                  !1
                );
              case 27:
                t.datepicker._hideDatepicker();
                break;
              case 33:
                t.datepicker._adjustDate(
                  e.target,
                  e.ctrlKey
                    ? -t.datepicker._get(o, "stepBigMonths")
                    : -t.datepicker._get(o, "stepMonths"),
                  "M"
                );
                break;
              case 34:
                t.datepicker._adjustDate(
                  e.target,
                  e.ctrlKey
                    ? +t.datepicker._get(o, "stepBigMonths")
                    : +t.datepicker._get(o, "stepMonths"),
                  "M"
                );
                break;
              case 35:
                (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target),
                  (r = e.ctrlKey || e.metaKey);
                break;
              case 36:
                (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target),
                  (r = e.ctrlKey || e.metaKey);
                break;
              case 37:
                (e.ctrlKey || e.metaKey) &&
                  t.datepicker._adjustDate(e.target, a ? 1 : -1, "D"),
                  (r = e.ctrlKey || e.metaKey),
                  e.originalEvent.altKey &&
                    t.datepicker._adjustDate(
                      e.target,
                      e.ctrlKey
                        ? -t.datepicker._get(o, "stepBigMonths")
                        : -t.datepicker._get(o, "stepMonths"),
                      "M"
                    );
                break;
              case 38:
                (e.ctrlKey || e.metaKey) &&
                  t.datepicker._adjustDate(e.target, -7, "D"),
                  (r = e.ctrlKey || e.metaKey);
                break;
              case 39:
                (e.ctrlKey || e.metaKey) &&
                  t.datepicker._adjustDate(e.target, a ? -1 : 1, "D"),
                  (r = e.ctrlKey || e.metaKey),
                  e.originalEvent.altKey &&
                    t.datepicker._adjustDate(
                      e.target,
                      e.ctrlKey
                        ? +t.datepicker._get(o, "stepBigMonths")
                        : +t.datepicker._get(o, "stepMonths"),
                      "M"
                    );
                break;
              case 40:
                (e.ctrlKey || e.metaKey) &&
                  t.datepicker._adjustDate(e.target, 7, "D"),
                  (r = e.ctrlKey || e.metaKey);
                break;
              default:
                r = !1;
            }
          else
            36 === e.keyCode && e.ctrlKey
              ? t.datepicker._showDatepicker(this)
              : (r = !1);
          r && (e.preventDefault(), e.stopPropagation());
        },
        _doKeyPress: function (e) {
          var i,
            s,
            n = t.datepicker._getInst(e.target);
          return t.datepicker._get(n, "constrainInput")
            ? ((i = t.datepicker._possibleChars(
                t.datepicker._get(n, "dateFormat")
              )),
              (s = String.fromCharCode(
                null == e.charCode ? e.keyCode : e.charCode
              )),
              e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1)
            : void 0;
        },
        _doKeyUp: function (e) {
          var i,
            s = t.datepicker._getInst(e.target);
          if (s.input.val() !== s.lastVal)
            try {
              (i = t.datepicker.parseDate(
                t.datepicker._get(s, "dateFormat"),
                s.input ? s.input.val() : null,
                t.datepicker._getFormatConfig(s)
              )) &&
                (t.datepicker._setDateFromField(s),
                t.datepicker._updateAlternate(s),
                t.datepicker._updateDatepicker(s));
            } catch (n) {}
          return !0;
        },
        _showDatepicker: function (e) {
          if (
            ("input" !== (e = e.target || e).nodeName.toLowerCase() &&
              (e = t("input", e.parentNode)[0]),
            !t.datepicker._isDisabledDatepicker(e) &&
              t.datepicker._lastInput !== e)
          ) {
            var i, s, o, r, a, l, h;
            (i = t.datepicker._getInst(e)),
              t.datepicker._curInst &&
                t.datepicker._curInst !== i &&
                (t.datepicker._curInst.dpDiv.stop(!0, !0),
                i &&
                  t.datepicker._datepickerShowing &&
                  t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),
              !1 !==
                (o = (s = t.datepicker._get(i, "beforeShow"))
                  ? s.apply(e, [e, i])
                  : {}) &&
                (n(i.settings, o),
                (i.lastVal = null),
                (t.datepicker._lastInput = e),
                t.datepicker._setDateFromField(i),
                t.datepicker._inDialog && (e.value = ""),
                t.datepicker._pos ||
                  ((t.datepicker._pos = t.datepicker._findPos(e)),
                  (t.datepicker._pos[1] += e.offsetHeight)),
                (r = !1),
                t(e)
                  .parents()
                  .each(function () {
                    return !(r |= "fixed" === t(this).css("position"));
                  }),
                (a = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }),
                (t.datepicker._pos = null),
                i.dpDiv.empty(),
                i.dpDiv.css({
                  position: "absolute",
                  display: "block",
                  top: "-1000px",
                }),
                t.datepicker._updateDatepicker(i),
                (a = t.datepicker._checkOffset(i, a, r)),
                i.dpDiv.css({
                  position:
                    t.datepicker._inDialog && t.blockUI
                      ? "static"
                      : r
                      ? "fixed"
                      : "absolute",
                  display: "none",
                  left: a.left + "px",
                  top: a.top + "px",
                }),
                i.inline ||
                  ((l = t.datepicker._get(i, "showAnim")),
                  (h = t.datepicker._get(i, "duration")),
                  i.dpDiv.css(
                    "z-index",
                    (function t(e) {
                      for (var i, s; e.length && e[0] !== document; ) {
                        if (
                          ("absolute" === (i = e.css("position")) ||
                            "relative" === i ||
                            "fixed" === i) &&
                          ((s = parseInt(e.css("zIndex"), 10)),
                          !isNaN(s) && 0 !== s)
                        )
                          return s;
                        e = e.parent();
                      }
                      return 0;
                    })(t(e)) + 1
                  ),
                  (t.datepicker._datepickerShowing = !0),
                  t.effects && t.effects.effect[l]
                    ? i.dpDiv.show(l, t.datepicker._get(i, "showOptions"), h)
                    : i.dpDiv[l || "show"](l ? h : null),
                  t.datepicker._shouldFocusInput(i) && i.input.trigger("focus"),
                  (t.datepicker._curInst = i)));
          }
        },
        _updateDatepicker: function (e) {
          (this.maxRows = 4),
            (r = e),
            e.dpDiv.empty().append(this._generateHTML(e)),
            this._attachHandlers(e);
          var i,
            n = this._getNumberOfMonths(e),
            o = n[1],
            a = e.dpDiv.find("." + this._dayOverClass + " a");
          a.length > 0 && s.apply(a.get(0)),
            e.dpDiv
              .removeClass(
                "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
              )
              .width(""),
            o > 1 &&
              e.dpDiv
                .addClass("ui-datepicker-multi-" + o)
                .css("width", 17 * o + "em"),
            e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"](
              "ui-datepicker-multi"
            ),
            e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"](
              "ui-datepicker-rtl"
            ),
            e === t.datepicker._curInst &&
              t.datepicker._datepickerShowing &&
              t.datepicker._shouldFocusInput(e) &&
              e.input.trigger("focus"),
            e.yearshtml &&
              ((i = e.yearshtml),
              setTimeout(function () {
                i === e.yearshtml &&
                  e.yearshtml &&
                  e.dpDiv
                    .find("select.ui-datepicker-year:first")
                    .replaceWith(e.yearshtml),
                  (i = e.yearshtml = null);
              }, 0));
        },
        _shouldFocusInput: function (t) {
          return (
            t.input &&
            t.input.is(":visible") &&
            !t.input.is(":disabled") &&
            !t.input.is(":focus")
          );
        },
        _checkOffset: function (e, i, s) {
          var n = e.dpDiv.outerWidth(),
            o = e.dpDiv.outerHeight(),
            r = e.input ? e.input.outerWidth() : 0,
            a = e.input ? e.input.outerHeight() : 0,
            l =
              document.documentElement.clientWidth +
              (s ? 0 : t(document).scrollLeft()),
            h =
              document.documentElement.clientHeight +
              (s ? 0 : t(document).scrollTop());
          return (
            (i.left -= this._get(e, "isRTL") ? n - r : 0),
            (i.left -=
              s && i.left === e.input.offset().left
                ? t(document).scrollLeft()
                : 0),
            (i.top -=
              s && i.top === e.input.offset().top + a
                ? t(document).scrollTop()
                : 0),
            (i.left -= Math.min(
              i.left,
              i.left + n > l && l > n ? Math.abs(i.left + n - l) : 0
            )),
            (i.top -= Math.min(
              i.top,
              i.top + o > h && h > o ? Math.abs(o + a) : 0
            )),
            i
          );
        },
        _findPos: function (e) {
          for (
            var i, s = this._getInst(e), n = this._get(s, "isRTL");
            e &&
            ("hidden" === e.type ||
              1 !== e.nodeType ||
              t.expr.filters.hidden(e));

          )
            e = e[n ? "previousSibling" : "nextSibling"];
          return [(i = t(e).offset()).left, i.top];
        },
        _hideDatepicker: function (e) {
          var i,
            s,
            n,
            o,
            r = this._curInst;
          !r ||
            (e && r !== t.data(e, "datepicker")) ||
            (this._datepickerShowing &&
              ((i = this._get(r, "showAnim")),
              (s = this._get(r, "duration")),
              (n = function () {
                t.datepicker._tidyDialog(r);
              }),
              t.effects && (t.effects.effect[i] || t.effects[i])
                ? r.dpDiv.hide(i, t.datepicker._get(r, "showOptions"), s, n)
                : r.dpDiv[
                    "slideDown" === i
                      ? "slideUp"
                      : "fadeIn" === i
                      ? "fadeOut"
                      : "hide"
                  ](i ? s : null, n),
              i || n(),
              (this._datepickerShowing = !1),
              (o = this._get(r, "onClose")) &&
                o.apply(r.input ? r.input[0] : null, [
                  r.input ? r.input.val() : "",
                  r,
                ]),
              (this._lastInput = null),
              this._inDialog &&
                (this._dialogInput.css({
                  position: "absolute",
                  left: "0",
                  top: "-100px",
                }),
                t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))),
              (this._inDialog = !1)));
        },
        _tidyDialog: function (t) {
          t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
        },
        _checkExternalClick: function (e) {
          if (t.datepicker._curInst) {
            var i = t(e.target),
              s = t.datepicker._getInst(i[0]);
            ((i[0].id !== t.datepicker._mainDivId &&
              0 === i.parents("#" + t.datepicker._mainDivId).length &&
              !i.hasClass(t.datepicker.markerClassName) &&
              !i.closest("." + t.datepicker._triggerClass).length &&
              t.datepicker._datepickerShowing &&
              (!t.datepicker._inDialog || !t.blockUI)) ||
              (i.hasClass(t.datepicker.markerClassName) &&
                t.datepicker._curInst !== s)) &&
              t.datepicker._hideDatepicker();
          }
        },
        _adjustDate: function (e, i, s) {
          var n = t(e),
            o = this._getInst(n[0]);
          this._isDisabledDatepicker(n[0]) ||
            (this._adjustInstDate(
              o,
              i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0),
              s
            ),
            this._updateDatepicker(o));
        },
        _gotoToday: function (e) {
          var i,
            s = t(e),
            n = this._getInst(s[0]);
          this._get(n, "gotoCurrent") && n.currentDay
            ? ((n.selectedDay = n.currentDay),
              (n.drawMonth = n.selectedMonth = n.currentMonth),
              (n.drawYear = n.selectedYear = n.currentYear))
            : ((i = new Date()),
              (n.selectedDay = i.getDate()),
              (n.drawMonth = n.selectedMonth = i.getMonth()),
              (n.drawYear = n.selectedYear = i.getFullYear())),
            this._notifyChange(n),
            this._adjustDate(s);
        },
        _selectMonthYear: function (e, i, s) {
          var n = t(e),
            o = this._getInst(n[0]);
          (o["selected" + ("M" === s ? "Month" : "Year")] = o[
            "draw" + ("M" === s ? "Month" : "Year")
          ] =
            parseInt(i.options[i.selectedIndex].value, 10)),
            this._notifyChange(o),
            this._adjustDate(n);
        },
        _selectDay: function (e, i, s, n) {
          var o,
            r = t(e);
          t(n).hasClass(this._unselectableClass) ||
            this._isDisabledDatepicker(r[0]) ||
            (((o = this._getInst(r[0])).selectedDay = o.currentDay =
              t("a", n).html()),
            (o.selectedMonth = o.currentMonth = i),
            (o.selectedYear = o.currentYear = s),
            this._selectDate(
              e,
              this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)
            ));
        },
        _clearDate: function (e) {
          var i = t(e);
          this._selectDate(i, "");
        },
        _selectDate: function (e, i) {
          var s,
            n = t(e),
            o = this._getInst(n[0]);
          (i = null != i ? i : this._formatDate(o)),
            o.input && o.input.val(i),
            this._updateAlternate(o),
            (s = this._get(o, "onSelect"))
              ? s.apply(o.input ? o.input[0] : null, [i, o])
              : o.input && o.input.trigger("change"),
            o.inline
              ? this._updateDatepicker(o)
              : (this._hideDatepicker(),
                (this._lastInput = o.input[0]),
                "object" != typeof o.input[0] && o.input.trigger("focus"),
                (this._lastInput = null));
        },
        _updateAlternate: function (e) {
          var i,
            s,
            n,
            o = this._get(e, "altField");
          o &&
            ((i = this._get(e, "altFormat") || this._get(e, "dateFormat")),
            (s = this._getDate(e)),
            (n = this.formatDate(i, s, this._getFormatConfig(e))),
            t(o).val(n));
        },
        noWeekends: function (t) {
          var e = t.getDay();
          return [e > 0 && 6 > e, ""];
        },
        iso8601Week: function (t) {
          var e,
            i = new Date(t.getTime());
          return (
            i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
            (e = i.getTime()),
            i.setMonth(0),
            i.setDate(1),
            Math.floor(Math.round((e - i) / 864e5) / 7) + 1
          );
        },
        parseDate: function (e, i, s) {
          if (null == e || null == i) throw "Invalid arguments";
          if ("" == (i = "object" == typeof i ? "" + i : i + "")) return null;
          var n,
            o,
            r,
            a,
            l = 0,
            h =
              (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
            c =
              "string" != typeof h
                ? h
                : (new Date().getFullYear() % 100) + parseInt(h, 10),
            u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
            d = (s ? s.dayNames : null) || this._defaults.dayNames,
            p =
              (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
            f = (s ? s.monthNames : null) || this._defaults.monthNames,
            g = -1,
            m = -1,
            v = -1,
            b = -1,
            $ = !1,
            y = function (t) {
              var i = e.length > n + 1 && e.charAt(n + 1) === t;
              return i && n++, i;
            },
            w = function (t) {
              var e = y(t),
                s =
                  "@" === t
                    ? 14
                    : "!" === t
                    ? 20
                    : "y" === t && e
                    ? 4
                    : "o" === t
                    ? 3
                    : 2,
                n = "y" === t ? s : 1,
                o = RegExp("^\\d{" + n + "," + s + "}"),
                r = i.substring(l).match(o);
              if (!r) throw "Missing number at position " + l;
              return (l += r[0].length), parseInt(r[0], 10);
            },
            _ = function (e, s, n) {
              var o = -1,
                r = t
                  .map(y(e) ? n : s, function (t, e) {
                    return [[e, t]];
                  })
                  .sort(function (t, e) {
                    return -(t[1].length - e[1].length);
                  });
              if (
                (t.each(r, function (t, e) {
                  var s = e[1];
                  return i.substr(l, s.length).toLowerCase() === s.toLowerCase()
                    ? ((o = e[0]), (l += s.length), !1)
                    : void 0;
                }),
                -1 !== o)
              )
                return o + 1;
              throw "Unknown name at position " + l;
            },
            k = function () {
              if (i.charAt(l) !== e.charAt(n))
                throw "Unexpected literal at position " + l;
              l++;
            };
          for (n = 0; e.length > n; n++)
            if ($) "'" !== e.charAt(n) || y("'") ? k() : ($ = !1);
            else
              switch (e.charAt(n)) {
                case "d":
                  v = w("d");
                  break;
                case "D":
                  _("D", u, d);
                  break;
                case "o":
                  b = w("o");
                  break;
                case "m":
                  m = w("m");
                  break;
                case "M":
                  m = _("M", p, f);
                  break;
                case "y":
                  g = w("y");
                  break;
                case "@":
                  (g = (a = new Date(w("@"))).getFullYear()),
                    (m = a.getMonth() + 1),
                    (v = a.getDate());
                  break;
                case "!":
                  (g = (a = new Date(
                    (w("!") - this._ticksTo1970) / 1e4
                  )).getFullYear()),
                    (m = a.getMonth() + 1),
                    (v = a.getDate());
                  break;
                case "'":
                  y("'") ? k() : ($ = !0);
                  break;
                default:
                  k();
              }
          if (i.length > l && ((r = i.substr(l)), !/^\s+/.test(r)))
            throw "Extra/unparsed characters found in date: " + r;
          if (
            (-1 === g
              ? (g = new Date().getFullYear())
              : 100 > g &&
                (g +=
                  new Date().getFullYear() -
                  (new Date().getFullYear() % 100) +
                  (c >= g ? 0 : -100)),
            b > -1)
          )
            for (m = 1, v = b; !((o = this._getDaysInMonth(g, m - 1)) >= v); )
              m++, (v -= o);
          if (
            (a = this._daylightSavingAdjust(
              new Date(g, m - 1, v)
            )).getFullYear() !== g ||
            a.getMonth() + 1 !== m ||
            a.getDate() !== v
          )
            throw "Invalid date";
          return a;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970:
          864e9 *
          (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (t, e, i) {
          if (!e) return "";
          var s,
            n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
            o = (i ? i.dayNames : null) || this._defaults.dayNames,
            r =
              (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
            a = (i ? i.monthNames : null) || this._defaults.monthNames,
            l = function (e) {
              var i = t.length > s + 1 && t.charAt(s + 1) === e;
              return i && s++, i;
            },
            h = function (t, e, i) {
              var s = "" + e;
              if (l(t)) for (; i > s.length; ) s = "0" + s;
              return s;
            },
            c = function (t, e, i, s) {
              return l(t) ? s[e] : i[e];
            },
            u = "",
            d = !1;
          if (e)
            for (s = 0; t.length > s; s++)
              if (d)
                "'" !== t.charAt(s) || l("'") ? (u += t.charAt(s)) : (d = !1);
              else
                switch (t.charAt(s)) {
                  case "d":
                    u += h("d", e.getDate(), 2);
                    break;
                  case "D":
                    u += c("D", e.getDay(), n, o);
                    break;
                  case "o":
                    u += h(
                      "o",
                      Math.round(
                        (new Date(
                          e.getFullYear(),
                          e.getMonth(),
                          e.getDate()
                        ).getTime() -
                          new Date(e.getFullYear(), 0, 0).getTime()) /
                          864e5
                      ),
                      3
                    );
                    break;
                  case "m":
                    u += h("m", e.getMonth() + 1, 2);
                    break;
                  case "M":
                    u += c("M", e.getMonth(), r, a);
                    break;
                  case "y":
                    u += l("y")
                      ? e.getFullYear()
                      : (10 > e.getFullYear() % 100 ? "0" : "") +
                        (e.getFullYear() % 100);
                    break;
                  case "@":
                    u += e.getTime();
                    break;
                  case "!":
                    u += 1e4 * e.getTime() + this._ticksTo1970;
                    break;
                  case "'":
                    l("'") ? (u += "'") : (d = !0);
                    break;
                  default:
                    u += t.charAt(s);
                }
          return u;
        },
        _possibleChars: function (t) {
          var e,
            i = "",
            s = !1,
            n = function (i) {
              var s = t.length > e + 1 && t.charAt(e + 1) === i;
              return s && e++, s;
            };
          for (e = 0; t.length > e; e++)
            if (s)
              "'" !== t.charAt(e) || n("'") ? (i += t.charAt(e)) : (s = !1);
            else
              switch (t.charAt(e)) {
                case "d":
                case "m":
                case "y":
                case "@":
                  i += "0123456789";
                  break;
                case "D":
                case "M":
                  return null;
                case "'":
                  n("'") ? (i += "'") : (s = !0);
                  break;
                default:
                  i += t.charAt(e);
              }
          return i;
        },
        _get: function (t, e) {
          return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e];
        },
        _setDateFromField: function (t, e) {
          if (t.input.val() !== t.lastVal) {
            var i = this._get(t, "dateFormat"),
              s = (t.lastVal = t.input ? t.input.val() : null),
              n = this._getDefaultDate(t),
              o = n,
              r = this._getFormatConfig(t);
            try {
              o = this.parseDate(i, s, r) || n;
            } catch (a) {
              s = e ? "" : s;
            }
            (t.selectedDay = o.getDate()),
              (t.drawMonth = t.selectedMonth = o.getMonth()),
              (t.drawYear = t.selectedYear = o.getFullYear()),
              (t.currentDay = s ? o.getDate() : 0),
              (t.currentMonth = s ? o.getMonth() : 0),
              (t.currentYear = s ? o.getFullYear() : 0),
              this._adjustInstDate(t);
          }
        },
        _getDefaultDate: function (t) {
          return this._restrictMinMax(
            t,
            this._determineDate(t, this._get(t, "defaultDate"), new Date())
          );
        },
        _determineDate: function (e, i, s) {
          var n = function (t) {
              var e = new Date();
              return e.setDate(e.getDate() + t), e;
            },
            o = function (i) {
              try {
                return t.datepicker.parseDate(
                  t.datepicker._get(e, "dateFormat"),
                  i,
                  t.datepicker._getFormatConfig(e)
                );
              } catch (s) {}
              for (
                var n =
                    (i.toLowerCase().match(/^c/)
                      ? t.datepicker._getDate(e)
                      : null) || new Date(),
                  o = n.getFullYear(),
                  r = n.getMonth(),
                  a = n.getDate(),
                  l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                  h = l.exec(i);
                h;

              ) {
                switch (h[2] || "d") {
                  case "d":
                  case "D":
                    a += parseInt(h[1], 10);
                    break;
                  case "w":
                  case "W":
                    a += 7 * parseInt(h[1], 10);
                    break;
                  case "m":
                  case "M":
                    (r += parseInt(h[1], 10)),
                      (a = Math.min(a, t.datepicker._getDaysInMonth(o, r)));
                    break;
                  case "y":
                  case "Y":
                    (o += parseInt(h[1], 10)),
                      (a = Math.min(a, t.datepicker._getDaysInMonth(o, r)));
                }
                h = l.exec(i);
              }
              return new Date(o, r, a);
            },
            r =
              null == i || "" === i
                ? s
                : "string" == typeof i
                ? o(i)
                : "number" == typeof i
                ? isNaN(i)
                  ? s
                  : n(i)
                : new Date(i.getTime());
          return (
            (r = r && "Invalid Date" == "" + r ? s : r) &&
              (r.setHours(0),
              r.setMinutes(0),
              r.setSeconds(0),
              r.setMilliseconds(0)),
            this._daylightSavingAdjust(r)
          );
        },
        _daylightSavingAdjust: function (t) {
          return t
            ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t)
            : null;
        },
        _setDate: function (t, e, i) {
          var s = t.selectedMonth,
            n = t.selectedYear,
            o = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
          (t.selectedDay = t.currentDay = o.getDate()),
            (t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth()),
            (t.drawYear = t.selectedYear = t.currentYear = o.getFullYear()),
            (s === t.selectedMonth && n === t.selectedYear) ||
              i ||
              this._notifyChange(t),
            this._adjustInstDate(t),
            t.input && t.input.val(e ? this._formatDate(t) : "");
        },
        _getDate: function (t) {
          return !t.currentYear || (t.input && "" === t.input.val())
            ? null
            : this._daylightSavingAdjust(
                new Date(t.currentYear, t.currentMonth, t.currentDay)
              );
        },
        _attachHandlers: function (e) {
          var i = this._get(e, "stepMonths"),
            s = "#" + e.id.replace(/\\\\/g, "\\");
          e.dpDiv.find("[data-handler]").map(function () {
            t(this).on(
              this.getAttribute("data-event"),
              {
                prev: function () {
                  t.datepicker._adjustDate(s, -i, "M");
                },
                next: function () {
                  t.datepicker._adjustDate(s, +i, "M");
                },
                hide: function () {
                  t.datepicker._hideDatepicker();
                },
                today: function () {
                  t.datepicker._gotoToday(s);
                },
                selectDay: function () {
                  return (
                    t.datepicker._selectDay(
                      s,
                      +this.getAttribute("data-month"),
                      +this.getAttribute("data-year"),
                      this
                    ),
                    !1
                  );
                },
                selectMonth: function () {
                  return t.datepicker._selectMonthYear(s, this, "M"), !1;
                },
                selectYear: function () {
                  return t.datepicker._selectMonthYear(s, this, "Y"), !1;
                },
              }[this.getAttribute("data-handler")]
            );
          });
        },
        _generateHTML: function (t) {
          var e,
            i,
            s,
            n,
            o,
            r,
            a,
            l,
            h,
            c,
            u,
            d,
            p,
            f,
            g,
            m,
            v,
            b,
            $,
            y,
            w,
            _,
            k,
            C,
            x,
            T,
            S,
            D,
            E,
            I,
            A,
            P,
            O,
            N,
            H,
            z,
            M,
            L,
            W,
            R = new Date(),
            j = this._daylightSavingAdjust(
              new Date(R.getFullYear(), R.getMonth(), R.getDate())
            ),
            F = this._get(t, "isRTL"),
            B = this._get(t, "showButtonPanel"),
            Y = this._get(t, "hideIfNoPrevNext"),
            U = this._get(t, "navigationAsDateFormat"),
            q = this._getNumberOfMonths(t),
            K = this._get(t, "showCurrentAtPos"),
            V = this._get(t, "stepMonths"),
            X = 1 !== q[0] || 1 !== q[1],
            G = this._daylightSavingAdjust(
              t.currentDay
                ? new Date(t.currentYear, t.currentMonth, t.currentDay)
                : new Date(9999, 9, 9)
            ),
            Q = this._getMinMaxDate(t, "min"),
            Z = this._getMinMaxDate(t, "max"),
            J = t.drawMonth - K,
            tt = t.drawYear;
          if ((0 > J && ((J += 12), tt--), Z))
            for (
              e = this._daylightSavingAdjust(
                new Date(
                  Z.getFullYear(),
                  Z.getMonth() - q[0] * q[1] + 1,
                  Z.getDate()
                )
              ),
                e = Q && Q > e ? Q : e;
              this._daylightSavingAdjust(new Date(tt, J, 1)) > e;

            )
              0 > --J && ((J = 11), tt--);
          for (
            t.drawMonth = J,
              t.drawYear = tt,
              i = this._get(t, "prevText"),
              i = U
                ? this.formatDate(
                    i,
                    this._daylightSavingAdjust(new Date(tt, J - V, 1)),
                    this._getFormatConfig(t)
                  )
                : i,
              s = this._canAdjustMonth(t, -1, tt, J)
                ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" +
                  i +
                  "'><span class='ui-icon ui-icon-circle-triangle-" +
                  (F ? "e" : "w") +
                  "'>" +
                  i +
                  "</span></a>"
                : Y
                ? ""
                : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
                  i +
                  "'><span class='ui-icon ui-icon-circle-triangle-" +
                  (F ? "e" : "w") +
                  "'>" +
                  i +
                  "</span></a>",
              n = this._get(t, "nextText"),
              n = U
                ? this.formatDate(
                    n,
                    this._daylightSavingAdjust(new Date(tt, J + V, 1)),
                    this._getFormatConfig(t)
                  )
                : n,
              o = this._canAdjustMonth(t, 1, tt, J)
                ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" +
                  n +
                  "'><span class='ui-icon ui-icon-circle-triangle-" +
                  (F ? "w" : "e") +
                  "'>" +
                  n +
                  "</span></a>"
                : Y
                ? ""
                : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
                  n +
                  "'><span class='ui-icon ui-icon-circle-triangle-" +
                  (F ? "w" : "e") +
                  "'>" +
                  n +
                  "</span></a>",
              r = this._get(t, "currentText"),
              a = this._get(t, "gotoCurrent") && t.currentDay ? G : j,
              r = U ? this.formatDate(r, a, this._getFormatConfig(t)) : r,
              l = t.inline
                ? ""
                : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
                  this._get(t, "closeText") +
                  "</button>",
              h = B
                ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
                  (F ? l : "") +
                  (this._isInRange(t, a)
                    ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                      r +
                      "</button>"
                    : "") +
                  (F ? "" : l) +
                  "</div>"
                : "",
              c = parseInt(this._get(t, "firstDay"), 10),
              c = isNaN(c) ? 0 : c,
              u = this._get(t, "showWeek"),
              d = this._get(t, "dayNames"),
              p = this._get(t, "dayNamesMin"),
              f = this._get(t, "monthNames"),
              g = this._get(t, "monthNamesShort"),
              m = this._get(t, "beforeShowDay"),
              v = this._get(t, "showOtherMonths"),
              b = this._get(t, "selectOtherMonths"),
              $ = this._getDefaultDate(t),
              y = "",
              _ = 0;
            q[0] > _;
            _++
          ) {
            for (k = "", this.maxRows = 4, C = 0; q[1] > C; C++) {
              if (
                ((x = this._daylightSavingAdjust(
                  new Date(tt, J, t.selectedDay)
                )),
                (T = " ui-corner-all"),
                (S = ""),
                X)
              ) {
                if (((S += "<div class='ui-datepicker-group"), q[1] > 1))
                  switch (C) {
                    case 0:
                      (S += " ui-datepicker-group-first"),
                        (T = " ui-corner-" + (F ? "right" : "left"));
                      break;
                    case q[1] - 1:
                      (S += " ui-datepicker-group-last"),
                        (T = " ui-corner-" + (F ? "left" : "right"));
                      break;
                    default:
                      (S += " ui-datepicker-group-middle"), (T = "");
                  }
                S += "'>";
              }
              for (
                S +=
                  "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
                  T +
                  "'>" +
                  (/all|left/.test(T) && 0 === _ ? (F ? o : s) : "") +
                  (/all|right/.test(T) && 0 === _ ? (F ? s : o) : "") +
                  this._generateMonthYearHeader(
                    t,
                    J,
                    tt,
                    Q,
                    Z,
                    _ > 0 || C > 0,
                    f,
                    g
                  ) +
                  "</div><table class='ui-datepicker-calendar'><thead><tr>",
                  D = u
                    ? "<th class='ui-datepicker-week-col'>" +
                      this._get(t, "weekHeader") +
                      "</th>"
                    : "",
                  w = 0;
                7 > w;
                w++
              )
                (E = (w + c) % 7),
                  (D +=
                    "<th scope='col'" +
                    ((w + c + 6) % 7 >= 5
                      ? " class='ui-datepicker-week-end'"
                      : "") +
                    "><span title='" +
                    d[E] +
                    "'>" +
                    p[E] +
                    "</span></th>");
              for (
                S += D + "</tr></thead><tbody>",
                  I = this._getDaysInMonth(tt, J),
                  tt === t.selectedYear &&
                    J === t.selectedMonth &&
                    (t.selectedDay = Math.min(t.selectedDay, I)),
                  P = Math.ceil(
                    ((A = (this._getFirstDayOfMonth(tt, J) - c + 7) % 7) + I) /
                      7
                  ),
                  O = X && this.maxRows > P ? this.maxRows : P,
                  this.maxRows = O,
                  N = this._daylightSavingAdjust(new Date(tt, J, 1 - A)),
                  H = 0;
                O > H;
                H++
              ) {
                for (
                  S += "<tr>",
                    z = u
                      ? "<td class='ui-datepicker-week-col'>" +
                        this._get(t, "calculateWeek")(N) +
                        "</td>"
                      : "",
                    w = 0;
                  7 > w;
                  w++
                )
                  (M = m
                    ? m.apply(t.input ? t.input[0] : null, [N])
                    : [!0, ""]),
                    (W =
                      ((L = N.getMonth() !== J) && !b) ||
                      !M[0] ||
                      (Q && Q > N) ||
                      (Z && N > Z)),
                    (z +=
                      "<td class='" +
                      ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") +
                      (L ? " ui-datepicker-other-month" : "") +
                      ((N.getTime() === x.getTime() &&
                        J === t.selectedMonth &&
                        t._keyEvent) ||
                      ($.getTime() === N.getTime() &&
                        $.getTime() === x.getTime())
                        ? " " + this._dayOverClass
                        : "") +
                      (W
                        ? " " + this._unselectableClass + " ui-state-disabled"
                        : "") +
                      (L && !v
                        ? ""
                        : " " +
                          M[1] +
                          (N.getTime() === G.getTime()
                            ? " " + this._currentClass
                            : "") +
                          (N.getTime() === j.getTime()
                            ? " ui-datepicker-today"
                            : "")) +
                      "'" +
                      ((!L || v) && M[2]
                        ? " title='" + M[2].replace(/'/g, "&#39;") + "'"
                        : "") +
                      (W
                        ? ""
                        : " data-handler='selectDay' data-event='click' data-month='" +
                          N.getMonth() +
                          "' data-year='" +
                          N.getFullYear() +
                          "'") +
                      ">" +
                      (L && !v
                        ? "&#xa0;"
                        : W
                        ? "<span class='ui-state-default'>" +
                          N.getDate() +
                          "</span>"
                        : "<a class='ui-state-default" +
                          (N.getTime() === j.getTime()
                            ? " ui-state-highlight"
                            : "") +
                          (N.getTime() === G.getTime()
                            ? " ui-state-active"
                            : "") +
                          (L ? " ui-priority-secondary" : "") +
                          "' href='#'>" +
                          N.getDate() +
                          "</a>") +
                      "</td>"),
                    N.setDate(N.getDate() + 1),
                    (N = this._daylightSavingAdjust(N));
                S += z + "</tr>";
              }
              ++J > 11 && ((J = 0), tt++),
                (S +=
                  "</tbody></table>" +
                  (X
                    ? "</div>" +
                      (q[0] > 0 && C === q[1] - 1
                        ? "<div class='ui-datepicker-row-break'></div>"
                        : "")
                    : "")),
                (k += S);
            }
            y += k;
          }
          return (y += h), (t._keyEvent = !1), y;
        },
        _generateMonthYearHeader: function (t, e, i, s, n, o, r, a) {
          var l,
            h,
            c,
            u,
            d,
            p,
            f,
            g,
            m = this._get(t, "changeMonth"),
            v = this._get(t, "changeYear"),
            b = this._get(t, "showMonthAfterYear"),
            $ = "<div class='ui-datepicker-title'>",
            y = "";
          if (o || !m)
            y += "<span class='ui-datepicker-month'>" + r[e] + "</span>";
          else {
            for (
              l = s && s.getFullYear() === i,
                h = n && n.getFullYear() === i,
                y +=
                  "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                c = 0;
              12 > c;
              c++
            )
              (!l || c >= s.getMonth()) &&
                (!h || n.getMonth() >= c) &&
                (y +=
                  "<option value='" +
                  c +
                  "'" +
                  (c === e ? " selected='selected'" : "") +
                  ">" +
                  a[c] +
                  "</option>");
            y += "</select>";
          }
          if ((b || ($ += y + (!o && m && v ? "" : "&#xa0;")), !t.yearshtml)) {
            if (((t.yearshtml = ""), o || !v))
              $ += "<span class='ui-datepicker-year'>" + i + "</span>";
            else {
              for (
                u = this._get(t, "yearRange").split(":"),
                  d = new Date().getFullYear(),
                  g = Math.max(
                    (f = (p = function (t) {
                      var e = t.match(/c[+\-].*/)
                        ? i + parseInt(t.substring(1), 10)
                        : t.match(/[+\-].*/)
                        ? d + parseInt(t, 10)
                        : parseInt(t, 10);
                      return isNaN(e) ? d : e;
                    })(u[0])),
                    p(u[1] || "")
                  ),
                  f = s ? Math.max(f, s.getFullYear()) : f,
                  g = n ? Math.min(g, n.getFullYear()) : g,
                  t.yearshtml +=
                    "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                g >= f;
                f++
              )
                t.yearshtml +=
                  "<option value='" +
                  f +
                  "'" +
                  (f === i ? " selected='selected'" : "") +
                  ">" +
                  f +
                  "</option>";
              (t.yearshtml += "</select>"),
                ($ += t.yearshtml),
                (t.yearshtml = null);
            }
          }
          return (
            ($ += this._get(t, "yearSuffix")),
            b && ($ += (!o && m && v ? "" : "&#xa0;") + y),
            ($ += "</div>")
          );
        },
        _adjustInstDate: function (t, e, i) {
          var s = t.selectedYear + ("Y" === i ? e : 0),
            n = t.selectedMonth + ("M" === i ? e : 0),
            o =
              Math.min(t.selectedDay, this._getDaysInMonth(s, n)) +
              ("D" === i ? e : 0),
            r = this._restrictMinMax(
              t,
              this._daylightSavingAdjust(new Date(s, n, o))
            );
          (t.selectedDay = r.getDate()),
            (t.drawMonth = t.selectedMonth = r.getMonth()),
            (t.drawYear = t.selectedYear = r.getFullYear()),
            ("M" === i || "Y" === i) && this._notifyChange(t);
        },
        _restrictMinMax: function (t, e) {
          var i = this._getMinMaxDate(t, "min"),
            s = this._getMinMaxDate(t, "max"),
            n = i && i > e ? i : e;
          return s && n > s ? s : n;
        },
        _notifyChange: function (t) {
          var e = this._get(t, "onChangeMonthYear");
          e &&
            e.apply(t.input ? t.input[0] : null, [
              t.selectedYear,
              t.selectedMonth + 1,
              t,
            ]);
        },
        _getNumberOfMonths: function (t) {
          var e = this._get(t, "numberOfMonths");
          return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e;
        },
        _getMinMaxDate: function (t, e) {
          return this._determineDate(t, this._get(t, e + "Date"), null);
        },
        _getDaysInMonth: function (t, e) {
          return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
        },
        _getFirstDayOfMonth: function (t, e) {
          return new Date(t, e, 1).getDay();
        },
        _canAdjustMonth: function (t, e, i, s) {
          var n = this._getNumberOfMonths(t),
            o = this._daylightSavingAdjust(
              new Date(i, s + (0 > e ? e : n[0] * n[1]), 1)
            );
          return (
            0 > e &&
              o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())),
            this._isInRange(t, o)
          );
        },
        _isInRange: function (t, e) {
          var i,
            s,
            n = this._getMinMaxDate(t, "min"),
            o = this._getMinMaxDate(t, "max"),
            r = null,
            a = null,
            l = this._get(t, "yearRange");
          return (
            l &&
              ((i = l.split(":")),
              (s = new Date().getFullYear()),
              (r = parseInt(i[0], 10)),
              (a = parseInt(i[1], 10)),
              i[0].match(/[+\-].*/) && (r += s),
              i[1].match(/[+\-].*/) && (a += s)),
            (!n || e.getTime() >= n.getTime()) &&
              (!o || e.getTime() <= o.getTime()) &&
              (!r || e.getFullYear() >= r) &&
              (!a || a >= e.getFullYear())
          );
        },
        _getFormatConfig: function (t) {
          var e = this._get(t, "shortYearCutoff");
          return {
            shortYearCutoff: (e =
              "string" != typeof e
                ? e
                : (new Date().getFullYear() % 100) + parseInt(e, 10)),
            dayNamesShort: this._get(t, "dayNamesShort"),
            dayNames: this._get(t, "dayNames"),
            monthNamesShort: this._get(t, "monthNamesShort"),
            monthNames: this._get(t, "monthNames"),
          };
        },
        _formatDate: function (t, e, i, s) {
          e ||
            ((t.currentDay = t.selectedDay),
            (t.currentMonth = t.selectedMonth),
            (t.currentYear = t.selectedYear));
          var n = e
            ? "object" == typeof e
              ? e
              : this._daylightSavingAdjust(new Date(s, i, e))
            : this._daylightSavingAdjust(
                new Date(t.currentYear, t.currentMonth, t.currentDay)
              );
          return this.formatDate(
            this._get(t, "dateFormat"),
            n,
            this._getFormatConfig(t)
          );
        },
      }),
      (t.fn.datepicker = function (e) {
        if (!this.length) return this;
        t.datepicker.initialized ||
          (t(document).on("mousedown", t.datepicker._checkExternalClick),
          (t.datepicker.initialized = !0)),
          0 === t("#" + t.datepicker._mainDivId).length &&
            t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e ||
          ("isDisabled" !== e && "getDate" !== e && "widget" !== e)
          ? "option" === e &&
            2 === arguments.length &&
            "string" == typeof arguments[1]
            ? t.datepicker["_" + e + "Datepicker"].apply(
                t.datepicker,
                [this[0]].concat(i)
              )
            : this.each(function () {
                "string" == typeof e
                  ? t.datepicker["_" + e + "Datepicker"].apply(
                      t.datepicker,
                      [this].concat(i)
                    )
                  : t.datepicker._attachDatepicker(this, e);
              })
          : t.datepicker["_" + e + "Datepicker"].apply(
              t.datepicker,
              [this[0]].concat(i)
            );
      }),
      (t.datepicker = new e()),
      (t.datepicker.initialized = !1),
      (t.datepicker.uuid = new Date().getTime()),
      (t.datepicker.version = "1.12.1"),
      t.datepicker,
      t.widget("ui.dialog", {
        version: "1.12.1",
        options: {
          appendTo: "body",
          autoOpen: !0,
          buttons: [],
          classes: {
            "ui-dialog": "ui-corner-all",
            "ui-dialog-titlebar": "ui-corner-all",
          },
          closeOnEscape: !0,
          closeText: "Close",
          draggable: !0,
          hide: null,
          height: "auto",
          maxHeight: null,
          maxWidth: null,
          minHeight: 150,
          minWidth: 150,
          modal: !1,
          position: {
            my: "center",
            at: "center",
            of: window,
            collision: "fit",
            using: function (e) {
              var i = t(this).css(e).offset().top;
              0 > i && t(this).css("top", e.top - i);
            },
          },
          resizable: !0,
          show: null,
          title: null,
          width: 300,
          beforeClose: null,
          close: null,
          drag: null,
          dragStart: null,
          dragStop: null,
          focus: null,
          open: null,
          resize: null,
          resizeStart: null,
          resizeStop: null,
        },
        sizeRelatedOptions: {
          buttons: !0,
          height: !0,
          maxHeight: !0,
          maxWidth: !0,
          minHeight: !0,
          minWidth: !0,
          width: !0,
        },
        resizableRelatedOptions: {
          maxHeight: !0,
          maxWidth: !0,
          minHeight: !0,
          minWidth: !0,
        },
        _create: function () {
          (this.originalCss = {
            display: this.element[0].style.display,
            width: this.element[0].style.width,
            minHeight: this.element[0].style.minHeight,
            maxHeight: this.element[0].style.maxHeight,
            height: this.element[0].style.height,
          }),
            (this.originalPosition = {
              parent: this.element.parent(),
              index: this.element.parent().children().index(this.element),
            }),
            (this.originalTitle = this.element.attr("title")),
            null == this.options.title &&
              null != this.originalTitle &&
              (this.options.title = this.originalTitle),
            this.options.disabled && (this.options.disabled = !1),
            this._createWrapper(),
            this.element.show().removeAttr("title").appendTo(this.uiDialog),
            this._addClass("ui-dialog-content", "ui-widget-content"),
            this._createTitlebar(),
            this._createButtonPane(),
            this.options.draggable && t.fn.draggable && this._makeDraggable(),
            this.options.resizable && t.fn.resizable && this._makeResizable(),
            (this._isOpen = !1),
            this._trackFocus();
        },
        _init: function () {
          this.options.autoOpen && this.open();
        },
        _appendTo: function () {
          var e = this.options.appendTo;
          return e && (e.jquery || e.nodeType)
            ? t(e)
            : this.document.find(e || "body").eq(0);
        },
        _destroy: function () {
          var t,
            e = this.originalPosition;
          this._untrackInstance(),
            this._destroyOverlay(),
            this.element.removeUniqueId().css(this.originalCss).detach(),
            this.uiDialog.remove(),
            this.originalTitle &&
              this.element.attr("title", this.originalTitle),
            (t = e.parent.children().eq(e.index)).length &&
            t[0] !== this.element[0]
              ? t.before(this.element)
              : e.parent.append(this.element);
        },
        widget: function () {
          return this.uiDialog;
        },
        disable: t.noop,
        enable: t.noop,
        close: function (e) {
          var i = this;
          this._isOpen &&
            !1 !== this._trigger("beforeClose", e) &&
            ((this._isOpen = !1),
            (this._focusedElement = null),
            this._destroyOverlay(),
            this._untrackInstance(),
            this.opener.filter(":focusable").trigger("focus").length ||
              t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])),
            this._hide(this.uiDialog, this.options.hide, function () {
              i._trigger("close", e);
            }));
        },
        isOpen: function () {
          return this._isOpen;
        },
        moveToTop: function () {
          this._moveToTop();
        },
        _moveToTop: function (e, i) {
          var s = !1,
            n = this.uiDialog
              .siblings(".ui-front:visible")
              .map(function () {
                return +t(this).css("z-index");
              })
              .get(),
            o = Math.max.apply(null, n);
          return (
            o >= +this.uiDialog.css("z-index") &&
              (this.uiDialog.css("z-index", o + 1), (s = !0)),
            s && !i && this._trigger("focus", e),
            s
          );
        },
        open: function () {
          var e = this;
          return this._isOpen
            ? void (this._moveToTop() && this._focusTabbable())
            : ((this._isOpen = !0),
              (this.opener = t(t.ui.safeActiveElement(this.document[0]))),
              this._size(),
              this._position(),
              this._createOverlay(),
              this._moveToTop(null, !0),
              this.overlay &&
                this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
              this._show(this.uiDialog, this.options.show, function () {
                e._focusTabbable(), e._trigger("focus");
              }),
              this._makeFocusTarget(),
              void this._trigger("open"));
        },
        _focusTabbable: function () {
          var t = this._focusedElement;
          t || (t = this.element.find("[autofocus]")),
            t.length || (t = this.element.find(":tabbable")),
            t.length || (t = this.uiDialogButtonPane.find(":tabbable")),
            t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")),
            t.length || (t = this.uiDialog),
            t.eq(0).trigger("focus");
        },
        _keepFocus: function (e) {
          function i() {
            var e = t.ui.safeActiveElement(this.document[0]);
            this.uiDialog[0] === e ||
              t.contains(this.uiDialog[0], e) ||
              this._focusTabbable();
          }
          e.preventDefault(), i.call(this), this._delay(i);
        },
        _createWrapper: function () {
          (this.uiDialog = t("<div>")
            .hide()
            .attr({ tabIndex: -1, role: "dialog" })
            .appendTo(this._appendTo())),
            this._addClass(
              this.uiDialog,
              "ui-dialog",
              "ui-widget ui-widget-content ui-front"
            ),
            this._on(this.uiDialog, {
              keydown: function (e) {
                if (
                  this.options.closeOnEscape &&
                  !e.isDefaultPrevented() &&
                  e.keyCode &&
                  e.keyCode === t.ui.keyCode.ESCAPE
                )
                  return e.preventDefault(), void this.close(e);
                if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                  var i = this.uiDialog.find(":tabbable"),
                    s = i.filter(":first"),
                    n = i.filter(":last");
                  (e.target !== n[0] && e.target !== this.uiDialog[0]) ||
                  e.shiftKey
                    ? (e.target === s[0] || e.target === this.uiDialog[0]) &&
                      e.shiftKey &&
                      (this._delay(function () {
                        n.trigger("focus");
                      }),
                      e.preventDefault())
                    : (this._delay(function () {
                        s.trigger("focus");
                      }),
                      e.preventDefault());
                }
              },
              mousedown: function (t) {
                this._moveToTop(t) && this._focusTabbable();
              },
            }),
            this.element.find("[aria-describedby]").length ||
              this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id"),
              });
        },
        _createTitlebar: function () {
          var e;
          (this.uiDialogTitlebar = t("<div>")),
            this._addClass(
              this.uiDialogTitlebar,
              "ui-dialog-titlebar",
              "ui-widget-header ui-helper-clearfix"
            ),
            this._on(this.uiDialogTitlebar, {
              mousedown: function (e) {
                t(e.target).closest(".ui-dialog-titlebar-close") ||
                  this.uiDialog.trigger("focus");
              },
            }),
            (this.uiDialogTitlebarClose = t("<button type='button'></button>")
              .button({
                label: t("<a>").text(this.options.closeText).html(),
                icon: "ui-icon-closethick",
                showLabel: !1,
              })
              .appendTo(this.uiDialogTitlebar)),
            this._addClass(
              this.uiDialogTitlebarClose,
              "ui-dialog-titlebar-close"
            ),
            this._on(this.uiDialogTitlebarClose, {
              click: function (t) {
                t.preventDefault(), this.close(t);
              },
            }),
            (e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar)),
            this._addClass(e, "ui-dialog-title"),
            this._title(e),
            this.uiDialogTitlebar.prependTo(this.uiDialog),
            this.uiDialog.attr({ "aria-labelledby": e.attr("id") });
        },
        _title: function (t) {
          this.options.title ? t.text(this.options.title) : t.html("&#160;");
        },
        _createButtonPane: function () {
          (this.uiDialogButtonPane = t("<div>")),
            this._addClass(
              this.uiDialogButtonPane,
              "ui-dialog-buttonpane",
              "ui-widget-content ui-helper-clearfix"
            ),
            (this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane)),
            this._addClass(this.uiButtonSet, "ui-dialog-buttonset"),
            this._createButtons();
        },
        _createButtons: function () {
          var e = this,
            i = this.options.buttons;
          return (
            this.uiDialogButtonPane.remove(),
            this.uiButtonSet.empty(),
            t.isEmptyObject(i) || (t.isArray(i) && !i.length)
              ? void this._removeClass(this.uiDialog, "ui-dialog-buttons")
              : (t.each(i, function (i, s) {
                  var n, o;
                  (s = t.isFunction(s) ? { click: s, text: i } : s),
                    (n = (s = t.extend({ type: "button" }, s)).click),
                    (o = {
                      icon: s.icon,
                      iconPosition: s.iconPosition,
                      showLabel: s.showLabel,
                      icons: s.icons,
                      text: s.text,
                    }),
                    delete s.click,
                    delete s.icon,
                    delete s.iconPosition,
                    delete s.showLabel,
                    delete s.icons,
                    "boolean" == typeof s.text && delete s.text,
                    t("<button></button>", s)
                      .button(o)
                      .appendTo(e.uiButtonSet)
                      .on("click", function () {
                        n.apply(e.element[0], arguments);
                      });
                }),
                this._addClass(this.uiDialog, "ui-dialog-buttons"),
                void this.uiDialogButtonPane.appendTo(this.uiDialog))
          );
        },
        _makeDraggable: function () {
          function e(t) {
            return { position: t.position, offset: t.offset };
          }
          var i = this,
            s = this.options;
          this.uiDialog.draggable({
            cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
            handle: ".ui-dialog-titlebar",
            containment: "document",
            start: function (s, n) {
              i._addClass(t(this), "ui-dialog-dragging"),
                i._blockFrames(),
                i._trigger("dragStart", s, e(n));
            },
            drag: function (t, s) {
              i._trigger("drag", t, e(s));
            },
            stop: function (n, o) {
              var r = o.offset.left - i.document.scrollLeft(),
                a = o.offset.top - i.document.scrollTop();
              (s.position = {
                my: "left top",
                at:
                  "left" +
                  (r >= 0 ? "+" : "") +
                  r +
                  " top" +
                  (a >= 0 ? "+" : "") +
                  a,
                of: i.window,
              }),
                i._removeClass(t(this), "ui-dialog-dragging"),
                i._unblockFrames(),
                i._trigger("dragStop", n, e(o));
            },
          });
        },
        _makeResizable: function () {
          function e(t) {
            return {
              originalPosition: t.originalPosition,
              originalSize: t.originalSize,
              position: t.position,
              size: t.size,
            };
          }
          var i = this,
            s = this.options,
            n = s.resizable,
            o = this.uiDialog.css("position");
          this.uiDialog
            .resizable({
              cancel: ".ui-dialog-content",
              containment: "document",
              alsoResize: this.element,
              maxWidth: s.maxWidth,
              maxHeight: s.maxHeight,
              minWidth: s.minWidth,
              minHeight: this._minHeight(),
              handles: "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw",
              start: function (s, n) {
                i._addClass(t(this), "ui-dialog-resizing"),
                  i._blockFrames(),
                  i._trigger("resizeStart", s, e(n));
              },
              resize: function (t, s) {
                i._trigger("resize", t, e(s));
              },
              stop: function (n, o) {
                var r = i.uiDialog.offset(),
                  a = r.left - i.document.scrollLeft(),
                  l = r.top - i.document.scrollTop();
                (s.height = i.uiDialog.height()),
                  (s.width = i.uiDialog.width()),
                  (s.position = {
                    my: "left top",
                    at:
                      "left" +
                      (a >= 0 ? "+" : "") +
                      a +
                      " top" +
                      (l >= 0 ? "+" : "") +
                      l,
                    of: i.window,
                  }),
                  i._removeClass(t(this), "ui-dialog-resizing"),
                  i._unblockFrames(),
                  i._trigger("resizeStop", n, e(o));
              },
            })
            .css("position", o);
        },
        _trackFocus: function () {
          this._on(this.widget(), {
            focusin: function (e) {
              this._makeFocusTarget(), (this._focusedElement = t(e.target));
            },
          });
        },
        _makeFocusTarget: function () {
          this._untrackInstance(), this._trackingInstances().unshift(this);
        },
        _untrackInstance: function () {
          var e = this._trackingInstances(),
            i = t.inArray(this, e);
          -1 !== i && e.splice(i, 1);
        },
        _trackingInstances: function () {
          var t = this.document.data("ui-dialog-instances");
          return (
            t || ((t = []), this.document.data("ui-dialog-instances", t)), t
          );
        },
        _minHeight: function () {
          var t = this.options;
          return "auto" === t.height
            ? t.minHeight
            : Math.min(t.minHeight, t.height);
        },
        _position: function () {
          var t = this.uiDialog.is(":visible");
          t || this.uiDialog.show(),
            this.uiDialog.position(this.options.position),
            t || this.uiDialog.hide();
        },
        _setOptions: function (e) {
          var i = this,
            s = !1,
            n = {};
          t.each(e, function (t, e) {
            i._setOption(t, e),
              t in i.sizeRelatedOptions && (s = !0),
              t in i.resizableRelatedOptions && (n[t] = e);
          }),
            s && (this._size(), this._position()),
            this.uiDialog.is(":data(ui-resizable)") &&
              this.uiDialog.resizable("option", n);
        },
        _setOption: function (e, i) {
          var s,
            n,
            o = this.uiDialog;
          "disabled" !== e &&
            (this._super(e, i),
            "appendTo" === e && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === e && this._createButtons(),
            "closeText" === e &&
              this.uiDialogTitlebarClose.button({
                label: t("<a>")
                  .text("" + this.options.closeText)
                  .html(),
              }),
            "draggable" === e &&
              ((s = o.is(":data(ui-draggable)")) &&
                !i &&
                o.draggable("destroy"),
              !s && i && this._makeDraggable()),
            "position" === e && this._position(),
            "resizable" === e &&
              ((n = o.is(":data(ui-resizable)")) &&
                !i &&
                o.resizable("destroy"),
              n && "string" == typeof i && o.resizable("option", "handles", i),
              n || !1 === i || this._makeResizable()),
            "title" === e &&
              this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
        },
        _size: function () {
          var t,
            e,
            i,
            s = this.options;
          this.element
            .show()
            .css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }),
            s.minWidth > s.width && (s.width = s.minWidth),
            (t = this.uiDialog
              .css({ height: "auto", width: s.width })
              .outerHeight()),
            (e = Math.max(0, s.minHeight - t)),
            (i =
              "number" == typeof s.maxHeight
                ? Math.max(0, s.maxHeight - t)
                : "none"),
            "auto" === s.height
              ? this.element.css({ minHeight: e, maxHeight: i, height: "auto" })
              : this.element.height(Math.max(0, s.height - t)),
            this.uiDialog.is(":data(ui-resizable)") &&
              this.uiDialog.resizable("option", "minHeight", this._minHeight());
        },
        _blockFrames: function () {
          this.iframeBlocks = this.document.find("iframe").map(function () {
            var e = t(this);
            return t("<div>")
              .css({
                position: "absolute",
                width: e.outerWidth(),
                height: e.outerHeight(),
              })
              .appendTo(e.parent())
              .offset(e.offset())[0];
          });
        },
        _unblockFrames: function () {
          this.iframeBlocks &&
            (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _allowInteraction: function (e) {
          return (
            !!t(e.target).closest(".ui-dialog").length ||
            !!t(e.target).closest(".ui-datepicker").length
          );
        },
        _createOverlay: function () {
          if (this.options.modal) {
            var e = !0;
            this._delay(function () {
              e = !1;
            }),
              this.document.data("ui-dialog-overlays") ||
                this._on(this.document, {
                  focusin: function (t) {
                    e ||
                      this._allowInteraction(t) ||
                      (t.preventDefault(),
                      this._trackingInstances()[0]._focusTabbable());
                  },
                }),
              (this.overlay = t("<div>").appendTo(this._appendTo())),
              this._addClass(this.overlay, null, "ui-widget-overlay ui-front"),
              this._on(this.overlay, { mousedown: "_keepFocus" }),
              this.document.data(
                "ui-dialog-overlays",
                (this.document.data("ui-dialog-overlays") || 0) + 1
              );
          }
        },
        _destroyOverlay: function () {
          if (this.options.modal && this.overlay) {
            var t = this.document.data("ui-dialog-overlays") - 1;
            t
              ? this.document.data("ui-dialog-overlays", t)
              : (this._off(this.document, "focusin"),
                this.document.removeData("ui-dialog-overlays")),
              this.overlay.remove(),
              (this.overlay = null);
          }
        },
      }),
      !1 !== t.uiBackCompat &&
        t.widget("ui.dialog", t.ui.dialog, {
          options: { dialogClass: "" },
          _createWrapper: function () {
            this._super(), this.uiDialog.addClass(this.options.dialogClass);
          },
          _setOption: function (t, e) {
            "dialogClass" === t &&
              this.uiDialog.removeClass(this.options.dialogClass).addClass(e),
              this._superApply(arguments);
          },
        }),
      t.ui.dialog,
      t.widget("ui.progressbar", {
        version: "1.12.1",
        options: {
          classes: {
            "ui-progressbar": "ui-corner-all",
            "ui-progressbar-value": "ui-corner-left",
            "ui-progressbar-complete": "ui-corner-right",
          },
          max: 100,
          value: 0,
          change: null,
          complete: null,
        },
        min: 0,
        _create: function () {
          (this.oldValue = this.options.value = this._constrainedValue()),
            this.element.attr({
              role: "progressbar",
              "aria-valuemin": this.min,
            }),
            this._addClass("ui-progressbar", "ui-widget ui-widget-content"),
            (this.valueDiv = t("<div>").appendTo(this.element)),
            this._addClass(
              this.valueDiv,
              "ui-progressbar-value",
              "ui-widget-header"
            ),
            this._refreshValue();
        },
        _destroy: function () {
          this.element.removeAttr(
            "role aria-valuemin aria-valuemax aria-valuenow"
          ),
            this.valueDiv.remove();
        },
        value: function (t) {
          return void 0 === t
            ? this.options.value
            : ((this.options.value = this._constrainedValue(t)),
              void this._refreshValue());
        },
        _constrainedValue: function (t) {
          return (
            void 0 === t && (t = this.options.value),
            (this.indeterminate = !1 === t),
            "number" != typeof t && (t = 0),
            !this.indeterminate &&
              Math.min(this.options.max, Math.max(this.min, t))
          );
        },
        _setOptions: function (t) {
          var e = t.value;
          delete t.value,
            this._super(t),
            (this.options.value = this._constrainedValue(e)),
            this._refreshValue();
        },
        _setOption: function (t, e) {
          "max" === t && (e = Math.max(this.min, e)), this._super(t, e);
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this.element.attr("aria-disabled", t),
            this._toggleClass(null, "ui-state-disabled", !!t);
        },
        _percentage: function () {
          return this.indeterminate
            ? 100
            : (100 * (this.options.value - this.min)) /
                (this.options.max - this.min);
        },
        _refreshValue: function () {
          var e = this.options.value,
            i = this._percentage();
          this.valueDiv
            .toggle(this.indeterminate || e > this.min)
            .width(i.toFixed(0) + "%"),
            this._toggleClass(
              this.valueDiv,
              "ui-progressbar-complete",
              null,
              e === this.options.max
            )._toggleClass(
              "ui-progressbar-indeterminate",
              null,
              this.indeterminate
            ),
            this.indeterminate
              ? (this.element.removeAttr("aria-valuenow"),
                this.overlayDiv ||
                  ((this.overlayDiv = t("<div>").appendTo(this.valueDiv)),
                  this._addClass(this.overlayDiv, "ui-progressbar-overlay")))
              : (this.element.attr({
                  "aria-valuemax": this.options.max,
                  "aria-valuenow": e,
                }),
                this.overlayDiv &&
                  (this.overlayDiv.remove(), (this.overlayDiv = null))),
            this.oldValue !== e &&
              ((this.oldValue = e), this._trigger("change")),
            e === this.options.max && this._trigger("complete");
        },
      }),
      t.widget("ui.selectmenu", [
        t.ui.formResetMixin,
        {
          version: "1.12.1",
          defaultElement: "<select>",
          options: {
            appendTo: null,
            classes: {
              "ui-selectmenu-button-open": "ui-corner-top",
              "ui-selectmenu-button-closed": "ui-corner-all",
            },
            disabled: null,
            icons: { button: "ui-icon-triangle-1-s" },
            position: { my: "left top", at: "left bottom", collision: "none" },
            width: !1,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null,
          },
          _create: function () {
            var e = this.element.uniqueId().attr("id");
            (this.ids = {
              element: e,
              button: e + "-button",
              menu: e + "-menu",
            }),
              this._drawButton(),
              this._drawMenu(),
              this._bindFormResetHandler(),
              (this._rendered = !1),
              (this.menuItems = t());
          },
          _drawButton: function () {
            var e,
              i = this,
              s = this._parseOption(
                this.element.find("option:selected"),
                this.element[0].selectedIndex
              );
            (this.labels = this.element.labels().attr("for", this.ids.button)),
              this._on(this.labels, {
                click: function (t) {
                  this.button.focus(), t.preventDefault();
                },
              }),
              this.element.hide(),
              (this.button = t("<span>", {
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true",
                title: this.element.attr("title"),
              }).insertAfter(this.element)),
              this._addClass(
                this.button,
                "ui-selectmenu-button ui-selectmenu-button-closed",
                "ui-button ui-widget"
              ),
              (e = t("<span>").appendTo(this.button)),
              this._addClass(
                e,
                "ui-selectmenu-icon",
                "ui-icon " + this.options.icons.button
              ),
              (this.buttonItem = this._renderButtonItem(s).appendTo(
                this.button
              )),
              !1 !== this.options.width && this._resizeButton(),
              this._on(this.button, this._buttonEvents),
              this.button.one("focusin", function () {
                i._rendered || i._refreshMenu();
              });
          },
          _drawMenu: function () {
            var e = this;
            (this.menu = t("<ul>", {
              "aria-hidden": "true",
              "aria-labelledby": this.ids.button,
              id: this.ids.menu,
            })),
              (this.menuWrap = t("<div>").append(this.menu)),
              this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"),
              this.menuWrap.appendTo(this._appendTo()),
              (this.menuInstance = this.menu
                .menu({
                  classes: { "ui-menu": "ui-corner-bottom" },
                  role: "listbox",
                  select: function (t, i) {
                    t.preventDefault(),
                      e._setSelection(),
                      e._select(i.item.data("ui-selectmenu-item"), t);
                  },
                  focus: function (t, i) {
                    var s = i.item.data("ui-selectmenu-item");
                    null != e.focusIndex &&
                      s.index !== e.focusIndex &&
                      (e._trigger("focus", t, { item: s }),
                      e.isOpen || e._select(s, t)),
                      (e.focusIndex = s.index),
                      e.button.attr(
                        "aria-activedescendant",
                        e.menuItems.eq(s.index).attr("id")
                      );
                  },
                })
                .menu("instance")),
              this.menuInstance._off(this.menu, "mouseleave"),
              (this.menuInstance._closeOnDocumentClick = function () {
                return !1;
              }),
              (this.menuInstance._isDivider = function () {
                return !1;
              });
          },
          refresh: function () {
            this._refreshMenu(),
              this.buttonItem.replaceWith(
                (this.buttonItem = this._renderButtonItem(
                  this._getSelectedItem().data("ui-selectmenu-item") || {}
                ))
              ),
              null === this.options.width && this._resizeButton();
          },
          _refreshMenu: function () {
            var t,
              e = this.element.find("option");
            this.menu.empty(),
              this._parseOptions(e),
              this._renderMenu(this.menu, this.items),
              this.menuInstance.refresh(),
              (this.menuItems = this.menu
                .find("li")
                .not(".ui-selectmenu-optgroup")
                .find(".ui-menu-item-wrapper")),
              (this._rendered = !0),
              e.length &&
                ((t = this._getSelectedItem()),
                this.menuInstance.focus(null, t),
                this._setAria(t.data("ui-selectmenu-item")),
                this._setOption("disabled", this.element.prop("disabled")));
          },
          open: function (t) {
            this.options.disabled ||
              (this._rendered
                ? (this._removeClass(
                    this.menu.find(".ui-state-active"),
                    null,
                    "ui-state-active"
                  ),
                  this.menuInstance.focus(null, this._getSelectedItem()))
                : this._refreshMenu(),
              this.menuItems.length &&
                ((this.isOpen = !0),
                this._toggleAttr(),
                this._resizeMenu(),
                this._position(),
                this._on(this.document, this._documentClick),
                this._trigger("open", t)));
          },
          _position: function () {
            this.menuWrap.position(
              t.extend({ of: this.button }, this.options.position)
            );
          },
          close: function (t) {
            this.isOpen &&
              ((this.isOpen = !1),
              this._toggleAttr(),
              (this.range = null),
              this._off(this.document),
              this._trigger("close", t));
          },
          widget: function () {
            return this.button;
          },
          menuWidget: function () {
            return this.menu;
          },
          _renderButtonItem: function (e) {
            var i = t("<span>");
            return (
              this._setText(i, e.label),
              this._addClass(i, "ui-selectmenu-text"),
              i
            );
          },
          _renderMenu: function (e, i) {
            var s = this,
              n = "";
            t.each(i, function (i, o) {
              var r;
              o.optgroup !== n &&
                ((r = t("<li>", { text: o.optgroup })),
                s._addClass(
                  r,
                  "ui-selectmenu-optgroup",
                  "ui-menu-divider" +
                    (o.element.parent("optgroup").prop("disabled")
                      ? " ui-state-disabled"
                      : "")
                ),
                r.appendTo(e),
                (n = o.optgroup)),
                s._renderItemData(e, o);
            });
          },
          _renderItemData: function (t, e) {
            return this._renderItem(t, e).data("ui-selectmenu-item", e);
          },
          _renderItem: function (e, i) {
            var s = t("<li>"),
              n = t("<div>", { title: i.element.attr("title") });
            return (
              i.disabled && this._addClass(s, null, "ui-state-disabled"),
              this._setText(n, i.label),
              s.append(n).appendTo(e)
            );
          },
          _setText: function (t, e) {
            e ? t.text(e) : t.html("&#160;");
          },
          _move: function (t, e) {
            var i,
              s,
              n = ".ui-menu-item";
            this.isOpen
              ? (i = this.menuItems.eq(this.focusIndex).parent("li"))
              : ((i = this.menuItems
                  .eq(this.element[0].selectedIndex)
                  .parent("li")),
                (n += ":not(.ui-state-disabled)")),
              (s =
                "first" === t || "last" === t
                  ? i["first" === t ? "prevAll" : "nextAll"](n).eq(-1)
                  : i[t + "All"](n).eq(0)).length &&
                this.menuInstance.focus(e, s);
          },
          _getSelectedItem: function () {
            return this.menuItems
              .eq(this.element[0].selectedIndex)
              .parent("li");
          },
          _toggle: function (t) {
            this[this.isOpen ? "close" : "open"](t);
          },
          _setSelection: function () {
            var t;
            this.range &&
              (window.getSelection
                ? ((t = window.getSelection()).removeAllRanges(),
                  t.addRange(this.range))
                : this.range.select(),
              this.button.focus());
          },
          _documentClick: {
            mousedown: function (e) {
              this.isOpen &&
                (t(e.target).closest(
                  ".ui-selectmenu-menu, #" +
                    t.ui.escapeSelector(this.ids.button)
                ).length ||
                  this.close(e));
            },
          },
          _buttonEvents: {
            mousedown: function () {
              var t;
              window.getSelection
                ? (t = window.getSelection()).rangeCount &&
                  (this.range = t.getRangeAt(0))
                : (this.range = document.selection.createRange());
            },
            click: function (t) {
              this._setSelection(), this._toggle(t);
            },
            keydown: function (e) {
              var i = !0;
              switch (e.keyCode) {
                case t.ui.keyCode.TAB:
                case t.ui.keyCode.ESCAPE:
                  this.close(e), (i = !1);
                  break;
                case t.ui.keyCode.ENTER:
                  this.isOpen && this._selectFocusedItem(e);
                  break;
                case t.ui.keyCode.UP:
                  e.altKey ? this._toggle(e) : this._move("prev", e);
                  break;
                case t.ui.keyCode.DOWN:
                  e.altKey ? this._toggle(e) : this._move("next", e);
                  break;
                case t.ui.keyCode.SPACE:
                  this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                  break;
                case t.ui.keyCode.LEFT:
                  this._move("prev", e);
                  break;
                case t.ui.keyCode.RIGHT:
                  this._move("next", e);
                  break;
                case t.ui.keyCode.HOME:
                case t.ui.keyCode.PAGE_UP:
                  this._move("first", e);
                  break;
                case t.ui.keyCode.END:
                case t.ui.keyCode.PAGE_DOWN:
                  this._move("last", e);
                  break;
                default:
                  this.menu.trigger(e), (i = !1);
              }
              i && e.preventDefault();
            },
          },
          _selectFocusedItem: function (t) {
            var e = this.menuItems.eq(this.focusIndex).parent("li");
            e.hasClass("ui-state-disabled") ||
              this._select(e.data("ui-selectmenu-item"), t);
          },
          _select: function (t, e) {
            var i = this.element[0].selectedIndex;
            (this.element[0].selectedIndex = t.index),
              this.buttonItem.replaceWith(
                (this.buttonItem = this._renderButtonItem(t))
              ),
              this._setAria(t),
              this._trigger("select", e, { item: t }),
              t.index !== i && this._trigger("change", e, { item: t }),
              this.close(e);
          },
          _setAria: function (t) {
            var e = this.menuItems.eq(t.index).attr("id");
            this.button.attr({
              "aria-labelledby": e,
              "aria-activedescendant": e,
            }),
              this.menu.attr("aria-activedescendant", e);
          },
          _setOption: function (t, e) {
            if ("icons" === t) {
              var i = this.button.find("span.ui-icon");
              this._removeClass(i, null, this.options.icons.button)._addClass(
                i,
                null,
                e.button
              );
            }
            this._super(t, e),
              "appendTo" === t && this.menuWrap.appendTo(this._appendTo()),
              "width" === t && this._resizeButton();
          },
          _setOptionDisabled: function (t) {
            this._super(t),
              this.menuInstance.option("disabled", t),
              this.button.attr("aria-disabled", t),
              this._toggleClass(this.button, null, "ui-state-disabled", t),
              this.element.prop("disabled", t),
              t
                ? (this.button.attr("tabindex", -1), this.close())
                : this.button.attr("tabindex", 0);
          },
          _appendTo: function () {
            var e = this.options.appendTo;
            return (
              e &&
                (e =
                  e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)),
              (e && e[0]) || (e = this.element.closest(".ui-front, dialog")),
              e.length || (e = this.document[0].body),
              e
            );
          },
          _toggleAttr: function () {
            this.button.attr("aria-expanded", this.isOpen),
              this._removeClass(
                this.button,
                "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open")
              )
                ._addClass(
                  this.button,
                  "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed")
                )
                ._toggleClass(
                  this.menuWrap,
                  "ui-selectmenu-open",
                  null,
                  this.isOpen
                ),
              this.menu.attr("aria-hidden", !this.isOpen);
          },
          _resizeButton: function () {
            var t = this.options.width;
            return !1 === t
              ? void this.button.css("width", "")
              : (null === t &&
                  ((t = this.element.show().outerWidth()), this.element.hide()),
                void this.button.outerWidth(t));
          },
          _resizeMenu: function () {
            this.menu.outerWidth(
              Math.max(
                this.button.outerWidth(),
                this.menu.width("").outerWidth() + 1
              )
            );
          },
          _getCreateOptions: function () {
            var t = this._super();
            return (t.disabled = this.element.prop("disabled")), t;
          },
          _parseOptions: function (e) {
            var i = this,
              s = [];
            e.each(function (e, n) {
              s.push(i._parseOption(t(n), e));
            }),
              (this.items = s);
          },
          _parseOption: function (t, e) {
            var i = t.parent("optgroup");
            return {
              element: t,
              index: e,
              value: t.val(),
              label: t.text(),
              optgroup: i.attr("label") || "",
              disabled: i.prop("disabled") || t.prop("disabled"),
            };
          },
          _destroy: function () {
            this._unbindFormResetHandler(),
              this.menuWrap.remove(),
              this.button.remove(),
              this.element.show(),
              this.element.removeUniqueId(),
              this.labels.attr("for", this.ids.element);
          },
        },
      ]),
      t.widget("ui.slider", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
          animate: !1,
          classes: {
            "ui-slider": "ui-corner-all",
            "ui-slider-handle": "ui-corner-all",
            "ui-slider-range": "ui-corner-all ui-widget-header",
          },
          distance: 0,
          max: 100,
          min: 0,
          orientation: "horizontal",
          range: !1,
          step: 1,
          value: 0,
          values: null,
          change: null,
          slide: null,
          start: null,
          stop: null,
        },
        numPages: 5,
        _create: function () {
          (this._keySliding = !1),
            (this._mouseSliding = !1),
            (this._animateOff = !0),
            (this._handleIndex = null),
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this._addClass(
              "ui-slider ui-slider-" + this.orientation,
              "ui-widget ui-widget-content"
            ),
            this._refresh(),
            (this._animateOff = !1);
        },
        _refresh: function () {
          this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue();
        },
        _createHandles: function () {
          var e,
            i,
            s = this.options,
            n = this.element.find(".ui-slider-handle"),
            o = [];
          for (
            i = (s.values && s.values.length) || 1,
              n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
              e = n.length;
            i > e;
            e++
          )
            o.push("<span tabindex='0'></span>");
          (this.handles = n.add(t(o.join("")).appendTo(this.element))),
            this._addClass(
              this.handles,
              "ui-slider-handle",
              "ui-state-default"
            ),
            (this.handle = this.handles.eq(0)),
            this.handles.each(function (e) {
              t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
            });
        },
        _createRange: function () {
          var e = this.options;
          e.range
            ? (!0 === e.range &&
                (e.values
                  ? e.values.length && 2 !== e.values.length
                    ? (e.values = [e.values[0], e.values[0]])
                    : t.isArray(e.values) && (e.values = e.values.slice(0))
                  : (e.values = [this._valueMin(), this._valueMin()])),
              this.range && this.range.length
                ? (this._removeClass(
                    this.range,
                    "ui-slider-range-min ui-slider-range-max"
                  ),
                  this.range.css({ left: "", bottom: "" }))
                : ((this.range = t("<div>").appendTo(this.element)),
                  this._addClass(this.range, "ui-slider-range")),
              ("min" === e.range || "max" === e.range) &&
                this._addClass(this.range, "ui-slider-range-" + e.range))
            : (this.range && this.range.remove(), (this.range = null));
        },
        _setupEvents: function () {
          this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles);
        },
        _destroy: function () {
          this.handles.remove(),
            this.range && this.range.remove(),
            this._mouseDestroy();
        },
        _mouseCapture: function (e) {
          var i,
            s,
            n,
            o,
            r,
            a,
            l,
            h,
            c = this,
            u = this.options;
          return (
            !u.disabled &&
            ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (i = { x: e.pageX, y: e.pageY }),
            (s = this._normValueFromMouse(i)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function (e) {
              var i = Math.abs(s - c.values(e));
              (n > i ||
                (n === i &&
                  (e === c._lastChangedValue || c.values(e) === u.min))) &&
                ((n = i), (o = t(this)), (r = e));
            }),
            !1 !== (a = this._start(e, r)) &&
              ((this._mouseSliding = !0),
              (this._handleIndex = r),
              this._addClass(o, null, "ui-state-active"),
              o.trigger("focus"),
              (l = o.offset()),
              (h = !t(e.target).parents().addBack().is(".ui-slider-handle")),
              (this._clickOffset = h
                ? { left: 0, top: 0 }
                : {
                    left: e.pageX - l.left - o.width() / 2,
                    top:
                      e.pageY -
                      l.top -
                      o.height() / 2 -
                      (parseInt(o.css("borderTopWidth"), 10) || 0) -
                      (parseInt(o.css("borderBottomWidth"), 10) || 0) +
                      (parseInt(o.css("marginTop"), 10) || 0),
                  }),
              this.handles.hasClass("ui-state-hover") || this._slide(e, r, s),
              (this._animateOff = !0),
              !0))
          );
        },
        _mouseStart: function () {
          return !0;
        },
        _mouseDrag: function (t) {
          var e = { x: t.pageX, y: t.pageY },
            i = this._normValueFromMouse(e);
          return this._slide(t, this._handleIndex, i), !1;
        },
        _mouseStop: function (t) {
          return (
            this._removeClass(this.handles, null, "ui-state-active"),
            (this._mouseSliding = !1),
            this._stop(t, this._handleIndex),
            this._change(t, this._handleIndex),
            (this._handleIndex = null),
            (this._clickOffset = null),
            (this._animateOff = !1),
            !1
          );
        },
        _detectOrientation: function () {
          this.orientation =
            "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function (t) {
          var e, i, s, n, o;
          return (
            "horizontal" === this.orientation
              ? ((e = this.elementSize.width),
                (i =
                  t.x -
                  this.elementOffset.left -
                  (this._clickOffset ? this._clickOffset.left : 0)))
              : ((e = this.elementSize.height),
                (i =
                  t.y -
                  this.elementOffset.top -
                  (this._clickOffset ? this._clickOffset.top : 0))),
            (s = i / e) > 1 && (s = 1),
            0 > s && (s = 0),
            "vertical" === this.orientation && (s = 1 - s),
            (n = this._valueMax() - this._valueMin()),
            (o = this._valueMin() + s * n),
            this._trimAlignValue(o)
          );
        },
        _uiHash: function (t, e, i) {
          var s = {
            handle: this.handles[t],
            handleIndex: t,
            value: void 0 !== e ? e : this.value(),
          };
          return (
            this._hasMultipleValues() &&
              ((s.value = void 0 !== e ? e : this.values(t)),
              (s.values = i || this.values())),
            s
          );
        },
        _hasMultipleValues: function () {
          return this.options.values && this.options.values.length;
        },
        _start: function (t, e) {
          return this._trigger("start", t, this._uiHash(e));
        },
        _slide: function (t, e, i) {
          var s,
            n,
            o = this.value(),
            r = this.values();
          this._hasMultipleValues() &&
            ((n = this.values(e ? 0 : 1)),
            (o = this.values(e)),
            2 === this.options.values.length &&
              !0 === this.options.range &&
              (i = 0 === e ? Math.min(n, i) : Math.max(n, i)),
            (r[e] = i)),
            i !== o &&
              !1 !== (s = this._trigger("slide", t, this._uiHash(e, i, r))) &&
              (this._hasMultipleValues() ? this.values(e, i) : this.value(i));
        },
        _stop: function (t, e) {
          this._trigger("stop", t, this._uiHash(e));
        },
        _change: function (t, e) {
          this._keySliding ||
            this._mouseSliding ||
            ((this._lastChangedValue = e),
            this._trigger("change", t, this._uiHash(e)));
        },
        value: function (t) {
          return arguments.length
            ? ((this.options.value = this._trimAlignValue(t)),
              this._refreshValue(),
              void this._change(null, 0))
            : this._value();
        },
        values: function (e, i) {
          var s, n, o;
          if (arguments.length > 1)
            return (
              (this.options.values[e] = this._trimAlignValue(i)),
              this._refreshValue(),
              void this._change(null, e)
            );
          if (!arguments.length) return this._values();
          if (!t.isArray(arguments[0]))
            return this._hasMultipleValues() ? this._values(e) : this.value();
          for (
            s = this.options.values, n = arguments[0], o = 0;
            s.length > o;
            o += 1
          )
            (s[o] = this._trimAlignValue(n[o])), this._change(null, o);
          this._refreshValue();
        },
        _setOption: function (e, i) {
          var s,
            n = 0;
          switch (
            ("range" === e &&
              !0 === this.options.range &&
              ("min" === i
                ? ((this.options.value = this._values(0)),
                  (this.options.values = null))
                : "max" === i &&
                  ((this.options.value = this._values(
                    this.options.values.length - 1
                  )),
                  (this.options.values = null))),
            t.isArray(this.options.values) && (n = this.options.values.length),
            this._super(e, i),
            e)
          ) {
            case "orientation":
              this._detectOrientation(),
                this._removeClass(
                  "ui-slider-horizontal ui-slider-vertical"
                )._addClass("ui-slider-" + this.orientation),
                this._refreshValue(),
                this.options.range && this._refreshRange(i),
                this.handles.css("horizontal" === i ? "bottom" : "left", "");
              break;
            case "value":
              (this._animateOff = !0),
                this._refreshValue(),
                this._change(null, 0),
                (this._animateOff = !1);
              break;
            case "values":
              for (
                this._animateOff = !0, this._refreshValue(), s = n - 1;
                s >= 0;
                s--
              )
                this._change(null, s);
              this._animateOff = !1;
              break;
            case "step":
            case "min":
            case "max":
              (this._animateOff = !0),
                this._calculateNewMax(),
                this._refreshValue(),
                (this._animateOff = !1);
              break;
            case "range":
              (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
          }
        },
        _setOptionDisabled: function (t) {
          this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
        },
        _value: function () {
          var t = this.options.value;
          return this._trimAlignValue(t);
        },
        _values: function (t) {
          var e, i, s;
          if (arguments.length)
            return (e = this.options.values[t]), (e = this._trimAlignValue(e));
          if (this._hasMultipleValues()) {
            for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
              i[s] = this._trimAlignValue(i[s]);
            return i;
          }
          return [];
        },
        _trimAlignValue: function (t) {
          if (this._valueMin() >= t) return this._valueMin();
          if (t >= this._valueMax()) return this._valueMax();
          var e = this.options.step > 0 ? this.options.step : 1,
            i = (t - this._valueMin()) % e,
            s = t - i;
          return (
            2 * Math.abs(i) >= e && (s += i > 0 ? e : -e),
            parseFloat(s.toFixed(5))
          );
        },
        _calculateNewMax: function () {
          var t = this.options.max,
            e = this._valueMin(),
            i = this.options.step;
          (t = Math.round((t - e) / i) * i + e) > this.options.max && (t -= i),
            (this.max = parseFloat(t.toFixed(this._precision())));
        },
        _precision: function () {
          var t = this._precisionOf(this.options.step);
          return (
            null !== this.options.min &&
              (t = Math.max(t, this._precisionOf(this.options.min))),
            t
          );
        },
        _precisionOf: function (t) {
          var e = "" + t,
            i = e.indexOf(".");
          return -1 === i ? 0 : e.length - i - 1;
        },
        _valueMin: function () {
          return this.options.min;
        },
        _valueMax: function () {
          return this.max;
        },
        _refreshRange: function (t) {
          "vertical" === t && this.range.css({ width: "", left: "" }),
            "horizontal" === t && this.range.css({ height: "", bottom: "" });
        },
        _refreshValue: function () {
          var e,
            i,
            s,
            n,
            o,
            r = this.options.range,
            a = this.options,
            l = this,
            h = !this._animateOff && a.animate,
            c = {};
          this._hasMultipleValues()
            ? this.handles.each(function (s) {
                (i =
                  100 *
                  ((l.values(s) - l._valueMin()) /
                    (l._valueMax() - l._valueMin()))),
                  (c["horizontal" === l.orientation ? "left" : "bottom"] =
                    i + "%"),
                  t(this).stop(1, 1)[h ? "animate" : "css"](c, a.animate),
                  !0 === l.options.range &&
                    ("horizontal" === l.orientation
                      ? (0 === s &&
                          l.range
                            .stop(1, 1)
                            [h ? "animate" : "css"](
                              { left: i + "%" },
                              a.animate
                            ),
                        1 === s &&
                          l.range[h ? "animate" : "css"](
                            { width: i - e + "%" },
                            { queue: !1, duration: a.animate }
                          ))
                      : (0 === s &&
                          l.range
                            .stop(1, 1)
                            [h ? "animate" : "css"](
                              { bottom: i + "%" },
                              a.animate
                            ),
                        1 === s &&
                          l.range[h ? "animate" : "css"](
                            { height: i - e + "%" },
                            { queue: !1, duration: a.animate }
                          ))),
                  (e = i);
              })
            : ((s = this.value()),
              (n = this._valueMin()),
              (i =
                (o = this._valueMax()) !== n ? 100 * ((s - n) / (o - n)) : 0),
              (c["horizontal" === this.orientation ? "left" : "bottom"] =
                i + "%"),
              this.handle.stop(1, 1)[h ? "animate" : "css"](c, a.animate),
              "min" === r &&
                "horizontal" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [h ? "animate" : "css"]({ width: i + "%" }, a.animate),
              "max" === r &&
                "horizontal" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [h ? "animate" : "css"]({ width: 100 - i + "%" }, a.animate),
              "min" === r &&
                "vertical" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [h ? "animate" : "css"]({ height: i + "%" }, a.animate),
              "max" === r &&
                "vertical" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [h ? "animate" : "css"](
                    { height: 100 - i + "%" },
                    a.animate
                  ));
        },
        _handleEvents: {
          keydown: function (e) {
            var i,
              s,
              n,
              o,
              r = t(e.target).data("ui-slider-handle-index");
            switch (e.keyCode) {
              case t.ui.keyCode.HOME:
              case t.ui.keyCode.END:
              case t.ui.keyCode.PAGE_UP:
              case t.ui.keyCode.PAGE_DOWN:
              case t.ui.keyCode.UP:
              case t.ui.keyCode.RIGHT:
              case t.ui.keyCode.DOWN:
              case t.ui.keyCode.LEFT:
                if (
                  (e.preventDefault(),
                  !this._keySliding &&
                    ((this._keySliding = !0),
                    this._addClass(t(e.target), null, "ui-state-active"),
                    !1 === (i = this._start(e, r))))
                )
                  return;
            }
            switch (
              ((o = this.options.step),
              (s = n =
                this._hasMultipleValues() ? this.values(r) : this.value()),
              e.keyCode)
            ) {
              case t.ui.keyCode.HOME:
                n = this._valueMin();
                break;
              case t.ui.keyCode.END:
                n = this._valueMax();
                break;
              case t.ui.keyCode.PAGE_UP:
                n = this._trimAlignValue(
                  s + (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case t.ui.keyCode.PAGE_DOWN:
                n = this._trimAlignValue(
                  s - (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case t.ui.keyCode.UP:
              case t.ui.keyCode.RIGHT:
                if (s === this._valueMax()) return;
                n = this._trimAlignValue(s + o);
                break;
              case t.ui.keyCode.DOWN:
              case t.ui.keyCode.LEFT:
                if (s === this._valueMin()) return;
                n = this._trimAlignValue(s - o);
            }
            this._slide(e, r, n);
          },
          keyup: function (e) {
            var i = t(e.target).data("ui-slider-handle-index");
            this._keySliding &&
              ((this._keySliding = !1),
              this._stop(e, i),
              this._change(e, i),
              this._removeClass(t(e.target), null, "ui-state-active"));
          },
        },
      }),
      t.widget("ui.spinner", {
        version: "1.12.1",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
          classes: {
            "ui-spinner": "ui-corner-all",
            "ui-spinner-down": "ui-corner-br",
            "ui-spinner-up": "ui-corner-tr",
          },
          culture: null,
          icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
          incremental: !0,
          max: null,
          min: null,
          numberFormat: null,
          page: 10,
          step: 1,
          change: null,
          spin: null,
          start: null,
          stop: null,
        },
        _create: function () {
          this._setOption("max", this.options.max),
            this._setOption("min", this.options.min),
            this._setOption("step", this.options.step),
            "" !== this.value() && this._value(this.element.val(), !0),
            this._draw(),
            this._on(this._events),
            this._refresh(),
            this._on(this.window, {
              beforeunload: function () {
                this.element.removeAttr("autocomplete");
              },
            });
        },
        _getCreateOptions: function () {
          var e = this._super(),
            i = this.element;
          return (
            t.each(["min", "max", "step"], function (t, s) {
              var n = i.attr(s);
              null != n && n.length && (e[s] = n);
            }),
            e
          );
        },
        _events: {
          keydown: function (t) {
            this._start(t) && this._keydown(t) && t.preventDefault();
          },
          keyup: "_stop",
          focus: function () {
            this.previous = this.element.val();
          },
          blur: function (t) {
            return this.cancelBlur
              ? void delete this.cancelBlur
              : (this._stop(),
                this._refresh(),
                void (
                  this.previous !== this.element.val() &&
                  this._trigger("change", t)
                ));
          },
          mousewheel: function (t, e) {
            if (e) {
              if (!this.spinning && !this._start(t)) return !1;
              this._spin((e > 0 ? 1 : -1) * this.options.step, t),
                clearTimeout(this.mousewheelTimer),
                (this.mousewheelTimer = this._delay(function () {
                  this.spinning && this._stop(t);
                }, 100)),
                t.preventDefault();
            }
          },
          "mousedown .ui-spinner-button": function (e) {
            var i;
            function s() {
              this.element[0] === t.ui.safeActiveElement(this.document[0]) ||
                (this.element.trigger("focus"),
                (this.previous = i),
                this._delay(function () {
                  this.previous = i;
                }));
            }
            (i =
              this.element[0] === t.ui.safeActiveElement(this.document[0])
                ? this.previous
                : this.element.val()),
              e.preventDefault(),
              s.call(this),
              (this.cancelBlur = !0),
              this._delay(function () {
                delete this.cancelBlur, s.call(this);
              }),
              !1 !== this._start(e) &&
                this._repeat(
                  null,
                  t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                  e
                );
          },
          "mouseup .ui-spinner-button": "_stop",
          "mouseenter .ui-spinner-button": function (e) {
            return t(e.currentTarget).hasClass("ui-state-active")
              ? !1 !== this._start(e) &&
                  void this._repeat(
                    null,
                    t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                    e
                  )
              : void 0;
          },
          "mouseleave .ui-spinner-button": "_stop",
        },
        _enhance: function () {
          this.uiSpinner = this.element
            .attr("autocomplete", "off")
            .wrap("<span>")
            .parent()
            .append("<a></a><a></a>");
        },
        _draw: function () {
          this._enhance(),
            this._addClass(
              this.uiSpinner,
              "ui-spinner",
              "ui-widget ui-widget-content"
            ),
            this._addClass("ui-spinner-input"),
            this.element.attr("role", "spinbutton"),
            (this.buttons = this.uiSpinner
              .children("a")
              .attr("tabIndex", -1)
              .attr("aria-hidden", !0)
              .button({ classes: { "ui-button": "" } })),
            this._removeClass(this.buttons, "ui-corner-all"),
            this._addClass(
              this.buttons.first(),
              "ui-spinner-button ui-spinner-up"
            ),
            this._addClass(
              this.buttons.last(),
              "ui-spinner-button ui-spinner-down"
            ),
            this.buttons
              .first()
              .button({ icon: this.options.icons.up, showLabel: !1 }),
            this.buttons
              .last()
              .button({ icon: this.options.icons.down, showLabel: !1 }),
            this.buttons.height() > Math.ceil(0.5 * this.uiSpinner.height()) &&
              this.uiSpinner.height() > 0 &&
              this.uiSpinner.height(this.uiSpinner.height());
        },
        _keydown: function (e) {
          var i = this.options,
            s = t.ui.keyCode;
          switch (e.keyCode) {
            case s.UP:
              return this._repeat(null, 1, e), !0;
            case s.DOWN:
              return this._repeat(null, -1, e), !0;
            case s.PAGE_UP:
              return this._repeat(null, i.page, e), !0;
            case s.PAGE_DOWN:
              return this._repeat(null, -i.page, e), !0;
          }
          return !1;
        },
        _start: function (t) {
          return (
            (!!this.spinning || !1 !== this._trigger("start", t)) &&
            (this.counter || (this.counter = 1), (this.spinning = !0), !0)
          );
        },
        _repeat: function (t, e, i) {
          (t = t || 500),
            clearTimeout(this.timer),
            (this.timer = this._delay(function () {
              this._repeat(40, e, i);
            }, t)),
            this._spin(e * this.options.step, i);
        },
        _spin: function (t, e) {
          var i = this.value() || 0;
          this.counter || (this.counter = 1),
            (i = this._adjustValue(i + t * this._increment(this.counter))),
            (this.spinning && !1 === this._trigger("spin", e, { value: i })) ||
              (this._value(i), this.counter++);
        },
        _increment: function (e) {
          var i = this.options.incremental;
          return i
            ? t.isFunction(i)
              ? i(e)
              : Math.floor(
                  (e * e * e) / 5e4 - (e * e) / 500 + (17 * e) / 200 + 1
                )
            : 1;
        },
        _precision: function () {
          var t = this._precisionOf(this.options.step);
          return (
            null !== this.options.min &&
              (t = Math.max(t, this._precisionOf(this.options.min))),
            t
          );
        },
        _precisionOf: function (t) {
          var e = "" + t,
            i = e.indexOf(".");
          return -1 === i ? 0 : e.length - i - 1;
        },
        _adjustValue: function (t) {
          var e,
            i,
            s = this.options;
          return (
            (i =
              Math.round((i = t - (e = null !== s.min ? s.min : 0)) / s.step) *
              s.step),
            (t = parseFloat((t = e + i).toFixed(this._precision()))),
            null !== s.max && t > s.max
              ? s.max
              : null !== s.min && s.min > t
              ? s.min
              : t
          );
        },
        _stop: function (t) {
          this.spinning &&
            (clearTimeout(this.timer),
            clearTimeout(this.mousewheelTimer),
            (this.counter = 0),
            (this.spinning = !1),
            this._trigger("stop", t));
        },
        _setOption: function (t, e) {
          var i, s, n;
          return "culture" === t || "numberFormat" === t
            ? ((i = this._parse(this.element.val())),
              (this.options[t] = e),
              void this.element.val(this._format(i)))
            : (("max" === t || "min" === t || "step" === t) &&
                "string" == typeof e &&
                (e = this._parse(e)),
              "icons" === t &&
                ((s = this.buttons.first().find(".ui-icon")),
                this._removeClass(s, null, this.options.icons.up),
                this._addClass(s, null, e.up),
                (n = this.buttons.last().find(".ui-icon")),
                this._removeClass(n, null, this.options.icons.down),
                this._addClass(n, null, e.down)),
              void this._super(t, e));
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t),
            this.element.prop("disabled", !!t),
            this.buttons.button(t ? "disable" : "enable");
        },
        _setOptions: o(function (t) {
          this._super(t);
        }),
        _parse: function (t) {
          return (
            "string" == typeof t &&
              "" !== t &&
              (t =
                window.Globalize && this.options.numberFormat
                  ? Globalize.parseFloat(t, 10, this.options.culture)
                  : +t),
            "" === t || isNaN(t) ? null : t
          );
        },
        _format: function (t) {
          return "" === t
            ? ""
            : window.Globalize && this.options.numberFormat
            ? Globalize.format(
                t,
                this.options.numberFormat,
                this.options.culture
              )
            : t;
        },
        _refresh: function () {
          this.element.attr({
            "aria-valuemin": this.options.min,
            "aria-valuemax": this.options.max,
            "aria-valuenow": this._parse(this.element.val()),
          });
        },
        isValid: function () {
          var t = this.value();
          return null !== t && t === this._adjustValue(t);
        },
        _value: function (t, e) {
          var i;
          "" !== t &&
            null !== (i = this._parse(t)) &&
            (e || (i = this._adjustValue(i)), (t = this._format(i))),
            this.element.val(t),
            this._refresh();
        },
        _destroy: function () {
          this.element
            .prop("disabled", !1)
            .removeAttr(
              "autocomplete role aria-valuemin aria-valuemax aria-valuenow"
            ),
            this.uiSpinner.replaceWith(this.element);
        },
        stepUp: o(function (t) {
          this._stepUp(t);
        }),
        _stepUp: function (t) {
          this._start() &&
            (this._spin((t || 1) * this.options.step), this._stop());
        },
        stepDown: o(function (t) {
          this._stepDown(t);
        }),
        _stepDown: function (t) {
          this._start() &&
            (this._spin(-((t || 1) * this.options.step)), this._stop());
        },
        pageUp: o(function (t) {
          this._stepUp((t || 1) * this.options.page);
        }),
        pageDown: o(function (t) {
          this._stepDown((t || 1) * this.options.page);
        }),
        value: function (t) {
          return arguments.length
            ? void o(this._value).call(this, t)
            : this._parse(this.element.val());
        },
        widget: function () {
          return this.uiSpinner;
        },
      }),
      !1 !== t.uiBackCompat &&
        t.widget("ui.spinner", t.ui.spinner, {
          _enhance: function () {
            this.uiSpinner = this.element
              .attr("autocomplete", "off")
              .wrap(this._uiSpinnerHtml())
              .parent()
              .append(this._buttonHtml());
          },
          _uiSpinnerHtml: function () {
            return "<span>";
          },
          _buttonHtml: function () {
            return "<a></a><a></a>";
          },
        }),
      t.ui.spinner,
      t.widget("ui.tabs", {
        version: "1.12.1",
        delay: 300,
        options: {
          active: null,
          classes: {
            "ui-tabs": "ui-corner-all",
            "ui-tabs-nav": "ui-corner-all",
            "ui-tabs-panel": "ui-corner-bottom",
            "ui-tabs-tab": "ui-corner-top",
          },
          collapsible: !1,
          event: "click",
          heightStyle: "content",
          hide: null,
          show: null,
          activate: null,
          beforeActivate: null,
          beforeLoad: null,
          load: null,
        },
        _isLocal:
          ((v = /#.*$/),
          function (t) {
            var e, i;
            (e = t.href.replace(v, "")), (i = location.href.replace(v, ""));
            try {
              e = decodeURIComponent(e);
            } catch (s) {}
            try {
              i = decodeURIComponent(i);
            } catch (n) {}
            return t.hash.length > 1 && e === i;
          }),
        _create: function () {
          var e = this,
            i = this.options;
          (this.running = !1),
            this._addClass("ui-tabs", "ui-widget ui-widget-content"),
            this._toggleClass("ui-tabs-collapsible", null, i.collapsible),
            this._processTabs(),
            (i.active = this._initialActive()),
            t.isArray(i.disabled) &&
              (i.disabled = t
                .unique(
                  i.disabled.concat(
                    t.map(this.tabs.filter(".ui-state-disabled"), function (t) {
                      return e.tabs.index(t);
                    })
                  )
                )
                .sort()),
            (this.active =
              !1 !== this.options.active && this.anchors.length
                ? this._findActive(i.active)
                : t()),
            this._refresh(),
            this.active.length && this.load(i.active);
        },
        _initialActive: function () {
          var e = this.options.active,
            i = this.options.collapsible,
            s = location.hash.substring(1);
          return (
            null === e &&
              (s &&
                this.tabs.each(function (i, n) {
                  return t(n).attr("aria-controls") === s
                    ? ((e = i), !1)
                    : void 0;
                }),
              null === e &&
                (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
              (null === e || -1 === e) && (e = !!this.tabs.length && 0)),
            !1 !== e &&
              -1 === (e = this.tabs.index(this.tabs.eq(e))) &&
              (e = !i && 0),
            !i && !1 === e && this.anchors.length && (e = 0),
            e
          );
        },
        _getCreateEventData: function () {
          return {
            tab: this.active,
            panel: this.active.length ? this._getPanelForTab(this.active) : t(),
          };
        },
        _tabKeydown: function (e) {
          var i = t(t.ui.safeActiveElement(this.document[0])).closest("li"),
            s = this.tabs.index(i),
            n = !0;
          if (!this._handlePageNav(e)) {
            switch (e.keyCode) {
              case t.ui.keyCode.RIGHT:
              case t.ui.keyCode.DOWN:
                s++;
                break;
              case t.ui.keyCode.UP:
              case t.ui.keyCode.LEFT:
                (n = !1), s--;
                break;
              case t.ui.keyCode.END:
                s = this.anchors.length - 1;
                break;
              case t.ui.keyCode.HOME:
                s = 0;
                break;
              case t.ui.keyCode.SPACE:
                return (
                  e.preventDefault(),
                  clearTimeout(this.activating),
                  void this._activate(s)
                );
              case t.ui.keyCode.ENTER:
                return (
                  e.preventDefault(),
                  clearTimeout(this.activating),
                  void this._activate(s !== this.options.active && s)
                );
              default:
                return;
            }
            e.preventDefault(),
              clearTimeout(this.activating),
              (s = this._focusNextTab(s, n)),
              e.ctrlKey ||
                e.metaKey ||
                (i.attr("aria-selected", "false"),
                this.tabs.eq(s).attr("aria-selected", "true"),
                (this.activating = this._delay(function () {
                  this.option("active", s);
                }, this.delay)));
          }
        },
        _panelKeydown: function (e) {
          this._handlePageNav(e) ||
            (e.ctrlKey &&
              e.keyCode === t.ui.keyCode.UP &&
              (e.preventDefault(), this.active.trigger("focus")));
        },
        _handlePageNav: function (e) {
          return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP
            ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
              !0)
            : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN
            ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
              !0)
            : void 0;
        },
        _findNextTab: function (e, i) {
          function s() {
            return e > n && (e = 0), 0 > e && (e = n), e;
          }
          for (
            var n = this.tabs.length - 1;
            -1 !== t.inArray(s(), this.options.disabled);

          )
            e = i ? e + 1 : e - 1;
          return e;
        },
        _focusNextTab: function (t, e) {
          return (
            (t = this._findNextTab(t, e)), this.tabs.eq(t).trigger("focus"), t
          );
        },
        _setOption: function (t, e) {
          return "active" === t
            ? void this._activate(e)
            : (this._super(t, e),
              "collapsible" === t &&
                (this._toggleClass("ui-tabs-collapsible", null, e),
                e || !1 !== this.options.active || this._activate(0)),
              "event" === t && this._setupEvents(e),
              void ("heightStyle" === t && this._setupHeightStyle(e)));
        },
        _sanitizeSelector: function (t) {
          return t
            ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&")
            : "";
        },
        refresh: function () {
          var e = this.options,
            i = this.tablist.children(":has(a[href])");
          (e.disabled = t.map(i.filter(".ui-state-disabled"), function (t) {
            return i.index(t);
          })),
            this._processTabs(),
            !1 !== e.active && this.anchors.length
              ? this.active.length &&
                !t.contains(this.tablist[0], this.active[0])
                ? this.tabs.length === e.disabled.length
                  ? ((e.active = !1), (this.active = t()))
                  : this._activate(
                      this._findNextTab(Math.max(0, e.active - 1), !1)
                    )
                : (e.active = this.tabs.index(this.active))
              : ((e.active = !1), (this.active = t())),
            this._refresh();
        },
        _refresh: function () {
          this._setOptionDisabled(this.options.disabled),
            this._setupEvents(this.options.event),
            this._setupHeightStyle(this.options.heightStyle),
            this.tabs
              .not(this.active)
              .attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1,
              }),
            this.panels
              .not(this._getPanelForTab(this.active))
              .hide()
              .attr({ "aria-hidden": "true" }),
            this.active.length
              ? (this.active.attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0,
                }),
                this._addClass(
                  this.active,
                  "ui-tabs-active",
                  "ui-state-active"
                ),
                this._getPanelForTab(this.active)
                  .show()
                  .attr({ "aria-hidden": "false" }))
              : this.tabs.eq(0).attr("tabIndex", 0);
        },
        _processTabs: function () {
          var e = this,
            i = this.tabs,
            s = this.anchors,
            n = this.panels;
          (this.tablist = this._getList().attr("role", "tablist")),
            this._addClass(
              this.tablist,
              "ui-tabs-nav",
              "ui-helper-reset ui-helper-clearfix ui-widget-header"
            ),
            this.tablist
              .on("mousedown" + this.eventNamespace, "> li", function (e) {
                t(this).is(".ui-state-disabled") && e.preventDefault();
              })
              .on(
                "focus" + this.eventNamespace,
                ".ui-tabs-anchor",
                function () {
                  t(this).closest("li").is(".ui-state-disabled") && this.blur();
                }
              ),
            (this.tabs = this.tablist
              .find("> li:has(a[href])")
              .attr({ role: "tab", tabIndex: -1 })),
            this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"),
            (this.anchors = this.tabs
              .map(function () {
                return t("a", this)[0];
              })
              .attr({ role: "presentation", tabIndex: -1 })),
            this._addClass(this.anchors, "ui-tabs-anchor"),
            (this.panels = t()),
            this.anchors.each(function (i, s) {
              var n,
                o,
                r,
                a = t(s).uniqueId().attr("id"),
                l = t(s).closest("li"),
                h = l.attr("aria-controls");
              e._isLocal(s)
                ? ((r = (n = s.hash).substring(1)),
                  (o = e.element.find(e._sanitizeSelector(n))))
                : ((n =
                    "#" +
                    (r = l.attr("aria-controls") || t({}).uniqueId()[0].id)),
                  (o = e.element.find(n)).length ||
                    (o = e._createPanel(r)).insertAfter(
                      e.panels[i - 1] || e.tablist
                    ),
                  o.attr("aria-live", "polite")),
                o.length && (e.panels = e.panels.add(o)),
                h && l.data("ui-tabs-aria-controls", h),
                l.attr({ "aria-controls": r, "aria-labelledby": a }),
                o.attr("aria-labelledby", a);
            }),
            this.panels.attr("role", "tabpanel"),
            this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"),
            i &&
              (this._off(i.not(this.tabs)),
              this._off(s.not(this.anchors)),
              this._off(n.not(this.panels)));
        },
        _getList: function () {
          return this.tablist || this.element.find("ol, ul").eq(0);
        },
        _createPanel: function (e) {
          return t("<div>").attr("id", e).data("ui-tabs-destroy", !0);
        },
        _setOptionDisabled: function (e) {
          var i, s, n;
          for (
            t.isArray(e) &&
              (e.length
                ? e.length === this.anchors.length && (e = !0)
                : (e = !1)),
              n = 0;
            (s = this.tabs[n]);
            n++
          )
            (i = t(s)),
              !0 === e || -1 !== t.inArray(n, e)
                ? (i.attr("aria-disabled", "true"),
                  this._addClass(i, null, "ui-state-disabled"))
                : (i.removeAttr("aria-disabled"),
                  this._removeClass(i, null, "ui-state-disabled"));
          (this.options.disabled = e),
            this._toggleClass(
              this.widget(),
              this.widgetFullName + "-disabled",
              null,
              !0 === e
            );
        },
        _setupEvents: function (e) {
          var i = {};
          e &&
            t.each(e.split(" "), function (t, e) {
              i[e] = "_eventHandler";
            }),
            this._off(this.anchors.add(this.tabs).add(this.panels)),
            this._on(!0, this.anchors, {
              click: function (t) {
                t.preventDefault();
              },
            }),
            this._on(this.anchors, i),
            this._on(this.tabs, { keydown: "_tabKeydown" }),
            this._on(this.panels, { keydown: "_panelKeydown" }),
            this._focusable(this.tabs),
            this._hoverable(this.tabs);
        },
        _setupHeightStyle: function (e) {
          var i,
            s = this.element.parent();
          "fill" === e
            ? ((i = s.height()),
              (i -= this.element.outerHeight() - this.element.height()),
              this.element.siblings(":visible").each(function () {
                var e = t(this),
                  s = e.css("position");
                "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0));
              }),
              this.element
                .children()
                .not(this.panels)
                .each(function () {
                  i -= t(this).outerHeight(!0);
                }),
              this.panels
                .each(function () {
                  t(this).height(
                    Math.max(0, i - t(this).innerHeight() + t(this).height())
                  );
                })
                .css("overflow", "auto"))
            : "auto" === e &&
              ((i = 0),
              this.panels
                .each(function () {
                  i = Math.max(i, t(this).height("").height());
                })
                .height(i));
        },
        _eventHandler: function (e) {
          var i = this.options,
            s = this.active,
            n = t(e.currentTarget).closest("li"),
            o = n[0] === s[0],
            r = o && i.collapsible,
            a = r ? t() : this._getPanelForTab(n),
            l = s.length ? this._getPanelForTab(s) : t(),
            h = { oldTab: s, oldPanel: l, newTab: r ? t() : n, newPanel: a };
          e.preventDefault(),
            n.hasClass("ui-state-disabled") ||
              n.hasClass("ui-tabs-loading") ||
              this.running ||
              (o && !i.collapsible) ||
              !1 === this._trigger("beforeActivate", e, h) ||
              ((i.active = !r && this.tabs.index(n)),
              (this.active = o ? t() : n),
              this.xhr && this.xhr.abort(),
              l.length ||
                a.length ||
                t.error("jQuery UI Tabs: Mismatching fragment identifier."),
              a.length && this.load(this.tabs.index(n), e),
              this._toggle(e, h));
        },
        _toggle: function (e, i) {
          function s() {
            (o.running = !1), o._trigger("activate", e, i);
          }
          function n() {
            o._addClass(
              i.newTab.closest("li"),
              "ui-tabs-active",
              "ui-state-active"
            ),
              r.length && o.options.show
                ? o._show(r, o.options.show, s)
                : (r.show(), s());
          }
          var o = this,
            r = i.newPanel,
            a = i.oldPanel;
          (this.running = !0),
            a.length && this.options.hide
              ? this._hide(a, this.options.hide, function () {
                  o._removeClass(
                    i.oldTab.closest("li"),
                    "ui-tabs-active",
                    "ui-state-active"
                  ),
                    n();
                })
              : (this._removeClass(
                  i.oldTab.closest("li"),
                  "ui-tabs-active",
                  "ui-state-active"
                ),
                a.hide(),
                n()),
            a.attr("aria-hidden", "true"),
            i.oldTab.attr({
              "aria-selected": "false",
              "aria-expanded": "false",
            }),
            r.length && a.length
              ? i.oldTab.attr("tabIndex", -1)
              : r.length &&
                this.tabs
                  .filter(function () {
                    return 0 === t(this).attr("tabIndex");
                  })
                  .attr("tabIndex", -1),
            r.attr("aria-hidden", "false"),
            i.newTab.attr({
              "aria-selected": "true",
              "aria-expanded": "true",
              tabIndex: 0,
            });
        },
        _activate: function (e) {
          var i,
            s = this._findActive(e);
          s[0] !== this.active[0] &&
            (s.length || (s = this.active),
            (i = s.find(".ui-tabs-anchor")[0]),
            this._eventHandler({
              target: i,
              currentTarget: i,
              preventDefault: t.noop,
            }));
        },
        _findActive: function (e) {
          return !1 === e ? t() : this.tabs.eq(e);
        },
        _getIndex: function (e) {
          return (
            "string" == typeof e &&
              (e = this.anchors.index(
                this.anchors.filter("[href$='" + t.ui.escapeSelector(e) + "']")
              )),
            e
          );
        },
        _destroy: function () {
          this.xhr && this.xhr.abort(),
            this.tablist.removeAttr("role").off(this.eventNamespace),
            this.anchors.removeAttr("role tabIndex").removeUniqueId(),
            this.tabs.add(this.panels).each(function () {
              t.data(this, "ui-tabs-destroy")
                ? t(this).remove()
                : t(this).removeAttr(
                    "role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded"
                  );
            }),
            this.tabs.each(function () {
              var e = t(this),
                i = e.data("ui-tabs-aria-controls");
              i
                ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls")
                : e.removeAttr("aria-controls");
            }),
            this.panels.show(),
            "content" !== this.options.heightStyle &&
              this.panels.css("height", "");
        },
        enable: function (e) {
          var i = this.options.disabled;
          !1 !== i &&
            (void 0 === e
              ? (i = !1)
              : ((e = this._getIndex(e)),
                (i = t.isArray(i)
                  ? t.map(i, function (t) {
                      return t !== e ? t : null;
                    })
                  : t.map(this.tabs, function (t, i) {
                      return i !== e ? i : null;
                    }))),
            this._setOptionDisabled(i));
        },
        disable: function (e) {
          var i = this.options.disabled;
          if (!0 !== i) {
            if (void 0 === e) i = !0;
            else {
              if (((e = this._getIndex(e)), -1 !== t.inArray(e, i))) return;
              i = t.isArray(i) ? t.merge([e], i).sort() : [e];
            }
            this._setOptionDisabled(i);
          }
        },
        load: function (e, i) {
          e = this._getIndex(e);
          var s = this,
            n = this.tabs.eq(e),
            o = n.find(".ui-tabs-anchor"),
            r = this._getPanelForTab(n),
            a = { tab: n, panel: r },
            l = function (t, e) {
              "abort" === e && s.panels.stop(!1, !0),
                s._removeClass(n, "ui-tabs-loading"),
                r.removeAttr("aria-busy"),
                t === s.xhr && delete s.xhr;
            };
          this._isLocal(o[0]) ||
            ((this.xhr = t.ajax(this._ajaxSettings(o, i, a))),
            this.xhr &&
              "canceled" !== this.xhr.statusText &&
              (this._addClass(n, "ui-tabs-loading"),
              r.attr("aria-busy", "true"),
              this.xhr
                .done(function (t, e, n) {
                  setTimeout(function () {
                    r.html(t), s._trigger("load", i, a), l(n, e);
                  }, 1);
                })
                .fail(function (t, e) {
                  setTimeout(function () {
                    l(t, e);
                  }, 1);
                })));
        },
        _ajaxSettings: function (e, i, s) {
          var n = this;
          return {
            url: e.attr("href").replace(/#.*$/, ""),
            beforeSend: function (e, o) {
              return n._trigger(
                "beforeLoad",
                i,
                t.extend({ jqXHR: e, ajaxSettings: o }, s)
              );
            },
          };
        },
        _getPanelForTab: function (e) {
          var i = t(e).attr("aria-controls");
          return this.element.find(this._sanitizeSelector("#" + i));
        },
      }),
      !1 !== t.uiBackCompat &&
        t.widget("ui.tabs", t.ui.tabs, {
          _processTabs: function () {
            this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
          },
        }),
      t.ui.tabs;
    var $,
      y = "ui-effects-",
      w = "ui-effects-style",
      _ = "ui-effects-animated",
      k = t;
    (t.effects = { effect: {} }),
      (function (t, e) {
        function i(t, e, i) {
          var s = c[e.type] || {};
          return null == t
            ? i || !e.def
              ? null
              : e.def
            : ((t = s.floor ? ~~t : parseFloat(t)),
              isNaN(t)
                ? e.def
                : s.mod
                ? (t + s.mod) % s.mod
                : 0 > t
                ? 0
                : t > s.max
                ? s.max
                : t);
        }
        function s(i) {
          var s = l(),
            n = (s._rgba = []);
          return (
            (i = i.toLowerCase()),
            p(a, function (t, o) {
              var r,
                a = o.re.exec(i),
                l = a && o.parse(a),
                c = o.space || "rgba";
              return l
                ? ((r = s[c](l)),
                  (s[h[c].cache] = r[h[c].cache]),
                  (n = s._rgba = r._rgba),
                  !1)
                : e;
            }),
            n.length
              ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s)
              : o[i]
          );
        }
        function n(t, e, i) {
          return 1 > 6 * (i = (i + 1) % 1)
            ? t + 6 * (e - t) * i
            : 1 > 2 * i
            ? e
            : 2 > 3 * i
            ? t + 6 * (e - t) * (2 / 3 - i)
            : t;
        }
        var o,
          r = /^([\-+])=\s*(\d+\.?\d*)/,
          a = [
            {
              re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              parse: function (t) {
                return [t[1], t[2], t[3], t[4]];
              },
            },
            {
              re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              parse: function (t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
              },
            },
            {
              re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
              parse: function (t) {
                return [
                  parseInt(t[1], 16),
                  parseInt(t[2], 16),
                  parseInt(t[3], 16),
                ];
              },
            },
            {
              re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
              parse: function (t) {
                return [
                  parseInt(t[1] + t[1], 16),
                  parseInt(t[2] + t[2], 16),
                  parseInt(t[3] + t[3], 16),
                ];
              },
            },
            {
              re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              space: "hsla",
              parse: function (t) {
                return [t[1], t[2] / 100, t[3] / 100, t[4]];
              },
            },
          ],
          l = (t.Color = function (e, i, s, n) {
            return new t.Color.fn.parse(e, i, s, n);
          }),
          h = {
            rgba: {
              props: {
                red: { idx: 0, type: "byte" },
                green: { idx: 1, type: "byte" },
                blue: { idx: 2, type: "byte" },
              },
            },
            hsla: {
              props: {
                hue: { idx: 0, type: "degrees" },
                saturation: { idx: 1, type: "percent" },
                lightness: { idx: 2, type: "percent" },
              },
            },
          },
          c = {
            byte: { floor: !0, max: 255 },
            percent: { max: 1 },
            degrees: { mod: 360, floor: !0 },
          },
          u = (l.support = {}),
          d = t("<p>")[0],
          p = t.each;
        (d.style.cssText = "background-color:rgba(1,1,1,.5)"),
          (u.rgba = d.style.backgroundColor.indexOf("rgba") > -1),
          p(h, function (t, e) {
            (e.cache = "_" + t),
              (e.props.alpha = { idx: 3, type: "percent", def: 1 });
          }),
          (l.fn = t.extend(l.prototype, {
            parse: function (n, r, a, c) {
              if (n === e) return (this._rgba = [null, null, null, null]), this;
              (n.jquery || n.nodeType) && ((n = t(n).css(r)), (r = e));
              var u = this,
                d = t.type(n),
                f = (this._rgba = []);
              return (
                r !== e && ((n = [n, r, a, c]), (d = "array")),
                "string" === d
                  ? this.parse(s(n) || o._default)
                  : "array" === d
                  ? (p(h.rgba.props, function (t, e) {
                      f[e.idx] = i(n[e.idx], e);
                    }),
                    this)
                  : "object" === d
                  ? (n instanceof l
                      ? p(h, function (t, e) {
                          n[e.cache] && (u[e.cache] = n[e.cache].slice());
                        })
                      : p(h, function (e, s) {
                          var o = s.cache;
                          p(s.props, function (t, e) {
                            if (!u[o] && s.to) {
                              if ("alpha" === t || null == n[t]) return;
                              u[o] = s.to(u._rgba);
                            }
                            u[o][e.idx] = i(n[t], e, !0);
                          }),
                            u[o] &&
                              0 > t.inArray(null, u[o].slice(0, 3)) &&
                              ((u[o][3] = 1),
                              s.from && (u._rgba = s.from(u[o])));
                        }),
                    this)
                  : e
              );
            },
            is: function (t) {
              var i = l(t),
                s = !0,
                n = this;
              return (
                p(h, function (t, o) {
                  var r,
                    a = i[o.cache];
                  return (
                    a &&
                      ((r = n[o.cache] || (o.to && o.to(n._rgba)) || []),
                      p(o.props, function (t, i) {
                        return null != a[i.idx]
                          ? (s = a[i.idx] === r[i.idx])
                          : e;
                      })),
                    s
                  );
                }),
                s
              );
            },
            _space: function () {
              var t = [],
                e = this;
              return (
                p(h, function (i, s) {
                  e[s.cache] && t.push(i);
                }),
                t.pop()
              );
            },
            transition: function (t, e) {
              var s = l(t),
                n = s._space(),
                o = h[n],
                r = 0 === this.alpha() ? l("transparent") : this,
                a = r[o.cache] || o.to(r._rgba),
                u = a.slice();
              return (
                (s = s[o.cache]),
                p(o.props, function (t, n) {
                  var o = n.idx,
                    r = a[o],
                    l = s[o],
                    h = c[n.type] || {};
                  null !== l &&
                    (null === r
                      ? (u[o] = l)
                      : (h.mod &&
                          (l - r > h.mod / 2
                            ? (r += h.mod)
                            : r - l > h.mod / 2 && (r -= h.mod)),
                        (u[o] = i((l - r) * e + r, n))));
                }),
                this[n](u)
              );
            },
            blend: function (e) {
              if (1 === this._rgba[3]) return this;
              var i = this._rgba.slice(),
                s = i.pop(),
                n = l(e)._rgba;
              return l(
                t.map(i, function (t, e) {
                  return (1 - s) * n[e] + s * t;
                })
              );
            },
            toRgbaString: function () {
              var e = "rgba(",
                i = t.map(this._rgba, function (t, e) {
                  return null == t ? (e > 2 ? 1 : 0) : t;
                });
              return 1 === i[3] && (i.pop(), (e = "rgb(")), e + i.join() + ")";
            },
            toHslaString: function () {
              var e = "hsla(",
                i = t.map(this.hsla(), function (t, e) {
                  return (
                    null == t && (t = e > 2 ? 1 : 0),
                    e && 3 > e && (t = Math.round(100 * t) + "%"),
                    t
                  );
                });
              return 1 === i[3] && (i.pop(), (e = "hsl(")), e + i.join() + ")";
            },
            toHexString: function (e) {
              var i = this._rgba.slice(),
                s = i.pop();
              return (
                e && i.push(~~(255 * s)),
                "#" +
                  t
                    .map(i, function (t) {
                      return 1 === (t = (t || 0).toString(16)).length
                        ? "0" + t
                        : t;
                    })
                    .join("")
              );
            },
            toString: function () {
              return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
            },
          })),
          (l.fn.parse.prototype = l.fn),
          (h.hsla.to = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])
              return [null, null, null, t[3]];
            var e,
              i,
              s = t[0] / 255,
              n = t[1] / 255,
              o = t[2] / 255,
              r = t[3],
              a = Math.max(s, n, o),
              l = Math.min(s, n, o),
              h = a - l,
              c = a + l,
              u = 0.5 * c;
            return [
              Math.round(
                (e =
                  l === a
                    ? 0
                    : s === a
                    ? (60 * (n - o)) / h + 360
                    : n === a
                    ? (60 * (o - s)) / h + 120
                    : (60 * (s - n)) / h + 240)
              ) % 360,
              (i = 0 === h ? 0 : 0.5 >= u ? h / c : h / (2 - c)),
              u,
              null == r ? 1 : r,
            ];
          }),
          (h.hsla.from = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])
              return [null, null, null, t[3]];
            var e = t[0] / 360,
              i = t[1],
              s = t[2],
              o = t[3],
              r = 0.5 >= s ? s * (1 + i) : s + i - s * i,
              a = 2 * s - r;
            return [
              Math.round(255 * n(a, r, e + 1 / 3)),
              Math.round(255 * n(a, r, e)),
              Math.round(255 * n(a, r, e - 1 / 3)),
              o,
            ];
          }),
          p(h, function (s, n) {
            var o = n.props,
              a = n.cache,
              h = n.to,
              c = n.from;
            (l.fn[s] = function (s) {
              if ((h && !this[a] && (this[a] = h(this._rgba)), s === e))
                return this[a].slice();
              var n,
                r = t.type(s),
                u = "array" === r || "object" === r ? s : arguments,
                d = this[a].slice();
              return (
                p(o, function (t, e) {
                  var s = u["object" === r ? t : e.idx];
                  null == s && (s = d[e.idx]), (d[e.idx] = i(s, e));
                }),
                c ? (((n = l(c(d)))[a] = d), n) : l(d)
              );
            }),
              p(o, function (e, i) {
                l.fn[e] ||
                  (l.fn[e] = function (n) {
                    var o,
                      a = t.type(n),
                      l = "alpha" === e ? (this._hsla ? "hsla" : "rgba") : s,
                      h = this[l](),
                      c = h[i.idx];
                    return "undefined" === a
                      ? c
                      : ("function" === a &&
                          ((n = n.call(this, c)), (a = t.type(n))),
                        null == n && i.empty
                          ? this
                          : ("string" === a &&
                              (o = r.exec(n)) &&
                              (n =
                                c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1)),
                            (h[i.idx] = n),
                            this[l](h)));
                  });
              });
          }),
          (l.hook = function (e) {
            p(e.split(" "), function (e, i) {
              (t.cssHooks[i] = {
                set: function (e, n) {
                  var o,
                    r,
                    a = "";
                  if (
                    "transparent" !== n &&
                    ("string" !== t.type(n) || (o = s(n)))
                  ) {
                    if (((n = l(o || n)), !u.rgba && 1 !== n._rgba[3])) {
                      for (
                        r = "backgroundColor" === i ? e.parentNode : e;
                        ("" === a || "transparent" === a) && r && r.style;

                      )
                        try {
                          (a = t.css(r, "backgroundColor")), (r = r.parentNode);
                        } catch (h) {}
                      n = n.blend(a && "transparent" !== a ? a : "_default");
                    }
                    n = n.toRgbaString();
                  }
                  try {
                    e.style[i] = n;
                  } catch (c) {}
                },
              }),
                (t.fx.step[i] = function (e) {
                  e.colorInit ||
                    ((e.start = l(e.elem, i)),
                    (e.end = l(e.end)),
                    (e.colorInit = !0)),
                    t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos));
                });
            });
          }),
          l.hook(
            "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"
          ),
          (t.cssHooks.borderColor = {
            expand: function (t) {
              var e = {};
              return (
                p(["Top", "Right", "Bottom", "Left"], function (i, s) {
                  e["border" + s + "Color"] = t;
                }),
                e
              );
            },
          }),
          (o = t.Color.names =
            {
              aqua: "#00ffff",
              black: "#000000",
              blue: "#0000ff",
              fuchsia: "#ff00ff",
              gray: "#808080",
              green: "#008000",
              lime: "#00ff00",
              maroon: "#800000",
              navy: "#000080",
              olive: "#808000",
              purple: "#800080",
              red: "#ff0000",
              silver: "#c0c0c0",
              teal: "#008080",
              white: "#ffffff",
              yellow: "#ffff00",
              transparent: [null, null, null, 0],
              _default: "#ffffff",
            });
      })(k),
      (function () {
        function e(e) {
          var i,
            s,
            n = e.ownerDocument.defaultView
              ? e.ownerDocument.defaultView.getComputedStyle(e, null)
              : e.currentStyle,
            o = {};
          if (n && n.length && n[0] && n[n[0]])
            for (s = n.length; s--; )
              "string" == typeof n[(i = n[s])] && (o[t.camelCase(i)] = n[i]);
          else for (i in n) "string" == typeof n[i] && (o[i] = n[i]);
          return o;
        }
        var i,
          s,
          n,
          o = ["add", "remove", "toggle"],
          r = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1,
          };
        t.each(
          [
            "borderLeftStyle",
            "borderRightStyle",
            "borderBottomStyle",
            "borderTopStyle",
          ],
          function (e, i) {
            t.fx.step[i] = function (t) {
              (("none" === t.end || t.setAttr) && (1 !== t.pos || t.setAttr)) ||
                (k.style(t.elem, i, t.end), (t.setAttr = !0));
            };
          }
        ),
          t.fn.addBack ||
            (t.fn.addBack = function (t) {
              return this.add(
                null == t ? this.prevObject : this.prevObject.filter(t)
              );
            }),
          (t.effects.animateClass = function (i, s, n, a) {
            var l = t.speed(s, n, a);
            return this.queue(function () {
              var s,
                n = t(this),
                a = n.attr("class") || "",
                h = l.children ? n.find("*").addBack() : n;
              (h = h.map(function () {
                return { el: t(this), start: e(this) };
              })),
                (s = function () {
                  t.each(o, function (t, e) {
                    i[e] && n[e + "Class"](i[e]);
                  });
                })(),
                (h = h.map(function () {
                  return (
                    (this.end = e(this.el[0])),
                    (this.diff = (function e(i, s) {
                      var n,
                        o,
                        a = {};
                      for (n in s)
                        (o = s[n]),
                          i[n] !== o &&
                            (r[n] ||
                              ((t.fx.step[n] || !isNaN(parseFloat(o))) &&
                                (a[n] = o)));
                      return a;
                    })(this.start, this.end)),
                    this
                  );
                })),
                n.attr("class", a),
                (h = h.map(function () {
                  var e = this,
                    i = t.Deferred(),
                    s = t.extend({}, l, {
                      queue: !1,
                      complete: function () {
                        i.resolve(e);
                      },
                    });
                  return this.el.animate(this.diff, s), i.promise();
                })),
                t.when.apply(t, h.get()).done(function () {
                  s(),
                    t.each(arguments, function () {
                      var e = this.el;
                      t.each(this.diff, function (t) {
                        e.css(t, "");
                      });
                    }),
                    l.complete.call(n[0]);
                });
            });
          }),
          t.fn.extend({
            addClass:
              ((i = t.fn.addClass),
              function (e, s, n, o) {
                return s
                  ? t.effects.animateClass.call(this, { add: e }, s, n, o)
                  : i.apply(this, arguments);
              }),
            removeClass:
              ((s = t.fn.removeClass),
              function (e, i, n, o) {
                return arguments.length > 1
                  ? t.effects.animateClass.call(this, { remove: e }, i, n, o)
                  : s.apply(this, arguments);
              }),
            toggleClass:
              ((n = t.fn.toggleClass),
              function (e, i, s, o, r) {
                return "boolean" == typeof i || void 0 === i
                  ? s
                    ? t.effects.animateClass.call(
                        this,
                        i ? { add: e } : { remove: e },
                        s,
                        o,
                        r
                      )
                    : n.apply(this, arguments)
                  : t.effects.animateClass.call(this, { toggle: e }, i, s, o);
              }),
            switchClass: function (e, i, s, n, o) {
              return t.effects.animateClass.call(
                this,
                { add: i, remove: e },
                s,
                n,
                o
              );
            },
          });
      })(),
      (function () {
        var e, i, s, n;
        function o(e, i, s, n) {
          return (
            t.isPlainObject(e) && ((i = e), (e = e.effect)),
            (e = { effect: e }),
            null == i && (i = {}),
            t.isFunction(i) && ((n = i), (s = null), (i = {})),
            ("number" == typeof i || t.fx.speeds[i]) &&
              ((n = s), (s = i), (i = {})),
            t.isFunction(s) && ((n = s), (s = null)),
            i && t.extend(e, i),
            (s = s || i.duration),
            (e.duration = t.fx.off
              ? 0
              : "number" == typeof s
              ? s
              : s in t.fx.speeds
              ? t.fx.speeds[s]
              : t.fx.speeds._default),
            (e.complete = n || i.complete),
            e
          );
        }
        function r(e) {
          return (
            !e ||
            "number" == typeof e ||
            !!t.fx.speeds[e] ||
            ("string" == typeof e && !t.effects.effect[e]) ||
            !!t.isFunction(e) ||
            ("object" == typeof e && !e.effect)
          );
        }
        function a(t, e) {
          var i = e.outerWidth(),
            s = e.outerHeight(),
            n =
              /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(
                t
              ) || ["", 0, i, s, 0];
          return {
            top: parseFloat(n[1]) || 0,
            right: "auto" === n[2] ? i : parseFloat(n[2]),
            bottom: "auto" === n[3] ? s : parseFloat(n[3]),
            left: parseFloat(n[4]) || 0,
          };
        }
        t.expr &&
          t.expr.filters &&
          t.expr.filters.animated &&
          (t.expr.filters.animated =
            ((e = t.expr.filters.animated),
            function (i) {
              return !!t(i).data(_) || e(i);
            })),
          !1 !== t.uiBackCompat &&
            t.extend(t.effects, {
              save: function (t, e) {
                for (var i = 0, s = e.length; s > i; i++)
                  null !== e[i] && t.data(y + e[i], t[0].style[e[i]]);
              },
              restore: function (t, e) {
                for (var i, s = 0, n = e.length; n > s; s++)
                  null !== e[s] && ((i = t.data(y + e[s])), t.css(e[s], i));
              },
              setMode: function (t, e) {
                return (
                  "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                );
              },
              createWrapper: function (e) {
                if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                var i = {
                    width: e.outerWidth(!0),
                    height: e.outerHeight(!0),
                    float: e.css("float"),
                  },
                  s = t("<div></div>")
                    .addClass("ui-effects-wrapper")
                    .css({
                      fontSize: "100%",
                      background: "transparent",
                      border: "none",
                      margin: 0,
                      padding: 0,
                    }),
                  n = { width: e.width(), height: e.height() },
                  o = document.activeElement;
                try {
                  o.id;
                } catch (r) {
                  o = document.body;
                }
                return (
                  e.wrap(s),
                  (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"),
                  (s = e.parent()),
                  "static" === e.css("position")
                    ? (s.css({ position: "relative" }),
                      e.css({ position: "relative" }))
                    : (t.extend(i, {
                        position: e.css("position"),
                        zIndex: e.css("z-index"),
                      }),
                      t.each(
                        ["top", "left", "bottom", "right"],
                        function (t, s) {
                          (i[s] = e.css(s)),
                            isNaN(parseInt(i[s], 10)) && (i[s] = "auto");
                        }
                      ),
                      e.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto",
                      })),
                  e.css(n),
                  s.css(i).show()
                );
              },
              removeWrapper: function (e) {
                var i = document.activeElement;
                return (
                  e.parent().is(".ui-effects-wrapper") &&
                    (e.parent().replaceWith(e),
                    (e[0] === i || t.contains(e[0], i)) &&
                      t(i).trigger("focus")),
                  e
                );
              },
            }),
          t.extend(t.effects, {
            version: "1.12.1",
            define: function (e, i, s) {
              return (
                s || ((s = i), (i = "effect")),
                (t.effects.effect[e] = s),
                (t.effects.effect[e].mode = i),
                s
              );
            },
            scaledDimensions: function (t, e, i) {
              if (0 === e)
                return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
              var s = "horizontal" !== i ? (e || 100) / 100 : 1,
                n = "vertical" !== i ? (e || 100) / 100 : 1;
              return {
                height: t.height() * n,
                width: t.width() * s,
                outerHeight: t.outerHeight() * n,
                outerWidth: t.outerWidth() * s,
              };
            },
            clipToBox: function (t) {
              return {
                width: t.clip.right - t.clip.left,
                height: t.clip.bottom - t.clip.top,
                left: t.clip.left,
                top: t.clip.top,
              };
            },
            unshift: function (t, e, i) {
              var s = t.queue();
              e > 1 && s.splice.apply(s, [1, 0].concat(s.splice(e, i))),
                t.dequeue();
            },
            saveStyle: function (t) {
              t.data(w, t[0].style.cssText);
            },
            restoreStyle: function (t) {
              (t[0].style.cssText = t.data(w) || ""), t.removeData(w);
            },
            mode: function (t, e) {
              var i = t.is(":hidden");
              return (
                "toggle" === e && (e = i ? "show" : "hide"),
                (i ? "hide" === e : "show" === e) && (e = "none"),
                e
              );
            },
            getBaseline: function (t, e) {
              var i, s;
              switch (t[0]) {
                case "top":
                  i = 0;
                  break;
                case "middle":
                  i = 0.5;
                  break;
                case "bottom":
                  i = 1;
                  break;
                default:
                  i = t[0] / e.height;
              }
              switch (t[1]) {
                case "left":
                  s = 0;
                  break;
                case "center":
                  s = 0.5;
                  break;
                case "right":
                  s = 1;
                  break;
                default:
                  s = t[1] / e.width;
              }
              return { x: s, y: i };
            },
            createPlaceholder: function (e) {
              var i,
                s = e.css("position"),
                n = e.position();
              return (
                e
                  .css({
                    marginTop: e.css("marginTop"),
                    marginBottom: e.css("marginBottom"),
                    marginLeft: e.css("marginLeft"),
                    marginRight: e.css("marginRight"),
                  })
                  .outerWidth(e.outerWidth())
                  .outerHeight(e.outerHeight()),
                /^(static|relative)/.test(s) &&
                  ((s = "absolute"),
                  (i = t("<" + e[0].nodeName + ">")
                    .insertAfter(e)
                    .css({
                      display: /^(inline|ruby)/.test(e.css("display"))
                        ? "inline-block"
                        : "block",
                      visibility: "hidden",
                      marginTop: e.css("marginTop"),
                      marginBottom: e.css("marginBottom"),
                      marginLeft: e.css("marginLeft"),
                      marginRight: e.css("marginRight"),
                      float: e.css("float"),
                    })
                    .outerWidth(e.outerWidth())
                    .outerHeight(e.outerHeight())
                    .addClass("ui-effects-placeholder")),
                  e.data(y + "placeholder", i)),
                e.css({ position: s, left: n.left, top: n.top }),
                i
              );
            },
            removePlaceholder: function (t) {
              var e = y + "placeholder",
                i = t.data(e);
              i && (i.remove(), t.removeData(e));
            },
            cleanUp: function (e) {
              t.effects.restoreStyle(e), t.effects.removePlaceholder(e);
            },
            setTransition: function (e, i, s, n) {
              return (
                (n = n || {}),
                t.each(i, function (t, i) {
                  var o = e.cssUnit(i);
                  o[0] > 0 && (n[i] = o[0] * s + o[1]);
                }),
                n
              );
            },
          }),
          t.fn.extend({
            effect: function () {
              function e(e) {
                function o() {
                  t.isFunction(l) && l.call(r[0]), t.isFunction(e) && e();
                }
                var r = t(this);
                (i.mode = c.shift()),
                  !1 === t.uiBackCompat || n
                    ? "none" === i.mode
                      ? (r[h](), o())
                      : s.call(r[0], i, function e() {
                          r.removeData(_),
                            t.effects.cleanUp(r),
                            "hide" === i.mode && r.hide(),
                            o();
                        })
                    : (r.is(":hidden") ? "hide" === h : "show" === h)
                    ? (r[h](), o())
                    : s.call(r[0], i, o);
              }
              var i = o.apply(this, arguments),
                s = t.effects.effect[i.effect],
                n = s.mode,
                r = i.queue,
                a = r || "fx",
                l = i.complete,
                h = i.mode,
                c = [],
                u = function (e) {
                  var i = t(this),
                    s = t.effects.mode(i, h) || n;
                  i.data(_, !0),
                    c.push(s),
                    n &&
                      ("show" === s || (s === n && "hide" === s)) &&
                      i.show(),
                    (n && "none" === s) || t.effects.saveStyle(i),
                    t.isFunction(e) && e();
                };
              return t.fx.off || !s
                ? h
                  ? this[h](i.duration, l)
                  : this.each(function () {
                      l && l.call(this);
                    })
                : !1 === r
                ? this.each(u).each(e)
                : this.queue(a, u).queue(a, e);
            },
            show:
              ((i = t.fn.show),
              function (t) {
                if (r(t)) return i.apply(this, arguments);
                var e = o.apply(this, arguments);
                return (e.mode = "show"), this.effect.call(this, e);
              }),
            hide:
              ((s = t.fn.hide),
              function (t) {
                if (r(t)) return s.apply(this, arguments);
                var e = o.apply(this, arguments);
                return (e.mode = "hide"), this.effect.call(this, e);
              }),
            toggle:
              ((n = t.fn.toggle),
              function (t) {
                if (r(t) || "boolean" == typeof t)
                  return n.apply(this, arguments);
                var e = o.apply(this, arguments);
                return (e.mode = "toggle"), this.effect.call(this, e);
              }),
            cssUnit: function (e) {
              var i = this.css(e),
                s = [];
              return (
                t.each(["em", "px", "%", "pt"], function (t, e) {
                  i.indexOf(e) > 0 && (s = [parseFloat(i), e]);
                }),
                s
              );
            },
            cssClip: function (t) {
              return t
                ? this.css(
                    "clip",
                    "rect(" +
                      t.top +
                      "px " +
                      t.right +
                      "px " +
                      t.bottom +
                      "px " +
                      t.left +
                      "px)"
                  )
                : a(this.css("clip"), this);
            },
            transfer: function (e, i) {
              var s = t(this),
                n = t(e.to),
                o = "fixed" === n.css("position"),
                r = t("body"),
                a = o ? r.scrollTop() : 0,
                l = o ? r.scrollLeft() : 0,
                h = n.offset(),
                c = {
                  top: h.top - a,
                  left: h.left - l,
                  height: n.innerHeight(),
                  width: n.innerWidth(),
                },
                u = s.offset(),
                d = t("<div class='ui-effects-transfer'></div>")
                  .appendTo("body")
                  .addClass(e.className)
                  .css({
                    top: u.top - a,
                    left: u.left - l,
                    height: s.innerHeight(),
                    width: s.innerWidth(),
                    position: o ? "fixed" : "absolute",
                  })
                  .animate(c, e.duration, e.easing, function () {
                    d.remove(), t.isFunction(i) && i();
                  });
            },
          }),
          (t.fx.step.clip = function (e) {
            e.clipInit ||
              ((e.start = t(e.elem).cssClip()),
              "string" == typeof e.end && (e.end = a(e.end, e.elem)),
              (e.clipInit = !0)),
              t(e.elem).cssClip({
                top: e.pos * (e.end.top - e.start.top) + e.start.top,
                right: e.pos * (e.end.right - e.start.right) + e.start.right,
                bottom:
                  e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom,
                left: e.pos * (e.end.left - e.start.left) + e.start.left,
              });
          });
      })(),
      ($ = {}),
      t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, e) {
        $[e] = function (e) {
          return Math.pow(e, t + 2);
        };
      }),
      t.extend($, {
        Sine: function (t) {
          return 1 - Math.cos((t * Math.PI) / 2);
        },
        Circ: function (t) {
          return 1 - Math.sqrt(1 - t * t);
        },
        Elastic: function (t) {
          return 0 === t || 1 === t
            ? t
            : -Math.pow(2, 8 * (t - 1)) *
                Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
        },
        Back: function (t) {
          return t * t * (3 * t - 2);
        },
        Bounce: function (t) {
          for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; );
          return (
            1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
          );
        },
      }),
      t.each($, function (e, i) {
        (t.easing["easeIn" + e] = i),
          (t.easing["easeOut" + e] = function (t) {
            return 1 - i(1 - t);
          }),
          (t.easing["easeInOut" + e] = function (t) {
            return 0.5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
          });
      });
    var a = t.effects;
    t.effects.define("blind", "hide", function (e, i) {
      var s = {
          up: ["bottom", "top"],
          vertical: ["bottom", "top"],
          down: ["top", "bottom"],
          left: ["right", "left"],
          horizontal: ["right", "left"],
          right: ["left", "right"],
        },
        n = t(this),
        o = e.direction || "up",
        r = n.cssClip(),
        a = { clip: t.extend({}, r) },
        l = t.effects.createPlaceholder(n);
      (a.clip[s[o][0]] = a.clip[s[o][1]]),
        "show" === e.mode &&
          (n.cssClip(a.clip), l && l.css(t.effects.clipToBox(a)), (a.clip = r)),
        l && l.animate(t.effects.clipToBox(a), e.duration, e.easing),
        n.animate(a, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: i,
        });
    }),
      t.effects.define("bounce", function (e, i) {
        var s,
          n,
          o,
          r = t(this),
          a = e.mode,
          l = "hide" === a,
          h = "show" === a,
          c = e.direction || "up",
          u = e.distance,
          d = e.times || 5,
          p = 2 * d + (h || l ? 1 : 0),
          f = e.duration / p,
          g = e.easing,
          m = "up" === c || "down" === c ? "top" : "left",
          v = "up" === c || "left" === c,
          b = 0,
          $ = r.queue().length;
        for (
          t.effects.createPlaceholder(r),
            o = r.css(m),
            u || (u = r["top" === m ? "outerHeight" : "outerWidth"]() / 3),
            h &&
              (((n = { opacity: 1 })[m] = o),
              r
                .css("opacity", 0)
                .css(m, v ? -(2 * u) : 2 * u)
                .animate(n, f, g)),
            l && (u /= Math.pow(2, d - 1)),
            (n = {})[m] = o;
          d > b;
          b++
        )
          ((s = {})[m] = (v ? "-=" : "+=") + u),
            r.animate(s, f, g).animate(n, f, g),
            (u = l ? 2 * u : u / 2);
        l &&
          (((s = { opacity: 0 })[m] = (v ? "-=" : "+=") + u),
          r.animate(s, f, g)),
          r.queue(i),
          t.effects.unshift(r, $, p + 1);
      }),
      t.effects.define("clip", "hide", function (e, i) {
        var s,
          n = {},
          o = t(this),
          r = e.direction || "vertical",
          a = "both" === r,
          l = a || "horizontal" === r,
          h = a || "vertical" === r;
        (s = o.cssClip()),
          (n.clip = {
            top: h ? (s.bottom - s.top) / 2 : s.top,
            right: l ? (s.right - s.left) / 2 : s.right,
            bottom: h ? (s.bottom - s.top) / 2 : s.bottom,
            left: l ? (s.right - s.left) / 2 : s.left,
          }),
          t.effects.createPlaceholder(o),
          "show" === e.mode && (o.cssClip(n.clip), (n.clip = s)),
          o.animate(n, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i,
          });
      }),
      t.effects.define("drop", "hide", function (e, i) {
        var s,
          n = t(this),
          o = e.mode,
          r = e.direction || "left",
          a = "up" === r || "down" === r ? "top" : "left",
          l = "up" === r || "left" === r ? "-=" : "+=",
          h = { opacity: 0 };
        t.effects.createPlaceholder(n),
          (s =
            e.distance ||
            n["top" === a ? "outerHeight" : "outerWidth"](!0) / 2),
          (h[a] = l + s),
          "show" === o &&
            (n.css(h),
            (h[a] = ("+=" === l ? "-=" : "+=") + s),
            (h.opacity = 1)),
          n.animate(h, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i,
          });
      }),
      t.effects.define("explode", "hide", function (e, i) {
        function s() {
          v.push(this),
            v.length === c * u &&
              (d.css({ visibility: "visible" }), t(v).remove(), i());
        }
        var n,
          o,
          r,
          a,
          l,
          h,
          c = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
          u = c,
          d = t(this),
          p = "show" === e.mode,
          f = d.show().css("visibility", "hidden").offset(),
          g = Math.ceil(d.outerWidth() / u),
          m = Math.ceil(d.outerHeight() / c),
          v = [];
        for (n = 0; c > n; n++)
          for (a = f.top + n * m, h = n - (c - 1) / 2, o = 0; u > o; o++)
            (r = f.left + o * g),
              (l = o - (u - 1) / 2),
              d
                .clone()
                .appendTo("body")
                .wrap("<div></div>")
                .css({
                  position: "absolute",
                  visibility: "visible",
                  left: -o * g,
                  top: -n * m,
                })
                .parent()
                .addClass("ui-effects-explode")
                .css({
                  position: "absolute",
                  overflow: "hidden",
                  width: g,
                  height: m,
                  left: r + (p ? l * g : 0),
                  top: a + (p ? h * m : 0),
                  opacity: p ? 0 : 1,
                })
                .animate(
                  {
                    left: r + (p ? 0 : l * g),
                    top: a + (p ? 0 : h * m),
                    opacity: p ? 1 : 0,
                  },
                  e.duration || 500,
                  e.easing,
                  s
                );
      }),
      t.effects.define("fade", "toggle", function (e, i) {
        var s = "show" === e.mode;
        t(this)
          .css("opacity", s ? 0 : 1)
          .animate(
            { opacity: s ? 1 : 0 },
            { queue: !1, duration: e.duration, easing: e.easing, complete: i }
          );
      }),
      t.effects.define("fold", "hide", function (e, i) {
        var s = t(this),
          n = e.mode,
          o = e.size || 15,
          r = /([0-9]+)%/.exec(o),
          a = e.horizFirst ? ["right", "bottom"] : ["bottom", "right"],
          l = e.duration / 2,
          h = t.effects.createPlaceholder(s),
          c = s.cssClip(),
          u = { clip: t.extend({}, c) },
          d = { clip: t.extend({}, c) },
          p = [c[a[0]], c[a[1]]],
          f = s.queue().length;
        r && (o = (parseInt(r[1], 10) / 100) * p["hide" === n ? 0 : 1]),
          (u.clip[a[0]] = o),
          (d.clip[a[0]] = o),
          (d.clip[a[1]] = 0),
          "show" === n &&
            (s.cssClip(d.clip),
            h && h.css(t.effects.clipToBox(d)),
            (d.clip = c)),
          s
            .queue(function (i) {
              h &&
                h
                  .animate(t.effects.clipToBox(u), l, e.easing)
                  .animate(t.effects.clipToBox(d), l, e.easing),
                i();
            })
            .animate(u, l, e.easing)
            .animate(d, l, e.easing)
            .queue(i),
          t.effects.unshift(s, f, 4);
      }),
      t.effects.define("highlight", "show", function (e, i) {
        var s = t(this),
          n = { backgroundColor: s.css("backgroundColor") };
        "hide" === e.mode && (n.opacity = 0),
          t.effects.saveStyle(s),
          s
            .css({
              backgroundImage: "none",
              backgroundColor: e.color || "#ffff99",
            })
            .animate(n, {
              queue: !1,
              duration: e.duration,
              easing: e.easing,
              complete: i,
            });
      }),
      t.effects.define("size", function (e, i) {
        var s,
          n,
          o,
          r = t(this),
          a = ["fontSize"],
          l = [
            "borderTopWidth",
            "borderBottomWidth",
            "paddingTop",
            "paddingBottom",
          ],
          h = [
            "borderLeftWidth",
            "borderRightWidth",
            "paddingLeft",
            "paddingRight",
          ],
          c = e.mode,
          u = "effect" !== c,
          d = e.scale || "both",
          p = e.origin || ["middle", "center"],
          f = r.css("position"),
          g = r.position(),
          m = t.effects.scaledDimensions(r),
          v = e.from || m,
          b = e.to || t.effects.scaledDimensions(r, 0);
        t.effects.createPlaceholder(r),
          "show" === c && ((o = v), (v = b), (b = o)),
          (n = {
            from: { y: v.height / m.height, x: v.width / m.width },
            to: { y: b.height / m.height, x: b.width / m.width },
          }),
          ("box" === d || "both" === d) &&
            (n.from.y !== n.to.y &&
              ((v = t.effects.setTransition(r, l, n.from.y, v)),
              (b = t.effects.setTransition(r, l, n.to.y, b))),
            n.from.x !== n.to.x &&
              ((v = t.effects.setTransition(r, h, n.from.x, v)),
              (b = t.effects.setTransition(r, h, n.to.x, b)))),
          ("content" === d || "both" === d) &&
            n.from.y !== n.to.y &&
            ((v = t.effects.setTransition(r, a, n.from.y, v)),
            (b = t.effects.setTransition(r, a, n.to.y, b))),
          p &&
            ((s = t.effects.getBaseline(p, m)),
            (v.top = (m.outerHeight - v.outerHeight) * s.y + g.top),
            (v.left = (m.outerWidth - v.outerWidth) * s.x + g.left),
            (b.top = (m.outerHeight - b.outerHeight) * s.y + g.top),
            (b.left = (m.outerWidth - b.outerWidth) * s.x + g.left)),
          r.css(v),
          ("content" === d || "both" === d) &&
            ((l = l.concat(["marginTop", "marginBottom"]).concat(a)),
            (h = h.concat(["marginLeft", "marginRight"])),
            r.find("*[width]").each(function () {
              var i = t(this),
                s = t.effects.scaledDimensions(i),
                o = {
                  height: s.height * n.from.y,
                  width: s.width * n.from.x,
                  outerHeight: s.outerHeight * n.from.y,
                  outerWidth: s.outerWidth * n.from.x,
                },
                r = {
                  height: s.height * n.to.y,
                  width: s.width * n.to.x,
                  outerHeight: s.height * n.to.y,
                  outerWidth: s.width * n.to.x,
                };
              n.from.y !== n.to.y &&
                ((o = t.effects.setTransition(i, l, n.from.y, o)),
                (r = t.effects.setTransition(i, l, n.to.y, r))),
                n.from.x !== n.to.x &&
                  ((o = t.effects.setTransition(i, h, n.from.x, o)),
                  (r = t.effects.setTransition(i, h, n.to.x, r))),
                u && t.effects.saveStyle(i),
                i.css(o),
                i.animate(r, e.duration, e.easing, function () {
                  u && t.effects.restoreStyle(i);
                });
            })),
          r.animate(b, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function () {
              var e = r.offset();
              0 === b.opacity && r.css("opacity", v.opacity),
                u ||
                  (r.css("position", "static" === f ? "relative" : f).offset(e),
                  t.effects.saveStyle(r)),
                i();
            },
          });
      }),
      t.effects.define("scale", function (e, i) {
        var s = t(this),
          n = e.mode,
          o =
            parseInt(e.percent, 10) ||
            (0 === parseInt(e.percent, 10) ? 0 : "effect" !== n ? 0 : 100),
          r = t.extend(
            !0,
            {
              from: t.effects.scaledDimensions(s),
              to: t.effects.scaledDimensions(s, o, e.direction || "both"),
              origin: e.origin || ["middle", "center"],
            },
            e
          );
        e.fade && ((r.from.opacity = 1), (r.to.opacity = 0)),
          t.effects.effect.size.call(this, r, i);
      }),
      t.effects.define("puff", "hide", function (e, i) {
        var s = t.extend(!0, {}, e, {
          fade: !0,
          percent: parseInt(e.percent, 10) || 150,
        });
        t.effects.effect.scale.call(this, s, i);
      }),
      t.effects.define("pulsate", "show", function (e, i) {
        var s = t(this),
          n = e.mode,
          o = "show" === n,
          r = 2 * (e.times || 5) + (o || "hide" === n ? 1 : 0),
          a = e.duration / r,
          l = 0,
          h = 1,
          c = s.queue().length;
        for (
          (o || !s.is(":visible")) && (s.css("opacity", 0).show(), (l = 1));
          r > h;
          h++
        )
          s.animate({ opacity: l }, a, e.easing), (l = 1 - l);
        s.animate({ opacity: l }, a, e.easing),
          s.queue(i),
          t.effects.unshift(s, c, r + 1);
      }),
      t.effects.define("shake", function (e, i) {
        var s = 1,
          n = t(this),
          o = e.direction || "left",
          r = e.distance || 20,
          a = e.times || 3,
          l = 2 * a + 1,
          h = Math.round(e.duration / l),
          c = "up" === o || "down" === o ? "top" : "left",
          u = "up" === o || "left" === o,
          d = {},
          p = {},
          f = {},
          g = n.queue().length;
        for (
          t.effects.createPlaceholder(n),
            d[c] = (u ? "-=" : "+=") + r,
            p[c] = (u ? "+=" : "-=") + 2 * r,
            f[c] = (u ? "-=" : "+=") + 2 * r,
            n.animate(d, h, e.easing);
          a > s;
          s++
        )
          n.animate(p, h, e.easing).animate(f, h, e.easing);
        n
          .animate(p, h, e.easing)
          .animate(d, h / 2, e.easing)
          .queue(i),
          t.effects.unshift(n, g, l + 1);
      }),
      t.effects.define("slide", "show", function (e, i) {
        var s,
          n,
          o = t(this),
          r = {
            up: ["bottom", "top"],
            down: ["top", "bottom"],
            left: ["right", "left"],
            right: ["left", "right"],
          },
          a = e.mode,
          l = e.direction || "left",
          h = "up" === l || "down" === l ? "top" : "left",
          c = e.distance || o["top" === h ? "outerHeight" : "outerWidth"](!0),
          u = {};
        t.effects.createPlaceholder(o),
          (s = o.cssClip()),
          (n = o.position()[h]),
          (u[h] = ("up" === l || "left" === l ? -1 : 1) * c + n),
          (u.clip = o.cssClip()),
          (u.clip[r[l][1]] = u.clip[r[l][0]]),
          "show" === a &&
            (o.cssClip(u.clip), o.css(h, u[h]), (u.clip = s), (u[h] = n)),
          o.animate(u, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i,
          });
      }),
      !1 !== t.uiBackCompat &&
        (a = t.effects.define("transfer", function (e, i) {
          t(this).transfer(e, i);
        }));
  });
