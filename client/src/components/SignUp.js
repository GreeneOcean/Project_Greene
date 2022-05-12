import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../api';

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

  const handleSignUp = () => {
    api.get
      .login({
        userId: userText,
        attempt: passText,
        charity: '',
      })
      .then((res) => console.log(res))
      // .then(res => dispatch(, payload))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Create a new account</h1>
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
          marginBottom: '15px',
        }}
        value={userText}
        onChange={handleUserChange}
        placeholder={'Create your Username'}
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
        placeholder={'Create your Password'}
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
        }}
        value={confPassText}
        onChange={handleConfPassChange}
        placeholder={'Confirm your Password'}
      />
      <div>
        <input type="checkbox" />
        Would you like to apply for chaity status?
      </div>
      <div>
        <input type="checkbox" />I agree to the Greene Ocean{' '}
        <u>Terms of Service</u> and <u>Privacy Policy</u>
      </div>
      <ButtonMD onClick={handleSignUp}>Sign up</ButtonMD>
      <div>
        Already have an account?
        <LoginButton onClick={handleClickOther}>Log in</LoginButton>
      </div>
    </>
  );
};

const LoginButton = styled.div`
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
  color: #37782c;
  background-color: transparent;
  box-shadow: 5px 5px 12px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #37782c;
    box-shadow: 0px 5px 10px rgba(46, 229, 157, 0.4);
  }
`;

export default SignUp;
