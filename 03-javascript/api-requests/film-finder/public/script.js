// script.js

// API objects
const tmdbKey = 'c6ba1c5afc733415b82f1fecc0113b9b';  // Learn to hide with Node.js, config.js, .env, .gitignore
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// Objects using HTML ids
const playBtn = document.getElementById('playBtn');
const form = document.getElementById('form');
const select = document.getElementById('genres');

// Load liked and disliked movies from local storage
const myLikedMovies = loadLikedMovies();
console.log(myLikedMovies);
const myDislikedMovies = loadDislikedMovies();

if (myLikedMovies) {
  myLikedMovies.forEach((movie) => createLikedMovie(movie));
};

if (myDislikedMovies) {
  myDislikedMovies.forEach((movie) => createDislikedMovie(movie));
};

// API call to get movies by genre
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

// API call to get movies by actor/person
const searchPerson = async () => {
  const searchPersonEndpoint = '/search/person';
  const castInput = getCastValue();
  const requestParams = `?api_key=${tmdbKey}&query=${castInput}`;
  const urlToFetch = `${tmdbBaseUrl}${searchPersonEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const person = jsonResponse.results;
      return person;
    }
  } catch (error) {
    console.log(error);
  }
};

// API call to get a random movie selection
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const randomPage = getRandomPage();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

// API call to get movie by genre and actor choice
const getMoviesWithActor = async (person) => {
  const selectedGenre = getSelectedGenre();
  const castChoice = getCastChoice(person);
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&with_cast=${castChoice}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

// API call to get movies information to display with movie
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

// API call to get movies cast to display with movie
const getCast = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}/credits`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieCast = await response.json();
      const actorsNames = movieCast.cast
        .map((actor) => actor.name.trim())
        .slice(0, 5)
        .join(', ')
      return actorsNames;
    }
  } catch (error) {
    console.log(error);
  }
};

// API call to get movies release date to display with movie
const getReleaseDate = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}/release_dates`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const releaseDate = await response.json();
      return releaseDate;
    }
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async (person) => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  let movies;
  if (person.length !== 0) {
    movies = await getMoviesWithActor(person);
  } else {
    movies = await getMovies();
  }
  let randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  const cast = await getCast(randomMovie);
  const date = await getReleaseDate(randomMovie);
  displayMovie(info, cast, date);
};

// Get all genres and display in dropdown list
getGenres().then(populateGenreDropdown);

// Lets play button search functionality
playBtn.addEventListener('click', () => searchPerson().then(showRandomMovie));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPerson().then(showRandomMovie);
});