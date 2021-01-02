let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);

  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let newX = poses[0].pose.keypoints[0].position.x;
    let newY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    let erX = poses[0].pose.keypoints[2].position.x;
    let erY = poses[0].pose.keypoints[2].position.y;

    noseX = lerp(noseX, newX, 0.5);
    noseY = lerp(noseY, newY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
    eyerX = lerp(eyerX, erX, 0.5);
    eyerY = lerp(eyerY, erY, 0.5);
  }
}
function modelReady() {
  console.log("model Ready");
}

function draw() {
  image(video, 0, 0);
  filter(GRAY);

  let d = dist(noseX, noseY, eyelX, eyelY);
  push();
  fill(255, 0, 0);
  ellipse(noseX, noseY, d);
  pop();

  push();
  fill(0);
  ellipse(eyelX, eyelY, d);
  ellipse(eyerX, eyerY, d);
  pop();

  push();
  fill(255);
  ellipse(eyelX, eyelY, d - 20);
  ellipse(eyerX, eyerY, d - 20);
  pop();

  push();
  noStroke();
  fill(0, 0, 200);
  rect(eyerX - 20, eyelY - 100, d + 80, d + 10);
  ellipse(eyerX + 30, eyelY - 120, d + 20);
  pop();
}
