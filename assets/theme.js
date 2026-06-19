(window.theme = window.theme || {}),
  (theme.Sections = function e() {
    (this.constructors = {}),
      (this.instances = []),
      $(document)
        .on("shopify:section:load", this._onSectionLoad.bind(this))
        .on("shopify:section:unload", this._onSectionUnload.bind(this))
        .on("shopify:section:select", this._onSelect.bind(this))
        .on("shopify:section:deselect", this._onDeselect.bind(this))
        .on("shopify:block:select", this._onBlockSelect.bind(this))
        .on("shopify:block:deselect", this._onBlockDeselect.bind(this));
  }),
  (theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function (e, t) {
      var i = $(e),
        a = i.attr("data-section-id"),
        n = i.attr("data-section-type");
      if (((t = t || this.constructors[n]), !_.isUndefined(t))) {
        var s = _.assignIn(new t(e), { id: a, type: n, container: e });
        this.instances.push(s);
      }
    },
    _onSectionLoad: function (e) {
      var t = $("[data-section-id]", e.target)[0];
      t && this._createInstance(t);
    },
    _onSectionUnload: function (e) {
      this.instances = _.filter(this.instances, function (t) {
        var i = t.id === e.detail.sectionId;
        return i && _.isFunction(t.onUnload) && t.onUnload(e), !i;
      });
    },
    _onSelect: function (e) {
      var t = _.find(this.instances, function (t) {
        return t.id === e.detail.sectionId;
      });
      !_.isUndefined(t) && _.isFunction(t.onSelect) && t.onSelect(e);
    },
    _onDeselect: function (e) {
      var t = _.find(this.instances, function (t) {
        return t.id === e.detail.sectionId;
      });
      !_.isUndefined(t) && _.isFunction(t.onDeselect) && t.onDeselect(e);
    },
    _onBlockSelect: function (e) {
      var t = _.find(this.instances, function (t) {
        return t.id === e.detail.sectionId;
      });
      !_.isUndefined(t) && _.isFunction(t.onBlockSelect) && t.onBlockSelect(e);
    },
    _onBlockDeselect: function (e) {
      var t = _.find(this.instances, function (t) {
        return t.id === e.detail.sectionId;
      });
      !_.isUndefined(t) &&
        _.isFunction(t.onBlockDeselect) &&
        t.onBlockDeselect(e);
    },
    register: function (e, t) {
      (this.constructors[e] = t),
        $("[data-section-type=" + e + "]").each(
          function (e, i) {
            this._createInstance(i, t);
          }.bind(this)
        );
    },
  })),
  (window.slate = window.slate || {}),
  (slate.rte = {
    wrapTable: function (e) {
      e.$tables.wrap('<div class="' + e.tableWrapperClass + '"></div>');
    },
    wrapIframe: function (e) {
      e.$iframes.each(function () {
        $(this).wrap('<div class="' + e.iframeWrapperClass + '"></div>'),
          (this.src = this.src);
      });
    },
  }),
  (window.slate = window.slate || {}),
  (slate.a11y = {
    pageLinkFocus: function (e) {
      var t = "js-focus-hidden";
      e.first()
        .attr("tabIndex", "-1")
        .focus()
        .addClass(t)
        .one("blur", function i() {
          e.first().removeClass(t).removeAttr("tabindex");
        });
    },
    focusHash: function () {
      var e = window.location.hash;
      e && document.getElementById(e.slice(1)) && this.pageLinkFocus($(e));
    },
    bindInPageLinks: function () {
      $("a[href*=#]").on(
        "click",
        function (e) {
          this.pageLinkFocus($(e.currentTarget.hash));
        }.bind(this)
      );
    },
    trapFocus: function (e) {
      var t = e.namespace ? "focusin." + e.namespace : "focusin";
      e.$elementToFocus || (e.$elementToFocus = e.$container),
        e.$container.attr("tabindex", "-1"),
        e.$elementToFocus.focus(),
        $(document).off("focusin"),
        $(document).on(t, function (t) {
          e.$container[0] === t.target ||
            e.$container.has(t.target).length ||
            e.$container.focus();
        });
    },
    removeTrapFocus: function (e) {
      var t = e.namespace ? "focusin." + e.namespace : "focusin";
      e.$container &&
        e.$container.length &&
        e.$container.removeAttr("tabindex"),
        $(document).off(t);
    },
  }),
  (theme.Images = {
    preload: function e(t, i) {
      "string" == typeof t && (t = [t]);
      for (var a = 0; a < t.length; a++) {
        var n = t[a];
        this.loadImage(this.getSizedImageUrl(n, i));
      }
    },
    loadImage: function e(t) {
      new Image().src = t;
    },
    switchImage: function e(t, i, a) {
      var n = this.imageSize(i.src),
        s = this.getSizedImageUrl(t.src, n);
      a ? a(s, t, i) : (i.src = s);
    },
    imageSize: function e(t) {
      var i = t.match(
        /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/
      );
      return null === i ? null : void 0 !== i[2] ? i[1] + i[2] : i[1];
    },
    getSizedImageUrl: function e(t, i) {
      if (null === i) return t;
      if ("master" === i) return this.removeProtocol(t);
      var a = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
      if (null !== a) {
        var n = t.split(a[0]),
          s = a[0];
        return this.removeProtocol(n[0] + "_" + i + s);
      }
      return null;
    },
    removeProtocol: function e(t) {
      return t.replace(/http(s)?:/, "");
    },
  }),
  (theme.Currency = {
    formatMoney: function e(t, i) {
      "string" == typeof t && (t = t.replace(".", ""));
      var a = "",
        n = /\{\{\s*(\w+)\s*\}\}/,
        s = i || "${{amount}}";
      function o(e, t, i, a) {
        if (((i = i || ","), (a = a || "."), isNaN(e) || null === e)) return 0;
        var n = (e = (e / 100).toFixed(t)).split(".");
        return (
          n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) +
          (n[1] ? a + n[1] : "")
        );
      }
      switch (s.match(n)[1]) {
        case "amount":
          a = o(t, 2);
          break;
        case "amount_no_decimals":
          a = o(t, 0);
          break;
        case "amount_with_comma_separator":
          a = o(t, 2, ".", ",");
          break;
        case "amount_no_decimals_with_comma_separator":
          a = o(t, 0, ".", ",");
          break;
        case "amount_no_decimals_with_space_separator":
          a = o(t, 0, " ");
      }
      return s.replace(n, a);
    },
  }),
  (slate.Variants = (function () {
    function e(e) {
      (this.$container = e.$container),
        (this.product = e.product),
        (this.singleOptionSelector = e.singleOptionSelector),
        (this.originalSelectorId = e.originalSelectorId),
        (this.enableHistoryState = e.enableHistoryState),
        (this.currentVariant = this._getVariantFromOptions()),
        $(this.singleOptionSelector, this.$container).on(
          "change",
          this._onSelectChange.bind(this)
        );
    }
    return (
      (e.prototype = _.assignIn({}, e.prototype, {
        _getCurrentOptions: function () {
          var e = _.map(
            $(this.singleOptionSelector, this.$container),
            function (e) {
              var t = $(e),
                i = t.attr("type"),
                a = {};
              return "radio" !== i && "checkbox" !== i
                ? ((a.value = t.val()), (a.index = t.data("index")), a)
                : !!t[0].checked &&
                    ((a.value = t.val()), (a.index = t.data("index")), a);
            }
          );
          return _.compact(e);
        },
        _getVariantFromOptions: function () {
          var e = this._getCurrentOptions(),
            t = this.product.variants;
          return _.find(t, function (t) {
            return e.every(function (e) {
              return _.isEqual(t[e.index], e.value);
            });
          });
        },
        _onSelectChange: function () {
          var e = this._getVariantFromOptions();
          this.$container.trigger({ type: "variantChange", variant: e }),
            e &&
              (this._updateMasterSelect(e),
              this._updateImages(e),
              this._updatePrice(e),
              this._updateSKU(e),
              (this.currentVariant = e),
              this.enableHistoryState && this._updateHistoryState(e));
        },
        _updateImages: function (e) {
          var t = e.featured_image || {},
            i = this.currentVariant.featured_image || {};
          e.featured_image &&
            t.src !== i.src &&
            this.$container.trigger({ type: "variantImageChange", variant: e });
        },
        _updatePrice: function (e) {
          (e.price !== this.currentVariant.price ||
            e.compare_at_price !== this.currentVariant.compare_at_price) &&
            this.$container.trigger({ type: "variantPriceChange", variant: e });
        },
        _updateSKU: function (e) {
          e.sku !== this.currentVariant.sku &&
            this.$container.trigger({ type: "variantSKUChange", variant: e });
        },
        _updateHistoryState: function (e) {
          if (history.replaceState && e) {
            var t =
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?variant=" +
              e.id;
            window.history.replaceState({ path: t }, "", t);
          }
        },
        _updateMasterSelect: function (e) {
          $(this.originalSelectorId, this.$container).val(e.id);
        },
      })),
      e
    );
  })()),
  (theme.Drawers = (function () {
    function e(e, t, i) {
      if (
        ((this.nodes = {
          $parent: $("html").add("body"),
          $page: $("#PageContainer"),
        }),
        (this.config = $.extend(
          {
            close: ".js-drawer-close",
            open: ".js-drawer-open-" + t,
            openClass: "js-drawer-open",
            dirOpenClass: "js-drawer-open-" + t,
          },
          i
        )),
        (this.position = t),
        (this.$drawer = $("#" + e)),
        !this.$drawer.length)
      )
        return !1;
      (this.drawerIsOpen = !1), this.init();
    }
    return (
      (e.prototype.init = function () {
        $(this.config.open).on("click", $.proxy(this.open, this)),
          this.$drawer.on(
            "click",
            this.config.close,
            $.proxy(this.close, this)
          );
      }),
      (e.prototype.open = function (e) {
        var t = !1;
        return (e ? e.preventDefault() : (t = !0),
        e &&
          e.stopPropagation &&
          (e.stopPropagation(), (this.$activeSource = $(e.currentTarget))),
        this.drawerIsOpen && !t)
          ? this.close()
          : (this.$drawer.prepareTransition(),
            this.nodes.$parent.addClass(
              this.config.openClass + " " + this.config.dirOpenClass
            ),
            (this.drawerIsOpen = !0),
            slate.a11y.trapFocus({
              $container: this.$drawer,
              namespace: "drawer_focus",
            }),
            this.config.onDrawerOpen &&
              "function" == typeof this.config.onDrawerOpen &&
              !t &&
              this.config.onDrawerOpen(),
            this.$activeSource &&
              this.$activeSource.attr("aria-expanded") &&
              this.$activeSource.attr("aria-expanded", "true"),
            this.bindEvents(),
            this);
      }),
      (e.prototype.close = function () {
        this.drawerIsOpen &&
          ($(document.activeElement).trigger("blur"),
          this.$drawer.prepareTransition(),
          this.nodes.$parent.removeClass(
            this.config.dirOpenClass + " " + this.config.openClass
          ),
          (this.drawerIsOpen = !1),
          slate.a11y.removeTrapFocus({
            $container: this.$drawer,
            namespace: "drawer_focus",
          }),
          this.unbindEvents());
      }),
      (e.prototype.bindEvents = function () {
        this.nodes.$parent.on(
          "keyup.drawer",
          $.proxy(function (e) {
            return 27 !== e.keyCode || (this.close(), !1);
          }, this)
        ),
          this.nodes.$page.on("touchmove.drawer", function () {
            return !1;
          }),
          this.nodes.$page.on(
            "click.drawer",
            $.proxy(function () {
              return this.close(), !1;
            }, this)
          );
      }),
      (e.prototype.unbindEvents = function () {
        this.nodes.$page.off(".drawer"), this.nodes.$parent.off(".drawer");
      }),
      e
    );
  })()),
  (window.theme = window.theme || {}),
  (theme.Header = (function () {
    var e = {
        body: "body",
        navigation: "#AccessibleNav",
        siteNavHasDropdown: ".site-nav--has-dropdown",
        siteNavChildLinks: ".site-nav__child-link",
        siteNavActiveDropdown: ".site-nav--active-dropdown",
        siteNavLinkMain: ".site-nav__link--main",
        siteNavChildLink: ".site-nav__link--last",
      },
      t = {
        activeClass: "site-nav--active-dropdown",
        childLinkClass: "site-nav__child-link",
      },
      i = {};
    function a(a) {
      a.find(e.siteNavLinkMain).attr("aria-expanded", "false"),
        a.removeClass(t.activeClass),
        (i.$activeDropdown = $(e.siteNavActiveDropdown)),
        $(e.body).off("click.siteNav"),
        $(window).off("keyup.siteNav");
    }
    return {
      init: function n() {
        (i = {
          $nav: $(e.navigation),
          $topLevel: $(e.siteNavLinkMain),
          $parents: $(e.navigation).find(e.siteNavHasDropdown),
          $subMenuLinks: $(e.siteNavChildLinks),
          $activeDropdown: $(e.siteNavActiveDropdown),
        }).$parents.on("click.siteNav", function (n) {
          var s,
            o = $(this);
          o.hasClass(t.activeClass) || n.stopImmediatePropagation(),
            (s = o).addClass(t.activeClass),
            i.$activeDropdown.length && a(i.$activeDropdown),
            (i.$activeDropdown = s),
            s.find(e.siteNavLinkMain).attr("aria-expanded", "true"),
            setTimeout(function () {
              $(window).on("keyup.siteNav", function (e) {
                27 === e.keyCode && a(s);
              }),
                $(e.body).on("click.siteNav", function () {
                  a(s);
                });
            }, 250);
        }),
          $(e.siteNavChildLink).on("focusout.siteNav", function () {
            setTimeout(function () {
              !$(document.activeElement).hasClass(t.childLinkClass) &&
                i.$activeDropdown.length &&
                a(i.$activeDropdown);
            });
          }),
          i.$topLevel.on("focus.siteNav", function () {
            i.$activeDropdown.length && a(i.$activeDropdown);
          }),
          i.$subMenuLinks.on("click.siteNav", function (e) {
            e.stopImmediatePropagation();
          });
      },
      unload: function t() {
        $(window).off(".siteNav"),
          i.$parents.off(".siteNav"),
          i.$subMenuLinks.off(".siteNav"),
          i.$topLevel.off(".siteNav"),
          $(e.siteNavChildLink).off(".siteNav"),
          $(e.body).off(".siteNav");
      },
    };
  })()),
  (window.theme = window.theme || {}),
  (theme.MobileNav = (function () {
    var e,
      t,
      i,
      a = {
        mobileNavOpenIcon: "mobile-nav--open",
        mobileNavCloseIcon: "mobile-nav--close",
        navLinkWrapper: "mobile-nav__item",
        navLink: "mobile-nav__link",
        subNavLink: "mobile-nav__sublist-link",
        return: "mobile-nav__return-btn",
        subNavActive: "is-active",
        subNavClosing: "is-closing",
        navOpen: "js-menu--is-open",
        subNavShowing: "sub-nav--is-open",
        thirdNavShowing: "third-nav--is-open",
        subNavToggleBtn: "js-toggle-submenu",
      },
      n = {},
      s = 1;
    function o() {
      var e;
      n.$mobileNavToggle.hasClass(a.mobileNavCloseIcon)
        ? r()
        : ((e = n.$siteHeader.outerHeight() + n.$siteHeader.position().top),
          n.$mobileNavContainer.prepareTransition().addClass(a.navOpen),
          n.$mobileNavContainer.css({ transform: "translateY(" + e + "px)" }),
          n.$pageContainer.css({
            transform:
              "translate3d(0, " +
              n.$mobileNavContainer[0].scrollHeight +
              "px, 0)",
          }),
          slate.a11y.trapFocus({
            $container: n.$sectionHeader,
            $elementToFocus: n.$mobileNav
              .find("." + a.navLinkWrapper + ":first")
              .find("." + a.navLink),
            namespace: "navFocus",
          }),
          n.$mobileNavToggle
            .addClass(a.mobileNavCloseIcon)
            .removeClass(a.mobileNavOpenIcon),
          $(window).on("keyup.mobileNav", function (e) {
            27 === e.which && r();
          }));
    }
    function r() {
      n.$mobileNavContainer.prepareTransition().removeClass(a.navOpen),
        n.$mobileNavContainer.css({ transform: "translateY(-100%)" }),
        n.$pageContainer.removeAttr("style"),
        n.$mobileNavContainer.one(
          "TransitionEnd.navToggle webkitTransitionEnd.navToggle transitionend.navToggle oTransitionEnd.navToggle",
          function () {
            slate.a11y.removeTrapFocus({
              $container: n.$mobileNav,
              namespace: "navFocus",
            });
          }
        ),
        n.$mobileNavToggle
          .addClass(a.mobileNavOpenIcon)
          .removeClass(a.mobileNavCloseIcon),
        $(window).off("keyup.mobileNav");
    }
    function c(o) {
      if (!e) {
        var r,
          c,
          l,
          d,
          u,
          h = $(o.currentTarget);
        (e = !0),
          h.hasClass(a.return)
            ? ($(
                "." + a.subNavToggleBtn + '[data-level="' + (s - 1) + '"]'
              ).removeClass(a.subNavActive),
              i && i.length && i.removeClass(a.subNavActive))
            : h.addClass(a.subNavActive),
          (i = h),
          (s = (c = (r = h.data("target"))
            ? $('.mobile-nav__dropdown[data-parent="' + r + '"]')
            : n.$mobileNav).data("level")
            ? c.data("level")
            : 1),
          t && t.length && t.prepareTransition().addClass(a.subNavClosing),
          (t = c),
          (l = r ? c.find("." + a.subNavLink + ":first") : i),
          (d = c.outerHeight()),
          (u = s > 2 ? a.thirdNavShowing : a.subNavShowing),
          n.$mobileNavContainer
            .css("height", d)
            .removeClass(a.thirdNavShowing)
            .addClass(u),
          r ||
            n.$mobileNavContainer
              .removeClass(a.thirdNavShowing)
              .removeClass(a.subNavShowing),
          n.$mobileNavContainer.one(
            "TransitionEnd.subnavToggle webkitTransitionEnd.subnavToggle transitionend.subnavToggle oTransitionEnd.subnavToggle",
            function () {
              slate.a11y.trapFocus({
                $container: c,
                $elementToFocus: l,
                namespace: "subNavFocus",
              }),
                n.$mobileNavContainer.off(".subnavToggle"),
                (e = !1);
            }
          ),
          n.$pageContainer.css({ transform: "translateY(" + d + "px)" }),
          t.removeClass(a.subNavClosing);
      }
    }
    return {
      init: function e() {
        (n = {
          $pageContainer: $("#PageContainer"),
          $siteHeader: $(".site-header"),
          $mobileNavToggle: $(".js-mobile-nav-toggle"),
          $mobileNavContainer: $(".mobile-nav-wrapper"),
          $mobileNav: $("#MobileNav"),
          $sectionHeader: $("#shopify-section-header"),
          $subNavToggleBtn: $("." + a.subNavToggleBtn),
        }).$mobileNavToggle.on("click", o),
          n.$subNavToggleBtn.on("click.subNav", c),
          enquire.register("screen and (max-width: 749px)", {
            unmatch: function () {
              r();
            },
          });
      },
      closeMobileNav: r,
    };
  })(jQuery)),
  (window.theme = window.theme || {}),
  (theme.Search = (function () {
    var e = {
        search: ".search",
        searchSubmit: ".search__submit",
        searchInput: ".search__input",
        siteHeader: ".site-header",
        siteHeaderSearchToggle: ".site-header__search-toggle",
        siteHeaderSearch: ".site-header__search",
        searchDrawer: ".search-bar",
        searchDrawerInput: ".search-bar__input",
        searchHeader: ".search-header",
        searchHeaderInput: ".search-header__input",
        searchHeaderSubmit: ".search-header__submit",
        mobileNavWrapper: ".mobile-nav-wrapper",
      },
      t = { focus: "search--focus", mobileNavIsOpen: "js-menu--is-open" };
    function i() {
      a($(e.searchDrawerInput)),
        $(e.mobileNavWrapper).hasClass(t.mobileNavIsOpen) &&
          theme.MobileNav.closeMobileNav();
    }
    function a(e) {
      e.focus(), e[0].setSelectionRange(0, e[0].value.length);
    }
    return {
      init: function n() {
        $(e.siteHeader).length &&
          ($("#PageContainer").addClass("drawer-page-content"),
          $(".js-drawer-open-top")
            .attr("aria-controls", "SearchDrawer")
            .attr("aria-expanded", "false"),
          (theme.SearchDrawer = new theme.Drawers("SearchDrawer", "top", {
            onDrawerOpen: i,
          })),
          $(e.searchSubmit).on("click", function (t) {
            var i = $(t.target).parents(e.search).find(e.searchInput);
            0 === i.val().length && (t.preventDefault(), a(i));
          }),
          $(e.searchHeaderInput)
            .add(e.searchHeaderSubmit)
            .on("focus blur", function () {
              $(e.searchHeader).toggleClass(t.focus);
            }),
          $(e.siteHeaderSearchToggle).on("click", function () {
            var t = $(e.siteHeader).outerHeight(),
              i = $(e.siteHeader).offset().top - t;
            $(e.searchDrawer).css({ height: t + "px", top: i + "px" });
          }));
      },
    };
  })()),
  (function () {
    var e = $(".return-link");
    function t(e) {
      var t = document.createElement("a");
      return (t.ref = e), t.hostname;
    }
    document.referrer &&
      e.length &&
      window.history.length &&
      e.one("click", function (e) {
        e.preventDefault();
        var i = t(document.referrer);
        return t(window.location.href) === i && history.back(), !1;
      });
  })(),
  (function () {
    var e = $("#BlogTagFilter");
    e.length &&
      e.on("change", function () {
        location.href = $(this).val();
      });
  })(),
  (window.theme = theme || {}),
  (theme.customerTemplates = (function () {
    function e() {
      $("#RecoverPasswordForm").toggleClass("hide"),
        $("#CustomerLoginForm").toggleClass("hide");
    }
    return {
      init: function () {
        var t;
        "#recover" === window.location.hash && e(),
          $("#RecoverPassword").on("click", function (t) {
            t.preventDefault(), e();
          }),
          $("#HideRecoverPasswordLink").on("click", function (t) {
            t.preventDefault(), e();
          }),
          $(".reset-password-success").length &&
            $("#ResetSuccess").removeClass("hide"),
          (t = $("#AddressNewForm")).length &&
            (Shopify &&
              new Shopify.CountryProvinceSelector(
                "AddressCountryNew",
                "AddressProvinceNew",
                { hideElement: "AddressProvinceContainerNew" }
              ),
            $(".address-country-option").each(function () {
              var e = $(this).data("form-id");
              new Shopify.CountryProvinceSelector(
                "AddressCountry_" + e,
                "AddressProvince_" + e,
                { hideElement: "AddressProvinceContainer_" + e }
              );
            }),
            $(".address-new-toggle").on("click", function () {
              t.toggleClass("hide");
            }),
            $(".address-edit-toggle").on("click", function () {
              var e = $(this).data("form-id");
              $("#EditAddress_" + e).toggleClass("hide");
            }),
            $(".address-delete").on("click", function () {
              var e = $(this),
                t = e.data("form-id");
              confirm(
                e.data("confirm-message") ||
                  "Are you sure you wish to delete this address?"
              ) &&
                Shopify.postLink("/account/addresses/" + t, {
                  parameters: { _method: "delete" },
                });
            }));
      },
    };
  })()),
  (theme.customerloginTemplates = (function () {
    function e() {
      $("#RecoverPasswordFormIndex").toggleClass("hide"),
        $("#CustomerAccountForm .block-form-login").toggleClass("hide");
    }
    return {
      init: function () {
        $("#RecoversPassword").on("click", function (t) {
          t.preventDefault(), e();
        }),
          $("#HideRecoverPasswordIndex").on("click", function (t) {
            t.preventDefault(), e();
          });
      },
    };
  })()),
  (window.theme = window.theme || {}),
  (theme.Cart = (function () {
    var e = { edit: ".js-edit-toggle" },
      t = {
        showClass: "cart__update--show",
        showEditClass: "cart__edit--active",
        cartNoCookies: "cart--no-cookies",
      };
    function i(i) {
      (this.$container = $(i)),
        (this.$edit = $(e.edit, this.$container)),
        this.cookiesEnabled() || this.$container.addClass(t.cartNoCookies),
        this.$edit.on("click", this._onEditClick.bind(this));
    }
    return (
      (i.prototype = _.assignIn({}, i.prototype, {
        onUnload: function () {
          this.$edit.off("click", this._onEditClick);
        },
        _onEditClick: function (e) {
          var i = $(e.target),
            a = $("." + i.data("target"));
          i.toggleClass(t.showEditClass), a.toggleClass(t.showClass);
        },
        cookiesEnabled: function () {
          var e = navigator.cookieEnabled;
          return (
            e ||
              ((document.cookie = "testcookie"),
              (e = -1 !== document.cookie.indexOf("testcookie"))),
            e
          );
        },
      })),
      i
    );
  })()),
  (window.theme = window.theme || {}),
  (window.theme = window.theme || {}),
  (theme.HeaderSection = (function () {
    function e() {
      theme.Header.init(), theme.MobileNav.init(), theme.Search.init();
    }
    return (
      (e.prototype = _.assignIn({}, e.prototype, {
        onUnload: function () {
          theme.Header.unload();
        },
      })),
      e
    );
  })()),
  (theme.Product = (function () {
    function e(e) {
      var t = (this.$container = $(e)),
        i = t.attr("data-section-id");
      (this.settings = {
        mediaQueryMediumUp: "screen and (min-width: 750px)",
        mediaQuerySmall: "screen and (max-width: 749px)",
        bpSmall: !1,
        enableHistoryState: t.data("enable-history-state") || !1,
        namespace: ".slideshow-" + i,
        sectionId: i,
        sliderActive: !1,
        zoomEnabled: !1,
      }),
        (this.selectors = {
          addToCart: "#AddToCart-" + i,
          addToCartText: "#AddToCartText-" + i,
          comparePrice: "#ComparePrice-" + i,
          originalPrice: "#ProductPrice-" + i,
          SKU: ".variant-sku",
          originalPriceWrapper: ".product-price__price-" + i,
          originalSelectorId: "#ProductSelect-" + i,
          productImageWraps: ".product-single__photo",
          productPrices: ".product-single__price-" + i,
          productThumbImages: ".product-single__thumbnail--" + i,
          productThumbs: ".product-single__thumbnails-" + i,
          saleClasses: "product-price__sale product-price__sale--single",
          saleLabel: ".product-price__sale-label-" + i,
          singleOptionSelector: ".single-option-selector-" + i,
        }),
        $("#ProductJson-" + i).html() &&
          ((this.productSingleObject = JSON.parse(
            document.getElementById("ProductJson-" + i).innerHTML
          )),
          (this.settings.zoomEnabled = $(
            this.selectors.productImageWraps
          ).hasClass("js-zoom-enabled")),
          this._initBreakpoints(),
          this._stringOverrides(),
          this._initVariants(),
          this._initImageSwitch(),
          this._setActiveThumbnail());
    }
    return (
      (e.prototype = _.assignIn({}, e.prototype, {
        _stringOverrides: function () {
          (theme.productStrings = theme.productStrings || {}),
            $.extend(theme.strings, theme.productStrings);
        },
        _initBreakpoints: function () {
          var e = this;
          enquire.register(this.settings.mediaQuerySmall, {
            match: function () {
              $(e.selectors.productThumbImages).length > 3 &&
                e._initThumbnailSlider(),
                e.settings.zoomEnabled &&
                  $(e.selectors.productImageWraps).each(function () {
                    (function e(t) {
                      $(t).trigger("zoom.destroy");
                    })(this);
                  }),
                (e.settings.bpSmall = !0);
            },
            unmatch: function () {
              e.settings.sliderActive && e._destroyThumbnailSlider(),
                (e.settings.bpSmall = !1);
            },
          }),
            enquire.register(this.settings.mediaQueryMediumUp, {
              match: function () {
                e.settings.zoomEnabled &&
                  $(e.selectors.productImageWraps).each(function () {
                    (function e(t) {
                      var i = $(t).data("zoom");
                      $(t).zoom({ url: i });
                    })(this);
                  });
              },
            });
        },
        _initVariants: function () {
          var e = {
            $container: this.$container,
            enableHistoryState:
              this.$container.data("enable-history-state") || !1,
            singleOptionSelector: this.selectors.singleOptionSelector,
            originalSelectorId: this.selectors.originalSelectorId,
            product: this.productSingleObject,
          };
          (this.variants = new slate.Variants(e)),
            this.$container.on(
              "variantChange" + this.settings.namespace,
              this._updateAddToCart.bind(this)
            ),
            this.$container.on(
              "variantImageChange" + this.settings.namespace,
              this._updateImages.bind(this)
            ),
            this.$container.on(
              "variantPriceChange" + this.settings.namespace,
              this._updatePrice.bind(this)
            ),
            this.$container.on(
              "variantSKUChange" + this.settings.namespace,
              this._updateSKU.bind(this)
            );
        },
        _initImageSwitch: function () {
          if ($(this.selectors.productThumbImages).length) {
            var e = this;
            $(this.selectors.productThumbImages).on("click", function (t) {
              t.preventDefault();
              var i = $(this).data("thumbnail-id");
              e._switchImage(i), e._setActiveThumbnail(i);
            });
          }
        },
        _setActiveThumbnail: function (e) {
          var t = "active-thumb";
          void 0 === e &&
            (e = $(this.selectors.productImageWraps + ":not('.hide')").data(
              "image-id"
            ));
          var i = $(
            this.selectors.productThumbImages +
              "[data-thumbnail-id='" +
              e +
              "']"
          );
          $(this.selectors.productThumbImages).removeClass(t), i.addClass(t);
        },
        _switchImage: function (e) {
          var t = $(
              this.selectors.productImageWraps + "[data-image-id='" + e + "']",
              this.$container
            ),
            i = $(
              this.selectors.productImageWraps +
                ":not([data-image-id='" +
                e +
                "'])",
              this.$container
            );
          t.removeClass("hide"), i.addClass("hide");
        },
        _initThumbnailSlider: function () {
          var e = {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: !1,
            prevArrow: ".thumbnails-slider__prev--" + this.settings.sectionId,
            nextArrow: ".thumbnails-slider__next--" + this.settings.sectionId,
            responsive: [{ breakpoint: 321, settings: { slidesToShow: 3 } }],
          };
          $(this.selectors.productThumbs).slick(e),
            (this.settings.sliderActive = !0);
        },
        _destroyThumbnailSlider: function () {
          $(this.selectors.productThumbs).slick("unslick"),
            (this.settings.sliderActive = !1);
        },
        _updateImages: function (e) {
          var t = e.variant.featured_image.id;
          this._switchImage(t), this._setActiveThumbnail(t);
        },
        _updatePrice: function (e) {
          var t = e.variant;
          $(this.selectors.originalPrice).html(
            theme.Currency.formatMoney(t.price, theme.moneyFormat)
          ),
            t.compare_at_price > t.price
              ? ($(this.selectors.comparePrice)
                  .html(
                    theme.Currency.formatMoney(
                      t.compare_at_price,
                      theme.moneyFormat
                    )
                  )
                  .removeClass("hide"),
                $(this.selectors.originalPriceWrapper).addClass(
                  this.selectors.saleClasses
                ),
                $(this.selectors.saleLabel).removeClass("hide"))
              : ($(this.selectors.comparePrice).addClass("hide"),
                $(this.selectors.saleLabel).addClass("hide"),
                $(this.selectors.originalPriceWrapper).removeClass(
                  this.selectors.saleClasses
                ));
        },
        _updateSKU: function (e) {
          var t = e.variant;
          $(this.selectors.SKU).html(t.sku);
        },
        onUnload: function () {
          this.$container.off(this.settings.namespace);
        },
      })),
      e
    );
  })()),
  (theme.Nov_Owlcarousel = function e(t) {
    var i = (this.$container = $(t)).attr("data-section-id"),
      a = (this.slider = "#shopify-section-" + i + " .nov-owl-carousel");
    if ($("html").hasClass("lang-rtl")) var n = !0;
    else var n = !1;
    var s = $(a).data("autoplay"),
      o = $(a).data("autoplayTimeout"),
      r = $(a).data("items"),
      c = $(a).data("margin"),
      l = $(a).data("nav"),
      d = $(a).data("dots"),
      u = $(a).data("loop"),
      h = $(a).data("items_tablet"),
      p = $(a).data("items_mobile"),
      v = $(a).data("center"),
      m = ($(a).data("start"), $(a).data("autowidth"));
    $(a).owlCarousel({
      navText: [
        '<i class="zmdi zmdi-chevron-left"></i>',
        '<i class="zmdi zmdi-chevron-right"></i>',
      ],
      lazyLoad: !0,
      lazyContent: !0,
      loop: u,
      autoplay: s,
      autoplayTimeout: o,
      items: r,
      margin: c,
      rtl: n,
      dots: d,
      nav: l,
      center: v,
      autoWidth: m,
      responsive: {
        0: { items: p, loop: !0, autoHeight: !0, autoWidth: !1 },
        768: { items: h, autoWidth: !1 },
        1200: { items: r, center: v },
      },
    });
  }),
  (theme.Nov_Slickcarousel = function e(t) {
    var i = (this.$container = $(t)).attr("data-section-id"),
      a = (this.slider = "#shopify-section-" + i + " .nov-slick-carousel");
    if ($("html").hasClass("lang-rtl")) var n = !0;
    else var n = !1;
    $(a).data("autoplay"), $(a).data("autoplaytimeout");
    var s = $(a).data("loop"),
      o = $(a).data("dots"),
      r = $(a).data("nav"),
      c = $(a).data("row"),
      l = $(a).data("row_mobile") ? $(a).data("row_mobile") : 1;
    (loop = $(a).data("loop")),
      (fade = $(a).data("fade")),
      (items = $(a).data("items")),
      (items_lg_desktop = $(a).data("items_lg_desktop")),
      (items_lg_tablet = $(a).data("items_lg_tablet")),
      (items_tablet = $(a).data("items_tablet")),
      (items_mobile = $(a).data("items_mobile")),
      (items_mobile_xs = $(a).data("items_mobile_xs")
        ? $(a).data("items_mobile_xs")
        : 1),
      void 0 !== (custombutton = $(a).data("custombutton")) && (r = !1),
      $(a).slick({
        nextArrow:
          '<div class="arrow-next"><i class="zmdi zmdi-chevron-right" aria-hidden="true"></i></div>',
        prevArrow:
          '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left" aria-hidden="true"></i></i></div>',
        rtl: n,
        slidesToShow: items,
        slidesToScroll: items,
        rows: c,
        arrows: r,
        dots: o,
        infinite: s,
        fade: fade,
        responsive: [
          {
            breakpoint: 1920,
            settings: { slidesToShow: items, slidesToScroll: items },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: items_lg_tablet,
              slidesToScroll: items_lg_tablet,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: items_tablet,
              slidesToScroll: items_tablet,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: items_mobile,
              slidesToScroll: items_mobile,
              rows: l,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: items_mobile_xs,
              slidesToScroll: items_mobile_xs,
              rows: l,
            },
          },
        ],
      }),
      "undefined" != typeof custombutton &&
        ($(".prev_custom", "#shopify-section-" + i).click(function () {
          $(a).slick("slickPrev");
        }),
        $(".next_custom", "#shopify-section-" + i).click(function () {
          $(a).slick("slickNext");
        }));
  }),
  (theme.Nov_SliderShow = function e(t) {
    var i = $(".main-slider"),
      a = i.data("autoplay"),
      n = i.data("speed"),
      s = i.data("arrows"),
      o = i.data("dots"),
      r = i.find(".embed-player"),
      c = i.find(".slide-image"),
      l = 0;
    function d(e, t) {
      null != e &&
        null != t &&
        e.contentWindow.postMessage(JSON.stringify(t), "*");
    }
    function u(e, t) {
      if (e[0]) {
        var i,
          a,
          n = $(".main-slider"),
          s = n.width(),
          o = n.height(),
          t = t || 16 / 9;
        e.each(function () {
          var e = $(this);
          s / t < o
            ? ((i = Math.ceil(o * t)),
              e
                .width(i)
                .height(o)
                .css({ left: (s - i) / 2, top: 0 }))
            : ((a = Math.ceil(s / t)),
              e
                .width(s)
                .height(a)
                .css({ left: 0, top: (o - a) / 2 }));
        });
      }
    }
    $(function () {
      if (
        (i.on("init", function (e) {
          (e = $(e.currentTarget)),
            u(r, 16 / 9),
            $(".caption-animate", ".slick-current").each(function () {
              var e = $(this).data("animate");
              $(this).addClass(e);
            }),
            $(".slide-image").addClass("zoom_img");
        }),
        i.on("beforeChange", function (e, t) {
          (t = $(t.$slider)),
            $(".caption-animate", ".slick-current").each(function () {
              var e = $(this).data("animate");
              $(this).removeClass(e);
            }),
            $(".slide-image").removeClass("zoom_img");
        }),
        i.on("afterChange", function (e, t) {
          $(".caption-animate", ".slick-current").each(function () {
            var e = $(this).data("animate");
            $(this).addClass(e);
          }),
            $(".slide-image").addClass("zoom_img"),
            (t = $(t.$slider));
        }),
        i.on("lazyLoaded", function (e, t, i, a) {
          ++l === c.length && c.addClass("show");
        }),
        $("html").hasClass("lang-rtl"))
      )
        var e = !0;
      else var e = !1;
      i.slick({
        fade: !0,
        nextArrow:
          '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
        prevArrow:
          '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
        autoplay: a,
        autoplaySpeed: n,
        lazyLoad: "progressive",
        speed: 600,
        arrows: s,
        dots: o,
        cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
        rtl: e,
        customPaging: function (e, t) {
          return "<button> 0" + (t + 1) + "</button>";
        },
      });
    }),
      $(window).on("resize.slickVideoPlayer", function () {
        u(r, 16 / 9);
      });
  }),
  (theme.Nov_SlickNavFor = function e(t) {
    var i = (this.$container = $(t)).attr("data-section-id"),
      a = (this.slider = "#shopify-section-" + i + " .nov-slick-carousel"),
      n = (this.slider = "#shopify-section-" + i + " .img_slider");
    if ($("html").hasClass("lang-rtl")) var s = !0;
    else var s = !1;
    var o = $(a).data("autoplay"),
      r = $(a).data("autoplaytimeout"),
      c = ($(a).data("loop"), $(a).data("dots")),
      l = $(a).data("nav"),
      d = ($(a).data("row"), $(a).data("items"));
    $(a).data("items_lg_tablet"),
      $(a).data("items_tablet"),
      $(a).data("items_mobile"),
      $(a).slick({
        nextArrow:
          '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
        prevArrow:
          '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
        rtl: s,
        initialSlide: d,
        slidesToShow: d,
        slidesToScroll: d,
        dots: c,
        arrows: !1,
        centerMode: !0,
        centerPadding: "0",
        infinite: !0,
        autoplay: o,
        autoplaySpeed: r,
        asNavFor: n,
      }),
      $(n).slick({
        nextArrow:
          '<div class="arrow-next"><i class="zmdi zmdi-chevron-down"></i></div>',
        prevArrow:
          '<div class="arrow-prev"><i class="zmdi zmdi-chevron-up"></i></div>',
        initialSlide: d,
        slidesToShow: d,
        slidesToScroll: d,
        dots: c,
        arrows: l,
        autoplay: o,
        rtl: s,
        infinite: !0,
        autoplaySpeed: r,
        focusOnSelect: !0,
        centerMode: !0,
        centerPadding: "81px",
        vertical: !0,
        asNavFor: a,
        responsive: [
          { breakpoint: 1200, settings: { centerPadding: "66px" } },
          {
            breakpoint: 992,
            settings: { centerPadding: "0", vertical: !1, slidesToShow: 3 },
          },
          {
            breakpoint: 768,
            settings: { centerPadding: "0", vertical: !1, slidesToShow: 3 },
          },
        ],
      });
  }),
  (theme.callbackReview = function () {
    if ($(".shopify-product-reviews-badge").length > 0)
      return (
        window.SPR.registerCallbacks(),
        window.SPR.initRatingHandler(),
        window.SPR.initDomEls(),
        window.SPR.loadProducts(),
        window.SPR.loadBadges()
      );
  }),
  (theme.Quotes = (function () {
    var e = {
        mediaQuerySmall: "screen and (max-width: 749px)",
        mediaQueryMediumUp: "screen and (min-width: 750px)",
        slideCount: 0,
      },
      t = {
        accessibility: !0,
        arrows: !1,
        dots: !0,
        autoplay: !1,
        touchThreshold: 20,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    function i(i) {
      var a = (this.$container = $(i)).attr("data-section-id"),
        n = (this.wrapper = ".quotes-wrapper"),
        s = $((this.slider = "#Quotes-" + a), n),
        o = !1,
        r = $.extend({}, t, {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: !0,
        });
      function c(e, t) {
        o && (e.slick("unslick"), (o = !1)), e.slick(t), (o = !0);
      }
      (e.slideCount = s.data("count")),
        e.slideCount < t.slidesToShow &&
          ((t.slidesToShow = e.slideCount), (t.slidesToScroll = e.slideCount)),
        s.on("init", this.a11y.bind(this)),
        enquire.register(e.mediaQuerySmall, {
          match: function () {
            c(s, r);
          },
        }),
        enquire.register(e.mediaQueryMediumUp, {
          match: function () {
            c(s, t);
          },
        });
    }
    return (
      (i.prototype = _.assignIn({}, i.prototype, {
        onUnload: function () {
          enquire.unregister(e.mediaQuerySmall),
            enquire.unregister(e.mediaQueryMediumUp),
            $(this.slider, this.wrapper).slick("unslick");
        },
        onBlockSelect: function (e) {
          var t = $(
            ".quotes-slide--" + e.detail.blockId + ":not(.slick-cloned)"
          ).data("slick-index");
          $(this.slider, this.wrapper).slick("slickGoTo", t);
        },
        a11y: function (e, t) {
          var i = t.$list,
            a = $(this.wrapper, this.$container);
          i.removeAttr("aria-live"),
            a.on("focusin", function (e) {
              a.has(e.target).length && i.attr("aria-live", "polite");
            }),
            a.on("focusout", function (e) {
              a.has(e.target).length && i.removeAttr("aria-live");
            });
        },
      })),
      i
    );
  })()),
  (theme.slideshows = {}),
  (theme.SlideshowSection = function e(t) {
    var i = (this.$container = $(t)).attr("data-section-id"),
      a = (this.slideshow = "#Slideshow-" + i);
    theme.slideshows[a] = new theme.Slideshow(a);
  }),
  (theme.SlideshowSection.prototype = _.assignIn(
    {},
    theme.SlideshowSection.prototype,
    {
      onUnload: function () {
        delete theme.slideshows[this.slideshow];
      },
      onBlockSelect: function (e) {
        var t = $(this.slideshow),
          i = $(
            ".slideshow__slide--" + e.detail.blockId + ":not(.slick-cloned)"
          ).data("slick-index");
        t.slick("slickGoTo", i).slick("slickPause");
      },
      onBlockDeselect: function () {
        $(this.slideshow).slick("slickPlay");
      },
    }
  )),
  $(document).ready(function () {
    var e = new theme.Sections();
    e.register("cart-template", theme.Cart),
      e.register("product", theme.Product),
      e.register("collection-template", theme.Filters),
      e.register("product-template", theme.Product),
      e.register("header-section", theme.HeaderSection),
      e.register("map", theme.Maps),
      e.register("slideshow-section", theme.Nov_SliderShow),
      e.register("nov-owl", theme.Nov_Owlcarousel),
      e.register("nov-owl-blog", theme.Nov_Owlcarousel),
      e.register("nov-slick", theme.Nov_Slickcarousel);
  }),
  (theme.init = function () {
    theme.customerTemplates.init(),
      theme.customerloginTemplates.init(),
      slate.rte.wrapTable({
        $tables: $(".rte table,.custom__item-inner--html table"),
        tableWrapperClass: "scrollable-wrapper",
      }),
      slate.a11y.pageLinkFocus($(window.location.hash)),
      $(".in-page-link").on("click", function (e) {
        slate.a11y.pageLinkFocus($(e.currentTarget.hash));
      }),
      $('a[href="#"]').on("click", function (e) {
        e.preventDefault();
      });
  }),
  $(theme.init);
