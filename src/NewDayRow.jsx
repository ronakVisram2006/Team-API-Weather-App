function NewDayRow() {
  return (
    <div className="active-day-panel">
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
  );
}

export default NewDayRow;
