import React from 'react';
import styled, {keyframes} from 'styled-components';
import {ButtonL} from '../styles/buttons';

const DonateButton = function () {

  return(
    <Container>
      <StyledButton>
      Donate +
      </StyledButton>
    </Container>
  );
}

const GradientBG = keyframes`
  0%{
    background-size: 100% 100%;
  }
  50%{
    background-size: 300% 300%;
  }
  100%{
    background-size: 100% 100%;
  }
`;


const Container = styled.div`
  width:100%;
  height: 20vh;
  display: flex;
  justify-content:center;
  align-items:center;
  background:transparent;
  margin:12em 0;
`;

const StyledButton = styled.div`
  font-size: 4em;
  color: white;
  border: white 1px solid;
  padding: 0.5em 1em;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.5s, font-size 0.5s;
  mix-blend-mode:none;

  :hover {
    background:white;
    color:black;
    mix-blend-mode:screen;
    font-size: 4.5em;
  }

`;

export default DonateButton;