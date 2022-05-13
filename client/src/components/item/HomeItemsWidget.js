import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ItemCard from "../browse/list/ItemCard";

const HomeItemsWidget = ({ localItems, charity_state }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (localItems) {
      let items = localItems.filter((item) => {
        return (
          item.distance <= 10 &&
          !(["false", "denied"].includes(charity_state) && item.charity_only)
        );
      });
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