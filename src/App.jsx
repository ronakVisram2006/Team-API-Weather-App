import './App.css';
import bg from './Images/background.png';
function Background() {
  return (
    <>
      <img id="background" src={bg} alt="Background" className="background" />
    </>
  );
}

function MainWeatherWindow() {
  return (
    <>
      <div className = "main-weather-window">
        <div className = "degreeGroup">
          <div className="tempRow">
            <h1 className="tempTag" id="tempVal">5</h1>
            <h1 className="degreeTag">°C</h1>
          </div>        
        </div>
      </div>
    </>
  );
}
function App() {
  return (
    <>
      <Background/>
      <MainWeatherWindow/>
    </>
  );
}

export default App;
