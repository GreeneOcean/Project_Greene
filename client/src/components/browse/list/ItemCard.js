import React from "react";
import styled from "styled-components";
import Link from "react-router-dom";

import { BsCardImage } from "react-icons/bs";

const ItemCard = ({ item, selectedItem, setSelectedItem }) => {
  const selectItemHandler = () => {
    setSelectedItem(item.id);
  };

  const claimClickHandler = () => {
    // send itemdata to state, global
  };

  return (
    <ItemContainer
      id={item.id}
      onClick={selectItemHandler}
      isSelected={selectedItem === item.id}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PhotoDiv>
          {item.pictures && <StyledImage src={item.pictures[0]} />}
          {!item.pictures && <BsCardImage />}
        </PhotoDiv>
      </div>
      <p>{item.title}</p>
      <p>{item.description}</p>
      {item.tag.map((tag, idx) => {
        return <p key={idx}>{tag}</p>;
      })}
      {selectedItem === item.id && (
        <button onClick={claimClickHandler}>View</button>
      )}
    </ItemContainer>
  );
};

export default ItemCard;

const ItemContainer = styled.div`
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  margin: 10px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "red" : "blue")};
`;

const PhotoDiv = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  object-fit: contain;
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
`;

{
  /* <Link to={"/Item"}>
<button onClick={claimClickHandler}>View</button>
</Link> */
}
