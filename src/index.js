import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';


const divRoot = ReactDOM.createRoot(document.getElementById('Content'));
divRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
