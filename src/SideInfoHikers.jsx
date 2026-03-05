function SideInfoHikers() {
    return (
    <>
    <div className="side-info-hikers">
        <div className="weatherConditionIcon">
            <img src="/images/dry.svg" alt="Dry Conditions Icon"/>
        </div>
        <div className="weatherCondition">Dry Conditions</div>

        <div className="hiker-info">
            <div>
                <div className="cloudCoverText">Cloud Cover</div>
                <div className="cloudCoverFigure">4%</div>
                </div>
                <div>
                <div className="UVIndexText">UV Index</div>
                <div className="UVIndexFigure">2</div>
                </div>
                <div>
                <div className="HumidityText">Humidity</div>
                <div className="HumidityFigure">10%</div>
                </div>
                <div>
                <div className="visibilityText">Visibility</div>
                <div className="visibilityFigure">12km</div>
                </div>
                <div style={{gridColumn: 'span 2'}}>
                <div className="airPressureText">Air Pressure</div>
                <div className="airPressureFigure">1023 hPa</div>
            </div>
        </div>
    </div>
    </>
    );
}

export default SideInfoHikers;