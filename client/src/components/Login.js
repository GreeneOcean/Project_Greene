import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState';
import styled from 'styled-components';
import api from '../api';
import { ButtonMD, LogSignButton } from '../styles/buttons';
import { AuthInput } from '../styles/input';

const Login = ({ handleClickOther }) => {
  const [ ,dispatch] = useContext(DispatchContext);
  // const [state] = useContext(StateContext);
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');

  const handleUserChange = (e) => {
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  const handleLogin = () => {
    api.get
      .login({
        userName: userText,
        attempt: passText,
      }, dispatch)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 style={{ marginBottom: '15px' }}>Welcome!</h1>
      <AuthInput
        id='usernameLogin'
        autoComplete="off"
        maxLength="150"
        value={userText}
        onChange={handleUserChange}
        placeholder={'Enter your Username'}
      />
      <AuthInput
        id="passwordLogin"
        type="password"
        autoComplete="off"
        maxLength="150"
        value={passText}
        onChange={handlePassChange}
        placeholder={'Enter your Password'}
      />
      <ButtonMD
        onClick={handleLogin}
        style={{ marginBottom: '15px' }}
      >
        Log in
      </ButtonMD>
      <div>Don't have an account? </div>
      <LogSignButton onClick={handleClickOther}>Sign Up</LogSignButton>
    </>
  );
};

export default Login;
