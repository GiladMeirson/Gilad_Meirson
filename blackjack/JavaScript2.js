//---To do list---
//need to change the intro
// winnig function
//add sound on hover BTN set
//add losing function+reset function
//add draw situiation


//global
var UsersList = [];
var currentUser = {};
var bet = 0;
var indexPlayer = -1;
var ActiveCards = [];
var sumPlayer = 0;
var sumDealer = 0;
var playerACE = 0;
var dealerACE = 0;
var HitCounter = 0;
var sumSplit1 = 0;
var SumSplit2 = 0;
var hitSplit1 = 0;
var hitSplit2 = 0;
var flag2standSplit = false;
var adCounter = 0;


var myint=setInterval(pop_up,6000)
function Close() {
    $('#Ad').animate({ top: '-2000px', opacity: '0' }, 500)
    if (adCounter>=3) {
        clearInterval(myint);
    }
    
}
function pop_up() {
    if (currentUser.money == 0) {
        document.getElementById("ad-sound").play();
        $('#Ad').animate({ opacity: '1', top: '25px', left: '349px' }, 1500)
       
        

       
    }
    if (currentUser.money<0) {
        currentUser.money = 0;
        document.getElementById("wallet").innerHTML='Wallet: 0$'
    }
   

}


function AdGift() {
    currentUser.money += 300;
    Game21[Game21.current] = currentUser;
    document.getElementById("ad-sound").play();
    localStorage['Game21'] = JSON.stringify(Game21);
    adCounter++;
    location.replace("https://giladmeirson.github.io/Gilad_Meirson/");
   
}

//onload function for setup
function setup() {
    document.getElementById("GoBTN").disabled  = true;
    
    if (localStorage['Game21']!=undefined) {
        Game21 = JSON.parse(localStorage['Game21'])
        StartBtn()
        setTimeout(playintro, 3000);
    }
   
    
}

//play sounds
function playintro() {
   
    document.getElementById("intro").volume=0.9
    document.getElementById("intro").play();
}
function playClickSound() {
    document.getElementById("lik").volume = 1;
    document.getElementById("lik").play();
}
function PlayPlaceYour() {
   document.getElementById("PlaceYourbet").play();
}
function PlayChipHover() {
    document.getElementById("ChipHover").play();

}

//wire to onclick Start event after user insert the nickname
function StartBtn() {

    setTimeout(PlayPlaceYour, 650);
    var current = Game21.current;
 
    currentUser = Game21[current];
    

    document.getElementById("wallet").innerHTML += currentUser.money+'$';
    document.getElementById("PlayerName").innerHTML += currentUser.name;
    document.getElementById("UserDetail").style.display=`block`
    document.getElementById("Bet").style.display = `block`;
    
    
    document.getElementById("BackPack").style.display = `block`;

 
    
}


//wire to onclick chips img to place bet
function onChipClick(val) {
    if (val > currentUser.money) {
        alert("you dont have enough money")
        return;
    }
    document.getElementById("GoBTN").disabled  = false;
    if (currentUser.money>0) {
        document.getElementById("chipsSound").play();
        bet = parseInt(val) + bet;
        document.getElementById("sumBetText").innerHTML = 'bet: ' + bet + '$';

        currentUser.money = currentUser.money - val;
        document.getElementById("wallet").innerHTML = 'Wallet: ' + currentUser.money + '$';

        //change in money we save in local
        var current = Game21.current;
        Game21[current] = currentUser;
        localStorage['Game21'] = JSON.stringify(Game21)
    //UsersList[indexPlayer].money = currentUser.money;
    }
    else {
        alert("You dont Have Money")
    }


    


}

