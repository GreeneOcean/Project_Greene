import React, {useEffect, useState} from "react";
import styled from 'styled-components';


const Cell = ({ status, group, user, item, setOther, clearOther }) =>{
  const [rate, setRate] = useState(false);


  return (

    <Container>

      <div>PHOTO: {item.pictures}</div>
      <div onClick={() => clearOther()} >PRODUCT INFO: {item.title} {item.category} {item.description} </div>
      <div onClick={() => setOther(item.posted_by)} >POSTED BY INFO: {item.posted_by} </div>
      {(user.charity_state && (group === 'donations' && status === 'donated')) &&
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