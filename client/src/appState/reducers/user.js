function reducer(state, action) {

  const { type, payload } = action
  const dev = JSON.parse(JSON.stringify(state.dev));
  // console.log({ type, payload })
  dev.logs && console.log('user REDUCER', state, type, payload)

  switch (type) {

    case 'USER_INIT':
      Object.entries(payload).forEach(keyValue => { state[keyValue[0]] = keyValue[1] })
      return state;

    case 'LOG_OUT':
      const { lat, lng } = state;
      Object.keys(state).forEach(key => delete state[key])
      state.lat = lat;
      state.lng = lng;
      state.dev = dev;
      return state;

    default:
      return state;
  }
}

export default reducer;
