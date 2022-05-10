import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"


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
        <p>{`ItemData: ${state.ItemData}`} </p>
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


export default Item;