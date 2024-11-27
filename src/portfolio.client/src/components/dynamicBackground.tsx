import { useEffect, useState } from 'react';
import circle from '../model/circle';
import '../styling/dynamicBackground.css';
import vector2 from './../model/vector2';

const DynamicBackground = () => {
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
        }, 40); // Interval

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
