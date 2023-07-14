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
    x: 277,
    y: 0,
    width: 224,
    height: 112
}

let birdSource = {
    x: 278,
    width: 34,
    height: 26
}


let flightStage = 0;
let birdPosition = 0.3 * canvas.height;

let birdDestination = {
    x: canvas.width * 0.25,
    y: birdPosition,
    width: birdSource.width,
    height: birdSource.height
}


const DEG = Math.PI / 180;
let bgX = 0;
let X = 0
const SPEED = 1;
const PARALLAX = 5;
const G = 0.2;
let angle = 0;

let rateOfFall = 0;
document.addEventListener("keydown", touch);
document.addEventListener("touchstart", touch);
document.addEventListener("mousedown", touch);

function bgDraw() {
    bgX = (bgX - SPEED / PARALLAX) % bgSource.width;

    const bgDestination = {
        x: bgX,
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

        bgDestination.x, 
        bgDestination.y, 
        bgDestination.width, 
        bgDestination.height);

    ctx.drawImage(
        img, 
        bgSource.x, 
        bgSource.y, 
        bgSource.width, 
        bgSource.height, 

        bgDestination.x + bgSource.width - 0.5, 
        bgDestination.y, 
        bgDestination.width, 
        bgDestination.height);

    ctx.drawImage(
        img, 
        bgSource.x, 
        bgSource.y, 
        bgSource.width, 
        bgSource.height, 

        bgDestination.x + bgSource.width*2 - 1, 
        bgDestination.y, 
        bgDestination.width, 
        bgDestination.height);
}

function groundDraw() {
    X = (X - SPEED) % groundSource.width;

    const DestinationOne = {
        x: X,
        y: (canvas.height - groundSource.height),
        width: groundSource.width,
        height: groundSource.height
    }

    const DestinationTwo = {
        x: X + groundSource.width,
        y: (canvas.height - groundSource.height),
        width: groundSource.width,
        height: groundSource.height
    }

    const DestinationThree = {
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

        DestinationOne.x, 
        DestinationOne.y, 
        DestinationOne.width, 
        DestinationOne.height);

    ctx.drawImage(
        img, 
        groundSource.x, 
        groundSource.y, 
        groundSource.width, 
        groundSource.height, 

        DestinationTwo.x, 
        DestinationTwo.y, 
        DestinationTwo.width, 
        DestinationTwo.height);

    ctx.drawImage(
        img, 
        groundSource.x, 
        groundSource.y, 
        groundSource.width, 
        groundSource.height, 

        DestinationThree.x, 
        DestinationThree.y, 
        DestinationThree.width, 
        DestinationThree.height);
}

function birdDraw() {
    flightStage = (flightStage + SPEED / 6);
    rateOfFall = rateOfFall + G;
    if (angle < 90) {angle += 5*G}
    birdPosition = birdPosition + rateOfFall;
    if (birdPosition < birdDestination.height/2) {birdPosition = birdDestination.height/2; rateOfFall = 0}

    birdSource.y = 113 + birdSource.height * Math.floor(flightStage % 3);

    birdDestination.y = birdPosition;

    ctx.save()
    ctx.translate(birdDestination.x, birdDestination.y);
    ctx.rotate(angle * DEG)
    ctx.drawImage(
        img, 
        birdSource.x, 
        birdSource.y, 
        birdSource.width, 
        birdSource.height, 

        -birdDestination.width/2, 
        -birdDestination.height/2,
        birdDestination.width, 
        birdDestination.height);
    ctx.restore();
}



function draw() {
    bgDraw();
    groundDraw();
    birdDraw();
    if (birdDestination.y < (canvas.height - groundSource.height - birdDestination.height/2)) {
        window.requestAnimationFrame(draw);

    } else {
        console.log("you fail");
        end()
    }
    
}

function start() {
    bgDraw();
    groundDraw();
    birdDraw();
    const startImgSourse = {
        x: 0,
        y: 228,
        width: 173,
        height: 152
    }
    ctx.drawImage(
        img, 
        startImgSourse.x, 
        startImgSourse.y, 
        startImgSourse.width, 
        startImgSourse.height, 

        (canvas.width - startImgSourse.width)/2, 
        0.195 * canvas.height,
        startImgSourse.width, 
        startImgSourse.height);
}

function end() {
    const endImgSourse = {
        x: 175,
        y: 228,
        width: 226,
        height: 200
    }
    
    ctx.drawImage(
        img, 
        endImgSourse.x, 
        endImgSourse.y, 
        endImgSourse.width, 
        endImgSourse.height, 

        (canvas.width - endImgSourse.width)/2, 
        0.195 * canvas.height,
        endImgSourse.width, 
        endImgSourse.height);

        frame = 2;
}

let frame = 1;
img.onload = start;

function touch() {
    if (frame === 1) {
        window.requestAnimationFrame(draw);
        frame = 0
    } else if (frame === 2) {
        location.reload()
    }
    rateOfFall = -5; 
    angle = -20; 
    
}