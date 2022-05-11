import React, { useState, useContext } from "react";
import styled from "styled-components";

import MarkerCard from "./MarkerCard.js";
import { RiMapPin2Fill } from "react-icons/ri";
// import {FaMapMarkerAlt } from "react-icons/fa";
const MapMarker = (props) => {
  const style =
    props.selectedItem === props.item.id
      ? { color: "red", height: "25px", width: "25px" }
      : props.$hover
      ? { color: "cyan", cursor: "pointer", height: "25px", width: "25px" }
      : { color: "blue", height: "25px", width: "25px" };

  const clickHandler = () => {
    props.setSelectedItem(props.item.id);
  };

  return (
    <div>
      <RiMapPin2Fill
        onClick={() => {
          props.setSelectedItem(props.item.id);
        }}
        style={style}
      />
      {props.$hover && <MarkerCard item={props.item} />}
    </div>
  );
};

export default MapMarker;

const StyledDiv = styled.div`
  display: flex;
`;
