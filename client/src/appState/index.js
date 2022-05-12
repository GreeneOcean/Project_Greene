import React, { useReducer } from "react";
import ThemeProvider from "./theme";
import reducer from "./reducers/index";

export const DispatchContext = React.createContext([null, () => {}]);
export const StateContext = React.createContext([{}]);

const circleRef = (keys, state) => {
  keys.forEach((keyA) => {
    const ref = state[keyA];
    Object.entries(state).forEach((keyValues) => {
      const [keyB, values] = keyValues;
      if (keys.indexOf(keyB) === -1) {
        values[keyA] = ref;
      }
    });
  });
};

const initDev = {
  logs: false
};

const initUser = {
  user_name: null,
  lat: null,
  lng: null,
  dev: initDev
};

const initAppState = {
  dev: initDev,
  Auth: {},
  Browse: {},
  Donate: {},
  Home: {},
  Item: {},
  Transactions: {},
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
