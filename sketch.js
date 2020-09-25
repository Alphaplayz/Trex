var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacles, ob1, ob2, ob3, ob4, ob5, ob6;
var clouds, cloud;

var cloudGroup, obstacleGroup; 

var score = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  clouds = loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(0);
  
  spawnObstacles();
  spawnClouds();
  
  score = score + Math.round(getFrameRate()/60);
  textSize(15);
  text("Score:" + score, 500, 30);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
    
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,165,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(clouds);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacles = createSprite(600,180,10,40);
    obstacles.velocityX = -6;
    
    //generate random obstacles
     var rand = Math.round(random(1,6));
    //obstacles.setAnimation("obstacle" + rand);
    switch(rand){   
      case 1: obstacles.addImage(ob1);
              break;
      case 2: obstacles.addImage(ob2);
              break;  
      case 3: obstacles.addImage(ob3);
              break;  
      case 4: obstacles.addImage(ob4);
              break;
      case 5: obstacles.addImage(ob5);
              break;
      case 6: obstacles.addImage(ob6);
              break;
      default: break; 
    
    }
    
    //assign scale and lifetime to the obstacle           
    obstacles.scale = 0.5;
    obstacles.lifetime = 100;
    
    obstacleGroup.add(obstacles)
  }
}