//wire to event onclick BTNGO button and will be the continue of the end first-round!
function onClickGO() {
    if (bet>0) {

        document.getElementById("Bet").style.display = 'none';
        //first player
        RenderCard('C1', true);
        //first dealer
        RenderCard('C2', false);
        //sec player
        RenderCard('C3', true);
        //sec dealer(upside down)
        RenderCard('C4', false);


        document.getElementById("shuffle").volume = 1;
        document.getElementById("shuffle").play();
        setTimeout(OneCardAnimate, 1200)
        setTimeout(twoCardAnimate, 2000)
        setTimeout(threeCardAnimate, 2800)
        setTimeout(fourCardAnimate, 3600)

        $('#PlayerScore').animate({ opacity: '1' }, 5500);
        $('#DealerScore').animate({ opacity: '1' }, 5500);


        $('#BtnSet').animate({ top: '640px', opacity: '1', }, 5500);
        //in case player hve same card *value*
        if (cards[ActiveCards[0]].value == cards[ActiveCards[2]].value) {
            $('#SPLIT').animate({ opacity: '1' }, 2000)
        } else {
            $('#SPLIT').animate({ opacity: '0' }, 2000)
        }
        //$('#BtnSet').fadeIn(4500);

        computeSum();
        RenderPlayerScore();
        if (cards[ActiveCards[1]].value == 1 && sumDealer + 10 <= 21) {
            document.getElementById("DealerScore").innerHTML = ' ' + (cards[ActiveCards[1]].value + 10) + ' ';
        }
        else {
            document.getElementById("DealerScore").innerHTML = ' ' + cards[ActiveCards[1]].value + ' ';
        }


        //later need to be wrriten winnig function
        if (CheckPlayer21()) {
            bet += bet*0.5;
            setTimeout(PlayerWin, 1000);
        }
    }
    else {
        PlayPlaceYour();
        alert("Place Your Bet Please");

    }
   
    
  
    
    
    
    
    

    
}

