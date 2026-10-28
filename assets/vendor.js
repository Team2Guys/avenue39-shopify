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
  });
