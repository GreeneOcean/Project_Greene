import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PageContainer } from "../styles/index.js";
import ItemPagePhoto from "../components/item/ItemPagePhoto";
import TextDisplay from "../components/item/TextDisplay";
import ItemPageMap from "../components/item/ItemPageMap"

function Item({ state, dispatch, init }) {
  const { dev } = state;

  console.log("itemState: ", state.interested_users);

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
      <ItemPageContainer>
        <ItemPagePhoto pictures={state.pictures} />
        <TextDisplay
          title={state.title}
          category={state.category}
          description={state.description}
          distance={state.distance}
          charity={state.charity}
          posted_by={state.posted_by}
          interested_users={state.interested_users}
        />
      </ItemPageContainer>
      <ItemPageMap lat={state.lat} lng = {state.lng} />

    </PageContainer>
  );
}
// {`${Math.ceil(distance)} ${
//   distance > 1 ? "miles" : "mile"
// } from you`}
export default Item;

const ItemPageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
