import './reset.css';
import './App.css';
import './smallScreen.css';
import Background from './Background.jsx';
import MainWeatherWindow from './MainWeatherWindow.jsx';
import HourInfoPanel from './HourInfoPanel.jsx';
import NewDayRow from './NewDayRow.jsx';
import SideInfoHikers from './SideInfoHikers.jsx';
import { useState, useEffect } from 'react';

const city_arr = ["Chongqing", "London", "Paris", "New York", "Tokyo", "Sydney", "Cairo", "Rio de Janeiro", "Berlin", "Beijing", "Mumbai", "Sylhet"];

function App() {

  const [query, setQuery] = useState(""); // will be used if for a searchbar
  const [weather, setWeather] = useState({});
  const [dailyWeather, setDailyWeather] = useState({});
  const [activePanel, setActivePanel] = useState(0); 
  const [isMobile, setIsMobile] = useState(false);




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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1048px)");
    setIsMobile(mq.matches);

    const handleResize = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handleResize);
    return () => mq.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const togglePanels = () => {
      setActivePanel(prev => (prev + 1) % 3); 
      let nextDuration;

      if (activePanel === 0) nextDuration = 15000; 
      else nextDuration = 10000; 

      setTimeout(togglePanels, nextDuration);
    };

    const timer = setTimeout(togglePanels, activePanel === 0 ? 15000 : 5000);

    return () => clearTimeout(timer);
  }, [isMobile, activePanel]);

  return (
    <>  
      <Background/> 
      {dailyWeather.list && <NewDayRow  dailyWeather={dailyWeather} weather={weather}/>}
    <div className="weather-layout">
      {isMobile ? (
        activePanel === 0 ? (
          <MainWeatherWindow
            weather={weather}
            getWeatherByCoords={getWeatherByCoords}
            getDailyWeatherByCoords={getDailyWeatherByCoords}
          />
        ) : (
          <SideInfoHikers dailyWeather={dailyWeather} weather={weather} />
        )
      ) : (
        <>
          <MainWeatherWindow
            weather={weather}
            getWeatherByCoords={getWeatherByCoords}
            getDailyWeatherByCoords={getDailyWeatherByCoords}
          />
          <SideInfoHikers dailyWeather={dailyWeather} weather={weather} />
        </>
      )}
    </div>
       <HourInfoPanel weather={weather}/>   
    </>
  );
}

export default App;


