import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"
import { PageContainer } from '../styles/index.js';

function Donate({ state, dispatch, init }) {
  const { donate, dev } = state

  useEffect(() => {
    init()
    .then(res => {
      dev.logs && console.log(`\nDonate API init res`, res)
      dev.logs && console.log('Donate state', state)
      dispatch({
        type: `DONATE_INIT`,
        payload: res
      })
    })
  }, [])

  return (
      <PageContainer >
        <h3>Donate</h3>
        <p>{`DonateData: ${state.DonateData}`} </p>
        <Link to="/">Home</Link>
        <Link to="/Auth">Auth</Link>
        <Link to="/Transactions">Transactions</Link>
      </PageContainer>
  );
}


    // dispatch({
    //   type: 'GET_DONATIONS',
    //   payload: { donate: [2, 3, 4, 5, 6, 7, 8] }
    // })
    // {/* {donate.map((val, ind) => <p key={ind} >{val.toString()}</p>)} */}

export default Donate;