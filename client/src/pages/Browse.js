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
  const [findNearest, setFindNearest] = useState(false);


  return (
    <div>
      <FilterBar
        itemData={state.user.local}
        setSelectedItem={setSelectedItem}
        setFilteredItems={setFilteredItems}
        findNearest={findNearest}
        setFindNearest={setFindNearest}
      />
      <BrowsePageContainer>
        <Map
          data={filteredItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          lat={state.user.lat}
          lng={state.user.lng}
          findNearest={findNearest}
        />

        <ItemList
          items={filteredItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </BrowsePageContainer>
    </div>
  );
};

export default Browse;

const BrowsePageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
