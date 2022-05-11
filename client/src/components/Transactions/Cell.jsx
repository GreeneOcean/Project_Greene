import React, {useEffect, useState} from "react";
import styled from 'styled-components';


const Cell = (props) =>{
  const [rate, setRate] = useState(false);

  return (

    <Container>

      <div>PHOTO: {props.item.pictures}</div>
      <div>PRODUCT INFO: {props.item.title} {props.item.category} {props.item.description} </div>
      <div>USER INFO: {props.user.first_name} {props.user.last_name} {props.user.user_name}</div>
      {(props.user.charity_state && (props.group === 'donations' && props.status === 'donated')) &&
        <button onClick={() => setRate(!rate)}>Rate User</button>}
      {rate &&
        <Modal className='modal'>
          <div>
            MODAL TO RATE USER
          </div>
        </Modal>
      }
    </Container>

  )
}

export default Cell;


const Container = styled.div`
padding: 20px 16px;
border-radius: 70, 100vh;
background-color: black;
`
const Modal = styled.div`
display: block;
width: 100%;
height: 100%;
background-color: blue;
`