//jquery animations
function OneCardAnimate() {
    //first player card
    $('#C1').animate({ left: `-750px` }, 900)
    $('#C1').animate({ top: '170px' }, 900) 
    
    $('#C1').flip(true);

    $('#C1 img').animate({ width: '100px' }, 900)

    

}
function twoCardAnimate() {
    

    //first dealer card
    $('#C2').animate({ left: `-750px` }, 900)
    $('#C2').animate({ top: '-120px' }, 900)

    $('#C2').flip(true);

    $('#C2 img').animate({ width: '100px' }, 900)


}
function threeCardAnimate() {


    //sec player card
    $('#C3').animate({ left: `-700px` }, 900)
    $('#C3').animate({ top: '170px' }, 900)

    $('#C3').flip(true);

    $('#C3 img').animate({ width: '100px' }, 900)


}
function fourCardAnimate() {


    //second dealer card
    $('#C4').animate({ left: `-700px` }, 900)
    $('#C4').animate({ top: '-120px' }, 900)

    $('#C4 img').animate({ width: '100px' }, 900)


}
function fiveCardAnimation() {

    //three player card
    $('#C5').animate({ left: `-650px` }, 900)
    $('#C5').animate({ top: '170px' }, 900)

    $('#C5').flip(true);

    $('#C5 img').animate({ width: '100px' }, 900)
}
function sixCardAnimation(){
    //four player card
    $('#C6').animate({ left: `-600px` }, 900)
    $('#C6').animate({ top: '170px' }, 900)

    $('#C6').flip(true);

    $('#C6 img').animate({ width: '100px' }, 900)
}
function sevenCardAnimation() {

    //five player card
    $('#C7').animate({ left: `-550px` }, 900)
    $('#C7').animate({ top: '170px' }, 900)
    $('#C7').flip(true);
    $('#C7 img').animate({ width: '100px' }, 900)
}
function eightCardAnimation() {
    //six player card
    $('#C8').animate({ left: `-500px` }, 900)
    $('#C8').animate({ top: '170px' }, 900)
    $('#C8').flip(true);
    $('#C8 img').animate({ width: '100px' }, 900)
}
function nineCardAnimation() {
    //unusual case seven player card
    $('#C9').animate({ left: `-450px` }, 900)
    $('#C9').animate({ top: '170px' }, 900)
    $('#C9').flip(true);
    $('#C9 img').animate({ width: '100px' }, 900)
}
function tenCardAnimation() {


    //third dealer card
    $('#C10').animate({ left: `-650px` }, 900)
    $('#C10').animate({ top: '-120px' }, 900)
    $('#C10').flip(true);
    $('#C10 img').animate({ width: '100px' }, 900)


}
function elvenCardAnimation() {
    //four dealer card
    $('#C11').animate({ left: `-600px` }, 900)
    $('#C11').animate({ top: '-120px' }, 900)
    $('#C11').flip(true);
    $('#C11 img').animate({ width: '100px' }, 900)
}
function ThelvCardAnimation() {
    var offset = 50 + 50 * HitCounter;
    offset = 700 - offset;
    offset=offset+'px'
    //double player card
    $('#C12').animate({ left: `-`+offset }, 900)
    $('#C12').animate({ top: '170px' }, 900)

    $('#C12').flip(true);

    $('#C12 img').animate({ width: '100px' }, 900)
}
function HitSplitAnimation(id) {
    //Split1Hit player card
    //cards
    $('#'+id).animate({ left: `-${(1000-(hitSplit1*50))}px` }, 900)
    $('#'+id).animate({ top: '150px' }, 1200)

    $('#' + id).flip(true);

    $('#'+id+' img').animate({ width: '100px' }, 900)
}
function HitSplit2Animation(id) {
    //Split1Hit player card
    //cards
    $('#' + id).animate({ left: `-${420 - hitSplit2 * 50}px` }, 900)
    $('#' + id).animate({ top: '150px' }, 1200)


    $('#' + id).flip(true);

    $('#' + id + ' img').animate({ width: '100px' }, 900)
}
function Double1SplitAnimation() {
    //Split1Hit player card
    //cards
    var offset = 50 + 50 * hitSplit1;
    offset = 1000 - offset;
    

    $('#D1').animate({ left: `-${offset}px` }, 900)
    $('#D1').animate({ top: '150px' }, 1200)

    $('#D1').flip(true);

    $('#D1 img').animate({ width: '100px' }, 900)
}
function Double2SplitAnimation() {
    //Split1Hit player card
    //cards
    var offset = 50 + 50 * hitSplit1;
    offset = 420 - offset;


    $('#D2').animate({ left: `-${offset}px` }, 900)
    $('#D2').animate({ top: '150px' }, 1200)

    $('#D2').flip(true);

    $('#D2 img').animate({ width: '100px' }, 900)
}

//return one card from the pack (obj)
function GenrateValidCard() {
    var indexcard = Math.ceil(Math.random() * 52)
    while (ActiveCards.includes(indexcard)) {
        indexcard = Math.ceil(Math.random() * 52)
    }

    ActiveCards.push(indexcard);
    return cards[indexcard]
    
}

//this function draw the card we get
function RenderCard(id,flag) {
    var ph=document.getElementById("ph-cards");
    var card = GenrateValidCard();
    var str = '';
    str += `<div id="${id}" class="OneCard"><div class="front">`;
    str += `<img src="cardsSVG/2B.png"/></div>`;
    str += `<div class="back">`;
    str += `<img src="${card.img}"/></div></div>`
    ph.innerHTML += str;
    if (card.value==1) {
        if (flag==true) {
            playerACE++;
        } else {
            dealerACE++;
        }
    }

    //helpful function for flip the card
    $(document).ready(function () {


        $('#'+id).flip({
            trigger: 'manual',
            axis: `y`,
            reverse: `true`,
            speed:800
        });

    })


}


// compte the sum of the dealer and player without ACE case...example: A+4=5
function computeSum() {
   

    for (var i = 0; i < ActiveCards.length; i++) {
        if (i%2==0) {
            sumPlayer = sumPlayer + cards[ActiveCards[i]].value;
          
        }
        else {
            sumDealer = sumDealer + cards[ActiveCards[i]].value;
            
        }
    }
   
}


