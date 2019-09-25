//You can use the p5js library to create this project
//https://p5js.org/reference/
//here you can find all usefull functions, like keypressed()
//in short: the setup function is called once during setup
// the draw function is called 30 times per second

//A really good way to approach this project is by
// using "object constructors".
//if you get stuck take a look at:
// https://youtu.be/AaGK-fj-BAM

var s;
var scl = 20;

var apple;

function setup() {
  createCanvas(600, 600);
  //your code goes here
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  
  apple = createVector(floor(random(cols)), floor(random(rows)));
  apple.mult(scl);
}

function draw() {
  background(0);
  //and here
  Grid();
  if (s.eat(apple)) {
    pickLocation();
  }  
  s.update();
  s.show();
  s.death();
    
   fill(255, 0, 100);
   rect(apple.x, apple.y, scl, scl);
   s.score();     
    
    function Grid() {
        var cols = 20;
        var rows = 20;
        
        for (var i = 0; i <= width; i+= rows) {
            for (var j = 0; j <= height; j+= cols) {
                    fill('rgb(0,255,0)');
                    rect(i,j,scl,scl);
            }
        }
    }
}

function keyPressed() {
    if (s.total >= 1) {
        if ((keyCode === UP_ARROW) && (s.yspeed !== 1)) {
        s.dir(0, -1);   
        } else if ((keyCode === DOWN_ARROW) && (s.yspeed !== -1)) {
        s.dir(0, 1);   
        } else if ((keyCode === RIGHT_ARROW) && (s.xspeed !== -1)) {
        s.dir(1, 0);   
        } else if ((keyCode === LEFT_ARROW) && (s.xspeed !== 1)) {
        s.dir(-1, 0);   
        }
        } else {
        if (keyCode === UP_ARROW) {
         s.dir(0, -1);   
        } else if (keyCode === DOWN_ARROW) {
         s.dir(0, 1);   
        } else if (keyCode === RIGHT_ARROW) {
         s.dir(1, 0);   
        } else if (keyCode === LEFT_ARROW) {
         s.dir(-1, 0);   
        }
    }
    
}

//and here
function Snake() {
    this.x = 100;
    this.y = 200;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.dead = false;
    this.scr = 0;
    this.scr_text = 0;
    this.fontSize = 20;
    this.scoreX = 19;
    this.scoreY = 19;
    this.scoreWidth = 200;
    this.scoreHeight = 200;
    
    this.score = function() {
        if (this.scr >= 10000) {
          this.scr_text = this.scr; 
          fill(0); 
          console.log('Score: ' + this.scr_text); 
          textSize(this.fontSize); 
          text('Score: '+ this.scr_text, this.scoreX, this.scoreY, this.scoreWidth, this.scoreHeight);
        } else if ((this.scr >= 1000) && (this.scr <= 10000)) {
            this.cr_text = '0'+this.scr;
            fill(0); 
            console.log('Score: ' + this.scr_text);
            textSize(this.fontSize); 
            text('Score: '+ this.scr_text, this.scoreX, this.scoreY, this.scoreWidth, this.scoreHeight);
        } else if ((this.scr >= 100) && (this.scr <= 1000)) {
            this.scr_text = '00' + this.scr;
            fill(0);
            console.log('Score: ' + this.scr_text);
            textSize(this.fontSize); 
            text('Score: '+ this.scr_text, this.scoreX, this.scoreY, this.scoreWidth, this.scoreHeight);
        } else if ((this.scr >= 10) && (this.scr <= 100)) {
            this.scr_text = '000' + this.scr;
            fill(0);
            console.log('Score: ' + this.scr_text);
            textSize(this.fontSize); 
            text('Score: '+ this.scr_text, this.scoreX, this.scoreY, this.scoreWidth, this.scoreHeight);
        } else {
            this.scr_text = '00000';
            fill(0);
            console.log('Score: ' + this.scr_text);
            textSize(this.fontSize); 
            text('Score: '+ this.scr_text, this.scoreX, this.scoreY, this.scoreWidth, this.scoreHeight);
        }
               
    }
    
    this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {  
      this.total++;
      this.scr += 10;  
      return true;
    } else {
      return false;
    }
  }
    
    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
    
    this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.x = width/2;
        this.y = height/2;
        this.scr = 0;
        this.total = 0;
        this.tail = [];
      }
    } 
  }
    
    this.update = function() {
      for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
    }
    
    this.show = function() {
     fill(255)
     for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
    }
}