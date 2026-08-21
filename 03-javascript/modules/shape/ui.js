/* Small browser UI for the shape area module. */

const form = document.querySelector("#shape-form");
const result = document.querySelector("#result");

form.addEventListener("submit", event => {
  event.preventDefault();

  const shape = document.querySelector("#shape").value;
  const measurement = Number(document.querySelector("#measurement").value);

  if (measurement < 0) {
    result.textContent = "Enter a measurement that is 0 or greater.";
    return;
  }

  const area =
    shape === "circle"
      ? window.shapeArea.circleArea(measurement)
      : window.shapeArea.squareArea(measurement);

  result.textContent = `Area: ${area.toFixed(2)} square units`;
});
