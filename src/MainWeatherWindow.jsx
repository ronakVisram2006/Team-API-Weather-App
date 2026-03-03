function MainWeatherWindow() {
  return (
    <>
      <div className = "main-weather-window">
        <div className="location">
          <h1 className="locationTag">London,</h1>
          <h1 className="greaterLocationTag">England</h1>
        </div>
        <div sideWindow>
          <div className="sideWindowRow">
            <img className="sunriseIcon" src="/images/sunrise.svg" alt="Sunrise Icon"/>
            <h2 className="sunriseTag">6:30</h2>
          </div>
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

export default MainWeatherWindow;   