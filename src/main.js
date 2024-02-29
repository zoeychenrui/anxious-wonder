const FACTOR = window.innerHeight / 1920
const MIN_STARS_SIZE = 4
const MAX_STARS_SIZE = 12
const MIN_STARS_SPEED = 20
const MAX_STARS_SPEED = 50
const MESSAGE_TOP = 1250 * FACTOR

let stars = []
let canvas2;


let rotationSpeedX = 0.5;
let rotationSpeedY = 0.5;

// Adjust rotation speed based on mouse movement
function mouseMoved() {
  rotationSpeedX = map(mouseX, 0, width, -0.02, 0.02);
  rotationSpeedY = map(mouseY, 0, height, -0.02, 0.02);
}

let userInput = ""; // Variable to store user input
let inputField; // Input field element
let floatingWords = []; // Array to hold floating words

class Word {
  constructor(x, y, z, text) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.text = text;
    this.speed = random(1, 3);
  }

  update() {
    this.x += random(-1, 1) * this.speed;
    this.y += random(-1, 1) * this.speed;
    this.z += random(-1, 1) * this.speed;
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    fill(255);
    text(this.text, 0, 0);
    pop();
  }
}

let planets = []; // Array to hold planets

class Planet {
  constructor(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.color = color(random(255), random(255), random(255)); // Random color for each planet
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    fill(this.color);
    noStroke();
    sphere(this.size); // Display planet as a sphere
    pop();
  }
}


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL)
  canvas2 = createGraphics(windowWidth, 1920 * FACTOR );
  canvas2.clear();
  canvas.parent('p5')
  
  Global.xFactor = 1920 * windowWidth / windowHeight
  Global.time = 0
  
  // number of stars 
  for (let i = 0; i < 500; i++) {
    stars.push(new Star())
  }
  
  // displays text
  select('#message').position(0, MESSAGE_TOP)

  // rotating tunnel effect
  strokeWeight(2)
  
  r = 50;
  numPoints = 100;
  
  points = []
  for (n = 0; n<numPoints; n++) {
    x = random(-1, 1);
    y = randomGaussian();
    z = randomGaussian();

    mult = 1/sqrt(sq(x)+sq(y)+sq(z));
    x = x*mult*r;
    y = y*mult*r;
    z = z*mult*r;
    
    points.push({x:x, y:y, z:z})
  }

  
}

function draw() {

  // the rotating tunnel effect 
  stroke(255);
  orbitControl();
  t =  frameCount/50;

  rotateX(frameCount * rotationSpeedX)
  rotateY(frameCount * rotationSpeedY)
  noFill();

  for (a = t; a < PI+t; a += PI / 6) {
    
      beginShape()
    for (b = 0; b < TAU; b += TAU/25) {
      
        r = 500 
        x = r*sin(a%PI)*cos(b)
        y = r*sin(a%PI)*sin(b)
        z = r*cos(a%PI)
      
        //ta = random(TAU)
        A = pow(1+sq(tan(a-PI/2*(floor((a+PI/4)/(PI/2))))), 0.2)    
        B = pow(1+sq(tan(b-PI/2*(floor((b+PI/4)/(PI/2))))), 0.2)
      
        x = x*A * B
        y = y*A * B
        z = z*A
      
      if(b == 0){
        curveVertex(x,y,z)
      }
        curveVertex(x,y,z)
      
    }
    endShape(CLOSE)
  }
  
  // draws the stars
  image(canvas2, 0, 0);
  scale(FACTOR)
  Global.t = 0
  background(0);
  drawStars()
  Global.time += deltaTime / 1000
  
  drawStars()
 
  for (let word of floatingWords) {
    word.update();
    word.display();
  }
  for (let planet of planets) {
    planet.display();
  }
}



function drawStars() {
  stars.forEach((star) => {
    star.draw()
  })
}
function mouseClicked() {
  // Create a new planet at the position of the mouse click
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;
  let z = random(-500, 500);
  let size = random(10, 50); // Random size for each planet
  let planet = new Planet(x, y, z, size);
  planets.push(planet);
}

function updateUserInput() {
  // Update userInput variable when user presses Enter
  userInput = inputField.value();
  inputField.value(""); // Clear input field after submission
  
  // Create a new floating word instance for the user input
  let x = random(-width / 2, width / 2);
  let y = random(-height / 2, height / 2);
  let z = random(-500, 500);
  let word = new Word(x, y, z, userInput);
  floatingWords.push(word);
}
