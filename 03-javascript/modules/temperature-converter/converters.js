/* converters.js */

/* Celsius To Fahrenheit */
// function celsiusToFahrenheit(celsius) {
//     return celsius * (9/5) + 32;
// };
// module.exports.celsiusToFahrenheit = celsiusToFahrenheit;
//*********************OR*************************
module.exports.celsiusToFahrenheit = function(celsius) {
    return celsius * (9/5) + 32;
};

/* Fahrenheit To Celsius */
// function fahrenheitToCelsius(fahrenheit) {
//     return (fahrenheit - 32) * (5/9);
// };
// module.exports.fahrenheitToCelsius = fahrenheitToCelsius;
//*********************OR*************************
module.exports.fahrenheitToCelsius = function(fahrenheit) {
    return (fahrenheit - 32) * (5/9);
};water-cf-module-project/converters.js