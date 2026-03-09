
function NewDayRow({weather}) {
  if (!weather.list) return null; // Handle case when weather data is not yet available

  const dayMap = {};
  weather.list.forEach((hour) => {
    const date = hour.dt_txt.split(" ")[0];
    if (!dayMap[date]){
        dayMap[date] = {
            date,
            temps : [],
            icon : `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png` //gonna try this for now
        }

    }
    dayMap[date].temps.push(hour.main.temp);
  });
  const today = Object.keys(dayMap)[0]
  const days = Object.values(dayMap).map((d) => ({
    date : d.date,
    name: new Date(d.date).toLocaleDateString("en-GB", { weekday: "short" }),
    high: `${Math.round(Math.max(...d.temps))}°`,
    low : `${Math.round(Math.min(...d.temps))}°`,
    icon : d.icon,
    current : d.date === today,
  }));

  return (
    <>
    <div className="day-row-wrapper">
        <div className = "leftArrow">
            <img src="/images/left-arrow.svg" alt="Left Arrow Icon"/>
        </div>
        <div className="new-day-row">
        {days.map((day) => (
            <div key={day.date} className={day.current ? 'current-day-panel' : 'day-panel'}>
            <div className="day-top-row">
                <span className="day-name">{day.name}</span>
                <span className="day-date">{day.date.split("-")[2]}</span>
            </div>
            <div className="day-bottom-row">
                <span className="day-high-temp">{day.high}</span>
                <img src={day.icon} alt="Weather Icon" className="day-icon"/>
                <span className="day-low-temp">{day.low}</span>
            </div>
            </div>
        ))}
        </div>
        <div className = "rightArrow">
            <img src="/images/right-arrow.svg" alt="Right Arrow Icon"/>
        </div>
    </div>

    </>
  );
}

export default NewDayRow;