import { useState, useEffect } from 'react';

const hikerRainInformation = {
    0: "low rain risk : no need for rain gear",
    1: "moderate rain risk : bring an umbrella ",
    2: "high rain risk : bring a rain coat and some waterproof shoes",
    3: "very high rain risk : bring a rain coat and boots for slippery conditions",
};

const hikerVisibilityInformation = {
    0: "low visibility risk : no need for additional gear",
    1: "moderate visibility risk : bring a flashlight ",
    2: "very high visibility risk : bring a high visibility vest and a flashlight",
};


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


    const getHikerRainInfo = () => {
        console.log(hourly.pop);
        if (hourly.pop < 0.25) return hikerRainInformation[0];
        else if (0.25 <= hourly.pop < 0.5) return hikerRainInformation[1];
        else if (0.5 <= hourly.pop < 0.75) return hikerRainInformation[2];
        else return hikerRainInformation[3];
    };

    const getHikerVisibilityInfo = () => {
        if (hourly.visibility > 8000) return hikerVisibilityInformation[0];
        else if (hourly.visibility > 4000 && hourly.visibility <= 8000) return hikerVisibilityInformation[1];
        else return hikerVisibilityInformation[2];
    };


useEffect(() => {
  const interval = setInterval(() => {
    setShowFirst(prev => !prev);
  }, 5000);
  return () => clearInterval(interval);
}, []);

    return (
    <>
    <div className = "sideInfoStack">
        <div className={`side-info-hikers ${showFirst ? 'active' : ''}`}>
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
  <        div className={`side-info-hikers2 ${!showFirst ? 'active' : ''}`}>
            <div className="weatherConditionIcon">
                <img src="/images/mountain.png" alt="Dry Conditions Icon"/>
            </div>
            <div className = "hikersInfoText">Hikers Info</div>
            <div className = "whatToWear">{getHikerRainInfo()}</div> 
            {/* change class name? */}
            <div className = "whenToWear">{getHikerVisibilityInfo()}</div>
        </div>
                
    </div>    
    </>
    );
}

export default SideInfoHikers;