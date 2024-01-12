window.addEventListener("DOMContentLoaded", function () {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      const textRange = elem.createTextRange();
      textRange.collapse(true);
      textRange.moveEnd("character", pos);
      textRange.moveStart("character", pos);
      textRange.select();
    }
  }

  function mask(event) {
    var matrix = "+7(___)___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function (a) {
      return val.charAt(i++) || "_";
    });

    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != "+7(___) ___-__-__"
      ? i++
      : (i = matrix.indexOf("_"));
    this.value = matrix.slice(0, i);
    const notFilledMask = (document.getElementById("mask").innerText =
      "  ".repeat(i >= 7 ? i - 1 : i) + matrix.slice(i));
    document.getElementById("mask").innerText = notFilledMask;
    setCursorPosition(i, this);
  }
  const input = document.querySelector("input");
  input.addEventListener("click", mask, false);
  input.addEventListener("input", mask, false);
});
