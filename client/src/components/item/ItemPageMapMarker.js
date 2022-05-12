import React from "react";
import styled from "styled-components";

// import MarkerCard from "./MarkerCard.js";
import { RiMapPin2Fill } from "react-icons/ri";

const ItemPageMapMarker = ({ item, selectedItem, $hover, setSelectedItem }) => {
  const style = { color: "blue", height: "25px", width: "25px" };


  return (
    <div>
      <RiMapPin2Fill
        style={style}
      />
    </div>
  );
};

export default ItemPageMapMarker;
