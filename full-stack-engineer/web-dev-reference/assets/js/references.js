/* =========================================================
   Web Development Reference
   Reference TOC, favorites, and row-level interactions
   ========================================================= */

function renderAuthorNote() {
  const encoded = body.dataset.authorNote;
  const main = document.getElementById("main-content");
  if (!encoded || !main) {
    return;
  }
  const note = encoded;
  const toc = main.querySelector(".page-toc");
  const html = `<aside class="author-note"><span class="author-note-label"><span aria-hidden="true">★</span> Jennifer's Note</span><p>${note}</p></aside>`;
  if (toc) toc.insertAdjacentHTML("afterend", html); else main.insertAdjacentHTML("afterbegin", html);
}

function renderRelatedReferences() {
  if (!body.dataset.related) {
    return;
  }
  const main = document.getElementById("main-content");
  if (!main) {
    return;
  }
  let items = [];
  try { items = JSON.parse(body.dataset.related); } catch { return; }
  if (!items.length) {
    return;
  }
  const links = items.map(({ label, href }) => `<li><a href="${href}">${escapeHTML(label)} <span aria-hidden="true">→</span></a></li>`).join("");
  main.insertAdjacentHTML("beforeend", `<aside class="related-references" aria-labelledby="related-title"><h2 id="related-title">Related references</h2><ul>${links}</ul></aside>`);
}

/* ---------- Favorites ---------- */
function favoriteRecordForElement(element) {
  const isPattern = element.classList.contains("pattern-section");
  const title = isPattern
    ? element.querySelector("h2")?.textContent.trim()
    : element.querySelector("th[scope='row']")?.textContent.trim();
  if (!title) return null;
  const page = currentPageLabel();
  const section = element.closest(".reference-section, .pattern-section")?.querySelector("h2")?.textContent.trim() || page;
  return { id: `${body.dataset.page}:${element.id}`, title, page, section, href: `${location.pathname.split('/').pop() || 'index.html'}#${element.id}` };
}

function isFavorite(id) { return getFavorites().some((item) => item.id === id); }

function toggleFavorite(record) {
  let favorites = getFavorites();
  favorites = favorites.some((item) => item.id === record.id)
    ? favorites.filter((item) => item.id !== record.id)
    : [...favorites, record];
  saveFavorites(favorites);
  refreshFavoriteButtons();
  renderSavedResults();
}

function addFavoriteButtons() {
  document.querySelectorAll(".reference-table tbody tr[id]").forEach((row) => {
    const cell = row.querySelector("th[scope='row']");
    if (!cell || cell.querySelector(".favorite-button")) {
      return;
    }
    const record = favoriteRecordForElement(row);
    if (!record) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "favorite-button";
    button.dataset.favoriteId = record.id;
    button.setAttribute("aria-label", `Save ${record.title}`);
    button.addEventListener("click", () => toggleFavorite(record));
    cell.append(button);
  });

  document.querySelectorAll(".pattern-section[id]").forEach((section) => {
    const heading = section.querySelector(".pattern-heading");
    if (!heading || heading.querySelector(".favorite-button")) {
      return;
    }
    const record = favoriteRecordForElement(section);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "favorite-button pattern-favorite";
    button.dataset.favoriteId = record.id;
    button.setAttribute("aria-label", `Save ${record.title}`);
    button.addEventListener("click", () => toggleFavorite(record));
    heading.append(button);
  });
  refreshFavoriteButtons();
}

function refreshFavoriteButtons() {
  const favoriteIds = new Set(getFavorites().map((item) => item.id));
  document.querySelectorAll(".favorite-button").forEach((button) => {
    const saved = favoriteIds.has(button.dataset.favoriteId);
    button.classList.toggle("is-saved", saved);
    button.textContent = saved ? "★" : "☆";
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("title", saved ? "Remove from saved references" : "Save reference");
  });
}

/* ---------- Dialogs: global search and saved references ---------- */
