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

function HourInfoPanel({ weather, dailyWeather, selectedDay, onHourSelect, onNextDay, onPrevDay, initialOffset }) {
  const [visibleHours, setVisibleHours] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [dayHours, setDayHours] = useState([]);
  const [direction, setDirection] = useState("right");
  const [visibleDisplay, setVisibleDisplay] = useState([]);

  const iconMap = {
    "01d": clearDay, "01n": clearNight,
    "02d": fewCloudsDay, "02n": fewCloudsNight,
    "03d": scatteredClouds, "03n": scatteredClouds,
    "09d": showerRain, "09n": showerRain,
    "10d": rainDay, "10n": rainNight,
    "11d": thunderstorm, "11n": thunderstorm,
    "13d": snow, "13n": snow,
    "50d": mist, "50n": mist,
  };

  

  useEffect(() => {
    if (!weather.list || !selectedDay) return;

    const filtered = weather.list.filter(h => {
      const hDay = new Date(h.dt * 1000).getUTCDate();
      const hMonth = new Date(h.dt * 1000).getUTCMonth();
      const sDay = new Date(selectedDay * 1000).getUTCDate();
      const sMonth = new Date(selectedDay * 1000).getUTCMonth();
      return hDay === sDay && hMonth === sMonth;
    });

    setDayHours(filtered);

    // Clamp initialOffset to valid range
    const clampedOffset = Math.min(initialOffset ?? 0, Math.max(0, filtered.length - pageSize));
    setOffset(clampedOffset);
  }, [weather.list, selectedDay, initialOffset]);

  useEffect(() => {
    const updatePanels = () => {
      const width = window.innerWidth;
      let size;
      if (width > 1850) size = 8;
      else if (width > 1650) size = 7;
      else if (width > 1450) size = 6;
      else if (width > 1250) size = 5;
      else if (width > 1050) size = 4;
      else if (width > 650) size = 3;
      else size = 2;

      setPageSize(size);
    };
    updatePanels();
    window.addEventListener("resize", updatePanels);
    return () => window.removeEventListener("resize", updatePanels);
  }, []);

    useEffect(() => {
        setVisibleHours(dayHours.slice(offset, offset + pageSize));
      }, [dayHours, offset, pageSize]);
      
  const dailyEntry = dailyWeather?.list?.find(d => {
    const dDay = new Date(d.dt * 1000).getUTCDate();
    const dMonth = new Date(d.dt * 1000).getUTCMonth();
    const sDay = new Date(selectedDay * 1000).getUTCDate();
    const sMonth = new Date(selectedDay * 1000).getUTCMonth();
    return dDay === sDay && dMonth === sMonth;
  });

  return (
    <div className="hour-panel-wrapper">
      <div className="hourleftArrow"
        onClick={() => {
          setDirection("left");
          if (offset === 0) {
            onPrevDay?.();
          } else {
            setOffset(prev => Math.max(0, prev - (pageSize - 1)));
          }
        }}
        style={{ cursor: 'pointer' }}>
        <img src="/images/left-arrow.svg" alt="Left Arrow Icon" />
      </div>

      <div className="hour-panel-row" key = {`${selectedDay}-${direction}`}>
        {dayHours.length > 0 ? (
          visibleHours.map((hour, idx) => {
            const hourNum = parseInt(hour.dt_txt.split(" ")[1].slice(0, 2));
            const isNight = hourNum >= 20 || hourNum < 6;
            let iconCode = hour.weather[0].icon;
            iconCode = isNight ? iconCode.replace("d", "n") : iconCode.replace("n", "d");

            return (
              <div key={`${hour.dt}-${idx}`} className="hour-panel"
                onClick={(e) => { e.stopPropagation(); onHourSelect(hour); }}
                style={{
              cursor: 'pointer',
              animationDelay: `${
                (direction === "right"
                  ? idx * 0.05
                  : (pageSize - idx) * 0.05)
              }s`
            }}
              >
                <div className="time">{hour.dt_txt.split(" ")[1].slice(0, 5)}</div>
                <div className="hour-temp-row">
                  <img src={iconMap[iconCode] || scatteredClouds} alt="Weather Icon" className="weather-icon-center" />
                  <div className="hour-temp-num-row">
                    <span className="temperature">{Math.round(hour.main.temp)}</span>
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
            );
          })
        ) : dailyEntry ? (
          [
            { label: "Morning",   temp: dailyEntry.temp.morn,  feels: dailyEntry.feels_like.morn,  hour: 8  },
            { label: "Afternoon", temp: dailyEntry.temp.day,   feels: dailyEntry.feels_like.day,   hour: 13 },
            { label: "Evening",   temp: dailyEntry.temp.eve,   feels: dailyEntry.feels_like.eve,   hour: 18 },
            { label: "Night",     temp: dailyEntry.temp.night, feels: dailyEntry.feels_like.night, hour: 22 },
          ].slice(0, pageSize)
          .map((slot, idx) => {
            const slotIsNight = slot.hour >= 20 || slot.hour < 6;
            const slotIconCode = dailyEntry.weather[0].icon.replace(/[dn]/, slotIsNight ? 'n' : 'd');

            return (
              <div key={idx} className="hour-panel" style={{
              cursor: 'pointer',
              animationDelay: `${
              direction === "right"
                ? idx * 0.05
                : (visibleHours.length - idx) * 0.05
              }s`
            }}>
                    <div className="time">{slot.label}</div>
                <div className="hour-temp-row">
                  <img src={iconMap[slotIconCode] || scatteredClouds} alt="Weather Icon" className="weather-icon-center" />
                  <div className="hour-temp-num-row">
                    <span className="temperature">{Math.round(slot.temp)}</span>
                    <span className="degree">°C</span>
                  </div>
                </div>
                <div className="feelsLike-small">Feels like {Math.round(slot.feels)}°C</div>
                <div className="bottom-row">
                  <div className="rain-info">
                    <img src="/images/cloud-rain.svg" alt="Rain" className="bottom-icon" />
                    <span className="humidity">{Math.round(dailyEntry.pop * 100)}%</span>
                  </div>
                  <div className="wind-info">
                    <img src="/images/wind.svg" alt="Wind" className="bottom-icon" />
                    <span className="wind-speed">{Math.round(dailyEntry.speed * 2.237)} mph</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : null}
      </div>

      <div className="hourRightArrow"
        onClick={() => {
          setDirection("right");
          
          if (offset + pageSize >= dayHours.length) {
            onNextDay?.();
          } else {
            setOffset(prev => prev + (pageSize - 1));
          }
        }}
        style={{ cursor: 'pointer' }}>
        <img src="/images/right-arrow.svg" alt="Right Arrow Icon" />
      </div>
    </div>
  );
}

export default HourInfoPanel;