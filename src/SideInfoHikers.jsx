import { useState, useEffect } from 'react';

const rainGear = {
  optional : "Low precipitation - no rain gear needed",
  recommended : "Moderate precipitation - a light jacket is recommended",
  essential : "Expected precipitation - a rain jacket and waterproof pants is needed",
};

const visibilityGear = {
  optional: "Clear visibility - no navigation gear needed",
  recommended: "Reduced visibility- a map or GPS is recommended",
  essential: "Poor visibility - a map and GPS is essential and wear bright clothing",
};

const temperatureGear = {
  freezing: "Freezing temperatures - insulated and waterproof clothing is essential",
  cold: "Cold temperatures - thermal clothing and a warm jacket is recommended",
  mild: "Mild temperatures - a warm layer is recommended",
  warm: "Warm temperatures - a light layer is recommended",
  hot: "Hot temperatures - lightweight clothing is essential",
};

const uvGear = {
    optional: "low UV exposure - no sun protection needed",
    recommended: "moderate UV - wear sunglasses and apply sunscreen",
    essential: "high UV - wear sunscreen, sunglasses, and a hat for protection",
};

const footwear = {
    slippery: "slippery conditions, wear shoes with good traction",
    muddy: "muddy conditions, waterproof boots are recommended",
    dry: "dry conditions, regular hiking shoes are sufficient",
    icy : "icy conditions, crampons or ice cleats are essential for safety",

}

function SideInfoHikers({ dailyWeather, weather, selectedDay, showFirst, setShowFirst,onToggle}) {
    
    if (!dailyWeather?.list) return null;
    if (!weather?.list) return null;
    if (!selectedDay) return null;

    const current = dailyWeather.list.find(d => d.dt === selectedDay) ?? dailyWeather.list[0];

    const hourly = weather.list.filter(h => {
        const hDate = new Date(h.dt * 1000).toLocaleDateString("en-GB");
        const sDate = new Date((selectedDay ?? weather.list[0].dt) * 1000).toLocaleDateString("en-GB");
        return hDate === sDate;
    });

    const hourlyEntry = hourly.length ? hourly[0] : weather.list[0];

    const cloudCoverage = current.clouds;
    const humidity = current.humidity;
    const visibility = ((hourlyEntry.visibility ?? 10000) / 1000).toFixed(1);
    const airPressure = current.pressure;

    const condition = current?.weather?.[0]?.description ?? "";
    const conditionIcon = current?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
    : "";

    const avgPop = hourly.length
        ? hourly.reduce((sum, h) => sum + (h.pop ?? 0), 0) / hourly.length
        : (current.pop ?? 0);


    const getHikerRainInfo = () => {
        if (avgPop < 0.25) return rainGear.optional;
        if (0.25 <= avgPop < 0.55)  return rainGear.recommended;
        if (avgPop >= 0.55) return rainGear.essential;
        return rainGear.essential;
    };

    const getHikerVisibilityInfo = () => {
        if (visibility >= 8) return visibilityGear.optional;
        if ( 4 <=visibility < 8) return visibilityGear.recommended;
        return visibilityGear.essential;
    };

    const getHikerTemperatureInfo = () => {
        const temp = current.temp;
        if (temp <= 0) return temperatureGear.freezing;
        if (0 < temp <= 8) return temperatureGear.cold;
        if (8 < temp <= 18) return temperatureGear.mild;
        if (18 < temp <= 25) return temperatureGear.warm;
        if (temp > 25) return temperatureGear.hot;
        return temperatureGear.mild;
    }

    const getHikerUVInfo = () => {
        const uv = current.uvi;
        if (uv < 3) return uvGear.optional;
        if (3 <= uv < 6) return uvGear.recommended;
        if (uv >= 6) return uvGear.essential;
        return uvGear.recommended;
    }



    return (
    <>
<div className="sideInfoStack">
            <div className={`side-info-hikers ${showFirst ? 'active' : ''} `}
            onClick={onToggle}
            style={{cursor : 'pointer'}}>
            <div className="weatherConditionIcon">
                <img src={conditionIcon} alt="Conditions Icon"/>
            </div>
            <div className="weatherCondition">{condition}</div>

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
        <div className={`side-info-hikers2 ${!showFirst ? 'active' : ''}`}
        onClick={onToggle}
        style={{cursor : 'pointer'}}>
{/*
            <div className="weatherConditionIcon">
                <img src="/images/mountain.png" alt="Dry Conditions Icon"/>
            </div>
*/}
            
            <div className = "hikersInfoText">Recommended Gear For Hiking</div>
            <div className="iconRow">

                <div className="iconWrapper">
                    <img src="/images/infoIcons/heavy-rain.png" alt="Rain Icon"/>
                    <span className="tooltip">{getHikerRainInfo()}</span>
                </div>
                <div className="iconWrapper">
                    <img src="/images/infoIcons/eye.png" alt="Visibility Icon"/>
                    <span className="tooltip">{getHikerVisibilityInfo()}</span>
                </div>
                <div className="iconWrapper">
                    <img src="/images/infoIcons/temperature.png" alt="Temperature Icon" />
                    <span className="tooltip">{getHikerTemperatureInfo()}</span>
                </div>

                <div className="iconWrapper">
                    <img src="/images/infoIcons/uv.png" alt="UV Icon" />
                    <span className="tooltip">{getHikerUVInfo()}</span>
                </div>

                <div className='iconWrapper'>
                    <img src="/images/infoIcons/safety-boot.png" alt="Footwear Icon" />
                    <span className="tooltip">Sturdy footwear is recommended for hiking</span>
                </div>
            </div>
 

        </div>
                
    </div>    
    </>
    );
}

export default SideInfoHikers;