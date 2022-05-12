import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer } from "../styles/index.js";
import UserTransactions from '../components/Transactions/UserTransactions.jsx';

function Transaction({ state, dispatch, init }) {
  const { dev } = state;


  return (
    <PageContainer>
<<<<<<< HEAD
      <h1>Transaction History</h1>
      {user.admin ?
        <Admin user={state.user}/> :
        <UserTransactions user={state.user}  />
       }

=======
      <h3>Transaction</h3>
      <UserTransactions user={state.user}  />
>>>>>>> parent of a56d27c... Ib sy db (#34) adding location to server and route by url
    </PageContainer>
  );
}

export default Transaction;