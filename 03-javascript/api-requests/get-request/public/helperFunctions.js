/* Display helpers for the GET request response. */

function renderResponse(response) {
  if (!Array.isArray(response) || response.length === 0) {
    responseField.innerHTML =
      "<p>Try again!</p><p>There were no suggestions found.</p>";
    return;
  }

  const words = response
    .slice(0, 10)
    .map((item) => `<li>${item.word}</li>`)
    .join("");

  responseField.innerHTML =
    `<p>You might be interested in:</p><ol>${words}</ol>`;
}

function renderRawResponse(response) {
  const trimmedResponse = response.slice(0, 10);
  responseField.textContent = JSON.stringify(trimmedResponse);
}

function renderJsonResponse(response) {
  responseField.textContent = JSON.stringify(response, null, 2);
}
