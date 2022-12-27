const 
    width = 500,
    pixel_width = 10;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener('load', (e) => {
    
    canvas.width = width, canvas.height = width;

    clear();

    document.addEventListener('mousedown', start);
    document.addEventListener('mouseup', stop);

});

const clear = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let coord = { x: 0, y: 0 };

const start = (event) => {
    document.addEventListener('mousemove', draw);
    reposition(event);
}

const reposition = (event) => {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

const stop = () => {
    document.removeEventListener('mousemove', draw);

    post_data({ 
        'image_data': canvas.toDataURL().replace('data:image/png;base64,', '')
    });
}

const draw = (event) => {

    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();

}

document.getElementById("btn-clear").onclick = () => clear();