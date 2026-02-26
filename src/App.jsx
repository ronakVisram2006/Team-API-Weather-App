import './App.css';
import bg from './Images/background.png';
import React from 'react';
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
        <div className="location">
          <h1 className="locationTag">London,</h1>
          <h1 className="greaterLocationTag">England</h1>
        </div>
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
