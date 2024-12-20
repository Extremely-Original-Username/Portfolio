class vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static getVectorBetween(a: vector2, b: vector2): vector2 {
        return new vector2(b.x - a.x, b.y - a.y);
    }

    static getSqrDistanceBetween(a: vector2, b: vector2): number {
        return Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)
    }
}

export default vector2;