/* ==========================================================================
   Shared Layout
   Main navigation, mobile controls, breadcrumbs, and footer.
   ========================================================================== */


/* ========================================
   Main Navigation
   ======================================== */

function renderNavigation() {
  const navTarget = document.querySelector('[data-site-nav]');

  if (!navTarget) {
    return;
  }

  const currentPageKey = bodyElement.dataset.page || 'home';


  /* Page Links */

  const createPageLink = page => {
    const currentPage =
      page.key === currentPageKey
        ? ' aria-current="page"'
        : '';

    return `
      <li>
        <a
          href="${page.href}"
          ${currentPage}
        >
          ${escapeHtml(page.label)}
        </a>
      </li>
    `;
  };


  /* Grouped Navigation Links */

  const groupedLinks = navGroups
    .map(group => {
      const groupPages = group.pages
        .map(pageKey =>
          pages.find(page => page.key === pageKey)
        )
        .filter(Boolean);

      const hasCurrentPage = groupPages.some(
        page => page.key === currentPageKey
      );

      const currentPageClass =
        hasCurrentPage
          ? ' has-current-page'
          : '';

      return `
        <li class="nav-group${currentPageClass}">
          <details>
            <summary>
              ${escapeHtml(group.label)}
            </summary>

            <ul class="nav-submenu">
              ${groupPages
                .map(createPageLink)
                .join('')}
            </ul>
          </details>
        </li>
      `;
    })
    .join('');


  /* Standalone Navigation Links */

  const homePage = pages.find(page => page.key === 'home');

  const patternsPage = pages.find(
    page => page.key === 'patterns'
  );


  /* Render Navigation */

  navTarget.innerHTML = `
    <nav
      class="site-nav"
      aria-label="Main navigation"
    >
      <a
        class="nav-brand"
        href="/index.html"
        aria-label="Web Development Reference home"
      >
        <img
          src="/assets/images/logo/web-dev-reference-logo.svg"
          alt=""
          class="nav-logo logo-light"
        >

        <img
          src="/assets/images/logo/web-dev-reference-logo-dark.svg"
          alt=""
          class="nav-logo logo-dark"
        >

        <img
          src="/assets/images/logo/web-dev-reference-mark.svg"
          alt=""
          class="nav-logo nav-logo-mark"
        >
      </a>


      <!-- Mobile Navigation Toggle -->

      <button
        class="nav-menu-toggle"
        id="nav-menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="main-nav-links"
      >
        <span
          class="nav-menu-icon"
          aria-hidden="true"
        >
          ☰
        </span>

        <span>
          Menu
        </span>
      </button>


      <!-- Navigation Links -->

      <ul
        class="nav-links nav-links-grouped"
        id="main-nav-links"
      >
        ${createPageLink(homePage)}

        ${groupedLinks}

        ${createPageLink(patternsPage)}
      </ul>


      <!-- Navigation Actions -->

      <div class="nav-actions">

        <!-- Global Search -->

        <button
          class="nav-action"
          id="global-search-button"
          type="button"
          aria-haspopup="dialog"
          aria-controls="global-search-dialog"
        >
          <span
            class="nav-action-icon"
            aria-hidden="true"
          >
            ⌕
          </span>

          <span class="nav-action-label">
            Search
          </span>

          <kbd aria-hidden="true">
            ⌘K
          </kbd>
        </button>


        <!-- Saved References -->

        <button
          class="nav-action"
          id="saved-button"
          type="button"
          aria-haspopup="dialog"
          aria-controls="saved-dialog"
        >
          <span
            class="nav-action-icon"
            aria-hidden="true"
          >
            ★
          </span>

          <span class="nav-action-label">
            Saved
          </span>
        </button>


        <!-- Theme Toggle -->

        <button
          class="theme-toggle"
          id="theme-toggle"
          type="button"
          aria-label="Toggle dark theme"
          aria-pressed="false"
          title="Toggle dark theme"
        >
          <span
            class="theme-icon"
            aria-hidden="true"
          >
            ☀
          </span>

          <span
            class="theme-track"
            aria-hidden="true"
          >
            <span class="theme-thumb"></span>
          </span>

          <span
            class="theme-icon"
            aria-hidden="true"
          >
            ☾
          </span>
        </button>

      </div>


      <!-- Scroll Progress -->

      <div
        class="scroll-progress"
        aria-hidden="true"
      >
        <span
          class="scroll-progress-bar"
          id="scroll-progress-bar"
        ></span>
      </div>
    </nav>
  `;
}


/* ========================================
   Navigation Dropdowns
   ======================================== */

function initializeGroupedNavigation() {
  const navMenus = [
    ...document.querySelectorAll('.nav-group details')
  ];

  if (!navMenus.length) {
    return;
  }


  /*
   * I keep only one navigation dropdown
   * open at a time.
   */

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


  /*
   * I close open dropdowns when the user
   * clicks outside the navigation groups.
   */

  document.addEventListener('click', event => {
    if (event.target.closest('.nav-group')) {
      return;
    }

    navMenus.forEach(menu => {
      menu.open = false;
    });
  });


  /*
   * Escape closes the active dropdown and
   * returns focus to its summary button.
   */

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') {
      return;
    }

    const activeMenu = event.target.closest(
      '.nav-group details'
    );

    if (!activeMenu || !activeMenu.open) {
      return;
    }

    activeMenu.open = false;

    activeMenu.querySelector('summary')?.focus();
  });
}


/* ========================================
   Mobile Navigation
   ======================================== */

