const source = document.getElementById('ifHelper').innerHTML;
const template = Handlebars.compile(source);

const context = {
  opinion: true // Change to false to display falsy-handlebar-ELSE statement on line 13 in index.html
};

const compiledHtml = template(context);

const debateElement = document.getElementById('debate');

debateElement.innerHTML = compiledHtml;