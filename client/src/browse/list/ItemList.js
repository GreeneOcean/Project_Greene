import React, {useEffect, useState} from "react";
import styled from "styled-components";

import ItemCard from "./ItemCard.js";

const ItemList = ({items, selectedItem, setSelectedItem}) => {

  useEffect(() => {
    if (selectedItem) {
      const myElement = document.getElementById(selectedItem.toString())
      document.getElementById("itemList").scrollTop = myElement.offsetTop - 130;
    }
  }, [selectedItem]);

  return (
    <ItemListContainer id="itemList">
      {items.map((item, idx) => {
        return (
          <ItemCard
            item={item}
            key={idx}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
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
