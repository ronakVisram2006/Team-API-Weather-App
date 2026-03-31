import clearDay from "/images/mappedIcons/sun.png";
import clearNight from "/images/mappedIcons/moon.png";
import fewCloudsDay from "/images/mappedIcons/cloudy.png";
import fewCloudsNight from "/images/mappedIcons/cloudy-night.png";
import scatteredClouds from "/images/mappedIcons/clouds.png";
import showerRain from "/images/mappedIcons/shower.png";
import rainDay from "/images/mappedIcons/rainy-day.png";
import rainNight from "/images/mappedIcons/raining.png";
import thunderstorm from "/images/mappedIcons/thunder.png";
import snow from "/images/mappedIcons/snow.png";
import mist from "/images/mappedIcons/fog.png";

function MainWeatherWindow({ weather, dailyWeather, selectedDay, getWeatherByCoords, getDailyWeatherByCoords, onToggle, selectedHour, onSearchClick }) {
  if (!weather.list) return null;

  const selectedDailyData = dailyWeather?.list?.find(d => d.dt === selectedDay);

  const selectedHourly = weather?.list?.filter(h => {
    const localHourDate = new Date((h.dt + weather.city.timezone) * 1000);
    const localSelectedDate = new Date((selectedDay + weather.city.timezone) * 1000);
    return (
      localHourDate.getUTCDate() === localSelectedDate.getUTCDate() &&
      localHourDate.getUTCMonth() === localSelectedDate.getUTCMonth()
    );
  });

  const sunriseRaw = selectedDailyData?.sunrise ?? weather.city.sunrise;
  const sunsetRaw = selectedDailyData?.sunset ?? weather.city.sunset;

  const sunriseDate = new Date((sunriseRaw + weather.city.timezone) * 1000);
  const sunsetDate = new Date((sunsetRaw + weather.city.timezone) * 1000);
  const sunriseHourRaw = sunriseDate.getUTCHours();
  const sunriseHour = (sunriseHourRaw % 12 || 12).toString().padStart(2, "0");
  const sunriseMin = sunriseDate.getUTCMinutes().toString().padStart(2, "0");
  const sunrisePeriod = sunriseHourRaw < 12 ? "AM" : "PM";

  const sunsetHourRaw = sunsetDate.getUTCHours();
  const sunsetHour = (sunsetHourRaw % 12 || 12).toString().padStart(2, "0");
  const sunsetMin = sunsetDate.getUTCMinutes().toString().padStart(2, "0");
  const sunsetPeriod = sunsetHourRaw < 12 ? "AM" : "PM";

  const now = new Date();

  const current = selectedHour
    ? selectedHour
    : selectedHourly?.length
    ? selectedHourly.reduce((closest, hour) => {
        const hourTime = new Date(hour.dt * 1000);
        return Math.abs(hourTime - now) < Math.abs(new Date(closest.dt * 1000) - now)
          ? hour : closest;
      }, selectedHourly[0])
    : weather.list[0];

  const getIsNight = (timestamp, sunrise, sunset) => {
    return timestamp < sunrise || timestamp >= sunset;
  };

const localTimestamp = (selectedHour?.dt ?? selectedDailyData?.dt ?? current.dt) + weather.city.timezone;  
const localSunrise = sunriseRaw + weather.city.timezone;
  const localSunset = sunsetRaw + weather.city.timezone;
  const isNightCurrent = getIsNight(localTimestamp, localSunrise, localSunset);

  const iconCode = selectedHour
    ? current.weather[0].icon.replace(/[dn]/, isNightCurrent ? 'n' : 'd')
    : selectedDailyData
      ? selectedDailyData.weather[0].icon.replace(/[dn]/, isNightCurrent ? 'n' : 'd')
      : current.weather[0].icon;

  const iconMap = {
    "01d": clearDay, "01n": clearNight,
    "02d": fewCloudsDay, "02n": fewCloudsNight,
    "03d": scatteredClouds, "03n": fewCloudsNight,
    "04d": scatteredClouds, "04n": fewCloudsNight,
    "09d": showerRain, "09n": showerRain,
    "10d": rainDay, "10n": rainNight,
    "11d": thunderstorm, "11n": thunderstorm,
    "13d": snow, "13n": snow,
    "50d": mist, "50n": mist,
  };

  const iconSrc = iconMap[iconCode] || scatteredClouds;

  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="main-weather-window" onClick={onToggle} style={{ cursor: 'pointer' }}>
      <div className="top-row">
        <div className="locational-row">
          <div className="location">
            <h1 className="locationTag">{weather.city.name},</h1>
            <h2 className="greaterLocationTag">{weather.city.country}</h2>
          </div>
          <img className="currentLocationIcon" alt="Search" src="./images/magnifier.png" onClick={(e) => {
            e.stopPropagation();
            onSearchClick();
          }} />
        </div>
        <div className="windDirection">
          <img className="windDirectionIcon" src="/images/group-90.svg" alt="Wind Direction Icon" style={{ transform: `rotate(${current.wind.deg}deg)` }} />
          <div className="windDirectionRight">
            <h2 className="windDirectionVal">{getWindDirection(current.wind.deg)}</h2>
            <h3 className="windDirectionTag">Winds</h3>
          </div>
        </div>
      </div>

      <div className="main-row">
        <div className="sideWindowRow">
          <div className="sunrise">
            <img className="sunriseIcon" src="/images/sunrise.svg" alt="Sunrise Icon" />
            <h2 className="sunriseTag">{sunriseHour}:{sunriseMin} {sunrisePeriod}</h2>
          </div>
          <div className="sunset">
            <img className="sunsetIcon" src="/images/sunset.svg" alt="Sunset Icon" />
            <h2 className="sunsetTag">{sunsetHour}:{sunsetMin} {sunsetPeriod}</h2>
          </div>
        </div>

        <div className="tempCol">
          <div className="tempRow">
            <h1 className="tempTag" id="tempVal">
              {selectedHour ? Math.round(selectedHour.main.temp) : selectedDailyData ? Math.round(selectedDailyData.temp.day) : Math.round(current.main.temp)}
            </h1>
            <h1 className="degreeTag">°C</h1>
            <img className="weatherIcon" src={iconSrc} alt="Weather Icon" />
          </div>
          <div className="feelsLike">
            <h2 className="feelsLikeTag">Feels like</h2>
            <h2 className="feelsLikeTemp">
              {selectedHour ? Math.round(selectedHour.main.feels_like) : selectedDailyData ? Math.round(selectedDailyData.feels_like.day) : Math.round(current.main.feels_like)}
            </h2>
            <h2 className="feelsdegreeTag">°C</h2>
          </div>
        </div>

        <div className="statsCol">
          <div className="windSpeed">
            <img className="windSpeedIcon" src="/images/wind.svg" alt="Wind Speed Icon" />
            <h2 className="windSpeedVal">{Math.round(current.wind.speed * 2.237)} mph</h2>
          </div>
          <div className="rainChance">
            <img className="rainChanceIcon" src="/images/cloud-rain.svg" alt="Rain Chance Icon" />
            <h2 className="rainChanceVal">{Math.round(current.pop * 100)}%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainWeatherWindow;