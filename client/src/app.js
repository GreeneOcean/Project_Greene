import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { StateContext, DispatchContext } from "./appState/index.js";
import { Routes, Route, Link } from "react-router-dom";
import Nav from "./components/Nav";
import Auth from "./pages/Auth";
import Browse from "./pages/Browse";
import Donate from "./pages/Donate";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Transactions from "./pages/Transactions";
import Admin from './pages/AdminPage/Admin.js';
import api from "./api/index";
import { AppContainer, LoadingContainer, Footer } from "./styles/index.js";
import config from "../config.js";

function App() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);
  const { dev } = state;
  dev.logs && console.log("App state", state);
  console.log("App state", state);

  useEffect(() => {
    api.get.location(dispatch);
    // const user = { userName: 'mgee', attempt: "shalom" }; // Automatic Login user === mgee
    // api.get.login(user, dispatch); // Automatic Login user === mgee
  }, []);

  return (
    <AppContainer>
      <Nav user={state.user} />
      <Routes>
        <Route
          path="/"
          element={
            <Home state={state.Home} dispatch={dispatch} />
          }
        />
        <Route
          path="Auth"
          element={
            <Auth state={state.Auth} dispatch={dispatch} />
          }
        />
        <Route
          path="Browse"
          element={
            <Browse
              state={state.Browse}
              dispatch={dispatch}
            />
          }
        />

        <Route
          path="Donate"
          element={
            <Donate
              state={state.Donate}
              dispatch={dispatch}
            />
          }
        />

        <Route
          path="Item"
          element={
            <Item state={state.Item} dispatch={dispatch} />
          }
        />
        <Route
          path="Transactions"
          element={
            <Transactions
              state={state.Transactions}
              dispatch={dispatch}
            />
          }
        />

      </Routes>

      <Footer>
        <small>{"\u00a9 2022 Greene Inc. All rights reserved."}</small>
      </Footer>
    </AppContainer>
  );
}

export default App;
