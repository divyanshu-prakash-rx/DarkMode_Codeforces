/* ============================================================================
 * Codeforces Dark Mode — Multi Theme
 * cf-themes.js
 *
 * This file defines TWO globals that are shared by the content script and the
 * popup (both load this file):
 *
 *   CF_THEME_META  -> lightweight metadata used to render the popup theme grid
 *   CF_DARK_CSS    -> the full stylesheet (all theme variables + base rules)
 *
 * How theming works:
 *   - <html> gets two attributes:  data-cf-dark="on"  and  data-cf-theme="<id>"
 *   - Each theme block defines CSS custom properties on html[data-cf-theme="id"]
 *   - The base rules (gated by html[data-cf-dark="on"]) consume those variables
 *   - Switching theme = swap one attribute. Turning off = remove data-cf-dark.
 * ========================================================================== */

/* -------------------------------------------------------------------------- */
/* Popup metadata: id, display name, short blurb, and swatch colors.          */
/* -------------------------------------------------------------------------- */
var CF_THEME_META = [
  { id: "midnight",  name: "Midnight",      tag: "Deep navy",        c: { bg:"#0b1020", bg2:"#121a2e", accent:"#3d6fe0", link:"#6ea8fe", text:"#c9d4ea", code:"#0d1426" } },
  { id: "amoled",    name: "AMOLED Black",  tag: "True black",       c: { bg:"#000000", bg2:"#0a0a0a", accent:"#1e88e5", link:"#4da3ff", text:"#e0e0e0", code:"#0a0a0a" } },
  { id: "dracula",   name: "Dracula",       tag: "Purple classic",   c: { bg:"#282a36", bg2:"#2f3142", accent:"#bd93f9", link:"#8be9fd", text:"#f8f8f2", code:"#21222c" } },
  { id: "nord",      name: "Nord",          tag: "Cool arctic",      c: { bg:"#2e3440", bg2:"#343b4a", accent:"#88c0d0", link:"#88c0d0", text:"#e5e9f0", code:"#292e39" } },
  { id: "tokyonight",name: "Tokyo Night",   tag: "Neon night",       c: { bg:"#1a1b26", bg2:"#1f2335", accent:"#7aa2f7", link:"#7dcfff", text:"#c0caf5", code:"#16161e" } },
  { id: "onedark",   name: "One Dark",      tag: "Atom favourite",   c: { bg:"#282c34", bg2:"#2f343f", accent:"#c678dd", link:"#61afef", text:"#abb2bf", code:"#21252b" } },
  { id: "monokai",   name: "Monokai",       tag: "Vivid retro",      c: { bg:"#272822", bg2:"#2f302a", accent:"#a6e22e", link:"#66d9ef", text:"#f8f8f2", code:"#1e1f1c" } },
  { id: "gruvbox",   name: "Gruvbox",       tag: "Warm earthy",      c: { bg:"#282828", bg2:"#32302f", accent:"#fabd2f", link:"#83a598", text:"#ebdbb2", code:"#1d2021" } },
  { id: "solarized", name: "Solarized",     tag: "Soft science",     c: { bg:"#002b36", bg2:"#073642", accent:"#b58900", link:"#268bd2", text:"#c3cccc", code:"#00252e" } },
  { id: "rosepine",  name: "Rose Pine",     tag: "Muted aesthetic",  c: { bg:"#191724", bg2:"#1f1d2e", accent:"#eb6f92", link:"#c4a7e7", text:"#e0def4", code:"#16141f" } },
  { id: "synthwave", name: "Synthwave '84", tag: "Neon outrun",      c: { bg:"#241b2f", bg2:"#2a1f3d", accent:"#ff7edb", link:"#36f9f6", text:"#f5e0ff", code:"#1a1426" } },
  { id: "matrix",    name: "Matrix CRT",    tag: "Old terminal",     c: { bg:"#020a02", bg2:"#06140a", accent:"#39ff14", link:"#37d34a", text:"#33ff66", code:"#000800" } },
  { id: "sepia",     name: "Coffee Sepia",  tag: "Warm & easy",      c: { bg:"#1c1814", bg2:"#26201a", accent:"#d39a55", link:"#d6a76b", text:"#e8dcc8", code:"#161210" } },
  { id: "contrast",  name: "High Contrast", tag: "Max readable",     c: { bg:"#000000", bg2:"#0d0d0d", accent:"#ffd400", link:"#65d6ff", text:"#ffffff", code:"#000000" } }
];

