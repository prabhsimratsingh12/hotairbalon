var hotairballon,balloonImage1,balloonImage2,hotairballoon;
// create database and position variable here
var database,position
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);
  database=firebase.database();
  hotairballon=createSprite(250,450,150,150);
  hotairballon.addAnimation("hotAirBalloon",balloonImage1);
  hotairballon.scale=0.5;
  var balloonposition=database.ref('ballon/height')
  balloonposition.on("value",readPosition, showError)

  textSize(20); 
}

function readPosition(data){
  position=data.val()
  hotairballon.x=position.x
  hotairballon.y=position.y
}
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    hotairballon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    hotairballon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(1,0);
  }
  else if(keyDown(UP_ARROW)){
    hotairballon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    hotairballon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,+1);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(data){
  database.ref('hotairballoon/height').set({
    'x': height.x + x,
    'y':height.y + y
  })
}

function readHeight(data){
  height = data.val();
    ballon.x = ballon.x;
    ballon.y = ballon.y;
}

function showError(){;
  console.log("Error in writing to the database")
}