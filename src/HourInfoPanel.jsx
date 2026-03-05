function HourInfoPanel() {
  return (
    <div className="hour-panel">
      <div className="time">13:00</div>
      <img src="/images/icon.svg" alt="Weather Icon" className="weather-icon-center"/>
      <div className="temp-row">
        <span className="temperature">4</span>
        <span className="degree">°C</span>
      </div>
      <div className="bottom-row">
        <div className="rain-info">
          <img src="/images/cloud-rain.svg" alt="Rain" className="bottom-icon"/>
          <span className="humidity">30%</span>
        </div>
        <div className="wind-info">
          <img src="/images/wind.svg" alt="Wind" className="bottom-icon"/>
          <span className="wind-speed">14mph</span>
        </div>
      </div>
    </div>
  );
}

export default HourInfoPanel;