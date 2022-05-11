




function reducer(state, action) {

  let newState;
  const { type, payload } = action
  const { dev } = state
  dev.logs && console.log('Transactions REDUCER', state)
  switch (type) {

    case 'TRANSACTIONS_INIT':
      newState = { ...state, ...payload };
      return newState;

    default:
      return state;
  }
}

export default reducer;