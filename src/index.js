import React from 'react';
import ReactDOM from 'react-dom/client';
import Piano from './App.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('content-body'));
root.render(
  <React.StrictMode>
    <Piano />
  </React.StrictMode>
);
