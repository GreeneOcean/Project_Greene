import React, { useState } from 'react';
import api from '../../api/index';
import styled from "styled-components";


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
      <label>
        {userApproved ? ('Approved') : (<ApproveDenyButton onClick={() => handleChoice(true)}>Approve</ApproveDenyButton>)}

      </label>
      <label>
        {userDenied ? ('Denied') : (<ApproveDenyButton onClick={() => handleChoice(false)}>Deny</ApproveDenyButton>)}

      </label>

    </EachContainer>
  )
}

export default ApprovalList;

const EachContainer = styled.div`
  padding: 1em;
  padding-right: 2em;
  padding-left: 2em;
  border-radius: 20px;
  width: 80%;
  display:flex;
  align-items: center;
  border:2px solid var(--color1);
`
const ApproveDenyButton = styled.button`

`