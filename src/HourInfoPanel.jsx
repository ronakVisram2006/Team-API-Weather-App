import { useState, useEffect } from "react";

import clearDay from "/images/mappedIcons/sun.png";
import clearNight from "/images/mappedIcons/moon.png";
import fewCloudsDay from "/images/mappedIcons/cloudy.png";
import fewCloudsNight from "/images/mappedIcons/cloudy-night.png";
import scatteredClouds from "/images/mappedIcons/clouds.png";
import scatteredCloudsNight from "/images/mappedIcons/cloudy-night.png";
import showerRain from "/images/mappedIcons/shower.png";
import rainDay from "/images/mappedIcons/rainy-day.png";
import rainNight from "/images/mappedIcons/raining.png";
import thunderstorm from "/images/mappedIcons/thunder.png";
import snow from "/images/mappedIcons/snow.png";
import mist from "/images/mappedIcons/fog.png";

const getPageSize = (width) => {
  if (width > 1850) return 8;
  if (width > 1650) return 7;
  if (width > 1450) return 6;
  if (width > 1250) return 5;
  if (width > 1050) return 4;
  if (width > 650)  return 3;
  return 2;
};

const getDayNightIcon = (baseIcon, hour) => {
  const suffix = (hour >= 20 || hour < 6) ? "n" : "d";
  return baseIcon.slice(0, -1) + suffix;
};

function HourInfoPanel({
  weather,
  dailyWeather,
  selectedDay,
  onHourSelect,
  onNextDay,
  onPrevDay,
  initialOffset,
  timezoneOffset = 0,
}) {
  const [visibleHours, setVisibleHours] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(() => getPageSize(window.innerWidth));
  const [dayHours, setDayHours] = useState([]);
  const [direction, setDirection] = useState("right");
  const [activeHour, setActiveHour] = useState(null);

  function onSelectHour(hour) {
    setActiveHour(hour.dt);
  }

  const iconMap = {
    "01d": clearDay, "01n": clearNight,
    "02d": fewCloudsDay, "02n": fewCloudsNight,
    "03d": scatteredClouds, "03n": scatteredCloudsNight,
    "04d": scatteredClouds, "04n": scatteredCloudsNight,
    "09d": showerRain, "09n": showerRain,
    "10d": rainDay, "10n": rainNight,
    "11d": thunderstorm, "11n": thunderstorm,
    "13d": snow, "13n": snow,
    "50d": mist, "50n": mist,
  };

  const getLocalTime = (dt) => {
    const date = new Date((dt + timezoneOffset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const mins = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${mins}`;
  };

  useEffect(() => {
    const updatePanels = () => setPageSize(getPageSize(window.innerWidth));
    window.addEventListener("resize", updatePanels);
    return () => window.removeEventListener("resize", updatePanels);
  }, []);

  useEffect(() => {
  if (!weather?.list || !selectedDay) {
    setDayHours([]);
    return;
  }

  const filtered = weather.list.filter((h) => {
    const localHourDate = new Date((h.dt + timezoneOffset) * 1000);
    const localSelectedDate = new Date((selectedDay + timezoneOffset) * 1000);
    return (
      localHourDate.getUTCDate() === localSelectedDate.getUTCDate() &&
      localHourDate.getUTCMonth() === localSelectedDate.getUTCMonth()
    );
  });
  // In HourInfoPanel, right after the filtered line:
console.log("selectedDay:", selectedDay, new Date((selectedDay + timezoneOffset) * 1000).toUTCString());
console.log("All hour dates:", weather.list.slice(0, 5).map(h => ({
  dt: h.dt,
  local: new Date((h.dt + timezoneOffset) * 1000).toUTCString()
})));
console.log("filtered count:", filtered.length);

  setDayHours(filtered);

  const clampedOffset = Math.min(
    initialOffset ?? 0,
    Math.max(0, filtered.length - pageSize)
  );
  setOffset(clampedOffset);
}, [weather?.list, selectedDay, initialOffset, pageSize, timezoneOffset]); // 👈 added timezoneOffset

  useEffect(() => {
    setVisibleHours(dayHours.slice(offset, offset + pageSize));
  }, [dayHours, offset, pageSize]);

const dailyEntry = dailyWeather?.list?.find((d) => {
  const dDay = new Date((d.dt + timezoneOffset) * 1000).getUTCDate();
  const dMonth = new Date((d.dt + timezoneOffset) * 1000).getUTCMonth();
  const sDay = new Date((selectedDay + timezoneOffset) * 1000).getUTCDate();
  const sMonth = new Date((selectedDay + timezoneOffset) * 1000).getUTCMonth();
  return dDay === sDay && dMonth === sMonth;
});

  const hasHourlyData = dayHours.length > 0;
  const shouldShowFallback = !hasHourlyData && !!dailyEntry;

  return (
    <div className="hour-panel-wrapper">
      <div className="hourleftArrow"
        onClick={() => {
          setDirection("left");
          if (offset === 0) {
            onPrevDay?.();
          } else {
            setOffset((prev) => Math.max(0, prev - (pageSize - 1)));
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <img src="/images/left-arrow.svg" alt="Left Arrow Icon" />
      </div>

      <div className="hour-panel-row" key={`${selectedDay}-${direction}`}>
        {hasHourlyData ? (
          visibleHours.map((hour, idx) => {
            const iconCode = hour.weather[0].icon;

            return (
              <div
                key={`${hour.dt}-${idx}`}
                className={`hour-panel ${activeHour === hour.dt ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onHourSelect(hour);
                  onSelectHour(hour);
                }}
                style={{
                  cursor: 'pointer',
                  animationDelay: `${(direction === "right" ? idx : pageSize - idx) * 0.05}s`,
                }}
              >
                <div className="time">{getLocalTime(hour.dt)}</div>
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
        ) : shouldShowFallback ? (
          [
            { label: "Morning", temp: dailyEntry.temp.morn, feels: dailyEntry.feels_like.morn, hour: 8, icon: getDayNightIcon(dailyEntry.weather[0].icon, 8) },
            { label: "Afternoon", temp: dailyEntry.temp.day, feels: dailyEntry.feels_like.day, hour: 13, icon: getDayNightIcon(dailyEntry.weather[0].icon, 13) },
            { label: "Evening", temp: dailyEntry.temp.eve, feels: dailyEntry.feels_like.eve, hour: 18, icon: getDayNightIcon(dailyEntry.weather[0].icon, 18) },
            { label: "Night", temp: dailyEntry.temp.night, feels: dailyEntry.feels_like.night, hour: 22, icon: getDayNightIcon(dailyEntry.weather[0].icon, 22) },
          ].slice(0, pageSize).map((slot, idx) => (
            <div
              key={idx}
              className="hour-panel"
              style={{ cursor: 'pointer', animationDelay: `${idx * 0.05}s` }}
            >
              <div className="time">{slot.label}</div>
              <div className="hour-temp-row">
                <img src={iconMap[slot.icon] || scatteredClouds} alt="Weather Icon" className="weather-icon-center" />
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
                  <span className="wind-speed">{Math.round((dailyEntry.speed || 0) * 2.237)} mph</span>
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>

      <div className="hourRightArrow"
        onClick={() => {
          setDirection("right");
          if (offset + pageSize >= dayHours.length) {
            onNextDay?.();
          } else {
            setOffset((prev) => prev + (pageSize - 1));
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <img src="/images/right-arrow.svg" alt="Right Arrow Icon" />
      </div>
    </div>
  );
}

export default HourInfoPanel;