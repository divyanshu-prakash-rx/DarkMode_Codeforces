# Codeforces Dark Mode — Multi Theme 🌙

A browser extension that applies a beautiful dark theme to **every** Codeforces
page. Pick from **14 themes**, and your choice stays consistent as you navigate
around the site until you switch it off from the popup.

Tested target page: <https://codeforces.com/contest/2237/problem/C>

## Features

- **14 hand-tuned themes** covering every taste:
  Midnight · AMOLED Black · Dracula · Nord · Tokyo Night · One Dark · Monokai ·
  Gruvbox · Solarized · Rosé Pine · Synthwave '84 · Matrix CRT (retro terminal) ·
  Coffee Sepia · High Contrast.
- **Persistent & consistent** — set it once; it follows you across problems,
  standings, submissions, blogs, gym, every Codeforces sub‑page.
- **Live switching** — change theme or toggle on/off and any open Codeforces tab
  updates instantly, no reload.
- **No white flash** — styles inject at `document_start`.
- **Smart details** — proper syntax‑highlighting colors in code blocks, themed
  scrollbars, and rating/verdict colors kept legible on dark backgrounds.
- **Zero tracking, no network** — only the `storage` permission, only runs on
  `codeforces.com` / `codeforc.es`.

## Install (Chrome / Edge / Brave / any Chromium browser)

1. Open `chrome://extensions` (or `edge://extensions`).
2. Turn on **Developer mode** (top‑right toggle).
3. Click **Load unpacked**.
4. Select this `darkmode_codeforces` folder.
5. Open any Codeforces page — it's already dark. Click the 🌙 toolbar icon to
   pick a theme or turn it off.

> Tip: pin the extension so the moon icon is always visible in the toolbar.

## Install (Firefox)

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**
3. Select the `manifest.json` inside this folder.
   (Temporary add-ons are removed when Firefox restarts.)

## How it works

| File | Role |
|------|------|
| `manifest.json` | MV3 manifest; registers the content script for Codeforces. |
| `cf-themes.js` | All theme palettes + the full stylesheet, plus popup metadata. |
| `content.js` | Injects the stylesheet and tags `<html>` with the chosen theme; re-applies on every page and on storage changes. |
| `popup.html / .css / .js` | The on/off switch and theme picker; saves to `chrome.storage.local`. |
| `icons/` | Toolbar icons. |

The page background is controlled by two attributes on `<html>`:
`data-cf-dark="on"` (master switch) and `data-cf-theme="<id>"` (which palette).
Each theme defines CSS custom properties; the base rules consume them, so
switching themes is a single attribute swap.

## Add your own theme

In `cf-themes.js`:

1. Add an entry to `CF_THEME_META` (id, name, tag, swatch colors).
2. Add a matching `html[data-cf-theme="<id>"] { … }` block with the full set of
   `--cf-*` variables.

That's it — it shows up in the popup automatically.
