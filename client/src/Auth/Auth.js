import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import SignUp from './components/SignUp';

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);

  const handleClickOther = () => {
    setIsRegistered(!isRegistered);
  }

  if (isRegistered) {
    return (
      <>
        <Login handleClickOther={handleClickOther}/>
      </>
    );
  } else {
    return (
      <>
        <SignUp handleClickOther={handleClickOther}/>
      </>
    );
  }
};

const ButtonSM = styled.button`
  border: 1px solid rgba(11, 191, 125, 0.9);
  border-radius: 6px;
  padding: 10px 50px;
  text-align: center;
  text-decoration: none;
  color: green;
  background-color: transparent;
  box-shadow: 5px 5px 12px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #37782C;
    box-shadow: 0px 5px 10px rgba(46, 229, 157, 0.4);
  }
`;

export default Auth;