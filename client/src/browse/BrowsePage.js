import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Map from "./maps/Map.js";
import Maps from "./maps/Maps.js";
import ItemList from "./list/ItemList.js";
import FilterBar from "./filterBar/FilterBar.js";

const BrowsePage = (props) => {
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

  useEffect(() => {
    fetch("http://localhost:3000/local")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const temp = [];
        for (let i = 0; i < res.length; i += 100) {
          temp.push(res[i]);
        }
        setItemData(temp);
        setFilteredItems(temp);
      });
  }, []);

  return (
    <div>
      <FilterBar
        itemData={itemData}
        setSelectedItem={setSelectedItem}
        setFilteredItems={setFilteredItems}
      />
      <Container>
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
      </Container>
    </div>
  );
};

export default BrowsePage;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
