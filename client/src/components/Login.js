import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { StateContext, DispatchContext } from '../appState';
import api from '../api';
import { ButtonMD, LogSignButton } from '../styles/buttons';
import { AuthInput } from '../styles/input';

const Login = ({ handleClickOther }) => {
  const [, dispatch] = useContext(DispatchContext);
  // const [state] = useContext(StateContext);
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const handleUserChange = (e) => {
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  const handleLoginEnter = (e) => {
    if (e.keyCode === 13 && passText.length && userText.length) {
      api.get
        .login(
          {
            userName: userText,
            attempt: passText,
          },
          dispatch,
        )
        .then(() => {
          setDisplayErrorMessage(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLoginClick = () => {
    if (passText.length && userText.length) {
      api.get
        .login(
          {
            userName: userText,
            attempt: passText,
          },
          dispatch,
        )
        .then(() => {
          setDisplayErrorMessage(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h1 style={{ marginBottom: '15px' }}>Welcome!</h1>
      <AuthInput
        id="usernameLogin"
        autoComplete="off"
        maxLength="150"
        value={userText}
        onChange={handleUserChange}
        placeholder={'Enter your Username'}
        onKeyDown={handleLoginEnter}
      />
      <AuthInput
        id="passwordLogin"
        type="password"
        autoComplete="off"
        maxLength="150"
        value={passText}
        onChange={handlePassChange}
        placeholder={'Enter your Password'}
        onKeyDown={handleLoginEnter}
      />
      {displayErrorMessage ? (
        <div
          style={{
            color: 'red',
          }}
        >
          <span>The username or password you entered is incorrect.</span>
        </div>
      ) : null}
      <ButtonMD onClick={handleLoginClick} style={{ marginBottom: '15px' }}>
        Log in
      </ButtonMD>
      <div>Don't have an account? </div>
      <LogSignButton onClick={handleClickOther}>Sign Up</LogSignButton>
    </>
  );
};

export default Login;
