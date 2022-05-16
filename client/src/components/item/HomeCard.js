import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ButtonS } from '../../styles/buttons'
import { useNavigate } from "react-router-dom";

import { DispatchContext } from "../../appState/index";
import imageUrls from "../item/imageUrls";

const HomeCard = ({ item, selectedItem, setSelectedItem }) => {
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
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p> {`${Math.ceil(item.distance)} ${
          item.distance > 1 ? "miles" : "mile"
        } from you`} </p>
        <div style={{display: 'flex', marginTop: '1em'}}>
          {item.tag.map((tag, idx) => {
            return <Tag style={{marginRight: '0.5em'}} key={idx}>{tag}</Tag>;
          })}
        </div>
      </InnerItemContainer>
      <Footer>
        <ViewButton onClick={claimClickHandler}>View</ViewButton>
      </Footer>
    </ItemContainer>
  );
};

export default HomeCard;

const ItemContainer = styled.div`
  min-width: 300px;
  width: 20%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 1.75em;
  cursor: pointer;
  background-color: white;
  font-size: 100%;
  box-shadow: ${({isSelected}) => isSelected ? 'inset 0 0 2em var(--color1)' : 'none'};
  :hover {
    width:25%;
  }
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
  object-fit: contain;
`;

const InnerItemContainer = styled.div`
  width:100%;
  padding:0.25em;
  /* display: flex; */

  overflow: auto;
  padding-top: 2em;
  align-items: center;
  white-space: nowrap;

  h1{
    font-size: 150%;
    margin: 0.5em 0;
  }
  p{
    font-size: 100%;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const ViewButton = styled(ButtonS)`
  width: 70%;
  margin-top: 0.8em;
  filter: none;
`;

const Tag = styled.div`
  color: white;
  background: var(--color1);
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 0.8em;
  border-radius: 30px;
  margin-right: 0.2em;
`;