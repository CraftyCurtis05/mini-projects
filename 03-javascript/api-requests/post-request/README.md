# POST Request Practice

A small API exercise I use to practice sending JSON data with a POST request and handling the response.

The original Codecademy version used Rebrandly to shorten a URL and included an API key in front-end JavaScript. I removed that setup because a secret should not live in browser code. This version uses a public practice API instead, so the project can run without an account or private key.

## What I Practiced

- POST requests with `fetch()`
- request methods and headers
- `JSON.stringify()` for the request body
- `async` / `await`
- checking `response.ok`
- handling request errors
- displaying the returned JSON data in the DOM
- form submission

## API

This project uses JSONPlaceholder's public `/posts` endpoint. The API is made for learning and testing, does not require authentication, and returns a created post response for a valid POST request.

## Built With

- HTML
- CSS
- JavaScript
- JSONPlaceholder

## Project Structure

```text
├── public/
│   ├── helperFunctions.js
│   ├── main.js
│   └── style.css
├── test/
└── index.html
```

## Running the Project

Open `index.html` through a local server, such as VS Code Live Server.

Enter a title and message, then submit the form. The browser sends the values as JSON in a POST request and displays the response.

## Notes

I kept this as a small request project instead of turning it into a full application. The point is to make the POST request easy to follow when I come back to review it later.