//bool function return true in case player got 21(include ACE case)
function CheckPlayer21() {
   
     if (sumPlayer==21) {
         return true;
     }

    if (playerACE>0) {
        if (sumPlayer+10==21) {
            return true;
        }
    }
  
    return false;


}



//return true if player lose
function IsLose() {
    if (sumPlayer>21) {
        return true;
    }
    else {
        return false;
    }
}

//wire to HIT btn on BtnSet 
function OnClickHit() {
    HitCounter++;
    //the first hit
    if (HitCounter==1) {
        //player third card
        RenderCard("C5",true)

        //need to be sound of one card
        setTimeout(fiveCardAnimation, 400)

        //new card new sum and render it 
        sumPlayer += cards[ActiveCards[4]].value
        //render it with delay
        setTimeout(RenderPlayerScore, 800) 

    }
    else if (HitCounter == 2) {
        //player four card
        RenderCard("C6", true)

        //need to be sound of one card
        setTimeout(sixCardAnimation, 800)

        //new card new sum and render it 
        sumPlayer += cards[ActiveCards[5]].value
        //render it with delay
        setTimeout(RenderPlayerScore, 800) 
    } else if (HitCounter == 3) {
        //player five card
        RenderCard("C7", true)

        //need to be sound of one card
        setTimeout(sevenCardAnimation, 800)

        //new card new sum and render it 
        sumPlayer += cards[ActiveCards[6]].value
        //render it with delay
        setTimeout(RenderPlayerScore, 800)
    }
    else if (HitCounter == 4) {
        //player six card
        RenderCard("C8", true)

        //need to be sound of one card
        setTimeout(eightCardAnimation, 800)

        //new card new sum and render it 
        sumPlayer += cards[ActiveCards[7]].value
        //render it with delay
        setTimeout(RenderPlayerScore, 800)
    }
    else if (HitCounter == 5) {
        //player six card
        RenderCard("C9", true)

        //need to be sound of one card
        setTimeout(nineCardAnimation, 800)

        //new card new sum and render it 
        sumPlayer += cards[ActiveCards[8]].value
        //render it with delay
        setTimeout(RenderPlayerScore, 800)
    }
   


    if (IsLose()) {
        setTimeout(PlayerLose, 1000);
        //need to be losing function and reset function
    }
    if (CheckPlayer21()&&sumDealer!=21) {
        setTimeout(PlayerWin, 1000);
        
    }
    else if (sumDealer==sumPlayer && sumPlayer==21) {
        setTimeout(Draw, 1000);
        return;
    }

}

