// Declaring variables
var myModel;
var myFont;
var cam;

// variables for array
var dollars = [];
var numDollars = 3000;
var tex; // texture

let locX, locY; // mouse variables

function preload() {
  myModel = loadModel("assets/2.obj", true);
  myFont = loadFont('assets/RobotoMono-Bold.ttf')
  tex = loadImage('assets/tex.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cam = createCamera(); // creating a P5.JS Camera for Webgl

  angleMode(DEGREES)
  frameRate(50)


  for (var i = 0; i < numDollars; i++) { // generate the object
    dollars.push(new Dollar(random(-900, 900), random(-900, 900), random(900, 600), random(10, 28), random(0.03, 10))); // parameters
  }

}

function draw() {
  background(0);

  // setting mouse variables
  locX = mouseX - width / 2;
  locY = mouseY - height / 2;

  // setting camera
  setCamera(cam)
  cam.lookAt(0, 0, 0);
  cam.setPosition(100, 100, -600 * frameCount / 200) // camera animation for intro

  // setting that the intro finish after 200 frame
  if (frameCount >= 200) {
    cam.setPosition(100, 100, -600)
  }

  // if you want to move the 3D model after the intro
  // if (frameCount >= 210) {
  //   cam.setPosition(locX,locY, -600)
  // }


  for (var i = 0; i < dollars.length; i++) {
    dollars[i].move(); // call the function that allows the movement of the object
    dollars[i].display(); // call the function that display the object
  }

  // text
  push()
  fill('#c5ff8c');
  textFont(myFont);
  textSize(90);
  textAlign(CENTER)
  rotateY(171)
  rotateX(-5)
  translate(0, -500, -400)
  text('Discover a new currency', 50, 50);
  pop()


  // my model
  push()
  rotateZ(180)
  rotateY(180)
  noStroke();
  ambientLight(20, 20, 20, 20)
  pointLight(159, 220, 141, locX, -locY, 0);
  pointLight(240, 48, 104, -locX, locY, 0);
  ambientMaterial(150);
  model(myModel);

  pop()

}

// set the parameters of the class dollars
class Dollar {
  constructor(xPos, yPos, zPos, sizeX, delta) {

    this.x = xPos;
    this.y = yPos;
    this.z = zPos;
    this.lenght = sizeX;
    this.hight = sizeX / 2.35;
    this.speed = delta;
  }

  move() { // setting the movement from the back to the front
    this.z -= this.speed;
  };


  display() { // setting the aspect of the array of dollars 

    push();
    translate(this.x, this.y, this.z);
    noStroke();
    pointLight(159, 220, 141, locX, -locY, 0);
    pointLight(240, 48, 104, -locX, locY, 0);
    texture(tex)
    plane(this.lenght, this.hight);
    pop();

  };

}

// function that allows to resize the windows
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
