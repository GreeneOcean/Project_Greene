import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ItemCard from "./ItemCard.js";

const ItemList = ({ items, selectedItem, setSelectedItem }) => {
  useEffect(() => {
    if (selectedItem) {
      const myElement = document.getElementById(selectedItem.toString());
      myElement.scrollIntoView();
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
  width: 50%;
  background-color: rgba(255,255,255,0.3);
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
