import './reset.css';
import './App.css';
import Background from './Background.jsx';
import MainWeatherWindow from './MainWeatherWindow.jsx';
import HourInfoPanel from './HourInfoPanel.jsx';
import NewDayRow from './NewDayRow.jsx';
import SideInfoHikers from './SideInfoHikers.jsx';

import { useState, useEffect } from 'react';

const city_arr = ["London", "Paris", "New York", "Tokyo", "Sydney", "Cairo", "Rio de Janeiro", "Berlin", "Beijing", "Mumbai","Sylhet"];

function App() {

  const [query, setQuery] = useState(""); // will be used if for a searchbar
  const [weather, setWeather] = useState({});

  const getWeatherObj = (city) => {
    fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=7adc71064a0153510e1edd7ee10cea2b`)
    .then(res => res.json())
    .then(result => setWeather(result));

  };

  
  useEffect(() => {
    getWeatherObj(city_arr[Math.floor(Math.random() * city_arr.length)]);
  }, []);

  return (
    <>  
      <Background/> 
      <NewDayRow weather={weather}/>
      <div className="weather-layout">
        <MainWeatherWindow weather={weather}/>
        <SideInfoHikers/>
      </div>
       <HourInfoPanel weather={weather}/>   
    </>
  );
}

export default App;


