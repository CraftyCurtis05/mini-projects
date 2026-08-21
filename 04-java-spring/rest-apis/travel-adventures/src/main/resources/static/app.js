/* Small front end so I can see the Travel Adventures API data in the browser. */

const form = document.querySelector("#filter-form");
const countryInput = document.querySelector("#country");
const showAllButton = document.querySelector("#show-all");
const status = document.querySelector("#status");
const list = document.querySelector("#adventure-list");

async function loadAdventures(country = "") {
  status.textContent = "Loading adventures...";
  list.innerHTML = "";

  const query = country
    ? `?country=${encodeURIComponent(country)}`
    : "";

  try {
    const response = await fetch(`/adventures${query}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const adventures = await response.json();

    status.textContent =
      adventures.length === 0
        ? "No adventures matched that country."
        : `Showing ${adventures.length} adventure${adventures.length === 1 ? "" : "s"}.`;

    adventures.forEach(adventure => {
      const item = document.createElement("li");
      item.className = "item";
      item.innerHTML = `
        <p><strong>${adventure.city}, ${adventure.country}</strong></p>
        <p>Date: ${adventure.date}</p>
        <p>Photos: ${adventure.numPhotos}</p>
        <p>Blog completed: ${adventure.blogCompleted ? "Yes" : "No"}</p>
      `;
      list.appendChild(item);
    });
  } catch (error) {
    status.textContent = "I could not load the adventure data.";
    console.error(error);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  loadAdventures(countryInput.value.trim());
});

showAllButton.addEventListener("click", () => {
  countryInput.value = "";
  loadAdventures();
});

loadAdventures();
