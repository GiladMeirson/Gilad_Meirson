//global
var Hcan = window.innerHeight / 1.5 + window.innerHeight / 5;
var Wcan = window.innerWidth / 1.5;
var TriInterval;
var StartPoint = {};
var points100Arr = [];


//setup canvas etc..
function init() {
    var canvas = document.getElementById("MyCan");
    //canvas.style.width = window.innerWidth /1.5 + 'px';
    //canvas.style.height = window.innerHeight / 1.5 + window.innerHeight / 5 + 'px';
    StartPoint = GenrateRandomPoint();//must be a global

    canvas.width = Wcan
    canvas.height = Hcan

}

//just to print the distance
function RenderRange(val) {
    document.getElementById("Pdis").innerHTML = `Set the distance : ${val}`;
}

function RenderRange2(val) {
    document.getElementById("Ppoint").innerHTML = `How many points per 100ms : ${val}`;
    

}

//get number of kodkods and draw it wire to list input
function DrawShape(kod) {
    if (kod == 3) {
        startTriangle();
    }
    else if (kod == 4) {
        startSquer();
    }
    else if (kod == 5) {
        startPentagon();
    }
    else if (kod==6) {
        startHexagon();
    }
    else if (kod == 7) {
        startHeptagon();
    }
    else if (kod==8) {
        startOctagon();
    }
    else if (kod==9) {
        startNonagon();
    }
    else if (kod==10) {
        startDecagon();
    }
    else if (kod==100||kod==50||kod==500||kod==1000) {
         points100Arr = DrawCircle(kod);
    }

}

