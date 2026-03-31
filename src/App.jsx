import './reset.css';
import './App.css';
import './smallScreen.css';
import './smallMobile.css';
import Background from './Background.jsx';
import MainWeatherWindow from './MainWeatherWindow.jsx';
import HourInfoPanel from './HourInfoPanel.jsx';
import NewDayRow from './NewDayRow.jsx';
import SideInfoHikers from './SideInfoHikers.jsx';
import { useState, useEffect } from 'react';
import SearchOverlay from './SearchOverlay.jsx';

const city_arr = ["Chongqing", "London", "Paris", "New York", "Tokyo", "Sydney", "Cairo", "Rio de Janeiro", "Berlin", "Beijing", "Mumbai", "Sylhet"];

function App() {

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState(""); // will be used if for a searchbar
  const [weather, setWeather] = useState(null);  
  const [dailyWeather, setDailyWeather] = useState(null);
  const [activePanel, setActivePanel] = useState(0); 
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  const [showFirst, setShowFirst] = useState(true);
  const [selectedHour, setSelectedHour] = useState(null);
  const [uv, setUV] = useState(null);
  const [hourOffset, setHourOffset] = useState(0);


  const selectedDailyData = dailyWeather?.list?.find(d => d.dt === selectedDay);
  const selectedCondition = selectedDailyData
  ? selectedDailyData.weather?.[0]?.main?.toLowerCase() // or description
  : weather?.list?.[0]?.weather?.[0]?.main?.toLowerCase();
    const togglePanel = () => {
    setActivePanel(prev => (prev === 0 ? 1 : 0));
  };

    const handleToggle = () => {
      if (isMobile) {
        if (activePanel === 0) {
              setActivePanel(1);
              setShowFirst(true);
            } else {
              if (showFirst) {
                setShowFirst(false);
              } else {
                setActivePanel(0);
                setShowFirst(true);
              }
            }
            } else {
              setShowFirst(prev => !prev);
            }
    };
  




const getConditionKey = (description = "") => {
  const c = description.toLowerCase();
  if (c.includes("sun") || c.includes("clear")) return "sunny";
  if (c.includes("rain") || c.includes("drizzle")) return "rainy";
  if (c.includes("snow")) return "snowy";
  if (c.includes("storm") || c.includes("thunder")) return "stormy";
  if (c.includes("fog") || c.includes("mist")) return "foggy";
  return "cloudy";
};



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

const handleNextDay = () => {
  const currentIndex = dailyWeather.list.findIndex(d => d.dt === selectedDay);
  const next = dailyWeather.list[currentIndex + 1];
  if (next) {
    setSelectedDay(next.dt);
    setSelectedHour(null);
    setHourOffset(0);
  }
};


const handlePrevDay = () => {
  const currentIndex = dailyWeather.list.findIndex(d => d.dt === selectedDay);
  const prev = dailyWeather.list[currentIndex - 1];
  if (prev) {
    setSelectedDay(prev.dt);
    setSelectedHour(null);
    setHourOffset(999);
  }
};

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
  const interval = setInterval(() => {
    handleToggle();
  }, 15000); 
  return () => clearInterval(interval);
}, [activePanel, showFirst, isMobile]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1048px)");
    setIsMobile(mq.matches);

    const handleResize = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handleResize);
    return () => mq.removeEventListener("change", handleResize);
  }, []);

    useEffect(() => {
      if (dailyWeather?.list?.[0]) {
        setSelectedDay(dailyWeather.list[0].dt);
      }
}, [dailyWeather]);

    if (!weather) {
  return <div className="loading">⏳</div>;
}
return (
  <>  
    {weather && <Background condition={getConditionKey(selectedCondition)} selectedHour={selectedHour} weather={weather} />}
    {dailyWeather?.list && (
      <NewDayRow
        dailyWeather={dailyWeather}
        weather={weather}
        selectedDay={selectedDay}
        onDaySelect={(day) => {
          setSelectedDay(day);
          setSelectedHour(null);
        }} 
        timezoneOffset={weather?.city?.timezone ?? 0}     
        />
    )}    
    <div className="weather-layout">
      {isMobile ? (
        activePanel === 0 ? (
          <MainWeatherWindow
            weather={weather}
            dailyWeather={dailyWeather}
            selectedDay={selectedDay}
            getWeatherByCoords={getWeatherByCoords}
            getDailyWeatherByCoords={getDailyWeatherByCoords}
            onToggle={handleToggle}
            selectedHour={selectedHour}
            onSearchClick = {() => setShowSearch(true)}
          />
        ) : (
          <SideInfoHikers
            dailyWeather={dailyWeather}
            weather={weather}
            selectedDay={selectedDay}
            showFirst={showFirst}
            setShowFirst={setShowFirst}
            onToggle={handleToggle}
          />
        )
      ) : (
        <>
          <MainWeatherWindow
            weather={weather}
            dailyWeather={dailyWeather}
            selectedDay={selectedDay}
            getWeatherByCoords={getWeatherByCoords}
            getDailyWeatherByCoords={getDailyWeatherByCoords}
            selectedHour={selectedHour}
            onSearchClick = {() => setShowSearch(true)}
          />

          <SideInfoHikers
            dailyWeather={dailyWeather}
            weather={weather}
            selectedDay={selectedDay}
            showFirst={showFirst}
            setShowFirst={setShowFirst}
            onToggle={handleToggle} // toggles side-info panels on desktop
          />
        </>
      )}
    </div>
    {weather && <HourInfoPanel 
    weather={weather} 
    dailyWeather={dailyWeather} 
    selectedDay={selectedDay}
    onNextDay = {handleNextDay}
    onPrevDay = {handlePrevDay}
    onHourSelect={(hour) => setSelectedHour(hour)} 
    initialOffset={hourOffset}
    timezoneOffset={weather?.city?.timezone ?? 0}
/>}
    {showSearch && (
      <SearchOverlay
        onClose={() => setShowSearch(false)}
        onSearch={(query) => {
          if (typeof query === "string") {
            getWeatherObj(query);
            getDailyWeatherObj(query);
          } else {
            getWeatherByCoords(query.lat, query.lon);
            getDailyWeatherByCoords(query.lat, query.lon);
          }
        }}
      />
    )}
  </>
);
}

export default App;


