let circles = [];
let balloon;
let inScene1 = true;
let inScene2 = true;
let angle = 0;
let radius = 0;
let particles = [];

class Particle{//to make a new particle object (this is for my second scene)
  constructor(x,y){
    this.x = x; //starting x position
    this.y = y; //starting y position

    this.color = color(random(255), random(255), random(255));//produces a random color
    this.velocity = createVector(random(-1,1),random(-1,1));//produces a random vector location
  }

  update(){
    this.x += this.velocity; //updates x position
    this.y += this.velocity; //updates y position
  }

  display(){
    fill(this.color);//draw the particle color
    noStroke();
    ellipse(this.x,this.y,40,40);
  }
}

function setup(){
  createCanvas(900,900);
  balloon = height;

}

function draw(){
  print(inScene1);
  background(220);

 
  if(inScene1){
    fill(255);
    noStroke();
    rect(width/2, balloon, 100, 100);
    balloon -= 2;

    if(balloon < 0){
        inScene1 = false;
        balloon = height;
    }
    else{
      let x = random(width); //random width for circle
      let y = random(height); //random height for circle

      let size = 0; //size initally starts at 0
      let growthRate = random(1,3); //there's a growth rate value using a random number between 1 and 3
  
      let circleColor = color(random(255), random(255), random(255), 150); //generating a random color for the circles

      circles.push([x,y,size,growthRate,circleColor]); //adding into circles all my declared variables above
      for(let i = circles.length-1; i >= 0; i--){ //going through the array backwards
        let circle = circles[i]; //adding indexed value into a new variable, circle
        fill(circle[4]); //filling the circle using a random color from above
        noStroke();
        ellipse(circle[0],circle[1],circle[2]); 

        circle[2] += circle[3];
        if (circle[2] > 200){
          circles.splice(i,1);
        }
      }
        //researching more about what noise() does, i tried to look online for "fluid shapes to make in p5.js"
      stroke(0);
      beginShape();
      for (let x = 0; x < width; x++) {
        let y = noise(x * 0.01, frameCount * 0.01) * height;
        vertex(x, y);
      }
    endShape();
    } 
  }
}










