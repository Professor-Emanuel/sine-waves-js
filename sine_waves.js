const gui = new dat.GUI();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
    y: canvas.height/2,
    length: 0.01,
    amplitude: 100,
    frequency: 0.01
}

const strokeColor = {
    h: 200,
    s: 50,
    l: 50
}

const backgroundColor = {
    r:116,
    g:0,
    b:220,
    a:0.01
}

const waveFolder = gui.addFolder('wave');

waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', -0.01, 0.01);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.01, 1);
waveFolder.open();

const strokeFolder = gui.addFolder("stroke");
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 's', 0, 100);
strokeFolder.add(strokeColor, 'l', 0, 100);
strokeFolder.open();

const backgroundFolder = gui.addFolder('background');
backgroundFolder.add(backgroundColor, 'r', 0, 255);
backgroundFolder.add(backgroundColor, 'g', 0, 255);
backgroundFolder.add(backgroundColor, 'b', 0, 255);
backgroundFolder.add(backgroundColor, 'a', 0, 1);
backgroundFolder.open();

let increment = wave.frequency;

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = `rgba(${Math.abs(backgroundColor.r * Math.sin(increment))}, 
    ${Math.abs(backgroundColor.g * Math.sin(increment))}, 
    ${Math.abs(backgroundColor.b * Math.sin(increment))}, 
    ${Math.abs(backgroundColor.a * Math.sin(increment))})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    ctx.moveTo(0, canvas.height/2);

    for(let i=0; i<canvas.width; i++){
        ctx.lineTo(i, wave.y + (Math.sin(i * wave.length + increment) * wave.amplitude) / i * 230);
    }

    ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${Math.abs(strokeColor.s * Math.sin(increment))}%, ${Math.abs(strokeColor.l * Math.sin(increment))}%)`
    ctx.stroke();
    increment += wave.frequency;
}

animate();