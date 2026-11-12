/* AC/DC dropdown nav: toggle on click, close on outside click or Escape. */
(function () {
  var toggles = document.querySelectorAll('.acdc-nav-toggle');
  function closeAll() {
    document.querySelectorAll('.acdc-nav-item[data-open]').forEach(function (i) { i.removeAttribute('data-open'); });
    toggles.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
  }
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var item = toggle.closest('.acdc-nav-item');
      var isOpen = item.hasAttribute('data-open');
      closeAll();
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
})();
