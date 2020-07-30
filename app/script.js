/* global p5 */

//------------------------------------VARIABLES------------------------------------------------------------------

let p = new p5(() => {});
  //     <script src="path/to/p5.sound.js"></script>
  //      <script src="http://caniuse.com/audio-api"></script>

  

let bitFont = p.loadFont(
  "https://cdn.glitch.com/2665923f-eb16-4b6e-9c3b-2bfe24cee104%2FPressStart2P-vaV7.ttf?v=1595817566106");
//welcome screen
let logo = p.loadImage(
  "https://cdn.glitch.com/f37ef9f9-e643-41e0-9ccc-489e79448aa1%2Ftigress_logo1-removebg-preview.png?v=1595811499442");
//scenery 
let levelOneImage = p.loadImage(
  "https://cdn.glitch.com/2665923f-eb16-4b6e-9c3b-2bfe24cee104%2Fforest.jpeg?v=1595817242602");
let jungleBackground = p.loadImage(
  "https://cdn.glitch.com/f37ef9f9-e643-41e0-9ccc-489e79448aa1%2FjungleBackground.jpeg?v=1595812899623");
let parkBackground = p.loadImage(
  "https://cdn.glitch.com/f37ef9f9-e643-41e0-9ccc-489e79448aa1%2FparkBackground.png?v=1595812899878");
//characters
let girlOnSkateboard = p.loadImage(
  "https://cdn.glitch.com/2665923f-eb16-4b6e-9c3b-2bfe24cee104%2FSk8terGowrl%20(1).png?v=1595869764650");
let tiger = p.loadImage(
  "https://cdn.glitch.com/2665923f-eb16-4b6e-9c3b-2bfe24cee104%2FTiger.png?v=1595822304750");
let town = p.loadImage(
  "https://cdn.glitch.com/2665923f-eb16-4b6e-9c3b-2bfe24cee104%2Ftown.jpeg?v=1595986906913"
);

let heart = p.loadImage (
  "https://cdn.glitch.com/2665923f-eb16-4b6e-9c3b-2bfe24cee104%2Fd4r844m-ea976dcf-7494-44d6-859a-0edf5e67ed65.png?v=1596071191407"
);

let keyImage = p.loadImage("https://cdn.glitch.com/2665923f-eb16-4b6e-9c3b-2bfe24cee104%2FKey%20(2).png?v=1596027531293");
let keyX = 300, keyY = 200;
// canva detail variables
let heartX = 400, heartY = 400;
let backgroundColor;
//key triggers
let keyOne = 49;
let keyTwo = 50;
//navigation buttons
let startRect, rulesRect;
let groundHeight = 50;
let girlX, girlY, girlWidth, girlHeight, girlVelocity;
let tigerX, tigerY, tigerWidth, tigerHeight, tigerVelocity;
let countdown, keysCollected;
let romanHoliday;
let keyCount;


//variable so we can implement the same function that will do infinite scroll for all backgrounds. call backgroundScroll(backgroundType)
let backgroundType, currentCanvas;
let hit = false;

let startButton;
let col = p.color("orange");


  p.preload = function () {
  romanHoliday = p.loadSound ("https://cdn.glitch.com/2665923f-eb16-4b6e-9c3b-2bfe24cee104%2FRoman%20Holiday%20-%20Nicki%20Minaj%20-%20(Instrumental).mp3?v=1596035581028");
  }
//-----------------------------------PRELOADER------------------------------------------------------------------


//-----------------------------------SETUP AND DRAW------------------------------------------------------------------
p.setup = function() {
  // show welcome screen
 // romanHoliday.setVolume(0.2);
  //romanHoliday.play();
  p.createCanvas(600, 400);
  groundHeight = 10;
  countdown = 150;
  tigerVelocity = 20;
  girlVelocity = 20;  
  girlX = 425;
  girlY = 350;
  tigerX = 70;
  tigerY = 160;
  keyX = p.random(p.width);
  keyY = p.random(p.height);
    
  welcomeScreen();
  
  keyCount = 0;
  
};

