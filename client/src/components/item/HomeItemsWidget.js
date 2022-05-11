import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ItemCard from "./ItemCard.js";

const HomeItemsWidget = (props) => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let items = props.items;
    items = items.filter((item) => item.distance < 10);
    setFilteredItems(items);
  }, []);

  const itemSelectHandler = () => {
    console.log("this is a placeholder function that will alter state");
  };

  const statePlaceholder = { id: 123 };

  return (
    <StyledDiv>
      {filteredItems.map((item, idx) => {
        return (
          <ItemCard
            item={item}
            key={idx}
            selectedItem={statePlaceholder}
            setSelectedItem={itemSelectHandler}
          />
        );
      })}
    </StyledDiv>
  );
};

export default HomeItemsWidget;

const StyledDiv = styled.div`
  scroll-behavior: smooth;
  height: 300px;
  width: 85%;
  background-color: yellow;
  display: flex;
  overflow: scroll;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
