import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer } from "../styles/index.js";
import Nav from "../components/Nav";

function Transaction({ state, dispatch, init }) {
  const { dev } = state;


  return (
    <PageContainer>
      <h3>Transaction</h3>
    </PageContainer>
  );
}

export default Transaction;
