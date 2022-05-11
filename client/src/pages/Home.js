import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer } from "../styles/index.js";

function Home({ state, dispatch, init }) {
  const { dev } = state;

  useEffect(() => {
    init().then((res) => {
      dev.logs && console.log(`\nHome API init res`, res);
      dev.logs && console.log("Home state", state);
      dispatch({
        type: `HOME_INIT`,
        payload: res
      });
    });
  }, []);

  const toggleDevLogs = (e) => {
    dispatch({
      type: "TOGGLE_LOGS"
    });
  };

  return (
    <PageContainer>
      <h3>Home</h3>
      <p>{`HomeData: ${state.HomeData}`} </p>
      <Link to="/Auth">Auth</Link>
      <Link to="/Browse">Browse</Link>
      <Link to="/Donate">Donate</Link>
      <Link to="/Item">Item</Link>
      <Link to="/Transactions">Transactions</Link>
      <Link to="/Chat">Chat</Link>
      <button onClick={toggleDevLogs}>Toggle logs</button>
    </PageContainer>
  );
}

export default Home;
