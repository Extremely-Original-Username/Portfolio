import './styling/app.css';
import DynamicBackground from './components/dynamicBackground';
import HelloWorld from './components/helloWorld';
import SplashHeader from './components/splashHeader';

function App() {
    return (
        <div className="wrapper">
            <div className="background">
                <DynamicBackground />
            </div>

            <div className="foreground">
                <SplashHeader title="Hello!" subTitle="Welcome to my portfolio." />

                <HelloWorld />

                <div className="largePanel center">
                    <h1 id="tabelLabel">Test</h1>
                    <p>testing</p>
                </div>
            </div>
        </div>
    );
}

export default App;
