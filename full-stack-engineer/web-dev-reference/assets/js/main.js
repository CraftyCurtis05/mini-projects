/* Start shared website features in one place. */

function initializeSite() {
  initializeSiteLoader();

  // Shared page layout
  renderNavigation();
  initializeGroupedNavigation();
  renderBreadcrumbs();
  renderFooter();
  renderDialogs();

  // Shared page behavior
  initializeTheme();
  renderReferenceSearch();
  renderTableOfContents();
  renderAuthorNote();
  renderRelatedReferences();

  // Reference tools
  initializeReferenceSearch();
  initializeActiveToc();
  addFavoriteButtons();
  initializeCopyButtons();

  // Patterns only exist on this page.
  if (bodyElement.dataset.page === 'patterns') {
    initializePatternDemos();
  }

  // Small page utilities
  initializeNotFoundPage();
  initializeScrollProgress();
  initializeBackToTop();
  initializeRevealAnimations();
}

initializeSite();
