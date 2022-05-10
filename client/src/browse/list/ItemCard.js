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
      {props.item.pictures && <img src={item.pictures[0]} />}
      {!props.item.pictures && <BsCardImage />}
      <p>{props.item.title}</p>
      <p>{props.item.description}</p>
      {props.item.tag.map((tag, idx) => {
        return <p key={idx}>{tag}</p>;
      })}
    </Container>
  );
};

const Container = styled.div`
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  margin: 10px;
  cursor: pointer;
`;

export default ItemCard;
