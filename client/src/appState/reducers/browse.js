function reducer(state, action) {
  let newState;
  const { type, payload } = action
  const { dev } = state
  dev.logs && console.log('Browse REDUCER', state)
  switch (type) {

    case 'BROWSE_INIT':
      newState = { ...state, ...payload };
      return newState;

    default:
      return state;
  }
}

export default reducer;