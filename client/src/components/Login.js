import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api';

const Login = ({ handleClickOther }) => {
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');

  const handleUserChange = (e) => {
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  const handleLogin = () => {
    api.get.login({
      userId: userText,
      attempt: passText
    })
    .then(res => console.log(res))
    // .then(res => dispatch(, payload))
    .catch(err => console.log(err))
  };

  return (
    <>
      <h1>Log in</h1>
      <input
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
          marginBottom: '15px'
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
          marginBottom: '15px'
        }}
        value={passText}
        onChange={handlePassChange}
        placeholder={'Enter your Password'}
      />
      <ButtonMD onClick={handleLogin}>Log in</ButtonMD>
      <div>Don't have an account? </div>
      <SignUpButton onClick={handleClickOther}>Sign Up</SignUpButton>
    </>
  );
};

const SignUpButton = styled.div`
  font-weight: bold;
  color: #37782c;
  width: 100px;
  &:hover {
    cursor: pointer;
    color: lightgreen;
    text-decoration: underline;
  }
`;

const ButtonMD = styled.button`
  border: 1px solid rgba(11, 191, 125, 0.9);
  border-radius: 6px;
  padding: 10px 50px;
  width: 400px;
  text-align: center;
  text-decoration: none;
  color: #37782C;
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

export default Login;
