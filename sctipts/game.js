const canvas = document.querySelector("canvas");

canvas.setAttribute("height", document.documentElement.clientHeight - 2);
canvas.setAttribute("width", document.documentElement.clientWidth > 431 ? 431 : document.documentElement.clientWidth);

const ctx = canvas.getContext("2d");

const imgURL = "./images/sprite.png";

const img = new Image();
img.src = imgURL;

const bgSource = {
    x: 0,
    y: 0,
    width: 276,
    height: 228
}

const groundSource = {
    x: 276,
    y: 0,
    width: 224,
    height: 112
}


let bgX = 0;
let X = 0
const SPEED = 1;
const PARALLAX = 6;

function bgDraw() {
    bgX = (bgX - SPEED / PARALLAX) % bgSource.width;

    const bgDestinationOne = {
        x: bgX,
        y: (canvas.height - bgSource.height),
        width: bgSource.width,
        height: bgSource.height
    }

    const bgDestinationTwo = {
        x: bgX + bgSource.width,
        y: (canvas.height - bgSource.height),
        width: bgSource.width,
        height: bgSource.height
    }

    const bgDestinationThree = {
        x: bgX + bgSource.width *2,
        y: (canvas.height - bgSource.height),
        width: bgSource.width,
        height: bgSource.height
    }

    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        img, 
        bgSource.x, 
        bgSource.y, 
        bgSource.width, 
        bgSource.height, 

        bgDestinationOne.x, 
        bgDestinationOne.y, 
        bgDestinationOne.width, 
        bgDestinationOne.height);

    ctx.drawImage(
        img, 
        bgSource.x, 
        bgSource.y, 
        bgSource.width, 
        bgSource.height, 

        bgDestinationTwo.x, 
        bgDestinationTwo.y, 
        bgDestinationTwo.width, 
        bgDestinationTwo.height);

    ctx.drawImage(
        img, 
        bgSource.x, 
        bgSource.y, 
        bgSource.width, 
        bgSource.height, 

        bgDestinationThree.x, 
        bgDestinationThree.y, 
        bgDestinationThree.width, 
        bgDestinationThree.height);
}

function groundDraw() {
    X = (X - SPEED) % groundSource.width;

    const bgDestinationOne = {
        x: X,
        y: (canvas.height - groundSource.height),
        width: groundSource.width,
        height: groundSource.height
    }

    const bgDestinationTwo = {
        x: X + groundSource.width,
        y: (canvas.height - groundSource.height),
        width: groundSource.width,
        height: groundSource.height
    }

    const bgDestinationThree = {
        x: X + groundSource.width *2,
        y: (canvas.height - groundSource.height),
        width: groundSource.width,
        height: groundSource.height
    }

    ctx.drawImage(
        img, 
        groundSource.x, 
        groundSource.y, 
        groundSource.width, 
        groundSource.height, 

        bgDestinationOne.x, 
        bgDestinationOne.y, 
        bgDestinationOne.width, 
        bgDestinationOne.height);

    ctx.drawImage(
        img, 
        groundSource.x, 
        groundSource.y, 
        groundSource.width, 
        groundSource.height, 

        bgDestinationTwo.x, 
        bgDestinationTwo.y, 
        bgDestinationTwo.width, 
        bgDestinationTwo.height);

    ctx.drawImage(
        img, 
        groundSource.x, 
        groundSource.y, 
        groundSource.width, 
        groundSource.height, 

        bgDestinationThree.x, 
        bgDestinationThree.y, 
        bgDestinationThree.width, 
        bgDestinationThree.height);
}

function draw() {
    bgDraw();
    groundDraw();

    window.requestAnimationFrame(draw);
}


window.requestAnimationFrame(draw);