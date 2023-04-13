export class Fireworks {
    canvas;
    
    constructor() {
        this.canvas = document.createElement('canvas');
        this.#ctx = this.canvas.getContext('2d');
        
        
    }

    #createNewFirework() {
        const x = Math.random() * this.canvas.width;
        const color = 'red';
        const speed = Math.random() * 2 + 1;
        const burstAt = 0.5 * (Math.random() * this.canvas.height + this.canvas.height);

        return new Firework(x, color, speed, burstAt);
    }
}

class Firework {
    #x;
    #y;
    #color;
    #burstAt;
    #burstParticles = [];
    #burstCount;
    #speed;
    #time;

    constructor(x, color, speed, burstAt, burstCount = 30) {
        this.x = x;
        this.y = 0;
        this.speed = speed;
        this.burstAt = burstAt;
        this.burstCount = burstCount
    }

    update(deltaTime) {
        this.#time += deltaTime;
        if (this.#y < this.#burstAt) {
            this.#y = this.#speed * this.#time
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.#x, this.#y);

        if (this.#y < this.#burstAt) this.#drawRising(ctx);
        else this.#drawBurst(ctx);

        ctx.restore();
    }

    #drawRising(ctx) {
        ctx.strokeStyle = this.#color;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, speed);
        ctx.closePath();

        ctx.stroke();
    }
}