//global
//var size = 1 + Math.floor(innerWidth / 350);
var size = 20;
var rows = 30;
var velocityX = 0;
var velocityY = 0;
var headX = size*4; //pos X
var headY = size*4; //pos Y
var frameRate = 150; 
var Myupdate;
var FoodUpdate;
var picCounter = 0;
var RandomFoodX = 0;
var RandomFoodY = 0;
var Snakebody = [];
var gameOver = false
var score = 0;
var times = 0;
var Blur = 0;
var dir = 0;



//Onload
function init() {
    var canvas = document.getElementById('MyCanvas');
    canvas.width = size * rows;
    canvas.height = size * rows;
    setTimeout(SwitchMusic, 2500, 'START');
    CreateSnakeHead();
    PlaceFood();


    //set event
    document.onkeydown = KeyPress;
    Myupdate = setInterval(update, frameRate);
    

   
}

//event key pressed 
function KeyPress(e) {
    e = e || window.event;
 

    if (e.keyCode == '38' && velocityY!=1) {
        // up arrow
        velocityY = -1;
        velocityX = 0;
        dir=1
    }
    else if (e.keyCode == '40' && velocityY != -1) {
        // down arrow
        velocityY = 1;
        velocityX = 0;
        dir = 3


    }
    else if (e.keyCode == '37' && velocityX != 1) {
        // left arrow
        velocityX = -1;
        velocityY = 0;
        dir = 4

    }
    else if (e.keyCode == '39' && velocityX != -1) {
        // right arrow
        velocityX = 1;
        velocityY = 0;
        dir = 2

    }

}

//creating head of snake mabey later will be randomly
function CreateSnakeHead() {
    var canvas = document.getElementById('MyCanvas');
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#00cc00";
    ctx.fillRect(headX, headY, size, size);


   
    
    //pos of the food
    RandomFoodX = (Math.floor(Math.random() * rows)) * size;
    RandomFoodY = (Math.floor(Math.random() * rows)) * size;
}

//place the food withot changing the random coords
function PlaceFood() {
  
    var canvas = document.getElementById('MyCanvas');
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "Gold";

    ctx.fillRect(RandomFoodX, RandomFoodY, size, size);

}

//this is the interval evety frame rate is fired
function update() {
    //game over 2 senerio *out of bounds *eat himself
    if (gameOver) {
        document.getElementById('Score').innerHTML = `Score: ${score}`
        document.getElementById('Lose').play();
        document.getElementById('Ohh').play();
        setTimeout(PlayCry, 2500);
        $('#GameOverCon').fadeIn(2500);
        clearInterval(Myupdate);
        return;
    }

    var canvas = document.getElementById('MyCanvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //eat Food seniro
    if (RandomFoodX == headX && RandomFoodY == headY) {
        ctx.shadowColor = "Gold";
        Blur += 10;
        ctx.shadowBlur = Blur;
        document.getElementById('Bite').play();
        Snakebody.push([RandomFoodX, RandomFoodY]);
        RandomFoodX = (Math.floor(Math.random() * rows)) * size;
        RandomFoodY = (Math.floor(Math.random() * rows)) * size;
        score += 10;
        document.getElementById('realScore').innerHTML=`Score: ${score}`
        frameRate -= 5;
        if (frameRate<60) {
            frameRate = 60;
        }
        clearInterval(Myupdate);
        Myupdate = setInterval(update, frameRate);
    }
    else {
        ctx.shadowBlur = 0;
    }
    PlaceFood();




    //Render Snake body+Head
    for (var i = Snakebody.length - 1; i > 0; i--) {
        Snakebody[i] = Snakebody[i - 1];
    }
    if (Snakebody.length) {
        Snakebody[0] = [headX, headY];
        
    }

    ctx.fillStyle = "#00cc00";
    headX += velocityX * size;
    headY += velocityY * size;
    ctx.fillRect(headX, headY, size, size);
    for (var i = 0; i < Snakebody.length; i++) {
        ctx.fillRect(Snakebody[i][0], Snakebody[i][1], size, size);
    }
    if (dir==1) {
        //up eyes
        ctx.fillStyle = "black";
        ctx.fillRect(headX + size - 6, headY - 2, 6, 6);
        ctx.fillRect(headX + 1, headY - 2, 6, 6);
        //up eyes
        ctx.fillStyle = "white";
        ctx.fillRect(1+headX + size - 6,1+ headY - 2, 2, 3);
        ctx.fillRect(1 + headX + 1, 1 + headY - 2, 2, 3);




    }
    else if (dir==3) {
        //down eyes
        ctx.fillStyle = "black";
        ctx.fillRect(headX + size - 6, headY + size - 2, 6, 6);
        ctx.fillRect(headX + 1, headY + size - 2, 6, 6);
        //down eyes
        ctx.fillStyle = "white";
        ctx.fillRect(1+headX + size - 6, 1+headY + size - 2, 2, 3);
        ctx.fillRect(1+headX + 1,1+ headY + size - 2, 2, 3);
    }
    else if (dir==4) {
        //left eyes
        ctx.fillStyle = "black";
        ctx.fillRect(headX + - 2, headY + size / 10, 6, 6);
        ctx.fillRect(headX + - 2, headY + size - 6, 6, 6);

        //left eyes
        ctx.fillStyle = "white";
        ctx.fillRect(1+headX + - 2,1+ headY + size / 10, 2, 3);
        ctx.fillRect(1+headX + - 2,1+ headY + size - 6, 2, 3);
    }
    else  {
       
        //right eyes
        ctx.fillStyle = "black";
        ctx.fillRect(headX + size - 2, headY + size / 10, 6, 6);
        ctx.fillRect(headX + size - 2, headY + size - 6, 6, 6);
        //right eyes
        ctx.fillStyle = "white";
        ctx.fillRect(headX + size - 2+1, 1+headY + size / 10, 2, 3);
        ctx.fillRect(headX + size - 2+1, 1+headY + size - 6, 2, 3);
    }
    


  




   



    //check condition of losing
    if (headX < 0 || headX > (size * rows)-size || headY < 0 || headY > (size * rows)-size) {
        gameOver = true;
    }
    for (var i = 0; i < Snakebody.length; i++) {
        if (headX==Snakebody[i][0] && headY==Snakebody[i][1]) {
            gameOver = true;
        }
    }
   
   

}

//sounds functions
function PlayCry() {
    document.getElementById('Cry').play();
}

//just reload the game
function Again() {

    location.reload();
}


//switch function for the music 
function SwitchMusic(id) {
    if (id =='on') {
        document.getElementById('SoundDivIcon').innerHTML = `<img id="off" onclick="SwitchMusic(this.id)" src="img/soundoff.png"/>`;
        document.getElementById('music').pause();
    }
    else {
        document.getElementById('SoundDivIcon').innerHTML = `<img id="on" onclick="SwitchMusic(this.id)" src="img/soundon.png"/>`;
        document.getElementById('music').volume = '0.5';
        document.getElementById('music').play();
    }
}


