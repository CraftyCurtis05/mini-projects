/* Water limit example using the converter module. */

const { celsiusToFahrenheit } = require("./converters.js");

const freezingPointC = 0;
const boilingPointC = 100;

const freezingPointF = celsiusToFahrenheit(freezingPointC);
const boilingPointF = celsiusToFahrenheit(boilingPointC);

console.log(`The freezing point of water is ${freezingPointF}°F.`);
console.log(`The boiling point of water is ${boilingPointF}°F.`);
