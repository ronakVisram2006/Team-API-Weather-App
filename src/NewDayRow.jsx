function NewDayRow(){
    return(
        <div className="day-panel">
            <div className="day-name">Tues</div>
            <div className="day-high-temp">8°</div>
            <div className="day-low-temp">3°</div>
            <div className="day-date">4th</div>
            <div className="day-icon-container">
                <div className="day-icon-box">
                    <img src="/images/cloud-rain.svg" alt="Weather Icon" className="day-icon"/>
                </div>
            </div>
        </div>

    );
}

export default NewDayRow;
