/* GET Request Practice: request word suggestions and display the response. */

const url = "https://api.datamuse.com/words?";
const queryParams = "rel_jja=";

const form = document.querySelector("#form");
const inputField = document.querySelector("#input");
const responseField = document.querySelector("#responseField");

async function getSuggestions() {
  const wordQuery = inputField.value.trim();

  if (!wordQuery) {
    responseField.innerHTML = "<p>Enter a word to get suggestions.</p>";
    return;
  }

  const endpoint = `${url}${queryParams}${encodeURIComponent(wordQuery)}`;

  try {
    const response = await fetch(endpoint, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const jsonResponse = await response.json();
    renderResponse(jsonResponse);
  } catch (error) {
    console.error(error);
    responseField.innerHTML =
      "<p>Something went wrong while getting suggestions. Try again.</p>";
  }
}

function displaySuggestions(event) {
  event.preventDefault();
  responseField.innerHTML = "";
  getSuggestions();
}

form.addEventListener("submit", displaySuggestions);
