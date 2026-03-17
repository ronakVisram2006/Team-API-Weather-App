function NewDayRow({ dailyWeather, weather, selectedDay, onDaySelect }) {
  if (!dailyWeather?.list) return null;
  if (!weather?.list) return null;

  const today = dailyWeather.list[0].dt;

  const isSelected = (date) => {
    if (selectedDay) return date === selectedDay;
    return date === today;
  };

  const days = dailyWeather.list.slice(0, 7).map((day) => {
    const dayDate = new Date(day.dt * 1000).toLocaleDateString("en-GB");
    const hourlyForDay = weather.list.filter(hour =>
      new Date(hour.dt * 1000).toLocaleDateString("en-GB") === dayDate
    );
    const temps = hourlyForDay.map(h => h.main.temp);

    return {
      date: day.dt,
      name: new Date(day.dt * 1000).toLocaleDateString("en-GB", { weekday: "short" }),
      dayNum: new Date(day.dt * 1000).getDate(),
      high: temps.length ? `${Math.round(Math.max(...temps))}°` : `${Math.round(day.temp.max)}°`,
      low: temps.length ? `${Math.round(Math.min(...temps))}°` : `${Math.round(day.temp.min)}°`,
      icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
    };
  });

  return (
    <div className="day-row-wrapper">
      <div className="leftArrow">
        <img src="/images/left-arrow.svg" alt="Left Arrow Icon" />
      </div>
      <div className="new-day-row">
        {days.map((day) => (
          <div
            key={day.date}
            className={isSelected(day.date) ? 'current-day-panel' : 'day-panel'}
            onClick={() => onDaySelect(day.date)}
            style={{ cursor: 'pointer' }}
          >
            <div className="day-top-row">
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