import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer } from "../styles/index.js";
import UserTransactions from '../components/Transactions/UserTransactions.js';
import Admin from './AdminPage/Admin.js'

function Transaction({ state, dispatch, init }) {
  const { dev, user } = state;


  return (
    <PageContainer>
      <h1>Transaction History</h1>
      {user.admin ?
        <Admin user={state.user}/> :
        <UserTransactions user={state.user}  />
       }

    </PageContainer>
  );
}

export default Transaction;