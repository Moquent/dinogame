var trex, trexpics, trexdied;
var ground, invgnd, groundpics;
var cloud, cloudpics;
var obs, obs1, obs2, obs3, obs4, obs5, obs6;
var CloudsGroup, ObstaclesGroup;
var rand, play = 1, end = 0, gamestate = play, score = 0;
var gameend, endpic, restart, startpic, i = 0;

function preload()
{
  trexpics = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundpics = loadImage("ground2.png");
  cloudpics = loadImage("cloud.png");
  groundpics = loadImage("ground2.png");
  endpic = loadImage("gameOver.png");
  startpic = loadImage("restart.png");
  trexdied = loadAnimation("trex_collided.png");
  
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  
}
function setup() {
  createCanvas(600, 200);
  
  trex = createSprite (120,180,20,50);
  trex.addAnimation("running", trexpics);
  trex.addAnimation("collided", trexdied);
  trex.scale = 0.5;
  
  ground = createSprite(300,180,600,20);
  ground.addImage("ground", groundpics);
  ground.velocityX = -7;
  
  invgnd = createSprite (300, 190, 600, 20);
  invgnd.visible = false;
  
  restart = createSprite(300, 150, 10, 10);
  gameend = createSprite(300, 100, 10, 10);
  restart.addImage("start", startpic);
  gameend.addImage("end", endpic);
  restart.scale = 0.5;
  gameend.scale = 0.5
  
  
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
}

function draw() {
  background(200);
  if(gamestate == play){
    if(score % 100 == 0)
    {
      ground.velocityX = ground.velocityX + 0.5;
    }
     if(i < score)
     {
       i = score;
     }
    
    
    gameend.visible = false;
    restart.visible = false;
    trex.collide(invgnd);
    trex.velocityY = trex.velocityY + 0.8;
    if(keyDown("space") && trex.y >= 150) 
     {
       trex.velocityY = -12; 
     }
    if(trex.isTouching(ObstaclesGroup))
     {
       gamestate = end;
     }
    if(frameCount % 3 == 0)
    {
      score = score + 1;
    }
    
    if (ground.x < 0)
     {
       ground.x = ground.width/2;
     } 
     spawnclouds();
     spawnmobs();
  }
  if(gamestate == end)
  {
    restart.visible = true;
    gameend.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trexdied);
    
    if(mousePressedOver(restart) || keyDown("space"))
    {
      reset();
    }
  }
  text("HIGH SCORE:"+i, 100, 50);
  text("Score:"+score, 500, 50);
  drawSprites();
}

function spawnclouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) { 
    
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud", cloudpics);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    CloudsGroup.setLifetimeEach(134);
    CloudsGroup.setVelocityXEach(-3);

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}

function spawnmobs() {
  if(frameCount % 80 == 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    
    //generate random obstacles
    rand = Math.round(random(1, 6));
    
    switch(rand){
      case 1 : obstacle.addImage("obstacles", obs1);
        break;
      case 2: obstacle.addImage("obstacles", obs2);
        break;
      case 3: obstacle.addImage("obstacles", obs3);
        break;
      case 4: obstacle.addImage("obstacles", obs4);
        break;
      case 5: obstacle.addImage("obstacles", obs5);
        obstacle.scale = 0.4;
        break;
      case 6: obstacle.addImage("obstacles", obs6);
        obstacle.scale = 0.3;
        break; 
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset()
{
  gamestate = play;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.changeAnimation("running", trexpics);
  score = 0;
  ground.velocityX = -7;
}