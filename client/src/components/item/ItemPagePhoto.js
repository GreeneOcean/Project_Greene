import React, { useContext, useEffect } from "react";
import styled from "styled-components";

const photoNotFoundURL =
  "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";

const ItemPagePhoto = ({pictures}) => {
  return (
    <StyledDiv>
      <StyledImage src={pictures ? pictures[0] : photoNotFoundURL} />
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
