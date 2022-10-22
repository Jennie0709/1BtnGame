// ** Please play the game on the full screen. & Before start the game, you should click the screen. **//
// It's a game that astronauts remove trash with guns to protect the moon. //
// © Jennie Yang 2022 //

let myFont;
let soundIntro;
let soundStart;
let soundOver;
let imgHuman;
let imgMoon;

let bullets = [];
let enemies = [];
let score = 0;

var Gamemode;

// Load my font, image.. etc.
function preload(){ 
  myFont = loadFont('DungGeunMo.otf'); 

  imgHuman = loadImage('Human.png');
  imgMoon = loadImage('Groud.png');

  soundFormats('mp3', 'ogg');
  soundIntro = loadSound('Game_Intro.mp3');
  soundStart = loadSound('Game_Start.mp3');
  soundOver = loadSound('Game_over.mp3');
}

function setup(){
  soundIntro.play();
  Gamemode = 0; 
  textFont(myFont);
  createCanvas(windowWidth, windowHeight);
  // Spawn enemies
  for (let i = 0; i < 10; i++){
    let enemy = {
      x: random(0, width),
      y: random(-800, 0)
    }
    enemies.push(enemy)
  }
}

function draw(){
  clear();
  // Before start a game 
  if (Gamemode == 0){  
    background(0);

    fill('rgb(0,255,0)');
    textSize(windowWidth * 0.03);
    text('👾 Press enter to start 👾', 600, 500);  

    fill('rgb(0,255,0)');
    textSize(windowWidth * 0.02);     
    text('© Jennie Yang 2022', 770, 600);                                                                                                                                 
  }

  // Start a game
  if (Gamemode == 1){ 
    background(0);
    rectMode(CENTER)

    // Player, Ground image
    image(imgMoon, -600, 800, 3000);
    image(imgHuman, mouseX, height - 450, 200);

    // Bullets
    for (let bullet of bullets){
      bullet.y -= 5 // Bullet Speed
      fill('rgb(0,255,0)');
      circle(bullet.x, bullet.y, 10) // Bullet Design
    }

    //Trash
    for (let enemy of enemies){
      enemy.y += 1
      fill(random(360), random(100), random(100));
      rect(enemy.x, enemy.y, 15) // Enemy Design
      fill(255);
      if (enemy.y > height){
        text("You couldn't protect the moon...🌕", windowWidth/2, windowHeight/2)
        noLoop()
        soundStart.stop();
        soundOver.play();
      }
    }

    //Collisons
    for (let enemy of enemies){
      for (let bullet of bullets){
        if(dist(enemy.x, enemy.y, bullet.x, bullet.y) < 10){
          enemies.splice(enemies.indexOf(enemy), 1) // Get rid of 1 enemy
          bullets.splice(bullets.indexOf(bullet), 1) // Get rid of 1 bullet
          
          for (let i = 0; i < 10; i++){
          let newEnemy = {
              x: random(0, width),
              y: random(-800, 0)
            }
          enemies.push(newEnemy);
          score += 1
          }
        }
      }
    } 

    // Score
    fill(255);
    text(score, 50, 50) 
  }
}

// Game Sound change
function keyPressed(){
  if (keyCode === ENTER){
    Gamemode = 1;
    soundStart.play();
    soundIntro.stop(); 
  }
}

// Spawn a bullet when the user clicks
function mousePressed(){
  let bullet = {
    x: mouseX, 
    y: height - 450
  }
  bullets.push(bullet)
}