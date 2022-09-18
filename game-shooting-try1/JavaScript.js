const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const scoreEl = document.querySelector("#scoreEl")
const startGameBtn = document.querySelector('#startGameBtn')
const modal = document.querySelector('#modal'); 
const bigScore = document.querySelector('#bigScore');
var Level = 0;

class Player {
    constructor(x,y,radius,color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill()
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill()
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}


const friction = 0.97;
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill()
        c.restore()
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01
    }
}


const X = canvas.width / 2;
const Y = canvas.height / 2;

let player = new Player(X,Y, 10, 'white');

let projectiles = [];
let enemies = [];
let particles = [];


function init() {
    let player = new Player(X, Y, 10, 'white');
     projectiles = [];
     enemies = [];
    particles = [];
    score = 0;
    scoreEl.innerHTML = score;
    bigScore.innerHTML = score;
}

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4;
        let x;
        let y;
        if (Math.random()<0.5) {
             x = Math.random() < 0.5 ? 0 - radius : X * 2 + radius;  //X is canvas.witdh/2
             y = Math.random()*Y*2

        }
        else {
            x = Math.random() * X * 2
            y = Math.random() < 0.5 ? 0 - radius : Y * 2 + radius; 
        }
        
        const color = `hsl(${Math.random()*360},50%,50%)`;

        const angle = Math.atan2(Y-y, X-x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        }
        enemies.push(new Enemy(x,y,radius,color,velocity))
    }, Level)
}


let animationId
let score = 0;
function animate() {
    animationId=requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    
    particles.forEach((particle, index) => {
        if (particle.alpha<=0) {
            particles.splice(index, 1)
        }
        else {
            particle.update();
        }
       
    })
    projectiles.forEach((projectile,index) => {
        projectile.update();

        //remove the gunshot if they out of the screen
        if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > X * 2 || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius>Y*2) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        }
    })


    enemies.forEach((enemy,index)=> {
        enemy.update()
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (dist-enemy.radius-player.radius<1) {
            
            cancelAnimationFrame(animationId);
            modal.style.display = 'flex'
            bigScore.innerHTML = score;
        }
        projectiles.forEach((projectile, projectileIndex) => {
            const dis = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            //obj touch projectile touch enemy
            if (dis - enemy.radius - projectile.radius < 1) {

               

                //create explosions!!
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(new Particle(projectile.x, projectile.y, Math.random()*2, enemy.color,
                        {
                            x: (Math.random() - 0.5)*(Math.random()*6),
                            y: (Math.random() - 0.5) * (Math.random() * 6)
                        }))
                }
                if (enemy.radius - 10 > 5) {

                    score += 100;
                    scoreEl.innerHTML = score;

                    gsap.to(enemy, {
                       radius: enemy.radius - 10
                    })
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }
                else {

                    score += 250;
                    scoreEl.innerHTML = score;


                    setTimeout(() => {
                        enemies.splice(index, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }
             
            }

        })
    })
}

window.addEventListener('click', (event) => {

    const angle = Math.atan2(event.clientY - Y, event.clientX - X)
   
    const velocity = {
        x:Math.cos(angle)*5,
        y:Math.sin(angle)*5,
    }



    projectiles.push(new Projectile(X, Y, 5, 'white', velocity))
   

})

startGameBtn.addEventListener('click', () => {
    SetLevel();
    init();
    modal.style.display = 'none';
    animate();
    spawnEnemies();
})


function SetLevel() {
    var rates = document.getElementsByName('drone');
    var rate_value;
    for (var i = 0; i < rates.length; i++) {
        if (rates[i].checked) {
            rate_value = rates[i].value;
        }
    }
    if (rate_value=="Easy") {
        Level = 3500;
    }
    else if (rate_value == "Meduim") {
        Level = 1100;
    } 

    else if (rate_value == "Hard") {
        Level = 850;
    } 

    else {
        Level = 455;
    }
       
    
}