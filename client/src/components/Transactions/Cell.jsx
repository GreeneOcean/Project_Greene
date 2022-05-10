import React, {useEffect, useState} from "react";
import styled from 'styled-components';


const Cell = (props) =>{
  console.log('cell props', props)

  return (

    <Container>

      <div>PHOTO: {props.item.pictures}</div>
      <div>PRODUCT INFO: {props.item.title} {props.item.category} {props.item.description} </div>
      <div>USER INFO: {props.user.first_name} {props.user.last_name} {props.user.user_name}</div>
      {}

    </Container>

  )
}

export default Cell;


const Container = styled.div`
padding: 20px 16px;
border-radius: 70, 100vh;
background-color: yellow;
`


// <div className="card">
// <img src="img_avatar.png" alt="Avatar" style="width:100%">
// <div className="container">
//   <h4><b>John Doe</b></h4>
//   <p>Architect Engineer</p>
// </div>
// </div>


