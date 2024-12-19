import { useEffect, useRef, useState } from 'react';
import circle from '../model/circle';
import lineData from '../model/lineData';
import proximityGrid from '../model/proximityGrid';
import '../styling/dynamicBackground.css';
import vector2 from './../model/vector2';

const DynamicBackground = () => {
    const [circles, setCircles] = useState<circle[]>([]);
    const [lines, setLines] = useState<lineData[]>([])
    const requestRef = useRef<number | null>(null);

    const sizeRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState(new vector2(0, 0));

    const proxGrid = useRef(new proximityGrid(10, 10, 10));

    useEffect(() => {
        const updateSize = () => {
            if (sizeRef.current) {
                setSize(new vector2(sizeRef.current.offsetWidth, sizeRef.current.offsetHeight));
            }
        };
        updateSize();

        // Observe size changes using ResizeObserver
        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });
        if (sizeRef.current) {
            resizeObserver.observe(sizeRef.current);
        }

        // Cleanup
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        console.log("Size updated:", size.x, size.y);
    }, [size]);

    //Generate circles in background
    useEffect(() => {
        const generateCircles = () => {
            const newCircles = Array.from({ length: 20 }).map(() => ({
                id: Math.random().toString(36).substr(2, 9),
                size: Math.random() * 10 + 10,                                              // Random size between 10px and 60px
                position: new vector2(Math.random() * 100, Math.random() * 100),            // Random position between 0% and 100%
                delta: new vector2((Math.random() - 0.5) / 10, (Math.random() - 0.5) / 10)
            }));
            setCircles(newCircles);

            for (var i = 0; i < newCircles.length; i++) {
                let current = newCircles[i];
                proxGrid.current.addCircleToGrid(current);
            } 
        };

        generateCircles();
    }, []);

    //Animation loop
    useEffect(() => {
        const animateCircles = () => {
            setCircles((prevCircles) =>
                prevCircles.map((oldCircle) => ({
                    ...circle.getNextFrameCircle(oldCircle, proxGrid.current)
                }))
            )

            requestRef.current = requestAnimationFrame(animateCircles);
        };

        const generateLines = () => {
            var lines: lineData[] = [];
            circles.forEach(circle => {
                proxGrid.current.getCirclesWithinGridNeighborhood(circle.position).forEach(neighbor => {
                    let newLine = new lineData(
                        new vector2(circle.position.x * size.x / 100, circle.position.y * size.y / 100),
                        new vector2(neighbor.position.x * size.x / 100, neighbor.position.y * size.y / 100),
                        "#FFFFFF", 2);
                    lines.push(newLine);
                });
            });
            setLines(lines);
        };
        generateLines();

        requestRef.current = requestAnimationFrame(animateCircles);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [proxGrid, circles]);

    return (
        <div className="dynamic-background" ref={sizeRef}>
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

            {lines.map((line) => (
                <svg width="100%" height="100%">
                    <line
                        x1={line.start.x} y1={line.start.y}
                        x2={line.end.x} y2={line.end.y}
                        stroke={line.color}
                        strokeWidth={line.strokeWidth} />
                </svg>
            ))}
        </div>
    );
};

export default DynamicBackground;
