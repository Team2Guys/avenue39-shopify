"object" != typeof JSON && (JSON = {}),
  (function () {
    "use strict";
    function f(e) {
      return e < 10 ? "0" + e : e;
    }
    function quote(e) {
      return (
        (escapable.lastIndex = 0),
        escapable.test(e)
          ? '"' +
            e.replace(escapable, function (e) {
              var t = meta[e];
              return "string" == typeof t
                ? t
                : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + e + '"'
      );
    }
    function str(e, t) {
      var a,
        r,
        n,
        o,
        s,
        i = gap,
        u = t[e];
      switch (
        (u &&
          "object" == typeof u &&
          "function" == typeof u.toJSON &&
          (u = u.toJSON(e)),
        "function" == typeof rep && (u = rep.call(t, e, u)),
        typeof u)
      ) {
        case "string":
          return quote(u);
        case "number":
          return isFinite(u) ? String(u) : "null";
        case "boolean":
        case "null":
          return String(u);
        case "object":
          if (!u) return "null";
          if (
            ((gap += indent),
            (s = []),
            "[object Array]" === Object.prototype.toString.apply(u))
          ) {
            for (o = u.length, a = 0; a < o; a += 1) s[a] = str(a, u) || "null";
            return (
              (n =
                0 === s.length
                  ? "[]"
                  : gap
                  ? "[\n" + gap + s.join(",\n" + gap) + "\n" + i + "]"
                  : "[" + s.join(",") + "]"),
              (gap = i),
              n
            );
          }
          if (rep && "object" == typeof rep)
            for (o = rep.length, a = 0; a < o; a += 1)
              "string" == typeof rep[a] &&
                (n = str((r = rep[a]), u)) &&
                s.push(quote(r) + (gap ? ": " : ":") + n);
          else
            for (r in u)
              Object.prototype.hasOwnProperty.call(u, r) &&
                (n = str(r, u)) &&
                s.push(quote(r) + (gap ? ": " : ":") + n);
          return (
            (n =
              0 === s.length
                ? "{}"
                : gap
                ? "{\n" + gap + s.join(",\n" + gap) + "\n" + i + "}"
                : "{" + s.join(",") + "}"),
            (gap = i),
            n
          );
      }
    }
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function (e) {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      }),
      (String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function (e) {
            return this.valueOf();
          }));
    var gap,
      indent,
      rep,
      cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      meta = {
        "\b": "\\b",
        "  ": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      };
    "function" != typeof JSON.stringify &&
      (JSON.stringify = function (e, t, a) {
        var r;
        if (((indent = gap = ""), "number" == typeof a))
          for (r = 0; r < a; r += 1) indent += " ";
        else "string" == typeof a && (indent = a);
        if (
          !(rep = t) ||
          "function" == typeof t ||
          ("object" == typeof t && "number" == typeof t.length)
        )
          return str("", { "": e });
        throw Error("JSON.stringify");
      }),
      "function" != typeof JSON.parse &&
        (JSON.parse = function (text, reviver) {
          var j;
          function walk(e, t) {
            var a,
              r,
              n = e[t];
            if (n && "object" == typeof n)
              for (a in n)
                Object.prototype.hasOwnProperty.call(n, a) &&
                  (void 0 !== (r = walk(n, a)) ? (n[a] = r) : delete n[a]);
            return reviver.call(e, t, n);
          }
          if (
            ((text = String(text)),
            (cx.lastIndex = 0),
            cx.test(text) &&
              (text = text.replace(cx, function (e) {
                return (
                  "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                );
              })),
            /^[\],:{}\s]*$/.test(
              text
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            ))
          )
            return (
              (j = eval("(" + text + ")")),
              "function" == typeof reviver ? walk({ "": j }, "") : j
            );
          throw SyntaxError("JSON.parse");
        });
  })(),
  (function (e) {
    "use strict";
    var t = (e.History = e.History || {}),
      a = e.jQuery;
    if (void 0 !== t.Adapter)
      throw Error("History.js Adapter has already been loaded...");
    (t.Adapter = {
      bind: function (e, t, r) {
        a(e).bind(t, r);
      },
      trigger: function (e, t, r) {
        a(e).trigger(t, r);
      },
      extractEventData: function (e, t, a) {
        return (
          (t && t.originalEvent && t.originalEvent[e]) || (a && a[e]) || void 0
        );
      },
      onDomLoad: function (e) {
        a(e);
      },
    }),
      void 0 !== t.init && t.init();
  })(window),
  (function (e) {
    "use strict";
    var t = e.document,
      a = e.setTimeout || a,
      r = e.clearTimeout || r,
      n = e.setInterval || n,
      o = (e.History = e.History || {});
    if (void 0 !== o.initHtml4)
      throw Error("History.js HTML4 Support has already been loaded...");
    (o.initHtml4 = function () {
      if (void 0 !== o.initHtml4.initialized) return !1;
      (o.initHtml4.initialized = !0),
        (o.enabled = !0),
        (o.savedHashes = []),
        (o.isLastHash = function (e) {
          return e === o.getHashByIndex();
        }),
        (o.isHashEqual = function (e, t) {
          return (
            (e = encodeURIComponent(e).replace(/%25/g, "%")) ===
            (t = encodeURIComponent(t).replace(/%25/g, "%"))
          );
        }),
        (o.saveHash = function (e) {
          return !o.isLastHash(e) && (o.savedHashes.push(e), !0);
        }),
        (o.getHashByIndex = function (e) {
          return void 0 === e
            ? o.savedHashes[o.savedHashes.length - 1]
            : e < 0
            ? o.savedHashes[o.savedHashes.length + e]
            : o.savedHashes[e];
        }),
        (o.discardedHashes = {}),
        (o.discardedStates = {}),
        (o.discardState = function (e, t, a) {
          var r,
            n = o.getHashByState(e);
          return (
            (r = { discardedState: e, backState: a, forwardState: t }),
            (o.discardedStates[n] = r),
            !0
          );
        }),
        (o.discardHash = function (e, t, a) {
          var r = { discardedHash: e, backState: a, forwardState: t };
          return (o.discardedHashes[e] = r), !0;
        }),
        (o.discardedState = function (e) {
          var t = o.getHashByState(e);
          return o.discardedStates[t] || !1;
        }),
        (o.discardedHash = function (e) {
          return o.discardedHashes[e] || !1;
        }),
        (o.recycleState = function (e) {
          var t = o.getHashByState(e);
          return o.discardedState(e) && delete o.discardedStates[t], !0;
        }),
        o.emulated.hashChange &&
          ((o.hashChangeInit = function () {
            o.checkerFunction = null;
            var a,
              r,
              s,
              i = "",
              u = Boolean(o.getHash());
            return (
              o.isInternetExplorer()
                ? ((a = t.createElement("iframe")).setAttribute(
                    "id",
                    "historyjs-iframe"
                  ),
                  a.setAttribute("src", "#"),
                  (a.style.display = "none"),
                  t.body.appendChild(a),
                  a.contentWindow.document.open(),
                  a.contentWindow.document.close(),
                  (r = ""),
                  (s = !1),
                  (o.checkerFunction = function () {
                    if (s) return !1;
                    s = !0;
                    var t = o.getHash(),
                      n = o.getHash(a.contentWindow.document);
                    return (
                      t !== i
                        ? (n !== (i = t) &&
                            ((r = n = t),
                            a.contentWindow.document.open(),
                            a.contentWindow.document.close(),
                            (a.contentWindow.document.location.hash =
                              o.escapeHash(t))),
                          o.Adapter.trigger(e, "hashchange"))
                        : n !== r &&
                          ((r = n),
                          u && "" === n ? o.back() : o.setHash(n, !1)),
                      (s = !1),
                      !0
                    );
                  }))
                : (o.checkerFunction = function () {
                    var t = o.getHash() || "";
                    return (
                      t !== i && ((i = t), o.Adapter.trigger(e, "hashchange")),
                      !0
                    );
                  }),
              o.intervalList.push(
                n(o.checkerFunction, o.options.hashChangeInterval)
              ),
              !0
            );
          }),
          o.Adapter.onDomLoad(o.hashChangeInit)),
        o.emulated.pushState &&
          ((o.onHashChange = function (t) {
            var a,
              r = (t && t.newURL) || o.getLocationHref(),
              n = o.getHashByUrl(r),
              s = null;
            return o.isLastHash(n)
              ? (o.busy(!1), !1)
              : (o.doubleCheckComplete(),
                o.saveHash(n),
                n && o.isTraditionalAnchor(n)
                  ? (o.Adapter.trigger(e, "anchorchange"), o.busy(!1), !1)
                  : ((s = o.extractState(
                      o.getFullUrl(n || o.getLocationHref()),
                      !0
                    )),
                    o.isLastSavedState(s)
                      ? (o.busy(!1), !1)
                      : (o.getHashByState(s),
                        (a = o.discardedState(s))
                          ? (o.getHashByIndex(-2) ===
                            o.getHashByState(a.forwardState)
                              ? o.back(!1)
                              : o.forward(!1),
                            !1)
                          : (o.pushState(s.data, s.title, encodeURI(s.url), !1),
                            !0))));
          }),
          o.Adapter.bind(e, "hashchange", o.onHashChange),
          (o.pushState = function (t, a, r, n) {
            if (((r = encodeURI(r).replace(/%25/g, "%")), o.getHashByUrl(r)))
              throw Error(
                "History.js does not support states with fragment-identifiers (hashes/anchors)."
              );
            if (!1 !== n && o.busy())
              return (
                o.pushQueue({
                  scope: o,
                  callback: o.pushState,
                  args: arguments,
                  queue: n,
                }),
                !1
              );
            o.busy(!0);
            var s = o.createStateObject(t, a, r),
              i = o.getHashByState(s),
              u = o.getState(!1),
              l = o.getHashByState(u),
              c = o.getHash(),
              d = o.expectedStateId == s.id;
            return (
              o.storeState(s),
              (o.expectedStateId = s.id),
              o.recycleState(s),
              o.setTitle(s),
              i === l
                ? (o.busy(!1), !1)
                : (o.saveState(s),
                  d || o.Adapter.trigger(e, "statechange"),
                  o.isHashEqual(i, c) ||
                    o.isHashEqual(i, o.getShortUrl(o.getLocationHref())) ||
                    o.setHash(i, !1),
                  o.busy(!1),
                  !0)
            );
          }),
          (o.replaceState = function (t, a, r, n) {
            if (((r = encodeURI(r).replace(/%25/g, "%")), o.getHashByUrl(r)))
              throw Error(
                "History.js does not support states with fragment-identifiers (hashes/anchors)."
              );
            if (!1 !== n && o.busy())
              return (
                o.pushQueue({
                  scope: o,
                  callback: o.replaceState,
                  args: arguments,
                  queue: n,
                }),
                !1
              );
            o.busy(!0);
            var s = o.createStateObject(t, a, r),
              i = o.getHashByState(s),
              u = o.getState(!1),
              l = o.getHashByState(u),
              c = o.getStateByIndex(-2);
            return (
              o.discardState(u, s, c),
              i === l
                ? (o.storeState(s),
                  (o.expectedStateId = s.id),
                  o.recycleState(s),
                  o.setTitle(s),
                  o.saveState(s),
                  o.Adapter.trigger(e, "statechange"),
                  o.busy(!1))
                : o.pushState(s.data, s.title, s.url, !1),
              !0
            );
          })),
        o.emulated.pushState &&
          o.getHash() &&
          !o.emulated.hashChange &&
          o.Adapter.onDomLoad(function () {
            o.Adapter.trigger(e, "hashchange");
          });
    }),
      void 0 !== o.init && o.init();
  })(window),
  (function (e, t) {
    "use strict";
    var a = e.console || t,
      r = e.document,
      n = e.navigator,
      o = !1,
      s = e.setTimeout,
      i = e.clearTimeout,
      u = e.setInterval,
      l = e.clearInterval,
      c = e.JSON,
      d = e.alert,
      h = (e.History = e.History || {}),
      p = e.history;
    try {
      (o = e.sessionStorage).setItem("TEST", "1"), o.removeItem("TEST");
    } catch (f) {
      o = !1;
    }
    if (
      ((c.stringify = c.stringify || c.encode),
      (c.parse = c.parse || c.decode),
      void 0 !== h.init)
    )
      throw Error("History.js Core has already been loaded...");
    (h.init = function (e) {
      return (
        void 0 !== h.Adapter &&
        (void 0 !== h.initCore && h.initCore(),
        void 0 !== h.initHtml4 && h.initHtml4(),
        !0)
      );
    }),
      (h.initCore = function (f) {
        if (void 0 !== h.initCore.initialized) return !1;
        if (
          ((h.initCore.initialized = !0),
          (h.options = h.options || {}),
          (h.options.hashChangeInterval = h.options.hashChangeInterval || 100),
          (h.options.safariPollInterval = h.options.safariPollInterval || 500),
          (h.options.doubleCheckInterval =
            h.options.doubleCheckInterval || 500),
          (h.options.disableSuid = h.options.disableSuid || !1),
          (h.options.storeInterval = h.options.storeInterval || 1e3),
          (h.options.busyDelay = h.options.busyDelay || 250),
          (h.options.debug = h.options.debug || !1),
          (h.options.initialTitle = h.options.initialTitle || r.title),
          (h.options.html4Mode = h.options.html4Mode || !1),
          (h.options.delayInit = h.options.delayInit || !1),
          (h.intervalList = []),
          (h.clearAllIntervals = function () {
            var e,
              t = h.intervalList;
            if (null != t) {
              for (e = 0; e < t.length; e++) l(t[e]);
              h.intervalList = null;
            }
          }),
          (h.debug = function () {
            h.options.debug && h.log.apply(h, arguments);
          }),
          (h.log = function () {
            var e,
              t,
              n,
              o,
              s,
              i = void 0 !== a && void 0 !== a.log && void 0 !== a.log.apply,
              u = r.getElementById("log");
            for (
              i
                ? ((e = (o = Array.prototype.slice.call(arguments)).shift()),
                  void 0 !== a.debug
                    ? a.debug.apply(a, [e, o])
                    : a.log.apply(a, [e, o]))
                : (e = "\n" + arguments[0] + "\n"),
                t = 1,
                n = arguments.length;
              t < n;
              ++t
            ) {
              if ("object" == typeof (s = arguments[t]) && void 0 !== c)
                try {
                  s = c.stringify(s);
                } catch (l) {}
              e += "\n" + s + "\n";
            }
            return (
              u
                ? ((u.value += e + "\n-----\n"),
                  (u.scrollTop = u.scrollHeight - u.clientHeight))
                : i || d(e),
              !0
            );
          }),
          (h.getInternetExplorerMajorVersion = function () {
            return (h.getInternetExplorerMajorVersion.cached =
              void 0 !== h.getInternetExplorerMajorVersion.cached
                ? h.getInternetExplorerMajorVersion.cached
                : (function () {
                    for (
                      var e = 3,
                        t = r.createElement("div"),
                        a = t.getElementsByTagName("i");
                      (t.innerHTML =
                        "<!--[if gt IE " + ++e + "]><i></i><![endif]-->"),
                        a[0];

                    );
                    return 4 < e && e;
                  })());
          }),
          (h.isInternetExplorer = function () {
            return (h.isInternetExplorer.cached =
              void 0 !== h.isInternetExplorer.cached
                ? h.isInternetExplorer.cached
                : Boolean(h.getInternetExplorerMajorVersion()));
          }),
          h.options.html4Mode
            ? (h.emulated = { pushState: !0, hashChange: !0 })
            : (h.emulated = {
                pushState: !Boolean(
                  e.history &&
                    e.history.pushState &&
                    e.history.replaceState &&
                    !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(
                      n.userAgent
                    ) &&
                    !/AppleWebKit\/5([0-2]|3[0-2])/i.test(n.userAgent)
                ),
                hashChange: Boolean(
                  !("onhashchange" in e || "onhashchange" in r) ||
                    (h.isInternetExplorer() &&
                      8 > h.getInternetExplorerMajorVersion())
                ),
              }),
          (h.enabled = !h.emulated.pushState),
          (h.bugs = {
            setHash: Boolean(
              !h.emulated.pushState &&
                "Apple Computer, Inc." === n.vendor &&
                /AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)
            ),
            safariPoll: Boolean(
              !h.emulated.pushState &&
                "Apple Computer, Inc." === n.vendor &&
                /AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)
            ),
            ieDoubleCheck: Boolean(
              h.isInternetExplorer() && 8 > h.getInternetExplorerMajorVersion()
            ),
            hashEscape: Boolean(
              h.isInternetExplorer() && 7 > h.getInternetExplorerMajorVersion()
            ),
          }),
          (h.isEmptyObject = function (e) {
            for (var t in e) if (e.hasOwnProperty(t)) return !1;
            return !0;
          }),
          (h.cloneObject = function (e) {
            var t;
            return e ? ((t = c.stringify(e)), c.parse(t)) : {};
          }),
          (h.getRootUrl = function () {
            var e =
              r.location.protocol +
              "//" +
              (r.location.hostname || r.location.host);
            return r.location.port && (e += ":" + r.location.port), (e += "/");
          }),
          (h.getBaseHref = function () {
            var e = r.getElementsByTagName("base"),
              t = "";
            return (
              1 === e.length && (t = e[0].href.replace(/[^\/]+$/, "")),
              (t = t.replace(/\/+$/, "")) && (t += "/"),
              t
            );
          }),
          (h.getBaseUrl = function () {
            return h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();
          }),
          (h.getPageUrl = function () {
            return ((h.getState(!1, !1) || {}).url || h.getLocationHref())
              .replace(/\/+$/, "")
              .replace(/[^\/]+$/, function (e, t, a) {
                return /\./.test(e) ? e : e + "/";
              });
          }),
          (h.getBasePageUrl = function () {
            return (
              h
                .getLocationHref()
                .replace(/[#\?].*/, "")
                .replace(/[^\/]+$/, function (e, t, a) {
                  return /[^\/]$/.test(e) ? "" : e;
                })
                .replace(/\/+$/, "") + "/"
            );
          }),
          (h.getFullUrl = function (e, t) {
            var a = e,
              r = e.substring(0, 1);
            return (
              (t = void 0 === t || t),
              /[a-z]+\:\/\//.test(e) ||
                (a =
                  "/" === r
                    ? h.getRootUrl() + e.replace(/^\/+/, "")
                    : "#" === r
                    ? h.getPageUrl().replace(/#.*/, "") + e
                    : "?" === r
                    ? h.getPageUrl().replace(/[\?#].*/, "") + e
                    : t
                    ? h.getBaseUrl() + e.replace(/^(\.\/)+/, "")
                    : h.getBasePageUrl() + e.replace(/^(\.\/)+/, "")),
              a.replace(/\#$/, "")
            );
          }),
          (h.getShortUrl = function (e) {
            var t = e,
              a = h.getBaseUrl(),
              r = h.getRootUrl();
            return (
              h.emulated.pushState && (t = t.replace(a, "")),
              (t = t.replace(r, "/")),
              h.isTraditionalAnchor(t) && (t = "./" + t),
              (t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""))
            );
          }),
          (h.getLocationHref = function (e) {
            return (e = e || r).URL === e.location.href
              ? e.location.href
              : e.location.href === decodeURIComponent(e.URL)
              ? e.URL
              : e.location.hash &&
                decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) ===
                  e.location.hash
              ? e.location.href
              : -1 == e.URL.indexOf("#") && -1 != e.location.href.indexOf("#")
              ? e.location.href
              : e.URL || e.location.href;
          }),
          (h.store = {}),
          (h.idToState = h.idToState || {}),
          (h.stateToId = h.stateToId || {}),
          (h.urlToId = h.urlToId || {}),
          (h.storedStates = h.storedStates || []),
          (h.savedStates = h.savedStates || []),
          (h.normalizeStore = function () {
            (h.store.idToState = h.store.idToState || {}),
              (h.store.urlToId = h.store.urlToId || {}),
              (h.store.stateToId = h.store.stateToId || {});
          }),
          (h.getState = function (e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            var a = h.getLastSavedState();
            return (
              !a && t && (a = h.createStateObject()),
              e && ((a = h.cloneObject(a)).url = a.cleanUrl || a.url),
              a
            );
          }),
          (h.getIdByState = function (e) {
            var t,
              a = h.extractId(e.url);
            if (!a) {
              if (((t = h.getStateString(e)), void 0 !== h.stateToId[t]))
                a = h.stateToId[t];
              else if (void 0 !== h.store.stateToId[t])
                a = h.store.stateToId[t];
              else {
                for (
                  ;
                  (a =
                    new Date().getTime() +
                    String(Math.random()).replace(/\D/g, "")),
                    void 0 !== h.idToState[a] ||
                      void 0 !== h.store.idToState[a];

                );
                (h.stateToId[t] = a), (h.idToState[a] = e);
              }
            }
            return a;
          }),
          (h.normalizeState = function (e) {
            var t, a;
            return (
              (e && "object" == typeof e) || (e = {}),
              void 0 !== e.normalized
                ? e
                : ((e.data && "object" == typeof e.data) || (e.data = {}),
                  ((t = { normalized: !0 }).title = e.title || ""),
                  (t.url = h.getFullUrl(e.url ? e.url : h.getLocationHref())),
                  (t.hash = h.getShortUrl(t.url)),
                  (t.data = h.cloneObject(e.data)),
                  (t.id = h.getIdByState(t)),
                  (t.cleanUrl = t.url.replace(/\??\&_suid.*/, "")),
                  (t.url = t.cleanUrl),
                  (a = !h.isEmptyObject(t.data)),
                  (t.title || a) &&
                    !0 !== h.options.disableSuid &&
                    ((t.hash = h
                      .getShortUrl(t.url)
                      .replace(/\??\&_suid.*/, "")),
                    /\?/.test(t.hash) || (t.hash += "?"),
                    (t.hash += "&_suid=" + t.id)),
                  (t.hashedUrl = h.getFullUrl(t.hash)),
                  (h.emulated.pushState || h.bugs.safariPoll) &&
                    h.hasUrlDuplicate(t) &&
                    (t.url = t.hashedUrl),
                  t)
            );
          }),
          (h.createStateObject = function (e, t, a) {
            var r = { data: e, title: t, url: a };
            return h.normalizeState(r);
          }),
          (h.getStateById = function (e) {
            return (e = String(e)), h.idToState[e] || h.store.idToState[e] || t;
          }),
          (h.getStateString = function (e) {
            var t;
            return (
              (t = {
                data: h.normalizeState(e).data,
                title: e.title,
                url: e.url,
              }),
              c.stringify(t)
            );
          }),
          (h.getStateId = function (e) {
            return h.normalizeState(e).id;
          }),
          (h.getHashByState = function (e) {
            return h.normalizeState(e).hash;
          }),
          (h.extractId = function (e) {
            var t, a;
            return (
              (a = -1 != e.indexOf("#") ? e.split("#")[0] : e),
              (t = /(.*)\&_suid=([0-9]+)$/.exec(a)) && t[1],
              (t ? String(t[2] || "") : "") || !1
            );
          }),
          (h.isTraditionalAnchor = function (e) {
            return !/[\/\?\.]/.test(e);
          }),
          (h.extractState = function (e, t) {
            var a,
              r,
              n = null;
            return (
              (t = t || !1),
              (a = h.extractId(e)) && (n = h.getStateById(a)),
              n ||
                ((r = h.getFullUrl(e)),
                (a = h.getIdByUrl(r) || !1) && (n = h.getStateById(a)),
                n ||
                  !t ||
                  h.isTraditionalAnchor(e) ||
                  (n = h.createStateObject(null, null, r))),
              n
            );
          }),
          (h.getIdByUrl = function (e) {
            return h.urlToId[e] || h.store.urlToId[e] || t;
          }),
          (h.getLastSavedState = function () {
            return h.savedStates[h.savedStates.length - 1] || t;
          }),
          (h.getLastStoredState = function () {
            return h.storedStates[h.storedStates.length - 1] || t;
          }),
          (h.hasUrlDuplicate = function (e) {
            var t;
            return (t = h.extractState(e.url)) && t.id !== e.id;
          }),
          (h.storeState = function (e) {
            return (
              (h.urlToId[e.url] = e.id),
              h.storedStates.push(h.cloneObject(e)),
              e
            );
          }),
          (h.isLastSavedState = function (e) {
            var t = !1;
            return (
              h.savedStates.length && (t = e.id === h.getLastSavedState().id), t
            );
          }),
          (h.saveState = function (e) {
            return (
              !h.isLastSavedState(e) &&
              (h.savedStates.push(h.cloneObject(e)), !0)
            );
          }),
          (h.getStateByIndex = function (e) {
            return void 0 === e
              ? h.savedStates[h.savedStates.length - 1]
              : e < 0
              ? h.savedStates[h.savedStates.length + e]
              : h.savedStates[e];
          }),
          (h.getCurrentIndex = function () {
            return h.savedStates.length < 1 ? 0 : h.savedStates.length - 1;
          }),
          (h.getHash = function (e) {
            var t = h.getLocationHref(e);
            return h.getHashByUrl(t);
          }),
          (h.unescapeHash = function (e) {
            var t;
            return decodeURIComponent(h.normalizeHash(e));
          }),
          (h.normalizeHash = function (e) {
            return e.replace(/[^#]*#/, "").replace(/#.*/, "");
          }),
          (h.setHash = function (e, t) {
            var a, n;
            return !1 !== t && h.busy()
              ? (h.pushQueue({
                  scope: h,
                  callback: h.setHash,
                  args: arguments,
                  queue: t,
                }),
                !1)
              : (h.busy(!0),
                (a = h.extractState(e, !0)) && !h.emulated.pushState
                  ? h.pushState(a.data, a.title, a.url, !1)
                  : h.getHash() !== e &&
                    (h.bugs.setHash
                      ? ((n = h.getPageUrl()),
                        h.pushState(null, null, n + "#" + e, !1))
                      : (r.location.hash = e)),
                h);
          }),
          (h.escapeHash = function (t) {
            var a = h.normalizeHash(t);
            return (
              (a = e.encodeURIComponent(a)),
              h.bugs.hashEscape ||
                (a = a
                  .replace(/\%21/g, "!")
                  .replace(/\%26/g, "&")
                  .replace(/\%3D/g, "=")
                  .replace(/\%3F/g, "?")),
              a
            );
          }),
          (h.getHashByUrl = function (e) {
            var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return h.unescapeHash(t);
          }),
          (h.setTitle = function (e) {
            var t,
              a = e.title;
            a ||
              ((t = h.getStateByIndex(0)) &&
                t.url === e.url &&
                (a = t.title || h.options.initialTitle));
            try {
              r.getElementsByTagName("title")[0].innerHTML = a
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace(" & ", " &amp; ");
            } catch (n) {}
            return (r.title = a), h;
          }),
          (h.queues = []),
          (h.busy = function (e) {
            if (
              (void 0 !== e
                ? (h.busy.flag = e)
                : void 0 === h.busy.flag && (h.busy.flag = !1),
              !h.busy.flag)
            ) {
              i(h.busy.timeout);
              var t = function () {
                var e, a, r;
                if (!h.busy.flag)
                  for (e = h.queues.length - 1; 0 <= e; --e)
                    0 !== (a = h.queues[e]).length &&
                      ((r = a.shift()),
                      h.fireQueueItem(r),
                      (h.busy.timeout = s(t, h.options.busyDelay)));
              };
              h.busy.timeout = s(t, h.options.busyDelay);
            }
            return h.busy.flag;
          }),
          (h.busy.flag = !1),
          (h.fireQueueItem = function (e) {
            return e.callback.apply(e.scope || h, e.args || []);
          }),
          (h.pushQueue = function (e) {
            return (
              (h.queues[e.queue || 0] = h.queues[e.queue || 0] || []),
              h.queues[e.queue || 0].push(e),
              h
            );
          }),
          (h.queue = function (e, t) {
            return (
              "function" == typeof e && (e = { callback: e }),
              void 0 !== t && (e.queue = t),
              h.busy() ? h.pushQueue(e) : h.fireQueueItem(e),
              h
            );
          }),
          (h.clearQueue = function () {
            return (h.busy.flag = !1), (h.queues = []), h;
          }),
          (h.stateChanged = !1),
          (h.doubleChecker = !1),
          (h.doubleCheckComplete = function () {
            return (h.stateChanged = !0), h.doubleCheckClear(), h;
          }),
          (h.doubleCheckClear = function () {
            return (
              h.doubleChecker && (i(h.doubleChecker), (h.doubleChecker = !1)), h
            );
          }),
          (h.doubleCheck = function (e) {
            return (
              (h.stateChanged = !1),
              h.doubleCheckClear(),
              h.bugs.ieDoubleCheck &&
                (h.doubleChecker = s(function () {
                  return h.doubleCheckClear(), h.stateChanged || e(), !0;
                }, h.options.doubleCheckInterval)),
              h
            );
          }),
          (h.safariStatePoll = function () {
            var t = h.extractState(h.getLocationHref());
            if (!h.isLastSavedState(t))
              return (
                t || h.createStateObject(), h.Adapter.trigger(e, "popstate"), h
              );
          }),
          (h.back = function (e) {
            return !1 !== e && h.busy()
              ? (h.pushQueue({
                  scope: h,
                  callback: h.back,
                  args: arguments,
                  queue: e,
                }),
                !1)
              : (h.busy(!0),
                h.doubleCheck(function () {
                  h.back(!1);
                }),
                p.go(-1),
                !0);
          }),
          (h.forward = function (e) {
            return !1 !== e && h.busy()
              ? (h.pushQueue({
                  scope: h,
                  callback: h.forward,
                  args: arguments,
                  queue: e,
                }),
                !1)
              : (h.busy(!0),
                h.doubleCheck(function () {
                  h.forward(!1);
                }),
                p.go(1),
                !0);
          }),
          (h.go = function (e, t) {
            var a;
            if (0 < e) for (a = 1; a <= e; ++a) h.forward(t);
            else {
              if (!(e < 0))
                throw Error(
                  "History.go: History.go requires a positive or negative integer passed."
                );
              for (a = -1; e <= a; --a) h.back(t);
            }
            return h;
          }),
          h.emulated.pushState)
        ) {
          var g = function () {};
          (h.pushState = h.pushState || g),
            (h.replaceState = h.replaceState || g);
        } else
          (h.onPopState = function (t, a) {
            var r,
              n,
              o = !1,
              s = !1;
            return (
              h.doubleCheckComplete(),
              (r = h.getHash())
                ? ((n = h.extractState(r || h.getLocationHref(), !0))
                    ? h.replaceState(n.data, n.title, n.url, !1)
                    : (h.Adapter.trigger(e, "anchorchange"), h.busy(!1)),
                  (h.expectedStateId = !1))
                : ((s =
                    (s = (o = h.Adapter.extractEventData("state", t, a) || !1)
                      ? h.getStateById(o)
                      : h.expectedStateId
                      ? h.getStateById(h.expectedStateId)
                      : h.extractState(h.getLocationHref())) ||
                    h.createStateObject(null, null, h.getLocationHref())),
                  (h.expectedStateId = !1),
                  h.isLastSavedState(s)
                    ? (h.busy(!1), !1)
                    : (h.storeState(s),
                      h.saveState(s),
                      h.setTitle(s),
                      h.Adapter.trigger(e, "statechange"),
                      h.busy(!1),
                      !0))
            );
          }),
            h.Adapter.bind(e, "popstate", h.onPopState),
            (h.pushState = function (t, a, r, n) {
              if (h.getHashByUrl(r) && h.emulated.pushState)
                throw Error(
                  "History.js does not support states with fragement-identifiers (hashes/anchors)."
                );
              if (!1 !== n && h.busy())
                return (
                  h.pushQueue({
                    scope: h,
                    callback: h.pushState,
                    args: arguments,
                    queue: n,
                  }),
                  !1
                );
              h.busy(!0);
              var o = h.createStateObject(t, a, r);
              return (
                h.isLastSavedState(o)
                  ? h.busy(!1)
                  : (h.storeState(o),
                    (h.expectedStateId = o.id),
                    p.pushState(o.id, o.title, o.url),
                    h.Adapter.trigger(e, "popstate")),
                !0
              );
            }),
            (h.replaceState = function (t, a, r, n) {
              if (h.getHashByUrl(r) && h.emulated.pushState)
                throw Error(
                  "History.js does not support states with fragement-identifiers (hashes/anchors)."
                );
              if (!1 !== n && h.busy())
                return (
                  h.pushQueue({
                    scope: h,
                    callback: h.replaceState,
                    args: arguments,
                    queue: n,
                  }),
                  !1
                );
              h.busy(!0);
              var o = h.createStateObject(t, a, r);
              return (
                h.isLastSavedState(o)
                  ? h.busy(!1)
                  : (h.storeState(o),
                    (h.expectedStateId = o.id),
                    p.replaceState(o.id, o.title, o.url),
                    h.Adapter.trigger(e, "popstate")),
                !0
              );
            });
        if (o) {
          try {
            h.store = c.parse(o.getItem("History.store")) || {};
          } catch (S) {
            h.store = {};
          }
          h.normalizeStore();
        } else (h.store = {}), h.normalizeStore();
        h.Adapter.bind(e, "unload", h.clearAllIntervals),
          h.saveState(h.storeState(h.extractState(h.getLocationHref(), !0))),
          o &&
            ((h.onUnload = function () {
              var e, t, a;
              try {
                e = c.parse(o.getItem("History.store")) || {};
              } catch (r) {
                e = {};
              }
              for (t in ((e.idToState = e.idToState || {}),
              (e.urlToId = e.urlToId || {}),
              (e.stateToId = e.stateToId || {}),
              h.idToState))
                h.idToState.hasOwnProperty(t) &&
                  (e.idToState[t] = h.idToState[t]);
              for (t in h.urlToId)
                h.urlToId.hasOwnProperty(t) && (e.urlToId[t] = h.urlToId[t]);
              for (t in h.stateToId)
                h.stateToId.hasOwnProperty(t) &&
                  (e.stateToId[t] = h.stateToId[t]);
              (h.store = e), h.normalizeStore(), (a = c.stringify(e));
              try {
                o.setItem("History.store", a);
              } catch (n) {
                if (n.code !== DOMException.QUOTA_EXCEEDED_ERR) throw n;
                o.length &&
                  (o.removeItem("History.store"),
                  o.setItem("History.store", a));
              }
            }),
            h.intervalList.push(u(h.onUnload, h.options.storeInterval)),
            h.Adapter.bind(e, "beforeunload", h.onUnload),
            h.Adapter.bind(e, "unload", h.onUnload)),
          h.emulated.pushState ||
            (h.bugs.safariPoll &&
              h.intervalList.push(
                u(h.safariStatePoll, h.options.safariPollInterval)
              ),
            ("Apple Computer, Inc." !== n.vendor &&
              "Mozilla" !== (n.appCodeName || "")) ||
              (h.Adapter.bind(e, "hashchange", function () {
                h.Adapter.trigger(e, "popstate");
              }),
              h.getHash() &&
                h.Adapter.onDomLoad(function () {
                  h.Adapter.trigger(e, "hashchange");
                })));
      }),
      (h.options && h.options.delayInit) || h.init();
  })(window);
