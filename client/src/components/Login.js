<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../../appState';
import styled from 'styled-components';
import api from '../../api';
import { ButtonMD, LogSignButton } from '../styles/buttons';
import { AuthInput } from '../styles/input';

const Login = ({ handleClickOther }) => {
  // const [ ,dispatch] = useContext(DispatchContext);
  // const [state] = useContext(StateContext);
=======
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api';

const Login = ({ handleClickOther }) => {
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');

  const handleUserChange = (e) => {
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  const handleLogin = () => {
<<<<<<< HEAD
    api.get
      .login({
        userId: userText,
        attempt: passText,
      })
      .then((res) => console.log(res))
      // .then(res => dispatch(, payload))
      .catch((err) => console.log(err));
=======
    api.get.login({
      userId: userText,
      attempt: passText
    })
    .then(res => console.log(res))
    // .then(res => dispatch(, payload))
    .catch(err => console.log(err))
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
  };

  return (
    <>
<<<<<<< HEAD
      <h1 style={{ marginBottom: '15px', }}>Welcome!</h1>
      <AuthInput
=======
      <h1>Log in</h1>
      <input
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
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
<<<<<<< HEAD
          marginBottom: '15px',
=======
          marginBottom: '15px'
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
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
<<<<<<< HEAD
          marginBottom: '15px',
=======
          marginBottom: '15px'
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
        }}
        value={passText}
        onChange={handlePassChange}
        placeholder={'Enter your Password'}
      />
<<<<<<< HEAD
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
=======
      <ButtonMD onClick={handleLogin}>Log in</ButtonMD>
      <div>Don't have an account? </div>
      <SignUpButton onClick={handleClickOther}>Sign Up</SignUpButton>
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
    </>
  );
};

<<<<<<< HEAD
=======
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

>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
export default Login;
