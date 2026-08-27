/* ========================================
   Theme
======================================== */

/* Initialize Theme */
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Use the saved theme when available,
  // otherwise use the browser preference.
  if (savedTheme === 'light' || savedTheme === 'dark') {
    rootElement.dataset.theme = savedTheme;
  } else {
    rootElement.dataset.theme = prefersDarkTheme ? 'dark' : 'light';
  }

  const themeToggle = document.getElementById('theme-toggle');

  if (!themeToggle) {
    return;
  }

  updateThemeButton(themeToggle);

  // Toggle and save the selected theme.
  themeToggle.addEventListener('click', () => {
    rootElement.dataset.theme = rootElement.dataset.theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', rootElement.dataset.theme);

    updateThemeButton(themeToggle);
  });
}


/* ========================================
   Theme Button
======================================== */

/* Update Theme Button */
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