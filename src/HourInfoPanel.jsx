const hourTimes = [
  { time: '11:00', temp: '3', rain: '20%', wind: '10mph', icon: '/images/icon.svg' },
  { time: '12:00', temp: '4', rain: '25%', wind: '12mph', icon: '/images/icon.svg' },
  { time: '13:00', temp: '4', rain: '30%', wind: '14mph', icon: '/images/icon.svg' },
  { time: '14:00', temp: '5', rain: '20%', wind: '11mph', icon: '/images/icon.svg' },
  { time: '15:00', temp: '5', rain: '15%', wind: '9mph',  icon: '/images/icon.svg' },
];

function HourInfoPanel() {
  return (
    <div className="hour-panel-row">
      {hourTimes.map((hour) => (
        <div key={hour.time} className="hour-panel">
          <div className="time">{hour.time}</div>
          <div className="hour-temp-row">
            <img src={hour.icon} alt="Weather Icon" className="weather-icon-center"/>
            <div className="hour-temp-num-row">
              <span className="temperature">{hour.temp}</span>
              <span className="degree">°C</span>
            </div>
          </div>
          <div className="bottom-row">
            <div className="rain-info">
              <img src="/images/cloud-rain.svg" alt="Rain" className="bottom-icon"/>
              <span className="humidity">{hour.rain}</span>
            </div>
            <div className="wind-info">
              <img src="/images/wind.svg" alt="Wind" className="bottom-icon"/>
              <span className="wind-speed">{hour.wind}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HourInfoPanel;