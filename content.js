/* ============================================================================
 * Codeforces Dark Mode — content script
 *
 * Runs at document_start on every Codeforces page. Injects the stylesheet once
 * and keeps <html> tagged with the current enabled-state + theme. Because this
 * runs on every page load and also listens to storage changes, the chosen theme
 * stays consistent as you navigate around Codeforces until you turn it off.
 * ========================================================================== */
(function () {
  "use strict";

  var STYLE_ID = "cf-darkmode-style";
  var DEFAULTS = { enabled: true, theme: "midnight" };

  /* Insert the <style> element holding every theme + base rule (only once). */
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = (typeof CF_DARK_CSS !== "undefined") ? CF_DARK_CSS : "";
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.type = "text/css";
    style.textContent = css;
    var parent = document.head || document.documentElement;
    if (parent) parent.appendChild(style);
  }

  /* Reflect the saved state onto <html> via two attributes. */
  function apply(state) {
    var html = document.documentElement;
    if (!html) return;
    html.setAttribute("data-cf-theme", (state && state.theme) || DEFAULTS.theme);
    if (state && state.enabled) {
      html.setAttribute("data-cf-dark", "on");
    } else {
      html.removeAttribute("data-cf-dark");
    }
  }

  /* 1) Inject styles + optimistically apply the default so there is no white
   *    flash for the common (enabled) case while storage is read async. */
  injectStyle();
  apply(DEFAULTS);

  /* 2) Read the real saved state and correct the optimistic guess. */
  function refresh() {
    try {
      chrome.storage.local.get(DEFAULTS, apply);
    } catch (e) {
      /* storage unavailable (e.g. during reload) — keep optimistic defaults */
    }
  }
  refresh();

  /* 3) Live-update when the popup changes the theme or toggles dark mode. */
  try {
    chrome.storage.onChanged.addListener(function (changes, area) {
      if (area === "local") refresh();
    });
  } catch (e) {}

  /* 3b) Answer the popup's "are you alive / is the theme applied?" ping. If this
   *     listener never responds, the popup knows the content script wasn't
   *     injected on this tab (e.g. the page was open before the extension was
   *     installed/enabled) and will reload the tab to apply the theme. */
  try {
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if (msg && msg.type === "cf-ping") {
        sendResponse({
          ok: true,
          applied: document.documentElement.getAttribute("data-cf-dark") === "on"
        });
      }
      return true;
    });
  } catch (e) {}

  /* 4) The <head> may be (re)built after document_start; make sure the style
   *    survives by re-injecting once the DOM is ready. */
  document.addEventListener("DOMContentLoaded", function () {
    injectStyle();
    refresh();
  });
})();