function initializeMobileNavigation() {
  const siteNav = document.querySelector('.site-nav');
  const menuToggle = document.querySelector('#nav-menu-toggle');
  const navLinks = document.querySelector('#main-nav-links');

  if (!siteNav || !menuToggle || !navLinks) {
    return;
  }


  /*
   * I show a visual cue when a mobile
   * submenu has more links off to the right.
   */

  const updateSubmenuScrollCue = submenu => {
    const group = submenu.closest('.nav-group');

    if (!group) {
      return;
    }

    const hasMoreRight =
      submenu.scrollWidth > submenu.clientWidth &&
      submenu.scrollLeft + submenu.clientWidth <
        submenu.scrollWidth - 2;

    group.classList.toggle(
      'has-more-right',
      hasMoreRight
    );
  };


  /* Close Mobile Navigation */

  const closeMenu = () => {
    siteNav.classList.remove('is-menu-open');

    document
      .querySelectorAll('.nav-group.has-more-right')
      .forEach(group => {
        group.classList.remove('has-more-right');
      });

    menuToggle.setAttribute(
      'aria-expanded',
      'false'
    );
  };


  /* Toggle Mobile Navigation */

  menuToggle.addEventListener('click', () => {
    const menuIsOpen = siteNav.classList.toggle(
      'is-menu-open'
    );

    menuToggle.setAttribute(
      'aria-expanded',
      String(menuIsOpen)
    );

    if (!menuIsOpen) {
      document
        .querySelectorAll('.nav-group.has-more-right')
        .forEach(group => {
          group.classList.remove('has-more-right');
        });
    }
  });


  /*
   * I update the scroll cue as the user
   * moves through each mobile submenu.
   */

  const navSubmenus = [
    ...navLinks.querySelectorAll('.nav-submenu')
  ];

  navSubmenus.forEach(submenu => {
    submenu.addEventListener(
      'scroll',
      () => {
        updateSubmenuScrollCue(submenu);
      },
      {
        passive: true
      }
    );
  });


  /*
   * When a grouped menu opens, I check
   * whether its submenu needs the scroll cue.
   */

  navLinks.addEventListener(
    'toggle',
    event => {
      const details = event.target;

      if (
        !details.matches('.nav-group details') ||
        !details.open
      ) {
        return;
      }

      const submenu = details.querySelector(
        '.nav-submenu'
      );

      if (!submenu) {
        return;
      }

      requestAnimationFrame(() => {
        updateSubmenuScrollCue(submenu);
      });
    },
    true
  );


  /*
   * Escape closes the mobile navigation and
   * returns focus to the menu toggle.
   */

  document.addEventListener('keydown', event => {
    if (
      event.key !== 'Escape' ||
      !siteNav.classList.contains('is-menu-open')
    ) {
      return;
    }

    /*
     * I let grouped navigation handle Escape
     * first when focus is inside a group.
     */

    if (event.target.closest('.nav-group')) {
      return;
    }

    closeMenu();
    menuToggle.focus();
  });


  /*
   * I reset the mobile menu when the layout
   * returns to the larger desktop navigation.
   */

  window
    .matchMedia('(min-width: 921px)')
    .addEventListener('change', event => {
      if (event.matches) {
        closeMenu();
      }
    });
}


/* ========================================
   Breadcrumbs
   ======================================== */

function renderBreadcrumbs() {
  if (bodyElement.dataset.page === 'home') {
    return;
  }

  const heroElement = document.querySelector('.hero');

  if (!heroElement) {
    return;
  }


  /*
   * Breadcrumbs sit directly before the
   * page hero on every page except home.
   */

  heroElement.insertAdjacentHTML(
    'beforebegin',
    `
      <nav
        class="breadcrumbs"
        aria-label="Breadcrumb"
      >
        <ol>
          <li>
            <a href="/index.html">
              Home
            </a>
          </li>

          <li aria-hidden="true">
            ›
          </li>

          <li>
            <span aria-current="page">
              ${escapeHtml(currentPageLabel())}
            </span>
          </li>
        </ol>
      </nav>
    `
  );
}


/* ========================================
   Footer
   ======================================== */

function renderFooter() {
  const footerTarget = document.querySelector(
    '[data-site-footer]'
  );

  if (!footerTarget) {
    return;
  }

  const footerLabel =
    bodyElement.dataset.footer ||
    'Web Development Reference';


  /* Render Shared Footer */

  footerTarget.innerHTML = `
    <footer class="site-footer">

      <!-- Footer Copy -->

      <div class="footer-copy">
        <strong>
          ${escapeHtml(footerLabel)}
        </strong>

        <p>
          Built by Jennifer Curtis as a reference for the web development
          things I keep looking up.
        </p>


        <!-- Brand Dots -->

        <div
          class="dots footer-dots"
          aria-hidden="true"
        >
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>


        <!-- Reviewed Date -->

        <p class="reviewed-date">
          <time datetime="2026-09">
            Last reviewed September 2026
          </time>
        </p>


        <!-- Footer Navigation -->

        <nav
          class="footer-links"
          aria-label="Footer navigation"
        >
          <a href="/references/html/accessibility.html">
            Accessibility
          </a>

          <a href="/sitemap.html">
            Site Map
          </a>

          <a
            class="footer-portfolio-link"
            href="${portfolioUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>My Portfolio</span>

            <img
              class="footer-portfolio-logo"
              src="/assets/images/logo-dark-theme.webp"
              alt=""
              aria-hidden="true"
            >
          </a>
        </nav>
      </div>


      <!-- Reference Logo -->

      <a
        class="footer-logo-link"
        href="/index.html"
        aria-label="Web Development Reference home"
      >
        <img
          src="/assets/images/logo/web-dev-reference-mark.svg"
          alt=""
          class="footer-logo"
        >
      </a>

    </footer>
  `;
}