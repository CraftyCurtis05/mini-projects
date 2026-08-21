/* Display helpers for the POST request response. */

function renderResponse(response) {
  if (!response || !response.id) {
    responseField.innerHTML =
      "<p>The request finished, but I did not get the response I expected.</p>";
    return;
  }

  responseField.innerHTML = `
    <p><strong>POST request successful.</strong></p>
    <p>Created practice post #${response.id}</p>
    <p>${response.title}</p>
  `;
}

function renderRawResponse(response) {
  responseField.textContent = JSON.stringify(response);
}

function renderJsonResponse(response) {
  responseField.textContent = JSON.stringify(response, null, 2);
}
