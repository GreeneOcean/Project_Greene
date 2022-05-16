import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from "react-router-dom"
import { PageContainer } from '../styles/index.js';
import Carousel from '../components/Carousel.js';
import HomeItemsWidget from '../components/item/HomeItemsWidget';
import DonateButton from '../components/DonateButton'

function Home({ state, dispatch, init }) {
  const { dev, user, HomeData } = state;
  const { lat, lng, local, charity_state } = user;

  return (
    <PageContainer >
      <DonateButton/>
      <HomeItemsWidget localItems={local} charity_state={charity_state}/>
      <Carousel />
    </PageContainer>
  );
}

export default Home;