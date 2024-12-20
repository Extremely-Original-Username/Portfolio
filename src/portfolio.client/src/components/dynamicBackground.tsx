import { useEffect, useRef, useState } from 'react';
import circle from '../model/circle';
import lineData from '../model/lineData';
import proximityGrid from '../model/proximityGrid';
import '../styling/dynamicBackground.css';
import vector2 from './../model/vector2';

const DynamicBackground = () => {
    const [circles, setCircles] = useState<circle[]>([]);
    const [lines, setLines] = useState<lineData[]>([])
    const circleAnimationRef = useRef<number | null>(null);
    const lineAnimationRef = useRef<number | null>(null);

    const sizeRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState(new vector2(1, 1));

    const mousePosition = useRef(new vector2(0, 0));

    const proxGrid = useRef(new proximityGrid(10, 10, 10));

    useEffect(() => {
        const mouseHandlerEvent = (event: MouseEvent) => {
            mousePosition.current.x = event.clientX / size.x * 100;
            mousePosition.current.y = event.clientY / size.y * 100;

            //Disable event for some time
            window.removeEventListener("mousemove", mouseHandlerEvent);
            setTimeout(() => window.addEventListener("mousemove", mouseHandlerEvent), 1000)
        }
        window.addEventListener("mousemove", mouseHandlerEvent);

        return () => {
            window.removeEventListener("mousemove", mouseHandlerEvent);
        }
    }, [size]);

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
            proxGrid.current = new proximityGrid(10, 10, 10);
            setCircles((prevCircles) => {
                const updatedCircles = prevCircles.map((currentCircle) => {
                    const nextCircle = circle.getNextFrameCircle(currentCircle);

                    // Update proximity grid with new positions
                    proxGrid.current.addCircleToGrid(nextCircle);

                    return nextCircle;
                });

                return updatedCircles;
            });

            circleAnimationRef.current = requestAnimationFrame(animateCircles);
        };

        circleAnimationRef.current = requestAnimationFrame(animateCircles);
        return () => {
            if (circleAnimationRef.current) cancelAnimationFrame(circleAnimationRef.current);
        };
    }, [proxGrid, circles]);

    useEffect(() => {
        const animateLines = () => {
            var lines: lineData[] = [];
            circles.forEach(circle => {
                proxGrid.current.getCirclesWithinGridNeighborhood(circle.position).forEach(neighbor => {
                    if (
                        circle.id !== neighbor.id                                                   //No self connections
                        && vector2.getVectorBetween(circle.position, neighbor.position).x >= 0      //No 2-way connections
                        //&& vector2.getSqrDistanceBetween(circle.position, neighbor.position) <= 81  //Only draw lines if within 9% distance
                    ) {
                        let newLine = new lineData(
                            new vector2((circle.position.x / 100 * size.x) + circle.size / 2, (circle.position.y / 100 * size.y) + circle.size / 2),
                            new vector2((neighbor.position.x / 100 * size.x) + neighbor.size / 2, (neighbor.position.y / 100 * size.y) + neighbor.size / 2),
                            "#FFFFFF", 1);
                        lines.push(newLine);
                    }
                });
            });
            setLines(lines);

            lineAnimationRef.current = requestAnimationFrame(animateLines);
        }

        lineAnimationRef.current = requestAnimationFrame(animateLines);
        return () => {
            if (lineAnimationRef.current) cancelAnimationFrame(lineAnimationRef.current);
        };
    }, [size.x, size.y, proxGrid]); //DO NOT ADD CIRCLES TO THIS DEPENDENCY - breaks everything. I will fix this later

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
                <svg className="line">
                    <line
                        className="line"
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
