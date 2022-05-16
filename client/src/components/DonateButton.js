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
      <StyleText>We at <Hilight>Greene Ocean Inc.</Hilight> are seeking to connect people in need with those more fortunate through technology. Our goal is to spread nation wide and eventually go global with out vision. We believe that tools like our website will inspire generosity among those in your local community and connect everyone on a deep and fundamental level.</StyleText>
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
  flex-direction: column;
  justify-content:center;
  align-items:center;
  background:transparent;
  margin:12em 0;
`;

const StyledButton = styled.div`
  font-size: 2em;
  color: white;
  border: white 1px solid;
  padding: 0.5em 1em;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.5s, font-size 0.5s;
  mix-blend-mode:none;

  :hover {
    background:white;
    color:black;
    mix-blend-mode:screen;
    font-size: 2.5em;
  }
`;

const StyleText = styled.p`
  color: white;
  font-size: 1.3em;
  padding: 0 27%;
  line-height: 190%;
  margin-bottom: 2em;
`;

const Hilight = styled.div`
  color: #2dff84;
  font-size: 1.75em;
`

export default DonateButton;