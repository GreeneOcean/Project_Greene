import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PageContainer } from "../styles/index.js";

function Item({ state, dispatch, init }) {
  const { dev } = state;




  return (
    <PageContainer >
      <h3>Item</h3>
    </PageContainer>
  );
}

export default Item;
