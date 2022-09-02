import React from 'react';
import ReactDom from 'react-dom/client';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { contadorReducer } from './reducers/contadorReducer.js';

import App from './App.js';

import './index.css'



const store = createStore(contadorReducer);

store.subscribe(() => {
  const valorAhora = store.getState();
  console.log('subscribe index.js', valorAhora)
});


const appContent = ReactDom.createRoot(document.getElementById('screenComponent'));

appContent.render(
  <Provider store={store}>
    <App />
  </Provider>
);
