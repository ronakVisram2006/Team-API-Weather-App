import { useState } from 'react';

function SearchOverlay({onClose, onSearch, getWeatherObj, getDailyWeatherObj, getWeatherByCoords, getDailyWeatherByCoords}) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        if (!input) return;

        onSearch(input);
        onClose();
    };
    const currentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                onSearch({ lat: latitude, lon: longitude });

                onClose();
            },
            () => {
                alert("Unable to retrieve your location. Please allow location access and try again.");
            }
        );
    };

    

    return (
    <div className="search-overlay">
        <div className="search-box">
            <div className="close-btn" onClick={onClose}>&times;</div>
            <div className = "titleRow">
                <h1 className="whereToText">Where to?</h1>
            </div>
            <div className="input-row">
                <img src="/images/magnifier.png" className="search-icon" />
                <input
                type="text"
                placeholder="Search for a city..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <div className="currentLocationIcon" onClick={currentLocation}>
                    <img src="/images/currentLocation.gif" alt="Current Location Icon" className="current-location-icon"/>
                </div>
            </div>
        


            <button onClick={() => handleSearch(input)} className="search-btn">
                    Search
            </button>

            <div className="popular-section">
                <p className="popular-label">Popular</p>
                <div className="pills">
                {["Tokyo","Paris","New York","Dubai","London","Sydney"].map(city => (
                    <span key={city} className="pill" onClick={() => setInput(city)}>{city}</span>
                ))}
            </div>
        </div>
        </div>
    </div>
    );}

export default SearchOverlay;