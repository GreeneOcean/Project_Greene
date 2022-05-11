import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { StateContext, DispatchContext } from './appState/index.js';
import { Routes, Route, Link } from "react-router-dom";
import Auth from './pages/Auth'
import Browse from './pages/Browse'
import Donate from './pages/Donate'
import Home from './pages/Home'
import Item from './pages/Item'
import Transactions from './pages/Transactions'
import api from './api/index'
import { AppContainer, LoadingContainer, Footer } from './styles/index.js';


function App() {
  const [ ,dispatch] = useContext(DispatchContext)
  const [state] = useContext(StateContext);
  const { dev } = state
  dev.logs && console.log('App state', state)
  console.log('App state', state)

  useEffect(() => {

    api.get.location(dispatch)
    const user = { userName: process.env.USERNAME, attempt: 'shalom' }
    api.get.login.user(user, dispatch)


  }, [])


  return (
    <AppContainer >
      <Routes>
        <Route
          path="/"
          element={
          <Home
            state={state.Home}
            dispatch={dispatch}
            init={api.get.Home}
          />}
        />
        <Route
          path="Auth"
          element={
          <Auth
            state={state.Auth}
            dispatch={dispatch}
            init={api.get.Auth}
          />}
        />
        <Route
          path="Browse"
          element={
          <Browse
            state={state.Browse}
            dispatch={dispatch}
            init={api.get.Browse}
          />}
        />
        <Route
          path="Donate"
          element={
          <Donate
            state={state.Donate}
            dispatch={dispatch}
            init={api.get.Donate}
          />}
        />
        <Route
          path="Item"
          element={
          <Item
            state={state.Item}
            dispatch={dispatch}
            init={api.get.Item}
          />}
        />
        <Route
          path="Transactions"
          element={
          <Transactions
            state={state.Transactions}
            dispatch={dispatch}
            init={api.get.Transactions}
          />}
        />
      </Routes>
      <Footer><small>{'\u00a9 2022 Greene Inc. All rights reserved.'}</small></Footer>
    </AppContainer>
  );
}

export default App;
