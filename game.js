import kaboom from "https://unpkg.com/kaboom@2000.0.0-beta.23/dist/kaboom.mjs";
import { newgroundsPlugin } from "https://unpkg.com/newgrounds-boom@1.1.1/src/newgrounds.mjs";

// Ka-Boom !!!!!!!!!!!!

kaboom({
    width: 711,
    height: 400,
    canvas: document.getElementById("game"),
    plugins: [newgroundsPlugin],
    background: [ 0, 186, 255, ],
});

//Access Newgrounds app id
ngInit(APP ID, ENCRYPTION ID, 1);

//Sprites and sounds
loadSprite("spongebob", "sprites/spongebob.png");
loadSprite("spongepls", "sprites/spongepls.png");
loadSprite("goku", "sprites/goku.png");
loadSprite("bullet", "sprites/bullet.png");
loadSprite("credit", "sprites/credit.jpg");
loadSprite("ZAMN", "sprites/ZAMN.jpg");
loadSprite("krabby-patty", "sprites/krabby-patty.png");
loadSprite("super_idol", "sprites/super_idol.jpg");
loadSprite("easy", "sprites/baby.jpg");
loadSprite("medium", "sprites/strong.jpg");
loadSprite("hard", "sprites/hard.jpg");
loadSound("scream", "sounds/scream.mp3");
loadSound("munch", "sounds/munch.mp3");
loadSound("music", "sounds/music.mp3");
loadSound("super-idol", "sounds/super-idol.mp3");
loadSound("tick", "sounds/tick.wav");
loadSound("boom", "sounds/vine-boom.mp3");
loadSound("DamnDaniel", "sounds/DamnDaniel.mp3");
loadSound("UltraInstinct", "sounds/UltraInstinct.mp3");
loadSound("shoot", "sounds/shoot.mp3");
loadSound("break", "sounds/break.mp3");

//variables
const pos_x = 80;
const pos_y = 80;
var SPEED = 100;
var txtInput = "";
var superIdol = false;
var isFullScreen = false;
var pattyCount = 0;
const mapHeight = 19;
const mapWidth = 32;
var mapping = [];
var intensity = 2.5;
var broke = false;
/*
UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT and press ENTER while in game to get secret medal 
*/
const activation = "wwssadad";

//layers (spongebob in front)
layers([
    "patty",
    "goku",
    "spongebob",
], "game");

//Set difficulty
scene("startUp", () => {
  //fullscreen
  screen();
  //Text
  add([
    text("Hi " + String(ngUsername()) + "!\nSelect your intensity\nusing the left/right keys.\nPress Enter to continue.",{size: 20, font: "sinko"}),
    pos(130,100),
  ]);
  //Difficulty text
var diff = add([
    text(intensity,{size: 30, font: "sinko"}),
    pos(270,210),
  ]);
  updatePic("spongebob",0.6,220);
  //Left to decrease difficulty Right to increase
  keyPress('left', () => {
    if (intensity > 1){
      intensity-=0.1;
      diff.text = (Math.ceil(intensity*10))/10;
      play("tick");
      //Change pics
      switch (diff.text){
      case 2.1:
        updatePic("easy",0.4,220); break; 
      case 4.9:
        updatePic("medium",0.4,220); break;
      case 1.2:
        updatePic("ZAMN",0.4,160); play("DamnDaniel"); break;
      case 1.1:
        updatePic("easy",0.4,240); break;
      case 2.2:
        updatePic("spongebob",0.6,220); break;
      case 3.7:
        updatePic("spongebob",0.6,220); break;
      }
    }
  });
  keyPress('right', () => {
    if (intensity < 4.9){
    intensity+=0.1;
    diff.text = (Math.ceil(intensity*10))/10;
    play("tick");
    //Change pics
    switch (diff.text){
      case 3.8:
        updatePic("medium",0.4,220); break;
      case 5:
        updatePic("hard",0.25,220); play("boom"); break;
      case 4.9:
        updatePic("medium",0.4,220); break;
      case 1.2:
        updatePic("ZAMN",0.4,160); play("DamnDaniel"); break;
      case 1.3:
        updatePic("easy",0.4,220); break;
      case 2.2:
        updatePic("spongebob",0.6,220); break;
      }
    }
  });
keyPress('enter', () => {
    go("game");
    console.log(intensity);
    });
});