p.draw = function() {
  
  restartEntireGame();    
  //levelOne();
  let timeRemaining = "Time remaining: " + countdown;
  hit = p.collideCircleCircle(girlX,girlY,30,tigerX,tigerY,40);
  
  let isCollision1 = handleCollision1(girlX,girlY,tigerX,tigerY);
  let isCollision2 = handleCollision2(girlX,girlY,keyX,keyY);
  let isCollision3 = handleCollision3(girlX, girlY, heartX, heartY);
  
  if (isCollision1) {
    gameOver();
  } 
  
 if (isCollision2) {
     countdown = countdown + 10;
     keyCount += 1;
    
     redraw();
     randomizeKey();
  } 
  
  if (keyCount == 10){
    congratulations();
  }
  
  if (isCollision3){
    countdown = countdown + 25;
    randomizeHeart();
  }

};


//-------------------------------------WELCOME SCREEN FUNCTION-------------------------------------------------------------

function welcomeScreen() {
  
  
  console.log("welcomeScreen has run");
  
  backgroundColor = p.color("black");
  p.background(backgroundColor);

  let rulesRectPressed = false;
  
  p.strokeWeight(5);
  p.stroke("white");
  p.fill("orange");
  p.textSize(40);
  p.strokeWeight(10);
  p.stroke("white");
  p.textFont(bitFont);
  p.text("TIGER TROUBLE!", 25, 240);
 
  p.strokeWeight(5);
  p.stroke("white");
  p.fill("orange");
  p.textSize(20);
  p.strokeWeight(10);
  p.stroke("white");
  p.textFont(bitFont);
  p.text("PRESS SHIFT TO VIEW RULES!", 45, 300);
  p.text("PRESS ENTER TO START!", 95, 350);

  
  
  p.fill("orange");
  p.textSize(10);
  p.textFont(bitFont);
  p.text("MADE BY TIGRESS", 430, 390);

  p.image(logo, 80, -10, 500, 200);

}




    
//--------------------RULES SCREEN FUNCTION---------------------------------------------------------------------
function rulesScreen() {
  
    console.log("rulesScreen has run");
    // set background color
    backgroundColor = p.color("white");
    p.background(backgroundColor);
    p.strokeWeight(10);
    p.stroke("black");
    p.image(levelOneImage, 600, 400, 0, 0);
  
    //title and text
    p.fill("orange");
    p.textSize(40);
    p.textFont(bitFont);
    p.text("RULES:", 50, 100);

    p.fill("orange");
    p.textSize(15);
    p.textFont(bitFont);
    p.text("TIGER: AWSD    GIRL: ARROWS", 50, 125);
    p.text("COLLECT ALL KEYS TO SAVE THE", 50, 150); //TODO: create a function that increases speed for some period of time or period of frames when the ALT key is pressed
    p.text("TOWN WITHIN 200 MOVES!", 50, 175);
    p.text("PRESS ESC TO RETURN", 50, 390);
    p.image(tiger, 50, 160, 300, 200);
    p.image(girlOnSkateboard, 330, 170, 250, 200);
  } 


//-----------------------------LEVEL ONE FUNCTION--------------------------------------------------------------------------------------------
function levelOne() {
    console.log("levelOne has run");
    randomizeKey();
    showGirl();
    showTiger();
    handleTime();
    p.image(town, 0, 0, 600, 400);
   
    // play();
  
}



//-------------------------------------------------TIGER & GIRL & KEY---------------------------------------------------------------------------

function showTiger(){
  console.log("showTiger function is running");
  tigerWidth = 80;
  tigerHeight = 60;
  p.image(tiger, tigerX, tigerY, tigerWidth, tigerHeight);
} 

function showGirl(){
  console.log("showGirl function is running");
  girlWidth = 50;
  girlHeight = 50;
  p.image(girlOnSkateboard, girlX, girlY, girlWidth, girlHeight);
  
}

function showKey(){
  p.image(keyImage, keyX, keyY, 20, 30);
}

