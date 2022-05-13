import React, { useState, useContext } from "react";
import styled from "styled-components";

import MarkerCard from "./MarkerCard.js";
import { RiMapPin2Fill } from "react-icons/ri";

const MapMarker = ({ item, selectedItem, $hover, setSelectedItem }) => {

  const style =
    selectedItem === item.id
      ? { color: "red", height: "5em", width: "5em" }
      : $hover
      ? { color: "cyan", cursor: "pointer", height: "2em", width: "2em" }
      : { color: "blue", height: "2em", width: "2em" };

  const clickHandler = () => {
    setSelectedItem(item.id);
  };

  return (
    <div>
      <StyledPin
        onClick={() => {
          setSelectedItem(item.id);
        }}
        hover={$hover}
        selected={!!(selectedItem === item.id)}
        // style={style}
      />
      {$hover && <MarkerCard item={item} />}
    </div>
  );
};

const StyledPin = styled(RiMapPin2Fill)`
  color: ${({selected, hover}) => selected ? 'var(--color1)' : (hover ? 'var(--color1)' : 'var(--color3)')};
  width: 3em;
  height: auto;
  cursor: pointer;
  transform: translate(50% 100%);
  transform-origin: center center;
`;

export default MapMarker;
