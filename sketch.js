var trex , trexAnim ,ground , groundAnim ,invisibleG ,CloudAnim, Obstacle1,Obstacle2, Obstacle3,Obstacle4, Obstacle5, Obstacle6,cloudG, obstaclesG, Anim,
gameState, play,end ,checkpoint ,die,jump, 
score=0, reset, gameOver , resetIM ,gameOverIM

function preload() {
 trexAnim = loadAnimation("trex1.png","trex3.png","trex4.png"); 
  groundAnim = loadImage("ground2.png");
  CloudAnim = loadImage("cloud.png");
  Obstacle1 = loadImage("obstacle1.png");
  Obstacle2 = loadImage("obstacle2.png");
  Obstacle3 = loadImage("obstacle3.png");
  Obstacle4 = loadImage("obstacle4.png");
  Obstacle5 = loadImage("obstacle5.png");
  Obstacle6 = loadImage("obstacle6.png");
  play = 1;
  end = 0;
  reset=2;
  gameState = play;
  Anim = loadAnimation("trex_collided.png");
  checkpoint = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  gameOverIM = loadImage("gameOver.png");
  resetIM = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(100,160,20,20);
  trex.addAnimation("Running",trexAnim);
  trex.addAnimation("Collided",Anim);
  trex.scale = 0.5;
  ground = createSprite(300,185,600,5);
  ground.addImage("Moving",groundAnim);
  invisibleG = createSprite(300,190,600,5);
  invisibleG.visible = false;
  trex.depth = ground.depth;
  trex.depth = trex.depth +1;
  cloudG = new Group();
  obstaclesG =  new Group();
  reset = createSprite(300,100,10,10);
  reset.addImage("restart",resetIM);
  reset.scale = 0.5;
  gameOver = createSprite(300,130,10,10);
  gameOver.addImage("over",gameOverIM);
  gameOver.scale = 0.5;
  gameOver.visible =false;
  reset.visible = false;
}

function draw() {
  background(0);
  fill("white");
  text("score="+score,500,50);
  if(gameState === play) {
    if(ground.x<0) {
  ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y>160) {
    trex.velocityY = -10;
      jump.play();
    }
    if(frameCount%50 === 0) {
   SpawnClouds();
  }
  if(frameCount%80 === 0) {
    spawnObstacles();
  }
    trex.velocityY = trex.velocityY+(0.3);
     ground.velocityX = -3;
    if(trex.isTouching(obstaclesG)) {
      gameState = end;
      die.play();
    }
    score= Math.round(frameCount/2);
    if(score%100 === 0){
      checkpoint.play();    
    }
  }
  else if(gameState === end) {
   ground.velocityX = 0;
    trex.velocityY = 0; 
    trex.changeAnimation("Collided",Anim);
    cloudG.setVelocityXEach(0);
    obstaclesG.setVelocityXEach(0);
    cloudG.setLifetimeEach(-1);
    obstaclesG.setLifetimeEach(-1);
    gameOver.visible=true;
    reset.visible=true;
  }
  
  trex.collide(invisibleG);
  drawSprites();
}

function SpawnClouds() {
  var clouds = createSprite(600,random(50,110),10,10);
  clouds.velocityX = -3;
  clouds.addImage("Floating",CloudAnim);
  clouds.scale = 0.5;
  clouds.depth = trex.depth;
  trex.depth = trex.depth +1;
  clouds.lifetime = 200;
  cloudG.add(clouds);
  
}
function spawnObstacles() {
  var obstacles = createSprite(580,170,10,10);
  var choice = Math.round(random(1,6));
  switch(choice) {
    case 1:
      obstacles.addImage("Ob1",Obstacle1);
      break;
      case 2:
      obstacles.addImage("Ob2",Obstacle2);
      break;
      case 3:
      obstacles.addImage("ob3",Obstacle3);
      break;
      case 4:
      obstacles.addImage("Ob4",Obstacle4);
      break;
      case 5:
      obstacles.addImage("Ob5",Obstacle5);
      break;
      case 6:
      obstacles.addImage("ob6",Obstacle6);
      break;
      default:
      break;
  }
  obstacles.velocityX = -3;
  obstacles.scale = 0.5;
   obstaclesG.add(obstacles);
  obstacles.lifetime = 200;
  }
  





