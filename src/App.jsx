import './reset.css';
import './App.css';
import './smallScreen.css';
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
  const [dailyWeather, setDailyWeather] = useState({});


  const getWeatherObj = (city) => {
    fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=7adc71064a0153510e1edd7ee10cea2b`)
    .then(res => res.json())
    .then(result => setWeather(result));

  };

  const getDailyWeatherObj = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=14&units=metric&appid=7adc71064a0153510e1edd7ee10cea2b`)
    .then(res => res.json())
    .then(result => setDailyWeather(result));
  }

  const getWeatherByCoords = (lat, lon) => {
    fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&appid=7adc71064a0153510e1edd7ee10cea2b`)
    .then(res => res.json())
    .then(result  => setWeather(result));
  }

  const getDailyWeatherByCoords = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=14&units=metric&appid=7adc71064a0153510e1edd7ee10cea2b`)
    .then(res => res.json())
    .then(result => setDailyWeather(result));
  }

  const getUVIndex = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=7adc71064a0153510e1edd7ee10cea2b`)
    .then(res => res.json())
    .then(result => setUV(result));
}


  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          getWeatherByCoords(lat, lon);
          getDailyWeatherByCoords(lat, lon);
        },

        () => {
          const city = city_arr[Math.floor(Math.random() * city_arr.length)];
          getWeatherObj(city);
          getDailyWeatherObj(city);
        }
      );
    }
    else {
      const city = city_arr[Math.floor(Math.random() * city_arr.length)];
      getWeatherObj(city);
      getDailyWeatherObj(city);
    }
  },  []);

  return (
    <>  
      <Background/> 
      {dailyWeather.list && <NewDayRow  dailyWeather={dailyWeather} weather={weather}/>}
      <div className="weather-layout">
        <MainWeatherWindow
          weather={weather}
          getWeatherByCoords={getWeatherByCoords}
          getDailyWeatherByCoords={getDailyWeatherByCoords}
        />
        <SideInfoHikers dailyWeather={dailyWeather} weather={weather}/>
      </div>
       <HourInfoPanel weather={weather}/>   
    </>
  );
}

export default App;


