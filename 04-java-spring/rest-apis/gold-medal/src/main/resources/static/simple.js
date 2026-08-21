/* Small front end so I can test the Gold Medal API in the browser. */

const form = document.querySelector("#country-form");
const countrySelect = document.querySelector("#country");
const result = document.querySelector("#result");

async function loadCountries() {
  try {
    const response = await fetch("/countries?sort_by=name&ascending=y");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    countrySelect.innerHTML = '<option value="">Choose a country</option>';

    data.countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  } catch (error) {
    result.textContent = "I could not load the country list.";
    console.error(error);
  }
}

async function loadCountryDetails(country) {
  result.textContent = "Loading country details...";

  try {
    const response = await fetch(`/countries/${encodeURIComponent(country)}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>Gold medals:</strong> ${data.numberMedals}</p>
      <p><strong>Summer wins:</strong> ${data.numberSummerWins}</p>
      <p><strong>Winter wins:</strong> ${data.numberWinterWins}</p>
      <p><strong>First summer win:</strong> ${data.yearFirstSummerWin}</p>
      <p><strong>First winter win:</strong> ${data.yearFirstWinterWin}</p>
    `;
  } catch (error) {
    result.textContent = "I could not load the details for that country.";
    console.error(error);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();

  if (countrySelect.value) {
    loadCountryDetails(countrySelect.value);
  }
});

loadCountries();
