import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GenerarPassword } from './GenPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<h1>Password Generator</h1>
    <GenerarPassword />
  </React.StrictMode>
);

