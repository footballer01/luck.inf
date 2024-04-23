song = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;

function preload()
    {

      song = loadSound('music.mp3');

    }



function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

     model = ml5.poseNet(video,modelLoaded);
     model.on('pose',gotPoses);

}

function modelLoaded()
{
console.log('model has loaded');

}

function gotPoses(results)
{

if (results.length > 0) {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);

    lwx = results[0].pose.leftWrist.x; 
    lwy = results[0].pose.leftWrist.y;
    console.log('X position of my left wrist is =', lwx);
    console.log('Y position of my left wrist is =',lwy);
    
    rwx = results[0].pose.rightWrist.x;
    rwy = results[0].pose.rightWrist.y;
    console.log('X position of my right wrist is =', rwx);
    console.log('Y position of my right wrist is =',rwy);
}

}

function draw()
{
  image(video,0,0,600,500);

  fill('#FF0000');
  stroke('#FF0000');


 if (scoreLeftWrist > 0.2) 
 {
  circle(lwx,lwy,20);
  InNumberleftWristY = Number(lwy);
  remove_decimals = floor(InNumberleftWristY);
  volume = remove_decimal/500;
  document.getElementById('volume').innerHTML = 'Volume = '+ volume;
  song.setVolume(volume);
 }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1)
}
function stop()
    {
      song.stop();
    }
 