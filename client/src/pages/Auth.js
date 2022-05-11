import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PageContainer } from '../styles/index.js';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

function Auth({ state, dispatch, init }) {
  const { dev } = state;

  const [loggedIn, setLoggedIn] = useState(true);
  const [isRegistered, setIsRegistered] = useState(true);

  const handleClickOther = () => {
    setIsRegistered(!isRegistered);
  };

  useEffect(() => {
    init().then((res) => {
      dev.logs && console.log(`\nAuth API init res`, res);
      dev.logs && console.log('Auth state', state);
      dispatch({
        type: 'AUTH_INIT',
        payload: res,
      });
    });
  }, []);

  return (
    <PageContainer>
      {isRegistered ? (
        <Login state={state} handleClickOther={handleClickOther} />
      ) : (
        <SignUp state={state} handleClickOther={handleClickOther} />
      )}
    </PageContainer>
  );
}

export default Auth;
