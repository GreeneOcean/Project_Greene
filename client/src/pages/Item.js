import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PageContainer } from "../styles/index.js";

function Item({ state, dispatch, init }) {
  const { dev } = state;

  useEffect(() => {
    init().then((res) => {
      dev.logs && console.log(`\nItem API init res`, res);
      dev.logs && console.log("Item state", state);
      dispatch({
        type: `ITEM_INIT`,
        payload: res,
      });
    });
  }, []);



  return (
    <PageContainer>
      <h3>Item</h3>
      <p>{`ItemData: ${state.ItemData}`} </p>
      <Link to="/">Home</Link>
      <Link to="/Donate">Donate</Link>
      <Link to="/Auth">Auth</Link>
      <Link to="/Browse">Browse</Link>
    </PageContainer>
  );
}

export default Item;
