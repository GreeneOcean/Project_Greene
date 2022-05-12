import React, { useContext, useEffect } from "react";
import styled from "styled-components";

const photoNotFoundURL =
  "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081";

const ItemPagePhoto = ({ pictures }) => {

  return (
    <StyledDiv>
      {pictures && pictures.length && <StyledImage src={pictures[0]} />}
      {(!pictures || !pictures.length) && (
        <StyledImage src={photoNotFoundURL} />
      )}
    </StyledDiv>
  );
};

export default ItemPagePhoto;

const StyledDiv = styled.div`
  width: 40vw;
  height: 40vw;
  object-fit: contain;
  border: solid;
  border-width: 2px;
  border-color: black;
  margin: 10px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

{
  /* <StyledImage src={pictures ? pictures[0] : photoNotFoundURL} /> */
}
