// TODO: Create setup() function
function setup() {
    // Inside the setup() function:
    // TODO: Create canvas 500px wide and 500px high
    createCanvas(500, 500);
  }
  
  function draw() {
    // TODO: Create wall drawing inside draw() function
    // Inside the draw() function:
    // Draw parallel lines:
    // TODO: Set stroke color and weight
    // TODO: Use a for loop to draw 10 vertical lines
    const width = 500;
    const height = 500;
  
    for(let posX = 0; posX < 10; posX++) {
      stroke(125);
      strokeWeight(10);
      line(width/50 + posX * 25, 0, width/50 + posX * 25, height/2);
    }
  
    // Draw polka dots:
    // TODO: Set no stroke and fill color
    // TODO: Use nested for loops to draw a grid of circles
    // TODO: Offset y positions of every other column by 10 pixels
    const diameter = 10;
    fill('#ffd700');
    noStroke();
    for(let posX = 0; posX < 10; posX++) {
      for(let posY = 0; posY < 10; posY++) {
        if(posY%2 === 0) {
          circle(width/2 + 10 + posX * 25, height/50 + posY * 25, diameter);
        } else {
          circle(width/2 + 15 + posX * 25, height/50 + posY * 25, diameter);
        }
      }
    }
  
    // Draw checkered squares:
    // TODO: Set fill color
    // TODO: Use nested for loops to draw rows of squares
    // TODO: Offset y positions of every other column by 25 pixels
    fill('red');
    for(let posX = 0; posX < 10; posX++) {
      for(let posY = 0; posY < 5; posY++) {
        if(posX%2 === 0) {
          square(posX * 25, height/2 + 5 + posY * 50, 25);
        } else {
          square(posX * 25, height/2 + 30 + posY * 50, 25);
        }
      }
    }
    
    // Draw parallel diagonal lines:
    // TODO: Set stroke color and weight
    // TODO: Use a for loop to draw diagonal lines
    // Draw borders:
    // TODO: Set stroke color
    // TODO: Draw horizontal and vertical guidelines
  strokeWeight(10);
  stroke(0, 0, 255);
  for(let i = 0; i < 10; i++) {
    line(width/2 + 5, height - i * 25, width/2 + i * 25, height);
    line(width/2 + 5 + i * 25, height/2, width, height - i * 25);
  }
  
    // TODO: Draw borders around canvas
    stroke('black');
    strokeWeight(15);
    line(0, 0, width, 0);
    line(width, 0, width, height);
    line(width, height, 0, height);
    line(0, height, 0, 0);
  
      // TODO: Draw horizontal and vertical guidelines
    strokeWeight(9);
    line(250, 0, 250, 500);
    line(0, 250, 500, 250);
  }