import React from "react";
import styled from "styled-components";

const MarkerCard = ({ item }) => {
  const styles = {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "5px"
  };

  return (
    <MapMiniCard>
      <div style={styles}>
      <p>{item.category}</p>
      <TitleP>{item.title}</TitleP>
      <p>{item.description}</p>
      </div>
    </MapMiniCard>
  );
};

export default MarkerCard;

const MapMiniCard = styled.div`
  min-width: 80px;
  max-width: 80px;
  height: 35px
  border-radius: 5px;
  box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;

const TitleP = styled.p`
  font-weight: 400;
`;