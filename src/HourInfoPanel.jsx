import { useState, useEffect } from "react";

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

function HourInfoPanel({ weather }) {
  const [visibleHours, setVisibleHours] = useState([]);


  const iconMap = {
    "01d": clearDay,
    "01n": clearNight,

    "02d": fewCloudsDay,
    "02n": fewCloudsNight,

    "03d": scatteredClouds,
    "03n": scatteredClouds,

    "09d": showerRain,
    "09n": showerRain,

    "10d": rainDay,
    "10n": rainNight,

    "11d": thunderstorm,
    "11n": thunderstorm,

    "13d": snow,
    "13n": snow,

    "50d": mist,
    "50n": mist,
  };
  useEffect(() => {
    if (!weather.list) return;

    const updatePanels = () => {
      const width = window.innerWidth;

      if (width > 1850) setVisibleHours(weather.list.slice(0, 8));
      else if (width > 1650) setVisibleHours(weather.list.slice(0, 7));
      else if (width > 1450) setVisibleHours(weather.list.slice(0, 6));
      else if (width > 1250) setVisibleHours(weather.list.slice(0, 5));
      else if (width > 1050) setVisibleHours(weather.list.slice(0, 4));
      else if (width > 650) setVisibleHours(weather.list.slice(0,3));
      else setVisibleHours(weather.list.slice(0, 2));
    };

    updatePanels();

    window.addEventListener("resize", updatePanels);
    return () => window.removeEventListener("resize", updatePanels);

  }, [weather.list]);

  if (!weather.list) return null;

  return (
    <>
      <div className="hour-panel-wrapper">

        <div className="hourleftArrow">
          <img src="/images/left-arrow.svg" alt="Left Arrow Icon" />
        </div>

        <div className="hour-panel-row">
          {visibleHours.map((hour, idx) => {

              const hourNum = parseInt(hour.dt_txt.split(" ")[1].slice(0, 2));

              const isNight = hourNum >= 20 || hourNum < 6;

              let iconCode = hour.weather[0].icon;
              iconCode = isNight
                ? iconCode.replace("d", "n")
                : iconCode.replace("n", "d");

          return (
            <div key={idx} className="hour-panel">

              <div className="time">
                {hour.dt_txt.split(" ")[1].slice(0, 5)}
              </div>

              <div className="hour-temp-row">
              <img
                src={iconMap[iconCode] || scatteredClouds}
                alt="Weather Icon"
                className="weather-icon-center"
              />

                <div className="hour-temp-num-row">
                  <span className="temperature">
                    {Math.round(hour.main.temp)}
                  </span>
                  <span className="degree">°C</span>
                </div>
              </div>

              <div className="bottom-row">
                <div className="rain-info">
                  <img src="/images/cloud-rain.svg" alt="Rain" className="bottom-icon" />
                  <span className="humidity">{Math.round(hour.pop * 100)}%</span>
                </div>

                <div className="wind-info">
                  <img src="/images/wind.svg" alt="Wind" className="bottom-icon" />
                  <span className="wind-speed">{Math.round(hour.wind.speed * 2.237)} mph</span>
                </div>
              </div>

            </div>
          )})}
        </div>

        <div className="hourRightArrow">
          <img src="/images/right-arrow.svg" alt="Right Arrow Icon" />
        </div>

      </div>
    </>
  );
}

export default HourInfoPanel;