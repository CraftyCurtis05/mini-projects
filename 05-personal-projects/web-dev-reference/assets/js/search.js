/* ========================================
   Page Search, Highlighting & Table of Contents
======================================== */


/* ========================================
   Search Bar
======================================== */

function renderReferenceSearch() {
  const placeholder =
    bodyElement.dataset.searchPlaceholder;

  const hero =
    document.querySelector(
      '.hero'
    );

  if (
    !placeholder ||
    !hero
  ) {
    return;
  }

  hero.insertAdjacentHTML(
    'afterend',
    `
    <search
      class="reference-tools"
      aria-label="Search this reference"
    >
      <div class="search-container">

        <label
          class="search-label"
          for="reference-search"
        >
          Search this reference

          <kbd class="search-shortcut">
            /
          </kbd>
        </label>

        <div class="search-input-wrapper">

          <span
            class="search-icon"
            aria-hidden="true"
          >
            ⌕
          </span>

          <input
            class="reference-search"
            id="reference-search"
            type="search"
            placeholder="${escapeHtml(
              placeholder
            )}"
            autocomplete="off"
            spellcheck="false"
          >

        </div>

        <p
          id="visible-search-status"
          class="visible-search-status"
        >
          Showing all entries
        </p>

        <p
          id="search-status"
          class="sr-only"
          aria-live="polite"
          aria-atomic="true"
        ></p>

      </div>
    </search>
    `
  );
}


/* ========================================
   Search Highlighting
======================================== */

function clearSearchHighlights(
  scope = document
) {
  scope
    .querySelectorAll(
      'mark.search-match'
    )
    .forEach(
      mark =>
        mark.replaceWith(
          document.createTextNode(
            mark.textContent
          )
        )
    );

  scope.normalize();
}


