import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.js';
import TimeNow from './TimeNowShow.js';
import './index.css';



const timeDiv = document.getElementById('timeNow');
const rootTime = ReactDom.createRoot(timeDiv);

rootTime.render(
  <React.StrictMode>
    <TimeNow />
  </React.StrictMode>
);



const divItem = document.getElementById('weatherPanel');
const rootContent = ReactDom.createRoot(divItem);

rootContent.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
