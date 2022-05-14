import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"
import { PageContainer } from '../styles/index.js';

import FilterBar from "../components/browse/filterBar/FilterBar"
import Map from "../components/browse/maps/Map"
import ItemList from "../components/browse/list/ItemList"

function Browse({ state, user, dispatch, init }) {
  const { dev } = state
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const charity_states = ['true', 'false', 'pending', 'denied']
  return (
    <Container>
      <FilterBar
        itemData={state.user.local}
        setSelectedItem={setSelectedItem}
        setFilteredItems={setFilteredItems}
        charity_state={state.user.charity_state}
      />
      <BrowsePageContainer>
        <Map
          data={filteredItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          lat={state.user.lat}
          lng={state.user.lng}
        />

        <ItemList
          items={filteredItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </BrowsePageContainer>
    </Container>
  );
};

export default Browse;

const BrowsePageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width:80vw;
  height: 60vh;
`;

const Container = styled.div`
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-top: 10em;
  margin-bottom: 8vh;
`;