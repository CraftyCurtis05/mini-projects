# Web Development Reference

A multi-page reference I built with HTML, CSS, and vanilla JavaScript for the things I keep looking up while I work on other projects.

I started with an HTML tables cheat sheet because I kept looking up the same things. It grew as I learned more and noticed which concepts I was still going back to between projects.

## Main Features

- light and dark themes
- page search and site-wide search
- saved references using `localStorage`
- table of contents on longer pages
- copy buttons for code examples
- interactive examples on the Patterns page
- custom 404 and site map pages
- keyboard, focus, and reduced-motion support

## What I Practiced

I built this project to keep the front-end topics I forget or look up often in one place. While building it, I practiced:

- semantic HTML and accessible page structure
- responsive layouts with Flexbox, Grid, and media queries
- reusable CSS variables, components, and interaction states
- vanilla JavaScript for DOM updates, dialogs, search, themes, and page utilities
- `localStorage` for saved references and theme preferences
- keyboard focus, reduced motion, labels, status messages, and other accessibility details
- organizing a multi-page project so I can come back later and understand my own code
- debugging and checking behavior across shared and page-specific scripts

I kept the project framework-free on purpose. I wanted the reference itself to stay easy to open, read, edit, and understand without a build step.

## Performance Checks

Before publishing a new version, I check the deployed site in Lighthouse and look for obvious problems instead of optimizing just for a score. My main checks are:

- Performance, Accessibility, Best Practices, and SEO in Lighthouse
- image dimensions and file sizes
- unexpected layout movement while the page loads
- scripts that block the initial page unnecessarily
- keyboard navigation and visible focus
- reduced-motion behavior
- broken links and console errors

## Why I Structured It This Way

The site uses separate CSS and JavaScript files by responsibility instead of putting everything into one large file. Shared layout and utilities are reused across pages, while the Patterns page keeps its interactive examples in its own script. I used vanilla JavaScript because this project does not need a framework, and keeping it simple makes the reference easier for me to maintain.

The site-wide search data lives in `searchData.js`. It is separate from the search behavior so the data and the code that uses it are easier to find.

## Project Structure

```text
assets/
├── css/
│   ├── main.css
│   ├── variables.css
│   ├── global.css
│   ├── navigation.css
│   ├── references.css
│   ├── patterns.css
│   └── components.css
│
└── js/
    ├── shared.js
    ├── layout.js
    ├── theme.js
    ├── search.js
    ├── references.js
    ├── dialogs.js
    ├── patterns.js
    ├── utilities.js
    ├── loader.js
    ├── searchData.js
    └── main.js
```

The HTML files contain the reference content. I keep shared CSS and JavaScript inside
`assets` so I do not have to repeat the same navigation, footer, theme, search, and
utility code on every page.

## Running the Project

The easiest way to run it locally is VS Code Live Server.

If Node.js is installed:

```bash
npm install
npm run serve
```

## Development Commands

```bash
npm run format
npm run lint
npm run check
```

## Editing Notes

- Shared colors and fonts are in `assets/css/variables.css`.
- General page styles are in `assets/css/global.css`.
- CSS is grouped by the part of the site it styles.
- JavaScript is grouped by what it does.
- `main.js` starts the shared site features.
- `patterns.js` is only loaded on the Patterns page.
- `searchData.js` contains the site-wide search data. I update it when the reference content changes.

## Fonts

The site uses Inter for body text, Montserrat for headings and interface text, and Source Code Pro for code examples.

The Google Fonts stylesheet is still needed because Inter, Montserrat, and Source Code Pro are used throughout the site.

## AI Assistance

I used AI as a development assistant for brainstorming, debugging, accessibility checks, code review, and cleanup. I went back through the project, changed what did not sound or feel like me, and made sure I understand the code I am publishing.
