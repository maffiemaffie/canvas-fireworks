import { Clock } from "./clock.js";

const clock = new Clock();

export class Fireworks {
    canvas;
    #ctx;
    #fireworks = [];
    
    constructor() {
        this.canvas = document.createElement('canvas');
        this.#ctx = this.canvas.getContext('2d');

        this.#fireworks.push(this.#createNewFirework());

        clock.addInterval(({deltaTime}) => {
            this.#update(deltaTime);
            this.#draw();
        });

        clock.addInterval(() => {
            this.#fireworks.push(this.#createNewFirework());
        }, 1000);
    }

    #update(deltaTime) {
        for (let firework of this.#fireworks) {
            firework.update(deltaTime);
        }
    }

    #draw() {
        this.#ctx.save();
        this.#ctx.fillStyle = 'black';
        this.#ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.#ctx.restore();

        this.#ctx.save();
        this.#ctx.translate(0, this.canvas.height);
        this.#ctx.scale(1, -1);

        for (let firework of this.#fireworks) {
            firework.draw(this.#ctx);
        }

        this.#ctx.restore();
    }

    #createNewFirework() {
        const x = Math.random() * this.canvas.width;
        const color = 'red';
        const speed = 0.5 * (Math.random() * 1 + 1);
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
        this.#x = x;
        this.#y = 0;
        this.#color = color;
        this.#speed = speed;
        this.#burstAt = burstAt;
        this.#burstCount = burstCount
        this.#time = 0;
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

        ctx.strokeStyle = this.#color;
        ctx.lineWidth = 5;

        if (this.#y < this.#burstAt) this.#drawRising(ctx);
        else this.#drawBurst(ctx);

        ctx.restore();
    }

    #drawRising(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, - this.#speed * 50);
        ctx.closePath();
        ctx.stroke();
    }

    #drawBurst(ctx) {
        const SPOKES = 7;
        for (let offset = 0, dOffset = 30; offset < 3 * dOffset; offset += dOffset) {
            for (let angle = 0, dAngle = Math.PI * 2 / SPOKES; angle < Math.PI * 2; angle += dAngle) {
                ctx.save();

                ctx.rotate(angle);
                ctx.translate(0, this.#speed * (this.#time - this.#burstAt - offset));

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, 10);
                ctx.closePath();
                ctx.stroke();

                ctx.restore();
            }
        }
    }
}