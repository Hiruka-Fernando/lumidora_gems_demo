(function () {
  "use strict";

  function init() {
    window.NightSky?.init();
    window.AuthUI?.init();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
