/* Shared page data and helper functions. */

const rootElement = document.documentElement;
const bodyElement = document.body;

/* Page and navigation data */
const pages = [
  { key: 'home', label: 'Home', href: 'index.html' },
  { key: 'tables', label: 'HTML Tables', href: 'html-tables.html' },
  { key: 'tags', label: 'HTML Tags', href: 'html-tags.html' },
  { key: 'selectors', label: 'CSS Selectors', href: 'css-selectors.html' },
  { key: 'properties', label: 'CSS Properties', href: 'css-properties.html' },
  { key: 'patterns', label: 'Patterns', href: 'patterns.html' },
  { key: 'accessibility', label: 'Accessibility', href: 'accessibility.html' },
  { key: 'javascript', label: 'JavaScript Reference', href: 'javascript-reference.html' },
  { key: 'dom', label: 'DOM & Events', href: 'dom-events.html' },
  { key: 'flexbox', label: 'Flexbox', href: 'flexbox.html' },
  { key: 'grid', label: 'CSS Grid', href: 'css-grid.html' },
  { key: 'forms', label: 'Forms & Validation', href: 'forms-validation.html' },
  { key: 'responsive', label: 'Responsive Design', href: 'responsive-design.html' },
  { key: 'units', label: 'CSS Units & Functions', href: 'css-units-functions.html' },
  { key: 'pseudos', label: 'Pseudo-classes & Elements', href: 'pseudo-classes-elements.html' },
  { key: 'git', label: 'Git & GitHub', href: 'git-github.html' },
  { key: 'http', label: 'HTTP & APIs', href: 'http-apis.html' },
  { key: 'performance', label: 'Web Performance', href: 'web-performance.html' },
  { key: 'seo', label: 'SEO & Metadata', href: 'seo-metadata.html' },
  { key: 'security', label: 'Web Security Basics', href: 'web-security.html' },
  { key: 'terminal', label: 'Terminal & CLI', href: 'terminal-cli.html' },
  { key: 'debugging', label: 'Debugging', href: 'debugging.html' },
  { key: 'notes', label: 'Developer Notes', href: 'developer-notes.html' },
  { key: 'sitemap', label: 'Site Map', href: 'sitemap.html' }
];

const navGroups = [
  {
    label: 'HTML',
    pages: ['tables', 'tags', 'forms', 'accessibility']
  },
  {
    label: 'CSS',
    pages: ['selectors', 'properties', 'flexbox', 'grid', 'responsive', 'units', 'pseudos']
  },
  {
    label: 'JavaScript',
    pages: ['javascript', 'dom', 'http']
  },
  {
    label: 'Tools',
    pages: ['git', 'terminal', 'debugging', 'performance', 'seo', 'security', 'notes']
  }
];

const portfolioUrl = 'https://jennifercurtis.me';
const favoritesKey = 'web-dev-reference:favorites';
const searchIndex = window.SEARCH_INDEX || [];

// I use template strings in a few shared components, so text is escaped first.
function escapeHtml(value = '') {
  const htmlCharacters = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  };

  return String(value).replace(/[&<>'"]/g, character => htmlCharacters[character]);
}

/* Saved references */
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(favoritesKey)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  } catch {
    // If storage is blocked, I still want the rest of the reference to work.
  }
}

function currentPageLabel() {
  const currentPage = pages.find(page => page.key === bodyElement.dataset.page);

  return bodyElement.dataset.pageLabel || currentPage?.label || 'Reference';
}