//wire to Stand btn on BtnSet 
function onClickStand() {

    $('#C4').flip({
        trigger: 'manual',
        axis: `y`,
        reverse: `true`,
        speed: 1400
    });
    setTimeout($('#C4').flip(true), 1000);
    //sumDealer += cards[ActiveCards[3]].value;
    RenderDealerScore();
    if ((sumDealer>sumPlayer && sumDealer<=21 && playerACE==0)||sumDealer>sumPlayer+10 && playerACE>0) {
        setTimeout(PlayerLose, 2500);
        return
    }
    else {
        if ((dealerACE > 0 && sumDealer <= 17) || sumDealer < 17) {
            RenderCard("C10", false)
            setTimeout(tenCardAnimation, 600)
            sumDealer += cards[ActiveCards[ActiveCards.length - 1]].value;
            setTimeout(RenderDealerScore, 800);
            if (sumDealer > sumPlayer && sumDealer <= 21 && playerACE<1) {
                setTimeout(PlayerLose, 2500);
                return;
            }
            if ((dealerACE > 0 && sumDealer <= 17) || sumDealer < 17) {
                RenderCard("C11", false)
                setTimeout(elvenCardAnimation, 1200)
                sumDealer += cards[ActiveCards[ActiveCards.length - 1]].value;
                setTimeout(RenderDealerScore, 1600);
                if (sumDealer > sumPlayer && sumDealer <= 21 && playerACE < 1) {
                    setTimeout(PlayerLose, 2500);
                    return;
                }
            }

        }
    }

   
    if (sumPlayer==sumDealer && playerACE==0) {
        setTimeout(Draw, 1000);
        return;

    }
    if (sumPlayer+10 == sumDealer && playerACE>0) {
        setTimeout(Draw, 1000);
        return;

    }
    if (sumDealer<=21 && sumDealer>sumPlayer && playerACE==0) {
        setTimeout(PlayerLose, 1000);
        return;

    }
    if (playerACE > 0 && sumDealer <= 21 && sumDealer > sumPlayer+10) {
        setTimeout(PlayerLose, 1000);
        return;
    }
    if ((sumPlayer>sumDealer&&sumPlayer<=21)||(sumPlayer+10>sumDealer && sumPlayer<=21 && playerACE>0)) {
        setTimeout(PlayerWin, 1000);
        return;

    }
    if (sumDealer>21) {
        setTimeout(PlayerWin, 1000);
        return;

    }

}

//wire to Double Btn on BTnset
function OnClickDouble() {
    currentUser.money -= bet;
    Game21[Game21.current] = currentUser;
    localStorage['Game21'] = JSON.stringify(Game21);
    bet += bet;
    document.getElementById("sumBetText").innerHTML ='bet: '+ bet + '$';
    RenderCard("C12", true)

    //need to be sound of one card
    setTimeout(ThelvCardAnimation, 400)

    //new card new sum and render it 
    sumPlayer += cards[ActiveCards[ActiveCards.length-1]].value
    //render it with delay
    setTimeout(RenderPlayerScore, 800) 
    if (sumPlayer>21) {
       setTimeout(PlayerLose,500)
    }
    else {
        if (sumPlayer == 21 && sumDealer != 21) {
            setTimeout(PlayerWin, 500);
        } else {
            setTimeout(onClickStand, 2800);
        }
    }

   
}

//wire to Split Btn on BTnset
function OnClickSplit() {


    //buttons
    $('#BtnSet').animate({ opacity: '0', top: '500px' }, 1500);

    $('#BtnSet1').animate({ opacity: '1', top: '625px', left: '257px' },1500)
    $('#BtnSet2').animate({ opacity: '1', top: '625px', left: '833px' }, 1500)
    $('#BtnSet2').animate({ opacity: '0.15' }, 1500)


 

    //cards
    $('#C1').animate({ left: `-1000px` }, 900)
    $('#C1').animate({ top: '150px' }, 1200)
    
    
    $('#C3').animate({ left: `-420px` }, 900)
    $('#C3').animate({ top: '150px' }, 1200)


    //scores
    $('#PlayerScore').animate({ opacity: '0', }, 500);
    $('#PlayerScore1').animate({ opacity: '1', }, 500);
    $('#PlayerScore2').animate({ opacity: '1', }, 500);
    $('#PlayerScore1').animate({ left: '370px', top:'280px' }, 500);
    $('#PlayerScore2').animate({ left: '950px',top:'280px' }, 500);

    sumSplit1 += cards[ActiveCards[0]].value;
    SumSplit2 += cards[ActiveCards[2]].value;
    document.getElementById("PlayerScore1").innerHTML = cards[ActiveCards[0]].value;
    document.getElementById("PlayerScore2").innerHTML = cards[ActiveCards[2]].value;


    //saving the extra bet 
    currentUser.money -= bet;
    Game21[Game21.current] = currentUser;
    localStorage['Game21'] = JSON.stringify(Game21);
    bet += bet;
    document.getElementById("wallet").innerHTML = 'Wallet: ' + currentUser.money;
    document.getElementById("sumBetText").innerHTML = 'Bet: ' + bet;

    

}


