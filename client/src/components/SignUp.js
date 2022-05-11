<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../../appState';
import styled from 'styled-components';
import api from '../../api';
import { ButtonMD, LogSignButton } from '../styles/buttons';
import { AuthInput } from '../styles/input';

const SignUp = ({ handleClickOther }) => {
  // const [ ,dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');
  const [confPassText, setConfPassText] = useState('');
  const [charityStatus, setCharityStatus] = useState(false);
  const [termsStatus, setTermsStatus] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUserTextChange = (e) => {
=======
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api';

const SignUp = ({ handleClickOther }) => {
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');
  const [confPassText, setConfPassText] = useState('');

  const handleUserChange = (e) => {
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  const handleConfPassChange = (e) => {
    setConfPassText(e.target.value);
  };

<<<<<<< HEAD
  const handleCharityClick = () => {
    setCharityStatus(!charityStatus);
  };

  const handleTermsClick = () => {
    setTermsStatus(!termsStatus);
  };

  const handleSignUpSubmit = () => {
    if (passText.length === 0 || passText !== confPassText) {
      console.log('make a password');
    } else if (!termsStatus) {
      console.log('Please agree to the terms of service');
    } else {
      api.post
        .user({
          userId: userText,
          attempt: passText,
          firstName: firstName,
          lastName: lastName,
          lat: state.user.lat,
          lng: state.user.lng,
          charity: charityStatus,
        })
        .then((res) => console.log(res)) // FIX THIS
        // .then(res => dispatch({ type: 'type from reducer case', payload: res.data}))
        .catch((err) => console.log(err));
    }
=======
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
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
  };

  return (
    <>
<<<<<<< HEAD
      <h1
        style={{
          paddingBottom: '15px',
        }}
      >
        Create a new account
      </h1>
      <div>
        <input
          id="charityStatus"
          className="checkbox"
          type="checkbox"
          value={charityStatus}
          onClick={handleCharityClick}
          style={{
            marginBottom: '15px',
          }}
        />
        Is this a chairty account?
      </div>
      <AuthInput
        id="firstName"
        className="input"
        // type='search'
        autoComplete="off"
        maxLength="150"
        value={firstName}
        onChange={handleFirstNameChange}
        placeholder={'First name'}
      />
      <AuthInput
        id="username"
        className="input"
        type="search"
        autoComplete="off"
        maxLength="150"
        value={lastName}
        onChange={handleLastNameChange}
        placeholder={'Last name'}
      />
      <AuthInput
        id="username"
        className="search"
        type="search"
        autoComplete="off"
        maxLength="150"
        value={userText}
        onChange={handleUserTextChange}
        placeholder={'Create your Username'}
      />
      <AuthInput
        id="password"
        className="search"
        type="password"
        autoComplete="off"
        maxLength="150"
=======
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
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
        value={passText}
        onChange={handlePassChange}
        placeholder={'Create your Password'}
      />
<<<<<<< HEAD
      <AuthInput
        id="confPassword"
        className="search"
        type="password"
        autoComplete="off"
        maxLength="150"
=======
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
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
        value={confPassText}
        onChange={handleConfPassChange}
        placeholder={'Confirm your Password'}
      />
      <div>
<<<<<<< HEAD
        <input
          id="agreeTerms"
          className="checkbox"
          type="checkbox"
          value={termsStatus}
          onClick={handleTermsClick}
          style={{
            marginBottom: '15px',
          }}
        />
        I agree to the Greene Ocean <u>Terms of Service</u> and{' '}
        <u>Privacy Policy</u>
      </div>
      <ButtonMD
        onClick={handleSignUpSubmit}
        style={{
          marginBottom: '15px',
        }}
      >
        Sign up
      </ButtonMD>
      <div>
        Already have an account?
        <LogSignButton onClick={handleClickOther}>Log in</LogSignButton>
=======
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
>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
      </div>
    </>
  );
};

<<<<<<< HEAD
=======
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

>>>>>>> f088cd8a04d737997a52c4e0a03d568a64d24852
export default SignUp;
