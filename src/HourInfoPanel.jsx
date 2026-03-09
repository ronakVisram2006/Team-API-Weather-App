function HourInfoPanel({weather}) {
  if (!weather.list) return null; // Handle case when weather data is not yet available

  return (
    <>
    <div className = "hour-panel-wrapper">
        <div className = "hourleftArrow">
            <img src="/images/left-arrow.svg" alt="Left Arrow Icon"/>
        </div>
    <div className="hour-panel-row">
      {weather.list && (weather.list.slice(0,6).map((hour, idx) => (
        <div key={idx} className="hour-panel">
          <div className="time">{hour.dt_txt.split(" ")[1].slice(0,5)}</div>
          <div className="hour-temp-row">
            <img src='/images/icon.svg' alt="Weather Icon" className="weather-icon-center"/>
            <div className="hour-temp-num-row">
              <span className="temperature">{Math.round(hour.main.temp)}</span>
              <span className="degree">°C</span>
            </div>
          </div>
          <div className="bottom-row">
            <div className="rain-info">
              <img src="/images/cloud-rain.svg" alt="Rain" className="bottom-icon"/>
              <span className="humidity">test</span>
            </div>
            <div className="wind-info">
              <img src="/images/wind.svg" alt="Wind" className="bottom-icon"/>
              <span className="wind-speed">{hour.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      )))}
    </div>
        <div className = "hourRightArrow">
            <img src="/images/right-arrow.svg" alt="right Arrow Icon"/>
        </div>
    </div>
    </>
  );
}

export default HourInfoPanel;