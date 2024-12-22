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

                <div className="largePanel center">
                    <p>This is a webpage I created to nicely present all of the projects from my github in a more user friendly way
                        (in theory at least, I am a backend developer!).</p>
                    <p>This only includes my personal projects which can be found on my <a href="https://github.com/Extremely-Original-Username">personal github</a>.
                        Most of these projects are just small passion projects I have made to indulge in my curiosity on various subjects!</p>
                </div>

                <HelloWorld />
            </div>
        </div>
    );
}

export default App;
