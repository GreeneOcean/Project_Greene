import React from 'react'
import styled from "styled-components";


const MarkerCard = (props) => {
  return (
    <Card>
      <p>{props.item.category}</p>
      <p>{props.item.title}</p>
      <p>{props.item.description}</p>
    </Card>
  );
};

export default MarkerCard;

const Card = styled.div`
  min-width: 80px;
  max-width: 80px;
  height: 35px
  background-color: whitesmoke;
  position: absolute;
  z-index: 5;
`;