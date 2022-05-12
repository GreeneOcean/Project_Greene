import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { DispatchContext } from "../../../appState/index";
// import { BsCardImage } from "react-icons/bs";

const ItemCard = ({ item, selectedItem, setSelectedItem }) => {
  const [, dispatch] = useContext(DispatchContext);

  const navigate = useNavigate();
  const photoNotFoundURL =
    "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081";

  const selectItemHandler = () => {
    setSelectedItem(item.id);
  };

  const claimClickHandler = () => {
    dispatch({ type: "ADD_ITEM", payload: item });
    navigate("/Item", { replace: true });
  };

  return (
    <ItemContainer
      id={item.id}
      onClick={selectItemHandler}
      isSelected={selectedItem === item.id}
    >
      <InnerItemContainer>
        <PhotoDiv>
          {(item.pictures && item.pictures.length) && <StyledImage src={item.pictures[0]} />}
          {(!item.pictures || !item.pictures.length) && <StyledImage src={photoNotFoundURL}/>}
        </PhotoDiv>
      </InnerItemContainer>
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

const InnerItemContainer = styled.div`
  display: "flex";
  justify-content: "space-between";
`;
