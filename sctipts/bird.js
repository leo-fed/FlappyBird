let speed = 1;

class Background {
    constructor(speed, fieldWidth, fieldHeight) {
        this._parallax = 6;
        this.speed = speed;

        this.sx = 0;
        this.sy = 0;
        this.swidth = 276;
        this.sheight = 228;

        this.dx = 0;
        this.dy = fieldHeight - this.sheight;

    }

    calcPosition() {
        this.dx = (this.dx - this.speed / this._parallax) % this.swidth;
    }
}

class Ground {
    constructor(speed, fieldWidth, fieldHeight) {
        this.speed = speed;
        this.color = "#70c5ce";

        this.sx = 276;
        this.sy = 0;
        this.swidth = 224;
        this.sheight = 112;

        this.dx = 0;
        this.dy = fieldHeight - this.sheight;
    }

    calcPosition() {
        this.dx = (this.dx - this.speed) % this.swidth;
    }
}

class Pipes {
    constructor() {

    }
}

class Bird {
    constructor() {
        this.speed = speed;
        this.flightStage = 0;

        this.sx = 278;
        this.sy = 113;
        this.swidth = 34;
        this.sheight = 26;

        this.dx = (canvas.width - birdSource.width) / 2;
        this.dy = (canvas.height - birdSource.height) / 2;
    }
}

class Canvas {
    constructor() {
        this.cvs = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    draw() {}
}