
  var path,mainCyclist;
  var pathImg,mainRacerImg1,mainRacerImg2;
  var sound;
  var END =0;
  var PLAY =1;
  var gameState = PLAY;
  var gameOver,gameOverImg;
  var distance=0;

  function preload()
{
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  gameOverImg = loadImage("gameOver.png");
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");   
  oppPink2Img = loadAnimation("opponent3.png"); 
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");  
  oppYellow2Img = loadAnimation("opponent6.png"); 
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");  
  oppRed2Img = loadAnimation("opponent9.png");
  sound=loadSound("sound/bell.mp3"); 
  gameOverImg = loadImage("gameOver.png");
  
}

  function setup()
{
  
  createCanvas(800,300);
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg); 
  gameOver.scale = 0.8; 
  gameOver.visible = false;
  
// Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);

//creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
  
  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group(); 
  
  
}

  function draw() 
{
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0)
{
  if (select_oppPlayer == 1)
{
  pinkCyclists();
} else if (select_oppPlayer == 2) 
{
  yellowCyclists();
} else
{
  redCyclists();
}
}
  
  if(pinkCG.isTouching(mainCyclist))
{
  gameState = END;
  player1.velocityY = 0;
  player1.addAnimation("opponentPlayer1",oppPink2Img);
  gameState=END;
}
    
  if(yellowCG.isTouching(mainCyclist))
{
  gameState = END;
  player2.velocityY = 0;
  player2.addAnimation("opponentPlayer2",oppYellow2Img);
  gameState=END;
}
    
  if(redCG.isTouching(mainCyclist))
{
  gameState = END;
  player3.velocityY = 0;                                                                                                                       
  player3.addAnimation("opponentPlayer3",oppRed2Img);
  gameState=END;
}
  
  if(gameState===PLAY)
{
  distance = distance+ Math.round(getFrameRate()/50);
  mainCyclist.y = World.mouseY;
  
  edges= createEdgeSprites();
  mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 )
{
  path.x = width/2;
}
  path.velocityX=-10;
  gameOver.visible=false;
}
  
  if(keyDown("UP_ARROW"))
{
  reset();
}
  if(gameState===END)
{
  gameOverImg.visible=true;
   //   
//     
  text("TO RESTART THE GAME, PRESS  UP🔼 ARROW ")
  textSize(15);
  fill(255);
  pinkCG.setVelocityXEach(0);
  pinkCG.setLifetimeEach(-1);
  
  yellowCG.setVelocityXEach(0);
  yellowCG.setLifetimeEach(-1);
  
  redCG.setVelocityXEach(0);
  redCG.setLifetimeEach(-1);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  path.velocityX=-0;
}
  
  if(keyDown("space"))
{
  sound.play();  
}
}

  function pinkCyclists()
{
  player1 =createSprite(1100,Math.round(random(50, 250)));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",oppPink1Img);
  player1.setLifetime=170;
  pinkCG.add(player1);
}


  function yellowCyclists()
{
    
  player2 =createSprite(1100,Math.round(random(50, 250)));
  player2.scale =0.06;
  player2.velocityX = -(6 + 2*distance/150);
  player2.addAnimation("opponentPlayer2",oppYellow1Img);
  player2.setLifetime=170;
  yellowCG.add(player2);
}

  function redCyclists()
{
  player3 =createSprite(1100,Math.round(random(50, 250)));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",oppRed1Img);
  player3.setLifetime=170;
  redCG.add(player3);
}

 
  function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  distance = 0;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
  
}




