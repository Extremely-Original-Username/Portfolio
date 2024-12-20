import vector2 from "./vector2";

class circle {
    id: string = "";       // Unique identifier for the circle
    size: number = 0;     // Diameter of the circle in pixels
    position: vector2 = new vector2(0, 0);
    delta: vector2 = new vector2(0, 0);

    constructor(id: string, size: number, positon: vector2, delta: vector2) {
        this.id = id;
        this.size = size;
        this.position = positon;
        this.delta = delta;
    }

    static inverseNumber (num: number, base: number) {
        if (num >= 0) {
            return base - num;
        } else {
            return -base - num;
        }
    }

    static applyDrag(speed: number, baseSpeed: number, dragReductionFactor: number) {
        if (speed > baseSpeed) {
            return speed - ((speed - baseSpeed) / dragReductionFactor);
        }
        return speed;
    }

    static getNextFrameCircle(item: circle, mousePos: vector2, maxRepelDistance: number): circle {

        if (mousePos === undefined) {
            mousePos = item.position;
        }

        const newCircle = new circle(item.id, item.size, item.position, item.delta);

        if (vector2.getSqrDistanceBetween(mousePos, newCircle.position) < maxRepelDistance * maxRepelDistance) {
            const betweenVector = vector2.getVectorBetween(newCircle.position, mousePos)

            

            betweenVector.x = this.inverseNumber(betweenVector.x, maxRepelDistance);
            betweenVector.y = this.inverseNumber(betweenVector.y, maxRepelDistance);

            newCircle.delta.x -= betweenVector.x / 2000;
            newCircle.delta.y -= betweenVector.y / 2000;
        }
        else {
            newCircle.delta.x = this.applyDrag(newCircle.delta.x, 0.5 / 10, 50);
            newCircle.delta.y = this.applyDrag(newCircle.delta.y, 0.5 / 10, 50);
        }

        newCircle.position.x += newCircle.delta.x;
        newCircle.position.y += newCircle.delta.y;

        if (newCircle.position.x > 99 || newCircle.position.x < 0) {
            newCircle.position.x = Math.max(Math.min(newCircle.position.x, 99), 0)
            newCircle.delta.x *= -1;
        }
        if (newCircle.position.y > 99 || newCircle.position.y < 0) {
            newCircle.position.y = Math.max(Math.min(newCircle.position.y, 99), 0)
            newCircle.delta.y *= -1;
        }
        return newCircle;
    }
}

export default circle;