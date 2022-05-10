



  function reducer(state, action) {
    let newState;
    const { type, payload } = action
    state.logs && console.log('Dev REDUCER', state)
    switch (type) {

      case 'TOGGLE_LOGS':
        // newState = { ...state };
        state.logs = !state.logs
        return state;

      default:
        return state;
    }
  }

  export default reducer;