import { contadorReducer } from './contadorReducer.js';
import deepFreeze from 'deep-freeze';


describe('noteReducer', () => {
  test('probando noteReducer', () => {
    const state = 0;
    const action1 = {type: 'INCREMENTAR'};

    deepFreeze(state);

    const stateNuevo1 = contadorReducer(state, action1);


    const action2 = {type: 'REDUCIR'};
    const stateNuevo2 = contadorReducer(stateNuevo1, action2);
    

    expect(stateNuevo1).toEqual(1);
    expect(stateNuevo2).toEqual(0);
  })
})
