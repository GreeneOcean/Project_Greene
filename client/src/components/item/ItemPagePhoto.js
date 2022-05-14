import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import imageUrls from "./imageUrls";


const ItemPagePhoto = ({ pictures, category }) => {
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/679/679720.png"
  );

  useEffect(() => {
    if (pictures && pictures.length) {
      if (pictures[0] === imageUrls.dbPhotoUrl) {
        setImage(imageUrls[category]);
      } else {
        setImage(item.pictures[0]);
      }
    }
  }, [pictures]);

  return (
    <StyledDiv>
      {pictures && pictures.length && <StyledImage src={image} />}
      {(!pictures || !pictures.length) && (
        <StyledImage src={imageUrls.notFound} />
      )}
    </StyledDiv>
  );
};

export default ItemPagePhoto;

const StyledDiv = styled.div`
  width: auto;
  height: 50%;
  object-fit: contain;
  margin-right:5em;
  background-color: white;
  border-radius: 10px;
  padding: 1em;
`;

const StyledImage = styled.img`
  height: 100%;
`;


