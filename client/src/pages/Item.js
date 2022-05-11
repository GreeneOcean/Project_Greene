import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PageContainer } from "../styles/index.js";
import ItemPagePhoto from "../components/item/ItemPagePhoto";

function Item({ state, dispatch, init }) {
  const { dev } = state;

  console.log('itemState: ', state.pictures);

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
    <PageContainer >
      <ItemPageContainer>
      <ItemPagePhoto pictures={state.pictures}/>
      </ItemPageContainer>

    </PageContainer>
  );
}

export default Item;


const ItemPageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;