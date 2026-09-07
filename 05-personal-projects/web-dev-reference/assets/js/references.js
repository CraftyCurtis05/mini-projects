/* ==========================================================================
   Reference Page Features
   Author notes, related references, and saved-reference controls.
   ========================================================================== */


/* ========================================
   Jennifer's Notes
   ======================================== */

function renderAuthorNote() {
  const note = bodyElement.dataset.authorNote;
  const main = document.getElementById('main-content');

  if (!note || !main) {
    return;
  }


  /* Create Author Note */

  const noteHTML = `
    <aside class="author-note">
      <span class="author-note-label">
        <span aria-hidden="true">★</span>
        Jennifer's Note
      </span>

      <p>${escapeHtml(note)}</p>
    </aside>
  `;

  const toc = main.querySelector('.page-toc');


  /*
   * I place the note after the table of contents
   * when one exists. Otherwise, it goes at the
   * beginning of the main content.
   */

  if (toc) {
    toc.insertAdjacentHTML(
      'afterend',
      noteHTML
    );
  } else {
    main.insertAdjacentHTML(
      'afterbegin',
      noteHTML
    );
  }
}


/* ========================================
   Related References
   ======================================== */

function renderRelatedReferences() {
  const related = bodyElement.dataset.related;
  const main = document.getElementById('main-content');

  if (!related || !main) {
    return;
  }


  /* Parse Related References */

  let items;

  try {
    items = JSON.parse(related);
  } catch {
    return;
  }

  if (!items.length) {
    return;
  }


  /* Create Reference Links */

  const links = items
    .map(
      ({ label, href }) => `
        <li>
          <a href="${href}">
            ${escapeHtml(label)}

            <span aria-hidden="true">
              →
            </span>
          </a>
        </li>
      `
    )
    .join('');


  /* Render Related References */

  main.insertAdjacentHTML(
    'beforeend',
    `
      <aside
        class="related-references"
        aria-labelledby="related-title"
      >
        <h2 id="related-title">
          Related references
        </h2>

        <ul>
          ${links}
        </ul>
      </aside>
    `
  );
}


/* ========================================
   Saved References
   ======================================== */

/*
 * I keep saved items in the same shape
 * whether they come from a reference table
 * or a Pattern.
 */

function favoriteRecordForElement(element) {
  const isPattern =
    element.classList.contains('pattern-section');

  const title = isPattern
    ? element
        .querySelector('h2')
        ?.textContent.trim()
    : element
        .querySelector("th[scope='row']")
        ?.textContent.trim();

  if (!title) {
    return null;
  }

  const page = currentPageLabel();

  const sectionHeading = element
    .closest('.reference-section, .pattern-section')
    ?.querySelector('h2');

  return {
    id: `${bodyElement.dataset.page}:${element.id}`,
    title,
    page,
    section:
      sectionHeading?.textContent.trim() ||
      page,
    href: `${location.pathname}#${element.id}`
  };
}


/* ========================================
   Toggle Saved Reference
   ======================================== */

function toggleFavorite(record) {
  const favorites = getFavorites();

  const alreadySaved = favorites.some(
    item => item.id === record.id
  );

  const updatedFavorites = alreadySaved
    ? favorites.filter(
        item => item.id !== record.id
      )
    : [
        ...favorites,
        record
      ];

  saveFavorites(updatedFavorites);

  refreshFavoriteButtons();
  renderSavedResults();
}


/* ========================================
   Favorite Button
   ======================================== */

function createFavoriteButton(
  record,
  extraClass = ''
) {
  const button = document.createElement('button');

  button.type = 'button';

  button.className =
    `favorite-button ${extraClass}`.trim();

  button.dataset.favoriteId = record.id;
  button.dataset.favoriteTitle = record.title;

  button.setAttribute(
    'aria-label',
    `Save ${record.title}`
  );

  button.addEventListener('click', () => {
    toggleFavorite(record);
  });

  return button;
}


/* ========================================
   Add Favorite Buttons
   ======================================== */

function addFavoriteButtons() {

  /* Reference Table Buttons */

  document
    .querySelectorAll('.reference-table tbody tr[id]')
    .forEach(row => {
      const cell = row.querySelector("th[scope='row']");

      if (
        !cell ||
        cell.querySelector('.favorite-button')
      ) {
        return;
      }

      const record = favoriteRecordForElement(row);

      if (record) {
        cell.append(
          createFavoriteButton(record)
        );
      }
    });


  /* Pattern Buttons */

  document
    .querySelectorAll('.pattern-section[id]')
    .forEach(section => {
      const heading = section.querySelector(
        '.pattern-heading'
      );

      if (
        !heading ||
        heading.querySelector('.favorite-button')
      ) {
        return;
      }

      const record = favoriteRecordForElement(section);

      if (record) {
        heading.append(
          createFavoriteButton(
            record,
            'pattern-favorite'
          )
        );
      }
    });


  /*
   * I refresh the buttons after adding them
   * so previously saved references immediately
   * show their correct state.
   */

  refreshFavoriteButtons();
}


/* ========================================
   Refresh Favorite Buttons
   ======================================== */

function refreshFavoriteButtons() {
  /*
   * I turn the saved IDs into a Set because
   * I only need to know whether each one
   * currently exists in saved references.
   */

  const favoriteIds = new Set(
    getFavorites().map(item => item.id)
  );

  document
    .querySelectorAll('.favorite-button')
    .forEach(button => {
      const saved = favoriteIds.has(
        button.dataset.favoriteId
      );

      button.classList.toggle(
        'is-saved',
        saved
      );

      button.textContent =
        saved
          ? '★'
          : '✩';

      button.setAttribute(
        'aria-pressed',
        String(saved)
      );

      const title =
        button.dataset.favoriteTitle ||
        'reference';

      button.setAttribute(
        'aria-label',
        saved
          ? `Remove ${title} from saved references`
          : `Save ${title}`
      );

      button.setAttribute(
        'title',
        saved
          ? 'Remove from saved references'
          : 'Save reference'
      );
    });
}