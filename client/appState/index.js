import React, { useReducer } from 'react';
import ThemeProvider from './theme';
import reducer from './reducers/index';

export const DispatchContext = React.createContext([null, () => {}]);
export const StateContext = React.createContext([{}]);


const circleRef = (keys, state) => {
  keys.forEach(keyA => {
    const ref = state[keyA]
    Object.entries(state).forEach(keyValues => {
      const [keyB, values] = keyValues
      if ( keyA !== keyB ) {
        values[keyA] = ref
      }
    })
  })
}


const initUser = {
  userName: 'Tim',
  lat: null,
  lng: null,
}

const initAppState = {
  dev: { logs: true },
  Auth: { AuthData: false, },
  Browse: { BrowseData: false },
  Donate: { DonateData: false },
  Home: { HomeData: false },
  Item: { ItemData: false },
  Transactions: { TransactionsData: false },
  user: initUser,
}
circleRef([ 'dev', 'user' ], initAppState)



const AppContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initAppState);

  return (
    <DispatchContext.Provider value={[null, dispatch]}>
      <StateContext.Provider value={[state]}>
        <ThemeProvider />
          {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default AppContextProvider;