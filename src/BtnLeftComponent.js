import React from 'react';


import { useSelector, useDispatch } from 'react-redux';

const RightComponent = () => {

  const estadoActual = useSelector(state => state)
  const dispatch = useDispatch();

  const handleButton = (evento) => {
    if (estadoActual >= 0) {
      dispatch({type: 'INCREMENTAR'})
    }
  }

  return (
    <div>
      <button id='right' className='btn btn-success' onClick={handleButton}>Increment</button>
    </div>
  )
}

export default RightComponent;
