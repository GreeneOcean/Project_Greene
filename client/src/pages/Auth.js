import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PageContainer } from '../styles/index.js';

function Auth({ state, dispatch, init }) {
  const { dev } = state

  useEffect(() => {
    init()
    .then(res => {
      dev.logs && console.log(`\nAuth API init res`, res)
      dev.logs && console.log('Auth state', state)
      dispatch({
        type: 'AUTH_INIT',
        payload: res
      })
    })
  }, [])

  return (
      <PageContainer >
        <h3>Auth</h3>
        <p>{`AuthData: ${state.AuthData}`} </p>
      </PageContainer>
  );
}


export default Auth;