//for draw  shapes
function startTriangle() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    //ctx.font = "45px ariel";
    //ctx.fillText("A", Wcan / 2 - 12, Hcan / 6 - 50);
    //ctx.fillText("B", Wcan / 2 + 220, Hcan / 5 + 360);
    //ctx.fillText("C", Wcan / 2 - 250, Hcan / 5 + 360);
    //ctx.lineWidth = 6;
    ctx.moveTo(Wcan / 2, Hcan / 12);
    ctx.lineTo(Wcan / 2 + 250, Hcan / 5 + 400)
    ctx.lineTo(Wcan / 2 - 250, Hcan / 5 + 400)
    ctx.closePath();
    ctx.stroke();
}
function startSquer() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    //ctx.font = "45px ariel";
    //ctx.fillText("A", Wcan / 3 - 50, Hcan / 5);
    //ctx.fillText("C", Wcan / 2 + 185, Hcan / 5 + 360);
    //ctx.fillText("B", Wcan / 2 + 185, Hcan / 5);
    //ctx.fillText("D", Wcan / 3 - 50, Hcan / 5 + 360);
    //ctx.lineWidth = 6;
    ctx.strokeRect(Wcan / 3, Hcan / 5, Wcan / 3, Wcan / 3);
    ctx.closePath();
    ctx.stroke();
}
function startPentagon() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    ctx.font = "45px ariel";
    ctx.moveTo(Wcan / 4, Hcan / 3); //A
    ctx.lineTo(Wcan / 4 + 250, Hcan / 10) //B
    ctx.lineTo(Wcan / 4 + 500, Hcan / 3) //C
    ctx.lineTo(Wcan / 4 + 375, Hcan / 3 + 290) //D
    ctx.lineTo(Wcan / 4 + 125, Hcan / 3 + 290) //E


 


   
    ctx.closePath();
    ctx.stroke();


}
function startHexagon() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    ctx.font = "45px ariel";
    ctx.moveTo(Wcan / 2 , Hcan / 12); //A
    ctx.lineTo(Wcan / 2 + 200, Hcan / 12 + 150) //B
    ctx.lineTo(Wcan / 2 + 200, Hcan / 12 + 360) //C
    ctx.lineTo(Wcan / 2, Hcan / 12 + 510) //D
    ctx.lineTo(Wcan / 2 - 200, Hcan / 12 + 360) //E
    ctx.lineTo(Wcan / 2 - 200, Hcan / 12 + 150) //F


    ctx.closePath();
    ctx.stroke();
}
function startOctagon() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    ctx.font = "45px ariel";
    ctx.moveTo(Wcan / 2, Hcan / 12); //A
    ctx.lineTo(Wcan / 2 + 200, Hcan / 12 + 75) //B
    ctx.lineTo(Wcan / 2 + 290, Hcan / 12 + 230) //C
    ctx.lineTo(Wcan / 2 + 180, Hcan / 12 + 430) //D
    ctx.lineTo(Wcan / 2 - 180, Hcan / 12 + 430) //E
    ctx.lineTo(Wcan / 2 - 290, Hcan / 12 + 230) //F
    ctx.lineTo(Wcan / 2 - 200, Hcan / 12 + 75) //G








    ctx.closePath();
    ctx.stroke();
}
function startHeptagon() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    ctx.font = "45px ariel";
    ctx.moveTo(Wcan / 2, Hcan / 12); //A
    ctx.lineTo(Wcan / 2 + 200, Hcan / 12 + 75) //B
    ctx.lineTo(Wcan / 2 + 290, Hcan / 12 + 230) //C
    ctx.lineTo(Wcan / 2 + 180, Hcan / 12 + 430) //D
    ctx.lineTo(Wcan / 2 - 180, Hcan / 12 + 430) //E
    ctx.lineTo(Wcan / 2 - 290, Hcan / 12 + 230) //F
    ctx.lineTo(Wcan / 2 - 200, Hcan / 12 + 75) //G








    ctx.closePath();
    ctx.stroke();
}
function startOctagon() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    ctx.font = "45px ariel";
    ctx.moveTo(Wcan / 2, Hcan / 12); //A
    ctx.lineTo(Wcan / 2 + 200, Hcan / 12 + 75) //B
    ctx.lineTo(Wcan / 2 + 290, Hcan / 12 + 230) //C
    ctx.lineTo(Wcan / 2 + 200, Hcan / 12 + 430) //D
    ctx.lineTo(Wcan / 2, Hcan / 12 + 520) //?
    ctx.lineTo(Wcan / 2 - 200, Hcan / 12 + 430) //E
    ctx.lineTo(Wcan / 2 - 290, Hcan / 12 + 230) //F
    ctx.lineTo(Wcan / 2 - 200, Hcan / 12 + 75) //G








    ctx.closePath();
    ctx.stroke();
}
function startNonagon() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    
    ctx.moveTo(Wcan / 2, Hcan / 12); //A
    ctx.lineTo(Wcan / 2 + 200, Hcan / 12 + 75) //B
    ctx.lineTo(Wcan / 2 + 290, Hcan / 12 + 230) //C
    ctx.lineTo(Wcan / 2 + 250, Hcan / 12 + 390) //?

    ctx.lineTo(Wcan / 2 + 120, Hcan / 12 + 500) //D
    ctx.lineTo(Wcan / 2 - 120, Hcan / 12 + 500) //E

    ctx.lineTo(Wcan / 2 - 250, Hcan / 12 + 390) //?
    ctx.lineTo(Wcan / 2 - 290, Hcan / 12 + 230) //F
    ctx.lineTo(Wcan / 2 - 200, Hcan / 12 + 75) //G

    ctx.closePath();
    ctx.stroke();




}
function startDecagon() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    ctx.font = "45px ariel";
    ctx.moveTo(Wcan / 2, Hcan / 25); //A
    ctx.lineTo(Wcan / 2 + 260, Hcan / 12 + 30) //B
    ctx.lineTo(Wcan / 2 + 400, Hcan / 12 + 200) //C
    ctx.lineTo(Wcan / 2 + 340, Hcan / 12 + 370) //D
    ctx.lineTo(Wcan / 2 + 200, Hcan / 12 + 500) //??

    ctx.lineTo(Wcan / 2, Hcan / 12 + 560) //?

    ctx.lineTo(Wcan / 2 - 200, Hcan / 12 + 500) //??
    ctx.lineTo(Wcan / 2 - 340, Hcan / 12 + 370) //E
    ctx.lineTo(Wcan / 2 - 400, Hcan / 12 + 200) //F
    ctx.lineTo(Wcan / 2 - 260, Hcan / 12 + 30) //G








    ctx.closePath();
    ctx.stroke();
}
//for large numbers of vertices 100+
function DrawCircle(kod) {

    var pointsArr = []
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    Clear();
    clearCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);

    for (var i = 0; i < kod; i++) {
        var angle = 2 * Math.PI * Math.random();
        var x = Wcan / 5 * Math.cos(angle) + Wcan / 2;
        var y = Wcan / 5 * Math.sin(angle) + Hcan / 2;
        var point = {};
        point.x = x;
        point.y = y;
        pointsArr.push(point);
        DrawPixel(x, y);
    }

    return pointsArr;
}


