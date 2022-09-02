import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import RightComponent from './BtnRightComponent.js';
import LeftComponent from './BtnLeftComponent.js';

import './App.css';


const Reset = () => {

  const dispatch = useDispatch();

  const resetting = (evento) => {
      dispatch({type: 'RESET'})
  }

  return (
    <div>
      <button id='reset' className="btn btn-primary" onClick={resetting}>Reset</button>
    </div>
  )
};



const App = () => {

  const estadoActual = useSelector(state => state)

  return (
    <div id='content'>

      <h1>Counter React Redux</h1>

      <div id='screen'>
        {estadoActual}
      </div>

      <div id='buttons'>
        <LeftComponent />

        <RightComponent />

        <Reset />
      </div>


    </div>
  )
};


export default App;
