const canvas = document.getElementById("fireworks");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let particles = [];

    class Particle {

        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.dx = (Math.random() - 0.5) * 8;
            this.dy = (Math.random() - 0.5) * 8;
            this.life = 80;
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;
            this.dy += 0.05;
            this.life--;

            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

function rocket(x){

    let y = canvas.height;

    const fly = setInterval(()=>{

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        y -= 12;

if(y < canvas.height * 0.30){

    clearInterval(fly);

    const colors = [
        "#ff004c",
        "#00e5ff",
        "#ffd500",
        "#00ff88",
        "#ffffff",
        "#ff66cc",
        "#ff9900",
        "#9b59b6"
    ];

    for(let i=0;i<120;i++){

        particles.push(
            new Particle(
                x,
                y,
                colors[Math.floor(Math.random()*colors.length)]
            )
        );

    }

}

    },16);

}

    window.launchFirework = function () {

        const colors = [
            "#ff004c",
            "#00e5ff",
            "#ffd500",
            "#00ff88",
            "#ffffff",
            "#ff66cc"
        ];

        const x = Math.random() * canvas.width;
        rocket(x);
	const y = canvas.height * 0.25 + Math.random() * 100;

        for (let i = 0; i < 100; i++) {
            particles.push(
                new Particle(
                    x,
                    y,
                    colors[Math.floor(Math.random() * colors.length)]
                )
            );
        }
    };

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles = particles.filter(p => p.life > 0);

        particles.forEach(p => p.update());

        requestAnimationFrame(animate);
    }

    animate();
}

