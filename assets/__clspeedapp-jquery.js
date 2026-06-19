"undefined" != typeof jQuery ||
  /*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */ (!(function (
    e,
    t
  ) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e.document
          ? t(e, !0)
          : function (e) {
              if (!e.document)
                throw Error("jQuery requires a window with a document");
              return t(e);
            })
      : t(e);
  })("undefined" != typeof window ? window : this, function (e, t) {
    "use strict";
    var n = [],
      r = Object.getPrototypeOf,
      i = n.slice,
      o = n.flat
        ? function (e) {
            return n.flat.call(e);
          }
        : function (e) {
            return n.concat.apply([], e);
          },
      s = n.push,
      a = n.indexOf,
      u = {},
      l = u.toString,
      c = u.hasOwnProperty,
      f = c.toString,
      p = f.call(Object),
      d = {},
      h = function (e) {
        return (
          "function" == typeof e &&
          "number" != typeof e.nodeType &&
          "function" != typeof e.item
        );
      },
      g = function (e) {
        return null != e && e === e.window;
      },
      v = e.document,
      m = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function y(e, t, n) {
      var r,
        i,
        o = (n = n || v).createElement("script");
      if (((o.text = e), t))
        for (r in m)
          (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
            o.setAttribute(r, i);
      n.head.appendChild(o).parentNode.removeChild(o);
    }
    function x(e) {
      return null == e
        ? e + ""
        : "object" == typeof e || "function" == typeof e
        ? u[l.call(e)] || "object"
        : typeof e;
    }
    var b = "3.6.0",
      _ = function (e, t) {
        return new _.fn.init(e, t);
      };
    function w(e) {
      var t = !!e && "length" in e && e.length,
        n = x(e);
      return (
        !h(e) &&
        !g(e) &&
        ("array" === n ||
          0 === t ||
          ("number" == typeof t && 0 < t && t - 1 in e))
      );
    }
    (_.fn = _.prototype =
      {
        jquery: b,
        constructor: _,
        length: 0,
        toArray: function () {
          return i.call(this);
        },
        get: function (e) {
          return null == e
            ? i.call(this)
            : e < 0
            ? this[e + this.length]
            : this[e];
        },
        pushStack: function (e) {
          var t = _.merge(this.constructor(), e);
          return (t.prevObject = this), t;
        },
        each: function (e) {
          return _.each(this, e);
        },
        map: function (e) {
          return this.pushStack(
            _.map(this, function (t, n) {
              return e.call(t, n, t);
            })
          );
        },
        slice: function () {
          return this.pushStack(i.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        even: function () {
          return this.pushStack(
            _.grep(this, function (e, t) {
              return (t + 1) % 2;
            })
          );
        },
        odd: function () {
          return this.pushStack(
            _.grep(this, function (e, t) {
              return t % 2;
            })
          );
        },
        eq: function (e) {
          var t = this.length,
            n = +e + (e < 0 ? t : 0);
          return this.pushStack(0 <= n && n < t ? [this[n]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: s,
        sort: n.sort,
        splice: n.splice,
      }),
      (_.extend = _.fn.extend =
        function () {
          var e,
            t,
            n,
            r,
            i,
            o,
            s = arguments[0] || {},
            a = 1,
            u = arguments.length,
            l = !1;
          for (
            "boolean" == typeof s && ((l = s), (s = arguments[a] || {}), a++),
              "object" == typeof s || h(s) || (s = {}),
              a === u && ((s = this), a--);
            a < u;
            a++
          )
            if (null != (e = arguments[a]))
              for (t in e)
                (r = e[t]),
                  "__proto__" !== t &&
                    s !== r &&
                    (l && r && (_.isPlainObject(r) || (i = Array.isArray(r)))
                      ? ((n = s[t]),
                        (o =
                          i && !Array.isArray(n)
                            ? []
                            : i || _.isPlainObject(n)
                            ? n
                            : {}),
                        (i = !1),
                        (s[t] = _.extend(l, o, r)))
                      : void 0 !== r && (s[t] = r));
          return s;
        }),
      _.extend({
        expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw Error(e);
        },
        noop: function () {},
        isPlainObject: function (e) {
          var t, n;
          return (
            !(!e || "[object Object]" !== l.call(e)) &&
            (!(t = r(e)) ||
              ("function" ==
                typeof (n = c.call(t, "constructor") && t.constructor) &&
                f.call(n) === p))
          );
        },
        isEmptyObject: function (e) {
          var t;
          for (t in e) return !1;
          return !0;
        },
        globalEval: function (e, t, n) {
          y(e, { nonce: t && t.nonce }, n);
        },
        each: function (e, t) {
          var n,
            r = 0;
          if (w(e))
            for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
          else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
          return e;
        },
        makeArray: function (e, t) {
          var n = t || [];
          return (
            null != e &&
              (w(Object(e))
                ? _.merge(n, "string" == typeof e ? [e] : e)
                : s.call(n, e)),
            n
          );
        },
        inArray: function (e, t, n) {
          return null == t ? -1 : a.call(t, e, n);
        },
        merge: function (e, t) {
          for (var n = +t.length, r = 0, i = e.length; r < n; r++)
            e[i++] = t[r];
          return (e.length = i), e;
        },
        grep: function (e, t, n) {
          for (var r = [], i = 0, o = e.length, s = !n; i < o; i++)
            !t(e[i], i) !== s && r.push(e[i]);
          return r;
        },
        map: function (e, t, n) {
          var r,
            i,
            s = 0,
            a = [];
          if (w(e))
            for (r = e.length; s < r; s++)
              null != (i = t(e[s], s, n)) && a.push(i);
          else for (s in e) null != (i = t(e[s], s, n)) && a.push(i);
          return o(a);
        },
        guid: 1,
        support: d,
      }),
      "function" == typeof Symbol &&
        (_.fn[Symbol.iterator] = n[Symbol.iterator]),
      _.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (e, t) {
          u["[object " + t + "]"] = t.toLowerCase();
        }
      );
    var T = (function (e) {
      var t,
        n,
        r,
        i,
        o,
        s,
        a,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v,
        m,
        y,
        x,
        b = "sizzle" + 1 * new Date(),
        _ = e.document,
        w = 0,
        T = 0,
        C = ec(),
        k = ec(),
        S = ec(),
        E = ec(),
        N = function (e, t) {
          return e === t && (f = !0), 0;
        },
        D = {}.hasOwnProperty,
        A = [],
        j = A.pop,
        L = A.push,
        q = A.push,
        H = A.slice,
        P = function (e, t) {
          for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
          return -1;
        },
        O =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        I = "[\\x20\\t\\r\\n\\f]",
        M =
          "(?:\\\\[\\da-fA-F]{1,6}" +
          I +
          "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        W =
          "\\[" +
          I +
          "*(" +
          M +
          ")(?:" +
          I +
          "*([*^$|!~]?=)" +
          I +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          M +
          "))|)" +
          I +
          "*\\]",
        B =
          ":(" +
          M +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          W +
          ")*)|.*)\\)|)",
        R = RegExp(I + "+", "g"),
        F = RegExp("^" + I + "+|((?:^|[^\\\\])(?:\\\\.)*)" + I + "+$", "g"),
        z = RegExp("^" + I + "*," + I + "*"),
        X = RegExp("^" + I + "*([>+~]|" + I + ")" + I + "*"),
        U = RegExp(I + "|>"),
        V = RegExp(B),
        G = RegExp("^" + M + "$"),
        Y = {
          ID: RegExp("^#(" + M + ")"),
          CLASS: RegExp("^\\.(" + M + ")"),
          TAG: RegExp("^(" + M + "|[*])"),
          ATTR: RegExp("^" + W),
          PSEUDO: RegExp("^" + B),
          CHILD: RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              I +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              I +
              "*(?:([+-]|)" +
              I +
              "*(\\d+)|))" +
              I +
              "*\\)|)",
            "i"
          ),
          bool: RegExp("^(?:" + O + ")$", "i"),
          needsContext: RegExp(
            "^" +
              I +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              I +
              "*((?:-\\d)?\\d*)" +
              I +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        Q = /HTML$/i,
        K = /^(?:input|select|textarea|button)$/i,
        J = /^h\d$/i,
        Z = /^[^{]+\{\s*\[native \w/,
        ee = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        et = /[+~]/,
        en = RegExp("\\\\[\\da-fA-F]{1,6}" + I + "?|\\\\([^\\r\\n\\f])", "g"),
        er = function (e, t) {
          var n = "0x" + e.slice(1) - 65536;
          return (
            t ||
            (n < 0
              ? String.fromCharCode(n + 65536)
              : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
          );
        },
        ei = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        eo = function (e, t) {
          return t
            ? "\0" === e
              ? "�"
              : e.slice(0, -1) +
                "\\" +
                e.charCodeAt(e.length - 1).toString(16) +
                " "
            : "\\" + e;
        },
        es = function () {
          p();
        },
        ea = e_(
          function (e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
          },
          { dir: "parentNode", next: "legend" }
        );
      try {
        q.apply((A = H.call(_.childNodes)), _.childNodes),
          A[_.childNodes.length].nodeType;
      } catch (eu) {
        q = {
          apply: A.length
            ? function (e, t) {
                L.apply(e, H.call(t));
              }
            : function (e, t) {
                for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                e.length = n - 1;
              },
        };
      }
      function el(e, t, r, i) {
        var o,
          a,
          l,
          c,
          f,
          h,
          m,
          y = t && t.ownerDocument,
          _ = t ? t.nodeType : 9;
        if (
          ((r = r || []),
          "string" != typeof e || !e || (1 !== _ && 9 !== _ && 11 !== _))
        )
          return r;
        if (!i && (p(t), (t = t || d), g)) {
          if (11 !== _ && (f = ee.exec(e))) {
            if ((o = f[1])) {
              if (9 === _) {
                if (!(l = t.getElementById(o))) return r;
                if (l.id === o) return r.push(l), r;
              } else if (
                y &&
                (l = y.getElementById(o)) &&
                x(t, l) &&
                l.id === o
              )
                return r.push(l), r;
            } else {
              if (f[2]) return q.apply(r, t.getElementsByTagName(e)), r;
              if (
                (o = f[3]) &&
                n.getElementsByClassName &&
                t.getElementsByClassName
              )
                return q.apply(r, t.getElementsByClassName(o)), r;
            }
          }
          if (
            n.qsa &&
            !E[e + " "] &&
            (!v || !v.test(e)) &&
            (1 !== _ || "object" !== t.nodeName.toLowerCase())
          ) {
            if (((m = e), (y = t), 1 === _ && (U.test(e) || X.test(e)))) {
              for (
                ((y = (et.test(e) && e$(t.parentNode)) || t) === t &&
                  n.scope) ||
                  ((c = t.getAttribute("id"))
                    ? (c = c.replace(ei, eo))
                    : t.setAttribute("id", (c = b))),
                  a = (h = s(e)).length;
                a--;

              )
                h[a] = (c ? "#" + c : ":scope") + " " + eb(h[a]);
              m = h.join(",");
            }
            try {
              return q.apply(r, y.querySelectorAll(m)), r;
            } catch (w) {
              E(e, !0);
            } finally {
              c === b && t.removeAttribute("id");
            }
          }
        }
        return u(e.replace(F, "$1"), t, r, i);
      }
      function ec() {
        var e = [];
        return function t(n, i) {
          return (
            e.push(n + " ") > r.cacheLength && delete t[e.shift()],
            (t[n + " "] = i)
          );
        };
      }
      function ef(e) {
        return (e[b] = !0), e;
      }
      function ep(e) {
        var t = d.createElement("fieldset");
        try {
          return !!e(t);
        } catch (n) {
          return !1;
        } finally {
          t.parentNode && t.parentNode.removeChild(t), (t = null);
        }
      }
      function ed(e, t) {
        for (var n = e.split("|"), i = n.length; i--; ) r.attrHandle[n[i]] = t;
      }
      function eh(e, t) {
        var n = t && e,
          r =
            n &&
            1 === e.nodeType &&
            1 === t.nodeType &&
            e.sourceIndex - t.sourceIndex;
        if (r) return r;
        if (n) {
          for (; (n = n.nextSibling); ) if (n === t) return -1;
        }
        return e ? 1 : -1;
      }
      function eg(e) {
        return function (t) {
          return "input" === t.nodeName.toLowerCase() && t.type === e;
        };
      }
      function ev(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e;
        };
      }
      function em(e) {
        return function (t) {
          return "form" in t
            ? t.parentNode && !1 === t.disabled
              ? "label" in t
                ? "label" in t.parentNode
                  ? t.parentNode.disabled === e
                  : t.disabled === e
                : t.isDisabled === e || (!e !== t.isDisabled && ea(t) === e)
              : t.disabled === e
            : "label" in t && t.disabled === e;
        };
      }
      function ey(e) {
        return ef(function (t) {
          return (
            (t = +t),
            ef(function (n, r) {
              for (var i, o = e([], n.length, t), s = o.length; s--; )
                n[(i = o[s])] && (n[i] = !(r[i] = n[i]));
            })
          );
        });
      }
      function e$(e) {
        return e && void 0 !== e.getElementsByTagName && e;
      }
      for (t in ((n = el.support = {}),
      (o = el.isXML =
        function (e) {
          var t = e && e.namespaceURI,
            n = e && (e.ownerDocument || e).documentElement;
          return !Q.test(t || (n && n.nodeName) || "HTML");
        }),
      (p = el.setDocument =
        function (e) {
          var t,
            i,
            s = e ? e.ownerDocument || e : _;
          return (
            s != d &&
              9 === s.nodeType &&
              s.documentElement &&
              ((h = (d = s).documentElement),
              (g = !o(d)),
              _ != d &&
                (i = d.defaultView) &&
                i.top !== i &&
                (i.addEventListener
                  ? i.addEventListener("unload", es, !1)
                  : i.attachEvent && i.attachEvent("onunload", es)),
              (n.scope = ep(function (e) {
                return (
                  h.appendChild(e).appendChild(d.createElement("div")),
                  void 0 !== e.querySelectorAll &&
                    !e.querySelectorAll(":scope fieldset div").length
                );
              })),
              (n.attributes = ep(function (e) {
                return (e.className = "i"), !e.getAttribute("className");
              })),
              (n.getElementsByTagName = ep(function (e) {
                return (
                  e.appendChild(d.createComment("")),
                  !e.getElementsByTagName("*").length
                );
              })),
              (n.getElementsByClassName = Z.test(d.getElementsByClassName)),
              (n.getById = ep(function (e) {
                return (
                  (h.appendChild(e).id = b),
                  !d.getElementsByName || !d.getElementsByName(b).length
                );
              })),
              n.getById
                ? ((r.filter.ID = function (e) {
                    var t = e.replace(en, er);
                    return function (e) {
                      return e.getAttribute("id") === t;
                    };
                  }),
                  (r.find.ID = function (e, t) {
                    if (void 0 !== t.getElementById && g) {
                      var n = t.getElementById(e);
                      return n ? [n] : [];
                    }
                  }))
                : ((r.filter.ID = function (e) {
                    var t = e.replace(en, er);
                    return function (e) {
                      var n =
                        void 0 !== e.getAttributeNode &&
                        e.getAttributeNode("id");
                      return n && n.value === t;
                    };
                  }),
                  (r.find.ID = function (e, t) {
                    if (void 0 !== t.getElementById && g) {
                      var n,
                        r,
                        i,
                        o = t.getElementById(e);
                      if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                          return [o];
                        for (i = t.getElementsByName(e), r = 0; (o = i[r++]); )
                          if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                      }
                      return [];
                    }
                  })),
              (r.find.TAG = n.getElementsByTagName
                ? function (e, t) {
                    return void 0 !== t.getElementsByTagName
                      ? t.getElementsByTagName(e)
                      : n.qsa
                      ? t.querySelectorAll(e)
                      : void 0;
                  }
                : function (e, t) {
                    var n,
                      r = [],
                      i = 0,
                      o = t.getElementsByTagName(e);
                    if ("*" === e) {
                      for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n);
                      return r;
                    }
                    return o;
                  }),
              (r.find.CLASS =
                n.getElementsByClassName &&
                function (e, t) {
                  if (void 0 !== t.getElementsByClassName && g)
                    return t.getElementsByClassName(e);
                }),
              (m = []),
              (v = []),
              (n.qsa = Z.test(d.querySelectorAll)) &&
                (ep(function (e) {
                  var t;
                  (h.appendChild(e).innerHTML =
                    "<a id='" +
                    b +
                    "'></a><select id='" +
                    b +
                    "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                    e.querySelectorAll("[msallowcapture^='']").length &&
                      v.push("[*^$]=" + I + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length ||
                      v.push("\\[" + I + "*(?:value|" + O + ")"),
                    e.querySelectorAll("[id~=" + b + "-]").length ||
                      v.push("~="),
                    (t = d.createElement("input")).setAttribute("name", ""),
                    e.appendChild(t),
                    e.querySelectorAll("[name='']").length ||
                      v.push(
                        "\\[" + I + "*name" + I + "*=" + I + "*(?:''|\"\")"
                      ),
                    e.querySelectorAll(":checked").length || v.push(":checked"),
                    e.querySelectorAll("a#" + b + "+*").length ||
                      v.push(".#.+[+~]"),
                    e.querySelectorAll("\\\f"),
                    v.push("[\\r\\n\\f]");
                }),
                ep(function (e) {
                  e.innerHTML =
                    "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                  var t = d.createElement("input");
                  t.setAttribute("type", "hidden"),
                    e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length &&
                      v.push("name" + I + "*[*^$|!~]?="),
                    2 !== e.querySelectorAll(":enabled").length &&
                      v.push(":enabled", ":disabled"),
                    (h.appendChild(e).disabled = !0),
                    2 !== e.querySelectorAll(":disabled").length &&
                      v.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    v.push(",.*:");
                })),
              (n.matchesSelector = Z.test(
                (y =
                  h.matches ||
                  h.webkitMatchesSelector ||
                  h.mozMatchesSelector ||
                  h.oMatchesSelector ||
                  h.msMatchesSelector)
              )) &&
                ep(function (e) {
                  (n.disconnectedMatch = y.call(e, "*")),
                    y.call(e, "[s!='']:x"),
                    m.push("!=", B);
                }),
              (v = v.length && RegExp(v.join("|"))),
              (m = m.length && RegExp(m.join("|"))),
              (x =
                (t = Z.test(h.compareDocumentPosition)) || Z.test(h.contains)
                  ? function (e, t) {
                      var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                      return (
                        e === r ||
                        !(
                          !r ||
                          1 !== r.nodeType ||
                          !(n.contains
                            ? n.contains(r)
                            : e.compareDocumentPosition &&
                              16 & e.compareDocumentPosition(r))
                        )
                      );
                    }
                  : function (e, t) {
                      if (t) {
                        for (; (t = t.parentNode); ) if (t === e) return !0;
                      }
                      return !1;
                    }),
              (N = t
                ? function (e, t) {
                    if (e === t) return (f = !0), 0;
                    var r =
                      !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return (
                      r ||
                      (1 &
                        (r =
                          (e.ownerDocument || e) == (t.ownerDocument || t)
                            ? e.compareDocumentPosition(t)
                            : 1) ||
                      (!n.sortDetached && t.compareDocumentPosition(e) === r)
                        ? e == d || (e.ownerDocument == _ && x(_, e))
                          ? -1
                          : t == d || (t.ownerDocument == _ && x(_, t))
                          ? 1
                          : c
                          ? P(c, e) - P(c, t)
                          : 0
                        : 4 & r
                        ? -1
                        : 1)
                    );
                  }
                : function (e, t) {
                    if (e === t) return (f = !0), 0;
                    var n,
                      r = 0,
                      i = e.parentNode,
                      o = t.parentNode,
                      s = [e],
                      a = [t];
                    if (!i || !o)
                      return e == d
                        ? -1
                        : t == d
                        ? 1
                        : i
                        ? -1
                        : o
                        ? 1
                        : c
                        ? P(c, e) - P(c, t)
                        : 0;
                    if (i === o) return eh(e, t);
                    for (n = e; (n = n.parentNode); ) s.unshift(n);
                    for (n = t; (n = n.parentNode); ) a.unshift(n);
                    for (; s[r] === a[r]; ) r++;
                    return r
                      ? eh(s[r], a[r])
                      : s[r] == _
                      ? -1
                      : a[r] == _
                      ? 1
                      : 0;
                  })),
            d
          );
        }),
      (el.matches = function (e, t) {
        return el(e, null, null, t);
      }),
      (el.matchesSelector = function (e, t) {
        if (
          (p(e),
          n.matchesSelector &&
            g &&
            !E[t + " "] &&
            (!m || !m.test(t)) &&
            (!v || !v.test(t)))
        )
          try {
            var r = y.call(e, t);
            if (
              r ||
              n.disconnectedMatch ||
              (e.document && 11 !== e.document.nodeType)
            )
              return r;
          } catch (i) {
            E(t, !0);
          }
        return 0 < el(t, d, null, [e]).length;
      }),
      (el.contains = function (e, t) {
        return (e.ownerDocument || e) != d && p(e), x(e, t);
      }),
      (el.attr = function (e, t) {
        (e.ownerDocument || e) != d && p(e);
        var i = r.attrHandle[t.toLowerCase()],
          o = i && D.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
        return void 0 !== o
          ? o
          : n.attributes || !g
          ? e.getAttribute(t)
          : (o = e.getAttributeNode(t)) && o.specified
          ? o.value
          : null;
      }),
      (el.escape = function (e) {
        return (e + "").replace(ei, eo);
      }),
      (el.error = function (e) {
        throw Error("Syntax error, unrecognized expression: " + e);
      }),
      (el.uniqueSort = function (e) {
        var t,
          r = [],
          i = 0,
          o = 0;
        if (
          ((f = !n.detectDuplicates),
          (c = !n.sortStable && e.slice(0)),
          e.sort(N),
          f)
        ) {
          for (; (t = e[o++]); ) t === e[o] && (i = r.push(o));
          for (; i--; ) e.splice(r[i], 1);
        }
        return (c = null), e;
      }),
      (i = el.getText =
        function (e) {
          var t,
            n = "",
            r = 0,
            o = e.nodeType;
          if (o) {
            if (1 === o || 9 === o || 11 === o) {
              if ("string" == typeof e.textContent) return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling) n += i(e);
            } else if (3 === o || 4 === o) return e.nodeValue;
          } else for (; (t = e[r++]); ) n += i(t);
          return n;
        }),
      ((r = el.selectors =
        {
          cacheLength: 50,
          createPseudo: ef,
          match: Y,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (e) {
              return (
                (e[1] = e[1].replace(en, er)),
                (e[3] = (e[3] || e[4] || e[5] || "").replace(en, er)),
                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
              );
            },
            CHILD: function (e) {
              return (
                (e[1] = e[1].toLowerCase()),
                "nth" === e[1].slice(0, 3)
                  ? (e[3] || el.error(e[0]),
                    (e[4] = +(e[4]
                      ? e[5] + (e[6] || 1)
                      : 2 * ("even" === e[3] || "odd" === e[3]))),
                    (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                  : e[3] && el.error(e[0]),
                e
              );
            },
            PSEUDO: function (e) {
              var t,
                n = !e[6] && e[2];
              return Y.CHILD.test(e[0])
                ? null
                : (e[3]
                    ? (e[2] = e[4] || e[5] || "")
                    : n &&
                      V.test(n) &&
                      (t = s(n, !0)) &&
                      (t = n.indexOf(")", n.length - t) - n.length) &&
                      ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                  e.slice(0, 3));
            },
          },
          filter: {
            TAG: function (e) {
              var t = e.replace(en, er).toLowerCase();
              return "*" === e
                ? function () {
                    return !0;
                  }
                : function (e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t;
                  };
            },
            CLASS: function (e) {
              var t = C[e + " "];
              return (
                t ||
                ((t = RegExp("(^|" + I + ")" + e + "(" + I + "|$)")),
                C(e, function (e) {
                  return t.test(
                    ("string" == typeof e.className && e.className) ||
                      (void 0 !== e.getAttribute && e.getAttribute("class")) ||
                      ""
                  );
                }))
              );
            },
            ATTR: function (e, t, n) {
              return function (r) {
                var i = el.attr(r, e);
                return null == i
                  ? "!=" === t
                  : !t ||
                      ((i += ""),
                      "=" === t
                        ? i === n
                        : "!=" === t
                        ? i !== n
                        : "^=" === t
                        ? n && 0 === i.indexOf(n)
                        : "*=" === t
                        ? n && -1 < i.indexOf(n)
                        : "$=" === t
                        ? n && i.slice(-n.length) === n
                        : "~=" === t
                        ? -1 < (" " + i.replace(R, " ") + " ").indexOf(n)
                        : "|=" === t &&
                          (i === n || i.slice(0, n.length + 1) === n + "-"));
              };
            },
            CHILD: function (e, t, n, r, i) {
              var o = "nth" !== e.slice(0, 3),
                s = "last" !== e.slice(-4),
                a = "of-type" === t;
              return 1 === r && 0 === i
                ? function (e) {
                    return !!e.parentNode;
                  }
                : function (t, n, u) {
                    var l,
                      c,
                      f,
                      p,
                      d,
                      h,
                      g = o !== s ? "nextSibling" : "previousSibling",
                      v = t.parentNode,
                      m = a && t.nodeName.toLowerCase(),
                      y = !u && !a,
                      x = !1;
                    if (v) {
                      if (o) {
                        for (; g; ) {
                          for (p = t; (p = p[g]); )
                            if (
                              a
                                ? p.nodeName.toLowerCase() === m
                                : 1 === p.nodeType
                            )
                              return !1;
                          h = g = "only" === e && !h && "nextSibling";
                        }
                        return !0;
                      }
                      if (((h = [s ? v.firstChild : v.lastChild]), s && y)) {
                        for (
                          x =
                            (d =
                              (l =
                                (c =
                                  (f = (p = v)[b] || (p[b] = {}))[p.uniqueID] ||
                                  (f[p.uniqueID] = {}))[e] || [])[0] === w &&
                              l[1]) && l[2],
                            p = d && v.childNodes[d];
                          (p = (++d && p && p[g]) || (x = d = 0) || h.pop());

                        )
                          if (1 === p.nodeType && ++x && p === t) {
                            c[e] = [w, d, x];
                            break;
                          }
                      } else if (
                        (y &&
                          (x = d =
                            (l =
                              (c =
                                (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] ||
                                (f[p.uniqueID] = {}))[e] || [])[0] === w &&
                            l[1]),
                        !1 === x)
                      )
                        for (
                          ;
                          (p = (++d && p && p[g]) || (x = d = 0) || h.pop()) &&
                          (!(
                            (a
                              ? p.nodeName.toLowerCase() === m
                              : 1 === p.nodeType) && ++x
                          ) ||
                            (y &&
                              ((c =
                                (f = p[b] || (p[b] = {}))[p.uniqueID] ||
                                (f[p.uniqueID] = {}))[e] = [w, x]),
                            p !== t));

                        );
                      return (x -= i) === r || (x % r == 0 && 0 <= x / r);
                    }
                  };
            },
            PSEUDO: function (e, t) {
              var n,
                i =
                  r.pseudos[e] ||
                  r.setFilters[e.toLowerCase()] ||
                  el.error("unsupported pseudo: " + e);
              return i[b]
                ? i(t)
                : 1 < i.length
                ? ((n = [e, e, "", t]),
                  r.setFilters.hasOwnProperty(e.toLowerCase())
                    ? ef(function (e, n) {
                        for (var r, o = i(e, t), s = o.length; s--; )
                          e[(r = P(e, o[s]))] = !(n[r] = o[s]);
                      })
                    : function (e) {
                        return i(e, 0, n);
                      })
                : i;
            },
          },
          pseudos: {
            not: ef(function (e) {
              var t = [],
                n = [],
                r = a(e.replace(F, "$1"));
              return r[b]
                ? ef(function (e, t, n, i) {
                    for (var o, s = r(e, null, i, []), a = e.length; a--; )
                      (o = s[a]) && (e[a] = !(t[a] = o));
                  })
                : function (e, i, o) {
                    return (
                      (t[0] = e), r(t, null, o, n), (t[0] = null), !n.pop()
                    );
                  };
            }),
            has: ef(function (e) {
              return function (t) {
                return 0 < el(e, t).length;
              };
            }),
            contains: ef(function (e) {
              return (
                (e = e.replace(en, er)),
                function (t) {
                  return -1 < (t.textContent || i(t)).indexOf(e);
                }
              );
            }),
            lang: ef(function (e) {
              return (
                G.test(e || "") || el.error("unsupported lang: " + e),
                (e = e.replace(en, er).toLowerCase()),
                function (t) {
                  var n;
                  do
                    if (
                      (n = g
                        ? t.lang
                        : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                    )
                      return (
                        (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                      );
                  while ((t = t.parentNode) && 1 === t.nodeType);
                  return !1;
                }
              );
            }),
            target: function (t) {
              var n = e.location && e.location.hash;
              return n && n.slice(1) === t.id;
            },
            root: function (e) {
              return e === h;
            },
            focus: function (e) {
              return (
                e === d.activeElement &&
                (!d.hasFocus || d.hasFocus()) &&
                !!(e.type || e.href || ~e.tabIndex)
              );
            },
            enabled: em(!1),
            disabled: em(!0),
            checked: function (e) {
              var t = e.nodeName.toLowerCase();
              return (
                ("input" === t && !!e.checked) ||
                ("option" === t && !!e.selected)
              );
            },
            selected: function (e) {
              return (
                e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
              );
            },
            empty: function (e) {
              for (e = e.firstChild; e; e = e.nextSibling)
                if (e.nodeType < 6) return !1;
              return !0;
            },
            parent: function (e) {
              return !r.pseudos.empty(e);
            },
            header: function (e) {
              return J.test(e.nodeName);
            },
            input: function (e) {
              return K.test(e.nodeName);
            },
            button: function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t && "button" === e.type) || "button" === t;
            },
            text: function (e) {
              var t;
              return (
                "input" === e.nodeName.toLowerCase() &&
                "text" === e.type &&
                (null == (t = e.getAttribute("type")) ||
                  "text" === t.toLowerCase())
              );
            },
            first: ey(function () {
              return [0];
            }),
            last: ey(function (e, t) {
              return [t - 1];
            }),
            eq: ey(function (e, t, n) {
              return [n < 0 ? n + t : n];
            }),
            even: ey(function (e, t) {
              for (var n = 0; n < t; n += 2) e.push(n);
              return e;
            }),
            odd: ey(function (e, t) {
              for (var n = 1; n < t; n += 2) e.push(n);
              return e;
            }),
            lt: ey(function (e, t, n) {
              for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; ) e.push(r);
              return e;
            }),
            gt: ey(function (e, t, n) {
              for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
              return e;
            }),
          },
        }).pseudos.nth = r.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        r.pseudos[t] = eg(t);
      for (t in { submit: !0, reset: !0 }) r.pseudos[t] = ev(t);
      function ex() {}
      function eb(e) {
        for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
        return r;
      }
      function e_(e, t, n) {
        var r = t.dir,
          i = t.next,
          o = i || r,
          s = n && "parentNode" === o,
          a = T++;
        return t.first
          ? function (t, n, i) {
              for (; (t = t[r]); ) if (1 === t.nodeType || s) return e(t, n, i);
              return !1;
            }
          : function (t, n, u) {
              var l,
                c,
                f,
                p = [w, a];
              if (u) {
                for (; (t = t[r]); )
                  if ((1 === t.nodeType || s) && e(t, n, u)) return !0;
              } else
                for (; (t = t[r]); )
                  if (1 === t.nodeType || s) {
                    if (
                      ((c =
                        (f = t[b] || (t[b] = {}))[t.uniqueID] ||
                        (f[t.uniqueID] = {})),
                      i && i === t.nodeName.toLowerCase())
                    )
                      t = t[r] || t;
                    else {
                      if ((l = c[o]) && l[0] === w && l[1] === a)
                        return (p[2] = l[2]);
                      if (((c[o] = p)[2] = e(t, n, u))) return !0;
                    }
                  }
              return !1;
            };
      }
      function ew(e) {
        return 1 < e.length
          ? function (t, n, r) {
              for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
              return !0;
            }
          : e[0];
      }
      function eT(e, t, n, r, i) {
        for (var o, s = [], a = 0, u = e.length, l = null != t; a < u; a++)
          (o = e[a]) && ((n && !n(o, r, i)) || (s.push(o), l && t.push(a)));
        return s;
      }
      function eC(e, t, n, r, i, o) {
        return (
          r && !r[b] && (r = eC(r)),
          i && !i[b] && (i = eC(i, o)),
          ef(function (o, s, a, u) {
            var l,
              c,
              f,
              p = [],
              d = [],
              h = s.length,
              g =
                o ||
                (function (e, t, n) {
                  for (var r = 0, i = t.length; r < i; r++) el(e, t[r], n);
                  return n;
                })(t || "*", a.nodeType ? [a] : a, []),
              v = e && (o || !t) ? eT(g, p, e, a, u) : g,
              m = n ? (i || (o ? e : h || r) ? [] : s) : v;
            if ((n && n(v, m, a, u), r))
              for (l = eT(m, d), r(l, [], a, u), c = l.length; c--; )
                (f = l[c]) && (m[d[c]] = !(v[d[c]] = f));
            if (o) {
              if (i || e) {
                if (i) {
                  for (l = [], c = m.length; c--; )
                    (f = m[c]) && l.push((v[c] = f));
                  i(null, (m = []), l, u);
                }
                for (c = m.length; c--; )
                  (f = m[c]) &&
                    -1 < (l = i ? P(o, f) : p[c]) &&
                    (o[l] = !(s[l] = f));
              }
            } else (m = eT(m === s ? m.splice(h, m.length) : m)), i ? i(null, s, m, u) : q.apply(s, m);
          })
        );
      }
      function ek(e) {
        for (
          var t,
            n,
            i,
            o = e.length,
            s = r.relative[e[0].type],
            a = s || r.relative[" "],
            u = s ? 1 : 0,
            c = e_(
              function (e) {
                return e === t;
              },
              a,
              !0
            ),
            f = e_(
              function (e) {
                return -1 < P(t, e);
              },
              a,
              !0
            ),
            p = [
              function (e, n, r) {
                var i =
                  (!s && (r || n !== l)) ||
                  ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
                return (t = null), i;
              },
            ];
          u < o;
          u++
        )
          if ((n = r.relative[e[u].type])) p = [e_(ew(p), n)];
          else {
            if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
              for (i = ++u; i < o && !r.relative[e[i].type]; i++);
              return eC(
                1 < u && ew(p),
                1 < u &&
                  eb(
                    e
                      .slice(0, u - 1)
                      .concat({ value: " " === e[u - 2].type ? "*" : "" })
                  ).replace(F, "$1"),
                n,
                u < i && ek(e.slice(u, i)),
                i < o && ek((e = e.slice(i))),
                i < o && eb(e)
              );
            }
            p.push(n);
          }
        return ew(p);
      }
      return (
        (ex.prototype = r.filters = r.pseudos),
        (r.setFilters = new ex()),
        (s = el.tokenize =
          function (e, t) {
            var n,
              i,
              o,
              s,
              a,
              u,
              l,
              c = k[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (a = e, u = [], l = r.preFilter; a; ) {
              for (s in ((!n || (i = z.exec(a))) &&
                (i && (a = a.slice(i[0].length) || a), u.push((o = []))),
              (n = !1),
              (i = X.exec(a)) &&
                ((n = i.shift()),
                o.push({ value: n, type: i[0].replace(F, " ") }),
                (a = a.slice(n.length))),
              r.filter))
                (i = Y[s].exec(a)) &&
                  (!l[s] || (i = l[s](i))) &&
                  ((n = i.shift()),
                  o.push({ value: n, type: s, matches: i }),
                  (a = a.slice(n.length)));
              if (!n) break;
            }
            return t ? a.length : a ? el.error(e) : k(e, u).slice(0);
          }),
        (a = el.compile =
          function (e, t) {
            var n,
              i,
              o,
              a,
              u,
              c,
              f = [],
              h = [],
              v = S[e + " "];
            if (!v) {
              for (t || (t = s(e)), n = t.length; n--; )
                (v = ek(t[n]))[b] ? f.push(v) : h.push(v);
              (v = S(
                e,
                ((i = h),
                (a = 0 < (o = f).length),
                (u = 0 < i.length),
                (c = function (e, t, n, s, c) {
                  var f,
                    h,
                    v,
                    m = 0,
                    y = "0",
                    x = e && [],
                    b = [],
                    _ = l,
                    T = e || (u && r.find.TAG("*", c)),
                    C = (w += null == _ ? 1 : Math.random() || 0.1),
                    k = T.length;
                  for (
                    c && (l = t == d || t || c);
                    y !== k && null != (f = T[y]);
                    y++
                  ) {
                    if (u && f) {
                      for (
                        h = 0, t || f.ownerDocument == d || (p(f), (n = !g));
                        (v = i[h++]);

                      )
                        if (v(f, t || d, n)) {
                          s.push(f);
                          break;
                        }
                      c && (w = C);
                    }
                    a && ((f = !v && f) && m--, e && x.push(f));
                  }
                  if (((m += y), a && y !== m)) {
                    for (h = 0; (v = o[h++]); ) v(x, b, t, n);
                    if (e) {
                      if (0 < m)
                        for (; y--; ) x[y] || b[y] || (b[y] = j.call(s));
                      b = eT(b);
                    }
                    q.apply(s, b),
                      c &&
                        !e &&
                        0 < b.length &&
                        1 < m + o.length &&
                        el.uniqueSort(s);
                  }
                  return c && ((w = C), (l = _)), x;
                }),
                a ? ef(c) : c)
              )).selector = e;
            }
            return v;
          }),
        (u = el.select =
          function (e, t, n, i) {
            var o,
              u,
              l,
              c,
              f,
              p = "function" == typeof e && e,
              d = !i && s((e = p.selector || e));
            if (((n = n || []), 1 === d.length)) {
              if (
                2 < (u = d[0] = d[0].slice(0)).length &&
                "ID" === (l = u[0]).type &&
                9 === t.nodeType &&
                g &&
                r.relative[u[1].type]
              ) {
                if (
                  !(t = (r.find.ID(l.matches[0].replace(en, er), t) || [])[0])
                )
                  return n;
                p && (t = t.parentNode), (e = e.slice(u.shift().value.length));
              }
              for (
                o = Y.needsContext.test(e) ? 0 : u.length;
                o-- && ((l = u[o]), !r.relative[(c = l.type)]);

              )
                if (
                  (f = r.find[c]) &&
                  (i = f(
                    l.matches[0].replace(en, er),
                    (et.test(u[0].type) && e$(t.parentNode)) || t
                  ))
                ) {
                  if ((u.splice(o, 1), !(e = i.length && eb(u))))
                    return q.apply(n, i), n;
                  break;
                }
            }
            return (
              (p || a(e, d))(
                i,
                t,
                !g,
                n,
                !t || (et.test(e) && e$(t.parentNode)) || t
              ),
              n
            );
          }),
        (n.sortStable = b.split("").sort(N).join("") === b),
        (n.detectDuplicates = !!f),
        p(),
        (n.sortDetached = ep(function (e) {
          return 1 & e.compareDocumentPosition(d.createElement("fieldset"));
        })),
        ep(function (e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            "#" === e.firstChild.getAttribute("href")
          );
        }) ||
          ed("type|href|height|width", function (e, t, n) {
            if (!n)
              return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
          }),
        (n.attributes &&
          ep(function (e) {
            return (
              (e.innerHTML = "<input/>"),
              e.firstChild.setAttribute("value", ""),
              "" === e.firstChild.getAttribute("value")
            );
          })) ||
          ed("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
              return e.defaultValue;
          }),
        ep(function (e) {
          return null == e.getAttribute("disabled");
        }) ||
          ed(O, function (e, t, n) {
            var r;
            if (!n)
              return !0 === e[t]
                ? t.toLowerCase()
                : (r = e.getAttributeNode(t)) && r.specified
                ? r.value
                : null;
          }),
        el
      );
    })(e);
    (_.find = T),
      (_.expr = T.selectors),
      (_.expr[":"] = _.expr.pseudos),
      (_.uniqueSort = _.unique = T.uniqueSort),
      (_.text = T.getText),
      (_.isXMLDoc = T.isXML),
      (_.contains = T.contains),
      (_.escapeSelector = T.escape);
    var C = function (e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
          if (1 === e.nodeType) {
            if (i && _(e).is(n)) break;
            r.push(e);
          }
        return r;
      },
      k = function (e, t) {
        for (var n = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && n.push(e);
        return n;
      },
      S = _.expr.match.needsContext;
    function E(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }
    var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function D(e, t, n) {
      return h(t)
        ? _.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n;
          })
        : t.nodeType
        ? _.grep(e, function (e) {
            return (e === t) !== n;
          })
        : "string" != typeof t
        ? _.grep(e, function (e) {
            return -1 < a.call(t, e) !== n;
          })
        : _.filter(t, e, n);
    }
    (_.filter = function (e, t, n) {
      var r = t[0];
      return (
        n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType
          ? _.find.matchesSelector(r, e)
            ? [r]
            : []
          : _.find.matches(
              e,
              _.grep(t, function (e) {
                return 1 === e.nodeType;
              })
            )
      );
    }),
      _.fn.extend({
        find: function (e) {
          var t,
            n,
            r = this.length,
            i = this;
          if ("string" != typeof e)
            return this.pushStack(
              _(e).filter(function () {
                for (t = 0; t < r; t++) if (_.contains(i[t], this)) return !0;
              })
            );
          for (n = this.pushStack([]), t = 0; t < r; t++) _.find(e, i[t], n);
          return 1 < r ? _.uniqueSort(n) : n;
        },
        filter: function (e) {
          return this.pushStack(D(this, e || [], !1));
        },
        not: function (e) {
          return this.pushStack(D(this, e || [], !0));
        },
        is: function (e) {
          return !!D(
            this,
            "string" == typeof e && S.test(e) ? _(e) : e || [],
            !1
          ).length;
        },
      });
    var A,
      j = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    ((_.fn.init = function (e, t, n) {
      var r, i;
      if (!e) return this;
      if (((n = n || A), "string" == typeof e)) {
        if (
          !(r =
            "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
              ? [null, e, null]
              : j.exec(e)) ||
          (!r[1] && t)
        )
          return !t || t.jquery
            ? (t || n).find(e)
            : this.constructor(t).find(e);
        if (r[1]) {
          if (
            ((t = t instanceof _ ? t[0] : t),
            _.merge(
              this,
              _.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : v, !0)
            ),
            N.test(r[1]) && _.isPlainObject(t))
          )
            for (r in t) h(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
          return this;
        }
        return (
          (i = v.getElementById(r[2])) && ((this[0] = i), (this.length = 1)),
          this
        );
      }
      return e.nodeType
        ? ((this[0] = e), (this.length = 1), this)
        : h(e)
        ? void 0 !== n.ready
          ? n.ready(e)
          : e(_)
        : _.makeArray(e, this);
    }).prototype = _.fn),
      (A = _(v));
    var L = /^(?:parents|prev(?:Until|All))/,
      q = { children: !0, contents: !0, next: !0, prev: !0 };
    function H(e, t) {
      for (; (e = e[t]) && 1 !== e.nodeType; );
      return e;
    }
    _.fn.extend({
      has: function (e) {
        var t = _(e, this),
          n = t.length;
        return this.filter(function () {
          for (var e = 0; e < n; e++) if (_.contains(this, t[e])) return !0;
        });
      },
      closest: function (e, t) {
        var n,
          r = 0,
          i = this.length,
          o = [],
          s = "string" != typeof e && _(e);
        if (!S.test(e)) {
          for (; r < i; r++)
            for (n = this[r]; n && n !== t; n = n.parentNode)
              if (
                n.nodeType < 11 &&
                (s
                  ? -1 < s.index(n)
                  : 1 === n.nodeType && _.find.matchesSelector(n, e))
              ) {
                o.push(n);
                break;
              }
        }
        return this.pushStack(1 < o.length ? _.uniqueSort(o) : o);
      },
      index: function (e) {
        return e
          ? "string" == typeof e
            ? a.call(_(e), this[0])
            : a.call(this, e.jquery ? e[0] : e)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (e, t) {
        return this.pushStack(_.uniqueSort(_.merge(this.get(), _(e, t))));
      },
      addBack: function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      },
    }),
      _.each(
        {
          parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
          },
          parents: function (e) {
            return C(e, "parentNode");
          },
          parentsUntil: function (e, t, n) {
            return C(e, "parentNode", n);
          },
          next: function (e) {
            return H(e, "nextSibling");
          },
          prev: function (e) {
            return H(e, "previousSibling");
          },
          nextAll: function (e) {
            return C(e, "nextSibling");
          },
          prevAll: function (e) {
            return C(e, "previousSibling");
          },
          nextUntil: function (e, t, n) {
            return C(e, "nextSibling", n);
          },
          prevUntil: function (e, t, n) {
            return C(e, "previousSibling", n);
          },
          siblings: function (e) {
            return k((e.parentNode || {}).firstChild, e);
          },
          children: function (e) {
            return k(e.firstChild);
          },
          contents: function (e) {
            return null != e.contentDocument && r(e.contentDocument)
              ? e.contentDocument
              : (E(e, "template") && (e = e.content || e),
                _.merge([], e.childNodes));
          },
        },
        function (e, t) {
          _.fn[e] = function (n, r) {
            var i = _.map(this, t, n);
            return (
              "Until" !== e.slice(-5) && (r = n),
              r && "string" == typeof r && (i = _.filter(r, i)),
              1 < this.length &&
                (q[e] || _.uniqueSort(i), L.test(e) && i.reverse()),
              this.pushStack(i)
            );
          };
        }
      );
    var P = /[^\x20\t\r\n\f]+/g;
    function O(e) {
      return e;
    }
    function I(e) {
      throw e;
    }
    function M(e, t, n, r) {
      var i;
      try {
        e && h((i = e.promise))
          ? i.call(e).done(t).fail(n)
          : e && h((i = e.then))
          ? i.call(e, t, n)
          : t.apply(void 0, [e].slice(r));
      } catch (o) {
        n.apply(void 0, [o]);
      }
    }
    (_.Callbacks = function (e) {
      e =
        "string" == typeof e
          ? ((t = e),
            (n = {}),
            _.each(t.match(P) || [], function (e, t) {
              n[t] = !0;
            }),
            n)
          : _.extend({}, e);
      var t,
        n,
        r,
        i,
        o,
        s,
        a = [],
        u = [],
        l = -1,
        c = function () {
          for (s = s || e.once, o = r = !0; u.length; l = -1)
            for (i = u.shift(); ++l < a.length; )
              !1 === a[l].apply(i[0], i[1]) &&
                e.stopOnFalse &&
                ((l = a.length), (i = !1));
          e.memory || (i = !1), (r = !1), s && (a = i ? [] : "");
        },
        f = {
          add: function () {
            return (
              a &&
                (i && !r && ((l = a.length - 1), u.push(i)),
                (function t(n) {
                  _.each(n, function (n, r) {
                    h(r)
                      ? (e.unique && f.has(r)) || a.push(r)
                      : r && r.length && "string" !== x(r) && t(r);
                  });
                })(arguments),
                i && !r && c()),
              this
            );
          },
          remove: function () {
            return (
              _.each(arguments, function (e, t) {
                for (var n; -1 < (n = _.inArray(t, a, n)); )
                  a.splice(n, 1), n <= l && l--;
              }),
              this
            );
          },
          has: function (e) {
            return e ? -1 < _.inArray(e, a) : 0 < a.length;
          },
          empty: function () {
            return a && (a = []), this;
          },
          disable: function () {
            return (s = u = []), (a = i = ""), this;
          },
          disabled: function () {
            return !a;
          },
          lock: function () {
            return (s = u = []), i || r || (a = i = ""), this;
          },
          locked: function () {
            return !!s;
          },
          fireWith: function (e, t) {
            return (
              s ||
                ((t = [e, (t = t || []).slice ? t.slice() : t]),
                u.push(t),
                r || c()),
              this
            );
          },
          fire: function () {
            return f.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!o;
          },
        };
      return f;
    }),
      _.extend({
        Deferred: function (t) {
          var n = [
              [
                "notify",
                "progress",
                _.Callbacks("memory"),
                _.Callbacks("memory"),
                2,
              ],
              [
                "resolve",
                "done",
                _.Callbacks("once memory"),
                _.Callbacks("once memory"),
                0,
                "resolved",
              ],
              [
                "reject",
                "fail",
                _.Callbacks("once memory"),
                _.Callbacks("once memory"),
                1,
                "rejected",
              ],
            ],
            r = "pending",
            i = {
              state: function () {
                return r;
              },
              always: function () {
                return o.done(arguments).fail(arguments), this;
              },
              catch: function (e) {
                return i.then(null, e);
              },
              pipe: function () {
                var e = arguments;
                return _.Deferred(function (t) {
                  _.each(n, function (n, r) {
                    var i = h(e[r[4]]) && e[r[4]];
                    o[r[1]](function () {
                      var e = i && i.apply(this, arguments);
                      e && h(e.promise)
                        ? e
                            .promise()
                            .progress(t.notify)
                            .done(t.resolve)
                            .fail(t.reject)
                        : t[r[0] + "With"](this, i ? [e] : arguments);
                    });
                  }),
                    (e = null);
                }).promise();
              },
              then: function (t, r, i) {
                var o = 0;
                function s(t, n, r, i) {
                  return function () {
                    var a = this,
                      u = arguments,
                      l = function () {
                        var e, l;
                        if (!(t < o)) {
                          if ((e = r.apply(a, u)) === n.promise())
                            throw TypeError("Thenable self-resolution");
                          h(
                            (l =
                              e &&
                              ("object" == typeof e ||
                                "function" == typeof e) &&
                              e.then)
                          )
                            ? i
                              ? l.call(e, s(o, n, O, i), s(o, n, I, i))
                              : (o++,
                                l.call(
                                  e,
                                  s(o, n, O, i),
                                  s(o, n, I, i),
                                  s(o, n, O, n.notifyWith)
                                ))
                            : (r !== O && ((a = void 0), (u = [e])),
                              (i || n.resolveWith)(a, u));
                        }
                      },
                      c = i
                        ? l
                        : function () {
                            try {
                              l();
                            } catch (e) {
                              _.Deferred.exceptionHook &&
                                _.Deferred.exceptionHook(e, c.stackTrace),
                                o <= t + 1 &&
                                  (r !== I && ((a = void 0), (u = [e])),
                                  n.rejectWith(a, u));
                            }
                          };
                    t
                      ? c()
                      : (_.Deferred.getStackHook &&
                          (c.stackTrace = _.Deferred.getStackHook()),
                        e.setTimeout(c));
                  };
                }
                return _.Deferred(function (e) {
                  n[0][3].add(s(0, e, h(i) ? i : O, e.notifyWith)),
                    n[1][3].add(s(0, e, h(t) ? t : O)),
                    n[2][3].add(s(0, e, h(r) ? r : I));
                }).promise();
              },
              promise: function (e) {
                return null != e ? _.extend(e, i) : i;
              },
            },
            o = {};
          return (
            _.each(n, function (e, t) {
              var s = t[2],
                a = t[5];
              (i[t[1]] = s.add),
                a &&
                  s.add(
                    function () {
                      r = a;
                    },
                    n[3 - e][2].disable,
                    n[3 - e][3].disable,
                    n[0][2].lock,
                    n[0][3].lock
                  ),
                s.add(t[3].fire),
                (o[t[0]] = function () {
                  return (
                    o[t[0] + "With"](this === o ? void 0 : this, arguments),
                    this
                  );
                }),
                (o[t[0] + "With"] = s.fireWith);
            }),
            i.promise(o),
            t && t.call(o, o),
            o
          );
        },
        when: function (e) {
          var t = arguments.length,
            n = t,
            r = Array(n),
            o = i.call(arguments),
            s = _.Deferred(),
            a = function (e) {
              return function (n) {
                (r[e] = this),
                  (o[e] = 1 < arguments.length ? i.call(arguments) : n),
                  --t || s.resolveWith(r, o);
              };
            };
          if (
            t <= 1 &&
            (M(e, s.done(a(n)).resolve, s.reject, !t),
            "pending" === s.state() || h(o[n] && o[n].then))
          )
            return s.then();
          for (; n--; ) M(o[n], a(n), s.reject);
          return s.promise();
        },
      });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (_.Deferred.exceptionHook = function (t, n) {
      e.console &&
        e.console.warn &&
        t &&
        W.test(t.name) &&
        e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
    }),
      (_.readyException = function (t) {
        e.setTimeout(function () {
          throw t;
        });
      });
    var B = _.Deferred();
    function R() {
      v.removeEventListener("DOMContentLoaded", R),
        e.removeEventListener("load", R),
        _.ready();
    }
    (_.fn.ready = function (e) {
      return (
        B.then(e).catch(function (e) {
          _.readyException(e);
        }),
        this
      );
    }),
      _.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (e) {
          (!0 === e ? --_.readyWait : _.isReady) ||
            ((_.isReady = !0) !== e && 0 < --_.readyWait) ||
            B.resolveWith(v, [_]);
        },
      }),
      (_.ready.then = B.then),
      "complete" !== v.readyState &&
      ("loading" === v.readyState || v.documentElement.doScroll)
        ? (v.addEventListener("DOMContentLoaded", R),
          e.addEventListener("load", R))
        : e.setTimeout(_.ready);
    var F = function (e, t, n, r, i, o, s) {
        var a = 0,
          u = e.length,
          l = null == n;
        if ("object" === x(n))
          for (a in ((i = !0), n)) F(e, t, a, n[a], !0, o, s);
        else if (
          void 0 !== r &&
          ((i = !0),
          h(r) || (s = !0),
          l &&
            (s
              ? (t.call(e, r), (t = null))
              : ((l = t),
                (t = function (e, t, n) {
                  return l.call(_(e), n);
                }))),
          t)
        )
          for (; a < u; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
      },
      z = /^-ms-/,
      X = /-([a-z])/g;
    function U(e, t) {
      return t.toUpperCase();
    }
    function V(e) {
      return e.replace(z, "ms-").replace(X, U);
    }
    var G = function (e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    };
    function Y() {
      this.expando = _.expando + Y.uid++;
    }
    (Y.uid = 1),
      (Y.prototype = {
        cache: function (e) {
          var t = e[this.expando];
          return (
            t ||
              ((t = {}),
              G(e) &&
                (e.nodeType
                  ? (e[this.expando] = t)
                  : Object.defineProperty(e, this.expando, {
                      value: t,
                      configurable: !0,
                    }))),
            t
          );
        },
        set: function (e, t, n) {
          var r,
            i = this.cache(e);
          if ("string" == typeof t) i[V(t)] = n;
          else for (r in t) i[V(r)] = t[r];
          return i;
        },
        get: function (e, t) {
          return void 0 === t
            ? this.cache(e)
            : e[this.expando] && e[this.expando][V(t)];
        },
        access: function (e, t, n) {
          return void 0 === t || (t && "string" == typeof t && void 0 === n)
            ? this.get(e, t)
            : (this.set(e, t, n), void 0 !== n ? n : t);
        },
        remove: function (e, t) {
          var n,
            r = e[this.expando];
          if (void 0 !== r) {
            if (void 0 !== t)
              for (
                n = (t = Array.isArray(t)
                  ? t.map(V)
                  : ((t = V(t)) in r)
                  ? [t]
                  : t.match(P) || []).length;
                n--;

              )
                delete r[t[n]];
            (void 0 === t || _.isEmptyObject(r)) &&
              (e.nodeType
                ? (e[this.expando] = void 0)
                : delete e[this.expando]);
          }
        },
        hasData: function (e) {
          var t = e[this.expando];
          return void 0 !== t && !_.isEmptyObject(t);
        },
      });
    var Q = new Y(),
      K = new Y(),
      J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Z = /[A-Z]/g;
    function ee(e, t, n) {
      var r, i;
      if (void 0 === n && 1 === e.nodeType) {
        if (
          ((r = "data-" + t.replace(Z, "-$&").toLowerCase()),
          "string" == typeof (n = e.getAttribute(r)))
        ) {
          try {
            n =
              "true" === (i = n) ||
              ("false" !== i &&
                ("null" === i
                  ? null
                  : i === +i + ""
                  ? +i
                  : J.test(i)
                  ? JSON.parse(i)
                  : i));
          } catch (o) {}
          K.set(e, t, n);
        } else n = void 0;
      }
      return n;
    }
    _.extend({
      hasData: function (e) {
        return K.hasData(e) || Q.hasData(e);
      },
      data: function (e, t, n) {
        return K.access(e, t, n);
      },
      removeData: function (e, t) {
        K.remove(e, t);
      },
      _data: function (e, t, n) {
        return Q.access(e, t, n);
      },
      _removeData: function (e, t) {
        Q.remove(e, t);
      },
    }),
      _.fn.extend({
        data: function (e, t) {
          var n,
            r,
            i,
            o = this[0],
            s = o && o.attributes;
          if (void 0 === e) {
            if (
              this.length &&
              ((i = K.get(o)), 1 === o.nodeType && !Q.get(o, "hasDataAttrs"))
            ) {
              for (n = s.length; n--; )
                s[n] &&
                  0 === (r = s[n].name).indexOf("data-") &&
                  ee(o, (r = V(r.slice(5))), i[r]);
              Q.set(o, "hasDataAttrs", !0);
            }
            return i;
          }
          return "object" == typeof e
            ? this.each(function () {
                K.set(this, e);
              })
            : F(
                this,
                function (t) {
                  var n;
                  if (o && void 0 === t)
                    return void 0 !== (n = K.get(o, e))
                      ? n
                      : void 0 !== (n = ee(o, e))
                      ? n
                      : void 0;
                  this.each(function () {
                    K.set(this, e, t);
                  });
                },
                null,
                t,
                1 < arguments.length,
                null,
                !0
              );
        },
        removeData: function (e) {
          return this.each(function () {
            K.remove(this, e);
          });
        },
      }),
      _.extend({
        queue: function (e, t, n) {
          var r;
          if (e)
            return (
              (t = (t || "fx") + "queue"),
              (r = Q.get(e, t)),
              n &&
                (!r || Array.isArray(n)
                  ? (r = Q.access(e, t, _.makeArray(n)))
                  : r.push(n)),
              r || []
            );
        },
        dequeue: function (e, t) {
          t = t || "fx";
          var n = _.queue(e, t),
            r = n.length,
            i = n.shift(),
            o = _._queueHooks(e, t);
          "inprogress" === i && ((i = n.shift()), r--),
            i &&
              ("fx" === t && n.unshift("inprogress"),
              delete o.stop,
              i.call(
                e,
                function () {
                  _.dequeue(e, t);
                },
                o
              )),
            !r && o && o.empty.fire();
        },
        _queueHooks: function (e, t) {
          var n = t + "queueHooks";
          return (
            Q.get(e, n) ||
            Q.access(e, n, {
              empty: _.Callbacks("once memory").add(function () {
                Q.remove(e, [t + "queue", n]);
              }),
            })
          );
        },
      }),
      _.fn.extend({
        queue: function (e, t) {
          var n = 2;
          return (
            "string" != typeof e && ((t = e), (e = "fx"), n--),
            arguments.length < n
              ? _.queue(this[0], e)
              : void 0 === t
              ? this
              : this.each(function () {
                  var n = _.queue(this, e, t);
                  _._queueHooks(this, e),
                    "fx" === e && "inprogress" !== n[0] && _.dequeue(this, e);
                })
          );
        },
        dequeue: function (e) {
          return this.each(function () {
            _.dequeue(this, e);
          });
        },
        clearQueue: function (e) {
          return this.queue(e || "fx", []);
        },
        promise: function (e, t) {
          var n,
            r = 1,
            i = _.Deferred(),
            o = this,
            s = this.length,
            a = function () {
              --r || i.resolveWith(o, [o]);
            };
          for (
            "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
            s--;

          )
            (n = Q.get(o[s], e + "queueHooks")) &&
              n.empty &&
              (r++, n.empty.add(a));
          return a(), i.promise(t);
        },
      });
    var et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      en = RegExp("^(?:([+-])=|)(" + et + ")([a-z%]*)$", "i"),
      er = ["Top", "Right", "Bottom", "Left"],
      ei = v.documentElement,
      eo = function (e) {
        return _.contains(e.ownerDocument, e);
      },
      es = { composed: !0 };
    ei.getRootNode &&
      (eo = function (e) {
        return (
          _.contains(e.ownerDocument, e) ||
          e.getRootNode(es) === e.ownerDocument
        );
      });
    var ea = function (e, t) {
      return (
        "none" === (e = t || e).style.display ||
        ("" === e.style.display && eo(e) && "none" === _.css(e, "display"))
      );
    };
    function eu(e, t, n, r) {
      var i,
        o,
        s = 20,
        a = r
          ? function () {
              return r.cur();
            }
          : function () {
              return _.css(e, t, "");
            },
        u = a(),
        l = (n && n[3]) || (_.cssNumber[t] ? "" : "px"),
        c =
          e.nodeType &&
          (_.cssNumber[t] || ("px" !== l && +u)) &&
          en.exec(_.css(e, t));
      if (c && c[3] !== l) {
        for (u /= 2, l = l || c[3], c = +u || 1; s--; )
          _.style(e, t, c + l),
            (1 - o) * (1 - (o = a() / u || 0.5)) <= 0 && (s = 0),
            (c /= o);
        (c *= 2), _.style(e, t, c + l), (n = n || []);
      }
      return (
        n &&
          ((c = +c || +u || 0),
          (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
          r && ((r.unit = l), (r.start = c), (r.end = i))),
        i
      );
    }
    var el = {};
    function ec(e, t) {
      for (var n, r, i, o, s, a, u, l = [], c = 0, f = e.length; c < f; c++)
        (r = e[c]).style &&
          ((n = r.style.display),
          t
            ? ("none" === n &&
                ((l[c] = Q.get(r, "display") || null),
                l[c] || (r.style.display = "")),
              "" === r.style.display &&
                ea(r) &&
                (l[c] =
                  ((u = s = o = void 0),
                  (s = (i = r).ownerDocument),
                  (u = el[(a = i.nodeName)]) ||
                    ((o = s.body.appendChild(s.createElement(a))),
                    (u = _.css(o, "display")),
                    o.parentNode.removeChild(o),
                    "none" === u && (u = "block"),
                    (el[a] = u)))))
            : "none" !== n && ((l[c] = "none"), Q.set(r, "display", n)));
      for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
      return e;
    }
    _.fn.extend({
      show: function () {
        return ec(this, !0);
      },
      hide: function () {
        return ec(this);
      },
      toggle: function (e) {
        return "boolean" == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
              ea(this) ? _(this).show() : _(this).hide();
            });
      },
    });
    var ef,
      ep,
      ed = /^(?:checkbox|radio)$/i,
      eh = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      eg = /^$|^module$|\/(?:java|ecma)script/i;
    (ef = v.createDocumentFragment().appendChild(v.createElement("div"))),
      (ep = v.createElement("input")).setAttribute("type", "radio"),
      ep.setAttribute("checked", "checked"),
      ep.setAttribute("name", "t"),
      ef.appendChild(ep),
      (d.checkClone = ef.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (ef.innerHTML = "<textarea>x</textarea>"),
      (d.noCloneChecked = !!ef.cloneNode(!0).lastChild.defaultValue),
      (ef.innerHTML = "<option></option>"),
      (d.option = !!ef.lastChild);
    var ev = {
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
    function em(e, t) {
      var n;
      return (
        (n =
          void 0 !== e.getElementsByTagName
            ? e.getElementsByTagName(t || "*")
            : void 0 !== e.querySelectorAll
            ? e.querySelectorAll(t || "*")
            : []),
        void 0 === t || (t && E(e, t)) ? _.merge([e], n) : n
      );
    }
    function ey(e, t) {
      for (var n = 0, r = e.length; n < r; n++)
        Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"));
    }
    (ev.tbody = ev.tfoot = ev.colgroup = ev.caption = ev.thead),
      (ev.th = ev.td),
      d.option ||
        (ev.optgroup = ev.option =
          [1, "<select multiple='multiple'>", "</select>"]);
    var e$ = /<|&#?\w+;/;
    function ex(e, t, n, r, i) {
      for (
        var o,
          s,
          a,
          u,
          l,
          c,
          f = t.createDocumentFragment(),
          p = [],
          d = 0,
          h = e.length;
        d < h;
        d++
      )
        if ((o = e[d]) || 0 === o) {
          if ("object" === x(o)) _.merge(p, o.nodeType ? [o] : o);
          else if (e$.test(o)) {
            for (
              s = s || f.appendChild(t.createElement("div")),
                u =
                  ev[(a = (eh.exec(o) || ["", ""])[1].toLowerCase())] ||
                  ev._default,
                s.innerHTML = u[1] + _.htmlPrefilter(o) + u[2],
                c = u[0];
              c--;

            )
              s = s.lastChild;
            _.merge(p, s.childNodes), ((s = f.firstChild).textContent = "");
          } else p.push(t.createTextNode(o));
        }
      for (f.textContent = "", d = 0; (o = p[d++]); )
        if (r && -1 < _.inArray(o, r)) i && i.push(o);
        else if (
          ((l = eo(o)), (s = em(f.appendChild(o), "script")), l && ey(s), n)
        )
          for (c = 0; (o = s[c++]); ) eg.test(o.type || "") && n.push(o);
      return f;
    }
    var eb = /^([^.]*)(?:\.(.+)|)/;
    function e_() {
      return !0;
    }
    function ew() {
      return !1;
    }
    function eT(e, t) {
      return (
        (e ===
          (function () {
            try {
              return v.activeElement;
            } catch (e) {}
          })()) ==
        ("focus" === t)
      );
    }
    function eC(e, t, n, r, i, o) {
      var s, a;
      if ("object" == typeof t) {
        for (a in ("string" != typeof n && ((r = r || n), (n = void 0)), t))
          eC(e, a, n, r, t[a], o);
        return e;
      }
      if (
        (null == r && null == i
          ? ((i = n), (r = n = void 0))
          : null == i &&
            ("string" == typeof n
              ? ((i = r), (r = void 0))
              : ((i = r), (r = n), (n = void 0))),
        !1 === i)
      )
        i = ew;
      else if (!i) return e;
      return (
        1 === o &&
          ((s = i),
          ((i = function (e) {
            return _().off(e), s.apply(this, arguments);
          }).guid = s.guid || (s.guid = _.guid++))),
        e.each(function () {
          _.event.add(this, t, i, r, n);
        })
      );
    }
    function ek(e, t, n) {
      n
        ? (Q.set(e, t, !1),
          _.event.add(e, t, {
            namespace: !1,
            handler: function (e) {
              var r,
                o,
                s = Q.get(this, t);
              if (1 & e.isTrigger && this[t]) {
                if (s.length)
                  (_.event.special[t] || {}).delegateType &&
                    e.stopPropagation();
                else if (
                  ((s = i.call(arguments)),
                  Q.set(this, t, s),
                  (r = n(this, t)),
                  this[t](),
                  s !== (o = Q.get(this, t)) || r
                    ? Q.set(this, t, !1)
                    : (o = {}),
                  s !== o)
                )
                  return (
                    e.stopImmediatePropagation(),
                    e.preventDefault(),
                    o && o.value
                  );
              } else
                s.length &&
                  (Q.set(this, t, {
                    value: _.event.trigger(
                      _.extend(s[0], _.Event.prototype),
                      s.slice(1),
                      this
                    ),
                  }),
                  e.stopImmediatePropagation());
            },
          }))
        : void 0 === Q.get(e, t) && _.event.add(e, t, e_);
    }
    (_.event = {
      global: {},
      add: function (e, t, n, r, i) {
        var o,
          s,
          a,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Q.get(e);
        if (G(e))
          for (
            n.handler && ((n = (o = n).handler), (i = o.selector)),
              i && _.find.matchesSelector(ei, i),
              n.guid || (n.guid = _.guid++),
              (u = v.events) || (u = v.events = Object.create(null)),
              (s = v.handle) ||
                (s = v.handle =
                  function (t) {
                    return _.event.triggered !== t.type
                      ? _.event.dispatch.apply(e, arguments)
                      : void 0;
                  }),
              l = (t = (t || "").match(P) || [""]).length;
            l--;

          )
            (d = g = (a = eb.exec(t[l]) || [])[1]),
              (h = (a[2] || "").split(".").sort()),
              d &&
                ((f = _.event.special[d] || {}),
                (d = (i ? f.delegateType : f.bindType) || d),
                (f = _.event.special[d] || {}),
                (c = _.extend(
                  {
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && _.expr.match.needsContext.test(i),
                    namespace: h.join("."),
                  },
                  o
                )),
                (p = u[d]) ||
                  (((p = u[d] = []).delegateCount = 0),
                  (f.setup && !1 !== f.setup.call(e, r, h, s)) ||
                    (e.addEventListener && e.addEventListener(d, s))),
                f.add &&
                  (f.add.call(e, c),
                  c.handler.guid || (c.handler.guid = n.guid)),
                i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                (_.event.global[d] = !0));
      },
      remove: function (e, t, n, r, i) {
        var o,
          s,
          a,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Q.hasData(e) && Q.get(e);
        if (v && (u = v.events)) {
          for (l = (t = (t || "").match(P) || [""]).length; l--; )
            if (
              ((d = g = (a = eb.exec(t[l]) || [])[1]),
              (h = (a[2] || "").split(".").sort()),
              d)
            ) {
              for (
                f = _.event.special[d] || {},
                  p = u[(d = (r ? f.delegateType : f.bindType) || d)] || [],
                  a =
                    a[2] &&
                    RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  s = o = p.length;
                o--;

              )
                (c = p[o]),
                  (!i && g !== c.origType) ||
                    (n && n.guid !== c.guid) ||
                    (a && !a.test(c.namespace)) ||
                    (r && r !== c.selector && ("**" !== r || !c.selector)) ||
                    (p.splice(o, 1),
                    c.selector && p.delegateCount--,
                    f.remove && f.remove.call(e, c));
              s &&
                !p.length &&
                ((f.teardown && !1 !== f.teardown.call(e, h, v.handle)) ||
                  _.removeEvent(e, d, v.handle),
                delete u[d]);
            } else for (d in u) _.event.remove(e, d + t[l], n, r, !0);
          _.isEmptyObject(u) && Q.remove(e, "handle events");
        }
      },
      dispatch: function (e) {
        var t,
          n,
          r,
          i,
          o,
          s,
          a = Array(arguments.length),
          u = _.event.fix(e),
          l = (Q.get(this, "events") || Object.create(null))[u.type] || [],
          c = _.event.special[u.type] || {};
        for (a[0] = u, t = 1; t < arguments.length; t++) a[t] = arguments[t];
        if (
          ((u.delegateTarget = this),
          !c.preDispatch || !1 !== c.preDispatch.call(this, u))
        ) {
          for (
            s = _.event.handlers.call(this, u, l), t = 0;
            (i = s[t++]) && !u.isPropagationStopped();

          )
            for (
              u.currentTarget = i.elem, n = 0;
              (o = i.handlers[n++]) && !u.isImmediatePropagationStopped();

            )
              (u.rnamespace &&
                !1 !== o.namespace &&
                !u.rnamespace.test(o.namespace)) ||
                ((u.handleObj = o),
                (u.data = o.data),
                void 0 !==
                  (r = (
                    (_.event.special[o.origType] || {}).handle || o.handler
                  ).apply(i.elem, a)) &&
                  !1 === (u.result = r) &&
                  (u.preventDefault(), u.stopPropagation()));
          return c.postDispatch && c.postDispatch.call(this, u), u.result;
        }
      },
      handlers: function (e, t) {
        var n,
          r,
          i,
          o,
          s,
          a = [],
          u = t.delegateCount,
          l = e.target;
        if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) {
          for (; l !== this; l = l.parentNode || this)
            if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
              for (o = [], s = {}, n = 0; n < u; n++)
                void 0 === s[(i = (r = t[n]).selector + " ")] &&
                  (s[i] = r.needsContext
                    ? -1 < _(i, this).index(l)
                    : _.find(i, this, null, [l]).length),
                  s[i] && o.push(r);
              o.length && a.push({ elem: l, handlers: o });
            }
        }
        return (
          (l = this),
          u < t.length && a.push({ elem: l, handlers: t.slice(u) }),
          a
        );
      },
      addProp: function (e, t) {
        Object.defineProperty(_.Event.prototype, e, {
          enumerable: !0,
          configurable: !0,
          get: h(t)
            ? function () {
                if (this.originalEvent) return t(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[e];
              },
          set: function (t) {
            Object.defineProperty(this, e, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: t,
            });
          },
        });
      },
      fix: function (e) {
        return e[_.expando] ? e : new _.Event(e);
      },
      special: {
        load: { noBubble: !0 },
        click: {
          setup: function (e) {
            var t = this || e;
            return (
              ed.test(t.type) && t.click && E(t, "input") && ek(t, "click", e_),
              !1
            );
          },
          trigger: function (e) {
            var t = this || e;
            return (
              ed.test(t.type) && t.click && E(t, "input") && ek(t, "click"), !0
            );
          },
          _default: function (e) {
            var t = e.target;
            return (
              (ed.test(t.type) &&
                t.click &&
                E(t, "input") &&
                Q.get(t, "click")) ||
              E(t, "a")
            );
          },
        },
        beforeunload: {
          postDispatch: function (e) {
            void 0 !== e.result &&
              e.originalEvent &&
              (e.originalEvent.returnValue = e.result);
          },
        },
      },
    }),
      (_.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
      }),
      (_.Event = function (e, t) {
        if (!(this instanceof _.Event)) return new _.Event(e, t);
        e && e.type
          ? ((this.originalEvent = e),
            (this.type = e.type),
            (this.isDefaultPrevented =
              e.defaultPrevented ||
              (void 0 === e.defaultPrevented && !1 === e.returnValue)
                ? e_
                : ew),
            (this.target =
              e.target && 3 === e.target.nodeType
                ? e.target.parentNode
                : e.target),
            (this.currentTarget = e.currentTarget),
            (this.relatedTarget = e.relatedTarget))
          : (this.type = e),
          t && _.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || Date.now()),
          (this[_.expando] = !0);
      }),
      (_.Event.prototype = {
        constructor: _.Event,
        isDefaultPrevented: ew,
        isPropagationStopped: ew,
        isImmediatePropagationStopped: ew,
        isSimulated: !1,
        preventDefault: function () {
          var e = this.originalEvent;
          (this.isDefaultPrevented = e_),
            e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function () {
          var e = this.originalEvent;
          (this.isPropagationStopped = e_),
            e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          (this.isImmediatePropagationStopped = e_),
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      _.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          code: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: !0,
        },
        _.event.addProp
      ),
      _.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        _.event.special[e] = {
          setup: function () {
            return ek(this, e, eT), !1;
          },
          trigger: function () {
            return ek(this, e), !0;
          },
          _default: function () {
            return !0;
          },
          delegateType: t,
        };
      }),
      _.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (e, t) {
          _.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
              var n,
                r = e.relatedTarget,
                i = e.handleObj;
              return (
                (r && (r === this || _.contains(this, r))) ||
                  ((e.type = i.origType),
                  (n = i.handler.apply(this, arguments)),
                  (e.type = t)),
                n
              );
            },
          };
        }
      ),
      _.fn.extend({
        on: function (e, t, n, r) {
          return eC(this, e, t, n, r);
        },
        one: function (e, t, n, r) {
          return eC(this, e, t, n, r, 1);
        },
        off: function (e, t, n) {
          var r, i;
          if (e && e.preventDefault && e.handleObj)
            return (
              (r = e.handleObj),
              _(e.delegateTarget).off(
                r.namespace ? r.origType + "." + r.namespace : r.origType,
                r.selector,
                r.handler
              ),
              this
            );
          if ("object" == typeof e) {
            for (i in e) this.off(i, t, e[i]);
            return this;
          }
          return (
            (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
            !1 === n && (n = ew),
            this.each(function () {
              _.event.remove(this, e, n, t);
            })
          );
        },
      });
    var eS = /<script|<style|<link/i,
      eE = /checked\s*(?:[^=]|=\s*.checked.)/i,
      eN = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function eD(e, t) {
      return (
        (E(e, "table") &&
          E(11 !== t.nodeType ? t : t.firstChild, "tr") &&
          _(e).children("tbody")[0]) ||
        e
      );
    }
    function eA(e) {
      return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function ej(e) {
      return (
        "true/" === (e.type || "").slice(0, 5)
          ? (e.type = e.type.slice(5))
          : e.removeAttribute("type"),
        e
      );
    }
    function eL(e, t) {
      var n, r, i, o, s, a;
      if (1 === t.nodeType) {
        if (Q.hasData(e) && (a = Q.get(e).events))
          for (i in (Q.remove(t, "handle events"), a))
            for (n = 0, r = a[i].length; n < r; n++) _.event.add(t, i, a[i][n]);
        K.hasData(e) && ((o = K.access(e)), (s = _.extend({}, o)), K.set(t, s));
      }
    }
    function eq(e, t, n, r) {
      t = o(t);
      var i,
        s,
        a,
        u,
        l,
        c,
        f = 0,
        p = e.length,
        g = p - 1,
        v = t[0],
        m = h(v);
      if (m || (1 < p && "string" == typeof v && !d.checkClone && eE.test(v)))
        return e.each(function (i) {
          var o = e.eq(i);
          m && (t[0] = v.call(this, i, o.html())), eq(o, t, n, r);
        });
      if (
        p &&
        ((s = (i = ex(t, e[0].ownerDocument, !1, e, r)).firstChild),
        1 === i.childNodes.length && (i = s),
        s || r)
      ) {
        for (u = (a = _.map(em(i, "script"), eA)).length; f < p; f++)
          (l = i),
            f !== g &&
              ((l = _.clone(l, !0, !0)), u && _.merge(a, em(l, "script"))),
            n.call(e[f], l, f);
        if (u)
          for (
            c = a[a.length - 1].ownerDocument, _.map(a, ej), f = 0;
            f < u;
            f++
          )
            (l = a[f]),
              eg.test(l.type || "") &&
                !Q.access(l, "globalEval") &&
                _.contains(c, l) &&
                (l.src && "module" !== (l.type || "").toLowerCase()
                  ? _._evalUrl &&
                    !l.noModule &&
                    _._evalUrl(
                      l.src,
                      { nonce: l.nonce || l.getAttribute("nonce") },
                      c
                    )
                  : y(l.textContent.replace(eN, ""), l, c));
      }
      return e;
    }
    function eH(e, t, n) {
      for (var r, i = t ? _.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
        n || 1 !== r.nodeType || _.cleanData(em(r)),
          r.parentNode &&
            (n && eo(r) && ey(em(r, "script")), r.parentNode.removeChild(r));
      return e;
    }
    _.extend({
      htmlPrefilter: function (e) {
        return e;
      },
      clone: function (e, t, n) {
        var r,
          i,
          o,
          s,
          a,
          u,
          l,
          c = e.cloneNode(!0),
          f = eo(e);
        if (
          !(
            d.noCloneChecked ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            _.isXMLDoc(e)
          )
        )
          for (s = em(c), r = 0, i = (o = em(e)).length; r < i; r++)
            (a = o[r]),
              "input" === (l = (u = s[r]).nodeName.toLowerCase()) &&
              ed.test(a.type)
                ? (u.checked = a.checked)
                : ("input" !== l && "textarea" !== l) ||
                  (u.defaultValue = a.defaultValue);
        if (t) {
          if (n)
            for (
              o = o || em(e), s = s || em(c), r = 0, i = o.length;
              r < i;
              r++
            )
              eL(o[r], s[r]);
          else eL(e, c);
        }
        return (
          0 < (s = em(c, "script")).length && ey(s, !f && em(e, "script")), c
        );
      },
      cleanData: function (e) {
        for (
          var t, n, r, i = _.event.special, o = 0;
          void 0 !== (n = e[o]);
          o++
        )
          if (G(n)) {
            if ((t = n[Q.expando])) {
              if (t.events)
                for (r in t.events)
                  i[r] ? _.event.remove(n, r) : _.removeEvent(n, r, t.handle);
              n[Q.expando] = void 0;
            }
            n[K.expando] && (n[K.expando] = void 0);
          }
      },
    }),
      _.fn.extend({
        detach: function (e) {
          return eH(this, e, !0);
        },
        remove: function (e) {
          return eH(this, e);
        },
        text: function (e) {
          return F(
            this,
            function (e) {
              return void 0 === e
                ? _.text(this)
                : this.empty().each(function () {
                    (1 !== this.nodeType &&
                      11 !== this.nodeType &&
                      9 !== this.nodeType) ||
                      (this.textContent = e);
                  });
            },
            null,
            e,
            arguments.length
          );
        },
        append: function () {
          return eq(this, arguments, function (e) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              eD(this, e).appendChild(e);
          });
        },
        prepend: function () {
          return eq(this, arguments, function (e) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var t = eD(this, e);
              t.insertBefore(e, t.firstChild);
            }
          });
        },
        before: function () {
          return eq(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this);
          });
        },
        after: function () {
          return eq(this, arguments, function (e) {
            this.parentNode &&
              this.parentNode.insertBefore(e, this.nextSibling);
          });
        },
        empty: function () {
          for (var e, t = 0; null != (e = this[t]); t++)
            1 === e.nodeType && (_.cleanData(em(e, !1)), (e.textContent = ""));
          return this;
        },
        clone: function (e, t) {
          return (
            (e = null != e && e),
            (t = null == t ? e : t),
            this.map(function () {
              return _.clone(this, e, t);
            })
          );
        },
        html: function (e) {
          return F(
            this,
            function (e) {
              var t = this[0] || {},
                n = 0,
                r = this.length;
              if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
              if (
                "string" == typeof e &&
                !eS.test(e) &&
                !ev[(eh.exec(e) || ["", ""])[1].toLowerCase()]
              ) {
                e = _.htmlPrefilter(e);
                try {
                  for (; n < r; n++)
                    1 === (t = this[n] || {}).nodeType &&
                      (_.cleanData(em(t, !1)), (t.innerHTML = e));
                  t = 0;
                } catch (i) {}
              }
              t && this.empty().append(e);
            },
            null,
            e,
            arguments.length
          );
        },
        replaceWith: function () {
          var e = [];
          return eq(
            this,
            arguments,
            function (t) {
              var n = this.parentNode;
              0 > _.inArray(this, e) &&
                (_.cleanData(em(this)), n && n.replaceChild(t, this));
            },
            e
          );
        },
      }),
      _.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (e, t) {
          _.fn[e] = function (e) {
            for (var n, r = [], i = _(e), o = i.length - 1, a = 0; a <= o; a++)
              (n = a === o ? this : this.clone(!0)),
                _(i[a])[t](n),
                s.apply(r, n.get());
            return this.pushStack(r);
          };
        }
      );
    var eP = RegExp("^(" + et + ")(?!px)[a-z%]+$", "i"),
      eO = function (t) {
        var n = t.ownerDocument.defaultView;
        return (n && n.opener) || (n = e), n.getComputedStyle(t);
      },
      e0 = function (e, t, n) {
        var r,
          i,
          o = {};
        for (i in t) (o[i] = e.style[i]), (e.style[i] = t[i]);
        for (i in ((r = n.call(e)), t)) e.style[i] = o[i];
        return r;
      },
      eI = RegExp(er.join("|"), "i");
    function eM(e, t, n) {
      var r,
        i,
        o,
        s,
        a = e.style;
      return (
        (n = n || eO(e)) &&
          ("" !== (s = n.getPropertyValue(t) || n[t]) ||
            eo(e) ||
            (s = _.style(e, t)),
          !d.pixelBoxStyles() &&
            eP.test(s) &&
            eI.test(t) &&
            ((r = a.width),
            (i = a.minWidth),
            (o = a.maxWidth),
            (a.minWidth = a.maxWidth = a.width = s),
            (s = n.width),
            (a.width = r),
            (a.minWidth = i),
            (a.maxWidth = o))),
        void 0 !== s ? s + "" : s
      );
    }
    function eW(e, t) {
      return {
        get: function () {
          if (!e()) return (this.get = t).apply(this, arguments);
          delete this.get;
        },
      };
    }
    !(function () {
      function t() {
        if (c) {
          (l.style.cssText =
            "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
            (c.style.cssText =
              "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
            ei.appendChild(l).appendChild(c);
          var t = e.getComputedStyle(c);
          (r = "1%" !== t.top),
            (u = 12 === n(t.marginLeft)),
            (c.style.right = "60%"),
            (s = 36 === n(t.right)),
            (i = 36 === n(t.width)),
            (c.style.position = "absolute"),
            (o = 12 === n(c.offsetWidth / 3)),
            ei.removeChild(l),
            (c = null);
        }
      }
      function n(e) {
        return Math.round(parseFloat(e));
      }
      var r,
        i,
        o,
        s,
        a,
        u,
        l = v.createElement("div"),
        c = v.createElement("div");
      c.style &&
        ((c.style.backgroundClip = "content-box"),
        (c.cloneNode(!0).style.backgroundClip = ""),
        (d.clearCloneStyle = "content-box" === c.style.backgroundClip),
        _.extend(d, {
          boxSizingReliable: function () {
            return t(), i;
          },
          pixelBoxStyles: function () {
            return t(), s;
          },
          pixelPosition: function () {
            return t(), r;
          },
          reliableMarginLeft: function () {
            return t(), u;
          },
          scrollboxSize: function () {
            return t(), o;
          },
          reliableTrDimensions: function () {
            var t, n, r, i;
            return (
              null == a &&
                ((t = v.createElement("table")),
                (n = v.createElement("tr")),
                (r = v.createElement("div")),
                (t.style.cssText =
                  "position:absolute;left:-11111px;border-collapse:separate"),
                (n.style.cssText = "border:1px solid"),
                (n.style.height = "1px"),
                (r.style.height = "9px"),
                (r.style.display = "block"),
                ei.appendChild(t).appendChild(n).appendChild(r),
                (a =
                  parseInt((i = e.getComputedStyle(n)).height, 10) +
                    parseInt(i.borderTopWidth, 10) +
                    parseInt(i.borderBottomWidth, 10) ===
                  n.offsetHeight),
                ei.removeChild(t)),
              a
            );
          },
        }));
    })();
    var eB = ["Webkit", "Moz", "ms"],
      e1 = v.createElement("div").style,
      eR = {};
    function e9(e) {
      return (
        _.cssProps[e] ||
        eR[e] ||
        (e in e1
          ? e
          : (eR[e] =
              (function (e) {
                for (
                  var t = e[0].toUpperCase() + e.slice(1), n = eB.length;
                  n--;

                )
                  if ((e = eB[n] + t) in e1) return e;
              })(e) || e))
      );
    }
    var eF = /^(none|table(?!-c[ea]).+)/,
      e8 = /^--/,
      ez = { position: "absolute", visibility: "hidden", display: "block" },
      eX = { letterSpacing: "0", fontWeight: "400" };
    function e2(e, t, n) {
      var r = en.exec(t);
      return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
    }
    function eU(e, t, n, r, i, o) {
      var s = "width" === t ? 1 : 0,
        a = 0,
        u = 0;
      if (n === (r ? "border" : "content")) return 0;
      for (; s < 4; s += 2)
        "margin" === n && (u += _.css(e, n + er[s], !0, i)),
          r
            ? ("content" === n && (u -= _.css(e, "padding" + er[s], !0, i)),
              "margin" !== n &&
                (u -= _.css(e, "border" + er[s] + "Width", !0, i)))
            : ((u += _.css(e, "padding" + er[s], !0, i)),
              "padding" !== n
                ? (u += _.css(e, "border" + er[s] + "Width", !0, i))
                : (a += _.css(e, "border" + er[s] + "Width", !0, i)));
      return (
        !r &&
          0 <= o &&
          (u +=
            Math.max(
              0,
              Math.ceil(
                e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - a - 0.5
              )
            ) || 0),
        u
      );
    }
    function e3(e, t, n) {
      var r = eO(e),
        i =
          (!d.boxSizingReliable() || n) &&
          "border-box" === _.css(e, "boxSizing", !1, r),
        o = i,
        s = eM(e, t, r),
        a = "offset" + t[0].toUpperCase() + t.slice(1);
      if (eP.test(s)) {
        if (!n) return s;
        s = "auto";
      }
      return (
        ((!d.boxSizingReliable() && i) ||
          (!d.reliableTrDimensions() && E(e, "tr")) ||
          "auto" === s ||
          (!parseFloat(s) && "inline" === _.css(e, "display", !1, r))) &&
          e.getClientRects().length &&
          ((i = "border-box" === _.css(e, "boxSizing", !1, r)),
          (o = a in e) && (s = e[a])),
        (s = parseFloat(s) || 0) +
          eU(e, t, n || (i ? "border" : "content"), o, r, s) +
          "px"
      );
    }
    function e4(e, t, n, r, i) {
      return new e4.prototype.init(e, t, n, r, i);
    }
    _.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var n = eM(e, "opacity");
              return "" === n ? "1" : n;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: {},
      style: function (e, t, n, r) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var i,
            o,
            s,
            a = V(t),
            u = e8.test(t),
            l = e.style;
          if (
            (u || (t = e9(a)),
            (s = _.cssHooks[t] || _.cssHooks[a]),
            void 0 === n)
          )
            return s && "get" in s && void 0 !== (i = s.get(e, !1, r))
              ? i
              : l[t];
          "string" == (o = typeof n) &&
            (i = en.exec(n)) &&
            i[1] &&
            ((n = eu(e, t, i)), (o = "number")),
            null != n &&
              n == n &&
              ("number" !== o ||
                u ||
                (n += (i && i[3]) || (_.cssNumber[a] ? "" : "px")),
              d.clearCloneStyle ||
                "" !== n ||
                0 !== t.indexOf("background") ||
                (l[t] = "inherit"),
              (s && "set" in s && void 0 === (n = s.set(e, n, r))) ||
                (u ? l.setProperty(t, n) : (l[t] = n)));
        }
      },
      css: function (e, t, n, r) {
        var i,
          o,
          s,
          a = V(t);
        return (
          e8.test(t) || (t = e9(a)),
          (s = _.cssHooks[t] || _.cssHooks[a]) &&
            "get" in s &&
            (i = s.get(e, !0, n)),
          void 0 === i && (i = eM(e, t, r)),
          "normal" === i && t in eX && (i = eX[t]),
          "" === n || n
            ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
            : i
        );
      },
    }),
      _.each(["height", "width"], function (e, t) {
        _.cssHooks[t] = {
          get: function (e, n, r) {
            if (n)
              return !eF.test(_.css(e, "display")) ||
                (e.getClientRects().length && e.getBoundingClientRect().width)
                ? e3(e, t, r)
                : e0(e, ez, function () {
                    return e3(e, t, r);
                  });
          },
          set: function (e, n, r) {
            var i,
              o = eO(e),
              s = !d.scrollboxSize() && "absolute" === o.position,
              a = (s || r) && "border-box" === _.css(e, "boxSizing", !1, o),
              u = r ? eU(e, t, r, a, o) : 0;
            return (
              a &&
                s &&
                (u -= Math.ceil(
                  e["offset" + t[0].toUpperCase() + t.slice(1)] -
                    parseFloat(o[t]) -
                    eU(e, t, "border", !1, o) -
                    0.5
                )),
              u &&
                (i = en.exec(n)) &&
                "px" !== (i[3] || "px") &&
                ((e.style[t] = n), (n = _.css(e, t))),
              e2(0, n, u)
            );
          },
        };
      }),
      (_.cssHooks.marginLeft = eW(d.reliableMarginLeft, function (e, t) {
        if (t)
          return (
            (parseFloat(eM(e, "marginLeft")) ||
              e.getBoundingClientRect().left -
                e0(e, { marginLeft: 0 }, function () {
                  return e.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      _.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
        (_.cssHooks[e + t] = {
          expand: function (n) {
            for (
              var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n];
              r < 4;
              r++
            )
              i[e + er[r] + t] = o[r] || o[r - 2] || o[0];
            return i;
          },
        }),
          "margin" !== e && (_.cssHooks[e + t].set = e2);
      }),
      _.fn.extend({
        css: function (e, t) {
          return F(
            this,
            function (e, t, n) {
              var r,
                i,
                o = {},
                s = 0;
              if (Array.isArray(t)) {
                for (r = eO(e), i = t.length; s < i; s++)
                  o[t[s]] = _.css(e, t[s], !1, r);
                return o;
              }
              return void 0 !== n ? _.style(e, t, n) : _.css(e, t);
            },
            e,
            t,
            1 < arguments.length
          );
        },
      }),
      (((_.Tween = e4).prototype = {
        constructor: e4,
        init: function (e, t, n, r, i, o) {
          (this.elem = e),
            (this.prop = n),
            (this.easing = i || _.easing._default),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = r),
            (this.unit = o || (_.cssNumber[n] ? "" : "px"));
        },
        cur: function () {
          var e = e4.propHooks[this.prop];
          return e && e.get ? e.get(this) : e4.propHooks._default.get(this);
        },
        run: function (e) {
          var t,
            n = e4.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = t =
                  _.easing[this.easing](
                    e,
                    this.options.duration * e,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = t = e),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : e4.propHooks._default.set(this),
            this
          );
        },
      }).init.prototype = e4.prototype),
      ((e4.propHooks = {
        _default: {
          get: function (e) {
            var t;
            return 1 !== e.elem.nodeType ||
              (null != e.elem[e.prop] && null == e.elem.style[e.prop])
              ? e.elem[e.prop]
              : (t = _.css(e.elem, e.prop, "")) && "auto" !== t
              ? t
              : 0;
          },
          set: function (e) {
            _.fx.step[e.prop]
              ? _.fx.step[e.prop](e)
              : 1 === e.elem.nodeType &&
                (_.cssHooks[e.prop] || null != e.elem.style[e9(e.prop)])
              ? _.style(e.elem, e.prop, e.now + e.unit)
              : (e.elem[e.prop] = e.now);
          },
        },
      }).scrollTop = e4.propHooks.scrollLeft =
        {
          set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
          },
        }),
      (_.easing = {
        linear: function (e) {
          return e;
        },
        swing: function (e) {
          return 0.5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (_.fx = e4.prototype.init),
      (_.fx.step = {});
    var e7,
      eV,
      eG,
      eY,
      eQ = /^(?:toggle|show|hide)$/,
      e6 = /queueHooks$/;
    function eK() {
      return (
        e.setTimeout(function () {
          e7 = void 0;
        }),
        (e7 = Date.now())
      );
    }
    function e5(e, t) {
      var n,
        r = 0,
        i = { height: e };
      for (t = t ? 1 : 0; r < 4; r += 2 - t)
        i["margin" + (n = er[r])] = i["padding" + n] = e;
      return t && (i.opacity = i.width = e), i;
    }
    function eJ(e, t, n) {
      for (
        var r,
          i = (eZ.tweeners[t] || []).concat(eZ.tweeners["*"]),
          o = 0,
          s = i.length;
        o < s;
        o++
      )
        if ((r = i[o].call(n, t, e))) return r;
    }
    function eZ(e, t, n) {
      var r,
        i,
        o = 0,
        s = eZ.prefilters.length,
        a = _.Deferred().always(function () {
          delete u.elem;
        }),
        u = function () {
          if (i) return !1;
          for (
            var t = e7 || eK(),
              n = Math.max(0, l.startTime + l.duration - t),
              r = 1 - (n / l.duration || 0),
              o = 0,
              s = l.tweens.length;
            o < s;
            o++
          )
            l.tweens[o].run(r);
          return (
            a.notifyWith(e, [l, r, n]),
            r < 1 && s
              ? n
              : (s || a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l]), !1)
          );
        },
        l = a.promise({
          elem: e,
          props: _.extend({}, t),
          opts: _.extend(
            !0,
            { specialEasing: {}, easing: _.easing._default },
            n
          ),
          originalProperties: t,
          originalOptions: n,
          startTime: e7 || eK(),
          duration: n.duration,
          tweens: [],
          createTween: function (t, n) {
            var r = _.Tween(
              e,
              l.opts,
              t,
              n,
              l.opts.specialEasing[t] || l.opts.easing
            );
            return l.tweens.push(r), r;
          },
          stop: function (t) {
            var n = 0,
              r = t ? l.tweens.length : 0;
            if (i) return this;
            for (i = !0; n < r; n++) l.tweens[n].run(1);
            return (
              t
                ? (a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l, t]))
                : a.rejectWith(e, [l, t]),
              this
            );
          },
        }),
        c = l.props;
      for (
        (function (e, t) {
          var n, r, i, o, s;
          for (n in e)
            if (
              ((i = t[(r = V(n))]),
              Array.isArray((o = e[n])) && ((i = o[1]), (o = e[n] = o[0])),
              n !== r && ((e[r] = o), delete e[n]),
              (s = _.cssHooks[r]) && ("expand" in s))
            )
              for (n in ((o = s.expand(o)), delete e[r], o))
                (n in e) || ((e[n] = o[n]), (t[n] = i));
            else t[r] = i;
        })(c, l.opts.specialEasing);
        o < s;
        o++
      )
        if ((r = eZ.prefilters[o].call(l, e, c, l.opts)))
          return (
            h(r.stop) &&
              (_._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)),
            r
          );
      return (
        _.map(c, eJ, l),
        h(l.opts.start) && l.opts.start.call(e, l),
        l
          .progress(l.opts.progress)
          .done(l.opts.done, l.opts.complete)
          .fail(l.opts.fail)
          .always(l.opts.always),
        _.fx.timer(_.extend(u, { elem: e, anim: l, queue: l.opts.queue })),
        l
      );
    }
    (_.Animation = _.extend(eZ, {
      tweeners: {
        "*": [
          function (e, t) {
            var n = this.createTween(e, t);
            return eu(n.elem, e, en.exec(t), n), n;
          },
        ],
      },
      tweener: function (e, t) {
        h(e) ? ((t = e), (e = ["*"])) : (e = e.match(P));
        for (var n, r = 0, i = e.length; r < i; r++)
          (n = e[r]),
            (eZ.tweeners[n] = eZ.tweeners[n] || []),
            eZ.tweeners[n].unshift(t);
      },
      prefilters: [
        function (e, t, n) {
          var r,
            i,
            o,
            s,
            a,
            u,
            l,
            c,
            f = "width" in t || "height" in t,
            p = this,
            d = {},
            h = e.style,
            g = e.nodeType && ea(e),
            v = Q.get(e, "fxshow");
          for (r in (n.queue ||
            (null == (s = _._queueHooks(e, "fx")).unqueued &&
              ((s.unqueued = 0),
              (a = s.empty.fire),
              (s.empty.fire = function () {
                s.unqueued || a();
              })),
            s.unqueued++,
            p.always(function () {
              p.always(function () {
                s.unqueued--, _.queue(e, "fx").length || s.empty.fire();
              });
            })),
          t))
            if (((i = t[r]), eQ.test(i))) {
              if (
                (delete t[r],
                (o = o || "toggle" === i),
                i === (g ? "hide" : "show"))
              ) {
                if ("show" !== i || !v || void 0 === v[r]) continue;
                g = !0;
              }
              d[r] = (v && v[r]) || _.style(e, r);
            }
          if ((u = !_.isEmptyObject(t)) || !_.isEmptyObject(d))
            for (r in (f &&
              1 === e.nodeType &&
              ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
              null == (l = v && v.display) && (l = Q.get(e, "display")),
              "none" === (c = _.css(e, "display")) &&
                (l
                  ? (c = l)
                  : (ec([e], !0),
                    (l = e.style.display || l),
                    (c = _.css(e, "display")),
                    ec([e]))),
              ("inline" === c || ("inline-block" === c && null != l)) &&
                "none" === _.css(e, "float") &&
                (u ||
                  (p.done(function () {
                    h.display = l;
                  }),
                  null == l && (l = "none" === (c = h.display) ? "" : c)),
                (h.display = "inline-block"))),
            n.overflow &&
              ((h.overflow = "hidden"),
              p.always(function () {
                (h.overflow = n.overflow[0]),
                  (h.overflowX = n.overflow[1]),
                  (h.overflowY = n.overflow[2]);
              })),
            (u = !1),
            d))
              u ||
                (v
                  ? "hidden" in v && (g = v.hidden)
                  : (v = Q.access(e, "fxshow", { display: l })),
                o && (v.hidden = !g),
                g && ec([e], !0),
                p.done(function () {
                  for (r in (g || ec([e]), Q.remove(e, "fxshow"), d))
                    _.style(e, r, d[r]);
                })),
                (u = eJ(g ? v[r] : 0, r, p)),
                r in v ||
                  ((v[r] = u.start), g && ((u.end = u.start), (u.start = 0)));
        },
      ],
      prefilter: function (e, t) {
        t ? eZ.prefilters.unshift(e) : eZ.prefilters.push(e);
      },
    })),
      (_.speed = function (e, t, n) {
        var r =
          e && "object" == typeof e
            ? _.extend({}, e)
            : {
                complete: n || (!n && t) || (h(e) && e),
                duration: e,
                easing: (n && t) || (t && !h(t) && t),
              };
        return (
          _.fx.off
            ? (r.duration = 0)
            : "number" != typeof r.duration &&
              (r.duration in _.fx.speeds
                ? (r.duration = _.fx.speeds[r.duration])
                : (r.duration = _.fx.speeds._default)),
          (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
          (r.old = r.complete),
          (r.complete = function () {
            h(r.old) && r.old.call(this), r.queue && _.dequeue(this, r.queue);
          }),
          r
        );
      }),
      _.fn.extend({
        fadeTo: function (e, t, n, r) {
          return this.filter(ea)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: t }, e, n, r);
        },
        animate: function (e, t, n, r) {
          var i = _.isEmptyObject(e),
            o = _.speed(t, n, r),
            s = function () {
              var t = eZ(this, _.extend({}, e), o);
              (i || Q.get(this, "finish")) && t.stop(!0);
            };
          return (
            (s.finish = s),
            i || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
          );
        },
        stop: function (e, t, n) {
          var r = function (e) {
            var t = e.stop;
            delete e.stop, t(n);
          };
          return (
            "string" != typeof e && ((n = t), (t = e), (e = void 0)),
            t && this.queue(e || "fx", []),
            this.each(function () {
              var t = !0,
                i = null != e && e + "queueHooks",
                o = _.timers,
                s = Q.get(this);
              if (i) s[i] && s[i].stop && r(s[i]);
              else for (i in s) s[i] && s[i].stop && e6.test(i) && r(s[i]);
              for (i = o.length; i--; )
                o[i].elem !== this ||
                  (null != e && o[i].queue !== e) ||
                  (o[i].anim.stop(n), (t = !1), o.splice(i, 1));
              (!t && n) || _.dequeue(this, e);
            })
          );
        },
        finish: function (e) {
          return (
            !1 !== e && (e = e || "fx"),
            this.each(function () {
              var t,
                n = Q.get(this),
                r = n[e + "queue"],
                i = n[e + "queueHooks"],
                o = _.timers,
                s = r ? r.length : 0;
              for (
                n.finish = !0,
                  _.queue(this, e, []),
                  i && i.stop && i.stop.call(this, !0),
                  t = o.length;
                t--;

              )
                o[t].elem === this &&
                  o[t].queue === e &&
                  (o[t].anim.stop(!0), o.splice(t, 1));
              for (t = 0; t < s; t++)
                r[t] && r[t].finish && r[t].finish.call(this);
              delete n.finish;
            })
          );
        },
      }),
      _.each(["toggle", "show", "hide"], function (e, t) {
        var n = _.fn[t];
        _.fn[t] = function (e, r, i) {
          return null == e || "boolean" == typeof e
            ? n.apply(this, arguments)
            : this.animate(e5(t, !0), e, r, i);
        };
      }),
      _.each(
        {
          slideDown: e5("show"),
          slideUp: e5("hide"),
          slideToggle: e5("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (e, t) {
          _.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r);
          };
        }
      ),
      (_.timers = []),
      (_.fx.tick = function () {
        var e,
          t = 0,
          n = _.timers;
        for (e7 = Date.now(); t < n.length; t++)
          (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || _.fx.stop(), (e7 = void 0);
      }),
      (_.fx.timer = function (e) {
        _.timers.push(e), _.fx.start();
      }),
      (_.fx.interval = 13),
      (_.fx.start = function () {
        eV ||
          ((eV = !0),
          (function t() {
            eV &&
              (!1 === v.hidden && e.requestAnimationFrame
                ? e.requestAnimationFrame(t)
                : e.setTimeout(t, _.fx.interval),
              _.fx.tick());
          })());
      }),
      (_.fx.stop = function () {
        eV = null;
      }),
      (_.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (_.fn.delay = function (t, n) {
        return (
          (t = (_.fx && _.fx.speeds[t]) || t),
          (n = n || "fx"),
          this.queue(n, function (n, r) {
            var i = e.setTimeout(n, t);
            r.stop = function () {
              e.clearTimeout(i);
            };
          })
        );
      }),
      (eG = v.createElement("input")),
      (eY = v.createElement("select").appendChild(v.createElement("option"))),
      (eG.type = "checkbox"),
      (d.checkOn = "" !== eG.value),
      (d.optSelected = eY.selected),
      ((eG = v.createElement("input")).value = "t"),
      (eG.type = "radio"),
      (d.radioValue = "t" === eG.value);
    var te,
      tt = _.expr.attrHandle;
    _.fn.extend({
      attr: function (e, t) {
        return F(this, _.attr, e, t, 1 < arguments.length);
      },
      removeAttr: function (e) {
        return this.each(function () {
          _.removeAttr(this, e);
        });
      },
    }),
      _.extend({
        attr: function (e, t, n) {
          var r,
            i,
            o = e.nodeType;
          if (3 !== o && 8 !== o && 2 !== o)
            return void 0 === e.getAttribute
              ? _.prop(e, t, n)
              : ((1 === o && _.isXMLDoc(e)) ||
                  (i =
                    _.attrHooks[t.toLowerCase()] ||
                    (_.expr.match.bool.test(t) ? te : void 0)),
                void 0 !== n
                  ? null === n
                    ? void _.removeAttr(e, t)
                    : i && "set" in i && void 0 !== (r = i.set(e, n, t))
                    ? r
                    : (e.setAttribute(t, n + ""), n)
                  : i && "get" in i && null !== (r = i.get(e, t))
                  ? r
                  : null == (r = _.find.attr(e, t))
                  ? void 0
                  : r);
        },
        attrHooks: {
          type: {
            set: function (e, t) {
              if (!d.radioValue && "radio" === t && E(e, "input")) {
                var n = e.value;
                return e.setAttribute("type", t), n && (e.value = n), t;
              }
            },
          },
        },
        removeAttr: function (e, t) {
          var n,
            r = 0,
            i = t && t.match(P);
          if (i && 1 === e.nodeType)
            for (; (n = i[r++]); ) e.removeAttribute(n);
        },
      }),
      (te = {
        set: function (e, t, n) {
          return !1 === t ? _.removeAttr(e, n) : e.setAttribute(n, n), n;
        },
      }),
      _.each(_.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = tt[t] || _.find.attr;
        tt[t] = function (e, t, r) {
          var i,
            o,
            s = t.toLowerCase();
          return (
            r ||
              ((o = tt[s]),
              (tt[s] = i),
              (i = null != n(e, t, r) ? s : null),
              (tt[s] = o)),
            i
          );
        };
      });
    var tn = /^(?:input|select|textarea|button)$/i,
      tr = /^(?:a|area)$/i;
    function ti(e) {
      return (e.match(P) || []).join(" ");
    }
    function to(e) {
      return (e.getAttribute && e.getAttribute("class")) || "";
    }
    function ts(e) {
      return Array.isArray(e) ? e : ("string" == typeof e && e.match(P)) || [];
    }
    _.fn.extend({
      prop: function (e, t) {
        return F(this, _.prop, e, t, 1 < arguments.length);
      },
      removeProp: function (e) {
        return this.each(function () {
          delete this[_.propFix[e] || e];
        });
      },
    }),
      _.extend({
        prop: function (e, t, n) {
          var r,
            i,
            o = e.nodeType;
          if (3 !== o && 8 !== o && 2 !== o)
            return (
              (1 === o && _.isXMLDoc(e)) ||
                ((t = _.propFix[t] || t), (i = _.propHooks[t])),
              void 0 !== n
                ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                  ? r
                  : (e[t] = n)
                : i && "get" in i && null !== (r = i.get(e, t))
                ? r
                : e[t]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (e) {
              var t = _.find.attr(e, "tabindex");
              return t
                ? parseInt(t, 10)
                : tn.test(e.nodeName) || (tr.test(e.nodeName) && e.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      d.optSelected ||
        (_.propHooks.selected = {
          get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
          },
          set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
          },
        }),
      _.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          _.propFix[this.toLowerCase()] = this;
        }
      ),
      _.fn.extend({
        addClass: function (e) {
          var t,
            n,
            r,
            i,
            o,
            s,
            a,
            u = 0;
          if (h(e))
            return this.each(function (t) {
              _(this).addClass(e.call(this, t, to(this)));
            });
          if ((t = ts(e)).length) {
            for (; (n = this[u++]); )
              if (((i = to(n)), (r = 1 === n.nodeType && " " + ti(i) + " "))) {
                for (s = 0; (o = t[s++]); )
                  0 > r.indexOf(" " + o + " ") && (r += o + " ");
                i !== (a = ti(r)) && n.setAttribute("class", a);
              }
          }
          return this;
        },
        removeClass: function (e) {
          var t,
            n,
            r,
            i,
            o,
            s,
            a,
            u = 0;
          if (h(e))
            return this.each(function (t) {
              _(this).removeClass(e.call(this, t, to(this)));
            });
          if (!arguments.length) return this.attr("class", "");
          if ((t = ts(e)).length) {
            for (; (n = this[u++]); )
              if (((i = to(n)), (r = 1 === n.nodeType && " " + ti(i) + " "))) {
                for (s = 0; (o = t[s++]); )
                  for (; -1 < r.indexOf(" " + o + " "); )
                    r = r.replace(" " + o + " ", " ");
                i !== (a = ti(r)) && n.setAttribute("class", a);
              }
          }
          return this;
        },
        toggleClass: function (e, t) {
          var n = typeof e,
            r = "string" === n || Array.isArray(e);
          return "boolean" == typeof t && r
            ? t
              ? this.addClass(e)
              : this.removeClass(e)
            : h(e)
            ? this.each(function (n) {
                _(this).toggleClass(e.call(this, n, to(this), t), t);
              })
            : this.each(function () {
                var t, i, o, s;
                if (r)
                  for (i = 0, o = _(this), s = ts(e); (t = s[i++]); )
                    o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else
                  (void 0 !== e && "boolean" !== n) ||
                    ((t = to(this)) && Q.set(this, "__className__", t),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        t || !1 === e ? "" : Q.get(this, "__className__") || ""
                      ));
              });
        },
        hasClass: function (e) {
          var t,
            n,
            r = 0;
          for (t = " " + e + " "; (n = this[r++]); )
            if (1 === n.nodeType && -1 < (" " + ti(to(n)) + " ").indexOf(t))
              return !0;
          return !1;
        },
      });
    var ta = /\r/g;
    _.fn.extend({
      val: function (e) {
        var t,
          n,
          r,
          i = this[0];
        return arguments.length
          ? ((r = h(e)),
            this.each(function (n) {
              var i;
              1 === this.nodeType &&
                (null == (i = r ? e.call(this, n, _(this).val()) : e)
                  ? (i = "")
                  : "number" == typeof i
                  ? (i += "")
                  : Array.isArray(i) &&
                    (i = _.map(i, function (e) {
                      return null == e ? "" : e + "";
                    })),
                ((t =
                  _.valHooks[this.type] ||
                  _.valHooks[this.nodeName.toLowerCase()]) &&
                  "set" in t &&
                  void 0 !== t.set(this, i, "value")) ||
                  (this.value = i));
            }))
          : i
          ? (t = _.valHooks[i.type] || _.valHooks[i.nodeName.toLowerCase()]) &&
            "get" in t &&
            void 0 !== (n = t.get(i, "value"))
            ? n
            : "string" == typeof (n = i.value)
            ? n.replace(ta, "")
            : null == n
            ? ""
            : n
          : void 0;
      },
    }),
      _.extend({
        valHooks: {
          option: {
            get: function (e) {
              var t = _.find.attr(e, "value");
              return null != t ? t : ti(_.text(e));
            },
          },
          select: {
            get: function (e) {
              var t,
                n,
                r,
                i = e.options,
                o = e.selectedIndex,
                s = "select-one" === e.type,
                a = s ? null : [],
                u = s ? o + 1 : i.length;
              for (r = o < 0 ? u : s ? o : 0; r < u; r++)
                if (
                  ((n = i[r]).selected || r === o) &&
                  !n.disabled &&
                  (!n.parentNode.disabled || !E(n.parentNode, "optgroup"))
                ) {
                  if (((t = _(n).val()), s)) return t;
                  a.push(t);
                }
              return a;
            },
            set: function (e, t) {
              for (
                var n, r, i = e.options, o = _.makeArray(t), s = i.length;
                s--;

              )
                ((r = i[s]).selected =
                  -1 < _.inArray(_.valHooks.option.get(r), o)) && (n = !0);
              return n || (e.selectedIndex = -1), o;
            },
          },
        },
      }),
      _.each(["radio", "checkbox"], function () {
        (_.valHooks[this] = {
          set: function (e, t) {
            if (Array.isArray(t))
              return (e.checked = -1 < _.inArray(_(e).val(), t));
          },
        }),
          d.checkOn ||
            (_.valHooks[this].get = function (e) {
              return null === e.getAttribute("value") ? "on" : e.value;
            });
      }),
      (d.focusin = "onfocusin" in e);
    var tu = /^(?:focusinfocus|focusoutblur)$/,
      tl = function (e) {
        e.stopPropagation();
      };
    _.extend(_.event, {
      trigger: function (t, n, r, i) {
        var o,
          s,
          a,
          u,
          l,
          f,
          p,
          d,
          m = [r || v],
          y = c.call(t, "type") ? t.type : t,
          x = c.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((s = d = a = r = r || v),
          3 !== r.nodeType &&
            8 !== r.nodeType &&
            !tu.test(y + _.event.triggered) &&
            (-1 < y.indexOf(".") &&
              ((y = (x = y.split(".")).shift()), x.sort()),
            (l = 0 > y.indexOf(":") && "on" + y),
            ((t = t[_.expando]
              ? t
              : new _.Event(y, "object" == typeof t && t)).isTrigger = i
              ? 2
              : 3),
            (t.namespace = x.join(".")),
            (t.rnamespace = t.namespace
              ? RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = void 0),
            t.target || (t.target = r),
            (n = null == n ? [t] : _.makeArray(n, [t])),
            (p = _.event.special[y] || {}),
            i || !p.trigger || !1 !== p.trigger.apply(r, n)))
        ) {
          if (!i && !p.noBubble && !g(r)) {
            for (
              u = p.delegateType || y, tu.test(u + y) || (s = s.parentNode);
              s;
              s = s.parentNode
            )
              m.push(s), (a = s);
            a === (r.ownerDocument || v) &&
              m.push(a.defaultView || a.parentWindow || e);
          }
          for (o = 0; (s = m[o++]) && !t.isPropagationStopped(); )
            (d = s),
              (t.type = 1 < o ? u : p.bindType || y),
              (f =
                (Q.get(s, "events") || Object.create(null))[t.type] &&
                Q.get(s, "handle")) && f.apply(s, n),
              (f = l && s[l]) &&
                f.apply &&
                G(s) &&
                ((t.result = f.apply(s, n)),
                !1 === t.result && t.preventDefault());
          return (
            (t.type = y),
            i ||
              t.isDefaultPrevented() ||
              (p._default && !1 !== p._default.apply(m.pop(), n)) ||
              !G(r) ||
              (l &&
                h(r[y]) &&
                !g(r) &&
                ((a = r[l]) && (r[l] = null),
                (_.event.triggered = y),
                t.isPropagationStopped() && d.addEventListener(y, tl),
                r[y](),
                t.isPropagationStopped() && d.removeEventListener(y, tl),
                (_.event.triggered = void 0),
                a && (r[l] = a))),
            t.result
          );
        }
      },
      simulate: function (e, t, n) {
        var r = _.extend(new _.Event(), n, { type: e, isSimulated: !0 });
        _.event.trigger(r, null, t);
      },
    }),
      _.fn.extend({
        trigger: function (e, t) {
          return this.each(function () {
            _.event.trigger(e, t, this);
          });
        },
        triggerHandler: function (e, t) {
          var n = this[0];
          if (n) return _.event.trigger(e, t, n, !0);
        },
      }),
      d.focusin ||
        _.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
          var n = function (e) {
            _.event.simulate(t, e.target, _.event.fix(e));
          };
          _.event.special[t] = {
            setup: function () {
              var r = this.ownerDocument || this.document || this,
                i = Q.access(r, t);
              i || r.addEventListener(e, n, !0), Q.access(r, t, (i || 0) + 1);
            },
            teardown: function () {
              var r = this.ownerDocument || this.document || this,
                i = Q.access(r, t) - 1;
              i
                ? Q.access(r, t, i)
                : (r.removeEventListener(e, n, !0), Q.remove(r, t));
            },
          };
        });
    var tc = e.location,
      tf = { guid: Date.now() },
      tp = /\?/;
    _.parseXML = function (t) {
      var n, r;
      if (!t || "string" != typeof t) return null;
      try {
        n = new e.DOMParser().parseFromString(t, "text/xml");
      } catch (i) {}
      return (
        (r = n && n.getElementsByTagName("parsererror")[0]),
        (n && !r) ||
          _.error(
            "Invalid XML: " +
              (r
                ? _.map(r.childNodes, function (e) {
                    return e.textContent;
                  }).join("\n")
                : t)
          ),
        n
      );
    };
    var td = /\[\]$/,
      th = /\r?\n/g,
      tg = /^(?:submit|button|image|reset|file)$/i,
      tv = /^(?:input|select|textarea|keygen)/i;
    function tm(e, t, n, r) {
      var i;
      if (Array.isArray(t))
        _.each(t, function (t, i) {
          n || td.test(e)
            ? r(e, i)
            : tm(
                e + "[" + ("object" == typeof i && null != i ? t : "") + "]",
                i,
                n,
                r
              );
        });
      else if (n || "object" !== x(t)) r(e, t);
      else for (i in t) tm(e + "[" + i + "]", t[i], n, r);
    }
    (_.param = function (e, t) {
      var n,
        r = [],
        i = function (e, t) {
          var n = h(t) ? t() : t;
          r[r.length] =
            encodeURIComponent(e) +
            "=" +
            encodeURIComponent(null == n ? "" : n);
        };
      if (null == e) return "";
      if (Array.isArray(e) || (e.jquery && !_.isPlainObject(e)))
        _.each(e, function () {
          i(this.name, this.value);
        });
      else for (n in e) tm(n, e[n], t, i);
      return r.join("&");
    }),
      _.fn.extend({
        serialize: function () {
          return _.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var e = _.prop(this, "elements");
            return e ? _.makeArray(e) : this;
          })
            .filter(function () {
              var e = this.type;
              return (
                this.name &&
                !_(this).is(":disabled") &&
                tv.test(this.nodeName) &&
                !tg.test(e) &&
                (this.checked || !ed.test(e))
              );
            })
            .map(function (e, t) {
              var n = _(this).val();
              return null == n
                ? null
                : Array.isArray(n)
                ? _.map(n, function (e) {
                    return { name: t.name, value: e.replace(th, "\r\n") };
                  })
                : { name: t.name, value: n.replace(th, "\r\n") };
            })
            .get();
        },
      });
    var ty = /%20/g,
      t$ = /#.*$/,
      tx = /([?&])_=[^&]*/,
      tb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      t_ = /^(?:GET|HEAD)$/,
      tw = /^\/\//,
      tT = {},
      tC = {},
      tk = "*/".concat("*"),
      tS = v.createElement("a");
    function tE(e) {
      return function (t, n) {
        "string" != typeof t && ((n = t), (t = "*"));
        var r,
          i = 0,
          o = t.toLowerCase().match(P) || [];
        if (h(n))
          for (; (r = o[i++]); )
            "+" === r[0]
              ? (e[(r = r.slice(1) || "*")] = e[r] || []).unshift(n)
              : (e[r] = e[r] || []).push(n);
      };
    }
    function tN(e, t, n, r) {
      var i = {},
        o = e === tC;
      function s(a) {
        var u;
        return (
          (i[a] = !0),
          _.each(e[a] || [], function (e, a) {
            var l = a(t, n, r);
            return "string" != typeof l || o || i[l]
              ? o
                ? !(u = l)
                : void 0
              : (t.dataTypes.unshift(l), s(l), !1);
          }),
          u
        );
      }
      return s(t.dataTypes[0]) || (!i["*"] && s("*"));
    }
    function tD(e, t) {
      var n,
        r,
        i = _.ajaxSettings.flatOptions || {};
      for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
      return r && _.extend(!0, e, r), e;
    }
    (tS.href = tc.href),
      _.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: tc.href,
          type: "GET",
          isLocal:
            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
              tc.protocol
            ),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": tk,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": _.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (e, t) {
          return t ? tD(tD(e, _.ajaxSettings), t) : tD(_.ajaxSettings, e);
        },
        ajaxPrefilter: tE(tT),
        ajaxTransport: tE(tC),
        ajax: function (t, n) {
          "object" == typeof t && ((n = t), (t = void 0)), (n = n || {});
          var r,
            i,
            o,
            s,
            a,
            u,
            l,
            c,
            f,
            p,
            d = _.ajaxSetup({}, n),
            h = d.context || d,
            g = d.context && (h.nodeType || h.jquery) ? _(h) : _.event,
            m = _.Deferred(),
            y = _.Callbacks("once memory"),
            x = d.statusCode || {},
            b = {},
            w = {},
            T = "canceled",
            C = {
              readyState: 0,
              getResponseHeader: function (e) {
                var t;
                if (l) {
                  if (!s)
                    for (s = {}; (t = tb.exec(o)); )
                      s[t[1].toLowerCase() + " "] = (
                        s[t[1].toLowerCase() + " "] || []
                      ).concat(t[2]);
                  t = s[e.toLowerCase() + " "];
                }
                return null == t ? null : t.join(", ");
              },
              getAllResponseHeaders: function () {
                return l ? o : null;
              },
              setRequestHeader: function (e, t) {
                return (
                  null == l &&
                    (b[(e = w[e.toLowerCase()] = w[e.toLowerCase()] || e)] = t),
                  this
                );
              },
              overrideMimeType: function (e) {
                return null == l && (d.mimeType = e), this;
              },
              statusCode: function (e) {
                var t;
                if (e) {
                  if (l) C.always(e[C.status]);
                  else for (t in e) x[t] = [x[t], e[t]];
                }
                return this;
              },
              abort: function (e) {
                var t = e || T;
                return r && r.abort(t), E(0, t), this;
              },
            };
          if (
            (m.promise(C),
            (d.url = ((t || d.url || tc.href) + "").replace(
              tw,
              tc.protocol + "//"
            )),
            (d.type = n.method || n.type || d.method || d.type),
            (d.dataTypes = (d.dataType || "*").toLowerCase().match(P) || [""]),
            null == d.crossDomain)
          ) {
            u = v.createElement("a");
            try {
              (u.href = d.url),
                (u.href = u.href),
                (d.crossDomain =
                  tS.protocol + "//" + tS.host != u.protocol + "//" + u.host);
            } catch (k) {
              d.crossDomain = !0;
            }
          }
          if (
            (d.data &&
              d.processData &&
              "string" != typeof d.data &&
              (d.data = _.param(d.data, d.traditional)),
            tN(tT, d, n, C),
            l)
          )
            return C;
          for (f in ((c = _.event && d.global) &&
            0 == _.active++ &&
            _.event.trigger("ajaxStart"),
          (d.type = d.type.toUpperCase()),
          (d.hasContent = !t_.test(d.type)),
          (i = d.url.replace(t$, "")),
          d.hasContent
            ? d.data &&
              d.processData &&
              0 ===
                (d.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              (d.data = d.data.replace(ty, "+"))
            : ((p = d.url.slice(i.length)),
              d.data &&
                (d.processData || "string" == typeof d.data) &&
                ((i += (tp.test(i) ? "&" : "?") + d.data), delete d.data),
              !1 === d.cache &&
                ((i = i.replace(tx, "$1")),
                (p = (tp.test(i) ? "&" : "?") + "_=" + tf.guid++ + p)),
              (d.url = i + p)),
          d.ifModified &&
            (_.lastModified[i] &&
              C.setRequestHeader("If-Modified-Since", _.lastModified[i]),
            _.etag[i] && C.setRequestHeader("If-None-Match", _.etag[i])),
          ((d.data && d.hasContent && !1 !== d.contentType) || n.contentType) &&
            C.setRequestHeader("Content-Type", d.contentType),
          C.setRequestHeader(
            "Accept",
            d.dataTypes[0] && d.accepts[d.dataTypes[0]]
              ? d.accepts[d.dataTypes[0]] +
                  ("*" !== d.dataTypes[0] ? ", " + tk + "; q=0.01" : "")
              : d.accepts["*"]
          ),
          d.headers))
            C.setRequestHeader(f, d.headers[f]);
          if (d.beforeSend && (!1 === d.beforeSend.call(h, C, d) || l))
            return C.abort();
          if (
            ((T = "abort"),
            y.add(d.complete),
            C.done(d.success),
            C.fail(d.error),
            (r = tN(tC, d, n, C)))
          ) {
            if (((C.readyState = 1), c && g.trigger("ajaxSend", [C, d]), l))
              return C;
            d.async &&
              0 < d.timeout &&
              (a = e.setTimeout(function () {
                C.abort("timeout");
              }, d.timeout));
            try {
              (l = !1), r.send(b, E);
            } catch (S) {
              if (l) throw S;
              E(-1, S);
            }
          } else E(-1, "No Transport");
          function E(t, n, s, u) {
            var f,
              p,
              v,
              b,
              w,
              T = n;
            l ||
              ((l = !0),
              a && e.clearTimeout(a),
              (r = void 0),
              (o = u || ""),
              (C.readyState = 0 < t ? 4 : 0),
              (f = (200 <= t && t < 300) || 304 === t),
              s &&
                (b = (function (e, t, n) {
                  for (
                    var r, i, o, s, a = e.contents, u = e.dataTypes;
                    "*" === u[0];

                  )
                    u.shift(),
                      void 0 === r &&
                        (r = e.mimeType || t.getResponseHeader("Content-Type"));
                  if (r) {
                    for (i in a)
                      if (a[i] && a[i].test(r)) {
                        u.unshift(i);
                        break;
                      }
                  }
                  if (u[0] in n) o = u[0];
                  else {
                    for (i in n) {
                      if (!u[0] || e.converters[i + " " + u[0]]) {
                        o = i;
                        break;
                      }
                      s || (s = i);
                    }
                    o = o || s;
                  }
                  if (o) return o !== u[0] && u.unshift(o), n[o];
                })(d, C, s)),
              !f &&
                -1 < _.inArray("script", d.dataTypes) &&
                0 > _.inArray("json", d.dataTypes) &&
                (d.converters["text script"] = function () {}),
              (b = (function (e, t, n, r) {
                var i,
                  o,
                  s,
                  a,
                  u,
                  l = {},
                  c = e.dataTypes.slice();
                if (c[1])
                  for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
                for (o = c.shift(); o; )
                  if (
                    (e.responseFields[o] && (n[e.responseFields[o]] = t),
                    !u &&
                      r &&
                      e.dataFilter &&
                      (t = e.dataFilter(t, e.dataType)),
                    (u = o),
                    (o = c.shift()))
                  ) {
                    if ("*" === o) o = u;
                    else if ("*" !== u && u !== o) {
                      if (!(s = l[u + " " + o] || l["* " + o])) {
                        for (i in l)
                          if (
                            (a = i.split(" "))[1] === o &&
                            (s = l[u + " " + a[0]] || l["* " + a[0]])
                          ) {
                            !0 === s
                              ? (s = l[i])
                              : !0 !== l[i] && ((o = a[0]), c.unshift(a[1]));
                            break;
                          }
                      }
                      if (!0 !== s) {
                        if (s && e.throws) t = s(t);
                        else
                          try {
                            t = s(t);
                          } catch (f) {
                            return {
                              state: "parsererror",
                              error: s
                                ? f
                                : "No conversion from " + u + " to " + o,
                            };
                          }
                      }
                    }
                  }
                return { state: "success", data: t };
              })(d, b, C, f)),
              f
                ? (d.ifModified &&
                    ((w = C.getResponseHeader("Last-Modified")) &&
                      (_.lastModified[i] = w),
                    (w = C.getResponseHeader("etag")) && (_.etag[i] = w)),
                  204 === t || "HEAD" === d.type
                    ? (T = "nocontent")
                    : 304 === t
                    ? (T = "notmodified")
                    : ((T = b.state), (p = b.data), (f = !(v = b.error))))
                : ((v = T), (!t && T) || ((T = "error"), t < 0 && (t = 0))),
              (C.status = t),
              (C.statusText = (n || T) + ""),
              f ? m.resolveWith(h, [p, T, C]) : m.rejectWith(h, [C, T, v]),
              C.statusCode(x),
              (x = void 0),
              c &&
                g.trigger(f ? "ajaxSuccess" : "ajaxError", [C, d, f ? p : v]),
              y.fireWith(h, [C, T]),
              c &&
                (g.trigger("ajaxComplete", [C, d]),
                --_.active || _.event.trigger("ajaxStop")));
          }
          return C;
        },
        getJSON: function (e, t, n) {
          return _.get(e, t, n, "json");
        },
        getScript: function (e, t) {
          return _.get(e, void 0, t, "script");
        },
      }),
      _.each(["get", "post"], function (e, t) {
        _[t] = function (e, n, r, i) {
          return (
            h(n) && ((i = i || r), (r = n), (n = void 0)),
            _.ajax(
              _.extend(
                { url: e, type: t, dataType: i, data: n, success: r },
                _.isPlainObject(e) && e
              )
            )
          );
        };
      }),
      _.ajaxPrefilter(function (e) {
        var t;
        for (t in e.headers)
          "content-type" === t.toLowerCase() &&
            (e.contentType = e.headers[t] || "");
      }),
      (_._evalUrl = function (e, t, n) {
        return _.ajax({
          url: e,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          converters: { "text script": function () {} },
          dataFilter: function (e) {
            _.globalEval(e, t, n);
          },
        });
      }),
      _.fn.extend({
        wrapAll: function (e) {
          var t;
          return (
            this[0] &&
              (h(e) && (e = e.call(this[0])),
              (t = _(e, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && t.insertBefore(this[0]),
              t
                .map(function () {
                  for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                  return e;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (e) {
          return h(e)
            ? this.each(function (t) {
                _(this).wrapInner(e.call(this, t));
              })
            : this.each(function () {
                var t = _(this),
                  n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
              });
        },
        wrap: function (e) {
          var t = h(e);
          return this.each(function (n) {
            _(this).wrapAll(t ? e.call(this, n) : e);
          });
        },
        unwrap: function (e) {
          return (
            this.parent(e)
              .not("body")
              .each(function () {
                _(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (_.expr.pseudos.hidden = function (e) {
        return !_.expr.pseudos.visible(e);
      }),
      (_.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }),
      (_.ajaxSettings.xhr = function () {
        try {
          return new e.XMLHttpRequest();
        } catch (t) {}
      });
    var tA = { 0: 200, 1223: 204 },
      tj = _.ajaxSettings.xhr();
    (d.cors = !!tj && "withCredentials" in tj),
      (d.ajax = tj = !!tj),
      _.ajaxTransport(function (t) {
        var n, r;
        if (d.cors || (tj && !t.crossDomain))
          return {
            send: function (i, o) {
              var s,
                a = t.xhr();
              if (
                (a.open(t.type, t.url, t.async, t.username, t.password),
                t.xhrFields)
              )
                for (s in t.xhrFields) a[s] = t.xhrFields[s];
              for (s in (t.mimeType &&
                a.overrideMimeType &&
                a.overrideMimeType(t.mimeType),
              t.crossDomain ||
                i["X-Requested-With"] ||
                (i["X-Requested-With"] = "XMLHttpRequest"),
              i))
                a.setRequestHeader(s, i[s]);
              (n = function (e) {
                return function () {
                  n &&
                    ((n =
                      r =
                      a.onload =
                      a.onerror =
                      a.onabort =
                      a.ontimeout =
                      a.onreadystatechange =
                        null),
                    "abort" === e
                      ? a.abort()
                      : "error" === e
                      ? "number" != typeof a.status
                        ? o(0, "error")
                        : o(a.status, a.statusText)
                      : o(
                          tA[a.status] || a.status,
                          a.statusText,
                          "text" !== (a.responseType || "text") ||
                            "string" != typeof a.responseText
                            ? { binary: a.response }
                            : { text: a.responseText },
                          a.getAllResponseHeaders()
                        ));
                };
              }),
                (a.onload = n()),
                (r = a.onerror = a.ontimeout = n("error")),
                void 0 !== a.onabort
                  ? (a.onabort = r)
                  : (a.onreadystatechange = function () {
                      4 === a.readyState &&
                        e.setTimeout(function () {
                          n && r();
                        });
                    }),
                (n = n("abort"));
              try {
                a.send((t.hasContent && t.data) || null);
              } catch (u) {
                if (n) throw u;
              }
            },
            abort: function () {
              n && n();
            },
          };
      }),
      _.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1);
      }),
      _.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (e) {
            return _.globalEval(e), e;
          },
        },
      }),
      _.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
      }),
      _.ajaxTransport("script", function (e) {
        var t, n;
        if (e.crossDomain || e.scriptAttrs)
          return {
            send: function (r, i) {
              (t = _("<script>")
                .attr(e.scriptAttrs || {})
                .prop({ charset: e.scriptCharset, src: e.url })
                .on(
                  "load error",
                  (n = function (e) {
                    t.remove(),
                      (n = null),
                      e && i("error" === e.type ? 404 : 200, e.type);
                  })
                )),
                v.head.appendChild(t[0]);
            },
            abort: function () {
              n && n();
            },
          };
      });
    var tL,
      tq = [],
      tH = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var e = tq.pop() || _.expando + "_" + tf.guid++;
        return (this[e] = !0), e;
      },
    }),
      _.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i,
          o,
          s,
          a =
            !1 !== t.jsonp &&
            (tH.test(t.url)
              ? "url"
              : "string" == typeof t.data &&
                0 ===
                  (t.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                tH.test(t.data) &&
                "data");
        if (a || "jsonp" === t.dataTypes[0])
          return (
            (i = t.jsonpCallback =
              h(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
            a
              ? (t[a] = t[a].replace(tH, "$1" + i))
              : !1 !== t.jsonp &&
                (t.url += (tp.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
            (t.converters["script json"] = function () {
              return s || _.error(i + " was not called"), s[0];
            }),
            (t.dataTypes[0] = "json"),
            (o = e[i]),
            (e[i] = function () {
              s = arguments;
            }),
            r.always(function () {
              void 0 === o ? _(e).removeProp(i) : (e[i] = o),
                t[i] && ((t.jsonpCallback = n.jsonpCallback), tq.push(i)),
                s && h(o) && o(s[0]),
                (s = o = void 0);
            }),
            "script"
          );
      }),
      (d.createHTMLDocument =
        (((tL = v.implementation.createHTMLDocument("").body).innerHTML =
          "<form></form><form></form>"),
        2 === tL.childNodes.length)),
      (_.parseHTML = function (e, t, n) {
        var r, i, o;
        return "string" != typeof e
          ? []
          : ("boolean" == typeof t && ((n = t), (t = !1)),
            t ||
              (d.createHTMLDocument
                ? (((r = (t =
                    v.implementation.createHTMLDocument("")).createElement(
                    "base"
                  )).href = v.location.href),
                  t.head.appendChild(r))
                : (t = v)),
            (o = !n && []),
            (i = N.exec(e))
              ? [t.createElement(i[1])]
              : ((i = ex([e], t, o)),
                o && o.length && _(o).remove(),
                _.merge([], i.childNodes)));
      }),
      (_.fn.load = function (e, t, n) {
        var r,
          i,
          o,
          s = this,
          a = e.indexOf(" ");
        return (
          -1 < a && ((r = ti(e.slice(a))), (e = e.slice(0, a))),
          h(t)
            ? ((n = t), (t = void 0))
            : t && "object" == typeof t && (i = "POST"),
          0 < s.length &&
            _.ajax({ url: e, type: i || "GET", dataType: "html", data: t })
              .done(function (e) {
                (o = arguments),
                  s.html(r ? _("<div>").append(_.parseHTML(e)).find(r) : e);
              })
              .always(
                n &&
                  function (e, t) {
                    s.each(function () {
                      n.apply(this, o || [e.responseText, t, e]);
                    });
                  }
              ),
          this
        );
      }),
      (_.expr.pseudos.animated = function (e) {
        return _.grep(_.timers, function (t) {
          return e === t.elem;
        }).length;
      }),
      (_.offset = {
        setOffset: function (e, t, n) {
          var r,
            i,
            o,
            s,
            a,
            u,
            l = _.css(e, "position"),
            c = _(e),
            f = {};
          "static" === l && (e.style.position = "relative"),
            (a = c.offset()),
            (o = _.css(e, "top")),
            (u = _.css(e, "left")),
            ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto")
              ? ((s = (r = c.position()).top), (i = r.left))
              : ((s = parseFloat(o) || 0), (i = parseFloat(u) || 0)),
            h(t) && (t = t.call(e, n, _.extend({}, a))),
            null != t.top && (f.top = t.top - a.top + s),
            null != t.left && (f.left = t.left - a.left + i),
            "using" in t ? t.using.call(e, f) : c.css(f);
        },
      }),
      _.fn.extend({
        offset: function (e) {
          if (arguments.length)
            return void 0 === e
              ? this
              : this.each(function (t) {
                  _.offset.setOffset(this, e, t);
                });
          var t,
            n,
            r = this[0];
          return r
            ? r.getClientRects().length
              ? ((t = r.getBoundingClientRect()),
                (n = r.ownerDocument.defaultView),
                { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset })
              : { top: 0, left: 0 }
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var e,
              t,
              n,
              r = this[0],
              i = { top: 0, left: 0 };
            if ("fixed" === _.css(r, "position")) t = r.getBoundingClientRect();
            else {
              for (
                t = this.offset(),
                  n = r.ownerDocument,
                  e = r.offsetParent || n.documentElement;
                e &&
                (e === n.body || e === n.documentElement) &&
                "static" === _.css(e, "position");

              )
                e = e.parentNode;
              e &&
                e !== r &&
                1 === e.nodeType &&
                (((i = _(e).offset()).top += _.css(e, "borderTopWidth", !0)),
                (i.left += _.css(e, "borderLeftWidth", !0)));
            }
            return {
              top: t.top - i.top - _.css(r, "marginTop", !0),
              left: t.left - i.left - _.css(r, "marginLeft", !0),
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var e = this.offsetParent;
              e && "static" === _.css(e, "position");

            )
              e = e.offsetParent;
            return e || ei;
          });
        },
      }),
      _.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (e, t) {
          var n = "pageYOffset" === t;
          _.fn[e] = function (r) {
            return F(
              this,
              function (e, r, i) {
                var o;
                if (
                  (g(e) ? (o = e) : 9 === e.nodeType && (o = e.defaultView),
                  void 0 === i)
                )
                  return o ? o[t] : e[r];
                o
                  ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset)
                  : (e[r] = i);
              },
              e,
              r,
              arguments.length
            );
          };
        }
      ),
      _.each(["top", "left"], function (e, t) {
        _.cssHooks[t] = eW(d.pixelPosition, function (e, n) {
          if (n)
            return (n = eM(e, t)), eP.test(n) ? _(e).position()[t] + "px" : n;
        });
      }),
      _.each({ Height: "height", Width: "width" }, function (e, t) {
        _.each(
          { padding: "inner" + e, content: t, "": "outer" + e },
          function (n, r) {
            _.fn[r] = function (i, o) {
              var s = arguments.length && (n || "boolean" != typeof i),
                a = n || (!0 === i || !0 === o ? "margin" : "border");
              return F(
                this,
                function (t, n, i) {
                  var o;
                  return g(t)
                    ? 0 === r.indexOf("outer")
                      ? t["inner" + e]
                      : t.document.documentElement["client" + e]
                    : 9 === t.nodeType
                    ? ((o = t.documentElement),
                      Math.max(
                        t.body["scroll" + e],
                        o["scroll" + e],
                        t.body["offset" + e],
                        o["offset" + e],
                        o["client" + e]
                      ))
                    : void 0 === i
                    ? _.css(t, n, a)
                    : _.style(t, n, i, a);
                },
                t,
                s ? i : void 0,
                s
              );
            };
          }
        );
      }),
      _.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (e, t) {
          _.fn[t] = function (e) {
            return this.on(t, e);
          };
        }
      ),
      _.fn.extend({
        bind: function (e, t, n) {
          return this.on(e, null, t, n);
        },
        unbind: function (e, t) {
          return this.off(e, null, t);
        },
        delegate: function (e, t, n, r) {
          return this.on(t, e, n, r);
        },
        undelegate: function (e, t, n) {
          return 1 === arguments.length
            ? this.off(e, "**")
            : this.off(t, e || "**", n);
        },
        hover: function (e, t) {
          return this.mouseenter(e).mouseleave(t || e);
        },
      }),
      _.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (e, t) {
          _.fn[t] = function (e, n) {
            return 0 < arguments.length
              ? this.on(t, null, e, n)
              : this.trigger(t);
          };
        }
      );
    var tP = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    (_.proxy = function (e, t) {
      var n, r, o;
      if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), h(e)))
        return (
          (r = i.call(arguments, 2)),
          ((o = function () {
            return e.apply(t || this, r.concat(i.call(arguments)));
          }).guid = e.guid =
            e.guid || _.guid++),
          o
        );
    }),
      (_.holdReady = function (e) {
        e ? _.readyWait++ : _.ready(!0);
      }),
      (_.isArray = Array.isArray),
      (_.parseJSON = JSON.parse),
      (_.nodeName = E),
      (_.isFunction = h),
      (_.isWindow = g),
      (_.camelCase = V),
      (_.type = x),
      (_.now = Date.now),
      (_.isNumeric = function (e) {
        var t = _.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
      }),
      (_.trim = function (e) {
        return null == e ? "" : (e + "").replace(tP, "");
      }),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return _;
        });
    var tO = e.jQuery,
      t0 = e.$;
    return (
      (_.noConflict = function (t) {
        return (
          e.$ === _ && (e.$ = t0), t && e.jQuery === _ && (e.jQuery = tO), _
        );
      }),
      void 0 === t && (e.jQuery = e.$ = _),
      _
    );
  }),
  (jQuery.event.special.touchstart = {
    setup: function (e, t, n) {
      this.addEventListener("touchstart", n, {
        passive: !t.includes("noPreventDefault"),
      });
    },
  }),
  (jQuery.event.special.touchmove = {
    setup: function (e, t, n) {
      this.addEventListener("touchmove", n, {
        passive: !t.includes("noPreventDefault"),
      });
    },
  }),
  (jQuery.event.special.wheel = {
    setup: function (e, t, n) {
      this.addEventListener("wheel", n, { passive: !0 });
    },
  }),
  (jQuery.event.special.mousewheel = {
    setup: function (e, t, n) {
      this.addEventListener("mousewheel", n, { passive: !0 });
    },
  }),
  is_admin_interface || $.holdReady(!1));
