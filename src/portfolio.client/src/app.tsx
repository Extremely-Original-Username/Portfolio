import './styling/app.css';
import DynamicBackground from './components/dynamicBackground';
import HelloWorld from './components/helloWorld';
import SplashHeader from './components/splashHeader';

function App() {
    return (
        <div>
            <div className="background">
                <DynamicBackground />
            </div>

            <SplashHeader title="Hello!" subTitle="Welcome to my portfolio." />

            <HelloWorld />

            <div className="standardPanel">
                <h1 id="tabelLabel">Test</h1>
                <p>testing</p>
            </div>
        </div>
    );
}

export default App;
