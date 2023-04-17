import { Fireworks } from './fireworks.js';

(() => {
    const container = document.querySelector('#fireworks-container');
    const fireworks = new Fireworks();
    container.appendChild(fireworks.canvas);
})();