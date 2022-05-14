import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import api from '../api';
import { AuthInput } from '../styles/input';
import { StateContext, DispatchContext } from '../appState';
import { ButtonMD, LogSignButton } from '../styles/buttons';

const SignUp = ({ handleClickOther }) => {
  const [ ,dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);
  const [charityStatus, setCharityStatus] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');
  const [confPassText, setConfPassText] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handeCharityStatusClick = (e) => {
    setCharityStatus(!charityStatus);
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleUserChange = (e) => {
    setUserText(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassText(e.target.value);
  };

  const handleConfPassChange = (e) => {
    setConfPassText(e.target.value);
  };

  const handeAgreeTermsClick = (e) => {
    setAgreeTerms(!agreeTerms);
  }

  const handleSignUp = () => {
    if (firstName.length === 0 || lastName.length === 0 || userText.length === 0) {
      console.log('Complete form and click Sign Up');
    } else if (passText.length === 0 || passText !== confPassText) {
      console.log('Make sure passwords match');
    } else if (!agreeTerms) {
      console.log('Please agree to the Terms and Conditions')
    } else {
      const newUser = {
        user_name: userText,
        first_name: firstName,
        last_name: lastName,
        charity_state: charityStatus ? 'pending' : 'false',
        password: passText,
        lat: state.user.lat,
        lng: state.user.lng,
      };
      console.log('Sign Up Clicked, info: ', newUser);
      api.post.user(newUser)
      .then(res => {
        console.log(res);
        api.get
        .login({
          userName: newUser.user_name,
          attempt: newUser.password,
        }, dispatch);
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <>
      <h1 style={{ marginBottom: '15px', marginTop: '50px', color: 'white' }}>
        Create a new account
      </h1>
      <div style={{ color: 'white' }}>
        <input
          type="checkbox"
          onClick={handeCharityStatusClick}
          style={{ marginBottom: '15px', background: 'var(--color1)' }}
        />
        {' Would you like to apply for chaity status?'}
      </div>
      <AuthInput
        id='firstNameSignUp'
        type='text'
        autoComplete='off'
        maxLength='150'
        style={{ marginBottom: '15px' }}
        value={firstName}
        onChange={handleFirstNameChange}
        placeholder={'First name'}
      />
      <AuthInput
        id='lastNameSignUp'
        type='text'
        autoComplete='off'
        maxLength='150'
        style={{ marginBottom: '15px' }}
        value={lastName}
        onChange={handleLastNameChange}
        placeholder={'Last name'}
      />
      <AuthInput
        id='usernameSignUp'
        type='text'
        autoComplete='off'
        maxLength='150'
        style={{ marginBottom: '15px' }}
        value={userText}
        onChange={handleUserChange}
        placeholder={'Create your Username'}
      />
      <AuthInput
        id='passSignUp'
        type='password'
        autoComplete='off'
        maxLength='150'
        style={{ marginBottom: '15px' }}
        value={passText}
        onChange={handlePassChange}
        placeholder={'Create your Password'}
      />
      <AuthInput
        id='confPassSignUp'
        type='password'
        autoComplete='off'
        maxLength='150'
        style={{ marginBottom: '15px' }}
        value={confPassText}
        onChange={handleConfPassChange}
        placeholder={'Confirm your Password'}
      />
      <div style={{ marginBottom: '15px', color: 'white' }}>
        <input
          type="checkbox"
          onClick={handeAgreeTermsClick}
          style={{ background: 'var(--color1)' }}
        />
        {' I agree to the Greene Ocean '}
        <u>Terms of Service</u> and <u>Privacy Policy</u>
      </div>
      <ButtonMD onClick={handleSignUp}>Sign up</ButtonMD>
      <div style={{ color: 'white' }}>
        Already have an account?
        <LogSignButton onClick={handleClickOther}>Log in</LogSignButton>
      </div>
    </>
  );
};

export default SignUp;
