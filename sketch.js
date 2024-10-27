let circles = [];
let balloon;
let inScene1 = true;
let inScene2 = true;
let angle = 0;
let radius = 0; 
let particles = []; //to use for my particles

class Particle{//to make a new particle object (this is for my second scene)
  constructor(x,y){
    this.x = x; //starting x position
    this.y = y; //starting y position

    this.color = color(random(255), random(255), random(255));//produces a random color
    this.velocity = createVector(random(-5,5),random(-5,5));//produces a random vector location
  }

  update(){//updating each particle position
    this.x += this.velocity.x; //updates x position
    this.y += this.velocity.y; //updates y position
    
    //adding bounds to the dots so they dont come off the screen
    if(this.x < 0 || this.x > width){//if x value goes off the width of the screen
      this.velocity.x *= -1;//reverse the x value so it goes in the opposite direction
    }

    if(this.y < 0 || this.y > height){//if the y value goes off the height of the screen
      this.velocity.y *= -1;//reverse the y value so it goes in the opposite direction
    }
  }

  display(){//displaying my particles
    fill(this.color);//draw the particle color
    noStroke();//no outline
    ellipse(this.x,this.y,40,40);//draw the ellipse at the x and y position
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
    backColor = color(random(255),random(255), random(255));
  }

  background(backColor);

 
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
        noStroke();//no outline
        ellipse(circle[0],circle[1],circle[2]);//creating an ellipse at the x,y location with the size inputed from array

        circle[2] += circle[3];//updating the size based on the growthrate
        if (circle[2] > 200){//if the size gets bigger than 200..
          circles.splice(i,1);//cut it off and make it disappear
        }
      }
        //researching more about what noise() does, i tried to look online for "fluid shapes to make in p5.js"
      stroke(0);//white outline
      beginShape();//start the shape
      for (let x = 0; x < width; x++) {//expand from the width of the screen
        let y = noise(x * 0.01, frameCount * 0.01) * height;//noise creates a wave pattern
        vertex(x, y);
      }
    endShape();
    } 
  }
  else{
    background(backColor);
    if (frameCount % 1 === 0) { //a new particle will be added every 1 frames
      particles.push(new Particle(mouseX, mouseY)); 
    }
  
    for (let p of particles) {
      p.update();
      p.display();
    }
  }
}










