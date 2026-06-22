/* ============================================================================
 * Codeforces Dark Mode — popup logic
 *
 * Renders the master on/off switch and the theme picker. Every change is saved
 * to chrome.storage.local; the content script listens for those changes and
 * updates any open Codeforces tab instantly (no reload needed).
 * ========================================================================== */
(function () {
  "use strict";

  var DEFAULTS = { enabled: true, theme: "midnight" };
  var themes = (typeof CF_THEME_META !== "undefined") ? CF_THEME_META : [];

  var els = {
    app: document.getElementById("app"),
    grid: document.getElementById("themes"),
    toggle: document.getElementById("toggle"),
    statusText: document.getElementById("statusText"),
    logo: document.getElementById("logo")
  };

  var state = Object.assign({}, DEFAULTS);

  /* ----- Paint the popup itself using the active theme's palette ----- */
  function paintPopup(theme) {
    var meta = findTheme(theme) || themes[0];
    if (!meta) return;
    var c = meta.c;
    var root = els.app;
    root.style.setProperty("--bg", c.bg);
    root.style.setProperty("--bg2", c.bg2);
    root.style.setProperty("--bg3", shade(c.bg2, 12));
    root.style.setProperty("--text", c.text);
    root.style.setProperty("--dim", mix(c.text, c.bg, 0.45));
    root.style.setProperty("--border", mix(c.text, c.bg, 0.82));
    root.style.setProperty("--link", c.link);
    root.style.setProperty("--accent", c.accent);
    root.style.setProperty("--code", c.code);
  }

  function findTheme(id) {
    for (var i = 0; i < themes.length; i++) if (themes[i].id === id) return themes[i];
    return null;
  }

  /* ----- Build the theme grid ----- */
  function buildGrid() {
    els.grid.innerHTML = "";
    themes.forEach(function (t) {
      var c = t.c;
      var card = document.createElement("div");
      card.className = "card" + (t.id === state.theme ? " selected" : "");
      card.setAttribute("data-id", t.id);
      card.innerHTML =
        '<div class="preview" style="background:' + c.bg + '">' +
          '<div class="pv-bar">' +
            '<span class="pv-dot" style="background:' + c.accent + '"></span>' +
            '<span class="pv-line pv-l1" style="background:' + c.bg2 + ';width:55%"></span>' +
          '</div>' +
          '<div class="pv-line pv-l1" style="background:' + c.link + '"></div>' +
          '<div class="pv-line pv-l2" style="background:' + mix(c.text, c.bg, 0.55) + '"></div>' +
          '<div class="pv-code" style="background:' + c.code + ';border:1px solid ' + mix(c.text, c.bg, 0.8) + '"></div>' +
        '</div>' +
        '<div class="card-foot">' +
          '<div>' +
            '<div class="card-name">' + t.name + '</div>' +
            '<div class="card-tag">' + t.tag + '</div>' +
          '</div>' +
          '<span class="check">✔</span>' +
        '</div>';
      card.addEventListener("click", function () { selectTheme(t.id); });
      els.grid.appendChild(card);
    });
  }

  function markSelected() {
    var cards = els.grid.querySelectorAll(".card");
    cards.forEach(function (card) {
      card.classList.toggle("selected", card.getAttribute("data-id") === state.theme);
    });
  }

  /* ----- State changes ----- */
  function selectTheme(id) {
    state.theme = id;
    markSelected();
    paintPopup(id);
    save();
  }

  function setEnabled(on) {
    state.enabled = on;
    els.toggle.checked = on;
    els.grid.classList.toggle("disabled", !on);
    els.statusText.textContent = on ? "Dark mode is on" : "Dark mode is off";
    els.logo.textContent = on ? "🌙" : "☀️"; /* moon / sun */
    save();
  }

  function save() {
    try { chrome.storage.local.set({ enabled: state.enabled, theme: state.theme }); } catch (e) {}
  }

  /* ----- Tiny color helpers (hex math) ----- */
  function hexToRgb(h) {
    h = h.replace("#", "");
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
  }
  function rgbToHex(r,g,b) {
    function p(v){ v = Math.max(0, Math.min(255, Math.round(v))); var s = v.toString(16); return s.length===1?"0"+s:s; }
    return "#" + p(r) + p(g) + p(b);
  }
  /* blend a toward b by t (0..1) */
  function mix(a, b, t) {
    var x = hexToRgb(a), y = hexToRgb(b);
    return rgbToHex(x.r+(y.r-x.r)*t, x.g+(y.g-x.g)*t, x.b+(y.b-x.b)*t);
  }
  /* lighten a hex color by amount (0..255) */
  function shade(h, amt) {
    var c = hexToRgb(h);
    return rgbToHex(c.r+amt, c.g+amt, c.b+amt);
  }

  /* ----- Wire up ----- */
  els.toggle.addEventListener("change", function () { setEnabled(els.toggle.checked); });

  /* ----- Load saved state ----- */
  function init(saved) {
    state.enabled = (saved && typeof saved.enabled === "boolean") ? saved.enabled : DEFAULTS.enabled;
    state.theme = (saved && saved.theme) || DEFAULTS.theme;
    buildGrid();
    paintPopup(state.theme);
    els.toggle.checked = state.enabled;
    els.grid.classList.toggle("disabled", !state.enabled);
    els.statusText.textContent = state.enabled ? "Dark mode is on" : "Dark mode is off";
    els.logo.textContent = state.enabled ? "🌙" : "☀️";
  }

  try {
    chrome.storage.local.get(DEFAULTS, init);
  } catch (e) {
    init(DEFAULTS);
  }
})();
