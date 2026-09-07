/* ==========================================================================
   Site Initialization
   Starts shared website features and page-specific functionality.
   ========================================================================== */


/* ========================================
   Initialize Site
   ======================================== */

function initializeSite() {
  /*
   * I start the site loader first so it can
   * handle the page while everything else
   * finishes initializing.
   */

  initializeSiteLoader();


  /* ========================================
     Shared Page Layout
     ======================================== */

  renderNavigation();
  initializeGroupedNavigation();
  initializeMobileNavigation();
  renderBreadcrumbs();
  renderFooter();
  renderDialogs();


  /* ========================================
     Shared Page Behavior
     ======================================== */

  initializeTheme();
  renderReferenceSearch();
  renderTableOfContents();
  renderAuthorNote();
  renderRelatedReferences();


  /* ========================================
     Reference Tools
     ======================================== */

  initializeReferenceSearch();
  initializeActiveToc();
  addFavoriteButtons();
  initializeCopyButtons();


  /* ========================================
     Pattern Demonstrations
     ======================================== */

  /*
   * Pattern demonstrations only exist on
   * the Patterns page, so I initialize them
   * only when that page is loaded.
   */

  if (bodyElement.dataset.page === 'patterns') {
    initializePatternDemos();
  }


  /* ========================================
     Page Utilities
     ======================================== */

  initializeNotFoundPage();
  initializeScrollProgress();
  initializeBackToTop();
  initializeRevealAnimations();
}


/* ========================================
   Start Website
   ======================================== */

initializeSite();