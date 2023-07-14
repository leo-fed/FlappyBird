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

let birdSource = {
    x: 276,
    width: 34,
    height: 26
}


let flightStage = 0;
let birdPosition = (canvas.height - birdSource.height) / 2;

let birdDestination = {
    x: (canvas.width - birdSource.width) / 2,
    y: birdPosition,
    width: birdSource.width,
    height: birdSource.height
}



let bgX = 0;
let X = 0
const SPEED = 1;
const PARALLAX = 6;
const G = 0.2;

let rateOfFall = 0;
document.addEventListener("keydown", () => {rateOfFall = -5;})

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
    birdPosition = birdPosition + rateOfFall;

    birdSource.y = 112 + birdSource.height * Math.floor(flightStage % 3);

    birdDestination.y = birdPosition;

    ctx.drawImage(
        img, 
        birdSource.x, 
        birdSource.y, 
        birdSource.width, 
        birdSource.height, 

        birdDestination.x, 
        birdDestination.y, 
        birdDestination.width, 
        birdDestination.height);
}

function draw() {
    bgDraw();
    groundDraw();
    birdDraw();
    if (birdDestination.y < (canvas.height - groundSource.height - birdSource.height)) {
        window.requestAnimationFrame(draw);
    } else {
        console.log("you fail")
    }
    
}


window.requestAnimationFrame(draw);