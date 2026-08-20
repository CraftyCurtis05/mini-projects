/* Start shared site features in one place. */

function initializeSite() {
  initializeSiteLoader();

  renderNavigation();
  initializeGroupedNavigation();
  renderBreadcrumbs();
  renderFooter();
  renderDialogs();

  initializeTheme();

  renderReferenceSearch();
  renderTableOfContents();
  renderAuthorNote();
  renderRelatedReferences();

  initializeReferenceSearch();
  initializeActiveToc();
  addFavoriteButtons();

  initializeCopyButtons();
  initializePatternDemos();
  initializeNotFoundPage();
  initializeScrollProgress();
  initializeBackToTop();
  initializeRevealAnimations();
}

initializeSite();
