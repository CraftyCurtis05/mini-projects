# GET Request Practice

A small API exercise I used to practice sending a GET request and working with the response.

I kept the original Word Smith idea from the Codecademy exercise, but cleaned up the request handling so the project still works as a small standalone example.

## What I Practiced

- GET requests with `fetch()`
- query parameters and `encodeURIComponent()`
- `async` / `await`
- checking `response.ok`
- handling request errors
- displaying returned JSON data in the DOM
- submitting a form with either the button or Enter key

## API

This project uses the Datamuse `/words` endpoint to find related words. It currently works without a key, although Datamuse says API keys will be required beginning January 1, 2027.

## Built With

- HTML
- CSS
- JavaScript
- Datamuse API

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

Enter a word and submit the form. The page requests suggestions from Datamuse and displays up to 10 results.

## Notes

This is still a learning project, so I kept the code straightforward instead of adding a framework or extra tooling. The helper functions stay separate because that was part of the original exercise structure.
