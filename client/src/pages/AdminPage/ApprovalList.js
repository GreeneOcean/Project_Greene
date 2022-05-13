import React, { useState } from 'react';
import api from '../../api/index';

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
    <div>
      <p>Pending: {each.user_name}</p>
      <label>
        {userApproved ? ('Approved') : (<button onClick={() => handleChoice(true)}>Approve</button>)}

      </label>
      <label>
        {userDenied ? ('Denied') : (<button onClick={() => handleChoice(false)}>Deny</button>)}

      </label>

    </div>
  )
}

export default ApprovalList;