function showHeart () {
  
  
}


function randomizeKey(){
    keyX = p.random(p.width - 20);
    keyY = p.random(p.height - 20);
    p.image(keyImage, keyX, keyY, 20, 30);
}

function randomizeHeart () {
  heartX = p.random(p.width - 20);
  heartY = p.random (p.width - 20);
  p.image(heart, heartX, heartY, 20, 30);
}

p.keyPressed = function (){
  console.log("keyPressed has run");
  playGame();
  showKey();
  
  
    // go to level one
  if (p.keyCode === (p.ENTER)){
    
    levelOne();
    
  }
  if (p.keyCode === (p.SHIFT)){
    rulesScreen();
  }
    if (p.keyCode === (p.LEFT_ARROW)) {
      countdown --;
      
      girlX = girlX - girlVelocity;
      redraw();
  } 
  if (p.keyCode === (p.RIGHT_ARROW)) {
    countdown --;
    
    girlX = girlX + girlVelocity;
    redraw();
  }
  
  if (p.keyCode === (p.UP_ARROW)) {
    countdown --;
    girlY = girlY - girlVelocity;
   redraw();
  } 
  if (p.keyCode === (p.DOWN_ARROW)) {
    countdown --;
    girlY = girlY + girlVelocity;
   redraw();
  } 
  
  
  
   if (p.keyCode === 65) { //a
    tigerX = tigerX - tigerVelocity;
     redraw();
  } 
  
  if (p.keyCode === 68) { //d
    tigerX = tigerX + tigerVelocity;
    redraw();
  }
  
  if (p.keyCode === 83) { //s
    tigerY = tigerY + tigerVelocity;
    redraw();
  } 
  
  if (p.keyCode === 87) { //w
    tigerY = tigerY - tigerVelocity;
    redraw();
  } 
 
  
}

function redraw(){
    p.image(town, 0, 0, 600, 400);
    showGirl();
    showTiger();
    handleTime();
    showKey();
  
  if ((70 <= countdown <= 120)){
       showHeart(); 
    }
    p.text(`Moves Left: ${countdown}`, 20, 40);
    p.text(`Keys Collected: ${keyCount}`, 20, 70);
}


//-----------------------------------------------------------PLAY----------------------------------------------------------------------------
  
function playGame() {
  console.log("play function is running");
  // p.text(`Moves Left: ${countdown}`, 20, 40);
  // p.text(`Keys Collected: ${keyCount}`, 20, 40);
  showGirl();
  showTiger();
  
  
  // directions to start
    p.fill("orange");
    p.textSize(15);
    p.textFont(bitFont);

  }

function handleTime() {
  // what happens regarding the countdown of moves
  if (countdown < 1) {
    gameOver();
    p.noLoop();
  }
}

function handleCollision1(girlX, girlY, tigerX, tigerY) {
  // We'll write code for what happens if your character hits a coin.
  let hit = p.collideCircleCircle(girlX, girlY, 30, tigerX, tigerY, 40);
  return hit;
}

function handleCollision3(girlX, girlY, heartX, heartY){
   let hit = p.collideCircleCircle(girlX, girlY, 25, heartX, heartY, 27);
    return hit;
}


function handleCollision2(girlX, girlY, keyX, keyY) {
  // We'll write code for what happens if your character hits a coin.
  let hit = p.collideCircleCircle(girlX, girlY, 25, keyX, keyY, 27);
  return hit;
}



//------------------------------------RESTART ENTIRE GAME------------------------------------------------------------------
function restartEntireGame() {
  if (p.keyCode === p.ESCAPE) {
    backgroundColor = p.color("black");
    p.background(backgroundColor);
    welcomeScreen();   
    countdown = 150;
  } 
}
  

