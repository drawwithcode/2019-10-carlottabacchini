// Initializing variables for creategraphics
var myModel;
var myFont;
var cam;
var cam2
var currentCamera;
var dollars = [];
var numDollars = 3000;
var tex;

function preload() {

  myModel = loadModel("assets/2.obj", true);
  myFont = loadFont('assets/RobotoMono-Bold.ttf')
  tex = loadImage('assets/tex.png')

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cam = createCamera();

  cam2 = createCamera();
  cam2.setPosition(300, 100, -600);
  cam2.lookAt(0, 0, 0);
  cam2.ortho();

  // set variable for previously active camera:
  currentCamera = 0

  angleMode(DEGREES)
  frameRate(50)

  for (var i = 0; i < numDollars; i++) {
  dollars.push(new Dollar(random(-800, 800), random(-800, 800), random(1000, 500), random(0, PI), random(10, 28), random(0.03, 10) ));
}

}

function draw() {
  background(0);

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  setCamera(cam)
  cam.lookAt(0,0,0);
  cam.setPosition(100,100, -600*frameCount/200)

  if (frameCount >= 200) {
    cam.setPosition(100,100, -600) }
  // if (frameCount >= 210) {
  //   cam.setPosition(locX,locY, -600)
  // }

if (keyIsDown(ENTER) && frameCount >= 200 ) {
  setCamera(cam2)
  currentCamera = 1}

  for (var i = 0; i < dollars.length; i++) {
  dollars[i].move();
  dollars[i].display();
}


  push()
    fill('#c5ff8c');
   textFont(myFont);
   textSize(90);
   textAlign(CENTER)
   rotateY(171)
   rotateX(-5)
   translate(0,-500,-400)
   text('Discover a new currency', 50, 50);
   pop()

  //setting the camera for the instructions cube



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

class Dollar {
constructor (xPos, yPos, zPos, incl, sizeX, delta) {

  this.x = xPos;
  this.y = yPos;
  this.z = zPos;
  this.angle = incl;
  this.lenght = sizeX;
  this.hight = sizeX/2.35;
  this.speed = delta;
}

  move() {
    this.z -= this.speed;
  };

  display(){

    push();
    translate(this.x, this.y, this.z);
    rotateX(this.angle);
    rotateY(this.angle / 4);
    rotateZ(this.angle / 3);
    noStroke();
    texture(tex)
    plane(this.lenght, this.hight);

    pop();

  };

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



// var myModel;
// var myFont;
// // let intro;
//
// function preload() {
//   myModel = loadModel("assets/2.obj", true); // If true, scale the model to a standardized size when loading (normalization)
//   myFont = loadFont('assets/RobotoMono-Bold.ttf')
// }
//
// function setup() {
//   createCanvas(windowWidth, windowHeight, WEBGL);
//
//   angleMode(DEGREES);
//
//   // setting the camera for the instructions cube
//     // var cameraX = mouseX - width / 2;
//     // var cameraY = mouseY - height / 2;
//     // camera(cameraX, cameraY, 0, 0, 0, 0, 0, 0, 0);
//
//
//
//
//
//
//
//
// }
//
//
//
// function draw() {
//
//
//
//
//   let locX = mouseX - width / 2;
//   let locY = mouseY - height / 2;
//
//   background(3, 17, 9);
//
// push()
//   fill('#c5ff8c');
//  textFont(myFont);
//  textSize(60);
//  translate(-380,-450,-200)
//  text('Discover a new coin', 50, 50);
//  pop()
//
//
//
//   push()
//
//   ambientLight(10, 10, 10, 10)
//   pointLight(159, 220, 141, locX, -locY, -790);
//   pointLight(240, 48, 104, -locX, locY, - 790);
//   translate(0,0,-800)
//   scale(width * height / 2000000); // Scaled to make model fit into canvas
//   rotateY(frameCount * 0.5);
//   rotateZ(180)
//   ambientMaterial(150);
//   noStroke()
//   model(myModel);
//   pop()
//
//
// }
//
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
