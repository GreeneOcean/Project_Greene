import React from "react";
import styled from "styled-components";

import ItemCard from "./ItemCard.js";

const Container = styled.div`
height: 600px;
width: 400px;
background-color: yellow;
display: flex;
`;

const ItemList = (props) => {

  return (
    <Container>
      {props.items.map((item, idx) => {
        return <ItemCard item={item} key={idx}/>
      })}
    </Container>
  );
};

export default ItemList;