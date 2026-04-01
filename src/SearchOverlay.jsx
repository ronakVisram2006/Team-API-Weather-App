import { useRef, useState } from 'react';

function SearchOverlay({onClose, onSearch, getWeatherObj, getDailyWeatherObj, getWeatherByCoords, getDailyWeatherByCoords}) {

    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const debounceTimer = useRef(null);
    const API_KEY = "7adc71064a0153510e1edd7ee10cea2b";

    const fetchSuggestions = async (query) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        // Simulate an API call to fetch suggestions
        try {
            const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch {
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInput(val);
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchSuggestions(val), 300);
    };

    const handleSuggestionSelect = (city) => {
        setInput(city.name);
        setSuggestions([]);
        onSearch({ lat: city.lat, lon: city.lon });
        onClose();
    };



    async function fetchWeather(city) {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7adc71064a0153510e1edd7ee10cea2b`
        );

        if (!res.ok) {
            throw new Error("Invalid city");
        }

        return res.json();
        }

    const handleSearch = async () => {
        if (!input.trim()) return;
    
        if (suggestions.length > 0) {
            handleSuggestionSelect(suggestions[0]);
            return;
        }
    
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${API_KEY}`
            );
            if (!res.ok) throw new Error();
            onSearch(input);
            onClose();
          } catch {
            alert("City not found. Try again.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
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
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}   
                autoFocus
                />
                <div className="currentLocationIcon" onClick={currentLocation}>
                    <img src="/images/currentLocation.gif" alt="Current Location Icon" className="current-location-icon"/>
                </div>
            </div>

            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                {suggestions.map((city, i) => (
                    <li
                        key={i}
                        className='suggestion-item'
                        onClick={() => handleSuggestionSelect(city)}
                    >
                        <span className='suggestion-city'>
                            {city.name}{city.state ? `, ${city.state}` : ''}
                        </span>
                        <span className='suggestion-country'>
                            {city.country}
                        </span>
                    </li>
                    ))}
                </ul>
            )}

            <button onClick={() => handleSearch(input)} className="search-btn">
                            Search
            </button>

            <div className="popular-section">
                <p className="popular-label">Popular</p>
                <div className="pills">
                {["Rio de Janeiro","Mexico City","Cape Town","Kyoto"].map(city => (
                    <span key={city} className="pill" onClick={() => setInput(city)}>{city}</span>
                ))}
            </div>
        </div>
        </div>
    </div>
    );}

export default SearchOverlay;