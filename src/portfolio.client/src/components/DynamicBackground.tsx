import { useEffect, useState } from 'react';
import '../styling/DynamicBackground.css';

const DynamicBackground = () => {

    class circle {
        id: string = "";       // Unique identifier for the circle
        size: number = 0;     // Diameter of the circle in pixels
        x: number = 0;        // Horizontal position as a percentage
        y: number = 0;        // Vertical position as a percentage
        duration: number = 0; // Animation duration in seconds
    }

    const [circles, setCircles] = useState<circle[]>([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCircles((prevCircles) =>
                prevCircles.map((circle) => ({
                    ...circle, // Create a new object to avoid mutation
                    size: circle.size + 1, // Update size immutably
                }))
            );
        }, 1); // Interval

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Create an array of circles with random positions and sizes
        const generateCircles = () => {
            const newCircles = Array.from({ length: 20 }).map(() => ({
                id: Math.random().toString(36).substr(2, 9),
                size: Math.random() * 50 + 10, // Random size between 10px and 60px
                x: Math.random() * 100, // Random position on x-axis (0 to 100%)
                y: Math.random() * 100, // Random position on y-axis (0 to 100%)
                duration: Math.random() * 5 + 3, // Random animation duration (3 to 8 seconds)
            }));
            setCircles(newCircles);
        };

        generateCircles();
    }, []);

    return (
        <div className="floating-circles">
            {circles.map((circle) => (
                <div
                    key={circle.id}
                    className="circle"
                    style={{
                        width: circle.size,
                        height: circle.size,
                        left: `${circle.x}%`,
                        top: `${circle.y}%`,
                        animationDuration: `${circle.duration}s`,
                    }}
                ></div>
            ))}
        </div>
    );
};

export default DynamicBackground;
