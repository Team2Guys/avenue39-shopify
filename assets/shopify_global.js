function getFocusableElements(e) {
  return Array.from(
    e.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}
document.querySelectorAll('[id^="Details-"] summary').forEach((e) => {
  e.setAttribute("role", "button"),
    e.setAttribute("aria-expanded", "false"),
    e.nextElementSibling.getAttribute("id") &&
      e.setAttribute("aria-controls", e.nextElementSibling.id),
    e.addEventListener("click", (e) => {
      e.currentTarget.setAttribute(
        "aria-expanded",
        !e.currentTarget.closest("details").hasAttribute("open")
      );
    }),
    e.closest("header-drawer") ||
      e.parentElement.addEventListener("keyup", onKeyUpEscape);
});
const trapFocusHandlers = {};
function trapFocus(e, t = e) {
  var i = getFocusableElements(e),
    s = i[0],
    r = i[i.length - 1];
  removeTrapFocus(),
    (trapFocusHandlers.focusin = (t) => {
      (t.target === e || t.target === r || t.target === s) &&
        document.addEventListener("keydown", trapFocusHandlers.keydown);
    }),
    (trapFocusHandlers.focusout = function () {
      document.removeEventListener("keydown", trapFocusHandlers.keydown);
    }),
    (trapFocusHandlers.keydown = function (t) {
      "TAB" === t.code.toUpperCase() &&
        (t.target !== r || t.shiftKey || (t.preventDefault(), s.focus()),
        (t.target === e || t.target === s) &&
          t.shiftKey &&
          (t.preventDefault(), r.focus()));
    }),
    document.addEventListener("focusout", trapFocusHandlers.focusout),
    document.addEventListener("focusin", trapFocusHandlers.focusin),
    t.focus();
}
try {
  document.querySelector(":focus-visible");
} catch {
  focusVisiblePolyfill();
}
function focusVisiblePolyfill() {
  let e = [
      "ARROWUP",
      "ARROWDOWN",
      "ARROWLEFT",
      "ARROWRIGHT",
      "TAB",
      "ENTER",
      "SPACE",
      "ESCAPE",
      "HOME",
      "END",
      "PAGEUP",
      "PAGEDOWN",
    ],
    t = null,
    i = null;
  window.addEventListener("keydown", (t) => {
    e.includes(t.code.toUpperCase()) && (i = !1);
  }),
    window.addEventListener("mousedown", (e) => {
      i = !0;
    }),
    window.addEventListener(
      "focus",
      () => {
        t && t.classList.remove("focused"),
          i || (t = document.activeElement).classList.add("focused");
      },
      !0
    );
}
function pauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach((e) => {
    e.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }),
    document.querySelectorAll(".js-vimeo").forEach((e) => {
      e.contentWindow.postMessage('{"method":"pause"}', "*");
    }),
    document.querySelectorAll("video").forEach((e) => e.pause()),
    document.querySelectorAll("product-model").forEach((e) => {
      e.modelViewerUI && e.modelViewerUI.pause();
    });
}
function removeTrapFocus(e = null) {
  document.removeEventListener("focusin", trapFocusHandlers.focusin),
    document.removeEventListener("focusout", trapFocusHandlers.focusout),
    document.removeEventListener("keydown", trapFocusHandlers.keydown),
    e && e.focus();
}
function onKeyUpEscape(e) {
  if ("ESCAPE" !== e.code.toUpperCase()) return;
  let t = e.target.closest("details[open]");
  if (!t) return;
  let i = t.querySelector("summary");
  t.removeAttribute("open"), i.setAttribute("aria-expanded", !1), i.focus();
}
class QuantityInput extends HTMLElement {
  constructor() {
    super(),
      (this.input = this.querySelector("input")),
      (this.changeEvent = new Event("change", { bubbles: !0 })),
      this.querySelectorAll("button").forEach((e) =>
        e.addEventListener("click", this.onButtonClick.bind(this))
      );
  }
  onButtonClick(e) {
    e.preventDefault();
    let t = this.input.value;
    "plus" === e.target.name ? this.input.stepUp() : this.input.stepDown(),
      t !== this.input.value && this.input.dispatchEvent(this.changeEvent);
  }
}
function debounce(e, t) {
  let i;
  return (...s) => {
    clearTimeout(i), (i = setTimeout(() => e.apply(this, s), t));
  };
}
function fetchConfig(e = "json") {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: `application/${e}` },
  };
}
customElements.define("quantity-input", QuantityInput),
  void 0 === window.Shopify && (window.Shopify = {}),
  (Shopify.bind = function (e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }),
  (Shopify.setSelectorByValue = function (e, t) {
    for (var i = 0, s = e.options.length; i < s; i++) {
      var r = e.options[i];
      if (t == r.value || t == r.innerHTML) return (e.selectedIndex = i), i;
    }
  }),
  (Shopify.addListener = function (e, t, i) {
    e.addEventListener
      ? e.addEventListener(t, i, !1)
      : e.attachEvent("on" + t, i);
  }),
  (Shopify.postLink = function (e, t) {
    var i = (t = t || {}).method || "post",
      s = t.parameters || {},
      r = document.createElement("form");
    for (var n in (r.setAttribute("method", i),
    r.setAttribute("action", e),
    s)) {
      var a = document.createElement("input");
      a.setAttribute("type", "hidden"),
        a.setAttribute("name", n),
        a.setAttribute("value", s[n]),
        r.appendChild(a);
    }
    document.body.appendChild(r), r.submit(), document.body.removeChild(r);
  }),
  (Shopify.CountryProvinceSelector = function (e, t, i) {
    (this.countryEl = document.getElementById(e)),
      (this.provinceEl = document.getElementById(t)),
      (this.provinceContainer = document.getElementById(i.hideElement || t)),
      Shopify.addListener(
        this.countryEl,
        "change",
        Shopify.bind(this.countryHandler, this)
      ),
      this.initCountry(),
      this.initProvince();
  }),
  (Shopify.CountryProvinceSelector.prototype = {
    initCountry: function () {
      var e = this.countryEl.getAttribute("data-default");
      Shopify.setSelectorByValue(this.countryEl, e), this.countryHandler();
    },
    initProvince: function () {
      var e = this.provinceEl.getAttribute("data-default");
      e &&
        this.provinceEl.options.length > 0 &&
        Shopify.setSelectorByValue(this.provinceEl, e);
    },
    countryHandler: function (e) {
      var t = this.countryEl.options[this.countryEl.selectedIndex],
        i = JSON.parse(t.getAttribute("data-provinces"));
      if ((this.clearOptions(this.provinceEl), i && 0 == i.length))
        this.provinceContainer.style.display = "none";
      else {
        for (var s = 0; s < i.length; s++) {
          var t = document.createElement("option");
          (t.value = i[s][0]),
            (t.innerHTML = i[s][1]),
            this.provinceEl.appendChild(t);
        }
        this.provinceContainer.style.display = "";
      }
    },
    clearOptions: function (e) {
      for (; e.firstChild; ) e.removeChild(e.firstChild);
    },
    setOptions: function (e, t) {
      for (var i = 0; i < t.length; i++) {
        var s = document.createElement("option");
        (s.value = t[i]), (s.innerHTML = t[i]), e.appendChild(s);
      }
      t.length;
    },
  });
