import { useEffect, useState } from 'react';
import '../styling/dynamicBackground.css';
import vector2 from './../model/vector2';

const DynamicBackground = () => {
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
                newCircle.delta.x *= -1;
            }
            if (newCircle.position.y >= 99 || newCircle.position.y < 0) {
                newCircle.delta.y *= -1;
            }

            return newCircle;
        }
    }

    const [circles, setCircles] = useState<circle[]>([]);

    //Generate objects in background
    useEffect(() => {
        const generateCircles = () => {
            const newCircles = Array.from({ length: 20 }).map(() => ({
                id: Math.random().toString(36).substr(2, 9),
                size: Math.random() * 10 + 10, // Random size between 10px and 60px
                position: new vector2(Math.random() * 100, Math.random() * 100),
                delta: new vector2((Math.random() - 0.5) / 50, (Math.random() - 0.5) / 50)
            }));
            setCircles(newCircles);
        };

        generateCircles();
    }, []);

    //Update loop for curcles
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCircles((prevCircles) =>
                prevCircles.map((oldCircle) => ({
                    ...circle.getNextFrameCircle(oldCircle)
                }))
            );
        }, 1); // Interval

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="dynamic-background">
            {circles.map((circle) => (
                <div
                    key={circle.id}
                    className="circle"
                    style={{
                        width: circle.size,
                        height: circle.size,
                        left: `${circle.position.x}%`,
                        top: `${circle.position.y}%`
                    }}
                ></div>
            ))}
        </div>
    );
};

export default DynamicBackground;
