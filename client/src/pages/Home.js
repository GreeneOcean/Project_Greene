import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer } from "../styles/index.js";
import Carousel from "../components/Carousel.js";

function Home({ state, dispatch, init }) {
  const { dev, user, HomeData } = state;
  const { lat, lng, local } = user;



  const toggleDevLogs = (e) => {
    dispatch({
      type: "TOGGLE_LOGS"
    });
  };

  return (
    <PageContainer>
      <h3>Home</h3>
      <p>{`HomeData: ${HomeData}`} </p>
      <p>
        {`user lat: ${lat ? lat : "loading"}   user lng: ${
          lng ? lng : "loading"
        }`}{" "}
      </p>
      <p>{`number of local: ${local ? local.length : "loading"}`}</p>
      <button onClick={toggleDevLogs}>Toggle logs</button>
    </PageContainer>
  );
}

export default Home;
