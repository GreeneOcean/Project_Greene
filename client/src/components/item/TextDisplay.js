import React from "react";
import styled from "styled-components";

const TextDisplay = (props) => {
  const placeholder = "this is a placeholder";

  return (
    <Container>
      <div>
        <Span>
          <TitleP>{props.item.title}</TitleP>
          <StyledP>{`<> ${props.item.category}`}</StyledP>
        </Span>
        <StyledP>{props.item.description}</StyledP>
        <StyledP>{`${Math.ceil(props.item.distance)} ${
          props.item.distance > 1 ? "miles" : "mile"
        } from you`}</StyledP>
      </div>

      <Span>
        <StyledP>{`Donated by ${props.item.username}`}</StyledP>
        <StyledP>{`User Rating (${props.item.rating}/5)`}</StyledP>
      </Span>
    </Container>
  );
};

export default TextDisplay;

const Container = styled.div`
  min-width: 40%;
  max-width: 40%;
  height: 400px;
  border: solid;
  border-color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Span = styled.div`
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
