 //varlible
 var neuronMove = new neuronMovement("left", "right", "top", "bottom"); // possible motions
 var AiArr = {}; // all the ai obj in accosiate array
 var population = 100;
 var intervalID;
 var sec = 0;
 var rate = 0;
 var max_vel = 0;
 var Generation = 0;
 var lastRound_death = 0;
 

 //functions!!!!


 //this one conected to the interval
 function Update()
 {
     if (Generation==0) {
         sec++;
         BrainWork();
         document.getElementById("step").innerHTML = "Steps: " + (sec / 10).toString();
         document.getElementById("Moutation").innerHTML = "AVG Moutation Rate: " + rate;
         document.getElementById("velocity").innerHTML = "Velocity range: 0-" + max_vel;
         document.getElementById("Genration").innerHTML = "Generation: " + Generation;
     }
     else {
         sec++;
         BrainIsActive(sec)
         document.getElementById("step").innerHTML = "Steps: " + (sec / 10).toString();
         document.getElementById("Moutation").innerHTML = "AVG Moutation Rate: " + rate;
         document.getElementById("velocity").innerHTML = "Velocity range: 0-" + max_vel;
         document.getElementById("Genration").innerHTML = "Generation: " + Generation;
     }
     
   
    

     if ((sec / 10)>=10) {
         clearInterval(intervalID);
         //need to kill then to reproduce the pilots and then to start new interval which mean new activity brain!
     }

 }


//this function is genral function for all genartion exapt gen 0 ! 
 function BrainIsActive(AiStep) {

     for (k in AiArr) {
         var aiElement = document.getElementById("d" + k);
         var memo = AiArr[k].brain.memory.split("."); //new orgenaized array of memory
         if (memo[AiStep] == 0) { // move right
             aiElement.style.left = (parseInt(aiElement.style.left.replace("px", "")) + parseInt(AiArr[k].brain.neuronV)).toString() + "px";
             if (parseInt(aiElement.style.left.replace("px", "")) > 780) {
                 aiElement.style.left = "780px";
             }
             
         }
         else if (memo[AiStep] == 1) {// move left
             aiElement.style.left = (parseInt(aiElement.style.left.replace("px", "")) - parseInt(AiArr[k].brain.neuronV)).toString() + "px";
             if (parseInt(aiElement.style.left.replace("px", "")) <= 0) {
                 aiElement.style.left = "0px";
             }
             
         }
         else if (memo[AiStep] == 2) { //move down
             aiElement.style.top = (parseInt(aiElement.style.top.replace("px", "")) + parseInt(AiArr[k].brain.neuronV)).toString() + "px";
             if (parseInt(aiElement.style.top.replace("px", "")) > 580) {
                 aiElement.style.top = "580px";
             }
             
         }
         else if (memo[AiStep] == 3) { //move up 
             aiElement.style.top = (parseInt(aiElement.style.top.replace("px", "")) - parseInt(AiArr[k].brain.neuronV)).toString() + "px";
             if (parseInt(aiElement.style.top.replace("px", "")) < 0) {
                 aiElement.style.top = "0px";
             }
             
         }
     }
 }

 //this happend every seconds !!!
 function start() {
     if (sec==0) {
         intervalID = setInterval(Update, 100);
         document.getElementById("Next").innerHTML = "Stop Genration";
     }
     else {
         clearInterval(intervalID);
         sec = 0;
         document.getElementById("Next").innerHTML = "Start Genration";
     }
     
 }

 //this function is duplicate with error the sucsessfull ai. so it return ai but little bit diffrenet. //like germs mitoza
 function reproduce(ai) {

     //father
     var papaID = ai.id;
     var papaCOLOR = ai.color;
     var papaBRAIN = ai.brain; // not necsery at that point
     var papaRATE = ai.brain.MotationRate;
     var papaVEL = ai.brain.neuronV;
     var papaMEMORY = ai.brain.memory;

     //children
     var childrenID = (parseInt(papaID) + 100);
     var childrenRATE = parseFloat(papaRATE) + 0.005 * Math.random() - 0.005 * Math.random();
     var childrenCOLOR =parseInt(papaCOLOR,16)+Math.floor(childrenRATE*Math.random()*parseInt(papaCOLOR,16))-Math.floor(childrenRATE*Math.random()*parseInt(papaCOLOR,16));
     childrenCOLOR=childrenCOLOR.toString(16);
     var childrenVEL = (parseInt(papaVEL) + (parseInt(papaVEL) * childrenRATE) - (parseInt(papaVEL) * parseFloat(papaRATE)));
     childrenVEL = parseInt(childrenVEL.toString());

     var childrenMEMORY = copyMemory(papaMEMORY); // copy almost all the memory
    


     //color complition beacuse mabey it will be less then 6 digit 
     if (childrenCOLOR.length < 6) {
         var j = 6 - childrenCOLOR.length;
         for (var g = 0; g < j; g++) {
             childrenCOLOR += Math.floor(Math.random() * 16).toString(16)
         }
     }
     childrenCOLOR = childrenCOLOR.slice(0, 6);

     //create brain
     var child_brain = new CreateBrain(neuronMove, childrenRATE, childrenVEL, childrenMEMORY);
     //create child
     var child_ai = new AI_agent(childrenID, childrenCOLOR, child_brain);
     return child_ai;

     
}


