var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);



  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;

}

function draw() {

  background(0);
  spookySound.loop();
  if (gameState === "play") {



    if (tower.y > 200) {
      tower.y = 150;
    }
    if (keyDown("right")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("left")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }


    spawnDoors();




    drawSprites();


  } else if (gameState === "end") {
    fill("yellow");
    textSize(50);
    text("GAME OVER", 150, 100);

  }
}

function spawnDoors() {
  if (frameCount % 250 === 0) {
    door = createSprite(300, 10);
    door.addImage(doorImg);

    climber = createSprite(300, 55);
    climber.addImage(climberImg);

    invisibleBlock = createSprite(300, 65, climber.width, 5);

    door.x = Math.round(random(100, 400));
    climber.x = door.x;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;


    door.velocityY = 1;
    climber.velocityY = 1;

    door.lifetime = 800;
    climber.lifetime = 800;

    ghost.depth = door.depth;
    ghost.depth += 1;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

  }

}