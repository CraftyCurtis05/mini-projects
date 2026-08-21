/* Site search and saved-reference dialogs. */

/* Dialog markup */
function renderDialogs() {
  document.body.insertAdjacentHTML(
    'beforeend',
    `
      <dialog
        class="site-dialog"
        id="global-search-dialog"
        aria-labelledby="global-search-title"
      >
        <div class="dialog-header">
          <div>
            <p class="eyebrow">All references</p>
            <h2 id="global-search-title">Search the entire site</h2>
          </div>

          <button
            class="dialog-close"
            type="button"
            data-close-dialog
            aria-label="Close search"
          >
            ×
          </button>
        </div>

        <label class="sr-only" for="global-search-input">
          Search all references
        </label>

        <input
          class="dialog-search"
          id="global-search-input"
          type="search"
          placeholder="Try: grid, semantic, focus..."
          autocomplete="off"
        >

        <p
          class="dialog-status"
          id="global-search-status"
          aria-live="polite"
        >
          Start typing to search ${searchIndex.length} reference entries.
        </p>

        <ul
          class="search-results"
          id="global-search-results"
        ></ul>
      </dialog>

      <dialog
        class="site-dialog"
        id="saved-dialog"
        aria-labelledby="saved-title"
      >
        <div class="dialog-header">
          <div>
            <p class="eyebrow">Your browser</p>
            <h2 id="saved-title">Saved references</h2>
          </div>

          <button
            class="dialog-close"
            type="button"
            data-close-dialog
            aria-label="Close saved references"
          >
            ×
          </button>
        </div>

        <p class="dialog-status">
          Saved items stay in this browser using local storage.
        </p>

        <ul
          class="search-results"
          id="saved-results"
        ></ul>
      </dialog>
    `
  );

  document.querySelectorAll('[data-close-dialog]').forEach(button => {
    button.addEventListener('click', () => {
      button.closest('dialog')?.close();
    });
  });

  document.getElementById('global-search-button')?.addEventListener('click', openSearchDialog);

  document.getElementById('saved-button')?.addEventListener('click', () => {
    renderSavedResults();
    document.getElementById('saved-dialog')?.showModal();
  });

  document.getElementById('global-search-input')?.addEventListener('input', updateGlobalSearch);

  document.addEventListener('keydown', event => {
    const usesSearchShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';

    if (!usesSearchShortcut) {
      return;
    }

    event.preventDefault();
    openSearchDialog();
  });
}

/* Global search */
function openSearchDialog() {
  const dialog = document.getElementById('global-search-dialog');
  const input = document.getElementById('global-search-input');

  if (!dialog || !input) {
    return;
  }

  if (!dialog.open) {
    dialog.showModal();
  }

  requestAnimationFrame(() => input.focus());
}

function updateGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const results = document.getElementById('global-search-results');
  const status = document.getElementById('global-search-status');

  if (!input || !results || !status) {
    return;
  }

  const rawQuery = input.value.trim();
  const query = rawQuery.toLowerCase();

  results.innerHTML = '';

  if (!query) {
    status.textContent = `Start typing to search ${searchIndex.length} reference entries.`;
    return;
  }

  // I use one search index here so the dialog can search the whole site instead of just this page.
  const matches = searchIndex
    .filter(item => {
      const searchableText = [
        item.title,
        item.subtitle,
        item.description,
        item.example,
        item.section,
        item.page
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    })
    .slice(0, 40);

  status.textContent =
    `${matches.length} result${matches.length === 1 ? '' : 's'} ` + `shown for “${rawQuery}”.`;

  if (!matches.length) {
    results.innerHTML = '<li class="empty-state">No matching references found.</li>';
    return;
  }

  results.innerHTML = matches
    .map(
      item => `
      <li>
        <a class="search-result" href="${item.href}">
          <span class="result-meta">
            ${escapeHtml(item.page)} · ${escapeHtml(item.section)}
          </span>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.subtitle || item.description)}</span>
        </a>
      </li>
    `
    )
    .join('');
}

/* Saved references dialog */
function renderSavedResults() {
  const results = document.getElementById('saved-results');

  if (!results) {
    return;
  }

  const favorites = getFavorites();

  if (!favorites.length) {
    results.innerHTML =
      '<li class="empty-state">' +
      'No saved references yet. Use the ☆ buttons beside terms and patterns.' +
      '</li>';
    return;
  }

  results.innerHTML = favorites
    .map(
      item => `
      <li>
        <a class="search-result" href="${item.href}">
          <span class="result-meta">
            ${escapeHtml(item.page)} · ${escapeHtml(item.section)}
          </span>
          <strong>${escapeHtml(item.title)}</strong>
        </a>
      </li>
    `
    )
    .join('');
}
