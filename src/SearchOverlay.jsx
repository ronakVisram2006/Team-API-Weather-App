import { useState } from 'react';

function SearchOverlay({onClose, onSearch}){
    const [input, setInput] = useState("");

    const handleSearch = () => {
        if(!input) return;
        onSearch(input);
        onClose();
    };

    return (
    <div className="search-overlay">
        <div className="search-box">
        <div className="close-btn" onClick={onClose}>&times;</div>
        <div className = "titleRow">
            <h1 className="whereToText">Where to?</h1>
            <img src = "/images/hiker.gif" alt="Hiker Icon" className="hikerIcon"/>
        </div>
        <div className="input-row">
            <img src="/images/magnifier.png" className="search-icon" />
            <input
            type="text"
            placeholder="Search for a city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
        </div>

        <button onClick={handleSearch} className="search-btn">
            Search
        </button>
        </div>
    </div>
    );}

export default SearchOverlay;