function HIT_Split() {

    if (flag2standSplit == false) {
        hitSplit1++;
        RenderCard(`S${hitSplit1}`, true);
        setTimeout(HitSplitAnimation, 400, `S${hitSplit1}`);
        sumSplit1 += cards[ActiveCards[ActiveCards.length - 1]].value;
        document.getElementById("PlayerScore1").innerHTML = sumSplit1;
        if (playerACE>0 && sumSplit1<=21) {
            document.getElementById("PlayerScore1").innerHTML = sumSplit1 + ' / ' + (sumSplit1 + 10);
        }
        if (sumSplit1>21) {
            //lose this one.
            //play sound
            document.getElementById("lose2").play();
            $('#BtnSet1').animate({ opacity: '0.15' }, 1500)
            $('#BtnSet2').animate({ opacity: '1' }, 1500);
            flag2standSplit = true;
            setTimeout(document.getElementById("lose2").play, 500);


        } else if (sumSplit1==21||(playerACE>0 && sumSplit1+10==21)) {
            //win this one.
            //play sound
            document.getElementById("win1").play();
            setTimeout(document.getElementById("win1").play, 500);
            flag2standSplit = true;
            $('#BtnSet2').animate({ opacity: '1' }, 1500);
            $('#BtnSet1').animate({ opacity: '0.15' }, 1500);




        } 

        

    }
    else if (flag2standSplit == true) {
        hitSplit2++;
        RenderCard(`P${hitSplit2}`, true);

        setTimeout(HitSplit2Animation, 400, `P${hitSplit2}`);
        SumSplit2 += cards[ActiveCards[ActiveCards.length - 1]].value;
        document.getElementById("PlayerScore2").innerHTML = SumSplit2;
        if (playerACE > 0 && sumSplit2 <= 21) {
            document.getElementById("PlayerScore2").innerHTML = SumSplit2 + ' / ' + (SumSplit2 + 10);
        }
        if (SumSplit2 > 21) {
            //lose this one.
            //play sound
            
           // document.getElementById("lose1").play();
            document.getElementById("lose2").play();

            $('#BtnSet1').animate({ opacity: '0.15' }, 1500)
            setTimeout(document.getElementById("lose1").play, 500);
            setTimeout(document.getElementById("lose2").play, 500);
            setTimeout(Reset, 2000);


        } else if (SumSplit2 == 21 || (playerACE > 0 && SumSplit2 + 10 == 21)) {
            //win this one.
            //play sound

            document.getElementById("win1").play();
            document.getElementById("win3").play();

            setTimeout(document.getElementById("win1").play, 500);
            setTimeout(document.getElementById("win3").play, 500);
            setTimeout(Reset, 2000);
          
        }

    }
}

function Stand_Split1() {
    flag2standSplit = true;
    $('#BtnSet1').animate({ opacity: '0.15' }, 1000)
    $('#BtnSet2').animate({ opacity: '1' }, 1000);

}

