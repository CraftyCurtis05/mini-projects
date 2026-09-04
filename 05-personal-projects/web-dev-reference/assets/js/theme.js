/* ========================================
   Theme
======================================== */

function initializeTheme() {
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
    rootElement.dataset.theme =
      savedTheme;
  } else {
    rootElement.dataset.theme =
      prefersDarkTheme
        ? 'dark'
        : 'light';
  }

  const themeToggle =
    document.getElementById(
      'theme-toggle'
    );

  if (!themeToggle) {
    return;
  }

  updateThemeButton(
    themeToggle
  );

  themeToggle.addEventListener(
    'click',
    () => {
      rootElement.dataset.theme =
        rootElement.dataset.theme ===
        'dark'
          ? 'light'
          : 'dark';

      try {
        localStorage.setItem(
          'theme',
          rootElement.dataset.theme
        );
      } catch {
        /*
         * The theme can still change for this
         * visit even when storage is blocked.
         */
      }

      updateThemeButton(
        themeToggle
      );
    }
  );
}


/* ========================================
   Theme Button
======================================== */

function updateThemeButton(themeToggle) {
  const isDarkTheme = rootElement.dataset.theme === 'dark';

  const buttonLabel =
    isDarkTheme
      ? 'Switch to light theme'
      : 'Switch to dark theme';

  themeToggle.setAttribute(
    'aria-pressed',
    String(isDarkTheme)
  );

  themeToggle.setAttribute(
    'aria-label',
    buttonLabel
  );

  themeToggle.setAttribute(
    'title',
    buttonLabel
  );
}