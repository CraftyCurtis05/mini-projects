/* Temperature conversion functions used by the terminal and browser examples. */

function celsiusToFahrenheit(celsius) {
  return celsius * (9 / 5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * (5 / 9);
}

// Keep CommonJS support for the original Node.js exercises.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
  };
}

// The browser UI uses the same functions without needing a build tool.
if (typeof window !== "undefined") {
  window.temperatureConverters = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
  };
}
