/* celsius-to-fahrenheit.js */
const { celsiusToFahrenheit } = require('./converters.js');

const celsiusInput = process.argv[2]; // Get the 3rd input from the argument list
const fahrenheitValue = celsiusToFahrenheit(celsiusInput);

console.log(`${celsiusInput} degrees Celsius = ${fahrenheitValue} degrees Fahrenheit`);

/* 1. To run module, open terminal */
/* 2. Navigate to folder containing js file: */
/* cd workspace/codecademy-projects/javascript-practice */
/* 3. Run program through Node.js: */
/* node celsius-to-fahrenheit.js userInput */