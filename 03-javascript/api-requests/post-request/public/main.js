/* POST Request Practice: send JSON data and display the returned response. */

const url = "https://jsonplaceholder.typicode.com/posts";

const form = document.querySelector("#form");
const titleInput = document.querySelector("#titleInput");
const bodyInput = document.querySelector("#bodyInput");
const responseField = document.querySelector("#responseField");

async function createPost() {
  const postData = {
    userId: 1,
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const jsonResponse = await response.json();
    renderResponse(jsonResponse);
  } catch (error) {
    console.error(error);
    responseField.innerHTML =
      "<p>Something went wrong while sending the request. Try again.</p>";
  }
}

function displayPost(event) {
  event.preventDefault();
  responseField.innerHTML = "";
  createPost();
}

form.addEventListener("submit", displayPost);
