const FACTOR = window.innerHeight / 1920
const MIN_STARS_SIZE = 4
const MAX_STARS_SIZE = 12
const MIN_STARS_SPEED = 20
const MAX_STARS_SPEED = 50
const MESSAGE_TOP = 1250 * FACTOR

let stars = []
let canvas2;

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

  rotateX(t/2)
  rotateY(t/2)
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
}


function drawStars() {
  stars.forEach((star) => {
    star.draw()
  })
}




