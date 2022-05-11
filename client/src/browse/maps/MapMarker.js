import React, { useState, useContext } from "react";
import styled from "styled-components";

import MarkerCard from "./MarkerCard.js";
import { RiMapPin2Fill } from "react-icons/ri";

const MapMarker = ({ item, selectedItem, $hover, setSelectedItem }) => {
  const style =
    selectedItem === item.id
      ? { color: "red", height: "25px", width: "25px" }
      : $hover
      ? { color: "cyan", cursor: "pointer", height: "25px", width: "25px" }
      : { color: "blue", height: "25px", width: "25px" };

  const clickHandler = () => {
    setSelectedItem(item.id);
  };

  return (
    <div>
      <RiMapPin2Fill
        onClick={() => {
          setSelectedItem(item.id);
        }}
        style={style}
      />
      {$hover && <MarkerCard item={item} />}
    </div>
  );
};

export default MapMarker;
