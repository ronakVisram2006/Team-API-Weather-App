import { useState, useEffect } from 'react';
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

const rainGear = {
  optional: "Low precipitation - No rain gear needed",
  recommended: "Moderate precipitation - A light jacket is recommended",
  essential: "Expected precipitation - A rain jacket and waterproof pants is needed",
};

const visibilityGear = {
  optional: "Clear visibility - No navigation gear needed",
  recommended: "Reduced visibility - A map or GPS is recommended as signs may be harder to see",
  essential: "Poor visibility - A map and GPS is essential and wear bright clothing",
};

const temperatureGear = {
  freezing: "Freezing temperatures - Insulated and waterproof clothing is essential",
  cold: "Cold temperatures - Thermal clothing and a warm jacket is recommended",
  mild: "Mild temperatures - A warm layer is recommended",
  warm: "Warm temperatures - A light layer is recommended",
  hot: "Hot temperatures - Lightweight clothing is essential",
};

const uvGear = {
  optional: "Low UV exposure - No sun protection needed",
  recommended: "Moderate UV - Wear sunglasses and apply sunscreen",
  essential: "High UV - Wear sunscreen, sunglasses, and a hat for protection",
};

const footwear = {
  slippery: "Slippery conditions - Wear shoes with good traction",
  muddy: "Muddy conditions - Waterproof boots are recommended",
  dry: "Dry conditions - Regular hiking shoes are sufficient",
  icy: "Icy conditions - Crampons or ice cleats are essential for safety",
};

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

const lowUVKeywords = ["thunderstorm", "drizzle", "rain", "snow", "sleet", "mist", "smoke", "haze", "fog", "dust", "broken", "overcast"];

const moderateUVKeywords = ["broken", "scattered", "mist", "haze", "fog"];

const highUVKeywords = ["clear", "few clouds"];

function SideInfoHikers({ dailyWeather, weather, selectedDay, showFirst, setShowFirst, onToggle, timezoneOffset = 0 , uv}) {

  if (!dailyWeather?.list) return null;
  if (!weather?.list) return null;
  if (!selectedDay) return null;

  const current = dailyWeather.list.find(d => d.dt === selectedDay) ?? dailyWeather.list[0];

  const hourly = weather.list.filter(h => {
    const localHour = new Date((h.dt + timezoneOffset) * 1000);
    const localSelected = new Date((selectedDay + timezoneOffset) * 1000);
    return (
      localHour.getUTCDate() === localSelected.getUTCDate() &&
      localHour.getUTCMonth() === localSelected.getUTCMonth()
    );
  });

  const hourlyEntry = hourly.length ? hourly[0] : weather.list[0];

  const cloudCoverage = current.clouds;
  const humidity = current.humidity;
  const visibility = ((hourlyEntry.visibility ?? 10000) / 1000).toFixed(1);
  const airPressure = current.pressure;

  const condition = current?.weather?.[0]?.description ?? "";
  const conditionIcon = iconMap[current?.weather?.[0]?.icon] ?? "/images/mappedIcons/mountain.png";

  const avgPop = hourly.length
    ? hourly.reduce((sum, h) => sum + (h.pop ?? 0), 0) / hourly.length
    : (current.pop ?? 0);


  const getHikerRainInfo = () => {
    if (avgPop < 0.25) return rainGear.optional;
    if (avgPop < 0.55) return rainGear.recommended;
    return rainGear.essential;
  };

  const getHikerVisibilityInfo = () => {
    const vis = parseFloat(visibility);
    if (vis >= 8) return visibilityGear.optional;
    if (vis >= 4) return visibilityGear.recommended;
    return visibilityGear.essential;
  };

  const getHikerTemperatureInfo = () => {
    const temp = current.temp?.day ?? current.temp;
    if (temp <= 0) return temperatureGear.freezing;
    if (temp <= 8) return temperatureGear.cold;
    if (temp <= 18) return temperatureGear.mild;
    if (temp <= 25) return temperatureGear.warm;
    return temperatureGear.hot;
  };

  const getHikerUVInfo = () => {
    const temp = current.temp?.day ?? current.temp;
    const c = condition.toLowerCase();
    if (temp < 8 && lowUVKeywords.some(keyword => c.includes(keyword))) return uvGear.optional;
    if (temp <= 18 && moderateUVKeywords.some(keyword => c.includes(keyword))) return uvGear.recommended;
    if (temp > 18 && highUVKeywords.some(keyword => c.includes(keyword))) return uvGear.essential;
    else return uvGear.recommended;
  };

  const getFootwearInfo = () => {
    const c = condition.toLowerCase();
    if (c.includes("rain")) return footwear.muddy;
    if (c.includes("snow")) return footwear.icy;
    if (c.includes("drizzle")) return footwear.slippery;
    return footwear.dry;
  };

  return (
    <div className="sideInfoStack">
      <div
        className={`side-info-hikers ${showFirst ? 'active' : ''}`}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
      >
        <div className="weatherConditionIcon">
          <img src={conditionIcon} alt="Conditions Icon" />
        </div>
        <div className="weatherCondition">{condition?.toUpperCase?.()}</div>
        <div className="hiker-info">
          <div>
            <div className="cloudCoverText">Cloud Cover</div>
            <div className="cloudCoverFigure">{cloudCoverage}%</div>
          </div>
          <div>
            <div className="airPressureText">Air Pressure</div>
            <div className="airPressureFigure">{airPressure} hPa</div>
          </div>
          <div>
            <div className="HumidityText">Humidity</div>
            <div className="HumidityFigure">{humidity}%</div>
          </div>
          <div>
            <div className="visibilityText">Visibility</div>
            <div className="visibilityFigure">{visibility}km</div>
          </div>
        </div>
      </div>

      <div
        className={`side-info-hikers2 ${!showFirst ? 'active' : ''}`}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
      >
        <div className="hikersInfoText">Recommended Gear For Hiking</div>
        <div className="iconRow">
          <div className="iconWrapper">
            <img src="/images/infoIcons/heavy-rain.png" alt="Rain Icon" />
            <span className="tooltip">{getHikerRainInfo()}</span>
          </div>
          <div className="iconWrapper">
            <img src="/images/infoIcons/eye.png" alt="Visibility Icon" />
            <span className="tooltip">{getHikerVisibilityInfo()}</span>
          </div>
          <div className="iconWrapper">
            <img src="/images/infoIcons/temperature.png" alt="Temperature Icon" />
            <span className="tooltip">{getHikerTemperatureInfo()}</span>
          </div>
          <div className="iconWrapper">
            <img src="/images/infoIcons/uv.png" alt="UV Icon" />
            <span className="tooltip">{getHikerUVInfo()}</span>
          </div>
          <div className="iconWrapper">
            <img src="/images/infoIcons/safety-boot.png" alt="Footwear Icon" />
            <span className="tooltip">{getFootwearInfo()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideInfoHikers;