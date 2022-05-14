import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ButtonS } from '../../../styles/buttons'
import { useNavigate } from "react-router-dom";

import { DispatchContext } from "../../../appState/index";
import imageUrls from "../../item/imageUrls";

const ItemCard = ({ item, selectedItem, setSelectedItem }) => {
  const [, dispatch] = useContext(DispatchContext);
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/679/679720.png"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (item.pictures && item.pictures.length) {
      if (item.pictures[0] === imageUrls.dbPhotoUrl) {
        setImage(imageUrls[item.category]);
      } else {
        setImage(item.pictures[0]);
      }
    }
  }, [item.pictures]);

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
        {(item.pictures || !item.pictures.length) && (
          <StyledImage src={image} />
        )}
        {(!item.pictures || !item.pictures.length) && (
          <StyledImage src={imageUrls.notFound} />
        )}
      </PhotoDiv>

      <InnerItemContainer>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <div style={{display: 'flex', flexFlow: 'row wrap', marginTop: '1em'}}>
          {item.tag.map((tag, idx) => {
            return <Tag style={{marginRight: '0.5em'}} key={idx}>{tag}</Tag>;
          })}
        </div>
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
  display:flex;
  flex-direction:column;
  h1{
    font-size: 150%;
    margin: 0.5em 0;
  }
  p{
    font-size: 100%;
  }
`;

const ViewButton = styled(ButtonS)`
  margin-top: 1em;
  filter: none;
`;

const Tag = styled.div`
  color: white;
  background: var(--color1);
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 1em;
  border-radius: 30px;
  margin-right: 0.2em;
`;