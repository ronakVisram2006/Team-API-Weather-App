function MainWeatherWindow() {
  return (
    <div className="main-weather-window">

    <div className="top-row">
      <div className="location">
        <h1 className="locationTag">London,</h1>
        <h2 className="greaterLocationTag">England</h2>
      </div>
      <div className="windDirection">
        <img className="windDirectionIcon" src="/images/group-90.svg" alt="Wind Direction Icon"/>
        <div className="windDirectionRight">
          <h2 className="windDirectionVal">NW</h2>
          <h3 className="windDirectionTag">Winds</h3>
        </div>
      </div>
    </div>

    <div className="main-row">
      <div className="sideWindowRow">
        <div className="sunrise">
          <img className="sunriseIcon" src="/images/sunrise.svg" alt="Sunrise Icon"/>
          <h2 className="sunriseTag">07:15</h2>
        </div>
        <div className="sunset">
          <img className="sunsetIcon" src="/images/sunset.svg" alt="Sunset Icon"/>
          <h2 className="sunsetTag">21:15</h2>
        </div>
      </div>

      <div className="tempCol">
        <div className="tempRow">
          <h1 className="tempTag" id="tempVal">5</h1>
          <h1 className="degreeTag">°C</h1>
          <img className="weatherIcon" src="/images/icon.svg" alt="Weather Icon"/>
        </div>
        <div className="feelsLike">
          <h2 className="feelsLikeTag">Feels like</h2>
          <h2 className="feelsLikeTemp">2</h2>
          <h2 className="feelsdegreeTag">°C</h2>
        </div>
      </div>

      <div className="statsCol">
        <div className="windSpeed">
          <img className="windSpeedIcon" src="/images/wind.svg" alt="Wind Speed Icon"/>
          <h2 className="windSpeedVal">12 mph</h2>
        </div>
        <div className="rainChance">
          <img className="rainChanceIcon" src="/images/cloud-rain.svg" alt="Rain Chance Icon"/>
          <h2 className="rainChanceVal">23%</h2>
        </div>
      </div>

    </div>
  </div>
  );
}

export default MainWeatherWindow;