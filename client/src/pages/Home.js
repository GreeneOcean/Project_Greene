import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PageContainer } from '../styles/index.js';
import Carousel from '../components/Carousel.js';

function Home({ state, dispatch, init }) {
  const { dev, user, HomeData } = state
  const { lat, lng, local } = user

  useEffect(() => {
    init().then((res) => {
      dev.logs && console.log(`\nHome API init res`, res);
      dev.logs && console.log('Home state', state);
      dispatch({
        type: `HOME_INIT`,
        payload: res,
      });
    });
  }, []);

  const toggleDevLogs = (e) => {
    dispatch({
      type: 'TOGGLE_LOGS',
    });
  };

  return (
    <PageContainer >
      <h3>Homepage</h3>
      <DonateButton to="/Donate">Donate</DonateButton>
    </PageContainer>
  );
}

const DonateButton = styled(Link)`
  border: 1px solid rgba(11, 191, 125, 0.9);
  border-radius: 6px;
  padding: 10px 50px;
  width: 400px;
  text-align: center;
  text-decoration: none;
  color: #37782C;
  background-color: transparent;
  box-shadow: 5px 5px 12px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #37782C;
    box-shadow: 0px 5px 10px rgba(46, 229, 157, 0.4);
  }
`;


export default Home;
