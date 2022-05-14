import React, { useState } from 'react';
import api from '../../api/index';
import styled from "styled-components";
import { ButtonM } from '../../styles/buttons';


function ApprovalList({ each }) {
  const [userApproved, setUserApproved] = useState(false);
  const [userDenied, setUserDenied] = useState(false);

  const handleChoice = (value) => {
    if (value) {
      setUserApproved(true)
      each.charity_state = 'true'
      api.put.user(each)
        .then(res => console.log('Approved user', res))
        .catch(err => console.log('Err in approve user', err.message))
    } else {
      setUserDenied(true)
      each.charity_state = 'denied'
      api.put.user(each)
        .then(res => console.log('Denied user', res))
        .catch(err => console.log("Err in denied user", err.messsage))
    }
  };



  return (
    <EachContainer>
      <p>Pending: {each.user_name}</p>
      <ButtonFooter>
        <label>
          {userApproved ? ('Approved') : (<ApproveDenyButton onClick={() => handleChoice(true)}>Approve</ApproveDenyButton>)}
        </label>
        <label>
          {userDenied ? ('Denied') : (<ApproveDenyButton onClick={() => handleChoice(false)}>Deny</ApproveDenyButton>)}
        </label>
      </ButtonFooter>
    </EachContainer>
  )
}

export default ApprovalList;

const EachContainer = styled.div`
  padding: 1em;
  padding-right: 1.5em;
  padding-left: 1.5em;
  border-radius: 10px;
  width: 50%;
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  justify-content: space-around;
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.95);
`
const ButtonFooter = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`


const ApproveDenyButton = styled(ButtonM)`
  border: 1px solid white;
  box-shadow: 0;
  min-width: 10em;
`