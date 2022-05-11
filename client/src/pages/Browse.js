import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"
import { PageContainer } from '../styles/index.js';
import Nav from '../components/Nav';

import FilterBar from "../components/browse/filterBar/FilterBar"
import Map from "../components/browse/maps/Map"
import ItemList from "../components/browse/list/ItemList"

function Browse({ state, user, dispatch, init }) {
  const { dev } = state
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  console.log('browse state: ', state);

  useEffect(() => {
    setTimeout(() => {
      init().then(res => {
        dev.logs && console.log(`\nBrowse API init res`, res)
        dev.logs && console.log('Browse state', state)
        dispatch({
          type: `BROWSE_INIT`,
          payload: res
        })
      })
    }, 1000)

  }, [])

  return (
<<<<<<< HEAD
    <PageContainer >
      <h3>Browse</h3>
      <p>{`BrowseData: ${state.BrowseData}`} </p>
      <Link to="/">Home</Link>
      <Link to="/Item">Item</Link>
      <Link to="/Auth">Auth</Link>
    </PageContainer>
=======
    <div>
      <FilterBar
        itemData={state.user.local}
        setSelectedItem={setSelectedItem}
        setFilteredItems={setFilteredItems}
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
    </div>
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
  );
};

export default Browse;

const BrowsePageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
