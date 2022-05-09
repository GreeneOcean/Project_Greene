import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"


function Transaction({ state, dispatch, init }) {
  const { dev } = state
  useEffect(() => {
    init()
    .then(res => {
      dev.logs && console.log(`\nTransactions API init res`, res)
      dev.logs && console.log('Transaction state', state)
      dispatch({
        type: `TRANSACTIONS_INIT`,
        payload: res
      })
    })
  }, [])

  return (
      <PageContainer >
        <h3>Transaction</h3>
        <p>{`TransactionsData: ${state.TransactionsData}`} </p>
        <Link to="/">Home</Link>
        <Link to="/Donate">Donate</Link>
        <Link to="/Item">Item</Link>
        <Link to="/Auth">Auth</Link>
      </PageContainer>
  );
}


const PageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(20, 20, 20);
`


export default Transaction;