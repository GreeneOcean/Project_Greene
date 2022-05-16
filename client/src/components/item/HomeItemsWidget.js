import React, { useState, useEffect } from "react";
import styled from "styled-components";

import HomeCard from "./HomeCard";

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
          <HomeCard
            item={item}
            key={idx}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          >

          </HomeCard>
        );
      })}
    </StyledDiv>
  );
};

export default HomeItemsWidget;

const StyledDiv = styled.div`
  /* scroll-behavior: smooth;
  width: 70vw;
  display: flex;
  overflow: auto;
  flex-flow: row noWrap;
  justify-content: space-evenly;
  margin: 10em 0; */

  height: auto;
  display: flex;
  padding: 2em;
  overflow: auto;
  padding-top: 2em;
  align-items: center;
  white-space: nowrap;
  width: 95%;
  margin-bottom: 10vh;


`;

