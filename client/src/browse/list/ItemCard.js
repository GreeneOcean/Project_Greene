import React, { useState } from "react";
import styled from "styled-components";

import { BsCardImage } from "react-icons/bs";

const ItemCard = (props) => {
  const clickHandler = () => {
    props.setSelectedItem(props.item.id);
  };

  return (
    <ItemContainer
      id={props.item.id}
      onClick={clickHandler}
      isSelected={props.selectedItem === props.item.id}
    >
      <div style={{display: "flex", justifyContent: "space-between"}}>
        {props.item.pictures && <img src={item.pictures[0]} />}
        {!props.item.pictures && <BsCardImage />}
        {props.selectedItem === props.item.id && (
          <button
            onClick={() => {
              console.log("functionality not yet implemented");
            }}
          >
            Add to cart
          </button>
        )}
        </div>
        <p>{props.item.title}</p>
        <p>{props.item.description}</p>
        {props.item.tag.map((tag, idx) => {
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
