import React, { useState } from "react";
import styled from "styled-components";

import { BsCardImage } from "react-icons/bs";

const ItemCard = ({setSelectedItem, item, selectedItem}) => {
  const clickHandler = () => {
    setSelectedItem(item.id);
  };

  return (
    <ItemContainer
      id={item.id}
      onClick={clickHandler}
      isSelected={selectedItem === item.id}
    >
      <div style={{display: "flex", justifyContent: "space-between"}}>
        {item.pictures && <img src={item.pictures[0]} />}
        {!item.pictures && <BsCardImage />}
        {selectedItem === item.id && (
          <button
            onClick={() => {
              console.log("functionality not yet implemented");
            }}
          >
            Add to cart
          </button>
        )}
        </div>
        <p>{item.title}</p>
        <p>{item.description}</p>
        {item.tag.map((tag, idx) => {
          return <p key={idx}>{tag}</p>;
        })}
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  margin: 10px;
  cursor: pointer;
  background-color: ${({ isSelected } => isSelected ? "red" : "blue" )};
`;

export default ItemCard;
