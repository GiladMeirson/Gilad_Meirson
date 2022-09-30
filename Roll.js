//global
var arrChips = [];
var x = 0;
var y = 0;
var count = 0;
var ID = 0;
var valid = false
var validSafty = true;
var userC = {};
var Game21 = {};
var chance = 0;
var bet = 0;
var LoseSw = true;

//setup settings 
function init() {
    if (localStorage['Game21'] != undefined) {
        Game21 = JSON.parse(localStorage['Game21'])
        userC = Game21[Game21.current];
        setTimeout(TRY, 3000);
        RenderUserDet();
        $('#Ui').fadeIn(5000);
    }
    else {
        Game21 = {};
    }
}

//call to the main
function TRY() {
    PlayPlaceyour();
    //setTimeout(PlayPlaceyour, 500);
    setTimeout(Main, 500);
   
}


//wire to each single area in html code
function ClickArea(id, coords) {
    arrChips.push(id);
    ID = id;
    valid = true;

}
//event listenr to catch click event
window.addEventListener('click', function () {
    if (valid == true && validSafty == true) {
        if (userC.money<=0) {
            this.alert('No money left')
            return;
        }
        var ph = document.getElementById("MapGame");
        count++;
        x = this.event.clientX;
        //arr.push(x)
        y = this.event.clientY;
        //arr.push(y);

        //money transactions
        userC.money -= 50;
        bet += 50;
        RenderUserDet()
        Game21[Game21.current] = userC;
        this.localStorage['Game21'] = JSON.stringify(Game21);


        this.document.getElementById("chipSound").play();
        ph.innerHTML += `<img id="${count}I" class="chips" src="img/chip2.png" />`
        document.getElementById(`${count}I`).style.left = x - 20 + 'px';
        document.getElementById(`${count}I`).style.top = y - 20 + 'px';
        valid == false;
    }


});

//the main function  gives an order
function Main() {
    if (userC.money>0) {
        setTimeout(SpinWheel, 1500);
        var obj = GenrateNumber();
        RenderToCard(obj);


        //setTimeout(NumAnimationSpin, 9500);
        setTimeout(NumAnimation, 12000);
        setTimeout(PlayNumSound, 12500, obj.num);
        setTimeout(IsWin, 12800, obj.num);
        setTimeout(PlayLose, 15500);
        setTimeout(ResetRound, 19500);
    }
    else if (userC.money<=0) {
        IsPoor();
    }
    


}

//play sounds
function PlayPlaceyour() {
    document.getElementById("place").play();

}
function PlayNomore() {
    document.getElementById('noMore').play();
    validSafty = false;

}
function PlayNumSound(num) {
    document.getElementById(`A${num}`).play();
   
}


