import React from "react";
import styled from "styled-components";

const MarkerCard = ({ item }) => {
  return (
    <MapMiniCard>
      <p>{item.category}</p>
      <p>{item.title}</p>
      <p>{item.description}</p>
    </MapMiniCard>
  );
};

export default MarkerCard;

const MapMiniCard = styled.div`
  min-width: 80px;
  max-width: 80px;
  height: 35px
  background-color: whitesmoke;
  position: absolute;
  z-index: 5;
`;
