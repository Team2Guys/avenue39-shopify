!(function (t) {
  var a = localStorage.getItem("wishListsArr")
    ? JSON.parse(localStorage.getItem("wishListsArr"))
    : [];
  localStorage.setItem("wishListsArr", JSON.stringify(a)),
    a.length && (a = JSON.parse(localStorage.getItem("wishListsArr"))),
    t(document).ready(function () {
      i.init();
    });
  var i = {
    init: function () {
      this.closeModal(),
        this.novProductTabs(),
        this.initNovWishListIcons(),
        this.doAddOrRemoveWishlist(),
        t("body").hasClass("template-page") &&
          t(".wishlist-page").length &&
          this.initNovWishListsPage(),
        this.ajaxProductAddToCart(),
        this.ajaxAddToCart(),
        this.ajaxChangeFromCart(),
        this.initMiniCart(),
        this.ajaxRemoveFromCart(),
        this.initQuickView(),
        this.initQuickVariants(),
        this.changeQuantityPageCart(),
        this.initCollapseSidebarBlock();
    },
    initCollapseSidebarBlock: function () {
      t(document).on("click", ".facets__label", (a) => {
        var i = t(a.currentTarget),
          e = i.parent().find(".facets__content");
        i.hasClass("act")
          ? (i.removeClass("act"), e.slideUp())
          : (i.addClass("act"), e.slideDown());
      });
    },
    closeModal: function () {
      t(".close-modal, .overlay").click(function () {
        t(".loading-modal").css({
          opacity: "0",
          visibility: "hidden",
          transform: "translateX(410px)",
          transition: "all 0.3s",
        });
      });
    },
    novProductTabs: function () {
      t("[data-product-tabs]").each(function () {
        var a = t(this),
          e = a.find(".list-product-tabs").find("[data-product-tabTop]"),
          s = a.find("[data-product-TabContent]"),
          o = a.find(".list-product-tabs .tab-links.active"),
          n = a.find(".product-tabs-content .tab-content.active");
        i.doAjaxNovProductTabs(
          o.data("href"),
          n.find(".loading"),
          n.find(".products-grid")
        ),
          e.off("click").on("click", function (a) {
            if (
              (a.preventDefault(),
              a.stopPropagation(),
              !t(this).hasClass("active") && !t(this).hasClass("active"))
            ) {
              var o = t(this),
                n = t(o.data("target"));
              e.removeClass("active"),
                s.removeClass("active"),
                n.find(".products-grid").hasClass("slick-initialized") ||
                  i.doAjaxNovProductTabs(
                    o.data("href"),
                    n.find(".loading"),
                    n.find(".products-grid")
                  ),
                o.addClass("active"),
                n.addClass("active");
            }
          });
      });
    },
    doAjaxNovProductTabs: function (a, e, s) {
      t.ajax({
        type: "GET",
        url: window.router + a,
        success: function (o) {
          if (
            (e.hide(),
            "/collections/?view=json" == a ||
              "/collections/?view=new-json" == a)
          );
          else {
            if (
              (s.html(t(o).find(".grid-item").html()),
              s.hasClass("collection-carousel"))
            )
              s.hasClass("slick-initialized") ||
                i.initNovProductTabsSlider(s.parent());
            else {
              s.find(".block")
                .addClass("col-md-3 col-sm-6 col-xs-6")
                .find(".item")
                .removeClass("col");
              var n = s.data("limit") - 1;
              s.find(".block:gt(" + n + ")").hide();
            }
            Currency.convertAll(
              shopCurrency,
              t("#currencies span.selected").attr("data-currency")
            ),
              i.initNovWishListIcons();
          }
        },
      });
    },
    initNovProductTabsSlider: function (a) {
      a.each(function () {
        var a = t(this).find(".products-grid"),
          i = !!t("html").hasClass("lang-rtl");
        a.not(".slick-initialized") &&
          a.slick({
            nextArrow:
              '<div class="arrow-next"><i class="zmdi zmdi-chevron-right"></i></div>',
            prevArrow:
              '<div class="arrow-prev"><i class="zmdi zmdi-chevron-left"></i></div>',
            rtl: i,
            slidesToShow: (a.data("loop"), a.data("items")),
            slidesToScroll: (a.data("loop"), a.data("items")),
            rows: a.data("row"),
            arrows: a.data("nav"),
            dots: a.data("dots"),
            infinite: a.data("loop"),
            adaptiveHeight: !0,
            responsive: [
              {
                breakpoint: 1920,
                settings: {
                  slidesToShow: (a.data("loop"), a.data("items")),
                  slidesToScroll: (a.data("loop"), a.data("items")),
                },
              },
              {
                breakpoint: 1439,
                settings: {
                  slidesToShow: a.data("items_lg_desktop"),
                  slidesToScroll: a.data("items_lg_desktop"),
                },
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: a.data("items_lg_tablet"),
                  slidesToScroll: a.data("items_lg_tablet"),
                  arrows: !1,
                },
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: a.data("items_tablet"),
                  slidesToScroll: a.data("items_tablet"),
                  arrows: !1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: a.data("items_mobile"),
                  slidesToScroll: a.data("items_mobile"),
                  arrows: !1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: a.data("items_mobiles"),
                  slidesToScroll: a.data("items_mobiles"),
                  arrows: !1,
                },
              },
            ],
          });
      });
    },
    initNovWishListsPage: function () {
      "undefined" != typeof Storage
        ? !(a.length <= 0) &&
          a.forEach(function (t) {
            i.createNovWishListTplItem(t);
          })
        : alert("Storage no support!");
    },
    initNovWishListIcons: function () {
      if (a.length) {
        for (var e = 0; e < a.length; e++) {
          var s = t('[data-product-handle="' + a[e] + '"]');
          s.addClass("whislist-added"),
            s.find(".wishlist-text").text("Remove Wish List");
        }
        if ("undefined" != typeof Storage) {
          if (a.length <= 0) return;
          setTimeout(function () {
            a.forEach(function (t) {
              i.setNovAddedForWishlistIcon(t);
            });
          }, 1e3);
        } else alert("Storage no support!");
      }
    },
    setNovAddedForWishlistIcon: function (i) {
      var e = t('[data-product-handle="' + i + '"]');
      a.indexOf(i) >= 0
        ? (e.addClass("whislist-added"),
          e.find(".wishlist-text").text("Remove Wish List"))
        : (e.removeClass("whislist-added"),
          e.find(".wishlist-text").text("Add to Wish List"));
    },
    doAddOrRemoveWishlist: function () {
      var e = ".item-product [data-icon-wishlist]";
      t(document)
        .off("click.addOrRemoveWishlist", e)
        .on("click.addOrRemoveWishlist", e, function (e) {
          e.preventDefault();
          var s = t(this),
            o = s.data("id"),
            n = s.data("product-handle"),
            r = a.indexOf(n);
          if (s.hasClass("whislist-added"))
            s.removeClass("whislist-added"),
              s.find(".wishlist-text").text("Add to Wish List"),
              t('[data-wishlist-added="wishlist-' + o + '"]').length &&
                t('[data-wishlist-added="wishlist-' + o + '"]').remove(),
              a.splice(r, 1),
              localStorage.setItem("wishListsArr", JSON.stringify(a));
          else {
            s.addClass("whislist-added"),
              s.find(".wishlist-text").text("Remove Wish List");
            var c = s.parents(".item-product").find(".product__title").html(),
              l = s
                .parents(".item-product")
                .find(".product__thumbnail")
                .attr("src");
            t(".loading-modal").find(".product-title").html(c),
              t(".loading-modal").find(".product-image").attr("src", l),
              t(".loading-modal").find(".btn-wishlist").show(),
              t(".loading-modal").css({
                display: "block",
                opacity: "1",
                visibility: "initial",
                transform: "translateX(0)",
                transition: "all 0.3s",
              }),
              setTimeout(function () {
                t(".loading-modal").css({
                  opacity: "0",
                  visibility: "hidden",
                  transform: "translateX(410px)",
                  transition: "all 0.3s",
                });
              }, 5e3),
              t("[data-wishlist-container]").length &&
                i.createNovWishListTplItem(n),
              a.push(n),
              localStorage.setItem("wishListsArr", JSON.stringify(a));
          }
          i.setNovAddedForWishlistIcon(n);
        });
    },
//     createNovWishListTplItem: function (a) {
//       var i = t("[data-wishlist-container]");
//       jQuery.getJSON(window.router + "/products/" + a + ".js", function (t) {
//         var a = "",
//           e = Shopify.formatMoney(t.price_min, "Dhs {{ amount}}");
//         (a +=
//           '<div class="grid-item" data-wishlist-added="wishlist-' +
//           t.id +
//           '">'),
//           (a +=
//             '<div class="inner item-product row align-items-center" data-product-id="product-' +
//             t.handle +
//             '">'),
//           (a +=
//             '<div class="column_content col-xl-5 col-lg-5 col-md-4 col-sm-12 col-xs-12"><div class="product-image">'),
//           (a +=
//             '<a href="' +
//             t.url +
//             '" class="product-grid-image" data-collections-related="/collections/all?view=related">'),
//           (a +=
//             '<img src="' +
//             t.featured_image +
//             '" alt="' +
//             t.featured_image.alt +
//             '">'),
//           (a += "</a></div>"),
//           (a += '<div class="product-info">'),
//           (a += '<div class="product-title">'),
//           (a +=
//             '<a href="' +
//             t.url +
//             '" title="' +
//             t.title +
//             '">' +
//             t.title +
//             "</a></div></div></div>"),
//           (a +=
//             '<div class="column_content col-xl-3 col-lg-3 col-md-2 col-sm-12 col-xs-12 text-center"><div class="price-box">' +
//             e +
//             "</div></div>"),
//           (a +=
//             '<div class="column_content col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 text-center">'<a class="btn whislist-added" href="#" onclick="removeFromWishlist(this, \'' +
// t.handle +
// '\'); return false;" data-icon-wishlist data-id="' +
// t.id +
// '"><i class="fa fa-trash-o" aria-hidden="true"></i> ' +
// theme.strings.remove +
// '</a></div>"),
//           (a +=
//             '<div class="column_content col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 text-center">'),
//           (a +=
//             '<form action="/cart/add" method="post" class="variants formAddToCart" id="-' +
//             t.id +
//             '" data-id="product-actions-' +
//             t.id +
//             '" enctype="multipart/form-data">'),
//           t.available
//             ? (1 == t.variants.length &&
//                 (a +=
//                   '<button class="btn btnAddToCart" type="submit" data-form-id="#-' +
//                   t.id +
//                   '" data-pid="' +
//                   t.variants[0].id +
//                   '" ><i class="zmdi zmdi-shopping-cart"></i><span>' +
//                   theme.strings.addToCart +
//                   '</span></button><input type="hidden" name="id" value="' +
//                   t.variants[0].id +
//                   '" />'),
//               t.variants.length > 1 &&
//                 (a +=
//                   '<a class="btn btnAddToCart btnChooseVariant" title="' +
//                   t.title +
//                   '" href="javascript:void(0);" data-url="' +
//                   t.url +
//                   '?view=json"><i class="zmdi zmdi-check"></i><span>' +
//                   theme.strings.select_options +
//                   "</span></a>"))
//             : (a +=
//                 '<button class="btn btnAddToCart" type="button" >' +
//                 theme.strings.soldOut +
//                 "</button>"),
//           (a += "</form></div>"),
//           (a += "</div></div>"),
//           i.append(a);
//       });
//     },
    createNovWishListTplItem: function (a) {
  var i = t("[data-wishlist-container]");
  jQuery.getJSON(window.router + "/products/" + a + ".js", function (t) {
    var a = "",
      e = Shopify.formatMoney(t.price_min, "Dhs {{ amount}}");

    a += '<div class="grid-item" data-wishlist-added="wishlist-' + t.id + '">';
    a += '<div class="inner item-product row align-items-center" data-product-id="product-' + t.handle + '">';

    // Image + Title
    a += '<div class="column_content col-xl-5 col-lg-5 col-md-4 col-sm-12 col-xs-12">';
    a += '<div class="product-image">';
    a += '<a href="' + t.url + '" class="product-grid-image" data-collections-related="/collections/all?view=related">';
    a += '<img src="' + t.featured_image + '" alt="' + (t.featured_image.alt || '') + '">';
    a += '</a></div>';
    a += '<div class="product-info">';
    a += '<div class="product-title">';
    a += '<a href="' + t.url + '" title="' + t.title + '">' + t.title + '</a>';
    a += '</div></div></div>';

    // Price
    a += '<div class="column_content col-xl-3 col-lg-3 col-md-2 col-sm-12 col-xs-12 text-center">';
    a += '<div class="price-box">' + e + '</div>';
    a += '</div>';

    // Remove from wishlist
    a += '<div class="column_content col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 text-center">';
    a += '<a class="btn whislist-added" href="#" onclick="removeFromWishlist(this, \'' + t.handle + '\'); return false;"';
    a += ' data-icon-wishlist data-id="' + t.id + '">';
    a += '<i class="fa fa-trash-o" aria-hidden="true"></i> ' + theme.strings.remove;
    a += '</a></div>';

    // Add to cart or choose variant
    a += '<div class="column_content col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 text-center">';
    a += '<form action="/cart/add" method="post" class="variants formAddToCart" id="-' + t.id + '" data-id="product-actions-' + t.id + '" enctype="multipart/form-data">';

    if (t.available) {
      if (t.variants.length === 1) {
        a += '<button class="btn btnAddToCart" type="submit" data-form-id="#-' + t.id + '" data-pid="' + t.variants[0].id + '" onclick="addToCartAndRemoveFromWishlist(this, \'' + t.handle + '\')">';
        a += '<i class="zmdi zmdi-shopping-cart"></i><span>' + theme.strings.addToCart + '</span></button>';
        a += '<input type="hidden" name="id" value="' + t.variants[0].id + '" />';
      } else {
        a += '<a class="btn btnAddToCart btnChooseVariant" title="' + t.title + '" href="javascript:void(0);" data-url="' + t.url + '?view=json">';
        a += '<i class="zmdi zmdi-check"></i><span>' + theme.strings.select_options + '</span></a>';
      }
    } else {
      a += '<button class="btn btnAddToCart" type="button">' + theme.strings.soldOut + '</button>';
    }

    a += '</form></div>'; // end Add to Cart column
    a += '</div></div>'; // end inner + grid-item
    i.append(a);
  });
},

    ajaxAddToCart: function () {
      t(document).on("click", "button.btnAddToCart", function (a) {
        a.preventDefault();
        var e = t(this),
          s = e.data("pid");
        e.addClass("btn-loading"),
          e.parent().addClass("fix_nt_tt"),
          t("body").addClass("loading"),
          t
            .ajax({
              type: "POST",
              url: "/cart/add.js",
              data: { quantity: 1, id: s },
              dataType: "json",
              success: function (a) {
                t.get("/cart?view=json", function (a) {
                  t("#cart-info").html(a);
                }).always(function () {
                  Currency.convertAll(
                    shopCurrency,
                    t("#currencies span.selected").attr("data-currency")
                  ),
                    i.initAddToCart(a.image, a.title),
                    i.updateMiniCart(),
                    i.PopupAddToCart(),
                    i.initQuickVariants(),
                    e
                      .removeAttr("disabled")
                      .css("pointer-events", "auto")
                      .removeClass("btn-loading"),
                    t("body").removeClass("loading"),
                    t(document).find(".quickviewClose").trigger("click");
                });
              },
              error: function (t, a) {
                e.removeClass("btn-loading");
              },
            })
            .done(function () {
              t("body").removeClass("loading");
            });
      });
    },
    initAddToCart: function (a, e) {
      t.ajax({
        url: "/cart/?view=upsell",
        dataType: "html",
        type: "GET",
        beforeSend: function () {
          t("body").addClass("cart_popup_opened"),
            t("body").addClass("loading"),
            t("#jas-wrapper").after(
              '<div class="loader"><div class="loader-inner"></div></div>'
            );
        },
        success: function (a) {
          t.magnificPopup.open({
            items: {
              src:
                '<div class="nov-with-anim product-quickview popup-quick-view cart__popup cart__popup_upsell"><div id="content_cart__popup_nt">' +
                a +
                "</div></div>",
              type: "inline",
            },
            removalDelay: 500,
            callbacks: {
              beforeOpen: function () {
                this.st.mainClass = "nov-move-horizontal";
              },
              open: function () {
                i.PopupAddToCart(),
                  i.initQuickVariants(),
                  Currency.convertAll(
                    shopCurrency,
                    t("#currencies span.selected").attr("data-currency")
                  );
              },
              change: function () {},
              close: function () {
                t("body").hasClass("template-cart")
                  ? window.location.reload()
                  : (t("body").removeClass("cart_popup_opened"),
                    t("body").removeClass("open_quick_variants"),
                    t("body").removeClass("loading"),
                    t("#content_cart__popup_nt").empty());
              },
            },
          });
        },
        complete: function () {
          i.PopupAddToCart(),
            Currency.convertAll(
              shopCurrency,
              t("#currencies span.selected").attr("data-currency")
            ),
            t(".loader").remove();
        },
        error: function () {
          t(".loader").remove();
        },
      });
    },
    updateMiniCart: function () {
      Shopify.getCart(function (t) {
        i.doUpdateMiniCart(t);
      });
    },
    doUpdateMiniCart: function (a) {
      t("#CartCount").text(a.item_count),
        t(".cart-popup-heading span").html(
          "There are " + a.item_count + " item(s) in your cart"
        );
    },
    ajaxChangeFromCart: function () {
      t(document).on("change", ".cart__popup-qty--input", function (t) {
        t.preventDefault();
      });
    },
    PopupAddToCart: function () {
      t(document).on("click", ".cart__popup-qty", function (a) {
        a.preventDefault();
        var e,
          s,
          o = t(this),
          n = o.siblings(".cart__popup-qty--input"),
          r = n.attr("data-id"),
          c = parseFloat(n.val()),
          l = parseFloat(n.attr("step")),
          d = parseFloat(n.attr("min")),
          u = parseFloat(n.attr("max"));
        if (o.hasClass("cart__popup-qty--plus")) {
          var p = c + l;
          if (p > u && u > 0) {
            n.val(u);
            return;
          }
        } else if (o.hasClass("cart__popup-qty--minus")) {
          var p = c - l;
          if (0 === p) {
            var m = parseInt(n.attr("value"));
            n.val(m),
              o
                .parents(".cart__popup-item")
                .find(".cart__popup-remove")
                .trigger("click");
            return;
          }
          if (p < d) return;
          if (c < 0) {
            alert("Invalid");
            return;
          }
        }
        (e = r),
          (s = p),
          t(".cart__popup").addClass("loading"),
          t.ajax({
            type: "POST",
            url: "/cart/change.js",
            data: "quantity=" + s + "&id=" + e,
            dataType: "json",
            success: function (a) {
              jQuery
                .get("/cart?view=up_ajax", function (a) {
                  a = jQuery(a);
                  var i = jQuery(a),
                    o = jQuery(i.get(0)).html(),
                    n = jQuery(i.get(2)).html(),
                    r = t(".cart__popup #" + e).find(
                      ".cart__popup-total .amount"
                    );
                  t(".cart__popup #" + e)
                    .find(".cart__popup-qty--input")
                    .val(s);
                  var c = parseFloat(r.data("price")) * s;
                  r.html(Shopify.formatMoney(c, theme.moneyFormat)),
                    t("#cart__popup_total").html(o),
                    t("#threshold_bar_popup").html(n);
                })
                .always(function () {
                  Currency.convertAll(
                    shopCurrency,
                    t("#currencies span.selected").attr("data-currency")
                  ),
                    t(".cart__popup").removeClass("loading");
                }),
                t
                  .get("/cart?view=json", function (a) {
                    t("#cart-info").html(a);
                  })
                  .always(function () {
                    Currency.convertAll(
                      shopCurrency,
                      t("#currencies span.selected").attr("data-currency")
                    ),
                      i.updateMiniCart();
                  });
            },
            error: function (a, i) {
              t(".cart__popup").removeClass("loading");
            },
          });
      }),
        t(document).on("click", ".cart__popup-remove", function (a) {
          a.preventDefault(), t(".cart__popup").addClass("loading");
          var e = t(this),
            s = e
              .siblings(".cart__popup-quantity")
              .find(".cart__popup-qty--input"),
            o = e.find("a").attr("data-product-id"),
            n = parseInt(s.val());
          ($ptitle = e
            .parent(".cart__popup-item")
            .find(".cart__popup-title a")
            .text()),
            t(".cart__popup").addClass("loading"),
            t.ajax({
              type: "POST",
              url: "/cart/change.js",
              data: "quantity=0&id=" + o,
              dataType: "json",
              success: function (a) {
                jQuery
                  .get("/cart?view=up_ajax", function (t) {})
                  .always(function (a) {
                    a = jQuery(a);
                    var i = jQuery(a),
                      s = jQuery(i.get(0)).html(),
                      r = jQuery(i.get(2)).html();
                    t("#cart__popup_total").html(s),
                      t("#threshold_bar_popup").html(r),
                      t(".cart__popup #" + o).addClass("hide"),
                      n > 0
                        ? t("#" + o + " input").val(n)
                        : t(".cart__popup #" + o + " input").val(1),
                      Currency.convertAll(
                        shopCurrency,
                        t("#currencies span.selected").attr("data-currency")
                      ),
                      t(".cart__popup .cart-message").html(
                        '<i class="fa fa-trash-o"></i> <strong>' +
                          $ptitle +
                          "</strong> - has been removed into your shopping cart."
                      ),
                      t(".cart__popup .cart-message")
                        .removeClass("removed")
                        .addClass("removed"),
                      t(".cart__popup").removeClass("loading"),
                      e.parents(".cart__popup-item").remove();
                  }),
                  t
                    .get("/cart?view=json", function (a) {
                      t("#cart-info").html(a);
                    })
                    .always(function () {
                      Currency.convertAll(
                        shopCurrency,
                        t("#currencies span.selected").attr("data-currency")
                      ),
                        i.updateMiniCart();
                    });
              },
            });
        });
    },
    initMiniCart: function () {
      jQuery.getJSON("/cart.js", function (a) {
        if (
          (t("#CartCount").text(a.item_count),
          t("#cart-info").html(""),
          a.item_count > 0)
        ) {
          var i = "";
          (i += '<form action="/cart" method="post" class="cart ajaxcart">'),
            (i += '<div class="ajaxcart__inner">');
          for (var e = 0; e < a.items.length; e++) {
            var s = Shopify.resizeImage(a.items[e].image, "small"),
              o = Shopify.formatMoney(a.items[e].price, theme.moneyFormat);
            (i += '<div class="ajaxcart__product" data-line="' + e + '">'),
              (i += '<div class="media">'),
              (i +=
                '<a href="' +
                a.items[e].url +
                '"><img class="d-flex product-image" src="' +
                s +
                '" alt="' +
                a.items[e].title +
                '" title="' +
                a.items[e].title +
                '"></a>'),
              (i += '<div class="media-body">'),
              (i +=
                '<a class="product-name" href="' +
                a.items[e].url +
                '">' +
                a.items[e].title +
                "</a>"),
              (i += '<div class="mb-5"></div>'),
              (i +=
                '<span class="product-price"><span class="money">' +
                o +
                "</span></span>"),
              (i +=
                '<span class="quantity"> x ' + a.items[e].quantity + "</span>"),
              (i +=
                '<a class="remove-from-cart" rel="nofollow" href="#" title="remove from cart" data-line="' +
                e +
                '" data-product-id="' +
                a.items[e].id +
                '"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'),
              (i += "</div>"),
              (i += "</div>"),
              (i += "</div>");
          }
          i += "</div>";
          var o = a.total_price,
            n = theme.freeshipping_value;
          if (!0 == theme.show_free_shipping) {
            if (parseFloat(o / 100) < parseFloat(n)) {
              var r = (parseFloat(n) - parseFloat(o / 100)).toFixed(0);
              (i += '<div id="threshold_bar_popup_minicart">'),
                (i += '<div class="cart_threshold">'),
                (i +=
                  '<div class="threshold_spend">' +
                  theme.strings.spend +
                  " " +
                  Shopify.formatMoney(100 * r, theme.moneyFormat) +
                  " " +
                  theme.strings.spend__html +
                  "</div>"),
                (i += '<div class="threshold_bar">'),
                (i +=
                  '<span class="animate" style="width:' +
                  (o / n).toFixed(0) +
                  '%!important">' +
                  (o / n).toFixed(0) +
                  "%</span>"),
                (i += "</div>"),
                (i += "</div>"),
                (i += "</div>");
            } else
              (i += '<div id="threshold_bar_popup_minicart">'),
                (i += '<div class="threshold_bar hide">'),
                (i +=
                  '<span class="animate" style="width: 100% !important;">100%</span>'),
                (i += "</div>"),
                (i += '<p class="content_threshold threshold_congrats">'),
                (i +=
                  "<span>" +
                  theme.strings.content_threshold +
                  '</span><i class="zmdi zmdi-truck"></i>'),
                (i += "</p>"),
                (i += "</div>");
          }
          (i += '<div class="ajaxcart__footer">'),
            (i +=
              '<div class="subtotal d-flex align-items-center justify-content-between">'),
            (i += "<label>" + theme.strings.total + "</label>"),
            (i +=
              '<span class="money">' +
              Shopify.formatMoney(a.total_price, theme.moneyFormat) +
              "</span>"),
            (i += "</div>"),
            (i += '<div class="btn_submit">'),
            (i +=
              '<button type="submit" class="btn btn-success cart__checkout" name="checkout"><span>' +
              theme.strings.check_out +
              "</span></button>"),
            (i +=
              '<a href="/cart" class="btn btn-success"><span>' +
              theme.strings.view_cart +
              "</span></a>"),
            (i += "</div>"),
            (i += "</div>"),
            (i += "</form>"),
            t("#cart-info").append(i),
            Currency.convertAll(
              shopCurrency,
              t("#currencies span.selected").attr("data-currency")
            );
        }
      });
    },
    ajaxProductAddToCart: function () {
      t(document).on("click", ".product-form__cart-submit", function (a) {
        a.preventDefault();
        var e = t(this);
        t.ajax({
          type: "POST",
          url: "/cart/add.js",
          data: e.parents("form").serialize(),
          dataType: "json",
          success: function (a) {
            t.get("/cart?view=json", function (a) {
              t("#cart-info").html(a);
            }).always(function () {
              Currency.convertAll(
                shopCurrency,
                t("#currencies span.selected").attr("data-currency")
              ),
                i.initAddToCart(a.image, a.title),
                i.updateMiniCart(),
                i.PopupAddToCart(),
                t(document).find(".quickviewClose").trigger("click");
            });
          },
          complete: function () {
            t("body").removeClass("cart_popup_opened"),
              t("body").removeClass("loading"),
              t(".nov-close, .cart_popup_opened .nov-ready").on(
                "click",
                function () {
                  t("body").hasClass("template-cart") &&
                    window.location.reload();
                }
              );
          },
        });
      });
    },
    initQuickView: function () {
      t(document).on("click", ".btnProductQuickview", function (a) {
        a.preventDefault();
        var i = t(this);
        t.ajax({
          beforeSend: function () {
            i.addClass("btn-loading"),
              t("body").addClass("open_gl_quick_view"),
              t("body").addClass("loading");
          },
          url: i.attr("data-url"),
          success: function (a) {
            t.magnificPopup.open({
              items: {
                src:
                  '<div class="nov-with-anim popup-quick-view" id="content_quickview">' +
                  a +
                  "</div>",
                type: "inline",
              },
              removalDelay: 500,
              callbacks: {
                beforeOpen: function () {
                  this.st.mainClass = "nov-move-horizontal";
                },
                open: function () {
                  rtl = !!t("html").hasClass("lang-rtl");
                  var a = t("#productThumbs .owl-carousel").data("autoplay"),
                    i = t("#productThumbs .owl-carousel").data(
                      "autoplayTimeout"
                    ),
                    e = t("#productThumbs .owl-carousel").data("items"),
                    s = t("#productThumbs .owl-carousel").data("margin"),
                    o = t("#productThumbs .owl-carousel").data("nav"),
                    n = t("#productThumbs .owl-carousel").data("dots"),
                    r = t("#productThumbs .owl-carousel").data("loop"),
                    c = t("#productThumbs .owl-carousel").data("items_tablet")
                      ? t("#productThumbs .owl-carousel").data("items_tablet")
                      : 3,
                    l = t("#productThumbs .owl-carousel").data("items_mobile")
                      ? t("#productThumbs .owl-carousel").data("items_mobile")
                      : 1,
                    d =
                      !!t("#productThumbs .owl-carousel").data("center") &&
                      t("#productThumbs .owl-carousel").data("center"),
                    u = t("#productThumbs .owl-carousel").data("start")
                      ? t("#productThumbs .owl-carousel").data("start")
                      : 0;
                  t("#productThumbs .owl-carousel").owlCarousel({
                    navText: [
                      '<i class="fa fa-long-arrow-left"></i>',
                      '<i class="fa fa-long-arrow-right"></i>',
                    ],
                    lazyLoad: !0,
                    lazyContent: !0,
                    loop: r,
                    autoplay: a,
                    autoplayTimeout: i,
                    items: e,
                    margin: s,
                    rtl: rtl,
                    dots: n,
                    nav: o,
                    responsive: {
                      0: { items: l, center: d, margin: 10 },
                      768: { items: c, margin: 10 },
                      992: { items: e, margin: s },
                      1200: { items: e, startPosition: u, margin: s },
                    },
                  }),
                    Shopify.PaymentButton.init(),
                    Currency.convertAll(
                      shopCurrency,
                      t("#currencies span.selected").attr("data-currency")
                    ),
                    setTimeout(function () {
                      if (
                        t(".shopify-product-reviews-badge").length &&
                        t(".spr-badge").length
                      )
                        return (
                          window.SPR.registerCallbacks(),
                          window.SPR.initRatingHandler(),
                          window.SPR.initDomEls(),
                          window.SPR.loadProducts(),
                          window.SPR.loadBadges()
                        );
                    }, 1e3),
                    jQuery(function () {
                      jQuery(".swatch :radio").change(function () {
                        var a = jQuery(this)
                            .closest(".swatch")
                            .attr("data-option-index"),
                          i = jQuery(this).val();
                        jQuery(this)
                          .closest("form")
                          .find(".single-option-selector")
                          .eq(a)
                          .val(i)
                          .trigger("change"),
                          t(this)
                            .parents(".watch_availabel")
                            .find("span.variant_current")
                            .text(i);
                      });
                    });
                },
                close: function () {
                  t("#content_quickview").empty(),
                    t("body").removeClass("open_gl_quick_view"),
                    t("body").removeClass("cart_popup_opened"),
                    t("body").removeClass("open_quick_variants"),
                    t("body").removeClass("loading");
                },
              },
            });
          },
          complete: function () {
            Shopify.PaymentButton.init();
          },
        }).done(function () {
          i.removeClass("btn-loading");
        });
      });
    },
    initQuickVariants: function () {
      t(document).on("click", ".btnChooseVariant", function (a) {
        a.preventDefault();
        var e = t(this);
        t.ajax({
          beforeSend: function () {
            e.addClass("btn-loading"),
              t("body").addClass("open_quick_variants"),
              t("body").addClass("loading");
          },
          url: e.attr("data-url"),
          success: function (a) {
            t.magnificPopup.open({
              items: {
                src:
                  '<div class="nov-with-anim popup-quick-view" id="content_variants">' +
                  a +
                  "</div>",
                type: "inline",
              },
              removalDelay: 500,
              callbacks: {
                beforeOpen: function () {
                  this.st.mainClass = "nov-move-horizontal";
                },
                open: function () {
                  Currency.convertAll(
                    shopCurrency,
                    t("#currencies span.selected").attr("data-currency")
                  ),
                    jQuery(function () {
                      jQuery(".swatch :radio").change(function () {
                        var a = jQuery(this)
                            .closest(".swatch")
                            .attr("data-option-index"),
                          i = jQuery(this).val();
                        jQuery(this)
                          .closest("form")
                          .find(".single-option-selector")
                          .eq(a)
                          .val(i)
                          .trigger("change"),
                          t(this)
                            .parents(".watch_availabel")
                            .find("span.variant_current")
                            .text(i);
                      });
                    }),
                    i.PopupAddToCart();
                },
                close: function () {
                  t("body").hasClass("template-cart")
                    ? window.location.reload()
                    : (t("#content_variants").empty(),
                      t("body").removeClass("open_quick_variants"),
                      t("body").removeClass("cart_popup_opened"),
                      t("body").removeClass("loading"));
                },
              },
            });
          },
          complete: function () {
            Shopify.PaymentButton.init(),
              jQuery(function () {
                jQuery(".swatch :radio").change(function () {
                  var a = jQuery(this)
                      .closest(".swatch")
                      .attr("data-option-index"),
                    i = jQuery(this).val();
                  jQuery(this)
                    .closest("form")
                    .find(".single-option-selector")
                    .eq(a)
                    .val(i)
                    .trigger("change"),
                    t(this)
                      .parents(".watch_availabel")
                      .find("span.variant_current")
                      .text(i);
                });
              });
          },
        }).done(function () {
          e.removeClass("btn-loading"), t("body").removeClass("loading");
        });
      });
    },
    ajaxRemoveFromCart: function () {
      t("#cart-info").on("click", ".remove-from-cart", function (a) {
        a.preventDefault();
        var e = t(this).attr("data-product-id");
        t.ajax({
          type: "POST",
          url: "/cart/change.js",
          data: "quantity=0&id=" + e,
          dataType: "json",
          success: function (a) {
            t("body").hasClass("template-cart")
              ? window.location.reload()
              : i.initMiniCart();
          },
        });
      });
    },
    changeQuantityPageCart: function () {
      t(document).on(
        "change keyup",
        ".cart__qty-input, .cart__popup-qty--input",
        function () {
          var a,
            e,
            s,
            o = t(this),
            n = o.data("line"),
            r = parseInt(o.val()),
            c = o.data("price"),
            l = o.attr("max");
          if (isNaN(r)) return 0;
          (l = isNaN(parseInt(l)) ? 9999 : parseInt(l)),
            r > l && o.attr("value", l).val(l),
            (r = r > l ? l : r) <= 0 && o.closest("tr").remove(),
            (a = n),
            (e = r),
            (s = function (a) {
              t(".cart__subtotal").html(
                Shopify.formatMoney(a.total_price, theme.moneyFormat)
              ),
                o
                  .parents(".cart_item")
                  .find(".product-subtotal")
                  .html(Shopify.formatMoney(c * r, theme.moneyFormat)),
                t("#CartCount").html(a.item_count),
                t(".cart__heading span").html(
                  "There are " + a.item_count + " items in your cart"
                ),
                Currency.convertAll(
                  shopCurrency,
                  t("#currencies span.selected").attr("data-currency")
                ),
                jQuery.get("/cart?view=ship", function (a) {
                  t("#threshold_bar_popup").html(a),
                    setTimeout(function () {
                      Currency.convertAll(
                        shopCurrency,
                        t("#currencies span.selected").attr("data-currency")
                      );
                    }, 200);
                }),
                t
                  .get("/cart?view=json", function (a) {
                    t("#cart-info").html(a);
                  })
                  .always(function () {
                    Currency.convertAll(
                      shopCurrency,
                      t("#currencies span.selected").attr("data-currency")
                    ),
                      i.updateMiniCart();
                  });
            }),
            jQuery.ajax({
              type: "POST",
              url: "/cart/change.js",
              data: "quantity=" + e + "&line=" + a,
              dataType: "json",
              success: function (t) {
                "function" == typeof s && s(t);
              },
              error: function (t, a) {},
            });
        }
      ),
        t(document).on("click", ".plus, .minus", function () {
          var a = t(this).closest(".cart__qty").find(".cart__qty-input"),
            i = parseFloat(a.val()),
            e = parseFloat(a.attr("max")),
            s = parseFloat(a.attr("min")),
            o = a.attr("step");
          (i && "" !== i && "NaN" !== i) || (i = 0),
            ("" === e || "NaN" === e) && (e = ""),
            ("" === s || "NaN" === s) && (s = 0),
            ("any" === o ||
              "" === o ||
              void 0 === o ||
              "NaN" === parseFloat(o)) &&
              (o = 1),
            t(this).is(".plus")
              ? e && i >= e
                ? a.val(e)
                : a.val(i + parseFloat(o))
              : s && i <= s
              ? a.val(s)
              : i > 0 && a.val(i - parseFloat(o)),
            a.trigger("change");
        }),
        t(document).on(
          "click",
          ".quick_view-qty-plus, .quick_view-qty-minus",
          function () {
            var a = t(this)
                .closest(".quick_view_qty")
                .find('input[name="quantity"]'),
              i = parseFloat(a.val()),
              e = parseFloat(a.attr("max")),
              s = parseFloat(a.attr("min")),
              o = a.attr("step");
            (i && "" !== i && "NaN" !== i) || (i = 0),
              ("" === e || "NaN" === e) && (e = ""),
              ("" === s || "NaN" === s) && (s = 0),
              ("any" === o ||
                "" === o ||
                void 0 === o ||
                "NaN" === parseFloat(o)) &&
                (o = 1),
              t(this).is(".quick_view-qty-plus")
                ? e && i >= e
                  ? a.val(e)
                  : a.val(i + parseFloat(o))
                : s && i <= s
                ? a.val(s)
                : i > 0 && a.val(i - parseFloat(o));
          }
        );
    },
  };
})(jQuery);
