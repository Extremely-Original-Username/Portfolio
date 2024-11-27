import { useState, useEffect } from 'react';
import './styling/app.css';
import DynamicBackground from './components/dynamicBackground';
import { env } from "process";

function App() {
    const [helloWorldText, setHelloWorldText] = useState(''); // State to store the fetched data

    useEffect(() => {
        async function fetchHelloWorld() {
            try {
                const endpoint = process.env.REACT_APP_API_URL + "HelloWorld";
                const response = await fetch(endpoint); // Fetch data from the endpoint
                const data = await response.text(); // Get the text response
                setHelloWorldText(data); // Update the state with the fetched text
            } catch (error) {
                console.error('Error fetching HelloWorld:', error); // Handle errors
                setHelloWorldText('Error fetching data.');
            }
        }

        fetchHelloWorld(); // Call the fetch function
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div>
            <div className="background">
                <DynamicBackground />
            </div>

            <div className="foreground">
                <h1 id="tabelLabel">Sample page</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <div>{helloWorldText || 'Loading...'}</div> {/* Display fetched text or a loading message */}
            </div>
        </div>
    );
}

export default App;