//genrate random point mostly in the center of the screen
function GenrateRandomPoint() {
    //Wcan / 3, Hcan / 5 left top
    //Wcan / 3, Wcan / 3 wisth height

    var point = {};
    var X = Wcan / 3 + Math.random() * (Wcan / 3);
    var Y = Hcan / 5 + (Wcan / 3) * Math.random();
    point.x = X;
    point.y = Y;
    return point;

}

//wire to Start button
function Starting() {
    Clear();
    clearCanvas();
   
    var kod = document.getElementById('vertices').value;
    if (kod==0) {
        alert("Please choose number of vertices ");
        return;
    }
   

    TriInterval = setInterval(Begin, 101, kod)
}

//wire to the interval for dtawing with some velocity
function Begin(kod) {
    var Hertz = document.getElementById("vel").value; //hetz is the amount of point
    Hertz = parseInt(Hertz);
    var dis = document.getElementById("dis").value; //the part of the line ratio
    dis = parseFloat(dis);

    //if its triangle
    if (kod == 3) {
        for (var i = 0; i < Hertz; i++) {

            var rand = 1 + Math.floor(Math.random() * 3) //1 ||2 || 3 
            if (rand == 1) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2) - StartPoint.x) * dis + StartPoint.x;
                NextPoint.y = ((Hcan / 12) - StartPoint.y) * dis + StartPoint.y;
                DrawPixel(NextPoint.x, NextPoint.y, rand);
                StartPoint = NextPoint;

            }
            else if (rand == 2) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 250) - StartPoint.x) * dis + StartPoint.x;
                NextPoint.y = ((Hcan / 5 + 400) - StartPoint.y) * dis + StartPoint.y;
                DrawPixel(NextPoint.x, NextPoint.y, rand);
                StartPoint = NextPoint;
            }
            else if (rand==3) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 250) - StartPoint.x) * dis + StartPoint.x;
                NextPoint.y = ((Hcan / 5 + 400) - StartPoint.y) * dis + StartPoint.y;
                DrawPixel(NextPoint.x, NextPoint.y, rand);
                StartPoint = NextPoint;
            }
           
        }


    }
    else if (kod==4) {
        for (var i = 0; i < Hertz; i++) {

            var rand = 1 + Math.floor(Math.random() * 4) //1 ||2 || 3 
            if (rand == 1) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 3) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 5) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y, rand);
                StartPoint = NextPoint;

            }
            else if (rand == 2) {
                var NextPoint = {};
                NextPoint.x = ((Wcan * 2 / 3) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 5) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y, rand);
                StartPoint = NextPoint;
            }
            else if (rand == 3) {
                var NextPoint = {};
                NextPoint.x = ((Wcan * 2 / 3) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 5 + Wcan / 3) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y, rand);
                StartPoint = NextPoint;
            }
            else if (rand == 4) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 3) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 5 + Wcan / 3) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y, rand);
                StartPoint = NextPoint;
            }

        }
    }
    else if (kod == 5) {
        for (var i = 0; i < Hertz; i++) {

            var rand = 1 + Math.floor(Math.random() * 5) //1 ||2 || 3 
            if (rand == 1) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 4 ) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 3) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;

            }
            else if (rand == 2) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 4 + 250) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 10) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 3) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 4 + 500) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 3) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 4) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 4 + 375) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 3 + 290) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

            else if (rand == 5) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 4 + 125) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 3 + 290) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

        }
    }
    else if (kod == 6) {
        for (var i = 0; i < Hertz; i++) {

            var rand = 1 + Math.floor(Math.random() * 6) //1 ||2 || 3 
            if (rand == 1) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;

            }
            else if (rand == 2) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 150) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 3) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 360) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 4) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 510) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

            else if (rand == 5) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 360) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 6) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 150) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

        }
    }

    else if (kod == 7) {
        for (var i = 0; i < Hertz; i++) {

            var rand = 1 + Math.floor(Math.random() * 7) //1 ||2 || 3 
            if (rand == 1) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;

            }
            else if (rand == 2) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 75) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 3) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 290) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 230) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 4) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 180) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 430) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

            else if (rand == 5) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 180) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 430) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 6) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 290) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 230) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 7) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 75) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

        }
    }

    else if (kod==8) {
        for (var i = 0; i < Hertz; i++) {

            var rand = 1 + Math.floor(Math.random() * 8) //1 ||2 || 3 
            if (rand == 1) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;

            }
            else if (rand == 2) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 75) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 3) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 290) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 230) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 4) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 430) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

            else if (rand == 5) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 430) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 6) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 290) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 230) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 7) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 75) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 8) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 ) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 520) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

        }
    }

    else if (kod == 9) {
        for (var i = 0; i < Hertz; i++) {

            var rand = 1 + Math.floor(Math.random() * 9) //1 ||2 || 3 
            if (rand == 1) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;

            }
            else if (rand == 2) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 75) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 3) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 290) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 230) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 4) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 120) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 500) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

            else if (rand == 5) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 120) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 500) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 6) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 290) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 230) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 7) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 75) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 8) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 250) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 390) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 9) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 250) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 390) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

        }
    }

    else if (kod == 10) {
        for (var i = 0; i < Hertz; i++) {

            var rand = 1 + Math.floor(Math.random() * 10) //1 ||2 || 3 
            if (rand == 1) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 25) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;

            }
            else if (rand == 2) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 260) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 30) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 3) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 400) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 200) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 4) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 340) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 370) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

            else if (rand == 5) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 340) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 370) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 6) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 400) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 200) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 7) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 260) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 30) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }
            else if (rand == 8) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 560) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

            else if (rand == 9) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 + 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 500) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

            else if (rand == 10) {
                var NextPoint = {};
                NextPoint.x = ((Wcan / 2 - 200) - StartPoint.x) * dis + StartPoint.x; //x
                NextPoint.y = ((Hcan / 12 + 500) - StartPoint.y) * dis + StartPoint.y; //y
                DrawPixel(NextPoint.x, NextPoint.y);
                StartPoint = NextPoint;
            }

        }
    }



    else if (kod == 100 || kod == 50 || kod == 500 || kod == 1000) {
        for (var i = 0; i < Hertz; i++) {
            var rand = 1 + Math.floor(Math.random() * kod) //1 ||2 || 3 
            var NextPoint = {};
            NextPoint.x = ((points100Arr[rand].x) - StartPoint.x) * dis + StartPoint.x; //x
            NextPoint.y = ((points100Arr[rand].y) - StartPoint.y) * dis + StartPoint.y; //y
            DrawPixel(NextPoint.x, NextPoint.y);
            StartPoint = NextPoint;

        }
    }

}

