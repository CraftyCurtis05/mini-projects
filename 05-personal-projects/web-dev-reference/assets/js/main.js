/* ========================================
   Site Initialization
======================================== */

/* Start shared website features in one place. */

function initializeSite() {
  initializeSiteLoader();


  /* ========================================
     Shared Page Layout
  ======================================== */

  renderNavigation();
  initializeGroupedNavigation();
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

  // Patterns only exist on this page.
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
   Initialize Website
======================================== */

initializeSite();