//render the Wallet bet and the name 
function RenderUserDet() {
    if (userC.money<0) {
        userC.money = 0;
    }
    document.getElementById('Wallet').innerHTML = `Wallet : ${userC.money}$`;
    document.getElementById('userName').innerHTML = `Hello  ${Game21.current}`;
    document.getElementById('Bet').innerHTML = `Bet : ${bet}$`;


}
//spin animation
function SpinWheel() {
    document.getElementById('spinSound').play();
    setTimeout(PlayNomore, 8000);
    $('#Wheel').animate(
        { deg: 360 * 14 },
        {
            duration: 13000,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );
}



//random number and return the object from data 
function GenrateNumber() {
    var rand = Math.floor(Math.random() * 37); //gives 0-36 random numer
    NumArr[rand].num = rand;
    return NumArr[rand];

}

//only render the content on the card
function RenderToCard(obj) {
    document.getElementById("resThird").innerHTML = obj.third;
    document.getElementById("resType").innerHTML = obj.type;
    document.getElementById("resColor").innerHTML = obj.color;
    document.getElementById("resNumber").innerHTML = obj.num;
    var resDiv = document.getElementById('Res');
    if (obj.color =='Black') {
        resDiv.style.backgroundImage = 'linear-gradient(to left,#000000, #5f5f5f,#2a2a2a)';
        resDiv.style.color='#ffffff'
    }
    else {
        resDiv.style.backgroundImage = 'linear-gradient(to left,#b41e1e, #eb5353,#841616)'
        resDiv.style.color = '#000000'

    }


}

function NumAnimationSpin() {
   
    $('#Res').animate(
        { deg: 360 * 5 },
        {
            duration: 8000,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );
    

}

//fade animation and set thw right width
function NumAnimation() {
    $('#Res').fadeIn(4000)



}
function IsWin(winNum) {
    var WinObj = NumArr[winNum]; // the wining number as object

    for (var i = 0; i < arrChips.length; i++) {
        var id = arrChips[i].split('N');
       

        if (id.length==1) {

            if (id[0] == 'ST') {

                chance = 3;
                if (id[0] == WinObj.third) {
                    console.log('win')
              

                    Payment();
                    console.log(id[0] + '+' + WinObj.num)
                }

            }
            //ND because splited N
            else if (id[0] == 'DD') {
                chance = 3;
                if ('ND' == WinObj.third) {
                    console.log('win')
               
                    Payment();
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == 'RD') {
                chance = 3;
                if (id[0] == WinObj.third) {
                    console.log('win')
              
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == '1to18') {
                chance = 2;

                if (id[0] == WinObj.range) {
                     
                    console.log('win')
            
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == 'Even') {
                chance = 2;
                if (id[0] == WinObj.type) {
                
                    console.log('win')
               
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == 'Odd') {
                chance = 2;
                if (id[0] == WinObj.type) {
                  
                    console.log('win')
                  
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == 'Red') {
                chance = 2;
                if (id[0] == WinObj.color) {
                 
                    console.log('win')
                   
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == 'Black') {
                chance = 2;
                if (id[0] == WinObj.color) {
          
                    console.log('win')
                  
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == '19to36') {
                chance = 2;

                if (id[0] == WinObj.range) {
                   
                    console.log('win')

                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }

            else if (id[0] == 'col1') {
                chance = 3;
                if (WinObj.col == 1) {
                 
                    console.log('win')
                  
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == 'col2') {
                chance = 3;
                if (WinObj.col == 2) {
                   
                    console.log('win')
                
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }
            else if (id[0] == 'col3') {
                chance = 3;
                if (WinObj.col == 3) {
                     
                    console.log('win')
                  
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)
                }
            }

            else {
                if (winNum == id[0]) {
                    chance = 36;
                    console.log('win')
                 
                    Payment()
                    console.log(id[0] + '+' + WinObj.num)

                }

            }
        }
        else {
            for (var i = 0; i < id.length; i++) {
                if (winNum==id[i]) {
                    chance = 36 / id.length;
                    console.log('win')
                   
                    Payment()
                    console.log(id[i] + '+' + WinObj.num)
                }
            }



        }

       
        


       
       
    }

}

function Payment() {

    LoseSw = false;
    userC.money += 50 * chance;
    bet = 0;
    Game21[Game21.current] = userC;
    localStorage['Game21'] = JSON.stringify(Game21);
    setTimeout(RenderUserDet, 2000);
    setTimeout(PlayWinSound, 1600);

    



}

function PlayWinSound() {
    document.getElementById("claps").play();
    document.getElementById("winsound").play();
    document.getElementById("winsound2").play();

}



function PlayLose() {
    
    if (LoseSw==true) {
       
        document.getElementById("Sorry").play();
    }
    

}

function ResetRound() {
    //LoseSw = true;
    // valid = false
    //validSafty = true;
    // arrChips = [];
    // x = 0;
    // y = 0;
    // ID = 0;
    //chance = 0;
    //bet = 0;
    //RenderUserDet();


    //$('#Res').fadeOut(2000)

    //for (var i = 1; i <=count; i++) {

    //    document.getElementById(`${i}I`).remove()
    //}
    //count = 0;

    //setTimeout(TRY, 3000);
    location.reload();

}


function IsPoor() {
    $('#Bounos').fadeIn(4500)
}

function PClick() {
    location.replace('Slot.html');
}

