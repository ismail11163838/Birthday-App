function showWish() {

    let msg = document.getElementById("message");

    if (msg) {
        msg.style.display = "block";
    }

    let music = document.getElementById("bgmusic");

    if (music) {
        music.play().catch(() => {});
    }

    startCountdown();
    fireworks();
    flowerRain();
}

function startCountdown() {

    let count = 3;

    let box = document.createElement("div");

    box.id = "countdown";

    box.style.position = "fixed";
    box.style.top = "0";
    box.style.left = "0";
    box.style.width = "100%";
    box.style.height = "100%";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.fontSize = "120px";
    box.style.fontWeight = "bold";
    box.style.color = "white";
    box.style.background = "rgba(0,0,0,.55)";
    box.style.zIndex = "9999";

    document.body.appendChild(box);

    let timer = setInterval(() => {

        box.innerHTML = count;

        count--;

        if (count < 0) {

            clearInterval(timer);

            box.innerHTML = "🎉 Happy Birthday 🎂";

            createHearts();

            setTimeout(() => {
                box.remove();
            },2000);

        }

    },1000);

}

function createHearts(){

    setInterval(()=>{

        let h=document.createElement("div");

        h.innerHTML="❤️";

        h.style.position="fixed";
        h.style.left=Math.random()*100+"vw";
        h.style.top="100vh";
        h.style.fontSize=(20+Math.random()*30)+"px";
        h.style.zIndex="999";

        document.body.appendChild(h);

        let y=100;

        let anim=setInterval(()=>{

            y-=2;

            h.style.top=y+"vh";

            if(y<-10){

                clearInterval(anim);

                h.remove();

            }

        },20);

    },300);

}

function fireworks() {

    for (let i = 0; i < 8; i++) {

        setTimeout(() => {

            let rocket = document.createElement("div");

            rocket.innerHTML = "🚀";

            rocket.style.position = "fixed";
            rocket.style.left = (10 + Math.random() * 80) + "vw";
            rocket.style.bottom = "0px";
            rocket.style.fontSize = "30px";
            rocket.style.zIndex = "9999";
            rocket.style.transition = "all 1.5s linear";

            document.body.appendChild(rocket);

            setTimeout(() => {

                rocket.style.bottom = "85vh";

            }, 50);

            setTimeout(() => {

                let boom = document.createElement("div");

                boom.innerHTML = "💥✨";

                boom.style.position = "fixed";
                boom.style.left = rocket.style.left;
                boom.style.top = "10vh";
                boom.style.fontSize = "45px";
                boom.style.zIndex = "9999";

                document.body.appendChild(boom);

                rocket.remove();

                setTimeout(() => {
                    boom.remove();
                }, 1000);

            }, 1500);

        }, i * 300);

    }

}

function flowerRain(){

    setInterval(()=>{

        let flower=document.createElement("div");

        let flowers=["🌸","🌹","🌺","💮","🌷"];

        flower.innerHTML=flowers[Math.floor(Math.random()*flowers.length)];

        flower.style.position="fixed";
        flower.style.left=Math.random()*100+"vw";
        flower.style.top="-50px";
        flower.style.fontSize=(20+Math.random()*20)+"px";
        flower.style.zIndex="9999";
        flower.style.pointerEvents="none";

        document.body.appendChild(flower);

        let y=-50;

        let fall=setInterval(()=>{

            y+=3;

            flower.style.top=y+"px";

            if(y>window.innerHeight){

                clearInterval(fall);

                flower.remove();

            }

        },20);

    },400);

}

function openGift(){

    let gift = document.getElementById("gift-box");

    gift.style.transform = "scale(1.5) rotate(20deg)";
    gift.style.transition = "0.6s";

    setTimeout(()=>{

        gift.style.display="none";

        balloons();
        confettiEffect();

        for(let i=0;i<6;i++){
            setTimeout(()=>{
                if(typeof launchFirework==="function"){
                    launchFirework();
        }
    },i*500);
}
        document.getElementById("bgmusic").play();
        showWish();

    },600);

}

function balloons(){

    let emojis = ["🎈","🎈","🎈","🎉"];

    for(let i=0;i<25;i++){

        let b = document.createElement("div");

        b.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

        b.style.position = "fixed";
        b.style.left = Math.random()*100 + "vw";
        b.style.bottom = "-80px";
        b.style.fontSize = (30+Math.random()*20) + "px";
        b.style.pointerEvents = "none";
        b.style.zIndex = "9999";

        document.body.appendChild(b);

        let y = -80;

        let fly = setInterval(()=>{

            y += 4;

            b.style.bottom = y + "px";

            if(y > window.innerHeight + 100){
                clearInterval(fly);
                b.remove();
            }

        },20);

    }

}

function confettiEffect(){

    let emojis=["🎊","✨","🎉","💖"];

    for(let i=0;i<50;i++){

        let c=document.createElement("div");

        c.innerHTML=emojis[Math.floor(Math.random()*emojis.length)];

        c.style.position="fixed";
        c.style.left=Math.random()*100+"vw";
        c.style.top="-50px";
        c.style.fontSize=(15+Math.random()*20)+"px";
        c.style.pointerEvents="none";
        c.style.zIndex="9999";

        document.body.appendChild(c);

        let y=-50;

        let fall=setInterval(()=>{

            y+=5;

            c.style.top=y+"px";

            if(y>window.innerHeight){

                clearInterval(fall);

                c.remove();

            }

        },20);

    }

}

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];

function Particle(x,y,color){

    this.x=x;
    this.y=y;

    this.dx=(Math.random()-0.5)*8;
    this.dy=(Math.random()-0.5)*8;

    this.life=80;

    this.color=color;

}

Particle.prototype.draw=function(){

    ctx.beginPath();

    ctx.arc(this.x,this.y,3,0,Math.PI*2);

    ctx.fillStyle=this.color;

    ctx.fill();

}

Particle.prototype.update=function(){

    this.x+=this.dx;

    this.y+=this.dy;

    this.life--;

    this.draw();

}

function animateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles=particles.filter(p=>p.life>0);

    particles.forEach(p=>p.update());

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

