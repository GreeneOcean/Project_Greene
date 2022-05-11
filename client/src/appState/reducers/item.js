




function reducer(state, action) {
  let newState;
  const { type, payload } = action
  const { dev } = state
  dev.logs && console.log('Item REDUCER', state)
  switch (type) {

    case 'ITEM_INIT':
      newState = { ...state, ...payload };
      return newState;

    case 'ADD_ITEM':
      newState = {...state, ...payload};
      return newState;

    default:
      return state;
  }
}

export default reducer;