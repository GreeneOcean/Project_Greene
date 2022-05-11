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
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  const handleConfPassChange = (e) => {
    setConfPassText(e.target.value);
  };

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
  };

  return (
    <>
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
        value={passText}
        onChange={handlePassChange}
        placeholder={'Create your Password'}
      />
      <AuthInput
        id="confPassword"
        className="search"
        type="password"
        autoComplete="off"
        maxLength="150"
        value={confPassText}
        onChange={handleConfPassChange}
        placeholder={'Confirm your Password'}
      />
      <div>
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
      </div>
    </>
  );
};

export default SignUp;
