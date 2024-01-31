function isPwa() {
  return ["fullscreen", "standalone", "minimal-ui"].some(
    (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
  );
}

function loaded() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/static/js/service-worker.js");
  }

  /*if(!isPwa()) {
    document.getElementById('_base_body').innerHTML = "<h1>Nainstaluj si PWA</h1>";
  }*/

  function noDevTools() {

    setInterval(function () {
      debugger;
    }, 1000);

    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });

    Object.defineProperty(console, '_commandLineAPI', { get : function() { window.location.reload(); } })

    function ctrlShiftKey(e, key) {
      return e.ctrlKey && e.shiftKey && e.key == key;
    }

    document.onkeydown = (e) => {
      if (e.key == 123) {
        e.preventDefault();
      }
      if (ctrlShiftKey(e, 'I')) {
        e.preventDefault();
      }
      if (ctrlShiftKey(e, 'C')) {
        e.preventDefault();
      }
      if (ctrlShiftKey(e, 'J')) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        e.preventDefault();
      }
    }
  }

  //noDevTools();
}
