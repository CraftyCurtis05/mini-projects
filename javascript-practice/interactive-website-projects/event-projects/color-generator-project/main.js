// This variable stores the "Pick a Color" button
let button = document.getElementById('color-button');

// This variable stores the "Mystery Color" button
let mysteryButton = document.getElementById('next-button');

// This random number function will create color codes for the randomColor variable
const colorValue = () => {
  return Math.floor(Math.random() * 256);
}

// Uses random number function to generate a random color variable and set a target event's background color to the random color
const colorChange = (event) => {
  let randomColor = 'rgb(' + colorValue() + ',' + colorValue() + ',' + colorValue() + ')';
  event.target.style.backgroundColor = randomColor;
}

// Button event handling and set functions
button.onclick = colorChange;
mysteryButton.onwheel = colorChange;