function highlightText(
  scope,
  query
) {
  if (!query) {
    return;
  }

  /*
   * I only replace the matching text so I
   * do not accidentally rebuild the HTML
   * around it.
   */
  const walker =
    document.createTreeWalker(
      scope,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (
            !node.nodeValue.trim()
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          if (
            node.parentElement.closest(
              'button, summary, .favorite-button'
            )
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

  const nodes = [];

  while (
    walker.nextNode()
  ) {
    nodes.push(
      walker.currentNode
    );
  }

  const lowerQuery =
    query.toLowerCase();

  nodes.forEach(
    node => {
      const text =
        node.nodeValue;

      const lower =
        text.toLowerCase();

      let start = 0;

      let index =
        lower.indexOf(
          lowerQuery
        );

      if (index === -1) {
        return;
      }

      const fragment =
        document.createDocumentFragment();

      while (
        index !== -1
      ) {
        fragment.append(
          text.slice(
            start,
            index
          )
        );

        const mark =
          document.createElement(
            'mark'
          );

        mark.className =
          'search-match';

        mark.textContent =
          text.slice(
            index,
            index + query.length
          );

        fragment.append(
          mark
        );

        start =
          index +
          query.length;

        index =
          lower.indexOf(
            lowerQuery,
            start
          );
      }

      fragment.append(
        text.slice(start)
      );

      node.replaceWith(
        fragment
      );
    }
  );
}


/* ========================================
   Page Filtering
======================================== */

function initializeReferenceSearch() {
  const input =
    document.getElementById(
      'reference-search'
    );

  if (!input) {
    return;
  }

  const referenceSections = [
    ...document.querySelectorAll(
      '.reference-section'
    )
  ];

  const patternSections = [
    ...document.querySelectorAll(
      '.pattern-section'
    )
  ];

  const rows = [
    ...document.querySelectorAll(
      '.reference-section tbody tr'
    )
  ];

  const visibleStatus =
    document.getElementById(
      'visible-search-status'
    );

  const liveStatus =
    document.getElementById(
      'search-status'
    );

  const count =
    rows.length ||
    patternSections.length;


  /* Update Search Status */
  function setStatus(message) {
    if (visibleStatus) {
      visibleStatus.textContent =
        message;
    }

    if (liveStatus) {
      liveStatus.textContent =
        message;
    }
  }


  /* Filter Current Reference */
  function filterReference() {
    const query =
      input.value.trim();

    clearSearchHighlights(
      document.getElementById(
        'main-content'
      )
    );

    let visible = 0;

    if (rows.length) {
      referenceSections.forEach(
        section => {
          let sectionHasMatch =
            false;

          section
            .querySelectorAll(
              'tbody tr'
            )
            .forEach(
              row => {
                const matches =
                  !query ||
                  row.textContent
                    .toLowerCase()
                    .includes(
                      query.toLowerCase()
                    );

                row.hidden =
                  !matches;

                if (matches) {
                  sectionHasMatch =
                    true;
                }

                if (matches) {
                  visible += 1;

                  highlightText(
                    row,
                    query
                  );
                }
              }
            );

          section.hidden =
            !sectionHasMatch;
        }
      );
    } else {
      patternSections.forEach(
        section => {
          const matches =
            !query ||
            section.textContent
              .toLowerCase()
              .includes(
                query.toLowerCase()
              );

          section.hidden =
            !matches;

          if (matches) {
            visible += 1;

            highlightText(
              section,
              query
            );
          }
        }
      );
    }

    if (!query) {
      setStatus(
        `Showing all ${count} entries`
      );
    } else if (!visible) {
      setStatus(
        `No results found for “${query}”`
      );
    } else {
      setStatus(
        `${visible} result${visible === 1 ? '' : 's'} found for “${query}”`
      );
    }
  }


  /* Search Input */
  input.addEventListener(
    'input',
    filterReference
  );


  /* Search Keyboard Shortcut */
  document.addEventListener(
    'keydown',
    event => {
      const isTyping =
        event.target instanceof
          HTMLInputElement ||
        event.target instanceof
          HTMLTextAreaElement;

      if (
        event.key === '/' &&
        !isTyping
      ) {
        event.preventDefault();

        input.focus();
      }
    }
  );


  /* Initial Search Status */
  setStatus(
    `Showing all ${count} entries`
  );
}


/* ========================================
   Table of Contents
======================================== */

function renderTableOfContents() {
  if (
    bodyElement.dataset.toc !==
    'true'
  ) {
    return;
  }

  const main =
    document.getElementById(
      'main-content'
    );

  if (!main) {
    return;
  }

  const sections = [
    ...main.querySelectorAll(
      ':scope > .reference-section, :scope > .pattern-section'
    )
  ];

  if (!sections.length) {
    return;
  }

  const links =
    sections
      .map(
        section => {
          const heading =
            section.querySelector(
              'h2'
            );

          return heading
            ? `
              <li>
                <a href="#${section.id}">
                  ${escapeHtml(
                    heading.textContent.trim()
                  )}
                </a>
              </li>
            `
            : '';
        }
      )
      .join('');

  main.insertAdjacentHTML(
    'afterbegin',
    `
    <nav
      class="page-toc"
      aria-labelledby="toc-title"
    >
      <h2 id="toc-title">
        On this page
      </h2>

      <ul>
        ${links}
      </ul>
    </nav>
    `
  );
}


/* ========================================
   Active Table of Contents
======================================== */

function initializeActiveToc() {
  const links = [
    ...document.querySelectorAll(
      '.page-toc a'
    )
  ];

  if (
    !links.length ||
    !(
      'IntersectionObserver'
      in window
    )
  ) {
    return;
  }

  const map =
    new Map(
      links.map(
        link => [
          link
            .getAttribute(
              'href'
            )
            .slice(1),

          link
        ]
      )
    );

  /*
   * I watch which section is on screen so
   * the TOC can follow along while I scroll.
   */
  const observer =
    new IntersectionObserver(
      entries => {
        const visible =
          entries
            .filter(
              entry =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                a.boundingClientRect.top -
                b.boundingClientRect.top
            )[0];

        if (!visible) {
          return;
        }

        links.forEach(
          link =>
            link.removeAttribute(
              'aria-current'
            )
        );

        map
          .get(
            visible.target.id
          )
          ?.setAttribute(
            'aria-current',
            'location'
          );
      },
      {
        rootMargin:
          '-20% 0px -65% 0px'
      }
    );

  document
    .querySelectorAll(
      '.reference-section, .pattern-section'
    )
    .forEach(
      section =>
        observer.observe(
          section
        )
    );
}