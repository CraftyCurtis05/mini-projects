/* ========================================
   Initial Page Setup
======================================== */

/* Add the JS class early so JavaScript-only styling does not flash on load. */
document.documentElement.classList.add('js');


/* ========================================
   Initial Theme
======================================== */

/*
 * Apply the saved theme before the page
 * renders to prevent a theme flash.
 */

let savedTheme = null;

try {
  savedTheme =
    localStorage.getItem(
      'theme'
    );
} catch {
  /*
   * If storage is unavailable, I fall back
   * to the browser theme preference.
   */
}

const prefersDarkTheme =
  window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

if (
  savedTheme === 'light' ||
  savedTheme === 'dark'
) {
  document.documentElement.dataset.theme =
    savedTheme;
} else {
  document.documentElement.dataset.theme =
    prefersDarkTheme
      ? 'dark'
      : 'light';
}