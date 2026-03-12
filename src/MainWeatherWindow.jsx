function MainWeatherWindow({weather, getWeatherByCoords, getDailyWeatherByCoords}) {
  if (!weather.list) return null;

  const current = weather.list[0];
  const iconURL = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  let sunriseHour = Math.round((((weather.city.sunrise+weather.city.timezone)/60)/60)%24)
  if (sunriseHour<10) sunriseHour="0".concat(sunriseHour.toString());

  let sunriseMin = Math.round(((weather.city.sunrise+weather.city.timezone)/60)%60)
  if (sunriseMin<10) sunriseMin="0".concat(sunriseMin.toString());

  let sunsetHour = Math.round((((weather.city.sunset+weather.city.timezone)/60)/60)%24)
  if (sunsetHour<10) sunsetHour="0".concat(sunsetHour.toString());

  let sunsetMin = Math.round(((weather.city.sunset+weather.city.timezone)/60)%60)
  if (sunsetMin<10) sunsetMin="0".concat(sunsetMin.toString());

  const currentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition (
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          getWeatherByCoords(lat, lon);
          getDailyWeatherByCoords(lat, lon);
        },
        (error) => {
          alert("Unable to retrieve your location. Please allow location access and try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className="main-weather-window">
    <div className="top-row">
      <div className="location">
        <h1 className="locationTag">{weather.city.name},</h1>
        <h2 className="greaterLocationTag">{weather.city.country}</h2>
        <img className="currentLocationIcon" src="./images/location.png" alt="Location Icon" onClick={currentLocation} />
      </div>
      <div className="windDirection">
        <img className="windDirectionIcon" src="/images/group-90.svg" alt="Wind Direction Icon"   style={{ transform: `rotate(${current.wind.deg}deg)` }} />
        <div className="windDirectionRight">
          <h2 className="windDirectionVal">{getWindDirection(current.wind.deg)}</h2>
          <h3 className="windDirectionTag">Winds</h3>
        </div>
      </div>
    </div>

    <div className="main-row">
      <div className="sideWindowRow">
        <div className="sunrise">
          <img className="sunriseIcon" src="/images/sunrise.svg" alt="Sunrise Icon"/>
          <h2 className="sunriseTag">{sunriseHour}:{sunriseMin} AM</h2>
        </div>
        <div className="sunset">
          <img className="sunsetIcon" src="/images/sunset.svg" alt="Sunset Icon"/>
          <h2 className="sunsetTag">{sunsetHour}:{sunsetMin} PM</h2>
        </div>
      </div>

      <div className="tempCol">
        <div className="tempRow">
          <h1 className="tempTag" id="tempVal">
            {Math.round(current.main.temp)}
          </h1>
          <h1 className="degreeTag">°C</h1>
          <img className="weatherIcon" src={iconURL} alt="Weather Icon"/>
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
          <h2 className="windSpeedVal">{Math.round(current.wind.speed * 2.237)} mph</h2>
        </div>
        <div className="rainChance">
          <img className="rainChanceIcon" src="/images/cloud-rain.svg" alt="Rain Chance Icon"/>
          <h2 className="rainChanceVal">{Math.round(current.pop * 100)}% </h2>
        </div>
      </div>

    </div>
  </div>
  );
}

export default MainWeatherWindow;