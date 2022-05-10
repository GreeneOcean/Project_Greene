import React, {useEffect, useState} from "react";
import styled from "styled-components";

import ItemCard from "./ItemCard.js";

const Container = styled.div`
  scroll-behavior: smooth;
  height: 600px;
  width: 550px;
  background-color: yellow;
  display: flex;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
`;

const ItemList = (props) => {

  useEffect(() => {
    if (props.selectedItem) {
      let myElement = document.getElementById(props.selectedItem.toString())
      console.log("myElement: ", myElement);
      let topPos = myElement.offsetTop;
      console.log("topPos: ", topPos);
      document.getElementById("itemList").scrollTop = topPos - 155;
    }
  }, [props.selectedItem]);

  return (
    <Container id="itemList">
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
    </Container>
  );
};

export default ItemList;
