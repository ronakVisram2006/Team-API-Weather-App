import './reset.css';
import './App.css';
import React from 'react';
import Background from './Background.jsx';
import MainWeatherWindow from './MainWeatherWindow.jsx';
import axios from 'axios';
import HourInfoPanel from './HourInfoPanel.jsx';

import { useState, useEffect } from 'react';

function App() {
  return (
    <>      
      <Background/>
      <MainWeatherWindow/>
      <HourInfoPanel/>
    </>
  );
}

export default App;


