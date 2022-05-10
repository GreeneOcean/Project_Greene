import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Login = ({ handleClickOther }) => {
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');

  const handleUserChange = (e) => {
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  return (
    <>
      <h1>Log in to Greene Ocean</h1>
      <h3>Username</h3>
      <input
          id="search"
          type="search"
          autoComplete="off"
          maxLength="150"
          style={{
            height: '40px',
            width: '500px',
            borderRadius: '6px',
            padding: '12px',
            backgroundColor: 'rgb(245,245,245)',
            transition: 'all 0.5s',
            cursor: 'text',
          }}
          value={userText}
          onChange={handleUserChange}
          placeholder={'Enter your Username'}
        />
      <h3>Password</h3>
      <input
          id="search"
          type="search"
          autoComplete="off"
          maxLength="150"
          style={{
            height: '40px',
            width: '500px',
            borderRadius: '6px',
            padding: '12px',
            backgroundColor: 'rgb(245,245,245)',
            transition: 'all 0.5s',
            cursor: 'text',
          }}
          value={passText}
          onChange={handlePassChange}
          placeholder={'Enter your Password'}
        />
        <ButtonSM>Log in</ButtonSM>
        <div>Don't have an account? </div>
        <SignUpButton
          onClick={handleClickOther}
        >Sign Up</SignUpButton>
    </>
  )
}

const SignUpButton = styled.div`
  font-weight: bold;
  color: #37782C;
  width: 100px;

  &:hover {
    cursor: pointer;
    color: lightgreen;
    text-decoration: underline;
  }
`;

const ButtonSM = styled.button`
  border: 1px solid rgba(11, 191, 125, 0.9);
  border-radius: 6px;
  padding: 10px 50px;
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

export default Login