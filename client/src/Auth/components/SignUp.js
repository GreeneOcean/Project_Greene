import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SignUp = ({ handleClickOther }) => {
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');
  const [confPassText, setConfPassText] = useState('');

  const handleUserChange = (e) => {
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  const handleConfPassChange = (e) => {
    setConfPassText(e.target.value);
  };

  return (
    <>
      <h1>Sign up to continue</h1>
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
        placeholder={'Create your Username'}
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
        placeholder={'Create your Password'}
      />
      <h3>Confirm password</h3>
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
        value={confPassText}
        onChange={handleConfPassChange}
        placeholder={'Confirm your Password'}
      />
      <input type='checkbox' />
      <div>I agree to the Greene Ocean <u>Terms of Service</u> and <u>Privacy Policy</u></div>
      <ButtonSM>Sign up</ButtonSM>
      <div>Already have an account? </div>
      <LoginButton onClick={handleClickOther}>Log in</LoginButton>
    </>
  );
};

const LoginButton = styled.div`
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

export default SignUp;
