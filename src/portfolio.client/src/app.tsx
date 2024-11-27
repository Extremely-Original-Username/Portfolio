import './styling/app.css';
import DynamicBackground from './components/dynamicBackground';
import HelloWorld from './components/helloWorld';

function App() {
    return (
        <div>
            <div className="background">
                <DynamicBackground />
            </div>

            <HelloWorld />
        </div>
    );
}

export default App;
