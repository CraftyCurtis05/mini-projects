/* =========================================================
   Web Development Reference
   Navigation, breadcrumbs, footer, loader, and page chrome
   ========================================================= */

function renderNavigation() {
  const target = document.querySelector("[data-site-nav]");
  if (!target) {
    return;
  }

  const currentPage = body.dataset.page || "home";

  const pageLink = (page) => {
    const current = page.key === currentPage ? ' aria-current="page"' : "";
    return `<li><a href="${page.href}"${current}>${escapeHTML(page.label)}</a></li>`;
  };

  const groupMarkup = NAV_GROUPS.map((group) => {
    const groupPages = group.pages
      .map((key) => PAGES.find((page) => page.key === key))
      .filter(Boolean);

    const containsCurrent = groupPages.some((page) => page.key === currentPage);
    const activeClass = containsCurrent ? " has-current-page" : "";

    return `
      <li class="nav-group${activeClass}">
        <details>
          <summary>${escapeHTML(group.label)}</summary>
          <ul class="nav-submenu">
            ${groupPages.map(pageLink).join("")}
          </ul>
        </details>
      </li>`;
  }).join("");

  const home = PAGES.find((page) => page.key === "home");
  const patterns = PAGES.find((page) => page.key === "patterns");

  target.innerHTML = `
    <nav class="site-nav" aria-label="Main navigation">
      <a class="nav-brand" href="index.html" aria-label="Web Development Reference home">
        <img src="assets/images/logo_blk_01.png" alt="" class="nav-logo logo-light" />
        <img src="assets/images/logo_wht_01.png" alt="" class="nav-logo logo-dark" />
        <span>Web Dev Reference</span>
      </a>

      <ul class="nav-links nav-links-grouped">
        ${pageLink(home)}
        ${groupMarkup}
        ${pageLink(patterns)}
      </ul>

      <div class="nav-actions">
        <button class="nav-action" id="global-search-button" type="button" aria-haspopup="dialog" aria-controls="global-search-dialog">
          <span aria-hidden="true">⌕</span><span class="nav-action-label">Search</span>
          <kbd aria-hidden="true">⌘K</kbd>
        </button>
        <button class="nav-action" id="saved-button" type="button" aria-haspopup="dialog" aria-controls="saved-dialog">
          <span aria-hidden="true">★</span><span class="nav-action-label">Saved</span>
        </button>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle dark theme" aria-pressed="false" title="Toggle dark theme">
          <span class="theme-icon" aria-hidden="true">☀</span>
          <span class="theme-track" aria-hidden="true"><span class="theme-thumb"></span></span>
          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>

      <div class="scroll-progress" aria-hidden="true">
        <span class="scroll-progress-bar" id="scroll-progress-bar"></span>
      </div>
    </nav>`;
}

/* ---------- Grouped navigation ---------- */
function initializeGroupedNavigation() {
  const menus = [...document.querySelectorAll(".nav-group details")];
  if (!menus.length) {
    return;
  }

  menus.forEach((menu) => {
    menu.addEventListener("toggle", () => {
      if (!menu.open) {
        return;
      }
      menus.forEach((otherMenu) => {
        if (otherMenu !== menu) otherMenu.open = false;
      });
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.open = false;
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".nav-group")) {
      return;
    }
    menus.forEach((menu) => {
      menu.open = false;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    menus.forEach((menu) => {
      menu.open = false;
    });
  });
}

/* ---------- Breadcrumbs ---------- */
function renderBreadcrumbs() {
  if (body.dataset.page === "home") {
    return;
  }
  const hero = document.querySelector(".hero");
  if (!hero) {
    return;
  }
  hero.insertAdjacentHTML("beforebegin", `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="index.html">Home</a></li>
        <li aria-hidden="true">›</li>
        <li><span aria-current="page">${escapeHTML(currentPageLabel())}</span></li>
      </ol>
    </nav>`);
}

/* ---------- Footer ---------- */
function renderFooter() {
  const target = document.querySelector("[data-site-footer]");
  if (!target) {
    return;
  }
  const label = body.dataset.footer || "Web Development Reference";

  target.innerHTML = `
    <footer class="site-footer">
      <div class="footer-copy">
        <strong>${escapeHTML(label)}</strong>
        <p>Designed &amp; built by Jennifer Curtis as an evolving reference for learning, remembering, and building.</p>
        <div class="brand-dots" aria-hidden="true"><span class="brand-dot"></span><span class="brand-dot"></span><span class="brand-dot"></span></div>
        <p class="reviewed-date"><time datetime="2026-08">Last reviewed August 2026</time></p>
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="accessibility.html">Accessibility</a>
          <a href="sitemap.html">Site Map</a>
          <a href="${PORTFOLIO_URL}" target="_blank" rel="noopener noreferrer">Portfolio <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
      <a class="footer-logo-link" href="${PORTFOLIO_URL}" target="_blank" rel="noopener noreferrer" aria-label="Visit Jennifer Curtis portfolio, opens in a new tab">
        <img src="assets/images/logo_blk_01.png" alt="" class="footer-logo logo-light" />
        <img src="assets/images/logo_wht_01.png" alt="" class="footer-logo logo-dark" />
      </a>
    </footer>`;
}

/* ---------- Theme ---------- */
