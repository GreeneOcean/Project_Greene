import React, { useContext, useEffect } from "react";
import styled from "styled-components";

const photoNotFoundURL =
  "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";

const Photo = (props) => {
  return (
    <StyledDiv>
      <StyledImage src={props.photos ? props.photos[0] : photoNotFoundURL} />
    </StyledDiv>
  );
};

export default Photo;

const StyledDiv = styled.div`
  width: 40%;
  height: 500px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
