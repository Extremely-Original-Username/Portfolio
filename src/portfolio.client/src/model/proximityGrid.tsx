import circle from "./circle";
import vector2 from "./vector2";

function vector2ToGridIndex(vector: vector2, scale: number): string {
    return Math.floor(vector.x / scale).toString() + "," + Math.floor(vector.y / scale).toString()
}

class proximityGrid {
    map: Map<String, circle[]>;
    scale: number;
    width: number;
    height: number;

    validatePositionIsOnGrid(position: vector2) {
    let correctedVector = new vector2(Math.floor(position.x / this.scale), Math.floor(position.y / this.scale));
        if (correctedVector.x < 0 || correctedVector.x >= this.width || correctedVector.y < 0 || correctedVector.y >= this.height) {
            throw RangeError("proximity grid position \"" + vector2ToGridIndex(position, this.scale).toString() + "\" out of range");
        }
    }

    constructor(width: number, height: number, scale: number) {
        this.scale = scale;
        this.map = new Map<String, circle[]>();
        this.width = width;
        this.height = height;

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.map.set(vector2ToGridIndex(new vector2(x * scale, y * scale), this.scale), [])
            }
        }
    }

    addCircleToGrid(circle: circle): void{
        this.validatePositionIsOnGrid(circle.position);

        this.map.get(vector2ToGridIndex(circle.position, this.scale))?.push(circle);
    }

    removeCircleFromGrid(circle: circle, oldPosition: vector2): void {
        this.validatePositionIsOnGrid(oldPosition);

        let index = this.map.get(vector2ToGridIndex(oldPosition, this.scale))?.indexOf(circle)
        if (index !== undefined) {
            this.map.get(vector2ToGridIndex(oldPosition, this.scale))?.splice(index, 1)
        }
        else {
            throw new RangeError("circle not found in proximity map");
        }
    }

    getCirclesWithinGridNeighborhood(position: vector2): circle[] {
        this.validatePositionIsOnGrid(position);

        let result: circle[] = [];
        for (var x = (position.x / this.scale) - 1; x < (position.x / this.scale) + 1; x++) {
            for (var y = (position.y / this.scale) - 1; y < (position.y / this.scale) + 1; y++) {
                let currentIndex: string = vector2ToGridIndex(position, this.scale);

                let circlesAtIndex = this.map.get(currentIndex)
                if (circlesAtIndex !== undefined && (position.x !== x && position.y !== y)) {
                    result.push(...circlesAtIndex);
                }
            }
        }
        return result;
    }

    
}

export default proximityGrid;