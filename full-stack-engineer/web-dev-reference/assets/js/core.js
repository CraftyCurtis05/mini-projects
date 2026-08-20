/* =========================================================
   Web Development Reference
   Shared configuration and utility helpers
   ========================================================= */

const root = document.documentElement;
const body = document.body;

const PAGES = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "tables", label: "HTML Tables", href: "html-tables.html" },
  { key: "tags", label: "HTML Tags", href: "html-tags.html" },
  { key: "selectors", label: "CSS Selectors", href: "css-selectors.html" },
  { key: "properties", label: "CSS Properties", href: "css-properties.html" },
  { key: "patterns", label: "Patterns", href: "patterns.html" },
  { key: "accessibility", label: "Accessibility", href: "accessibility.html" },
  { key: "javascript", label: "JavaScript Reference", href: "javascript-reference.html" },
  { key: "dom", label: "DOM & Events", href: "dom-events.html" },
  { key: "flexbox", label: "Flexbox", href: "flexbox.html" },
  { key: "grid", label: "CSS Grid", href: "css-grid.html" },
  { key: "forms", label: "Forms & Validation", href: "forms-validation.html" },
  { key: "responsive", label: "Responsive Design", href: "responsive-design.html" },
  { key: "units", label: "CSS Units & Functions", href: "css-units-functions.html" },
  { key: "pseudos", label: "Pseudo-classes & Elements", href: "pseudo-classes-elements.html" },
  { key: "git", label: "Git & GitHub", href: "git-github.html" },
  { key: "http", label: "HTTP & APIs", href: "http-apis.html" },
  { key: "performance", label: "Web Performance", href: "web-performance.html" },
  { key: "seo", label: "SEO & Metadata", href: "seo-metadata.html" },
  { key: "security", label: "Web Security Basics", href: "web-security.html" },
  { key: "terminal", label: "Terminal & CLI", href: "terminal-cli.html" },
  { key: "debugging", label: "Debugging", href: "debugging.html" },
  { key: "notes", label: "Developer Notes", href: "developer-notes.html" },
  { key: "sitemap", label: "Site Map", href: "sitemap.html" }
];

const NAV_GROUPS = [
  {
    label: "HTML",
    pages: ["tables", "tags", "forms", "accessibility"]
  },
  {
    label: "CSS",
    pages: [
      "selectors",
      "properties",
      "flexbox",
      "grid",
      "responsive",
      "units",
      "pseudos"
    ]
  },
  {
    label: "JavaScript",
    pages: ["javascript", "dom", "http"]
  },
  {
    label: "Tools",
    pages: [
      "git",
      "terminal",
      "debugging",
      "performance",
      "seo",
      "security",
      "notes"
    ]
  }
];

const PORTFOLIO_URL = "https://jennifercurtis.me";
const FAVORITES_KEY = "web-dev-reference:favorites";
const SEARCH_INDEX = window.SEARCH_INDEX || [];

function escapeHTML(value = "") {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  };

  return String(value).replace(
    /[&<>'"]/g,
    (character) => entities[character]
  );
}

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // Storage can be unavailable in private or restricted browsing modes.
  }
}

function currentPageLabel() {
  const currentPage = PAGES.find(
    (page) => page.key === body.dataset.page
  );

  return body.dataset.pageLabel || currentPage?.label || "Reference";
}