function Stand_Split2() {
    //final stand

    $('#C4').flip({
        trigger: 'manual',
        axis: `y`,
        reverse: `true`,
        speed: 1400
    });
    setTimeout($('#C4').flip(true), 1000);
    
    RenderDealerScore();
    if ((sumDealer > sumSplit1 && sumDealer>SumSplit2 && sumDealer <= 21 && playerACE == 0) || sumDealer > sumSplit1 + 10 && sumDealer>sumSplit2+10 && playerACE > 0) {
        setTimeout(PlayerLose, 2500);
        return
    }
    else {
        if ((dealerACE > 0 && sumDealer <= 17) || sumDealer < 17) {
            RenderCard("C10", false)
            setTimeout(tenCardAnimation, 600)
            sumDealer += cards[ActiveCards[ActiveCards.length - 1]].value;
            setTimeout(RenderDealerScore, 800);
            if (sumDealer > sumSplit1 && sumDealer > SumSplit2 && sumDealer <= 21 && playerACE < 1) {
                setTimeout(PlayerLose, 2500);
                return;
            }
            if ((dealerACE > 0 && sumDealer <= 17) || sumDealer < 17) {
                RenderCard("C11", false)
                setTimeout(elvenCardAnimation, 1200)
                sumDealer += cards[ActiveCards[ActiveCards.length - 1]].value;
                setTimeout(RenderDealerScore, 1600);
                if (sumDealer > sumSplit1 && sumDealer > SumSplit2 && sumDealer <= 21 && playerACE < 1) {
                    setTimeout(PlayerLose, 2500);
                    return;
                }
            }

        }
    }
    if (sumDealer>21) {
        setTimeout(PlayerWin, 2500);
        return;
    }

    if (SumSplit2 > sumDealer && sumSplit1 > sumDealer && SumSplit2 <= 21 && sumSplit1 <= 21 && playerACE == 0) {
        setTimeout(PlayerWin, 2500);
        return;
    }
    else if (SumSplit2 + 10 > sumDealer && sumSplit1 + 10 > sumDealer && SumSplit2+10 <= 21 && sumSplit1+10 <= 21 && playerACE > 0) {
        setTimeout(PlayerWin, 2500);
        return;
    }
    else if (playerACE==0 && sumSplit1>sumDealer && sumSplit1 <=21) {
        currentUser.money += bet ;
        Game21[Game21.current] = currentUser;
        localStorage['Game21'] = JSON.stringify(Game21);
        
        
    }
    if (playerACE == 0 && SumSplit2 > sumDealer && SumSplit2 <= 21) {
        currentUser.money += bet;
        Game21[Game21.current] = currentUser;
        localStorage['Game21'] = JSON.stringify(Game21);
    }

    setTimeout(Reset, 2500);

}



function Double_Split() {
    if (flag2standSplit==false) {
        flag2standSplit = true;
        currentUser.money -= bet;
        Game21[Game21.current] = currentUser;
        localStorage['Game21'] = JSON.stringify(Game21);
        bet += bet;
        document.getElementById("sumBetText").innerHTML = 'bet: ' + bet + '$';
        RenderCard("D1", true)

        //need to be sound of one card
        setTimeout(Double1SplitAnimation, 400)

        //new card new sum and render it 
        sumSplit1 += cards[ActiveCards[ActiveCards.length - 1]].value
        document.getElementById("PlayerScore1").innerHTML = sumSplit1;
        //render it with delay

        if (sumSplit1 > 21) {
            document.getElementById("lose2").play();
            setTimeout(document.getElementById("lose2").play, 500);

        }
        else {
            if (sumSplit1 == 21 && sumDealer != 21) {
                document.getElementById("win1").play();
                setTimeout(document.getElementById("win1").play, 500);


            }


        }

        $('#BtnSet2').animate({ opacity: '1' }, 1500);
        $('#BtnSet1').animate({ opacity: '0.15' }, 1500);
    }
    else {
        currentUser.money -= bet;
        Game21[Game21.current] = currentUser;
        localStorage['Game21'] = JSON.stringify(Game21);
        bet += bet;
        document.getElementById("sumBetText").innerHTML = 'bet: ' + bet + '$';
        RenderCard("D2", true)

        //need to be sound of one card
        setTimeout(Double2SplitAnimation, 400)

        //new card new sum and render it 
        SumSplit2 += cards[ActiveCards[ActiveCards.length - 1]].value
        document.getElementById("PlayerScore2").innerHTML = SumSplit2;
        if (SumSplit2 > 21) {
            document.getElementById("lose2").play();
            setTimeout(document.getElementById("lose2").play, 500);

        }
        else {
            if (SumSplit2 == 21 && sumDealer != 21) {
                document.getElementById("win1").play();
                setTimeout(document.getElementById("win1").play, 500);


            }


        }
        setTimeout(Stand_Split2, 2200);
    }
  
}




