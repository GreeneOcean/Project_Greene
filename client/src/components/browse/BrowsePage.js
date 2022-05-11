import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Map from "./maps/Map.js";
import ItemList from "./list/ItemList.js";
import FilterBar from "./filterBar/FilterBar.js";

const BrowsePage = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);


  return (
    <div>
      <FilterBar
        itemData={itemData}
        setSelectedItem={setSelectedItem}
        setFilteredItems={setFilteredItems}
      />
      <BrowsePageContainer>
        <Map
          data={filteredItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          lat={lat}
          lng={lng}
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

export default BrowsePage;

const BrowsePageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