//Playing the game
scene("game", () => {
screen();

//Create the krabby patty map
for (let i = 0; i <= mapHeight; i++){
  mapping.push('');
  for (let j = 0; j <= mapWidth; j++){
    if (((Math.random() * 5)) >= intensity){
      mapping[i] += " ";
    }
    else{
      mapping[i] += "k";
      pattyCount++;
    }
  }
}
console.log(mapping);
console.log(pattyCount);

//insert the map
const map = addLevel(mapping,
{
  width: 20,
  height: 20,
  "k": () => [
        sprite("krabby-patty"),
        layer("patty"),
        area(),
        solid(),
        scale(0.1),
        'patty'
    ],
});

//Add player (spongebob)
var player = add([
	sprite("spongebob"),
  layer("spongebob"),
  scale(0.3),
  area(),
  pos(pos_x,pos_y),
  'spongebob',
]);
focus
//Ultra Instinct
const music = play("UltraInstinct", {loop: true});


//Add goku
var goku = add([
        sprite("goku"),
        layer("goku"),
        area(),
        scale(0.375),
        pos(445,200),
        'goku',
    ]);


//Directions
var dirs = {
  "w": UP,
  "a": LEFT,
  "s": DOWN,
  "d": RIGHT,
};

//Move
for (const dir in dirs) {
  keyDown(dir, () => {
    player.move(dirs[dir].scale(SPEED/(0.36*intensity)));
  });
}

//Timer start
var startTime = Date.now();

//Goku movement
var min = -20;
var max = 30
var mList = [130 + rand(min,max),
             180 + rand(min,max),
             325 + rand(min,max),
             410 + rand(min,max)];
console.log(mList);
const GSS = 9;
var m = 0;
action('goku', (goku) => {
  if (m <= mList[0]){
  goku.move(LEFT.scale(SPEED - GSS));
  m++;
  //console.log("L");
  }
  if (m > mList[0] && m <= mList[1]){
    goku.move(UP.scale(SPEED - GSS));
    m++;
    //console.log("U");
  }

  //Acive shooter
  if (m % (parseInt(Math.random()*200 + 60)) == 0){
    let bullet = add([
		pos(goku.pos),
		move(Math.arctan(player.pos/goku.pos).unit(), SPEED*1.7),
		sprite("bullet"),
		area(),
    cleanup(),
    scale(0.47-(1/16*(Math.abs(3.75-intensity)))),
		origin("center"),
		"bullet",
	  ]);
    play("shoot");
    //console.log("BULLET");
  }
  //Mix up controls (break)
  if (intensity > 4.9){
    if (m % (parseInt(Math.random()*200 + 90)) == 0){
      play("break");
      if (broke){
        broke = false;
        dirs = {"w": UP, "a": LEFT, "s": DOWN, "d": RIGHT};
      }
      else{
        broke = true;
        dirs = {"w": DOWN, "a": RIGHT,"s": UP, "d": LEFT};
      }
    }
  }
  if (m > mList[1] && m <= mList[2]){
    goku.move(RIGHT.scale(SPEED - GSS));
    m++;
    //console.log("R");
  }
  if (m > mList[2] && m <= mList[3]){
    goku.move(DOWN.scale(SPEED - GSS));
    m++;
    //console.log("D");
  }
  if (m > mList[3]){
    m = 0;
    //console.log("RESET");
    mList = [120 + rand(min,max),
             200 + rand(min,max),
             345 + rand(min,max),
             410 + rand(min,max)];
    console.log(mList)
  }
  
 });


//Eat 
player.collides('patty', (p) => {
  destroy(p);
  play("munch");
  pattyCount--;
  //pattyCount = 0;
  if (pattyCount == 0){
    //End Timer
    var time = Date.now() - startTime
    ngPostScore(11131, time);
    //Win a game
    ngUnlockMedal(66436);
    destroy(goku);
    destroyAll("bullet");
    music.pause();
    add([
      text("SO MUCH WIN!!!"),
      pos(0,150),
      layer("spongebob"),
    ]);
    //Beat on intensity 5.0
    if (intensity > 4.9){
      add([
        text("Congratulations " + String(ngUsername()) + "! \nYou beat SpongebobGame on 5.0 intensity!\n \n-Nicolass22 (SpongeDev)",{size: 20, font: "sinko"}),
        pos(0,250),
        layer("spongebob"),
      ]);
      ngUnlockMedal(66479);
    }
    if (intensity > 1.1 && intensity < 1.3){
      add([text("ZAMN!!! You just got a new medal!",{size: 30}),pos(0,250),layer("spongebob")]);
      ngUnlockMedal(66480);
      }
      destroyAll('patty');
      play("music");
      SPEED = 600;
      superIdol = true;
  }
});

//Die when touch goku or bullet
player.collides('goku', () => {
  destroy(player);
  play("scream");
  music.pause();
  sleep(2100);
  location.reload();
});
player.collides('bullet', () => {
  destroy(player);
  play("scream");
  music.pause();
  sleep(2100);
  location.reload();
});

//Reload page
keyPress('r', () => {location.reload()});

//Input super idol cheat code
charInput((ch) => {

  if(!superIdol){
      txtInput += ch;

      for(let i = 0; i < txtInput.length; i++){
        if (txtInput != activation.substring(0,txtInput.length)){
          txtInput = "";
        }
      }
      if (txtInput == activation){
        keyPress('enter', () => {
          music.pause();
          destroyAll("bullet");
          console.log(txtInput);
          superIdol = true;   
          play("super-idol",{loop: true,});
          idol();
          destroy(player);
          destroy(goku);
          destroyAll('patty'); 
          add([
          text("SUPER IDOL\n\t\tACTIVATED"),
          pos(0,150),
          layer("spongebob"),
          ])
          player = add([sprite("spongepls"),
          layer("spongebob"),
          scale(0.3),
          area(),
          pos(pos_x,pos_y),
          'spongebob',
          ]);
          SPEED = 600;  
          ngUnlockMedal(66481);
      });
      }
      
      console.log(txtInput);
  }
});

});
go("startUp");



//Functions for stuff
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function idol(){

  add([sprite("credit"),
  pos(300,0),
  layer("spongebob"),
  scale(0.125),]);

  add([sprite("credit"),
  pos(150,230),
  layer("goku"),
  ,scale(0.125),
  ]);

  add([
    sprite("super_idol"),
    pos(100,0),
    layer("goku"),
    scale(0.5),
    ]);
}

function screen(){
keyPress("f", (c) => {
  if (!isFullScreen)
    isFullScreen = true;
  if (isFullScreen)
    isFullScreen = false;
    fullscreen(isFullScreen);
})
}

function updatePic(d,s,p){
  destroyAll('pic');
  add([
    sprite(d),
    pos(500,p),
    scale(s),
    'pic',
  ])
}

