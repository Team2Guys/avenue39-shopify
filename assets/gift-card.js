$(function () {
  var e = {
      qrCode: "#QrCode",
      printButton: "#PrintGiftCard",
      giftCardCode: "#GiftCardDigits",
    },
    t = $(e.qrCode);
  new QRCode(t[0], {
    text: t.attr("data-identifier"),
    width: 120,
    height: 120,
  }),
    $(e.printButton).on("click", function () {
      window.print();
    }),
    $(e.giftCardCode).on("click", { element: "GiftCardDigits" }, function e(t) {
      var n = document.getElementById(t.data.element),
        i = "";
      if (document.body.createTextRange)
        (i = document.body.createTextRange()).moveToElementText(n), i.select();
      else if (window.getSelection) {
        var a = window.getSelection();
        (i = document.createRange()).selectNodeContents(n),
          a.removeAllRanges(),
          a.addRange(i);
      }
    });
});
