function NewDayRow({ dailyWeather }) {
  if (!dailyWeather?.list) return null;

  const today = dailyWeather.list[0].dt;
  const days = dailyWeather.list.slice(0, 7).map((day) => ({
    date: day.dt,
    name: new Date(day.dt * 1000).toLocaleDateString("en-GB", { weekday: "short" }),
    dayNum: new Date(day.dt * 1000).getDate(),
    high: `${Math.round(day.temp.max)}°`,
    low: `${Math.round(day.temp.min)}°`,
    icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
    current: day.dt === today,

  }));

  return (
    <div className="day-row-wrapper">
      <div className="leftArrow">
        <img src="/images/left-arrow.svg" alt="Left Arrow Icon" />
      </div>
      <div className="new-day-row">
        {days.map((day) => (
          <div key={day.date} className={day.current ? 'current-day-panel' : 'day-panel'}>
            <div className="day-top-row" >
              <span className="day-name">{day.name}</span>
              <span className="day-date">{day.dayNum}</span>
            </div>
            <div className="day-bottom-row">
              <span className="day-high-temp">{day.high}</span>
              <img src={day.icon} alt="Weather Icon" className="day-icon" />
              <span className="day-low-temp">{day.low}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rightArrow">
        <img src="/images/right-arrow.svg" alt="Right Arrow Icon" />
      </div>
    </div>
  );
}

export default NewDayRow;