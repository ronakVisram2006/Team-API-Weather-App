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
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}

export default SearchOverlay;