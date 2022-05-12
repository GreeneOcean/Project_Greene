import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer } from "../styles/index.js";
import UserTransactions from '../components/Transactions/UserTransactions.jsx';

function Transaction({ state, dispatch, init }) {
  const { dev } = state;


  return (
    <PageContainer>
      <h3>Transaction</h3>
      <UserTransactions user={state.user}  />
    </PageContainer>
  );
}

export default Transaction;
