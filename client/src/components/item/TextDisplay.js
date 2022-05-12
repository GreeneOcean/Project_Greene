import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
// import { DispatchContext } from "../../../appState/index";

const TextDisplay = ({
  title,
  category,
  description,
  distance,
  charity_only,
  posted_by,
  interested_users,
  tag,
}) => {
  const [claimed, setClaimed] = useState(false);

  const navigate = useNavigate();

  const claimHandler = () => {
    setClaimed(true);
    //todo: probably a post request
  };

  const backToBrowse = () => {
    navigate("/Browse", { replace: true });
  };

  return (
    <TextDisplayContainer>
      <StyledSpan>
        <TitleP>{title}</TitleP>
        <StyledP>{`<> ${category}`}</StyledP>
      </StyledSpan>

      <StyledP>{description}</StyledP>
      {tag && tag.map((itemTag, idx) => <StyledP key={idx}>{itemTag}</StyledP>)}
      {interested_users && interested_users.length > 0 && (
        <StyledP>{`${interested_users.length} other users are interested in this item`}</StyledP>
      )}
      <StyledP>{`Donated by ${posted_by}`}</StyledP>
      {claimed && (
        <p>
          The owner of this donation has been notified, you will receive a
          notification if they choose to donate to you.
        </p>
      )}

      <StyledSpan>
        {!claimed && <button onClick={claimHandler}>Claim</button>}
        {charity_only && <StyledP>Charity Only</StyledP>}
        <button onClick={backToBrowse}>Back to Browsing</button>
      </StyledSpan>
    </TextDisplayContainer>
  );
};

export default TextDisplay;

const TextDisplayContainer = styled.div`
  width: 40vw;
  height: 40vw;
  margin: 10px;
  border: solid;
  border-color: grey;
  background-color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledSpan = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleP = styled.p`
  margin: 5px;
  font-weight: bold;
`;

const StyledP = styled.p`
  margin: 5px;
`;
