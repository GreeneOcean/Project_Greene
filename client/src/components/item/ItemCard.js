import React, { useState } from "react";
import styled from "styled-components";

import { BsCardImage } from "react-icons/bs";

const ItemCard = (props) => {
  const clickHandler = () => {
    props.setSelectedItem(props.item.id);
  };

  return (
    <Container
      id={props.item.id}
      onClick={clickHandler}
      style={{
        backgroundColor: props.selectedItem === props.item.id ? "red" : "blue",
      }}
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
    </Container>
  );
};

export default ItemCard;

const Container = styled.div`
  min-width: 120px;
  max-width: 120px;
  height: 120px;
  margin: 10px;
  cursor: pointer;
`;
