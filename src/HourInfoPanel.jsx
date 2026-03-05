
function HourInfoPanel() {
    return (
        <div className="hour-panel">
            <div className="icon-container">
                <div className="icon-outline">
                    <img src="/public/images/cloud-rain.svg" alt="Icon" />
                </div>
            </div>

            <div className="temperature">4</div>

            <div className="humidity">30%</div>

            <div className="wind-icon">
                <div className="wind-outline">
                    <img src="/public/images/wind.svg" alt="" />
                </div>
            </div>

            <div className="wind-speed">14mph</div>

            <div className="highlight-box">
                <img src="/public/images/icon.svg" alt="" />
            </div>

            <div className="time">13:00</div>

            <div className="degree">°C</div>
        </div>
        
    );
}

export default HourInfoPanel;



