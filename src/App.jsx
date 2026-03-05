import './reset.css';
import './App.css';
import React from 'react';
import Background from './Background.jsx';
import MainWeatherWindow from './MainWeatherWindow.jsx';
import axios from 'axios';
import HourInfoPanel from './HourInfoPanel.jsx';
import NewDayRow from './NewDayRow.jsx';
import SideInfoHikers from './SideInfoHikers.jsx';

import { useState, useEffect } from 'react';

function App() {
  return (
    <>  
      <Background/> 
      <NewDayRow/>
      <div className="weather-layout">
        <MainWeatherWindow/>
        <SideInfoHikers/>
      </div>
      <HourInfoPanel/>   
    </>
  );
}

export default App;


