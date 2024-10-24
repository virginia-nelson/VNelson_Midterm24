let circles = []; //array to hold all my circles
function setup(){
  createCanvas(900,900);
}

function draw(){
  background(220);

  let x = random(width); //random width for circle
  let y = random(height); //random height for circle

  let size = 0; //size initally starts at 0
  let growthRate = random(1,3); //there's a growth rate value using a random number between 1 and 3
  
  let circleColor = color(random(255), random(255), random(255), 150); //generating a random color for the circles


  circles.push([x,y,size,growthRate,circleColor]); //adding into circles all my declared variables above
  for(let i = circles.length-1; i >= 0; i--){ //going through the array backwards
    let circle = circles[i]; //adding indexed value into a new variable, circle
    fill(circle[4]); //filling the circle using a random color from above
    noStroke;
    ellipse(circle[0],circle[1],circle[2]); //drawing the actual ellipse using above values

    circle[2] += circle[3]; //updating the size
    if (circle[2] > 200){ //if the circle gets too big, limit its size
      circles.splice(i,1);
    }
  }
  //code below is me researching what noise() does. i looked up "fluid shapes in p5.js" so just experimenting with that
  // stroke(0);
  // beginShape();
  // for (let x = 0; x < width; x++) {
  //   let y = noise(x * 0.01, frameCount * 0.01) * height;
  //   vertex(x, y);
  // }
  // endShape();
}






