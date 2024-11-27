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

    static getNextFrameCircle(item: circle): circle {
        const newCircle = new circle(item.id, item.size, item.position, item.delta);

        newCircle.position.x += newCircle.delta.x;
        newCircle.position.y += newCircle.delta.y;

        if (newCircle.position.x >= 99 || newCircle.position.x < 0) {
            newCircle.position.x = 98;
            newCircle.delta.x *= -1;
        }
        if (newCircle.position.y >= 99 || newCircle.position.y < 0) {
            newCircle.position.y = 98;
            newCircle.delta.y *= -1;
        }

        return newCircle;
    }
}

export default circle;