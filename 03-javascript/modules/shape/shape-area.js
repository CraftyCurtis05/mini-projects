/* Area functions shared by the Node.js and browser examples. */

function circleArea(radius) {
  return Math.PI * radius * radius;
}

function squareArea(side) {
  return side * side;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    circleArea,
    squareArea,
  };
}

if (typeof window !== "undefined") {
  window.shapeArea = {
    circleArea,
    squareArea,
  };
}
