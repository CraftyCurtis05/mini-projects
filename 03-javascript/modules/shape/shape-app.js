/* shape-app.js */
const { circleArea, squareArea } = require("./shape-area.js");

const radiusLength = 5;
const sideLength = 10;

const areaOfCircle = circleArea(radiusLength);
const areaOfSquare = squareArea(sideLength);

console.log(`The area of a circle with a radius length of ${radiusLength} has an area of ${areaOfCircle}`);
console.log(`The area of a square with a side length of ${sideLength} has an area of ${areaOfSquare}`);