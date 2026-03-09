function MainWeatherWindow({weather}) {
  if (!weather.list) return null;

  const current = weather.list[0];

  const timestampToTime = (timestamp, timezoneOffsetInSeconds = 0) => {
  // Add timezone offset
  const localTimestamp = timestamp + timezoneOffsetInSeconds;
  const date = new Date(localTimestamp * 1000);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

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
          <h2 className="sunriseTag">{timestampToTime(weather.city.sunrise,weather.timestamp)}</h2>
        </div>
        <div className="sunset">
          <img className="sunsetIcon" src="/images/sunset.svg" alt="Sunset Icon"/>
          <h2 className="sunsetTag">{timestampToTime(weather.city.sunset, weather.timestamp)}</h2>
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