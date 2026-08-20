# Web Development Reference

A multi-page web development reference built with semantic HTML, CSS, and
vanilla JavaScript.

I started the project as a personal cheat sheet and expanded it into a
searchable reference for HTML, CSS, JavaScript, accessibility, Git, APIs,
debugging, performance, security, and common UI patterns.

## What the project demonstrates

- semantic, accessible HTML
- responsive CSS and reusable design tokens
- light and dark themes
- page-level and site-wide search
- saved references using `localStorage`
- native dialogs and expandable examples
- interactive JavaScript patterns
- keyboard and reduced-motion support
- custom 404 and sitemap pages
- a small automated test/lint/accessibility workflow

## Project structure

```text
assets/
├── css/
│   ├── main.css        # stylesheet entry point
│   ├── tokens.css      # colors, fonts, and theme values
│   ├── base.css        # document defaults and accessibility
│   ├── navigation.css  # navigation, breadcrumbs, and hero
│   ├── reference.css   # search, TOC, tables, and favorites
│   ├── patterns.css    # patterns, code examples, and demos
│   └── components.css  # footer, utilities, 404, loader, sitemap
│
└── js/
    ├── core.js         # shared configuration and helpers
    ├── chrome.js       # navigation, breadcrumbs, and footer
    ├── theme.js        # light/dark theme
    ├── search.js       # page search
    ├── references.js   # TOC, favorites, reference behavior
    ├── dialogs.js      # site search and saved-item dialogs
    ├── patterns-ui.js  # live Pattern examples
    ├── ui.js           # copy, loader, progress, Back to Top
    ├── loader-init.js  # enables the loader before first paint
    ├── site.js         # starts shared site behavior
    └── search-index.js # generated search data
```

`site.js` is the single startup point for shared behavior. Keeping
initialization in one place avoids duplicate event listeners and makes the
application easier to debug.

## Running locally

If Node.js is installed:

```bash
npm install
npm run serve
```

You can also open the HTML files directly for basic browsing, although a local
server is better for testing the complete project.

## Useful development commands

```bash
npm run format
npm run lint
npm test
npm run test:a11y
npm run check
```

The automated accessibility checks are regression tools. They do not replace
manual keyboard, zoom/reflow, contrast, or screen-reader testing.

## Editing guidelines

- Keep page content in the individual HTML files.
- Put shared colors and typography in `tokens.css`.
- Add CSS to the file that matches the feature being styled.
- Keep shared JavaScript behavior in the matching feature file.
- Start shared behavior only from `site.js`.
- Keep comments focused on decisions, edge cases, or non-obvious behavior.
- Do not hand-edit `search-index.js`; it contains generated search data.

## Back to Top behavior

The Back to Top control is created once by `ui.js` and appended directly to
`body`. It uses `position: fixed` and appears shortly after the user begins
scrolling.

A previous page-entry animation applied `transform` to `body`. Transformed
ancestors change the positioning behavior of fixed descendants, so that
animation was removed.

## Accessibility

The project uses semantic landmarks, table captions and header scopes, visible
focus styles, labels, live regions for changing status, reduced-motion
handling, native controls where practical, and keyboard-friendly interactions.

## Deployment

The site is static and can be deployed with GitHub Pages, Netlify, Cloudflare
Pages, or a similar host.

Before publishing:

1. run the quality checks
2. manually test keyboard navigation and both themes
3. verify the custom 404 behavior
4. update production URLs in metadata and the XML sitemap template

## AI assistance

I used AI as a development assistant for brainstorming, debugging, code review,
accessibility review, refactoring, and some content expansion. I reviewed the
implementation, made the project decisions, and understand the code I am
publishing.
