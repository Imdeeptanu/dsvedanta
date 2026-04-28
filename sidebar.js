// ============================================================
// SIDEBAR — DS Vedanta Academy
// Fixed left icon rail. Loads on every page via one script tag.
// To add a new page: add one entry to SIDEBAR_ITEMS below.
// v3: + Pixie dark mode overrides + mobile FAB dark toggle
// ============================================================

(function () {

  // ── ITEMS ────────────────────────────────────────────────
  var SIDEBAR_ITEMS = [
    { icon: '🏠', label: 'Home',      href: 'index.html',      key: 'home'      },
    { icon: '📚', label: 'Resources', href: 'resource.html',   key: 'resources' },
    { icon: '📖', label: 'Books',     href: 'books.html',      key: 'books'     },
    { icon: '📝', label: 'Papers',    href: 'papers.html',     key: 'papers'    },
    { icon: '✨', label: 'Pixie',     href: 'pixie-chat.html', key: 'pixie'     },
  ];

  // ── DARK MODE — read saved preference before anything renders
  var isDark = localStorage.getItem('dsva_dark') === '1';

  // ── STYLES ───────────────────────────────────────────────
  var styles = `
    /* ── DESKTOP SIDEBAR ── */
    #dsva-sidebar {
      position: fixed !important;
      top: 64px !important;
      left: 0 !important;
      bottom: 0 !important;
      width: 64px !important;
      background: #0a4a42;
      z-index: 98;
      display: flex !important;
      flex-direction: column;
      align-items: center;
      padding: 0.75rem 0;
      gap: 0.25rem;
      justify-content: flex-start;
      box-shadow: 2px 0 16px rgba(10, 74, 66, 0.18);
      border-right: 1px solid rgba(255,255,255,0.06);
    }

    .dsva-sb-item {
      width: 52px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.22rem;
      padding: 0.55rem 0.4rem;
      border-radius: 12px;
      text-decoration: none;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
      position: relative;
    }

    .dsva-sb-item:hover {
      background: rgba(255,255,255,0.1);
      transform: translateX(2px);
    }

    .dsva-sb-item.active {
      background: rgba(45, 189, 172, 0.22);
    }

    .dsva-sb-item.active::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 28px;
      background: #2dbdac;
      border-radius: 0 4px 4px 0;
    }

    .dsva-sb-icon {
      font-size: 1.3rem;
      line-height: 1;
      display: block;
    }

    .dsva-sb-label {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.58rem;
      font-weight: 600;
      letter-spacing: 0.4px;
      color: rgba(255,255,255,0.65);
      text-transform: uppercase;
      line-height: 1;
      text-align: center;
    }

    .dsva-sb-item.active .dsva-sb-label {
      color: #2dbdac;
    }

    .dsva-sb-tooltip {
      position: absolute;
      left: 68px;
      top: 50%;
      transform: translateY(-50%);
      background: #1a2e2c;
      color: #fff;
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.3rem 0.75rem;
      border-radius: 8px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s;
      font-family: 'Plus Jakarta Sans', sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .dsva-sb-tooltip::before {
      content: '';
      position: absolute;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-left: none;
      border-right-color: #1a2e2c;
    }

    .dsva-sb-item:hover .dsva-sb-tooltip {
      opacity: 1;
    }

    .dsva-sb-divider {
      width: 32px;
      height: 1px;
      background: rgba(255,255,255,0.1);
      margin: 0.25rem 0;
      flex-shrink: 0;
    }

    /* ── DARK TOGGLE BUTTON (desktop sidebar) ── */
    #dsva-dark-toggle {
      width: 52px;
      height: 36px;
      border-radius: 12px;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      margin-top: auto;
      margin-bottom: 0.75rem;
      flex-shrink: 0;
      transition: background 0.2s;
    }
    #dsva-dark-toggle:hover {
      background: rgba(255,255,255,0.1);
    }

    /* ── MOBILE BOTTOM NAV ── */
    #dsva-bottom-nav {
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      top: auto !important;
      height: 62px !important;
      background: #0a4a42;
      z-index: 9999 !important;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 -2px 16px rgba(10, 74, 66, 0.25);
      border-top: 1px solid rgba(255,255,255,0.08);
      display: none !important;
    }

    .dsva-bn-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.18rem;
      padding: 0.4rem 0.2rem;
      text-decoration: none;
      cursor: pointer;
      position: relative;
      transition: transform 0.15s;
    }

    .dsva-bn-item:active {
      transform: scale(0.92);
    }

    .dsva-bn-item.active::before {
      content: '';
      position: absolute;
      top: 0;
      left: 20%;
      right: 20%;
      height: 3px;
      background: #c9a84c;
      border-radius: 0 0 4px 4px;
    }

    .dsva-bn-icon {
      font-size: 1.3rem;
      line-height: 1;
      display: block;
    }

    .dsva-bn-label {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.58rem;
      font-weight: 600;
      letter-spacing: 0.3px;
      color: rgba(255,255,255,0.55);
      text-transform: uppercase;
      line-height: 1;
      text-align: center;
    }

    .dsva-bn-item.active .dsva-bn-label {
      color: #c9a84c;
    }

    .dsva-bn-item.active .dsva-bn-icon {
      filter: drop-shadow(0 0 4px rgba(201,168,76,0.5));
    }

    /* ── MOBILE FAB DARK TOGGLE (bottom-left, above bottom nav) ── */
    #dsva-fab-dark {
      display: none;
      position: fixed;
      bottom: 145px;
      left: 14px;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: #0a4a42;
      border: none;
      cursor: pointer;
      font-size: 1.25rem;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(10,74,66,0.4);
      z-index: 9998;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #dsva-fab-dark:active {
      transform: scale(0.92);
      box-shadow: 0 2px 8px rgba(10,74,66,0.3);
    }

    /* ── Pixie input area — push above bottom nav on mobile only ──
       62px   = fixed bottom nav height
       0.6rem = breathing room above nav
       env(safe-area-inset-bottom) is NOT added here because #pixie-page
       in pixie-chat.html already applies it on the container — adding it
       here would double-count it and break button-nav phones (Redmi etc).
       This rule is strictly scoped to max-width:768px — desktop never affected.
    ── */
    

    @media screen and (min-width: 769px) {
      #dsva-sidebar {
        display: flex !important;
      }
      #dsva-bottom-nav {
        display: none !important;
      }
      #dsva-fab-dark {
        display: none !important;
      }
      body {
        margin-left: 64px !important;
      }
    }

    @media screen and (max-width: 768px) {
      #dsva-sidebar {
        display: none !important;
      }
      #dsva-bottom-nav {
        display: flex !important;
      }
      #dsva-fab-dark {
        display: flex !important;
      }
      #dsva-dark-toggle {
        display: none !important;
      }
      body {
        margin-left: 0 !important;
        padding-bottom: 62px !important;
      }
    }

    /* ════════════════════════════════════════
       DARK MODE — general page overrides
       ════════════════════════════════════════ */
    body.dsva-dark {
      --bg:       #0d1f1d !important;
      --bg2:      #122220 !important;
      --bg3:      #162926 !important;
      --text:     #e4f0ee !important;
      --muted:    #7ab8b0 !important;
      --border:   #1e3d38 !important;
      --white:    #0d1f1d !important;
      background: #0d1f1d !important;
      color:      #e4f0ee !important;
    }
    body.dsva-dark nav {
      background: rgba(13,31,29,0.97) !important;
      border-bottom-color: #1e3d38 !important;
    }
    body.dsva-dark .nav-name,
    body.dsva-dark .nav-links a,
    body.dsva-dark h1, body.dsva-dark h2,
    body.dsva-dark h3, body.dsva-dark h4 {
      color: #e4f0ee !important;
    }
    body.dsva-dark .book-card,
    body.dsva-dark .pdf-card,
    body.dsva-dark .paper-card,
    body.dsva-dark .res-card,
    body.dsva-dark .subj-card,
    body.dsva-dark .why-card,
    body.dsva-dark .step,
    body.dsva-dark .review-card,
    body.dsva-dark .teacher-card,
    body.dsva-dark .contact-form {
      background: #122220 !important;
      border-color: #1e3d38 !important;
    }
    body.dsva-dark .btn-view {
      background: #162926 !important;
      color: #2dbdac !important;
      border-color: #1e3d38 !important;
    }
    body.dsva-dark .btn-dl {
      background: #0d1f1d !important;
      color: #2dbdac !important;
      border-color: #2dbdac !important;
    }
    body.dsva-dark input,
    body.dsva-dark select,
    body.dsva-dark textarea {
      background: #162926 !important;
      border-color: #1e3d38 !important;
      color: #e4f0ee !important;
    }
    body.dsva-dark .filter-btn {
      background: #122220 !important;
      border-color: #1e3d38 !important;
      color: #7ab8b0 !important;
    }
    body.dsva-dark .filter-btn.active {
      background: #1a3d38 !important;
      color: #2dbdac !important;
      border-color: #2dbdac !important;
    }
    body.dsva-dark .page-hero,
    body.dsva-dark #hero {
      background: linear-gradient(135deg,#0d1f1d 0%,#112620 50%,#0f1e1c 100%) !important;
    }
    body.dsva-dark .ctag {
      background: #162926 !important;
      border-color: #1e3d38 !important;
      color: #7ab8b0 !important;
    }
    body.dsva-dark .card-title,
    body.dsva-dark .res-info h4 {
      color: #c8ede9 !important;
    }
    body.dsva-dark .class-section,
    body.dsva-dark .subject-group {
      color: #e4f0ee !important;
    }
    body.dsva-dark #dsva-sidebar {
      background: #071412 !important;
    }
    body.dsva-dark #dsva-bottom-nav {
      background: #071412 !important;
    }
    body.dsva-dark #dsva-fab-dark {
      background: #2dbdac !important;
    }
    body.dsva-dark .mobile-menu {
      background: rgba(13,31,29,0.99) !important;
      border-color: #1e3d38 !important;
    }
    body.dsva-dark .mobile-menu a {
      color: #c8ede9 !important;
      border-color: #1e3d38 !important;
    }

    /* ════════════════════════════════════════
       DARK MODE — Pixie page specific overrides
       ════════════════════════════════════════ */
    body.dsva-dark #pixie-page {
      --chat-bg:          #0d1f1d !important;
      --bubble-ai:        #122220 !important;
      --bg2:              #162926 !important;
      --bg3:              #1a3330 !important;
      --text:             #e4f0ee !important;
      --muted:            #7ab8b0 !important;
      --border:           #1e3d38 !important;
      --input-bg:         #162926 !important;
      background:         #0d1f1d !important;
    }

    body.dsva-dark #messages-area {
      background: #0d1f1d !important;
    }

    body.dsva-dark .msg-bubble.ai {
      background: #122220 !important;
      border-color: #1e3d38 !important;
      color: #e4f0ee !important;
    }

    body.dsva-dark .msg-bubble.typing-bubble {
      background: #122220 !important;
      border-color: #1e3d38 !important;
    }

    body.dsva-dark .qs-btn {
      background: #122220 !important;
      border-color: #1e3d38 !important;
    }
    body.dsva-dark .qs-btn:hover {
      background: #1a3330 !important;
      border-color: #2dbdac !important;
    }
    body.dsva-dark .qs-title {
      color: #c8ede9 !important;
    }
    body.dsva-dark .qs-sub {
      color: #7ab8b0 !important;
    }
    body.dsva-dark #quickstart h3 {
      color: #c8ede9 !important;
    }
    body.dsva-dark #quickstart p {
      color: #7ab8b0 !important;
    }

    body.dsva-dark #input-area {
      background: #071412 !important;
      border-top-color: #1e3d38 !important;
    }
    body.dsva-dark #chat-input {
      background: #162926 !important;
      border-color: #1e3d38 !important;
      color: #e4f0ee !important;
    }
    body.dsva-dark #chat-input:focus {
      background: #1a3330 !important;
      border-color: #2dbdac !important;
    }
    body.dsva-dark #chat-input::placeholder {
      color: #4a7a75 !important;
    }

    body.dsva-dark #upload-btn {
      background: #162926 !important;
      border-color: #1e3d38 !important;
    }
    body.dsva-dark #upload-btn:hover {
      background: #1a3330 !important;
      border-color: #2dbdac !important;
    }

    body.dsva-dark #img-preview-strip {
      background: #071412 !important;
      border-top-color: #1e3d38 !important;
    }

    body.dsva-dark .msg-time {
      color: #4a7a75 !important;
    }

    body.dsva-dark .confirm-box {
      background: #122220 !important;
      color: #e4f0ee !important;
    }
    body.dsva-dark .confirm-box h3 {
      color: #c8ede9 !important;
    }
    body.dsva-dark .confirm-box p {
      color: #7ab8b0 !important;
    }
    body.dsva-dark #confirm-no {
      background: #162926 !important;
      border-color: #1e3d38 !important;
      color: #7ab8b0 !important;
    }

    body.dsva-dark #dl-dropdown {
      background: #122220 !important;
      border-color: #1e3d38 !important;
    }
    body.dsva-dark .dl-item {
      color: #e4f0ee !important;
    }
    body.dsva-dark .dl-item:hover {
      background: #1a3330 !important;
      color: #2dbdac !important;
    }
    body.dsva-dark .dl-item + .dl-item {
      border-top-color: #1e3d38 !important;
    }

    body.dsva-dark #messages-area::-webkit-scrollbar-thumb {
      background: #1e3d38 !important;
    }
  `;

  // ── BUILD ─────────────────────────────────────────────────
  function buildSidebar() {

    // Inject styles into <head>
    var styleEl = document.createElement('style');
    styleEl.id = 'dsva-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Apply saved dark mode immediately — before paint, no flash
    if (isDark) document.body.classList.add('dsva-dark');

    var currentPage = document.body.getAttribute('data-page') || '';

    // ── Desktop Sidebar ──
    var sidebar = document.createElement('nav');
    sidebar.id = 'dsva-sidebar';
    sidebar.setAttribute('aria-label', 'Site navigation');

    SIDEBAR_ITEMS.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'dsva-sb-item' + (currentPage === item.key ? ' active' : '');
      a.href = item.href;
      a.setAttribute('aria-label', item.label);
      a.innerHTML =
        '<span class="dsva-sb-icon">' + item.icon + '</span>' +
        '<span class="dsva-sb-label">' + item.label + '</span>' +
        '<span class="dsva-sb-tooltip">' + item.label + '</span>';
      sidebar.appendChild(a);
    });

    // Dark toggle — last child, floats to bottom via margin-top: auto
    var darkBtn = document.createElement('button');
    darkBtn.id = 'dsva-dark-toggle';
    darkBtn.setAttribute('aria-label', 'Toggle dark mode');
    darkBtn.innerHTML = isDark ? '☀️' : '🌙';
    darkBtn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    sidebar.appendChild(darkBtn);

    document.body.insertBefore(sidebar, document.body.firstChild);

    // ── Mobile Bottom Nav (5 items only, no dark toggle) ──
    var bottomNav = document.createElement('nav');
    bottomNav.id = 'dsva-bottom-nav';
    bottomNav.setAttribute('aria-label', 'Mobile navigation');

    SIDEBAR_ITEMS.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'dsva-bn-item' + (currentPage === item.key ? ' active' : '');
      a.href = item.href;
      a.setAttribute('aria-label', item.label);
      a.innerHTML =
        '<span class="dsva-bn-icon">' + item.icon + '</span>' +
        '<span class="dsva-bn-label">' + item.label + '</span>';
      bottomNav.appendChild(a);
    });

    document.body.appendChild(bottomNav);

    // ── Mobile FAB dark toggle (bottom-left, above bottom nav) ──
    var fab = document.createElement('button');
    fab.id = 'dsva-fab-dark';
    fab.setAttribute('aria-label', 'Toggle dark mode');
    fab.innerHTML = isDark ? '☀️' : '🌙';
    document.body.appendChild(fab);

    // ── Dark mode toggle logic ──
    function applyDark(on) {
  document.body.classList.toggle('dsva-dark', on);
  localStorage.setItem('dsva_dark', on ? '1' : '0');
  darkBtn.innerHTML = on ? '☀️' : '🌙';
  darkBtn.title     = on ? 'Switch to light mode' : 'Switch to dark mode';
  fab.innerHTML     = on ? '☀️' : '🌙';

  // if (currentPage === 'pixie' && window.innerWidth <= 768) {
  //   var inputArea = document.getElementById('input-area');
  //   if (inputArea) {
  //     inputArea.style.display = 'none';
  //     inputArea.offsetHeight;
  //     inputArea.style.display = '';
  //   }
  // }
}

    darkBtn.addEventListener('click', function () {
      isDark = !isDark;
      applyDark(isDark);
    });
    fab.addEventListener('click', function () {
      isDark = !isDark;
      applyDark(isDark);
    });

    // ── Force repaint on Pixie page — MOBILE ONLY ──
    // Problem: on Android browsers, the padding-bottom CSS rule above is
    // calculated correctly but not visually applied on the very first paint
    // in light mode. Dark mode toggle was accidentally fixing this because
    // adding a background colour change triggers a GPU repaint.
    // Fix: we trigger that same repaint deliberately using translateZ(0).
    // This is paint-only — it does NOT affect layout or flex positioning.
    // The window.innerWidth <= 768 guard ensures desktop is NEVER touched.
//     if (currentPage === 'pixie') {
//   function forcePixieRepaint() {
//     if (window.innerWidth <= 768) {
//       var inputArea = document.getElementById('input-area');
//       if (inputArea) {
//         inputArea.style.display = 'none';
//         inputArea.offsetHeight;
//         inputArea.style.display = '';
//         inputArea.offsetHeight;
//       }
//     }
//   }
//   setTimeout(forcePixieRepaint, 80);
//   setTimeout(forcePixieRepaint, 300);
// }

  }

  // ── INIT ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSidebar);
  } else {
    buildSidebar();
  }

})();