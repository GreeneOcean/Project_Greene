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


function App() {
  const [ ,dispatch] = useContext(DispatchContext)
  const [state] = useContext(StateContext);
  const { dev } = state
  dev.logs && console.log('App state', state)

  useEffect(() => {

    const query = {
      lat: 30.281785180813568,
      lng: -97.9005011705492,
      count: 250,
    }
    api.get.location()
    .then(locationRes => {
      return api.get.local.donations({ ...locationRes, count: 250 })
      .then(apiRes => {
        dispatch({
          type: `USER_INIT`,
          payload: { ...state.user, ...locationRes, local: apiRes }})
        })
    })


  }, [])



  return (
    <AppContainer >
      <LinkContainer>
        <Link to="/">Home</Link>
        <Link to="/Auth">Auth</Link>
        <Link to="/Browse">Browse</Link>
        <Link to="/Donate">Donate</Link>
        <Link to="/Item">Item</Link>
        <Link to="/Transactions">Transactions</Link>
      </LinkContainer>
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


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(20, 20, 20);

`
const LoadingContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(30, 30, 30);
`

const LinkContainer = styled.div`
  width: 95%;
  height: 10%;
  padding: .5em;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgb(30, 30, 30);

`

const Footer = styled.footer`
  height: 2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(35, 35, 35);
`

export default App;
