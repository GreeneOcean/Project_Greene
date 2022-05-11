import React, {useEffect, useState} from "react";
import styled from "styled-components";

import ItemCard from "./ItemCard.js";

const ItemList = (props) => {

  useEffect(() => {
    if (props.selectedItem) {
      const myElement = document.getElementById(props.selectedItem.toString())
      document.getElementById("itemList").scrollTop = myElement.offsetTop - 130;
    }
  }, [props.selectedItem]);

  return (
    <ItemListContainer id="itemList">
      {props.items.map((item, idx) => {
        return (
          <ItemCard
            item={item}
            key={idx}
            selectedItem={props.selectedItem}
            setSelectedItem={props.setSelectedItem}
          />
        );
      })}
    </ItemListContainer>
  );
};

export default ItemList;

const ItemListContainer = styled.div`
  scroll-behavior: smooth;
  height: 600px;
  width: 550px;
  background-color: yellow;
  display: flex;
  overflow: scroll;
  flex-wrap: wrap;
`;
