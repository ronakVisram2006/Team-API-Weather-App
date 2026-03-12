import { useState, useEffect } from "react";

function HourInfoPanel({ weather }) {
  const [visibleHours, setVisibleHours] = useState([]);

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
          {visibleHours.map((hour, idx) => (
            <div key={idx} className="hour-panel">

              <div className="time">
                {hour.dt_txt.split(" ")[1].slice(0, 5)}
              </div>

              <div className="hour-temp-row">
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
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
          ))}
        </div>

        <div className="hourRightArrow">
          <img src="/images/right-arrow.svg" alt="Right Arrow Icon" />
        </div>

      </div>
    </>
  );
}

export default HourInfoPanel;