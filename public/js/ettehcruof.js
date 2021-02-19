var app = {
  init: function () {
    var firstToAppear;
    document.querySelectorAll('body > p').forEach(function (elm, idx) {
      if (idx == 1) {
        firstToAppear = elm;
      }
      if (idx > 0) {
        elm.classList.add('hidden');
      }
    });
    setTimeout(app.showMessage, 300, firstToAppear);
  },
  showMessage: function (elm) {
    elm.classList.add('visible');
    var next = elm.nextElementSibling;
    if (next.localName != 'script') {
      setTimeout(app.showMessage, 300, next);
    }
  },
};

document.addEventListener('DOMContentLoaded', app.init);
