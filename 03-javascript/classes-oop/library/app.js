/* Library Classes: class practice with a small browser UI. */

class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }

  get isCheckedOut() {
    return this._isCheckedOut;
  }

  get ratings() {
    return this._ratings;
  }

  toggleCheckOutStatus() {
    this._isCheckedOut = !this._isCheckedOut;
  }

  addRating(rating) {
    if (rating >= 1 && rating <= 5) {
      this._ratings.push(rating);
    }
  }

  getAverageRating() {
    if (this._ratings.length === 0) {
      return 0;
    }

    const total = this._ratings.reduce((sum, rating) => sum + rating, 0);
    return total / this._ratings.length;
  }
}

class Book extends Media {
  constructor(author, title, pages, language) {
    super(title);
    this._author = author;
    this._pages = pages;
    this._language = language;
  }
}

class Movie extends Media {
  constructor(director, title, runTime, movieCast = []) {
    super(title);
    this._director = director;
    this._runTime = runTime;
    this._movieCast = movieCast;
  }
}

class CD extends Media {
  constructor(artist, title, songs, songTitles = []) {
    super(title);
    this._artist = artist;
    this._songs = songs;
    this._songTitles = songTitles;
  }

  shuffle() {
    if (this._songTitles.length === 0) {
      return "No songs added";
    }

    const randomIndex = Math.floor(Math.random() * this._songTitles.length);
    return this._songTitles[randomIndex];
  }
}

class Catalog {
  constructor() {
    this._media = [];
  }

  get media() {
    return this._media;
  }

  add(media) {
    this._media.push(media);
  }
}

const catalog = new Catalog();

catalog.add(
  new Book(
    "Bill Bryson",
    "A Short History of Nearly Everything",
    544,
    "English"
  )
);
catalog.add(new Movie("Jan de Bont", "Speed", 116));
catalog.add(new CD("Hanson", "Mmm Bop", 12, ["Mmm Bop", "Where's the Love"]));

function createMedia(type, title) {
  if (type === "movie") {
    return new Movie("Practice Director", title, 120);
  }

  if (type === "cd") {
    return new CD("Practice Artist", title, 10, ["Track One", "Track Two"]);
  }

  return new Book("Practice Author", title, 250, "English");
}

function renderCatalog() {
  const list = document.querySelector("#catalog-list");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  catalog.media.forEach((media, index) => {
    const item = document.createElement("li");
    item.className = "item";

    const status = media.isCheckedOut ? "Checked out" : "Available";

    item.innerHTML = `
      <p><strong>${media.title}</strong> (${media.constructor.name})</p>
      <p>Status: ${status}</p>
      <div class="actions">
        <button type="button" data-action="checkout" data-index="${index}">
          Toggle checkout
        </button>
        <button type="button" data-action="rating" data-index="${index}">
          Add 5-star rating
        </button>
      </div>
      <p>Average rating: ${media.getAverageRating().toFixed(1)}</p>
    `;

    list.appendChild(item);
  });
}

const mediaForm = document.querySelector("#media-form");

if (mediaForm) {
  mediaForm.addEventListener("submit", event => {
    event.preventDefault();

    const type = document.querySelector("#media-type").value;
    const titleInput = document.querySelector("#media-title");
    const title = titleInput.value.trim();

    if (!title) {
      return;
    }

    catalog.add(createMedia(type, title));
    titleInput.value = "";
    renderCatalog();
  });

  document.querySelector("#catalog-list").addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) {
      return;
    }

    const media = catalog.media[Number(button.dataset.index)];

    if (button.dataset.action === "checkout") {
      media.toggleCheckOutStatus();
    }

    if (button.dataset.action === "rating") {
      media.addRating(5);
    }

    renderCatalog();
  });

  renderCatalog();
}
