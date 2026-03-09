function MainWeatherWindow({weather}) {
  if (!weather.list) return null;

  const current = weather.list[0];

  let sunriseHour = Math.round((((weather.city.sunrise+weather.city.timezone)/60)/60)%24)
  if (Math.floor(sunriseHour/10)==0) sunriseHour="0".concat(sunriseHour.toString());

  let sunriseMin = Math.round(((weather.city.sunrise+weather.city.timezone)/60)%60)
  if (Math.floor(sunriseMin/10)==0) sunriseMin="0".concat(sunriseMin.toString());

  let sunsetHour = Math.round((((weather.city.sunset+weather.city.timezone)/60)/60)%24)
  if (Math.floor(sunsetHour/10)==0) sunsetHour="0".concat(sunsetHour.toString());

  let sunsetMin = Math.round(((weather.city.sunset+weather.city.timezone)/60)%60)
  if (Math.floor(sunsetMin/10)==0) sunsetMin="0".concat(sunsetMin.toString());

  return (
    <div className="main-weather-window">

    <div className="top-row">
      <div className="location">
        <h1 className="locationTag">{weather.city.name},</h1>
        <h2 className="greaterLocationTag">{weather.city.country}</h2>
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
          <h2 className="sunriseTag">{sunriseHour}:{sunriseMin}</h2>
        </div>
        <div className="sunset">
          <img className="sunsetIcon" src="/images/sunset.svg" alt="Sunset Icon"/>
          <h2 className="sunsetTag">{sunsetHour}:{sunsetMin}</h2>
        </div>
      </div>

      <div className="tempCol">
        <div className="tempRow">
          <h1 className="tempTag" id="tempVal">
            {Math.round(current.main.temp)}
          </h1>
          <h1 className="degreeTag">°C</h1>
          <img className="weatherIcon" src="/images/icon.svg" alt="Weather Icon"/>
        </div>
        <div className="feelsLike">
          <h2 className="feelsLikeTag">Feels like</h2>
          <h2 className="feelsLikeTemp">{Math.round(current.main.feels_like)}</h2>
          <h2 className="feelsdegreeTag">°C</h2>
        </div>
      </div>

      <div className="statsCol">
        <div className="windSpeed">
          <img className="windSpeedIcon" src="/images/wind.svg" alt="Wind Speed Icon"/>
          <h2 className="windSpeedVal">{current.wind.speed} m/s</h2>
        </div>
        <div className="rainChance">
          <img className="rainChanceIcon" src="/images/cloud-rain.svg" alt="Rain Chance Icon"/>
          <h2 className="rainChanceVal">test%</h2>
        </div>
      </div>

    </div>
  </div>
  );
}

export default MainWeatherWindow;