//simple just get x,y and draw 1 pixel
function DrawPixel(x, y,rand) {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (randomColor.length<6) {
        randomColor += Math.floor(Math.random() * 16).toString(16);
    }
    if (document.getElementById("checkColor").checked == true && document.getElementById("checkColor2").checked == false) {
        ctx.strokeStyle = '#'+randomColor;
    }
    if (document.getElementById("checkColor2").checked == true && document.getElementById("checkColor").checked == false) {
        if (rand==1) {
            ctx.strokeStyle = '#ff0000';
        }
        else if (rand==2) {
            ctx.strokeStyle = '#00E600';
        }
        else if (rand==3) {
            ctx.strokeStyle = '#0000ff';
        }
        else if (rand==4) {
            ctx.strokeStyle = '#ffff00';
        }
        else {
            ctx.strokeStyle = '#000000';
        }
    }
    else if ((document.getElementById("checkColor2").checked == true && document.getElementById("checkColor").checked == true) || (document.getElementById("checkColor2").checked == false && document.getElementById("checkColor").checked == false)) {
        ctx.strokeStyle = '#000000';
    }
    
    ctx.strokeRect(x, y, 1, 1);
    ctx.closePath();
    ctx.stroke();
}

//for clear the interval 
function Clear() {
    clearInterval(TriInterval);
}
function clearCanvas() {
    var canvas = document.getElementById("MyCan");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.clearRect(0, 0, Wcan, Hcan);
    Clear(); // the interval
}

//wire to Print button
function printing() {

    window.print();
}



