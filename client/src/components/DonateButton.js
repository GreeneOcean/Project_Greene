import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"
import { ButtonL } from '../styles/buttons';

const DonateButton = function () {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/Donate');
  }

  return(
    <Container>
      <StyledButton onClick={handleClick}>
      Donate +
      </StyledButton>
    </Container>
  );
}


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