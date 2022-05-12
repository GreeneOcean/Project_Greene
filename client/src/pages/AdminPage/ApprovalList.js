import React, { useState } from 'react';


function ApprovalList({ user }) {
  const [userApproved, setUserApproved] = useState(false);
  const [userDenied, setUserDenied] = useState(false);

  const handleChoice = (value) => {
    if (value) {
      console.log('hit')
      setUserApproved(true)
    } else {
      setUserDenied(true)
    }
  };


  return (
    <div>
      <p>Pending: {user}</p>
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

