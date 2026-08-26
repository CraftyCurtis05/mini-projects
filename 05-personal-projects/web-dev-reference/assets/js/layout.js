/* Shared navigation, breadcrumbs, and footer. */

/* Main navigation */
function renderNavigation() {
  const navTarget = document.querySelector('[data-site-nav]');

  if (!navTarget) {
    return;
  }

  const currentPageKey = bodyElement.dataset.page || 'home';

  const createPageLink = page => {
    const currentPage = page.key === currentPageKey ? ' aria-current="page"' : '';

    return `<li><a href="${page.href}"${currentPage}>${escapeHtml(page.label)}</a></li>`;
  };

  const groupedLinks = navGroups
    .map(group => {
      const groupPages = group.pages
        .map(pageKey => pages.find(page => page.key === pageKey))
        .filter(Boolean);

      const hasCurrentPage = groupPages.some(page => page.key === currentPageKey);
      const currentPageClass = hasCurrentPage ? ' has-current-page' : '';

      return `
        <li class="nav-group${currentPageClass}">
          <details>
            <summary>${escapeHtml(group.label)}</summary>
            <ul class="nav-submenu">
              ${groupPages.map(createPageLink).join('')}
            </ul>
          </details>
        </li>
      `;
    })
    .join('');

  const homePage = pages.find(page => page.key === 'home');
  const patternsPage = pages.find(page => page.key === 'patterns');

  navTarget.innerHTML = `
    <nav class="site-nav" aria-label="Main navigation">
      <a
        class="nav-brand"
        href="/index.html"
        aria-label="Web Development Reference home"
      >
        <img
          src="/assets/images/logo-black.webp"
          alt=""
          class="nav-logo logo-light"
        >
        <img
          src="/assets/images/logo-white.webp"
          alt=""
          class="nav-logo logo-dark"
        >
        <span>Web Dev Reference</span>
      </a>

      <ul class="nav-links nav-links-grouped">
        ${createPageLink(homePage)}
        ${groupedLinks}
        ${createPageLink(patternsPage)}
      </ul>

      <div class="nav-actions">
        <button
          class="nav-action"
          id="global-search-button"
          type="button"
          aria-haspopup="dialog"
          aria-controls="global-search-dialog"
        >
          <span aria-hidden="true">⌕</span>
          <span class="nav-action-label">Search</span>
          <kbd aria-hidden="true">⌘K</kbd>
        </button>

        <button
          class="nav-action"
          id="saved-button"
          type="button"
          aria-haspopup="dialog"
          aria-controls="saved-dialog"
        >
          <span aria-hidden="true">★</span>
          <span class="nav-action-label">Saved</span>
        </button>

        <button
          class="theme-toggle"
          id="theme-toggle"
          type="button"
          aria-label="Toggle dark theme"
          aria-pressed="false"
          title="Toggle dark theme"
        >
          <span class="theme-icon" aria-hidden="true">☀</span>
          <span class="theme-track" aria-hidden="true">
            <span class="theme-thumb"></span>
          </span>
          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>

      <div class="scroll-progress" aria-hidden="true">
        <span class="scroll-progress-bar" id="scroll-progress-bar"></span>
      </div>
    </nav>
  `;
}

/* Navigation dropdowns */
function initializeGroupedNavigation() {
  const navMenus = [...document.querySelectorAll('.nav-group details')];

  if (!navMenus.length) {
    return;
  }

  // I only want one dropdown open at a time so the navigation stays easy to scan.
  navMenus.forEach(menu => {
    menu.addEventListener('toggle', () => {
      if (!menu.open) {
        return;
      }

      navMenus.forEach(otherMenu => {
        if (otherMenu !== menu) {
          otherMenu.open = false;
        }
      });
    });
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.nav-group')) {
      return;
    }

    navMenus.forEach(menu => {
      menu.open = false;
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') {
      return;
    }

    navMenus.forEach(menu => {
      menu.open = false;
    });
  });
}

/* Breadcrumbs */
function renderBreadcrumbs() {
  if (bodyElement.dataset.page === 'home') {
    return;
  }

  const heroElement = document.querySelector('.hero');

  if (!heroElement) {
    return;
  }

  heroElement.insertAdjacentHTML(
    'beforebegin',
    `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="/index.html">Home</a></li>
          <li aria-hidden="true">›</li>
          <li>
            <span aria-current="page">${escapeHtml(currentPageLabel())}</span>
          </li>
        </ol>
      </nav>
    `
  );
}

/* Footer */
function renderFooter() {
  const footerTarget = document.querySelector('[data-site-footer]');

  if (!footerTarget) {
    return;
  }

  const footerLabel = bodyElement.dataset.footer || 'Web Development Reference';

  footerTarget.innerHTML = `
    <footer class="site-footer">
      <div class="footer-copy">
        <strong>${escapeHtml(footerLabel)}</strong>
        <p>
          Built by Jennifer Curtis as a reference for the web development things I keep
          looking up.
        </p>

        <div class="brand-dots" aria-hidden="true">
          <span class="brand-dot"></span>
          <span class="brand-dot"></span>
          <span class="brand-dot"></span>
        </div>

        <p class="reviewed-date">
          <time datetime="2026-08">Last reviewed August 2026</time>
        </p>

        <nav class="footer-links" aria-label="Footer navigation">
          <a href="/accessibility.html">Accessibility</a>
          <a href="/sitemap.html">Site Map</a>
          <a
            href="${portfolioUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>

      <a
        class="footer-logo-link"
        href="${portfolioUrl}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Jennifer Curtis portfolio, opens in a new tab"
      >
        <img
          src="/assets/images/logo-black.webp"
          alt=""
          class="footer-logo logo-light"
        >
        <img
          src="/assets/images/logo-white.webp"
          alt=""
          class="footer-logo logo-dark"
        >
      </a>
    </footer>
  `;
}