class MenuDrawer extends HTMLElement {
  constructor() {
    super(),
      (this.mainDetailsToggle = this.querySelector("details")),
      "iPhone" === navigator.platform &&
        document.documentElement.style.setProperty(
          "--viewport-height",
          `${window.innerHeight}px`
        ),
      this.addEventListener("keyup", this.onKeyUp.bind(this)),
      this.addEventListener("focusout", this.onFocusOut.bind(this)),
      this.bindEvents();
  }
  bindEvents() {
    this.querySelectorAll("summary").forEach((e) =>
      e.addEventListener("click", this.onSummaryClick.bind(this))
    ),
      this.querySelectorAll("button").forEach((e) =>
        e.addEventListener("click", this.onCloseButtonClick.bind(this))
      );
  }
  onKeyUp(e) {
    if ("ESCAPE" !== e.code.toUpperCase()) return;
    let t = e.target.closest("details[open]");
    t &&
      (t === this.mainDetailsToggle
        ? this.closeMenuDrawer(
            e,
            this.mainDetailsToggle.querySelector("summary")
          )
        : this.closeSubmenu(t));
  }
  onSummaryClick(e) {
    let t = e.currentTarget,
      i = t.parentNode,
      s = i.hasAttribute("open"),
      r = window.matchMedia("(prefers-reduced-motion: reduce)");
    function n() {
      trapFocus(t.nextElementSibling, i.querySelector("button")),
        t.nextElementSibling.removeEventListener("transitionend", n);
    }
    i === this.mainDetailsToggle
      ? (s && e.preventDefault(),
        s ? this.closeMenuDrawer(e, t) : this.openMenuDrawer(t))
      : setTimeout(() => {
          i.classList.add("menu-opening"),
            t.setAttribute("aria-expanded", !0),
            !r || r.matches
              ? n()
              : t.nextElementSibling.addEventListener("transitionend", n);
        }, 100);
  }
  openMenuDrawer(e) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add("menu-opening");
    }),
      e.setAttribute("aria-expanded", !0),
      trapFocus(this.mainDetailsToggle, e),
      document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }
  closeMenuDrawer(e, t = !1) {
    this.mainDetailsToggle.classList.remove("menu-opening"),
      this.mainDetailsToggle.querySelectorAll("details").forEach((e) => {
        e.removeAttribute("open"), e.classList.remove("menu-opening");
      }),
      document.body.classList.remove(
        `overflow-hidden-${this.dataset.breakpoint}`
      ),
      removeTrapFocus(t),
      this.closeAnimation(this.mainDetailsToggle);
  }
  onFocusOut(e) {
    setTimeout(() => {
      this.mainDetailsToggle.hasAttribute("open") &&
        !this.mainDetailsToggle.contains(document.activeElement) &&
        this.closeMenuDrawer();
    });
  }
  onCloseButtonClick(e) {
    let t = e.currentTarget.closest("details");
    this.closeSubmenu(t);
  }
  closeSubmenu(e) {
    e.classList.remove("menu-opening"),
      e.querySelector("summary").setAttribute("aria-expanded", !1),
      removeTrapFocus(e.querySelector("summary")),
      this.closeAnimation(e);
  }
  closeAnimation(e) {
    let t,
      i = (s) => {
        void 0 === t && (t = s);
        s - t < 400
          ? window.requestAnimationFrame(i)
          : (e.removeAttribute("open"),
            e.closest("details[open]") &&
              trapFocus(
                e.closest("details[open]"),
                e.querySelector("summary")
              ));
      };
    window.requestAnimationFrame(i);
  }
}
customElements.define("menu-drawer", MenuDrawer);
class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }
  openMenuDrawer(e) {
    (this.header =
      this.header || document.getElementById("shopify-section-header")),
      (this.borderOffset =
        this.borderOffset ||
        this.closest(".header-wrapper").classList.contains(
          "header-wrapper--border-bottom"
        )
          ? 1
          : 0),
      document.documentElement.style.setProperty(
        "--header-bottom-position",
        `${parseInt(
          this.header.getBoundingClientRect().bottom - this.borderOffset
        )}px`
      ),
      this.header.classList.add("menu-open"),
      setTimeout(() => {
        this.mainDetailsToggle.classList.add("menu-opening");
      }),
      e.setAttribute("aria-expanded", !0),
      trapFocus(this.mainDetailsToggle, e),
      document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }
  closeMenuDrawer(e, t) {
    super.closeMenuDrawer(e, t), this.header.classList.remove("menu-open");
  }
}
customElements.define("header-drawer", HeaderDrawer);
class ModalDialog extends HTMLElement {
  constructor() {
    super(),
      this.querySelector('[id^="ModalClose-"]').addEventListener(
        "click",
        this.hide.bind(this)
      ),
      this.addEventListener("keyup", (e) => {
        "ESCAPE" === e.code.toUpperCase() && this.hide();
      }),
      this.classList.contains("media-modal")
        ? this.addEventListener("pointerup", (e) => {
            "mouse" !== e.pointerType ||
              e.target.closest("deferred-media, product-model") ||
              this.hide();
          })
        : this.addEventListener("click", (e) => {
            "MODAL-DIALOG" === e.target.nodeName && this.hide();
          });
  }
  connectedCallback() {
    this.moved || ((this.moved = !0), document.body.appendChild(this));
  }
  show(e) {
    this.openedBy = e;
    let t = this.querySelector(".template-popup");
    document.body.classList.add("overflow-hidden"),
      this.setAttribute("open", ""),
      t && t.loadContent(),
      trapFocus(this, this.querySelector('[role="dialog"]')),
      window.pauseAllMedia();
  }
  hide() {
    document.body.classList.remove("overflow-hidden"),
      this.removeAttribute("open"),
      removeTrapFocus(this.openedBy),
      window.pauseAllMedia();
  }
}
customElements.define("modal-dialog", ModalDialog);
class ModalOpener extends HTMLElement {
  constructor() {
    super();
    let e = this.querySelector("button");
    if (!e) return;
    e.addEventListener("click", () => {
      let t = document.querySelector(this.getAttribute("data-modal"));
      t && t.show(e);
    });
  }
}
customElements.define("modal-opener", ModalOpener);
class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    let e = this.querySelector('[id^="Deferred-Poster-"]');
    if (!e) return;
    e.addEventListener("click", this.loadContent.bind(this));
  }
  loadContent(e = !0) {
    if ((window.pauseAllMedia(), !this.getAttribute("loaded"))) {
      let t = document.createElement("div");
      t.appendChild(
        this.querySelector("template").content.firstElementChild.cloneNode(!0)
      ),
        this.setAttribute("loaded", !0);
      let i = this.appendChild(t.querySelector("video, model-viewer, iframe"));
      e && i.focus();
    }
  }
}
customElements.define("deferred-media", DeferredMedia);
class SliderComponent extends HTMLElement {
  constructor() {
    if (
      (super(),
      (this.slider = this.querySelector('[id^="Slider-"]')),
      (this.sliderItems = this.querySelectorAll('[id^="Slide-"]')),
      (this.enableSliderLooping = !1),
      (this.currentPageElement = this.querySelector(
        ".slider-counter--current"
      )),
      (this.pageTotalElement = this.querySelector(".slider-counter--total")),
      (this.prevButton = this.querySelector('button[name="previous"]')),
      (this.nextButton = this.querySelector('button[name="next"]')),
      !this.slider || !this.nextButton)
    )
      return;
    this.initPages();
    new ResizeObserver((e) => this.initPages()).observe(this.slider),
      this.slider.addEventListener("scroll", this.update.bind(this)),
      this.prevButton.addEventListener("click", this.onButtonClick.bind(this)),
      this.nextButton.addEventListener("click", this.onButtonClick.bind(this));
  }
  initPages() {
    (this.sliderItemsToShow = Array.from(this.sliderItems).filter(
      (e) => e.clientWidth > 0
    )),
      (this.sliderLastItem =
        this.sliderItemsToShow[this.sliderItemsToShow.length - 1]),
      0 !== this.sliderItemsToShow.length &&
        ((this.slidesPerPage = Math.floor(
          this.slider.clientWidth / this.sliderItemsToShow[0].clientWidth
        )),
        (this.totalPages =
          this.sliderItemsToShow.length - this.slidesPerPage + 1),
        this.update());
  }
  resetPages() {
    (this.sliderItems = this.querySelectorAll('[id^="Slide-"]')),
      this.initPages();
  }
  update() {
    let e = this.currentPage;
    (this.currentPage =
      Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1),
      this.currentPageElement &&
        this.pageTotalElement &&
        ((this.currentPageElement.textContent = this.currentPage),
        (this.pageTotalElement.textContent = this.totalPages)),
      this.currentPage != e &&
        this.dispatchEvent(
          new CustomEvent("slideChanged", {
            detail: {
              currentPage: this.currentPage,
              currentElement: this.sliderItemsToShow[this.currentPage - 1],
            },
          })
        ),
      this.enableSliderLooping ||
        (this.isSlideVisible(this.sliderItemsToShow[0])
          ? this.prevButton.setAttribute("disabled", "disabled")
          : this.prevButton.removeAttribute("disabled"),
        this.isSlideVisible(this.sliderLastItem)
          ? this.nextButton.setAttribute("disabled", "disabled")
          : this.nextButton.removeAttribute("disabled"));
  }
  isSlideVisible(e, t = 0) {
    let i = this.slider.clientWidth + this.slider.scrollLeft - t;
    return (
      e.offsetLeft + e.clientWidth <= i &&
      e.offsetLeft >= this.slider.scrollLeft
    );
  }
  onButtonClick(e) {
    e.preventDefault();
    let t = e.currentTarget.dataset.step || 1;
    (this.slideScrollPosition =
      "next" === e.currentTarget.name
        ? this.slider.scrollLeft + t * this.sliderLastItem.clientWidth
        : this.slider.scrollLeft - t * this.sliderLastItem.clientWidth),
      this.slider.scrollTo({ left: this.slideScrollPosition });
  }
}
customElements.define("slider-component", SliderComponent);
class SlideshowComponent extends SliderComponent {
  constructor() {
    if (
      (super(),
      (this.sliderControlWrapper = this.querySelector(".slider-buttons")),
      (this.enableSliderLooping = !0),
      !this.sliderControlWrapper)
    )
      return;
    (this.sliderFirstItemNode = this.slider.querySelector(".slideshow__slide")),
      this.sliderItemsToShow.length > 0 && (this.currentPage = 1),
      (this.sliderControlLinksArray = Array.from(
        this.sliderControlWrapper.querySelectorAll(".slider-counter__link")
      )),
      this.sliderControlLinksArray.forEach((e) =>
        e.addEventListener("click", this.linkToSlide.bind(this))
      ),
      this.slider.addEventListener(
        "scroll",
        this.setSlideVisibility.bind(this)
      ),
      this.setSlideVisibility(),
      "true" === this.slider.getAttribute("data-autoplay") &&
        this.setAutoPlay();
  }
  setAutoPlay() {
    (this.sliderAutoplayButton = this.querySelector(".slideshow__autoplay")),
      (this.autoplaySpeed = 1e3 * this.slider.dataset.speed),
      this.sliderAutoplayButton.addEventListener(
        "click",
        this.autoPlayToggle.bind(this)
      ),
      this.addEventListener("mouseover", this.focusInHandling.bind(this)),
      this.addEventListener("mouseleave", this.focusOutHandling.bind(this)),
      this.addEventListener("focusin", this.focusInHandling.bind(this)),
      this.addEventListener("focusout", this.focusOutHandling.bind(this)),
      this.play(),
      (this.autoplayButtonIsSetToPlay = !0);
  }
  onButtonClick(e) {
    super.onButtonClick(e);
    let t = 1 === this.currentPage,
      i = this.currentPage === this.sliderItemsToShow.length;
    (t || i) &&
      (t && "previous" === e.currentTarget.name
        ? (this.slideScrollPosition =
            this.slider.scrollLeft +
            this.sliderFirstItemNode.clientWidth *
              this.sliderItemsToShow.length)
        : i &&
          "next" === e.currentTarget.name &&
          (this.slideScrollPosition = 0),
      this.slider.scrollTo({ left: this.slideScrollPosition }));
  }
  update() {
    super.update(),
      (this.sliderControlButtons = this.querySelectorAll(
        ".slider-counter__link"
      )),
      this.prevButton.removeAttribute("disabled"),
      this.sliderControlButtons.length &&
        (this.sliderControlButtons.forEach((e) => {
          e.classList.remove("slider-counter__link--active"),
            e.removeAttribute("aria-current");
        }),
        this.sliderControlButtons[this.currentPage - 1].classList.add(
          "slider-counter__link--active"
        ),
        this.sliderControlButtons[this.currentPage - 1].setAttribute(
          "aria-current",
          !0
        ));
  }
  autoPlayToggle() {
    this.togglePlayButtonState(this.autoplayButtonIsSetToPlay),
      this.autoplayButtonIsSetToPlay ? this.pause() : this.play(),
      (this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay);
  }
  focusOutHandling(e) {
    let t =
      e.target === this.sliderAutoplayButton ||
      this.sliderAutoplayButton.contains(e.target);
    this.autoplayButtonIsSetToPlay && !t && this.play();
  }
  focusInHandling(e) {
    (e.target === this.sliderAutoplayButton ||
      this.sliderAutoplayButton.contains(e.target)) &&
    this.autoplayButtonIsSetToPlay
      ? this.play()
      : this.autoplayButtonIsSetToPlay && this.pause();
  }
  play() {
    this.slider.setAttribute("aria-live", "off"),
      clearInterval(this.autoplay),
      (this.autoplay = setInterval(
        this.autoRotateSlides.bind(this),
        this.autoplaySpeed
      ));
  }
  pause() {
    this.slider.setAttribute("aria-live", "polite"),
      clearInterval(this.autoplay);
  }
  togglePlayButtonState(e) {
    e
      ? (this.sliderAutoplayButton.classList.add("slideshow__autoplay--paused"),
        this.sliderAutoplayButton.setAttribute(
          "aria-label",
          window.accessibilityStrings.playSlideshow
        ))
      : (this.sliderAutoplayButton.classList.remove(
          "slideshow__autoplay--paused"
        ),
        this.sliderAutoplayButton.setAttribute(
          "aria-label",
          window.accessibilityStrings.pauseSlideshow
        ));
  }
  autoRotateSlides() {
    let e =
      this.currentPage === this.sliderItems.length
        ? 0
        : this.slider.scrollLeft +
          this.slider.querySelector(".slideshow__slide").clientWidth;
    this.slider.scrollTo({ left: e });
  }
  setSlideVisibility() {
    this.sliderItemsToShow.forEach((e, t) => {
      let i = e.querySelector("a");
      t === this.currentPage - 1
        ? (i && i.removeAttribute("tabindex"),
          e.setAttribute("aria-hidden", "false"),
          e.removeAttribute("tabindex"))
        : (i && i.setAttribute("tabindex", "-1"),
          e.setAttribute("aria-hidden", "true"),
          e.setAttribute("tabindex", "-1"));
    });
  }
  linkToSlide(e) {
    e.preventDefault();
    let t =
      this.slider.scrollLeft +
      this.sliderFirstItemNode.clientWidth *
        (this.sliderControlLinksArray.indexOf(e.currentTarget) +
          1 -
          this.currentPage);
    this.slider.scrollTo({ left: t });
  }
}
customElements.define("slideshow-component", SlideshowComponent);
class VariantSelects extends HTMLElement {
  constructor() {
    super(), this.addEventListener("change", this.onVariantChange);
  }
  onVariantChange() {
    this.updateOptions(),
      this.updateMasterId(),
      this.toggleAddButton(!0, "", !1),
      this.updatePickupAvailability(),
      this.removeErrorMessage(),
      this.currentVariant
        ? (this.updateMedia(),
          this.updateURL(),
          this.updateVariantInput(),
          this.renderProductInfo(),
          this.updateShareUrl())
        : (this.toggleAddButton(!0, "", !0), this.setUnavailable());
  }
  updateOptions() {
    this.options = Array.from(this.querySelectorAll("select"), (e) => e.value);
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (e) => !e.options.map((e, t) => this.options[t] === e).includes(!1)
    );
  }
  updateMedia() {
    if (!this.currentVariant || !this.currentVariant.featured_media) return;
    document
      .getElementById(`MediaGallery-${this.dataset.section}`)
      .setActiveMedia(
        `${this.dataset.section}-${this.currentVariant.featured_media.id}`,
        !0
      );
    let e = document.querySelector(
        `#ProductModal-${this.dataset.section} .product-media-modal__content`
      ),
      t = e.querySelector(
        `[data-media-id="${this.currentVariant.featured_media.id}"]`
      );
    e.prepend(t);
  }
  updateURL() {
    this.currentVariant &&
      "false" !== this.dataset.updateUrl &&
      window.history.replaceState(
        {},
        "",
        `${this.dataset.url}?variant=${this.currentVariant.id}`
      );
  }
  updateShareUrl() {
    let e = document.getElementById(`Share-${this.dataset.section}`);
    e &&
      e.updateUrl(
        `${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`
      );
  }
  updateVariantInput() {
    document
      .querySelectorAll(
        `#product-form-${this.dataset.section}, #product-form-installment`
      )
      .forEach((e) => {
        let t = e.querySelector('input[name="id"]');
        (t.value = this.currentVariant.id),
          t.dispatchEvent(new Event("change", { bubbles: !0 }));
      });
  }
  updatePickupAvailability() {
    let e = document.querySelector("pickup-availability");
    e &&
      (this.currentVariant && this.currentVariant.available
        ? e.fetchAvailability(this.currentVariant.id)
        : (e.removeAttribute("available"), (e.innerHTML = "")));
  }
  removeErrorMessage() {
    let e = this.closest("section");
    if (!e) return;
    let t = e.querySelector("product-form");
    t && t.handleErrorMessage();
  }
  renderProductInfo() {
    fetch(
      `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`
    )
      .then((e) => e.text())
      .then((e) => {
        let t = `price-${this.dataset.section}`,
          i = new DOMParser().parseFromString(e, "text/html"),
          s = document.getElementById(t),
          r = i.getElementById(t);
        r && s && (s.innerHTML = r.innerHTML);
        let n = document.getElementById(`price-${this.dataset.section}`);
        n && n.classList.remove("visibility-hidden"),
          this.toggleAddButton(
            !this.currentVariant.available,
            window.variantStrings.soldOut
          );
      });
  }
  toggleAddButton(e = !0, t, i = !0) {
    let s = document.getElementById(`product-form-${this.dataset.section}`);
    if (!s) return;
    let r = s.querySelector('[name="add"]'),
      n = s.querySelector('[name="add"] > span');
    if (
      r &&
      (e
        ? (r.setAttribute("disabled", "disabled"), t && (n.textContent = t))
        : (r.removeAttribute("disabled"),
          (n.textContent = window.variantStrings.addToCart)),
      !i)
    )
      return;
  }
  setUnavailable() {
    let e = document.getElementById(`product-form-${this.dataset.section}`),
      t = e.querySelector('[name="add"]'),
      i = e.querySelector('[name="add"] > span'),
      s = document.getElementById(`price-${this.dataset.section}`);
    t &&
      ((i.textContent = window.variantStrings.unavailable),
      s && s.classList.add("visibility-hidden"));
  }
  getVariantData() {
    return (
      (this.variantData =
        this.variantData ||
        JSON.parse(
          this.querySelector('[type="application/json"]').textContent
        )),
      this.variantData
    );
  }
}
customElements.define("variant-selects", VariantSelects);
class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }
  updateOptions() {
    let e = Array.from(this.querySelectorAll("fieldset"));
    this.options = e.map(
      (e) =>
        Array.from(e.querySelectorAll("input")).find((e) => e.checked).value
    );
  }
}
customElements.define("variant-radios", VariantRadios);
