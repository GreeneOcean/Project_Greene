import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ItemCard from "../browse/list/ItemCard";

const HomeItemsWidget = ({localItems}) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (localItems) {
      let items = localItems;
      items = items.filter((item) => item.distance < 10);
      setFilteredItems(items);
    }
  }, [localItems]);

  return (
    <StyledDiv>
      {filteredItems.map((item, idx) => {
        return (
          <StyledCard
            item={item}
            key={idx}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        );
      })}
    </StyledDiv>
  );
};

export default HomeItemsWidget;

const StyledDiv = styled.div`
  scroll-behavior: smooth;
  width: 70vw;
  height: 80vh;
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 10em 0;
`;

const StyledCard = styled(ItemCard)`
`;
