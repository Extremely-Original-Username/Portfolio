import circle from "./circle";
import vector2 from "./vector2";

function vector2ToGridIndex(vector: vector2): string {
    return Math.floor(vector.x).toString() + "," + Math.floor(vector.y).toString()
}

class proximityGrid {
    map: Map<String, circle[]>;

    constructor(width: number, height: number) {
        this.map = new Map<String, circle[]>();

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.map.set(vector2ToGridIndex(new vector2(x, y)), [])
            }
        }
    }

    addCircleToGrid(circle: circle): void{
        this.map.get(vector2ToGridIndex(circle.position))?.push();
    }

    removeCircleFromGrid(circle: circle, oldPosition: vector2): void {
        let index = this.map.get(vector2ToGridIndex(oldPosition))?.indexOf(circle)
        if (index !== undefined) {
            this.map.get(vector2ToGridIndex(oldPosition))?.splice(index, 1)
        }
    }

    getCirclesWithinGridNeighborhood(position: vector2): circle[] {
        let result: circle[] = [];
        for (var x = position.x - 1; x < position.x + 1; x++) {
            for (var y = position.y - 1; y < position.y + 1; y++) {
                let currentIndex: string = vector2ToGridIndex(position);

                let circlesAtIndex = this.map.get(currentIndex)
                if (circlesAtIndex !== undefined) {
                    result.push(...circlesAtIndex);
                }
            }
        }
        return result;
    }

    
}

export default proximityGrid;