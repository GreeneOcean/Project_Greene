import React from "react";
import styled from "styled-components";

const TextDisplay = ({
  title,
  category,
  description,
  distance,
  charity,
  posted_by,
  interested_users,
}) => {
  const claimHandler = () => {};

  return (
    <TextDisplayContainer>
      <StyledSpan>
        <TitleP>{title}</TitleP>
        <StyledP>{`<> ${category}`}</StyledP>
      </StyledSpan>
      <StyledP>{description}</StyledP>
      {interested_users && interested_users.length > 0 && (
        <StyledP>{`${interested_users.length} other users are interested in this item`}</StyledP>
      )}
      <StyledSpan>
        <StyledP>{`Donated by ${posted_by}`}</StyledP>
        {charity && <StyledP>Charity Only</StyledP>}
      </StyledSpan>
      <ClaimButton onClick={claimHandler}>Claim</ClaimButton>
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

const ClaimButton = styled.button``;
