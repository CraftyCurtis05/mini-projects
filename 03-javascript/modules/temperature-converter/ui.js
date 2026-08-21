/* Small browser UI for the temperature converter functions. */

const form = document.querySelector("#converter-form");
const result = document.querySelector("#result");

form.addEventListener("submit", event => {
  event.preventDefault();

  const temperature = Number(document.querySelector("#temperature").value);
  const direction = document.querySelector("#direction").value;
  const converters = window.temperatureConverters;

  if (direction === "c-to-f") {
    const fahrenheit = converters.celsiusToFahrenheit(temperature);
    result.textContent = `${temperature}°C = ${fahrenheit.toFixed(1)}°F`;
    return;
  }

  const celsius = converters.fahrenheitToCelsius(temperature);
  result.textContent = `${temperature}°F = ${celsius.toFixed(1)}°C`;
});
