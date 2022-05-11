import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../../appState';
import styled from 'styled-components';
import api from '../../api';
import { ButtonMD, LogSignButton } from '../styles/buttons';
import { AuthInput } from '../styles/input';

const Login = ({ handleClickOther }) => {
  // const [ ,dispatch] = useContext(DispatchContext);
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
        userId: userText,
        attempt: passText,
      })
      .then((res) => console.log(res))
      // .then(res => dispatch(, payload))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 style={{ marginBottom: '15px', }}>Welcome!</h1>
      <AuthInput
        id="search"
        type="search"
        autoComplete="off"
        maxLength="150"
        style={{
          height: '40px',
          width: '400px',
          borderRadius: '6px',
          padding: '12px',
          backgroundColor: 'rgb(245,245,245)',
          transition: 'all 0.5s',
          cursor: 'text',
          marginBottom: '15px',
        }}
        value={userText}
        onChange={handleUserChange}
        placeholder={'Enter your Username'}
      />
      <input
        id="search"
        type="password"
        autoComplete="off"
        maxLength="150"
        style={{
          height: '40px',
          width: '400px',
          borderRadius: '6px',
          padding: '12px',
          backgroundColor: 'rgb(245,245,245)',
          transition: 'all 0.5s',
          cursor: 'text',
          marginBottom: '15px',
        }}
        value={passText}
        onChange={handlePassChange}
        placeholder={'Enter your Password'}
      />
      <ButtonMD
        onClick={handleLogin}
        style={{
          marginBottom: '15px',
        }}
      >
        Log in
      </ButtonMD>
      <div>Don't have an account? </div>
      <LogSignButton onClick={handleClickOther}>Sign Up</LogSignButton>
    </>
  );
};

export default Login;
