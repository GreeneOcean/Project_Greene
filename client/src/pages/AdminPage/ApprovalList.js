import React, { useState } from 'react';


function ApprovalList({ each }) {
  const [userApproved, setUserApproved] = useState(false);
  const [userDenied, setUserDenied] = useState(false);
  console.log('in list each', each)

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
      {/* <p>Pending: {each}</p> */}
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

