/* ========================================
   Shared Data & Helper Functions
======================================== */

const rootElement =
  document.documentElement;

const bodyElement =
  document.body;


/* ========================================
   Page & Navigation Data
======================================== */

const pages = [
  {
    key: 'home',
    label: 'Home',
    href: '/index.html'
  },

  {
    key: 'tables',
    label: 'HTML Tables',
    href:
      '/references/html/html-tables.html'
  },
  {
    key: 'tags',
    label: 'HTML Tags',
    href:
      '/references/html/html-tags.html'
  },
  {
    key: 'forms',
    label: 'Forms & Validation',
    href:
      '/references/html/forms-validation.html'
  },
  {
    key: 'accessibility',
    label: 'Accessibility',
    href:
      '/references/html/accessibility.html'
  },

  {
    key: 'selectors',
    label: 'CSS Selectors',
    href:
      '/references/css/css-selectors.html'
  },
  {
    key: 'properties',
    label: 'CSS Properties',
    href:
      '/references/css/css-properties.html'
  },
  {
    key: 'flexbox',
    label: 'Flexbox',
    href:
      '/references/css/flexbox.html'
  },
  {
    key: 'grid',
    label: 'CSS Grid',
    href:
      '/references/css/css-grid.html'
  },
  {
    key: 'responsive',
    label: 'Responsive Design',
    href:
      '/references/css/responsive-design.html'
  },
  {
    key: 'units',
    label: 'CSS Units & Functions',
    href:
      '/references/css/css-units-functions.html'
  },
  {
    key: 'pseudos',
    label: 'Pseudo-classes & Elements',
    href:
      '/references/css/pseudo-classes-elements.html'
  },

  {
    key: 'javascript',
    label: 'JavaScript Reference',
    href:
      '/references/javascript/javascript-reference.html'
  },
  {
    key: 'dom',
    label: 'DOM & Events',
    href:
      '/references/javascript/dom-events.html'
  },
  {
    key: 'http',
    label: 'HTTP & APIs',
    href:
      '/references/javascript/http-apis.html'
  },

  {
    key: 'git',
    label: 'Git & GitHub',
    href:
      '/references/tools/git-github.html'
  },
  {
    key: 'terminal',
    label: 'Terminal & CLI',
    href:
      '/references/tools/terminal-cli.html'
  },
  {
    key: 'debugging',
    label: 'Debugging',
    href:
      '/references/tools/debugging.html'
  },
  {
    key: 'performance',
    label: 'Web Performance',
    href:
      '/references/tools/web-performance.html'
  },
  {
    key: 'seo',
    label: 'SEO & Metadata',
    href:
      '/references/tools/seo-metadata.html'
  },
  {
    key: 'security',
    label: 'Web Security Basics',
    href:
      '/references/tools/web-security.html'
  },
  {
    key: 'notes',
    label: 'Developer Notes',
    href:
      '/references/tools/developer-notes.html'
  },

  {
    key: 'patterns',
    label: 'Patterns',
    href:
      '/references/patterns/patterns.html'
  },

  {
    key: 'sitemap',
    label: 'Site Map',
    href:
      '/sitemap.html'
  }
];


/* ========================================
   Navigation Groups
======================================== */

const navGroups = [
  {
    label: 'HTML',

    pages: [
      'tables',
      'tags',
      'forms',
      'accessibility'
    ]
  },
  {
    label: 'CSS',

    pages: [
      'selectors',
      'properties',
      'flexbox',
      'grid',
      'responsive',
      'units',
      'pseudos'
    ]
  },
  {
    label: 'JavaScript',

    pages: [
      'javascript',
      'dom',
      'http'
    ]
  },
  {
    label: 'Tools',

    pages: [
      'git',
      'terminal',
      'debugging',
      'performance',
      'seo',
      'security',
      'notes'
    ]
  }
];


/* ========================================
   Shared Configuration
======================================== */

const portfolioUrl =
  'https://jennifercurtis.me';

const favoritesKey =
  'web-dev-reference:favorites';

const searchIndex =
  window.SEARCH_INDEX ||
  [];


/* ========================================
   HTML Helpers
======================================== */

/*
 * I use template strings in a few shared
 * components, so dynamic text is escaped
 * before it is inserted into the page.
 */
function escapeHtml(
  value = ''
) {
  const htmlCharacters = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  };

  return String(
    value
  ).replace(
    /[&<>'"]/g,
    character =>
      htmlCharacters[
        character
      ]
  );
}


/* ========================================
   Saved References
======================================== */

/* Get Saved References */
function getFavorites() {
  try {
    return (
      JSON.parse(
        localStorage.getItem(
          favoritesKey
        )
      ) ||
      []
    );
  } catch {
    /*
     * If storage is unavailable or contains
     * invalid data, I return an empty list
     * so the rest of the reference can still
     * work normally.
     */
    return [];
  }
}


/* Save References */
function saveFavorites(
  favorites
) {
  try {
    localStorage.setItem(
      favoritesKey,
      JSON.stringify(
        favorites
      )
    );
  } catch {
    /*
     * If storage is blocked, I still want the
     * rest of the reference to work.
     */
  }
}


/* ========================================
   Page Helpers
======================================== */

/* Get Current Page Label */
function currentPageLabel() {
  const currentPage =
    pages.find(
      page =>
        page.key ===
        bodyElement.dataset.page
    );

  return (
    bodyElement.dataset.pageLabel ||
    currentPage?.label ||
    'Reference'
  );
}