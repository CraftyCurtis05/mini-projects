let ball = document.getElementById('float-circle');

// This function changes the ball's bottom style-property to 250px
const up = () => {
  ball.style.bottom = '250px';
}

// This function changes the ball's bottom style-property to 50px
const down = () => {
  ball.style.bottom = '50px';
}

// Adds an event handler for the whole document that triggers the up function when any key is pressed down
document.addEventListener('keydown', up);

// Adds an event handler for the whole document that triggers the down function when any key is released
document.addEventListener('keyup', down);