//this function get string and rate and return almost the string with changes
function copyMemory(strpapa) {
    var len = Math.round(strpapa.length * 0.55);
    var childArr = strpapa.slice(0,len);
    var incrementRand='';
   
    for (var i = len; i < strpapa.length; i++) {
       incrementRand+="."+Math.round(Math.random() * 4)
    }
    return childArr + incrementRand;
}

 //this function is moving the div ai element specific for GEN 0
 function BrainWork() {
     for (var i = 0; i < population; i++) {

         var ai_element = document.getElementById("d" + i);

         var z = Math.floor(Math.random() * 4);
        

         if (z == 0) { // move right
             ai_element.style.left = (parseInt(ai_element.style.left.replace("px", "")) + parseInt(AiArr[i].brain.neuronV)).toString() + "px";
             if (parseInt(ai_element.style.left.replace("px",""))>780) {
                 ai_element.style.left = "780px";
             }
             //AiArr[i].brain.memory += "." + z;
         }
         else if (z == 1) {// move left
             ai_element.style.left = (parseInt(ai_element.style.left.replace("px", "")) - parseInt(AiArr[i].brain.neuronV)).toString() + "px";
             if (parseInt(ai_element.style.left.replace("px", "")) <= 0) {
                 ai_element.style.left = "0px";
             }
             //AiArr[i].brain.memory += "." + z;
         }
         else if (z == 2) { //move down
             ai_element.style.top = (parseInt(ai_element.style.top.replace("px", "")) + parseInt(AiArr[i].brain.neuronV)).toString() + "px";
             if (parseInt(ai_element.style.top.replace("px", "")) > 580) {
                 ai_element.style.top = "580px";
             }
             //AiArr[i].brain.memory += "." + z;
         }
         else if (z == 3) { //move up 
             ai_element.style.top = (parseInt(ai_element.style.top.replace("px", "")) - parseInt(AiArr[i].brain.neuronV)).toString() + "px";
             if (parseInt(ai_element.style.top.replace("px", "")) < 0) {
                 ai_element.style.top = "0px";
             }
             //AiArr[i].brain.memory += "." + z;
         }
         //this commend is memory for the next genrations.
         AiArr[i].brain.memory += "." + z;
     }
 }

 //the condition who will live who will reproduce. need to becarful with that.
 //for another methods to kill need to write another functions!
 function kill_the_weeks() {
     for (k in AiArr) {
         var ai_element = document.getElementById("d" + k);
         if (parseInt(ai_element.style.left.replace("px",""))>=390) {
             ai_element.parentNode.removeChild(ai_element);
            // AiArr[i] = undefined;  no GOOD! 
             delete AiArr[k];
             
         }
         
     }
     //AiArr.sort();
     Generation++;
     lastRound_death = population - length_pop();
     population = length_pop();
     document.getElementById("Genration").innerHTML = "Generation: " + Generation;
     document.getElementById("pop").innerHTML = "population: " + population;
     document.getElementById("Moutation").innerHTML = "AVG Moutation Rate: " + rate;
     document.getElementById("velocity").innerHTML = "Velocity range: 0-" + max_vel;
   
 }

 //this function is Reproduce that thous left alive and make real elements
 function onClickReproduce(){
   var str='';
    for (k in AiArr){
        if (AiArr[k] != undefined) {
            //check if he have already children if no so okay else you too old to reproduce and cause to duplicate of same element
            if (AiArr[parseInt(k) + 100] == undefined) { 
                var children = reproduce(AiArr[k]);
                AiArr[children.id] = children;
                str += '<div id="d' + children.id + '" class="Ai">' + children.id + '</div>';
            }
           
        }
    }
     document.getElementById("world").innerHTML += str;
     
     var all = document.getElementsByClassName("Ai");
     for (k in AiArr) {
         if (AiArr[k] != undefined) {
           
                 var element = document.getElementById("d" + k);
                 element.style.backgroundColor = '#' + AiArr[k].color;
                 element.style.left = Math.floor(Math.random() * 700).toString() + "px";
                 element.style.top = Math.floor(Math.random() * 500).toString() + "px";
             
    
         }
        
     }



     population = length_pop();
     
     document.getElementById("pop").innerHTML = "population: " + population;
     document.getElementById("Moutation").innerHTML = "AVG Moutation Rate: " + rate;
     document.getElementById("velocity").innerHTML = "Velocity range: 0-" + max_vel;
     document.getElementById("Genration").innerHTML = "Generation: " + Generation;
   
     
 }
 //constractor for AI id color brain
 function AI_agent(id, Color, brain) {

     this.id = id;
     this.color = Color;
     this.brain = brain;

 }

 //constractor for Brain 2 neurons and motation rate for children.
 function CreateBrain(neuronM, MotationRate, neuronV,historyGEN) {
     this.neuronM = neuronM;            
     this.MotationRate = MotationRate;
     this.neuronV = neuronV;
     this.memory = historyGEN;
 }

 //pretty const of the possible movement
 function neuronMovement(left,right,up,down) {
     this.left = left;
     this.right = right;
     this.up = up;
     this.down = down;
     

 }

 //some get data functions.
 function Cal_Rate() {
     var sum = 0;
     for (var i = 0; i < population; i++) {
         sum += AiArr[i].brain.MotationRate;
     }
     return sum / population;
 }

 //some get data functions.
 function Cal_max() {
     var max = 0;
     for (var i = 1; i < population; i++) {
         if (parseFloat(AiArr[i].brain.neuronV) > max) {
             max = AiArr[i].brain.neuronV;
         }
     }
     return max;
}


