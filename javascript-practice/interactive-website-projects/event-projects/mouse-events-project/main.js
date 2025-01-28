// These variables store the boxes on the side
let itemOne = document.getElementById('list-item-one');
let itemTwo = document.getElementById('list-item-two');
let itemThree = document.getElementById('list-item-three');
let itemFour = document.getElementById('list-item-four');
let itemFive = document.getElementById('list-item-five');
let resetButton = document.getElementById('reset-button');

// This function programs the "Reset" button to return the boxes to their default styles
let reset = () => {
  itemOne.style.width = ''
  itemTwo.style.backgroundColor = ''
  itemThree.innerHTML = 'The mouse must leave the box to change the text'
  itemFive.style.display = "none"
};
resetButton.onclick = reset;

// This function changes the itemOne width style-property to 601px
const increaseWidth = () => {
  itemOne.style.width = '601px';
}

// Adds an event handler for itemOne that triggers the increaseWidth function when the mouse hovers on it
itemOne.addEventListener('mouseover', increaseWidth);

// This function changes the itemTwo background color style-property to teal
const changeBackground = () => {
  itemTwo.style.backgroundColor = 'teal';
}

// Adds an event handler for itemTwo that triggers the changeBackground function when the mouse is released over the element
itemTwo.addEventListener('mouseup', changeBackground);

// This function changes the itemThree HTML text
const changeText = () => {
  itemThree.innerHTML = 'The mouse has left the element';
}

// Adds an event handler for itemThree that triggers the changeText function when the mouse leaves the element
itemThree.addEventListener('mouseout', changeText);

// This function changes the itemFive display style-property to block
const showItem = () => {
  itemFive.style.display = 'block';
}

// Adds an event handler for itemFour that triggers the showItem function when the mouse is pressed down on the element
itemFour.addEventListener('mousedown', showItem);