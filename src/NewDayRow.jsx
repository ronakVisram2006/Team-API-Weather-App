const days = [
  { name: 'Mon', date: '3rd', high: '7°', low: '2°', icon: '/images/icon.svg' },
  { name: 'Tues', date: '4th', high: '8°', low: '3°', icon: '/images/icon.svg' },
  { name: 'Wed', date: '5th', high: '6°', low: '4°', icon: '/images/icon.svg', current: true },
  { name: 'Thurs', date: '6th', high: '5°', low: '1°', icon: '/images/icon.svg' },
  { name: 'Fri', date: '7th', high: '9°', low: '3°', icon: '/images/icon.svg' },
  { name: 'Sat', date: '8th', high: '10°', low: '4°', icon: '/images/icon.svg' },
    { name: 'Sun', date: '9th', high: '8°', low: '2°', icon: '/images/icon.svg' },
];

function NewDayRow() {
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
                <span className="day-date">{day.date}</span>
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