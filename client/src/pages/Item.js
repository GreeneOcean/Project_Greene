import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PageContainer } from "../styles/index.js";
import ItemPagePhoto from "../components/item/ItemPagePhoto";
import TextDisplay from "../components/item/TextDisplay";
import ItemPageMap from "../components/item/ItemPageMap";

function Item({ state, dispatch }) {
  const { dev } = state;

  return (
    <PageContainer>
      <ItemPageContainer>
        <ItemPagePhoto pictures={state.pictures} />
        <TextDisplay
          title={state.title}
          category={state.category}
          description={state.description}
          distance={state.distance}
          charity_only={state.charity_only}
          posted_by={state.posted_by}
          interested_users={state.interested_users}
          tag={state.tag}
          state={state}
        />
      </ItemPageContainer>
      <MapContainer>
        <p>{`${Math.ceil(state.distance)} ${
          state.distance > 1 ? "miles" : "mile"
        } from you`}</p>
        <ItemPageMap lat={state.lat} lng={state.lng} state={state} />
      </MapContainer>
    </PageContainer>
  );
}

export default Item;

const ItemPageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 10vh;
  height: 40vh;
  width: 70vw;

  *{
    margin: 0;
    height:100%;
  }
`;

const MapContainer = styled.div`

height: 35vh;
width: 60vh;
margin-top: 10vh;
`;
