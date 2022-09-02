const INCREMENTAR = 'INCREMENTAR';
const DECREMENTAR = 'REDUCIR';
const RESET = 'RESET';




const initStateDefault = {
  contador: 0
}

export const contadorReducer = (state = initStateDefault.contador, action) => {
  switch (action.type) {
    case INCREMENTAR:
      return state + 1

    case DECREMENTAR:
      return state - 1

    case RESET:
      return state = 0

    default:
      return state
  }
};
