



function reducer(state, action) {

  const { type, payload } = action
  const { dev } = state
  // console.log({ type, payload })
  dev.logs && console.log('user REDUCER', state, type, payload)
  switch (type) {

    case 'USER_INIT':

      Object.entries(payload).forEach(keyValue => {
        state[keyValue[0]] = keyValue[1]
      })
      return state;

    default:
      return state;
  }
}

export default reducer;

