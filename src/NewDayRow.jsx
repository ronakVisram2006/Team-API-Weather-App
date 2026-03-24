import { useState, useEffect } from "react";

function NewDayRow({ dailyWeather, weather, selectedDay, onDaySelect }) {
  if (!dailyWeather?.list) return null;
  if (!weather?.list) return null;

  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("left");
  const pageSize = 7;
  const totalPages = Math.ceil(dailyWeather.list.length / pageSize);

  const changePage = (newPage, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setPage(newPage);
      setAnimating(false);
    }, 300);
  };

  const today = dailyWeather.list[0].dt;

  const isSelected = (date) => {
    if (selectedDay) return date === selectedDay;
    return date === today;
  };

  const days = dailyWeather.list.slice(page * pageSize, page * pageSize + pageSize).map((day) => {
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
      <div
        className="leftArrow"
        onClick={() => page > 0 && changePage(page - 1, "right")}
        style={{ cursor: page === 0 ? 'default' : 'pointer', opacity: page === 0 ? 0.3 : 1 }}
      >
        <img src="/images/left-arrow.svg" alt="Left Arrow Icon" />
      </div>

      <div className={`new-day-row ${animating ? `slide-out-${direction}` : `slide-in-${direction}`}`}>
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

      <div
        className="rightArrow"
        onClick={() => page < totalPages - 1 && changePage(page + 1, "left")}
        style={{ cursor: page === totalPages - 1 ? 'default' : 'pointer', opacity: page === totalPages - 1 ? 0.3 : 1 }}
      >
        <img src="/images/right-arrow.svg" alt="Right Arrow Icon" />
      </div>
    </div>
  );
}

export default NewDayRow;