var myModel;
var myFont;
// let intro;

function preload() {
  myModel = loadModel("assets/2.obj", true); // If true, scale the model to a standardized size when loading (normalization)
  myFont = loadFont('assets/RobotoMono-Bold.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  angleMode(DEGREES);



  // define initial state
  var state = {
    distance: 800,
  };



  var state1 = {
    distance: 2000,
    center: [0, 0, 0],
    rotation: [1, 1, 0, 0],
  };

  var state2 = {
    distance: 200,
    center: [0, 0, 0],
    rotation: [0.1, 1, 0, -0.2367598],
  };


  console.log(Dw.EasyCam.INFO);

  // init camera
  easycam = new Dw.EasyCam(this._renderer, state1);

  // set some new state, animated
  easycam.setState(state2, 1500);

  easycam.state_reset = state2;
  easycam.setDefaultInterpolationTime(1500);



}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // easycam.setViewport([0,0,windowWidth, windowHeight]);
}

function draw() {

  // projection
  var cam_dist = easycam.getDistance();
  var oscale = cam_dist * 0.001;
  var ox = width / 2 * oscale;
  var oy = height / 2 * oscale;
  ortho(-ox, +ox, -oy, +oy, -10000, 10000);
  easycam.setPanScale(0.004 / sqrt(cam_dist));


  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  background(3, 17, 9);

push()
  fill('#c5ff8c');
 textFont(myFont);
 textSize(16);
 rotateX(180)
 rotateY(345)
 rotateZ(359.6)
 translate(-40,-10,-500)
 text('Discover a new coin', 50, 50);
 pop()


 push()
   fill('#c5ff8c');
  textFont(myFont);
  textSize(4);
  rotateX(180)
  rotateY(345)
  rotateZ(359.6)
  translate(40,90,-500)
  text('Click on the coin to start', 38, 50);
  pop()

  push()
  ambientLight(10, 10, 10, 10)
  pointLight(159, 220, 141, locX, -locY);
  pointLight(240, 48, 104, -locX, locY);
  lightFalloff(0.5, 0, 0);
  scale(width * height / 5000000); // Scaled to make model fit into canvas
  rotateY(frameCount * 0.5);
  ambientMaterial(150);
  noStroke()
  model(myModel);
  pop()


}
