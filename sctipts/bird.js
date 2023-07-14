let speed = 1;

class Canvas {
    constructor() {
        this.element = document.getElementById('canvas');
        this.context = this.element.getContext('2d');

        this.color = "#70c5ce";
    }

    draw() {}
}

class Background {
    constructor(speed, fieldWidth, fieldHeight) {
        this._parallax = 6;
        this.speed = speed;

        this.sx = 0;
        this.sy = 0;
        this.swidth = 276;
        this.sheight = 112

        this.dx = 0;
        this.dy = fieldHeight - this.sheight;

    }

    calcPosition() {
        this.dx = (this.dx - this.speed / this._parallax) % this.swidth;
    }
}

class Ground {
    constructor(speed) {
        this.speed = speed;
        this._swidth = swidth;
        this.offsetX = 0;
    }

    calcPosition() {
        this.bgX = (bgX - speed / this._parallax) % this._swidth;
    }
}