



function reducer(state, action) {
  let newState;
  const { type, payload } = action
  const { dev } = state
  dev.logs && console.log('Home REDUCER', state)
  switch (type) {

    case 'HOME_INIT':
      newState = { ...state, ...payload };
      return newState;

    default:
      return state;
  }
}

export default reducer;