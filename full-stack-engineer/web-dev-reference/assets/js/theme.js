/* Light and dark theme. */

function initializeTheme() {
  // I keep the saved choice first, then fall back to the browser preference.
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

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

  themeToggle.addEventListener('click', () => {
    rootElement.dataset.theme = rootElement.dataset.theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', rootElement.dataset.theme);
    updateThemeButton(themeToggle);
  });
}

function updateThemeButton(themeToggle) {
  const isDarkTheme = rootElement.dataset.theme === 'dark';
  const buttonLabel = isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme';

  themeToggle.setAttribute('aria-pressed', String(isDarkTheme));
  themeToggle.setAttribute('aria-label', buttonLabel);
  themeToggle.setAttribute('title', buttonLabel);
}