/* -------------------------------------------------------------------------- */
/* The stylesheet.                                                            */
/* -------------------------------------------------------------------------- */
var CF_DARK_CSS = `
/* ===================== THEME VARIABLE PALETTES ===================== */

html[data-cf-theme="midnight"]{
  --cf-bg:#0b1020; --cf-bg-2:#121a2e; --cf-bg-3:#1b2540; --cf-hover:#22305a;
  --cf-text:#c9d4ea; --cf-dim:#8a98b5; --cf-border:#243352;
  --cf-link:#6ea8fe; --cf-link-hover:#9cc3ff; --cf-accent:#3d6fe0;
  --cf-code-bg:#0d1426; --cf-code-text:#d4def2;
  --cf-sy-comment:#5c6b8a; --cf-sy-string:#7ee787; --cf-sy-keyword:#ff7b9c;
  --cf-sy-type:#79c0ff; --cf-sy-number:#f2cb77; --cf-sy-func:#d2a8ff;
}
html[data-cf-theme="amoled"]{
  --cf-bg:#000000; --cf-bg-2:#0a0a0a; --cf-bg-3:#161616; --cf-hover:#1d1d1d;
  --cf-text:#e0e0e0; --cf-dim:#8a8a8a; --cf-border:#262626;
  --cf-link:#4da3ff; --cf-link-hover:#80c0ff; --cf-accent:#1e88e5;
  --cf-code-bg:#0a0a0a; --cf-code-text:#e8e8e8;
  --cf-sy-comment:#6a6a6a; --cf-sy-string:#9ece6a; --cf-sy-keyword:#f7768e;
  --cf-sy-type:#7dcfff; --cf-sy-number:#ff9e64; --cf-sy-func:#bb9af7;
}
html[data-cf-theme="dracula"]{
  --cf-bg:#282a36; --cf-bg-2:#2f3142; --cf-bg-3:#383a4d; --cf-hover:#414458;
  --cf-text:#f8f8f2; --cf-dim:#9aa0b5; --cf-border:#44475a;
  --cf-link:#8be9fd; --cf-link-hover:#a4f0ff; --cf-accent:#bd93f9;
  --cf-code-bg:#21222c; --cf-code-text:#f8f8f2;
  --cf-sy-comment:#6272a4; --cf-sy-string:#f1fa8c; --cf-sy-keyword:#ff79c6;
  --cf-sy-type:#8be9fd; --cf-sy-number:#bd93f9; --cf-sy-func:#50fa7b;
}
html[data-cf-theme="nord"]{
  --cf-bg:#2e3440; --cf-bg-2:#343b4a; --cf-bg-3:#3b4252; --cf-hover:#434c5e;
  --cf-text:#e5e9f0; --cf-dim:#a7b0c0; --cf-border:#434c5e;
  --cf-link:#88c0d0; --cf-link-hover:#8fbcbb; --cf-accent:#5e81ac;
  --cf-code-bg:#292e39; --cf-code-text:#eceff4;
  --cf-sy-comment:#616e88; --cf-sy-string:#a3be8c; --cf-sy-keyword:#81a1c1;
  --cf-sy-type:#8fbcbb; --cf-sy-number:#b48ead; --cf-sy-func:#88c0d0;
}
html[data-cf-theme="tokyonight"]{
  --cf-bg:#1a1b26; --cf-bg-2:#1f2335; --cf-bg-3:#24283b; --cf-hover:#2c324a;
  --cf-text:#c0caf5; --cf-dim:#828bb8; --cf-border:#2f354d;
  --cf-link:#7dcfff; --cf-link-hover:#9ed8ff; --cf-accent:#7aa2f7;
  --cf-code-bg:#16161e; --cf-code-text:#c0caf5;
  --cf-sy-comment:#565f89; --cf-sy-string:#9ece6a; --cf-sy-keyword:#bb9af7;
  --cf-sy-type:#2ac3de; --cf-sy-number:#ff9e64; --cf-sy-func:#7aa2f7;
}
html[data-cf-theme="onedark"]{
  --cf-bg:#282c34; --cf-bg-2:#2f343f; --cf-bg-3:#353b45; --cf-hover:#3e4451;
  --cf-text:#abb2bf; --cf-dim:#7f8796; --cf-border:#3e4451;
  --cf-link:#61afef; --cf-link-hover:#8cc6ff; --cf-accent:#c678dd;
  --cf-code-bg:#21252b; --cf-code-text:#abb2bf;
  --cf-sy-comment:#5c6370; --cf-sy-string:#98c379; --cf-sy-keyword:#c678dd;
  --cf-sy-type:#e5c07b; --cf-sy-number:#d19a66; --cf-sy-func:#61afef;
}
html[data-cf-theme="monokai"]{
  --cf-bg:#272822; --cf-bg-2:#2f302a; --cf-bg-3:#3a3b33; --cf-hover:#45463c;
  --cf-text:#f8f8f2; --cf-dim:#a6a692; --cf-border:#41423b;
  --cf-link:#66d9ef; --cf-link-hover:#a1e9f5; --cf-accent:#a6e22e;
  --cf-code-bg:#1e1f1c; --cf-code-text:#f8f8f2;
  --cf-sy-comment:#75715e; --cf-sy-string:#e6db74; --cf-sy-keyword:#f92672;
  --cf-sy-type:#66d9ef; --cf-sy-number:#ae81ff; --cf-sy-func:#a6e22e;
}
html[data-cf-theme="gruvbox"]{
  --cf-bg:#282828; --cf-bg-2:#32302f; --cf-bg-3:#3c3836; --cf-hover:#504945;
  --cf-text:#ebdbb2; --cf-dim:#a89984; --cf-border:#504945;
  --cf-link:#83a598; --cf-link-hover:#8ec07c; --cf-accent:#fabd2f;
  --cf-code-bg:#1d2021; --cf-code-text:#ebdbb2;
  --cf-sy-comment:#928374; --cf-sy-string:#b8bb26; --cf-sy-keyword:#fb4934;
  --cf-sy-type:#fabd2f; --cf-sy-number:#d3869b; --cf-sy-func:#8ec07c;
}
html[data-cf-theme="solarized"]{
  --cf-bg:#002b36; --cf-bg-2:#073642; --cf-bg-3:#0a4350; --cf-hover:#0f4d5c;
  --cf-text:#c3cccc; --cf-dim:#8a9999; --cf-border:#0f4d5c;
  --cf-link:#268bd2; --cf-link-hover:#2aa198; --cf-accent:#b58900;
  --cf-code-bg:#00252e; --cf-code-text:#b6c2c2;
  --cf-sy-comment:#586e75; --cf-sy-string:#2aa198; --cf-sy-keyword:#859900;
  --cf-sy-type:#b58900; --cf-sy-number:#d33682; --cf-sy-func:#268bd2;
}
html[data-cf-theme="rosepine"]{
  --cf-bg:#191724; --cf-bg-2:#1f1d2e; --cf-bg-3:#26233a; --cf-hover:#2f2b43;
  --cf-text:#e0def4; --cf-dim:#908caa; --cf-border:#2a273f;
  --cf-link:#c4a7e7; --cf-link-hover:#ebbcba; --cf-accent:#eb6f92;
  --cf-code-bg:#16141f; --cf-code-text:#e0def4;
  --cf-sy-comment:#6e6a86; --cf-sy-string:#f6c177; --cf-sy-keyword:#eb6f92;
  --cf-sy-type:#9ccfd8; --cf-sy-number:#c4a7e7; --cf-sy-func:#ebbcba;
}
html[data-cf-theme="synthwave"]{
  --cf-bg:#241b2f; --cf-bg-2:#2a1f3d; --cf-bg-3:#34254a; --cf-hover:#3d2c57;
  --cf-text:#f5e0ff; --cf-dim:#b39ccf; --cf-border:#473163;
  --cf-link:#36f9f6; --cf-link-hover:#72fffd; --cf-accent:#ff7edb;
  --cf-code-bg:#1a1426; --cf-code-text:#f5e0ff;
  --cf-sy-comment:#8a7ca8; --cf-sy-string:#ff8b39; --cf-sy-keyword:#fede5d;
  --cf-sy-type:#36f9f6; --cf-sy-number:#f97e72; --cf-sy-func:#ff7edb;
}
html[data-cf-theme="matrix"]{
  --cf-bg:#020a02; --cf-bg-2:#06140a; --cf-bg-3:#0a1e0e; --cf-hover:#0f2a14;
  --cf-text:#33ff66; --cf-dim:#1f9e3d; --cf-border:#114d22;
  --cf-link:#7dffa0; --cf-link-hover:#aeffc4; --cf-accent:#39ff14;
  --cf-code-bg:#000800; --cf-code-text:#46ff77;
  --cf-sy-comment:#1f7d36; --cf-sy-string:#9dff5c; --cf-sy-keyword:#39ff14;
  --cf-sy-type:#7dffa0; --cf-sy-number:#c6ff6e; --cf-sy-func:#5cffbf;
}
html[data-cf-theme="sepia"]{
  --cf-bg:#1c1814; --cf-bg-2:#26201a; --cf-bg-3:#2f271f; --cf-hover:#3a3026;
  --cf-text:#e8dcc8; --cf-dim:#b09c80; --cf-border:#3d3326;
  --cf-link:#d6a76b; --cf-link-hover:#eac38c; --cf-accent:#d39a55;
  --cf-code-bg:#161210; --cf-code-text:#e8dcc8;
  --cf-sy-comment:#8a7c63; --cf-sy-string:#a3b56b; --cf-sy-keyword:#cf8e5d;
  --cf-sy-type:#d6a76b; --cf-sy-number:#c98f6b; --cf-sy-func:#dcc18a;
}
html[data-cf-theme="contrast"]{
  --cf-bg:#000000; --cf-bg-2:#0d0d0d; --cf-bg-3:#1a1a1a; --cf-hover:#262626;
  --cf-text:#ffffff; --cf-dim:#cfcfcf; --cf-border:#5a5a5a;
  --cf-link:#65d6ff; --cf-link-hover:#9ee7ff; --cf-accent:#ffd400;
  --cf-code-bg:#000000; --cf-code-text:#ffffff;
  --cf-sy-comment:#bdbdbd; --cf-sy-string:#7CFC00; --cf-sy-keyword:#ffd400;
  --cf-sy-type:#65d6ff; --cf-sy-number:#ff8ad8; --cf-sy-func:#ffffff;
}

/* ===================== BASE RULES (when dark mode is ON) ===================== */

html[data-cf-dark="on"],
html[data-cf-dark="on"] body {
  background-color: var(--cf-bg) !important;
  background-image: none !important;
  color: var(--cf-text) !important;
  scrollbar-color: var(--cf-border) var(--cf-bg);
}

/* Transparent structural wrappers so the page background shows through */
html[data-cf-dark="on"] #body,
html[data-cf-dark="on"] #pageContent,
html[data-cf-dark="on"] .content-with-sidebar,
html[data-cf-dark="on"] .compendium,
html[data-cf-dark="on"] #sidebar,
html[data-cf-dark="on"] #footer,
html[data-cf-dark="on"] .footer,
html[data-cf-dark="on"] .menu-box,
html[data-cf-dark="on"] .page-content,
html[data-cf-dark="on"] .container {
  background-color: transparent !important;
  background-image: none !important;
  color: var(--cf-text) !important;
}

/* Header band + the colored top navigation */
html[data-cf-dark="on"] #header {
  background-color: var(--cf-bg-2) !important;
  background-image: none !important;
  border-color: var(--cf-border) !important;
  color: var(--cf-text) !important;
}
html[data-cf-dark="on"] .menu-list-container,
html[data-cf-dark="on"] ul.menu-list,
html[data-cf-dark="on"] .second-level-menu,
html[data-cf-dark="on"] .second-level-menu-list,
html[data-cf-dark="on"] .second-level-menu ul {
  background-color: var(--cf-bg-2) !important;
  background-image: none !important;
  border-color: var(--cf-border) !important;
  color: var(--cf-text) !important;
}
html[data-cf-dark="on"] ul.menu-list > li > a,
html[data-cf-dark="on"] .second-level-menu-list a {
  color: var(--cf-text) !important;
}
html[data-cf-dark="on"] ul.menu-list > li > a:hover,
html[data-cf-dark="on"] ul.menu-list .backLighted,
html[data-cf-dark="on"] ul.menu-list .background {
  background-color: var(--cf-accent) !important;
  background-image: none !important;
  color: #fff !important;
}

/* Cards, boxes, tables, panels */
html[data-cf-dark="on"] .roundbox,
html[data-cf-dark="on"] .datatable,
html[data-cf-dark="on"] .sidebox,
html[data-cf-dark="on"] .problemindexholder,
html[data-cf-dark="on"] .problem-statement,
html[data-cf-dark="on"] .topic,
html[data-cf-dark="on"] .comment-table,
html[data-cf-dark="on"] .comment,
html[data-cf-dark="on"] .info,
html[data-cf-dark="on"] .table-form,
html[data-cf-dark="on"] table.rtable,
html[data-cf-dark="on"] .bordertable,
html[data-cf-dark="on"] .roundbox.menu-box {
  background-color: var(--cf-bg-2) !important;
  background-image: none !important;
  border-color: var(--cf-border) !important;
  color: var(--cf-text) !important;
  box-shadow: none !important;
}

/* Roundbox decorative corners / inner borders */
html[data-cf-dark="on"] .roundbox .lt,
html[data-cf-dark="on"] .roundbox .rt,
html[data-cf-dark="on"] .roundbox .lb,
html[data-cf-dark="on"] .roundbox .rb,
html[data-cf-dark="on"] .roundbox .ilb,
html[data-cf-dark="on"] .roundbox-lt,
html[data-cf-dark="on"] .roundbox-rt,
html[data-cf-dark="on"] .roundbox-lb,
html[data-cf-dark="on"] .roundbox-rb {
  background-color: transparent !important;
  background-image: none !important;
  border-color: var(--cf-border) !important;
}

/* Titled caption bars on boxes */
html[data-cf-dark="on"] .caption.titled,
html[data-cf-dark="on"] .roundbox .caption,
html[data-cf-dark="on"] .caption {
  background-color: var(--cf-bg-3) !important;
  background-image: none !important;
  color: var(--cf-text) !important;
  text-shadow: none !important;
}

/* Tables */
html[data-cf-dark="on"] .datatable table,
html[data-cf-dark="on"] table.rtable {
  background-color: transparent !important;
}
html[data-cf-dark="on"] .datatable td,
html[data-cf-dark="on"] .datatable th,
html[data-cf-dark="on"] table.rtable td,
html[data-cf-dark="on"] table.rtable th,
html[data-cf-dark="on"] .bordertable td,
html[data-cf-dark="on"] .bordertable th {
  border-color: var(--cf-border) !important;
  background-image: none !important;
  color: var(--cf-text) !important;
}
html[data-cf-dark="on"] .datatable th,
html[data-cf-dark="on"] table.rtable th,
html[data-cf-dark="on"] .bordertable th {
  background-color: var(--cf-bg-3) !important;
}
html[data-cf-dark="on"] .datatable tr.dark td,
html[data-cf-dark="on"] .datatable tr.dark,
html[data-cf-dark="on"] tr.dark > td {
  background-color: var(--cf-bg-3) !important;
}
html[data-cf-dark="on"] .datatable tr:hover td,
html[data-cf-dark="on"] table.rtable tr:hover td,
html[data-cf-dark="on"] .highlighted-row > td,
html[data-cf-dark="on"] .highlight {
  background-color: var(--cf-hover) !important;
}

/* Problem statement typography */
html[data-cf-dark="on"] .ttypography,
html[data-cf-dark="on"] .problem-statement,
html[data-cf-dark="on"] .problem-statement .header .title,
html[data-cf-dark="on"] .problem-statement .section-title,
html[data-cf-dark="on"] h1,
html[data-cf-dark="on"] h2,
html[data-cf-dark="on"] h3,
html[data-cf-dark="on"] h4,
html[data-cf-dark="on"] h5,
html[data-cf-dark="on"] .title,
html[data-cf-dark="on"] .caption {
  color: var(--cf-text) !important;
}
html[data-cf-dark="on"] .problem-statement .property-title,
html[data-cf-dark="on"] .ttypography .small,
html[data-cf-dark="on"] .notice,
html[data-cf-dark="on"] .dimmed,
html[data-cf-dark="on"] .gray {
  color: var(--cf-dim) !important;
}

/* ----- MathJax formulas ($$$...$$$) -----
   Codeforces renders inline/display math with MathJax. By default the glyphs
   are dark, so on a dark background every formula becomes invisible. Force the
   math (and fraction bars / sqrt rules drawn with currentColor) to the theme
   text color, and make SVG glyph paths follow currentColor too. Covers
   MathJax v2 (HTML-CSS / CommonHTML / SVG) and v3 (mjx-container). */
html[data-cf-dark="on"] .MathJax,
html[data-cf-dark="on"] .MathJax *,
html[data-cf-dark="on"] .MathJax_Display,
html[data-cf-dark="on"] .MathJax_Display *,
html[data-cf-dark="on"] .MathJax_CHTML,
html[data-cf-dark="on"] .MathJax_CHTML *,
html[data-cf-dark="on"] .MathJax_SVG,
html[data-cf-dark="on"] .MathJax_SVG *,
html[data-cf-dark="on"] .MathJax_MathML,
html[data-cf-dark="on"] .MathJax_MathML *,
html[data-cf-dark="on"] .mjx-chtml,
html[data-cf-dark="on"] .mjx-chtml *,
html[data-cf-dark="on"] .mjx-math,
html[data-cf-dark="on"] .mjx-math *,
html[data-cf-dark="on"] mjx-container,
html[data-cf-dark="on"] mjx-container * {
  color: var(--cf-text) !important;
}
/* Fraction bars / rules / radical lines (CommonHTML draws them as borders or
   thin filled boxes — pin them to the text color so they stay visible). */
html[data-cf-dark="on"] .mjx-line,
html[data-cf-dark="on"] .mjx-rule,
html[data-cf-dark="on"] .mjx-stroke,
html[data-cf-dark="on"] mjx-line,
html[data-cf-dark="on"] mjx-rule {
  border-color: var(--cf-text) !important;
  background-color: var(--cf-text) !important;
}
/* SVG output: make every glyph path inherit the (now light) text color. */
html[data-cf-dark="on"] .MathJax_SVG svg [stroke="black"],
html[data-cf-dark="on"] .MathJax_SVG svg [fill="black"],
html[data-cf-dark="on"] .MathJax_SVG svg,
html[data-cf-dark="on"] .MathJax_SVG svg *,
html[data-cf-dark="on"] mjx-container svg,
html[data-cf-dark="on"] mjx-container svg * {
  fill: currentColor !important;
}

/* Links (rating-colored usernames are restored further down) */
html[data-cf-dark="on"] a,
html[data-cf-dark="on"] a:link,
html[data-cf-dark="on"] a:visited {
  color: var(--cf-link) !important;
}
html[data-cf-dark="on"] a:hover {
  color: var(--cf-link-hover) !important;
}

/* Code, pre, samples */
html[data-cf-dark="on"] pre,
html[data-cf-dark="on"] code,
html[data-cf-dark="on"] kbd,
html[data-cf-dark="on"] tt,
html[data-cf-dark="on"] .prettyprint,
html[data-cf-dark="on"] .source,
html[data-cf-dark="on"] .input pre,
html[data-cf-dark="on"] .output pre,
html[data-cf-dark="on"] .sample-test pre {
  background-color: var(--cf-code-bg) !important;
  color: var(--cf-code-text) !important;
  border-color: var(--cf-border) !important;
  text-shadow: none !important;
}
html[data-cf-dark="on"] .sample-test .title,
html[data-cf-dark="on"] .input .title,
html[data-cf-dark="on"] .output .title {
  color: var(--cf-text) !important;
}

/* Line-by-line example highlighting */
html[data-cf-dark="on"] .test-example-line-even {
  background-color: var(--cf-bg-3) !important;
}
html[data-cf-dark="on"] .test-example-line-odd {
  background-color: transparent !important;
}

/* Google-Prettify syntax tokens */
html[data-cf-dark="on"] .com { color: var(--cf-sy-comment) !important; }
html[data-cf-dark="on"] .str,
html[data-cf-dark="on"] .atv { color: var(--cf-sy-string) !important; }
html[data-cf-dark="on"] .kwd { color: var(--cf-sy-keyword) !important; }
html[data-cf-dark="on"] .typ,
html[data-cf-dark="on"] .tag { color: var(--cf-sy-type) !important; }
html[data-cf-dark="on"] .lit,
html[data-cf-dark="on"] .dec { color: var(--cf-sy-number) !important; }
html[data-cf-dark="on"] .fun,
html[data-cf-dark="on"] .atn { color: var(--cf-sy-func) !important; }
html[data-cf-dark="on"] .pln,
html[data-cf-dark="on"] .pun,
html[data-cf-dark="on"] .opn,
html[data-cf-dark="on"] .clo { color: var(--cf-code-text) !important; }

/* Inputs / textareas / selects */
html[data-cf-dark="on"] input[type="text"],
html[data-cf-dark="on"] input[type="password"],
html[data-cf-dark="on"] input[type="email"],
html[data-cf-dark="on"] input[type="search"],
html[data-cf-dark="on"] input[type="number"],
html[data-cf-dark="on"] input[type="url"],
html[data-cf-dark="on"] textarea,
html[data-cf-dark="on"] select {
  background-color: var(--cf-code-bg) !important;
  color: var(--cf-text) !important;
  border-color: var(--cf-border) !important;
}
html[data-cf-dark="on"] ::placeholder { color: var(--cf-dim) !important; }

/* Buttons */
html[data-cf-dark="on"] input[type="submit"],
html[data-cf-dark="on"] input[type="button"],
html[data-cf-dark="on"] button,
html[data-cf-dark="on"] .submit,
html[data-cf-dark="on"] a.button,
html[data-cf-dark="on"] .button {
  background-color: var(--cf-bg-3) !important;
  background-image: none !important;
  color: var(--cf-text) !important;
  border: 1px solid var(--cf-border) !important;
  box-shadow: none !important;
}
html[data-cf-dark="on"] input[type="submit"]:hover,
html[data-cf-dark="on"] button:hover,
html[data-cf-dark="on"] .submit:hover,
html[data-cf-dark="on"] .button:hover {
  border-color: var(--cf-accent) !important;
  color: var(--cf-link-hover) !important;
}

/* Spoilers / notices / misc panels */
html[data-cf-dark="on"] .spoiler-content,
html[data-cf-dark="on"] .spoiler,
html[data-cf-dark="on"] .notice,
html[data-cf-dark="on"] blockquote,
html[data-cf-dark="on"] .info-box {
  background-color: var(--cf-bg-3) !important;
  border-color: var(--cf-border) !important;
  color: var(--cf-text) !important;
}

/* Horizontal rules */
html[data-cf-dark="on"] hr {
  border-color: var(--cf-border) !important;
  background-color: var(--cf-border) !important;
  color: var(--cf-border) !important;
}

/* Pagination */
html[data-cf-dark="on"] .pagination li a,
html[data-cf-dark="on"] .pagination li span {
  background-color: var(--cf-bg-2) !important;
  border-color: var(--cf-border) !important;
  color: var(--cf-link) !important;
}
html[data-cf-dark="on"] .pagination li.active span,
html[data-cf-dark="on"] .pagination li.current span {
  background-color: var(--cf-accent) !important;
  color: #fff !important;
}

/* Themed scrollbars */
html[data-cf-dark="on"] ::-webkit-scrollbar { width: 12px; height: 12px; }
html[data-cf-dark="on"] ::-webkit-scrollbar-track { background: var(--cf-bg); }
html[data-cf-dark="on"] ::-webkit-scrollbar-thumb {
  background: var(--cf-border); border-radius: 6px; border: 2px solid var(--cf-bg);
}
html[data-cf-dark="on"] ::-webkit-scrollbar-thumb:hover { background: var(--cf-accent); }

/* ===================== RATING COLORS (kept legible on dark bg) ===================== */
/* These come last so they win over the generic link color above. */
html[data-cf-dark="on"] .user-gray,
html[data-cf-dark="on"] .user-gray a { color:#b0b0b0 !important; }
html[data-cf-dark="on"] .user-green,
html[data-cf-dark="on"] .user-green a { color:#5fc46b !important; }
html[data-cf-dark="on"] .user-cyan,
html[data-cf-dark="on"] .user-cyan a { color:#2bc4b8 !important; }
html[data-cf-dark="on"] .user-blue,
html[data-cf-dark="on"] .user-blue a { color:#6f9dff !important; }
html[data-cf-dark="on"] .user-violet,
html[data-cf-dark="on"] .user-violet a { color:#d07de0 !important; }
html[data-cf-dark="on"] .user-orange,
html[data-cf-dark="on"] .user-orange a { color:#ffa94d !important; }
html[data-cf-dark="on"] .user-red,
html[data-cf-dark="on"] .user-red a { color:#ff5b5b !important; }
html[data-cf-dark="on"] .user-legendary,
html[data-cf-dark="on"] .user-legendary a { color:#ff5b5b !important; }
html[data-cf-dark="on"] .legendary-user-first-letter { color: var(--cf-text) !important; }
html[data-cf-dark="on"] .user-admin,
html[data-cf-dark="on"] .user-admin a { color:#ff5b5b !important; }

/* Keep verdict colors meaningful but readable */
html[data-cf-dark="on"] .verdict-accepted,
html[data-cf-dark="on"] .cell-accepted { color:#5fc46b !important; }
html[data-cf-dark="on"] .verdict-rejected,
html[data-cf-dark="on"] .verdict-failed,
html[data-cf-dark="on"] .cell-rejected { color:#ff6b6b !important; }
html[data-cf-dark="on"] .verdict-waiting { color: var(--cf-dim) !important; }
`;

/* Make the globals available regardless of how this file is loaded. */
if (typeof window !== "undefined") {
  window.CF_THEME_META = CF_THEME_META;
  window.CF_DARK_CSS = CF_DARK_CSS;
}
