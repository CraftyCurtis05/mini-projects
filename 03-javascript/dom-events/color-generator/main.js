/* Color Generator: change button colors from simple DOM events. */

const colorButton = document.querySelector("#color-button");
const mysteryButton = document.querySelector("#next-button");

function colorValue() {
  return Math.floor(Math.random() * 256);
}

function randomColor() {
  return `rgb(${colorValue()}, ${colorValue()}, ${colorValue()})`;
}

function colorChange(event) {
  event.currentTarget.style.backgroundColor = randomColor();
}

// The first button practices a normal click event.
colorButton.addEventListener("click", colorChange);

// The original Codecademy exercise uses the wheel event here.
// I also keep click support because that is what I naturally expect a button to do.
mysteryButton.addEventListener("wheel", colorChange);
mysteryButton.addEventListener("click", colorChange);
