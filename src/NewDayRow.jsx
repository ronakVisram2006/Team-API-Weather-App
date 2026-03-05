function NewDayRow() {
  return (
    <div className="new-day-row">
      <div className="day-panel">
        <div className="day-top-row">
          <span className="day-name">Tues</span>
          <span className="day-date">4th</span>
        </div>
        <div className="day-bottom-row">
          <span className="day-high-temp">8°</span>
          <img src="/images/icon.svg" alt="Weather Icon" className="day-icon"/>
          <span className="day-low-temp">3°</span>
        </div>
      </div>

      <div className="current-day-panel">
        <div className="day-top-row">
          <span className="day-name">Wed</span>
          <span className="day-date">5th</span>
        </div>
        <div className="day-bottom-row">
          <span className="day-high-temp">6°</span>
          <img src="/images/icon.svg" alt="Weather Icon" className="day-icon"/>
          <span className="day-low-temp">4°</span>
        </div>
      </div>
    </div>
  );
}

export default NewDayRow;
