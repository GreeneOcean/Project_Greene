import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PageContainer } from "../styles/index.js";
import TextDisplay from "../components/item/TextDisplay.js";
import Photo from "../components/item/Photo.js"

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

  const dummyItem = {
    username: "Mr Mark",
    id: 1234,
    photos: null,
    category: "jackets",
    tag: ["tag1", "tag2"],
    distance: 4.5,
    title: "what a sweet deal!",
    description:
      "this is a descriptions. I like tacos ANd burgers and steak and salad!",
    rating: 5,
  };
  const dummyUser = {
    lat: 30.2672,
    lng: -97.7431,
  };

  return (
    <PageContainer>
      <h3>Item</h3>
      <p>{`ItemData: ${state.ItemData}`} </p>
      <Link to="/">Home</Link>
      <Link to="/Donate">Donate</Link>
      <Link to="/Auth">Auth</Link>
      <Link to="/Browse">Browse</Link>
      <StyledDiv>
        <Photo item={dummyItem} />
        <TextDisplay item={dummyItem} />
      </StyledDiv>
    </PageContainer>
  );
}

export default Item;

const StyledDiv = styled.div`
  min-width: 90%;
  max-width: 90%;
`;
