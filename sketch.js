const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;

var stage0_bg, stage1_bg, stage2_bg, stage3_bg;
var ground;
var fire;
var ditto, dittoImg;
var next_arrow, arrow;
var stage = 0;
var stone, stoneImg, stones = [];
var spike1, spikeImg, spike2, spike3;
var safeGround;
var step1, step2, step3;
var heart, heartImg;
var life = 30;
var bg_music;
var spikeyGround;

function preload()
{
  stoneImg = loadImage("assets/stone.png");
  stage0_bg = loadImage("assets/stage0.jpg");
  stage1_bg = loadImage("assets/stage1.jpg");
  stage2_bg = loadImage("assets/stage2.jpg");
  stage3_bg = loadImage("assets/stage3.png");
  dittoImg = loadImage("assets/ditto.png");
  next_arrow = loadImage("assets/next.png");
  spikeImg = loadImage("assets/triangle.png");
  fire = loadImage("assets/fire.png");
  heartImg = loadAnimation("assets/heart_1.png");
  bg_music = loadSound("assets/sound1.mp3");
  spikeyGround = loadImage("assets/spike.png");
}

function setup() 
{
  createCanvas(1000,600);

  engine = Engine.create();
  world = engine.world;

  ground = createSprite(500,590,1000,30);

  ditto = createSprite(100,560,50,50);
  ditto.addImage(dittoImg);
  ditto.scale = 0.25;

  next = createSprite(950,550,50,50);
  next.addImage(next_arrow);
  next.scale = 0.2;

  spike1 = createSprite(355,372,50,50);
  spike1.addImage(spikeImg);
  spike1.scale = 0.35;
  spike1.visible = false;

  spike2 = createSprite(540,223,50,50);
  spike2.addImage(spikeImg);
  spike2.scale = 0.35;
  spike2.visible = false;

  spike3 = createSprite(780,133,50,50);
  spike3.addImage(spikeImg);
  spike3.scale = 0.35;
  spike3.visible = false;

  safeGround = createSprite(120,590,270,20);
  safeGround.visible = false;

  step1 = createSprite(300,400,150,15);
  step1.visible = false;
  step2 = createSprite(500,250,150,15);
  step2.visible = false;
  step3 = createSprite(760,160,200,15);
  step3.visible = false;

  heart = createSprite(880,40,50,50);
  heart.addAnimation("heart", heartImg);
  heart.scale = 0.3;

  bg_music.play();
  bg_music.setVolume(0.5);

  if(frameCount % 2 === 0)
  {
    for(var i=0; i<3; i++)
    {
      var x = random(width/2 - 200, width/2 + 300);
      var y = random(-10,100);
      stone = new Stone(x,y,60,60);
      stones.push(stone);
    }
  }
}

function draw() 
{
  Engine.update(engine);

  switch(stage)
  {
    case 0:
      background(stage0_bg);
      for(var stone of stones)
      {
        stone.show();
        var pos = stone.body.position;
        var distance = dist(ditto.position.x, ditto.position.y, pos.x, pos.y);

        if(distance <= 50)
        {
          ditto.x = 100;
          ditto.y = 560;
          collided = true;
          life -= 1;
        }
      } 
      handleStage0();
      handleDittoMovement();
      break;
    
    case 1:
      background(stage1_bg);
      handleStage1();
      handleDittoMovement();
      break;

    case 2:
      handleStage2();
      background(stage2_bg);
      handleDittoMovement();
      break;

    case 3:
      background(stage3_bg);
      handleStage3();
      handleDittoMovement();
      break;

    default:
      break;
  }

  handleDittoLimitation();
  drawSprites();

  textSize(30);
  text("x" + life, 915, 55);

  if(life === 0)
  {
    textSize(50);
    text("GAME OVER", 400,300);
    ditto.destroy();
  }
}

function handleDittoMovement()
{
  if(keyDown("space") && ditto.y > 0)
    ditto.velocityY = -20;

  if(ditto.velocityY < -10)
    ditto.velocityY = -10;

  ditto.velocityY += 0.95;

  if(keyDown(RIGHT_ARROW))
    ditto.x += 10;

  if(keyDown(LEFT_ARROW))
    ditto.x -= 10;
}

function handleDittoLimitation()
{
  if(ditto.x < 10)
    ditto.x = 10;

  if(ditto.x > 990)
    ditto.x = 990;

  if(ditto.y < 10)
    ditto.y = 10;

  if(ditto.y > 590)
    ditto.y = 590;
}