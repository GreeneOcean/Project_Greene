function reducer(state, action) {

  const { type, payload } = action
  const dev = JSON.parse(JSON.stringify(state.dev));
  // console.log({ type, payload })
  dev.logs && console.log('user REDUCER', state, type, payload)

  switch (type) {

    case 'USER_INIT':
      Object.entries(payload).forEach(keyValue => { state[keyValue[0]] = keyValue[1] });
      return state;

    case 'LOG_OUT':
      const { lat, lng, local, chat, videoChat, searchTerm } = state;
      Object.keys(state).forEach(key => delete state[key]);
      state.lat = lat;
      state.lng = lng;
      state.local = local;
      state.dev = dev;
      state.chat = chat;
      state.videoChat = videoChat
      state.searchTerm = searchTerm
      return state;

    case 'TOGGLE_CHAT':
      state.otherUser = payload || ''
      state.chat =  !state.chat
      return state;

    case 'TOGGLE_VIDEO_CHAT':
      state.otherUser = payload  || ''
      state.videoChat =  !state.videoChat
      return state;

    case 'SET_SEARCH':
      state.searchTerm =  payload
      return state;

    default:
      return state;
  }
}

export default reducer;
