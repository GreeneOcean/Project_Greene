import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"


function Home({ state, dispatch, init }) {

  const { dev, user, HomeData } = state
  const { lat, lng, local } = user

  useEffect(() => {
    init()
    .then(res => {
      dev.logs && console.log(`\nHome API init res`, res)
      dev.logs && console.log('Home state', state)
      dispatch({
        type: `HOME_INIT`,
        payload: res
      })
    })
  }, [])

  const toggleDevLogs = (e) => {
    dispatch({
      type: 'TOGGLE_LOGS'
    })
  }

  return (
      <PageContainer >

        <h3>Home</h3>
        <p>{`HomeData: ${HomeData}`} </p>
        <p>{`user lat: ${lat ? lat : 'loading'}   user lng: ${lng ? lng : 'loading'}`} </p>
        <p>{`number of local: ${local ? local.length : 'loading'}`}</p>
        <button onClick={toggleDevLogs} >Toggle logs</button>

      </PageContainer>
  );
}


const PageContainer = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgb(20, 20, 20);

  p {
    font-size: 12px;
  }

`






export default Home;