//------------------------------------------------------GAME OVER and CONGRATULATIONS FUNCTIONS--------------------------------------------------------------------
function gameOver(){
    backgroundColor = p.color("black");
    p.background(backgroundColor);  
    
    p.strokeWeight(10);
    p.stroke("white");
    p.fill("orange");
    p.textSize(50);
    p.textFont(bitFont);
    p.text("GAME OVER!", 50, 225);
  
    p.fill("orange");
    p.textSize(20);
    p.textFont(bitFont);
    p.text("WANT TO PLAY AGAIN?", 105, 325);
  
   // restartEntireGame();
    
}

function congratulations(){
  
  backgroundColor = p.color("black");
    p.background(backgroundColor);  
   
    p.strokeWeight(10);
    p.stroke("white");
  
    p.fill("orange");
    p.textSize(30);
    p.textFont(bitFont);
    p.text("CONGRATULATIONS", 90, 150);
  
    p.fill("orange");
    p.textSize(30);
    p.textFont(bitFont);
    p.text("WONDERFUL JOB!", 45, 325);
}



//-----------------------------------------------------POSSIBLY USEFUL PSEUDOCODE--------------------------------------------------------
/*-----------------------------------------------------BUTTONS --------------------------------------------------------
function buttons(){
  rulesRect = new p.Clickable();     
  rulesRect.locate(20, 20);       
  rulesRect.onPress = function(){  
  this.color = "#AAAAFF";       
}
}*/
/*function keyPressed(){
  console.log("keyIsPressed has run");
  // we have to play-test this because i just realized that even if the person is playing and accidentally presses any of these buttons they will be taken to the other level so 
  // TODO: add more conditionals to check for if the game is ongoing somehow
  
  if (p.keyCode === p.ENTER){
    // go to level one
    levelOne();
    
  } else if (p.keyCode === keyOne){  
    // go to jungle by pressing 1
    jungleOption();
  } else if (p.keyCode === keyTwo){
    // go to park by pressing 2
    parkOption();
  } else if (p.keyCode === p.RIGHT_ARROW){
    girlX += girlVelocity;
  } else if (p.keyCode === p.LEFT_ARROW){
    girlX -= girlVelocity;
  } 
  // return false;
}*/
/*--------------------------------------WORLD SELECTION--------------------------------------------------------------------------------------------
function noWorldSelected() {
  //TODO: make a function that is the "else" for keyCode presses 49/50 because if one world is selected, we don't want to restart level one, we just want to show a message that says to press either 1 or 2
  if (welcomeScreen()){
      console.log("noWorldSelected has run");
    p.fill("orange");
    p.textSize(15);
    p.textFont(bitFont);
    p.text("Choose your next adventure.", 50, 100);
  //text says:  choose your next adventure
}
      
      }*/
/*--------------------------------------------DRAW GROUND---------------------------------------------------------------------------------
function drawGround(){
  p.fill('black');
  p.noStroke();
  p.rect(0, p.height - groundHeight, p.width, groundHeight);
}*/
/*-----------------------------------------------------WORLD SELECTION--------------------------------------------------------
function worldSelectionPanel() {
  // how it looks.
  p.fill("black");
  p.background("black");
  // conditionals to show each world
  if (p.keyCode === 51) {
    backgroundColor = p.color("black");
    p.background(backgroundColor);
    jungleOption();
  } 
  else if (p.keyCode === 52) {
    backgroundColor = p.color("black");
    p.background(backgroundColor);
    parkOption();
  } 
}*/
/*if (p.keyCode === keyOne){  
    // go to jungle by pressing 1
    jungleOption();
  } else if (p.keyCode === keyTwo){
    // go to park by pressing 2
    parkOption();
  }*/
/*
//----------------------------JUNGLE OPTION FUNCTION-----------------------------------------------------------------------------------------
function jungleOption() {
  console.log("jungleOption has run");
  // if the rectangle is clicked then do what is below:
  p.image(jungleBackground, 0, 0, 600, 400);
  play();
}

//-------------------------------PARK OPTION FUNCTION--------------------------------------------------------------------------------------------
function parkOption() {
  console.log("parkOption has run");
  // if the rectangle is clicked then do what is below:
  p.image(parkBackground, 0, 0, 600, 400);
  play();
}
*/