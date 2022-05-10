import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"


function Browse({ state, user, dispatch, init }) {
  const { dev } = state

  useEffect(() => {
    setTimeout(() => {
      init().then(res => {
        dev.logs && console.log(`\nBrowse API init res`, res)
        dev.logs && console.log('Browse state', state)
        dispatch({
          type: `BROWSE_INIT`,
          payload: res
        })
      })
    }, 1000)

  }, [])

  return (
      <PageContainer >
        <h3>Browse</h3>
        <p>{`BrowseData: ${state.BrowseData}`} </p>
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


export default Browse;