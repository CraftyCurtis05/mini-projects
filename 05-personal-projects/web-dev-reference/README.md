# Web Development Reference

### HTML, CSS, JavaScript & Front-End Development Reference

This is a multi-page web development reference I built with HTML, CSS,
and vanilla JavaScript for the concepts, syntax, patterns, and tools I
regularly look up while working on other projects.

It started as an HTML tables cheat sheet because I kept looking up the
same things. As I continued learning and building projects, it grew into
a larger reference organized around the topics I found myself returning
to most often.

I intentionally kept the project framework-free so the reference remains
easy to open, read, maintain, and understand without requiring a build
step.

---

## Project Overview

The reference brings together notes, examples, and interactive
demonstrations covering:

- HTML
- CSS
- JavaScript
- Responsive design
- Accessibility
- Web performance
- Web security
- HTTP and APIs
- Git and GitHub
- Terminal and CLI commands
- SEO and metadata
- Debugging
- Reusable front-end patterns

The project serves two purposes: it gives me a practical reference I can
use while developing, and gives me a place to reinforce concepts by
organizing and explaining them in my own way.

---

## Key Features

### Development References

- Topic-specific reference pages
- Syntax and code examples
- HTML, CSS, and JavaScript references
- Git, terminal, API, security, and debugging references
- Responsive design and accessibility guidance

### Search & Saved References

- Page search
- Site-wide search
- Saved references using `localStorage`
- Search data separated from search behavior

### Interactive Examples

- Interactive examples on the Patterns page
- Copy buttons for code examples
- Dialog and interface demonstrations
- Reusable JavaScript utilities

### Accessibility & User Experience

- Semantic HTML
- Keyboard-accessible controls
- Visible focus states
- Reduced-motion support
- Accessible labels and status messages
- Light and dark themes
- Responsive layouts

---

## Application Architecture

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Development Tools

- npm
- ESLint
- Prettier
- http-server
- Git
- GitHub

### Design

- Responsive Web Design
- Semantic HTML
- Accessibility
- Reusable CSS
- Light / Dark Theme System

---

## Technical Implementation

The reference is built as a framework-free multi-page website with
shared CSS and JavaScript organized by responsibility.

Key implementation details include:

- Organized reference content into topic-specific pages
- Created reusable CSS variables and shared component styles
- Separated shared and page-specific JavaScript
- Implemented persistent light and dark themes
- Built page-level and site-wide search
- Used `localStorage` for saved references and theme preferences
- Added copy controls for code examples
- Created interactive examples for common front-end patterns
- Added keyboard navigation and visible focus states
- Added reduced-motion support
- Created responsive layouts using Flexbox, Grid, and media queries
- Added custom 404 and site map pages
- Added development tooling for formatting and linting

---

## Technology Stack

| Category          | Technologies                 |
| ----------------- | ---------------------------- |
| Structure         | HTML5                        |
| Styling           | CSS3                         |
| Interactivity     | JavaScript                   |
| Storage           | Web Storage / `localStorage` |
| Code Quality      | ESLint, Prettier             |
| Local Development | http-server, npm             |
| Version Control   | Git, GitHub                  |

---

## Project Structure

[updated tree here]

---

## Running the Project

The easiest way to run the project locally is with VS Code Live Server.

If Node.js is installed:

\```bash
npm install
npm run serve
\```

---

## Development Commands

\```bash
npm run format
npm run lint
npm run check
\```

---

## Performance & Quality Checks

Before publishing a new version, I check the deployed site in Lighthouse
and look for problems that affect the actual experience rather than
optimizing only for a score.

My main checks include:

- Performance
- Accessibility
- Best Practices
- SEO
- Image dimensions and file sizes
- Unexpected layout movement
- Render-blocking scripts
- Keyboard navigation
- Visible focus states
- Reduced-motion behavior
- Broken links
- Console errors

---

## AI Assistance

I used AI as a development assistant for brainstorming, debugging,
accessibility checks, code review, and cleanup.

I went back through the project, changed what did not sound or feel like
me, and made sure I understand the code I am publishing.
