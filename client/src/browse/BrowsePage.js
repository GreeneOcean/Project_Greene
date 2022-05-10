import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Map from "./maps/Map.js";
import Maps from "./maps/Maps.js";
import ItemList from "./list/ItemList.js";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const BrowsePage = (props) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [position, setPosition] = useState({});
  const [toggleMap, setToggleMap] = useState(true);
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
        setDisplayData(temp);
      });
  }, []);

  const toggleMapHandler = () => {
    setToggleMap(!toggleMap);
  };

  return (
    <div>
      <div>
        <p>This is the filter bar</p>
        <button onClick={toggleMapHandler}>Toggle map</button>
      </div>
      <Container>
        {toggleMap && (
          <Map
            data={itemData}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            lat={lat}
            lng={lng}
          />
        )}
        {!toggleMap && (
          <Maps
            data={itemData}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            lat={lat}
            lng={lng}
          />
        )}
        <ItemList
          items={itemData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Container>
    </div>
  );
};

export default BrowsePage;