// this function return the length of current population
 function length_pop() {
     var count = 0;
     for (k in AiArr) {
         count++
     }
     return count;
 }



// main function
 function onLoad() {
     var world = document.getElementById("world");
     var arr = '';
     var str = '';
     for (var i = 0; i < population; i++) {
         str += '<div id="d' + i + '" class="Ai">' + i + '</div>';
         var randomColor = Math.floor(Math.random() * 16777215).toString(16);
         //if hexa is less then 6 digits its a problame therefor complition to 6 digits !
         if (randomColor.length < 6) {
             var j = 6 - randomColor.length;
             for (var g = 0; g < j; g++) {
                 randomColor += Math.floor(Math.random() * 16).toString(16)
             }
         }

         var brain = new CreateBrain(neuronMove, (Math.random() * 10) / 100, Math.floor(Math.random() * 40), arr); //rate of 20%
         var AiAgent = new AI_agent(i, randomColor, brain);
         AiArr[i] = AiAgent;
         

     }
     world.innerHTML = str;

     var all = document.getElementsByClassName("Ai");
    

     for (var i = 0; i < all.length; i++) {
       
         all[i].style.backgroundColor = "#" + AiArr[i].color;
         all[i].style.left = Math.floor(Math.random() * 700).toString() + "px";
         all[i].style.top = Math.floor(Math.random() * 500).toString() + "px";
     }
     rate = Cal_Rate();
     max_vel = Cal_max();
     
 }

