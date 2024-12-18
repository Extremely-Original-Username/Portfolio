import vector2 from "./vector2";

class lineData{
    start: vector2;
    end: vector2;
    color: string;
    strokeWidth: number;

    constructor(start: vector2, end: vector2, color: string, strokeWidth: number)  {
        this.start = start;
        this.end = end;
        this.color = color;
        this.strokeWidth = strokeWidth;
    }
}

export default lineData;