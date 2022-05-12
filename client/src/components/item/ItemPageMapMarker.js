import React from "react";
import styled from "styled-components";

import { RiMapPin2Fill } from "react-icons/ri";

const ItemPageMapMarker = ({ $hover }) => {
  return <StyledPin />;
};

export default ItemPageMapMarker;

const StyledPin = styled(RiMapPin2Fill)`
  color: blue;
  height: 25px;
  width: 25px;
`;
