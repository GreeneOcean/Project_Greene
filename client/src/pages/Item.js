import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"
import { PageContainer } from '../styles/index.js';
import Nav from '../components/Nav';

function Item({ state, dispatch, init }) {
  const { dev } = state

  useEffect(() => {
    init()
    .then(res => {
      dev.logs && console.log(`\nItem API init res`, res)
      dev.logs && console.log('Item state', state)
      dispatch({
        type: `ITEM_INIT`,
        payload: res
      })
    })
  }, [])

  return (
    <PageContainer >
      <h3>Item</h3>
    </PageContainer>
  );
}


export default Item;