//helpful render function
function RenderPlayerScore() {
    var strPlayerScore = ' ' + sumPlayer + ' '
    if (playerACE > 0) {
        if (sumPlayer+10<=21) {
            strPlayerScore += `/ ${parseInt(sumPlayer) + 10}`;
        }
        
    }
   
    document.getElementById("PlayerScore").innerHTML = strPlayerScore;
}
function RenderDealerScore() {
    if (dealerACE > 0 && sumDealer+10<=21) {
        sumDealer += 10;
    }

    document.getElementById("DealerScore").innerHTML = ' '+sumDealer+' ';
}

//winning animation
function PlayerWin() {

    document.getElementById("win1").play();
    document.getElementById("win2").play();
    document.getElementById("win3").play();

    $('#Winnig').animate({ top: '-120px', left: '450px',opacity:1 }, 3500);
    $('#Winnig').animate(
        { deg: 360*2 },
        {
            duration: 1200,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );
    $('#Winnig').animate({ opacity: 0 }, 2500)
    $('#Winnig').animate({ top: '-2000px' }, 500)

    //change in money saving to local
    currentUser.money += bet * 2;
    Game21[Game21.current] = currentUser;
    localStorage['Game21'] = JSON.stringify(Game21);
    setTimeout(Reset, 4500);
    


   

    
}

//losing animations
function PlayerLose() {

    document.getElementById("lose1").play();
    document.getElementById("lose2").play();
    $('#Losing').animate({ top: '250px', left: '550px',opacity:1 }, 3500);
    $('#Losing').animate(
        { deg: 360 * 2 },
        {
            duration: 1500,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );

    $('#Losing').animate({ opacity: 0 }, 2100)
    $('#Losing').animate({ top: '-2000px' }, 500)
    setTimeout(Reset, 4500);
}


function Draw() {
    document.getElementById("drawSound").play();
    document.getElementById("tieTitle").innerHTML = sumDealer + ' : ' + sumPlayer;

    $('#Tie').animate({ top: '120px', left: '450px', opacity: '1' }, 3500);
    $('#Tie').animate(
        { deg: 360 * 2 },
        {
            duration: 1200,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );
    $('#Tie').animate({ opacity: '0' }, 4000)
    $('#Tie').animate({ top: '-2000px' }, 1000)

    
    setTimeout(Reset, 4500);

}
//reset the screen after lose or win
function Reset() {
   
    ///////////////////////
    ActiveCards = [];
    var ph = document.getElementById("ph-cards");
    ph.innerHTML = '';
    sumDealer = 0;
    sumPlayer = 0;
    dealerACE = 0;
    playerACE = 0;
    HitCounter = 0;
    bet = 0;
    $('#PlayerScore').animate({ opacity: '0' }, 500);
    $('#DealerScore').animate({ opacity: '0' }, 500);
    $('#BtnSet').animate({ opacity: '0' }, 500);
    $('#BtnSet1').animate({ opacity: '0',top:'-2000px' }, 1500)
    $('#BtnSet2').animate({ opacity: '0', top: '-2000px' }, 1500);
    $('#PlayerScore1').animate({ opacity: '0', top: '-2000px' }, 1500)
    $('#PlayerScore2').animate({ opacity: '0', top: '-2000px' }, 1500);

    /////////////////
    document.getElementById("wallet").innerHTML = 'Wallet: ' + currentUser.money + '$';
    document.getElementById("PlayerName").innerHTML ='Player: ' +currentUser.name;
    document.getElementById("UserDetail").style.display = `block`
   
    document.getElementById("Bet").style.display = `block`;
    
    document.getElementById("sumBetText").innerHTML = 'bet: ' + bet + '$';

    
    document.getElementById("BackPack").style.display = `block`;
    PlayPlaceYour();
    
}






