import { useEffect, useState } from 'react';
import '../styling/DynamicBackground.css';

const DynamicBackground = () => {
    const [circles, setCircles] = useState([]);

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
