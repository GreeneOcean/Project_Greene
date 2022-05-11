import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer } from "../styles/index.js";
import Nav from "../components/Nav";

function Transaction({ state, dispatch, init }) {
  const { dev } = state;
  useEffect(() => {
    init().then((res) => {
      dev.logs && console.log(`\nTransactions API init res`, res);
      dev.logs && console.log("Transaction state", state);
      dispatch({
        type: `TRANSACTIONS_INIT`,
        payload: res
      });
    });
  }, []);

  return (
    <PageContainer>
      <h3>Transaction</h3>
    </PageContainer>
  );
}

export default Transaction;
