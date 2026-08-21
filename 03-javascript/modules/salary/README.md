# Salary Modules

A JavaScript practice project where I separated salary data, calculations, formatting, and page behavior into different files.

The original Codecademy exercise used ES module `import` and `export` syntax. I kept the same separation of responsibilities, but changed the browser version to small shared objects so `index.html` also works when I open it directly instead of requiring a local server.

## What I Practiced

- separating data from calculations and UI behavior
- reusable helper functions
- working across multiple JavaScript files
- radio inputs and change events
- calculating averages from arrays
- updating the DOM from selected values

## Built With

- HTML
- CSS
- JavaScript

## Project Structure

```text
├── modules/
│   ├── salaryData.js
│   ├── utilities.js
│   └── workAroundModule.js
├── index.css
├── index.html
└── main.js
```

## Small UI I Added

The project already had a browser interface, so I kept the idea and cleaned it up rather than building something larger.

The company and role choices now use labeled radio buttons inside `fieldset` groups. Once both are selected, the page shows:

- the salary for that role at the selected company
- the average salary for the role
- the average salary for the company
- the overall average salary in the data

## Why I Changed the Browser Setup

Native ES module imports are normally meant to be served over HTTP. Some browsers block module files when an HTML page is opened directly from a `file://` path, which made the dynamically created choices appear to be broken.

For this small practice project, I wanted it to work either way, so the files now expose small `window.WorkAround...` objects and are loaded in order from `index.html`.

I still keep the data, utilities, calculations, and interface code in separate files because that separation is the part I wanted to practice.

## Runtime Fix

I originally changed the exercise from ES modules to normal browser scripts so it could also work when opened directly. The first version still reused some top-level variable names across those files.

Normal scripts share the same global scope, so the browser stopped on a redeclaration error before `main.js` could create the radio buttons.

I fixed that by wrapping each JavaScript file in a small function scope and exposing only the `WorkAround` object that the next file needs. The files are still separated by responsibility, but their private variables no longer collide.

## UI Theme

I kept the darker dashboard look because it fits salary and comparison data. Lime is only used as an accent for headings, selected radio controls, and focus.

## Running the Project

You can open `index.html` directly in a browser.

It also works through a local server such as VS Code Live Server.

## Notes

I kept this project small on purpose. The main thing I want to be able to come back to is how the data moves from one file, through the calculation functions, and into the UI.
