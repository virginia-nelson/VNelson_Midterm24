let circles = [];//SCENE1 array to hold bubbles
let balloon;//balloon is the floating rectangle that changes the scenes
let inScene1 = true; //starting out in scene 1
let inScene2 = false;//not in scene2 yet
let inScene3 = false;//not in scene3 yet
let angle = 0; //for scene3 spiral, determines the position
let radius = 0;//for scene3 spiral, will increase to create spiral affect
let particles = []; //SCENE2 array to use for my particles
let spiralPoints = [];//SCENE3 holds the points for spiral

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
      this.velocity.y *= -1;//reverse the y value so it goes in the opposite direction=
    }
  }

  display(){//displaying my particles
    fill(this.color);//draw the particle color
    noStroke();//no outline
    ellipse(this.x,this.y,40,40);//draw the ellipse at the x and y position
  }
}


function setup(){//setup for the first scene/general design
  createCanvas(900,900);//window size
  balloon = height;//starting the balloon at the bottom of the screen aka the height of it

}

function draw(){//drawing loop that will repeat
  background(220);//initial background color

  if(inScene1){//if we are in scene 1 is random bubbles and waves
    backColor = color(random(255),random(255), random(255));//set the back color to random colors
  }

  background(backColor);//sets the background for this

 
  if(inScene1){//if scene1 is true (it is at the start)
    fill(255,47);//fill rectangle with white, sets opacity
    noStroke();//no outline
    rect(width/2, balloon, 100, 100);//create the rectangle
    balloon -= 2;//decrease the height so it rises up the screen

    if(balloon < 0){//if the height is negative, meaning it's off the screen...
        inScene1 = false;//sets scene1 to false
        inScene2 = true;//sets scene2 to true (transitioning the scene)
        balloon = height;//resets balloon for next scene to be at the bottom of the screen
    }
    else{
      let x = random(width); //random x location for circle using the bounds of the width of the screen
      let y = random(height); //random y location for circle using the bounds of the height of the screen

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
        let y = noise(x * 0.01, frameCount * 0.01) * height;//noise creates smooth tiny ouputs making the design look fluid
        //x*0.01 scales the x value down to make smoother transitions between points
        //framCount * 0.01 uses time to create a more fluid movement to the y values
        //* height scales it in the vertical direction
        vertex(x, y);//adds a point. x value comes from the loop, y value comes from the noise function. creating the wave
      }
    endShape();//ending the shape
    } 
  }
  else if(inScene2){ //scene 2 is particles following the mouse
    background(backColor);//sets random background color, just once so its solid the whole time
    if (frameCount % 1 === 0) { //a new particle will be added every 1 frames
      particles.push(new Particle(mouseX, mouseY));//pushes into the array the mouseX and mouseY. this makes it follow the mouse
    }
  
    for (let p of particles) {//goes through the array. for every value (p) in the array particles...
      p.update();//update the value (see update function)
      p.display();//display the value (see display function)
    }
    
    fill(255,17);//another floating rectangle
    noStroke();//no outline
    rect(width/2, balloon, 100, 100);//creates the rectangle
    balloon -= 1;//decreases the height to make it float at a smaller rate (decreasing y value by 1 each time)

    if(balloon < 0){//if the balloon reaches past the top of the screen
        inScene2 = false;//scene2 is now over
        inScene3 = true;//scene3 is beginning
        balloon = height;//resets rectangle for the bottom of the screen
    }
    
  }
  else if(inScene3){//if scene3 is true
    background(255);//sets the background to white
    translate(width/2,height/2);//sets the spiral up in the middle of the screen

    let xPoint = radius * cos(angle);//calculates x coordinate on the point of the spiral. radius is how far from ceneter. 
    //cos(angle) gives the horizontal position based on the angle in radians
    let yPoint = radius * sin(angle);//calculates y coordinate. same way as x, but using sin to calculate vertical position

    spiralPoints.push(createVector(xPoint,yPoint));//creates a new vector using the x and y point and pushes into the array
    angle += 0.5;//increases the angle for each frame, moving the point in a circular line for each frame
    radius += 0.5;//increases the radius for each frame, creating a spiral desgin

    for(let i =0; i< spiralPoints.length; i++){//indexing through the array
      let point = spiralPoints[i];//create a point at the "i" location in the array
      strokeWeight(map(i,0,spiralPoints.length,1,50));//adjusts the thickness using map. scales from i-50 making older points thicker
      stroke(random(255),random(255),random(255));//sets the color of the point to a random color
      ellipse(point.x,point.y,5,5);//creates an ellipse at the x and y coordinates for the spiral
    }

    if(spiralPoints.length > 1000){//if the array grows to more than 1000
      spiralPoints.splice(0,1);//removes the oldest point in the array (so the first)
    }

  }
}










