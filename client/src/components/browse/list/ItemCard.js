import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { DispatchContext } from "../../../appState/index";
import { ButtonS } from '../../../styles/buttons';
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

        <PhotoDiv>
          {(item.pictures && item.pictures.length) && <StyledImage src={item.pictures[0]} />}
          {(!item.pictures || !item.pictures.length) && <StyledImage src={photoNotFoundURL}/>}
        </PhotoDiv>
        <InnerItemContainer>
      <h2 style={{marginBottom: '0.5em', fontSize: '100%', borderBottom: '1px solid rgba(0,0,0,0.3)'}}>{item.title}</h2>
      <p>{item.description}</p>
      {item.tag.map((tag, idx) => {
        return <p key={idx}>{tag}</p>;
      })}
      {selectedItem === item.id && (
        <ViewButton onClick={claimClickHandler}>View</ViewButton>
      )}
      </InnerItemContainer>
    </ItemContainer>
  );
};

export default ItemCard;

const ItemContainer = styled.div`
  min-width: 300px;
  width: 40%;
  margin: 10px;
  display: flex;
  border-radius: 10px;
  padding:2em;
  cursor: pointer;
  background-color: white;
  font-size: 100%;
  box-shadow: ${({isSelected}) => isSelected ? 'inset 0 0 2em var(--color1)' : 'none'};

`;
//width: ${({isSelected}) => isSelected ? '70%' : '40%'};

//  font-size: ${({isSelected}) => isSelected ? '2em' : '1em'};
  // background-color: ${({ isSelected }) => (isSelected ? "var(--color1)" : "white")};`;
// background-color: ${({ isSelected }) => (isSelected ? "red" : "blue")};

const PhotoDiv = styled.div`
  width:50%;
  height:100%;
  overflow: hidden;
  object-fit: contain;
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
`;

const InnerItemContainer = styled.div`
  width:50%;
  padding-left:1em;
`;

const ViewButton = styled(ButtonS)`
  margin-top: 1em;
  filter: none;
`;
