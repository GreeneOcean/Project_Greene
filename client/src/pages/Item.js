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
        <ItemPagePhoto pictures={state.pictures} category={state.category} />
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
        <p
          style={{
            fontSize: "1.5em",
            textAlign: "center",
            marginBottom: "0.5em",
          }}
        >{`${Math.ceil(state.distance)} ${
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
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  min-height: 40vh;
  background: white;
  border-radius: 10px;
  padding: 3%;
`;

const MapContainer = styled.div`
  position: relative;
  height: 35vh;
  width: 60vh;
  margin: 10vh 0;
`;
