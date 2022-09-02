import React from 'react';


import { useSelector, useDispatch } from 'react-redux';


const LeftComponent = () => {

  const estadoActual = useSelector(state => {
    return state
  })
  const dispatch = useDispatch();

  const handleButton = (evento) => {
    if (estadoActual > 0) {
      dispatch({type: 'REDUCIR'})
    }
  }

  return (
    <div>
      <button id='left' className='btn btn-danger' onClick={handleButton}>Decrement</button>
    </div>
  )
}

export default LeftComponent;
