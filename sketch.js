var PLAY = 1;
var END = 0;
var gameState = PLAY;


// background
var bg,bgimage;
var burstimage;

//creating canshoot
var canshoot = true;

//creating the player
var player,playerimage;

//creating bullet
var bullet,bulletimage;
var explosionsound,hitsound
// creating the enemy
var enemy,enemyimage;
var delay = 100;

//score
var score = 0;
var edges;
//set score
//fill("white");
//textFont("Georgia");
//textSize(18);
//textStyle(BOLD);
function preload(){
bgimage=loadImage("bg.png");
burstimage= loadImage("burst.png");
bulletimage= loadImage("bullet.png");
enemyimage= loadImage("enemy.png");
playerimage= loadImage("player.png");
//explosionsound= loadSound("sound://category_explosion/8bit_explosion.mp3");
//hitsound=loadSound("sound://category_hits/8bit_splat.mp3")
}
function setup(){
  //createCanvas(1200,1200);
 bg = createSprite(0,0,windowWidth,windowHeight);
bg.addImage(bgimage);
bg.scale = 1;

player = createSprite(200,350);
player.addImage(playerimage)

bullet = createSprite(player.x,285);
bullet.addImage(bulletimage);
bullet.scale = 0.2;
bullet.visible = false;
bullet.setCollider("rectangle",0,0,5,5);


enemy = createSprite(350,50);
enemy.addImage(enemyimage);
enemy.scale = 0.9;
enemy.velocityX = -6;
enemy.setCollider("circle", 0, 0, 15);
//background(bgimage);
edges= createEdgeSprites();
}
function draw() {
  background(bgimage);
 
  movePlayer();
  shootBullet();
  moveEnemy();
  checkCollide();
  resetEnemy();
  resetBullet();
  
  createEdgeSprites();
 player.bounceOff(edges);
  drawSprites();
  // Score
  text("Score:"+ score,290,150);
}
function movePlayer() {
  if (keyDown("left")) {
    player.x = player.x -5;
  }
  if (keyDown("right")) {
    player.x = player.x +5;
  }
}
function shootBullet() {
  if (keyDown("space") && canshoot) {
    //hitsound.play();
    bullet.x = player.x;
    bullet.visible = true;
    bullet.velocityY =-10;
    canshoot = false;
    resetBullet();
  }
}
function resetBullet() {
  if (bullet.y < -10) {
    bullet.x = 450;
    bullet.velocityY = 0;
    bullet.y = 285;
    canshoot = true;
  }
}

function moveEnemy() {
  if (enemy.x > 350) {
    enemy.velocityX = -6;
  }else if (enemy.x < 25)
  enemy.velocityX = +6;
}
function checkCollide() {
  if (bullet.isTouching(enemy)) {
    // explosionsound.play();
    resetBullet();
    score = score + 1;
    enemy.scale = 0.5;
    delay = 0;
    enemy.velocityX = 0;
    bullet.visible = false;
  }
  delay = delay+1;
}
function resetEnemy() {
 if (delay < 100) {
   enemy.addImage(burstimage);;
 } else {
   enemy.addImage(enemyimage);;
   enemy.scale = 0.9;
   if (enemy.velocityX == 0) {
     enemy.velocityX = -6;
   }
 }
}
