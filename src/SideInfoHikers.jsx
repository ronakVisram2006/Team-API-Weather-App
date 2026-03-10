import { useState, useEffect } from 'react';


function SideInfoHikers({dailyWeather, weather}) {
    if (!dailyWeather?.list) return null;
    if (!weather?.list) return null;
    
    const current = dailyWeather.list[0];
    const hourly = weather.list[0]

    const cloudCoverage = current.clouds;
    const humidity = current.humidity;
    const visibility = (hourly.visibility / 1000).toFixed(1);
    const airPressure = current.pressure;
    const [showFirst, setShowFirst] = useState(true);

useEffect(() => {
  const interval = setInterval(() => {
    setShowFirst(prev => !prev);
  }, 5000);
  return () => clearInterval(interval);
}, []);

    return (
    <>
    <div className = "sideInfoStack">
        {showFirst ? (
        <div className="side-info-hikers" style={{display: showFirst ? 'flex' : 'none'}}>
            <div className="weatherConditionIcon">
                <img src="/images/dry.svg" alt="Dry Conditions Icon"/>
            </div>
            <div className="weatherCondition">Dry Conditions</div>

            <div className="hiker-info">
                <div>
                    <div className="cloudCoverText">Cloud Cover</div>
                    <div className="cloudCoverFigure">{cloudCoverage}%</div>
                </div>
                <div>
                    <div className="airPressureText">Air Pressure</div>
                    <div className="airPressureFigure">{airPressure} hPa</div>
                </div>
                <div>
                    <div className="HumidityText">Humidity</div>
                    <div className="HumidityFigure">{humidity}%</div>
                </div>
                <div>
                    <div className="visibilityText">Visibility</div>
                    <div className="visibilityFigure">{visibility}km</div>
                </div>
            </div>
        </div>
        ) : (
            <div className="side-info-hikers2" style={{display: showFirst ? 'none' : 'flex'}}>
            <div className="weatherConditionIcon">
                <img src="/images/sunset.svg" alt="Dry Conditions Icon"/>
            </div>
            <div className = "hikersInfoText">Hikers Info</div>
            <div className = "whatToWear">Wear some new stuff</div>
            <div className = "whenToWear">Some more info</div>
        </div>
                ) }
    </div>    
    </>
    );
}

export default SideInfoHikers;